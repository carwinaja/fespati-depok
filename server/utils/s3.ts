import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export const getS3Client = () => {
  const config = useRuntimeConfig()
  
  return new S3Client({
    region: config.s3Region || process.env.S3_REGION || 'us-east-1',
    endpoint: config.s3Endpoint || process.env.S3_ENDPOINT || 'https://kencana.basic.box.cloudeka.id',
    credentials: {
      accessKeyId: config.s3AccessKey || process.env.s3_access_key || '',
      secretAccessKey: config.s3SecretKey || process.env.s3_secret_key || '',
    },
    forcePathStyle: true,
  })
}

export async function uploadToS3(fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> {
  const config = useRuntimeConfig()
  const bucketName = config.s3BucketName || process.env.S3_BUCKET_NAME || 'fespatistorage-idnhpb'
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

  const endpoint = (config.s3Endpoint || process.env.S3_ENDPOINT || 'https://kencana.basic.box.cloudeka.id').replace(/\/$/, '')
  return `${endpoint}/${bucketName}/${key}`
}
