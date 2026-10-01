export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, eventBody.parse)
  try { return await prisma.event.update({ where: { id: idParam(event) }, data }) }
  catch (e) { prismaHttpError(e, 'Kegiatan tidak ditemukan') }
})
