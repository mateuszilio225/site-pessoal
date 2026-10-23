# SPECS — Site pessoal / portfólio de projetos

**Versão:** 1.0 (planejamento)
**Status:** aprovado para implementação — nenhum arquivo de site foi criado ainda
**Última atualização:** 2026-10-23
**Documento irmão:** [`AGENTS.md`](./AGENTS.md) (como o agente deve trabalhar)

---

## 1. Visão geral

### 1.1 Objetivo
Publicar uma página pessoal estática que apresente **quem é o autor**, seus **projetos** e
um **canal de contato**, servindo como portfólio para recrutadores, lideranças técnicas e
clientes em potencial.

### 1.2 Proposta de valor
Em menos de 30 segundos, um visitante deve conseguir responder:
1. Quem é essa pessoa e o que ela faz?
2. Quais projetos ela já construiu e onde ver o código/demo?
3. Como falar com ela?

### 1.3 Métricas de sucesso (qualitativas nesta fase)
- Todas as seções legíveis sem JavaScript (exceto a lista de projetos).
- Navegação completa por teclado e contraste AA nos dois temas.
- Página carregando com zero requisições externas.
- Adicionar um novo projeto exige editar **um único arquivo**.

---

## 2. Escopo

### 2.1 Dentro do escopo
- Página única com: **Hero + bio**, **Projetos**, **Contato** (e rodapé mínimo).
- Alternância **claro/escuro** com persistência.
- Alternância **PT-BR/EN** com persistência.
- Foto de perfil com fallback de iniciais.
- Animações de revelação no scroll, respeitando `prefers-reduced-motion`.
- Publicação via GitHub Pages em `main` / root.
- Documentação de manutenção (`README.md`, `AGENTS.md`, este arquivo).

### 2.2 Fora do escopo (v1)
- Backend, banco de dados, autenticação.
- Formulário de contato com envio (só links diretos: e-mail e LinkedIn).
- Blog / CMS / área administrativa.
- Download de CV em PDF.
- Analytics, cookies, rastreamento de qualquer tipo.
- `sitemap.xml`, `robots.txt`, Open Graph avançado (apenas metatags básicas).
- Domínio próprio.
- Tema automático pelo sistema operacional (a decisão foi: padrão claro).
- Busca, filtros e paginação de projetos.

### 2.3 Fora do escopo, candidatos a v2
- Página de detalhe por projeto.
- OG image gerada + sitemap.
- Suporte a `prefers-color-scheme` como *terceira* opção ("automático").
- CV em PDF.

---

## 3. Identidade e endereço

| Item | Valor |
|---|---|
| Repositório | `mateuszilio225/site-pessoal` (público) |
| Branch de publicação | `main` |
| Pasta publicada | `/` (raiz) |
| URL | https://mateuszilio225.github.io/site-pessoal/ |
| Domínio próprio | não, nesta versão |
| `.nojekyll` | sim, na raiz (evita processamento do Jekyll) |

> **Nota técnica:** em Pages de projeto a URL tem subpasta. Por isso **todos** os caminhos
> de assets devem ser **relativos** (`assets/...`, `css/...`), nunca absolutos (`/assets/...`).

---

## 4. Stack e arquitetura

- HTML5 semântico
- CSS3 (custom properties, Grid, Flexbox, `clamp()`, `color-scheme`)
- JavaScript ES2022 em scripts clássicos (sem bundler)
- Nenhuma dependência, nenhum passo de build

```
site-pessoal/
├─ index.html
├─ .nojekyll
├─ AGENTS.md
├─ SPECS.md
├─ README.md
├─ .gitignore
├─ assets/
│  ├─ foto.webp              # foto de perfil (fallback: iniciais)
│  ├─ favicon.svg
│  └─ projects/               # capturas dos projetos
├─ css/
│  ├─ tokens.css              # design tokens (claro + escuro)
│  └─ styles.css              # base, layout e componentes
└─ js/
   ├─ theme.js                # tema + persistência
   ├─ i18n.js                 # dicionários pt/en
   ├─ projects.data.js        # window.PROJECTS (dados puros)
   ├─ render.js               # renderização dos cards
   ├─ scroll.js               # IntersectionObserver / reveal
   └─ main.js                 # bootstrap: liga tudo
```

