/**
 * Postgres local sem Docker (binários oficiais via `embedded-postgres`), para dev e testes no Windows/macOS/Linux.
 *   pnpm db:local            # sobe em postgres://quarau:quarau@localhost:54329/quarau e fica rodando
 * Dados em .cache/pg (fora do git). Cria também o banco `quarau_test` usado pelos testes de integração.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'

import EmbeddedPostgres from 'embedded-postgres'

const dir = path.resolve(import.meta.dirname, '../../.cache/pg')
const port = Number(process.env.LOCAL_PG_PORT ?? 54329)
const pg = new EmbeddedPostgres({ databaseDir: dir, user: 'quarau', password: 'quarau', port, persistent: true, onLog: () => {} })

if (!existsSync(path.join(dir, 'PG_VERSION'))) await pg.initialise()
await pg.start()
for (const db of ['quarau', 'quarau_test']) await pg.createDatabase(db).catch(() => {})
console.log(`Postgres pronto: postgres://quarau:quarau@localhost:${port}/quarau (Ctrl+C para parar)`)

const stop = async () => { await pg.stop(); process.exit(0) }
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
setInterval(() => {}, 1 << 30)
