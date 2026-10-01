# Conectar Network

Protótipo mobile-first para o Primeiro encontro no La Pulperia, em 01/10/2026.

## Executar localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000). A aplicação redireciona para o evento de demonstração.

## Verificação

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Estrutura

- `src/app`: rotas do App Router.
- `src/components`: interface e componentes reutilizáveis.
- `src/data/mock-event.ts`: dados temporários da primeira etapa.
- `src/lib`: utilitários de domínio e interface.

## Supabase

As tabelas são definidas em `supabase/migrations/`; os dados exclusivos de apresentação estão em `supabase/seed.sql`.

```bash
npm run supabase:start
npm run supabase:reset
npm run supabase:types
```

Para aplicar as migrations ao projeto remoto, autentique a CLI e vincule o projeto antes de executar `npx supabase db push`:

```bash
npx supabase login
npx supabase link --project-ref oezecmujzyzcxijqbpaf
npx supabase db push
```

`src/lib/supabase/database.types.ts` é gerado a partir do banco local. Gere-o novamente após cada migration.

Não adicionar segredos ao repositório; copie `.env.example` para `.env.local` quando necessário. A chave `SUPABASE_SECRET_KEY` é exclusiva do servidor e deve ser revogada se for exposta.
# Administração

Para habilitar a área `/gerencial`, defina `ADMIN_RENAN_PASSWORD` e `ADMIN_DANI_PASSWORD` (senhas com ao menos 7 caracteres). A sessão administrativa usa `ADMIN_SESSION_SECRET` quando definido, ou o `GUEST_SESSION_SECRET` existente. Depois de aplicar as migrations ao projeto Supabase, provisione as contas:

```bash
npm run admin:provision
```

O comando cria ou atualiza os usuários `renan` e `dani` no Supabase Auth, sem gravar senhas no repositório.
