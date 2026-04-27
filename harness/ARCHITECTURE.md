# ARCHITECTURE.md — Pedro Lima Brand Portfolio

> Padrões obrigatórios de código para este projeto.
> Leia antes de qualquer tarefa de implementação.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Servidor | Node.js 22 + Express 4 |
| Front-end | HTML5 / CSS3 / JavaScript ES6+ vanilla |
| Tipagem | ❌ Sem TypeScript |
| Estilo | CSS com variáveis custom (sem Tailwind, sem CSS Modules) |
| Framework JS | ❌ Sem React, Vue, Angular |
| Testes | ❌ Sem Vitest/Jest neste projeto |
| Deploy | Vercel (serverless Express via `vercel.json`) |

---

## Estrutura de Arquivos

```
pedro-lima-brand/
├── server.js               # Ponto de entrada: Express + rotas + proxy de áudio
├── vercel.json             # Config de deploy (builds + routes)
├── package.json            # npm: express, cheerio
├── AGENTS.md               # Cross-tool harness config
├── GEMINI.md               # Antigravity override
├── CLAUDE.md               # Claude Code config
├── .cursorrules            # Cursor config
├── .agents/rules/          # Antigravity rules directory
├── views/                  # HTML das páginas (renderizadas pelo Express via sendFile)
│   ├── index.html          # Home
│   ├── luna-sheeny.html
│   ├── martin-dahmer.html
│   ├── priscila-elpo.html
│   ├── robison-kunz.html
│   ├── roger-nobles.html
│   └── vitor-dos-santos.html
├── public/                 # Estáticos servidos pelo Express
│   ├── assets/             # Imagens, vídeos, áudios
│   ├── css/
│   │   ├── design_system.css   # Sistema de design (variáveis CSS)
│   │   └── animations.css      # Animações globais
│   └── js/
│       ├── custom-audio.js     # Player HTML5 de áudio
│       └── [outros scripts]
└── harness/                # Harness Engineering (não servido)
```

---

## Padrões de Código

### HTML (views/)
- Uma página por arquivo HTML, standalone (inclui `<head>` completo)
- CSS linkado de `/css/design_system.css` e `/css/animations.css`
- JS referenciado no final do `<body>` como `/js/custom-audio.js`
- Usar elementos semânticos: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- IDs únicos e descritivos em todos os elementos interativos

### CSS (public/css/)
- **Fonte da verdade:** `design_system.css` com variáveis CSS no `:root`
- Nenhum valor hardcoded de cor, fonte ou espaçamento — usar sempre variáveis
- Mobile-first: estilo base para mobile, breakpoints para ampliar
- Não usar `!important` exceto para sobrescrever estilos legados com justificativa
- Breakpoints padrão: 480px / 768px / 1280px

### JavaScript (public/js/)
- ES6+: arrow functions, const/let, template literals
- Sem transpilação (ES modules no browser via `type="module"` se necessário)
- Nenhum `console.log` de debug em produção
- Eventos delegados quando possível (não listener por elemento em loops)

### server.js
- Apenas rotas e proxy. Nenhuma lógica de negócio
- Rotas de projeto geradas por loop sobre o array `projects[]`
- Proxy de áudio: só aceita URLs de `https://1pedrolima.com/`

---

## Design System

**Arquivo:** `public/css/design_system.css`
**Tipografia:** CircularStd (importada via CSS)
**Variáveis definidas:** cores, espaçamentos, border-radius, sombras

### Regras
- Nenhum valor visual hardcoded fora do `design_system.css`
- Para adicionar tokens: edite as variáveis no `:root`, depois use a variável
- `border-radius` de cards: `24px` (ou via variável `--radius-card`)

---

## Padrão de Player de Áudio

**Arquivo:** `public/js/custom-audio.js`
- Implementação HTML5 nativa (`<audio>` + JS)
- Proxy via `/audio-proxy?url=...` no server.js para áudios externos
- Áudios locais servidos diretamente de `/assets/`

---

## Deploy (Vercel)

**Arquivo:** `vercel.json`
- `builds`: Express como serverless function (`@vercel/node`)
- `routes`: redireciona tudo para `server.js`
- Státicos em `public/` são servidos pelo Express (não pelo CDN da Vercel diretamente)

---

## Proibido

- TypeScript (sem tsc, sem .ts)
- Frameworks front-end (React, Vue, Next.js)
- Estilos inline (`style=""`) exceto valores dinâmicos gerados por JS
- `console.log` em produção
- Valores de cor/fonte/espaçamento hardcoded no HTML ou JS
