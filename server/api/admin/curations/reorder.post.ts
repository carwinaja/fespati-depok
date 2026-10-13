export default defineEventHandler(async (event) => {
  const { ids } = await readValidatedBody(event, curationReorderBody.parse)
  const existing = await prisma.curation.findMany({ select: { id: true } })
  if (new Set(ids).size !== ids.length || ids.length !== existing.length || !existing.every((c) => ids.includes(c.id)))
    throw createError({ statusCode: 400, statusMessage: 'Daftar curation tidak sesuai, muat ulang halaman' })
  await prisma.$transaction(ids.map((id, i) => prisma.curation.update({ where: { id }, data: { sortOrder: i } })))
  return { ok: true }
})
