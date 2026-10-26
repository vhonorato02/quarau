# 0009 — Superfícies azuis no tom acessível

- **Status:** aceita · **Data:** 2026-10-05

## Contexto

Texto branco sobre o azul da marca `#0089CF` tem contraste 3,83:1, abaixo do mínimo AA (4,5:1) para texto
normal; os testes axe reprovavam as faixas azuis com números e legendas.

## Decisão

Seções de fundo azul usam `blue-700 #006FA8` (derivado da marca por escurecimento, 5,47:1). `#0089CF` continua
no logotipo, no símbolo 3D, em acentos e em texto grande. Ver docs/brand.md.
