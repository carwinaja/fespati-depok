// Publik: hanya artikel terbit; tanpa isi lengkap.
export default defineEventHandler(
  () =>
    prisma.article.findMany({
      where: { isPublished: true, publishedAt: { lte: new Date() } },
      orderBy: [{ isFeatured: 'desc' }, { publishedAt: 'desc' }],
      select: { id: true, title: true, slug: true, category: true, excerpt: true, thumbnailUrl: true, author: true, isFeatured: true, publishedAt: true },
    }),
)
