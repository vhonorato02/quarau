# S07 — Design system e direção visual

**Modelo:** `opus` · **Lê:** este arquivo + PROGRESSO + [brand.md](../brand.md) + `content/legacy/scrape/capturas/*` (só as `*-desktop.jpg`, como referência do que existia)

- capturas em [diagnostico/](../diagnostico/) · **Dono:** 🔑 olhar a direção visual e dizer "segue" ou o que mudar (5 min)

## Objetivo

Uma linguagem visual própria. Hoje o site parece template. O alvo é parecer o relatório de uma consultoria séria que conhece o território. O design system fica documentado e testado numa página interna, antes de refazer as páginas (S08). Isso evita retrabalho.

## Direção: "relatório de campo"

- **Fotografia de território como protagonista:**
  - recortes generosos, sem filtros;
  - ponto focal respeitado;
  - legendas e créditos sempre que existirem;
  - fotos ruins ou pequenas (< 1200 px) nunca em tamanho grande: viram miniaturas ou galeria.
- **Tipografia editorial com a Barlow:**
  - títulos grandes e firmes (peso 600–700; a Barlow Semi Condensed para títulos display, se melhorar o ritmo, ainda self-hosted);
  - texto corrido confortável;
  - números grandes para resultados.
- **Elemento gráfico da marca:**
  - a **lupa do símbolo** ("olhar atento") usada como moldura de recorte de foto e como marcador de destaque;
  - **linhas de curva de nível** (SVG leve) como textura discreta em faixas de cor, remetendo a território.
  - Nunca sobre rostos. Nunca 3D.
- **Cor:**
  - fundo branco e um neutro quente de papel (proposto `#F6F4EF`, validar contraste) para seções alternadas;
  - tinta `#0B1F2E`;
  - azul da marca `#0089CF` (texto azul sobre branco: `#006FA8`);
  - verde `#39B54A` só como acento (pontos, sublinhados, ícones).
  - Nada de faixas azuis chapadas repetidas.
- **Ritmo:**
  - espaço em branco com intenção: seção de 96–128 px no desktop e 64 px no celular;
  - medida de leitura até 68ch;
  - **proibido** coluna de meia tela vazia e buraco em grade.

## Passos

1. **Tokens** (`packages/ui`):
   - cores (com pares de contraste testados: AA 4.5:1 para texto, 3:1 para texto grande e UI);
   - escala tipográfica fluida:
     - corpo 18/1.6;
     - lead 22–24;
     - h1 `clamp(2.75rem, 6vw, 5.5rem)`;
     - h2 `clamp(2rem, 4vw, 3.5rem)`;
     - h3 24–28;
     - metadado ≥ 14 px; nada menor, exceto o legal do rodapé;
   - espaçamentos;
   - raios;
   - sombras (quase nenhuma);
   - grade de 12 colunas com container de 1280 px e margens de 20, 32 e 48 px;
   - breakpoints 390 / 768 / 1024 / 1280 / 1440.
2. **Componentes**, com todos os estados (hover, foco visível, ativo, desabilitado, carregando, erro, vazio):
   - **Estrutura:** Header (desktop + gaveta mobile com o logo completo), Footer, faixa de CTA, Breadcrumb, Section header (eyebrow + título + lead), Prose (rich text).
   - **Mídia e cards:** Media (com `srcset` da S02), Card de projeto / área / notícia, Stat (número + legenda + fonte), Etapas (linha do tempo), Chip/Tag (área, ODS), Citação, Galeria + Lightbox, Vídeo (carrega no clique), Mapa estático, Parede de logos (com nome em texto quando não há logo).
   - **Interação:** campos de formulário (texto, área, seleção, checkbox, ajuda, erro), mensagem de status, estado vazio, filtros, busca, barra de cookies compacta (canto inferior esquerdo, máx. 400 px; barra fina no celular; nunca cobre CTA).
3. **Movimento:**
   - só CSS: fade + 12 px ao entrar na tela, 300 ms;
   - hover sutil em cards e botões;
   - nada de rolagem sequestrada;
   - tudo desligado com `prefers-reduced-motion`.
4. **Página `/_ds`** (`noindex`, fora do menu e do sitemap):
   - mostra tokens, tipografia e cada componente em cada estado, com textos realistas da Quarau;
   - substitui o Storybook: remova `packages/ui/.storybook` e as stories.
5. **Testes:**
   - visual (Playwright) da `/_ds` em 390, 768 e 1440;
   - axe na `/_ds`;
   - teste de contraste dos pares de cor (unitário, com a fórmula WCAG).
6. 🔑 **Direção aprovada:**
   - gerar `docs/design/DIRECAO.md` com 4 capturas: `/_ds` no desktop e no celular, mais um esboço da home (hero + primeiras 2 seções) montado com os componentes;
   - pedir ao dono "segue" ou ajustes antes da S08.

## Pronto quando

- `/_ds` completa e verde em visual e axe.
- Contraste testado.
- Storybook removido.
- "Segue" do dono registrado em PROGRESSO.
