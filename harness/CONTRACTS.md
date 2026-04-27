# CONTRACTS.md
> Contrato do sprint ativo. Define exatamente o que será implementado e como será validado.
> Criado pelo Implementador no início de cada sprint. Aprovado pelo Validador antes da implementação.

---

## Como Funciona

1. **Planejamento:** Implementador lê `SPEC.md` + `PROGRESS.md` e escreve o contrato do próximo sprint.
2. **Aprovação:** Validador lê o contrato e confirma que está alinhado com a spec. Se não estiver, negocia ajustes.
3. **Implementação:** Implementador executa apenas o que está no contrato.
4. **Validação:** Validador testa item a item usando os critérios de aceite definidos aqui + sensores de `SENSORS.md`.
5. **Resultado:** Aprovado → atualiza `PROGRESS.md`. Reprovado → volta para Implementador com relatório.

---

## Contrato Ativo

**Sprint:** S-[XX]
**Criado por:** Implementador — [data]
**Aprovado por:** Validador — [data] *(preencher antes de iniciar implementação)*
**Status:** 📝 Rascunho | ✅ Aprovado | 🔄 Em implementação | 🔍 Em validação | ✅ Concluído

---

### Tarefas do Sprint

#### T-[01]: [Título da Tarefa]
**Descrição:** O que exatamente deve ser implementado.
**Tipo:** `back-end` | `front-end` | `design` | `full-stack`
**Arquivos que serão criados/modificados:**
- `src/[caminho]/[arquivo].ts` — [o que muda]
- `src/[caminho]/[arquivo].tsx` — [o que muda]

**Critérios de aceite — Código:**
- [ ] [critério específico e verificável]
- [ ] [critério específico e verificável]
- [ ] Testes unitários cobrindo os casos: [liste os casos]
- [ ] Sensor B-01 (type-check) passa sem erros
- [ ] Sensor B-02 (lint) passa sem erros

**Critérios de aceite — Visuais** *(preencher se tipo for `front-end` ou `design`)*:
- [ ] Sensor F-04 (visual snapshot) sem diff inesperado
- [ ] Sensor F-05 (responsividade): mobile / tablet / desktop verificados
- [ ] Sensor F-06 (acessibilidade): contraste ≥ 4.5:1, navegação por teclado funcional
- [ ] Tokens de design respeitados — ver `DESIGN.md` > Design Tokens
- [ ] Nenhum valor hardcoded de cor, fonte ou espaçamento (usar variáveis CSS / tokens)

---

#### T-[02]: [Título da Tarefa]
**Descrição:** [descrição]
**Tipo:** `back-end` | `front-end` | `design` | `full-stack`
**Arquivos que serão criados/modificados:**
- [lista]

**Critérios de aceite — Código:**
- [ ] [critério]

**Critérios de aceite — Visuais** *(se aplicável)*:
- [ ] [critério visual]

---

### O Que Este Sprint NÃO Faz

> Explicitamente fora de escopo para evitar scope creep.

- [item fora de escopo]
- [item fora de escopo]

---

### Dependências

> O que precisa estar pronto ou disponível para este sprint funcionar.

- [ex: Banco de dados rodando]
- [ex: Tokens de design definidos em `DESIGN.md`]
- [ex: Variável `STRIPE_SECRET_KEY` configurada]

---

## Tarefas Ad-Hoc

> Para correções ou pedidos pontuais fora de sprint planejado.
> Mesmo uma correção de uma linha passa por este fluxo.

#### T-AD-01: Correções de bugs — player, slideshow, cursor e loading
**Tipo:** Ad-hoc — solicitada em 2026-04-27T12:58
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Cinco grupos de bugs reportados:
1. Barra de progresso do player de música não avança durante reprodução
2. Slideshow nos cards da home: flash de volta para thumb entre imagens; imagens menores que a thumb ficam cropadas; círculo de "EXPLORAR" menor que o de "EXPANDIR"
3. Cursor personalizado mostrando "EXPANDIR" em imagens que não são de projeto (SVGs, logos etc)
4. Cursor desaparecendo em algumas imagens (cursor real sumindo)
5. Cursor sempre branco mesmo em fundos claros; deve ser escuro em fundos claros e branco em fundos escuros; manter círculo branco em imagens de projeto
6. Loading screen removida; substituída por carregamento progressivo fluido

**Arquivos modificados:**
- `public/js/animations.js` — cursor, slideshow, lightbox, loading
- `public/js/custom-audio.js` — barra de progresso
- `public/css/animations.css` — cursor adaptativo, objeto-fit no slideshow

**Critérios de aceite:**
- [ ] Barra de progresso do player avança em sync com o áudio
- [ ] Slideshow: sem flash de volta para thumb; imagens cobrem 100% do card; círculo EXPLORAR = tamanho do EXPANDIR
- [ ] EXPANDIR só aparece em imagens das páginas de projeto (links para /assets/*.png, não SVG/logo)
- [ ] Cursor nativo nunca desaparece em nenhuma imagem
- [ ] Cursor escuro em fundos claros, branco em fundos escuros; branco sobre imagens de projeto
- [ ] Página carrega de forma limpa sem loader preto

**Sensores rodados:**
- [ ] Lint JS
- [ ] Servidor sobe
- [ ] F-05 visual: 320px, 768px, 1280px

**Status:** 🔄 Em implementação

---

## Histórico de Contratos Anteriores

| Sprint | Período | Resultado | Notas |
|--------|---------|-----------|-------|
| S-01 | [datas] | ✅ Aprovado | [notas] |
| S-02 | [datas] | ❌ Reprovado (1x) → ✅ | [notas] |

---

## Template para Novo Contrato

> Copie o bloco abaixo quando for iniciar um novo sprint.

```markdown
## Contrato Ativo

**Sprint:** S-[XX]
**Criado por:** Implementador — [data]
**Aprovado por:** Validador — [data]
**Status:** 📝 Rascunho

### Tarefas do Sprint

#### T-[01]: [Título]
**Descrição:** 
**Tipo:** `back-end` | `front-end` | `design` | `full-stack`
**Arquivos:**
- 

**Critérios de aceite — Código:**
- [ ] 
- [ ] Sensor B-01 (type-check) passa
- [ ] Sensor B-02 (lint) passa

**Critérios de aceite — Visuais** *(se aplicável)*:
- [ ] Sensor F-04 (visual snapshot) sem diff inesperado
- [ ] Sensor F-05 (responsividade) verificado
- [ ] Tokens de design respeitados — ver DESIGN.md

### O Que Este Sprint NÃO Faz
- 

### Dependências
- 
```
