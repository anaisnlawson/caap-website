import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// These are read from environment variables at build time (Vite).
// Create a `.env` file (see `.env.example`) with your Supabase project values.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

// Optional: restrict logins to a single school domain, e.g. "students.myschool.edu".
export const allowedEmailDomain = (
  import.meta.env.VITE_ALLOWED_EMAIL_DOMAIN as string | undefined
)?.toLowerCase();

// When both values are present we run against the real Supabase backend.
// Otherwise the app falls back to a local "demo mode" so the UI still works.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl as string, supabaseAnonKey as string)
  : null;
