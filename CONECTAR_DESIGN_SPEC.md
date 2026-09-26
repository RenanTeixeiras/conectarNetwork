# CONECTAR — Especificação Completa de Design do MVP

**Documento:** Especificação visual, de interface e experiência do usuário  
**Produto:** Conectar Network  
**Versão:** 1.0 — MVP  
**Plataforma principal:** Web mobile responsiva em Next.js  
**Contexto inicial:** Jantar de networking presencial  
**Prioridade:** Celular primeiro (mobile-first)  
**Idioma da interface:** Português (Brasil)  
**Direção visual:** Elegante, moderna, minimalista, humana e profissional  
**Cor de marca dominante:** Verde profundo derivado da identidade visual do Conectar

> **Atualização v1.1 — Oportunidades comerciais:** no MVP, a navegação passa a usar **Oportunidades**. O onboarding pergunta **Quem você ajuda ou atende?**, com o helper “Descreva o tipo de pessoa, empresa ou segmento que mais se beneficia do que você oferece.” A tela recomenda potenciais clientes presentes, não afinidades de compra recíprocas.

---

# 1. Objetivo deste documento

Este documento define o sistema visual e as regras de interface do Conectar para que o MVP possa ser implementado com consistência no Next.js sem depender de decisões visuais improvisadas durante o desenvolvimento.

O design deve fazer com que o produto pareça:

- confiável;
- sofisticado sem ser luxuoso demais;
- contemporâneo;
- leve;
- simples de entender em poucos segundos;
- adequado a um evento profissional;
- confortável para uso em celular;
- visualmente alinhado à identidade da marca Conectar;
- mais próximo de um produto premium de networking do que de um sistema corporativo tradicional.

A interface não deve parecer um painel administrativo, um CRM ou uma rede social genérica. O foco é **facilitar conexões humanas presenciais**.

A principal sensação desejada é:

> "Eu cheguei ao evento, vi quem está aqui e rapidamente descobri com quem vale a pena conversar."

---

# 2. Princípios de design

## 2.1. Simplicidade acima de quantidade de recursos

Cada tela deve ter um objetivo principal claramente identificável.

Evitar:

- excesso de botões;
- menus longos;
- cards dentro de cards;
- informações redundantes;
- textos explicativos demais;
- muitos filtros;
- ícones sem necessidade;
- cores demais;
- gradientes chamativos;
- sombras fortes;
- animações decorativas.

A pessoa deve conseguir usar o sistema durante um jantar, segurando o celular com uma mão e conversando com outras pessoas.

## 2.2. Mobile-first real

O produto será projetado primeiro para larguras de aproximadamente:

- 320 px;
- 360 px;
- 375 px;
- 390 px;
- 412 px;
- 430 px.

A experiência em desktop é secundária.

Em dispositivos maiores, a interface deve manter a sensação de um aplicativo mobile e não simplesmente esticar o conteúdo de ponta a ponta.

## 2.3. Visual premium sem ostentação

A elegância virá de:

- espaço em branco;
- tipografia;
- proporção;
- alinhamento;
- consistência;
- bordas finas;
- tons naturais;
- verde profundo;
- textos curtos;
- bons retratos/fotos de perfil.

Não utilizar dourado, brilho, vidro exagerado, neon ou efeitos futuristas.

## 2.4. Conteúdo humano

O foco visual deve permanecer nas pessoas.

Elementos prioritários:

1. nome;
2. profissão;
3. empresa;
4. foto;
5. o que faz;
6. o que oferece;
7. o que procura;
8. ação para conversar ou abrir rede social.

O algoritmo de matching é importante, mas a interface não deve transformar networking em uma competição de porcentagens.

## 2.5. Clareza antes de criatividade

Botões devem parecer botões.

Campos devem parecer campos.

Links externos devem ficar claramente identificados.

Interações não devem depender de hover.

Nenhuma ação crítica deve ficar escondida atrás de gestos desconhecidos.

---

# 3. Personalidade visual da marca

## 3.1. Palavras-chave

A identidade visual do produto deve transmitir:

- conexão;
- confiança;
- maturidade;
- presença;
- proximidade;
- inteligência;
- oportunidade;
- calma;
- elegância;
- profissionalismo.

## 3.2. Referência estética

A direção visual combina:

- editorial contemporâneo;
- produtos SaaS minimalistas;
- interfaces de eventos premium;
- cartões de visita digitais;
- tipografia serifada para personalidade;
- tipografia sans-serif para usabilidade.

A interface deve parecer atual em 2026, porém não dependente de tendências passageiras.

---

# 4. Logotipo

## 4.1. Uso principal

A logo do Conectar deve ser utilizada principalmente em:

- tela de entrada;
- tela de login;
- menu;
- materiais de divulgação;
- QR Code do evento;
- eventualmente no topo de páginas institucionais.

Dentro da aplicação autenticada, não é necessário repetir a logo grande em todas as telas.

## 4.2. Variações

### Sobre fundo verde

Usar:

- símbolo branco;
- palavra CONECTAR branca;
- "network" branco ou branco com aproximadamente 75% de opacidade.

### Sobre fundo claro

Usar:

- símbolo em verde principal;
- palavra CONECTAR em verde principal;
- "network" em verde ou cinza esverdeado.

## 4.3. Área de respiro

Deve existir espaço livre ao redor da marca equivalente, no mínimo, a aproximadamente 50% da altura do símbolo.

Não encostar:

- logo em bordas;
- logo em botões;
- logo em fotos;
- logo em textos longos.

## 4.4. O que não fazer com a logo

Não:

- esticar;
- inclinar;
- aplicar sombra;
- adicionar glow;
- alterar proporções;
- usar gradientes;
- mudar o verde arbitrariamente;
- colocar dentro de formas decorativas sem necessidade.

---

# 5. Paleta de cores

A paleta parte do verde profundo existente na identidade enviada.

## 5.1. Cor principal

### Conectar Green

`#194828`

Uso:

- botões principais;
- cabeçalhos escuros;
- estados ativos;
- logo sobre fundo claro;
- navegação;
- indicadores de progresso;
- ícones selecionados;
- links de destaque.

## 5.2. Escala de verdes