Ordem de carregamento no `<head>`: script anti-FOUC de tema (inline) → `tokens.css` →
`styles.css`. Antes de `</body>`: `theme.js`, `i18n.js`, `projects.data.js`, `render.js`,
`scroll.js`, `main.js` (todos com `defer`).

---

## 5. Requisitos funcionais

Prioridade: **M** = must, **S** = should, **C** = could.

| ID | Requisito | Prioridade | Critério de aceite |
|---|---|---|---|
| RF-01 | Hero com nome (`<h1>`), título profissional, bio curta e dois CTAs ("Ver projetos", "Falar comigo") | M | Visível acima da dobra em 360×640; CTAs com foco visível |
| RF-02 | Foto de perfil circular/quadrada com borda, carregada de `assets/foto.webp` | M | Se a imagem falhar ou não existir, exibe bloco com iniciais do nome e `aria-hidden` correto |
| RF-03 | Seção "Projetos" com grade de cards (1 col. mobile, 2 col. ≥ 768 px, 3 col. ≥ 1024 px) | M | Cards alinhados; 1, 2 e 3 colunas conforme breakpoint |
| RF-04 | Cada card exibe: título, resumo, ano, stack (chips), status e links "Código" / "Demo" | M | Links abrem em nova aba com `rel="noopener noreferrer"`; "Demo" oculto se `demo: null` |
| RF-05 | Projetos renderizados a partir de `window.PROJECTS` | M | Lista vazia → estado vazio traduzido, sem erro no console |
| RF-06 | Ordenação: `featured` desc → `year` desc → `title.pt` asc | S | Testado com 3+ projetos |
| RF-07 | Alternância de tema claro/escuro | M | Atributo em `<html>`, persistido em `sp:theme`, ícone e `aria-pressed` corretos |
| RF-08 | Alternância de idioma PT-BR/EN | M | Todos os textos e `lang` mudam; persistido em `sp:lang`; sem chave faltante |
| RF-09 | Animações de revelação ao entrar na viewport | C | Uma vez por elemento; desativadas com `prefers-reduced-motion: reduce` |
| RF-10 | Seção "Contato" com e-mail, GitHub e LinkedIn | M | `mailto:` e links externos corretos; texto do e-mail legível (não imagem) |
| RF-11 | Rodapé com © ano atual e link "voltar ao topo" | C | Ano calculado em JS |
| RF-12 | Skip link e navegação âncora para as três seções | S | Tab revela o link antes de qualquer outro elemento |

---

## 6. Requisitos não funcionais

| ID | Requisito | Meta |
|---|---|---|
| RNF-01 | Responsividade | 320 px → 1920 px sem scroll horizontal |
| RNF-02 | Acessibilidade | WCAG 2.1 nível AA nos fluxos principais |
| RNF-03 | Performance | 0 requisições externas; LCP < 2.0 s em 4G; CLS < 0.05 |
| RNF-04 | Peso | CSS+JS próprios < 60 KB; página < 350 KB sem imagens de projeto |
| RNF-05 | Compatibilidade | Chrome/Edge/Firefox últimas 2 versões, Safari 16+, iOS Safari 16+ |
| RNF-06 | Manutenção | Adicionar projeto = editar 1 arquivo; adicionar texto = editar 2 chaves |
| RNF-07 | Privacidade | Sem cookies, sem analytics, sem fontes externas, sem terceiros |
| RNF-08 | Robustez | Tema/idioma funcionam com `localStorage` bloqueado |
| RNF-09 | SEO básico | `title`, `meta description`, `lang`, headings semânticos, `canonical` |

---

## 7. Design system

### 7.1 Cores

**Tema claro (`:root`)**

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#FFFFFF` | Fundo da página |
| `--bg-subtle` | `#F7F7FA` | Faixas alternadas / chips |
| `--surface` | `#FFFFFF` | Cards |
| `--border` | `#E4E4EC` | Bordas e divisores |
| `--text` | `#17171F` | Texto principal |
| `--text-muted` | `#5C5C6E` | Texto secundário |
| `--accent` | `#7C3AED` | Links, CTAs, destaques |
| `--accent-hover` | `#6D28D9` | Hover do accent |
| `--accent-contrast` | `#FFFFFF` | Texto sobre accent |
| `--accent-soft` | `#F3EEFF` | Fundo de chips/realces |
| `--focus-ring` | `#7C3AED` | Outline de foco |

