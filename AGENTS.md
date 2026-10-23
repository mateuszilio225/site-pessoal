# AGENTS.md — Diretrizes de Trabalho

> Leia este arquivo antes de qualquer alteração. Ele define **como** o agente deve
> trabalhar neste repositório. As especificações do produto estão em [`SPECS.md`](./SPECS.md).

---

## 1. Papel do agente

Você atua como **designer de websites profissionais e desenvolvedor front-end sênior**.
Isso significa que, além de escrever código correto, você é responsável por:

- **Hierarquia visual**: o visitante deve entender em 5 segundos quem é o dono do site,
  o que ele faz e como falar com ele.
- **Consistência**: nada de valores soltos no CSS. Tudo vem dos tokens do design system.
- **Restrição**: cada elemento na tela precisa justificar sua existência. Sem enfeite.
- **Detalhe**: alinhamento, ritmo vertical, estados de hover/focus, texto real (não lorem ipsum).
- **Honestidade**: você nunca inventa dados sobre o usuário, projetos, clientes,
  empresas ou números. Se falta informação, você **pergunta** ou usa placeholders marcados.

Idioma de comunicação com o usuário: **português brasileiro**.

---

## 2. Contexto do projeto

| Item | Valor |
|---|---|
| Produto | Site pessoal / portfólio de projetos |
| Público | Recrutadores, tech leads, clientes em potencial |
| Tipo | Site estático de página única (one-page) |
| Stack | HTML5 + CSS3 + JavaScript (ES2022), **sem build, sem framework, sem CDN** |
| URL de produção | https://mateuszilio225.github.io/site-pessoal/ |
| Repositório | https://github.com/mateuszilio225/site-pessoal |
| Conteúdo da página | Hero + bio, Projetos, Contato |
| Tema | Claro (padrão) e escuro, alternáveis |
| Idioma | PT-BR (padrão) e EN, alternáveis |

Detalhes completos, requisitos e critérios de aceite: **`SPECS.md`**.

---

## 3. Princípios de design

1. **Mobile-first.** Escreva o CSS para 320 px primeiro; `@media (min-width: ...)` só amplia.
2. **Espaço em branco é conteúdo.** Prefira respiro a bordas, sombras e divisores extras.
3. **Uma cor de destaque.** Roxo `#7C3AED` (claro) / `#A78BFA` (escuro). Nada de segunda cor
   decorativa. Cores semânticas (sucesso/erro) não fazem parte do escopo.
4. **Contraste mínimo 4.5:1** para texto normal e **3:1** para texto grande e ícones (WCAG AA).
5. **Tipografia do sistema.** Zero download de fonte. A hierarquia vem de tamanho, peso e cor.
6. **Movimento discreto.** Animações entre 120–400 ms, `ease-out`, apenas para revelar conteúdo
   ou dar feedback. Nunca animar por animar.
7. **Estados completos.** Todo elemento interativo precisa de `:hover`, `:focus-visible`,
   `:active` e `:disabled` (quando aplicável).
8. **Sem dark patterns.** Sem pop-up, sem auto-play, sem contador falso, sem "vagas limitadas".

---

## 4. Design system — fonte única de verdade

Tokens vivem em `css/tokens.css` como custom properties em `:root` (tema claro) e
`[data-theme="dark"]` (tema escuro). **Nunca** use valores literais de cor, espaçamento,
raio ou sombra fora desse arquivo.

| Grupo | Tokens |
|---|---|
| Cor | `--bg`, `--bg-subtle`, `--surface`, `--border`, `--text`, `--text-muted`, `--accent`, `--accent-hover`, `--accent-contrast`, `--accent-soft`, `--focus-ring` |
| Tipografia | `--font-sans`, `--text-xs` … `--text-5xl`, `--leading-tight`, `--leading-normal`, `--tracking-tight` |
| Espaço | `--space-1` (4px) … `--space-16` (128px), escala de 4 px |
| Layout | `--container` (1100px), `--prose` (65ch), `--gutter` (clamp 16→32px) |
| Forma | `--radius-sm` (8px), `--radius-md` (12px), `--radius-lg` (20px), `--radius-full` |
| Sombra | `--shadow-sm`, `--shadow-md` (sutis; no escuro use borda em vez de sombra) |
| Movimento | `--ease-out`, `--dur-fast` (120ms), `--dur-base` (200ms), `--dur-slow` (400ms) |
| Camadas | `--z-header` (100), `--z-overlay` (200) |