| Token | Hex | Uso recomendado |
|---|---:|---|
| Green 950 | `#0B2817` | fundos muito escuros, uso raro |
| Green 900 | `#10351F` | menus escuros |
| Green 800 | `#194828` | cor principal |
| Green 700 | `#205A34` | hover de elementos verdes claros / elementos secundários |
| Green 600 | `#2B6B40` | destaques ocasionais |
| Green 500 | `#3C7C50` | indicadores positivos leves |
| Green 200 | `#CFE0D4` | bordas selecionadas leves |
| Green 100 | `#E7F0E9` | badges e chips |
| Green 50 | `#F3F7F4` | fundos suaves |

A aplicação não precisa usar todos os tons simultaneamente. A escala existe para garantir consistência.

## 5.3. Neutros

| Token | Hex | Uso |
|---|---:|---|
| Ink | `#172019` | texto principal |
| Ink Soft | `#334139` | texto secundário forte |
| Muted | `#68736C` | descrições e metadados |
| Muted Light | `#8B948E` | placeholders |
| Border | `#DDE3DE` | divisores e bordas |
| Border Soft | `#E9EDE9` | separadores muito leves |
| Surface | `#FFFFFF` | cards e campos |
| Canvas | `#F8F9F6` | fundo principal do app |
| Warm Canvas | `#F6F4EE` | alternativa editorial para landing/login |
| White | `#FFFFFF` | conteúdo sobre verde |

## 5.4. Cores semânticas

Usar somente quando a informação realmente tiver significado semântico.

| Estado | Hex sugerido |
|---|---:|
| Sucesso | `#2F7546` |
| Atenção | `#A66A1F` |
| Erro | `#B94A48` |
| Informação | `#4B667A` |

Não utilizar vermelho ou laranja apenas para decoração.

## 5.5. Contraste

Todo texto funcional deve manter contraste adequado.

Regras:

- texto branco em fundo `#194828`: permitido;
- texto principal `#172019` em branco: padrão;
- texto secundário nunca deve ficar claro demais;
- placeholders devem continuar legíveis;
- chips em verde-claro devem usar texto verde-escuro.

---

# 6. Tipografia

A combinação recomendada é:

## 6.1. Fonte editorial

**Cormorant Garamond**

Uso:

- títulos importantes;
- nome da pessoa em perfil;
- "Bem-vindo!";
- títulos de telas em que a estética editorial agrega valor;
- frases institucionais.

Peso recomendado:

- 500;
- 600.

Evitar peso 300 em telas mobile por risco de perda de legibilidade.

## 6.2. Fonte funcional

**Inter**

Uso:

- campos;
- botões;
- navegação;
- chips;
- listas;
- textos;
- mensagens;
- metadados;
- admin.

Pesos:

- 400 regular;
- 500 medium;
- 600 semibold.

## 6.3. Escala tipográfica mobile

| Papel | Tamanho | Line-height | Peso |
|---|---:|---:|---:|
| Display | 34 px | 40 px | 600 serif |
| H1 | 30 px | 36 px | 600 serif |
| H2 | 26 px | 32 px | 600 serif |
| H3 | 22 px | 28 px | 600 serif |
| Section title | 18 px | 24 px | 600 sans/serif |
| Body | 16 px | 24 px | 400 |
| Body small | 14 px | 20 px | 400 |
| Label | 13 px | 18 px | 500 |
| Caption | 12 px | 16 px | 400 |
| Micro | 11 px | 14 px | 500 |

## 6.4. Regras tipográficas

- evitar caixa alta em blocos longos;
- usar caixa alta somente para micro-rótulos;
- nomes próprios nunca devem ser todos em caixa alta;
- títulos serifados devem permanecer curtos;
- não centralizar textos longos;
- corpo de texto preferencialmente alinhado à esquerda;
- limitar linhas muito longas em desktop.

---

# 7. Sistema de espaçamento

Usar escala baseada em múltiplos de 4 px.

| Token | Valor |
|---|---:|
| 1 | 4 px |
| 2 | 8 px |
| 3 | 12 px |
| 4 | 16 px |
| 5 | 20 px |
| 6 | 24 px |
| 8 | 32 px |
| 10 | 40 px |
| 12 | 48 px |
| 16 | 64 px |

Padrões principais:

- padding horizontal da tela mobile: 20 px;
- padding de cards: 16 px;
- distância entre blocos: 24 px;
- distância entre label e input: 8 px;
- distância entre cards de lista: 8 a 12 px.

---

# 8. Border radius

A interface deve ser suavemente arredondada, sem aspecto infantil.

| Elemento | Radius |
|---|---:|
| Input | 12 px |
| Botão | 12 px |
| Card simples | 16 px |
| Card de destaque | 18 px |
| Modal / sheet | 24 px |
| Avatar | 50% |
| Chip | 999 px |

Evitar radius superior a 24 px em cards comuns.

---

# 9. Sombras

As sombras devem ser discretas.

## 9.1. Card elevado

```css
box-shadow: 0 8px 24px rgba(20, 45, 30, 0.06);
```

## 9.2. Bottom navigation

```css
box-shadow: 0 -6px 20px rgba(20, 45, 30, 0.05);
```

## 9.3. Regra

Preferir borda + diferença de superfície em vez de sombra.

Não usar sombras pretas fortes.

---

# 10. Ícones

Biblioteca recomendada:

**Lucide Icons**

Configuração padrão:

- tamanho: 20 px;
- stroke-width: 1.75;
- cor: herdada do contexto;
- botão de ícone: mínimo 44 x 44 px.

Ícones principais:

- Users;
- User;
- Sparkles ou Handshake;
- Search;
- ArrowLeft;
- ChevronRight;
- Menu;
- X;
- Instagram;
- Linkedin;
- MessageCircle;
- Pencil;
- Camera;
- SlidersHorizontal;
- LogOut;
- CalendarDays;
- Tag;
- CheckCircle;
- ExternalLink.

Evitar mistura de estilos de ícones.

---

# 11. Fotografia e avatares

## 11.1. Fotos de perfil

Preferir:

- rosto claramente visível;
- fundo neutro;
- recorte central;
- iluminação natural;
- aparência profissional sem obrigar foto corporativa.

## 11.2. Tamanhos

| Contexto | Tamanho |
|---|---:|
| Lista compacta | 44 px |
| Card | 52 px |
| Perfil | 88–104 px |
| Cabeçalho pequeno | 36 px |

## 11.3. Fallback

