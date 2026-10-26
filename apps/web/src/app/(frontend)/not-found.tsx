import Link from 'next/link'
import { connection } from 'next/server'

import { getTexts } from '@/server/queries'

/** Rendered per request (its texts come from the CMS), so the build does not need the database. */
export default async function NotFound() {
  await connection()
  const t = await getTexts()
  return (
    <section className="q-wrap q-lost">
      <h1>{t.notFound.title}</h1>
      <p className="q-lead">{t.notFound.text}</p>
      <ul>
        <li>
          <Link className="q-btn" href="/">
            {t.notFound.home}
          </Link>
        </li>
        <li>
          <Link className="q-btn q-btn--ghost" href="/projetos">
            {t.notFound.projects}
          </Link>
        </li>
        <li>
          <Link className="q-btn q-btn--ghost" href="/contato">
            {t.notFound.contact}
          </Link>
        </li>
      </ul>
    </section>
  )
}
