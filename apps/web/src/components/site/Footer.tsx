import { ArrowIcon, BrandDot, Button, Container, Logotype } from '@quarau/ui'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

import { CMSLink, type LinkData } from '@/components/CMSLink'
import type { Locale } from '@/i18n/routing'
import { getGlobal } from '@/lib/queries'

import { DEFAULT_NAV } from './nav-defaults'
import { SocialIcon } from './SocialIcon'
import { CookiePreferencesButton } from '../privacy/CookiePreferencesButton'

const telHref = (n: string) => `tel:+55${n.replace(/\D/g, '')}`
const waHref = (n: string) => `https://wa.me/55${n.replace(/\D/g, '')}`

export async function Footer({ locale }: { locale: Locale }) {
  const [footer, contact, social, t, tc] = await Promise.all([
    getGlobal('footer', locale).catch(() => null),
    getGlobal('contact', locale).catch(() => null),
    getGlobal('social', locale).catch(() => null),
    getTranslations('footer'),
    getTranslations('common'),
  ])
  const year = new Date().getFullYear()
  const address = contact?.address
  const city = [address?.city, address?.state].filter(Boolean).join(' — ')

  return (
    <footer className="on-dark relative overflow-hidden bg-blue-950 text-white">
      {/* Oversized brand symbol watermark (echoes the original slider artwork) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        className="pointer-events-none absolute -right-24 -bottom-40 w-[42rem] text-white/[0.035]"
      >
        <circle cx="42" cy="42" r="32" fill="none" stroke="currentColor" strokeWidth="9" />
        <path d="M64 64 86 86" stroke="currentColor" strokeWidth="9" />
      </svg>

      <Container className="relative">
        <div className="grid gap-10 border-b border-white/15 py-20 md:grid-cols-[1.4fr_1fr] md:items-end lg:py-28">
          <p className="text-h1 font-semibold text-balance">
            Vamos tirar o seu projeto do papel
            <BrandDot className="ml-1 inline-block size-[0.16em]" />
          </p>
          <div className="flex flex-col gap-6 md:items-end">
            <p className="max-w-sm text-lg text-white/75 md:text-right">
              Da concepção à difusão de resultados, com método e presença no território.
            </p>
            <Button asChild variant="inverse" size="lg">
              <Link href="/contato">
                {tc('contactCta')}
                <ArrowIcon />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <Logotype variant="white" className="w-64" />
            {footer?.tagline ? <p className="max-w-xs text-white/70">{footer.tagline}</p> : null}
          </div>

          <nav aria-label="Rodapé">
            <h2 className="text-eyebrow mb-5 font-semibold tracking-(--text-eyebrow--letter-spacing) text-white/60 uppercase">
              Site
            </h2>
            <ul className="flex flex-col gap-3">
              {(footer?.columns?.[0]?.links?.length
                ? footer.columns[0].links.map((l) => ({ ...(l as LinkData) }))
                : DEFAULT_NAV.map((n) => ({
                    type: 'external' as const,
                    url: n.href,
                    label: n.label,
                  }))
              ).map((l, i) => (
                <li key={`${l.label}-${i}`}>
                  <CMSLink link={l} className="text-white/85 hover:text-white" />
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-eyebrow mb-5 font-semibold tracking-(--text-eyebrow--letter-spacing) text-white/60 uppercase">
              {t('contact')}
            </h2>
            <address className="flex flex-col gap-3 text-white/85 not-italic">
              {contact?.email ? (
                <a href={`mailto:${contact.email}`} className="hover:text-white hover:underline">
                  {contact.email}
                </a>
              ) : null}
              {contact?.phones?.map((p) => (
                <a
                  key={p.number}
                  href={p.whatsapp ? waHref(p.number) : telHref(p.number)}
                  className="hover:text-white hover:underline"
                >
                  {p.number}
                  {p.whatsapp ? <span className="text-white/50"> · WhatsApp</span> : null}
                </a>
              ))}
              {address?.street ? <span>{address.street}</span> : null}
              {city ? <span>{city}</span> : null}
            </address>
          </div>

          <div>
            <h2 className="text-eyebrow mb-5 font-semibold tracking-(--text-eyebrow--letter-spacing) text-white/60 uppercase">
              {t('follow')}
            </h2>
            <ul className="flex gap-3">
              {social?.profiles?.map((p) => (
                <li key={p.url}>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink grid size-12 place-items-center rounded-full border border-white/20 transition-colors hover:border-white hover:bg-white"
                  >
                    <SocialIcon network={p.network} className="size-5" />
                    <span className="sr-only">
                      {p.network} {p.handle ?? ''} (abre em nova aba)
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/15 py-8 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {contact?.companyName ?? 'Quarau'}
            {contact?.cnpj ? ` · CNPJ ${contact.cnpj}` : ''}. {t('rights')}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footer?.legalLinks?.map((l, i) => (
              <li key={i}>
                <CMSLink link={l as LinkData} className="hover:text-white" />
              </li>
            ))}
            <li>
              <Link href="/privacidade" className="hover:text-white hover:underline">
                {t('privacy')}
              </Link>
            </li>
            <li>
              <CookiePreferencesButton label={t('cookies')} />
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  )
}
