export default defineEventHandler(() =>
  prisma.gallery.findMany({ orderBy: { createdAt: 'desc' }, include: { event: { select: { id: true, title: true } } } }),
)
