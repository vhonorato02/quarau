# Quarau | proveniência editorial das notícias incorporadas

**Revisão de fontes:** 04/11/2026 (America/Sao_Paulo)  
**Canal:** notícias do Payload CMS, com textos autorais adaptados, não reprodução literal das redes.  
**Status:** conteúdo versionado no seed; publicação no banco e no domínio ainda não verificada.

## Critérios aplicados

- Somente afirmações presentes nas publicações atribuídas à Quarau, em páginas públicas do LinkedIn ou em documentos oficiais/portfólio legado já inventariado em `docs/QUARAU.md`.
- Não copiar fotografias, vídeos, identidade ou biografias de redes sem autorização. As capas do seed são as imagens **já vinculadas aos projetos no CMS**, com direitos ainda sujeitos ao inventário em `docs/CONTENT-TODO.md`.
- O campo `publishedAt` refere-se à **publicação da matéria neste site**, não à data original da postagem. Datas históricas aparecem no corpo somente quando verificadas.
- Nenhum post encontrado em perfil pessoal é automaticamente apresentado como comunicação oficial ou autoria da empresa.
- Links `sourceUrl` existem só quando o destino é verificável e adequado. Quando o permalink original não foi recuperado, não inventar URL; localizar a exportação oficial futuramente.

## Matérias incorporadas

| Slug                                                  | Fonte e evidência                                                                                                                                                                                                                                                        | Limitação                                                                                                                                    |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `educacao-ambiental-e-observacao-de-aves-no-ecomuseu` | [Post público da Quarau sobre metodologias ativas e observação de aves](https://pt.linkedin.com/posts/quarau-91196b258_programapetrobrassocioambiental-educa%C3%A7%C3%A3oambiental-activity-7266902529056063489-Oc6B)                                                    | O relato original também compartilha texto de Fábio Bueno; a matéria distingue a atividade do papel de gestão da Quarau                      |
| `jornada-formativa-ecomuseu-quarta-edicao`            | [Post da Quarau reproduzido na atividade pública do LinkedIn de Ana Cristina Campos](https://br.linkedin.com/in/ana-cristina-campos-7a3a92209)                                                                                                                           | Post original sem permalink acessível; ações **previstas**, nunca chamadas de resultados                                                     |
| `ecomuseu-mutirao-rio-alambari`                       | [Post da Quarau reproduzido em atividade pública de terceiro](https://br.linkedin.com/in/ana-cristina-campos-7a3a92209)                                                                                                                                                  | Não vincular a foto de capa genérica ao instante exato do mutirão; 221 kg é uma quantidade declarada pela Quarau, não auditoria independente |
| `ecoe-verde-tecnologia-social-em-atibaia`             | [Publicação da Quarau no LinkedIn, visível em atividade pública de terceiro](https://br.linkedin.com/in/ana-cristina-campos-7a3a92209); `docs/QUARAU.md`                                                                                                                 | Papel de consultoria e parceria, não confundir com execução exclusiva                                                                        |
| `quipa-formacao-jovens-quilombolas-piaui`             | [Post da Quarau reproduzido em atividade pública de terceiro](https://br.linkedin.com/in/ana-cristina-campos-7a3a92209); portfólio legado                                                                                                                                | Janeiro de 2023 se refere à oficina, não à suposta data de início do projeto                                                                 |
| `samba-de-bumbo-paulista-patrimonio-cultural`         | [Base oficial do IPHAN](https://bcr.iphan.gov.br/acoes-de-salvaguarda/registro-do-samba-de-bumbo-paulista-como-patrimonio-cultural-do-brasil/); [postagem de Fábio Bueno sobre a documentação audiovisual](https://br.linkedin.com/in/f%C3%A1biobueno); `docs/QUARAU.md` | O registro é do **bem cultural**, não prêmio concedido à Quarau                                                                              |

## Cortejo da Cavalaria (publicado em 07/11/2026, sem capa)

`cortejo-da-cavalaria-patrimonio-cultural`: reconhecimento aprovado pelo IPHAN em **22/09/2026** (114ª reunião do
Conselho Consultivo, Livro de Registro das Celebrações). Fontes: [nota oficial](https://www.gov.br/iphan/pt-br/assuntos/noticias/cortejo-da-cavalaria-de-sao-goncalo-e-sao-benedito-de-guaratingueta-sp-e-reconhecido-como-patrimonio-cultural),
[publicação da Quarau](https://pt.linkedin.com/posts/quarau-91196b258_cortejo-da-cavalaria-de-sao-goncalo-e-sao-activity-7510477602730725377-41-g)
(entrega do dossiê na parceria com CECP e IPHAN) e [processo no IPHAN](https://bcr.iphan.gov.br/acoes-de-salvaguarda/registro-do-cortejo-da-cavalaria-de-sao-goncalo-e-sao-benedito-de-guaratingueta-sp-como-patrimonio-cultural-do-brasil/).
Sai **sem capa** (o campo passou a ser opcional nas notícias): não há foto autorizada do Cortejo no acervo, e
foto de Congada ou de outro bem sugeriria um registro falso. Quando o dono enviar uma foto com direito de uso,
basta escolhê-la no painel.

## Instagram e cobertura incompleta do LinkedIn

Instagram `@quarau.consultoria`: a consulta pública direta não retornou conteúdo acessível para extração confiável. A exportação oficial, quando disponível, deve alimentar `content/social/entrada/` e o parser existente. **Não afirmar que todo o histórico social foi importado.**

O LinkedIn público via indexação não fornece todos os posts, permalinks ou mídias. A curadoria acima é deliberadamente parcial e passível de conferência editorial; não usa scraping autenticado, bypass de login ou perfil indevido.

## Aplicação e reversibilidade

`apps/web/scripts/seed/news.ts` contém as matérias. `apps/web/scripts/seed/index.ts` consulta primeiro o slug, associa ao projeto e à capa existente e cria somente registros ausentes. Conteúdo editado por humanos não é atualizado pelo seed. A página `noticias` é publicada a partir do template canônico quando não foi personalizada; o menu/listagem continuam controlados pela existência de notícias publicadas.

Verificação pendente: executar seed com Postgres real e armazenamento de mídia autorizado; testar criação, segundo seed sem duplicatas, publicação/despublicação, sitemap, listagem, URLs e acesso público com o commit exato.
