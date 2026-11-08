import { absoluteUrl, docPath } from '@/lib/urls'
import { getDocBySlug, getGlobal, listNews, listProjects, listServices } from '@/server/queries'

// Runtime: follows publishing and the SITE_URL of the running environment.
export const dynamic = 'force-dynamic'

const line = (title: string, path: string, note?: string | null) =>
  `- [${title}](${absoluteUrl(path)})${note ? `: ${note.replace(/\s+/g, ' ').trim()}` : ''}`

/**
 * /llms.txt (llmstxt.org): a plain summary of the site for answer engines, built from the CMS
 * (the same published content as the pages; section names are the titles of the listing pages).
 */
export async function GET() {
  const [settings, contact, projects, services, news, projectsPage, servicesPage, newsPage, about] =
    await Promise.all([
      getGlobal('settings'),
      getGlobal('contact'),
      listProjects(),
      listServices(),
      listNews(24),
      getDocBySlug('pages', 'projetos'),
      getDocBySlug('pages', 'atuacao'),
      getDocBySlug('pages', 'noticias'),
      getDocBySlug('pages', 'sobre'),
    ])

  const out: string[] = [`# ${settings.siteName}`, '', `> ${settings.defaultDescription}`, '']
  if (about) out.push(line(about.title, docPath('pages', about.slug), about.meta?.description), '')
  if (services.length) {
    out.push(`## ${servicesPage?.title ?? 'Atuação'}`, '')
    for (const s of services) out.push(line(s.title, docPath('services', s.slug), s.summary))
    out.push('')
  }
  if (projects.length) {
    out.push(`## ${projectsPage?.title ?? 'Projetos'}`, '')
    for (const p of projects) {
      const where = [p.territory, p.carriedOutBy].filter(Boolean).join('; ')
      out.push(
        line(p.title, docPath('projects', p.slug), [where, p.summary].filter(Boolean).join('. ')),
      )
    }
    out.push('')
  }
  if (news.length) {
    out.push(`## ${newsPage?.title ?? 'Notícias'}`, '')
    for (const n of news) out.push(line(n.title, docPath('news', n.slug), n.summary))
    out.push('')
  }
  const reach = [contact.email, ...(contact.phones ?? []).map((p) => p.number)].filter(Boolean)
  if (reach.length) out.push('## Contato', '', ...reach.map((r) => `- ${r}`), '')

  return new Response(out.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600',
    },
  })
}
