import Link from 'next/link'

import { CMSLink } from '@/components/CMSLink'
import { phoneHref, whatsappHref } from '@/components/site/contact-links'
import { docPath } from '@/lib/urls'
import { getGlobal, getTexts, listNews, listPartners, listServices } from '@/server/queries'

import { type BlockOf, headingId } from './types'

/** Names of clients and partners in plain type (logos only when the CMS has them, never invented). */
export async function PartnersStrip({
  block,
  index,
}: {
  block: BlockOf<'partnersStrip'>
  index: number
}) {
  const partners = await listPartners(true)
  if (!partners.length) return null
  const id = headingId(block, index)
  return (
    <section className="q-partners" aria-labelledby={block.heading ? id : undefined}>
      <div className="q-wrap q-partners__in">
        {block.heading ? <h2 id={id}>{block.heading}</h2> : null}
        <ul>
          {partners.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export async function Areas({ block, index }: { block: BlockOf<'areas'>; index: number }) {
  const services = await listServices()
  if (!services.length) return null
  const id = headingId(block, index)
  return (
    <section className="q-section q-wrap" aria-labelledby={block.heading ? id : undefined}>
      {block.heading ? (
        <div className="q-head">
          <h2 id={id} className="q-h2">
            {block.heading}
          </h2>
          {block.intro ? <p>{block.intro}</p> : null}
        </div>
      ) : null}
      <div className="q-areas">
        {services.map((s) => (
          <article key={s.id} className="q-area">
            <h3>
              <Link href={docPath('services', s.slug)}>{s.title}</Link>
            </h3>
            <p>{s.summary}</p>
            {s.deliverables?.length ? (
              <ul>
                {s.deliverables.map((d) => (
                  <li key={d.id ?? d.item}>{d.item}</li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  )
}

export async function ContactList() {
  const [contact, t] = await Promise.all([getGlobal('contact'), getTexts()])
  return (
    <ul className="q-contacts">
      <li>
        <a href={`mailto:${contact.email}`}>{contact.email}</a>
      </li>
      {(contact.phones ?? []).map((p) => (
        <li key={p.id ?? p.number}>
          <a href={phoneHref(p.number)}>{p.number}</a>
          {p.whatsapp ? (
            <>
              {' '}
              <a className="q-link" href={whatsappHref(p.number)} rel="noopener noreferrer">
                {t.contact.whatsapp}
              </a>
            </>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export function CtaBand({ block, index }: { block: BlockOf<'ctaBand'>; index: number }) {
  const id = headingId(block, index)
  return (
    <section className="q-cta q-section" aria-labelledby={id}>
      <div className="q-wrap q-cta__in">
        <h2 id={id}>{block.heading}</h2>
        <div className="q-cta__side">
          {block.text ? <p>{block.text}</p> : null}
          <CMSLink link={block.link} variant="primary" />
          {block.showContacts ? <ContactList /> : null}
        </div>
      </div>
    </section>
  )
}

export async function NewsList({ block, index }: { block: BlockOf<'newsList'>; index: number }) {
  const news = await listNews(block.limit ?? 6)
  if (!news.length) return null
  const id = headingId(block, index)
  const fmt = new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  })
  return (
    <section className="q-section q-wrap" aria-labelledby={block.heading ? id : undefined}>
      {block.heading ? (
        <h2 id={id} className="q-h2 mb-10">
          {block.heading}
        </h2>
      ) : null}
      <ul className="q-news">
        {news.map((n) => (
          <li key={n.id}>
            <Link href={docPath('news', n.slug)}>
              {n.publishedAt ? (
                <time dateTime={n.publishedAt}>{fmt.format(new Date(n.publishedAt))}</time>
              ) : null}
              <strong>{n.title}</strong>
              <span className="q-muted">{n.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
