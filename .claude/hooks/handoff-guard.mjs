// Stop: não deixa o agente encerrar com trabalho sem registro. Se há mudanças, docs/PROGRESSO.md precisa
// estar atualizado ("Retomar em") e tudo commitado, para que a próxima sessão (ou outra janela de cota)
// continue sem perder contexto. Na segunda tentativa seguida (stop_hook_active) libera, para nunca travar.
import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

let input = {}
try {
  input = JSON.parse(readFileSync(0, 'utf8'))
} catch {
  /* sem entrada: segue */
}
if (input.stop_hook_active) process.exit(0)

let status = ''
try {
  status = execFileSync('git', ['status', '--porcelain'], {
    cwd: process.env.CLAUDE_PROJECT_DIR ?? process.cwd(),
    encoding: 'utf8',
  })
} catch {
  process.exit(0)
}
const changed = status.split('\n').filter(Boolean)
if (changed.length === 0) process.exit(0)

const progressTouched = changed.some((l) => l.endsWith('docs/PROGRESSO.md'))
const reason = progressTouched
  ? `Há ${changed.length} arquivo(s) sem commit. Faça commit (Conventional Commits) e push na main antes de parar — use "wip:" se estiver no meio de algo e diga em PROGRESSO como retomar.`
  : `Há ${changed.length} arquivo(s) alterados e docs/PROGRESSO.md não foi atualizado. Antes de parar: marque o que concluiu, preencha "Retomar em" (sessão, próximo passo exato, comando) e faça commit + push.`
process.stdout.write(JSON.stringify({ decision: 'block', reason }))
process.exit(0)
