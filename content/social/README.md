# Posts das redes sociais → notícias do site

O Instagram (`@quarau.consultoria`) e o LinkedIn da Quarau já têm posts que podem virar notícias. As duas redes
bloqueiam leitura automática sem login (verificado em 2026-10-10: Instagram responde `require_login`, LinkedIn
redireciona para a tela de cadastro). Não contornamos isso: usamos a **exportação oficial de dados**, que traz
todos os posts com texto integral, data e fotos/vídeos em resolução original.

## 🔑 O dono baixa as exportações (uma vez, ~5 min + espera do e-mail)

**Instagram** (conta `quarau.consultoria`):

1. Instagram → menu ☰ → **Central de Contas** → **Suas informações e permissões** → **Baixar suas informações**.
2. **Baixar ou transferir informações** → selecione a conta da Quarau → **Algumas das suas informações** →
   marque só **Conteúdo** (publicações, reels, stories) → **Baixar no dispositivo**.
3. Período **Desde o início**, formato **JSON**, qualidade da mídia **Alta** → **Criar arquivos**.
4. Chega um e-mail (minutos a horas) com o link do `.zip`.

**LinkedIn** (perfil que publica como Quarau):

1. LinkedIn → foto → **Configurações e privacidade** → **Privacidade de dados** → **Obter uma cópia dos seus dados**.
2. Marque **Compartilhamentos** (Shares) — ou o pacote completo → **Solicitar arquivo**.
3. Chega por e-mail (até 24 h) um `.zip` com `Shares.csv`.

Extraia os dois `.zip` dentro de `content/social/entrada/` (essa pasta **nunca** vai para o git: as exportações
também têm mensagens e dados pessoais).

## O agente processa

```bash
pnpm --filter @quarau/web social:parse
```

Gera `content/social/posts.json` (posts normalizados) e `content/social/POSTS.md` (lista para revisão: tipo
sugerido — notícia, nota curta ou descartar —, título, projetos citados, repetidos entre redes) e copia as mídias
para `apps/web/.migrate-cache/social/`.

Depois, na sessão de conteúdo do plano: cada candidato vira **rascunho** de notícia reescrito como matéria (só com
os fatos do post), com capa, galeria, projeto relacionado e o link do post original; o gestor revisa e publica.
