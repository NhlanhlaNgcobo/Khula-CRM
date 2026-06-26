-- KHULA CRM — Full Database Schema
-- Run this in Supabase SQL Editor

-- Extensions
create extension if not exists "uuid-ossp";

-- ─── ORGANISATIONS ────────────────────────────────────────────────────────────
create table if not exists organisations (
  id            uuid primary key default uuid_generate_v4(),
  name          text not null,
  subdomain     text unique not null,
  plan          text not null default 'spark' check (plan in ('spark', 'grow', 'scale')),
  owner_id      uuid references auth.users(id) on delete set null,
  whatsapp_number text,
  settings      jsonb default '{}'::jsonb,
  created_at    timestamptz default now()
);

-- ─── USERS ────────────────────────────────────────────────────────────────────
create table if not exists users (
  id              uuid primary key references auth.users(id) on delete cascade,
  organisation_id uuid references organisations(id) on delete cascade,
  email           text not null,
  full_name       text default '',
  role            text not null default 'sales_rep' check (role in ('owner','admin','sales_rep','viewer')),
  avatar_url      text,
  created_at      timestamptz default now()
);

-- ─── CONTACTS ─────────────────────────────────────────────────────────────────
create table if not exists contacts (
  id              uuid primary key default uuid_generate_v4(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  full_name       text not null,
  phone           text,
  email           text,
  company         text,
  tags            text[] default '{}',
  source          text default 'manual',
  notes           text,
  last_activity_at timestamptz default now(),
  created_at      timestamptz default now()
);

-- ─── DEALS ────────────────────────────────────────────────────────────────────
create table if not exists deals (
  id              uuid primary key default uuid_generate_v4(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  contact_id      uuid references contacts(id) on delete set null,
  title           text not null,
  value           numeric default 0,
  stage           text not null default 'new_lead' check (stage in ('new_lead','contacted','interested','booked','closed_won','closed_lost')),
  assigned_to     uuid references users(id) on delete set null,
  closed_at       timestamptz,
  notes           text,
  created_at      timestamptz default now()
);

-- ─── CONVERSATIONS ────────────────────────────────────────────────────────────
create table if not exists conversations (
  id              uuid primary key default uuid_generate_v4(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  contact_id      uuid references contacts(id) on delete cascade,
  channel         text not null default 'whatsapp' check (channel in ('whatsapp','email','sms')),
  direction       text not null default 'inbound' check (direction in ('inbound','outbound')),
  body            text not null,
  is_read         boolean default false,
  sent_at         timestamptz default now()
);

-- ─── SERVICES ─────────────────────────────────────────────────────────────────
create table if not exists services (
  id              uuid primary key default uuid_generate_v4(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  name            text not null,
  duration_minutes integer not null default 60,
  price           numeric default 0,
  description     text,
  is_active       boolean default true,
  created_at      timestamptz default now()
);

-- ─── BOOKINGS ─────────────────────────────────────────────────────────────────
create table if not exists bookings (
  id              uuid primary key default uuid_generate_v4(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  contact_id      uuid references contacts(id) on delete set null,
  service_id      uuid references services(id) on delete set null,
  team_member_id  uuid references users(id) on delete set null,
  starts_at       timestamptz not null,
  ends_at         timestamptz,
  status          text not null default 'pending' check (status in ('pending','confirmed','completed','no_show','cancelled')),
  notes           text,
  created_at      timestamptz default now()
);

-- ─── AUTOMATIONS ──────────────────────────────────────────────────────────────
create table if not exists automations (
  id              uuid primary key default uuid_generate_v4(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  n8n_workflow_id text,
  name            text not null,
  trigger_event   text not null,
  is_active       boolean default false,
  config          jsonb default '{}'::jsonb,
  created_at      timestamptz default now()
);

-- ─── FORMS ────────────────────────────────────────────────────────────────────
create table if not exists forms (
  id              uuid primary key default uuid_generate_v4(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  name            text not null,
  fields          jsonb default '[]'::jsonb,
  pipeline_stage  text default 'new_lead',
  automation_id   uuid references automations(id) on delete set null,
  is_active       boolean default true,
  created_at      timestamptz default now()
);

-- ─── FORM SUBMISSIONS ─────────────────────────────────────────────────────────
create table if not exists form_submissions (
  id              uuid primary key default uuid_generate_v4(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  form_id         uuid references forms(id) on delete set null,
  contact_id      uuid references contacts(id) on delete set null,
  data            jsonb default '{}'::jsonb,
  source          text,
  submitted_at    timestamptz default now()
);

-- ─── ACTIVITY LOG ─────────────────────────────────────────────────────────────
create table if not exists activity_log (
  id              uuid primary key default uuid_generate_v4(),
  organisation_id uuid not null references organisations(id) on delete cascade,
  user_id         uuid references users(id) on delete set null,
  entity_type     text,
  entity_id       uuid,
  action          text not null,
  metadata        jsonb default '{}'::jsonb,
  created_at      timestamptz default now()
);

-- ─── INDEXES ──────────────────────────────────────────────────────────────────
create index if not exists contacts_org_idx on contacts(organisation_id);
create index if not exists contacts_phone_idx on contacts(phone);
create index if not exists deals_org_idx on deals(organisation_id);
create index if not exists deals_contact_idx on deals(contact_id);
create index if not exists deals_stage_idx on deals(stage);
create index if not exists conversations_org_idx on conversations(organisation_id);
create index if not exists conversations_contact_idx on conversations(contact_id);
create index if not exists bookings_org_idx on bookings(organisation_id);
create index if not exists bookings_starts_at_idx on bookings(starts_at);
create index if not exists activity_log_org_idx on activity_log(organisation_id);
create index if not exists activity_log_created_at_idx on activity_log(created_at desc);

-- ─── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
alter table organisations    enable row level security;
alter table users            enable row level security;
alter table contacts         enable row level security;
alter table deals            enable row level security;
alter table conversations    enable row level security;
alter table services         enable row level security;
alter table bookings         enable row level security;
alter table automations      enable row level security;
alter table forms            enable row level security;
alter table form_submissions enable row level security;
alter table activity_log     enable row level security;

-- Helper function: get user's organisation_id
create or replace function get_org_id()
returns uuid
language sql stable
as $$
  select organisation_id from users where id = auth.uid() limit 1;
$$;

-- RLS policies (tenant isolation)
do $$
declare
  t text;
begin
  foreach t in array array['contacts','deals','conversations','services','bookings','automations','forms','form_submissions','activity_log']
  loop
    execute format('
      drop policy if exists "%s_select" on %s;
      create policy "%s_select" on %s for select using (organisation_id = get_org_id());
      drop policy if exists "%s_insert" on %s;
      create policy "%s_insert" on %s for insert with check (organisation_id = get_org_id());
      drop policy if exists "%s_update" on %s;
      create policy "%s_update" on %s for update using (organisation_id = get_org_id());
      drop policy if exists "%s_delete" on %s;
      create policy "%s_delete" on %s for delete using (organisation_id = get_org_id());
    ', t, t, t, t, t, t, t, t, t, t, t, t, t, t, t, t);
  end loop;
end;
$$;

-- Users table policies
drop policy if exists "users_select" on users;
create policy "users_select" on users for select using (organisation_id = get_org_id());
drop policy if exists "users_insert" on users;
create policy "users_insert" on users for insert with check (true); -- allowed by service role on signup
drop policy if exists "users_update" on users;
create policy "users_update" on users for update using (id = auth.uid() or organisation_id = get_org_id());

-- Organisations policies
drop policy if exists "orgs_select" on organisations;
create policy "orgs_select" on organisations for select using (id = get_org_id());
drop policy if exists "orgs_update" on organisations;
create policy "orgs_update" on organisations for update using (id = get_org_id());
drop policy if exists "orgs_insert" on organisations;
create policy "orgs_insert" on organisations for insert with check (true); -- service role on signup

-- ─── AUTO-CREATE USER ON AUTH SIGNUP ──────────────────────────────────────────
-- (Users are also created explicitly via the API, this is a safety net)
create or replace function handle_new_auth_user()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Only insert if not already exists (API route may have already created it)
  insert into public.users (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'owner'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_auth_user();
