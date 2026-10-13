import { z } from 'zod'

export const CURATION_MAX_BYTES = 25 * 1024 * 1024

export const CURATION_MIME: Record<string, string> = {
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'application/vnd.ms-excel': 'XLS',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'application/vnd.ms-powerpoint': 'PPT',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
  'text/csv': 'CSV',
  'application/zip': 'ZIP',
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WEBP',
}

const mimeType = z.string().refine((v) => v in CURATION_MIME, 'Tipe file tidak didukung')
const mediaPath = z.string().regex(/^\/media\/uploads\/curation\/[\w.-]+$/, 'URL file tidak valid')

export const curationBody = z.object({
  title: z.string().trim().min(3, 'Judul minimal 3 karakter').max(120),
  description: z.string().trim().max(500).nullable().optional().transform((v) => v || null),
  isPublished: z.boolean().default(false),
})

export const curationReorderBody = z.object({ ids: z.array(z.string()).min(1) })

export const presignBody = z.object({
  fileName: z.string().trim().min(1).max(200),
  mimeType,
  size: z.number().int().positive().max(CURATION_MAX_BYTES, 'Ukuran file maksimal 25 MB'),
})

export const curationFileCreateBody = z.object({
  title: z.string().trim().min(1).max(200),
  fileName: z.string().trim().min(1).max(200),
  fileUrl: mediaPath,
  mimeType,
  size: z.number().int().positive().max(CURATION_MAX_BYTES),
})

export const curationFilePatchBody = z.object({ title: z.string().trim().min(1, 'Judul wajib diisi').max(200) })
