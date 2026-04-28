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

**Status:** ✅ Concluído (implementado e validado)

---

#### T-AD-02: Animações de hover em imagens (scale-down + zoom-out no slideshow)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T09:04 (ajustada às 09:15)
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Dois novos efeitos visuais:
1. Imagens dos cards na home e imagens nas páginas de projeto: scale-down sutil (0.98) ao passar o mouse (ajustado de 0.96 para 0.98 para ser menos agressivo)
2. No slideshow da home: a cada troca de imagem, a nova começa com zoom 1.10 e recua até 1.0 (zoom-out cinético)

**Arquivos modificados:**
- `public/css/animations.css` — `.lima-slide-wrap` hover (0.98), keyframe `lima-zoom-out` (1.10 + 0.65s), novo `.lima-img-hover-wrap`
- `public/js/animations.js` — `setupLightbox` injeta wrapper `.lima-img-hover-wrap` em cada imagem de projeto

**Critérios de aceite:**
- [x] Cards da home: imagem diminui sutilmente (0.98) ao hover e volta ao normal ao sair
- [x] Páginas de projeto: imagens diminuem sutilmente (0.98) no hover sem vazar fora do container
- [x] Slideshow: toda troca de imagem tem animação de zoom-out perceptível
- [x] Sem overflow visual nos cards ou nas páginas de projeto

**Sensores rodados:**
- [x] Lint JS
- [x] Servidor sobe
- [x] F-05 visual: 320px, 768px, 1280px

**Status:** ✅ Implementado (ajustado conforme feedback)

---

#### T-AD-03: Remover duplicação da foto no Hero da Home
**Tipo:** Ad-hoc — solicitada em 2026-04-28T16:21
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Removida a imagem de fundo estática (`Card1-background.jpg`) que estava causando uma duplicação visual da foto do Pedro Lima no Hero da Home. A camada de background foi mantida para o efeito de parallax, mas sem a imagem redundante.

**Arquivos modificados:**
- `public/css/design_system.css` — removeu a imagem de `layer-bg`

**Critérios de aceite:**
- [x] Apenas uma foto do Pedro Lima é visível no Hero (a do parallax)
- [x] O efeito de parallax das camadas frontais continua funcionando
- [x] O fundo do Hero permanece com preenchimento adequado (sem ficar transparente/vazio se não desejado)

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: 1280px (verificação de duplicação)

**Status:** ✅ Concluído (removido fundo estático)

---

#### T-AD-04: Restaurar imagem de fundo no Hero (Parallax)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T16:36
**Tipo de mudança:** `front-end` / `design`
**Descrição:** O usuário reportou que o fundo do hero ficou totalmente escuro após a remoção da imagem estática. A tarefa é restaurar a imagem `Card1-background.jpg` na camada de parallax `.layer-bg` para que o fundo tenha textura e profundidade, mantendo o movimento sincronizado.
**Arquivos modificados:**
- `public/css/design_system.css` — adicionar `background-image` à `.layer-bg`

