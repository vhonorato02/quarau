# Relatório final — novo site da Quarau

> Estado em **2026-10-05**. Para o passo a passo operacional, ver [infra.md](infra.md) e [runbook.md](runbook.md).

## 1. Resumo

O site institucional da Quarau foi reconstruído do zero: Next.js 16 com Payload CMS 3 embutido, design system
próprio fiel à marca e foco no **portfólio de projetos**, que agora tem páginas de case completas e é fácil de
alimentar. Todo o conteúdo do quarau.com.br foi migrado por um script idempotente, com copy revisado. Há CI/CD
completo (qualidade, integração, E2E com acessibilidade, Lighthouse, links, carga e segurança) e scripts de
infraestrutura prontos para a VPS (deploy sem downtime, rollback, backups com teste de restore, hardening).

**Pendência para estar no ar:** o ambiente em que o projeto foi construído não tem saída SSH, então a primeira
instalação na VPS depende de você cadastrar o secret `VPS_SSH_KEY` no GitHub (2 minutos, ver §6). A partir daí
tudo roda pelos workflows: bootstrap, deploy, migração de conteúdo e criação do admin.

## 2. O que foi feito

### Conteúdo e marca

- **Scraping completo** (HTML, sitemaps Yoast, `wp-json` aberto): 3 páginas, 6 projetos, 275 mídias, menus,
  contatos, redes, metadados e mapa de URLs antigas. Inventário em [inventario.md](inventario.md); snapshot bruto em
  `content/legacy/`.
- **Marca** ([brand.md](brand.md)): logo vetorizado com fidelidade a partir dos originais (símbolo, logotipo colorido
  e versões negativas; a assinatura foi reconstruída com os contornos reais da Barlow), favicons e ícones; cores
  exatas do CSS (`#0089CF`, `#39B54A`) e tipografia (Barlow, self-hosted) como tokens primários.
- **Copy** reescrito em PT-BR institucional a partir **apenas** do que o site publicava, com números e atribuições
  conferidos (ex.: a certificação de Tecnologia Social é do CECP, não da Quarau).

### Site

- Home com **hero imersivo**: o símbolo oficial extrudado em 3D (React Three Fiber), com fallback SVG em mobile,
  sem WebGL ou com movimento reduzido; manifesto revelado na rolagem; indicadores com contagem animada;
  portfólio editorial; áreas de atuação; “Como trabalhamos”; parceiros.
- **Portfólio:** listagem com filtros por área e grid editorial; página de **case** com capa em tela cheia,
  ficha técnica, resultados em números, texto, citação, capítulos livres, vídeo (carregado no clique), ODS,
  galeria com lightbox acessível, publicações e “próximo projeto”.
- Páginas: Sobre, Atuação (lista + 4 áreas), Contato (formulário), Privacidade (LGPD), Notícias, Trabalhe conosco,
  Busca (Meilisearch), 404 e 500 personalizadas.
- Movimento: View Transitions entre páginas, Lenis + GSAP só em desktop, reveals leves; tudo respeita
  `prefers-reduced-motion`.
- **SEO:** metadata completa, canonical, Open Graph com imagem por página e OG dinâmica com a marca, JSON-LD
  (Organization/ProfessionalService, BreadcrumbList, CreativeWork, Article, Service, FAQPage, JobPosting),
  sitemap e robots dinâmicos, **301 de todas as URLs antigas** (incluindo `/wp-content/uploads/*`).
- **LGPD:** banner de consentimento; analytics (Umami, sem cookies) só após aceite; formulário com consentimento
  explícito e IP armazenado apenas como hash.
- **i18n:** next-intl + localização do Payload prontos para EN/ES (desligados até a tradução).

### CMS (Payload)

- Coleções: Páginas (page builder com 19 blocos), Áreas de atuação, **Projetos**, Notícias, Vagas, Equipe,
  Parceiros, Mídias, Documentos, Contatos recebidos e Usuários. Globais: Menu, Rodapé, Contato, Redes, SEO.
- Rascunho, autosave, **live preview** (celular/tablet/desktop), **versões com restauração**, **publicação agendada**.
- Papéis: administrador, editor e autor (o autor não publica). Alt text obrigatório. SEO com pré-visualização.
- Painel com a marca da Quarau, em português, com boas-vindas e dicas. Guia completo em [cms.md](cms.md).
- Publicar invalida o cache na hora e atualiza a busca e o sitemap.

### Qualidade (resultados locais)

