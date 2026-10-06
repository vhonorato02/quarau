# Handoff — estado do trabalho

> Atualizado continuamente. Se uma sessão for interrompida, comece por aqui.

## Missão atual (2026-10-06) — leia antes de tudo

O dono decidiu: **primeiro a VPS, depois o site.** A próxima sessão roda **dentro da VPS** (Claude Code + Remote
Control) e faz tudo por lá.

**Propósito da VPS:** laboratório/host do dono para vários produtos ("SaaS"): este site com CMS é o primeiro; virão
outros (ex.: um SaaS de mecânica). É também **portfólio padrão ouro** de VPS + site com CMS: a stack precisa ser
exemplar.

**Fase 1 — VPS pronta para N sites** (sem Coolify, se a auditoria confirmar que ele não compensa):

- Estrutura **mais enxuta possível**, com qualidade, performance e segurança extremas.
- Deploy fácil e repetível para cada novo site; **sem briga de domínio** (um proxy único com TLS automático e roteamento
  por domínio; cada site isolado no seu diretório/compose, rede e banco).
- **Autorização do dono (2026-10-06): pode limpar TUDO da VPS, como uma formatação completa** (Coolify, os 11
  containers, o menu `vps`, o painel atual). Ele não é técnico e quer que firewall, proxy, DNS, SSH e o resto sejam
  resolvidos por nós. Objetivo dele, nas palavras dele: ser a sua própria "Hostinger/GitHub/Vercel", funcional de
  verdade, para hospedar serviços dos clientes dele.
- Mesmo autorizado: antes de apagar, listar o que existe e guardar um `pg_dump`/tar só do que tiver dados (barato e
  reversível). **Nunca perder o acesso SSH:** mudanças de SSH/firewall testadas numa segunda sessão aberta antes de
  fechar a primeira; a porta 22322 continua sendo a oficial.
- Documentar a arquitetura escolhida em um ADR e um guia simples para o dono ("como pôr um site novo no ar").

**DNS curinga já funciona:** `*.zewithane.vps.brz.dev.br` aponta para 177.107.94.31 (testado). Cada site ganha
`<site>.zewithane.vps.brz.dev.br` com HTTPS automático, sem tocar em DNS; o Quarau temporário pode ser
`quarau.zewithane.vps.brz.dev.br` (melhor que sslip.io). Domínio de cliente: registro A → 177.107.94.31.

**Direção sugerida para a arquitetura (confirmar na auditoria):** com 2 GB, nada de painel pesado. Um proxy de borda
único com TLS automático e HTTP/3 (ex.: Caddy), roteando por domínio; cada site em `/srv/sites/<site>` com seu compose,
rede e limites de memória; um Postgres compartilhado com banco e usuário por site (economiza RAM); imagens construídas no
GitHub Actions e publicadas no GHCR (o servidor só faz pull, nunca build pesado); um comando de deploy por site (pull +
troca sem downtime + rollback), disparável pelo CI a cada push; backups restic de todos os sites; monitor leve com
alerta. Avaliar Dokku/Kamal contra essa opção e registrar a escolha no ADR.

**Fase 2 — concluir o site Quarau:** não é "subir como está": é rodar uma versão plenamente estável, sem bugs, testada
ao extremo (visualmente, interagindo, no navegador, desktop e celular), CMS incluso.

**Fatos da VPS (confirmados em 2026-10-06):**

- IP real **177.107.94.31** (o `177.107.94.44` do documento antigo está errado; corrigir no repositório, inclusive o
  domínio temporário `quarau.177-107-94-31.sslip.io`). Hostname `zewithane.vps.brz.dev.br`.
- **2 GB de RAM** (885 MB em uso), disco 28 GB (12 GB usados), 11 containers. Não dá para buildar Next.js lá sem
  arriscar os outros serviços: imagens vêm prontas do CI (GHCR) ou o build é feito com limite e swap.
- SSH ok nas portas 22 e 22322 (usuário `zewithane`, senha; sudo pode pedir senha). O dono alterou a porta do servidor
  "localhost" no banco do Coolify para 22322.
- Com 2 GB, a stack do Quarau precisa da versão enxuta: web + Postgres; mídias em volume local (sem MinIO); busca no
  banco (sem Meilisearch, já suportado); rate limit em memória (sem Valkey).
- Regras do dono continuam valendo (porta 22322, `sshd_config`, firewall, disco). Ver "Trabalho direto na VPS".

**Pendências conhecidas:** o dono colou um token do GitHub na conversa: ele deve ser revogado. O PR #1 (`main` →
`claude/compassionate-cori-qu1ioj`) foi aberto pelo dono; a branch antiga pode ser apagada quando ele quiser.

## Onde estamos (2026-10-06)

