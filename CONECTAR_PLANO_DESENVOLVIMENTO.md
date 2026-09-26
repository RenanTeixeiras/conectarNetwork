# Conectar — Plano de desenvolvimento do MVP

**Data do planejamento:** 20/09/2026  
**Primeiro evento:** Primeiro encontro no La Pulperia  
**Data do evento:** 01/10/2026  
**Meta de homologação:** 28/09/2026  
**Status:** Etapa 1 concluída; aguardando infraestrutura para a Etapa 2.

## 1. Objetivo

Entregar uma aplicação web mobile-first que permita aos participantes entrar pelo link ou QR Code do encontro, apresentar sua atuação profissional, visualizar presentes e descobrir pessoas relevantes para conversar.

Fontes de referência:

- `CONECTAR_PRODUCT_ARCHITECTURE_SPEC.md`: produto, regras de negócio e arquitetura.
- `CONECTAR_DESIGN_SPEC.md`: identidade visual, componentes e experiência.
- `ChatGPT Image 20 de set. de 2026, 19_52_45.png`: referência visual das telas.
- `e94dc148-fc1b-4e9f-9b08-d47ffe349c57.png`: logo com fundo verde.
- `WhatsApp Image 2026-09-20 at 19.55.17.png`: referência adicional da logo. O arquivo contém uma imagem JPEG, apesar da extensão, e o quadriculado está incorporado à imagem; não possui transparência real.

Este plano organiza as entregas e identifica decisões pendentes. Recomendações aqui registradas não devem ser confundidas com decisões já confirmadas pelo responsável pelo produto.

## 2. Decisões confirmadas

| Item | Definição |
|---|---|
| Nome do evento | Primeiro encontro no La Pulperia |
| Data | 01/10/2026 |
| Acesso | Qualquer pessoa com o link poderá entrar enquanto o evento aceitar entrada |
| Convites individuais | Não serão exigidos |
| Identificação de convidados | Nome e sobrenome, sem senha |
| Organizadores | Renan e Dani |
| Administração | Painel mínimo incluído no lançamento |
| Foto | Upload incluído no lançamento; foto opcional para o participante |
| Exportação | CSV incluído no lançamento |
| Público esperado | Ainda indefinido |
| Infraestrutura | Contas e projetos ainda serão criados |

**Slug sugerido:** `primeiro-encontro-la-pulperia`  
**Rota sugerida:** `/e/primeiro-encontro-la-pulperia`

## 3. Escopo do lançamento

- [ ] Landing do evento e acesso por QR Code/link.
- [ ] Identificação por nome e sobrenome.
- [ ] Tratamento de homônimos e criação de novos perfis.
- [ ] Onboarding em três passos.
- [ ] Informações profissionais, ofertas, público-alvo e tags.
- [ ] Upload e substituição de foto.
- [ ] WhatsApp, LinkedIn e Instagram com autorização de exibição.
- [ ] Sessão persistente e logout.
- [ ] Check-in automático e idempotente.
- [ ] Lista de presentes e busca.
- [ ] Perfil de participantes.
- [ ] Meu perfil e edição.
- [ ] Até dez oportunidades comerciais, com score e motivo.
- [ ] Administração de eventos, participantes, presença e tags.
- [ ] Exportação CSV por evento.
- [ ] Estados de carregamento, erro, ausência de dados e sessão expirada.
- [ ] Deploy, domínio/endereço definitivo e QR Code validado.

Fora deste lançamento: aplicativo nativo, chat, pagamentos, notificações push, IA generativa, feed social, múltiplas organizações e funcionamento offline. PWA, favoritos e intenção de conversa ficam para evolução posterior.

## 4. Arquitetura e identidade visual

### Stack

- Next.js com App Router, React e TypeScript.
- Tailwind CSS e componentes shadcn/ui quando úteis.
- Lucide para ícones.
- Server Components por padrão, Server Actions para alterações e Route Handlers quando necessários.
- Supabase PostgreSQL, Auth administrativo e Storage para fotos.
- Zod para validação.
- Vercel para hospedagem.
- Vitest para regras e Playwright para fluxos E2E.
- Migrations SQL como fonte de verdade do banco.

### Organização

```text
Interface → Actions → Serviços de domínio → Banco
                              ↓
                     Motor de matching
```

Entidades principais: `profiles`, `events`, `event_participants`, `tags` e `profile_tags`. Complementar a modelagem com autorização administrativa e a decisão sobre consentimentos por evento.

### Direção visual

