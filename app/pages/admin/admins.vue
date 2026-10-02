<template>
  <div>
    <div class="panel" style="margin-bottom:1.5rem">
      <h2 class="h3" style="margin-bottom:1rem">Tambah pengelola</h2>
      <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
      <form class="form-grid" @submit.prevent="add">
        <div class="field"><label>Nama</label><input v-model="form.name" class="input" required minlength="2" /></div>
        <div class="field"><label>Email</label><input v-model="form.email" type="email" class="input" required /></div>
        <div class="field"><label>Password (min. 8)</label><input v-model="form.password" type="password" class="input" required minlength="8" autocomplete="new-password" /></div>
        <div class="field">
          <label>Peran</label>
          <select v-model="form.role" class="input"><option value="ADMIN">Admin</option><option value="SUPER_ADMIN">Super Admin</option></select>
        </div>
        <div><button class="btn btn-primary" :disabled="busy">Tambah</button></div>
      </form>
    </div>

    <div class="panel table-wrap">
      <table class="table">
        <thead><tr><th>Nama</th><th>Email</th><th>Peran</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <template v-if="loading"><tr v-for="n in 3" :key="n"><td v-for="c in 5" :key="c"><span class="skeleton"></span></td></tr></template>
          <tr v-for="a in admins" :key="a.id">
            <td>{{ a.name }}</td>
            <td>{{ a.email }}</td>
            <td>{{ a.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin' }}</td>
            <td>{{ a.isActive ? 'Aktif' : 'Nonaktif' }}</td>
            <td style="text-align:right">
              <button v-if="a.id !== user?.id" class="btn btn-outline btn-sm" @click="toggle(a)">
                {{ a.isActive ? 'Nonaktifkan' : 'Aktifkan' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin', () => {
    const { user } = useUserSession()
    if (user.value?.role !== 'SUPER_ADMIN') return navigateTo('/admin')
  }],
})
useHead({ title: 'Pengelola — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const { user } = useUserSession()
const { data: admins, refresh, status } = useFetch('/api/admin/admins', { lazy: true })
const loading = computed(() => status.value === 'pending' && !admins.value)
const form = reactive({ name: '', email: '', password: '', role: 'ADMIN' })
const error = ref('')
const busy = ref(false)

const msg = (e: any) => e?.data?.statusMessage || e?.statusMessage || 'Terjadi kesalahan'

async function add() {
  error.value = ''
  busy.value = true
  try {
    await $fetch('/api/admin/admins', { method: 'POST', body: form })
    Object.assign(form, { name: '', email: '', password: '', role: 'ADMIN' })
    await refresh()
  } catch (e) { error.value = msg(e) } finally { busy.value = false }
}

async function toggle(a: { id: string; isActive: boolean }) {
  error.value = ''
  try {
    await $fetch(`/api/admin/admins/${a.id}`, { method: 'PATCH', body: { isActive: !a.isActive } })
    await refresh()
  } catch (e) { error.value = msg(e) }
}
</script>

<style scoped>
.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0 1rem; align-items: end; }
</style>
