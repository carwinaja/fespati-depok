import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const getS3Client = () => {
  const config = useRuntimeConfig()
  
  return new S3Client({
    region: config.s3Region || process.env.S3_REGION || 'us-east-1',
    endpoint: config.s3Endpoint || process.env.S3_ENDPOINT,
    credentials: {
      accessKeyId: config.s3AccessKey || process.env.s3_access_key || '',
      secretAccessKey: config.s3SecretKey || process.env.s3_secret_key || '',
    },
    forcePathStyle: true,
  })
}

export async function uploadToS3(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
  const config = useRuntimeConfig()
  const bucketName = config.s3BucketName || process.env.S3_BUCKET_NAME
  const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_')
  const key = `uploads/${Date.now()}_${cleanFileName}`

  const client = getS3Client()
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
  })

  await client.send(command)

  // Bucket privat: file disajikan lewat route /media/**
  return `/media/${key}`
}


const PRESIGN_TTL = 600 // detik

/** URL PUT sementara agar browser mengunggah langsung ke bucket (tidak lewat server/Vercel). */
export async function createPresignedUpload(opts: { prefix: string; fileName: string; mimeType: string; size: number }) {
  const config = useRuntimeConfig()
  const bucketName = config.s3BucketName || process.env.S3_BUCKET_NAME
  const clean = opts.fileName.replace(/[^a-zA-Z0-9.-]/g, '_').slice(-120)
  const key = `${opts.prefix}/${crypto.randomUUID().slice(0, 8)}_${clean}`
  const command = new PutObjectCommand({ Bucket: bucketName, Key: key, ContentType: opts.mimeType, ContentLength: opts.size })
  const uploadUrl = await getSignedUrl(getS3Client(), command, { expiresIn: PRESIGN_TTL })
  return { uploadUrl, key, url: `/media/${key}` }
}

/** Hapus objek berdasarkan URL /media/…; kegagalan hanya dicatat (data DB sudah terhapus). */
export async function deleteMedia(urls: string[]) {
  const config = useRuntimeConfig()
  const bucketName = config.s3BucketName || process.env.S3_BUCKET_NAME
  const client = getS3Client()
  await Promise.all(
    urls
      .filter((u) => u.startsWith('/media/uploads/'))
      .map((u) =>
        client.send(new DeleteObjectCommand({ Bucket: bucketName, Key: u.slice('/media/'.length) })).catch((e) => {
          console.error('Gagal menghapus objek S3', u, e?.name)
        }),
      ),
  )
}
