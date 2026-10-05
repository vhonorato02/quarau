/**
 * Creates the S3 bucket used for media if it does not exist (idempotent).
 * Run at container start and in CI: `tsx scripts/ensure-bucket.ts`.
 */
import { CreateBucketCommand, HeadBucketCommand, S3Client } from '@aws-sdk/client-s3'

const {
  S3_ENDPOINT,
  S3_BUCKET = 'quarau-media',
  S3_REGION = 'us-east-1',
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
} = process.env

async function main() {
  if (!S3_ENDPOINT || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) {
    console.info('[ensure-bucket] S3 not configured, skipping')
    return
  }
  const s3 = new S3Client({
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    forcePathStyle: true,
    credentials: { accessKeyId: S3_ACCESS_KEY_ID, secretAccessKey: S3_SECRET_ACCESS_KEY },
  })
  try {
    await s3.send(new HeadBucketCommand({ Bucket: S3_BUCKET }))
    console.info(`[ensure-bucket] bucket "${S3_BUCKET}" ok`)
  } catch {
    await s3.send(new CreateBucketCommand({ Bucket: S3_BUCKET }))
    console.info(`[ensure-bucket] bucket "${S3_BUCKET}" created`)
  }
}

main().catch((err) => {
  console.error('[ensure-bucket] failed', err)
  process.exit(1)
})
