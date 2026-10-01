// Publik: tidak mengekspos data anggota.
export default defineEventHandler(
  () =>
    prisma.club.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, logoUrl: true, phone: true, location: true, schedule: true, description: true, mapUrl: true, colorHex: true },
    }),
)
