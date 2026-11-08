# Progresso

> Qualquer agente retoma só lendo este arquivo. Atualize "Retomar em" antes de parar e faça commit.
> A missão atual (2026-10-26) substitui o plano em sessões S00–S14: as fases estão abaixo. O plano antigo
> ([PLANO.md](PLANO.md), [plano/](plano/)) fica como histórico.

## Retomar em

- **Sessão atual:** 07/11/2026. Homologação **no ar na VPS** (plataforma vps-platform 1.0):
  `https://quarau.zewithane.vps.brz.dev.br`, `SITE_NOINDEX=true`. A VPS foi zerada em 06/11; banco, mídia
  (61 itens) e administrador foram restaurados de `/srv/backups/import/quarau/` em 07/11.
- **Deploy automático:** push na `main` → CI/CD completo → job "Deploy to the VPS" (chave dedicada
  `DEPLOY_SSH_KEY`) → smoke test exige `/api/health` com o SHA novo. Para conferir:
  `curl -s https://quarau.zewithane.vps.brz.dev.br/api/health` e `gh run list -L 3`.
- **5ª execução (08/11, tarde):** mapa "Onde atuamos" (bloco novo; malhas do IBGE; pontos pelos campos
  latitude/longitude do projeto), índice compacto de projetos na home (foto segue o ponteiro), `/llms.txt`,
  schema `Service`/`knowsAbout`/`areaServed`/`GeoCoordinates`, painel com "Editados por último". Redes: o
  Instagram tem 1 post; o LinkedIn, 27 (repostagens já usadas). **No ar em `897f7f8`** (CI/CD verde); banco da
  VPS atualizado com `scripts/seed/territories-2026-11.ts` (backup antes em
  `/srv/backups/manual/quarau-pre-territories-20261108-1901.dump`), site reiniciado. Registro em
  [DESIGN.md](DESIGN.md) §5ª execução. **Próximo passo:** aprovação do Zé; dados do dono em
  [CONTENT-TODO.md](CONTENT-TODO.md) (equipe, fundação, CNPJ, vídeos do Ecoe e do Quipá).
- **4ª execução do visual (08/11):** Newsreader leve nos títulos (Barlow no texto), papel frio `#f4f6f3`, home
  abrindo com a foto de campo em tela cheia e a apresentação como declaração grande; projetos em cartões
  sobre a foto; ciclo no papel; áreas em três colunas. Registro em [DESIGN.md](DESIGN.md) §4ª execução e
  resumo em [HANDOFF.md](../HANDOFF.md). `f910e53` reprovou no Lighthouse mobile (home 0,92–0,94, projeto 0,92);
  corrigido em `9939704`: recorte quadrado de 800 px no hero do celular, foto da galeria só carrega ao abrir (o
  lightbox fechado pré-carregava 1600 px em toda página de projeto) e Newsreader 400 fora do preload. **No ar em
  `9939704`** (CI/CD completo verde: E2E, axe, Lighthouse ≥ 95, Trivy, deploy; `/api/health` ok). LCP mobile
  ainda 2,8–3,1 s (aviso, não erro). Na primeira visita o título pode sair no fallback Times (`display:
optional`, escolha a favor do LCP); da segunda página em diante aparece a Newsreader.
  **Próximo passo:** aprovação visual do Zé.
- **Redesenho (07/11):** o visual "Lente" foi reprovado pelo Zé ("um dos sites mais feios"). Nova execução
  editorial na família da marca: Barlow Condensed nos títulos e territórios, hero dividido com foto de campo
  até a borda, superfícies em petróleo `#062C44`, cantos retos, ponto verde do logo fechando títulos.
  Registro em [DESIGN.md](DESIGN.md) §Revisão 07/11. **No ar em `d1e58c9`** (CI completo verde, Lighthouse
  mobile ≥ 95 nas 5 rotas). Home, projeto, Sobre e Contato conferidos em 1440/390. Próximo passo: aprovação
  visual do Zé; depois, página de notícia e busca no mesmo padrão.
