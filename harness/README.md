# 🔧 Harness Engineering

> Ambiente operacional para agentes de IA. Baseado nas práticas publicadas por Anthropic, OpenAI e Martin Fowler (2026).

---

## O que é isso?

Esta pasta `harness/` é o **sistema nervoso** do projeto para agentes de IA.

Um agente poderoso sem harness é como um engenheiro brilhante jogado num repositório sem README, sem arquitetura documentada, sem testes e sem CI. Ele vai fazer o melhor que pode — e vai errar muito.

O harness resolve isso fornecendo:
- **Contexto persistente** entre sessões (memória)
- **Regras claras** de como trabalhar (feed forward)
- **Sensores de validação** que definem "pronto" objetivamente (feedback)
- **Contratos** que evitam scope creep e loops infinitos

---

## Arquivos

| Arquivo | Propósito | Quem atualiza |
|---------|-----------|---------------|
| `AGENTS.md` | Define papéis, missões e regras dos agentes | Humano (raramente) |
| `SPEC.md` | O que construir — user stories, sprints, critérios | Humano |
| `ARCHITECTURE.md` | Como construir — padrões, anti-padrões, estrutura | Humano |
| `PROGRESS.md` | Estado atual, o que foi feito, bloqueios | Agente (cada sessão) |
| `CONTRACTS.md` | Acordo do sprint ativo entre Implementador e Validador | Agente (cada sprint) |
| `SENSORS.md` | Comandos de validação — o que define "pronto" | Humano |
| `BOOTSTRAP.md` | Protocolo de início/fim de sessão | Humano (raramente) |

---

## Fluxo de Trabalho

```
HUMANO define spec e arquitetura
        ↓
IMPLEMENTADOR lê harness → cria contrato do sprint
        ↓
VALIDADOR aprova contrato
        ↓
IMPLEMENTADOR executa tarefas → roda sensores a cada tarefa
        ↓
VALIDADOR testa item a item contra o contrato
        ↓
    ┌── ❌ Falhou → Implementador corrige
    └── ✅ Passou → Atualiza PROGRESS.md → commit → próximo sprint
```

---

## Como Usar

### Iniciando uma sessão com agente
Cole este prompt no início de qualquer sessão:

```
Leia todos os arquivos em harness/ nesta ordem: AGENTS.md, SPEC.md, PROGRESS.md, 
ARCHITECTURE.md, CONTRACTS.md, SENSORS.md. Depois me diga: qual é o estado atual 
do projeto e qual seria o próximo passo lógico?
```

### Iniciando um novo sprint
```
Leia o harness/ completo. Com base no PROGRESS.md e SPEC.md, crie o contrato 
para o próximo sprint em CONTRACTS.md. Liste as tarefas, arquivos que serão 
modificados e critérios de aceite para cada uma.
```

### Pedindo implementação
```
Você é o Agente Implementador. Leia harness/CONTRACTS.md e execute a tarefa T-[XX]. 
Ao finalizar cada item, rode os sensores de harness/SENSORS.md e só marque como 
concluído se todos passarem. Atualize harness/PROGRESS.md ao terminar.
```

### Pedindo validação
```
Você é o Agente Validador. Leia harness/CONTRACTS.md e harness/SENSORS.md. 
Valide a implementação do sprint S-[XX] item a item. Rode todos os sensores e 
retorne um relatório com status de cada critério de aceite.
```

---

## Compatibilidade

Funciona com qualquer ferramenta de IA:
- **Claude.ai / API** — cole os arquivos no contexto ou use Projects
- **Cursor / Windsurf** — adicione `harness/` ao contexto de cada conversa
- **Claude Code (CLI)** — `claude --context harness/`
- **VS Code + Copilot** — abra os arquivos antes de fazer perguntas
- **Qualquer LLM** — os arquivos são texto puro, universais

---

## Adaptando para Seu Projeto

1. Preencha `SPEC.md` com as user stories reais
2. Documente a estrutura de pastas em `ARCHITECTURE.md`
3. Ajuste os comandos de `SENSORS.md` para sua stack
4. Delete os exemplos placeholder e substitua com dados reais
5. Nunca delete os arquivos — apenas atualize o conteúdo
