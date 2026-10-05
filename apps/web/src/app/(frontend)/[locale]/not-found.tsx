import { ArrowIcon, Button, Container, Heading } from '@quarau/ui'
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function NotFound() {
  const t = await getTranslations('notFound')
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+6rem)] pb-(--spacing-section)">
      <svg aria-hidden="true" viewBox="0 0 100 100" className="pointer-events-none absolute -top-10 -right-20 w-[36rem] text-blue-50">
        <circle cx="42" cy="42" r="32" fill="none" stroke="currentColor" strokeWidth="9" />
        <path d="M64 64 86 86" stroke="currentColor" strokeWidth="9" />
      </svg>
      <Container className="relative flex max-w-4xl flex-col gap-8">
        <p className="text-eyebrow font-semibold tracking-(--text-eyebrow--letter-spacing) text-blue-700 uppercase">Erro 404</p>
        <Heading as="h1" size="h1" dot>
          {t('title')}
        </Heading>
        <p className="text-lead text-ink-muted">{t('text')}</p>
        <form role="search" action="/busca" className="flex max-w-xl gap-3">
          <label htmlFor="q404" className="sr-only">
            Buscar no site
          </label>
          <input id="q404" name="q" type="search" placeholder="Buscar no site" className="h-12 flex-1 rounded-full border border-line-strong px-5" />
          <Button type="submit" variant="secondary">
            Buscar
          </Button>
        </form>
        <Button asChild size="lg" className="self-start">
          <Link href="/">
            {t('home')}
            <ArrowIcon />
          </Link>
        </Button>
      </Container>
    </section>
  )
}
