import { defineRouting } from 'next-intl/routing'

/** All locales the site is structured for. pt is the default and has no URL prefix. */
export const ALL_LOCALES = ['pt', 'en', 'es'] as const
export type Locale = (typeof ALL_LOCALES)[number]

/** Locales actually published (EN/ES are prepared but off until translated). */
export const ENABLED_LOCALES = (process.env.NEXT_PUBLIC_ENABLED_LOCALES ?? 'pt')
  .split(',')
  .map((l) => l.trim())
  .filter((l): l is Locale => (ALL_LOCALES as readonly string[]).includes(l))

export const routing = defineRouting({
  locales: ENABLED_LOCALES.length ? ENABLED_LOCALES : ['pt'],
  defaultLocale: 'pt',
  localePrefix: 'as-needed',
  localeDetection: false,
})

export const htmlLang: Record<Locale, string> = { pt: 'pt-BR', en: 'en', es: 'es' }
export const ogLocale: Record<Locale, string> = { pt: 'pt_BR', en: 'en_US', es: 'es_ES' }
