# S08 — Páginas

**Modelo:** `opusplan` · subagentes `qa-visual` e `testador-persona` · **Lê:** este arquivo + PROGRESSO + `docs/copy/paginas/<página>.md`
(só a da página em curso) + §3 do [RELATORIO-COMPLETO](../RELATORIO-COMPLETO.md) · **Dono:** nada

## Objetivo

Cada página refeita com o design system (S07) e os textos aprovados (S06), sem nenhum dos defeitos do diagnóstico (S1–S7, H1–H5, P1–P5, O1–O5), dentro do orçamento de performance.

## Método (para cada página, nesta ordem)

1. Ler a especificação abaixo e o pacote de texto da página.
2. Montar com componentes do design system. Nada de estilo solto.
3. `pnpm dev` + `node tests/qa/screens.mjs http://localhost:3000` só para a rota.
4. `qa-visual` revisa as folhas-resumo (390 e 1440).
5. Corrigir. Commit `feat(site): <página>`.
6. Ao fechar as páginas: `testador-persona` com as 3 personas de visitante (QA.md, camada 4) em local.

## Especificações

- **Home:**
  - hero com foto de projeto escolhida no CMS, em tela cheia:
    - 85 vh no desktop e 4:5 no celular;
    - gradiente de tinta para leitura;
    - H1 + linha fina + 2 CTAs;
    - o símbolo como acento pequeno, nunca sobre rostos (H1);
  - "Quem somos" em frase forte de 28–32 px em cor sólida (H4) + foto;
  - números de resultado com fonte;
  - **projetos em destaque**: 1 grande + 2 empilhados, ou 3 iguais, sem buraco (H2);
  - áreas de atuação em 4 cards **com foto** (H5);
  - "Como trabalhamos" em 6 etapas compactas;
  - parceiros com logos de 56–64 px de altura, cinza → cor no hover, nome em texto quando não houver logo (H3);
  - CTA final.
- **Projetos (lista):**
  - introdução;
  - filtros por área (chips de 16 px, contagem por área);
  - grade **uniforme** de 3/2/1 colunas (P2);
  - card: foto 4:3, área, título 22 px, resumo de 2 linhas em 16 px, ano e local em 14 px.
- **Case de projeto:**
  - capa de 70 vh com título e chips;
  - lide de 24 px + **ficha técnica** lateral (sticky no desktop: cliente, realizador, local, período, papel da Quarau, parceiros, áreas, ODS);
  - resultados em números;
  - "Sobre o projeto" em coluna legível, **sem metade vazia** (P3);
  - capítulos com imagem e texto alternados;
  - mapas e "Território" em grade de 2–3 colunas com lightbox, **dentro do container**: fim do carrossel cortado (P1);
  - vídeo;
  - ODS;
  - galeria com as 9 primeiras + "Ver todas as N fotos" (P4);
  - notícias relacionadas (posts das redes);
  - próximo projeto;
  - CTA.
- **Atuação (lista):** 4 cards grandes com foto, descrição e nº de projetos.
- **Área de atuação** (O2):
  - capa com foto (campo `cover` em Áreas);
  - o que é e para quem;
  - "O que entregamos";
  - etapas;
  - **projetos desta área** em grade;
  - perguntas frequentes da área (se houver, S06);
  - CTA.
- **Sobre** (O3):
  - hero com foto;
  - quem somos;
  - história/linha do tempo (só fatos);
  - missão, visão e valores em 3 cards (17 px);
  - como trabalhamos;
  - equipe (só se houver cadastro);
  - ODS;
  - parceiros;
  - CTA.
- **Contato** (O4):
  - canais clicáveis: `mailto:`, `tel:`, WhatsApp `https://wa.me/55…` (só se o dono confirmar que é WhatsApp), Instagram e LinkedIn;
  - formulário ao lado, com estados de envio, sucesso e erro claros;
  - região de atuação;
  - **sem faixa de CTA**.
- **Notícias:** lista com destaque para a mais recente; notícia com lide, imagens, link do post original e projeto relacionado.
- **Busca:** alinhada ao container; resultados com miniatura e tipo; estado vazio útil.
- **404 / 500:** mantém o 404 atual com busca e atalhos; 500 com mensagem humana.
- **Banner de cookies:** o componente compacto da S07.
- **Faixa de CTA do rodapé:** editável e ocultável por página (S03).

## Orçamento (medido no build e confirmado no ar na S11)

- **JS inicial da home ≤ 120 KB gzip.** Sem 3D, GSAP ou Lenis. Ilhas client só onde há interação (menu, filtros, lightbox, formulário, cookies).
- **LCP** ≤ 2,5 s em 4G simulado. A imagem do hero tem `fetchpriority="high"` e o `srcset` certo.
- **CLS** ≤ 0,05. Todas as mídias com `width`/`height`.
- **Lighthouse mobile:** Performance ≥ 90, Acessibilidade 100, Boas práticas ≥ 95.

## Pronto quando

- Todas as rotas passam no `screens.mjs` sem problemas.
- `qa-visual` sem itens P0/P1.
- As 3 personas de visitante concluem as tarefas.
- Orçamento cumprido no build local.
- Snapshots visuais atualizados **depois** das capturas aprovadas; CI verde.
