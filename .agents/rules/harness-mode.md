# Rule: Harness Engineering Mode

## Quando usar
Sempre. Esta regra se aplica a toda e qualquer execução neste workspace.

## Antes de agir

Leia nesta ordem:
- harness/AGENTS.md
- harness/PROGRESS.md
- harness/CONTRACTS.md
- harness/SENSORS.md

## Fluxo obrigatório

Para qualquer pedido — simples ou complexo:
1. Existe tarefa em harness/CONTRACTS.md que cobre o pedido?
   - Sim → execute dentro do contrato
   - Não → adicione T-AD-XX antes de prosseguir
2. Implemente
3. Rode os sensores de harness/SENSORS.md para o tipo de mudança
4. Atualize harness/PROGRESS.md
5. Commit: [sprint S-XX] [T-XX]: descrição

## Stack deste projeto

Node.js + Express, HTML/CSS/JS vanilla. Sem TypeScript, sem framework front-end.
Sensores aplicáveis: eslint (JS) + verificação manual visual.

## Testes obrigatórios por tipo

- Back-end (server.js, rotas): lint + servidor sobe sem erro
- Front-end / visual (CSS, HTML, JS): lint + checklist responsividade manual
- Feature completa: todos os sensores aplicáveis

## Proibido

- Implementar sem registrar a tarefa
- Marcar como feito sem rodar sensores
- Avançar para próxima tarefa com sensor falhando
