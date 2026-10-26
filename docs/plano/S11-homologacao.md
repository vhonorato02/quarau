# S11 — Homologação no ar e aceite

**Modelo:** `sonnet` · subagentes `qa-visual`, `testador-persona`, `auditor-seo` · **Lê:** este arquivo + PROGRESSO + [QA.md](../QA.md)
· **Dono:** 🔑 aceite (30 min: navegar no celular e no computador; responder "aprovado" ou a lista de ajustes)

## Objetivo

O site completo, com conteúdo real, roda em `https://quarau.vercel.app`, passa em todas as camadas do QA **no ar** e é aprovado pelo dono e pelo gestor.

## Passos

1. **Deploy:**
   - `git push origin main` → acompanhar com o MCP da Vercel ou `vercel ls` / `vercel inspect <url> --logs` até **Ready**;
   - `pos-deploy.yml` verde.
2. **Conteúdo em produção** (do PC, uma vez, idempotente):
   - `vercel env pull apps/web/.env.production.local --environment production --yes`. As sensíveis vêm vazias: defina um `PAYLOAD_SECRET` temporário só para o script;
   - rodar `migrate:wp`, `import-news` (se houver exportações) e o seed dos globais com `--env-file=.env.production.local`;
   - conferir as contagens no `/admin` de produção;
   - **apagar** o `.env.production.local`.
3. **Acessos:**
   - admin técnico do dono via `seed:admin`, com a senha em `ACESSO-ADMIN.txt`;
   - convite do gestor (S04): o e-mail sai se a Resend estiver configurada; senão o link vai para `ACESSO-ADMIN.txt`.
4. **QA no ar, camada por camada:**
   - `node tests/qa/screens.mjs https://quarau.vercel.app` → `qa-visual` sobre as folhas-resumo. Corrigir até não haver P0/P1;
   - smoke E2E `@smoke` contra a URL (já no pós-deploy) + jornadas de editor contra produção (com dados de teste apagados no fim);
   - `testador-persona` com as 8 personas na URL de produção;
   - `auditor-seo` em todas as URLs;
   - Lighthouse mobile (mediana de 3) nas 5 páginas principais;
   - `copy-check` contra o CMS de produção;
   - gremlins em 3 páginas.
   - Registrar tudo em `docs/qa/<data>/` (folhas, notas das personas, números do Lighthouse).
5. 🔑 **Aceite:**
   - gerar `docs/qa/ACEITE.md` com:
     - link e captura de cada página;
     - roteiro de 10 minutos ("no celular: abra a home, entre num projeto, envie um contato de teste; no computador: entre no painel com o seu acesso, troque o texto do botão do topo e publique");
     - lista `[CONFIRMAR]` com perguntas objetivas para o cliente.
   - Pedir ao dono, e ao gestor se o dono quiser, para seguir o roteiro e responder.
   - Ajustar e repetir só o que mudou. Registrar o **"aprovado"** com a data em PROGRESSO.

## Pronto quando

- Deploy Ready.
- Camadas 1–14 do QA verdes no ar, com evidências em `docs/qa/<data>/`.
- "Aprovado" registrado.

## Armadilhas

- O cron da Vercel e, na S12, o contêiner da VPS usam **o mesmo banco**. Não deixe a fila de tarefas ligada nos dois ao mesmo tempo (ver S12).
- Dados de teste criados no ar (contato, projeto de teste) precisam ser apagados no fim de cada rodada.
