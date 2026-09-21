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

Banco, autenticação, upload real e administração serão adicionados na Etapa 2 e seguintes. Não adicionar segredos ao repositório; copie `.env.example` para `.env.local` quando necessário.
