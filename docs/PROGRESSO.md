# Progresso

> Qualquer agente retoma só lendo este arquivo. Atualize "Retomar em" antes de parar e faça commit.
> A missão atual (2026-10-26) substitui o plano em sessões S00–S14: as fases estão abaixo. O plano antigo
> ([PLANO.md](PLANO.md), [plano/](plano/)) fica como histórico.

## Retomar em

- **Fase:** 6 — QA final (as fases 0–5 estão feitas; falta evidência e polimento).
- **Próximo passo exato:** CI verde no commit atual → QA local na imagem de produção (`docs/qa/depois/`):
  capturas 390/1440 de todas as páginas, Lighthouse mobile, axe, teclado, cabeçalhos; teste "leigo" no painel
  com capturas; crítica visual página a página; segunda rodada da autocrítica; code review final.
- **Comando para conferir o estado:** `git log --oneline -5 && gh run list -L 3`
- **Rodar localmente (Windows, sem Docker):** `pnpm db:local` (outro terminal) → `pnpm --filter @quarau/web migrate`
  → `pnpm seed` → `pnpm dev` (porta 3000; use `-p 3300` se ocupada).
- **Bloqueios / esperando o dono:** contas (Vercel, Neon, Cloudflare R2, Resend, Turnstile, Sentry) para publicar a
  homologação; ver [MIGRACAO-VPS.md](MIGRACAO-VPS.md) §Contas. Fatos `[CONFIRMAR]` em [CONTENT-TODO.md](CONTENT-TODO.md).

## Fases da missão

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
- [ ] **6 — QA final** (evidências em `qa/depois/`)
  - [ ] CI verde (todos os gates)
  - [ ] e2e contra a URL publicada (depende das contas; até lá, contra o contêiner de produção no CI)
  - [ ] Lighthouse mobile ≥ 95 nas 4 categorias
  - [ ] axe sem violações AA + teclado registrado
  - [ ] Cabeçalhos (Observatory)
  - [x] Zero hardcoded
  - [ ] Teste "leigo" no painel com capturas
  - [ ] Imagem Docker com Postgres local passando nos e2e
  - [ ] Segunda rodada da autocrítica (notas ≥ 8)
  - [ ] Code review final com achados corrigidos

## Decisões e problemas

- 2026-10-26 · todas as fases · Ignorados handoffs e publicações antigas a pedido do dono; base = `main` (igual ao zip).
- 2026-10-26 · F0 · O Lighthouse do estado anterior não completou localmente; vale o último medido (83–94).
- 2026-10-26 · F4 · Home e listagens servidas pela rota `[slug]` (renderizadas na 1ª visita e cacheadas):
  o build do Docker não precisa de banco.
- 2026-10-26 · F4 · CSP sem nonce nas páginas estáticas (ADR 0021): nonce exige renderização dinâmica no Next 16.
- 2026-10-26 · F4 · Next 16.4.3 / zod 4.6.7 e overrides de transitivas: nenhuma vulnerabilidade alta ou crítica.
