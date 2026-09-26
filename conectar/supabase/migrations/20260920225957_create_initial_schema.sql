create extension if not exists pgcrypto;

create type public.event_status as enum ('DRAFT', 'OPEN', 'CLOSED', 'ARCHIVED');
create type public.participant_status as enum ('REGISTERED', 'CHECKED_IN', 'LEFT', 'CANCELLED');
create type public.profile_tag_type as enum ('OFFER', 'TARGET', 'INTEREST');
create type public.admin_role as enum ('ADMIN');

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  first_name varchar(80) not null,
  last_name varchar(120) not null,
  normalized_name varchar(240) not null,
  profession varchar(160),
  company varchar(160),
  segment varchar(120),
  city varchar(120),
  bio text,
  what_i_do text,
  what_i_offer text,
  target_audience text,
  whatsapp_phone varchar(32),
  linkedin_url text,
  instagram_url text,
  photo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_first_name_not_blank check (length(trim(first_name)) > 0),
  constraint profiles_last_name_not_blank check (length(trim(last_name)) > 0),
  constraint profiles_normalized_name_not_blank check (length(trim(normalized_name)) > 0)
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  name varchar(160) not null,
  slug varchar(160) not null unique,
  description text,
  starts_at timestamptz,
  ends_at timestamptz,
  timezone varchar(64) not null default 'America/Sao_Paulo',
  status public.event_status not null default 'DRAFT',
  access_code_hash text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint events_slug_not_blank check (length(trim(slug)) > 0),
  constraint events_valid_period check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create table public.event_participants (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete restrict,
  status public.participant_status not null default 'REGISTERED',
  checked_in_at timestamptz,
  checked_out_at timestamptz,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint event_participants_unique_profile unique (event_id, profile_id),
  constraint event_participants_check_in_status check (
    (status = 'CHECKED_IN' and checked_in_at is not null) or status <> 'CHECKED_IN'
  )
);

create table public.tags (
  id uuid primary key default gen_random_uuid(),
  name varchar(80) not null,
  slug varchar(100) not null unique,
  category varchar(80),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  constraint tags_name_not_blank check (length(trim(name)) > 0),
  constraint tags_slug_not_blank check (length(trim(slug)) > 0)
);

create table public.profile_tags (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  tag_id uuid not null references public.tags(id) on delete restrict,
  type public.profile_tag_type not null,
  created_at timestamptz not null default now(),
  constraint profile_tags_unique_assignment unique (profile_id, tag_id, type)
);

create table public.event_contact_preferences (
  event_id uuid not null references public.events(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  share_whatsapp boolean not null default false,
  share_linkedin boolean not null default false,
  share_instagram boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (event_id, profile_id),
  constraint event_contact_preferences_participant_fk foreign key (event_id, profile_id)
    references public.event_participants(event_id, profile_id) on delete cascade
);

create table public.admin_users (
  auth_user_id uuid primary key references auth.users(id) on delete cascade,
  username varchar(40) not null unique,
  role public.admin_role not null default 'ADMIN',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint admin_users_username_format check (username ~ '^[a-z0-9][a-z0-9_-]{1,39}$')
);

create index profiles_normalized_name_idx on public.profiles(normalized_name);
create index profiles_segment_idx on public.profiles(segment);
create index event_participants_event_status_idx on public.event_participants(event_id, status);
create index event_participants_profile_idx on public.event_participants(profile_id);
create index profile_tags_profile_idx on public.profile_tags(profile_id);
create index profile_tags_tag_type_idx on public.profile_tags(tag_id, type);
create index events_slug_idx on public.events(slug);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger events_set_updated_at before update on public.events for each row execute function public.set_updated_at();
create trigger event_participants_set_updated_at before update on public.event_participants for each row execute function public.set_updated_at();
create trigger event_contact_preferences_set_updated_at before update on public.event_contact_preferences for each row execute function public.set_updated_at();
create trigger admin_users_set_updated_at before update on public.admin_users for each row execute function public.set_updated_at();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('profile-photos', 'profile-photos', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.event_participants enable row level security;
alter table public.tags enable row level security;
alter table public.profile_tags enable row level security;
alter table public.event_contact_preferences enable row level security;
alter table public.admin_users enable row level security;

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.events from anon, authenticated;
revoke all on table public.event_participants from anon, authenticated;
revoke all on table public.tags from anon, authenticated;
revoke all on table public.profile_tags from anon, authenticated;
revoke all on table public.event_contact_preferences from anon, authenticated;
revoke all on table public.admin_users from anon, authenticated;
revoke all on table storage.objects from anon, authenticated;

comment on table public.event_contact_preferences is 'Consentimento de contatos separado por participante e evento.';
comment on table public.admin_users is 'Administradores autenticados por Supabase Auth e identificados por nome de usuário interno.';
