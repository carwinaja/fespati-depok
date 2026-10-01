export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, articleBody.parse)
  const slug = await uniqueArticleSlug(data.title)
  return prisma.$transaction(async (tx) => {
    if (data.isFeatured) await tx.article.updateMany({ where: { isFeatured: true }, data: { isFeatured: false } })
    return tx.article.create({ data: { ...data, slug } })
  })
})
