# 0016 — Direção de design "Lente"

- **Status:** aceita
- **Data:** 2026-10-26

## Contexto

O dono avaliou o site como "sem design, parece mockup". A autocrítica ([AUTOCRITICA.md](../AUTOCRITICA.md))
confirmou: layout genérico de tema, grade de cards desigual, hero 3D sobre a foto, tipografia pequena. A marca
(logo, cores, Barlow) é inegociável ([brand.md](../brand.md)); a execução, não.

Foram prototipadas três direções em HTML estático, home e página de projeto, em 390 px e 1440 px
([DESIGN.md §3](../DESIGN.md#3-três-direções-protótipos)).

## Decisão

Adotar a direção **A — Lente**, com o índice de projetos por território e a ficha de projeto da direção B:

- a lupa do símbolo vira a **janela circular de uma foto de campo** no hero da home, com o ponto verde; é o único
  elemento "ousado" do site e aparece uma vez;
- projetos apresentados pelo **território** (município, UF) e pelo período, em índice tipográfico, não em cards;
- página de projeto como **ficha** (território, quem realiza, papel da Quarau, período) seguida de foto plena,
  texto em duas colunas, citação, mapa e mosaico com "ver todas";
- branco, tinta (`#0E1A24`) e azul da marca; verde só no ponto.

## Consequências

- O 3D (React Three Fiber/three.js), GSAP e Lenis saem: a lente é CSS puro (ADR 0018).
- Os blocos do CMS são reescritos para esta linguagem (hero lente, índice, ficha, ciclo, número em contexto…);
  os blocos antigos sem equivalente são removidos.
- Fotos com no máximo 1600 px funcionam bem: o maior uso em tela cheia é 21:9 com foco central.
- Crítica visual com captura em todas as páginas antes de declarar pronta.
