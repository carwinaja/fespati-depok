export default defineEventHandler(async (event) => {
  const id = idParam(event)
  const files = await prisma.curationFile.findMany({ where: { curationId: id }, select: { fileUrl: true } })
  try { await prisma.curation.delete({ where: { id } }) }
  catch (e) { prismaHttpError(e, 'Curation tidak ditemukan') }
  await deleteMedia(files.map((f) => f.fileUrl))
  return { ok: true }
})