**Tema escuro (`[data-theme="dark"]`)**

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#0E0E13` | Fundo da página |
| `--bg-subtle` | `#15151C` | Faixas alternadas |
| `--surface` | `#17171F` | Cards |
| `--border` | `#2A2A36` | Bordas |
| `--text` | `#F2F2F7` | Texto principal |
| `--text-muted` | `#A1A1B2` | Texto secundário |
| `--accent` | `#A78BFA` | Destaque (clareado p/ contraste) |
| `--accent-hover` | `#C4B5FD` | Hover |
| `--accent-contrast` | `#14101F` | Texto sobre accent |
| `--accent-soft` | `rgba(124, 58, 237, 0.16)` | Chips/realces |
| `--focus-ring` | `#A78BFA` | Outline de foco |

Contraste alvo: `--text` sobre `--bg` ≥ 15:1; `--text-muted` sobre `--bg` ≥ 4.5:1;
`--accent-contrast` sobre `--accent` ≥ 4.5:1 (verificar no tema escuro).

### 7.2 Tipografia

`--font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

Sem fonte monoespaçada como base; se necessário para stack técnica, usar
`ui-monospace, "Cascadia Code", Consolas, monospace`.

| Token | Tamanho | Uso |
|---|---|---|
| `--text-xs` | `0.8125rem` (13) | Metadados, ano, rodapé |
| `--text-sm` | `0.9375rem` (15) | Chips, textos auxiliares |
| `--text-base` | `1rem` (16) | Corpo |
| `--text-lg` | `clamp(1.0625rem, 1.5vw, 1.1875rem)` | Bio / lead |
| `--text-xl` | `clamp(1.25rem, 2vw, 1.5rem)` | Subtítulos |
| `--text-2xl` | `clamp(1.5rem, 3vw, 1.875rem)` | Título de seção (h2) |
| `--text-3xl` | `clamp(1.75rem, 4vw, 2.25rem)` | Título de card em destaque |
| `--text-4xl` | `clamp(2rem, 5vw, 3rem)` | Nome no hero (h1) — mobile→desktop |
| `--text-5xl` | `clamp(2.5rem, 7vw, 4rem)` | Reservado (nome em telas grandes) |

Pesos: 400 corpo, 500 ênfase, 600 títulos, 700 nome.
Entrelinha: `--leading-tight` 1.15 (títulos), `--leading-normal` 1.6 (corpo).
Largura de leitura: `--prose: 65ch`.

### 7.3 Espaçamento e layout

Escala de 4 px: `--space-1..4` = 4, 8, 12, 16; `--space-5` 24; `--space-6` 32;
`--space-7` 48; `--space-8` 64; `--space-9` 96; `--space-10` 128.

- `--container: 1100px` com `--gutter: clamp(16px, 5vw, 32px)`
- Padding vertical de seção: `clamp(56px, 9vw, 112px)`
- Grid de projetos: `repeat(auto-fit, minmax(280px, 1fr))`, `gap: var(--space-5)`

Breakpoints (mobile-first):

| Nome | `min-width` | Efeito |
|---|---|---|
| `sm` | 480 px | Hero com foto ao lado do texto (a partir daqui) |
| `md` | 768 px | Projetos em 2 colunas |
| `lg` | 1024 px | Projetos em 3 colunas, container centralizado |
| `xl` | 1280 px | Aumento de headline e respiro |

### 7.4 Forma, sombra e movimento

- Raios: `8px` (chips/botões), `12px` (cards), `20px` (blocos grandes), `999px` (pílulas)
- Sombras: `--shadow-sm: 0 1px 2px rgb(0 0 0 / .06)`; `--shadow-md: 0 8px 24px rgb(0 0 0 / .08)`.
  No tema escuro, cards usam `border` em vez de sombra.
- Movimento: `--dur-fast 120ms`, `--dur-base 200ms`, `--dur-slow 400ms`, `--ease-out cubic-bezier(.2,.7,.3,1)`
- Hover de card: `translateY(-2px)` + `--shadow-md` (150 ms). Nunca scale.

---

## 8. Estrutura da página

| Ordem | Seção | `id` | Conteúdo |
|---|---|---|---|
| 0 | Header fixo leve | — | Nome/logo textual + botões [tema] [idioma] |
| 1 | Hero | `inicio` | Foto, `h1` {{NOME}}, subtítulo {{CARGO}}, bio {{BIO}}, CTAs |
| 2 | Projetos | `projetos` | `h2`, lead curto, grade de cards |
| 3 | Contato | `contato` | `h2`, frase de chamada, e-mail {{EMAIL}}, GitHub, LinkedIn |
| 4 | Rodapé | — | © {{ANO}} {{NOME}} · "Feito com HTML, CSS e JS" |

### 8.1 Dados de conteúdo

Confirmados pelo usuário em 2026-10-23:

| Campo | Valor | Uso |
|---|---|---|
| Nome exibido | `Mateus` | `h1`, `<title>`, rodapé, iniciais do fallback (`M`) |
| Cargo | `Estudante de Ciência da Computação` | Subtítulo do hero |
| Bio (PT) | `Curso Ciência da Computação em Passo Fundo, RS.` | Hero |
| Bio (EN) | `I study Computer Science in Passo Fundo, Brazil.` | Hero |
| E-mail | `mateuszilio225@gmail.com` | Seção de contato + `mailto:` |
| LinkedIn | `https://www.linkedin.com/in/mateus-zilio/` | Contato (sem parâmetros `?trk=`) |
| GitHub | `https://github.com/mateuszilio225` | Contato |
| Localização | `Passo Fundo, RS, Brasil` | Hero (opcional) |