- Branch única: `main` (pedido do cliente: sem branches, tudo direto na main, deploy automático).
- Produto completo no repositório: site + CMS + migração + testes + CI/CD + infra + documentação.
  Ver [relatorio-final.md](relatorio-final.md).
- **Para estar no ar:** abrir uma sessão do Claude Code na própria VPS (ver "Trabalho direto na VPS"); o cliente
  preferiu não operar o servidor pelo GitHub Actions.

## Últimos passos concluídos

- CI no GitHub: qualidade, integração, E2E na imagem real, links, Lighthouse CI e k6 passando; Trivy corrigido
  (imagem endurecida, 0 altas/críticas corrigíveis).
- Infra validada numa VPS simulada (Traefik 3.6 + rede `coolify`): deploy sem downtime (drain), versão quebrada
  rejeitada, rollback, backup + off-site, restore-test, restore real, healthwatch. Ver `docs/runbook.md`.
- Local: 30 unit, 9 integração, 90 E2E (desktop + mobile, axe WCAG 2.2 AA) passando.

Para repetir a simulação: crie a rede `coolify`, rode um `traefik:v3.6` nela (provider docker, entrypoints
`http`/`https`), copie `infra/compose` + `infra/scripts` para um diretório e use `APP_DIR=<dir> SKIP_PULL=1
scripts/deploy.sh <tag>`. O Traefik 3.5 não fala com o Docker 29 (API mínima 1.40): use 3.6+.

## QA local com conteúdo real (2026-10-06)

- Site: todas as rotas principais em desktop e celular, 0 erros de console, 0 imagens quebradas. Corrigidos: grade
  de parceiros com células vazias e espaço duplo na página de projeto sem números.
- CMS (fluxo de editor real): login, criar projeto, capa da biblioteca, publicar, aparecer no site e no portfólio,
  versões, excluir. Corrigidos: painel meio em inglês (agora sempre pt-BR), avatar do Gravatar (bloqueado pela CSP e
  vazava hash de e-mail) e "Local: undefined" no painel inicial.
- Formulário: mensagem salva em _Contatos recebidos_, e-mail para a equipe e confirmação para o visitante
  (conferidos no Mailpit). O Turnstile só não carrega dentro do sandbox; no CI passa.
- E2E 90/90 (desktop + mobile, axe WCAG 2.2 AA) no build de produção.
- Pendente de decisão do cliente: o símbolo da marca no hero fica sobre a cabeça da pessoa da foto.
- Ponto de atenção: abrir "Criar novo" já grava um rascunho (salvamento automático do Payload).

## Trabalho direto na VPS (decisão do cliente em 2026-10-06: sem GitHub Actions para operar o servidor)

Sem SSH, use o console web do provedor: blocos prontos em [console.md](console.md) (diagnóstico/correção do SSH
e instalação completa com `infra/scripts/console-install.sh`). Com SSH funcionando, a alternativa é uma
sessão do Claude Code **rodando na própria VPS**. Para abrir essa sessão (o cliente faz uma vez):

```bash
ssh -p 22322 zewithane@177.107.94.44
tmux new -s quarau                                   # sobrevive a desconexões
curl -fsSL https://claude.ai/install.sh | bash        # instala o Claude Code
git clone https://github.com/vhonorato02/quarau.git ~/quarau   # pede login do GitHub (token)
cd ~/quarau && claude remote-control                  # aparece no app do Claude Code
```

Regras invioláveis (do documento de acesso do cliente), valem para tudo abaixo:

- Nunca editar `/etc/ssh/sshd_config` nem a porta **22322**. Firewall: só com 22322/tcp liberada antes.
- Disco de 30 GB: `df -h /` antes de build/pull; `docker system prune -f` se precisar; nunca chegar a 100%.
- Nunca parar `coolify`, `coolify-db`, `coolify-proxy`. **Outros sites dividem esta VPS.**
- Usar `zewithane`; `sudo` só quando necessário. Copiar `.bak-$(date +%Y%m%d)` antes de mudar configs no ar.

Roteiro no servidor (a partir de `~/quarau`):

1. **Auditoria (somente leitura):** `sudo bash infra/scripts/bootstrap.sh audit`. Conferir versão do Traefik do
   Coolify (3.5 não conversa com Docker 29), rede `coolify`, memória, disco e o que mais roda na máquina.
2. **Preparação:** `sudo APPLY=1 bash infra/scripts/bootstrap.sh apply` (usuário `deploy`, swap, fail2ban,
   atualizações, cron de backup/monitor). Não ativa nem muda o UFW sem `APPLY_UFW=1`.
