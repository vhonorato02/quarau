# Achados prioritários e estado da correção | 04/11/2026

| ID | Gravidade | Evidência | Ação | Estado |
| --- | --- | --- | --- | --- |
| Q-001 | P1 | Vercel `dpl_5nxH7qpEe1SLw4pE4jz8kdW31LN7` ERROR: `DATABASE_URL` ausente | Criar Neon staging e conectar Vercel | CONFIGURADO; REDEPLOY NÃO VALIDADO |
| Q-002 | P1 | `apps/web/scripts/seed/content.ts`: página `noticias` inicialmente `draft` | Marcar como publicada no seed novo; atualizar apenas o template antigo intocado | PATCH VERSIONADO; TESTE PENDENTE |
| Q-003 | P2 | `content/social/README.md` e `docs/CONTENT-TODO.md`: notícias vazias até exportação das redes | Curadoria pública inicial de seis matérias com fonte, sem inventar URLs | CÓDIGO VERSIONADO; BANCO NÃO POPULADO |
| Q-004 | P1 | `docs/PROGRESSO.md`: gate Lighthouse no contêiner vermelho por TBT | Reproduzir com trace em build atual antes de stable | ABERTO |
| Q-005 | P1 | `docs/CONTENT-TODO.md`: autorizações de uso de imagem, inclusive crianças e comunidades, pendentes | Inventário de direitos e validação da titularidade | ABERTO |
| Q-006 | P2 | Contradições entre `docs/go-live.md` e `docs/MIGRACAO-VPS.md` para proxy e implantação | Inspeção VPS/infra antes de mudança de DNS | ABERTO |
| Q-007 | P2 | `apps/web/src/app/manifest.ts` utiliza `display: 'browser'` | Decisão fundamentada sobre PWA, sem apenas alterar string | ABERTO |
| Q-008 | P2 | Instagram bloqueou consulta pública; LinkedIn disponível parcialmente por indexação | Importação posterior via exportação oficial, sem circumvenção | PARCIAL |
| Q-009 | P1 | Quarau no LinkedIn anuncia dossiê do Cortejo da Cavalaria; falta imagem pertinente e autorizada no CMS | Criar notícia própria após foto válida ou template sem capa testado | EM REVISÃO |
| Q-010 | P1 | Banco Neon de homologação foi recém-criado, sem carga comprovada | Migrar, fazer seed de mídia e notícias, validar CMS com Playwright | ABERTO |

**Critério de encerramento:** cada achado exige comportamento reexecutado no commit correto e evidência do estado final. Não baixar severidade para forçar o rótulo stable.
