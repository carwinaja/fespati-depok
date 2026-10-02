<template>
  <div class="login-wrap">
    <form class="login-card" @submit.prevent="submit">
      <div class="login-head">
        <img src="/fespati.png" alt="FESPATI Depok" class="login-logo" />
        <span class="login-eyebrow">Panel Admin</span>
        <h1 class="login-title">Masuk</h1>
        <p class="login-sub">Silakan masuk untuk mengelola konten FESPATI Depok.</p>
      </div>
      <p v-if="error" class="login-error" role="alert">{{ error }}</p>
      <div class="login-field">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" class="login-input" autocomplete="username" required />
      </div>
      <div class="login-field">
        <label for="password">Password</label>
        <input id="password" v-model="password" type="password" class="login-input" autocomplete="current-password" required />
      </div>
      <button class="login-btn" :disabled="loading">
        {{ loading ? 'Memproses…' : 'Masuk' }}
      </button>
    </form>
    <NuxtLink to="/" class="login-back">← Kembali ke beranda</NuxtLink>
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
.login-wrap {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 1.5rem 1rem;
  background:
    radial-gradient(circle at 15% 10%, rgba(46,125,82,0.18), transparent 45%),
    radial-gradient(circle at 85% 90%, rgba(200,155,60,0.18), transparent 45%),
    var(--color-bg);
}
.login-card {
  width: 100%;
  max-width: 400px;
  padding: 2rem 1.75rem;
  background: var(--color-card);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
}
.login-head { text-align: center; margin-bottom: 1.5rem; }
.login-logo { width: 64px; height: 64px; object-fit: contain; margin-bottom: 0.75rem; }
.login-eyebrow {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-brand);
}
.login-title { font-family: var(--font-display); font-size: 1.75rem; margin: 0.25rem 0 0.5rem; color: var(--color-ink); }
.login-sub { font-size: 0.875rem; color: var(--color-ink-3); margin: 0; }
.login-error {
  background: #FDECEA;
  color: #8A1C12;
  border-radius: var(--radius-sm);
  padding: 0.6rem 0.8rem;
  font-size: 0.8125rem;
  margin: 0 0 1rem;
}
.login-field { display: grid; gap: 0.35rem; margin-bottom: 1rem; }
.login-field label { font-size: 0.8125rem; font-weight: 500; color: var(--color-ink-2); }
.login-input {
  width: 100%;
  padding: 0.7rem 0.85rem;
  font: inherit;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-ink);
  transition: border-color var(--transition), box-shadow var(--transition);
}
.login-input:focus {
  outline: none;
  border-color: var(--color-brand-light);
  box-shadow: 0 0 0 3px rgba(46,125,82,0.18);
}
.login-btn {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.8rem 1rem;
  font: inherit;
  font-weight: 600;
  color: #fff;
  background: var(--color-brand);
  border: 0;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background var(--transition);
}
.login-btn:hover:not(:disabled) { background: var(--color-brand-dark); }
.login-btn:disabled { opacity: 0.7; cursor: not-allowed; }
.login-back { font-size: 0.8125rem; color: var(--color-ink-2); text-decoration: none; }
.login-back:hover { color: var(--color-brand); text-decoration: underline; }
</style>
