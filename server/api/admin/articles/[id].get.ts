export default defineEventHandler(async (event) => {
  const a = await prisma.article.findUnique({ where: { id: getRouterParam(event, 'id')! } })
  if (!a) throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan' })
  return a
})
