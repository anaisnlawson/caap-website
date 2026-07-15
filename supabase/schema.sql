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
