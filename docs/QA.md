# QA de verdade — como o site Quarau é testado

> Regra única: **nada é "pronto" porque passou no computador do agente.** É pronto quando passou nas 5 camadas
> abaixo, com prova (capturas, números, links) gravada em `docs/qa/<data>/`.

## Visão geral

| Camada | Quando                           | Quem/ferramenta                                   | Bloqueia?                         |
| ------ | -------------------------------- | ------------------------------------------------- | --------------------------------- |
| 1      | a cada commit                    | agente: lint, tipos, testes unitários             | sim (não faz push)                |
| 2      | a cada push na `main`            | GitHub Actions: E2E em 3 motores + acessibilidade | sim (corrigir antes de seguir)    |
| 3      | a cada deploy de produção        | GitHub Actions contra `quarau.vercel.app`         | sim (corrigir ou voltar o deploy) |
| 4      | fim de cada fase do plano        | agente com **Playwright MCP** (navegador real)    | sim                               |
| 5      | antes de entregar e depois do ar | dono/cliente (aceite) + monitoramento contínuo    | aceite: sim · monitor: alerta     |

## Camada 1 — Antes de cada commit (local, segundos)

`pnpm lint && pnpm typecheck && pnpm test`. Falhou, não commita.

## Camada 2 — CI a cada push (`.github/workflows/ci.yml`)

- **Qualidade:** format, lint, tipos e unitários.
- **E2E** (Playwright) com Postgres do próprio GitHub, conteúdo de teste (`MIGRATE_OFFLINE=1`) e build de produção.
- **Matriz de navegadores e telas** (projetos em `apps/web/playwright.config.ts`):

  | Projeto          | Motor              | Tela     | Por quê                              |
  | ---------------- | ------------------ | -------- | ------------------------------------ |
  | `desktop-chrome` | Chromium           | 1440×900 | maioria dos acessos de escritório    |
  | `desktop-safari` | WebKit             | 1440×900 | Macs                                 |
  | `iphone`         | WebKit (iPhone 14) | 390×844  | **Safari do iPhone**, hoje sem teste |
  | `android`        | Chromium (Pixel 7) | 412×915  | celulares Android                    |
  | `tablet`         | WebKit (iPad Mini) | 768×1024 | quebra de layout intermediária       |

- **O que os E2E cobrem:**
  - todas as rotas respondem 200 (404 onde deve);
  - 301 das URLs antigas;
  - navegação e menu do celular;
  - formulário (sucesso, erro de validação, limite);
  - busca com e sem acento;
  - galeria/lightbox no teclado;
  - vídeo carrega no clique;
  - **axe WCAG 2.2 AA em todas as páginas**;
  - fluxo do editor no CMS (login, criar projeto com upload, publicar, aparecer no site, excluir).
- **Regressão visual:** `visual.spec.ts` compara capturas das páginas principais. Snapshots só são atualizados depois de aprovar as novas capturas na camada 4.

## Camada 3 — Depois de cada deploy, contra o site no ar (`.github/workflows/pos-deploy.yml`)

Disparada pelo evento `deployment_status` da Vercel (produção, `success`). Roda contra `https://quarau.vercel.app`:

1. **Smoke E2E:** testes marcados `@smoke`, só leitura (rotas, 301, busca, menu, mídia carregando do Blob).
   - O formulário roda com um e-mail de teste e o contato criado é apagado em seguida.
2. **Links:** nenhum link interno quebrado (`linkinator` no sitemap).
3. **Cabeçalhos de segurança:** CSP, HSTS, `X-Robots-Tag: noindex` (enquanto o domínio for provisório).
4. **Orçamento de performance** (`npx @lhci/cli autorun`, mobile, 3 execuções, mediana), nas páginas home, lista de projetos, um case, sobre e contato. Metas:
   - Performance ≥ 90;
   - Acessibilidade = 100;
   - Boas práticas ≥ 95;
   - LCP ≤ 2,5 s;
   - CLS ≤ 0,05;
   - TBT ≤ 200 ms.
5. **Se falhar:**
   - o workflow fica vermelho e o GitHub manda e-mail ao dono;
   - o agente corrige e publica de novo;
   - se for grave e não der para corrigir em minutos, volta o deploy anterior com `vercel rollback` (no plano Hobby só para o anterior imediato).

