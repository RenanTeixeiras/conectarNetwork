-- Dados iniciais do evento real. A migration e idempotente para reexecucoes locais.

insert into public.tags (id, name, slug, category) values
  ('00000000-0000-4000-8000-000000000101', 'Tecnologia', 'tecnologia', 'segmento'),
  ('00000000-0000-4000-8000-000000000102', 'Automação', 'automacao', 'competência'),
  ('00000000-0000-4000-8000-000000000103', 'Dados', 'dados', 'competência'),
  ('00000000-0000-4000-8000-000000000104', 'Arquitetura', 'arquitetura', 'segmento'),
  ('00000000-0000-4000-8000-000000000105', 'Construção', 'construcao', 'segmento'),
  ('00000000-0000-4000-8000-000000000106', 'Marketing', 'marketing', 'segmento'),
  ('00000000-0000-4000-8000-000000000107', 'Gestão', 'gestao', 'competência'),
  ('00000000-0000-4000-8000-000000000108', 'Estratégia', 'estrategia', 'competência'),
  ('00000000-0000-4000-8000-000000000109', 'Finanças', 'financas', 'segmento'),
  ('00000000-0000-4000-8000-000000000110', 'Jurídico', 'juridico', 'segmento'),
  ('00000000-0000-4000-8000-000000000111', 'Empreendedorismo', 'empreendedorismo', 'interesse'),
  ('00000000-0000-4000-8000-000000000112', 'Parcerias', 'parcerias', 'interesse')
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  is_active = true;

insert into public.events (name, slug, description, starts_at, timezone, status, venue_name)
values (
  'Primeiro encontro no La Pulperia',
  'primeiro-encontro-la-pulperia',
  'Primeiro encontro presencial do Conectar Network.',
  '2026-10-01 19:00:00-03',
  'America/Sao_Paulo',
  'OPEN',
  'LA PULPERIA'
)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  starts_at = excluded.starts_at,
  ends_at = null,
  timezone = excluded.timezone,
  status = excluded.status,
  venue_name = excluded.venue_name,
  updated_at = now();
