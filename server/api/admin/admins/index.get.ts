export default defineEventHandler(async (event) => {
  await requireAdmin(event, 'SUPER_ADMIN')
  return prisma.admin.findMany({
    select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  })
})