Se não houver foto:

- círculo em Green 100;
- iniciais em Green 800;
- duas letras no máximo;
- tipografia Inter 600.

Exemplo:

`RT`

---

# 12. Estrutura geral da aplicação mobile

A aplicação autenticada deve utilizar:

```text
┌──────────────────────────┐
│ Top bar                  │
│                          │
│ Conteúdo                 │
│                          │
│                          │
│                          │
│                          │
├──────────────────────────┤
│ Presentes Conexões Perfil│
└──────────────────────────┘
```

## 12.1. Container

- largura: 100%;
- max-width em desktop: 480–520 px para experiência principal;
- centralizado quando viewport > 768 px;
- fundo externo pode usar Canvas;
- fundo interno branco ou Canvas.

## 12.2. Safe areas

Em iOS, considerar:

```css
padding-bottom: env(safe-area-inset-bottom);
padding-top: env(safe-area-inset-top);
```

Principalmente em navegação inferior.

---

# 13. Navegação principal

Existem três destinos primários:

1. **Presentes**
2. **Conexões**
3. **Meu perfil**

No MVP, eles aparecem na bottom navigation.

## 13.1. Bottom navigation

Altura visual:

- aproximadamente 64–72 px;
- somar safe area quando necessário.

Cada item contém:

- ícone;
- label;
- estado ativo.

Estado ativo:

- verde principal;
- peso 600;
- opcional pequeno ponto ou indicador.

Estado inativo:

- Muted.

Não usar quatro ou cinco itens no MVP se não houver necessidade.

---

# 14. Tela 1 — Entrada / Splash

## 14.1. Objetivo

Criar uma primeira impressão forte antes do login.

É uma tela de identidade, não uma tela funcional complexa.

## 14.2. Estrutura

Fundo:

`#194828`

Conteúdo vertical:

1. espaço superior;
2. logo central;
3. frase;
4. espaço respirável;
5. microtexto inferior.

## 14.3. Logo

- centralizada;
- largura aproximada: 180–210 px;
- branca.

## 14.4. Frase

Sugestão:

> Pessoas certas em conversas que geram futuro.

Tipografia:

- Inter ou serif;
- 17–19 px;
- line-height 26 px;
- branco;
- centralizado;
- max-width 230 px.

## 14.5. Rodapé

Texto:

`NETWORK • IDEIAS • OPORTUNIDADES`

- 10–11 px;
- tracking 0.18em;
- branco com 55% de opacidade.

## 14.6. Comportamento

Pode existir por:

- 800–1400 ms no primeiro acesso;
- ou ser a própria landing do QR.

Evitar spinner.

Transição:

fade suave para login.

---

# 15. Tela 2 — Login por nome

## 15.1. Objetivo

Permitir entrada extremamente rápida.

Campos:

- Nome;
- Sobrenome.

Sem senha.

## 15.2. Estrutura

Topo:

- logo pequena;
- centralizada;
- fundo claro.

Título:

> Bem-vindo!

Subtexto:

> Informe seu nome para entrar no encontro.

## 15.3. Formulário

Campo Nome:

- label acima;
- input 52 px;
- radius 12;
- borda Border;
- placeholder não deve substituir label.

Campo Sobrenome:

mesmo padrão.

## 15.4. Botão principal

Texto:

> Entrar no Conectar

Ícone:

ArrowRight.

Configuração:

- altura 52 px;
- largura 100%;
- Green 800;
- texto branco;
- radius 12 px;
- font-weight 600.

Hover desktop:

Green 900.

Active mobile:

reduzir levemente luminosidade.

## 15.5. Informação complementar

Abaixo:

ícone User pequeno.

Texto:

> Primeira vez por aqui? Seu perfil será criado automaticamente.

Cor Muted.

## 15.6. Erros

### Nome vazio

> Informe seu nome.

### Sobrenome vazio

> Informe seu sobrenome.

### Mais de uma pessoa encontrada

Abrir tela/folha:

> Encontramos mais de uma pessoa com esse nome. Qual é você?

Mostrar:

- nome;
- profissão;
- empresa.

---

# 16. Tela 3 — Completar perfil

## 16.1. Objetivo

Coletar apenas dados suficientes para o networking e matching.

O onboarding deve ser simples e rápido.

## 16.2. Progresso

Topo:

- ArrowLeft;
- progress bar fina;
- texto `1 de 3`.

Progress bar:

- track Green 100 ou Border;
- fill Green 800;
- altura 4 px;
- radius total.

## 16.3. Título

> Complete seu perfil

Subtexto:

> Algumas informações para você aproveitar melhor o Conectar.

## 16.4. Foto

Avatar placeholder:

- 72 px;
- cinza/Green 50;
- ícone Camera.

Ao lado:

> Adicionar foto  
> (opcional)

Foto continua opcional no MVP.

## 16.5. Passo 1 — Identidade profissional

Campos:

- Profissão / Cargo;
- Empresa;
- Segmento;
- Cidade.

Segmento pode ser select.

Cidade pode inicialmente ser texto.

## 16.6. Passo 2 — O que faço

Campos:

### O que você faz?

Textarea.

Helper text:

> Explique em poucas palavras sua atuação profissional.

### O que você oferece?

Textarea.

### O que você procura?

Textarea.

## 16.7. Passo 3 — Contato

Campos:

- WhatsApp;
- LinkedIn;
- Instagram.

Checkbox:

> Autorizo que meus dados de contato sejam exibidos aos participantes deste encontro.

Se desmarcado:

- redes sociais podem ser ocultadas conforme regra definida.

## 16.8. Tags

Sempre que possível, complementar texto livre com tags.

Blocos:

**Posso ajudar com**

**Estou procurando**

Tags selecionáveis, por exemplo:

- Tecnologia;
- Marketing;
- Jurídico;
- Construção;
- Arquitetura;
- Finanças;
- Vendas;
- Gestão;
- Dados;
- Automação;
- Empreendedorismo.

Visual:

- chips leves;
- Green 50 desmarcado;
- Green 800 com texto branco selecionado ou Green 100 + borda Green 700.

---

# 17. Tela 4 — Home / Presentes

## 17.1. Objetivo

Ser a primeira tela após login.

A primeira pergunta do convidado é:

> Quem está aqui?

## 17.2. Header

Linha superior:

