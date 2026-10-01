export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, eventBody.parse)
  return prisma.event.create({ data })
})
