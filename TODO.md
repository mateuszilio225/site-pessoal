# TODO — Execução do site pessoal

> **Documento operacional.** Cada tarefa tem: o que fazer, onde, como verificar e o que fazer
> se falhar. A especificação de produto está em [`SPECS.md`](./SPECS.md); as regras de trabalho
> estão em [`AGENTS.md`](./AGENTS.md). Em caso de conflito, `SPECS.md` vence.

**Instruções para quem executa (inclusive modelo sem raciocínio):**

1. Execute **na ordem numérica**. Não pule tarefas nem antecipe fases.
2. Marque `[x]` ao concluir. Se uma verificação falhar, **pare**, consulte o Apêndice B e só
   siga depois de resolver.
3. Não invente conteúdo, textos, projetos, links ou números. Use exatamente os dados da §0.
4. Não adicione dependências, frameworks, fontes externas, analytics ou formulários.
5. Use caminhos **relativos** (`assets/...`), nunca iniciados por `/`.
6. Faça **um commit por fase**, com a mensagem indicada na fase. Nunca `--force`.
7. Ao final de cada fase, rode a verificação da fase inteira, não só da última tarefa.

---

## 0. Dados canônicos (copiar literalmente)

| Constante | Valor exato |
|---|---|
| `NOME` | `Mateus` |
| `CARGO` | `Estudante de Ciência da Computação` |
| `BIO_PT` | `Curso Ciência da Computação em Passo Fundo, RS.` |
| `BIO_EN` | `I study Computer Science in Passo Fundo, Brazil.` |
| `EMAIL` | `mateuszilio225@gmail.com` |
| `LINKEDIN` | `https://www.linkedin.com/in/mateus-zilio/` |
| `GITHUB` | `https://github.com/mateuszilio225` |
| `LOCALIZACAO_PT` | `Passo Fundo, RS, Brasil` |
| `LOCALIZACAO_EN` | `Passo Fundo, Brazil` |
| `INICIAIS` | `M` |
| `REPO` | `mateuszilio225/site-pessoal` |
| `URL_SITE` | `https://mateuszilio225.github.io/site-pessoal/` |
| `BRANCH` | `main` |

Proibido nesta versão: formulário, analytics, CV, blog, domínio próprio, dependências externas,
fontes do Google, ícones de CDN.

---

## Fase 0 — Pré-requisitos

### T-0.1 Verificar ferramentas

```powershell
git --version
gh --version
python --version
node --version
```

**Esperado:** quatro linhas de versão, sem "não reconhecido".
**Se falhar:** instale Git, GitHub CLI, Python 3 e Node.js 18+ e reabra o terminal.

### T-0.2 Verificar autenticação e repositório

```powershell
gh auth status
git remote -v
git status -sb
```

**Esperado:** `Logged in to github.com account mateuszilio225`; `origin` apontando para
`https://github.com/mateuszilio225/site-pessoal.git`; branch `main` limpa e sincronizada.
**Se falhar:** rode `gh auth login --web` e `git push -u origin main`.

### T-0.3 Iniciar servidor local (deixe rodando em um terminal separado)

```powershell
python -m http.server 8000
```

**Esperado:** `Serving HTTP on 0.0.0.0 port 8000`.
**Verificação:** abra http://localhost:8000 — deve listar os arquivos do repositório.

---

## Fase 1 — Esqueleto de arquivos

### T-1.1 Criar pastas

```powershell
New-Item -ItemType Directory -Force css, js, assets, assets\projects | Out-Null
```

**Esperado:** `css/`, `js/`, `assets/`, `assets/projects/` existem.

### T-1.2 Criar `.nojekyll` vazio

```powershell
New-Item -ItemType File -Force .nojekyll | Out-Null
```

**Esperado:** `Test-Path .nojekyll` → `True`.

### T-1.3 Criar `css/tokens.css` com exatamente este conteúdo

```css
:root {
  color-scheme: light;

  /* Cor */
  --bg: #ffffff;
  --bg-subtle: #f7f7fa;
  --surface: #ffffff;
  --border: #e4e4ec;
  --text: #17171f;
  --text-muted: #5c5c6e;
  --accent: #7c3aed;
  --accent-hover: #6d28d9;
  --accent-contrast: #ffffff;
  --accent-soft: #f3eeff;
  --focus-ring: #7c3aed;

  /* Tipografia */
  --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --font-mono: ui-monospace, "Cascadia Code", Consolas, monospace;
  --text-xs: 0.8125rem;
  --text-sm: 0.9375rem;
  --text-base: 1rem;
  --text-lg: clamp(1.0625rem, 1.5vw, 1.1875rem);
  --text-xl: clamp(1.25rem, 2vw, 1.5rem);
  --text-2xl: clamp(1.5rem, 3vw, 1.875rem);
  --text-3xl: clamp(1.75rem, 4vw, 2.25rem);
  --text-4xl: clamp(2rem, 5vw, 3rem);
  --text-5xl: clamp(2.5rem, 7vw, 4rem);
  --leading-tight: 1.15;
  --leading-normal: 1.6;
  --tracking-tight: -0.02em;

  /* Espaço (escala de 4px) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;

  /* Layout */
  --container: 1100px;
  --prose: 65ch;
  --gutter: clamp(16px, 5vw, 32px);
  --section-y: clamp(56px, 9vw, 112px);

  /* Forma */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 999px;

  /* Sombra */
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.06);
  --shadow-md: 0 8px 24px rgb(0 0 0 / 0.08);

  /* Movimento */
  --ease-out: cubic-bezier(0.2, 0.7, 0.3, 1);
  --dur-fast: 120ms;
  --dur-base: 200ms;
  --dur-slow: 400ms;

  /* Camadas */
  --z-header: 100;
  --z-overlay: 200;
}

[data-theme="dark"] {
  color-scheme: dark;

  --bg: #0e0e13;
  --bg-subtle: #15151c;
  --surface: #17171f;
  --border: #2a2a36;
  --text: #f2f2f7;
  --text-muted: #a1a1b2;
  --accent: #a78bfa;
  --accent-hover: #c4b5fd;
  --accent-contrast: #14101f;
  --accent-soft: rgb(124 58 237 / 0.16);
  --focus-ring: #a78bfa;
  --shadow-sm: none;
  --shadow-md: none;
}
```

