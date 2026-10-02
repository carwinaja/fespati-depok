<template>
  <div class="admin-shell">
    <aside class="admin-side" :class="{ open }">
      <NuxtLink to="/admin" class="side-logo" @click="open = false">
        <img src="/fespati.png" alt="FESPATI" />
        <div><strong>FESPATI</strong><span>Panel Admin</span></div>
      </NuxtLink>
      <nav class="side-nav">
        <NuxtLink v-for="n in nav" :key="n.to" :to="n.to" class="side-link" active-class="active" :exact-active-class="n.exact ? 'active' : ''" @click="open = false">
          {{ n.label }}
        </NuxtLink>
      </nav>
      <div class="side-foot">
        <p class="small">{{ user?.name }}</p>
        <p class="small">{{ user?.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Admin' }}</p>
        <button class="btn btn-outline" @click="logout">Keluar</button>
      </div>
    </aside>
    <div v-if="open" class="side-backdrop" @click="open = false"></div>

    <div class="admin-main">
      <header class="admin-top">
        <button class="menu-btn" aria-label="Menu" @click="open = !open">☰</button>
        <h1 class="h3">{{ title }}</h1>
        <NuxtLink to="/" class="btn btn-ghost" target="_blank">Lihat situs ↗</NuxtLink>
      </header>
      <main class="admin-content"><slot /></main>
    </div>
  </div>
</template>

<script setup lang="ts">
const { user, clear } = useUserSession()
const route = useRoute()
const open = ref(false)

const nav = computed(() => [
  { to: '/admin', label: 'Dashboard', exact: true },
  { to: '/admin/clubs', label: 'Klub & Anggota' },
  { to: '/admin/events', label: 'Lomba & Kegiatan' },
  { to: '/admin/hero', label: 'Slider Hero' },
  { to: '/admin/gallery', label: 'Galeri' },
  { to: '/admin/articles', label: 'Berita & Edukasi' },
  ...(user.value?.role === 'SUPER_ADMIN' ? [{ to: '/admin/admins', label: 'Pengelola' }] : []),
])
const title = computed(() => nav.value.find((n) => (n.exact ? route.path === n.to : route.path.startsWith(n.to)))?.label ?? 'Admin')

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  await clear()
  await navigateTo('/admin/login')
}
</script>

<style>
.admin-shell { display: flex; min-height: 100vh; background: var(--color-bg); }
.admin-side { width: 240px; flex-shrink: 0; background: var(--color-surface); border-right: 1px solid var(--color-border-soft); display: flex; flex-direction: column; padding: 1.25rem 1rem; position: sticky; top: 0; height: 100vh; }
.side-logo { display: flex; align-items: center; gap: .6rem; margin-bottom: 1.5rem; }
.side-logo img { width: 38px; height: 38px; object-fit: contain; }
.side-logo strong { display: block; font-family: var(--font-display); color: var(--color-brand); line-height: 1.1; }
.side-logo span { font-size: .75rem; color: var(--color-ink-3); }
.side-nav { display: flex; flex-direction: column; gap: .15rem; flex: 1; }
.side-link { padding: .6rem .85rem; border-radius: var(--radius-sm); font-size: .875rem; font-weight: 500; color: var(--color-ink-2); transition: var(--transition); }
.side-link:hover { background: var(--color-surface-2); }
.side-link.active { background: var(--color-brand-soft); color: var(--color-brand); }
.side-foot { border-top: 1px solid var(--color-border-soft); padding-top: 1rem; display: grid; gap: .25rem; }
.side-foot .btn { margin-top: .5rem; justify-content: center; }
.admin-main { flex: 1; min-width: 0; }
.admin-top { display: flex; align-items: center; gap: 1rem; padding: 1rem clamp(1rem, 3vw, 2rem); background: var(--color-surface); border-bottom: 1px solid var(--color-border-soft); }
.admin-top .h3 { flex: 1; }
.admin-content { padding: clamp(1rem, 3vw, 2rem); max-width: 1100px; }
.menu-btn { display: none; background: none; border: 1px solid var(--color-border); border-radius: var(--radius-sm); font-size: 1.1rem; padding: .25rem .6rem; cursor: pointer; }
.side-backdrop { display: none; }

/* Shared admin primitives */
.panel { background: var(--color-card); border: 1px solid var(--color-border-soft); border-radius: var(--radius-lg); padding: 1.25rem; box-shadow: var(--shadow-sm); }
.field { display: grid; gap: .35rem; margin-bottom: 1rem; }
.field label { font-size: .8125rem; font-weight: 500; color: var(--color-ink-2); }
.input { width: 100%; padding: .6rem .8rem; font: inherit; border: 1px solid var(--color-border); border-radius: var(--radius-sm); background: var(--color-surface); color: var(--color-ink); }
.input:focus { outline: 2px solid var(--color-brand-light); outline-offset: 0; border-color: var(--color-brand-light); }
.alert-error { background: #FDECEA; color: #8A1C12; border-radius: var(--radius-sm); padding: .6rem .8rem; font-size: .8125rem; margin-bottom: 1rem; }
.table-wrap { overflow-x: auto; }
.table { width: 100%; border-collapse: collapse; font-size: .875rem; }
.table th { text-align: left; font-size: .6875rem; letter-spacing: .08em; text-transform: uppercase; color: var(--color-ink-3); padding: .6rem .75rem; border-bottom: 1px solid var(--color-border); }
.table td { padding: .7rem .75rem; border-bottom: 1px solid var(--color-border-soft); }
.skeleton { display: block; height: .9em; min-width: 3rem; border-radius: 6px; background: linear-gradient(90deg, var(--color-surface-2) 25%, var(--color-border-soft) 50%, var(--color-surface-2) 75%); background-size: 200% 100%; animation: skeleton-shimmer 1.2s ease-in-out infinite; }
.skeleton-block { height: 5.5rem; border-radius: var(--radius-lg); }
@keyframes skeleton-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
@media (prefers-reduced-motion: reduce) { .skeleton { animation: none; } }
.btn-sm { padding: .35rem .8rem; }
.btn:disabled { opacity: .55; cursor: not-allowed; }

@media (max-width: 860px) {
  .admin-side { position: fixed; z-index: 50; transform: translateX(-100%); transition: transform var(--transition); box-shadow: var(--shadow-lg); }
  .admin-side.open { transform: none; }
  .side-backdrop { display: block; position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 40; }
  .menu-btn { display: block; }
}
</style>
