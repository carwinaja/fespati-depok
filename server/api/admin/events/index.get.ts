export default defineEventHandler(() =>
  prisma.event.findMany({ orderBy: { eventDate: 'desc' }, include: { _count: { select: { galleries: true } } } }),
)