**Verificação:** nenhuma cor literal (`#`) deve existir em `css/styles.css` depois (T-3.x).

### T-1.4 Criar `css/styles.css` vazio com índice de seções

```css
/* --- Base --- */
/* --- Layout --- */
/* --- Header --- */
/* --- Hero --- */
/* --- Projetos --- */
/* --- Contato --- */
/* --- Rodapé --- */
/* --- Utilitários e movimento --- */
/* --- Breakpoints --- */
```

### T-1.5 Criar arquivos JS vazios

```powershell
"use strict;" | Set-Content js\theme.js
"use strict;" | Set-Content js\i18n.js
"use strict;" | Set-Content js\projects.data.js
"use strict;" | Set-Content js\render.js
"use strict;" | Set-Content js\scroll.js
"use strict;" | Set-Content js\main.js
```

### T-1.6 Criar `index.html` mínimo válido

```html
<!DOCTYPE html>
<html lang="pt-BR" data-theme="light">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Mateus — Estudante de Ciência da Computação</title>
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <main id="conteudo"></main>
</body>
</html>
```

**Verificação:** http://localhost:8000 carrega a página em branco; aba do DevTools Console sem erros.

### T-1.7 Commit da fase

```powershell
git add -A
git commit -m "chore: cria esqueleto de arquivos do site"
```

---

## Fase 2 — HTML completo

### T-2.1 `<head>` definitivo

Substitua o `<head>` atual por:

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title data-i18n="meta.title">Mateus — Estudante de Ciência da Computação</title>
  <meta name="description" data-i18n-attr="content:meta.description"
        content="Portfólio de Mateus, estudante de Ciência da Computação em Passo Fundo, RS.">
  <link rel="canonical" href="https://mateuszilio225.github.io/site-pessoal/">
  <meta name="theme-color" content="#ffffff" id="meta-theme-color">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/styles.css">
  <script>
    (function () {
      try {
        var t = localStorage.getItem("sp:theme");
        if (t === "dark" || t === "light") {
          document.documentElement.setAttribute("data-theme", t);
        }
      } catch (e) {}
    })();
  </script>
</head>
```

**Regras:** o script anti-FOUC é o **único** script inline permitido. Todos os `href`/`src`
internos são relativos.

### T-2.2 Cabeçalho, navegação e toggles

Dentro de `<body>`, antes do `<main>`:

```html
<a class="skip-link" href="#conteudo" data-i18n="a11y.skip">Pular para o conteúdo</a>

<header class="site-header">
  <div class="container header__inner">
    <a class="header__brand" href="#inicio">Mateus</a>

    <nav class="header__nav" data-i18n-attr="aria-label:nav.label" aria-label="Navegação principal">
      <ul class="header__list">
        <li><a class="header__link" href="#projetos" data-i18n="nav.projects">Projetos</a></li>
        <li><a class="header__link" href="#contato" data-i18n="nav.contact">Contato</a></li>
      </ul>
    </nav>

    <div class="header__actions">
      <button class="icon-button" id="theme-toggle" type="button" aria-pressed="false"
              data-i18n-attr="aria-label:theme.to_dark" aria-label="Mudar para tema escuro">
        <svg class="icon icon--sun" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"></circle>
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
        </svg>
        <svg class="icon icon--moon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z"
                fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path>
        </svg>
      </button>

      <button class="lang-toggle" id="lang-toggle" type="button" aria-pressed="false"
              data-i18n-attr="aria-label:lang.to_en" aria-label="Mudar para inglês">
        <span id="lang-label" aria-hidden="true">EN</span>
      </button>
    </div>
  </div>
</header>
```

### T-2.3 Hero

```html
<main id="conteudo">
  <section class="hero" id="inicio" aria-labelledby="hero-title">
    <div class="container hero__inner">
      <div class="hero__media">
        <img class="hero__photo" id="hero-photo" src="assets/foto.webp" width="240" height="240"
             alt="Foto de Mateus" data-i18n-attr="alt:a11y.photo" decoding="async">
        <span class="hero__initials" id="hero-initials" aria-hidden="true" hidden>M</span>
      </div>

      <div class="hero__content">
        <p class="hero__eyebrow" data-i18n="hero.location">Passo Fundo, RS, Brasil</p>
        <h1 class="hero__title" id="hero-title">Mateus</h1>
        <p class="hero__role" data-i18n="hero.role">Estudante de Ciência da Computação</p>
        <p class="hero__bio" data-i18n="hero.bio">Curso Ciência da Computação em Passo Fundo, RS.</p>

        <div class="hero__actions">
          <a class="button button--primary" href="#projetos" data-i18n="hero.cta_projects">Ver projetos</a>
          <a class="button button--ghost" href="#contato" data-i18n="hero.cta_contact">Falar comigo</a>
        </div>
      </div>
    </div>
  </section>
```

**Regras:** existe **um único `<h1>`** na página. A foto usa `width`/`height` explícitos.
O bloco de iniciais começa `hidden` e só aparece se a imagem falhar (T-4.6).

### T-2.4 Seção de projetos

```html
  <section class="section" id="projetos" aria-labelledby="projects-title">
    <div class="container">
      <h2 class="section__title" id="projects-title" data-i18n="projects.title">Projetos</h2>
      <p class="section__lead" data-i18n="projects.lead">Uma seleção do que venho construindo.</p>

      <ul class="projects" id="projects-list"></ul>
      <p class="projects__empty" id="projects-empty" data-i18n="projects.empty" hidden>
        Nenhum projeto publicado ainda.
      </p>
    </div>
  </section>
