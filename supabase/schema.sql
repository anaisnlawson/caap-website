-- CAAP student tracker — Supabase schema
-- Run this in the Supabase dashboard: SQL Editor → New query → paste → Run.

-- One JSON document per (student, doc_key). doc_key is e.g. 'colleges',
-- 'essays', 'deadlines', 'progress'. Each student only ever sees their own rows.
create table if not exists public.tracker_docs (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  doc_key    text        not null,
  doc        jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, doc_key)
);

-- Row Level Security: students can only read/write their own documents.
alter table public.tracker_docs enable row level security;

-- Table privileges (layer 1): allow signed-in students to use the table via the
-- Data API. We intentionally grant ONLY the `authenticated` role, never `anon`,
-- so no one who isn't logged in can touch this table. Row-level access is then
-- further restricted to each student's own rows by the RLS policies below.
grant select, insert, update, delete on public.tracker_docs to authenticated;

drop policy if exists "own docs - select" on public.tracker_docs;
create policy "own docs - select"
  on public.tracker_docs for select
  using (auth.uid() = user_id);

drop policy if exists "own docs - insert" on public.tracker_docs;
create policy "own docs - insert"
  on public.tracker_docs for insert
  with check (auth.uid() = user_id);

drop policy if exists "own docs - update" on public.tracker_docs;
create policy "own docs - update"
  on public.tracker_docs for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "own docs - delete" on public.tracker_docs;
create policy "own docs - delete"
  on public.tracker_docs for delete
  using (auth.uid() = user_id);


-- ---------------------------------------------------------------------------
-- Admin view: let designated staff read every student's data (read-only).
-- ---------------------------------------------------------------------------

-- 1) Who is an admin. Keyed by email so you can add admins before they've ever
--    signed in. Add more rows any time:  insert into admins (email) values ('x@y.com');
create table if not exists public.admins (
  email      text        primary key,
  created_at timestamptz not null default now()
);

-- Seed the first admin. (Safe to re-run — on conflict do nothing.)
insert into public.admins (email) values ('anaisnlawson@gmail.com')
  on conflict (email) do nothing;

-- The admins table is only read indirectly (via the is_admin() function below),
-- so we do NOT expose it to the anon/authenticated API roles. RLS on + no policy
-- + no grant means nobody can query it through the Data API.
alter table public.admins enable row level security;

-- Helper that answers "is the caller an admin?" without exposing the admins
-- table. SECURITY DEFINER lets it read admins regardless of the caller's role,
-- and it's safe because it only ever returns a boolean about the caller itself.
create or replace function public.is_admin()
  returns boolean
  language sql
  stable
  security definer
  set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(auth.jwt() ->> 'email')
  );
$$;

grant execute on function public.is_admin() to authenticated;

-- 2) Student profiles so an admin can see who each row belongs to. auth.users
--    isn't queryable through the Data API, so each student mirrors their email +
--    name here on sign-in.
create table if not exists public.profiles (
  user_id    uuid        primary key references auth.users (id) on delete cascade,
  email      text,
  name       text,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
grant select, insert, update on public.profiles to authenticated;

drop policy if exists "own profile - select" on public.profiles;
create policy "own profile - select"
  on public.profiles for select
  using (auth.uid() = user_id);

drop policy if exists "own profile - insert" on public.profiles;
create policy "own profile - insert"
  on public.profiles for insert
  with check (auth.uid() = user_id);

drop policy if exists "own profile - update" on public.profiles;
create policy "own profile - update"
  on public.profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Admins can read every profile.
drop policy if exists "admins read all profiles" on public.profiles;
create policy "admins read all profiles"
  on public.profiles for select
  using (public.is_admin());

-- 3) Admins can read every student's tracker documents (read-only — no admin
--    insert/update/delete policy, so staff can view but not alter student work).
drop policy if exists "admins read all docs" on public.tracker_docs;
create policy "admins read all docs"
  on public.tracker_docs for select
  using (public.is_admin());


-- ---------------------------------------------------------------------------
-- Mentor sharing: a student can grant specific mentors read-only access to
-- their Colleges / Essays / Deadlines (never their personal Progress checklist,
-- and never edit rights). A "mentor" is simply anyone a student has shared with
-- — there is no global mentor role, so access is always student-controlled.
-- ---------------------------------------------------------------------------

create table if not exists public.mentor_access (
  student_user_id uuid        not null references auth.users (id) on delete cascade,
  mentor_email    text        not null,
  created_at      timestamptz not null default now(),
  primary key (student_user_id, mentor_email)
);

alter table public.mentor_access enable row level security;
grant select, insert, delete on public.mentor_access to authenticated;

-- Students manage (and only see) their own sharing grants.
drop policy if exists "student manages own grants - select" on public.mentor_access;
create policy "student manages own grants - select"
  on public.mentor_access for select
  using (auth.uid() = student_user_id);

drop policy if exists "student manages own grants - insert" on public.mentor_access;
create policy "student manages own grants - insert"
  on public.mentor_access for insert
  with check (auth.uid() = student_user_id);

drop policy if exists "student manages own grants - delete" on public.mentor_access;
create policy "student manages own grants - delete"
  on public.mentor_access for delete
  using (auth.uid() = student_user_id);

-- Does the caller mentor the given student? SECURITY DEFINER so the check works
-- without exposing the mentor_access table to mentors directly.
create or replace function public.is_mentor_of(target uuid)
  returns boolean
  language sql
  stable
  security definer
  set search_path = public
as $$
  select exists (
    select 1 from public.mentor_access
    where student_user_id = target
      and lower(mentor_email) = lower(auth.jwt() ->> 'email')
  );
$$;

grant execute on function public.is_mentor_of(uuid) to authenticated;

-- Is the caller a mentor for anyone at all? Used by the UI to show the mentor view.
create or replace function public.is_mentor()
  returns boolean
  language sql
  stable
  security definer
  set search_path = public
as $$
  select exists (
    select 1 from public.mentor_access
    where lower(mentor_email) = lower(auth.jwt() ->> 'email')
  );
$$;

grant execute on function public.is_mentor() to authenticated;

-- Mentors can read the profile of any student who shared with them.
drop policy if exists "mentors read shared profiles" on public.profiles;
create policy "mentors read shared profiles"
  on public.profiles for select
  using (public.is_mentor_of(user_id));

-- Mentors can read ONLY the Colleges / Essays / Deadlines docs of students who
-- shared with them — never Progress, and read-only (no write policy for them).
drop policy if exists "mentors read shared docs" on public.tracker_docs;
create policy "mentors read shared docs"
  on public.tracker_docs for select
  using (
    doc_key in ('colleges', 'essays', 'deadlines')
    and public.is_mentor_of(user_id)
  );
