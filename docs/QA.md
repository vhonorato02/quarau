# QA — como o site Quarau é testado (de verdade)

> **Regra:** nada é "pronto" porque passou no computador do agente. É pronto quando passou nas camadas abaixo, **com prova**: capturas, números e links em `docs/qa/<data>/`.
> A S09 implementa o que falta; cada sessão anterior já entrega os testes do que mexeu.

## A pirâmide

| #   | Camada                     | Ferramenta                                                            | Quando roda                           | Bloqueia?           |
| --- | -------------------------- | --------------------------------------------------------------------- | ------------------------------------- | ------------------- |
| 1   | Estático                   | TypeScript strict, ESLint (+ `jsx-no-literals`, `jsx-a11y`), Prettier | antes de cada commit + CI             | sim                 |
| 2   | Unitário                   | Vitest                                                                | antes de cada commit + CI             | sim                 |
| 3   | Integração (backend real)  | Vitest + Local API do Payload + Postgres                              | CI (serviço Postgres)                 | sim                 |
| 4   | API e segurança de acesso  | Vitest + `fetch` contra o servidor                                    | CI                                    | sim                 |
| 5   | E2E (usuário automatizado) | Playwright, **5 navegadores/telas**                                   | CI no contêiner de produção           | sim                 |
| 6   | Visual                     | Playwright `toHaveScreenshot` (páginas + `/_ds`)                      | CI                                    | sim                 |
| 7   | Acessibilidade             | axe + teclado + `aria` snapshots + zoom 200%                          | CI                                    | sim                 |
| 8   | SEO                        | testes próprios sobre o HTML e o sitemap                              | CI + pós-deploy                       | sim                 |
| 9   | Conteúdo                   | `copy-check` (LanguageTool + regras)                                  | S06 e antes do aceite                 | sim                 |
| 10  | Performance                | Lighthouse CI (orçamento), tamanho de JS, k6 com 512 MB               | CI (k6, JS) + pós-deploy (Lighthouse) | sim                 |
| 11  | Segurança                  | ZAP baseline, Trivy, `pnpm audit --prod`, gitleaks, CodeQL            | CI                                    | altas/críticas: sim |
| 12  | Resiliência                | E2E com falhas injetadas                                              | CI                                    | sim                 |
| 13  | **Usuários simulados**     | subagente `testador-persona` + Playwright MCP                         | S08, S11, S12                         | sim (P0/P1)         |
| 14  | Caos de interface          | gremlins.js injetado por 60 s em cada página                          | CI (semanal) + S11                    | sim (erro de JS)    |
| 15  | Aceite humano              | dono e gestor no celular e no computador                              | S11                                   | sim                 |
| 16  | Monitoramento              | smoke agendado, uptime, Sentry, Speed Insights                        | depois do ar                          | alerta              |

## O que cada camada cobre

### 3–4. Backend de verdade (integração e API)

- **Matriz papel × coleção × operação:** anônimo, autor, editor, gestor, admin × todas as coleções e globais × ler/criar/editar/publicar/excluir. A matriz é gerada a partir de uma tabela de expectativas; nada de teste escrito à mão para cada caso.
- **Rascunho → publicação → versão → restauração.**
- **Agendamento:** criar com data futura → rodar o job → publicado.
- **Revalidação:** salvar dispara as tags certas (`next/cache` simulado).
- **Busca:** normalização sem acento; resultados só de publicados.
- **Formulário:** grava o contato com hash do IP; e-mails renderizados com os textos do CMS; limite por IP devolve 429; honeypot.
- **Convite e senha:** cria usuário sem senha → token → define senha → login; bloqueio na 6ª tentativa.
- **Importações:** `migrate:wp` e `import-news` idempotentes (rodar duas vezes = mesmo estado).
- **API pública** (REST/GraphQL) sem vazamento:
  - anônimo não lista usuários, contatos nem rascunhos;
  - campos internos (`ipHash`, `source`) não saem;
  - CSRF exige `Origin`;
  - `/api/payload-jobs/run` exige `CRON_SECRET`;
  - `/next/revalidate` exige segredo.
- **Migrações:** banco vazio → `migrate` → seed → `migrate` de novo (sem mudanças).

### 5. E2E — o usuário automatizado

Projetos do Playwright, todos rodando contra o **contêiner de produção** no CI:

| Projeto          | Motor              | Tela     |
| ---------------- | ------------------ | -------- |
| `desktop-chrome` | Chromium           | 1440×900 |
| `desktop-safari` | WebKit             | 1440×900 |
| `iphone`         | WebKit (iPhone 14) | 390×844  |
| `android`        | Chromium (Pixel 7) | 412×915  |
| `tablet`         | WebKit (iPad Mini) | 768×1024 |

**Jornadas** (mesmas das personas, automatizadas):

- **Visitante:**
  - V1: home → projeto → galeria → contato enviado;
  - V2: projetos → filtrar → case → próximo;
  - V3: área → projetos da área → contato;
  - V4: sobre → parceiros;
  - V5: busca sem acento;
  - V6: URL antiga → 301;
  - V7: só teclado;
  - V8: rede lenta;
  - V9: cookies;
  - V10: 404.
- **Editor:**
  - E1: login;
  - E2: criar projeto com upload, publicar e ver no site;
  - E3: reordenar blocos da home;
  - E4: trocar item do menu;
  - E5: corrigir alt;
  - E6: agendar;
  - E7: tratar contato;
  - E8: restaurar versão;
  - E9: editar um texto do global e ver no site;
  - E10: convidar um editor.
- **Larguras extras** só para layout: 320, 1024 e 1920. Asserta que não há rolagem horizontal nem sobreposição (bounding boxes de header, hero, CTA e banner de cookies).

