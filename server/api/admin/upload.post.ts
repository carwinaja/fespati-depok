const ALLOWED = new Set(['image/webp', 'image/jpeg', 'image/png', 'application/pdf'])
const MAX_BYTES = 5 * 1024 * 1024

export default defineEventHandler(async (event) => {
  const parts = await readMultipartFormData(event)
  const file = parts?.find((p) => p.name === 'file' && p.filename)
  if (!file) throw createError({ statusCode: 400, statusMessage: 'File tidak ditemukan' })
  if (!file.type || !ALLOWED.has(file.type)) {
    throw createError({ statusCode: 415, statusMessage: 'Tipe file harus WebP, JPEG, PNG, atau PDF' })
  }
  if (file.data.length > MAX_BYTES) {
    throw createError({ statusCode: 413, statusMessage: 'Ukuran file maksimal 5 MB' })
  }
  const url = await uploadToS3(file.data, file.filename!, file.type)
  return { url }
})
