// Semua /api/admin/** wajib login sebagai admin aktif.
export default defineEventHandler(async (event) => {
  const path = getRequestURL(event).pathname
  if (path.startsWith('/api/admin')) {
    await requireAdmin(event)
  }
})
