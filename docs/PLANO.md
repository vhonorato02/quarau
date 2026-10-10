# Plano de execução — site Quarau, do PC cru ao domínio no ar

> Diagnóstico: [RELATORIO-COMPLETO.md](RELATORIO-COMPLETO.md) · Arquitetura: [ADR 0015](decisions/0015-homologacao-vercel-producao-vps.md)
> · QA: [QA.md](QA.md) · Estado: [PROGRESSO.md](PROGRESSO.md) · Sessões: [plano/](plano/)

## Meta

Um site institucional à altura de uma empresa grande:

- **cada texto** escrito com cuidado e **editável no painel**;
- design próprio e fotográfico;
- CMS que o gestor da Quarau usa sozinho;
- SEO e LinkedIn prontos;
- testado como usuário de verdade.

Aprovado na Vercel e, depois do aceite, publicado na VPS com o domínio `quarau.com.br`, sem semanas de depuração.

## Como o trabalho é executado (leia antes de qualquer sessão)

### Uma sessão = uma janela de cota

O trabalho está dividido em **15 sessões** (S00–S14). Cada uma cabe numa janela de uso do Claude (≈ 2–4 h de trabalho do agente) e termina num estado estável: commit + push + PROGRESSO atualizado.

1. **Começo de sessão:** `/clear` (contexto limpo, mais barato e mais preciso) → o dono cola o prompt "continuar" do [PROMPT.md](../PROMPT.md).
2. **O agente lê só três coisas:**
   - `CLAUDE.md` (carregado sozinho);
   - `docs/PROGRESSO.md` (onde parou);
   - o arquivo da sessão em `docs/plano/`.
   - Nada de reler o relatório inteiro ou o plano inteiro.
3. **Durante a sessão:** commits pequenos a cada item verde; `/compact` quando o contexto passar de ~60%.
4. **Fim de sessão** (ou cota acabando — veja `/usage`):
   - parar num ponto estável;
   - preencher "Retomar em" no PROGRESSO, com arquivo, próximo passo e comando;
   - commit + push.
   - O hook `handoff-guard` bloqueia a parada se houver mudança sem PROGRESSO atualizado.

### Modelo certo para cada trabalho (economiza cota sem perder qualidade)

| Trabalho                                                        | Modelo (`/model`)                         |
| --------------------------------------------------------------- | ----------------------------------------- |
| Arquitetura, copy, design/UX, revisão crítica, decisões         | `opus`                                    |
| Refatoração mecânica, testes, scripts, infra, correções guiadas | `sonnet`                                  |
| Sessões que planejam e depois executam muito código             | `opusplan` (Opus planeja, Sonnet executa) |

Cada arquivo de sessão diz qual usar.

### Subagentes: poucos, em série, para proteger o contexto

Ficam em `.claude/agents/`. Rodam um de cada vez (nunca em paralelo) e devolvem um resumo curto:

- `qa-visual`: roda as capturas, olha as folhas-resumo e devolve a lista de problemas;
- `testador-persona`: usa o site como uma persona, pelo Playwright MCP, e devolve atritos;
- `revisor-copy`: revisa textos contra o guia de voz e devolve correções linha a linha;
- `auditor-seo`: confere títulos, descrições, JSON-LD, sitemap e OG de cada URL.

O agente principal decide e corrige; os subagentes só verificam.

### Higiene de tokens (regras fixas)

- **Nunca abrir:** `pnpm-lock.yaml`, `src/payload-types.ts`, `src/migrations/*.json`, `content/legacy/**/wp-json/*.json`, capturas soltas. Use `grep -n` / `sed -n 'a,bp'` e os resumos (`RELATORIO.md`, `COBERTURA.md`, `paginas/*.md`, folhas `folha-*.jpg`).
- **Comandos longos com saída curta:** `--reporter=line`, `| tail -40`. Erro grande se resume, não se cola.
- **Imagens:** primeiro as folhas-resumo (1 por página). A captura cheia só onde houver suspeita.
- **Builds e servidores** rodam em segundo plano; o agente lê só o fim do log.

### 🔑 Momentos do dono (tudo o que depende de você, com o tempo estimado)

| Sessão | O quê                                                                                                          | Tempo                     |
| ------ | -------------------------------------------------------------------------------------------------------------- | ------------------------- |
| antes  | Instalar Git + Claude Code, extrair o zip, abrir (PROMPT.md)                                                   | 10 min                    |
| S00    | Clicar "Sim" nas janelas do Windows; `gh auth login` (código no navegador)                                     | 5 min                     |
| S01    | `vercel login` (navegador); aceitar os termos do Neon se a CLI pedir; `/mcp` → vercel → Authenticate           | 5 min                     |
| S04    | Nome e e-mail do **gestor** da Quarau (para o convite de acesso ao painel)                                     | 1 min                     |
| S05    | Baixar as exportações do Instagram e do LinkedIn (ver `content/social/README.md`)                              | 10 min + espera do e-mail |
| S06    | Ler e aprovar o pacote de textos (`docs/copy/APROVACAO.md`), num lote só                                       | 30–60 min                 |
| S06    | Opcional: criar a chave da Resend e colar no painel da Vercel                                                  | 5 min                     |
| S11    | Aceite do site em homologação (navegar no celular e no computador; responder "aprovado" ou a lista de ajustes) | 30 min                    |
| S12    | Acesso SSH da VPS a partir do PC (gerar chave e colar a pública no console do provedor)                        | 10 min                    |
| S13    | Acesso ao DNS do domínio (registro.br ou onde estiver); Google Search Console; página da empresa no LinkedIn   | 30 min                    |
| S14    | Opcional: contas UptimeRobot e Sentry                                                                          | 10 min                    |

