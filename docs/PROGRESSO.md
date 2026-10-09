# Progresso

> O agente marca `[x]` ao concluir cada item do [PLANO.md](PLANO.md), anota decisões e problemas e faz commit.
> Se a sessão cair, o próximo agente retoma daqui.

## Estado atual

- Fase em andamento: **0**
- Última URL publicada: —
- Último QA no ar: —

## Fase 0 — Computador

- [ ] Node 22, pnpm 10.28, Vercel CLI instalados
- [ ] `pnpm install` e Chromium do Playwright
- [ ] `pnpm typecheck` passa
- [ ] MCPs aprovados e conectados (playwright, vercel, context7)

## Fase 1 — Contas, banco e variáveis

- [ ] `vercel login` (dono) e `vercel link`
- [ ] Neon `quarau-db` (production + preview) e `quarau-dev` (development)
- [ ] Variáveis de desenvolvimento + `apps/web/.env.local`
- [ ] Migrações no Neon dev + admin local abre
- [ ] Push na `main` autorizado

## Fase 2 — Limpar e simplificar

- [ ] Era VPS/Docker removida; ADRs marcadas como substituídas
- [ ] Meilisearch, Valkey, S3/MinIO removidos; busca no Postgres sem acento
- [ ] i18n removido; migração inicial recriada
- [ ] Mídia direto do Blob (CSP + remotePatterns)
- [ ] `vercel-build` só migra e compila
- [ ] CI enxuto (quality + e2e) com matriz Chrome/Safari/iPhone/Android/iPad
- [ ] pos-deploy.yml (smoke, links, cabeçalhos, Lighthouse no ar)
- [ ] Vercel Analytics + Speed Insights (após consentimento)
- [ ] Scripts compatíveis com Windows; `.env.example` e README

## Fase 3 — Conteúdo e mídias

- [ ] Biblioteca inteira importada (265 + vídeos), idempotente
- [ ] Logos de parceiros (maiores) + fallback em texto
- [ ] Notícias/Vagas somem quando vazias

## Fase 4 — Design

- [ ] Fundamentos (tipo, grade, imagens, movimento, cookies, header)
- [ ] Home
- [ ] Projetos (lista + case)
- [ ] Sobre
- [ ] Atuação (lista + área)
- [ ] Contato, busca, vazios

## Fase 5 — CMS

- [ ] Blocos com nome
- [ ] Menu com "Seção do site"
- [ ] Listas legíveis
- [ ] Painel inicial + Ajuda
- [ ] Limpezas (primeiro usuário, criado por, API, rascunhos)
- [ ] Identidade do admin

## Fase 6 — Backend

- [ ] Resend (se o dono criou a chave) / formulário ok sem chave
- [ ] Cron, revalidação, sitemap

## Fase 7 — No ar

- [ ] Deploy Ready
- [ ] Conteúdo + mídias em produção
- [ ] Admin de produção (`ACESSO-ADMIN.txt`)
- [ ] QA visual no ar sem problemas (capturas em `docs/qa/`)
- [ ] Jornadas no ar: 10 de visitante + 8 de editor (QA.md, camada 4)
- [ ] pos-deploy.yml verde no último deploy
- [ ] Aceite do dono (`docs/qa/ACEITE.md`)
- [ ] Lighthouse mobile: Perf ___ · A11y ___ · BP ___ · SEO ___

## Fase 8 — Entrega

- [ ] relatorio-final.md, cms.md, README
- [ ] Mensagem final ao dono

## Fase 9 — Operação (opcional)

- [ ] Sentry
- [ ] UptimeRobot
- [ ] Speed Insights/Analytics conferidos

## Decisões e problemas

- …

## `[CONFIRMAR]` com o cliente

- CNPJ, endereço completo, ano de fundação
- Telefones atendem WhatsApp?
- LinkedIn de empresa (o atual é perfil pessoal)
- Logos em vetor dos parceiros (Celeo, CECP, Espaço Crescer, Instituto Umbuzeiro)
- Fotos em alta resolução (WordPress guardou no máx. 1600 px) e créditos
- Anos do Projeto Quipá; status atual do Ecoe Verde e do Ecomuseu
- Lista completa no [relatorio-final.md §4](relatorio-final.md#4-pendências-confirmar)
