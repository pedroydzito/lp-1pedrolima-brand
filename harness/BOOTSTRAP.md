# BOOTSTRAP.md
> Script de contexto para novas sessões. Se você é um agente começando agora, execute este protocolo.
> Resolve o problema de amnésia entre sessões — garante que cada nova sessão tenha contexto completo.

---

## ⚠️ MODO HARNESS OBRIGATÓRIO

> Esta regra se aplica a **absolutamente qualquer interação**, sem exceção.
> Não importa o tamanho ou aparente simplicidade da tarefa.

**O agente orquestrador SEMPRE opera dentro do Harness Engineering.**

Isso significa que mesmo para:
- "Isso ainda não funcionou, corrija" → cria tarefa ad-hoc em `CONTRACTS.md`, executa, roda sensores
- "Muda essa cor aqui" → registra como T-AD-XX, implementa, roda sensor de front-end
- "Analisa essa transcrição de 1h e faz 50 correções no sistema" → abre sprint, quebra em tarefas, executa em ordem, valida cada uma antes de avançar

**Nunca** execute código, corrija um bug ou altere qualquer arquivo sem antes:
1. Registrar o que vai fazer (contrato de sprint ou mini-tarefa ad-hoc em `CONTRACTS.md`)
2. Implementar dentro do escopo definido
3. Rodar os sensores correspondentes ao tipo de tarefa (ver `SENSORS.md`)
4. Atualizar `PROGRESS.md`

### Tarefas Ad-Hoc (fora de sprint planejado)

Para correções rápidas ou pedidos pontuais que chegam no meio de uma sessão, use o bloco de tarefa ad-hoc no `CONTRACTS.md`:

```markdown
#### T-AD-[seq]: [Título curto]
**Tipo:** Ad-hoc — solicitada em [data/hora]
**Descrição:** [o que foi pedido, exatamente como chegou]
**Critérios de aceite:**
- [ ] [verificável e objetivo]
**Sensores rodados:** [ ] type-check [ ] lint [ ] testes [ ] front-end [ ] build
**Status:** ✅ Concluído | ❌ Falhou
```

Mesmo uma correção de uma linha passa por este fluxo. Isso evita regressões silenciosas e mantém rastreabilidade total.

---

## Passo 0 — Setup de Arquivos de Configuração dos Agentes

> **Execute uma vez por projeto, logo após clonar ou iniciar o repositório.**
> Isso garante que qualquer ferramenta de IA que abrir este projeto já opere em modo harness
> automaticamente — sem precisar ser instruída a cada sessão.

### Estrutura criada

```
project-root/
├── AGENTS.md                        ← Regras universais (Antigravity, Cursor, Claude Code)
├── GEMINI.md                        ← Override nativo Antigravity (prioridade > AGENTS.md)
├── CLAUDE.md                        ← Específico para Claude Code
├── .cursorrules                     ← Específico para Cursor
├── .agents/
│   └── rules/
│       └── harness-mode.md          ← Regra granular do Antigravity
└── harness/                         ← O harness do projeto (SPEC, PROGRESS etc.)
```

### Comando de setup

```bash
bash harness/scripts/setup-agents.sh
```

Ou crie os arquivos manualmente com os templates abaixo.

---

### Template: `AGENTS.md` na raiz (cross-tool)

> Lido automaticamente por Antigravity v1.20.3+, Cursor e Claude Code.

```markdown
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
```

---

### Template: `GEMINI.md` na raiz (Antigravity override)

> Override nativo do Antigravity. Tem prioridade sobre `AGENTS.md` quando há conflito.

```markdown
# GEMINI.md — Antigravity: Harness Engineering Mode

## Contexto do Projeto

Este workspace opera em Harness Engineering. Leia harness/ antes de qualquer ação.

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

- Mudanças de back-end: type-check + lint + testes unitários + build
- Mudanças de front-end (incluindo CSS/design): lint + testes de componente
  + snapshot visual + checklist de responsividade
- Feature completa: todos os sensores

## Sem Exceções

Pedidos como "só muda essa cor" ou "corrige esse bug rápido" seguem o mesmo fluxo.
Velocidade não justifica pular o harness.
```

---

### Template: `CLAUDE.md` na raiz (Claude Code)

```markdown
# CLAUDE.md — Claude Code: Harness Engineering Mode

Este projeto usa Harness Engineering. Leia harness/ antes de qualquer ação.

## Protocolo obrigatório

1. Leia harness/AGENTS.md, harness/PROGRESS.md e harness/CONTRACTS.md
2. Toda tarefa — mesmo pontual — é registrada antes de ser executada
3. Rode os sensores de harness/SENSORS.md ao final de cada tarefa
4. Atualize harness/PROGRESS.md e faça commit ao concluir

## Testes

Testes cobrem back-end E front-end. Mudanças visuais têm sensores próprios.
Veja a matriz completa em harness/SENSORS.md.
```

