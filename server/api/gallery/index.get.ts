export default defineCachedEventHandler(
  () =>
    prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, category: true, mediaType: true, mediaUrl: true, youtubeUrl: true, description: true, event: { select: { title: true } } },
    }),
  { maxAge: 60, swr: true },
)
