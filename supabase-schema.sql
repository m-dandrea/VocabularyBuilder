create table if not exists public.user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_state enable row level security;
revoke all on table public.user_state from anon;
grant usage on schema public to authenticated;
grant select, insert, update on table public.user_state to authenticated;

create policy "Users read own state"
on public.user_state for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users create own state"
on public.user_state for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users update own state"
on public.user_state for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create table public.learner_accounts (
  username text primary key,
  password_hash text,
  password_salt text,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint learner_username_format check (username ~ '^[a-z0-9_-]{3,24}$'),
  constraint learner_password_pair check ((password_hash is null) = (password_salt is null))
);

alter table public.learner_accounts enable row level security;
revoke all on table public.learner_accounts from anon, authenticated;

create policy "No direct client access"
on public.learner_accounts for all
to anon, authenticated
using (false)
with check (false);
