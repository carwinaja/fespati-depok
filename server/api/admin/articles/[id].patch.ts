// Slug tetap (tidak berubah saat judul diedit) agar tautan lama tidak rusak.
export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')!
  const data = await readValidatedBody(event, articleBody.parse)
  if (!(await prisma.article.findUnique({ where: { id }, select: { id: true } }))) {
    throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan' })
  }
  return prisma.$transaction(async (tx) => {
    if (data.isFeatured) await tx.article.updateMany({ where: { isFeatured: true, NOT: { id } }, data: { isFeatured: false } })
    return tx.article.update({ where: { id }, data })
  })
})
