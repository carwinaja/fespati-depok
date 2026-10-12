export default defineEventHandler(async (event) => {
  const { ids } = await readValidatedBody(event, clubReorderBody.parse)
  const existing = await prisma.club.findMany({ select: { id: true } })
  if (new Set(ids).size !== ids.length || ids.length !== existing.length || !existing.every((c) => ids.includes(c.id)))
    throw createError({ statusCode: 400, statusMessage: 'Daftar klub tidak sesuai, muat ulang halaman' })
  await prisma.$transaction(ids.map((id, i) => prisma.club.update({ where: { id }, data: { sortOrder: i } })))
  return { ok: true }
})
