import { fill } from '@/cms/globals/site-texts'
import { CMSLink } from '@/components/CMSLink'
import { getGlobal, getTexts } from '@/server/queries'

import { CookiePreferencesButton } from './CookieConsent'
import { phoneHref, whatsappHref } from './contact-links'

export async function Footer() {
  const [footer, contact, social, t] = await Promise.all([
    getGlobal('footer'),
    getGlobal('contact'),
    getGlobal('social'),
    getTexts(),
  ])
  const place = [contact.address?.city, contact.address?.state].filter(Boolean).join(', ')
  const street = [contact.address?.street, contact.address?.district].filter(Boolean).join(', ')
  return (
    <footer className="q-footer on-dark">
      <div className="q-wrap q-footer__in">
        <div className="q-footer__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/quarau-logotipo-branco.svg"
            alt={contact.name}
            width={1295}
            height={306}
            loading="lazy"
          />
          {footer.tagline ? <p>{footer.tagline}</p> : null}
        </div>
        {footer.links?.length ? (
          <nav className="q-footer__nav" aria-labelledby="footer-nav">
            <h2 id="footer-nav">{t.footer.navTitle}</h2>
            <ul>
              {footer.links.map((link) => (
                <li key={link.id}>
                  <CMSLink link={link} variant="plain" />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <div className="q-footer__contact">
          <h2>{t.footer.contactTitle}</h2>
          <address>
            {street ? <span className="block">{street}</span> : null}
            {place ? <span className="block">{place}</span> : null}
            <a className="block" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            {(contact.phones ?? []).map((p) => (
              <a
                key={p.id}
                className="block"
                href={p.whatsapp ? whatsappHref(p.number) : phoneHref(p.number)}
              >
                {p.number}
                {p.whatsapp ? <span className="q-sr">{` ${t.contact.whatsapp}`}</span> : null}
              </a>
            ))}
          </address>
          {social.profiles?.length ? (
            <ul className="mt-4" aria-label={t.footer.socialTitle}>
              {social.profiles.map((p) => (
                <li key={p.id}>
                  <a href={p.url} rel="noopener noreferrer me">
                    {t.contact[p.network]}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="q-footer__legal">
          <p>
            {fill(t.footer.copyright, {
              year: new Date().getFullYear(),
              name: contact.legalName || contact.name,
            })}
            {contact.cnpj ? (
              <span className="ml-3">{fill(t.footer.cnpj, { cnpj: contact.cnpj })}</span>
            ) : null}
          </p>
          <ul>
            {(footer.legalLinks ?? []).map((link) => (
              <li key={link.id}>
                <CMSLink link={link} variant="plain" />
              </li>
            ))}
            <li>
              <CookiePreferencesButton label={t.footer.cookiePreferences} />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
