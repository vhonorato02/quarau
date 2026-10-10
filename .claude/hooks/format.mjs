// PostToolUse (Edit/Write): formata com o Prettier do projeto o arquivo que o agente acabou de mexer.
// Nunca bloqueia: se o Prettier não souber o tipo do arquivo ou falhar, segue em silêncio.
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const root = process.env.CLAUDE_PROJECT_DIR ?? process.cwd()
let file = ''
try {
  file = JSON.parse(readFileSync(0, 'utf8'))?.tool_input?.file_path ?? ''
} catch {
  process.exit(0)
}
const ok = /\.(m?[jt]sx?|json|md|ya?ml|s?css|html)$/i.test(file)
const prettier = path.join(root, 'node_modules', 'prettier', 'bin', 'prettier.cjs')
if (!file || !ok || !existsSync(file) || !existsSync(prettier)) process.exit(0)
spawnSync(process.execPath, [prettier, '--write', '--log-level', 'silent', file], {
  cwd: root,
  stdio: 'ignore',
})
process.exit(0)
