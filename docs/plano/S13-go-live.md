# S13 — Go-live: o domínio na VPS (só depois do "aprovado")

**Modelo:** `sonnet` · **Lê:** este arquivo + PROGRESSO + `docs/vps/CORTE.md` · **Dono:** 🔑 acesso ao DNS do domínio, Google Search Console,
página de empresa no LinkedIn (≈ 30 min no total)

## Pré-condições (verificar e registrar antes de começar)

- "Aprovado" da S11 registrado.
- Ensaio da S12 verde nos últimos 7 dias.
- `CORTE.md` escrito.
- Rollback testado.
- Backup do WordPress antigo feito: o dono pede ao provedor atual ou exporta pelo painel do WP (Ferramentas → Exportar) e guarda as mídias; o `content/legacy/` já tem a raspagem completa.

## Passos

1. **Véspera (24 h antes):**
   - 🔑 o dono abre o painel de DNS (registro.br ou onde estiver; `[CONFIRMAR]`);
   - o agente lista **todos** os registros atuais (o dono descreve, ou com print) e grava em `docs/vps/dns-antes.md`;
   - baixar o TTL de `@` e `www` para 300 s.
   - **Não tocar em MX, TXT/SPF/DKIM nem em `mail`/`webmail`.** Se o e-mail usa um host que também atende o WordPress (ex.: `mail.quarau.com.br` com o mesmo IP do site antigo), esse registro **fica** como está.
2. **Corte (janela de ~30 min, horário de pouco acesso):**
   1. Na VPS: `site dominio quarau quarau.com.br,www.quarau.com.br`.
   2. Variáveis:
      - `site config quarau` → `SITE_URL=https://quarau.com.br`, `SITE_NOINDEX=false`, `PAYLOAD_JOBS_AUTORUN=true` (a VPS passa a ser a dona da fila);
      - **antes disso, desligar o cron da Vercel** (remover `crons` do `vercel.json` + push, ou pausar o projeto).
   3. 🔑 DNS:
      - `A @ → 177.107.94.31`;
      - `A www → 177.107.94.31` (ou `CNAME www → quarau.com.br`).
   4. Aguardar a propagação (`dig +short quarau.com.br @1.1.1.1`) e o certificado HTTPS (Traefik/Let's Encrypt, em ~1 min após resolver).
   5. Verificar:
      - `screens.mjs https://quarau.com.br`;
      - smoke `@smoke`;
      - 301 de 10 URLs antigas;
      - `robots.txt` liberando;
      - sitemap com o domínio;
      - formulário de contato;
      - admin em `https://quarau.com.br/admin`.
   6. **Homologação depois do corte:**
      - criar um branch `homolog` no Neon (`vercel integration open neon` → Branches) e apontar o `DATABASE_URL` de preview/production da Vercel para ele, **ou** pausar o projeto da Vercel;
      - nunca deixar a Vercel escrevendo no banco de produção depois do corte.
3. **E-mail do domínio (Resend), se houver chave:**
   - adicionar o domínio na Resend;
   - 🔑 o dono cria os registros DKIM/SPF que ela pedir, **mesclando** o SPF existente: só pode haver um registro SPF;
   - `EMAIL_FROM_ADDRESS=nao-responda@quarau.com.br`, `CONTACT_RECIPIENT=contato@quarau.com.br`;
   - teste de envio real.
4. **Buscadores:**
   - 🔑 Google Search Console: propriedade de **domínio** (registro TXT no DNS) → enviar `https://quarau.com.br/sitemap.xml` → inspecionar home e 3 cases;
   - Bing Webmaster: importar do Search Console.
   - `[CONFIRMAR]` Perfil da Empresa no Google (endereço comercial).
5. **LinkedIn e Instagram** (kit da S10):
   - 🔑 o dono (ou o gestor) cria a Página de empresa com os textos e as imagens de `docs/linkedin/`;
   - atualiza o link da bio do Instagram;
   - no perfil pessoal antigo, aviso apontando para a página nova;
   - conferir a prévia dos links no LinkedIn Post Inspector (🔑, exige login);
   - agendar os posts de apresentação.
6. **Primeira semana:**
   - acompanhar os 404 no log (`site logs quarau | grep " 404 "`) e criar redirects no CMS para URLs antigas que aparecerem;
   - Search Console: cobertura e erros;
   - Speed Insights/Lighthouse no domínio.

## Rollback (em ≤ 5 min)

- **Problema no site novo:** `site rollback quarau` (versão anterior).
- **Problema grave:** voltar o DNS de `@`/`www` para os valores de `dns-antes.md` (o WordPress antigo continua no provedor até o dono decidir desligá-lo).

## Pronto quando

- `https://quarau.com.br` serve o site novo com HTTPS, indexável, com sitemap enviado.
- E-mail do domínio funcionando (se configurado).
- Página do LinkedIn criada.
- Uma semana sem 404 relevantes.
- PROGRESSO com data e hora do corte.
