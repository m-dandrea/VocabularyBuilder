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