```

### T-2.5 Seção de contato

```html
  <section class="section section--subtle" id="contato" aria-labelledby="contact-title">
    <div class="container">
      <h2 class="section__title" id="contact-title" data-i18n="contact.title">Contato</h2>
      <p class="section__lead" data-i18n="contact.lead">Escolha o canal que preferir.</p>

      <ul class="contact__list">
        <li>
          <a class="contact__link" href="mailto:mateuszilio225@gmail.com">
            <span class="contact__label" data-i18n="contact.email">E-mail</span>
            <span class="contact__value">mateuszilio225@gmail.com</span>
          </a>
        </li>
        <li>
          <a class="contact__link" href="https://github.com/mateuszilio225"
             target="_blank" rel="noopener noreferrer">
            <span class="contact__label" data-i18n="contact.github">GitHub</span>
            <span class="contact__value">mateuszilio225</span>
            <span class="sr-only" data-i18n="a11y.external">(abre em nova aba)</span>
          </a>
        </li>
        <li>
          <a class="contact__link" href="https://www.linkedin.com/in/mateus-zilio/"
             target="_blank" rel="noopener noreferrer">
            <span class="contact__label" data-i18n="contact.linkedin">LinkedIn</span>
            <span class="contact__value">in/mateus-zilio</span>
            <span class="sr-only" data-i18n="a11y.external">(abre em nova aba)</span>
          </a>
        </li>
      </ul>
    </div>
  </section>
</main>
```

**Atenção:** o LinkedIn deve estar **sem** `?trk=public-profile-join-page`.

### T-2.6 Rodapé e scripts

```html
<footer class="site-footer">
  <div class="container footer__inner">
    <p class="footer__text">
      © <span id="year">2026</span> Mateus.
      <span data-i18n="footer.rights">Todos os direitos reservados.</span>
    </p>
    <p class="footer__built" data-i18n="footer.built">Feito com HTML, CSS e JavaScript.</p>
  </div>
</footer>