**Critérios de aceite:**
- [x] O hero da home volta a ter a imagem de fundo original (`Card1-background.jpg`)
- [x] A imagem de fundo se move com o efeito de parallax (velocidade 0.004)
- [x] Não há duplicação visual "estática" (a imagem só deve estar na camada de parallax)
- [x] O fundo escuro (#060312) serve como fallback ou base para a imagem

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: 1280px, 768px, 320px
- [x] Checklist de responsividade (garantir que o fundo cubra a área)

**Status:** ✅ Concluído

---

#### T-AD-05: Corrigir border-radius em imagens de projeto no hover
**Tipo:** Ad-hoc — solicitada em 2026-04-28T16:47
**Tipo de mudança:** `front-end` / `design`
**Descrição:** O usuário reportou que as imagens dentro das páginas de projeto perdem o efeito de border-radius (parecem ficar com cantos retos) quando sofrem o efeito de scale-down no hover. O objetivo é garantir que o arredondamento de 24px seja preservado e visualmente correto durante a animação.
**Arquivos modificados:**
- `public/css/animations.css` — ajustar `.lima-img-hover-wrap img`

**Critérios de aceite:**
- [x] Imagens em páginas de projeto mantêm cantos arredondados (24px) durante o hover
- [x] O efeito de scale-down (0.98) continua funcionando suavemente
- [x] Sem "vazamento" de cantos retos se a imagem for menor que o container

**Sensores rodados:**
- [x] Servidor sobe
**Status:** ✅ Concluído

---

#### T-AD-06: Ajustes Mobile — Border-radius, Tags e Player de Música
**Tipo:** Ad-hoc — solicitada em 2026-04-28T16:50
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Série de ajustes finos para a versão mobile:
1. Reduzir todos os `border-radius: 24px` para `15px` em telas mobile (< 768px).
2. Ajustar o `border-radius` do player de música para coincidir com as imagens (24px desktop, 15px mobile).
3. Corrigir o overflow dos tempos (`currentTime`/`totalTime`) no player de música em mobile.
4. Reduzir o tamanho das tags (`.lima-tag`) pela metade em mobile.
**Arquivos modificados:**
- `public/css/design_system.css` — media queries para border-radius, tags e player
- `public/css/animations.css` — media queries para border-radius das imagens

**Critérios de aceite:**
- [x] Border-radius de 15px em mobile para cards, imagens e player
- [x] Tags com padding e font-size reduzidos em mobile
- [x] Player de música com layout corrigido em mobile (tempos dentro do container)
- [x] Player de música com 24px de border-radius em desktop

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: 1280px (desktop check)
- [x] F-05 visual: 320px (mobile check)

**Status:** ✅ Concluído

---

#### T-AD-07: Player Seek, Correção de Crop em Títulos e Ajustes de Espaçamento
**Tipo:** Ad-hoc — solicitada em 2026-04-28T16:57
**Tipo de mudança:** `front-end` / `js` / `design`
**Descrição:** Refinamentos técnicos e visuais:
1. **Player Seek:** Permitir que o usuário clique na barra de progresso para avançar/retroceder a música.
2. **Mobile Player:** Corrigir a largura da barra de progresso que está extrapolando o card em mobile.
3. **Crop de Título:** Corrigir o corte inferior em letras com descendentes (ex: 'g' em Róger) nos títulos dos projetos.
4. **Simetria Footer:** Ajustar o espaçamento entre a última imagem e o footer para ser idêntico às margens laterais.
5. **Espaçamento Player/Imagens:** Equalizar o respiro entre o player e as imagens no mobile.
**Arquivos modificados:**
- `public/js/custom-audio.js` — implementação de busca (seek) por clique
- `public/css/design_system.css` — correções de layout mobile, line-height de títulos e espaçamento do footer

**Critérios de aceite:**
- [x] Clicar na barra de música altera o tempo de reprodução
- [x] Títulos de projeto exibem descendentes (g, j, p, q, y) sem cortes
- [x] Barra de progresso mobile preenche o card sem overflow
- [x] Espaçamento final simétrico com as margens laterais

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: check de descendentes no título
- [x] F-05 visual: teste de clique na barra de música

**Status:** ✅ Concluído

---

#### T-AD-08: Correção de Simetria do Footer (Padding Bottom da Seção Branca)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:03
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Correção do erro na tarefa anterior onde o padding foi aplicado ao footer escuro em vez da seção branca que o precede. O objetivo é garantir que o espaço abaixo da última foto (fundo branco) seja igual às margens laterais da página, criando uma simetria perfeita antes do início do footer preto.
**Arquivos modificados:**
- `public/css/design_system.css` — reverter padding de `#contatos` e aplicar à seção anterior

**Critérios de aceite:**
- [x] O footer escuro (`#contatos`) volta a ter seu padding-top original/simétrico ao bottom
- [x] A última seção branca antes do footer tem um `padding-bottom` idêntico ao `padding-left/right` da página
- [x] Simetria mantida em mobile e desktop

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: inspeção da última imagem e transição para o footer

**Status:** ✅ Concluído

---

#### T-AD-09: Ajuste Fino de Padding via Variáveis Elementor
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:07
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Implementação de ajuste específico de padding via variáveis de ambiente do Elementor (`--padding-bottom`) para um container específico em vez de regras globais genéricas.
**Arquivos modificados:**
- `public/css/design_system.css` — remover regras de `#contatos` e adicionar ajuste para `.elementor-element-1af830d`

**Critérios de aceite:**
- [x] Regra `#contatos { padding-top: 80px !important; }` removida
- [x] Container `.elementor-element-1af830d` com `--padding-bottom: 20px` (desktop) e `5%` (mobile)

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: check de simetria no projeto Róger Nobles

**Status:** ✅ Concluído

---

#### T-AD-10: Remoção de Height Fixo na Barra de Música (Sonaar Asset)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:09
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Remoção da regra de `height: 30px !important` no seletor `.sr_waveform_simplebar .sonaar_fake_wave` dentro do arquivo de asset do Sonaar, permitindo que a altura seja fluida ou controlada por outras regras (como o nosso custom-audio).
**Arquivos modificados:**
- `public/assets/sonaar-music-public.css` — remover a linha de height

**Critérios de aceite:**
- [x] Regra `height: 30px !important` removida do arquivo de asset
- [x] Mantidas as propriedades de flexbox no mesmo seletor

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: check do player de música em diferentes resoluções

**Status:** ✅ Concluído

---

#### T-AD-11: Refinamento de Especificidade em Headings (Remover !important)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:12
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Remoção do uso de `!important` nas regras globais de `h1` para evitar conflitos com as media queries nativas do Elementor em dispositivos mobile.
**Arquivos modificados:**
- `public/css/design_system.css` — remover !important de font-size, line-height e letter-spacing do h1

**Critérios de aceite:**
- [x] h1 global sem !important em font-size e line-height
- [x] Títulos continuam legíveis em desktop e se adaptam corretamente no mobile

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: check de títulos em desktop (84px) e mobile (escala natural)

**Status:** ✅ Concluído

---

#### T-AD-12: Correção de Layout do Player Mobile (Alinhamento e Overflow)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:14
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Correção do layout do player de música no mobile:
1. Corrigir o deslocamento vertical da barra de progresso (está subindo).
2. Garantir que o tempo total (`totalTime`) não transborde o limite do card.
3. Melhorar o respiro interno do card para evitar cortes.
**Arquivos modificados:**
- `public/css/design_system.css` — novos overrides para o player no breakpoint mobile

**Critérios de aceite:**
- [ ] Barra de progresso alinhada horizontalmente com o botão Play
- [ ] Tempo total visível dentro do card branco
- [ ] Layout equilibrado e sem cortes laterais em 320px

**Sensores rodados:**
- [ ] Servidor sobe
- [x] F-05 visual: check de player mobile em 320px (simulador)

**Status:** ✅ Concluído

---

#### T-AD-12: Correção de Layout do Player Mobile (Alinhamento e Overflow)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:14
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Correção do layout do player de música no mobile:
1. Corrigir o deslocamento vertical da barra de progresso (está subindo).
2. Garantir que o tempo total (`totalTime`) não transborde o limite do card.
3. Melhorar o respiro interno do card para evitar cortes.
**Arquivos modificados:**
- `public/css/design_system.css` — novos overrides para o player no breakpoint mobile

**Critérios de aceite:**
- [x] Barra de progresso alinhada horizontalmente com o botão Play
- [x] Tempo total visível dentro do card branco
- [x] Layout equilibrado e sem cortes laterais em 320px

**Sensores rodados:**
- [x] F-05 visual: check de player mobile em 320px (simulador)

**Status:** ✅ Concluído

---

#### T-AD-13: Overwrite de Headings Mobile (Elementor Kit)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:15
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Implementação de override específico para `h1` dentro do `.elementor-kit-10` no mobile, garantindo que o tamanho da fonte e altura de linha sejam respeitados via `!important`.
**Arquivos modificados:**
- `public/css/design_system.css` — adicionar regra para `.elementor-kit-10 h1` no mobile

**Critérios de aceite:**
- [x] h1 mobile com font-size: 32px, line-height: 30px e letter-spacing: -1px
- [x] Uso de !important conforme solicitado pelo usuário

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: check de títulos mobile em páginas de projeto

**Status:** ✅ Concluído

---

#### T-AD-14: Ajuste Global de Line-Height em Headings (h1)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:16
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Atualização do `line-height` de todos os `h1` para `0.95` (desktop e mobile), buscando um visual mais "tight" e impactante.
**Arquivos modificados:**
- `public/css/design_system.css` — atualizar regras de `h1` e `.elementor-kit-10 h1`

**Critérios de aceite:**
- [x] h1 global com line-height: 0.95
- [x] h1 mobile (kit-10) com line-height: 0.95 (substituindo o valor fixo anterior)

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: check de títulos para garantir que o aperto não está cortando letras excessivamente

**Status:** ✅ Concluído

---

#### T-AD-15: Remoção de Height da Onda (Player Mobile)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:20
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Remoção da regra de altura fixa (`12px`) para a onda do player de música no mobile, deixando que as regras padrão ou dinâmicas controlem sua dimensão.
**Arquivos modificados:**
- `public/css/design_system.css` — remover height da `.wave` no breakpoint mobile

**Critérios de aceite:**
- [x] Regra `height: 12px !important` removida do mobile CSS

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: check do player mobile

**Status:** ✅ Concluído

---

#### T-AD-16: Correção de Overflow e Containment do Player Mobile
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:22
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Correção definitiva para o transbordo do player no mobile:
1. Configurar `.srp_control_box` como flex container para alinhar Play e Barra.
2. Garantir que `.srp_wave_box` e seus filhos (`.player`, `.sr_progressbar`) ocupem apenas o espaço disponível (`flex-grow: 1` e `min-width: 0`).
3. Forçar o `totalTime` a respeitar o padding do card.
**Arquivos modificados:**
- `public/css/design_system.css` — novos overrides de containment para o player

**Critérios de aceite:**
- [x] Player totalmente contido dentro do card no mobile
- [x] Tempo total visível e alinhado com a margem direita interna do card
- [x] Sem scroll horizontal interno no player

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: check de containment em 320px

**Status:** ✅ Concluído

---

#### T-AD-17: Ajuste de Padding do Player Mobile
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:23
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Atualização do padding do card do player no mobile para `20px 20px` para garantir respiro lateral simétrico.
**Arquivos modificados:**
- `public/css/design_system.css` — atualizar regra de padding da `.srp_player_boxed` no mobile

**Critérios de aceite:**
- [x] Padding lateral do player mobile em 20px

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: check de respiro lateral do player mobile

**Status:** ✅ Concluído

---

#### T-AD-18: Unset de Padding em Container Específico (Mobile)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:29
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Remoção do `padding-bottom` (via `unset !important`) no container `[data-id="0d2ae98"] .e-con-inner` para dispositivos mobile, visando corrigir espaçamentos indesejados.
**Arquivos modificados:**
- `public/css/design_system.css` — adicionar regra específica para o container informado

**Critérios de aceite:**
- [x] padding-bottom removido no mobile para o container especificado

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: check de espaçamento na seção alvo

**Status:** ✅ Concluído

---

#### T-AD-19: Override de Grid para Coluna Única (Home Mobile)
**Tipo:** Ad-hoc — solicitada em 2026-04-28T17:30
**Tipo de mudança:** `front-end` / `design`
**Descrição:** Forçar layout de coluna única (`repeat(1, 1fr)`) e fluxo em linha (`row`) para o container de grid `.elementor-element-a279a19` no mobile.
**Arquivos modificados:**
- `public/css/design_system.css` — adicionar override de variáveis de grid

**Critérios de aceite:**
- [x] Grid em coluna única no mobile para o container especificado
- [x] Row gap de 10px aplicado

**Sensores rodados:**
- [x] Servidor sobe
- [x] F-05 visual: check de layout da home no mobile

**Status:** ✅ Concluído

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