| Suite                                                                                                      | Resultado                                                                       |
| ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| ESLint + Prettier + typecheck (strict)                                                                     | ok                                                                              |
| Vitest (UI, e-mails, web)                                                                                  | 30 testes ok                                                                    |
| Integração Payload (Postgres + Meilisearch)                                                                | 8 testes ok                                                                     |
| Playwright E2E desktop + mobile (rotas, 301, navegação, formulário, busca, edição no CMS, axe WCAG 2.2 AA) | **90 testes ok**                                                                |
| Lighthouse mobile (lab, máquina de build)                                                                  | Acessibilidade 100 · Boas práticas 96–100 · SEO 100 · Performance 83–94 · CLS 0 |

O CI repete tudo isso na imagem Docker de produção e bloqueia o deploy se falhar. A meta de Performance ≥ 95 ainda
não é atingida de forma estável no laboratório (83–94 nas páginas principais, com variação de ±5 entre execuções).
O que resta é o JavaScript do próprio React/Next.js (~115 KB comprimidos) disputando banda com a primeira pintura na
simulação de 4G lento; o código do site em si já foi enxugado (galeria, preview do CMS, menu mobile e animações
carregam sob demanda). O CI exige ≥ 80 e registra LCP/TBT como alerta. Próximo passo: medir em produção (dados reais
de campo) antes de otimizações mais invasivas. Um experimento com `Suspense` por bloco reduziu o TBT, mas causou
deslocamento de layout (CLS) e foi descartado.

### Infraestrutura

- Imagem Docker multi-stage (standalone, usuário não-root, healthcheck, migrações no boot), publicada no GHCR.
- Stack de produção: Postgres 17 + pgBouncer, Valkey, MinIO, Meilisearch, Umami e Uptime Kuma (opcionais), com
  limites de memória e rotação de logs, atrás do Traefik do Coolify (HTTPS automático).
- Deploy **sem downtime** (réplica nova → healthcheck → troca) e **rollback em um comando**.
- Backups diários com restic (Postgres + mídias + `.env`), retenção 7/4/6, cópia off-site configurável e
  **teste de restore semanal automático**.
- Hardening: usuário `deploy`, fail2ban (22322), UFW (22322 liberada antes de ativar), atualizações automáticas,
  swap, sysctl e alertas por webhook.
- Imagem de produção sem vulnerabilidades altas/críticas corrigíveis (Trivy): pacotes do Debian atualizados, sem
  npm/corepack no runtime; dependências transitivas com falhas conhecidas fixadas (undici, nodemailer, dompurify).

**Validação numa VPS simulada** (Traefik 3.6 na rede `coolify`, stack completa, scripts reais):
deploy sob carga com **0 falhas em 1.338 requisições**; versão quebrada rejeitada com a anterior no ar; rollback;
backup + cópia off-site; teste de restore; restore real (banco + mídias); alertas do healthwatch. Essa rodada
encontrou e corrigiu 5 defeitos que só apareceriam em produção (ver histórico de commits `fix(infra)`), além de um
no CMS: a primeira conta criada pelo `/admin` agora é sempre administradora.

## 3. Decisões tomadas (ADRs)

| ADR                                                  | Decisão                                                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| [0001](decisions/0001-monorepo-pnpm-turborepo.md)    | Monorepo pnpm + Turborepo; TypeScript 6 (o TS 7 ainda não é suportado pelo ecossistema) |
| [0002](decisions/0002-nextjs-payload.md)             | Next.js 16.3 + Payload 3.90; migrações versionadas aplicadas no boot                    |
| [0003](decisions/0003-renderizacao-isr.md)           | ISR sob demanda com tags (build sem banco), em vez de PPR/Cache Components              |
| [0004](decisions/0004-hospedagem-coolify-traefik.md) | Reaproveitar o Traefik do Coolify; deploy por compose via SSH (versionado)              |
| [0005](decisions/0005-imagens-docker.md)             | MinIO pela imagem Chainguard (a MinIO parou de publicar imagens) e `mirror.gcr.io`      |
| [0006](decisions/0006-csp-e-cabecalhos.md)           | CSP sem nonce (para manter ISR), restritiva no resto                                    |
| [0007](decisions/0007-valkey-cache-filas.md)         | Valkey para rate limit; cache local (1 réplica); filas no Payload Jobs                  |
| [0008](decisions/0008-observabilidade.md)            | Sentry SDK opcional (compatível com GlitchTip); GlitchTip fora por falta de RAM         |
| [0009](decisions/0009-cor-azul-acessivel.md)         | Faixas azuis no tom `#006FA8` para cumprir WCAG AA                                      |
| [0010](decisions/0010-acesso-vps-e-segredos.md)      | Operação via GitHub Actions; segredos gerados na VPS; hardening SSH opt-in              |
| [0011](decisions/0011-i18n.md)                       | PT sem prefixo; EN/ES prontos e desligados                                              |
| [0012](decisions/0012-midia-e-videos.md)             | MinIO + Sharp; vídeos reencodados (1,2 GB → 232 MB)                                     |

