# CONECTAR — Especificação Completa do Produto, Fluxos, Arquitetura e MVP

**Produto:** Conectar Network  
**Documento:** Especificação funcional e técnica do MVP  
**Versão:** 1.0  
**Status:** Base aprovada para implementação  
**Plataforma:** Web mobile-first  
**Stack principal:** Next.js + TypeScript + Supabase/PostgreSQL + Vercel  
**Evento inicial:** Jantar presencial do Conectar  
**Público inicial:** Convidados e organizadores do grupo  
**Documento visual complementar:** `CONECTAR_DESIGN_SPEC.md`

> **Atualização v1.1 — Oportunidades comerciais:** esta atualização substitui as regras de matching bidirecional deste documento. O participante informa o que oferece e quem ajuda ou atende; o produto recomenda participantes presentes que podem ser potenciais clientes. A navegação e a rota passam a se chamar **Oportunidades** e `/e/[eventSlug]/oportunidades`. No modelo de tags, `TARGET` substitui `SEEK` no MVP. O campo de perfil é `target_audience`, não `what_i_seek`.

---

# 1. Objetivo deste documento

Este documento registra, em nível funcional e técnico, as decisões já definidas para o MVP do **Conectar**.

A intenção é que ele sirva como fonte de verdade para:

- implementação;
- organização do repositório;
- banco de dados;
- regras de negócio;
- experiência do usuário;
- matching;
- check-in;
- segurança;
- deployment;
- testes;
- manutenção;
- evolução futura.

O documento visual e de interface foi separado em `CONECTAR_DESIGN_SPEC.md`.

Este arquivo concentra principalmente:

- visão do produto;
- proposta de valor;
- escopo do MVP;
- papéis de usuário;
- fluxos;
- requisitos;
- arquitetura;
- modelo de dados;
- autenticação e sessão;
- regras de presença;
- algoritmo de matching;
- rotas;
- serviços;
- segurança;
- operações;
- qualidade;
- roadmap.

---

# 2. Visão do produto

O Conectar é uma plataforma de networking presencial criada para facilitar a descoberta de pessoas relevantes dentro de um encontro, grupo ou comunidade.

O problema central é simples:

> Em um evento com várias pessoas interessantes, o convidado normalmente não sabe quem está presente, o que cada pessoa faz e com quem deveria conversar.

O Conectar resolve isso criando uma camada digital sobre o encontro presencial.

O sistema deverá permitir que cada participante:

1. entre rapidamente no evento;
2. diga quem é;
3. informe o que faz;
4. informe o que oferece;
5. informe o que procura;
6. compartilhe seus canais profissionais;
7. veja quem está presente;
8. abra o perfil de qualquer participante;
9. acesse seus links sociais;
10. receba sugestões de pessoas com quem pode fazer sentido conversar.

O sistema não pretende substituir o encontro.

Ele existe para melhorar o encontro.

---

# 3. Proposta de valor

A proposta central pode ser resumida em:

> **Pessoas certas em conversas que geram futuro.**

Do ponto de vista funcional:

> O Conectar ajuda o participante a descobrir rapidamente quem está presente e com quem vale a pena conversar.

Do ponto de vista organizacional:

> O Conectar transforma uma lista de convidados em uma rede profissional organizada, reutilizável e inteligente.

---

# 4. Objetivos do MVP

O MVP deve validar cinco hipóteses principais.

## 4.1. Hipótese 1 — Pessoas usarão o sistema durante um evento

O participante deve conseguir acessar pelo celular e completar o fluxo sem instrução individual.

## 4.2. Hipótese 2 — A lista de presentes gera valor

O participante deve considerar útil poder visualizar:

- quem está no local;
- profissão;
- empresa;
- segmento;
- perfil;
- redes sociais.

## 4.3. Hipótese 3 — Perfis profissionais melhoram networking

Informações como:

- o que faço;
- o que ofereço;
- o que procuro;

devem ajudar a iniciar conversas.

## 4.4. Hipótese 4 — Sugestões de conexões são úteis

O sistema deve conseguir sugerir algumas pessoas relevantes com base nas informações cadastradas.

## 4.5. Hipótese 5 — O produto pode ser reutilizado em outros encontros

Embora o MVP seja lançado para um jantar específico, a arquitetura deve permitir novos eventos sem recriar os perfis do zero.

---

# 5. Princípios de produto

## 5.1. O presencial é o produto principal

O software é um facilitador.

O objetivo final não é manter pessoas olhando para o celular.

O objetivo é fazer com que elas encontrem alguém e guardem o celular.

## 5.2. Baixíssimo atrito

O convidado está em um jantar.

Não devemos exigir:

- senha;
- confirmação por e-mail;
- tutorial longo;
- cadastro burocrático;
- dezenas de campos;
- instalação de aplicativo.

## 5.3. Mobile first

A principal experiência acontece em smartphone.

## 5.4. Informação antes de gamificação

Não haverá inicialmente:

- pontos;
- ranking;
- streak;
- medalhas;
- competição;
- quantidade de conexões como status social.

## 5.5. Privacidade clara

As pessoas devem saber quais informações ficam visíveis aos demais participantes.

## 5.6. Simplicidade técnica

A arquitetura inicial deve ser pequena o suficiente para:

- construir rápido;
- testar rápido;
- implantar rápido;
- entender rápido;
- corrigir rápido.

---

# 6. Escopo do MVP

## 6.1. Funcionalidades obrigatórias

O MVP deverá incluir:

- acesso por QR Code ou link;
- identificação por nome e sobrenome;
- ausência de senha para convidados;
- criação automática de perfil quando não existir;
- onboarding de primeiro acesso;
- perfil profissional;
- empresa;
- profissão/cargo;
- segmento;
- cidade;
- descrição profissional;
- "o que faço";
- "o que ofereço";
- "o que procuro";
- tags;
- WhatsApp;
- LinkedIn;
- Instagram;
- consentimento para exibição dos contatos;
- check-in automático ao entrar;
- lista de participantes presentes;
- busca de participantes;
- perfil público do participante;
- links para redes sociais;
- sugestões de conexões;
- score de compatibilidade;
- explicação simples do motivo da sugestão;
- tela "Meu perfil";
- edição do próprio perfil;
- sessão persistente durante o evento;
- logout;
- painel administrativo mínimo ou ferramentas equivalentes para organização.

## 6.2. Funcionalidades desejáveis, mas não críticas

Podem entrar se houver tempo:

- filtro por segmento;
- foto de perfil;
- upload de foto;
- "quero conversar";
- check-out;
- exportação CSV;
- status "presente agora";
- analytics básicos.

## 6.3. Fora do MVP

Não implementar inicialmente:

