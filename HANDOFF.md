# Handoff — Quarau

> Resumo curto para retomar. O registro completo e o "Retomar em" ficam em [docs/PROGRESSO.md](docs/PROGRESSO.md).

## Estado (08/11/2026)

- **Homologação:** `https://quarau.zewithane.vps.brz.dev.br` (VPS, `SITE_NOINDEX=true`). Saúde:
  `curl -s https://quarau.zewithane.vps.brz.dev.br/api/health` (o campo `version` é o SHA publicado).
- **Deploy:** push na `main` → CI/CD (lint, testes, E2E, axe, Lighthouse, Trivy) → deploy automático na VPS.
  `gh run list -L 3`.
- **Design:** 4ª execução (08/11): títulos em Newsreader leve, texto em Barlow, papel `#f4f6f3`, home abrindo
  com a foto de campo em tela cheia. Registro em [docs/DESIGN.md](docs/DESIGN.md) §4ª execução.
  **No ar em `9939704`** (CI/CD verde, Lighthouse mobile ≥ 95; LCP 2,8–3,1 s ainda gera aviso).
- **5ª execução (08/11, tarde):** mapa "Onde atuamos", índice de projetos na home, `/llms.txt`, schema mais rico,
  painel do CMS com edições recentes. **No ar em `897f7f8`.** Scripts contra o banco da VPS: túnel + arquivo de
  ambiente fora do git (runbook); apague o arquivo ao terminar.
- **Ponto em aberto:** títulos com `display: optional` saem no fallback Times na primeira visita (sem cache).
  Trocar para `swap` deixa a fonte sempre visível, mas a repintura tinha virado o LCP (~3 s). Avaliar com o Zé.
- **Domínio `quarau.com.br`, DNS/MX e WordPress antigo:** intocados. Só depois do "aprovado" do dono
  ([docs/go-live.md](docs/go-live.md)).

## Próximo passo

1. Aprovação visual e de conteúdo do Zé na homologação.
2. Pendências do dono: senha SMTP de `contato@` (Q-019), direitos de imagem (Q-005), exportações das redes
   (Q-008), equipe/fundação/Quipá ([docs/CONTENT-TODO.md](docs/CONTENT-TODO.md)).
3. Depois do aprovado: go-live ([docs/MIGRACAO-VPS.md](docs/MIGRACAO-VPS.md)).

## Dev local (Windows, sem Docker)

- Banco: `pnpm db:local` (embedded Postgres em `.cache/pg`). **Porta 54329 pode estar ocupada pelo Postgres do
  Virada**: rode `LOCAL_PG_PORT=54339 pnpm db:local` e suba o dev com
  `DATABASE_URL=postgres://quarau:quarau@localhost:54339/quarau PAYLOAD_DB_PUSH=false pnpm --filter @quarau/web dev`.
- Se o Postgres não subir com `undefined`: `postmaster.pid` obsoleto em `.cache/pg` (PID reaproveitado). Confira
  que nenhum `postgres.exe -D ...quarau\.cache\pg` roda e apague o arquivo.
- O banco local não tem as notícias da VPS (o sitemap local não lista `/noticias/*`).
- Primeira compilação do `next dev` no `Z:` leva ~3 min. Ao terminar, encerre o `next dev` e o Postgres
  (`pg_ctl -D .cache/pg stop`).
