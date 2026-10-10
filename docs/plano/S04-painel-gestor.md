# S04 — Painel de verdade e acesso do gestor

**Modelo:** `opusplan` · **Lê:** este arquivo + PROGRESSO + §4 do [RELATORIO-COMPLETO](../RELATORIO-COMPLETO.md)
· **Dono:** 🔑 nome e e-mail do gestor da Quarau (1 min)

## Objetivo

O gestor da Quarau entra, entende o painel sem treinamento e faz tudo sozinho: publicar um projeto, trocar um texto, ver os contatos recebidos. O acesso é seguro e cada pessoa tem o papel certo.

## Passos

1. **Papéis:**

   | Papel         | Pode                                                                                                           |
   | ------------- | -------------------------------------------------------------------------------------------------------------- |
   | Administrador | tudo (dono técnico)                                                                                            |
   | Gestor        | todo o conteúdo, globais de texto/SEO/menu/rodapé, contatos recebidos, convidar e desativar editores e autores |
   | Editor        | criar, editar e publicar conteúdo; ver contatos                                                                |
   | Autor         | criar e editar os próprios rascunhos de notícias e projetos; não publica                                       |
   - Teste de matriz papel × coleção × operação (S09 amplia).

2. **Convite por e-mail:**
   - quem tem permissão cria o usuário (nome, e-mail, papel) sem senha;
   - o sistema envia o e-mail "Você foi convidado para o painel da Quarau" com o link de definir senha (token de 7 dias, mesmo mecanismo do "esqueci a senha");
   - sem Resend configurada, o painel mostra o link para copiar e enviar à mão.
3. **Login seguro:**
   - `maxLoginAttempts: 5`, `lockTime: 15 min`;
   - senha mínima de 12 caracteres;
   - sessão de 8 h;
   - tela de login com a marca e mensagem de erro clara;
   - redefinir senha funcionando ponta a ponta.
4. **Painel inicial** (substitui o `Welcome`):
   - contadores clicáveis: projetos publicados e em rascunho, notícias, **contatos novos**, **mídias sem texto alternativo**, **publicações agendadas**;
   - últimos 5 contatos;
   - "Primeiros passos" (checklist que some quando concluído);
   - atalhos;
   - os textos do painel vêm de um global editável.
5. **Ajuda dentro do painel:**
   - página "Ajuda" (view própria do admin) com o guia de `docs/cms.md` reescrito para leigo, em passos curtos com capturas;
   - **vídeos curtos** gravados pelo Playwright (`video: 'on'`) das 5 tarefas principais: publicar projeto, trocar foto de capa, editar texto da home, responder contato, agendar notícia. Os vídeos ficam em Mídias, na pasta Ajuda.
6. **Fim do "Sem título"** (C1):
   - cada bloco mostra no rótulo o título ou o primeiro texto, mais o tipo e o nº de itens (`admin.components.Label`);
   - teste E2E: a página Início lista os blocos com nomes legíveis.
7. **Listas legíveis** (C5):
   - miniatura da capa;
   - "Destaque" como ✓/—;
   - anos vazios como "—";
   - colunas úteis por padrão;
   - filtros salvos "Precisa revisar alt" e "Rascunhos".
8. **Limpezas** (C4, C7, C8):
   - sem seletor de idioma (o i18n saiu na S02);
   - primeiro usuário sem campo Papéis (sempre administrador);
   - "Criado por/Atualizado por" automáticos e visíveis só na barra lateral;
   - aba API escondida para quem não é administrador (`admin.hideAPIURL`);
   - "Criar novo" não grava rascunho vazio (autosave só depois do primeiro salvamento manual).
9. **Identidade:** Barlow, cores e logo da marca no admin (`app/(payload)/custom.scss`), favicon próprio, título "Painel Quarau".
10. 🔑 **Gestor:**
    - o agente pergunta **uma vez**: "Nome e e-mail do gestor da Quarau que vai cuidar do site?";
    - cria o usuário com papel Gestor no banco de **produção** (via script com `.env` de produção temporário);
    - o convite sai quando o site estiver no ar (S11), ou o link vai para `ACESSO-ADMIN.txt`.

## Pronto quando

- E2E por papel: o autor não consegue publicar; o editor não vê "Usuários"; o gestor convida um editor; o convite chega (capturado em teste) e o link define a senha.
- Login bloqueia na 6ª tentativa.
- Capturas do admin (login, painel, lista de projetos, edição da Início, ajuda) revisadas pelo `qa-visual`.
- PROGRESSO marcado com o gestor cadastrado (só o e-mail, nunca senha).
