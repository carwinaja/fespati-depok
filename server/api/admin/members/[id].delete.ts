export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  try {
    await prisma.member.delete({ where: { id } })
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Anggota tidak ditemukan' })
  }
  return { ok: true }
})
