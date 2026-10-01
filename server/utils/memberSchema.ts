import { z } from 'zod'

const emptyToNull = (v?: string | null) => (v ? v : null)

export const memberBody = z.object({
  fullName: z.string().trim().min(2),
  memberNo: z.string().trim().nullable().optional().transform(emptyToNull),
  phone: z.string().trim().nullable().optional().transform((v) => (v ? normalizePhone(v) : null)),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
})
