# Progresso

> Qualquer agente retoma só lendo este arquivo. Atualize "Retomar em" antes de parar e faça commit.
> A missão atual (2026-10-26) substitui o plano em sessões S00–S14: as fases estão abaixo. O plano antigo
> ([PLANO.md](PLANO.md), [plano/](plano/)) fica como histórico.

## Retomar em

- **Fase:** 6 concluída em 2026-10-27, exceto o que depende do dono.
- **Publicação:** demonstração temporária reclamável na Vercel, republicável a qualquer momento por
  GitHub → Actions → _Temporary deployment (claimable)_ (publica + e2e + Lighthouse na URL nova). Cada execução
  gera URL nova e vale 59 min se não for reclamada; o banco Neon reclamável vale até 2026-10-30.
- **Próximo passo:** o dono reclama o deploy da Vercel e o banco Neon (links entregues no chat, nunca no git);
  depois cria R2/Resend/Turnstile e segue [MIGRACAO-VPS.md](MIGRACAO-VPS.md).
- **Credenciais locais (fora do git):** `.cache/neon/` (banco e segredos do deploy), `ACESSO-ADMIN.txt`
  (admin), `.cache/leigo.pw` (editora de teste). Segredos no GitHub: `TEMP_DEPLOY_ENV`, `TEMP_DEPLOY_OUTPUT_KEY`,
  `E2E_ADMIN_EMAIL`, `E2E_ADMIN_PASSWORD`.
- **Comando para conferir o estado:** `git log --oneline -5 && gh run list -L 3`

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
