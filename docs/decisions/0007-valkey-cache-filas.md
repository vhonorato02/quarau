# 0007 — Papel do Valkey, cache e filas

- **Status:** aceita · **Data:** 2026-10-05

## Decisão
- **Valkey**: rate limit compartilhado (formulário, busca), com fallback em memória se estiver fora do ar.
- **Cache de páginas/dados**: cache do Next em volume local (`next-cache`). Há uma réplica por vez (a segunda
  existe só durante o deploy), então um *cache handler* remoto não traz ganho e adicionaria um ponto de falha.
- **Filas**: Payload Jobs (tabela no Postgres) para publicação agendada; e-mails e indexação são executados
  inline com tratamento de erro (volume baixo).

## Consequências
Se houver mais de uma réplica permanente no futuro, implementar `cacheHandlers` no Valkey.
