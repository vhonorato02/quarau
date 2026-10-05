# 0012 — Mídia: MinIO + otimização, vídeos reencodados

- **Status:** aceita · **Data:** 2026-10-05

## Decisão

- Uploads no MinIO via `@payloadcms/storage-s3`, servidos por `/api/media/file/...` (respeita controle de acesso).
- Payload gera WebP + tamanhos (`thumbnail`, `card`, `wide`, `og`) com Sharp, ponto focal e blur placeholder;
  o `next/image` entrega AVIF/WebP no tamanho exato.
- Vídeos do site antigo (1,2 GB) foram reencodados em H.264 720p (~1,8 Mbps, `faststart`): 232 MB no total,
  com carregamento só no clique (sem autoplay de terceiros).
- As fotos originais disponíveis no WordPress têm no máximo 1600 px (o plugin Smush reduziu os originais).
  Para telas 4K, substituir pelas fotos em resolução original quando disponíveis `[CONFIRMAR]`.