## Camada 4 — QA exploratório do agente, num navegador de verdade (Playwright MCP)

Os testes automáticos pegam o que alguém previu. Esta camada pega o resto: o agente **usa o site como uma pessoa** pelo Playwright MCP (clica, digita, rola, redimensiona) e **olha cada tela**.

1. **Varredura visual:**
   - `pnpm --filter @quarau/web exec node tests/qa/screens.mjs https://quarau.vercel.app`;
   - abrir e olhar **todas** as capturas (desktop + celular);
   - procurar sobreposição, corte, buraco de grade, texto pequeno, imagem borrada e contraste.
2. **Jornadas do visitante** (desktop e iPhone):
   - V1: chegar na home → entender o que a Quarau faz em 5 s → abrir um projeto → ver galeria e vídeo → "Fale com a Quarau" → enviar contato.
   - V2: Projetos → filtrar por área → abrir case → "próximo projeto".
   - V3: Atuação → abrir uma área → ver os projetos dela → contato.
   - V4: Sobre → missão/valores → parceiros.
   - V5: busca "patrimonio" (sem acento) → resultado certo.
   - V6: URL antiga do WordPress (`/portfolio/projeto-ecoe-verde/`) → cai no case novo.
   - V7: só teclado (Tab/Enter/Esc) do topo ao rodapé da home e do contato; foco sempre visível.
   - V8: rede lenta (3G simulada) → a página aparece em < 4 s e sem pulos de layout.
   - V9: cookies → recusar e aceitar; o banner nunca cobre botões.
   - V10: página que não existe → 404 útil.
3. **Jornadas do editor** (CMS, desktop):
   - E1: login → painel inicial mostra contadores e contatos novos.
   - E2: criar projeto com capa, galeria (upload de 3 fotos) e área → rascunho → visualizar → publicar → aparece no site em segundos.
   - E3: editar a home → os blocos têm nome → reordenar → publicar.
   - E4: trocar um item do menu ("Seção do site").
   - E5: mídias "para revisar" → corrigir o alt de uma.
   - E6: agendar publicação → conferir que o cron publica (ou disparar o cron manualmente).
   - E7: ver um contato recebido → mudar status.
   - E8: versões → restaurar a anterior.
4. **Evidências:** 1 captura por jornada em `docs/qa/<data>/` (JPEG ≤ 150 KB) e o resultado em PROGRESSO.md.

## Camada 5 — Aceite humano e monitoramento

**Aceite (antes de dizer "acabou"):**

- O agente gera `docs/qa/ACEITE.md` com o link de cada página, uma captura de cada uma e a lista `[CONFIRMAR]`.
- O dono navega pelo site no celular e no computador e responde no chat o que quer mudar. O agente ajusta e repete.
- Acaba quando o dono escreve "aprovado".

**Monitoramento (depois do ar, gratuito):**

| O quê                 | Ferramenta                     | Custo                    | Montagem                                                                    |
| --------------------- | ------------------------------ | ------------------------ | --------------------------------------------------------------------------- |
| Velocidade real       | Vercel Speed Insights          | grátis (Hobby, limitado) | `vercel project speed-insights` + `@vercel/speed-insights`                  |
| Visitas (sem cookies) | Vercel Web Analytics           | grátis (Hobby, limitado) | `vercel project web-analytics` + `@vercel/analytics`, só após consentimento |
| Erros em produção     | Sentry (SDK já está no código) | grátis (Developer)       | 🔑 integração Sentry pela Vercel → `SENTRY_DSN`                             |
| Site fora do ar       | UptimeRobot (ou Better Stack)  | grátis                   | 🔑 conta + monitor em `/next/health` a cada 5 min, alerta por e-mail        |
| Dependências          | Renovate (já configurado)      | grátis                   | PRs mensais agrupados; o CI decide                                          |
| Regressão contínua    | pos-deploy.yml (camada 3)      | grátis                   | já descrito                                                                 |

## Definição de pronto (do site inteiro)

- 0 problemas P0/P1 do RELATORIO-COMPLETO.
- Camadas 1–3 verdes no último commit.
- Camada 4: 10 jornadas de visitante e 8 de editor ok, com capturas.
- Metas de performance e acessibilidade atingidas no ar.
- Aceite do dono.