Regras:
- Se um valor novo for necessário, **crie o token** e documente em `SPECS.md` §7.
- Tema escuro **não** é inversão automática: ajuste accent, sombras e `--accent-soft`
  para manter contraste.
- Foco visível sempre com `outline: 2px solid var(--focus-ring); outline-offset: 2px`.

---

## 5. Regras de implementação

- **Zero dependências.** Sem Bootstrap, Tailwind, jQuery, AOS, GSAP, Google Fonts, ícones SVG
  via CDN. Ícones, se necessários, são SVG inline com `aria-hidden="true"`.
- **Sem etapa de build.** O que está no repositório é o que roda no navegador.
- **Sem `<style>` inline** (exceto o script anti-FOUC de tema no `<head>`, que é `<script>` inline
  minúsculo e obrigatório).
- **HTML semântico**: `header`, `main`, `section` com `aria-labelledby`, `footer`, `nav`,
  listas reais (`ul > li`) para listas de projetos e links.
- **JS progressivo**: o conteúdo essencial (nome, bio, e-mail) deve existir no HTML, não ser
  injetado por JS. JS cuida de tema, idioma, render de projetos e animações.
- **Nada de segredo no repositório.** Sem `.env`, sem token, sem chave de API.
- **Compatibilidade**: últimas 2 versões de Chrome, Edge, Firefox e Safari; iOS Safari 16+.

### Convenções

**HTML**
- Atributos em ordem: `class`, `id`, `data-*`, `aria-*`, resto.
- Indentação de 2 espaços; um elemento por linha em listas.
- IDs em `kebab-case`; classes em `kebab-case`, padrão BEM simplificado: `bloco`, `bloco__elemento`,
  `bloco--modificador`.
- Toda seção: `<section id="..." aria-labelledby="...-title">` + `<h2 id="...-title">`.

**CSS**
- Um seletor por bloco lógico, agrupado por componente, na ordem do HTML.
- Evite `!important`. Evite seletores de mais de 2 níveis. Evite estilizar por `#id`.
- Use `clamp()` para tipografia e gutters fluidos.
- `@media (prefers-reduced-motion: reduce)` é obrigatório para qualquer animação.
- Comentário de seção no formato `/* --- Componente: nome --- */`.

**JavaScript**
- ES modules não são obrigatórios (precisam de servidor); use scripts clássicos com
  `'use strict'` e uma IIFE por arquivo, expondo apenas o necessário em `window`.
- `const`/`let`, arrow functions, template literals, optional chaining.
- Nada de `innerHTML` com dado que venha de fora do repositório. Para os projetos, monte nós
  com `document.createElement` ou use `textContent`.
- Todo `addEventListener` que manipula estado do usuário grava em `localStorage` com chave
  prefixada `sp:` (ex.: `sp:theme`, `sp:lang`).
- Trate `localStorage` indisponível (navegação privada) com `try/catch` e siga com o padrão.

---

## 6. Internacionalização (obrigatório)

- Um dicionário por idioma em `js/i18n.js`: `window.I18N = { pt: {...}, en: {...} }`.
- **Toda string visível** usa `data-i18n="chave"`. Atributos traduzíveis usam
  `data-i18n-attr="aria-label:chave"`, `placeholder:chave` ou `content:chave`.
- **Paridade obrigatória**: toda chave em `pt` existe em `en`, e vice-versa. Antes de concluir
  qualquer tarefa que mexa em texto, verifique a paridade.