---

### Template: `.cursorrules` na raiz (Cursor)

```
Este projeto opera em Harness Engineering.

Antes de qualquer ação, leia os arquivos em harness/ nesta ordem:
AGENTS.md → SPEC.md → PROGRESS.md → ARCHITECTURE.md → CONTRACTS.md → SENSORS.md

Regras:
- Toda tarefa é registrada em harness/CONTRACTS.md antes de ser executada
- Nenhuma tarefa é concluída sem passar nos sensores de harness/SENSORS.md
- Testes cobrem back-end E front-end — mudanças de CSS e design têm sensores próprios
- harness/PROGRESS.md é atualizado ao fim de cada tarefa
- Commit ao final de cada tarefa validada

Mesmo pedidos simples como "corrija isso" ou "muda essa cor" seguem este fluxo.
```

---

### Template: `.agents/rules/harness-mode.md` (Antigravity rules directory)

```markdown
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

## Testes obrigatórios por tipo

- Back-end: type-check + lint + testes unitários + build
- Front-end / visual: lint + testes de componente + snapshot + responsividade
- Feature completa: todos os sensores

## Proibido

- Implementar sem registrar a tarefa
- Marcar como feito sem rodar sensores
- Avançar para próxima tarefa com sensor falhando
```

---

### Script: `harness/scripts/setup-agents.sh`

```bash
#!/bin/bash
# Cria os arquivos de configuração de agentes na raiz do projeto.
# Execute uma vez por projeto: bash harness/scripts/setup-agents.sh

set -e
ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
TEMPLATES="$ROOT/harness/templates"

echo "📁 Configurando agentes em: $ROOT"

mkdir -p "$ROOT/.agents/rules"

# Só cria se não existir (não sobrescreve customizações)
[ -f "$ROOT/AGENTS.md" ]                    || cp "$TEMPLATES/AGENTS.md"        "$ROOT/AGENTS.md"
[ -f "$ROOT/GEMINI.md" ]                    || cp "$TEMPLATES/GEMINI.md"         "$ROOT/GEMINI.md"
[ -f "$ROOT/CLAUDE.md" ]                    || cp "$TEMPLATES/CLAUDE.md"         "$ROOT/CLAUDE.md"
[ -f "$ROOT/.cursorrules" ]                 || cp "$TEMPLATES/.cursorrules"      "$ROOT/.cursorrules"
[ -f "$ROOT/.agents/rules/harness-mode.md" ] || cp "$TEMPLATES/harness-mode.md" "$ROOT/.agents/rules/harness-mode.md"

echo ""
echo "✅ Arquivos criados:"
echo "   AGENTS.md                        (cross-tool)"
echo "   GEMINI.md                        (Antigravity override)"
echo "   CLAUDE.md                        (Claude Code)"
echo "   .cursorrules                     (Cursor)"
echo "   .agents/rules/harness-mode.md   (Antigravity rules)"
echo ""
echo "⚠️  Commite estes arquivos para que toda a equipe opere em modo harness:"
echo "   git add AGENTS.md GEMINI.md CLAUDE.md .cursorrules .agents/"
echo "   git commit -m 'chore: setup harness engineering agent config'"
```

---

## Protocolo de Início de Sessão

> **Execute na ordem. Não pule etapas.**

### Passo 1 — Leia o Harness
```
Leia os seguintes arquivos nesta ordem:
1. harness/AGENTS.md       → entenda seu papel
2. harness/SPEC.md         → entenda o projeto
3. harness/PROGRESS.md     → entenda onde estamos
4. harness/ARCHITECTURE.md → entenda os padrões
5. harness/CONTRACTS.md    → veja o sprint ativo (se houver)
6. harness/SENSORS.md      → saiba como validar
```

### Passo 2 — Verifique o Ambiente
```bash
node --version && npm --version
npm install
docker-compose ps
npx prisma migrate status
```

### Passo 3 — Verifique o Estado do Código
```bash
git status
git log --oneline -5
npx tsc --noEmit
npm run harness:check
```

### Passo 4 — Confirme Entendimento

Antes de começar, escreva:
```
Resumo do estado atual:
- Projeto: [nome]
- Sprint ativo: [S-XX ou nenhum]
- Última tarefa concluída: [T-XX]
- Próxima tarefa: [T-XX]
- Estado do código: [passando/falhando — quais sensores]
- Minha missão nesta sessão: [implementar/validar/planejar]
```

---

## Protocolo de Testes — Back-End + Front-End

