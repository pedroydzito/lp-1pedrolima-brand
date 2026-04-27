# GEMINI.md — Antigravity: Harness Engineering Mode

## Contexto do Projeto

Este workspace opera em Harness Engineering. Leia harness/ antes de qualquer ação.

**Projeto:** Pedro Lima — Brand Portfolio
**Stack:** Node.js + Express, HTML/CSS/JS vanilla, sem TypeScript, sem framework front-end
**Rodar:** `npm install && node server.js` (ou `npm start`)
**Porta:** 3000 (local)

## Perfil de Autonomia Recomendado

Use Review-driven development como perfil padrão:
- Planejamento visível antes de executar
- Checkpoints entre tarefas
- Nunca execute múltiplos arquivos em sequência sem confirmar o anterior

## Workflow Padrão

Para qualquer pedido recebido:

1. Leia harness/CONTRACTS.md — existe tarefa aberta que cobre este pedido?
   - Sim → execute dentro do contrato
   - Não → crie uma entrada T-AD-XX antes de prosseguir
2. Implemente
3. Rode os sensores de harness/SENSORS.md para o tipo de mudança
4. Atualize harness/PROGRESS.md
5. Commit: [sprint S-XX] [T-XX]: descrição

## Testes

- Mudanças de back-end: lint + build (sem TypeScript neste projeto)
- Mudanças de front-end (incluindo CSS/design): lint + checklist de responsividade manual
- Feature completa: todos os sensores aplicáveis

## Sensores Aplicáveis a Este Projeto

| Sensor | Comando |
|--------|---------|
| Lint JS | `npx eslint public/js/ server.js --ext .js` |
| Servidor sobe | `node server.js` (verifica exit code) |
| Visual (manual) | Inspeção no browser em 320px, 768px, 1280px |

## Sem Exceções

Pedidos como "só muda essa cor" ou "corrige esse bug rápido" seguem o mesmo fluxo.
Velocidade não justifica pular o harness.
