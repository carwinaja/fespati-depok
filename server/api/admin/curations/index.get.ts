export default defineEventHandler(() =>
  prisma.curation.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    include: { _count: { select: { files: true } } },
  }),
)
