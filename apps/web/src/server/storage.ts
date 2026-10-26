import type { S3ClientConfig } from '@aws-sdk/client-s3'

export type StorageConfig = {
  bucket: string
  client: S3ClientConfig
  fileUrl: (args: { filename: string; prefix?: string }) => string
}

/**
 * Media storage adapter, chosen by environment (docs/decisions/0019):
 * - S3_* set → any S3-compatible bucket (Cloudflare R2 in production, MinIO if ever needed),
 *   files served straight from S3_PUBLIC_URL (CDN), never through a serverless function;
 * - nothing set → local disk (MEDIA_DIR), for development and the VPS volume.
 */
export function storageConfig(env: NodeJS.ProcessEnv = process.env): StorageConfig | null {
  const { S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_PUBLIC_URL } = env
  if (!S3_ENDPOINT || !S3_BUCKET || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) return null
  if (!S3_PUBLIC_URL) throw new Error('S3_PUBLIC_URL é obrigatório quando S3_* está configurado.')
  const publicBase = S3_PUBLIC_URL.replace(/\/+$/, '')
  return {
    bucket: S3_BUCKET,
    client: {
      endpoint: S3_ENDPOINT,
      region: env.S3_REGION ?? 'auto',
      forcePathStyle: true,
      credentials: { accessKeyId: S3_ACCESS_KEY_ID, secretAccessKey: S3_SECRET_ACCESS_KEY },
    },
    fileUrl: ({ filename, prefix }) =>
      `${publicBase}/${[prefix, filename]
        .filter(Boolean)
        .map((p) => encodeURIComponent(p!).replace(/%2F/g, '/'))
        .join('/')}`,
  }
}

/** Origin of the public media host, for the CSP and next/image (empty when using local disk). */
export function mediaOrigin(env: NodeJS.ProcessEnv = process.env): string {
  try {
    return env.S3_PUBLIC_URL ? new URL(env.S3_PUBLIC_URL).origin : ''
  } catch {
    return ''
  }
}