- aplicativo nativo;
- chat interno;
- mensagens privadas;
- notificações push;
- pagamento;
- assinatura;
- IA generativa;
- chatbot;
- reconhecimento facial;
- login social;
- login por Google;
- login por LinkedIn;
- WebSocket obrigatório;
- Redis;
- filas;
- microsserviços;
- Kafka;
- Elasticsearch;
- ranking de usuários;
- stories;
- feed social;
- comentários;
- curtidas;
- grupos internos;
- videoconferência.

---

# 7. Papéis do sistema

Existem inicialmente três conceitos de papel.

## 7.1. Convidado

Pessoa participante do evento.

Pode:

- entrar pelo nome;
- completar perfil;
- visualizar presentes;
- pesquisar pessoas;
- visualizar perfis;
- abrir redes sociais;
- visualizar sugestões;
- editar o próprio perfil;
- sair da sessão.

Não pode:

- editar perfil de terceiros;
- visualizar dados privados;
- acessar admin;
- cadastrar evento;
- exportar base completa.

## 7.2. Administrador

Organizador autorizado.

Pode:

- acessar painel protegido;
- criar e editar evento;
- visualizar participantes;
- adicionar participante;
- editar participante;
- remover participante do evento;
- consultar check-ins;
- corrigir dados;
- gerenciar tags;
- exportar dados;
- acompanhar operação.

Admin usa autenticação real.

## 7.3. Participante cadastrado, mas ausente

É um perfil existente que não realizou check-in no evento atual.

Ele:

- existe no banco;
- pode estar vinculado ao evento;
- não aparece na lista "Presentes";
- pode ser visualizado pelo admin;
- não deve entrar em sugestões baseadas em presença, salvo regra futura.

---

# 8. Conceitos de domínio

## 8.1. Profile

Representa uma pessoa.

Um Profile independe de um evento específico.

Exemplo:

> Renan Teixeira possui um único profile.

Esse profile pode participar de:

- jantar de outubro;
- jantar de novembro;
- encontro de dezembro.

## 8.2. Event

Representa um encontro.

Exemplo:

> 1º Jantar Conectar.

## 8.3. Event Participant

Relaciona um Profile a um Event.

Guarda informações como:

- inscrição;
- presença;
- horário do check-in;
- horário de saída;
- status.

## 8.4. Tag

Representa um conceito estruturado.

Exemplos:

- Tecnologia;
- Automação;
- Arquitetura;
- Marketing;
- Construção;
- Jurídico;
- Dados;
- Gestão.

## 8.5. Profile Tag

Relaciona perfil e tag com um propósito.

Tipos:

- `OFFER`;
- `SEEK`;
- `INTEREST`.

## 8.6. Match

É uma recomendação calculada entre dois perfis.

No MVP, não precisa ser persistida.

Pode ser calculada sob demanda.

---

# 9. Fluxo completo do convidado

O fluxo principal será:

```text
QR Code
   ↓
Evento
   ↓
Nome + Sobrenome
   ↓
Perfil existente?
   ├─ SIM → criar sessão → check-in → Presentes
   └─ NÃO → onboarding → criar perfil → check-in → Presentes
```

Depois:

```text
Presentes
   ├─ pesquisar
   ├─ abrir perfil
   ├─ abrir WhatsApp
   ├─ abrir LinkedIn
   └─ abrir Instagram

Conexões
   ├─ visualizar score
   ├─ visualizar motivo
   └─ abrir perfil

Meu perfil
   └─ editar dados
```

---

# 10. Entrada pelo evento

## 10.1. Origem

O participante provavelmente chegará por:

- QR Code impresso;
- QR Code em televisão;
- link enviado por WhatsApp;
- link compartilhado pelo organizador.

## 10.2. URL conceitual

```text
/e/jantar-conectar-01
```

Opcionalmente com token:

```text
/e/jantar-conectar-01?access=ABC123
```

## 10.3. Validação do evento

Antes de mostrar o login, o servidor deve validar:

- evento existe;
- evento está ativo;
- evento aceita entrada;
- token do evento, se exigido, é válido.

## 10.4. Evento fechado

Se encerrado:

> Este encontro já foi encerrado.

## 10.5. Evento futuro

Se ainda não estiver liberado:

> O acesso a este encontro ainda não foi liberado.

---

# 11. Login de convidado

## 11.1. Decisão

O convidado não terá senha no MVP.

Entrada:

- nome;
- sobrenome.

## 11.2. Motivo

Reduzir atrito em contexto presencial.

## 11.3. Importante

Nome + sobrenome **não constitui autenticação forte**.

É um mecanismo de identificação simples.

Por isso:

- nenhum dado altamente sensível deve ficar disponível;
- admin não utiliza esse mecanismo;
- sessão deve ser assinada pelo servidor;
- ações administrativas ficam separadas.

---

# 12. Normalização do nome

Antes da busca, o sistema deve normalizar o texto.

Exemplo:

Entrada:

```text
  RENAN   Teixeira
```

Forma normalizada:

```text
renan teixeira
```

## 12.1. Regras recomendadas

- trim;
- reduzir espaços repetidos;
- lowercase;
- opcionalmente remover acentos apenas para busca;
- manter nome original separado para exibição.

Exemplos equivalentes para busca:

```text
João Silva
joao silva
JOÃO SILVA
```

---

# 13. Busca do perfil no login

O servidor procura profile compatível com:

- first_name;
- last_name;
- normalized_name.

## 13.1. Nenhum resultado

Levar para onboarding.

Pré-preencher:

- nome;
- sobrenome.

## 13.2. Um resultado

Entrar diretamente.

## 13.3. Múltiplos resultados

Exibir identificação adicional.

Exemplo:

```text
Encontramos mais de um João Silva.

Qual é você?

João Silva
Contador
JS Contabilidade

João Silva
Arquiteto
Studio JS
```

O usuário escolhe.

## 13.4. Risco residual

Uma pessoa pode selecionar outra.

É tolerado no MVP por decisão de produto.

---

# 14. Sessão do convidado

Após identificação, o servidor cria sessão.

## 14.1. Cookie

Cookie:

- HttpOnly;
- Secure em produção;
- SameSite=Lax;
- path `/`;
- expiração controlada.

## 14.2. Conteúdo conceitual

```json
{
  "profileId": "uuid",
  "eventId": "uuid",
  "sessionVersion": 1
}
```

## 14.3. Assinatura

Cookie deve ser assinado ou criptografado.

Nunca confiar em IDs vindos diretamente do cliente.

## 14.4. Duração

Sugestão:

- 12 horas;
- 24 horas;
- ou duração do evento + margem.

Para comunidade futura, sessão pode ser mais longa.

## 14.5. Logout

Ao sair:

- apagar cookie;
- não deletar profile;
- não apagar check-in automaticamente, salvo regra explícita.

---

# 15. Onboarding

Novo participante deverá completar o perfil.