## 4. Pendências `[CONFIRMAR]`

Itens que **não** puderam ser confirmados no site atual. Nada foi inventado: onde faltava informação, o campo
ficou vazio ou oculto.

1. **Manual de marca / cores oficiais** (Pantone/CMYK). O símbolo usa `#0080C8`/`#3AAA35` e o logotipo/CSS
   usa `#0089CF`/`#39B54A`.
2. **Magano Design, Brand** aparecia na faixa de logos: é cliente ou a agência da marca? (não migrado como parceiro)
3. **Dados cadastrais:** razão social, **CNPJ**, **endereço completo**, ano de fundação (campos prontos no CMS).
4. Os telefones (12) 98281-3669 e (12) 98264-5960 **atendem WhatsApp**?
5. O LinkedIn publicado é um **perfil pessoal** (`/in/quarau-91196b258`): existe uma página de empresa?
6. **Ecomuseu:** a atuação continua após 2023? (exibido “2015–2023”)
7. **Projeto Ecoe Verde:** ainda em andamento? (exibido “2022 — em andamento”, conforme o texto antigo)
8. **Projeto Quipá:** anos de início e fim (não exibidos).
9. Os vídeos `ECOEVERDE_5MIN_LEG_PORT.mp4` e `QUIPA_LEG_PORT.mp4` estavam na biblioteca, mas fora das páginas.
   Foram associados aos projetos Ecoe e Quipá pelo nome do arquivo.
10. **Título exato** do livro do Inventário/IPHAN (o link dizia apenas “Clique aqui e acesse o livro”).
11. Abrangência do Inventário exibida como “Estado de São Paulo” (Congado Paulista e Samba de Bumbo Paulista).
12. **Créditos fotográficos:** apenas “Fabio Bueno” estava identificado (fotos do Museu Vivo). Os demais arquivos
    citam primeiros nomes (Tati, Maria, Ingrid, Gabi, Rosa).
13. **56 de 116 imagens** têm texto alternativo genérico gerado na migração e estão marcadas para revisão no CMS.
14. **Equipe, depoimentos e notícias:** inexistentes no site antigo (as seções aparecem quando houver conteúdo).
15. **Fotos em alta resolução:** o WordPress só guardava até 1600 px. Para telas grandes/4K, envie os originais.
16. ODS do Inventário, do PEP e da Memória Institucional não estavam publicados (ficaram vazios).
17. Coordenadas do mapa de projetos são o centro dos municípios (aproximadas).
18. **Infra/negócio:** destino do backup off-site; provedor SMTP; chaves do Cloudflare Turnstile; onde está hospedado
    o e-mail `contato@` e o DNS (para não afetar MX na virada); quando desligar o WordPress.

## 5. Checklist de go-live

Resumo. O detalhado está em [go-live.md](go-live.md).

1. Resolver os `[CONFIRMAR]` críticos (3, 4, 18) e configurar SMTP, Turnstile, backup off-site e alertas.
2. DNS: `A @ → 177.107.94.44`, `A www → 177.107.94.44` (TTL 300). Não mexer em MX/SPF/DKIM.
3. No `.env` da VPS: `TRAEFIK_RULE` com `quarau.com.br`/`www`, `TRAEFIK_MIDDLEWARES=quarau-headers,quarau-compress`
   (remove basic auth e noindex), `SITE_URL=https://quarau.com.br`, `SITE_NOINDEX=false`; redeploy e limpeza de cache.
4. Verificar HTTPS, robots, redirects 301, formulário e `/admin`.
5. Search Console: propriedade de domínio, envio de `https://quarau.com.br/sitemap.xml`, inspeção das principais URLs.

## 6. Para colocar no ar agora (ação sua, uma única vez)

1. **Gere uma chave dedicada** para o deploy (recomendado, já que a chave atual foi compartilhada em texto):
   `ssh-keygen -t ed25519 -f quarau-deploy -C quarau-deploy`, e adicione `quarau-deploy.pub` em
   `~zewithane/.ssh/authorized_keys` na VPS.
2. GitHub → Settings → Secrets and variables → Actions → **New secret** `VPS_SSH_KEY` com o conteúdo de
   `quarau-deploy` (privada). Opcional: `VPS_KNOWN_HOSTS` com `ssh-keyscan -p 22322 177.107.94.44`.
3. Me avise. Eu disparo, em ordem: `audit` → `bootstrap` → deploy → `migrate-content` → `create-admin`, valido em
   `https://quarau.177-107-94-44.sslip.io` (basic auth em `/srv/apps/quarau/CREDENCIAIS.txt`) e rodo backup + teste de restore.
