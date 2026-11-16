# Runbook — Quarau na VPS (deploy, rollback e incidentes)

O site roda na plataforma **vps-platform 1.0** da VPS zewithane (Caddy de borda + Postgres 17 compartilhado +
comando `site`), descrita no repositório `Z:\Dev\projetos\vps-platform` (`docs/RUNBOOK.md`). Decisão:
[ADR 0022](decisions/0022-homologacao-na-vps.md). Acesso: `ssh zewithane-vps` (porta 22322, usuário `zewithane`).

| Tarefa                   | Comando (na VPS)                                                          |
| ------------------------ | ------------------------------------------------------------------------- |
| Estado de todos os sites | `site lista` · `site saude`                                               |
| Publicar uma versão      | automático no push da `main`; manual: `site deploy quarau <sha completo>` |
| **Rollback**             | `site rollback quarau`                                                    |
| Histórico                | `site versoes quarau`                                                     |
| Logs                     | `site logs quarau 200`                                                    |
| Variáveis/segredos       | `site config quarau` (republica sem downtime)                             |
| Reiniciar (mesma versão) | `site reiniciar quarau`                                                   |
| Banco                    | `site banco quarau`                                                       |
| Backup agora             | `site backup` · teste: `site teste-restauracao`                           |
| Restaurar banco + mídia  | `site restaurar quarau [snapshot]` (pede confirmação)                     |
| Página "em preparação"   | `site manutencao quarau liga` / `desliga`                                 |

Arquivos do site: `/srv/sites/quarau/` (`.env` da plataforma, `app.env` do app, `data/media` com as fotos,
dono 1001). Rota do Caddy: `/srv/platform/caddy/sites/quarau.caddy` (gerada pelo `site`, nunca à mão).

## Como o deploy funciona (zero downtime)

1. Push na `main` → o workflow `CI/CD` roda qualidade, integração, E2E/axe na imagem real (raiz somente
   leitura e as mesmas montagens da plataforma), links, Lighthouse, k6, checagem de log e Trivy, e publica
   `ghcr.io/vhonorato02/quarau:<sha>`.
2. O job **Deploy to the VPS** entra por SSH com a chave dedicada (`DEPLOY_SSH_KEY`; o servidor só aceita
   `deploy <tag>` dessa chave) e chama o deploy.
3. A réplica nova sobe ao lado da atual, aplica as migrações no boot (`prodMigrations`) e só é considerada
   pronta quando `/api/health` responde 200 com o banco ok.
4. O Caddy passa a apontar para a nova; a antiga é desligada. Se a nova não ficar saudável, ela sai e
   **a antiga continua no ar**.
5. O smoke test do job exige que `/api/health` responda com `version` = SHA publicado.

Gerar a chave de novo (revoga a anterior): `site chave-deploy quarau` e gravar a saída nos secrets
`DEPLOY_SSH_KEY` / `DEPLOY_KNOWN_HOSTS` com `gh secret set ... < arquivo` (apagar o arquivo em seguida).

**Regra para migrações:** sempre aditivas (nova coluna/tabela; nunca renomear/remover na mesma versão),
porque as duas versões convivem por alguns segundos. Remoções vão num deploy seguinte.

## Cache

As páginas ficam no cache em memória do Next (`isrFlushToDisk: false`; a raiz do contêiner é somente
leitura). Publicar no painel limpa as páginas afetadas. Limpar tudo à mão:

```bash
ssh zewithane-vps 'docker exec $(docker ps -qf name=quarau-web) sh -c '\''curl -fsS -X POST -H "authorization: Bearer $REVALIDATE_SECRET" -H "content-type: application/json" -d "{\"all\":true}" http://127.0.0.1:3000/next/revalidate'\'''
```

Um reinício (`site reiniciar quarau`) também esvazia o cache.

## Scripts contra o banco da VPS (seed, administrador, importação)

Rodam no notebook, nunca na VPS (sem Node de build lá):

1. Túnel: `ssh -N -L 55432:<ip do contêiner postgres>:5432 zewithane-vps`
   (IP: `ssh zewithane-vps 'docker inspect -f "{{range .NetworkSettings.Networks}}{{.IPAddress}} {{end}}" postgres'`).
2. Um arquivo fora do git com `DATABASE_URL=postgres://quarau:<senha>@127.0.0.1:55432/quarau`, `PAYLOAD_SECRET`
   igual ao do `app.env` e `MEDIA_DIR` local. A senha está em `/srv/sites/quarau/.env` (`DB_PASSWORD`).
3. `set -a; . arquivo; set +a; pnpm --filter @quarau/web seed` (ou `seed:admin`, `migrate:wp`).
4. Fotos novas geradas em `MEDIA_DIR` sobem para `/srv/sites/quarau/data/media` com dono `1001:1001`.

O primeiro administrador sai de `seed:admin` (a tela pública de "criar primeiro usuário" é fechada). A senha
fica só em `ACESSO-ADMIN.txt`, fora do git.

## Incidentes comuns

| Sintoma                     | Verificar / agir                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| Site fora (502/503)         | `site lista`; `site logs quarau`; se a versão nova quebrou → `site rollback quarau`         |
| `/api/health` = 503         | `docker ps` (Postgres `postgres` saudável?); disco cheio? `site saude`                      |
| Disco > 85%                 | `df -h /`; `docker image ls`; `sudo du -sh /srv/backups` (nada de `docker system prune -a`) |
| Imagens não carregam        | `sudo stat -c %u /srv/sites/quarau/data/media` deve ser 1001                                |
| Formulário não envia e-mail | SMTP em `site config quarau`; as mensagens continuam salvas em _Contatos recebidos_         |
| Certificado HTTPS           | `docker logs caddy --tail 100`; o DNS aponta para 177.107.94.31?                            |
| Publicação não aparece      | Foi publicada (não só rascunho)? Limpe o cache (acima)                                      |

## Atualizar dependências / Payload

1. Renovate abre o PR; o CI roda todos os testes.
2. Se mudar o schema: `pnpm --filter @quarau/web migrate:create <nome>` e commit da migração.
3. Merge na `main` → imagem nova → deploy automático na VPS.
