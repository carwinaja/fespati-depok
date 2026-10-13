export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, curationBody.parse)
  const slug = await uniqueCurationSlug(data.title)
  const last = await prisma.curation.aggregate({ _max: { sortOrder: true } })
  return prisma.curation.create({ data: { ...data, slug, sortOrder: (last._max.sortOrder ?? -1) + 1 } })
})