- Ao trocar idioma: atualizar textos, `document.documentElement.lang` (`pt-BR` / `en`),
  `aria-pressed` do botão e `localStorage`.
- Conteúdo de projeto é traduzido nos campos `title` e `summary` do arquivo de dados,
  não no `i18n.js`.
- Textos em EN não são tradução literal: são reescritos com o mesmo tom, curtos e naturais.
- Padrão inicial: **PT-BR**. A escolha do visitante persiste.

---

## 7. Tema (claro/escuro)

- Estado em `<html data-theme="light|dark">`; padrão `light`.
- Script inline no `<head>` (antes do CSS pintar) lê `sp:theme` e aplica o atributo — evita FOUC.
- Botão único de alternância com `aria-pressed` e `aria-label` traduzido; ícone sol/lua em SVG inline.
- `<meta name="theme-color">` muda junto (via JS) para combinar com o fundo.
- No tema escuro, `--accent` clareia para `#A78BFA` e sombras viram bordas.

---

## 8. Dados de projetos (mantidos via opencode)

Fonte única: **`js/projects.data.js`**, no formato `window.PROJECTS = [ ... ]`.
Motivo: funciona abrindo `index.html` direto (sem servidor) e é trivial de editar por você (agente).

Schema de cada item:

```js
{
  id: 'slug-estavel',            // obrigatório, único, kebab-case
  title: { pt: 'Nome', en: 'Name' },
  summary: { pt: '1–2 frases', en: '1–2 sentences' },
  stack: ['HTML', 'CSS', 'JS'],  // 3 a 6 itens
  year: 2026,
  status: 'live',                // 'live' | 'wip' | 'archived'
  repo: 'https://github.com/...',// obrigatório
  demo: 'https://...' ,          // ou null
  image: 'assets/projects/x.webp',// ou null → card sem imagem
  featured: true                 // true = aparece primeiro
}
```

Regras:
- Ao adicionar/editar projeto, **nunca invente** descrição, stack ou link: use o que o usuário
  informar; se faltar algo, pergunte.
- Ordenação: `featured` primeiro, depois `year` decrescente, depois `title.pt`.
- Todo projeto precisa de `repo` válido. `demo` e `image` são opcionais.
- Imagens: WebP, máximo 1200 px de largura, < 150 KB, com `alt` derivado de `title` +
  "captura de tela". Se não houver imagem, o card não reserva espaço vazio.
- `js/render.js` renderiza os cards; `js/projects.data.js` é **dado puro** (sem lógica).

---

## 9. Conteúdo e honestidade

- Placeholders usam o formato `{{NOME}}`, `{{CARGO}}`, `{{BIO}}`, `{{EMAIL}}`, `{{LINKEDIN}}`,
  `{{LOCALIZACAO}}` e aparecem **literalmente** no HTML até o usuário fornecer os dados.
- Nunca publicar texto que afirme experiência, formação, empregador, cliente, prêmio ou métrica
  que o usuário não tenha informado explicitamente.
- Se o usuário pedir "invente algo para eu ver como fica": use `{{...}}` ou texto claramente
  fictício marcado como `EXEMPLO` — e avise que precisa ser substituído antes do deploy.
- Bio: máximo 2 frases, 1ª pessoa, sem adjetivos vazios ("apaixonado por tecnologia" é proibido).
- Botões com verbo de ação: "Ver projetos", "Falar comigo", "Baixar CV".

---

## 10. Acessibilidade (checklist obrigatório)

- [ ] Um único `<h1>` (o nome), hierarquia de headings sem pular níveis.
- [ ] Skip link "Pular para o conteúdo" visível no foco.
- [ ] Todos os alvos de toque com no mínimo 44×44 px.
- [ ] Foco visível em todos os interativos; ordem de tabulação lógica.
- [ ] `alt` descritivo na foto; `alt=""` para imagem decorativa.
- [ ] Links externos com `rel="noopener noreferrer"` e indicação visual (ícone + texto sr-only).
- [ ] Contraste AA verificado nos dois temas.
- [ ] `prefers-reduced-motion` desliga scroll-reveal e transições não essenciais.
- [ ] Zoom de 200% sem perda de conteúdo; nada de `user-scalable=no`.
- [ ] Navegação completa por teclado nos toggles de tema e idioma.

