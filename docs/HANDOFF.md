# Handoff — estado do trabalho

> Atualizado continuamente. Se uma sessão for interrompida, comece por aqui.

## Estado atual (2026-10-07) — leia antes de tudo

**O site saiu da VPS e vai para a Vercel, só com planos gratuitos** ([ADR 0014](decisions/0014-vercel-free-tier.md)).

- Projeto Vercel `quarau` (time `jose-victors-projects-5cc9abbe`), raiz `apps/web`, região `gru1`, ligado ao
  repositório: cada push na `main` publica em produção. Proteção por login só nos previews.
- Já configurado: `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `REVALIDATE_SECRET`, `CRON_SECRET` (sensíveis),
  `PAYLOAD_DB_PUSH=false`, `SITE_NOINDEX=true`, `NEXT_PUBLIC_ENABLED_LOCALES=pt`, `CONTACT_RECIPIENT`, Blob
  `quarau-media` (`BLOB_READ_WRITE_TOKEN`).
- **Falta (dono, 1 minuto):** criar o banco Neon Free em Vercel → projeto quarau → Storage → Create Database →
  Neon → região São Paulo → conectar ao projeto. Sem ele o build para com a mensagem "no database".
- Depois: primeiro deploy (importa o conteúdo sozinho), criar o admin em `/admin`, QA no domínio `*.vercel.app`.
- VPS: abandonada. A limpeza dela fica com o dono ou com a sessão que roda lá dentro; nada do site depende dela.
- `infra/platform`, `docs/vps-guia.md` e a ADR 0013 ficam como referência caso um dia volte para servidor próprio.

**Pendências do dono:** revogar o token do GitHub colado numa conversa antiga; trocar a senha da VPS; verificar o
domínio quarau.com.br no Resend para os e-mails saírem do domínio.

## Onde estamos (2026-10-07)

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
2. Deploy: push na `main` publica na Vercel (build `pnpm build:vercel`); a VPS não é mais usada.
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
