# Checklist de go-live (troca para quarau.com.br)

Hoje o site responde em **https://quarau.177-107-94-44.sslip.io** com basic auth e `noindex`.
O WordPress continua intocado até a virada do DNS.

## 1. Antes da virada (D-2)

- [ ] Conteúdo revisado no CMS (itens `[CONFIRMAR]` do relatório final resolvidos).
- [ ] SMTP configurado no `.env` (`SMTP_HOST/USER/PASS`) e formulário testado com e-mail real.
- [ ] Cloudflare Turnstile criado para `quarau.com.br`: variável `TURNSTILE_SITE_KEY` (GitHub) e
      `TURNSTILE_SECRET_KEY` (`.env`).
- [ ] Backup off-site configurado (`RESTIC_REPOSITORY_OFFSITE`) e um `backup.sh` executado com sucesso.
- [ ] `ALERT_WEBHOOK_URL` configurado e alerta de teste recebido.
- [ ] Reduzir o TTL dos registros DNS atuais para 300 s.

## 2. Registros DNS (no provedor do domínio)

| Tipo | Nome                  | Valor                                                                                      | TTL  |
| ---- | --------------------- | ------------------------------------------------------------------------------------------ | ---- |
| A    | `quarau.com.br` (`@`) | `177.107.94.44`                                                                            | 300  |
| A    | `www`                 | `177.107.94.44`                                                                            | 300  |
| AAAA | `@`, `www`            | remover se apontarem para o servidor antigo (a VPS não tem IPv6 configurado) `[CONFIRMAR]` | —    |
| CAA  | `@`                   | `0 issue "letsencrypt.org"` (opcional, recomendado)                                        | 3600 |

**Não altere** os registros de e-mail (MX, SPF/TXT, DKIM, DMARC). Se o e-mail `contato@quarau.com.br` for
hospedado junto com o WordPress, confirme com o provedor antes de mudar qualquer coisa além de A/AAAA. `[CONFIRMAR]`

## 3. Virada (D0)

No servidor, edite `/srv/apps/quarau/.env`:

```env
TRAEFIK_RULE='Host(`quarau.com.br`) || Host(`www.quarau.com.br`)'
TRAEFIK_MIDDLEWARES=quarau-headers,quarau-compress
SITE_URL=https://quarau.com.br
SITE_NOINDEX=false
```

E aplique (sem downtime):

```bash
cd /srv/apps/quarau && scripts/deploy.sh "$(tail -1 releases.log | awk '{print $2}')"
# limpa o cache para remover o noindex das páginas já renderizadas
docker compose exec web sh -c 'curl -fsS -X POST -H "authorization: Bearer $REVALIDATE_SECRET" -d "{\"all\":true}" http://127.0.0.1:3000/next/revalidate'
```

No GitHub, atualize a variável `TEMP_DOMAIN` para `quarau.com.br` (usada no smoke test do deploy).

> **www → raiz:** para redirecionar `www` para o domínio raiz, adicione no compose um router Traefik com
> `redirectregex` (ou mantenha os dois hosts; o canonical já aponta para `SITE_URL`).

## 4. Verificações pós-virada (D0, +1 h)

- [ ] `https://quarau.com.br` abre com cadeado válido (Let's Encrypt emitido pelo Traefik).
- [ ] `curl -I https://quarau.com.br` **não** tem `x-robots-tag: noindex` e `/robots.txt` libera o site.
- [ ] Redirects antigos: `/sobre-a-quarau/`, `/contato/`, `/portfolio-item/...` → 301 para as páginas novas.
- [ ] Formulário de contato envia e o e-mail chega.
- [ ] `/admin` acessível; editar e publicar uma alteração de teste.
- [ ] Lighthouse em produção (mobile) e Search Console sem erros de cobertura.

## 5. Google Search Console e Analytics

1. Search Console → adicionar propriedade de **domínio** `quarau.com.br` (verificação por TXT no DNS).
2. **Sitemaps** → enviar `https://quarau.com.br/sitemap.xml`.
3. Inspeção de URL na home e em 2–3 projetos → “Solicitar indexação”.
4. Umami: criar o site em `https://stats.<domínio>` e colar o _Website ID_ no CMS (SEO e configurações gerais →
   Analytics). O Google Analytics do WordPress pode ser desativado.

## 6. Depois (D+7)

- [ ] Monitorar 404 no Search Console; criar redirecionamentos no CMS para URLs antigas restantes.
- [ ] Desligar o WordPress somente após confirmar indexação e backups (decisão do cliente). `[CONFIRMAR]`
