# Progresso

> O agente lê isto **no início de toda sessão** e atualiza **antes de parar**: marca `[x]`, preenche "Retomar em" e faz commit.
> O hook `handoff-guard` bloqueia a parada se houver mudanças sem este arquivo atualizado.

## Retomar em

- **Sessão:** S00 — [PC pronto](plano/S00-pc.md)
- **Próximo passo exato:** começar pelo passo 1 da S00.
- **Comando para conferir o estado:** `git log --oneline -5 && gh run list -L 3`
- **Bloqueios / esperando o dono:** —

## Estado do ambiente

- Homologação: `https://quarau.vercel.app` — último deploy Ready: —
- Ensaio na VPS: `https://quarau.zewithane.vps.brz.dev.br` — —
- Produção: `https://quarau.com.br` — ainda no WordPress antigo (não mexer até a S13)
- Gestor cadastrado (e-mail): —
- Aprovações:
  - copy (S06): —
  - direção visual (S07): —
  - aceite (S11): —

## Já feito antes do PC (sessão na nuvem, até 2026-10-10)

- [x] Diagnóstico completo de site, CMS e sistema ([RELATORIO-COMPLETO.md](RELATORIO-COMPLETO.md), capturas em [diagnostico/](diagnostico/))
- [x] Raspagem completa do site antigo (`content/legacy/scrape/`, `pnpm --filter @quarau/web scrape:wp`)
- [x] Leitor das exportações do Instagram e do LinkedIn (`content/social/README.md`, `social:parse`), com testes
- [x] Ferramenta de QA visual com folhas-resumo (`tests/qa/screens.mjs`)
- [x] Plano em sessões ([PLANO.md](PLANO.md)), estratégia de QA ([QA.md](QA.md)), ADR 0015
- [x] Projeto Vercel, Blob e variáveis de produção criados; integração Neon instalada na conta (sem banco ainda)
- [x] Diagnóstico da VPS somente leitura (`infra/vps/preflight.sh`)

## S00 — PC pronto

- [ ] Ferramentas instaladas (Node 22, pnpm, Vercel CLI, gh, ffmpeg) e Defender com exclusão
- [ ] `gh auth login` (dono)
- [ ] `pnpm install` + Chromium/WebKit/Firefox do Playwright
- [ ] MCPs conectados (playwright, context7)
- [ ] `pnpm lint && pnpm typecheck && pnpm test` verdes

## S01 — Contas, banco e variáveis

- [ ] `vercel login` + `vercel link` + MCP da Vercel autenticado
- [ ] Neon `quarau-db` (prod + preview) e `quarau-dev` (dev)
- [ ] Variáveis de dev + `apps/web/.env.local` (scripts padronizados)
- [ ] Migrações no dev + admin local + `ACESSO-ADMIN.txt`

## S02 — Fundação técnica

- [ ] Medidas de partida (First Load JS)
- [ ] 3D, GSAP, Lenis, Meilisearch, Valkey e Umami removidos
- [ ] Busca sem acento no Postgres
- [ ] i18n removido; migração inicial recriada; banco de produção zerado
- [ ] Imagens via `srcset` do Payload direto do CDN (sem processamento no servidor)
- [ ] `vercel-build` só migra e compila; fila de tarefas por ambiente
- [ ] CI novo (qualidade, integração, contêiner com 5 navegadores + k6 512 MB + Trivy + GHCR) e `pos-deploy.yml`
- [ ] Scripts compatíveis com Windows; README; PR #1 fechado

## S03 — Tudo editável

- [ ] Global "Textos do site" (82 chaves) e `t()` lendo do CMS
- [ ] Páginas de listagem como páginas do CMS + blocos de lista; menu só com páginas
- [ ] CTA do rodapé editável/ocultável; e-mails editáveis
- [ ] SEO em todos os documentos; Notícias com galeria e origem
- [ ] `react/jsx-no-literals` sem violações; E2E "editar texto" verde

## S04 — Painel e gestor