- Verde principal: `#194828`.
- Fundos claros e levemente quentes.
- Cormorant Garamond para títulos e Inter para textos e controles.
- Coluna principal centralizada, com largura máxima aproximada de 520 px.
- Navegação inferior: Presentes, Oportunidades e Meu perfil.
- Unificar Home/Presentes e lista de presentes em uma única tela.
- Evitar abas superiores que repitam a navegação inferior.
- Alvos de toque de pelo menos 44 px, inputs com fonte mínima de 16 px e foco visível.
- Meta de acessibilidade: WCAG 2.1 AA.

## 5. Etapas de desenvolvimento

### Etapa 1 — Fundação técnica e visual

**Período-alvo:** 20–21/09  
**Dependências:** especificações e arquivos de marca disponíveis.

- [x] Criar a aplicação Next.js com TypeScript e Tailwind.
- [x] Organizar diretórios de páginas, componentes, actions, serviços e testes.
- [x] Configurar lint, verificação de tipos e scripts de build/testes.
- [x] Preparar `.env.example` e documentação de execução local.
- [x] Preparar marca temporária para fundo claro, fundo verde e favicon.
- [x] Implementar tokens, fontes, espaçamentos, bordas e estados de foco.
- [x] Criar Button, Input, Textarea, Select, Chip, Avatar, Sheet, Toast e Skeleton.
- [x] Implementar layout mobile, header, menu e navegação inferior.
- [x] Montar primeiras telas navegáveis com dados fictícios.

**Critérios de aceite:**

- Projeto executa localmente e passa em build, tipos e lint.
- Telas funcionam em 320 px e 390 px sem overflow horizontal.
- Identidade visual é comparada ao modelo fornecido.
- Navegação, foco, safe areas e estados básicos estão implementados.

### Etapa 2 — Banco, infraestrutura e regras de acesso

**Período-alvo:** 22/09  
**Dependências:** Etapa 1 e criação dos projetos de infraestrutura.

- [ ] Configurar Supabase local e ambientes remotos. Local concluído; remoto aguarda autenticação da CLI.
- [ ] Separar dados de testes/homologação dos dados de produção.
- [x] Criar migrations para entidades, índices e constraints.
- [x] Criar seeds de tags, evento de demonstração e participantes fictícios.
- [x] Gerar tipos TypeScript a partir do banco local.
- [x] Configurar clientes de banco exclusivos do servidor para dados protegidos.
- [x] Definir RLS e permissões iniciais restritivas de tabelas e Storage.
- [ ] Implementar validação de evento e isolamento entre eventos.
- [ ] Implementar sessão de convidado assinada ou criptografada.
- [ ] Implementar Supabase Auth e autorização explícita para Renan e Dani.
- [ ] Definir operações transacionais de cadastro, check-in e atualização de tags.
- [ ] Configurar repositório remoto, CI e primeiro preview quando as contas estiverem disponíveis.

**Critérios de aceite:**

- Banco pode ser reconstruído por migrations e seed.
- `UNIQUE(event_id, profile_id)` impede participações duplicadas.
- Segredos privilegiados não são enviados ao navegador.
- Serviços verificam sessão, evento e permissões; uso de chave privilegiada não depende de RLS para autorização.
- Convidados não acessam funções administrativas.

### Etapa 3 — Entrada, onboarding, foto e check-in

**Período-alvo:** 23–24/09  
**Dependências:** Etapas 1 e 2.

- [ ] Implementar landing e estados de evento indisponível, fechado ou ainda não liberado.
- [ ] Implementar identificação com normalização de nomes.
- [ ] Implementar seleção de homônimos.
- [ ] Incluir caminho para criar outra pessoa com o mesmo nome.
- [ ] Vincular seleção de candidatos ao fluxo de entrada validado pelo servidor.
- [ ] Implementar onboarding em três passos: identidade profissional; atuação/oferta e tags; público-alvo, contatos e autorizações.
- [ ] Manter dados preenchidos ao avançar e voltar entre passos.
- [ ] Validar campos no cliente e no servidor.
- [ ] Implementar seleção, prévia, compressão e upload autorizado da foto.
- [ ] Compatibilizar formato e tamanho dos uploads com Next.js, Vercel e Storage.
- [ ] Tratar falha de foto sem impedir cadastro sem imagem.
- [ ] Persistir perfil, tags, consentimentos e participação de forma consistente.
- [ ] Implementar check-in idempotente e preservação do horário original.
- [ ] Emitir sessão após sucesso da operação e redirecionar para Presentes.
- [ ] Implementar logout sem apagar presença ou perfil.

