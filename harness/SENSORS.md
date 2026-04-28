# SENSORS.md
> Sensores são comandos que retornam 0 (passou) ou 1 (falhou).
> O agente nunca julga se o código está bom. Os sensores julgam.
> **Rode todos os sensores antes de marcar qualquer tarefa como concluída.**

---

## Regra de Ouro

> Se um sensor falha, a tarefa **não está concluída**. Não há exceções.
> Corrija o erro, rode os sensores novamente, só então marque como feito.
> Isso vale para uma linha de CSS tanto quanto para uma nova feature completa.

---

## Sensores de Back-End

### B-01. Type Check
```bash
npx tsc --noEmit
```
**Quando rodar:** Após qualquer alteração em arquivos `.ts` ou `.tsx`
**Passa se:** Sem erros de tipo
**Falha se:** Qualquer erro de tipo

---

### B-02. Lint
```bash
npx eslint src/ --ext .ts,.tsx

# Com auto-fix (use antes de commitar)
npx eslint src/ --ext .ts,.tsx --fix
```
**Quando rodar:** Após qualquer alteração de código
**Passa se:** 0 errors (warnings são aceitáveis se documentados)
**Falha se:** Qualquer error

---

### B-03. Testes Unitários
```bash
# Vitest
npx vitest run

# Jest
npx jest --passWithNoTests
```
**Quando rodar:** Após implementar qualquer lógica com testes associados
**Passa se:** Todos os testes passam
**Falha se:** Qualquer teste falha

---

### B-04. Build
```bash
npm run build
```
**Quando rodar:** Ao final de cada sprint, antes da validação final
**Passa se:** Build completa sem erros
**Falha se:** Qualquer erro de compilação

---

### B-05. Testes E2E *(se configurado)*
```bash
# Playwright
npx playwright test

# Cypress
npx cypress run --headless
```
**Quando rodar:** Ao final de cada sprint
**Passa se:** Todos os cenários passam
**Falha se:** Qualquer cenário falha

---

## Sensores de Front-End / Design

> Obrigatórios para **qualquer** alteração visual, de layout, de estilo ou de componente.
> "Só mudei o CSS" não é justificativa para pular estes sensores.

### F-01. Type Check (componentes)
```bash
npx tsc --noEmit
```
**Quando rodar:** Após qualquer alteração em arquivos `.tsx`
**Passa se:** Sem erros de tipo
**Falha se:** Qualquer erro de tipo

---

### F-02. Lint com acessibilidade
```bash
npx eslint src/ --ext .tsx,.css --max-warnings 0
```
**Quando rodar:** Após qualquer alteração de código ou estilo
**Passa se:** 0 errors e 0 warnings
**Falha se:** Qualquer error ou warning

---

### F-03. Testes de Componente
```bash
npx vitest run --reporter=verbose
```
**Quando rodar:** Após criar ou modificar qualquer componente
**O quê testar:** renderização, props obrigatórias, estados (loading / erro / vazio / dados), interações
**Passa se:** Todos os testes passam
**Falha se:** Qualquer teste falha

---

### F-04. Visual Snapshot
```bash
# Playwright visual
npx playwright test --grep @visual

# Chromatic (Storybook)
npx chromatic --exit-zero-on-changes
```
**Quando rodar:** Após qualquer alteração visual intencional
**Passa se:** Sem diff inesperado — ou diff revisado e aprovado explicitamente
**Falha se:** Diff inesperado não revisado

> **Se não houver ferramenta configurada:** descreva explicitamente no `PROGRESS.md`
> quais elementos visuais foram verificados e como (ex: inspeção manual no browser).
> Ausência de ferramenta não dispensa o sensor — dispensa apenas a automação.

---

### F-05. Checklist de Responsividade

Para **qualquer** mudança de layout ou componente:

```
[ ] Mobile  (320px–480px)  — sem overflow horizontal, elementos empilhados corretamente
[ ] Tablet  (768px–1024px) — layout adaptado, sem elementos cortados
[ ] Desktop (1280px+)      — espaçamentos e proporções corretos
[ ] Zoom 150%              — sem quebra de layout ou texto cortado
```

```bash
# Playwright responsivo
npx playwright test --grep @responsive
```

> **Se não houver automação:** verifique manualmente no browser com DevTools e
> registre o resultado no `PROGRESS.md` com os breakpoints verificados.

---

### F-06. Checklist de Acessibilidade

Para qualquer componente novo ou alteração de cores/contraste:

```
[ ] Contraste de texto: ≥ 4.5:1 (normal) / ≥ 3:1 (grande)
[ ] Elementos interativos acessíveis via teclado (Tab, Enter, Esc)
[ ] Imagens com alt text descritivo
[ ] Formulários com labels associados
[ ] Focus visible em todos os elementos interativos
```

```bash
# axe-core via Playwright
npx playwright test --grep @a11y

# axe CLI
npx axe http://localhost:3000
```

---

### F-07. Build de Produção
```bash
npm run build
```
**Quando rodar:** Ao final de cada sprint com mudanças visuais
**Passa se:** Build completa sem erros ou warnings de CSS
**Falha se:** Qualquer erro

---

## Matriz de Sensores por Tipo de Tarefa

| Tipo de mudança | Sensores obrigatórios |
|---|---|
| Lógica back-end (API, DB, services) | B-01 + B-02 + B-03 + B-04 |
| Componente novo (UI) | F-01 + F-02 + F-03 + F-04 + F-05 |
| Alteração visual / design / CSS | F-02 + F-04 + F-05 + F-06 |
| Tokens de design alterados | F-04 + F-05 + F-06 + F-07 |
| Fluxo completo (feature E2E) | **todos os sensores** |
| Correção ad-hoc back-end | B-01 + B-02 + testes relevantes |
| Correção ad-hoc front-end | F-01 + F-02 + F-04 |
| Lote de implementações | cada item roda seus próprios sensores antes de avançar |

---

## Sensor de Saúde Rápida

```json
{
  "scripts": {
    "harness:check": "tsc --noEmit && eslint src/ --ext .ts,.tsx --max-warnings 0 && vitest run && npm run build",
    "harness:check:full": "npm run harness:check && playwright test",
    "harness:check:design": "eslint src/ --ext .tsx,.css --max-warnings 0 && vitest run && playwright test --grep @visual"
  }
}
```

```bash
# Verificação geral
npm run harness:check

# Verificação focada em mudanças visuais
npm run harness:check:design

# Verificação completa (antes de merge ou release)
npm run harness:check:full
```

---

## Interpretando Resultados

### Exit code 0 = sensor passou
```bash
echo $?  # deve retornar 0
```

### Exit code 1+ = sensor falhou
- Não avance para o próximo item
- Copie o erro completo no `PROGRESS.md` > Bloqueios
- Corrija antes de continuar
- Se não conseguir corrigir em 2 tentativas, escale para humano

---

## Adicionando Novos Sensores

```markdown
### [Letra]-[N]. [Nome do Sensor]
```bash
[comando]
```
**Quando rodar:** [condição]
**Passa se:** [critério objetivo]
**Falha se:** [critério objetivo]
```
