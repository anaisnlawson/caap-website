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
