export default defineEventHandler(async () => {
  const [clubs, members, events, gallery, articles] = await Promise.all([
    prisma.club.count(),
    prisma.member.count(),
    prisma.event.count(),
    prisma.gallery.count(),
    prisma.article.count(),
  ])
  return { clubs, members, events, gallery, articles }
})