- logo pequena à esquerda;
- avatar do usuário à direita.

Abaixo:

> Olá, Renan! 👋

Subtexto:

> 18 pessoas estão presentes no encontro.

Não exagerar no tamanho.

## 17.3. Segmentação superior opcional

Pode existir um controle de três abas:

- Presentes;
- Conexões;
- Meu perfil.

Porém, se a bottom navigation já existir, evitar duplicação desnecessária.

Recomendação para versão final:

**usar apenas bottom navigation**.

## 17.4. Busca

Campo:

> Buscar por nome, profissão ou segmento...

Altura:

48 px.

Ícone Search.

Fundo:

White ou Green 50.

Borda:

Border Soft.

## 17.5. Lista compacta

Cada pessoa:

- avatar 48 px;
- nome;
- profissão;
- empresa;
- ChevronRight.

Altura de linha:

aproximadamente 72 px.

Separador:

1 px Border Soft.

## 17.6. Exemplo

```text
[foto] Marina Souza              >
       Arquiteta
       Santos Arquitetura
```

---

# 18. Tela 5 — Lista de presentes

## 18.1. Objetivo

Mostrar todos que fizeram check-in.

## 18.2. Header

ArrowLeft quando acessada como subpágina, ou título simples se for aba principal.

Título:

> Presentes

Subtítulo:

> 18 pessoas no encontro

Ícone de filtro opcional.

## 18.3. Busca

Sempre visível no topo da lista.

## 18.4. Filtros

No MVP, filtros devem ser mínimos.

Se utilizados:

- Todos;
- Tecnologia;
- Construção;
- Marketing;
- Gestão;
- Outros.

Podem ser chips horizontais roláveis.

Não abrir painel complexo sem necessidade.

## 18.5. Ordenação

Padrão:

ordem alfabética por primeiro nome ou relevância operacional.

Para o MVP, recomendamos:

**ordem alfabética**.

## 18.6. Estado vazio

> Ainda não há participantes presentes.

Subtexto:

> Assim que as pessoas fizerem check-in, elas aparecerão aqui.

---

# 19. Tela 6 — Perfil de uma pessoa

## 19.1. Objetivo

Permitir entender rapidamente:

- quem é;
- o que faz;
- como pode ajudar;
- o que procura;
- como entrar em contato.

## 19.2. Topo

- ArrowLeft;
- menu contextual opcional;
- avatar grande centralizado;
- nome;
- profissão;
- empresa.

Exemplo:

> Marina Souza  
> Arquiteta  
> Santos Arquitetura

## 19.3. Tags

Logo abaixo:

- Arquitetura;
- Construção;
- Interiores.

Usar Green 50 ou Green 100.

## 19.4. Seções

### Sobre mim

Texto curto.

### O que faço

Texto profissional.

### Posso ajudar com

Tags.

### Estou procurando

Tags.

## 19.5. Contatos

No fim da página:

três botões grandes ou ícones com labels:

- WhatsApp;
- LinkedIn;
- Instagram.

Recomendação visual:

- ícone em círculo;
- label abaixo;
- utilizar tons do Conectar, não necessariamente cores oficiais das redes.

Exemplo:

```text
(WhatsApp)   (LinkedIn)   (Instagram)
 WhatsApp      LinkedIn     Instagram
```

## 19.6. Ação principal

Se futuramente existir "Quero conversar", ela deve aparecer antes das redes.

Exemplo:

> Quero conversar com Marina

Mas não é obrigatória no primeiro MVP.

---

# 20. Tela 7 — Conexões para você

## 20.1. Objetivo

Mostrar pessoas relevantes para o usuário.

Título:

> Conexões para você

Subtexto:

> Pessoas que podem fazer sentido para o que você procura.

## 20.2. Card de match

Conteúdo:

- avatar;
- nome;
- profissão;
- empresa;
- porcentagem;
- tags;
- motivo;
- botão Ver perfil.

## 20.3. Score

Exemplo:

> 92% de compatibilidade

Visual:

- texto Green 700;
- 13–14 px;
- peso 600.

Não transformar a porcentagem em elemento exagerado.

Evitar:

- círculos gigantes;
- velocímetros;
- rankings competitivos.

## 20.4. Motivo do match

Exemplo:

> Marina procura automação e você atua com soluções de tecnologia.

Texto deve ser curto.

## 20.5. Card recomendado

- border Border;
- radius 16;
- padding 16;
- fundo White;
- sem sombra ou sombra mínima.

## 20.6. Ordem

Mostrar aproximadamente:

- 5 a 10 sugestões;
- ordenadas por score.

---

# 21. Tela 8 — Meu perfil

## 21.1. Objetivo

Permitir revisar a própria apresentação.

## 21.2. Header

Título:

> Meu perfil

Ícone:

Pencil.

## 21.3. Conteúdo

Avatar grande.

Nome.

Profissão.

Empresa.

Tags.

Seções:

- O que faço;
- O que ofereço;
- O que procuro.

## 21.4. Edição

Botão Pencil abre modo de edição ou rota específica.

Não transformar a tela inteira em formulário permanente.

---

# 22. Tela 9 — Menu

## 22.1. Estilo

Menu tipo full-screen sheet ou drawer.

Fundo:

Green 900 / Green 800.

Texto:

branco.

Logo:

branca.

## 22.2. Itens

- Presentes;
- Conexões;
- Meu perfil;

separador;

- Sobre o Conectar;
- Termos e privacidade;

separador;

- Sair.

## 22.3. Item

Altura mínima:

48 px.

Ícone 20 px.

Texto 15–16 px.

---

# 23. Tela 10 — Admin (futuro)

Embora não seja prioritário para o convidado, a linguagem visual deve continuar consistente.

Itens:

- Visão geral;
- Participantes;
- Check-in;
- Eventos;
- Tags / Segmentos;
- Exportar dados.

O admin pode usar uma abordagem mais utilitária e menos editorial.

---

# 24. Componentes do design system

## 24.1. Button Primary

```text
Height: 52px
Padding: 0 20px
Radius: 12px
Background: #194828
Text: #FFFFFF
Font: Inter 600 / 15–16px
```

Estado hover:

`#10351F`

Estado disabled:

- background `#D7DFD9`;
- text `#8A948D`.

## 24.2. Button Secondary

- fundo branco;
- border Green 800;
- texto Green 800.

