import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { s3Storage } from '@payloadcms/storage-s3'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { pt } from '@payloadcms/translations/languages/pt'
import { createTransport } from 'nodemailer'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { editors } from './access'
import {
  Documents,
  Jobs,
  Leads,
  Media,
  News,
  Pages,
  Partners,
  Projects,
  Services,
  Team,
  Users,
} from './collections'
import { editor } from './fields/richText'
import { globals } from './globals'
import { onInit } from './lib/bootstrap'
import { databaseUrl, siteUrl as resolveSiteUrl } from './lib/platform-env'
import { migrations } from './migrations'
import { revalidateCollection, revalidateCollectionDelete } from './hooks/revalidate'
import { docPath, type RoutableCollection } from './lib/urls'
import { truncate } from './utilities/lexical'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const env = process.env
const siteUrl = resolveSiteUrl()
const isProd = env.NODE_ENV === 'production'
/**
 * Outgoing e-mail: any SMTP server, or Resend (free tier) when its API key is present
 * (the Vercel ↔ Resend integration sets RESEND_API_KEY).
 */
const smtpTransport = env.SMTP_HOST
  ? createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT ?? 587),
      secure: env.SMTP_SECURE === 'true',
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    })
  : env.RESEND_API_KEY
    ? createTransport({
        host: 'smtp.resend.com',
        port: 465,
        secure: true,
        auth: { user: 'resend', pass: env.RESEND_API_KEY },
      })
    : undefined

/** Running on Vercel (serverless): small DB pool, Blob storage, cron-driven jobs. */
const onVercel = Boolean(env.VERCEL)

export default buildConfig({
  serverURL: siteUrl,
  secret: env.PAYLOAD_SECRET || 'dev-only-secret-change-me-please',
  editor,
  sharp,
  telemetry: false,
  cors: [siteUrl],
  csrf: [siteUrl],

  admin: {
    user: Users.slug,
    // Built-in avatar: Gravatar is blocked by the CSP and would receive a hash of each editor's e-mail.
    avatar: 'default',
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: ' — Quarau CMS',
      description: 'Painel de conteúdo do site da Quarau',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/brand/favicon.svg' }],
      robots: 'noindex, nofollow',
    },
    components: {
      graphics: {
        Logo: '/components/admin/Logo#Logo',
        Icon: '/components/admin/Icon#Icon',
      },
      beforeDashboard: ['/components/admin/Welcome#Welcome'],
    },
    livePreview: {
      breakpoints: [
        { label: 'Celular', name: 'mobile', width: 375, height: 812 },
        { label: 'Tablet', name: 'tablet', width: 834, height: 1112 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    dateFormat: 'dd/MM/yyyy HH:mm',
  },

  i18n: {
    // The team works in Portuguese: the panel is always pt-BR, whatever the browser language.
    supportedLanguages: { pt },
    fallbackLanguage: 'pt',
  },

  localization: {
    locales: [
      { code: 'pt', label: 'Português (Brasil)' },
      { code: 'en', label: 'English' },
      { code: 'es', label: 'Español' },
    ],
    defaultLocale: 'pt',
    fallback: true,
  },

  collections: [
    Pages,
    Services,
    Projects,
    News,
    Jobs,
    Team,
    Partners,
    Media,
    Documents,
    Leads,
    Users,
  ],
  globals,

  db: postgresAdapter({
    pool: {
      connectionString: databaseUrl() ?? 'postgres://quarau:quarau@localhost:5432/quarau',
      max: Number(env.DATABASE_POOL_MAX ?? (onVercel ? 3 : 10)),
    },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Schema changes in production only through committed migrations, applied on boot.
    push: !isProd && env.PAYLOAD_DB_PUSH !== 'false',
    prodMigrations: migrations,
  }),

  email: smtpTransport
    ? nodemailerAdapter({
        defaultFromAddress: env.EMAIL_FROM_ADDRESS ?? 'nao-responda@quarau.com.br',
        defaultFromName: env.EMAIL_FROM_NAME ?? 'Quarau',
        // Never block startup on SMTP availability; delivery errors are handled per message.
        skipVerify: true,
        transport: smtpTransport,
      })
    : undefined,

  jobs: {
    // Scheduled publish/unpublish runs through the jobs queue.
    // Long-running servers poll every minute; on Vercel the cron in vercel.json calls
    // /api/payload-jobs/run with the CRON_SECRET bearer token instead.
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
      collections: ['pages', 'projects', 'services', 'news', 'jobs'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => `${(doc as { title?: string }).title ?? 'Quarau'} — Quarau`,
      generateDescription: ({ doc }) =>
        truncate(String((doc as { summary?: string }).summary ?? ''), 160),
      generateImage: ({ doc }) => {
        const d = doc as { coverImage?: number | { id: number } }
        return typeof d.coverImage === 'object' ? d.coverImage.id : (d.coverImage ?? '')
      },
      generateURL: ({ doc, collectionConfig }) =>
        `${siteUrl}${docPath((collectionConfig?.slug ?? 'pages') as RoutableCollection, (doc as { slug?: string }).slug)}`,
    }),
    vercelBlobStorage({
      enabled: Boolean(env.BLOB_READ_WRITE_TOKEN),
      collections: { media: { prefix: 'media' }, documents: { prefix: 'documents' } },
      token: env.BLOB_READ_WRITE_TOKEN ?? '',
      // Browser uploads straight to Blob: no 4.5 MB request limit for large photos and PDFs.
      clientUploads: true,
    }),
    s3Storage({
      enabled: Boolean(env.S3_ENDPOINT && env.S3_ACCESS_KEY_ID),
      collections: { media: { prefix: 'media' }, documents: { prefix: 'documents' } },
      bucket: env.S3_BUCKET ?? 'quarau-media',
      config: {
        endpoint: env.S3_ENDPOINT,
        region: env.S3_REGION ?? 'us-east-1',
        forcePathStyle: true,
        credentials: {
          accessKeyId: env.S3_ACCESS_KEY_ID ?? '',
          secretAccessKey: env.S3_SECRET_ACCESS_KEY ?? '',
        },
      },
    }),
  ],

  onInit,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  graphQL: { disable: false, disablePlaygroundInProduction: true },
})
