export default defineEventHandler(
  () =>
    prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, category: true, mediaType: true, mediaUrl: true, youtubeUrl: true, description: true, event: { select: { title: true } } },
    }),
)
