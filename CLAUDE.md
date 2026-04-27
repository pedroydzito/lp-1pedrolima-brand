# CLAUDE.md — Claude Code: Harness Engineering Mode

Este projeto usa Harness Engineering. Leia harness/ antes de qualquer ação.

## Protocolo obrigatório

1. Leia harness/AGENTS.md, harness/PROGRESS.md e harness/CONTRACTS.md
2. Toda tarefa — mesmo pontual — é registrada antes de ser executada
3. Rode os sensores de harness/SENSORS.md ao final de cada tarefa
4. Atualize harness/PROGRESS.md e faça commit ao concluir

## Stack

Node.js + Express, HTML/CSS/JS vanilla. Sem TypeScript. Sem tsc/vitest.
Sensores: eslint (JS) + inspeção manual visual no browser.

## Testes

Testes cobrem back-end E front-end. Mudanças visuais têm sensores próprios.
Veja a matriz completa em harness/SENSORS.md.
