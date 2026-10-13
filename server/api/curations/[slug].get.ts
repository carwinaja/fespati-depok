export default defineEventHandler(async (event) => {
  const c = await prisma.curation.findFirst({
    where: { slug: getRouterParam(event, 'slug')!, isPublished: true },
    select: {
      title: true,
      slug: true,
      description: true,
      files: {
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
        select: { id: true, title: true, fileName: true, fileUrl: true, mimeType: true, size: true },
      },
    },
  })
  if (!c) throw createError({ statusCode: 404, statusMessage: 'Curation tidak ditemukan' })
  return c
})
