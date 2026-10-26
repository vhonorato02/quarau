import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { pt } from '@payloadcms/translations/languages/pt'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { editors } from './cms/access'
import { Leads, Media, News, Pages, Partners, Projects, Services, Users } from './cms/collections'
import { editor } from './cms/fields/richText'
import { globals } from './cms/globals'
import { revalidateCollection, revalidateCollectionDelete } from './cms/hooks/revalidate'
import { lexicalToText, truncate } from './lib/lexical'
import { databaseUrl, siteUrl as resolveSiteUrl } from './lib/platform-env'
import { docPath, type RoutableCollection } from './lib/urls'
import { mailTransport } from './server/mail'
import { storageConfig } from './server/storage'
import { migrations } from './migrations'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const env = process.env
const siteUrl = resolveSiteUrl()
const isProd = env.NODE_ENV === 'production'
const onVercel = Boolean(env.VERCEL)
const transport = mailTransport()
const storage = storageConfig()

if (isProd && !env.PAYLOAD_SECRET && env.NEXT_PHASE !== 'phase-production-build') {
  throw new Error('PAYLOAD_SECRET é obrigatório em produção.')
}

export default buildConfig({
  serverURL: siteUrl,
  secret: env.PAYLOAD_SECRET || 'dev-only-secret-not-for-production',
  editor,
  sharp,
  telemetry: false,
  cors: [siteUrl],
  csrf: [siteUrl],
  // Public REST is enough (the site uses the Local API); GraphQL is attack surface with no use.
  graphQL: { disable: true },

  admin: {
    user: Users.slug,
    // Built-in avatar: Gravatar would receive a hash of each editor's e-mail.
    avatar: 'default',
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' — Painel Quarau',
      description: 'Painel de conteúdo do site da Quarau',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/brand/favicon.svg' }],
      robots: 'noindex, nofollow',
    },
    components: {
      graphics: { Logo: '/cms/admin/Logo#Logo', Icon: '/cms/admin/Icon#Icon' },
      beforeDashboard: ['/cms/admin/Dashboard#Dashboard'],
    },
    livePreview: {
      breakpoints: [
        { label: 'Celular', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 834, height: 1112 },
        { label: 'Computador', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    dateFormat: 'dd/MM/yyyy HH:mm',
  },

  // The team works in Portuguese: the panel is always pt-BR.
  i18n: { supportedLanguages: { pt }, fallbackLanguage: 'pt' },

  collections: [Pages, Projects, Services, News, Partners, Media, Leads, Users],
  globals,

  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl() ?? 'postgres://quarau:quarau@localhost:54329/quarau',
      max: Number(env.DATABASE_POOL_MAX ?? (onVercel ? 3 : 10)),
    },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Schema changes only through committed migrations (docs/decisions/0020).
    push: false,
    prodMigrations: migrations,
  }),

  email: transport
    ? nodemailerAdapter({
        defaultFromAddress: env.EMAIL_FROM_ADDRESS ?? 'nao-responda@quarau.com.br',
        defaultFromName: env.EMAIL_FROM_NAME ?? 'Quarau',
        skipVerify: true,
        transport,
      })
    : undefined,

  jobs: {
    // Scheduled publishing runs through the jobs queue. Long-running servers (VPS) poll every
    // minute; on Vercel an external scheduler calls /api/payload-jobs/run (docs/decisions/0019).
    autoRun: [{ cron: '* * * * *', limit: 20, queue: 'default' }],
    shouldAutoRun: () => !onVercel && env.PAYLOAD_JOBS_AUTORUN !== 'false',
    access: {
      run: ({ req }) =>
        Boolean(req.user) ||
        (Boolean(env.CRON_SECRET) &&
          req.headers.get('authorization') === `Bearer ${env.CRON_SECRET}`),
    },
  },

  plugins: [
    redirectsPlugin({
      collections: ['pages', 'projects', 'services', 'news'],
      redirectTypes: ['301', '302'],
      overrides: {
        labels: { singular: 'Redirecionamento', plural: 'Redirecionamentos' },
        admin: { group: 'Configurações do site', defaultColumns: ['from', 'to', 'type'] },
        access: { read: () => true, create: editors, update: editors, delete: editors },
        hooks: {
          afterChange: [revalidateCollection('redirects')],
          afterDelete: [revalidateCollectionDelete('redirects')],
        },
      },
    }),
    seoPlugin({
      collections: ['pages', 'projects', 'services', 'news'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => String((doc as { title?: string }).title ?? ''),
      generateDescription: ({ doc }) => {
        const d = doc as { summary?: string; lead?: unknown }
        return truncate(d.summary ?? lexicalToText(d.lead), 160)
      },
      generateImage: ({ doc }) => {
        const d = doc as { coverImage?: number | { id: number } }
        return typeof d.coverImage === 'object' ? d.coverImage.id : (d.coverImage ?? '')
      },
      generateURL: ({ doc, collectionConfig }) =>
        `${siteUrl}${docPath((collectionConfig?.slug ?? 'pages') as RoutableCollection, (doc as { slug?: string }).slug)}`,
    }),
    s3Storage({
      enabled: Boolean(storage),
      collections: {
        media: {
          prefix: 'media',
          disablePayloadAccessControl: true,
          generateFileURL: storage?.fileUrl,
        },
      },
      bucket: storage?.bucket ?? '',
      config: storage?.client ?? {},
    }),
  ],

  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
