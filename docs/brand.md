# Marca Quarau — regras extraídas

> **Princípio:** a identidade é inegociável. O site novo muda a execução (layout, ritmo, fotografia,
> movimento) e mantém logo, cores e tipografia exatamente como a Quarau já usa. Não foi encontrado
> manual de marca publicado. As regras abaixo vêm dos arquivos oficiais do site atual e estão
> documentadas com a origem de cada uma. Se houver um manual, ele prevalece `[CONFIRMAR]`.

## 1. Logo

### Versões oficiais encontradas (e só estas são usadas)

| Versão                         | Arquivo no repositório                             | Origem (raster original)                                      |
| ------------------------------ | -------------------------------------------------- | ------------------------------------------------------------- |
| Símbolo colorido (Q + ponto)   | `apps/web/public/brand/quarau-simbolo.svg`         | `SIMBOLO-QUARAU-COLORIDO-20231118-192931.png` (1155×1010)     |
| Símbolo negativo (branco)      | `apps/web/public/brand/quarau-simbolo-branco.svg`  | `home_company3_slider_pic5-copy…png` (marca d’água do slider) |
| Logotipo colorido + assinatura | `apps/web/public/brand/quarau-logotipo.svg`        | `Untitled-design-3.png` / `Untitled-design-4.png`             |
| Logotipo negativo + assinatura | `apps/web/public/brand/quarau-logotipo-branco.svg` | `Layer-1-20231118-193158.png` (1295×306, slider da home)      |

Os originais raster estão em [`docs/brand-assets/originais/`](brand-assets/originais).

### Como foi vetorizado (sem redesenho)

Não havia SVG, AI nem PDF da marca no site, então o logo foi **vetorizado com fidelidade** pelo script
reprodutível [`tools/brand/vectorize_logo.py`](../tools/brand/vectorize_logo.py):

- **Letras “QUARAU” e o “Q” do símbolo:** traçado automático (potrace) sobre o canal alfa do original
  ampliado 8×, sem nenhuma edição manual de forma.
- **Círculos** (o ponto final e os pontos internos dos “A”): ajustados como círculos exatos, com
  centro e raio calculados pela área dos pixels do original.
- **Assinatura “Projetos Socioambientais, Educativos e Culturais”:** é texto em **Barlow Regular**.
  Ela foi reconstruída com os contornos da própria fonte, posicionados e escalados para coincidir
  com a caixa delimitadora do original (erro < 1 px a 1295 px de largura).
- Proporções, espaçamentos e posição relativa de todos os elementos são os do arquivo de origem.
  Nenhuma cor foi alterada.

> **Atenção:** o arquivo `Artboard-1-copy-2.png` usado no site antigo está **achatado
> horizontalmente** (foi distorcido ao ser redimensionado). Ele não foi usado como referência de
> geometria. Ver `docs/brand-assets/originais/logotipo-colorido-artboard-distorcido.png`.

### Uso

- **Cabeçalho:** símbolo (como no site original), com o nome “Quarau” como texto acessível.
- **Rodapé, hero e OG images:** logotipo completo com a assinatura.
- **Sobre foto ou fundo azul:** versão negativa (branca).
- **Área de proteção:** no mínimo a altura do ponto verde (≈ 1/6 da altura do “Q”) em todos os lados.
- **Tamanho mínimo:** símbolo com 24 px; logotipo completo com 160 px de largura (abaixo disso a
  assinatura fica ilegível, então use o símbolo).
- **Proibido:** distorcer, recolorir com cores fora da paleta, aplicar sombra ou contorno, girar,
  separar o ponto verde do logotipo ou recompor a assinatura em outra fonte.

## 2. Cores

### Primárias (identidade, inegociáveis)

| Token                 | Hex       | Origem                                                                        |
| --------------------- | --------- | ----------------------------------------------------------------------------- |
| `--color-brand-blue`  | `#0089CF` | Cor de tema do CSS do site (botões, links, rodapé, seleção) e cor do logotipo |
| `--color-brand-green` | `#39B54A` | Cor de destaque do CSS (links, ícones) e o ponto do logotipo                  |

