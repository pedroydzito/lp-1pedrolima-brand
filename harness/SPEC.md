# SPEC.md
> Especificação central do projeto. Descreve o que deve ser construído, para quem e por quê.
> Atualizada pelo humano ou pelo agente de planejamento. Nunca alterada durante implementação.

---

## Visão Geral

**Nome do projeto:** Pedro Lima — Brand Portfolio
**Descrição:** Portfólio de branding do designer Pedro Lima. Site estático servido via Node.js + Express, com uma página inicial de destaque e páginas individuais por projeto de marca. Migrado de WordPress para stack própria e deployado na Vercel.
**Stack principal:** Node.js 22 + Express 4, HTML/CSS/JS vanilla, sem TypeScript, sem framework front-end
**Objetivo final:** Site publicado na Vercel com todas as páginas de projeto funcionando, player de áudio operacional, vídeos rodando, responsividade validada em 320px / 768px / 1280px

---

## Usuários e Contexto

**Quem usa:** Clientes potenciais de branding e recrutadores de design
**Problema que resolve:** Precisa de um portfólio web rápido, visual e autoral sem depender do WordPress
**Como resolve:** Site customizado com parallax hero, cards de projeto, players HTML5 de áudio, e vídeos de apresentação dos manuais de marca

---

## Páginas e Rotas

| Rota | View | Descrição |
|------|------|-----------|
| `/` | `views/index.html` | Home — hero parallax, listagem de projetos |
| `/luna-sheeny` | `views/luna-sheeny.html` | Página do projeto Luna Sheeny |
| `/martin-dahmer` | `views/martin-dahmer.html` | Página do projeto Martin Dahmer |
| `/priscila-elpo` | `views/priscila-elpo.html` | Página do projeto Priscila Elpo |
| `/robison-kunz` | `views/robison-kunz.html` | Página do projeto Robison Kunz |
| `/roger-nobles` | `views/roger-nobles.html` | Página do projeto Roger Nobles |
| `/vitor-dos-santos` | `views/vitor-dos-santos.html` | Página do projeto Vitor dos Santos |

---

## Estrutura do Projeto

```
pedro-lima-brand/
├── server.js               # Express: rotas + proxy de áudio
├── vercel.json             # Config de deploy na Vercel
├── views/                  # HTML das páginas (server-rendered estático)
│   ├── index.html
│   ├── luna-sheeny.html
│   ├── martin-dahmer.html
│   ├── priscila-elpo.html
│   ├── robison-kunz.html
│   ├── roger-nobles.html
│   └── vitor-dos-santos.html
├── public/
│   ├── assets/             # Imagens, vídeos e áudios locais
│   ├── css/
│   │   ├── design_system.css
│   │   └── animations.css
│   └── js/
│       ├── custom-audio.js
│       └── [outros scripts]
└── harness/                # Harness Engineering
```

---

## Features Principais

- [x] Hero com parallax (index.html)
- [x] Cards de projetos com vídeo/thumbnail
- [x] Player HTML5 de áudio customizado (`custom-audio.js`)
- [x] Proxy de áudio no server.js (bypass CORS/hotlink)
- [x] Sistema de design CSS com variáveis (`design_system.css`)
- [x] Animações CSS (`animations.css`)
- [x] Deploy na Vercel via `vercel.json`
- [ ] Responsividade validada em todos os breakpoints
- [ ] Lint JS sem erros

---

## Critérios de Aceite Globais

- [ ] `node server.js` sobe sem erro
- [ ] Lint JS sem erros (`npx eslint public/js/ server.js --ext .js`)
- [ ] Nenhum `console.log` de debug em produção
- [ ] Inspeção visual manual: 320px / 768px / 1280px
- [ ] Vídeos e players de áudio funcionam em todas as páginas de projeto

---

## Fora de Escopo

- TypeScript
- Framework front-end (React, Vue, etc.)
- Banco de dados
- Autenticação

---

## Dependências Externas

| Serviço | Uso | Configuração |
|---------|-----|-------------|
| Vercel | Deploy e CDN | `vercel.json` na raiz |
| 1pedrolima.com | Fonte dos áudios (proxy) | Hardcoded no server.js |

---

## Histórico de Decisões

| Data | Decisão | Motivo |
|------|---------|--------|
| 2026-04 | Migração de WordPress → Node.js+Express | Controle total sobre HTML/CSS/JS, performance |
| 2026-04 | Player HTML5 local substituindo Sonaar | Sonaar causava crashes em mobile |
| 2026-04 | Proxy de áudio no server.js | Hotlink protection + CORS no domínio original |
| 2026-04 | Deploy na Vercel (não Heroku) | `vercel.json` com `builds` + `routes` |
