// Slug tetap agar tautan lama tidak rusak.
export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, curationBody.parse)
  try { return await prisma.curation.update({ where: { id: idParam(event) }, data }) }
  catch (e) { prismaHttpError(e, 'Curation tidak ditemukan') }
})