### 6–7. Visual e acessibilidade

- **Visual:** snapshots de cada página e da `/_ds` em 390 e 1440, com máscara em conteúdo dinâmico (datas).
- **Acessibilidade:**
  - axe em cada página **e em cada estado** (menu aberto, lightbox aberto, formulário com erro, banner de cookies);
  - foco visível e ordem de tabulação;
  - sem armadilha de foco;
  - `prefers-reduced-motion`;
  - zoom de 200% sem perda;
  - alvos ≥ 44 px no celular.

### 8. SEO (automatizado)

Para cada URL do sitemap:

- 200;
- `<title>` único ≤ 60;
- description 120–160;
- 1 H1;
- canonical absoluto;
- OG com imagem de 1200×630 acessível;
- JSON-LD válido (parse + campos obrigatórios por tipo);
- sem `noindex` quando `SITE_NOINDEX=false`.

Também:

- **Sitemap:** só publicados, com `lastmod`.
- **robots:** conforme o ambiente.
- **301:** todos os redirects de `content/legacy/url-map.json`.
- **Links internos:** sem 404 (linkinator).

### 9. Conteúdo

`scripts/qa/copy-check.ts` passa por **todos** os textos publicados no CMS:

- LanguageTool pt-BR (gramática e ortografia);
- sem `[CONFIRMAR]`, `Lorem` ou `TODO` publicados;
- alt em 100% das imagens;
- tamanho de títulos e descrições;
- siglas explicadas;
- imagem exibida maior que o original → alerta.

### 10. Performance e capacidade (a VPS é fraca e compartilhada)

- **Lighthouse CI** no pós-deploy, mobile, mediana de 3: Performance ≥ 90, Acessibilidade 100, Boas práticas ≥ 95, LCP ≤ 2,5 s, CLS ≤ 0,05, TBT ≤ 200 ms.
- **JS inicial da home** ≤ 120 KB gzip (lido do build; falha o CI se passar).
- **k6 no contêiner com `--memory=512m --cpus=1`:**
  - 30 req/s por 2 min nas páginas principais: p95 ≤ 400 ms, 0 erros, memória do contêiner < 400 MB;
  - pico de 60 req/s por 30 s sem queda.
  - Repetido na VPS real no ensaio geral (S12).

### 11. Segurança

- **ZAP baseline** contra o contêiner (`zaproxy/action-baseline`): sem alertas altos.
- **Trivy** na imagem.
- **`pnpm audit --prod`:** sem alta/crítica.
- **gitleaks** no repositório.
- **CodeQL.**
- **Cabeçalhos** (CSP, HSTS, X-Frame-Options, Referrer-Policy) conferidos por teste.

### 12. Resiliência

- **Banco fora:** página de erro humana, `/next/health` 503 e sem vazamento de stack.
- **E-mail fora:** o contato é salvo mesmo assim e o painel avisa.
- **CDN de mídia lento:** layout não pula (dimensões reservadas).
- **Job falhando:** é registrado e não derruba o site.

### 13. Usuários simulados — o QA que pega o que ninguém previu

O subagente `testador-persona` recebe uma persona e um objetivo. Ele usa o site **pelo Playwright MCP**: lê a tela, decide, clica e preenche, pensando em voz alta. Devolve:

- se conseguiu e em quantos passos;
- onde hesitou;
- o que estava confuso;
- erros de console;
- capturas.

Nota de facilidade de 1 a 5.

**Personas (visitante):**

1. **Gerente de investimento social de uma empresa de energia:** quer saber se a Quarau já fez edital e monitoramento para empresa parecida. Tem 3 minutos, está no celular.
2. **Coordenadora de cultura de uma prefeitura do Vale do Paraíba:** precisa de inventário cultural / dossiê de registro e quer ver um case e falar com alguém.
3. **Diretora de uma ONG:** quer entender se a Quarau ajuda a escrever projeto para edital e quanto envolve.
4. **Jornalista:** procura dados de impacto de um projeto específico para uma matéria.
5. **Pessoa com baixa visão:** usa zoom de 200% e teclado.

**Personas (painel):**

6. **Gestor da Quarau, sem conhecimento técnico:** publicar a notícia de um evento com 3 fotos e ligar a um projeto.
7. **Estagiária com papel Autor:** criar rascunho de projeto e mandar para revisão.
8. **Gestor:** trocar o texto do botão do topo e o e-mail de confirmação do formulário.

**Critério:** todas concluem; nenhuma hesitação classificada como P0/P1 sem correção; nota média ≥ 4.

### 14. Caos de interface

gremlins.js injetado por 60 s em cada página (cliques, toques, digitação e rolagem aleatórios), em desktop e celular. Qualquer erro de JS no console reprova.

### 15. Aceite humano (S11)

`docs/qa/ACEITE.md` traz:

- o link de cada página e uma captura;
- o roteiro de 10 minutos para o dono e o gestor (o que testar no celular);
- a lista `[CONFIRMAR]`.

O agente ajusta até o "aprovado".

### 16. Depois do ar

- **Smoke agendado:** GitHub Actions a cada 6 h contra o domínio (rotas principais, formulário em modo teste, mídia do CDN).
- **UptimeRobot** em `/next/health` a cada 5 min.
- **Sentry** para erros.
- **Speed Insights** para Core Web Vitals reais.

## Definição de pronto (do site inteiro)

- Camadas 1–12 verdes no último commit.
- 13–14 sem P0/P1.
- 15 com "aprovado".
- 16 montada no go-live.
- Evidências em `docs/qa/<data>/`.