## 24.3. Button Ghost

- sem borda;
- fundo transparente;
- texto Green 800.

## 24.4. Input

```text
Height: 52px
Background: #FFFFFF
Border: #DDE3DE
Radius: 12px
Padding: 0 14px
Font: 16px
```

Focus:

- border Green 700;
- ring 2 px Green 100.

Erro:

- border Error;
- texto de erro 12–13 px.

## 24.5. Textarea

- min-height 112 px;
- resize vertical apenas em desktop;
- mesma linguagem do input.

## 24.6. Select

Mesmo estilo do input.

ChevronDown à direita.

## 24.7. Chip

Normal:

- Green 50;
- texto Green 800;
- 12–13 px;
- padding 6px 10px;
- radius total.

Selecionado:

- Green 800;
- texto branco.

## 24.8. Card de pessoa

```text
Background: white
Border: 1px solid #E0E5E1
Radius: 16px
Padding: 14–16px
```

## 24.9. Divider

`1px #E9EDE9`

Usar com moderação.

---

# 25. Estados interativos

## 25.1. Hover

Somente desktop.

Não depender de hover para revelar conteúdo.

## 25.2. Pressed

Em botão:

- escurecer 4–8%;
- opcional `transform: scale(0.99)`.

Duração:

80–120 ms.

## 25.3. Focus

Sempre visível via teclado.

Ring:

- Green 200;
- 2 px.

## 25.4. Disabled

Não reduzir opacidade abaixo de aproximadamente 45%.

---

# 26. Motion design

O movimento deve ser discreto.

## 26.1. Durações

| Interação | Duração |
|---|---:|
| Button | 100–150 ms |
| Tab | 150–180 ms |
| Sheet | 220–280 ms |
| Page fade | 180–220 ms |
| Skeleton shimmer | 1200–1600 ms |

## 26.2. Easing

Preferir:

```css
cubic-bezier(0.2, 0.8, 0.2, 1)
```

## 26.3. Evitar

- bounce;
- springs exageradas;
- transições longas;
- blur pesado;
- parallax.

---

# 27. Loading

## 27.1. Skeleton

Usar skeleton em:

- lista de presentes;
- conexões;
- perfil.

Cor:

Green 50 / Border Soft.

## 27.2. Spinner

Reservar para ações curtas:

- salvar;
- entrar;
- atualizar.

---

# 28. Toasts e feedback

Utilizar toasts discretos.

Exemplos:

> Perfil atualizado.

> Check-in realizado.

> Não foi possível carregar os participantes.

Duração:

3–4 segundos.

Não cobrir bottom navigation.

---

# 29. Empty states

## Presentes

> Ainda não há ninguém aqui.

> Os participantes aparecerão assim que fizerem check-in.

## Conexões

> Ainda não encontramos conexões suficientes.

> Complete seu perfil para melhorar suas recomendações.

## Busca

> Nenhuma pessoa encontrada.

> Tente outro nome, profissão ou segmento.

---

# 30. Erros

Erros devem ser humanos e objetivos.

Evitar:

> Erro 500.

Preferir:

> Não conseguimos carregar esta página agora.

Ação:

> Tentar novamente

---

# 31. Microcopy

Tom da marca:

- profissional;
- leve;
- direto;
- humano;
- não infantil;
- não excessivamente informal.

## 31.1. Exemplos

Bom:

> Veja quem está presente.

Bom:

> Pessoas que podem fazer sentido para você.

Bom:

> Conte um pouco sobre o que você faz.

Evitar:

> Bora conectar!!! 🚀🔥

Evitar excesso de emojis.

Um emoji pontual, como o 👋 no cumprimento, é aceitável.

---

# 32. Busca

A busca deve pesquisar:

- nome;
- profissão;
- empresa;
- segmento.

A filtragem deve ser instantânea sempre que viável.

Debounce:

200–300 ms se houver consulta ao servidor.

---

# 33. Perfil e privacidade

A interface deve deixar claro que as informações serão vistas por outros participantes.

No onboarding:

> Estas informações serão exibidas aos participantes do encontro.

Para WhatsApp:

checkbox ou controle:

> Exibir meu WhatsApp aos participantes.

---

# 34. Responsividade

## Até 430 px

Layout padrão mobile.

## 431–767 px

Manter estrutura mobile mais espaçosa.

## 768–1023 px

Centralizar conteúdo em max-width aproximado de 560 px.

## 1024 px+

Pode existir moldura de conteúdo central, sem esticar a experiência.

Admin pode utilizar layout desktop separado.

---

# 35. Acessibilidade

Meta mínima:

WCAG 2.1 AA.

Regras:

- touch targets mínimos de 44 px;
- textos de formulário mínimo 16 px para evitar zoom automático em iOS;
- ícones interativos precisam de `aria-label`;
- estados de foco visíveis;
- contraste adequado;
- labels associados a inputs;
- nenhum significado transmitido somente por cor;
- imagens de perfil com alt adequado ou alt vazio se decorativas;
- respeitar `prefers-reduced-motion`.

---

# 36. Implementação com Tailwind

## 36.1. Tokens sugeridos

```css
:root {
  --conectar-green-950: #0B2817;
  --conectar-green-900: #10351F;
  --conectar-green-800: #194828;
  --conectar-green-700: #205A34;
  --conectar-green-600: #2B6B40;
  --conectar-green-500: #3C7C50;

  --conectar-green-200: #CFE0D4;
  --conectar-green-100: #E7F0E9;
  --conectar-green-50: #F3F7F4;

  --conectar-ink: #172019;
  --conectar-ink-soft: #334139;
  --conectar-muted: #68736C;
  --conectar-muted-light: #8B948E;

  --conectar-border: #DDE3DE;
  --conectar-border-soft: #E9EDE9;

  --conectar-surface: #FFFFFF;
  --conectar-canvas: #F8F9F6;
  --conectar-warm-canvas: #F6F4EE;
}
```

## 36.2. Classes conceituais

### Page

```text
min-h-screen
bg-conectar-canvas
text-conectar-ink
```

### Mobile content

```text
mx-auto
w-full
max-w-[520px]
px-5
```

### Primary button

```text
h-13
w-full
rounded-xl
bg-conectar-green-800
font-semibold
text-white
```

---

# 37. Estrutura de componentes React

Sugestão:

