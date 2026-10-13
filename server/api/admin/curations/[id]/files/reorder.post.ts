export default defineEventHandler(async (event) => {
  const curationId = idParam(event)
  const { ids } = await readValidatedBody(event, curationReorderBody.parse)
  const existing = await prisma.curationFile.findMany({ where: { curationId }, select: { id: true } })
  if (new Set(ids).size !== ids.length || ids.length !== existing.length || !existing.every((f) => ids.includes(f.id)))
    throw createError({ statusCode: 400, statusMessage: 'Daftar file tidak sesuai, muat ulang halaman' })
  await prisma.$transaction(ids.map((id, i) => prisma.curationFile.update({ where: { id }, data: { sortOrder: i } })))
  return { ok: true }
})
