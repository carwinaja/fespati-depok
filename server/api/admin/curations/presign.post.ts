// Beri browser URL PUT sementara agar file diunggah langsung ke bucket.
export default defineEventHandler(async (event) => {
  const { fileName, mimeType, size } = await readValidatedBody(event, presignBody.parse)
  return createPresignedUpload({ prefix: 'uploads/curation', fileName, mimeType, size })
})