## 15.1. Campos mínimos

Obrigatórios:

- nome;
- sobrenome;
- profissão/cargo;
- segmento;
- o que faz;
- o que oferece;
- o que procura.

Recomendados:

- empresa;
- cidade.

Opcionais:

- foto;
- WhatsApp;
- LinkedIn;
- Instagram.

## 15.2. Consentimento

Deve existir consentimento claro para dados de contato.

Exemplo:

> Autorizo que meus dados de contato sejam exibidos aos participantes deste encontro.

## 15.3. Tags

O usuário deve selecionar tags estruturadas.

### Offer

> Posso ajudar com...

### Seek

> Estou procurando...

### Interest

> Tenho interesse em...

Interests podem ser opcionais no primeiro release.

---

# 16. Check-in

## 16.1. Regra principal

O login de convidado funciona também como check-in.

Após a sessão ser criada:

```text
event_participant.status = CHECKED_IN
event_participant.checked_in_at = now()
```

## 16.2. Se vínculo não existir

Criar `event_participant`.

## 16.3. Se já existir como REGISTERED

Atualizar para `CHECKED_IN`.

## 16.4. Se já estiver CHECKED_IN

Não criar duplicata.

Manter check-in original ou atualizar `last_seen_at`.

## 16.5. Idempotência

Entrar duas vezes não pode criar duas participações.

Constraint:

```text
UNIQUE(event_id, profile_id)
```

---

# 17. Lista de presentes

## 17.1. Definição de presente

É considerado presente quem possui:

```text
event_id = evento atual
status = CHECKED_IN
```

## 17.2. Dados exibidos

Lista:

- foto;
- nome;
- profissão;
- empresa.

## 17.3. Busca

Pesquisar por:

- nome;
- profissão;
- empresa;
- segmento.

## 17.4. Ordem

MVP:

- ordem alfabética.

Futuro:

- relevância;
- proximidade de interesses;
- patrocinadores;
- conexões.

## 17.5. Atualização

Não precisamos de WebSocket.

Opções:

- atualização a cada 30 segundos;
- refresh ao voltar para tela;
- botão pull-to-refresh do navegador;
- revalidação leve.

---

# 18. Perfil público de participante

Ao tocar em uma pessoa, abrir rota própria.

Exemplo:

```text
/e/jantar-conectar-01/pessoas/{profileId}
```

## 18.1. Dados visíveis

- nome;
- foto;
- profissão;
- empresa;
- segmento;
- bio;
- o que faz;
- o que oferece;
- o que procura;
- tags;
- redes permitidas.

## 18.2. Redes sociais

Podem existir:

- WhatsApp;
- LinkedIn;
- Instagram.

## 18.3. Regra de ausência

Se não houver Instagram:

não mostrar botão.

Se não houver LinkedIn:

não mostrar botão.

## 18.4. WhatsApp

Armazenar telefone normalizado.

Exemplo:

```text
5571999999999
```

Gerar URL:

```text
https://wa.me/5571999999999
```

---

# 19. Meu perfil

A pessoa deve conseguir revisar o que os demais veem.

## 19.1. Ações

- visualizar;
- editar;
- alterar links;
- alterar tags;
- atualizar descrição;
- atualizar empresa;
- atualizar cargo;
- atualizar foto.

## 19.2. Segurança

O `profileId` editável deve vir da sessão.

Nunca aceitar:

```text
POST /profile?id=outro-uuid
```

sem verificar propriedade.

---

# 20. Matching

## 20.1. Objetivo

Sugerir pessoas com potencial de conversa relevante.

Não é um sistema de recomendação complexo.

Não usar IA no primeiro release.

## 20.2. Fontes

Usar:

- tags OFFER;
- tags SEEK;
- tags INTEREST;
- segmento como informação complementar.

## 20.3. Relações principais

Pessoa A procura algo que Pessoa B oferece.

Pessoa B procura algo que Pessoa A oferece.

Interesses em comum.

---

# 21. Fórmula base de matching

Quando todos os componentes estiverem disponíveis:

```text
40% A procura × B oferece
40% B procura × A oferece
20% interesses em comum
```

## 21.1. Cobertura A → B

```text
matched(A.seek, B.offer) / total(A.seek)
```

## 21.2. Cobertura B → A

```text
matched(B.seek, A.offer) / total(B.seek)
```

## 21.3. Interesses

Sugestão:

```text
intersection(A.interests, B.interests)
/
union(A.interests, B.interests)
```

## 21.4. Score

```text
score =
  coverageAtoB * 0.40 +
  coverageBtoA * 0.40 +
  commonInterests * 0.20
```

Multiplicar por 100.

Arredondar.

---

# 22. Matching com dados incompletos

Se Interests não existirem, não devemos automaticamente penalizar o usuário em 20%.

Recomendação:

redistribuir pesos entre dimensões disponíveis.

Exemplo:

Sem interesses:

```text
A → B = 50%
B → A = 50%
```

Se apenas um lado possuir SEEK:

```text
A → B = 100%
```

Isso evita scores artificialmente baixos.

---

# 23. Elegibilidade para matching

Um candidato deve:

- ser diferente do usuário atual;
- pertencer ao evento atual;
- estar presente;
- possuir profile ativo.

Opcional:

- possuir ao menos uma tag.

## 23.1. Excluir

- usuário atual;
- perfis removidos;
- perfis inativos;
- ausentes;
- bloqueados futuramente.

---

# 24. Quantidade de sugestões

MVP:

- top 5;
- top 10.

Recomendação:

mostrar até 10.

Não exibir 50 recomendações.

---

# 25. Score mínimo

Podemos estabelecer um threshold.

Exemplo:

```text
score >= 20
```

Se houver poucos participantes, mostrar mesmo scores menores.

A regra pode ser:

1. ordenar por score;
2. selecionar top 10;
3. evitar tela vazia se houver participantes.

---

# 26. Explicação do match

O score sozinho não basta.

O sistema deve gerar motivo legível.

## 26.1. Regras determinísticas

Exemplo:

A procura Automação.

B oferece Automação.

Texto:

> Marina procura automação e você atua com esse tipo de solução.

Exemplo inverso:

> Você procura profissionais da construção e Marina atua nesse segmento.

Exemplo de interesse:

> Vocês compartilham interesse em empreendedorismo.

## 26.2. Prioridade

Gerar explicações nesta ordem:

1. compatibilidade bidirecional;
2. necessidade do usuário atendida;
3. necessidade da outra pessoa atendida;
4. interesses em comum;
5. segmento complementar.

## 26.3. Sem IA

No MVP, templates de texto.

---

# 27. Persistência de matches

Não persistir inicialmente.

Fluxo:

```text
carregar participantes
↓
carregar tags
↓
calcular
↓
ordenar
↓
retornar top N
```

