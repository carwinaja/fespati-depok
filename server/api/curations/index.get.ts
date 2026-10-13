// Publik: hanya curation terpublikasi (untuk submenu navbar).
export default defineEventHandler(() =>
  prisma.curation.findMany({
    where: { isPublished: true },
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    select: { id: true, title: true, slug: true },
  }),
)
