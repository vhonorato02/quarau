/**
 * Creates (or resets the password of) the first administrator.
 *   ADMIN_EMAIL=ana@quarau.com.br ADMIN_NAME="Ana" pnpm seed:admin
 * If ADMIN_PASSWORD is not set, a strong random password is generated and written to
 * ACESSO-ADMIN.txt at the repository root (git-ignored); it is never printed.
 */
import { randomBytes } from 'node:crypto'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { getPayload } from 'payload'

import config from '../src/payload.config'

async function main() {
  const email = process.env.ADMIN_EMAIL
  if (!email) throw new Error('Defina ADMIN_EMAIL')
  const name = process.env.ADMIN_NAME ?? 'Administrador'
  const password = process.env.ADMIN_PASSWORD ?? randomBytes(18).toString('base64url')
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
  })
  if (found.docs[0]) {
    await payload.update({
      collection: 'users',
      id: found.docs[0].id,
      data: { password, roles: ['admin'] },
      context: {},
    })
    console.info(`[admin] senha redefinida para ${email}`)
  } else {
    await payload.create({
      collection: 'users',
      data: { email, name, password, roles: ['admin'] },
      context: {},
    })
    console.info(`[admin] administrador criado: ${email}`)
  }
  if (!process.env.ADMIN_PASSWORD) {
    const file = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      '../../../ACESSO-ADMIN.txt',
    )
    await writeFile(
      file,
      `Painel: /admin
E-mail: ${email}
Senha: ${password}
`,
      { mode: 0o600 },
    )
    console.info(`[admin] senha gerada e gravada em ${file} (fora do git)`)
  }
  process.exit(0)
}

main().catch((err) => {
  console.error('[admin] falhou', err)
  process.exit(1)
})
