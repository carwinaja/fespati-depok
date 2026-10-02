export default defineEventHandler(
  () =>
    prisma.event.findMany({
      where: { status: { not: 'CANCELLED' } },
      orderBy: { eventDate: 'asc' },
      select: { id: true, title: true, type: true, eventDate: true, location: true, description: true, pdfUrl: true, imageUrl: true, registrationUrl: true, status: true },
    }),
)
