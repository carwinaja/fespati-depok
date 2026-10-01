export default defineEventHandler(async (event) => {
  try { await prisma.gallery.delete({ where: { id: idParam(event) } }) }
  catch (e) { prismaHttpError(e, 'Item tidak ditemukan') }
  return { ok: true }
})
