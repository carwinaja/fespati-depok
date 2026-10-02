import { z } from 'zod'

const mediaPath = /^\/media\/uploads\/[\w./-]+$/

export const MAX_HERO_SLIDES = 5

export const heroBody = z.object({
  imageUrl: z.string().regex(mediaPath, 'Gambar wajib diunggah'),
  alt: z.string().trim().min(2, 'Deskripsi gambar minimal 2 karakter').max(200),
  linkUrl: z
    .union([z.literal(''), z.string().trim().url().max(500), z.string().trim().regex(/^\/[\w\-./#?=&]*$/)])
    .nullable()
    .optional()
    .transform((v) => v || null),
  isActive: z.boolean().default(true),
})

export const heroReorderBody = z.object({ ids: z.array(z.string()).min(1).max(MAX_HERO_SLIDES) })
