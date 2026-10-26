# Quarau — instruções para o agente

Site institucional da **Quarau** (consultoria em projetos socioambientais, educativos e culturais): Next.js 16 + Payload CMS 3 no mesmo app.

- **Homologação:** Vercel (`https://quarau.vercel.app`).
- **Produção:** depois do aceite, na VPS do dono, com o domínio `quarau.com.br` ([ADR 0015](docs/decisions/0015-homologacao-vercel-producao-vps.md)).

O dono não é técnico. Ele quer o site **no ar, testado como usuário de verdade, com cada texto impecável e editável**, sem semanas de depuração.

## Como trabalhar (sempre)

1. **No começo de cada sessão:**
   - leia [docs/PROGRESSO.md](docs/PROGRESSO.md) ("Retomar em");
   - leia **só** o arquivo da sessão em [docs/plano/](docs/plano/);
   - o mapa geral está em [docs/PLANO.md](docs/PLANO.md). Não releia documentos inteiros sem necessidade.
2. **Execute a sessão até o "Pronto quando".** Commits pequenos a cada item verde.
3. **Antes de parar** (fim da sessão, cota acabando — confira com `/usage` — ou esperando o dono):
   - marque o PROGRESSO;
   - preencha "Retomar em" (sessão, próximo passo exato, comando);
   - commit + push.
   - O hook `handoff-guard` bloqueia a parada se isso não for feito.
4. **Modelo:** use o indicado no arquivo da sessão (`/model opus`, `sonnet` ou `opusplan`). `/compact` quando o contexto passar de ~60%.
5. **Subagentes** (`.claude/agents/`), só para verificação, um de cada vez:
   - `qa-visual`;
   - `testador-persona`;
   - `revisor-copy`;
   - `auditor-seo`.
   - Eles devolvem listas curtas; quem corrige é você.

## Regras inegociáveis

- **Só a branch `main`.** Sem branches, PRs ou worktrees. Conventional Commits. Push na `main` = homologação atualizada. CI verde antes de seguir.
- **Fatos só das fontes:**
  - `content/legacy/scrape/` (site antigo);
  - `content/social/` (redes);
  - `apps/web/scripts/content/` (seed revisado);
  - respostas do dono.
  - Faltou? `[CONFIRMAR]` em PROGRESSO e o campo **fica oculto** no site. Nunca inventar número, cliente, ano, cargo, endereço ou depoimento.
- **Todo texto visível vem do CMS** (S03). `react/jsx-no-literals` no lint garante.
- **Domínio `quarau.com.br`, DNS e WordPress antigo: não tocar até a S13** (e só depois do "aprovado"). `SITE_NOINDEX=true` fora da produção.
- **Segredos nunca no git, na conversa ou impressos no terminal:**
  - variáveis ficam na Vercel, em `apps/web/.env.local` (dev) e no `site config` da VPS;
  - use pipes e `--env-file`;
  - para conferir, só os nomes (`cut -d= -f1`);
  - credenciais do admin vão para `ACESSO-ADMIN.txt` (no `.gitignore`).
  - Nunca usar o token do GitHub nem a chave SSH que foram colados numa conversa antiga.
- **Regras invioláveis da VPS** (S12/S13): não mexer em `sshd_config` nem na porta 22322; nada de `ufw`/`iptables` sem confirmar 22322 liberada; `df -h` antes de baixar imagem; nunca parar nem limpar contêineres de outros sites (nada de `docker system prune -a`); `sudo` só onde precisa; backup de config antes de mudar.
- **Não perguntar ao dono** o que o plano já decide. Pare só nos 🔑 **momentos do dono** listados em [docs/PLANO.md](docs/PLANO.md), dizendo exatamente o que ele deve clicar ou digitar.
- **Computador do dono:** Windows (Git Bash). Sem Docker. Banco de dev = Neon na nuvem.

## Higiene de tokens

- **Nunca abrir:** `pnpm-lock.yaml`, `apps/web/src/payload-types.ts`, `apps/web/src/migrations/*.json`, `content/legacy/**/wp-json/*.json`. Use `grep -n` e `sed -n 'a,bp'`.
- **Para entender o conteúdo antigo:** `content/legacy/scrape/RELATORIO.md`, `COBERTURA.md` e `paginas/*.md`.
- **Saídas longas:** `--reporter=line` e `| tail -40`. Build e servidor em segundo plano; leia só o fim do log.
- **Capturas:** olhe as folhas-resumo (`folha-*.jpg` do `tests/qa/screens.mjs`). A captura cheia só onde houver suspeita.

