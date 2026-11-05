# Progresso

> Qualquer agente retoma só lendo este arquivo. Atualize "Retomar em" antes de parar e faça commit.
> A missão atual (2026-10-26) substitui o plano em sessões S00–S14: as fases estão abaixo. O plano antigo
> ([PLANO.md](PLANO.md), [plano/](plano/)) fica como histórico.

## Retomar em

- **Sessão atual:** 04/11/2026, auditoria e curadoria pública de notícias (primeira etapa). O estado
  comprovado está em [audit/BASELINE.md](audit/BASELINE.md), [audit/ACHADOS.md](audit/ACHADOS.md),
  [audit/PLANO.md](audit/PLANO.md) e [content/social/EDITORIAL-SOURCES.md](../content/social/EDITORIAL-SOURCES.md).
- **Base inicial:** `main` em `aefaa1678187115b143df2b7efaaa1b6cf546ce6`. Para o **HEAD atual**, executar
  `git rev-parse HEAD`; cada edição subsequente tem commit próprio.
- **Blog:** seis matérias autorais e referenciadas em `apps/web/scripts/seed/news.ts`, criação idempotente no
  Payload, lista com ligação de projetos, página inicial e menus; teste unitário e Playwright acrescentados.
  **Ainda não afirmar publicadas:** os dados precisam passar por seed real em banco e storage persistente.
  Exportações integrais de Instagram/LinkedIn seguem pendentes e a curadoria pública é parcial.
- **Banco:** projeto Neon de homologação `quarau-staging` (`misty-fog-46195118`, sa-east-1, PG17)
  criado e `DATABASE_URL` adicionada à Vercel como variável `sensitive`. Nenhuma credencial exposta.
- **Vercel:** o deploy anterior `dpl_5nxH7qpEe1SLw4pE4jz8kdW31LN7` falhava por ausência de banco;
  após correção, `dpl_6RvT6jEkaoxCzhfz4Buq8pCd9edw` (commit `6c4239c`) atingiu `READY`.
  Builds de commits posteriores ainda exigem verificação. O ambiente está com `SITE_NOINDEX=true`.
  A produção `quarau.com.br` segue no WordPress original, sem troca de DNS.
- **Bloqueios principais:** mídia não tem adaptador de armazenamento persistente na Vercel;
  envio de e-mail sem adaptador; carga de dados/mídia não testada; direitos de fotografia;
  Lighthouse/TBT do CI; backup e restore; QA funcional final.
- **Próximos três passos:** 1) rodar `pnpm format:check && pnpm lint && pnpm typecheck && pnpm test`
  no SHA exato e acompanhar Actions; 2) habilitar armazenamento compatível com Payload e executar
  `pnpm --filter @quarau/web seed` em homologação, em ambiente com credenciais protegidas; 3) executar E2E, segurança, acessibilidade, mídia, contatos e restauração; corrigir até zero P0/P1.
- **Consulta de evidência:** `gh run list -L 10`, `git status`, dashboard Vercel do projeto Quarau.
  Nunca confiar em logs de SHA anterior para declarar estabilidade.

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