## 27.1. Motivo

Pequena escala.

## 27.2. Quando persistir

Futuro:

- milhares de pessoas;
- matching caro;
- histórico;
- analytics;
- matches manuais;
- feedback.

---

# 28. Arquitetura geral

A arquitetura será um monólito modular.

```text
Mobile Browser
     │
     ▼
   Vercel
     │
     ▼
  Next.js
 ┌───────────────┐
 │ UI            │
 │ Server Actions│
 │ Services      │
 │ Guest Session │
 │ Matching      │
 └───────┬───────┘
         │
         ▼
     Supabase
 ┌───────────────┐
 │ PostgreSQL    │
 │ Storage       │
 │ Admin Auth    │
 └───────────────┘
```

---

# 29. Stack

## 29.1. Frontend

- Next.js;
- App Router;
- React;
- TypeScript;
- Tailwind CSS;
- shadcn/ui quando útil;
- Lucide Icons.

## 29.2. Backend

O próprio Next.js.

Usar:

- Server Components;
- Server Actions;
- Route Handlers quando necessário.

## 29.3. Banco

Supabase PostgreSQL.

## 29.4. Storage

Supabase Storage.

## 29.5. Admin Auth

Supabase Auth.

## 29.6. Hospedagem

Vercel.

## 29.7. Validação

Zod.

---

# 30. Por que não criar API separada

Não há necessidade inicial de:

- FastAPI;
- NestJS;
- Express separado.

Benefícios do monólito:

- menos deploy;
- menos infraestrutura;
- menos CORS;
- menos autenticação duplicada;
- menos código;
- menor tempo de entrega.

---

# 31. Estratégia de acesso ao banco

Recomendação para MVP:

- Supabase como infraestrutura;
- consultas exclusivamente no servidor para dados protegidos;
- migrations SQL como fonte de verdade;
- tipos gerados via Supabase CLI;
- evitar exposição de `service_role` ao browser.

## 31.1. Cliente browser

Somente para funcionalidades explicitamente seguras.

## 31.2. Cliente servidor

Usado para:

- perfis;
- check-in;
- matching;
- admin;
- storage autorizado.

---

# 32. Estrutura do repositório

```text
conectar/
├── src/
│   ├── app/
│   │   ├── e/
│   │   │   └── [eventSlug]/
│   │   │       ├── page.tsx
│   │   │       ├── entrar/
│   │   │       │   └── page.tsx
│   │   │       ├── onboarding/
│   │   │       │   └── page.tsx
│   │   │       ├── presentes/
│   │   │       │   └── page.tsx
│   │   │       ├── conexoes/
│   │   │       │   └── page.tsx
│   │   │       ├── pessoas/
│   │   │       │   └── [profileId]/
│   │   │       │       └── page.tsx
│   │   │       ├── meu-perfil/
│   │   │       │   └── page.tsx
│   │   │       └── layout.tsx
│   │   │
│   │   ├── admin/
│   │   │   ├── page.tsx
│   │   │   ├── eventos/
│   │   │   ├── participantes/
│   │   │   ├── tags/
│   │   │   └── exportacoes/
│   │   │
│   │   └── api/
│   │       └── ...
│   │
│   ├── components/
│   │   ├── brand/
│   │   ├── layout/
│   │   ├── participants/
│   │   ├── profiles/
│   │   ├── matching/
│   │   ├── forms/
│   │   └── ui/
│   │
│   ├── lib/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── services/
│   │   ├── matching/
│   │   ├── validation/
│   │   ├── normalization/
│   │   ├── security/
│   │   └── utils/
│   │
│   ├── actions/
│   │   ├── guest.actions.ts
│   │   ├── profile.actions.ts
│   │   ├── event.actions.ts
│   │   └── admin.actions.ts
│   │
│   └── types/
│
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
│
├── public/
│   ├── logo/
│   └── icons/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.example
├── next.config.ts
├── package.json
└── README.md
```

---

# 33. Camadas internas

## 33.1. UI

Responsável por:

- renderização;
- formulários;
- interação;
- estados visuais.

Não contém regra de negócio complexa.

## 33.2. Actions

Responsável por:

- receber input;
- validar;
- recuperar sessão;
- chamar service;
- retornar resultado.

## 33.3. Services

Responsável por:

- regras de domínio;
- banco;
- operações transacionais.

## 33.4. Matching

Responsável exclusivamente por:

- score;
- explicação;
- ordenação.

## 33.5. DB

Responsável por:

- criação de cliente;
- tipos;
- helpers de persistência.

---

# 34. Server Components

Usar por padrão.

Ótimo para:

- presentes;
- perfil;
- conexões;
- meu perfil.

Vantagens:

- menos JavaScript;
- melhor performance mobile;
- acesso seguro ao banco;
- menor bundle.

---

# 35. Client Components

Usar apenas quando necessário.

Exemplos:

- busca em tempo real;
- formulário interativo;
- seletor de tags;
- upload de foto;
- bottom sheet;
- toast.

---

# 36. Rotas

## 36.1. Evento

```text
/e/[eventSlug]
```

## 36.2. Entrar

```text
/e/[eventSlug]/entrar
```

## 36.3. Onboarding

```text
/e/[eventSlug]/onboarding
```

## 36.4. Presentes

```text
/e/[eventSlug]/presentes
```

## 36.5. Conexões

```text
/e/[eventSlug]/conexoes
```

## 36.6. Perfil externo

```text
/e/[eventSlug]/pessoas/[profileId]
```

## 36.7. Meu perfil

```text
/e/[eventSlug]/meu-perfil
```

## 36.8. Admin

```text
/admin
```

---

# 37. Modelo de dados

O banco deve nascer entendendo que:

- uma pessoa participa de vários eventos;
- um evento possui várias pessoas.

---

# 38. Tabela `profiles`

Campos recomendados:

```text
id
first_name
last_name
normalized_name
profession
company
segment
city
bio
what_i_do
what_i_offer
what_i_seek
whatsapp_phone
linkedin_url
instagram_url
photo_url
share_whatsapp
share_linkedin
share_instagram
is_active
created_at
updated_at
```

## 38.1. Tipos sugeridos

