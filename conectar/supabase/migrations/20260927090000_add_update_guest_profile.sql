create or replace function public.update_guest_profile(
  p_event_id uuid,
  p_profile_id uuid,
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
returns void
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_valid_offer_count integer;
  v_valid_target_count integer;
begin
  if not exists (
    select 1 from public.event_participants where event_id = p_event_id and profile_id = p_profile_id
  ) then
    raise exception 'Profile is not a participant in this event';
  end if;

  select count(*) into v_valid_offer_count
  from public.tags
  where id = any(p_offer_tag_ids) and is_active and category is distinct from 'interesse';

  select count(*) into v_valid_target_count
  from public.tags
  where id = any(p_target_tag_ids) and is_active and category = 'segmento';

  if cardinality(p_offer_tag_ids) <> v_valid_offer_count
    or cardinality(p_target_tag_ids) <> v_valid_target_count then
    raise exception 'Invalid tag selection';
  end if;

  update public.profiles
  set
    profession = p_profession,
    company = nullif(p_company, ''),
    segment = p_segment,
    city = nullif(p_city, ''),
    what_i_do = p_what_i_do,
    what_i_offer = p_what_i_offer,
    target_audience = p_target_audience,
    whatsapp_phone = nullif(p_whatsapp_phone, ''),
    linkedin_url = nullif(p_linkedin_url, ''),
    instagram_url = nullif(p_instagram_url, '')
  where id = p_profile_id and is_active;

  if not found then
    raise exception 'Profile is not active';
  end if;

  delete from public.profile_tags where profile_id = p_profile_id and type in ('OFFER', 'TARGET');

  insert into public.profile_tags (profile_id, tag_id, type)
  select p_profile_id, tag_id, 'OFFER'
  from unnest(p_offer_tag_ids) as tag_id;

  insert into public.profile_tags (profile_id, tag_id, type)
  select p_profile_id, tag_id, 'TARGET'
  from unnest(p_target_tag_ids) as tag_id;

  insert into public.event_contact_preferences (
    event_id,
    profile_id,
    share_whatsapp,
    share_linkedin,
    share_instagram
  )
  values (
    p_event_id,
    p_profile_id,
    p_share_whatsapp,
    p_share_linkedin,
    p_share_instagram
  )
  on conflict (event_id, profile_id) do update set
    share_whatsapp = excluded.share_whatsapp,
    share_linkedin = excluded.share_linkedin,
    share_instagram = excluded.share_instagram,
    updated_at = now();
end;
$$;

comment on function public.update_guest_profile is 'Atualiza o perfil da sessao, tags e consentimentos em uma unica transacao.';
