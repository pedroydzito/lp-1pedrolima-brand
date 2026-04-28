# DESIGN.md
> Fonte da verdade para decisões visuais. Define tokens, regras, anti-padrões e critérios de aceite de design.
> Consultado pelo agente antes de qualquer tarefa com `tipo: front-end` ou `tipo: design`.
> Atualizado pelo humano. Nunca alterado durante implementação sem aprovação explícita.

---

## Como Usar Este Arquivo

- **Implementador:** leia as seções "Design Tokens" e "Regras de Composição" antes de escrever qualquer CSS ou JSX com estilo.
- **Validador:** use a seção "Checklist de Validação Visual" ao revisar tarefas de design.
- **Orquestrador:** inclua `DESIGN.md` no contexto de qualquer sprint com tipo `front-end` ou `design`.

---

## Design Tokens

> Estes são os valores canônicos. Nenhum valor hardcoded é permitido no código.
> Todo token deve estar em CSS variables ou no arquivo de configuração do design system (ex: `tailwind.config.ts`, `tokens.css`).

### Cores

```css
/* Preencha com os valores reais do projeto */

/* Marca */
--color-primary:        [ex: #5B4CF5];
--color-primary-hover:  [ex: #4A3DE0];
--color-primary-subtle: [ex: #EEF0FF];

/* Neutros */
--color-bg:             [ex: #FFFFFF];
--color-bg-subtle:      [ex: #F8F9FA];
--color-surface:        [ex: #FFFFFF];
--color-border:         [ex: #E2E8F0];
--color-text:           [ex: #0F172A];
--color-text-muted:     [ex: #64748B];

/* Feedback */
--color-success:        [ex: #22C55E];
--color-warning:        [ex: #F59E0B];
--color-error:          [ex: #EF4444];
--color-info:           [ex: #3B82F6];

/* [adicione tokens específicos do projeto] */
```

**Regra:** Nunca use `#` ou `rgb()` diretamente no código. Sempre use variáveis CSS ou tokens do design system.

---

### Tipografia

```css
/* Família */
--font-sans:    [ex: 'Inter', sans-serif];
--font-mono:    [ex: 'JetBrains Mono', monospace];
--font-display: [ex: mesma ou família alternativa para headings];

/* Escala — base: [ex: 16px], razão: [ex: 1.25x] */
--text-xs:   [ex: 0.75rem];   /* 12px */
--text-sm:   [ex: 0.875rem];  /* 14px */
--text-base: [ex: 1rem];      /* 16px */
--text-lg:   [ex: 1.125rem];  /* 18px */
--text-xl:   [ex: 1.25rem];   /* 20px */
--text-2xl:  [ex: 1.5rem];    /* 24px */
--text-3xl:  [ex: 1.875rem];  /* 30px */
--text-4xl:  [ex: 2.25rem];   /* 36px */

/* Peso */
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;

/* Line-height */
--leading-tight:  1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

### Espaçamento

```css
/* Escala de 4px — não use valores fora desta escala */
--space-1:  0.25rem;  /* 4px  */
--space-2:  0.5rem;   /* 8px  */
--space-3:  0.75rem;  /* 12px */
--space-4:  1rem;     /* 16px */
--space-5:  1.25rem;  /* 20px */
--space-6:  1.5rem;   /* 24px */
--space-8:  2rem;     /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
```

---

### Border Radius

```css
--radius-sm:   [ex: 4px];   /* inputs, badges */
--radius-md:   [ex: 8px];   /* botões, cards */
--radius-lg:   [ex: 12px];  /* modais, painéis */
--radius-xl:   [ex: 16px];  /* containers grandes */
--radius-full: 9999px;      /* pills, avatares */
```

---

### Sombras

```css
--shadow-sm:  [ex: 0 1px 2px rgba(0,0,0,0.05)];
--shadow-md:  [ex: 0 4px 6px rgba(0,0,0,0.07)];
--shadow-lg:  [ex: 0 10px 15px rgba(0,0,0,0.1)];
--shadow-xl:  [ex: 0 20px 25px rgba(0,0,0,0.1)];
```

---

### Breakpoints

```css
/* Mobile first */
--bp-sm:  640px;   /* sm  */
--bp-md:  768px;   /* md  */
--bp-lg:  1024px;  /* lg  */
--bp-xl:  1280px;  /* xl  */
--bp-2xl: 1536px;  /* 2xl */
```

---

### Transições

```css
--transition-fast:   150ms ease;
--transition-normal: 250ms ease;
--transition-slow:   400ms ease;
```

---

## Regras de Composição

> Decisões que definem a personalidade visual do projeto. O agente deve seguir estas regras mesmo quando não está explícito no contrato da tarefa.

### Hierarquia Visual
- [ex: Headings usam `--font-display`, corpo usa `--font-sans`]
- [ex: No máximo 3 níveis de hierarquia de texto por tela]
- [ex: Elementos primários usam `--color-primary`, secundários usam `--color-text-muted`]

### Componentes
- [ex: Botões primários: `--color-primary` com `--radius-md`. Nunca usar gradiente]
- [ex: Cards: `--color-surface` + `--shadow-sm` + `--radius-lg`. Nunca border E sombra juntos]
- [ex: Inputs: `--radius-sm`, border `--color-border`, focus ring `--color-primary`]
- [ex: Ícones: biblioteca [Lucide / Heroicons / etc.], tamanhos apenas 16px ou 24px]

### Layout
- [ex: Grid base de 12 colunas com gap `--space-6`]
- [ex: Max-width do container: 1280px, padding lateral: `--space-6` em mobile, `--space-8` em desktop]
- [ex: Sidebar fixa: 240px. Nunca redimensionável pelo agente sem aprovação]

### Estados de UI
- **Loading:** [ex: skeleton com animação pulse, nunca spinner genérico em elementos inline]
- **Vazio:** [ex: ilustração + mensagem + CTA. Nunca só texto]
- **Erro:** [ex: `--color-error` + ícone de alerta + mensagem amigável + ação de retry]
- **Sucesso:** [ex: toast não-intrusivo de 3s, `--color-success`]

---

## Anti-Padrões Proibidos

> O agente não implementa nenhum destes padrões, mesmo que o contrato não mencione explicitamente.

❌ **Nunca faça isso:**

- Valores hardcoded de cor, fonte ou espaçamento no código (`#fff`, `16px`, `font-size: 14px`)
- Gradientes em elementos interativos (botões, inputs)
- Sombra E borda no mesmo componente
- Mais de 4 cores distintas em uma mesma tela
- Texto sem contraste suficiente (< 4.5:1 para corpo, < 3:1 para texto grande)
- Animações em elementos que o usuário interage frequentemente (forms, listas longas)
- Layouts que quebram entre 768px e 1024px (o "tablet gap" clássico)
- `z-index` arbitrários (ex: `z-index: 9999`) — use a escala definida no projeto
- Misturar dois sistemas de design (ex: Tailwind utilitário + CSS modules) sem justificativa
- Ícones fora da biblioteca definida no projeto
- `!important` em CSS sem comentário justificando
- [adicione anti-padrões específicos do projeto]

