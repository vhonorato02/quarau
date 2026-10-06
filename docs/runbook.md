# Runbook — Quarau na VPS (deploy, rollback e incidentes)

O site roda na plataforma da VPS ([guia](vps-guia.md), [ADR 0013](decisions/0013-plataforma-vps-traefik-sem-painel.md)).
Tudo é feito com o comando `site`, no servidor (`ssh -p 22322 zewithane@177.107.94.31`).

| Tarefa | Comando |
| --- | --- |
| Estado de todos os sites | `site lista` · `site saude` |
| Publicar uma versão | `site deploy quarau <sha>` (sem `<sha>`: a mais nova; com auto-deploy ligado, é automático) |
| **Rollback** | `site rollback quarau` (volta para a anterior e pausa o auto-deploy) |
| Histórico | `site versoes quarau` |
| Logs | `site logs quarau` |
| Variáveis/segredos | `site config quarau` (aplica sem downtime) |
| Banco | `site banco quarau` |
| Backup agora | `site backup` |
| Teste de restore | `sudo /srv/platform/bin/restore-test.sh` |
| Limpar cache do site | `docker exec quarau-web-1 sh -c 'curl -fsS -X POST -H "authorization: Bearer $REVALIDATE_SECRET" -d "{\"all\":true}" http://127.0.0.1:3000/next/revalidate'` |

(Depois de um deploy, o container pode se chamar `quarau-web-2`: veja o nome com `docker ps`.)

## Como o deploy funciona (zero downtime)

1. Push na `main` → o CI roda qualidade, integração, E2E/axe na imagem real, Lighthouse, k6 e Trivy e publica
   `ghcr.io/vhonorato02/quarau-web:<sha>` e `:latest`. O GitHub **não tem acesso** ao servidor.
2. Na VPS, o timer `platform-autodeploy` (a cada 2 min) vê que o `:latest` mudou e chama o deploy com o nome do
   commit (`APP_VERSION` da imagem).
3. A réplica nova sobe ao lado da atual, aplica as migrações no boot (`prodMigrations`) e só fica _healthy_ quando
   `/next/health` responde com o banco ok.
4. A rota do Traefik (`/srv/platform/traefik/dynamic/site-quarau.yml`) passa a apontar só para a nova. A antiga
   recebe `/tmp/quarau-drain`, termina o que estava atendendo e é parada.
5. Se a nova não ficar saudável, ela é removida, **a antiga continua no ar**, chega um alerta e o auto-deploy não
   insiste nessa imagem.

Medido na VPS em 2026-10-06: **0 falhas em 569 requisições** com dois deploys seguidos sob carga.

**Regra para migrações:** sempre aditivas (nova coluna/tabela; nunca renomear/remover na mesma versão), porque
as duas versões convivem por alguns segundos. Remoções vão num deploy seguinte.

## Rollback

- Código: `site rollback quarau`. Mesmo fluxo sem downtime; as 3 últimas imagens ficam no servidor.
- Banco: rollback de código não desfaz migração. Se uma migração causou dano, restaure o dump (ver
  [guia → Backups](vps-guia.md#backups)) depois de um `site backup` do estado atual.

## Importar o conteúdo do WordPress

Idempotente: pode rodar de novo para atualizar. Num container descartável, sem build do Next.js (cabe nos 2 GB):

```bash
sudo infra/sites/quarau/migrate-content.sh
```

## Primeiro admin do CMS

```bash
sudo infra/sites/quarau/migrate-content.sh --admin voce@exemplo.com
```

A senha gerada fica só em `/srv/sites/quarau/CREDENCIAIS.txt` (`chmod 600`).

## Incidentes comuns

| Sintoma | Verificar / agir |
| --- | --- |
| Site fora (502/504) | `site lista`; `site logs quarau`; se a versão nova quebrou → `site rollback quarau` |
| `/next/health` = 503 | `docker ps` (Postgres `platform-postgres-1` saudável?); disco cheio? `site saude` |
| Disco > 85% | `docker system df`; `docker image prune -af --filter until=168h`; `sudo du -sh /srv/backups` |
| Imagens não carregam | `sudo ls /srv/sites/quarau/data/media` (dono deve ser 1001) |
| Formulário não envia e-mail | SMTP em `site config quarau`; as mensagens continuam salvas em _Contatos recebidos_ |
| Certificado HTTPS | `docker logs platform-traefik-1 \| grep -i acme`; o DNS aponta para 177.107.94.31? |
| Publicação não aparece | Foi publicada (não só rascunho)? Limpe o cache do site (tabela acima) |

## Atualizar dependências / Payload

1. Renovate abre o PR; o CI roda todos os testes.
2. Se mudar o schema: `pnpm --filter @quarau/web migrate:create <nome>` e commit da migração.
3. Merge na `main` → imagem nova → a VPS publica sozinha.