**Critérios de aceite:**

- Participante novo conclui cadastro e aparece em Presentes.
- Participante existente entra sem recriar perfil.
- Homônimos são tratados sem tornar o nome uma chave única.
- Repetir entrada ou envio não duplica participação.
- Sessão persiste ao recarregar a página dentro da validade.
- Fotos selecionadas em iPhone e Android são testadas; formatos não suportados recebem mensagem clara.

### Etapa 4 — Presentes, perfis e contatos

**Período-alvo:** 25/09  
**Dependências:** Etapa 3.

- [ ] Listar participantes ativos com status `CHECKED_IN` no evento atual.
- [ ] Implementar ordenação alfabética, paginação e contagem consistente.
- [ ] Implementar busca por nome, profissão, empresa e segmento.
- [ ] Atualizar presença a cada 30 segundos enquanto a tela estiver ativa e ao retornar ao foco.
- [ ] Implementar perfil de terceiros e tratamento de dados ausentes.
- [ ] Remover contatos não autorizados da resposta do servidor.
- [ ] Normalizar telefones e URLs sociais.
- [ ] Implementar Meu perfil e edição de dados, tags, foto e contatos.
- [ ] Obter identidade editável exclusivamente da sessão validada.
- [ ] Implementar estados de erro, busca vazia, conexão indisponível e nova tentativa.
- [ ] Mostrar convite para completar perfis pré-cadastrados incompletos.

**Critérios de aceite:**

- Busca não retorna perfis de outros eventos ou participantes inelegíveis.
- Perfil por URL verifica autorização e vínculo com o evento.
- Contatos ocultos não aparecem em HTML, payloads ou respostas de rede para terceiros.
- Usuário não consegue alterar perfil alheio por manipulação de parâmetros.
- Links autorizados abrem corretamente e informações ausentes não quebram o layout.

**Marco utilizável:** entrada → check-in → presentes → perfil → contato funcionando com persistência real.

### Etapa 5 — Oportunidades comerciais

**Período-alvo:** 26/09  
**Dependências:** Etapa 4 e perfis com tags.

- [ ] Implementar cálculo como função pura.
- [ ] Calcular aderência entre público-alvo do usuário e perfil do candidato.
- [ ] Calcular aderência entre o que o usuário oferece e sinais de necessidade do candidato.
- [ ] Calcular interesses complementares, se disponíveis.
- [ ] Aplicar pesos-base de 70% / 30%.
- [ ] Definir precisamente dimensões disponíveis e redistribuição de pesos.
- [ ] Tratar conjuntos vazios sem divisão por zero ou score enganoso.
- [ ] Excluir próprio perfil, ausentes, inativos e participantes de outros eventos.
- [ ] Ordenar por score decrescente e nome para desempate.
- [ ] Retornar até dez sugestões com motivos derivados das tags reais.
- [ ] Implementar cards e estado de dados insuficientes.
- [ ] Atualizar sugestões após mudanças relevantes nos dados.

**Critérios de aceite:**

- Cálculo determinístico e testado com correspondência total, parcial, inexistente e dados incompletos.
- Explicação corresponde à oportunidade comercial identificada.
- Resultado não depende de IA ou persistência de oportunidades.
- Política de score mínimo e resultado sem correspondência está definida antes da conclusão.

### Etapa 6 — Administração e exportação

**Período-alvo:** 27/09  
**Dependências:** autorização da Etapa 2 e serviços das Etapas 3 e 4.

- [ ] Concluir login administrativo e navegação do painel.
- [ ] Configurar contas individuais de Renan e Dani com as mesmas permissões iniciais.
- [ ] Implementar criação, edição, abertura e encerramento de eventos.
- [ ] Listar presentes e todos os participantes cadastrados no evento.
- [ ] Implementar cadastro e correção de perfis pelo organizador.
- [ ] Implementar correção de presença e remoção do vínculo com o evento.
- [ ] Distinguir remoção de participação de desativação global de perfil.
- [ ] Implementar gerenciamento de tags.
- [ ] Implementar exportação CSV filtrada por evento.
- [ ] Respeitar autorizações dos contatos na exportação.
- [ ] Garantir acentos, datas no fuso do evento e tratamento de fórmulas de planilha no CSV.
- [ ] Incluir confirmação em ações destrutivas e feedback de resultado.

**Critérios de aceite:**

