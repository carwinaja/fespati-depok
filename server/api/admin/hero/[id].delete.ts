export default defineEventHandler(async (event) => {
  try { await prisma.heroSlide.delete({ where: { id: idParam(event) } }) }
  catch (e) { prismaHttpError(e, 'Slide tidak ditemukan') }
  return { ok: true }
})
