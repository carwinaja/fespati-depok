export default defineEventHandler(async (event) => {
  let file
  try { file = await prisma.curationFile.delete({ where: { id: idParam(event) } }) }
  catch (e) { prismaHttpError(e, 'File tidak ditemukan') }
  await deleteMedia([file.fileUrl])
  return { ok: true }
})