```text
components/
├── brand/
│   ├── logo.tsx
│   └── brand-mark.tsx
│
├── layout/
│   ├── mobile-shell.tsx
│   ├── app-header.tsx
│   ├── bottom-navigation.tsx
│   └── menu-sheet.tsx
│
├── profile/
│   ├── avatar.tsx
│   ├── profile-header.tsx
│   ├── profile-section.tsx
│   ├── profile-tags.tsx
│   └── social-links.tsx
│
├── participants/
│   ├── participant-row.tsx
│   ├── participant-card.tsx
│   ├── participants-search.tsx
│   └── participants-empty.tsx
│
├── matching/
│   ├── match-card.tsx
│   ├── match-score.tsx
│   └── match-reason.tsx
│
├── forms/
│   ├── text-field.tsx
│   ├── select-field.tsx
│   ├── textarea-field.tsx
│   ├── tag-selector.tsx
│   └── form-error.tsx
│
└── ui/
    ├── button.tsx
    ├── chip.tsx
    ├── divider.tsx
    ├── skeleton.tsx
    ├── toast.tsx
    └── sheet.tsx
```

---

# 38. Rotas e correspondência visual

```text
/e/[eventSlug]
```

Landing / entrada do evento.

```text
/e/[eventSlug]/entrar
```

Login por nome.

```text
/e/[eventSlug]/onboarding
```

Completar perfil.

```text
/e/[eventSlug]/presentes
```

Home principal.

```text
/e/[eventSlug]/conexoes
```

Matches.

```text
/e/[eventSlug]/pessoas/[profileId]
```

Perfil de outra pessoa.

```text
/e/[eventSlug]/meu-perfil
```

Perfil próprio.

```text
/admin
```

Admin futuro.

---

# 39. Especificação detalhada da bottom navigation

Item:

- largura flexível;
- altura útil 56 px;
- ícone 20 px;
- label 11–12 px;
- gap 4 px.

Labels:

- Presentes;
- Conexões;
- Meu perfil.

A bottom navigation não deve usar:

- bordas grossas;
- backgrounds individuais;
- badges sem necessidade.

---

# 40. Especificação detalhada dos cards de matching

Estrutura:

```text
┌─────────────────────────────────┐
│ [foto] Carlos Mendes            │
│        Consultor Empresarial    │
│        92% de compatibilidade   │
│                                 │
│ [Gestão] [Estratégia]           │
│                                 │
│ Pode fazer sentido porque...    │
│                                 │
│                    [Ver perfil] │
└─────────────────────────────────┘
```

Dimensões:

- padding 16;
- avatar 48;
- gap 12;
- radius 16;
- border 1.

Botão "Ver perfil":

- altura 40–44 px;
- pode ser compacto;
- Green 800;
- branco.

---

# 41. Lista de pessoas

A lista deve parecer leve.

Não usar um card completo para cada pessoa se a lista tiver muitos participantes.

Preferir:

- linhas;
- divisores;
- espaço;
- foto;
- texto;
- chevron.

Cards completos somente quando houver contexto adicional.

---

# 42. Hierarquia de informação

Em uma pessoa:

1. nome;
2. profissão;
3. empresa;
4. contexto;
5. tags;
6. ações.

Nunca colocar empresa maior que nome.

---

# 43. Dados ausentes

Se não houver empresa:

não mostrar `—`.

Simplesmente ocultar.

Se não houver Instagram:

não mostrar botão desabilitado.

Ocultar a ação.

Se não houver foto:

iniciais.

---

# 44. Regras para links sociais

Todos devem abrir em nova aba/janela.

WhatsApp:

normalizar telefone antes de gerar URL.

LinkedIn:

validar domínio quando possível.

Instagram:

aceitar username ou URL, mas salvar forma normalizada.

Ícone ExternalLink pode ser usado opcionalmente.

---

# 45. Design do QR Code de acesso

O QR Code deve aparecer em material externo ao app.

Composição:

- fundo claro;
- QR central;
- logo pequena acima;
- chamada:

> Entre no Conectar

Subtexto:

> Escaneie para ver quem está presente e encontrar novas conexões.

Não embutir o QR em fundos complexos.

---

# 46. Performance percebida

A interface precisa parecer rápida.

Práticas:

- preload da rota de perfil;
- imagens otimizadas;
- avatars pequenos;
- skeleton imediato;
- Server Components;
- evitar bibliotecas pesadas;
- ícones SVG;
- compressão de fotos.

---

# 47. PWA

Não é obrigatória no MVP, mas o design deve suportar.

Se adicionada:

- ícone do Conectar;
- splash em Green 800;
- nome curto "Conectar".

Não forçar instalação.

---

# 48. Dark mode

Não é prioridade para o MVP.

A identidade principal já possui fundo verde escuro em telas específicas.

Implementar dark mode só depois da validação do produto.

---

# 49. Conteúdo e tamanho dos textos

Evitar perfis com blocos extensos.

Recomendação:

- Sobre mim: 180–300 caracteres;
- O que faço: 120–220;
- O que ofereço: 120–220;
- O que procuro: 120–220.

A interface deve truncar previews, mas mostrar texto completo no perfil.

---

# 50. Formatação de nomes

Exibir nomes em Title Case.

Exemplo:

`Renan Teixeira`

Não:

`RENAN TEIXEIRA`

---

# 51. Feedback de check-in

Após login com sucesso:

mensagem breve:

> Você já está no Conectar.

ou:

> Check-in realizado. Veja quem está presente.

Não criar uma tela adicional se não houver necessidade.

---

# 52. Primeira experiência

Fluxo visual:

```text
QR Code
   ↓
Entrada
   ↓
Nome + sobrenome
   ↓
Perfil encontrado?
   ↓
Sim ──────────────> Presentes
Não
 ↓
Completar perfil
 ↓
Presentes
```

O usuário deve chegar à lista de presentes com o menor número possível de etapas.

---

# 53. Menu de contexto de perfil

No MVP, evitar recursos de denúncia/bloqueio complexos se o ambiente é privado.

Se necessário futuramente:

- denunciar perfil;
- ocultar contato;
- copiar link.

---

# 54. Admin visual

O admin deve usar os mesmos tokens, mas com outra densidade.

Desktop:

- sidebar;
- tabela;
- filtros;
- cards de resumo.

Mobile admin não é prioridade.

