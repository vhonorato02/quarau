# S00 — PC pronto

**Modelo:** `sonnet` · **Lê:** este arquivo + PROGRESSO · **Dono:** 🔑 janelas do Windows (UAC), `gh auth login`

## Objetivo

O computador do dono, que estava cru, roda o projeto, os testes e o navegador de QA, com os MCPs conectados. Sem Docker.

## Passos

1. **Detectar o sistema** (`uname -a`, `echo $OS`). No Windows o Claude Code usa o Git Bash: todos os comandos abaixo são bash.
2. **Windows, ganhos grátis** (rode uma vez; se pedir administrador, 🔑 o dono clica "Sim"):
   - `git config --global core.longpaths true` e `git config --global core.autocrlf false` (o `.gitattributes` já força LF);
   - exclusão do Windows Defender para a pasta do projeto e para o store do pnpm. Deixa o `pnpm install` e os builds 2–3× mais rápidos:

     ```bash
     powershell -Command "Start-Process powershell -Verb RunAs -ArgumentList 'Add-MpPreference -ExclusionPath C:\quarau; Add-MpPreference -ExclusionPath $env:LOCALAPPDATA\pnpm'"
     ```

3. **Instalar só o necessário** (pular o que `--version` já responder):

   | Ferramenta  | Windows                                                                                | macOS                  |
   | ----------- | -------------------------------------------------------------------------------------- | ---------------------- |
   | Node 22 LTS | `winget install -e --id Schniz.fnm` → `fnm install 22 && fnm use 22 && fnm default 22` | `brew install node@22` |
   | pnpm 10.28  | `corepack enable && corepack prepare pnpm@10.28.0 --activate`                          | idem                   |
   | Vercel CLI  | `npm i -g vercel@latest`                                                               | idem                   |
   | GitHub CLI  | `winget install -e --id GitHub.cli`                                                    | `brew install gh`      |
   | ffmpeg      | `winget install -e --id Gyan.FFmpeg`                                                   | `brew install ffmpeg`  |
   - Depois de cada `winget`, reabra o shell (ou ajuste o `PATH` na sessão) e confira com `--version`.
   - No Windows, o `fnm` precisa de `eval "$(fnm env --use-on-cd --shell bash)"` no `~/.bashrc`.

4. 🔑 **GitHub:** `gh auth login --web --git-protocol https`. O dono abre o link, digita o código e autoriza. Isso também configura o `git push`.
   - Nunca usar o token antigo que foi colado numa conversa.
5. **Dependências:**
   - `pnpm install`;
   - `pnpm --filter @quarau/web exec playwright install chromium webkit firefox` (os três motores da matriz de QA).
6. **MCPs:** `.mcp.json` (playwright, vercel, context7), aprovados por `.claude/settings.json`.
   - O `playwright` usa `cmd /c npx … --browser msedge` (Edge já vem no Windows).
   - Em macOS/Linux, troque para `"command": "npx"` e `--browser chromium`; 🔑 o dono reinicia o Claude Code.
   - A autenticação do `vercel` fica para a S01.
7. **Verificar:** `pnpm lint && pnpm typecheck && pnpm test` passam.

## Pronto quando

- `node -v` (v22), `pnpm -v` (10.28), `vercel --version`, `gh auth status`, `ffmpeg -version` respondem.
- `/mcp` mostra playwright e context7 conectados.
- Testes unitários verdes.
- PROGRESSO marcado e commit (`chore(setup): …` se algo do repositório mudou).

## Armadilhas

- `pnpm install` dentro de pasta sincronizada pelo OneDrive trava: o projeto deve estar em `C:\quarau`.
- Se `corepack` falhar por permissão no Windows: `npm i -g corepack@latest` e repetir.
