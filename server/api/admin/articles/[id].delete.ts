export default defineEventHandler(async (event) => {
  try {
    await prisma.article.delete({ where: { id: getRouterParam(event, 'id')! } })
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan' })
  }
  return { ok: true }
})