> Toda tarefa concluída deve passar pelos sensores correspondentes ao que foi alterado.
> **"Só mudei o front" não é justificativa para pular testes de front-end.**

### Matriz de Sensores por Tipo de Mudança

| Tipo de mudança | Sensores obrigatórios |
|---|---|
| Lógica back-end (API, DB, services) | type-check + lint + testes unitários + build |
| Componente novo (UI) | type-check + lint + testes de componente + visual snapshot |
| Alteração visual / design / CSS | lint + visual snapshot + checklist de responsividade |
| Fluxo completo (feature E2E) | **todos os sensores** |
| Correção ad-hoc (qualquer tipo) | sensores do tipo de arquivo alterado |
| Lote de implementações (ex: transcrição) | cada implementação roda seus próprios sensores antes de avançar |

---

### Sensores de Front-End

#### F-01. Type Check (componentes)
```bash
npx tsc --noEmit
```

#### F-02. Lint com acessibilidade
```bash
npx eslint src/ --ext .tsx,.css --max-warnings 0
```

#### F-03. Testes de Componente
```bash
npx vitest run --reporter=verbose
```
O quê testar: renderização, props obrigatórias, estados (loading/erro/vazio/dados), interações.

#### F-04. Visual Snapshot
```bash
npx playwright test --grep @visual
# ou: npx chromatic --exit-zero-on-changes
```
Se não houver ferramenta configurada: descrever explicitamente no `PROGRESS.md` quais elementos visuais foram verificados.

#### F-05. Checklist de Responsividade

Para qualquer mudança de layout:
```
[ ] Mobile  (320px–480px)  — sem overflow horizontal, elementos empilhados corretamente
[ ] Tablet  (768px–1024px) — layout adaptado, sem elementos cortados
[ ] Desktop (1280px+)      — espaçamentos e proporções corretos
[ ] Zoom 150%              — sem quebra de layout ou texto cortado
```
```bash
npx playwright test --grep @responsive
```

#### F-06. Build de Produção
```bash
npm run build
```

---

### Sensores de Back-End

```bash
npx tsc --noEmit        # B-01 type check
npx eslint src/ --ext .ts   # B-02 lint
npx vitest run          # B-03 testes unitários
npm run build           # B-04 build
npx playwright test     # B-05 E2E
```

---

### Sensor Completo

```json
{
  "scripts": {
    "harness:check": "tsc --noEmit && eslint src/ --ext .ts,.tsx --max-warnings 0 && vitest run && npm run build",
    "harness:check:full": "npm run harness:check && playwright test"
  }
}
```

### Regra de Ouro

> Se qualquer sensor retornar exit code ≠ 0, a tarefa **não está concluída**.
> Isso vale para mudanças de uma linha de CSS tanto quanto para uma nova feature completa.
> Corrija → rode de novo → só então marque como feito.

---

## Protocolo de Fim de Sessão

### Passo 1
```bash
npm run harness:check
```

### Passo 2 — Atualize o PROGRESS.md
Marque tarefas, adicione notas, documente pendências e bloqueios.

### Passo 3 — Commit
```bash
git add -A
git commit -m "[sprint S-XX] [T-XX]: descrição curta

- O que foi feito
- Sensores: type-check ✅ lint ✅ testes ✅ build ✅"
```

### Passo 4
Reescreva a seção "Resumo para Nova Sessão" em `PROGRESS.md` com o estado atual.

---

## Setup do Zero (Projeto Novo)

```bash
# 1. Clone ou inicie
git clone [url] || git init

# 2. Instale dependências
npm install

# 3. Configure ambiente
cp .env.example .env

# 4. Banco de dados
docker-compose up -d
npx prisma migrate dev --name init

# 5. Configure os agentes na raiz do projeto (UMA VEZ POR PROJETO)
bash harness/scripts/setup-agents.sh
git add AGENTS.md GEMINI.md CLAUDE.md .cursorrules .agents/
git commit -m "chore: setup harness engineering agent config"

# 6. Verifique
npm run harness:check
npm run dev
```

---

## Troubleshooting Comum

| Problema | Solução |
|----------|---------|
| `Cannot find module` | `npm install` |
| `Type error` | Leia a mensagem completa, corrija o tipo, rode `tsc --noEmit` |
| `Migration failed` | `npx prisma migrate reset` (⚠️ apaga dados locais) |
| `Port already in use` | `lsof -i :3000` e kill o processo |
| Snapshot visual com diff inesperado | Revise o CSS; se mudança intencional, atualize o snapshot |
| Agente não leu o harness antes de agir | Verifique se `AGENTS.md` e `GEMINI.md` estão na raiz do projeto e commitados |
| Agente travado sem saber o que fazer | Documente em `PROGRESS.md` > Bloqueios, pare |