Fora desses momentos o agente não pergunta. Decide pelo plano e registra a decisão no PROGRESSO.

## Sessões

| #   | Sessão                                                       | Modelo   | Resultado verificável                                                                                              |
| --- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| S00 | [PC pronto](plano/S00-pc.md)                                 | sonnet   | Node/pnpm/CLIs, dependências, Chromium, MCPs conectados, testes verdes                                             |
| S01 | [Contas, banco e variáveis](plano/S01-contas-dados.md)       | sonnet   | Neon prod+dev criados, `.env.local`, migrações no dev, admin local abre                                            |
| S02 | [Fundação técnica](plano/S02-fundacao.md)                    | opusplan | Stack enxuta, i18n fora, imagens sem processamento no servidor, CI novo verde, imagem Docker testada               |
| S03 | [Tudo editável no CMS](plano/S03-tudo-editavel.md)           | opus     | Nenhum texto visível fora do CMS (lint garante); páginas de listagem e e-mails editáveis                           |
| S04 | [Painel de verdade + gestor](plano/S04-painel-gestor.md)     | opusplan | Papéis, convite por e-mail, segurança de login, painel com contadores, ajuda, gestor convidado                     |
| S05 | [Conteúdo completo](plano/S05-conteudo.md)                   | sonnet   | Todas as mídias, posts das redes como rascunhos, logos, seções vazias tratadas                                     |
| S06 | [Copy e SEO editorial](plano/S06-copy-seo.md)                | opus     | Guia de voz, pesquisa de palavras-chave, pacote de textos aprovado pelo dono e carregado no CMS                    |
| S07 | [Design system e direção visual](plano/S07-design-system.md) | opus     | Tokens, tipografia, grade, componentes e página `/_ds` com todos os estados, testada visualmente                   |
| S08 | [Páginas](plano/S08-paginas.md)                              | opusplan | Todas as páginas refeitas pelas especificações, sem os defeitos do diagnóstico, dentro do orçamento de performance |
| S09 | [Testes fullstack](plano/S09-testes.md)                      | sonnet   | Pirâmide completa (papéis × coleções, API, E2E em 5 navegadores, visual, a11y, SEO, segurança, carga com 512 MB)   |
| S10 | [SEO técnico, LinkedIn e redes](plano/S10-seo-linkedin.md)   | opus     | JSON-LD, sitemap, OG, llms.txt, kit da página da empresa no LinkedIn, posts de lançamento                          |
| S11 | [Homologação e aceite](plano/S11-homologacao.md)             | sonnet   | Site no ar na Vercel com conteúdo real, QA das 5 camadas limpo, personas ok, aceite do dono                        |
| S12 | [VPS engatilhada](plano/S12-vps.md)                          | sonnet   | VPS auditada, plataforma ok, ensaio geral no subdomínio com carga, runbook de corte pronto                         |
| S13 | [Go-live](plano/S13-go-live.md) (só após aceite)             | sonnet   | Domínio na VPS, HTTPS, 301, Search Console, e-mail do domínio, LinkedIn atualizado                                 |
| S14 | [Operação e passagem](plano/S14-operacao.md)                 | sonnet   | Monitoramento, backups conferidos, manual e vídeos para o gestor, rotina de manutenção                             |

**Ordem e dependências:**

- S00→S01→S02 são obrigatórias nessa ordem.
- S03, S04 e S05 podem trocar de ordem entre si.
- S06 precisa do S05 (fatos completos).
- S07→S08.
- S09 roda depois de S08, mas cada sessão anterior já entrega os testes do que mexeu.
- S11 só com S03–S10 prontas. S12 pode ser feita em paralelo à espera do aceite. S13 só depois do "aprovado".

## Princípios (valem para todas as sessões)

1. **Fatias verticais com teste:** cada mudança entra com o teste que a prova, e o CI fica verde a cada push. Nada de "big bang" no fim.
2. **Uma branch (`main`), um agente.** Push na `main` = homologação atualizada.
3. **Fonte única da verdade:**
   - fatos vêm do site antigo (`content/legacy/scrape/`), das redes (`content/social/`) ou do dono;
   - o que faltar vira `[CONFIRMAR]` e **fica oculto no site**. Nunca inventar número, cliente, ano ou cargo.
4. **Pronto = provado no ar:** capturas e jornadas em `quarau.vercel.app` (S11) e no subdomínio da VPS (S12).
5. **Simples antes de esperto:** nada de dependência nova sem necessidade. O que é removido (3D, GSAP, Lenis, Meilisearch, Valkey) não volta.
