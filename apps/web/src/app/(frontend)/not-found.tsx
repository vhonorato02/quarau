import Link from 'next/link'

import { getTexts } from '@/server/queries'

export default async function NotFound() {
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
