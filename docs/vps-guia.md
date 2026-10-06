# Guia da VPS — como pôr um site no ar

Esta VPS é a sua "Hostinger + Vercel" particular. Tudo se faz com um único comando, `site`, depois de entrar
no servidor:

```bash
ssh -p 22322 zewithane@177.107.94.31
site ajuda
```

Todo endereço `qualquer-coisa.zewithane.vps.brz.dev.br` já aponta para o servidor, então dá para testar um site
novo sem mexer em DNS. O HTTPS sai sozinho em menos de 1 minuto.

## Ver como está tudo

```bash
site lista      # sites, se estão no ar, versão, memória e disco livres
site saude      # checagem completa (sites, banco, disco, memória, backup)
```

## Pôr um site novo no ar

### Site simples (HTML, landing page, portfólio)

```bash
site novo padaria --estatico
```

Pronto: `https://padaria.zewithane.vps.brz.dev.br` já está no ar. Para trocar o conteúdo, envie os arquivos do
seu computador para a pasta `public/` do site:

```bash
scp -P 22322 -r ./meu-site/* zewithane@177.107.94.31:/srv/sites/padaria/public/
```

A mudança aparece na hora. Não precisa publicar.

### App ou SaaS (Next.js, Node, Python…, empacotado como imagem Docker)

O código fica no GitHub e o GitHub Actions gera a imagem (como no Quarau). Depois, no servidor:

```bash
site novo oficina ghcr.io/SEU-USUARIO/oficina --porta 3000 --saude /api/health
site config oficina     # cole as variáveis do app (chaves, e-mail…); DATABASE_URL já vem pronta
site deploy oficina     # publica
```

- `--porta`: a porta em que o app escuta dentro do container (padrão 3000).
- `--saude`: um endereço do app que responde 200 quando está tudo bem (opcional, recomendado).
- `--memoria 512m`: limite de memória do app (padrão 512m). O servidor tem 2 GB no total.
- `--sem-banco`: para app que não usa Postgres.

Cada app ganha automaticamente **um banco de dados só dele**, que outros sites não enxergam.

**Atualização automática:** a cada 2 minutos o servidor confere se o GitHub publicou uma imagem nova
(`:latest`). Se publicou, põe no ar sozinho, sem tirar o site do ar. Para desligar: `site autodeploy oficina off`.

## Domínio do cliente (ex.: oficinadoze.com.br)

1. No painel onde o domínio foi comprado (Registro.br, GoDaddy, Cloudflare…), crie dois registros:
   - tipo **A**, nome **@**, valor **177.107.94.31**
   - tipo **A**, nome **www**, valor **177.107.94.31**
   (Na Cloudflare, deixe a nuvem **cinza**, sem proxy, pelo menos até o certificado sair.)
2. Espere alguns minutos e rode:

```bash
site dominio oficina oficinadoze.com.br,www.oficinadoze.com.br
```

O comando avisa se o DNS ainda não estiver apontando. O certificado HTTPS é emitido sozinho.

## Publicar, voltar atrás, acompanhar

| Quero… | Comando |
| --- | --- |
| publicar a versão mais nova agora | `site deploy oficina` |
| voltar para a versão anterior (deu problema) | `site rollback oficina` |
| ver o histórico de versões | `site versoes oficina` |
| ver o que o app está registrando | `site logs oficina` (Ctrl+C para sair) |
| reiniciar | `site reiniciar oficina` |
| mudar senhas/variáveis do app | `site config oficina` |
| mexer no banco direto | `site banco oficina` |
| apagar um site | `site remover oficina` (guarda uma cópia final em `/srv/backups/removidos/`) |

Publicar **nunca tira o site do ar**: a versão nova sobe ao lado da antiga e só recebe visitas depois de provar
que está saudável. Se ela falhar, a antiga continua no ar e você recebe um alerta.

## Alertas no celular

1. Instale o app **ntfy** (Android/iOS).
2. Assine o tópico que está em `ALERT_URL` no arquivo `/srv/platform/.env`
   (`sudo grep ALERT_URL /srv/platform/.env`).

Você recebe um aviso quando um site cai, o disco passa de 85%, a memória acaba, um backup ou deploy falha, e de
novo quando tudo volta ao normal.

## Backups

- Todo dia às 03:17: todos os bancos e todos os arquivos dos sites, criptografados, em `/srv/backups/restic`.
  Ficam guardados 7 diários, 4 semanais e 6 mensais.
- Todo domingo o servidor **testa a restauração** sozinho e avisa se algo estiver errado.
- `site backup` faz um backup na hora.
- **Importante:** guarde num gerenciador de senhas o valor de `RESTIC_PASSWORD` (`sudo grep RESTIC_PASSWORD
  /srv/platform/.env`). Sem ele, os backups não podem ser lidos.
- **Recomendado:** uma cópia fora do servidor (se a VPS sumir, o backup local some junto). Crie um bucket no
  Backblaze B2 (10 GB grátis) e preencha `RESTIC_REPOSITORY_OFFSITE`, `AWS_ACCESS_KEY_ID` e
  `AWS_SECRET_ACCESS_KEY` em `/srv/platform/.env`. O backup diário passa a enviar a cópia sozinho.

Restaurar um banco (exemplo do site `oficina`):

```bash
sudo -i
set -a; source /srv/platform/.env; set +a
restic snapshots                                   # escolha o snapshot
restic restore latest --target /tmp/r --include /srv/backups/dumps/oficina.dump
docker exec -i platform-postgres-1 pg_restore -U postgres --clean --if-exists -d oficina < /tmp/r/srv/backups/dumps/oficina.dump
```

## Onde fica cada coisa

```
/srv/platform/          proxy (Traefik), banco (Postgres), scripts e .env da plataforma
/srv/sites/<site>/      compose.yml, .env, app.env (segredos), data/ (arquivos), public/ (sites estáticos)
/srv/backups/           backups (restic) e dumps dos bancos
```

## Regras de ouro

- O SSH é na porta **22322**. Não mexa em `/etc/ssh` nem no firewall sem uma segunda janela de SSH aberta.
- Não faça build de Next.js no servidor (2 GB não bastam): o GitHub Actions gera a imagem.
- Antes de pôr muitos apps, olhe `site lista`: a memória livre deve ficar acima de ~300 MB.

Detalhes técnicos e motivos da arquitetura: [decisions/0013](decisions/0013-plataforma-vps-traefik-sem-painel.md).
Reinstalar/atualizar a plataforma a partir do repositório: `sudo infra/platform/install.sh`.
