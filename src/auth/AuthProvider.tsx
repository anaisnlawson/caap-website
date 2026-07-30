import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  supabase,
  isSupabaseConfigured,
  allowedEmailDomain,
} from '../lib/supabase';
import { AuthContext, type AppUser, type AuthContextValue } from './context';
import { syncProfile, fetchIsAdmin, fetchIsMentor } from '../lib/db';

const DEMO_USER_KEY = 'caap-tracker:demo-user';

function domainOf(email: string): string {
  return email.split('@')[1]?.toLowerCase() ?? '';
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const demoMode = !isSupabaseConfigured;

  // In demo mode, restore any locally-saved student up front (no effect needed).
  const [user, setUser] = useState<AppUser | null>(() => {
    if (isSupabaseConfigured) return null;
    try {
      const raw = localStorage.getItem(DEMO_USER_KEY);
      return raw ? (JSON.parse(raw) as AppUser) : null;
    } catch {
      return null;
    }
  });
  // Only the Supabase path needs an async load, so start "loading" only then.
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMentor, setIsMentor] = useState(false);

  // ---- Real backend (Supabase) ----
  useEffect(() => {
    if (!supabase) return;
    const client = supabase;

    const applySession = (sessionUser: {
      id: string;
      email?: string;
      user_metadata?: Record<string, unknown>;
    } | null) => {
      if (!sessionUser?.email) {
        setUser(null);
        return;
      }
      const email = sessionUser.email;
      if (allowedEmailDomain && domainOf(email) !== allowedEmailDomain) {
        setError(
          `Please sign in with your @${allowedEmailDomain} school account.`,
        );
        void client.auth.signOut();
        setUser(null);
        return;
      }
      const meta = sessionUser.user_metadata ?? {};
      setUser({
        id: sessionUser.id,
        email,
        name: (meta.full_name as string) || (meta.name as string) || email,
        avatarUrl: meta.avatar_url as string | undefined,
      });
    };

    client.auth.getSession().then(({ data }) => {
      applySession(data.session?.user ?? null);
      setLoading(false);
    });

    const { data: sub } = client.auth.onAuthStateChange((_event, session) => {
      applySession(session?.user ?? null);
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // Whenever the signed-in user changes, mirror their profile and resolve
  // whether they're an admin. In demo mode, treat a signed-in user as admin so
  // the admin view is previewable locally.
  useEffect(() => {
    let active = true;
    if (!isSupabaseConfigured) {
      // Demo mode: a signed-in user can preview the admin view.
      Promise.resolve().then(() => {
        if (!active) return;
        setIsAdmin(!!user);
        setIsMentor(false);
      });
      return () => {
        active = false;
      };
    }
    if (!user) {
      Promise.resolve().then(() => {
        if (!active) return;
        setIsAdmin(false);
        setIsMentor(false);
      });
      return () => {
        active = false;
      };
    }
    void syncProfile(user);
    void fetchIsAdmin().then((admin) => {
      if (active) setIsAdmin(admin);
    });
    void fetchIsMentor().then((mentor) => {
      if (active) setIsMentor(mentor);
    });
    return () => {
      active = false;
    };
  }, [user]);

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    if (supabase) {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          // Nudges Google to pre-select the school workspace account.
          queryParams: allowedEmailDomain
            ? { hd: allowedEmailDomain }
            : undefined,
        },
      });
      if (oauthError) setError(oauthError.message);
      return;
    }

    // Demo mode: fabricate a signed-in student locally.
    const demoUser: AppUser = {
      id: 'demo-student',
      email: `student@${allowedEmailDomain ?? 'school.edu'}`,
      name: 'Demo Student',
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
  }, []);

  const signOut = useCallback(async () => {
    setError(null);
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(DEMO_USER_KEY);
    }
    setUser(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isAdmin,
      isMentor,
      demoMode,
      error,
      signInWithGoogle,
      signOut,
    }),
    [
      user,
      loading,
      isAdmin,
      isMentor,
      demoMode,
      error,
      signInWithGoogle,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