- **Revisão de conteúdo (07/11, noite):** o Zé: "tá faltando conteúdo, revisão total". Projetos ampliados com
  fontes oficiais (ficha do Ecomuseu na Fundação Banco do Brasil, IPHAN, Prefeitura de SJC, ANPPOM): método,
  território, agrofloresta do Alambari e números do Ecomuseu; Congado (87 grupos), processo do Samba de Bumbo e o
  dossiê do Cortejo no projeto de patrimônio; mapas do acervo (área do Ecomuseu, redes do Samba, horta e parceiros do
  Ecoe). Sobre com trajetória e territórios. Notícias: Samba e Cortejo ampliados, mutirão e jornada contextualizados,
  2 novas (10 anos do Ecomuseu; livro do Congado), total 9. Banco da VPS atualizado em 07/11 com
  `scripts/seed/revise-2026-11.ts` (só documentos intocados, backup antes) + seed; 28 arquivos de mídia novos.
  Commits `344cb4b`, `cdc8179`. Pendências do dono em [CONTENT-TODO.md](CONTENT-TODO.md) (equipe, fundação, Quipá).
- **3ª execução do visual (07/11, noite):** o Zé reprovou de novo ("continua muito feio e incompleto"). Papel
  branco, foto de campo na largura inteira, projetos como histórias (foto grande, resumo, quem e quando), áreas
  com foto, ciclo e chamada no azul da marca, placas tipográficas para notícias sem foto, aberturas em tinta.
  Datas das notícias: data do fato quando verificada (aves 24/11/2024, mutirão 21/09/2024, Samba 09/05/2024,
  Cortejo 22/09/2026), aplicada também no banco da VPS em 07/11. Registro em [DESIGN.md](DESIGN.md) §3ª execução.
  **No ar em `cb9bab3`** (CI/CD completo verde: E2E, axe com /noticias incluída, Lighthouse, Trivy e deploy;
  home e notícias conferidas no site publicado em 1440 e 390). **Próximo passo:** aprovação visual do Zé.
- **Notícias (07/11, tarde):** 7 publicadas. Mutirão e jornada do Ecomuseu publicadas após o "tá tudo
  autorizado" do Zé; nova matéria do Cortejo da Cavalaria (IPHAN, 22/09/2026). Capa passou a ser opcional:
  Samba de Bumbo (tinha foto de Congo) e as três do Ecomuseu (foto de feira) saem sem capa (Q-028).
  **No ar em `bcb363d`** (CI/CD completo verde; seed rodado na VPS em 07/11, segundo seed sem nada a criar; site
  reiniciado; Cortejo e Samba conferidos em 390, imagem de compartilhamento gerada para as matérias sem capa).
  **Próximo passo:** aprovação visual e de conteúdo do Zé na homologação; depois, go-live
  ([go-live.md](go-live.md)). Ideia para o dono: citar o dossiê do Cortejo no projeto "Inventário Cultural e
  Dossiê de Registro" (hoje ele fala só de Congado e Samba de Bumbo).
- **Achados:** [audit/ACHADOS.md](audit/ACHADOS.md) (rodadas 1–3). Bloqueios do dono: senha SMTP da caixa
  `contato@` (Q-019, adiado pelo Zé), direitos de imagem (Q-005), exportações das redes (Q-008).
- **Go-live:** não tocar DNS/WordPress até o "aprovado" do dono; roteiro em [MIGRACAO-VPS.md](MIGRACAO-VPS.md)
  e [go-live.md](go-live.md).

## Fases da missão

> As marcações históricas abaixo se referem aos testes de outubro, **não** à versão modificada
> em novembro. Os gates do commit atual permanecem em auditoria.