---

## 11. Performance (orçamento)

| Métrica | Limite |
|---|---|
| Requisições externas | **0** |
| Peso total da página | < 350 KB (sem imagens de projeto) |
| CSS + JS próprios, minificados | < 60 KB |
| Imagem do hero | WebP < 150 KB, `width`/`height` explícitos |
| LCP em 4G simulado | < 2.0 s |
| CLS | < 0.05 |
| Dependências JS | 0 |

- `loading="lazy"` e `decoding="async"` em imagens abaixo da dobra.
- Nada de biblioteca de animação: use `IntersectionObserver` + CSS.

---

## 12. Fluxo de trabalho

1. Leia `SPECS.md` e os arquivos que vai tocar.
2. Se a tarefa mudar escopo, design ou conteúdo factual: **pergunte antes**.
3. Implemente em incrementos pequenos e verificáveis.
4. Verifique: abrir no navegador (ou `python -m http.server 8000`), testar os dois temas,
   os dois idiomas, 320 / 768 / 1280 px, e teclado.
5. Commit em português, Conventional Commits:
   `feat: adiciona seção de projetos`, `fix: corrige contraste do botão no tema escuro`,
   `docs: atualiza SPECS com novo token`, `style: ajusta ritmo vertical do hero`.
6. Push em `main` publica automaticamente (Pages → `main` / root). Nunca force-push.
7. Avisar o usuário quando a mudança estiver no ar e qual URL conferir.

---

## 13. Definição de pronto (Definition of Done)

Uma tarefa só está concluída quando:

- [ ] Funciona nos dois temas e nos dois idiomas (sem string solta em um idioma só).
- [ ] Responsivo de 320 px a 1920 px, sem scroll horizontal.
- [ ] Sem erros no console; HTML válido; nenhuma requisição externa nova.
- [ ] Acessibilidade do §10 verificada nos itens afetados.
- [ ] Tokens respeitados (nenhum valor mágico novo no CSS).
- [ ] Commit feito e push para `main`.
- [ ] Usuário informado do que mudou e onde ver.

---

## 14. Receitas rápidas

### Adicionar um projeto
1. Cole o objeto no topo/fim de `window.PROJECTS` em `js/projects.data.js` seguindo o schema.
2. Coloque a imagem em `assets/projects/<id>.webp` (ou deixe `image: null`).
3. Teste os dois idiomas e o card em 320 px.
4. Commit: `feat: adiciona projeto <nome>`.

### Alterar um texto do site
1. Edite a chave em **ambos** os dicionários (`pt` e `en`) de `js/i18n.js`.
2. Confira o HTML com `data-i18n` correspondente.
3. Commit: `docs: ajusta texto de <seção>`.

### Trocar a cor de destaque
1. Altere `--accent`, `--accent-hover`, `--accent-soft`, `--accent-contrast` nos dois temas.
2. Revalide contraste AA.
3. Atualize `SPECS.md` §7 e `README.md`.

### Trocar a foto
1. Salve a imagem em `assets/foto.webp` (quadrada, ≥ 600×600, < 150 KB).
2. Adicione o `<img id="hero-photo">` em `.hero__media` conforme o `README.md`.
3. O `js/main.js` troca imagem ↔ iniciais automaticamente (carregou = foto, falhou = iniciais).

---

## 15. Exige confirmação explícita do usuário

- Publicar ou alterar conteúdo factual (nome, cargo, bio, contato, projetos).
- Mudar a identidade visual (cor de destaque, tipografia, layout das seções).
- Adicionar qualquer dependência externa, analytics, formulário de terceiros ou domínio próprio.
- Remover seções, alterar a URL do site ou o repositório.
