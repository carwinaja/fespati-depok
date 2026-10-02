export default defineEventHandler(() =>
  prisma.heroSlide.findMany({ orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }] }),
)
