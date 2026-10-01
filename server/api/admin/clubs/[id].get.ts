export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const club = await prisma.club.findUnique({
    where: { id },
    include: { members: { orderBy: { fullName: 'asc' } } },
  })
  if (!club) throw createError({ statusCode: 404, statusMessage: 'Klub tidak ditemukan' })
  return club
})