<script defer src="js/theme.js"></script>
<script defer src="js/i18n.js"></script>
<script defer src="js/projects.data.js"></script>
<script defer src="js/render.js"></script>
<script defer src="js/scroll.js"></script>
<script defer src="js/main.js"></script>
</body>
</html>
```

**Verificação da fase:**
1. Sem console de erro (recarregue com F5).
2. Sem scroll horizontal em 320 px (DevTools → modo dispositivo).
3. `Ctrl+U` (código-fonte) mostra o texto do hero — prova que o conteúdo é estático.
4. Existe exatamente um `<h1>`: `Select-String -Path index.html -Pattern "<h1"`.

### T-2.7 Commit

```powershell
git add -A
git commit -m "feat: adiciona estrutura semantica da pagina"
```

---

## Fase 3 — CSS

> Toda cor/espaço/raio/sombra vem de `var(--token)`. Se faltar um valor, crie o token em
> `css/tokens.css` (nos dois temas) e registre em `SPECS.md` §7.

### T-3.1 Base

- `*, *::before, *::after { box-sizing: border-box; }`
- `html { -webkit-text-size-adjust: 100%; scroll-behavior: smooth; }`
  e, em `@media (prefers-reduced-motion: reduce)`, `scroll-behavior: auto`.
- `body`: `margin: 0`, `background: var(--bg)`, `color: var(--text)`,
  `font-family: var(--font-sans)`, `font-size: var(--text-base)`,
  `line-height: var(--leading-normal)`, `text-rendering: optimizeLegibility`,
  `border-top: 3px solid var(--accent)` (detalhe de identidade, opcional).
- `img { max-width: 100%; height: auto; display: block; }`
- `h1, h2, h3, p, ul { margin: 0 }`; títulos com `line-height: var(--leading-tight)`,
  `letter-spacing: var(--tracking-tight)`, `text-wrap: balance`.
- `a { color: var(--accent); text-underline-offset: 0.2em; }`
- `:focus-visible { outline: 2px solid var(--focus-ring); outline-offset: 2px; border-radius: 4px; }`
- `.sr-only` (visualmente oculto, mas lido por leitor de tela): `position:absolute; width:1px;
  height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0 0 0 0); white-space:nowrap; border:0;`
- Skip link: fora da tela por padrão (`position:absolute; top:-100px`), e no `:focus`
  posicionado no topo com fundo `--accent`, texto `--accent-contrast`, `z-index: var(--z-overlay)`.

### T-3.2 Layout

```css
.container {
  width: 100%;
  max-width: var(--container);
  margin-inline: auto;
  padding-inline: var(--gutter);
}
.section { padding-block: var(--section-y); }
.section--subtle { background: var(--bg-subtle); border-block: 1px solid var(--border); }
.section__title { font-size: var(--text-2xl); margin-bottom: var(--space-3); }
.section__lead { color: var(--text-muted); font-size: var(--text-lg); max-width: var(--prose); margin-bottom: var(--space-7); }
```

### T-3.3 Header

- `.site-header`: `position: sticky; top: 0; z-index: var(--z-header);`
  `background: color-mix(in srgb, var(--bg) 88%, transparent);`
  `backdrop-filter: blur(8px); border-bottom: 1px solid var(--border);`
- `.header__inner`: flex, `align-items: center`, `gap: var(--space-4)`, altura mínima 64px.
- `.header__brand`: `font-weight: 700`, cor `var(--text)`, sem sublinhado.
- `.header__nav`: escondido abaixo de 640 px (`display: none`), visível a partir de 640 px.
- `.header__list`: flex, `gap: var(--space-5)`, `list-style: none`, `padding: 0`.
- `.header__link`: cor `var(--text-muted)`, `text-decoration: none`, hover `var(--text)`.
- `.header__actions`: `margin-left: auto; display: flex; gap: var(--space-2);`
- `.icon-button`, `.lang-toggle`: 44×44 px, `display: grid; place-items: center`,
  `border: 1px solid var(--border)`, `border-radius: var(--radius-sm)`,
  `background: var(--surface)`, `color: var(--text)`, `cursor: pointer`,
  transição `border-color`/`color` com `--dur-fast`.
- Ícones: `.icon--moon { display: none }`; em `[data-theme="dark"]`, `.icon--sun { display: none }`
  e `.icon--moon { display: block }`.
- `.lang-toggle`: `font-size: var(--text-sm); font-weight: 600; letter-spacing: 0.04em;`

### T-3.4 Hero

- `.hero`: `padding-block: clamp(48px, 8vw, 96px);`
- `.hero__inner`: `display: grid; gap: var(--space-6);`
- `.hero__media`: `position: relative; width: 160px; height: 160px;`
- `.hero__photo`: `width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-full);
  border: 3px solid var(--surface); box-shadow: var(--shadow-md);`
- `.hero__initials`: `display: grid; place-items: center; width: 100%; height: 100%;
  border-radius: var(--radius-full); background: var(--accent-soft); color: var(--accent);
  font-size: var(--text-3xl); font-weight: 700;`
  (o estado `hidden` deve vencer: adicione `[hidden] { display: none !important; }` na base)
- `.hero__eyebrow`: `color: var(--accent); font-size: var(--text-xs); font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: var(--space-2);`
- `.hero__title`: `font-size: var(--text-4xl); font-weight: 700; margin-bottom: var(--space-2);`
- `.hero__role`: `font-size: var(--text-xl); color: var(--text-muted); margin-bottom: var(--space-4);`
- `.hero__bio`: `font-size: var(--text-lg); max-width: var(--prose); margin-bottom: var(--space-6);`
- `.hero__actions`: `display: flex; flex-wrap: wrap; gap: var(--space-3);`
- `.button`: `display: inline-flex; align-items: center; justify-content: center;
  min-height: 44px; padding: var(--space-3) var(--space-5); border-radius: var(--radius-sm);
  font-weight: 600; font-size: var(--text-sm); text-decoration: none;
  transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);`
- `.button--primary`: fundo `--accent`, texto `--accent-contrast`; hover `--accent-hover`.
- `.button--ghost`: fundo transparente, borda `1px solid var(--border)`, texto `--text`;
  hover `background: var(--bg-subtle)`.

### T-3.5 Projetos

- `.projects`: `list-style: none; padding: 0; display: grid; gap: var(--space-5);
  grid-template-columns: 1fr;` → 2 colunas em 768 px → 3 colunas em 1024 px.
- `.card`: `background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md);
  padding: var(--space-5); display: flex; flex-direction: column; gap: var(--space-3);
  transition: transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out),
  border-color var(--dur-base) var(--ease-out);`
- `.card:hover`: `transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: var(--accent);`
- `.card__header`: flex, `justify-content: space-between`, `align-items: flex-start`, `gap: var(--space-3)`.
- `.card__title`: `font-size: var(--text-xl); font-weight: 600;`
- `.card__summary`: `color: var(--text-muted); font-size: var(--text-sm);`
- `.chips`: `list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: var(--space-2);`
- `.chip`: `background: var(--accent-soft); color: var(--accent); border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-3); font-size: var(--text-xs); font-weight: 500;`
- `.badge`: `font-size: var(--text-xs); font-weight: 600; padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full); border: 1px solid var(--border); color: var(--text-muted);`
  `.badge--live { color: var(--accent); border-color: var(--accent); }`
- `.card__meta`: `margin-top: auto; display: flex; align-items: center; justify-content: space-between;
  gap: var(--space-3); font-size: var(--text-xs); color: var(--text-muted);`
- `.card__links`: flex, `gap: var(--space-4)`; links com `font-weight: 600; font-size: var(--text-sm);`.
- `.card__image`: `border-radius: var(--radius-sm); aspect-ratio: 16 / 10; object-fit: cover;`
- `.projects__empty`: `color: var(--text-muted); border: 1px dashed var(--border);
  border-radius: var(--radius-md); padding: var(--space-6); text-align: center;`
- Cards **não** têm sombra no estado normal (só borda), no escuro nem no hover há sombra
  (`--shadow-md` já é `none` no escuro).

### T-3.6 Contato e rodapé

- `.contact__list`: `list-style: none; padding: 0; display: grid; gap: var(--space-3);
  max-width: var(--prose);`
- `.contact__link`: `display: flex; align-items: center; justify-content: space-between; gap: var(--space-4);
  min-height: 56px; padding: var(--space-4); background: var(--surface);
  border: 1px solid var(--border); border-radius: var(--radius-md); text-decoration: none;
  color: var(--text); transition: border-color var(--dur-base) var(--ease-out);`
- `.contact__link:hover { border-color: var(--accent); }`
- `.contact__label`: `font-weight: 600; font-size: var(--text-sm);`
- `.contact__value`: `color: var(--text-muted); font-size: var(--text-sm); word-break: break-all;
  text-align: right;`
- `.site-footer`: `padding-block: var(--space-7); border-top: 1px solid var(--border); font-size: var(--text-xs); color: var(--text-muted);`
- `.footer__inner`: flex, `justify-content: space-between`, `flex-wrap: wrap`, `gap: var(--space-2)`.

### T-3.7 Movimento e estados

```css
.reveal { opacity: 0; transform: translateY(12px); }
.reveal.is-visible {
  opacity: 1;
  transform: none;
  transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out);
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal, .reveal.is-visible { opacity: 1; transform: none; transition: none; }
  .card, .button, .contact__link, .icon-button, .lang-toggle { transition: none; }
}
```

- **Nunca** use `transition: all`.

### T-3.8 Breakpoints (a partir de 480 / 640 / 768 / 1024 / 1280 px)

- `480px`: `.hero__inner { grid-template-columns: 160px 1fr; align-items: center; }`
- `640px`: `.header__nav { display: block }`
- `768px`: `.projects { grid-template-columns: repeat(2, minmax(0, 1fr)); }`
- `1024px`: `.projects { grid-template-columns: repeat(3, minmax(0, 1fr)); }`
- `1280px`: `.hero { padding-block: var(--space-9); }`

**Verificação da fase:**
1. `Select-String -Path css/styles.css -Pattern "#[0-9a-fA-F]{3,8}"` → **nenhum resultado**
   (cor literal só em `tokens.css`).
2. Recarregar em 320, 768 e 1280 px: sem scroll horizontal, cards em 1/2/3 colunas.
3. Alternar o tema manualmente pelo DevTools (`<html data-theme="dark">`): tudo legível.

### T-3.9 Commit

```powershell
git add -A
git commit -m "style: implementa design system e layout responsivo"
```

---

## Fase 4 — JavaScript

### T-4.1 `js/theme.js`

IIFE que expõe `window.SiteTheme = { apply, toggle, current }`:

- `apply(theme)`: seta `document.documentElement.dataset.theme`; atualiza
  `#meta-theme-color` para `#ffffff` (light) ou `#0e0e13` (dark); atualiza `aria-pressed`
  do `#theme-toggle` (`true` quando dark); atualiza `aria-label` usando as chaves
  `theme.to_light` / `theme.to_dark` (via `window.I18N[lang]`, com fallback PT).
