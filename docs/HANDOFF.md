# Handoff — estado do trabalho

> Atualizado continuamente. Se uma sessão for interrompida, comece por aqui.

## Estado da VPS (2026-10-06) — leia antes de tudo

**Fase 1 concluída: a VPS virou a plataforma de hospedagem do dono** ([ADR 0013](decisions/0013-plataforma-vps-traefik-sem-painel.md),
[guia para o dono](vps-guia.md)).

- Coolify, os 11 containers, volumes, imagens, `/data` e o menu `vps` foram removidos (sem backup, por decisão do
  dono). O script do provedor `/usr/local/bin/autostart.sh` + `/etc/cron.d/autoboot` (registro de IP) **fica**.
- Plataforma em `/srv/platform` (instalada de `infra/platform/` com `sudo infra/platform/install.sh`):
  Traefik v3.6 com rotas em arquivo (sem acesso ao Docker), Postgres 17 compartilhado, comando `site`, timers
  systemd `platform-{autodeploy,health,backup,restore-test}`. Sites em `/srv/sites/<site>`.
- Host: UFW 22322/80/443tcp/443udp (regras 10.0.0.0/8 do Coolify removidas); SSH com root só por chave e
  `MaxAuthTries 5` (backup `00-vps.conf.bak-20261006`); Docker com `live-restore` e redes 172.20.0.0/14.
- Sites no ar: `teste` (estático, pode ser removido com `site remover teste`) e `quarau`
  (https://quarau.zewithane.vps.brz.dev.br).
- IP real: **177.107.94.31** (corrigido no repositório).

**Pendências do dono:** revogar o token do GitHub colado numa conversa antiga; dar a este servidor credencial de
push no GitHub (`gh auth login` ou chave de deploy com escrita) para os commits feitos aqui subirem; assinar o
tópico ntfy de `ALERT_URL`; guardar `RESTIC_PASSWORD` fora do servidor; configurar um destino off-site (B2);
corrigir a 1ª linha do `~/.bashrc` (uma aspa solta quebra o `PATH`).

**Fase 2 (site Quarau): em andamento.** Ver "Onde estamos".

## Onde estamos (2026-10-06)

- Branch única: `main` (pedido do cliente: sem branches, tudo direto na main, deploy automático).
- Produto completo no repositório: site + CMS + migração + testes + CI/CD + infra + documentação.
  Ver [relatorio-final.md](relatorio-final.md).

## Últimos passos concluídos

- CI no GitHub: qualidade, integração, E2E na imagem real, links, Lighthouse CI e k6 passando; Trivy corrigido
  (imagem endurecida, 0 altas/críticas corrigíveis).
- Infra validada numa VPS simulada (Traefik 3.6 + rede `coolify`): deploy sem downtime (drain), versão quebrada
  rejeitada, rollback, backup + off-site, restore-test, restore real, healthwatch. Ver `docs/runbook.md`.
- Local: 30 unit, 9 integração, 90 E2E (desktop + mobile, axe WCAG 2.2 AA) passando.

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

## Próximos passos

1. CI no commit `66500e1` (run 37365106378): integração, imagem + E2E/axe, links, Lighthouse, k6 e Trivy **verdes** e
   imagem publicada no GHCR. O job _Lint, typecheck, unit, Storybook_ ficou 4 vezes na fila por 15 min e foi
   cancelado sem receber runner (problema do lado do GitHub; os mesmos passos passam localmente e passaram no run 10).
   Verificar limites/cobrança de Actions da conta e re-executar só esse job.
2. Deploy: a VPS puxa o `:latest` do GHCR sozinha (`site autodeploy quarau on`); não há mais deploy por SSH.
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
