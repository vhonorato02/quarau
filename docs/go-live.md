# Checklist de go-live (troca para quarau.com.br)

Hoje o site responde em **https://quarau.zewithane.vps.brz.dev.br** com `noindex`.
O WordPress continua intocado até a virada do DNS.

## 1. Antes da virada (D-2)

- [ ] Conteúdo revisado no CMS (itens `[CONFIRMAR]` do relatório final resolvidos).
- [ ] SMTP configurado (`site config quarau`: `SMTP_HOST/USER/PASS`) e formulário testado com e-mail real.
- [ ] Cloudflare Turnstile criado para `quarau.com.br`: variável `TURNSTILE_SITE_KEY` (GitHub) e
      `TURNSTILE_SECRET_KEY` (`site config quarau`).
- [ ] Backup off-site configurado (`RESTIC_REPOSITORY_OFFSITE` em `/srv/platform/.env`) e um `site backup` executado com sucesso.
- [ ] App ntfy assinando o tópico de `ALERT_URL` (ver [guia](vps-guia.md#alertas-no-celular)).
- [ ] Reduzir o TTL dos registros DNS atuais para 300 s.

## 2. Registros DNS (no provedor do domínio)

| Tipo | Nome                  | Valor                                                                                      | TTL  |
| ---- | --------------------- | ------------------------------------------------------------------------------------------ | ---- |
| A    | `quarau.com.br` (`@`) | `177.107.94.31`                                                                            | 300  |
| A    | `www`                 | `177.107.94.31`                                                                            | 300  |
| AAAA | `@`, `www`            | remover se apontarem para o servidor antigo (a VPS não tem IPv6 configurado) `[CONFIRMAR]` | —    |
| CAA  | `@`                   | `0 issue "letsencrypt.org"` (opcional, recomendado)                                        | 3600 |

**Não altere** os registros de e-mail (MX, SPF/TXT, DKIM, DMARC). Se o e-mail `contato@quarau.com.br` for
hospedado junto com o WordPress, confirme com o provedor antes de mudar qualquer coisa além de A/AAAA. `[CONFIRMAR]`

## 3. Virada (D0)

No servidor:

```bash
site dominio quarau quarau.com.br,www.quarau.com.br   # confere o DNS, troca a rota; HTTPS sai em ~1 min
site config quarau                                     # SITE_URL=https://quarau.com.br, NEXT_PUBLIC_SITE_URL idem, SITE_NOINDEX=false
# limpa o cache para remover o noindex das páginas já renderizadas
docker exec "$(docker ps -qf name=quarau-web)" sh -c 'curl -fsS -X POST -H "authorization: Bearer $REVALIDATE_SECRET" -d "{\"all\":true}" http://127.0.0.1:3000/next/revalidate'
```

> **www → raiz:** os dois hosts servem o site; o canonical já aponta para `SITE_URL`. Para um 301 de `www`, use um
> middleware `redirectregex` num arquivo extra em `/srv/platform/traefik/dynamic/`.

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
4. Analytics (opcional): Umami não roda na VPS de 2 GB; use o Umami Cloud (grátis até 100 mil eventos/mês) e cole
   o _Website ID_ no CMS (SEO e configurações gerais → Analytics).

## 6. Depois (D+7)

- [ ] Monitorar 404 no Search Console; criar redirecionamentos no CMS para URLs antigas restantes.
- [ ] Desligar o WordPress somente após confirmar indexação e backups (decisão do cliente). `[CONFIRMAR]`
