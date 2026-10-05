# 0004 — Hospedagem na VPS com o Traefik do Coolify + deploy via SSH

- **Status:** aceita · **Data:** 2026-10-05

## Contexto

A VPS (2 vCPU, 4 GB, 30 GB) já roda **Coolify** (proxy Traefik `coolify-proxy`, rede `coolify`, Let's Encrypt).
O pedido exige build no GitHub Actions, imagens no GHCR, deploy por SSH com zero downtime e rollback em um comando,
e a VPS deve continuar apta a hospedar outros projetos.

## Decisão

- Reaproveitar o **Traefik do Coolify** como proxy compartilhado (HTTPS automático, HTTP/3 quando habilitado no
  entrypoint do Coolify). Não subimos um segundo proxy para não disputar as portas 80/443.
- O stack da Quarau é um **docker compose próprio** em `/srv/apps/quarau` (rótulos Traefik nos containers),
  e não um recurso criado pela UI do Coolify: assim o deploy é versionado no Git, reproduzível e testável no CI.
- **Zero downtime**: `deploy.sh` sobe uma segunda réplica com a imagem nova, espera o healthcheck
  (que inclui as migrações), deixa o Traefik balancear e então remove a antiga. Falhou? A antiga segue no ar.
- **Rollback**: `rollback.sh` (ou workflow _VPS operations → rollback_) redeploya a tag anterior de `releases.log`.
- Novos projetos: cada um em `/srv/apps/<projeto>` com seu compose, rede interna própria e rótulos Traefik
  com nomes prefixados — sem conflito de portas, volumes ou routers.

## Consequências

Dependemos da saúde do Coolify para o proxy. Se o Coolify for removido, basta subir um Traefik com a mesma
rede `coolify` e entrypoints `http`/`https` (documentado em docs/infra.md).