3. **Stack:** `sudo install -d -o deploy -g deploy /srv/apps/quarau` e copiar `infra/compose/docker-compose.prod.yml`
   (como `docker-compose.yml`), `infra/compose/.env.production.example`, `infra/compose/postgres-init/` e
   `infra/scripts/` para lá (dono `deploy`). Depois
   `sudo -u deploy /srv/apps/quarau/scripts/provision-env.sh quarau.177-107-94-44.sslip.io`.
4. **Imagem:** a mais simples é construir na própria VPS (precisa de ~6 GB livres; 4 GB de RAM + swap bastam):
   `docker build --target runner -t ghcr.io/vhonorato02/quarau-web:$(git rev-parse --short HEAD) .` e
   `sudo -u deploy SKIP_PULL=1 /srv/apps/quarau/scripts/deploy.sh $(git rev-parse --short HEAD)`.
   (Alternativa: `docker login ghcr.io` com token `read:packages` e deploy da tag do GHCR.)
5. **Conteúdo:** `docker build --target tools -t quarau-tools .` e rodar `pnpm migrate:wp` nesse container na rede
   `quarau_internal`, com `DATABASE_URL=postgres://quarau:<senha>@postgres:5432/quarau`, `S3_ENDPOINT=http://minio:9000`,
   `MEILI_HOST=http://meilisearch:7700`, `PAYLOAD_JOBS_AUTORUN=false` e os segredos do `.env` (`--env-file`).
   No fim: `/next/revalidate` e `/next/reindex` (ver runbook).
6. **Admin:** mesmo container, `pnpm seed:admin` com `ADMIN_EMAIL`/`ADMIN_PASSWORD`; guardar a senha só em
   `/srv/apps/quarau/CREDENCIAIS.txt` (`chmod 600`).
7. **Backup e restore:** `sudo /srv/apps/quarau/scripts/backup.sh` e `sudo /srv/apps/quarau/scripts/restore-test.sh`.
8. **QA no ar** (domínio temporário com basic auth em `CREDENCIAIS.txt`): todas as rotas e redirecionamentos 301,
   cabeçalhos (HSTS, CSP, `X-Robots-Tag: noindex`), HTTPS/HTTP3, sitemap/robots, busca, formulário (SMTP e
   Turnstile reais), CMS completo (login, criar projeto com fotos, rascunho, live preview, publicar, agendar,
   versões, papéis), Lighthouse e axe no celular, e a suíte E2E apontando para a URL real.

## Próximos passos

1. CI no commit `66500e1` (run 37365106378): integração, imagem + E2E/axe, links, Lighthouse, k6 e Trivy **verdes** e
   imagem publicada no GHCR. O job _Lint, typecheck, unit, Storybook_ ficou 4 vezes na fila por 15 min e foi
   cancelado sem receber runner (problema do lado do GitHub; os mesmos passos passam localmente e passaram no run 10).
   Verificar limites/cobrança de Actions da conta e re-executar só esse job.
2. Com o secret `VPS_SSH_KEY`: Actions → _VPS operations_ `audit` → `bootstrap` → re-run do CI (deploy) →
   `migrate-content` → `create-admin <email>` → `backup` → `restore-test`. No `audit`, conferir a versão do Traefik
   do Coolify (3.5 não conversa com Docker 29; se for o caso, atualizar o proxy pelo painel do Coolify).
3. Medir performance em produção (meta ≥ 95; laboratório local hoje: 83–94).
4. Resolver `[CONFIRMAR]` com o cliente (relatório final, §4).

## Ambiente local (resumo)

```bash
docker compose -f infra/compose/docker-compose.dev.yml up -d
cp .env.example .env && (cd apps/web && ln -sf ../../.env .env)
pnpm install && pnpm dev            # site + /admin
pnpm migrate:wp                     # conteúdo real (ou MIGRATE_OFFLINE=1 para placeholders)
```

Armadilhas já resolvidas (não repetir):

- Payload **muta o objeto `context`** durante uploads: passe um objeto novo em cada chamada (`ctx()`).
- Imagens do Docker Hub: use `mirror.gcr.io/...`; MinIO: `cgr.dev/chainguard/minio` (não há mais `minio/minio`).
- `robots`, `sitemap` e `X-Robots-Tag` são runtime (não usar `headers()` do next.config para isso).
- Standalone precisa de `HOSTNAME=0.0.0.0` (já no Dockerfile).
- Não usar `pkill -f <padrão>` em comandos que contenham o próprio padrão (mata o shell).
- Valores com parênteses/crases no `.env` (ex.: `TRAEFIK_RULE`) precisam de aspas simples: os scripts fazem `source`.
- Requisições à API do Payload com cookie precisam do header `Origin` (proteção CSRF).
- O banco de dev `quarau` tem drift de schema; testes de integração usam `quarau_test` (CI usa banco novo).
