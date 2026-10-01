// Anggota ikut terhapus (onDelete: Cascade).
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  try {
    await prisma.club.delete({ where: { id } })
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Klub tidak ditemukan' })
  }
  return { ok: true }
})