- `toggle()`: lê o atual, inverte, chama `apply` e grava `sp:theme` em `try/catch`.
- Não acessa o DOM antes de `DOMContentLoaded` (a ligação do clique fica em `main.js`).

**Verificação:** no console, `SiteTheme.apply('dark')` muda o tema e o `theme-color`.

### T-4.2 `js/i18n.js` — dicionários completos

Estrutura: `window.I18N = { pt: {...}, en: {...} };` com **exatamente** estas chaves
(mesma quantidade nos dois idiomas):

| Chave | pt | en |
|---|---|---|
| `meta.title` | Mateus — Estudante de Ciência da Computação | Mateus — Computer Science Student |
| `meta.description` | Portfólio de Mateus, estudante de Ciência da Computação em Passo Fundo, RS. | Portfolio of Mateus, Computer Science student in Passo Fundo, Brazil. |
| `nav.label` | Navegação principal | Main navigation |
| `nav.projects` | Projetos | Projects |
| `nav.contact` | Contato | Contact |
| `a11y.skip` | Pular para o conteúdo | Skip to content |
| `a11y.photo` | Foto de Mateus | Photo of Mateus |
| `a11y.external` | (abre em nova aba) | (opens in a new tab) |
| `theme.to_dark` | Mudar para tema escuro | Switch to dark theme |
| `theme.to_light` | Mudar para tema claro | Switch to light theme |
| `lang.to_en` | Mudar para inglês | Switch to English |
| `lang.to_pt` | Mudar para português | Switch to Portuguese |
| `hero.location` | Passo Fundo, RS, Brasil | Passo Fundo, Brazil |
| `hero.role` | Estudante de Ciência da Computação | Computer Science student |
| `hero.bio` | Curso Ciência da Computação em Passo Fundo, RS. | I study Computer Science in Passo Fundo, Brazil. |
| `hero.cta_projects` | Ver projetos | View projects |
| `hero.cta_contact` | Falar comigo | Get in touch |
| `projects.title` | Projetos | Projects |
| `projects.lead` | Uma seleção do que venho construindo. | A selection of what I've been building. |
| `projects.empty` | Nenhum projeto publicado ainda. | No projects published yet. |
| `projects.code` | Código | Code |
| `projects.demo` | Demo | Demo |
| `status.live` | No ar | Live |
| `status.wip` | Em andamento | In progress |
| `status.archived` | Arquivado | Archived |
| `contact.title` | Contato | Contact |
| `contact.lead` | Escolha o canal que preferir. | Pick the channel you prefer. |
| `contact.email` | E-mail | Email |
| `contact.github` | GitHub | GitHub |
| `contact.linkedin` | LinkedIn | LinkedIn |
| `footer.rights` | Todos os direitos reservados. | All rights reserved. |
| `footer.built` | Feito com HTML, CSS e JavaScript. | Built with HTML, CSS and JavaScript. |

**Proibido** colocar lógica de DOM neste arquivo — só o objeto.

### T-4.3 `js/projects.data.js` — dados iniciais

```js
window.PROJECTS = [
  {
    id: "site-pessoal",
    title: { pt: "Site pessoal", en: "Personal website" },
    summary: {
      pt: "Portfólio estático com tema claro/escuro, dois idiomas e projetos versionados.",
      en: "Static portfolio with light/dark theme, two languages and versioned projects."
    },
    stack: ["HTML", "CSS", "JavaScript"],
    year: 2026,
    status: "live",
    repo: "https://github.com/mateuszilio225/site-pessoal",
    demo: null,
    image: null,
    featured: true
  }
];
```

> `demo` fica `null` até o Pages estar no ar (T-8.6).

### T-4.4 `js/render.js`

Expõe `window.renderProjects(lang)`. Regras:

1. Lê `window.PROJECTS` (array) e `window.I18N[lang]`.
2. Ordena: `featured` (true primeiro) → `year` desc → `title.pt` asc (`localeCompare`).
3. Para cada projeto, cria `<li class="card">` com nós via `document.createElement`
   (proibido `innerHTML`):
   - `.card__header` com `<h3 class="card__title">` (texto = `title[lang]`) e
     `<span class="badge badge--{status}">` (texto = `status.{status}`);
   - `.card__summary` (texto = `summary[lang]`);
   - `<ul class="chips">` com `<li class="chip">` por item de `stack`;
   - `.card__meta` com o ano e `.card__links` contendo:
     - link para `repo` com texto `projects.code`, `target="_blank"`, `rel="noopener noreferrer"`;
     - se `demo` não for nulo, link para `demo` com texto `projects.demo`, mesmo `target`/`rel`.
   - Se `image` não for nulo: `<img class="card__image" loading="lazy" decoding="async"
     alt="{title[lang]} — screenshot" width="640" height="400">`.
4. Limpa `#projects-list` (`replaceChildren()`), adiciona os cards.
5. Se a lista estiver vazia: `#projects-empty.hidden = false`; caso contrário `hidden = true`.
6. Não lança exceção se `window.PROJECTS` for `undefined`.

**Verificação:** com um projeto, aparece 1 card com 3 chips, badge "No ar" e link "Código",
sem link "Demo". Trocar o idioma re-renderiza.

