# S09 — Testes fullstack

**Modelo:** `sonnet` · **Lê:** este arquivo + PROGRESSO + [QA.md](../QA.md) · **Dono:** nada

## Objetivo

Fechar a pirâmide do [QA.md](../QA.md): o que as sessões anteriores não cobriram ganha teste automatizado, e o CI passa a provar o sistema inteiro (backend, API, interface em 5 navegadores, visual, acessibilidade, SEO, segurança, carga com 512 MB e resiliência) a cada push.

## Passos

1. **Inventário:** listar o que já existe por camada (`tests/unit`, `tests/int`, `tests/e2e`, workflows) e o que falta. Registrar a tabela em PROGRESSO.
2. **Integração e API** (camadas 3–4):
   - `tests/int/acesso.matriz.test.ts`: matriz gerada a partir de uma tabela `{papel, coleção, operação, esperado}`;
   - fluxos: versões, agendamento, revalidação, busca, formulário + e-mails, convite/senha/bloqueio, importações idempotentes, migração do zero;
   - API pública sem vazamento; CSRF; segredos de cron e revalidação.
3. **E2E** (camada 5):
   - projetos do Playwright conforme o QA.md (`desktop-chrome`, `desktop-safari`, `iphone`, `android`, `tablet`);
   - as 10 jornadas de visitante e as 10 de editor;
   - checagem de layout em 320/1024/1920 (sem rolagem horizontal, sem sobreposição de header/hero/CTA/cookies, via bounding boxes);
   - tag `@smoke` nas jornadas só de leitura.
4. **Visual e acessibilidade** (6–7): snapshots por página e `/_ds`; axe por estado; teclado; zoom; alvos de toque.
5. **SEO** (8): `tests/e2e/seo.spec.ts` sobre o sitemap, com as regras do QA.md; 301 de todo o `url-map.json`; linkinator.
6. **Conteúdo** (9): `scripts/qa/copy-check.ts` (LanguageTool + regras) num job manual do CI e no fim da S06 e da S11.
7. **Performance e capacidade** (10):
   - orçamento de JS lido do build (falha acima de 120 KB gzip na home);
   - k6 no job `conteiner` com `--memory=512m --cpus=1` e os limites do QA.md;
   - registro da memória pico (`docker stats`).
8. **Segurança** (11): ZAP baseline e gitleaks no CI; `pnpm audit --prod --audit-level high`.
9. **Resiliência** (12): E2E com banco parado (`docker pause`), e-mail falhando (SMTP inválido) e mídia lenta (rota interceptada pelo Playwright).
10. **Caos** (14): `tests/e2e/gremlins.spec.ts` (injeta gremlins.js de `node_modules` por 60 s); job semanal (`schedule`) e manual.
11. **Personas** (13): rodar o `testador-persona` com as 8 personas contra o build local. Corrigir o que for P0/P1 e registrar notas e atritos em `docs/qa/<data>/personas.md`.
12. **Tempo de CI:** o pipeline completo deve ficar abaixo de ~20 min. Paralelize os projetos do Playwright em shards e use cache do pnpm e do build.

## Pronto quando

- Todas as camadas 1–12 existem e estão verdes no CI; 13–14 sem P0/P1.
- Tabela "camada → arquivos de teste → status" atualizada em PROGRESSO.
- Tempo de CI registrado.
