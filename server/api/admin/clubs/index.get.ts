export default defineEventHandler(async () => {
  const clubs = await prisma.club.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { members: true } } },
  })
  return clubs
})