### T-4.5 `js/scroll.js`

Expõe `window.initScrollReveal()`:

- Se `matchMedia("(prefers-reduced-motion: reduce)").matches` → não faz nada (e garante que
  nenhum `.reveal` fique invisível: adiciona `is-visible` a todos).
- Caso contrário, `IntersectionObserver` com `threshold: 0.15` em todos os `.reveal`; ao entrar,
  adiciona `is-visible` e `unobserve` o elemento.
- Se `IntersectionObserver` não existir, adiciona `is-visible` a todos.
- Aplicar `.reveal` apenas em: `.hero__content`, `.hero__media`, `.section__title`,
  `.section__lead` e cada `.card` (os cards recebem a classe no `render.js`).

**Verificação:** rolar a página revela os elementos uma única vez; com "reduce motion"
ativado no SO, tudo aparece imediatamente.

### T-4.6 `js/main.js`

Na inicialização (`DOMContentLoaded`), nesta ordem:

1. `const lang = getLang()` (lê `sp:lang`, padrão `pt`; valida se é `pt`/`en`).
2. `applyLang(lang)`:
   - percorre `[data-i18n]` e define `textContent` pela chave;
   - percorre `[data-i18n-attr]` no formato `atributo:chave` (separar no primeiro `:`),
     podendo haver vários separados por `,`;
   - define `document.documentElement.lang = lang === "pt" ? "pt-BR" : "en"`;
   - `#lang-label` = `lang === "pt" ? "EN" : "PT"`;
   - `#lang-toggle` `aria-pressed` = `true` quando `en`, com `aria-label` = `lang.to_en`/`lang.to_pt`;
   - atualiza `#theme-toggle` `aria-label` conforme o tema atual;
   - chama `window.renderProjects(lang)`.
3. Liga o clique de `#theme-toggle` → `SiteTheme.toggle()` e, ao final, reaplica o `aria-label`
   do botão via `applyLang` (sem re-renderizar projetos desnecessariamente: aceitável re-renderizar).
4. Liga o clique de `#lang-toggle` → alterna, salva em `sp:lang` (`try/catch`), chama `applyLang`.
5. `#year.textContent = new Date().getFullYear()`.
6. Fallback da foto:

```js
var photo = document.getElementById("hero-photo");
var initials = document.getElementById("hero-initials");
if (photo && initials) {
  photo.addEventListener("error", function () {
    photo.hidden = true;
    initials.hidden = false;
  });
  if (photo.complete && photo.naturalWidth === 0) {
    photo.hidden = true;
    initials.hidden = false;
  }
}
```

7. `window.initScrollReveal()`.

**Verificação:**
- `node --check js/*.js` sem erro (no PowerShell: um por arquivo).
- Console limpo; alternar tema e idioma funciona; recarregar mantém as escolhas.

### T-4.7 Commit

```powershell
git add -A
git commit -m "feat: adiciona tema, i18n e renderizacao de projetos"
```

---

## Fase 5 — Conteúdo final

### T-5.1 Nenhum placeholder

```powershell
Select-String -Path index.html, css/*.css, js/*.js -Pattern "\{\{"
```

**Esperado:** nenhuma ocorrência nos **arquivos do site**. (`SPECS.md`, `AGENTS.md` e `TODO.md`
podem citar o formato `{{...}}` como documentação — isso é esperado e não conta.)
**Se falhar:** substitua pelos valores da §0 ou remova o bloco correspondente.

### T-5.2 Conferir links e dados

```powershell
Select-String -Path index.html, js/*.js -Pattern "linkedin|mailto|github.com" | Select-Object Line
```

**Esperado:** LinkedIn `https://www.linkedin.com/in/mateus-zilio/` (sem `?trk=`),
e-mail `mailto:mateuszilio225@gmail.com`, GitHub `https://github.com/mateuszilio225`.

### T-5.3 Criar favicon

Crie `assets/favicon.svg` com um "M" branco sobre retângulo roxo arredondado:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#7C3AED"/>
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="700"
        fill="#FFFFFF" text-anchor="middle">M</text>
</svg>
```

**Verificação:** a aba do navegador mostra o ícone; http://localhost:8000/assets/favicon.svg
renderiza.

### T-5.4 Nome completo (opcional, só se o usuário confirmar "Mateus Zilio")

Trocar `Mateus` por `Mateus Zilio` **apenas** em:
1. `index.html`: `.header__brand`, `<h1>`, rodapé (`© ... Mateus.`), `<title>`, `meta description`,
   `alt` da foto.
2. `js/i18n.js`: `meta.title`, `meta.description`, `a11y.photo`.
3. `js/main.js`: `INICIAIS` do fallback (`M` → `MZ`) e o texto de `#hero-initials` no HTML.
4. `README.md` e `SPECS.md` §8.1.

Sem confirmação, **não** altere.

### T-5.5 Commit

```powershell
git add -A
git commit -m "feat: preenche conteudo final e favicon"
```

---

## Fase 6 — Testes manuais (obrigatórios)

> Execute com o servidor local rodando e o DevTools aberto. Em cada item, anote ✅ ou ❌.

### T-6.1 Console limpo
Recarregue com `Ctrl+F5`. **Esperado:** zero erros e zero warnings no Console.

### T-6.2 Tema
1. Clique no botão de tema → interface escura; ícone muda para lua; `aria-pressed="true"`.
2. Recarregue → continua escuro, **sem flash** branco.
3. `F12` → Elements → `<html data-theme="dark">`; `meta[name=theme-color]` = `#0e0e13`.
4. Clique de novo → volta ao claro e persiste.

### T-6.3 Idioma
1. Clique em `EN` → todos os textos em inglês, incluindo `<title>` e `lang="en"`.
2. Nenhum texto permanece em português (percorra a página inteira).
3. Recarregue → continua em inglês.
4. Volte para PT → tudo em português, `lang="pt-BR"`.