Pendências (não bloqueiam a implementação, bloqueiam apenas o conteúdo final):

| Pendência | Comportamento até ser resolvida |
|---|---|
| Sobrenome ("Zilio"?) | Exibir apenas `Mateus`; troca pontual em 3 locais (ver `TODO.md` T-5.4) |
| Foto de perfil | Fallback de iniciais `M` (bloco com `--accent-soft` e `--accent`) |
| Lista de projetos | Apenas `site-pessoal` (dados reais deste repositório) |

> O site **não deve ir ao ar** com placeholders `{{...}}` visíveis. Antes do deploy,
> `grep` por `{{` deve retornar zero ocorrências (ver `TODO.md` T-5.1).

---

## 9. Idioma (i18n)

- Dicionários: `window.I18N.pt` e `window.I18N.en` em `js/i18n.js`.
- Aplicação: `data-i18n="chave"` para texto; `data-i18n-attr="aria-label:chave"` para atributos.
- Chaves agrupadas por seção: `nav.*`, `hero.*`, `projects.*`, `contact.*`, `footer.*`, `a11y.*`, `meta.*`.
- `document.documentElement.lang` = `pt-BR` ou `en`.
- Persistência: `sp:lang`. Padrão: `pt`.
- Botão: `aria-pressed` + `aria-label` ("Mudar para inglês" / "Switch to Portuguese").
- Paridade de chaves obrigatória (mesma quantidade e mesmos nomes).
- Valores de `<title>` e `meta[name=description]` também traduzem (via JS no `meta.*`).

---

## 10. Tema

- Atributo `data-theme` em `<html>`; padrão `light`.
- Script inline no `<head>` (≈ 6 linhas) lê `sp:theme` antes da primeira pintura.
- `color-scheme: light dark` no CSS para Scrollbars/inputs nativos coerentes.
- `meta[name=theme-color]` = `#FFFFFF` (claro) / `#0E0E13` (escuro), atualizado em JS.
- Transição de cor restrita a `background-color`, `border-color`, `color` (200 ms), nunca em `*`.

---

## 11. Modelo de dados de projetos

Arquivo: `js/projects.data.js` → `window.PROJECTS = [...]`.