---

## Biblioteca de Componentes

> Mapeamento dos componentes existentes. O agente deve reutilizar antes de criar.

| Componente | Caminho | Variantes disponíveis | Quando usar |
|---|---|---|---|
| Button | `src/components/ui/button.tsx` | `primary, secondary, ghost, destructive` | Toda ação do usuário |
| Input | `src/components/ui/input.tsx` | `default, error` | Campos de formulário |
| [componente] | [caminho] | [variantes] | [quando usar] |

**Regra:** Se o componente existe na tabela acima, **use-o**. Não crie uma versão alternativa.
Se precisar de uma variante não listada, documente em `PROGRESS.md` > Pendências Identificadas — não implemente sem aprovação.

---

## Checklist de Validação Visual

> Usado pelo Agente Validador ao revisar tarefas com `tipo: front-end` ou `tipo: design`.
> Cada item deve ser verificado e registrado no relatório de validação.

### Tokens e Consistência
- [ ] Nenhum valor hardcoded de cor, fonte ou espaçamento
- [ ] Todos os valores vêm de variáveis CSS ou tokens do design system
- [ ] Componentes novos seguem a biblioteca existente (ver tabela acima)

### Acessibilidade
- [ ] Contraste de texto: ≥ 4.5:1 (corpo), ≥ 3:1 (headings e texto grande)
- [ ] Todos os elementos interativos acessíveis via teclado
- [ ] Focus visible em todos os elementos interativos
- [ ] Imagens com `alt` descritivo (ou `alt=""` se decorativas)
- [ ] Formulários com `label` associado via `htmlFor`/`for`

### Responsividade
- [ ] Mobile (320px–480px): sem overflow horizontal
- [ ] Tablet (768px–1024px): layout adaptado, sem elementos cortados
- [ ] Desktop (1280px+): espaçamentos e proporções corretos
- [ ] Zoom 150%: sem quebra de layout ou texto cortado

### Comportamento
- [ ] Estados loading, vazio e erro implementados conforme regras acima
- [ ] Transições usam as variáveis `--transition-*` definidas nos tokens
- [ ] Nenhuma animação em elementos de uso frequente

### Regras de Composição
- [ ] Anti-padrões proibidos ausentes
- [ ] Hierarquia visual respeitada (no máximo 3 níveis por tela)
- [ ] Ícones da biblioteca correta e nos tamanhos permitidos

---

## Histórico de Decisões de Design

> Registre aqui decisões visuais importantes e o motivo. Evita que o agente "reverta" decisões sem saber o contexto.

| Data | Decisão | Motivo |
|------|---------|--------|
| [data] | [ex: Escolhemos não usar animações no sidebar] | [ex: Usuários reportaram distração em uso prolongado] |
| [data] | [ex: Border radius de 8px em cards, não 12px] | [ex: Ficou mais alinhado com a identidade mais sóbria do produto] |
| [data] | [decisão] | [motivo] |
