export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, ready, fetch: refresh } = useUserSession()
  // Sesi sudah dimuat saat halaman pertama dibuka; jangan request ulang di setiap pindah menu
  if (!ready.value) await refresh()
  if (to.path === '/admin/login') {
    if (loggedIn.value) return navigateTo('/admin')
    return
  }
  if (!loggedIn.value) return navigateTo('/admin/login')
})
