# Runbook — deploy, rollback e incidentes

Atalhos (no servidor, como `deploy`, em `/srv/apps/quarau`):

| Tarefa               | Comando                                                                                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deploy de uma versão | `scripts/deploy.sh <sha>` (normalmente automático pelo CI)                                                                                                  |
| **Rollback**         | `scripts/rollback.sh` (versão anterior) ou `scripts/rollback.sh <sha>`                                                                                      |
| Status               | `docker compose ps` · `tail releases.log`                                                                                                                   |
| Logs da aplicação    | `docker compose logs -f --tail 200 web`                                                                                                                     |
| Backup agora         | `sudo scripts/backup.sh`                                                                                                                                    |
| Teste de restore     | `sudo scripts/restore-test.sh`                                                                                                                              |
| Restore real         | `sudo scripts/restore.sh latest --yes`                                                                                                                      |
| Limpar cache do site | `docker compose exec web sh -c 'curl -fsS -X POST -H "authorization: Bearer $REVALIDATE_SECRET" -d "{\"all\":true}" http://127.0.0.1:3000/next/revalidate'` |
| Reindexar a busca    | idem com `/next/reindex`                                                                                                                                    |

Todas também estão no GitHub: **Actions → VPS operations** (rollback, backup, restore-test, status).

## Como o deploy funciona (zero downtime)

1. O CI constrói a imagem, roda todos os testes contra ela e publica `ghcr.io/vhonorato02/quarau-web:<sha>`.
2. O job _Deploy_ envia o compose/scripts, garante o `.env` e chama `deploy.sh <sha>`.
3. `deploy.sh` sobe **uma segunda réplica** com a versão nova. Ela aplica as migrações do banco no boot
   (`prodMigrations`) e só fica _healthy_ quando `/next/health` responde com o banco ok.
4. O Traefik passa a balancear entre as duas. A antiga é **drenada**: seu `/next/health` passa a responder 503, o
   health check do Traefik (a cada 5 s) a tira do balanceamento e só então ela é parada (30 s para encerrar
   conexões).
5. Se o healthcheck falhar em até 5 minutos, a réplica nova é removida e **a antiga continua no ar**; o job falha e
   um alerta é enviado.
6. O cache das páginas é aquecido a partir do sitemap.

`SKIP_PULL=1 scripts/deploy.sh <tag>` usa uma imagem já presente no servidor (sem acessar o GHCR).

**Regra para migrações:** sempre aditivas (nova coluna/tabela, nunca renomear/remover na mesma versão), porque as
duas versões convivem por alguns segundos. Remoções vão num deploy seguinte.

### Validação (simulação local da VPS, 2026-10-05)

Traefik 3.6 numa rede `coolify`, stack de produção completa e os scripts reais:

- deploy sob carga: **0 falhas em 1.338 requisições** (página e health);
- versão quebrada: rejeitada em 5 s, versão anterior seguiu servindo;
- `rollback.sh`: voltou para a tag anterior sem downtime;
- `backup.sh` + cópia off-site, `restore-test.sh` (contagens e mídias conferidas) e `restore.sh` real
  (banco e MinIO restaurados, busca reindexada);
- `healthwatch.sh`: alerta único por problema e aviso de normalização.

## Rollback

- Código: `scripts/rollback.sh` volta para a tag anterior em `releases.log` (mesmo fluxo sem downtime).
- Banco: rollbacks de código não desfazem migrações. Se uma migração causou dano, restaure o backup
  (`restore.sh`), que guarda antes um dump de segurança do estado atual.

## Incidentes comuns

| Sintoma                      | Verificar / agir                                                                                                                                            |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Site fora (502/504)          | `docker compose ps`; `docker compose logs web`; se a imagem nova falhou → `rollback.sh`                                                                     |
| `/next/health` = 503 (banco) | `docker compose ps postgres pgbouncer`; `docker compose restart pgbouncer`; disco cheio?                                                                    |
| Disco > 85%                  | `docker system df`; `docker image prune -af --filter until=168h`; `du -sh /srv/backups/quarau`; `docker system prune -f` (nunca pare containers do Coolify) |
| Imagens não carregam         | `docker compose ps minio`; bucket existe? (é criado no boot do web)                                                                                         |
| Busca vazia                  | `/next/reindex` (ver tabela acima)                                                                                                                          |
| Formulário não envia e-mail  | SMTP no `.env`; as mensagens continuam salvas em _Contatos recebidos_                                                                                       |
| Certificado HTTPS            | `docker logs coolify-proxy --tail 100 \| grep -i acme`; DNS aponta para 177.107.94.44?                                                                      |
| Publicação não aparece       | Confira se foi publicada (não só rascunho); limpe o cache do site                                                                                           |

## Atualizar dependências / Payload

1. Renovate abre o PR; o CI roda todos os testes.
2. Se mudar o schema: `pnpm --filter @quarau/web migrate:create <nome>` e commit da migração.
3. Merge na `main` → deploy automático.
