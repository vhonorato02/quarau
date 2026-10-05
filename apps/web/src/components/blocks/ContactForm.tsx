import { Container, Section } from '@quarau/ui'
import { getTranslations } from 'next-intl/server'

import type { Locale } from '@/i18n/routing'
import { getGlobal } from '@/lib/queries'
import type { ContactFormBlock as ContactFormBlockType } from '@/payload-types'

import { ContactFormClient } from './ContactFormClient'
import { SectionHeader, toneToSection } from './SectionHeader'

const waHref = (n: string) => `https://wa.me/55${n.replace(/\D/g, '')}`

export async function ContactFormBlock({ block, locale }: { block: ContactFormBlockType; locale: Locale }) {
  const [contact, t] = await Promise.all([getGlobal('contact', locale).catch(() => null), getTranslations('contact')])
  const subjects = contact?.formSubjects?.map((s) => s.label).filter(Boolean) ?? []
  const email = contact?.email ?? 'contato@quarau.com.br'

  return (
    <Section tone={toneToSection(block.tone)} id={block.anchor ?? 'contato'}>
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeader eyebrow={block.eyebrow} heading={block.heading} intro={block.intro} className="mb-0 lg:mb-0" />
          <dl className="grid gap-6 border-t border-line pt-8">
            <div>
              <dt className="text-sm font-semibold text-ink-muted">E-mail</dt>
              <dd className="text-h4 font-medium">
                <a href={`mailto:${email}`} className="hover:text-blue-700 hover:underline">
                  {email}
                </a>
              </dd>
            </div>
            {contact?.phones?.length ? (
              <div>
                <dt className="text-sm font-semibold text-ink-muted">Telefone / WhatsApp</dt>
                {contact.phones.map((p) => (
                  <dd key={p.number} className="text-h4 font-medium">
                    <a
                      href={p.whatsapp ? waHref(p.number) : `tel:+55${p.number.replace(/\D/g, '')}`}
                      className="hover:text-blue-700 hover:underline"
                    >
                      {p.number}
                    </a>
                  </dd>
                ))}
              </div>
            ) : null}
            {contact?.address?.city ? (
              <div>
                <dt className="text-sm font-semibold text-ink-muted">Localização</dt>
                <dd className="text-h4 font-medium">
                  {contact.address.city} — {contact.address.state}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
        <div className="lg:col-span-7">
          <ContactFormClient
            subjects={subjects}
            locale={locale}
            turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? null}
            labels={{
              name: t('name'),
              email: t('email'),
              phone: t('phone'),
              organization: t('organization'),
              subject: t('subject'),
              message: t('message'),
              consent: t.raw('consent') as string,
              submit: t('submit'),
              sending: t('sending'),
              success: t('success'),
              error: t('error', { email }),
              rateLimited: t('rateLimited'),
              invalid: t('invalid'),
              required: t('required'),
              emailInvalid: t('emailInvalid'),
              messageShort: t('messageShort'),
              consentRequired: t('consentRequired'),
              captcha: t('captcha'),
            }}
          />
        </div>
      </Container>
    </Section>
  )
}
