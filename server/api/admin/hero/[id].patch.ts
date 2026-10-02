export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, heroBody.parse)
  try { return await prisma.heroSlide.update({ where: { id: idParam(event) }, data }) }
  catch (e) { prismaHttpError(e, 'Slide tidak ditemukan') }
})
