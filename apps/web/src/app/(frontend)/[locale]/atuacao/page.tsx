import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { ServicesBlock } from '@/components/blocks/Services'
import { PageHeader } from '@/components/PageHeader'
import type { Locale } from '@/i18n/routing'
import { getGlobal } from '@/lib/queries'
import { buildMetadata } from '@/lib/seo'

const LEAD =
  'A Quarau atua em todas as etapas de um projeto — concepção, prospecção, seleção, planejamento, execução, monitoramento, encerramento, promoção e difusão.'

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/atuacao'>): Promise<Metadata> {
  const { locale } = await params
  const settings = await getGlobal('site-settings', locale as Locale).catch(() => null)
  return buildMetadata({
    title: 'Áreas de atuação',
    description: LEAD,
    path: '/atuacao',
    locale: locale as Locale,
    settings,
  })
}

export default async function ServicesPage({ params }: PageProps<'/[locale]/atuacao'>) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <PageHeader
        eyebrow="Atuação"
        title="Áreas de atuação"
        lead={LEAD}
        crumbs={[{ label: 'Início', href: '/' }, { label: 'Atuação' }]}
      />
      <ServicesBlock
        locale={locale as Locale}
        block={{
          blockType: 'services',
          tone: 'default',
          services: [],
          heading: null,
          eyebrow: null,
          intro: null,
        }}
      />
    </>
  )
}
