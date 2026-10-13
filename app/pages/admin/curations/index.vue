<template>
  <div>
    <form class="panel" @submit.prevent="create">
      <h2 class="h3" style="margin-bottom:1rem">Tambah curation</h2>
      <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
      <div class="grid">
        <div class="field"><label for="t">Judul (mis. Curation 2026)</label><input id="t" v-model="form.title" class="input" required minlength="3" maxlength="120" /></div>
        <div class="field"><label for="d">Deskripsi (opsional)</label><input id="d" v-model="form.description" class="input" maxlength="500" /></div>
      </div>
      <button class="btn btn-primary" :disabled="busy">{{ busy ? 'Memproses…' : 'Tambah' }}</button>
      <span class="small" style="margin-left:.75rem">File diunggah setelah curation dibuat (menu Kelola).</span>
    </form>

    <h2 class="h3" style="margin:1.5rem 0 .25rem">Daftar curation</h2>
    <p class="small" style="margin-bottom:.75rem">Urutan di sini menentukan urutan submenu Curation di situs. Hanya yang berstatus Tampil yang muncul.</p>
    <div v-if="loading" class="list"><div v-for="n in 3" :key="n" class="skeleton skeleton-block"></div></div>
    <p v-else-if="!items?.length" class="small">Belum ada curation.</p>
    <div v-else class="list">
      <div v-for="(c, i) in items" :key="c.id" class="panel item" :class="{ off: !c.isPublished }">
        <div class="meta">
          <strong>{{ i + 1 }}. {{ c.title }}</strong>
          <span class="small">{{ c._count.files }} file · {{ c.isPublished ? 'Tampil' : 'Disembunyikan' }} · /curation/{{ c.slug }}</span>
        </div>
        <div class="mact">
          <button class="btn btn-outline btn-sm" :disabled="i === 0 || busy" aria-label="Naikkan" @click="move(i, -1)">↑</button>
          <button class="btn btn-outline btn-sm" :disabled="i === items.length - 1 || busy" aria-label="Turunkan" @click="move(i, 1)">↓</button>
          <button class="btn btn-outline btn-sm" :disabled="busy" @click="toggle(c)">{{ c.isPublished ? 'Sembunyikan' : 'Tampilkan' }}</button>
          <NuxtLink :to="`/admin/curations/${c.id}`" class="btn btn-outline btn-sm">Kelola</NuxtLink>
          <button class="btn btn-outline btn-sm danger" :disabled="busy" @click="remove(c)">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Curation — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const { data: items, refresh, status } = useFetch('/api/admin/curations', { lazy: true })
const loading = computed(() => status.value === 'pending' && !items.value)
const form = reactive({ title: '', description: '' })
const busy = ref(false)
const error = ref('')
const msg = (e: any) => e?.data?.statusMessage || e?.data?.message || 'Terjadi kesalahan'

async function run(fn: () => Promise<unknown>) {
  error.value = ''; busy.value = true
  try { await fn() } catch (e) { error.value = msg(e) } finally { busy.value = false; await refresh() }
}

const create = () => run(async () => {
  const c: any = await $fetch('/api/admin/curations', { method: 'POST', body: { title: form.title, description: form.description || null, isPublished: false } })
  await navigateTo(`/admin/curations/${c.id}`)
})

const toggle = (c: any) => run(() => $fetch(`/api/admin/curations/${c.id}`, { method: 'PATCH', body: { title: c.title, description: c.description, isPublished: !c.isPublished } }))

const move = (i: number, d: number) => run(() => {
  const ids = items.value!.map((c) => c.id)
  ;[ids[i], ids[i + d]] = [ids[i + d], ids[i]]
  return $fetch('/api/admin/curations/reorder', { method: 'POST', body: { ids } })
})

function remove(c: { id: string; title: string; _count: { files: number } }) {
  if (!confirm(`Hapus "${c.title}"? ${c._count.files} file di dalamnya ikut terhapus dari storage.`)) return
  return run(() => $fetch(`/api/admin/curations/${c.id}`, { method: 'DELETE' }))
}
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0 1rem; }
.list { display: grid; gap: .75rem; }
.item { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem 1rem; justify-content: space-between; }
.item.off { opacity: .65; }
.meta { display: grid; gap: .15rem; min-width: 0; }
.mact { display: flex; flex-wrap: wrap; gap: .4rem; align-items: center; }
.danger { color: #8A1C12; }
</style>