- Renan e Dani operam o painel com contas distintas.
- Usuário autenticado sem papel administrativo continua sem acesso.
- Organizador corrige dados e presença sem manipulação direta do banco.
- Exportação abre corretamente em planilha e contém somente os dados previstos.

### Etapa 7 — Homologação integrada

**Período-alvo:** 28/09  
**Dependências:** Etapas 1 a 6.

- [ ] Executar E2E de participante novo, existente e homônimo.
- [ ] Executar fluxo completo de edição, foto, contatos e conexões.
- [ ] Testar operação administrativa e exportação.
- [ ] Testar sessão expirada, evento encerrado, perfil desativado e falha de rede.
- [ ] Verificar isolamento entre eventos e proteção dos contatos.
- [ ] Revisar fidelidade visual e estados responsivos.
- [ ] Testar em iPhone e Android reais, com teclado aberto e safe areas.
- [ ] Testar Wi-Fi e rede móvel.
- [ ] Avaliar bases fictícias de 50, 200 e 500 participantes.
- [ ] Medir acesso simultâneo em cenários documentados e ajustar conforme o público esperado.
- [ ] Registrar defeitos, severidade e responsáveis pela correção.

**Critério de aceite:** simulação completa com múltiplos participantes e organizador, sem falhas impeditivas nos fluxos críticos.

Os volumes acima são cenários de validação, não promessa de capacidade já comprovada.

### Etapa 8 — Ajustes e preparação de produção

**Período-alvo:** 29–30/09  
**Dependências:** homologação e disponibilidade da infraestrutura definitiva.

- [ ] Corrigir problemas encontrados na homologação.
- [ ] Reexecutar testes afetados pelas correções.
- [ ] Aplicar migrations de produção.
- [ ] Configurar evento real, catálogo de tags e administradores.
- [ ] Configurar variáveis de ambiente e endereço definitivo.
- [ ] Validar HTTPS, autenticação administrativa e upload em produção.
- [ ] Confirmar mecanismo de backup e procedimento de recuperação disponível.
- [ ] Configurar logs sem cookies, tokens ou contatos completos.
- [ ] Gerar QR Code para o endereço definitivo.
- [ ] Validar o QR em celulares reais a partir do material que será distribuído.
- [ ] Preparar roteiro de abertura, acompanhamento e encerramento do evento.
- [ ] Realizar teste final de produção e remover os dados usados nesse teste quando apropriado.

**Critério de aceite:** aplicação publicada, acesso pelo QR validado e organizadores capazes de operar o encontro.

### Etapa 9 — Operação do evento e avaliação

**Data:** 01/10/2026.

- [ ] Conferir disponibilidade da aplicação e do banco antes do encontro.
- [ ] Abrir entrada pelo painel no momento definido.
- [ ] Manter acesso administrativo disponível para Renan e Dani.
- [ ] Acompanhar check-ins e erros.
- [ ] Corrigir dados ou presenças quando necessário.
- [ ] Encerrar o evento conforme a regra acordada.
- [ ] Exportar dados autorizados quando necessário.
- [ ] Coletar feedback sobre cadastro, diretório e sugestões.
- [ ] Registrar melhorias para a próxima versão.

## 6. Cronograma resumido

| Período | Etapa | Marco |
|---|---|---|
| 20–21/09 | Fundação | Base técnica e visual navegável |
| 22/09 | Banco e acesso | Persistência e autorização estruturadas |
| 23–24/09 | Entrada e onboarding | Cadastro, foto e check-in reais |
| 25/09 | Presentes e perfis | Primeiro fluxo operacional completo |
| 26/09 | Conexões | Recomendações calculadas e testadas |
| 27/09 | Admin e CSV | Operação administrativa completa |
| 28/09 | Homologação | Simulação integrada do encontro |
| 29–30/09 | Ajustes e produção | Publicação, QR e preparação final |
| 01/10 | Evento | Uso e acompanhamento operacional |

As datas são metas de planejamento, dependentes da disponibilidade das contas, configurações externas e validações. Os testes das regras e integrações acompanham cada etapa; não ficam concentrados apenas no dia 28/09.

## 7. Decisões propostas a consolidar

### Entrada e presença

- Abrir e encerrar a entrada pelo painel administrativo.
- Permitir compartilhamento antecipado da landing sem liberar check-in antes da abertura.
- Manter a regra documental de que entrada equivale a check-in.

**Consequência:** uma pessoa com o link pode entrar remotamente e aparecer em Presentes. O MVP não comprova presença física por localização.

### Identificação