Variação encontrada: o arquivo do **símbolo** usa `#0080C8` (azul) e `#3AAA35` (verde), diferença
típica de conversão CMYK→RGB. O SVG do símbolo mantém as cores do seu próprio arquivo de origem. Os
tokens do sistema usam as cores do logotipo e do CSS `[CONFIRMAR as cores oficiais em Pantone/CMYK]`.

### Apoio (complementam, nunca substituem)

Derivadas por escurecimento da cor da marca, apenas para cumprir **WCAG 2.2 AA** em texto:

| Token                 | Hex                                                   | Uso                                   | Contraste        |
| --------------------- | ----------------------------------------------------- | ------------------------------------- | ---------------- |
| `--color-blue-700`    | `#006FA8`                                             | Texto de link, botão primário (fundo) | 5,47:1 no branco |
| `--color-blue-800`    | `#005C8C`                                             | Hover/pressionado                     | 7,22:1 no branco |
| `--color-green-700`   | `#24792F`                                             | Texto/ícone verde sobre fundo claro   | 5,45:1 no branco |
| `--color-ink`         | `#0E1A24`                                             | Títulos e texto principal             | 17,6:1 no branco |
| `--color-ink-muted`   | `#4A5866`                                             | Texto secundário                      | 7,29:1 no branco |
| `--color-surface`     | `#FFFFFF`                                             | Fundo                                 |                  |
| `--color-surface-alt` | `#F4F7F9`                                             | Seções alternadas                     |                  |
| `--color-line`        | `#DCE3E8`                                             | Divisores e bordas                    |                  |
| Estados               | `#B42318` erro · `#B54708` alerta · `#24792F` sucesso | Formulários                           |                  |

**Regras de contraste:**

- `#0089CF` com texto branco dá 3,83:1. Só pode ser usado com **texto grande** (≥ 24 px, ou ≥ 18,66 px
  em negrito) e em componentes de interface. Para botões com texto de 16 px, use `blue-700`.
- `#39B54A` **nunca** leva texto branco nem é usado como cor de texto sobre fundo claro (2,66:1). É cor
  de acento: o ponto, marcadores, linhas, ícones decorativos e realces. Texto sobre verde usa `ink`.

## 3. Tipografia

| Papel           | Família                                        | Origem                                                                                        |
| --------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Títulos e texto | **Barlow** (300, 400, 500, 600, 700, itálicos) | CSS do tema: `body`, `h1`–`h6` e menu usam `"Barlow"`; também é a fonte da assinatura do logo |

- Fonte **self-hosted** (`@fontsource/barlow`, licença OFL), subsets latin e latin-ext, com
  `font-display: swap` e preload dos pesos críticos.
- Poppins e Roboto apareciam no CSS antigo só como padrão do tema (botões genéricos) e **não** fazem
  parte da identidade.
- Hierarquia: display e H1 em Barlow 600 com tracking levemente negativo (−0,02 em) e entrelinha
  apertada (0,95–1,05), como no H1 original (600, entrelinha 1,0). Texto corrido em Barlow 400,
  17–19 px e entrelinha 1,6.

## 4. Elementos gráficos

- **O ponto verde** é a assinatura visual da marca. No site ele vira motivo gráfico: marcador de
  seção, indicador de navegação ativa, cursor do hero e ponto final de títulos-chave. O uso é
  moderado, no máximo uma ocorrência por bloco visual.
- **A lupa (Q)** remete a “pesquisa e diagnóstico de territórios”. No hero aparece como elemento 3D
  leve. O fallback estático é o próprio símbolo SVG.
- **Fotografia:** imagens reais dos projetos (comunidades, territórios, oficinas, patrimônio).
  Nada de banco de imagens genérico. Tratamento natural, sem filtros coloridos. Sobreposições
  usam `ink` a 40–60% para garantir legibilidade.
- **ODS:** exibidos com as cores e os números oficiais da ONU, como chips textuais acessíveis.

## 5. Tom de voz

Institucional, técnico e humano. Frases curtas e afirmativas, com verbos de ação (concebe,
articula, gerencia, mede, difunde). O foco é território, pessoas e resultado. Sem superlativos sem
lastro e sem números que não estejam publicados.

## 6. Onde estão os tokens

- CSS (Tailwind v4 `@theme`): [`packages/ui/src/styles/tokens.css`](../packages/ui/src/styles/tokens.css)
- Storybook: “Fundamentos / Marca”
