<template>
  <div class="login-wrap">
    <form class="panel login-card" @submit.prevent="submit">
      <img src="/fespati.png" alt="FESPATI Depok" class="login-logo" />
      <span class="label" style="color:var(--color-brand)">Panel Admin</span>
      <h1 class="h2" style="margin-bottom:1.25rem">Masuk</h1>
      <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" class="input" autocomplete="username" required />
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" class="input" autocomplete="current-password" required />
      </div>
      <button class="btn btn-primary" style="width:100%;justify-content:center" :disabled="loading">
        {{ loading ? 'Memproses…' : 'Masuk' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'admin' })
useHead({ title: 'Masuk — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const { fetch: refresh } = useUserSession()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  try {
    await $fetch('/api/auth/login', { method: 'POST', body: { email: email.value, password: password.value } })
    await refresh()
    await navigateTo('/admin')
  } catch (e: any) {
    error.value = e?.statusMessage || e?.data?.statusMessage || 'Gagal masuk'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrap { min-height: 100vh; display: grid; place-items: center; padding: 1rem; background: var(--color-bg); }
.login-card { width: 100%; max-width: 380px; padding: 2rem; }
.login-logo { width: 56px; height: 56px; object-fit: contain; margin-bottom: 1rem; }
</style>