```js
window.PROJECTS = [
  {
    id: 'site-pessoal',
    title: { pt: 'Site pessoal', en: 'Personal website' },
    summary: {
      pt: 'Portfólio estático com tema claro/escuro e dois idiomas.',
      en: 'Static portfolio with light/dark theme and two languages.'
    },
    stack: ['HTML', 'CSS', 'JavaScript'],
    year: 2026,
    status: 'live',
    repo: 'https://github.com/mateuszilio225/site-pessoal',
    demo: 'https://mateuszilio225.github.io/site-pessoal/',
    image: null,
    featured: true
  }
];
```

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | string | sim | kebab-case, único |
| `title` | `{pt,en}` | sim | ≤ 40 caracteres por idioma |
| `summary` | `{pt,en}` | sim | 1–2 frases, ≤ 140 caracteres |
| `stack` | string[] | sim | 3–6 itens |
| `year` | number | sim | 4 dígitos |
| `status` | enum | sim | `live` \| `wip` \| `archived` |
| `repo` | string | sim | URL GitHub |
| `demo` | string \| null | não | URL pública |
| `image` | string \| null | não | caminho relativo WebP |
| `featured` | boolean | sim | destaque |

---

## 12. Estados e interações

| Elemento | Hover | Focus-visible | Active | Vazio/erro |
|---|---|---|---|---|
| Botão primário | accent-hover | ring 2px offset 2 | levemente escurecido | — |
| Card de projeto | sobe 2px + sombra | ring no card | — | sem imagem → card compacto |
| Link de texto | sublinhado | ring | — | — |
| Toggle tema/idioma | bg-subtle | ring | ícone troca | `localStorage` bloqueado → mantém padrão |
| Lista de projetos | — | — | — | mensagem "Nenhum projeto publicado ainda." nos 2 idiomas |

- Carregamento: sem skeleton. Os cards entram via reveal quando o JS roda; sem JS, a seção
  mostra o estado vazio (comportamento aceitável e documentado).
- `prefers-reduced-motion`: sem reveal, sem transição de hover, conteúdo imediatamente visível.

---

## 13. Acessibilidade

Meta: **WCAG 2.1 AA**.

- Landmarks: `header`, `nav`, `main`, `footer`; `main` com `id="conteudo"`.
- Skip link primeiro elemento focável.
- `aria-labelledby` em cada `<section>`.
- Imagens: foto com `alt` = "Foto de {{NOME}}"; capturas com `alt` descritivo; decorativas `alt=""`.
- Ícones SVG sempre `aria-hidden="true"` + `focusable="false"`; rótulo textual quando sozinho.
- Estados dos toggles anunciados (`aria-pressed`), nunca só cor.
- Contraste AA em ambos os temas; foco nunca removido sem substituto.
- Alvos de toque ≥ 44×44 px; espaçamento mínimo de 8 px entre alvos.
- Zoom 200% e reflow a 320 px sem perda de função.
- Texto não justificado; evitar blocos com `letter-spacing` negativo no corpo.

---

## 14. Performance

| Item | Orçamento |
|---|---|
| Requisições externas | 0 |
| HTML | < 25 KB |
| CSS (2 arquivos) | < 20 KB |
| JS (6 arquivos) | < 25 KB |
| Foto do hero | < 150 KB (WebP) |
| Total inicial (sem imagens de projetos) | < 250 KB |
| LCP (4G simulado) | < 2.0 s |
| CLS | < 0.05 |
| Lighthouse (mobile) | Performance ≥ 95, Acessibilidade ≥ 95, Boas práticas ≥ 95, SEO ≥ 90 |

Técnicas obrigatórias: `defer` em todos os scripts, dimensões explícitas nas imagens,
`loading="lazy"` abaixo da dobra, `content-visibility: auto` apenas se medido e necessário,
sem bibliotecas externas.

---

## 15. SEO e metadados

- `<title>` único e traduzível: `{{NOME}} — {{CARGO}}`
- `meta[name=description]` ≤ 155 caracteres, traduzível.
- `<link rel="canonical" href="https://mateuszilio225.github.io/site-pessoal/">`
- `meta[name=theme-color]`, `meta[name=viewport]` (`width=device-width, initial-scale=1`)
- `favicon.svg` + `apple-touch-icon` (opcional)
- Open Graph/Twitter Card: **fora do escopo v1** (roadmap).
- Hierarquia de headings: um `h1`, `h2` por seção, `h3` nos cards.

