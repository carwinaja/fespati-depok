export default defineEventHandler(async (event) => {
  const curationId = idParam(event)
  const data = await readValidatedBody(event, curationFileCreateBody.parse)
  const last = await prisma.curationFile.aggregate({ where: { curationId }, _max: { sortOrder: true } })
  try {
    return await prisma.curationFile.create({ data: { ...data, curationId, sortOrder: (last._max.sortOrder ?? -1) + 1 } })
  } catch (e) { prismaHttpError(e, 'Curation tidak ditemukan') }
})