### T-6.4 Responsividade
Em 320, 360, 480, 768, 1024, 1280 e 1920 px:
- sem barra de rolagem horizontal (`document.documentElement.scrollWidth === clientWidth`);
- cards em 1 coluna (<768), 2 (768–1023), 3 (≥1024);
- hero empilhado em <480 e lado a lado a partir de 480;
- nenhum texto cortado ou sobreposto.

### T-6.5 Teclado e foco
1. `Tab` no topo da página → aparece "Pular para o conteúdo".
2. `Enter` no skip link → foco vai para `#conteudo`.
3. Percorrer: brand → Projetos → Contato → tema → idioma → CTAs → cards → contato → rodapé.
4. Todo elemento focado tem contorno roxo visível.

### T-6.6 Movimento reduzido
Ative "Reduce motion" no SO (Windows: Configurações → Acessibilidade → Efeitos visuais) e recarregue.
**Esperado:** nada anima; todo o conteúdo visível de imediato.

### T-6.7 Zoom 200%
`Ctrl +` até 200%: nada é cortado, sem scroll horizontal, toggles alcançáveis.

### T-6.8 Zero requisições externas
DevTools → Network → recarregar → filtrar por "Third-party" ou conferir a coluna Domain.
**Esperado:** apenas `localhost` (ou `mateuszilio225.github.io` em produção).
Se aparecer `fonts.googleapis.com`, `cdn.jsdelivr.net` etc. → **remover**.

### T-6.9 Conteúdo sem JavaScript
DevTools → Settings → Debugger → **Disable JavaScript** → recarregue.
**Esperado:** nome, cargo, bio, contato e links visíveis. A seção de projetos pode ficar vazia.

### T-6.10 Estado vazio
No console: `window.PROJECTS = []; renderProjects('pt')`.
**Esperado:** mensagem "Nenhum projeto publicado ainda." e nenhum card.
Depois recarregue para restaurar.

### T-6.11 Fallback da foto
Renomeie `assets/foto.webp` para `assets/foto-temp.webp` e recarregue.
**Esperado:** círculo com "M" no lugar da foto, sem ícone de imagem quebrada.
Restaure o nome depois (se você ainda não tem foto, mantenha o fallback e siga).

### T-6.12 Contraste
DevTools → Elements → selecionar textos e conferir o "Contrast ratio" nos dois temas.
**Esperado:** ≥ 4.5:1 no corpo, ≥ 3:1 em textos grandes.

**Se qualquer item falhar:** corrija antes de seguir. Registre o problema no commit.

---

## Fase 7 — Testes automatizados (locais, sem adicionar dependências)

### T-7.1 Sintaxe JS

```powershell
Get-ChildItem js\*.js | ForEach-Object { node --check $_.FullName }
```

**Esperado:** nenhuma saída (sucesso).

### T-7.2 Paridade de chaves i18n

Crie `tools/check-i18n.js` (pasta nova, não é publicada):

```js
const fs = require("fs");
const vm = require("vm");
const code = fs.readFileSync("js/i18n.js", "utf8");
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(code, ctx);
const { pt, en } = ctx.window.I18N;
const missing = Object.keys(pt).filter((k) => !(k in en));
const extra = Object.keys(en).filter((k) => !(k in pt));
if (missing.length || extra.length) {
  console.error("FALHOU", { missing, extra });
  process.exit(1);
}
console.log("i18n OK:", Object.keys(pt).length, "chaves");
```

```powershell
node tools/check-i18n.js
```

**Esperado:** `i18n OK: 32 chaves` (o número deve bater com a tabela de T-4.2).

### T-7.3 Chaves usadas x chaves definidas

```powershell
$html = Get-Content index.html -Raw
$used = [regex]::Matches($html, 'data-i18n(?:-attr)?="([^"]+)"') | ForEach-Object {
  ($_.Groups[1].Value -split ',') | ForEach-Object { ($_ -split ':')[-1].Trim() }
} | Sort-Object -Unique
$used
```

Confira manualmente que cada chave listada existe em `js/i18n.js` (mesmo nome, sem erro de digitação).

### T-7.4 URLs externas permitidas

```powershell
Select-String -Path index.html, css/*.css, js/*.js -Pattern "https?://" | Select-Object -ExpandProperty Line
```

**Permitido:** `https://github.com/mateuszilio225`, `https://www.linkedin.com/in/mateus-zilio/`,
`https://mateuszilio225.github.io/site-pessoal/` (canonical), `http://www.w3.org/2000/svg`
(namespace do SVG). Qualquer outro domínio é **falha**.

### T-7.5 Recursos internos existem

```powershell
@("index.html","css/tokens.css","css/styles.css","js/theme.js","js/i18n.js",
  "js/projects.data.js","js/render.js","js/scroll.js","js/main.js",
  "assets/favicon.svg") | ForEach-Object { "{0} -> {1}" -f $_, (Test-Path $_) }
```

**Esperado:** `True` em todas as linhas.
(`assets/foto.webp` é opcional: o fallback cobre a ausência.)

### T-7.6 Commit dos utilitários

```powershell
git add -A
git commit -m "test: adiciona verificacao de paridade i18n"
```

---

## Fase 8 — Publicação no GitHub Pages

### T-8.1 Push do código

```powershell
git push
```

**Esperado:** `main -> main` sem erro.

### T-8.2 Ativar o Pages (raiz de `main`)

```powershell
'{"source":{"branch":"main","path":"/"}}' | gh api --method POST /repos/mateuszilio225/site-pessoal/pages --input -
```

**Esperado:** JSON com `"status": "building"` e `"html_url": "https://mateuszilio225.github.io/site-pessoal/"`.
**Se já existir:** `gh api --method PUT /repos/mateuszilio225/site-pessoal/pages --input -` com o mesmo corpo.

### T-8.3 Acompanhar o build

```powershell
gh api /repos/mateuszilio225/site-pessoal/pages --jq '.status'
```

Repita a cada 20 s por até 3 minutos até retornar `built`.
**Se falhar:** `gh api /repos/mateuszilio225/site-pessoal/pages/builds/latest --jq '.error.message'`.

