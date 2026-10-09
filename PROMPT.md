# Como terminar o site com um único prompt

## Antes (você, ~10 minutos, uma vez só)

**Windows:**

1. Instale o **Git for Windows**: https://git-scm.com/download/win (avance tudo no padrão).
2. Abra o **PowerShell** e instale o **Claude Code**:

   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```

3. Clique com o botão direito no `quarau.zip` → **Extrair tudo…** → escolha **`C:\`**. Isso cria a pasta **`C:\quarau`**.
   - Fora da Área de Trabalho e de Documentos, que costumam sincronizar com o OneDrive e travam o projeto.
4. No PowerShell:

   ```powershell
   cd C:\quarau
   claude
   ```

   Faça login na sua conta Claude quando ele pedir.

**Mac:** `curl -fsSL https://claude.ai/install.sh | bash`, descompacte o zip na sua pasta pessoal (cria `~/quarau`), depois `cd ~/quarau && claude`.

## O prompt (copie e cole tudo de uma vez)

```text
Você é o único responsável por concluir e publicar este site. Trabalhe sozinho até o fim.

1. Leia CLAUDE.md, docs/RELATORIO-COMPLETO.md, docs/PLANO.md e docs/PROGRESSO.md.
2. Execute o PLANO a partir de onde o PROGRESSO parou, fase por fase, até a Fase 8, sem parar
   para pedir confirmação. Marque o PROGRESSO e faça commit + push na main ao fim de cada fase.
3. Este computador está cru. Instale só o necessário (Fase 0). Pode usar Docker se for
   indispensável, mas prefira o caminho sem Docker do plano (banco de desenvolvimento no Neon).
4. Produção fica na Vercel (projeto "quarau"), só planos gratuitos, só a branch main, sem
   subagentes e sem branches. Não mexa no domínio quarau.com.br nem no WordPress.
5. Só me chame nos momentos 🔑 do plano (login na Vercel, login do GitHub no primeiro push,
   chave da Resend opcional). Nesses momentos, diga exatamente o que eu devo clicar ou digitar.
6. Nada está pronto sem prova no ar: rode o QA visual em https://quarau.vercel.app, olhe as
   capturas de desktop e celular, corrija e repita até não haver nada quebrado nem feio.
7. No fim, me entregue em português simples: a URL do site, a URL do admin, onde está o
   ACESSO-ADMIN.txt e a lista do que eu preciso confirmar com o cliente.
```

## Durante

- **Login na Vercel:** ele vai pedir para você abrir um link e confirmar. Entre com o GitHub `vhonorato02`.
- **Login do GitHub:** no primeiro envio pode abrir uma janela de login do GitHub. Autorize.
- **Permissões do Windows:** se aparecer uma janela pedindo permissão para instalar o Node.js, clique **Sim**.
- **Se ele parar no meio:** digite `continue`.
- **Se você fechar o terminal:** abra de novo na mesma pasta, rode `claude --continue`, ou cole o mesmo prompt. Ele retoma pelo `docs/PROGRESSO.md`.
- **Resend (opcional, para receber os contatos por e-mail):**
  - crie a chave em https://resend.com/api-keys;
  - cole em **Vercel → quarau → Settings → Environment Variables** com o nome `RESEND_API_KEY`;
  - **nunca cole a chave no chat.**
- **Sem a Resend:** os contatos ficam salvos no painel do site, em _Contatos recebidos_.
