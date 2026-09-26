create or replace function public.check_in_event_participant(
  p_event_id uuid,
  p_profile_id uuid
)
returns public.event_participants
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_participant public.event_participants;
begin
  insert into public.event_participants (
    event_id,
    profile_id,
    status,
    checked_in_at,
    last_seen_at
  )
  values (
    p_event_id,
    p_profile_id,
    'CHECKED_IN',
    now(),
    now()
  )
  on conflict (event_id, profile_id) do update set
    status = 'CHECKED_IN',
    checked_in_at = coalesce(event_participants.checked_in_at, excluded.checked_in_at),
    checked_out_at = null,
    last_seen_at = excluded.last_seen_at,
    updated_at = now()
  returning * into v_participant;

  return v_participant;
end;
$$;

create or replace function public.create_guest_participant(
  p_event_id uuid,
  p_first_name text,
  p_last_name text,
  p_normalized_name text,
  p_profession text,
  p_company text,
  p_segment text,
  p_city text,
  p_what_i_do text,
  p_what_i_offer text,
  p_target_audience text,
  p_whatsapp_phone text,
  p_linkedin_url text,
  p_instagram_url text,
  p_offer_tag_ids uuid[],
  p_target_tag_ids uuid[],
  p_share_whatsapp boolean,
  p_share_linkedin boolean,
  p_share_instagram boolean
)
returns uuid
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_profile_id uuid;
  v_valid_offer_count integer;
  v_valid_target_count integer;
begin
  if not exists (
    select 1 from public.events where id = p_event_id and status = 'OPEN'
  ) then
    raise exception 'Event is not open';
  end if;

  select count(*) into v_valid_offer_count
  from public.tags
  where id = any(p_offer_tag_ids) and is_active;

  select count(*) into v_valid_target_count
  from public.tags
  where id = any(p_target_tag_ids) and is_active;

  if cardinality(p_offer_tag_ids) <> v_valid_offer_count
    or cardinality(p_target_tag_ids) <> v_valid_target_count then
    raise exception 'Invalid tag selection';
  end if;

  insert into public.profiles (
    first_name,
    last_name,
    normalized_name,
    profession,
    company,
    segment,
    city,
    what_i_do,
    what_i_offer,
    target_audience,
    whatsapp_phone,
    linkedin_url,
    instagram_url
  )
  values (
    p_first_name,
    p_last_name,
    p_normalized_name,
    p_profession,
    nullif(p_company, ''),
    p_segment,
    nullif(p_city, ''),
    p_what_i_do,
    p_what_i_offer,
    p_target_audience,
    nullif(p_whatsapp_phone, ''),
    nullif(p_linkedin_url, ''),
    nullif(p_instagram_url, '')
  )
  returning id into v_profile_id;

  insert into public.profile_tags (profile_id, tag_id, type)
  select v_profile_id, tag_id, 'OFFER'
  from unnest(p_offer_tag_ids) as tag_id;

  insert into public.profile_tags (profile_id, tag_id, type)
  select v_profile_id, tag_id, 'TARGET'
  from unnest(p_target_tag_ids) as tag_id;

  perform public.check_in_event_participant(p_event_id, v_profile_id);

  insert into public.event_contact_preferences (
    event_id,
    profile_id,
    share_whatsapp,
    share_linkedin,
    share_instagram
  )
  values (
    p_event_id,
    v_profile_id,
    p_share_whatsapp,
    p_share_linkedin,
    p_share_instagram
  );

  return v_profile_id;
end;
$$;

comment on function public.check_in_event_participant is 'Cria ou atualiza o check-in de forma idempotente.';
comment on function public.create_guest_participant is 'Cria perfil, tags, consentimentos e check-in em uma unica transacao.';
