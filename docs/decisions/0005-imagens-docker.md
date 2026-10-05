# 0005 — Origem das imagens Docker (MinIO Chainguard, mirror.gcr.io)

- **Status:** aceita · **Data:** 2026-10-05

## Contexto
A MinIO Inc. deixou de publicar imagens oficiais da edição comunitária (`minio/minio` não está mais disponível
no Docker Hub/Quay). O Docker Hub também aplica limite de pulls anônimos.

## Decisão
- MinIO: `cgr.dev/chainguard/minio` (build mantido pela Chainguard, release de 2026-09). Continua sendo MinIO,
  S3-compatible e self-hosted, como pedido.
- Imagens do Docker Hub via `mirror.gcr.io/...` (mesmo conteúdo, sem limite de pulls).
- Renovate acompanha as versões; para fixar por digest, ver docs/infra.md.

## Consequências
Se a Chainguard deixar de oferecer a tag gratuita, alternativas S3 compatíveis testadas: SeaweedFS, Garage, RustFS.
