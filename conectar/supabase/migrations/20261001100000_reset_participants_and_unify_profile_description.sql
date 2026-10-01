-- As fotos são removidas antes desta migração pelo script reset:profile-photos.
delete from public.event_participants;
delete from public.profiles;

alter table public.profiles
  add column what_i_do_and_offer text not null default '';

alter table public.profiles
  drop column what_i_do,
  drop column what_i_offer,
  drop column target_audience;

alter table public.profiles
  alter column what_i_do_and_offer drop default;

drop function public.create_guest_participant(
  uuid, text, text, text, text, text, text, text, text, text, text, text, text, text, uuid[], uuid[], boolean, boolean, boolean
);

create function public.create_guest_participant(
  p_event_id uuid,
  p_first_name text,
  p_last_name text,
  p_normalized_name text,
  p_profession text,
  p_company text,
  p_segment text,
  p_city text,
  p_what_i_do_and_offer text,
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
  if not exists (select 1 from public.events where id = p_event_id and status = 'OPEN') then
    raise exception 'Event is not open';
  end if;

  select count(*) into v_valid_offer_count from public.tags where id = any(p_offer_tag_ids) and is_active;
  select count(*) into v_valid_target_count from public.tags where id = any(p_target_tag_ids) and is_active and category = 'segmento';

  if cardinality(p_offer_tag_ids) <> v_valid_offer_count or cardinality(p_target_tag_ids) <> v_valid_target_count then
    raise exception 'Invalid tag selection';
  end if;

  insert into public.profiles (
    first_name, last_name, normalized_name, profession, company, segment, city,
    what_i_do_and_offer, whatsapp_phone, linkedin_url, instagram_url
  ) values (
    p_first_name, p_last_name, p_normalized_name, p_profession, nullif(p_company, ''), p_segment, nullif(p_city, ''),
    p_what_i_do_and_offer, nullif(p_whatsapp_phone, ''), nullif(p_linkedin_url, ''), nullif(p_instagram_url, '')
  ) returning id into v_profile_id;

  insert into public.profile_tags (profile_id, tag_id, type)
  select v_profile_id, tag_id, 'OFFER' from unnest(p_offer_tag_ids) as tag_id;

  insert into public.profile_tags (profile_id, tag_id, type)
  select v_profile_id, tag_id, 'TARGET' from unnest(p_target_tag_ids) as tag_id;

  perform public.check_in_event_participant(p_event_id, v_profile_id);

  insert into public.event_contact_preferences (
    event_id, profile_id, share_whatsapp, share_linkedin, share_instagram
  ) values (
    p_event_id, v_profile_id, p_share_whatsapp, p_share_linkedin, p_share_instagram
  );

  return v_profile_id;
end;
$$;

drop function public.update_guest_profile(
  uuid, uuid, text, text, text, text, text, text, text, text, text, text, uuid[], uuid[], boolean, boolean, boolean
);

create function public.update_guest_profile(
  p_event_id uuid,
  p_profile_id uuid,
  p_profession text,
  p_company text,
  p_segment text,
  p_city text,
  p_what_i_do_and_offer text,
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
  if not exists (select 1 from public.event_participants where event_id = p_event_id and profile_id = p_profile_id) then
    raise exception 'Profile is not a participant in this event';
  end if;

  select count(*) into v_valid_offer_count from public.tags where id = any(p_offer_tag_ids) and is_active;
  select count(*) into v_valid_target_count from public.tags where id = any(p_target_tag_ids) and is_active and category = 'segmento';

  if cardinality(p_offer_tag_ids) <> v_valid_offer_count or cardinality(p_target_tag_ids) <> v_valid_target_count then
    raise exception 'Invalid tag selection';
  end if;

  update public.profiles set
    profession = p_profession,
    company = nullif(p_company, ''),
    segment = p_segment,
    city = nullif(p_city, ''),
    what_i_do_and_offer = p_what_i_do_and_offer,
    whatsapp_phone = nullif(p_whatsapp_phone, ''),
    linkedin_url = nullif(p_linkedin_url, ''),
    instagram_url = nullif(p_instagram_url, '')
  where id = p_profile_id and is_active;

  if not found then
    raise exception 'Profile is not active';
  end if;

  delete from public.profile_tags where profile_id = p_profile_id and type in ('OFFER', 'TARGET');

  insert into public.profile_tags (profile_id, tag_id, type)
  select p_profile_id, tag_id, 'OFFER' from unnest(p_offer_tag_ids) as tag_id;

  insert into public.profile_tags (profile_id, tag_id, type)
  select p_profile_id, tag_id, 'TARGET' from unnest(p_target_tag_ids) as tag_id;

  insert into public.event_contact_preferences (
    event_id, profile_id, share_whatsapp, share_linkedin, share_instagram
  ) values (
    p_event_id, p_profile_id, p_share_whatsapp, p_share_linkedin, p_share_instagram
  ) on conflict (event_id, profile_id) do update set
    share_whatsapp = excluded.share_whatsapp,
    share_linkedin = excluded.share_linkedin,
    share_instagram = excluded.share_instagram,
    updated_at = now();
end;
$$;

insert into public.tags (name, slug, category) values
  ('Saúde e Bem-estar', 'saude-e-bem-estar', 'segmento'),
  ('Educação e Treinamentos', 'educacao-e-treinamentos', 'segmento'),
  ('Imobiliário', 'imobiliario', 'segmento'),
  ('Varejo e Comércio', 'varejo-e-comercio', 'segmento'),
  ('Gastronomia e Alimentação', 'gastronomia-e-alimentacao', 'segmento'),
  ('Turismo e Eventos', 'turismo-e-eventos', 'segmento'),
  ('Beleza e Estética', 'beleza-e-estetica', 'segmento'),
  ('Recursos Humanos', 'recursos-humanos', 'segmento'),
  ('Consultoria Empresarial', 'consultoria-empresarial', 'segmento'),
  ('Indústria e Manufatura', 'industria-e-manufatura', 'segmento'),
  ('Agronegócio', 'agronegocio', 'segmento'),
  ('Logística e Transportes', 'logistica-e-transportes', 'segmento'),
  ('Comunicação e Design', 'comunicacao-e-design', 'segmento'),
  ('Serviços Financeiros', 'servicos-financeiros', 'segmento'),
  ('Energia e Sustentabilidade', 'energia-e-sustentabilidade', 'segmento')
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  is_active = true;
