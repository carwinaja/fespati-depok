export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, galleryBody.parse)
  try { return await prisma.gallery.update({ where: { id: idParam(event) }, data }) }
  catch (e) { prismaHttpError(e, 'Item tidak ditemukan') }
})
