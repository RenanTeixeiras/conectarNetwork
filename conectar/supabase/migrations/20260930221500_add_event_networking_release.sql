alter table public.events
  add column networking_released boolean not null default false;

comment on column public.events.networking_released is 'Define se participantes podem acessar a lista de presentes, perfis públicos e oportunidades.';
