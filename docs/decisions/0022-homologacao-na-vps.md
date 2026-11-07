# 0022 — Homologação e produção na VPS, mídia no disco da plataforma

- **Status:** aceita (substitui a parte "Agora (grátis)" da 0019 para app, banco e mídia; mantém os adaptadores)
- **Data:** 2026-11-06

## Contexto

Estado conferido em 06/11/2026:

- `quarau.vercel.app` (Vercel Hobby + Neon `quarau-staging`) respondia `/api/health` = 503 (`storage: error`):
  sem `S3_*`, o app tentava gravar fotos no disco efêmero da função. Banco vazio, home 404 e a tela pública de
  "criar primeiro usuário" aberta.
- Não há conta Cloudflare R2 acessível neste ambiente, e criar uma depende do dono. O `BLOB_READ_WRITE_TOKEN` da
  Vercel não é usado pelo adaptador S3 do código.
- A Vercel Hobby é **não comercial** (0019); a Quarau é cliente. A regra geral do Zé é: sites de clientes vão para
  a VPS.
- A VPS `zewithane` já roda um Payload em produção (CMDCA) com a plataforma `vps-platform`: Postgres 17 próprio,
  pasta `data/media` montada em `/app/media`, backup restic diário do banco **e** da mídia com teste semanal de
  restauração, domínio provisório `<site>.zewithane.vps.brz.dev.br` com HTTPS.

## Decisão

1. **Homologação passa a ser a VPS**, no endereço provisório `https://quarau.zewithane.vps.brz.dev.br`, com
   `SITE_NOINDEX=true`. É a mesma máquina, imagem e banco que viram produção: o go-live é só
   `site dominio quarau quarau.com.br,www.quarau.com.br …` + DNS + `SITE_NOINDEX=false`.
2. **Banco:** Postgres 17 da plataforma (banco/usuário `quarau`, injetado pelo `site`). Neon deixa de ser usado.
3. **Mídia:** disco da plataforma (`MEDIA_DIR=/app/media`, sem `S3_*`), servida pelo próprio app em
   `/api/media/file/…` e coberta pelo backup restic. O adaptador S3/R2 continua no código para quando houver
   bucket (troca por variável, sem código novo).
4. **Contêiner somente leitura** (padrão da plataforma, sem `--rw`): o `Dockerfile` usa `/app/media` e liga o cache
   do Next a `/app/.next/cache` (tmpfs da plataforma). O CI roda a imagem com as mesmas montagens.
5. **Vercel:** `quarau.vercel.app` deixa de ser a homologação. Fica sem papel até o dono pausar ou apagar o
   projeto no painel (ação dele). Não roda fila de tarefas contra o banco da VPS.

## Consequências

- Custo extra: zero (VPS já paga; sem R2, Neon ou Vercel Pro).
- Fotos e banco ficam na mesma máquina: o backup restic local cobre os dois, mas **cópia fora da VPS** (R2/B2)
  continua pendente na plataforma inteira (pendência do dono, `vps-platform`).
- Uploads passam pelo processo Node (sem CDN). Para o volume de um site institucional isso é suficiente; se
  crescer, configurar `S3_*` (R2) e copiar `data/media` para o bucket.
- Limite de memória do contêiner: 640 MB (VPS de 2 GB dividida com o CMDCA).
