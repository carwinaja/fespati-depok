<template>
  <div>
    <form class="panel" @submit.prevent="save">
      <h2 class="h3" style="margin-bottom:.25rem">{{ editingId ? 'Ubah slide' : 'Tambah slide' }}</h2>
      <p class="small" style="margin-bottom:1rem">Ukuran yang disarankan 1080 × 402 px (rasio ±2,7 : 1) agar gambar tidak terpotong. Maksimal {{ MAX }} slide.</p>
      <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
      <p v-if="info" class="ok">{{ info }}</p>

      <div class="field"><label>Gambar</label><AdminImageUpload v-model="form.imageUrl" /></div>
      <div class="grid">
        <div class="field"><label for="alt">Deskripsi gambar (untuk aksesibilitas)</label><input id="alt" v-model="form.alt" class="input" required minlength="2" maxlength="200" /></div>
        <div class="field"><label for="link">Link tujuan (opsional)</label><input id="link" v-model="form.linkUrl" class="input" placeholder="https://… atau /berita/slug" /></div>
      </div>
      <label class="check"><input v-model="form.isActive" type="checkbox" /> Tampilkan di beranda</label>

      <div class="mact">
        <button class="btn btn-primary" :disabled="busy || (!editingId && full)">{{ busy ? 'Memproses…' : editingId ? 'Simpan' : 'Tambah' }}</button>
        <button v-if="editingId" type="button" class="btn btn-outline" @click="reset">Batal</button>
        <span v-if="!editingId && full" class="small">Batas {{ MAX }} slide tercapai.</span>
      </div>
    </form>

    <h2 class="h3" style="margin:1.5rem 0 .75rem">Urutan slide</h2>
    <div v-if="loading" class="list"><div v-for="n in 3" :key="n" class="skeleton skeleton-block"></div></div>
    <p v-else-if="!slides?.length" class="small">Belum ada slide. Beranda memakai gambar bawaan.</p>
    <div v-else class="list">
      <div v-for="(s, i) in slides" :key="s.id" class="panel item" :class="{ off: !s.isActive }">
        <img :src="s.imageUrl" :alt="s.alt" class="thumb" loading="lazy" />
        <div class="meta">
          <strong>{{ i + 1 }}. {{ s.alt }}</strong>
          <span class="small">{{ s.isActive ? 'Tampil' : 'Disembunyikan' }}<template v-if="s.linkUrl"> · {{ s.linkUrl }}</template></span>
        </div>
        <div class="mact">
          <button class="btn btn-outline btn-sm" :disabled="i === 0 || busy" aria-label="Naikkan" @click="move(i, -1)">↑</button>
          <button class="btn btn-outline btn-sm" :disabled="i === slides.length - 1 || busy" aria-label="Turunkan" @click="move(i, 1)">↓</button>
          <button class="btn btn-outline btn-sm" :disabled="busy" @click="toggle(s)">{{ s.isActive ? 'Sembunyikan' : 'Tampilkan' }}</button>
          <button class="btn btn-outline btn-sm" @click="edit(s)">Ubah</button>
          <button class="btn btn-outline btn-sm danger" :disabled="busy" @click="remove(s)">Hapus</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Slider Hero — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const MAX = 5
const { data: slides, refresh, status } = useFetch('/api/admin/hero', { lazy: true })
const loading = computed(() => status.value === 'pending' && !slides.value)
const full = computed(() => (slides.value?.length ?? 0) >= MAX)

const blank = () => ({ imageUrl: null as string | null, alt: '', linkUrl: '' as string | null, isActive: true })
const form = reactive(blank())
const editingId = ref<string | null>(null)
const busy = ref(false)
const error = ref('')
const info = ref('')

const msg = (e: any) => e?.data?.statusMessage || e?.data?.message || 'Terjadi kesalahan'

function reset() { Object.assign(form, blank()); editingId.value = null }
function edit(s: any) {
  editingId.value = s.id; info.value = ''; error.value = ''
  Object.assign(form, { imageUrl: s.imageUrl, alt: s.alt, linkUrl: s.linkUrl ?? '', isActive: s.isActive })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function run(fn: () => Promise<unknown>, ok?: string) {
  error.value = ''; info.value = ''; busy.value = true
  try { await fn(); if (ok) info.value = ok } catch (e) { error.value = msg(e) } finally { busy.value = false; await refresh() }
}

const save = () => run(async () => {
  if (!form.imageUrl) throw { data: { statusMessage: 'Gambar wajib diunggah' } }
  await $fetch(editingId.value ? `/api/admin/hero/${editingId.value}` : '/api/admin/hero', { method: editingId.value ? 'PATCH' : 'POST', body: form })
  reset()
}, 'Tersimpan.')

const toggle = (s: any) => run(() => $fetch(`/api/admin/hero/${s.id}`, { method: 'PATCH', body: { imageUrl: s.imageUrl, alt: s.alt, linkUrl: s.linkUrl, isActive: !s.isActive } }))

const move = (i: number, d: number) => run(() => {
  const ids = slides.value!.map((s) => s.id)
  ;[ids[i], ids[i + d]] = [ids[i + d], ids[i]]
  return $fetch('/api/admin/hero/reorder', { method: 'POST', body: { ids } })
})

function remove(s: { id: string; alt: string }) {
  if (!confirm(`Hapus slide "${s.alt}"?`)) return
  return run(async () => { await $fetch(`/api/admin/hero/${s.id}`, { method: 'DELETE' }); if (editingId.value === s.id) reset() })
}
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0 1rem; }
.mact { display: flex; flex-wrap: wrap; gap: .4rem; align-items: center; }
.check { display: flex; gap: .5rem; align-items: center; font-size: .875rem; margin-bottom: 1rem; }
.ok { background: var(--color-brand-soft); color: var(--color-brand-dark); border-radius: var(--radius-sm); padding: .6rem .8rem; font-size: .8125rem; margin-bottom: 1rem; }
.list { display: grid; gap: .75rem; }
.item { display: grid; grid-template-columns: 160px 1fr; gap: .75rem 1rem; align-items: center; padding: .75rem; }
.item.off { opacity: .6; }
.item .mact { grid-column: 1 / -1; }
.thumb { width: 160px; aspect-ratio: 1080 / 402; object-fit: cover; border-radius: var(--radius-sm); background: var(--color-surface-2); }
.meta { display: grid; gap: .25rem; min-width: 0; }
.meta .small { overflow-wrap: anywhere; }
.danger { color: #8A1C12; }
@media (max-width: 520px) { .item { grid-template-columns: 1fr; } .thumb { width: 100%; } }
</style>