- Manter identificação por nome, conforme especificação.
- Permitir criar um novo perfil mesmo quando houver candidatos homônimos.
- Não tratar cookie assinado como prova de identidade: ele protege a sessão emitida, mas não comprova quem selecionou o perfil.

### Consentimentos

- Proposta: autorizações separadas por canal e por evento, inicialmente desmarcadas.
- Manter contatos no perfil e registrar a autorização no contexto do encontro.
- Revisar a modelagem original, que coloca flags de compartilhamento no perfil global.
- Definir como a revogação afeta consultas e futuras exportações.

### Sessões e encerramento

- Proposta: duração de sessão de 24 horas.
- Verificar estado do evento e perfil nas operações protegidas.
- Definir se o encerramento bloqueia também a consulta por participantes já conectados. Recomendação inicial: bloquear a área do evento no próximo acesso/revalidação.

### Matching

- Proposta: não apresentar recomendação com compatibilidade sem evidência de correspondência.
- Definir threshold e comportamento para poucos candidatos.
- Confirmar exigência mínima de uma tag OFFER e uma SEEK no novo cadastro.

### Operação administrativa

- Escolher magic link ou e-mail e senha para Renan e Dani.
- Definir correção manual de duplicatas sem implementar fusão automática neste lançamento.

## 8. Pendências e dependências externas

- [ ] Confirmar cidade, endereço, horário de início, previsão de término e fuso do evento.
- [ ] Confirmar e-mails administrativos de Renan e Dani.
- [ ] Informar quantidade estimada de participantes quando disponível.
- [ ] Definir se haverá pré-cadastro manual de convidados.
- [ ] Criar repositório e contas/projetos no Supabase e Vercel.
- [ ] Definir domínio ou endereço definitivo antes de distribuir o QR.
- [ ] Disponibilizar logo vetorial/transparente ou validar versão preparada a partir das referências.
- [ ] Validar textos de privacidade, contatos de suporte e procedimento de remoção de dados.
- [ ] Consolidar as propostas da seção 7 antes de implementar as regras correspondentes.

## 9. Ambiente de demonstração

O desenvolvimento continuará preservando os dados fictícios atuais para permitir apresentações antes do evento real.

- [ ] Manter `src/data/mock-event.ts` como fixture visual durante a Etapa 2.
- [ ] Criar `supabase/seed.sql` idempotente com as mesmas tags, pessoas e contexto usados na demonstração.
- [ ] Usar IDs determinísticos no seed para recriar a base sem duplicar registros.
- [ ] Criar o evento de demonstração com slug `demonstracao-conectar`.
- [ ] Manter o evento de demonstração aberto e com participantes fictícios disponíveis para apresentação.
- [ ] Criar o evento real separadamente, com slug `primeiro-encontro-la-pulperia`.
- [ ] Não vincular participantes fictícios ao evento real.
- [ ] Usar contatos fictícios inofensivos ou ocultá-los no seed; nunca apontar para telefone ou perfil de terceiros.
- [ ] Migrar as telas dos dados locais para consultas reais apenas na Etapa 3, mantendo a experiência visual atual durante a transição.

O ambiente de demonstração não substitui homologação. Ele existe para apresentar o produto sem alterar, limpar ou expor os dados do encontro real.

## 10. Definição de pronto do MVP

O lançamento estará pronto quando:

1. O participante consegue entrar pelo QR e concluir o fluxo no celular.
2. Perfis novos, existentes e homônimos são tratados corretamente.
3. A sessão persiste e o check-in não duplica participação.
4. Presentes e busca respeitam evento, status e atividade do perfil.
5. Contatos são compartilhados somente conforme autorização.
6. O participante edita apenas o perfil associado à sessão validada.
7. Fotos funcionam nos dispositivos previstos, com fallback adequado.
8. Conexões exibem scores determinísticos e explicações baseadas em dados reais.
9. Renan e Dani conseguem operar o evento e exportar CSV.
10. Falhas de conexão, expiração e encerramento possuem comportamento definido.
11. Build, tipos, lint e testes relevantes passam.
12. Produção e QR Code são testados em celulares reais.

## 11. Ordem de prioridade

1. Entrada, cadastro, sessão e check-in.
2. Presentes, perfis e contatos autorizados.
3. Foto, administração e exportação, confirmadas para o lançamento.
4. Conexões.
5. Refinamentos visuais e funcionalidades adicionais.

Se o cronograma exigir revisão de escopo, apresentar o impacto e obter decisão do responsável pelo produto antes de adiar funcionalidades. Preservar o fluxo principal e a capacidade dos organizadores de operar o encontro.
