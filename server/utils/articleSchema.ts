import { z } from 'zod'

const mediaOrUrl = z.union([z.literal(''), z.string().url(), z.string().regex(/^\/media\/uploads\/[\w./-]+$/)])

export const articleBody = z.object({
  title: z.string().trim().min(3).max(200),
  category: z.string().trim().min(2).max(60),
  excerpt: z.string().trim().max(300).nullable().optional().transform((v) => v || null),
  content: z.string().trim().min(1, 'Isi artikel wajib diisi').max(200_000).transform(sanitizeArticleHtml),
  thumbnailUrl: mediaOrUrl.nullable().optional().transform((v) => v || null),
  author: z.string().trim().min(2).max(100).default('Admin FESPATI'),
  isPublished: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  publishedAt: z.coerce.date().optional(),
})