```text
id UUID PK
first_name VARCHAR(80) NOT NULL
last_name VARCHAR(120) NOT NULL
normalized_name VARCHAR(240) NOT NULL
profession VARCHAR(160)
company VARCHAR(160)
segment VARCHAR(120)
city VARCHAR(120)
bio TEXT
what_i_do TEXT
what_i_offer TEXT
what_i_seek TEXT
whatsapp_phone VARCHAR(32)
linkedin_url TEXT
instagram_url TEXT
photo_url TEXT
share_whatsapp BOOLEAN DEFAULT FALSE
share_linkedin BOOLEAN DEFAULT TRUE
share_instagram BOOLEAN DEFAULT TRUE
is_active BOOLEAN DEFAULT TRUE
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

---

# 39. Tabela `events`

```text
id
name
slug
description
starts_at
ends_at
timezone
status
access_code_hash
created_at
updated_at
```

## 39.1. Status

Enum conceitual:

```text
DRAFT
OPEN
CLOSED
ARCHIVED
```

---

# 40. Tabela `event_participants`

```text
id
event_id
profile_id
status
checked_in_at
checked_out_at
last_seen_at
created_at
updated_at
```

## 40.1. Status

```text
REGISTERED
CHECKED_IN
LEFT
CANCELLED
```

## 40.2. Constraint

```text
UNIQUE(event_id, profile_id)
```

---

# 41. Tabela `tags`

```text
id
name
slug
category
is_active
created_at
```

## 41.1. Exemplos

```text
Tecnologia
Automação
Dados
Construção
Arquitetura
Marketing
Jurídico
Finanças
Gestão
Vendas
Empreendedorismo
```

---

# 42. Tabela `profile_tags`

```text
id
profile_id
tag_id
type
created_at
```

## 42.1. Tipo

```text
OFFER
SEEK
INTEREST
```

## 42.2. Constraint

```text
UNIQUE(profile_id, tag_id, type)
```

---

# 43. Tabela opcional `admin_users`

Se Supabase Auth for suficiente, não precisa.

Se quisermos metadata adicional:

```text
user_id
name
role
is_active
```

---

# 44. Tabela futura `connection_intents`

Para "Quero conversar".

```text
id
event_id
from_profile_id
to_profile_id
status
created_at
```

Status:

```text
INTERESTED
CONNECTED
DISMISSED
```

Não necessária no MVP inicial.

---

# 45. Índices

Recomendados:

```text
profiles(normalized_name)
profiles(segment)
event_participants(event_id, status)
event_participants(profile_id)
profile_tags(profile_id)
profile_tags(tag_id, type)
events(slug)
```

---

# 46. Busca por participante

No MVP:

ILIKE.

Campos:

- first_name;
- last_name;
- normalized_name;
- profession;
- company;
- segment.

Com escala maior:

Postgres full-text ou trigram.

Não necessário agora.

---

# 47. Storage

Bucket:

```text
profile-photos
```

## 47.1. Regras

- imagens;
- JPEG/WebP/PNG;
- limite aproximado 5 MB no upload;
- comprimir;
- produzir tamanho adequado.

## 47.2. Nome do arquivo

Evitar nome original.

Exemplo:

```text
profiles/{profileId}/{uuid}.webp
```

---

# 48. Segurança do Storage

Usuário convidado não deve receber service role.

Upload pode passar pelo servidor ou usar URL assinada.

MVP mais simples:

- Server Action recebe arquivo;
- valida;
- envia ao Supabase.

---

# 49. Validação

Usar Zod.

Exemplo de schema conceitual:

```text
firstName:
  min 2
  max 80

lastName:
  min 2
  max 120

profession:
  max 160

whatIDo:
  max 500

whatIOffer:
  max 500

whatISeek:
  max 500