- [ ] Papéis (admin, gestor, editor, autor) + matriz de testes
- [ ] Convite por e-mail; login seguro; redefinição de senha
- [ ] Painel com contadores; Ajuda; vídeos
- [ ] Blocos com nome; listas legíveis; limpezas; identidade
- [ ] Gestor cadastrado

## S05 — Conteúdo

- [ ] Biblioteca inteira + vídeos (idempotente)
- [ ] Logos de parceiros + fallback em texto
- [ ] Posts das redes → rascunhos de notícia (ou aguardando exportações)
- [ ] Seções vazias tratadas

## S06 — Copy e SEO editorial

- [ ] Voz e tom + casa de mensagem
- [ ] Palavras-chave por página
- [ ] Pacote de textos por página + cobertura 100% decidida
- [ ] `revisor-copy` + `copy-check` sem erros
- [ ] Aprovação do dono
- [ ] Textos carregados no CMS

## S07 — Design system

- [ ] Tokens + contraste testado
- [ ] Componentes com estados
- [ ] `/_ds` com visual e axe; Storybook removido
- [ ] Direção aprovada pelo dono

## S08 — Páginas

- [ ] Home · [ ] Projetos · [ ] Case · [ ] Atuação · [ ] Área · [ ] Sobre · [ ] Contato · [ ] Notícias · [ ] Busca · [ ] 404/500
- [ ] Orçamento (JS ≤ 120 KB, LCP, CLS) no build
- [ ] Personas de visitante em local

## S09 — Testes fullstack

- [ ] Tabela camada → arquivos → status (QA.md)
- [ ] Camadas 1–12 verdes no CI; 13–14 sem P0/P1
- [ ] Tempo de CI: ___ min

## S10 — SEO e LinkedIn

- [ ] Metadados + JSON-LD + sitemap + `llms.txt` + compartilhar
- [ ] Kit da página de empresa no LinkedIn + 7 posts + bio do Instagram

## S11 — Homologação e aceite

- [ ] Deploy Ready + pós-deploy verde
- [ ] Conteúdo em produção + acessos
- [ ] QA no ar (evidências em `docs/qa/<data>/`) — Lighthouse: Perf ___ · A11y ___ · BP ___
- [ ] Aceite do dono ("aprovado" em **/**)

## S12 — VPS engatilhada

- [ ] SSH do PC
- [ ] Preflight arquivado e cenário decidido
- [ ] Imagem acessível (pacote público ou token)
- [ ] Ensaio no ar + k6 + outros sites ok + rollback testado
- [ ] `docs/vps/CORTE.md`

## S13 — Go-live

- [ ] Pré-condições
- [ ] DNS + HTTPS + verificações
- [ ] Homologação desligada do banco de produção
- [ ] E-mail do domínio
- [ ] Search Console/Bing
- [ ] LinkedIn/Instagram
- [ ] Primeira semana sem 404 relevantes

## S14 — Operação

- [ ] Uptime + Sentry + smoke agendado
- [ ] Backup diário + restauração testada
- [ ] Passagem ao gestor
- [ ] Relatório final

## Decisões e problemas

- (data · sessão · decisão/problema · motivo)

## `[CONFIRMAR]` com o cliente

- CNPJ, endereço completo, ano de fundação
- Os telefones (12) 98281-3669 e (12) 98264-5960 atendem WhatsApp?
- LinkedIn: criar a Página de empresa (o atual é perfil pessoal)
- Logos em vetor dos parceiros (Celeo, CECP, Espaço Crescer, Instituto Umbuzeiro)
- Fotos em alta resolução (o WordPress guardou no máx. 1600 px) e créditos
- Anos do Projeto Quipá; status atual do Ecoe Verde e do Ecomuseu
- Onde estão o DNS do domínio e o e-mail `contato@` (para o go-live não afetar o e-mail)
- Lista completa no [relatorio-final.md §4](relatorio-final.md#4-pendências-confirmar)
