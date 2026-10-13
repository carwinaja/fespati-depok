export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, curationFilePatchBody.parse)
  try { return await prisma.curationFile.update({ where: { id: idParam(event) }, data }) }
  catch (e) { prismaHttpError(e, 'File tidak ditemukan') }
})
