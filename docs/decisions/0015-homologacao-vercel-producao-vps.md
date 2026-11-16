# 0015 — Homologação na Vercel, produção na VPS, dados fora da VPS

- **Status:** aceita (complementa a [0014](0014-vercel-free-tier.md) e reaproveita a [0013](0013-plataforma-vps-traefik-sem-painel.md)) · **Data:** 2026-10-10

## Contexto

- **Decisão do dono:** o site é aprovado num endereço provisório e, aprovado, vai para a VPS dele e recebe o domínio `quarau.com.br`.
- **A VPS:**
  - tem 2 GB de RAM, é compartilhada com outros sites e foi instável no passado;
  - já tem a plataforma da ADR 0013 (Traefik + comando `site` + autodeploy de imagem do GHCR), mas o estado atual dela precisa ser auditado.
- **Exigência:** a migração não pode virar um projeto de semanas nem colocar em risco os outros sites.

## Decisão

| Peça                | Homologação (agora)                                                                              | Produção (após aprovação)                                                |
| ------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| App                 | Vercel `quarau.vercel.app` (push na main)                                                        | VPS: contêiner `ghcr.io/vhonorato02/quarau` via `site`, atrás do Traefik |
| Banco               | Neon (via integração Vercel), São Paulo                                                          | **o mesmo Neon**: nada a migrar                                          |
| Mídia               | Vercel Blob (CDN)                                                                                | **o mesmo Blob**: nada a migrar                                          |
| E-mail              | Resend                                                                                           | Resend (domínio verificado no go-live)                                   |
| Imagens responsivas | tamanhos gerados pelo Payload no upload, servidos direto do CDN (loader próprio do `next/image`) | idem: **zero processamento de imagem na VPS**                            |
| Tarefas agendadas   | cron diário da Vercel                                                                            | fila do Payload no próprio processo (a cada minuto)                      |
| Imagem Docker       | gerada e testada no CI a cada push                                                               | a mesma imagem, já testada                                               |

- **Ensaio geral antes do aceite:** a mesma imagem roda na VPS em `quarau.zewithane.vps.brz.dev.br` (DNS curinga já existe), com `noindex`, limite de 512 MB de memória e teste de carga.
- **Go-live (sessão 13):** DNS do domínio → VPS. Depois, a homologação na Vercel passa a apontar para um branch `homolog` do Neon, ou é pausada.

## Por quê

- **VPS sem estado:** banco e arquivos ficam em serviços gerenciados, com backup próprio. Se a VPS cair ou for trocada, basta subir o contêiner em outro lugar. A carga de CPU, disco e backup na VPS compartilhada fica mínima.
- **Contêiner testado:** o contêiner que vai para a VPS é o mesmo que passa no CI (E2E, acessibilidade, carga). Não existe "funcionou na Vercel, quebrou na VPS" que o CI não pegue.
- **Menos contas:** Neon e Blob já estão ligados à conta Vercel do dono; a VPS só recebe as variáveis.

## Consequências

- O uso comercial no plano Hobby da Vercel continua sendo um ponto de atenção (ADR 0014). Para a empresa em produção, recomenda-se o Vercel Pro, ou mover banco e mídia para contas próprias (Neon direto, Cloudflare R2): o código já suporta S3.
- **Ordem do corte:** um único processo deve rodar a fila de tarefas por banco. No corte, o cron da Vercel é desligado antes de a VPS assumir.
