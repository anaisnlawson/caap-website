import { createContext } from 'react';

export interface AppUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

export interface AuthContextValue {
  user: AppUser | null;
  loading: boolean;
  /** True when the signed-in user is a CAAP admin (can view all students). */
  isAdmin: boolean;
  /** True when the signed-in user mentors at least one student. */
  isMentor: boolean;
  /** True when running without a real Supabase backend (local demo). */
  demoMode: boolean;
  /** Non-null when the last sign-in attempt was rejected (e.g. wrong domain). */
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
