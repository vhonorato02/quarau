# 0013 — Plataforma própria na VPS: Traefik + Postgres compartilhado + comando `site`, sem painel

- **Status:** aceita (substitui a [0004](0004-hospedagem-coolify-traefik.md)) · **Data:** 2026-10-06

## Contexto

A VPS deixou de ser "um site num servidor com Coolify" e virou o host do dono para vários produtos de clientes
(o Quarau é o primeiro; depois vem um SaaS de mecânica, entre outros). Ela tem **2 GB de RAM e 28 GB de disco**.
O dono autorizou uma limpeza completa. A auditoria de 2026-10-06 encontrou o Coolify (6 containers, ~700 MB de RAM
só para o painel), três apps de teste, o menu `vps` e a porta 8000 do painel exposta para a internet (o Docker
publica portas por fora do UFW).

Requisitos: proxy único com HTTPS automático e roteamento por domínio, um site isolado por diretório, banco por
site, imagens vindas do CI (nada de build pesado no servidor), deploy de um comando sem downtime, rollback,
backups testados, monitor leve com alerta e operação simples para quem não é técnico.

## Opções avaliadas

| Opção | RAM fixa | Prós | Contras |
| --- | --- | --- | --- |
| Coolify (manter) | ~700 MB | painel visual | metade da RAM só para o painel; expõe a porta 8000; estado escondido num banco próprio |
| Dokku | ~100 MB | `git push` para publicar | builda no servidor (Next.js não cabe em 2 GB); o modelo de buildpack não combina com imagens do GHCR |
| Kamal 2 | ~30 MB (kamal-proxy) | zero downtime nativo, imagens prontas | opera a partir da máquina do desenvolvedor (Ruby + SSH); o dono não tem esse ambiente |
| Caddy + compose | ~30 MB | TLS automático simples | rotas num Caddyfile central; zero downtime exige reescrever upstreams do mesmo jeito |
| **Traefik (provedor de arquivos) + compose + `site`** | **~35 MB** | HTTP/3, ACME, health check por serviço, troca de rota atômica; nenhum acesso ao Docker | scripts próprios (bash, ~400 linhas, testados) |

## Decisão

- **Proxy:** um Traefik v3.6 (`/srv/platform`), portas 80/443 TCP e 443 UDP (HTTP/3), redirecionamento para HTTPS,
  certificados Let's Encrypt por TLS-ALPN, cabeçalhos de segurança, compressão (zstd/br/gzip) e TLS ≥ 1.2 para
  todos os sites.
- **Rotas em arquivo, não em rótulos do Docker.** Cada site tem `traefik/dynamic/site-<site>.yml`, escrito
  pelo comando `site`. O Traefik **não tem acesso ao `docker.sock`** (nem por socket-proxy). Motivo extra, medido:
  com rótulos, o Traefik leva ~2 s para esquecer um container parado e, nesse intervalo, as requisições ficam
  penduradas (8 de 452 falharam num teste de carga). Com a troca de rota em arquivo antes de parar a réplica
  antiga, foram **0 falhas em 569 requisições durante dois deploys seguidos**.
- **Sites:** `/srv/sites/<site>/` com `compose.yml`, `.env` (configuração da plataforma: imagem, versão,
  domínios, porta, health check), `app.env` (segredos do app, `chmod 600`), `data/` (arquivos persistentes) e
  `releases.log`. Cada site entra na rede `proxy` e, se usar banco, na rede `db` (interna, sem saída para a
  internet).
- **Banco:** um Postgres 17 compartilhado (economiza ~300 MB por site), com **um banco e um usuário por site**
  e `REVOKE ALL ... FROM PUBLIC`: um site não enxerga o banco do outro.
- **Deploy:** `site deploy <site> [versão]` sobe a réplica nova ao lado da atual, espera o healthcheck, troca a
  rota, drena e para a antiga. Se a nova falhar, a antiga segue no ar e chega um alerta.
  `site rollback <site>` volta para a versão anterior e pausa o auto-deploy.
- **Auto-deploy sem dar SSH ao GitHub:** um timer (2 min) confere se a imagem `:latest` do site mudou no GHCR e
  publica. O GitHub só publica a imagem; o servidor puxa. Não existe chave de acesso ao servidor guardada no
  GitHub.
- **Backups:** restic diário às 03:17 (dumps de cada banco, `/srv/sites`, `/srv/platform`), retenção 7/4/6,
  verificação parcial dos dados a cada execução e **teste de restore semanal** (restaura em bancos temporários e
  compara as tabelas). Cópia fora do servidor com `RESTIC_REPOSITORY_OFFSITE`.
- **Monitor:** timer de 5 min que checa cada site por HTTPS, containers, Postgres, disco, memória e a idade do
  último backup. Alerta via ntfy (app no celular), uma vez quando quebra e outra quando normaliza.
- **Host:** UFW com 22322/tcp, 80/tcp, 443/tcp e 443/udp; regras antigas do Coolify removidas. SSH: root só por
  chave e `MaxAuthTries 5` (drop-in do provedor, com backup `.bak-20261006`); o usuário `zewithane` mantém
  senha e chave; fail2ban na 22322. Docker com `live-restore`, rotação de logs e redes em 172.20.0.0/14.

## Consequências

- RAM fixa da plataforma: ~130 MB (Traefik 32 MB + Postgres ~95 MB), contra ~700 MB do Coolify.
- Não há painel web. Toda a operação passa pelo comando `site` (em português, com ajuda embutida) e pelo
  guia [docs/vps-guia.md](../vps-guia.md). Para a VPS é uma vantagem: menos superfície de ataque e nenhum estado
  escondido, porque tudo está em arquivos legíveis em `/srv`.
- O código da plataforma vive em `infra/platform/` (deste repositório) e se reinstala com
  `sudo infra/platform/install.sh`, de forma idempotente. Se outros projetos crescerem, ele pode virar um
  repositório próprio sem mudanças.
- Limite conhecido: o Let's Encrypt permite 50 certificados novos por semana por domínio registrado, e
  `brz.dev.br` é compartilhado com outros clientes do provedor. Para domínios de clientes isso não vale (cada um
  tem a própria cota).