---

## 16. Publicação

1. Pages configurado em **Settings → Pages**: Source = `Deploy from a branch`, branch `main`, folder `/ (root)`.
2. `.nojekyll` na raiz.
3. Caminhos relativos em todos os assets (URL com subpasta `/site-pessoal/`).
4. Deploy a cada push em `main` (build automático leva ~30–60 s).
5. Verificação pós-deploy: abrir a URL em janela anônima, testar toggles, checar 404 de assets
   no DevTools (Network), testar em 360 px.
6. Cache do Pages: se um arquivo parecer antigo, `Ctrl+F5`; não versionar `CNAME` sem domínio.

---

## 17. Critérios de aceite (v1)

- [ ] URL pública carrega sem placeholders visíveis.
- [ ] Hero apresenta nome, cargo, bio, foto (ou fallback) e 2 CTAs funcionais.
- [ ] Projetos vêm de `js/projects.data.js`; adicionar um item novo o faz aparecer sem tocar em HTML.
- [ ] Grade responsiva: 1 / 2 / 3 colunas em 360 / 768 / 1280 px.
- [ ] Tema claro/escuro alterna e persiste após recarregar; sem flash de tema errado.
- [ ] Idioma PT/EN alterna e persiste; nenhuma string sem tradução.
- [ ] Teclado percorre header → hero → projetos → contato → rodapé com foco visível.
- [ ] Página funciona com JS desabilitado para todo o conteúdo textual.
- [ ] Zero requisições a domínios externos.
- [ ] Lighthouse mobile: Performance ≥ 95, Acessibilidade ≥ 95.
- [ ] `README.md` explica como rodar localmente e adicionar projetos.

---

## 18. Decisões registradas (ADR)

| ID | Decisão | Alternativas descartadas | Motivo |
|---|---|---|---|
| ADR-001 | HTML/CSS/JS puro, sem build | Astro, Next.js, Jekyll | Menor atrito, aprendizado e manutenção; site de uma página não justifica framework |
| ADR-002 | Dados em `js/projects.data.js` (`window.PROJECTS`) | `projects.json` + `fetch` | `fetch` falha ao abrir `file://`; JS puro permite editar e testar sem servidor |
| ADR-003 | Tema padrão claro; sem `prefers-color-scheme` | Seguir SO | Escolha explícita do usuário; previsibilidade visual |
| ADR-004 | Fontes do sistema | Google Fonts / self-hosted | Zero requisições, privacidade, performance e ausência de FOUT |
| ADR-005 | Accent roxo `#7C3AED` / `#A78BFA` | Azul, esmeralda, terracota | Escolha do usuário; bom contraste nos dois temas |
| ADR-006 | Sem formulário de contato | Formspree/Netlify Forms | Evita dependência de terceiros e spam; `mailto:` + LinkedIn bastam |
| ADR-007 | Dados pessoais como placeholders até serem fornecidos | Conteúdo fictício | Evita publicar informação falsa sobre o usuário |

---

## 19. Roadmap

**v1.0** — escopo deste documento.
**v1.1** — OG image + sitemap + `robots.txt`; filtro por stack; seção "outros repositórios" via API do GitHub.
**v1.2** — página de detalhe por projeto; opção de tema "automático"; CV em PDF.

---

## 20. Riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| Deploy com placeholders visíveis | Alto (imagem profissional) | Checklist §17 antes de divulgar; revisão manual |
| Texto traduzido só em um idioma | Médio | Teste de paridade de chaves antes de cada commit |
| Contraste insuficiente no tema escuro | Médio | Verificação AA com DevTools em cada mudança de cor |
| Caminho absoluto quebrando na subpasta do Pages | Alto | Regra de caminhos relativos no `AGENTS.md` §5 |
| Imagem do hero pesada | Médio | Limite de 150 KB e conversão para WebP |
| Conteúdo factual inventado pelo agente | Alto | `AGENTS.md` §9 e confirmação obrigatória (§15) |