## Ferramentas

- **MCP** (`.mcp.json`):
  - `playwright`: navegar como gente; QA camadas 4/13;
  - `vercel`: deploys, logs, variáveis; a CLI `vercel` é o plano B;
  - `context7`: documentação atual de Next.js 16, Payload 3 e Tailwind 4. **Consulte antes de usar uma API dessas bibliotecas**: são mais novas que o seu treinamento.
- **CLIs:** `gh` (CI, PR), `vercel`, `ffmpeg`, `ssh quarau-vps` (S12+).
- **Scripts do projeto:**

  | Comando                                                               | Para quê                                        |
  | --------------------------------------------------------------------- | ----------------------------------------------- |
  | `pnpm dev` · `pnpm lint` · `pnpm typecheck` · `pnpm test`             | dia a dia                                       |
  | `pnpm --filter @quarau/web test:int` / `test:e2e`                     | integração / E2E                                |
  | `pnpm --filter @quarau/web payload migrate` / `migrate:create <nome>` | migrações (nunca `push` em banco com migrações) |
  | `pnpm --filter @quarau/web scrape:wp`                                 | raspagem do site antigo                         |
  | `pnpm --filter @quarau/web social:parse`                              | exportações das redes → `content/social/`       |
  | `pnpm --filter @quarau/web migrate:wp`                                | importar conteúdo e mídias (idempotente)        |
  | `pnpm --filter @quarau/web exec node tests/qa/screens.mjs <url>`      | QA visual (capturas + folhas + relatório)       |

## Mapa do código

```
apps/web/
  src/payload.config.ts            banco, storage (Vercel Blob), e-mail, jobs, plugins
  src/collections|globals|blocks   modelo de conteúdo do CMS
  src/app/(frontend)/[locale]      páginas do site (o [locale] sai na S02)
  src/app/(payload)                admin (custom.scss = estilo do admin)
  src/components                   blocos, site (header/footer), privacy (cookies), admin
  src/lib/                         platform-env, queries, cache-tags, seo, social-export, urls…
  scripts/migrate-wp.ts            importação idempotente (usa .migrate-cache/)
  scripts/scrape/scrape-wp.ts      raspagem completa do site antigo
  scripts/social/parse-exports.ts  leitor das exportações do Instagram/LinkedIn
  scripts/content/*.ts             conteúdo-semente revisado
  tests/{unit,int,e2e,qa}          Vitest, integração, Playwright, QA visual
packages/ui/                       design system   ·   packages/emails/  e-mails (React Email)
content/legacy/scrape/             site antigo raspado (textos, mídias, SEO, capturas)
content/social/                    posts das redes (exportações oficiais)
infra/platform/                    plataforma da VPS (Traefik + comando `site`) · infra/vps/preflight.sh
docs/                              PLANO, plano/, PROGRESSO, QA, RELATORIO-COMPLETO, decisions/, brand.md, vps-guia.md
.claude/                           settings (permissões, hooks), agents/ (subagentes), hooks/
```

## Armadilhas conhecidas

- **Payload muta o objeto `context`** em uploads: um objeto novo por chamada (`ctx()`).
- **Banco com migrações + `push`** = prompt interativo que trava o servidor. Sempre `PAYLOAD_DB_PUSH=false`.
- **API do Payload com cookie** precisa do header `Origin` (CSRF).
- **`robots`, `sitemap` e `X-Robots-Tag`** são resolvidos em runtime, não em `next.config`.
- **Variáveis sensíveis da Vercel** vêm vazias no `vercel env pull`. Para scripts contra produção, só `DATABASE_URL` e `BLOB_READ_WRITE_TOKEN` importam; o resto se gera.
- **Um processo só roda a fila de tarefas por banco:** Vercel até o corte, VPS depois (S13).
- **`pkill -f <padrão>`** mata o próprio shell se o comando contém o padrão: mate pelo PID.
- **Turbo:** veja @AGENTS.md (docs da versão instalada em `node_modules/turbo/docs`).
