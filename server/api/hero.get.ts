export default defineEventHandler(async () => {
  try {
    return await prisma.heroSlide.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
      select: { id: true, imageUrl: true, alt: true, linkUrl: true },
    })
  } catch (e) {
    // Hero tidak boleh merusak beranda: kosong berarti komponen memakai gambar bawaan.
    console.error('[hero] gagal mengambil slide', e)
    return []
  }
})
