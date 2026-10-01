import bcrypt from 'bcryptjs'
import { z } from 'zod'

const body = z.object({
  name: z.string().trim().min(2).optional(),
  password: z.string().min(8).optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN']).optional(),
  isActive: z.boolean().optional(),
})

export default defineEventHandler(async (event) => {
  const me = await requireAdmin(event, 'SUPER_ADMIN')
  const id = getRouterParam(event, 'id')!
  const data = await readValidatedBody(event, body.parse)

  // Cegah super admin mengunci dirinya sendiri
  if (id === me.id && (data.isActive === false || (data.role && data.role !== 'SUPER_ADMIN'))) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak bisa menonaktifkan atau menurunkan peran akun sendiri' })
  }

  const { password, ...rest } = data
  return prisma.admin.update({
    where: { id },
    data: { ...rest, ...(password ? { password: await bcrypt.hash(password, 12) } : {}) },
    select: { id: true, name: true, email: true, role: true, isActive: true },
  })
})
