import { supabase, isSupabaseConfigured } from './supabase';

/**
 * Per-student data layer.
 *
 * Each "document" is stored per (user, key) as a single JSON blob. That keeps
 * things simple and works great for a small cohort: the editable grid, the
 * checklists, etc. each save their whole state under a key.
 *
 * - When Supabase is configured, docs live in the `tracker_docs` table and are
 *   protected by row-level security so students only see their own data.
 * - Otherwise we fall back to the browser's localStorage, namespaced by user,
 *   so the whole UI is usable in "demo mode" with no backend.
 */

const LS_PREFIX = 'caap-tracker';
const DEMO_USER_KEY = 'caap-tracker:demo-user';

export interface StudentProfile {
  user_id: string;
  email: string;
  name: string;
  updated_at?: string;
}

function lsKey(userId: string, docKey: string): string {
  return `${LS_PREFIX}:${userId}:${docKey}`;
}

export async function loadDoc<T>(
  userId: string,
  docKey: string,
  fallback: T,
): Promise<T> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('tracker_docs')
      .select('doc')
      .eq('user_id', userId)
      .eq('doc_key', docKey)
      .maybeSingle();

    if (error) {
      console.error('loadDoc failed:', error.message);
      return fallback;
    }
    return (data?.doc as T) ?? fallback;
  }

  // localStorage fallback
  try {
    const raw = localStorage.getItem(lsKey(userId, docKey));
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export async function saveDoc<T>(
  userId: string,
  docKey: string,
  doc: T,
): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase.from('tracker_docs').upsert(
      {
        user_id: userId,
        doc_key: docKey,
        doc,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,doc_key' },
    );
    if (error) console.error('saveDoc failed:', error.message);
    return;
  }

  // localStorage fallback
  try {
    localStorage.setItem(lsKey(userId, docKey), JSON.stringify(doc));
  } catch (e) {
    console.error('saveDoc (local) failed:', e);
  }
}

/**
 * Mirror the signed-in student's email + name into `profiles` so an admin can
 * see who each tracker belongs to (auth.users isn't queryable via the API).
 * No-op in demo mode.
 */
export async function syncProfile(user: {
  id: string;
  email: string;
  name: string;
}): Promise<void> {
  if (!(isSupabaseConfigured && supabase)) return;
  const { error } = await supabase.from('profiles').upsert(
    {
      user_id: user.id,
      email: user.email,
      name: user.name,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id' },
  );
  if (error) console.error('syncProfile failed:', error.message);
}

/** Ask the backend whether the current user is an admin. */
export async function fetchIsAdmin(): Promise<boolean> {
  if (!(isSupabaseConfigured && supabase)) return false;
  const { data, error } = await supabase.rpc('is_admin');
  if (error) {
    console.error('is_admin check failed:', error.message);
    return false;
  }
  return Boolean(data);
}

/** Ask the backend whether the current user mentors any student. */
export async function fetchIsMentor(): Promise<boolean> {
  if (!(isSupabaseConfigured && supabase)) return false;
  const { data, error } = await supabase.rpc('is_mentor');
  if (error) {
    console.error('is_mentor check failed:', error.message);
    return false;
  }
  return Boolean(data);
}

/** List every student (admin only — enforced by RLS on `profiles`). */
export async function listStudents(): Promise<StudentProfile[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id, email, name, updated_at')
      .order('name', { ascending: true });
    if (error) {
      console.error('listStudents failed:', error.message);
      return [];
    }
    return (data as StudentProfile[]) ?? [];
  }

  // Demo mode: surface the local demo student so the admin UI is previewable.
  try {
    const raw = localStorage.getItem(DEMO_USER_KEY);
    if (!raw) return [];
    const u = JSON.parse(raw) as { id: string; email: string; name: string };
    return [{ user_id: u.id, email: u.email, name: u.name }];
  } catch {
    return [];
  }
}

