export default defineEventHandler(async (event) => {
  const c = await prisma.curation.findUnique({
    where: { id: idParam(event) },
    include: { files: { orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] } },
  })
  if (!c) throw createError({ statusCode: 404, statusMessage: 'Curation tidak ditemukan' })
  return c
})
