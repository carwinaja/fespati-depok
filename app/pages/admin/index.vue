<template>
  <div>
    <p class="lead" style="margin-bottom:1.5rem">Selamat datang, {{ user?.name }}.</p>
    <div class="stats">
      <div v-for="s in stats" :key="s.label" class="panel stat">
        <span class="label">{{ s.label }}</span>
        <span v-if="loading" class="skeleton stat-skel"></span>
        <strong v-else class="stat-num">{{ s.value }}</strong>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Dashboard — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const { user } = useUserSession()
const { data, status } = useFetch('/api/admin/stats', { lazy: true })
const loading = computed(() => status.value === 'pending' && !data.value)
const stats = computed(() => [
  { label: 'Klub', value: data.value?.clubs ?? '–' },
  { label: 'Anggota', value: data.value?.members ?? '–' },
  { label: 'Lomba & Kegiatan', value: data.value?.events ?? '–' },
  { label: 'Galeri', value: data.value?.gallery ?? '–' },
  { label: 'Artikel', value: data.value?.articles ?? '–' },
])
</script>

<style scoped>
.stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; }
.stat { display: grid; gap: .25rem; }
.stat-skel { height: 2rem; width: 4rem; margin-top: .25rem; }
.stat-num { font-family: var(--font-display); font-size: 2rem; color: var(--color-brand); }
</style>
