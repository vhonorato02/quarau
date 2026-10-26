import { fill } from '@/cms/globals/site-texts'
import { docPath } from '@/lib/urls'
import { getGlobal, getTexts } from '@/server/queries'

import { ContactFormClient, type FormTexts } from './ContactFormClient'
import { ContactList } from './Sections'
import { type BlockOf, headingId } from './types'

/** The privacy policy is the first internal page among the footer's legal links. */
export async function privacyPath(): Promise<string | null> {
  const footer = await getGlobal('footer')
  for (const l of footer.legalLinks ?? []) {
    const v = l.reference?.value
    if (l.reference?.relationTo === 'pages' && typeof v === 'object' && v?.slug)
      return docPath('pages', v.slug)
  }
  return null
}

export async function ContactForm({
  block,
  index,
}: {
  block: BlockOf<'contactForm'>
  index: number
}) {
  const [t, contact, privacy] = await Promise.all([getTexts(), getGlobal('contact'), privacyPath()])
  const id = headingId(block, index)
  const texts: FormTexts = { ...t.form, server: fill(t.form.server, { email: contact.email }) }
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
      <div className="q-contact-page">
        <ContactFormClient
          texts={texts}
          subjects={(contact.formSubjects ?? []).map((s) => s.label)}
          privacyHref={privacy}
          turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null}
        />
        <aside>
          <h2>{t.footer.contactTitle}</h2>
          <ContactList />
        </aside>
      </div>
    </section>
  )
}
