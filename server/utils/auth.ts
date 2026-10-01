import type { H3Event } from 'h3'

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN'

/** Pastikan request berasal dari admin aktif; kembalikan data user sesi. */
export async function requireAdmin(event: H3Event, role?: AdminRole) {
  const { user } = await requireUserSession(event)
  const admin = await prisma.admin.findUnique({ where: { id: user.id } })
  if (!admin || !admin.isActive) {
    await clearUserSession(event)
    throw createError({ statusCode: 401, statusMessage: 'Sesi tidak valid' })
  }
  if (role === 'SUPER_ADMIN' && admin.role !== 'SUPER_ADMIN') {
    throw createError({ statusCode: 403, statusMessage: 'Akses ditolak' })
  }
  return admin
}
