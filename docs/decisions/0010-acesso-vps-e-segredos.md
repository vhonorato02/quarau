# 0010 — Acesso à VPS pelo GitHub Actions e segredos gerados no servidor

- **Status:** aceita · **Data:** 2026-10-05

## Contexto

O ambiente de desenvolvimento usado na construção não tem saída SSH. As regras do dono da VPS proíbem alterar a
porta 22322 e o `sshd_config`.

## Decisão

- Toda operação na VPS é feita por workflows do GitHub Actions (CI/CD e _VPS operations_), via SSH na porta 22322.
- Únicos segredos no GitHub: `VPS_SSH_KEY` (+ opcionais `VPS_HOST`, `VPS_PORT`, `VPS_USER`, `VPS_ADMIN_USER`,
  `VPS_KNOWN_HOSTS`). Todos os demais (banco, MinIO, Payload, Meili, restic, basic auth) são **gerados na própria
  VPS** por `provision-env.sh` e ficam apenas em `/srv/apps/quarau/.env` (`chmod 600`).
- Endurecimento SSH (drop-in em `sshd_config.d`, sem tocar o arquivo principal nem a porta) é **opt-in**
  (`APPLY_SSH_HARDENING=1`); o UFW só é ativado depois de confirmar a regra 22322/tcp.

## Consequências

Recomendação: usar uma chave dedicada ao deploy (não a chave pessoal compartilhada) e rotacioná-la.
