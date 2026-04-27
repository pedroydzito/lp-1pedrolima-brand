# AGENTS.md — Harness Engineering Mode

Este projeto opera em Harness Engineering. Todo agente que trabalhar aqui
deve seguir este protocolo antes de qualquer ação.

## Regra Absoluta

Antes de executar qualquer tarefa — simples ou complexa — leia:

1. harness/AGENTS.md       → seu papel nesta sessão
2. harness/SPEC.md         → o que este projeto faz
3. harness/PROGRESS.md     → estado atual e o que já foi feito
4. harness/ARCHITECTURE.md → padrões obrigatórios de código
5. harness/CONTRACTS.md    → sprint ativo e tarefas em aberto
6. harness/SENSORS.md      → como validar o trabalho

## Modo de Operação

- Toda tarefa — mesmo ad-hoc — é registrada em harness/CONTRACTS.md antes de ser executada
- Nenhuma tarefa é marcada como concluída sem ter passado nos sensores de harness/SENSORS.md
- Testes cobrem back-end E front-end — mudanças visuais têm seus próprios sensores
- harness/PROGRESS.md é atualizado ao fim de cada tarefa
- Commit ao final de cada tarefa validada, com mensagem no padrão do harness

## Proibido

- Implementar fora do escopo do contrato ativo
- Declarar "feito" sem ter rodado os sensores
- Ignorar falhas de sensor e avançar assim mesmo
- Fazer alterações em arquivos sem registrar a tarefa primeiro