- [x] **0 — Autocrítica** ([AUTOCRITICA.md](AUTOCRITICA.md), medidas em `qa/antes/`)
- [x] **1 — Entender a Quarau** ([QUARAU.md](QUARAU.md), [CONTENT-TODO.md](CONTENT-TODO.md), ADR 0017)
- [x] **2 — Direção de design** ([DESIGN.md](DESIGN.md), 3 protótipos em `design/`, ADR 0016, design system em `packages/ui`)
- [x] **3 — Arquitetura** ([ARCHITECTURE.md](ARCHITECTURE.md), ADRs 0018–0021)
- [x] **4 — Implementação**
  - [x] Site reconstruído na direção "Lente" (todas as páginas e blocos)
  - [x] CMS: modelo novo, blocos com nome, "Textos do site", painel com pendências e ajuda
  - [x] Zero texto fixo no código (`react/jsx-no-literals` + `tools/qa/hardcoded.mjs` no CI)
  - [x] TDD: contato, redirects, sitemap/robots (unitários); papéis, rascunho/publicação, agendamento, seed (integração)
  - [x] Segurança: papéis, senha ≥ 12, bloqueio de login, CSP/headers (ADR 0021), upload sem SVG, auditoria no CI
  - [x] SEO e LGPD: metadados, JSON-LD, sitemap, 301 do WordPress, consentimento granular, `SITE_NOINDEX`
  - [x] Conteúdo real da raspagem, seed idempotente que não sobrescreve edições
- [x] **5 — Pronto para migrar**: Dockerfile testado no CI com Postgres de serviço, `/api/health`, GHCR,
      [MIGRACAO-VPS.md](MIGRACAO-VPS.md)
- [x] **6 — QA final** (evidências em `qa/depois/`)
  - [x] e2e contra a URL publicada: 88/88 (site, painel, axe; desktop e celular)
  - [~] Lighthouse mobile ≥ 95: home 98, Projetos 99, projeto 96, Contato 98, Sobre 94; a11y e boas práticas 100;
    SEO 69 só pelo `noindex` proposital do domínio temporário
  - [x] axe sem violações AA (e2e); navegação por teclado coberta pelos e2e de menu/foco
  - [x] Cabeçalhos de segurança (`qa/depois/lighthouse-publico/headers.txt`); Observatory exige domínio público próprio
  - [x] Zero hardcoded
  - [x] Teste "leigo" no painel com capturas (achou e corrigiu o bug de bloco vazio em produção)
  - [x] Imagem Docker com Postgres de serviço passando nos e2e (job do CI)
  - [x] Segunda rodada da autocrítica (notas ≥ 8; ver AUTOCRITICA §6)
  - [ ] Gate do Lighthouse no job do contêiner do CI ainda vermelho por TBT em máquina lenta

## Decisões e problemas

- 2026-10-26 · todas as fases · Ignorados handoffs e publicações antigas a pedido do dono; base = `main` (igual ao zip).
- 2026-10-26 · F0 · O Lighthouse do estado anterior não completou localmente; vale o último medido (83–94).
- 2026-10-26 · F4 · Home e listagens servidas pela rota `[slug]` (renderizadas na 1ª visita e cacheadas):
  o build do Docker não precisa de banco.
- 2026-10-26 · F4 · CSP sem nonce nas páginas estáticas (ADR 0021): nonce exige renderização dinâmica no Next 16.
- 2026-10-26 · F4 · Next 16.4.3 / zod 4.6.7 e overrides de transitivas: nenhuma vulnerabilidade alta ou crítica.
- 2026-10-27 · F6 · Deploy anônimo da Vercel construído em Linux pelo GitHub Actions (Windows não gera o pacote);
  link de reclamar fica criptografado no artefato, nunca no log público.
- 2026-10-27 · F6 · Salvamento automático desligado: em produção ele corria junto com a montagem do formulário e
  deixava blocos novos vazios (achado no teste leigo).
- 2026-10-27 · F6 · Branch padrão do GitHub trocado para `main`.

## 7 — Auditoria e arquivo editorial (04/11/2026)

- [x] Inspecionados repositório, ambiente Vercel e erro de banco em build real.
- [x] Criado Neon de homologação e configurada variável `DATABASE_URL` sensível.
- [x] Adicionadas seis matérias de fontes públicas com vínculos aos projetos, criação idempotente e testes.
- [x] Implementada descoberta de notícias na home, na navegação e no rodapé quando publicadas.
- [ ] Prettier, tipos, testes de integração, E2E e Lighthouse verdes **no SHA final**.
- [ ] Configuração persistente de mídia, SMTP/Resend, carga editorial e revisão de direitos concluídas.
- [ ] Backup/restore e smoke da release candidata executados, sem P0/P1.
