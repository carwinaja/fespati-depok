export default defineCachedEventHandler(
  () =>
    prisma.event.findMany({
      where: { status: { not: 'CANCELLED' } },
      orderBy: { eventDate: 'asc' },
      select: { id: true, title: true, type: true, eventDate: true, location: true, description: true, pdfUrl: true, registrationUrl: true, status: true },
    }),
  { maxAge: 60, swr: true },
)
