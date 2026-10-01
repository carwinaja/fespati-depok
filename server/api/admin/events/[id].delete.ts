// Foto/video yang terkait tidak dihapus; hanya dilepas dari kegiatan (onDelete: SetNull).
export default defineEventHandler(async (event) => {
  try { await prisma.event.delete({ where: { id: idParam(event) } }) }
  catch (e) { prismaHttpError(e, 'Kegiatan tidak ditemukan') }
  return { ok: true }
})
