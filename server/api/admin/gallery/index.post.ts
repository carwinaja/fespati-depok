export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, galleryBody.parse)
  try { return await prisma.gallery.create({ data }) }
  catch (e) { prismaHttpError(e, 'Item tidak ditemukan') }
})
