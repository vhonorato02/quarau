import type { Payload } from 'payload'

import { toSearchDoc } from '../hooks/search'
import { ensureIndex, searchIndex, upsertDocuments, type SearchDoc } from './search'

const INDEXED = ['pages', 'projects', 'services', 'news'] as const

/** Creates the S3 bucket when missing (fresh installs, restores, CI). */
export async function ensureBucket(payload: Payload): Promise<void> {
  const {
    S3_ENDPOINT,
    S3_BUCKET = 'quarau-media',
    S3_REGION = 'us-east-1',
    S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY,
  } = process.env
  if (!S3_ENDPOINT || !S3_ACCESS_KEY_ID || !S3_SECRET_ACCESS_KEY) return
  const { S3Client, HeadBucketCommand, CreateBucketCommand } = await import('@aws-sdk/client-s3')
  const s3 = new S3Client({
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    forcePathStyle: true,
    credentials: { accessKeyId: S3_ACCESS_KEY_ID, secretAccessKey: S3_SECRET_ACCESS_KEY },
  })
  try {
    await s3.send(new HeadBucketCommand({ Bucket: S3_BUCKET }))
  } catch {
    await s3.send(new CreateBucketCommand({ Bucket: S3_BUCKET }))
    payload.logger.info(`bucket ${S3_BUCKET} criado`)
  }
}

/** Rebuilds the whole search index from published content. */
export async function reindexAll(payload: Payload): Promise<number> {
  await ensureIndex()
  const docs: SearchDoc[] = []
  for (const collection of INDEXED) {
    const res = await payload.find({
      collection,
      where: { _status: { equals: 'published' } },
      depth: 1,
      limit: 1000,
      pagination: false,
      locale: 'pt',
    })
    for (const d of res.docs) docs.push(toSearchDoc(collection, d as never, 'pt'))
  }
  const idx = searchIndex()
  if (idx) {
    await idx.deleteAllDocuments().waitTask()
    await upsertDocuments(docs)
  }
  return docs.length
}

/** Runs once per server boot, without blocking startup. */
export function onInit(payload: Payload): void {
  void (async () => {
    try {
      await ensureBucket(payload)
      const idx = searchIndex()
      if (idx) {
        const stats = await idx.getStats().catch(() => ({ numberOfDocuments: 0 }))
        if (stats.numberOfDocuments === 0) {
          const n = await reindexAll(payload)
          payload.logger.info(`índice de busca recriado (${n} documentos)`)
        }
      }
    } catch (err) {
      payload.logger.warn({ err }, 'bootstrap tasks failed')
    }
  })()
}
