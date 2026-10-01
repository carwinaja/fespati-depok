export default defineEventHandler(async (event) => {
  const e = await prisma.event.findUnique({ where: { id: idParam(event) } })
  if (!e) throw createError({ statusCode: 404, statusMessage: 'Kegiatan tidak ditemukan' })
  return e
})
