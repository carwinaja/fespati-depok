export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, clubBody.parse)
  return prisma.club.create({ data })
})
