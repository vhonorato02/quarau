/**
 * Lists visible text written in the site's code instead of coming from the CMS.
 *   node tools/qa/hardcoded.mjs        → prints each occurrence; exit code 1 when any is found
 *
 * Checked in apps/web/src/app/(frontend) and apps/web/src/components (the public site):
 * - JSX text with letters (<p>Olá</p>);
 * - string literals with letters rendered as children ({'Olá'}, {`Olá ${x}`});
 * - literal values of attributes people read or hear: alt, title, placeholder, aria-label,
 *   aria-description, label.
 * The admin panel (src/cms) is out of scope: its labels are the CMS itself.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ts = require('typescript')

const root = path.resolve(import.meta.dirname, '../../apps/web/src')
const dirs = [path.join(root, 'app', '(frontend)'), path.join(root, 'components')]
const READ_ATTRS = new Set([
  'alt',
  'title',
  'placeholder',
  'aria-label',
  'aria-description',
  'label',
])
const hasLetters = (s) => /\p{L}/u.test(s)

function* files(dir) {
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name)
    if (statSync(p).isDirectory()) yield* files(p)
    else if (/\.tsx$/.test(name)) yield p
  }
}

const findings = []
for (const dir of dirs) {
  for (const file of files(dir)) {
    const src = ts.createSourceFile(
      file,
      readFileSync(file, 'utf8'),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    )
    const report = (node, text) => {
      const { line } = src.getLineAndCharacterOfPosition(node.getStart())
      findings.push(
        `${path.relative(process.cwd(), file)}:${line + 1}  ${JSON.stringify(text.trim().slice(0, 80))}`,
      )
    }
    const visit = (node) => {
      if (ts.isJsxText(node) && hasLetters(node.text)) report(node, node.text)
      if (ts.isJsxExpression(node) && node.expression && ts.isJsxElement(node.parent)) {
        const e = node.expression
        if ((ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) && hasLetters(e.text))
          report(node, e.text)
        if (ts.isTemplateExpression(e)) {
          const parts = [e.head.text, ...e.templateSpans.map((s) => s.literal.text)].join('')
          if (hasLetters(parts)) report(node, parts)
        }
      }
      if (ts.isJsxAttribute(node) && READ_ATTRS.has(node.name.getText(src)) && node.initializer) {
        const init = node.initializer
        const lit = ts.isStringLiteral(init)
          ? init
          : ts.isJsxExpression(init) && init.expression && ts.isStringLiteral(init.expression)
            ? init.expression
            : null
        if (lit && hasLetters(lit.text)) report(node, lit.text)
      }
      ts.forEachChild(node, visit)
    }
    visit(src)
  }
}

if (findings.length) {
  console.error(`Texto fora do CMS (${findings.length}):`)
  for (const f of findings) console.error(`  ${f}`)
  process.exit(1)
}
console.info('Nenhum texto visível fora do CMS.')
