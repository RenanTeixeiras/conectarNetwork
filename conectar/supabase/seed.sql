-- Dados exclusivos para demonstração. O script pode ser executado repetidamente.

insert into public.events (id, name, slug, description, starts_at, ends_at, timezone, status)
values (
  '00000000-0000-4000-8000-000000000001',
  'Demonstração Conectar',
  'demonstracao-conectar',
  'Ambiente sem participantes para apresentação do produto.',
  '2026-10-01 19:00:00-03',
  '2026-10-01 22:00:00-03',
  'America/Sao_Paulo',
  'OPEN'
)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  status = excluded.status,
  updated_at = now();

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
  ('00000000-0000-4000-8000-000000000112', 'Parcerias', 'parcerias', 'interesse'),
  ('00000000-0000-4000-8000-000000000113', 'Saúde e Bem-estar', 'saude-e-bem-estar', 'segmento'),
  ('00000000-0000-4000-8000-000000000114', 'Educação e Treinamentos', 'educacao-e-treinamentos', 'segmento'),
  ('00000000-0000-4000-8000-000000000115', 'Imobiliário', 'imobiliario', 'segmento'),
  ('00000000-0000-4000-8000-000000000116', 'Varejo e Comércio', 'varejo-e-comercio', 'segmento'),
  ('00000000-0000-4000-8000-000000000117', 'Gastronomia e Alimentação', 'gastronomia-e-alimentacao', 'segmento'),
  ('00000000-0000-4000-8000-000000000118', 'Turismo e Eventos', 'turismo-e-eventos', 'segmento'),
  ('00000000-0000-4000-8000-000000000119', 'Beleza e Estética', 'beleza-e-estetica', 'segmento'),
  ('00000000-0000-4000-8000-000000000120', 'Recursos Humanos', 'recursos-humanos', 'segmento'),
  ('00000000-0000-4000-8000-000000000121', 'Consultoria Empresarial', 'consultoria-empresarial', 'segmento'),
  ('00000000-0000-4000-8000-000000000122', 'Indústria e Manufatura', 'industria-e-manufatura', 'segmento'),
  ('00000000-0000-4000-8000-000000000123', 'Agronegócio', 'agronegocio', 'segmento'),
  ('00000000-0000-4000-8000-000000000124', 'Logística e Transportes', 'logistica-e-transportes', 'segmento'),
  ('00000000-0000-4000-8000-000000000125', 'Comunicação e Design', 'comunicacao-e-design', 'segmento'),
  ('00000000-0000-4000-8000-000000000126', 'Serviços Financeiros', 'servicos-financeiros', 'segmento'),
  ('00000000-0000-4000-8000-000000000127', 'Energia e Sustentabilidade', 'energia-e-sustentabilidade', 'segmento')
on conflict (slug) do update set name = excluded.name, category = excluded.category, is_active = true;
