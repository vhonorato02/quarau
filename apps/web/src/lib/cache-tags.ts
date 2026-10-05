/** Cache tags shared by data fetching (unstable_cache / fetch) and CMS revalidation hooks. */
export const tags = {
  collection: (slug: string) => `collection:${slug}`,
  doc: (slug: string, docSlug: string) => `doc:${slug}:${docSlug}`,
  global: (slug: string) => `global:${slug}`,
  redirects: 'redirects',
  sitemap: 'sitemap',
} as const
