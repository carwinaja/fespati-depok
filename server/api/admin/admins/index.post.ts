import bcrypt from 'bcryptjs'
import { z } from 'zod'

const body = z.object({
  name: z.string().trim().min(2),
  email: z.string().email().transform((v) => v.toLowerCase()),
  password: z.string().min(8),
  role: z.enum(['SUPER_ADMIN', 'ADMIN']).default('ADMIN'),
})

export default defineEventHandler(async (event) => {
  await requireAdmin(event, 'SUPER_ADMIN')
  const data = await readValidatedBody(event, body.parse)
  if (await prisma.admin.findUnique({ where: { email: data.email } })) {
    throw createError({ statusCode: 409, statusMessage: 'Email sudah terdaftar' })
  }
  const a = await prisma.admin.create({
    data: { ...data, password: await bcrypt.hash(data.password, 12) },
    select: { id: true, name: true, email: true, role: true, isActive: true },
  })
  return a
})
