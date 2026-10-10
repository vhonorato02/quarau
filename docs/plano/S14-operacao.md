# S14 — Operação e passagem para a Quarau

**Modelo:** `sonnet` · **Lê:** este arquivo + PROGRESSO · **Dono:** 🔑 opcional, contas UptimeRobot e Sentry (10 min)

## Objetivo

O site se cuida sozinho e avisa quando algo dá errado. O gestor sabe operar o painel. O dono tem um relatório final curto e honesto.

## Passos

1. **Monitoramento:**
   - 🔑 UptimeRobot (grátis): monitor HTTP em `https://quarau.com.br/next/health` a cada 5 min, alerta por e-mail ao dono;
   - 🔑 Sentry (grátis, plano Developer): criar o projeto e colocar `SENTRY_DSN`/`NEXT_PUBLIC_SENTRY_DSN` no `site config quarau`; provocar um erro de teste e conferir;
   - **smoke agendado:** `.github/workflows/smoke-agendado.yml` (a cada 6 h) com os testes `@smoke` contra o domínio. Falhou → e-mail do GitHub.
2. **Backups e restauração:**
   - **banco:** o Neon tem histórico de restauração (janela curta no plano gratuito). Além dele, `.github/workflows/backup-banco.yml` diário: `pg_dump` comprimido e criptografado (chave em segredo do GitHub) como artefato com retenção de 30 dias;
   - **teste de restauração mensal** automático num branch `restore-test` do Neon: conta registros e falha se divergir;
   - **mídia:** o Blob é durável. `scripts/ops/backup-midia.ts` (manual, trimestral) baixa tudo para o PC do dono.
3. **Manutenção:**
   - Renovate: PRs mensais agrupadas; o agente de manutenção faz merge na `main` com CI verde. Segurança alta = na hora;
   - plataforma da VPS: `site saude` mensal; atualizações do sistema conforme `docs/vps-guia.md`, respeitando as regras invioláveis.
4. **Passagem para o gestor:**
   - a página "Ajuda" do painel e os 5 vídeos (S04) revisados com o conteúdo final;
   - `docs/cms.md` reescrito para leigo: como publicar projeto e notícia, trocar texto, tratar contatos, agendar, o que não fazer;
   - um "cartão de bolso" de 1 página.
5. **Relatório final** (`docs/relatorio-final.md`, reescrito e curto):
   - o que foi entregue e onde (URLs);
   - acessos (onde estão, não as senhas);
   - números do QA (Lighthouse, testes, personas);
   - custos (zero ou o plano escolhido);
   - limites;
   - `[CONFIRMAR]` restantes;
   - o que fazer em caso de problema.
6. Arquivar `docs/plano/` como histórico. PROGRESSO 100%.

## Pronto quando

- Alertas testados.
- Backup e restauração verdes uma vez.
- Gestor publicou algo sozinho.
- Relatório final entregue ao dono.
