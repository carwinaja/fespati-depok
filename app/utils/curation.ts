export const CURATION_MAX_BYTES = 25 * 1024 * 1024

// Harus sama dengan server/utils/curationSchema.ts
const EXT_MIME: Record<string, string> = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  csv: 'text/csv',
  zip: 'application/zip',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

export const CURATION_ACCEPT = Object.keys(EXT_MIME).map((e) => `.${e}`).join(',')

const LABEL: Record<string, string> = {
  'application/pdf': 'PDF', 'application/msword': 'DOC', 'text/csv': 'CSV', 'application/zip': 'ZIP',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'application/vnd.ms-excel': 'XLS', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'application/vnd.ms-powerpoint': 'PPT', 'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
  'image/jpeg': 'JPG', 'image/png': 'PNG', 'image/webp': 'WEBP',
}
export const fileLabel = (mime: string) => LABEL[mime] ?? 'FILE'

export function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

/** Tipe MIME file; browser sering mengosongkan `type` untuk docx/csv, jadi pakai ekstensi sebagai cadangan. */
function mimeOf(file: File) {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  return EXT_MIME[ext] ?? (Object.values(EXT_MIME).includes(file.type) ? file.type : '')
}

export function validateCurationFile(file: File): string | null {
  if (!mimeOf(file)) return 'Tipe file tidak didukung'
  if (file.size > CURATION_MAX_BYTES) return 'Ukuran file maksimal 25 MB'
  if (file.size === 0) return 'File kosong'
  return null
}

function putWithProgress(url: string, file: File, mime: string, onProgress: (pct: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', url)
    xhr.setRequestHeader('Content-Type', mime)
    xhr.upload.onprogress = (e) => { if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100)) }
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`Upload ditolak storage (${xhr.status})`)))
    xhr.onerror = () => reject(new Error('Upload gagal. Periksa koneksi atau pengaturan CORS bucket'))
    xhr.send(file)
  })
}

/** Unggah langsung ke bucket (presigned), lalu catat file ke curation. */
export async function uploadCurationFile(curationId: string, file: File, onProgress: (pct: number) => void) {
  const err = validateCurationFile(file)
  if (err) throw new Error(err)
  const mime = mimeOf(file)
  const { uploadUrl, url } = await $fetch<{ uploadUrl: string; url: string }>('/api/admin/curations/presign', {
    method: 'POST',
    body: { fileName: file.name, mimeType: mime, size: file.size },
  })
  await putWithProgress(uploadUrl, file, mime, onProgress)
  return $fetch(`/api/admin/curations/${curationId}/files`, {
    method: 'POST',
    body: { title: file.name.replace(/\.[^.]+$/, '').replace(/[_]+/g, ' '), fileName: file.name, fileUrl: url, mimeType: mime, size: file.size },
  })
}
