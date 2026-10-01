export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const data = await readValidatedBody(event, clubBody.parse)
  try {
    return await prisma.club.update({ where: { id }, data })
  } catch {
    throw createError({ statusCode: 404, statusMessage: 'Klub tidak ditemukan' })
  }
})