/**
 * Delete a student's data (admin only — enforced by the admin-delete RLS
 * policies). Removes their tracker documents, mentor grants, and profile row so
 * they disappear from the roster. Note: this does NOT remove the underlying
 * Google/auth.users login (that requires Supabase's service role); if the same
 * person signs in again they'll start with a fresh, empty tracker.
 */
export async function deleteStudent(
  userId: string,
): Promise<{ error?: string }> {
  if (isSupabaseConfigured && supabase) {
    const docs = await supabase
      .from('tracker_docs')
      .delete()
      .eq('user_id', userId);
    if (docs.error) {
      console.error('deleteStudent (docs) failed:', docs.error.message);
      return { error: docs.error.message };
    }
    // Best-effort: clear any mentor grants this student created.
    await supabase
      .from('mentor_access')
      .delete()
      .eq('student_user_id', userId);
    const prof = await supabase
      .from('profiles')
      .delete()
      .eq('user_id', userId);
    if (prof.error) {
      console.error('deleteStudent (profile) failed:', prof.error.message);
      return { error: prof.error.message };
    }
    return {};
  }

  // Demo mode: wipe this user's localStorage docs + the demo user record.
  try {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(`${LS_PREFIX}:${userId}:`)) toRemove.push(k);
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
    const raw = localStorage.getItem(DEMO_USER_KEY);
    if (raw) {
      const u = JSON.parse(raw) as { id: string };
      if (u.id === userId) localStorage.removeItem(DEMO_USER_KEY);
    }
  } catch (e) {
    console.error('deleteStudent (local) failed:', e);
  }
  return {};
}

// ---- Mentor sharing (student-controlled) ----

function mentorsLsKey(userId: string): string {
  return `${LS_PREFIX}:${userId}:mentors`;
}

/** Emails of mentors the current student has shared their tracker with. */
export async function listMyMentors(userId: string): Promise<string[]> {
  if (isSupabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from('mentor_access')
      .select('mentor_email')
      .order('created_at', { ascending: true });
    if (error) {
      console.error('listMyMentors failed:', error.message);
      return [];
    }
    return (data ?? []).map((r) => (r as { mentor_email: string }).mentor_email);
  }
  try {
    const raw = localStorage.getItem(mentorsLsKey(userId));
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

/** Grant a mentor (by email) read access to this student's shared tabs. */
export async function addMentor(
  userId: string,
  email: string,
): Promise<{ error?: string }> {
  const clean = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
    return { error: 'Please enter a valid email address.' };
  }
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('mentor_access')
      .insert({ student_user_id: userId, mentor_email: clean });
    if (error) {
      if (error.code === '23505') return {}; // already shared — treat as success
      console.error('addMentor failed:', error.message);
      return { error: error.message };
    }
    return {};
  }
  try {
    const raw = localStorage.getItem(mentorsLsKey(userId));
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    if (!list.includes(clean)) list.push(clean);
    localStorage.setItem(mentorsLsKey(userId), JSON.stringify(list));
  } catch (e) {
    console.error('addMentor (local) failed:', e);
  }
  return {};
}

/** Revoke a mentor's access. */
export async function removeMentor(
  userId: string,
  email: string,
): Promise<void> {
  const clean = email.trim().toLowerCase();
  if (isSupabaseConfigured && supabase) {
    const { error } = await supabase
      .from('mentor_access')
      .delete()
      .eq('student_user_id', userId)
      .eq('mentor_email', clean);
    if (error) console.error('removeMentor failed:', error.message);
    return;
  }
  try {
    const raw = localStorage.getItem(mentorsLsKey(userId));
    const list = raw ? (JSON.parse(raw) as string[]) : [];
    localStorage.setItem(
      mentorsLsKey(userId),
      JSON.stringify(list.filter((e) => e !== clean)),
    );
  } catch (e) {
    console.error('removeMentor (local) failed:', e);
  }
}
