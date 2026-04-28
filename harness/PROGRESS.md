# PROGRESS.md
> Memória persistente entre sessões. Atualizado ao final de cada tarefa ou sprint.
> **Se você é um agente iniciando uma sessão, leia este arquivo inteiro antes de qualquer ação.**

---

## Estado Atual do Projeto

**Última atualização:** 2026-04-28T09:04:00-03:00
**Sprint ativo:** Nenhum
**Status geral:** 🟢 Estável

---

## Resumo para Nova Sessão

```
Pedro Lima Brand Portfolio — site de portfólio de branding, migrado de WordPress para
Node.js + Express (vanilla HTML/CSS/JS). Há 7 páginas: index (home com parallax hero)
+ 6 páginas de projeto (luna-sheeny, martin-dahmer, priscila-elpo, robison-kunz,
roger-nobles, vitor-dos-santos).

Stack: Node.js 22 + Express 4. Deploy: Vercel (vercel.json na raiz).
Para rodar local: npm install && node server.js → http://localhost:3000

O que já existe e funciona:
- Hero parallax na home
- Cards de projetos com vídeo + thumbnail
- Player HTML5 de áudio customizado (public/js/custom-audio.js)
- Proxy de áudio no server.js (bypass CORS/hotlink do 1pedrolima.com)
- Design system CSS com variáveis (public/css/design_system.css)
- Animações CSS (public/css/animations.css)
- Todas as rotas de projeto funcionando

Estado do código (2026-04-27):
- Há modificações não commitadas em server.js e todos os views/* (adições de features
  das últimas sessões: music player HTML5, thumbnails de vídeo, estilos)
- Novos arquivos não rastreados: .agents/, public/js/, public/css/animations.css,
  arquivos de áudio MP3, GEMINI.md
- Nenhum sprint aberto; próximas ações são ad-hoc

O próximo passo recomendado: commit do estado atual, depois abrir novo sprint
se houver features planejadas.
```

---

## Sprints

### Sprint S-01: Migração WordPress → Node.js — ✅ Concluído
**Concluído em:** 2026-04-24
**Tarefas:**
- [x] T-01: Estrutura inicial Express + rotas — ✅
- [x] T-02: HTML/CSS de todas as páginas migrado — ✅
- [x] T-03: Sistema de design CSS com tokens — ✅
- [x] T-04: Deploy Vercel configurado — ✅

**Notas:**
- Migração completa do WordPress. Stack: Node.js + Express, HTML/CSS/JS vanilla.
- `vercel.json` usa `builds` (Express serverless) + `routes` (SPA-style redirect).

---

### Sprint S-02: Polimento Visual e Players — ✅ Concluído
**Concluído em:** 2026-04-26
**Tarefas:**
- [x] T-05: Hero parallax com z-index correto — ✅
- [x] T-06: Tipografia global CircularStd aplicada — ✅
- [x] T-07: Border-radius 24px nos cards de projeto — ✅
- [x] T-08: Thumbnails em vídeos (Martin Dahmer + Luna Sheeny) — ✅
- [x] T-09: Player HTML5 de áudio (substitui Sonaar) — ✅

**Notas:**
- Player Sonaar causava crashes em mobile; substituído por `custom-audio.js` nativo HTML5.
- Proxy de áudio em server.js resolve hotlink protection e CORS.
- Vídeos de projeto servidos localmente a partir de `public/assets/`.

---

## Pendências Identificadas

- [ ] 2026-04-27 — Commit pendente: todas as mudanças das últimas sessões precisam ser commitadas
- [ ] 2026-04-27 — ESLint não está instalado como devDependency. Para rodar o sensor B-02/lint: `npm install --save-dev eslint` e criar `.eslintrc.json`. Sensor de lint não pode ser executado até isso ser feito.
- [ ] 2026-04-27 — Responsividade não foi validada formalmente (apenas inspeção visual)
- [ ] 2026-04-27 — Páginas priscila-elpo, robison-kunz, roger-nobles, vitor-dos-santos ainda podem estar com fontes de vídeo incorretas (verificar)

