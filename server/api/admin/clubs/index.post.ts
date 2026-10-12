export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, clubBody.parse)
  // Klub baru tampil paling akhir.
  const last = await prisma.club.aggregate({ _max: { sortOrder: true } })
  return prisma.club.create({ data: { ...data, sortOrder: (last._max.sortOrder ?? -1) + 1 } })
})
