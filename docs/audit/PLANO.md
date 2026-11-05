# Plano de execução e QA | Quarau

1. **Recuperação do build:** validar novo deploy após configurar `DATABASE_URL`; investigar falhas posteriores por logs. Preservar `SITE_NOINDEX=true` na Vercel.
2. **Banco/CMS:** aplicar migrations, executar seed idempotente com mídia de origem autorizada; conferir criação das seis notícias e publicação da página Notícias. Repetir seed, garantindo que não duplica nem sobrescreve edição humana.
3. **QA central:** Playwright contra artefato implantado e banco real: home, projetos, Notícias, seis slugs, filtros, menu, sitemap, 404, contato, uploads, papéis, draft/preview e links. Verificar Android e desktop; estados de erro.
4. **Curadoria contínua:** consultar exportações oficiais do Instagram/LinkedIn, reconciliar duplicatas por origem/data/assunto, adaptar como artigos originais, vincular projeto/capa e registrar autorização editorial.
5. **Segurança e qualidade:** verificar ACL, CSRF, rate limit, conteúdo de logs, scanner de dependências, acessibilidade, WCAG 2.2 AA, SEO, imagem responsiva, Lighthouse/TBT e backups/restore.
6. **Infra e operação:** identificar arquitetura VPS real sem presumir Caddy ou Traefik. Preservar WordPress e MX até aceite formal para migração; ensaiar rollback.
7. **Gate final:** CI/CD verde no SHA exato, E2E e inspeção visual, sem P0/P1, backup restaurado, direitos de imagem resolvidos. Só então etiquetar stable e propor domínio principal.

**Observação:** commits no `main` não significam deploy saudável. Se a execução parar, cada item permanece pendente no registro até haver prova técnica.