### T-8.4 Verificar a URL

```powershell
curl.exe -s -o NUL -w "%{http_code}" https://mateuszilio225.github.io/site-pessoal/
curl.exe -s -o NUL -w "%{http_code}" https://mateuszilio225.github.io/site-pessoal/css/styles.css
curl.exe -s -o NUL -w "%{http_code}" https://mateuszilio225.github.io/site-pessoal/js/main.js
```

**Esperado:** `200` nas três linhas.
**Se 404:** confira `.nojekyll`, caminhos relativos e se o `index.html` está na raiz.

### T-8.5 Teste em produção
Abra a URL em **janela anônima** e repita T-6.2, T-6.3, T-6.4 (360/1280) e T-6.8.
Atenção: em produção as requisições permitidas são do domínio `mateuszilio225.github.io`.

### T-8.6 Preencher o `demo` do projeto

Edite `js/projects.data.js`: `demo: "https://mateuszilio225.github.io/site-pessoal/"`.
Depois:

```powershell
git add -A
git commit -m "docs: adiciona demo do site ao projeto"
git push
```

Aguarde ~60 s e confirme que o card "Site pessoal" agora exibe o link "Demo".

---

## Fase 9 — Fechamento

### T-9.1 Lighthouse (mobile)

DevTools → Lighthouse → Mobile → todas as categorias → Analyze.
**Esperado:** Performance ≥ 95, Acessibilidade ≥ 95, Boas práticas ≥ 95, SEO ≥ 90.
Se ficar abaixo, corrija a causa apontada (não "esconda" o problema).

### T-9.2 Atualizar `README.md`

Incluir: URL do site, estrutura final de arquivos, como rodar localmente, como adicionar um
projeto, como trocar o tema e a cor de destaque. Sem promessas que o código não cumpre.

### T-9.3 Revisão final contra `SPECS.md` §17

Percorra o checklist de critérios de aceite e marque cada item. Qualquer item não atendido é
**bloqueio de entrega**.

### T-9.4 Commit e push finais

```powershell
git add -A
git commit -m "docs: atualiza README com instrucoes finais"
git push
```

### T-9.5 Relatório ao usuário

Informe: URL no ar, o que foi implementado, como adicionar projetos, o que continua pendente
(foto real, sobrenome, projetos futuros) e o resultado do Lighthouse.

---

## Apêndice A — Mensagens de commit por fase

| Fase | Mensagem |
|---|---|
| 1 | `chore: cria esqueleto de arquivos do site` |
| 2 | `feat: adiciona estrutura semantica da pagina` |
| 3 | `style: implementa design system e layout responsivo` |
| 4 | `feat: adiciona tema, i18n e renderizacao de projetos` |
| 5 | `feat: preenche conteudo final e favicon` |
| 7 | `test: adiciona verificacao de paridade i18n` |
| 8 | `docs: adiciona demo do site ao projeto` |
| 9 | `docs: atualiza README com instrucoes finais` |

## Apêndice B — Problemas e soluções

| Sintoma | Causa provável | Ação |
|---|---|---|
| Tela branca, nenhum estilo | Caminho do CSS errado ou `/css/...` absoluto | Usar `css/styles.css` relativo |
| Flash de tema claro ao abrir no escuro | Script anti-FOUC ausente ou depois do CSS | Mover para o `<head>`, antes dos `<link>` |
| Cards não aparecem | `PROJECTS` vazio, erro em `render.js` ou `main.js` não chamou `renderProjects` | Ver Console; conferir `window.PROJECTS` e a ordem dos scripts |
| Card sem "Demo" | `demo: null` (esperado) | Preencher após T-8.6 |
| Texto em português ao trocar para EN | Chave ausente ou `data-i18n` errado | Rodar T-7.2 e T-7.3 |
| `undefined` na tela | Chave inexistente no dicionário | Conferir nome exato na tabela T-4.2 |
| Imagem quebrada | `assets/foto.webp` ausente e fallback não ligado | Manter fallback do T-4.6 |
| 404 em produção, funciona local | Caminho absoluto ou `.nojekyll` ausente | Caminhos relativos; criar `.nojekyll` |
| Pages não publica | Fonte errada | `gh api .../pages` deve mostrar `branch: main`, `path: /` |
| LinkedIn com `?trk=` | URL copiada inteira | Usar `https://www.linkedin.com/in/mateus-zilio/` |
| Scroll horizontal no mobile | Elemento mais largo que a viewport | `Select-String` por `width:`, usar `max-width: 100%` |
| Foco invisível | `outline: none` sem substituto | Reaplicar `:focus-visible` global |
| Contraste ruim no escuro | Usou `--accent` escuro no tema escuro | Tokens do `[data-theme="dark"]` já corrigem; não sobrescrever |

## Apêndice C — Proibições absolutas

- Adicionar npm/bundler/framework, CDN, Google Fonts, analytics ou formulário de terceiros.
- Inventar bio, projetos, cargos, empresas ou números.
- Usar `!important` (exceto `[hidden]`), `transition: all`, `outline: none` sem alternativa.
- Caminhos absolutos (`/css/...`), `target="_blank"` sem `rel="noopener noreferrer"`.
- `innerHTML` com dados dinâmicos; `eval`; `document.write`.
- Commitar segredos, `.env`, `node_modules`.
- Fazer `git push --force`.
- Publicar com `{{...}}` visíveis ou com seção de projetos vazia sem mensagem de estado vazio.

## Apêndice D — Critério de conclusão do projeto

- [ ] Todos os itens de T-1 a T-9 marcados.
- [ ] `node tools/check-i18n.js` → `i18n OK`.
- [ ] `curl.exe` retorna `200` para `/`, `/css/styles.css` e `/js/main.js`.
- [ ] Checklist `SPECS.md` §17 totalmente marcado.
- [ ] Lighthouse mobile dentro das metas.
- [ ] Nenhum placeholder `{{` no repositório.
- [ ] Usuário informado da URL e das pendências (foto, sobrenome, novos projetos).
