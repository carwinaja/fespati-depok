export default defineEventHandler(async (event) => {
  const data = await readValidatedBody(event, heroBody.parse)
  const count = await prisma.heroSlide.count()
  if (count >= MAX_HERO_SLIDES) {
    throw createError({ statusCode: 400, statusMessage: `Maksimal ${MAX_HERO_SLIDES} slide. Hapus salah satu terlebih dahulu.` })
  }
  const last = await prisma.heroSlide.aggregate({ _max: { sortOrder: true } })
  return prisma.heroSlide.create({ data: { ...data, sortOrder: (last._max.sortOrder ?? -1) + 1 } })
})
