export default defineEventHandler(async (event) => {
  const a = await prisma.article.findFirst({
    where: { slug: getRouterParam(event, 'slug')!, isPublished: true, publishedAt: { lte: new Date() } },
    select: { title: true, slug: true, category: true, excerpt: true, content: true, thumbnailUrl: true, author: true, publishedAt: true },
  })
  if (!a) throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan' })
  return a
})
