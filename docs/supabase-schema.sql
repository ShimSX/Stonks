-- SS Research — run this once in Supabase Dashboard → SQL Editor → New query → Run
-- Creates per-user research hubs with RLS so users only see their own data.

create table if not exists public.hubs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null default 'My Research Hub',
  created_at timestamptz not null default now(),
  unique (user_id)
);

create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  hub_id uuid not null references public.hubs(id) on delete cascade,
  ticker text not null,
  payload jsonb not null default '{}'::jsonb,
  updated_at date not null default (now()::date),
  unique (hub_id, ticker)
);

create index if not exists companies_hub_id_idx on public.companies (hub_id);

alter table public.hubs enable row level security;
alter table public.companies enable row level security;

-- Drop old policies if re-running
drop policy if exists "hubs: own" on public.hubs;
drop policy if exists "companies: via hub" on public.companies;

create policy "hubs: own" on public.hubs
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "companies: via hub" on public.companies
  for all
  using (
    exists (
      select 1 from public.hubs h
      where h.id = hub_id and h.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.hubs h
      where h.id = hub_id and h.user_id = auth.uid()
    )
  );

-- Optional: confirm tables
-- select * from public.hubs limit 1;
