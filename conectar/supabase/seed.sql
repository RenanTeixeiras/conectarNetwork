-- Dados exclusivos para demonstração. O script pode ser executado repetidamente.

insert into public.events (id, name, slug, description, starts_at, ends_at, timezone, status)
values (
  '00000000-0000-4000-8000-000000000001',
  'Demonstração Conectar',
  'demonstracao-conectar',
  'Ambiente com participantes fictícios para apresentação do produto.',
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
  ('00000000-0000-4000-8000-000000000112', 'Parcerias', 'parcerias', 'interesse')
on conflict (slug) do update set name = excluded.name, category = excluded.category, is_active = true;

insert into public.profiles (id, first_name, last_name, normalized_name, profession, company, segment, city, bio, what_i_do, what_i_offer, target_audience) values
  ('00000000-0000-4000-8000-000000000201', 'Renan', 'Teixeira', 'renan teixeira', 'Desenvolvedor de Software', 'NG7', 'Tecnologia', 'Salvador - BA', 'Crio produtos digitais que tornam processos mais simples e úteis.', 'Desenvolvo sistemas, integrações, automações e produtos digitais.', 'Software, automação e soluções digitais para empresas.', 'Empresas que precisam organizar processos, vendas e atendimento.'),
  ('00000000-0000-4000-8000-000000000202', 'Marina', 'Souza', 'marina souza', 'Arquiteta', 'Santos Arquitetura', 'Arquitetura', 'Salvador - BA', 'Arquiteta especializada em projetos residenciais e comerciais.', 'Desenvolvo projetos arquitetônicos, interiores e acompanho obras.', 'Arquitetura, reformas e planejamento de espaços.', 'Pessoas e empresas que precisam projetar, reformar ou organizar espaços.'),
  ('00000000-0000-4000-8000-000000000203', 'Carlos', 'Mendes', 'carlos mendes', 'Consultor Empresarial', 'CM Consultoria', 'Gestão', 'Salvador - BA', 'Ajudo empresas a organizarem decisões, processos e crescimento.', 'Atuo com estratégia, gestão e estruturação comercial.', 'Planejamento, gestão e desenvolvimento de negócios.', 'Empresas em crescimento que precisam de estratégia e organização comercial.'),
  ('00000000-0000-4000-8000-000000000204', 'Ana', 'Lima', 'ana lima', 'Marketing', 'Lima Marketing', 'Marketing', 'Salvador - BA', 'Estratégia de marca e comunicação para negócios em crescimento.', 'Desenho posicionamento, campanhas e conteúdo para empresas.', 'Marketing, marca e comunicação estratégica.', 'Empresas que querem fortalecer marca, campanhas e vendas.'),
  ('00000000-0000-4000-8000-000000000205', 'João', 'Santos', 'joao santos', 'Contador', 'JS Contabilidade', 'Finanças', 'Salvador - BA', 'Contabilidade próxima para negócios que querem crescer com segurança.', 'Cuido da estrutura contábil e financeira de empresas.', 'Contabilidade, planejamento tributário e organização financeira.', 'Empreendedores e empresas que precisam organizar finanças e contabilidade.'),
  ('00000000-0000-4000-8000-000000000206', 'Beatriz', 'Costa', 'beatriz costa', 'Advogada', 'Costa & Associados', 'Jurídico', 'Salvador - BA', 'Advogada com foco em contratos e relações empresariais.', 'Atuo preventivamente em contratos e decisões empresariais.', 'Jurídico, contratos e estruturação societária.', 'Empresas que precisam estruturar contratos e decisões societárias.'),
  ('00000000-0000-4000-8000-000000000207', 'Rafael', 'Lima', 'rafael lima', 'Empreendedor', 'RL Negócios', 'Empreendedorismo', 'Salvador - BA', 'Empreendedor interessado em construir negócios sustentáveis.', 'Desenvolvo e acompanho negócios em fase de crescimento.', 'Parcerias, visão comercial e novos negócios.', 'Pessoas e empresas que buscam novos negócios, parceiros e crescimento comercial.')
on conflict (id) do update set
  first_name = excluded.first_name,
  last_name = excluded.last_name,
  normalized_name = excluded.normalized_name,
  profession = excluded.profession,
  company = excluded.company,
  segment = excluded.segment,
  city = excluded.city,
  bio = excluded.bio,
  what_i_do = excluded.what_i_do,
  what_i_offer = excluded.what_i_offer,
  target_audience = excluded.target_audience,
  is_active = true,
  updated_at = now();

insert into public.event_participants (event_id, profile_id, status, checked_in_at, last_seen_at) values
  ('00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000201', 'CHECKED_IN', now(), now()),
  ('00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000202', 'CHECKED_IN', now(), now()),
  ('00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000203', 'CHECKED_IN', now(), now()),
  ('00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000204', 'CHECKED_IN', now(), now()),
  ('00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000205', 'CHECKED_IN', now(), now()),
  ('00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000206', 'CHECKED_IN', now(), now()),
  ('00000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000207', 'CHECKED_IN', now(), now())
on conflict (event_id, profile_id) do update set status = excluded.status, last_seen_at = now(), updated_at = now();

insert into public.profile_tags (profile_id, tag_id, type) values
  ('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000101', 'OFFER'),
  ('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000102', 'OFFER'),
  ('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000103', 'OFFER'),
  ('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000111', 'TARGET'),
  ('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000112', 'TARGET'),
  ('00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000104', 'OFFER'),
  ('00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000105', 'OFFER'),
  ('00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000101', 'TARGET'),
  ('00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000106', 'TARGET'),
  ('00000000-0000-4000-8000-000000000203', '00000000-0000-4000-8000-000000000107', 'OFFER'),
  ('00000000-0000-4000-8000-000000000203', '00000000-0000-4000-8000-000000000108', 'OFFER'),
  ('00000000-0000-4000-8000-000000000203', '00000000-0000-4000-8000-000000000101', 'TARGET'),
  ('00000000-0000-4000-8000-000000000203', '00000000-0000-4000-8000-000000000102', 'TARGET'),
  ('00000000-0000-4000-8000-000000000204', '00000000-0000-4000-8000-000000000106', 'OFFER'),
  ('00000000-0000-4000-8000-000000000204', '00000000-0000-4000-8000-000000000101', 'TARGET'),
  ('00000000-0000-4000-8000-000000000205', '00000000-0000-4000-8000-000000000109', 'OFFER'),
  ('00000000-0000-4000-8000-000000000205', '00000000-0000-4000-8000-000000000107', 'OFFER'),
  ('00000000-0000-4000-8000-000000000205', '00000000-0000-4000-8000-000000000111', 'TARGET'),
  ('00000000-0000-4000-8000-000000000206', '00000000-0000-4000-8000-000000000110', 'OFFER'),
  ('00000000-0000-4000-8000-000000000206', '00000000-0000-4000-8000-000000000101', 'TARGET'),
  ('00000000-0000-4000-8000-000000000207', '00000000-0000-4000-8000-000000000111', 'OFFER'),
  ('00000000-0000-4000-8000-000000000207', '00000000-0000-4000-8000-000000000112', 'OFFER'),
  ('00000000-0000-4000-8000-000000000207', '00000000-0000-4000-8000-000000000101', 'TARGET'),
  ('00000000-0000-4000-8000-000000000207', '00000000-0000-4000-8000-000000000107', 'TARGET')
on conflict (profile_id, tag_id, type) do nothing;

insert into public.event_contact_preferences (event_id, profile_id, share_whatsapp, share_linkedin, share_instagram)
select '00000000-0000-4000-8000-000000000001', id, false, false, false from public.profiles
on conflict (event_id, profile_id) do update set
  share_whatsapp = false,
  share_linkedin = false,
  share_instagram = false,
  updated_at = now();
