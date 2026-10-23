# site-pessoal

Portfólio de **Mateus** — estudante de Ciência da Computação em Passo Fundo, RS.

**No ar:** https://mateuszilio225.github.io/site-pessoal/

## O que é

Página única, estática, sem build e sem dependências:

- Hero com nome, cargo, bio e foto (ou iniciais).
- Projetos renderizados a partir de um único arquivo de dados.
- Contato por e-mail, GitHub e LinkedIn.
- Tema claro/escuro e idioma PT-BR/EN, ambos com escolha persistida.
- Animações de entrada discretas, desativadas com `prefers-reduced-motion`.

## Documentação

- [`SPECS.md`](./SPECS.md) — especificação: escopo, design system, requisitos, critérios de aceite.
- [`AGENTS.md`](./AGENTS.md) — diretrizes de trabalho para o agente.
- [`TODO.md`](./TODO.md) — plano de execução e testes usado na implementação.

## Estrutura

```
site-pessoal/
├─ index.html
├─ .nojekyll
├─ css/
│  ├─ tokens.css      # cores, tipografia, espaçamento, sombras (claro + escuro)
│  └─ styles.css      # base, layout e componentes
├─ js/
│  ├─ theme.js        # tema + persistência
│  ├─ i18n.js         # dicionários pt/en (paridade obrigatória)
│  ├─ projects.data.js# window.PROJECTS — único arquivo a editar para projetos
│  ├─ render.js       # renderização dos cards
│  ├─ scroll.js       # reveal ao rolar
│  └─ main.js         # bootstrap e ligação dos eventos
├─ assets/
│  └─ favicon.svg
└─ tools/
   └─ check-i18n.ps1  # teste de paridade das chaves de tradução
```

## Rodar localmente

```powershell
python -m http.server 8000
```

Abra http://localhost:8000. Também funciona abrindo `index.html` direto no navegador
(não há `fetch` nem módulos ES).

## Adicionar um projeto

Edite apenas `js/projects.data.js` e acrescente um objeto:

```js
{
  id: "meu-projeto",                       // único, kebab-case
  title: { pt: "Meu projeto", en: "My project" },
  summary: { pt: "Uma frase.", en: "One sentence." },
  stack: ["HTML", "CSS", "JavaScript"],    // 3 a 6 itens
  year: 2026,
  status: "live",                          // live | wip | archived
  repo: "https://github.com/mateuszilio225/meu-projeto",
  demo: null,                              // ou uma URL
  image: null,                             // ou "assets/projects/meu-projeto.webp"
  featured: false
}
```

Ordem exibida: `featured` primeiro, depois ano decrescente, depois título.

## Adicionar a foto de perfil

1. Salve a imagem como `assets/foto.webp` (quadrada, ≥ 600×600, < 150 KB).
2. Em `index.html`, dentro de `.hero__media`, adicione acima do `span` de iniciais:

```html
<img class="hero__photo" id="hero-photo" src="assets/foto.webp" width="240" height="240"
     alt="Foto de Mateus" data-i18n-attr="alt:a11y.photo" decoding="async">
```

O `js/main.js` esconde as iniciais quando a imagem carrega e volta a mostrá-las se ela falhar.
Sem foto, o bloco de iniciais acompanha o tema automaticamente.

## Trocar tema, cor e textos

- **Cor de destaque:** `--accent`, `--accent-hover`, `--accent-soft`, `--accent-contrast` em
  `css/tokens.css`, nos dois temas. Revalide o contraste AA.
- **Textos:** `js/i18n.js`, sempre nos dois idiomas. Depois rode
  `powershell -ExecutionPolicy Bypass -File tools/check-i18n.ps1`.
- **Tema padrão:** `index.html` (`data-theme="light"`) e `js/theme.js`.
- **Idioma padrão:** `readLang()` em `js/main.js` (hoje `"pt"`).

## Testes

```powershell
powershell -ExecutionPolicy Bypass -File tools/check-i18n.ps1
```

Deve imprimir `i18n OK: 32 chaves`. Checklist completo de QA: `TODO.md`, fases 6 e 7.

## Publicação

Push em `main` publica automaticamente via GitHub Pages (branch `main`, pasta raiz).
Todos os caminhos são relativos porque a URL vive em uma subpasta (`/site-pessoal/`).
