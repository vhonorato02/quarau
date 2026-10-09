import { siteUrl as resolveSiteUrl } from './platform-env'

/** Maps a CMS document to its public path. Single source of truth for routing. */
export type RoutableCollection = 'pages' | 'projects' | 'services' | 'news' | 'jobs'

export const COLLECTION_BASE: Record<RoutableCollection, string> = {
  pages: '',
  projects: '/projetos',
  services: '/atuacao',
  news: '/noticias',
  jobs: '/trabalhe-conosco',
}

export function docPath(collection: RoutableCollection, slug: string | null | undefined): string {
  if (!slug) return '/'
  if (collection === 'pages') return slug === 'inicio' ? '/' : `/${slug}`
  return `${COLLECTION_BASE[collection]}/${slug}`
}

export function absoluteUrl(path: string, siteUrl = resolveSiteUrl()): string {
  return new URL(path, siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`).toString()
}

export const isRoutable = (slug: string): slug is RoutableCollection => slug in COLLECTION_BASE
