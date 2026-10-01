import { z } from 'zod'

const optionalUrl = z.union([z.literal(''), z.string().url(), z.string().regex(/^\/media\/uploads\/[\w./-]+$/)]).transform((v) => v || null).nullable().optional()

export const clubBody = z.object({
  name: z.string().trim().min(2),
  leaderName: z.string().trim().min(2),
  phone: z.string().trim().min(8).transform(normalizePhone),
  location: z.string().trim().min(2),
  schedule: z.string().trim().min(2),
  description: z.string().trim().nullable().optional().transform((v) => v || null),
  logoUrl: optionalUrl,
  mapUrl: optionalUrl,
  colorHex: z.string().regex(/^#[0-9a-fA-F]{6}$/).nullable().optional().or(z.literal('').transform(() => null)),
})
