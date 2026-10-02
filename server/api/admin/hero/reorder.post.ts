export default defineEventHandler(async (event) => {
  const { ids } = await readValidatedBody(event, heroReorderBody.parse)
  await prisma.$transaction(ids.map((id, i) => prisma.heroSlide.update({ where: { id }, data: { sortOrder: i } })))
  return { ok: true }
})
