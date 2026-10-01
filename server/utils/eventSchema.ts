import { z } from 'zod'

const nullable = (s: z.ZodString) => s.nullable().optional().transform((v) => v || null)
const mediaPath = /^\/media\/uploads\/[\w./-]+$/
const optionalUrl = z.union([z.literal(''), z.string().url()]).nullable().optional().transform((v) => v || null)

export const eventBody = z.object({
  title: z.string().trim().min(3).max(200),
  type: z.enum(['INTERNAL', 'EXTERNAL']).default('INTERNAL'),
  eventDate: z.coerce.date(),
  location: z.string().trim().min(2).max(200),
  description: nullable(z.string().trim().max(5000)),
  pdfUrl: z.union([z.literal(''), z.string().regex(mediaPath), z.string().url()]).nullable().optional().transform((v) => v || null),
  registrationUrl: optionalUrl,
  status: z.enum(['UPCOMING', 'ONGOING', 'DONE', 'CANCELLED']).default('UPCOMING'),
})

// Hanya link YouTube (watch, youtu.be, embed, shorts)
const YT = /^https:\/\/(www\.|m\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)[\w-]{6,}/

export const galleryBody = z
  .object({
    title: z.string().trim().min(2).max(200),
    category: z.string().trim().min(2).max(60),
    mediaType: z.enum(['PHOTO', 'VIDEO']),
    mediaUrl: z.union([z.literal(''), z.string().regex(mediaPath)]).nullable().optional().transform((v) => v || null),
    youtubeUrl: z.string().trim().nullable().optional().transform((v) => v || null),
    description: nullable(z.string().trim().max(1000)),
    eventId: z.string().nullable().optional().transform((v) => v || null),
  })
  .superRefine((d, ctx) => {
    if (d.mediaType === 'PHOTO' && !d.mediaUrl) ctx.addIssue({ code: 'custom', message: 'Foto wajib diunggah', path: ['mediaUrl'] })
    if (d.mediaType === 'VIDEO' && !(d.youtubeUrl && YT.test(d.youtubeUrl))) ctx.addIssue({ code: 'custom', message: 'Masukkan link YouTube yang valid', path: ['youtubeUrl'] })
  })
  .transform((d) => (d.mediaType === 'PHOTO' ? { ...d, youtubeUrl: null } : { ...d, mediaUrl: null }))
