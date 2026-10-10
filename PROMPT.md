# Como terminar o site Quarau com o Claude Code no seu PC

## 1. Antes (você, ~10 minutos, uma vez só)

1. Instale o **Git for Windows**: https://git-scm.com/download/win (avance tudo no padrão).
2. Abra o **PowerShell** e instale o **Claude Code**:

   ```powershell
   irm https://claude.ai/install.ps1 | iex
   ```

3. Pegue o projeto. Escolha **um**:
   - **zip:** botão direito no `quarau.zip` → **Extrair tudo…** → escolha `C:\`. Isso cria `C:\quarau`;
   - **GitHub:** `git clone https://github.com/vhonorato02/quarau C:\quarau`.
   - Fora da Área de Trabalho e de Documentos (o OneDrive trava o projeto).
4. No PowerShell: `cd C:\quarau` e depois `claude`. Faça login na sua conta Claude.

## 2. Primeira vez: cole este prompt

```text
Você vai concluir o site da Quarau seguindo o CLAUDE.md e o plano em sessões (docs/PLANO.md).
Leia docs/PROGRESSO.md e execute a sessão indicada em "Retomar em" até o "Pronto quando",
sem pedir confirmação. Este computador está cru: comece pela S00. Quando terminar uma sessão,
atualize o PROGRESSO, faça commit e push, e siga direto para a próxima enquanto houver cota.
Só me chame nos momentos 🔑, dizendo exatamente o que eu devo clicar ou digitar.
```

## 3. Toda vez que voltar (nova janela de cota, PC reiniciado, terminal fechado)

No PowerShell: `cd C:\quarau` e depois `claude`. Digite `/clear` e cole:

```text
continuar
```

O `CLAUDE.md` e o `docs/PROGRESSO.md` dizem ao agente exatamente onde parou e o que fazer. Se ele parar no meio de uma resposta, digite `continue`.

## 4. Para a cota render mais

- **Uma sessão do plano por janela de uso.** Ao abrir o Claude Code depois de uma pausa, `/clear` e "continuar": contexto limpo custa menos e erra menos.
- **`/usage`** mostra quanto da cota já foi. Quando estiver acabando, o agente fecha o item, atualiza o PROGRESSO e para num ponto seguro (o hook `handoff-guard` garante).
- **Troca de modelo:** o agente usa o modelo indicado em cada sessão (Opus para texto, design e decisões; Sonnet para código mecânico e testes). Você não precisa fazer nada.
- **Não peça "faça tudo de novo"** nem cole logs gigantes: diga só o que viu de errado.

## 5. Momentos em que o agente vai te chamar

| Quando | O quê                                                                                      | Tempo           |
| ------ | ------------------------------------------------------------------------------------------ | --------------- |
| S00    | Clicar **Sim** nas janelas do Windows; `gh auth login` (abrir o link e digitar o código)   | 5 min           |
| S01    | `vercel login` no navegador; no Claude Code `/mcp` → vercel → **Authenticate**             | 5 min           |
| S04    | Nome e e-mail do **gestor** da Quarau                                                      | 1 min           |
| S05    | Baixar as exportações do Instagram e do LinkedIn (`content/social/README.md`)              | 10 min + e-mail |
| S06    | Ler e aprovar os textos do site (`docs/copy/APROVACAO.md`); opcional: chave da Resend      | 30–60 min       |
| S07    | Olhar 4 imagens da direção visual e dizer "segue"                                          | 5 min           |
| S11    | **Aceite:** navegar no site no celular e no computador; responder "aprovado" ou os ajustes | 30 min          |
| S12    | Colar a chave pública SSH no console da VPS; tornar público o pacote da imagem no GitHub   | 10 min          |
| S13    | Acesso ao DNS do domínio, Google Search Console, criar a página da empresa no LinkedIn     | 30 min          |
| S14    | Opcional: contas UptimeRobot e Sentry                                                      | 10 min          |

**Nunca cole senha, token ou chave privada no chat.** Quando precisar de uma chave (Resend, por exemplo), o agente diz em qual tela da Vercel colar.