---

## Bloqueios

*(nenhum)*

---

## Log de Sessões

| Data | O que foi feito | Commit |
|------|-----------------|--------|
| 2026-04-24 | Migração inicial WordPress → Node.js, estrutura Express, design system | b0faa37 |
| 2026-04-24 | Parallax hero, tipografia CircularStd, ajustes de z-index | múltiplos |
| 2026-04-25 | Border-radius nos cards, caminhos de vídeo corrigidos, thumbnails adicionados | — |
| 2026-04-25 | Player HTML5 implementado (custom-audio.js), proxy de áudio no server.js | — |
| 2026-04-26 | Debug e correção do player de áudio em todas as páginas | 60a3720 |
| 2026-04-27 | BOOTSTRAP executado: arquivos de agente criados, SPEC/PROGRESS/ARCHITECTURE atualizados | — |
| 2026-04-27 | Sensores BOOTSTRAP: servidor ✅ sobe em 3s | lint ⚠️ ESLint não instalado | visual — pendente |
| 2026-04-27 | T-AD-01: barra de progresso player, slideshow sem flash, cursor 88px, removão loader | 10ee8c9 |
| 2026-04-28 | T-AD-02: animações de hover (scale-down 0.98), zoom-out slideshow | — |
| 2026-04-28 | T-AD-03: remoção de fundo estático no Hero | — |
| 2026-04-28 | T-AD-04: restauração de fundo parallax no Hero | — |
| 2026-04-28 | T-AD-05: correção de border-radius em imagens de projeto no hover | — |
| 2026-04-28 | T-AD-06: ajustes mobile (border-radius, tags, player de música) | — |
| 2026-04-28 | T-AD-07: player seek, correção crop títulos, simetria footer | — |
| 2026-04-28 | T-AD-08: correção de simetria do footer (seção branca) | — |
| 2026-04-28 | T-AD-09: ajuste fino de padding via variáveis Elementor | — |
| 2026-04-28 | T-AD-10: remoção de height fixo na barra de música (Sonaar) | — |
| 2026-04-28 | T-AD-11: remoção de !important nos headings (h1) | — |
| 2026-04-28 | T-AD-12: correção de layout do player mobile | — |
| 2026-04-28 | T-AD-13: override de headings mobile (Elementor Kit) | — |
| 2026-04-28 | T-AD-14: ajuste de line-height para 0.95 (h1) | — |
| 2026-04-28 | T-AD-15: remoção de height da onda (player mobile) | — |
| 2026-04-28 | T-AD-16: correção de overflow e containment do player mobile | — |
| 2026-04-28 | T-AD-17: ajuste de padding do player mobile | — |
| 2026-04-28 | T-AD-18: unset de padding em container específico (mobile) | — |
| 2026-04-28 | T-AD-19: override de grid para coluna única (home mobile) | — |
| 2026-04-28 | T-AD-20: correção de slideshow no hover (double buffering) | — |
| 2026-04-28 | T-AD-21: refinamento de transição (fim das piscadas) | — |
| 2026-04-28 | T-AD-22: correção de sequência e buffering do slideshow | — |
| 2026-04-28 | T-AD-23: sincronização robusta (recursiva) do slideshow | — |
| 2026-04-28 | T-AD-24: refatoração profunda (pipeline prefetch) | — |

---

## Variáveis de Ambiente Necessárias

*(nenhuma — projeto não usa .env)*

---

## Como Rodar o Projeto

```bash
# 1. Instalar dependências
npm install

# 2. Rodar
node server.js
# → http://localhost:3000
```

## Sensores Aplicáveis

| Sensor | Comando |
|--------|---------|
| Lint JS | `npx eslint public/js/ server.js --ext .js` |
| Servidor sobe | `node server.js` (verifica exit code 0) |
| Visual manual | Inspeção no browser: 320px, 768px, 1280px |
