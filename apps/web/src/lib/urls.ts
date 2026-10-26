import { siteUrl as resolveSiteUrl } from './platform-env'

/** Maps a CMS document to its public path. Single source of truth for routing. */
export type RoutableCollection = 'pages' | 'projects' | 'services' | 'news'

export const COLLECTION_BASE: Record<RoutableCollection, string> = {
  pages: '',
  projects: '/projetos',
  services: '/atuacao',
  news: '/noticias',
}

/** The page whose slug is HOME_SLUG is served at "/". */
export const HOME_SLUG = 'inicio'

/** The news listing page; hidden (404, out of menus and sitemap) while no story is published. */
export const NEWS_SLUG = 'noticias'

export function docPath(collection: RoutableCollection, slug: string | null | undefined): string {
  if (!slug) return '/'
  if (collection === 'pages') return slug === HOME_SLUG ? '/' : `/${slug}`
  return `${COLLECTION_BASE[collection]}/${slug}`
}

export function absoluteUrl(path: string, siteUrl = resolveSiteUrl()): string {
  return new URL(path, siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`).toString()
}

export const isRoutable = (slug: string): slug is RoutableCollection => slug in COLLECTION_BASE
