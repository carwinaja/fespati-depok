export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, fetch: refresh } = useUserSession()
  await refresh()
  if (to.path === '/admin/login') {
    if (loggedIn.value) return navigateTo('/admin')
    return
  }
  if (!loggedIn.value) return navigateTo('/admin/login')
})
