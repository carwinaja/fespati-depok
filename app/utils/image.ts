const MAX_DIM = 1600
const QUALITY = 0.8
const SKIP_BELOW = 150 * 1024 // sudah kecil, tidak perlu diproses

/**
 * Perkecil (maks. 1600 px sisi terpanjang) dan konversi ke WebP sebelum diunggah.
 * Foto kamera 3–5 MB biasanya jadi sekitar 150–300 KB. Bila hasilnya tidak lebih kecil
 * atau browser tidak mendukung, file asli dipakai apa adanya.
 */
export async function compressImage(file: File): Promise<File> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < SKIP_BELOW) return file
  try {
    const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' })
    const scale = Math.min(1, MAX_DIM / Math.max(bmp.width, bmp.height))
    const w = Math.round(bmp.width * scale)
    const h = Math.round(bmp.height * scale)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    canvas.getContext('2d')!.drawImage(bmp, 0, 0, w, h)
    bmp.close()
    const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/webp', QUALITY))
    if (!blob || blob.type !== 'image/webp' || blob.size >= file.size) return file
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.webp', { type: 'image/webp' })
  } catch {
    return file
  }
}

/** Kompres lalu unggah gambar ke S3; mengembalikan URL /media/uploads/… */
export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData()
  fd.append('file', await compressImage(file))
  return (await $fetch<{ url: string }>('/api/admin/upload', { method: 'POST', body: fd })).url
}
