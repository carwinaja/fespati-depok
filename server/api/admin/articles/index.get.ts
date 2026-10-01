export default defineEventHandler(() =>
  prisma.article.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, slug: true, category: true, isPublished: true, isFeatured: true, publishedAt: true, thumbnailUrl: true },
  }),
)
