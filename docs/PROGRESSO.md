# Progresso

> Qualquer agente retoma só lendo este arquivo. Atualize "Retomar em" antes de parar e faça commit.
> A missão atual (2026-10-26) substitui o plano em sessões S00–S14: as fases estão abaixo. O plano antigo
> ([PLANO.md](PLANO.md), [plano/](plano/)) fica como histórico.

## Retomar em

- **Fase:** 6 — QA final + publicação temporária (2026-10-27).
- **Plano em curso:** (1) estabilizar ✔ `129a7b2` → (2) performance ≥ 95 local → (3) banco temporário Neon
  reclamável ✔ (São Paulo, expira 30/10 se não reclamado) → (4) `bash tools/deploy/vercel-temporary.sh` (deploy
  reclamável, sem login) → (5) QA na URL pública (Playwright, axe, Lighthouse, cabeçalhos, formulário, painel)
  → (6) autocrítica 2ª rodada, docs, commit.
- **Credenciais do deploy temporário:** só em `.cache/neon/` (fora do git): `neon.env` (banco) e `app.env` (segredos).
- **Limitação do deploy temporário:** sem armazenamento de objetos (o do Neon só existe após reclamar; R2 exige conta):
  fotos servidas como estáticos (`MEDIA_STATIC=true`), vídeos ocultos, envio de arquivo bloqueado com aviso.
- **Comando para conferir o estado:** `git log --oneline -5 && gh run list -L 3`
- **Rodar localmente (Windows, sem Docker):** `pnpm db:local` → `pnpm --filter @quarau/web migrate` → `pnpm seed` → `pnpm dev`.
- **Esperando o dono:** reclamar o banco Neon e o deploy Vercel (links no relatório), depois contas R2/Resend/Turnstile
  ([MIGRACAO-VPS.md](MIGRACAO-VPS.md) §Contas); fatos `[CONFIRMAR]` em [CONTENT-TODO.md](CONTENT-TODO.md).

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