```

---

# 50. Validação de WhatsApp

Normalizar para dígitos.

Brasil:

```text
55 + DDD + número
```

Não depender de máscara para persistência.

---

# 51. Validação do LinkedIn

Aceitar:

```text
https://linkedin.com/in/...
https://www.linkedin.com/in/...
```

Normalizar protocolo.

---

# 52. Validação do Instagram

Aceitar:

```text
@usuario
usuario
https://instagram.com/usuario
```

Salvar URL normalizada ou username normalizado.

---

# 53. Server Actions propostas

## `enterEvent`

Entrada:

```text
eventSlug
firstName
lastName
accessToken?
```

Saída:

- profile encontrado;
- múltiplos;
- precisa onboarding;
- sessão criada.

## `selectDuplicateProfile`

Entrada:

- profileId;
- eventId.

## `completeProfile`

Cria profile.

## `updateMyProfile`

Edita profile da sessão.

## `checkIn`

Marca presença.

## `logoutGuest`

Apaga sessão.

---

# 54. Services propostos

## `profile.service.ts`

Responsabilidades:

- findByName;
- findById;
- create;
- update;
- search;
- getPublicProfile.

## `event.service.ts`

- getBySlug;
- validateAccess;
- getCurrentEvent.

## `participant.service.ts`

- register;
- checkIn;
- checkOut;
- listPresent;
- countPresent.

## `tag.service.ts`

- list;
- attach;
- detach;
- replaceProfileTags.

## `matching.service.ts`

- calculateForProfile;
- rankCandidates;
- generateExplanation.

---

# 55. Queries importantes

## 55.1. Presentes

Buscar:

```text
event_participants
JOIN profiles
WHERE event_id = ?
AND status = CHECKED_IN
AND profiles.is_active = true
```

## 55.2. Candidato de match

Mesma base, removendo usuário atual.

---

# 56. Transações

Usar transação em:

- criar profile + event participant + tags;
- update profile + replace tags.

Evitar perfil parcialmente criado.

---

# 57. Cache

MVP pode funcionar quase sem cache explícito.

## 57.1. Não cachear agressivamente

- lista de presentes;
- perfil atual;
- conexões.

## 57.2. Dados cacheáveis

- lista de tags;
- informações estáticas do evento.

---

# 58. Atualização da lista

Sugestão:

Client Component leve consulta endpoint:

```text
/api/events/{slug}/presence
```

a cada 30 segundos.

Alternativa:

`router.refresh()`.

Evitar infraestrutura realtime antes de validar necessidade.

---

# 59. API Route Handlers

Server Actions são preferidos para ações internas.

Route Handlers úteis para:

- polling;
- health check;
- exportação;
- integração futura.

---

# 60. Endpoints conceituais

```text
GET /api/events/:eventId/present
GET /api/events/:eventId/matches
GET /api/profiles/:id
POST /api/admin/export
GET /api/health
```

Não é obrigatório expor todos no MVP.

---

# 61. Admin

Admin terá autenticação por Supabase Auth.

## 61.1. Login

Pode utilizar:

- magic link;
- e-mail + senha.

Magic link reduz manutenção.

## 61.2. Permissão

Usuário autenticado precisa ter papel admin.

Nunca confiar apenas no fato de estar logado.

---

# 62. Funções do admin

Mínimas:

- visualizar evento;
- visualizar presentes;
- visualizar todos cadastrados;
- editar profile;
- adicionar profile;
- corrigir presença;
- gerenciar tags;
- exportar dados.

---

# 63. Exportação

Futuro próximo:

CSV.

Colunas:

- nome;
- sobrenome;
- profissão;
- empresa;
- segmento;
- cidade;
- contato autorizado;
- check-in.

Respeitar consentimentos.

---

# 64. Segurança

## 64.1. Service role

Nunca enviar para client.

## 64.2. Cookie

HttpOnly.

## 64.3. Admin

Auth forte.

## 64.4. Dados

Não guardar senha de convidado porque não há senha.

## 64.5. Links externos

Sanitizar URLs.

## 64.6. SQL injection

Usar cliente parametrizado.

## 64.7. XSS

React escapa texto por padrão.

Não usar `dangerouslySetInnerHTML`.

---

# 65. CSRF

Server Actions + SameSite ajudam.

Ações administrativas sensíveis devem confirmar sessão.

---

# 66. Rate limiting

MVP pode operar sem infraestrutura sofisticada.

Aplicar limite simples em:

- login;
- busca;
- upload.

Futuro:

Upstash/Redis.

Não obrigatório para jantar fechado.

---

# 67. Proteção do evento

Token de acesso opcional.

Fluxo:

```text
QR Code contém token
↓
servidor valida
↓
sessão do evento é criada
↓
token sai da navegação
```

---

# 68. Privacidade

Os participantes devem saber que seus dados serão compartilhados dentro do evento.

Informações públicas do evento:

- nome;
- profissão;
- empresa;
- descrição;
- tags.

Contatos dependem de consentimento.

---

# 69. LGPD — postura mínima

Mesmo em MVP, adotar:

- finalidade clara;
- coleta mínima;
- consentimento;
- possibilidade de correção;
- possibilidade de remoção;
- acesso restrito;
- não coletar dado desnecessário.

---

# 70. Performance

Meta:

- carregamento rápido em 4G;
- interações responsivas;
- poucos scripts client-side.

## 70.1. Orçamento recomendado

- JS inicial baixo;
- imagens comprimidas;
- avatar pequeno;
- sem bibliotecas gráficas pesadas.

---

# 71. Métricas técnicas

Observar:

- tempo de resposta;
- erros;
- falha no login;
- falha de check-in;
- upload com erro;
- páginas 500.

---

# 72. Observabilidade

MVP:

- Vercel logs;
- Supabase logs;
- console server-side estruturado.

Opcional:

- Sentry.

---

# 73. Logging

Não registrar em log:

- cookie;
- token;
- número completo de WhatsApp;
- informações sensíveis.

Pode registrar:

```text
eventId
profileId
action
timestamp
result
```

---

# 74. Analytics de produto

Eventos úteis:

```text
event_opened
guest_logged_in
profile_created
profile_updated
participant_profile_viewed
social_link_clicked
matches_viewed
match_profile_opened
```

Não obrigatório na primeira noite, mas muito valioso.

---

# 75. Métricas de validação

Após jantar:

- quantos abriram;
- quantos completaram perfil;
- quantos visualizaram presentes;
- quantos abriram perfis;
- quantos abriram links sociais;
- quantos visualizaram matches.

---

# 76. Dados para aprender

Perguntas após evento:

- conseguiu encontrar alguém interessante?
- lista de presentes foi útil?
- recomendação fez sentido?
- o que faltou?

---

# 77. Testes unitários

Priorizar lógica.

## 77.1. Normalização

- acentos;
- espaços;
- caixa.

## 77.2. Matching

- overlap perfeito;
- nenhum overlap;
- dados ausentes;
- um lado vazio;
- múltiplas tags.

## 77.3. Links

- Instagram;
- LinkedIn;
- WhatsApp.

---

# 78. Testes de integração

- criar perfil;
- check-in;
- vínculo único;
- editar próprio perfil;
- impedir editar outro perfil;
- listar presentes.

---

# 79. Testes E2E

Usar Playwright.

Fluxo crítico:

```text
abrir evento
→ informar nome
→ onboarding
→ salvar
→ entrar
→ aparecer em presentes
→ abrir outra pessoa
→ visualizar social
→ abrir conexões
```

---

# 80. Casos de borda

## 80.1. Nome duplicado

Resolver com seleção.

## 80.2. Pessoa recarrega tela

Sessão deve permanecer.

## 80.3. Pessoa fecha navegador

Ao abrir novamente dentro da validade, sessão continua.

## 80.4. Internet cai

Mostrar erro amigável.

## 80.5. Evento encerrado durante uso

Usuário pode ser informado no próximo refresh.

## 80.6. Profile removido

Sessão deve invalidar.

---

# 81. Ambientes

Ter pelo menos:

- local;
- production.

Ideal:

- local;
- preview;
- production.

Vercel cria previews por branch/PR.

---

# 82. Variáveis de ambiente

Exemplo:

```text
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GUEST_SESSION_SECRET
DEFAULT_EVENT_SLUG
```

Nunca commitar:

```text
SUPABASE_SERVICE_ROLE_KEY
GUEST_SESSION_SECRET
```

---

# 83. Banco local

Supabase CLI é recomendada.

Permite:

- migrations;
- seed;
- ambiente local;
- consistência.

---

# 84. Migrations

Nunca alterar schema de produção manualmente sem registrar migration.

Estrutura:

```text
supabase/migrations/
20260920_create_profiles.sql
20260920_create_events.sql
...
```

---

# 85. Seed

Ter dados fake.

Exemplo:

- Marina Souza;
- Carlos Mendes;
- Ana Lima;
- João Santos;
- Beatriz Costa.

Serve para:

- desenvolver UI;
- testar matching;
- testar busca.

---

# 86. CI/CD

Fluxo simples:

```text
Git
↓
GitHub/GitLab
↓
Vercel
↓
Preview
↓
Production
```

---

# 87. Branching

Para MVP:

```text
main
develop
feature/*
```

Ou simplificar:

```text
main
feature/*
```

Como o projeto é pequeno, evitar processo pesado.

---

# 88. Deploy

Checklist:

- env vars;
- migration aplicada;
- event criado;
- tags seedadas;
- admin criado;
- QR validado;
- domínio testado;
- celular real testado.

---

# 89. Checklist do dia do evento

Antes:

- testar QR;
- testar login;
- testar perfil existente;
- testar novo perfil;
- testar duplicidade;
- testar check-in;
- testar redes;
- testar matches;
- testar admin;
- testar 4G;
- testar Wi-Fi;
- testar iPhone;
- testar Android.

---

# 90. Operação durante evento

Ter admin aberto em notebook/celular.

Monitorar:

- quantidade de presentes;
- erros;
- profiles incompletos.

Ter forma rápida de:

- corrigir nome;
- adicionar convidado;
- corrigir telefone;
- remover duplicata.

---

# 91. Backup

Supabase oferece backup conforme plano.

Além disso:

antes do evento:

- exportar estrutura;
- confirmar migrations.

Após o evento:

- exportar CSV opcional.

---

# 92. Evolução após MVP

## Fase 2

- "quero conversar";
- match mútuo;
- histórico de encontros;
- check-out;
- QR pessoal;
- favoritos;
- conexões salvas.

## Fase 3

- múltiplas comunidades;
- organizações;
- patrocinadores;
- analytics;
- convites;
- memberships.

## Fase 4

- matching mais inteligente;
- IA;
- recomendações contextuais;
- agenda;
- integrações.

---

# 93. Multi-evento

A modelagem já suporta.

Não duplicar profile.

Fluxo futuro:

```text
Profile
 ├── Event A
 ├── Event B
 └── Event C
```

---

# 94. Multi-grupo futuro

Se Conectar virar SaaS, adicionar:

```text
organizations
organization_members
organization_events
```

Não implementar agora.

---

# 95. Matching futuro com IA

Somente depois de termos:

- dados;
- feedback;
- volume;
- problema claro.

Possíveis usos:

- interpretar texto livre;
- gerar motivo do match;
- sugerir tags;
- recomendar conexão sem tags idênticas.

---

# 96. Por que tags são importantes

Texto livre é ótimo para pessoas.

Tags são melhores para algoritmo.

Por isso o profile possui ambos.

```text
HUMANO → texto
MÁQUINA → tags
```

---

# 97. Regras de qualidade de dados

Nome:

não vazio.

Profissão:

preferencialmente obrigatória.

Tags:

mínimo sugerido:

- 1 OFFER;
- 1 SEEK.

Isso melhora matching.

---

# 98. Sugestão de onboarding rápido

Passo 1:

```text
Quem é você?
```

Passo 2:

```text
O que você faz e oferece?
```

Passo 3:

```text
O que procura e como podem falar com você?
```

Tempo ideal:

menos de 3 minutos.

---

# 99. Estado incompleto de perfil

Se profile já existe, mas faltam dados críticos:

mostrar banner discreto:

> Complete seu perfil para melhorar suas conexões.

Botão:

> Completar perfil

Não bloquear lista de presentes.

---

# 100. Regra de matching para perfil incompleto

Ainda pode aparecer.

Mas score pode ser limitado.

Exemplo:

se não houver OFFER e SEEK:

não gerar score enganoso.

Mostrar:

> Complete seu perfil para receber sugestões melhores.

---

# 101. Admin e duplicatas

Admin deve poder mesclar profiles futuramente.

MVP pode apenas corrigir manualmente.

---

# 102. Identidade do profile

Mesmo sem login forte, UUID é o identificador interno.

Nunca usar nome como PK.

---

# 103. Slugs

Event slug:

```text
jantar-conectar-01
```

Único.

Tags:

```text
automacao
construcao
marketing
```

---

# 104. Datas

Postgres:

`TIMESTAMPTZ`.

Evento deve guardar timezone.

Brasil:

`America/Bahia` ou timezone correta do evento.

Evitar datas sem timezone para check-in.

---

# 105. Exclusão

Preferir soft delete para profile.

Campo:

```text
is_active
```

Admin pode desativar.

---

# 106. Exclusão de evento

Não deletar fisicamente em produção sem necessidade.

Usar:

`ARCHIVED`.

---

# 107. Auditoria mínima

Campos:

- created_at;
- updated_at.

Futuro:

- created_by;
- updated_by;
- audit_log.

---

# 108. Status HTTP

Em Route Handlers:

- 200 sucesso;
- 201 criação;
- 400 input inválido;
- 401 sessão inexistente;
- 403 sem permissão;
- 404 não encontrado;
- 409 conflito;
- 500 erro interno.

---

# 109. Tratamento de erro

Nunca mostrar stack trace.

UI:

> Algo deu errado. Tente novamente.

Servidor registra contexto técnico.

---

# 110. Confiabilidade

Por ser usado em evento ao vivo:

priorizar funcionamento simples.

Evitar dependências externas que não sejam essenciais.

Arquitetura depende basicamente de:

- Vercel;
- Supabase.

---

# 111. Disponibilidade offline

Não necessária.

Futuro PWA pode cachear shell.

Não devemos fingir que presença está atualizada sem internet.

---

# 112. PWA

Opcional.

Não é pré-requisito.

---

# 113. SEO

Quase irrelevante para área do evento.

Landing institucional futura pode ter SEO.

Rotas de profile/evento podem usar:

```text
noindex
```

se o conteúdo for privado.

---

# 114. Robots

Recomendação:

não indexar páginas de convidados.

---

# 115. Open Graph

Para link de evento:

pode usar card:

```text
Conectar Network
1º Jantar Conectar
```

Mas não expor nomes de participantes.

---

# 116. Acessibilidade funcional

Além do design:

- toda ação via teclado;
- labels;
- aria;
- foco;
- feedback;
- mensagens legíveis.

---

# 117. Navegação pelo navegador

Back deve funcionar.

Não criar SPA que bloqueie histórico.

---

# 118. Links externos

Abrir nova aba.

Adicionar:

```text
rel="noopener noreferrer"
```

---

# 119. Imagens

Usar `next/image`.

Tamanho pequeno.

Fallback com iniciais.

---

# 120. Foto no onboarding

Opcional para evitar atrito.

Podemos incentivar depois.

---

# 121. Importação prévia de convidados

Admin pode cadastrar pessoas antes.

Isso melhora login.

O convidado só digita nome e entra.

---

# 122. Pré-cadastro

CSV futuro.

Colunas mínimas:

```text
first_name
last_name
profession
company
segment
```

Não necessário para primeira versão se poucos convidados.

---

# 123. UX de perfil pré-cadastrado

Se já existe:

entrar.

Se profile está incompleto:

mostrar:

> Antes de continuar, conte um pouco mais sobre você.

Mas não transformar login em barreira longa.

---

# 124. Consentimento de contatos

Separar por canal é melhor.

Campos:

```text
share_whatsapp
share_linkedin
share_instagram
```

Isso dá flexibilidade.

---

# 125. Regra de social links

Ao renderizar:

```text
if share_whatsapp && whatsapp_phone
```

mostrar.

Senão:

ocultar.

---

# 126. Busca e privacidade

A busca só retorna participantes do evento atual e presentes, na tela "Presentes".

Não deve vazar profiles globais.

---

# 127. Perfil por URL

Mesmo que alguém tenha UUID, o backend deve verificar:

- pertence ao evento;
- está autorizado a visualizar.

Não confiar somente na obscuridade do UUID.

---

# 128. Middleware

Pode proteger:

```text
/e/[eventSlug]/presentes
/e/[eventSlug]/conexoes
/e/[eventSlug]/meu-perfil
```

Verificar existência do cookie.

A verificação forte pode ocorrer na página/server action.

---

# 129. Admin middleware

Separado.

Nunca reutilizar guest auth.

---

# 130. Dependências sugeridas

Mínimo:

```text
next
react
react-dom
typescript
zod
@supabase/supabase-js
lucide-react
clsx
tailwind-merge
```

shadcn adiciona componentes conforme necessidade.

Evitar instalar biblioteca por componente simples.

---

# 131. Form handling

Pode usar Server Actions diretamente.

React Hook Form é opcional.

Para onboarding com múltiplos passos, pode ajudar.

Não é obrigatório.

---

# 132. Estado global

Evitar Redux.

Sessão vem do servidor.

Estado local via React.

Se necessário:

Zustand apenas quando houver caso real.

---

# 133. Matching como função pura

Ideal:

```ts
calculateMatch(profileA, profileB)
```

Sem acessar banco.

Facilita teste.

---

# 134. Resultado do matching

Estrutura:

```ts
{
  profileId: string;
  score: number;
  reasons: string[];
  matchedTags: {
    userSeeks: Tag[];
    candidateSeeks: Tag[];
    commonInterests: Tag[];
  };
}
```

---

# 135. Ordenação de matches

```text
score DESC
name ASC
```

Para desempate.

---

# 136. Evitar false precision

Embora possamos mostrar 92%, o algoritmo é heurístico.

Não usar casas decimais.

---

# 137. Match 100%

Não chamar de "perfeito".

Mostrar:

```text
100% de compatibilidade
```

como score técnico.

---

# 138. Regras de motivo

Nunca inventar motivo que não esteja no banco.

Textos gerados somente de tags reais.

---

# 139. Segmento no matching

Segmento pode dar bônus pequeno no futuro.

No MVP, não é necessário.

Se usado:

máximo 5–10%.

Evitar sobrepor relações OFFER/SEEK.

---

# 140. Recomendação de fórmula final

MVP v1:

```text
40 A_SEEK × B_OFFER
40 B_SEEK × A_OFFER
20 COMMON_INTEREST
```

Simples, explicável, testável.

---

# 141. Uso durante jantar

O fluxo deve ser rápido:

1. escaneia;
2. entra;
3. vê presentes;
4. toca em alguém;
5. entende quem é;
6. conversa.

As recomendações são suporte, não pré-requisito.

---

# 142. Tela inicial pós-login

Decisão:

**Presentes**.

Motivo:

primeira pergunta natural:

> Quem está aqui?

---

# 143. Segunda aba

**Conexões**.

Pergunta:

> Com quem vale a pena conversar?

---

# 144. Terceira aba

**Meu perfil**.

Pergunta:

> Como estou aparecendo para os outros?

---

# 145. Não duplicar navegação

Se bottom navigation existe, não usar tabs redundantes no topo.

---

# 146. Estado "presente"

Check-in no login.

Não exigir botão adicional:

> Fazer check-in.

Menos atrito.

---

# 147. Check-out

Opcional.

Pode ser manual pelo admin.

Não necessário no primeiro jantar.

---

# 148. Presença em tempo real

30 segundos é suficiente.

Não adicionar Realtime somente para parecer tecnológico.

---

# 149. Escalabilidade

A arquitetura suporta confortavelmente:

- dezenas;
- centenas;
- alguns milhares de profiles.

Antes de microsserviços, otimizar SQL.

---

# 150. Evolução técnica

Quando crescer:

1. índices;
2. cache;
3. precompute matching;
4. jobs;
5. realtime;
6. serviços separados somente se necessário.

---

# 151. Critérios de aceite do MVP

O MVP pode ser considerado funcional se:

- convidado abre QR;
- consegue entrar com nome;
- profile existente é encontrado;
- novo profile consegue se cadastrar;
- sessão persiste;
- check-in ocorre;
- pessoa aparece em presentes;
- lista pesquisa corretamente;
- profile abre;
- redes abrem;
- matches são calculados;
- usuário vê próprio profile;
- admin consegue corrigir problemas;
- aplicação funciona em celular.

---

# 152. Critérios de aceite — login

- nome obrigatório;
- sobrenome obrigatório;
- lookup normalizado;
- duplicatas tratadas;
- cookie criado;
- redirect correto.

---

# 153. Critérios de aceite — onboarding

- validação;
- profile criado;
- tags persistidas;
- contatos persistidos;
- consentimento aplicado;
- check-in criado.

---

# 154. Critérios de aceite — presentes

- somente CHECKED_IN;
- somente evento atual;
- não mostra usuário inativo;
- busca funciona;
- abre profile correto.

---

# 155. Critérios de aceite — perfil

- não vaza contato oculto;
- links válidos;
- usuário não edita terceiro;
- campos ausentes não quebram layout.

---

# 156. Critérios de aceite — matching

- exclui próprio profile;
- exclui ausente;
- score determinístico;
- ordem por score;
- motivo deriva dos dados.

---

# 157. Critérios de aceite — segurança

- service role não aparece no browser;
- admin protegido;
- session cookie HttpOnly;
- profile alheio não pode ser editado;
- evento inválido não permite entrada.

---

# 158. Plano de implementação sugerido

## Etapa 1

Bootstrap:

- Next.js;
- Tailwind;
- fontes;
- Supabase;
- env.

## Etapa 2

Banco:

- profiles;
- events;
- event_participants;
- tags;
- profile_tags.

## Etapa 3

Entrada:

- event landing;
- login;
- sessão.

## Etapa 4

Onboarding.

## Etapa 5

Presentes.

## Etapa 6

Perfil.

## Etapa 7

Matching.

## Etapa 8

Meu perfil.

## Etapa 9

Admin mínimo.

## Etapa 10

Testes e deploy.

---

# 159. Prioridade em caso de prazo curto

Se o jantar estiver próximo:

## Obrigatório

- login;
- onboarding;
- check-in;
- presentes;
- perfil;
- redes.

## Depois

- matches.

Se for necessário cortar algo, cortar matching antes de cortar diretório de presentes.

A lista de participantes é o coração operacional do MVP.

---

# 160. Fonte de verdade

Para decisões futuras:

## Design

`CONECTAR_DESIGN_SPEC.md`

## Produto e arquitetura

este documento.

## Banco

migrations.

## Regras executáveis

testes automatizados.

---

# 161. Resumo da solução

O Conectar nasce como uma aplicação web mobile-first.

Arquitetura:

```text
Next.js
  +
Vercel
  +
Supabase PostgreSQL
```

Convidado:

```text
Nome + sobrenome
```

Admin:

```text
Supabase Auth
```

Entidades:

```text
Profile
Event
EventParticipant
Tag
ProfileTag
```

Fluxo:

```text
QR → Login → Check-in → Presentes → Perfil → Redes
                          ↓
                       Conexões
```

Matching:

```text
O que procuro
      ×
O que outra pessoa oferece
```

A filosofia do produto permanece:

> O software deve reduzir a distância entre duas pessoas que deveriam conversar.
