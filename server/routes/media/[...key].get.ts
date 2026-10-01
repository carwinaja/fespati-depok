import { GetObjectCommand } from '@aws-sdk/client-s3'
import type { Readable } from 'node:stream'

// Menyajikan file privat dari S3. Hanya prefix uploads/ yang boleh diakses.
export default defineEventHandler(async (event) => {
  const key = getRouterParam(event, 'key') || ''
  if (!key.startsWith('uploads/') || key.includes('..')) {
    throw createError({ statusCode: 404 })
  }
  const config = useRuntimeConfig()
  try {
    const res = await getS3Client().send(new GetObjectCommand({ Bucket: config.s3BucketName, Key: key }))
    setHeader(event, 'Content-Type', res.ContentType || 'application/octet-stream')
    if (res.ContentLength) setHeader(event, 'Content-Length', res.ContentLength)
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
    setHeader(event, 'X-Content-Type-Options', 'nosniff')
    return sendStream(event, res.Body as Readable)
  } catch (e: any) {
    if (e?.name === 'NoSuchKey' || e?.$metadata?.httpStatusCode === 404) throw createError({ statusCode: 404 })
    throw createError({ statusCode: 502, statusMessage: 'Gagal mengambil file' })
  }
})