---

# 55. Estado de pessoa não presente

Se um perfil existe na comunidade mas não fez check-in:

- não aparece em "Presentes";
- pode aparecer em admin;
- não deve aparecer como disponível no evento.

Matches do evento devem preferencialmente considerar apenas presentes.

---

# 56. Estado de match

No MVP:

não precisa armazenar "aceito" ou "rejeitado".

Card serve como recomendação.

Futuramente pode existir:

- Quero conversar;
- Já conversei;
- Salvar contato.

---

# 57. Hierarquia visual por tela

## Entrada

Marca > frase > ação.

## Login

Título > campos > botão.

## Onboarding

Progresso > título > campos > continuar.

## Presentes

Contexto > busca > pessoas.

## Perfil

Pessoa > atuação > oferta/procura > contato.

## Conexões

Título > score > motivo > perfil.

---

# 58. Regras de alinhamento

- telas funcionais: alinhamento à esquerda;
- logo/splash: centralizado;
- avatar de perfil pode ser centralizado;
- listas sempre alinhadas à esquerda;
- botões principais full-width em mobile;
- botões sociais podem ser em linha.

---

# 59. Regras de densidade

O produto deve ser arejado.

Não colocar mais que aproximadamente:

- 3 níveis fortes de hierarquia por viewport;
- 1 ação principal por seção;
- 5–7 chips visíveis sem wrap excessivo.

---

# 60. Design de filtros

Se necessário:

abrir bottom sheet.

Título:

> Filtrar participantes

Campos:

- Segmento;
- Profissão;
- Empresa.

Botão:

> Aplicar filtros

Link:

> Limpar

Não adicionar filtros avançados no MVP.

---

# 61. Bottom sheet

- radius top 24 px;
- background White;
- handle 36 x 4 px;
- padding 20 px;
- abertura suave.

---

# 62. Modais

Evitar modais centrais em mobile.

Preferir:

- page;
- bottom sheet;
- inline disclosure.

---

# 63. Estados de confirmação

Ações leves:

toast.

Ações destrutivas:

dialog.

Exemplo de sair:

> Sair do Conectar?

Botões:

- Cancelar;
- Sair.

---

# 64. Linguagem visual do menu escuro

O menu verde escuro funciona como momento de marca.

Itens com:

- ícone em branco;
- texto branco;
- divisores com white 15%.

Rodapé:

`PESSOAS • IDEIAS • OPORTUNIDADES`

---

# 65. Uso de emojis

Máximo recomendado:

- cumprimento 👋;
- nenhum em botões;
- nenhum em labels;
- nenhum em mensagens de erro.

---

# 66. Campos obrigatórios no onboarding

Para garantir utilidade:

Obrigatórios:

- nome;
- sobrenome;
- profissão/cargo;
- segmento;
- o que faz;
- o que oferece;
- o que procura.

Opcionais:

- foto;
- empresa;
- cidade;
- LinkedIn;
- Instagram;
- WhatsApp, conforme estratégia.

---

# 67. Tamanho de toque

Nenhum botão ou item clicável deve ter área menor que:

`44 x 44 px`.

Mesmo quando o ícone visual tiver 20 px.

---

# 68. Texto de compatibilidade

Use:

> 92% de compatibilidade

ou:

> Alta compatibilidade

Para MVP, porcentagem é aceitável.

Evitar:

> Match perfeito

porque a recomendação é aproximada.

---

# 69. Motivo do match

Formato ideal:

> Marina procura automação e você atua com tecnologia.

ou:

> Vocês têm interesses em comum em construção e novos negócios.

Limitar a 1–2 frases.

---

# 70. Badge de presença

Opcional no perfil:

`Presente agora`

- fundo Green 100;
- texto Green 800;
- ícone pequeno.

Não necessário na lista "Presentes", pois seria redundante.

---

# 71. Perfil próprio versus perfil de terceiros

Meu perfil:

- possui Editar;
- não mostra botões sociais como ação principal;
- pode mostrar preview do que outros veem.

Perfil de terceiro:

- não mostra Editar;
- mostra redes;
- pode mostrar "Quero conversar".

---

# 72. Segurança visual

Nunca exibir:

- UUID;
- IDs internos;
- dados administrativos;
- e-mail privado;
- informações técnicas.

A interface deve parecer social/profissional, não banco de dados.

---

# 73. Tratamento de URLs longas

Nunca mostrar URL inteira.

Mostrar:

- `LinkedIn`;
- `Instagram`;
- `WhatsApp`.

---

# 74. Nomes longos

Permitir até duas linhas.

Profissão também pode quebrar.

Não truncar nome de forma agressiva.

---

# 75. Empresas longas

Pode usar ellipsis em lista.

No perfil, mostrar completa.

---

# 76. Animação de entrada de lista

Opcional:

fade + translateY 4 px.

Duração 160 ms.

Não animar cada uma com delays longos.

---

# 77. Design de progresso do onboarding

Não usar stepper complexo.

Usar:

- barra fina;
- `1 de 3`.

Isso mantém visual limpo.

---

# 78. Validação de formulário

Validar ao:

- sair do campo;
- tentar continuar.

Não mostrar erros antes da primeira interação.

---

# 79. Campos sociais

Aceitar:

Instagram:

`@usuario` ou URL.

LinkedIn:

URL.

WhatsApp:

telefone.

Normalização invisível ao usuário.

---

# 80. Tela pós-cadastro

Não criar congratulação separada.

Após salvar:

toast:

> Perfil criado.

Navegar direto para Presentes.

---

# 81. Copys principais recomendadas

## Entrada

> Pessoas certas em conversas que geram futuro.

## Login

> Bem-vindo!

> Informe seu nome para entrar no encontro.

## Onboarding

> Complete seu perfil

> Algumas informações para você aproveitar melhor o Conectar.

## Presentes

> Olá, Renan! 👋

> 18 pessoas estão presentes no encontro.

## Conexões

> Conexões para você

> Pessoas que podem fazer sentido para o que você procura.

## Meu perfil

> Meu perfil

---

# 82. Design tokens em TypeScript

Pode existir:

```ts
export const colors = {
  green: {
    950: "#0B2817",
    900: "#10351F",
    800: "#194828",
    700: "#205A34",
    600: "#2B6B40",
    500: "#3C7C50",
    200: "#CFE0D4",
    100: "#E7F0E9",
    50: "#F3F7F4",
  },
  ink: "#172019",
  muted: "#68736C",
  border: "#DDE3DE",
  canvas: "#F8F9F6",
  white: "#FFFFFF",
};
```

---

# 83. CSS global

Recomendações:

```css
html {
  background: #F8F9F6;
}

body {
  color: #172019;
  background: #F8F9F6;
  font-family: var(--font-inter), sans-serif;
  -webkit-font-smoothing: antialiased;
}

button,
a,
input,
textarea,
select {
  -webkit-tap-highlight-color: transparent;
}
```

---

# 84. Fontes no Next.js

Exemplo conceitual:

```ts
import { Inter, Cormorant_Garamond } from "next/font/google";
```

Utilizar `next/font` para evitar layout shift.

---

# 85. Imagens no Next.js

Usar `next/image`.

Avatares:

- `object-cover`;
- `aspect-square`;
- sizes corretos.

---

# 86. Breakpoints

Sugestão:

- sm: 640;
- md: 768;
- lg: 1024;
- xl: 1280.

Porém, a UI principal continuará com max-width reduzido.

---

# 87. Layout desktop do app

Quando aberto no notebook:

```text
██████████████████████████████████████████
██                                      ██
██          ┌────────────────┐          ██
██          │                │          ██
██          │   APP MOBILE   │          ██
██          │                │          ██
██          └────────────────┘          ██
██                                      ██
██████████████████████████████████████████
```

Não precisa imitar um telefone; apenas manter coluna central.

---

# 88. Layout desktop futuro

Se futuramente o produto ganhar comunidade web completa, aí sim podemos criar layout horizontal.

Não fazer isso no MVP.

---

# 89. Comportamento do teclado mobile

Inputs devem:

- subir conteúdo corretamente;
- não ficar escondidos pela bottom navigation;
- utilizar `inputmode` adequado.

WhatsApp:

`inputMode="tel"`

Busca:

`type="search"`

---

# 90. Scroll

A página deve usar scroll natural do navegador.

Evitar containers internos com scroll vertical.

---

# 91. Sticky elements

Permitidos:

- bottom navigation;
- header simples em páginas longas.

Não deixar múltiplas barras sticky.

---

# 92. Header sticky

Se usado:

- fundo com leve transparência;
- blur muito discreto;
- border-bottom.

Mas a opção mais simples é fundo sólido.

---

# 93. Visual de seleção de tag

Desmarcada:

```text
Tecnologia
```

fundo Green 50.

Selecionada:

```text
✓ Tecnologia
```

fundo Green 800.

Evitar check se poluir demais; cor pode ser suficiente quando label é visível.

---

# 94. Card de match versus linha de participante

Participante:

lista leve.

Match:

card rico.

Isso cria hierarquia e evita que todas as telas pareçam iguais.

---

# 95. Consistência de nomes

Usar sempre:

- Presentes;
- Conexões;
- Meu perfil.

Não alternar:

- Matches;
- Networking;
- Recomendações;
- Pessoas sugeridas;

a menos que seja copy explicativa.

---

# 96. Regras para admin

Admin não aparece na navegação do convidado.

Rota separada.

Autenticação separada.

O design do convidado nunca deve revelar controles administrativos.

---

# 97. Versão visual do MVP

O MVP deve conter visualmente:

- entrada verde;
- login claro;
- onboarding claro;
- home clara;
- perfis claros;
- menu verde;
- bottom nav clara.

Esse contraste cria identidade sem deixar todas as telas pesadas.

---

# 98. Proporção de uso de cores

Referência aproximada:

- 65–75% neutros claros;
- 15–25% branco;
- 10–15% verde;
- outras cores apenas semânticas.

O verde funciona melhor como destaque porque não está em todo lugar.

---

# 99. O que evitar visualmente

Não usar:

- grandes gradientes;
- fundo preto;
- glassmorphism pesado;
- bordas brilhantes;
- cards flutuantes em excesso;
- ilustrações 3D genéricas;
- emojis grandes;
- ícones coloridos aleatórios;
- fontes futuristas;
- botões pill gigantes;
- sombras fortes;
- dashboards densos;
- tabelas na experiência do convidado.

---

# 100. Checklist final de implementação

Antes de considerar uma tela pronta:

- [ ] funciona em 320 px;
- [ ] funciona em 390 px;
- [ ] funciona em iPhone com safe area;
- [ ] botão principal tem pelo menos 44 px;
- [ ] input usa fonte mínima de 16 px;
- [ ] contraste está correto;
- [ ] não existe overflow horizontal;
- [ ] nome longo não quebra o layout;
- [ ] foto ausente possui fallback;
- [ ] campo ausente não mostra placeholder estranho;
- [ ] loading possui estado;
- [ ] erro possui estado;
- [ ] empty state possui copy;
- [ ] ação de voltar funciona;
- [ ] bottom navigation não cobre conteúdo;
- [ ] link social abre corretamente;
- [ ] foco via teclado é visível;
- [ ] movimento respeita reduced motion;
- [ ] conteúdo importante não depende de hover.

---

# 101. Resumo visual final

A aplicação deve parecer uma extensão digital elegante do jantar.

A experiência visual ideal é:

```text
VERDE PROFUNDO
     +
FUNDO CLARO E QUENTE
     +
TIPOGRAFIA EDITORIAL
     +
INTERFACE FUNCIONAL SANS-SERIF
     +
FOTOS DE PESSOAS
     +
MUITO ESPAÇO
     +
POUCAS AÇÕES POR TELA
```

O resultado esperado é um produto:

**discreto, refinado, rápido, humano e fácil de usar.**

A interface não compete com o evento.

Ela cumpre uma função específica:

> ajudar cada convidado a descobrir quem está presente, entender quem são essas pessoas e iniciar conversas que façam sentido.

---

# 102. Fonte de verdade para o MVP

Durante a implementação, quando houver dúvida de design, aplicar esta ordem de prioridade:

1. facilidade de uso no celular;
2. clareza da ação;
3. consistência com o sistema visual;
4. velocidade;
5. elegância;
6. efeito estético.

Se um elemento for bonito, mas dificultar o uso, ele deve ser simplificado.

O Conectar deve impressionar pela **qualidade da experiência**, não pela quantidade de elementos visuais.
