<template>
  <div>
    <NuxtLink to="/admin/curations" class="btn btn-ghost">← Semua curation</NuxtLink>
    <p v-if="loadError" class="alert-error" role="alert" style="margin-top:1rem">{{ loadError }}</p>

    <template v-if="curation">
      <form class="panel" style="margin-top:1rem" @submit.prevent="saveMeta">
        <h2 class="h3" style="margin-bottom:1rem">Detail curation</h2>
        <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
        <p v-if="info" class="ok">{{ info }}</p>
        <div class="field"><label for="t">Judul</label><input id="t" v-model="meta.title" class="input" required minlength="3" maxlength="120" /></div>
        <div class="field"><label for="d">Deskripsi (opsional)</label><input id="d" v-model="meta.description" class="input" maxlength="500" /></div>
        <label class="check"><input v-model="meta.isPublished" type="checkbox" /> Tampilkan di situs (submenu Curation)</label>
        <button class="btn btn-primary" :disabled="busy">Simpan</button>
        <NuxtLink v-if="curation.isPublished" :to="`/curation/${curation.slug}`" target="_blank" class="btn btn-ghost">Lihat halaman ↗</NuxtLink>
      </form>

      <div class="panel" style="margin-top:1rem">
        <h2 class="h3" style="margin-bottom:.25rem">Unggah file</h2>
        <p class="small" style="margin-bottom:1rem">PDF, Word, Excel, PowerPoint, CSV, ZIP, atau gambar. Maksimal 25 MB per file; boleh pilih banyak file sekaligus.</p>
        <label class="btn btn-outline" :class="{ disabled: uploading }">
          {{ uploading ? 'Mengunggah…' : 'Pilih file' }}
          <input type="file" multiple :accept="CURATION_ACCEPT" hidden :disabled="uploading" @change="onPick" />
        </label>
        <ul v-if="queue.length" class="queue">
          <li v-for="q in queue" :key="q.id" :class="{ bad: q.error }">
            <span class="q-name">{{ q.name }}</span>
            <span class="small">{{ q.error || (q.done ? 'Selesai' : `${q.pct}%`) }}</span>
          </li>
        </ul>
      </div>

      <h2 class="h3" style="margin:1.5rem 0 .75rem">File ({{ curation.files.length }})</h2>
      <p v-if="!curation.files.length" class="small">Belum ada file.</p>
      <div v-else class="list">
        <div v-for="(f, i) in curation.files" :key="f.id" class="panel item">
          <span class="badge badge-brand">{{ fileLabel(f.mimeType) }}</span>
          <div class="meta">
            <template v-if="editing === f.id">
              <input v-model="editTitle" class="input" maxlength="200" @keyup.enter="saveTitle(f)" @keyup.esc="editing = null" />
            </template>
            <template v-else>
              <strong>{{ f.title }}</strong>
              <a :href="f.fileUrl" target="_blank" rel="noopener" class="small">{{ f.fileName }} · {{ formatSize(f.size) }}</a>
            </template>
          </div>
          <div class="mact">
            <button class="btn btn-outline btn-sm" :disabled="i === 0 || busy" aria-label="Naikkan" @click="moveFile(i, -1)">↑</button>
            <button class="btn btn-outline btn-sm" :disabled="i === curation.files.length - 1 || busy" aria-label="Turunkan" @click="moveFile(i, 1)">↓</button>
            <template v-if="editing === f.id">
              <button class="btn btn-primary btn-sm" :disabled="busy" @click="saveTitle(f)">Simpan</button>
              <button class="btn btn-outline btn-sm" @click="editing = null">Batal</button>
            </template>
            <button v-else class="btn btn-outline btn-sm" @click="editing = f.id; editTitle = f.title">Ubah judul</button>
            <button class="btn btn-outline btn-sm danger" :disabled="busy" @click="removeFile(f)">Hapus</button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Kelola Curation — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const id = useRoute().params.id as string
const { data: curation, refresh, error: fetchError } = await useFetch(`/api/admin/curations/${id}`)
const loadError = computed(() => (fetchError.value ? 'Curation tidak ditemukan atau gagal dimuat' : ''))

const meta = reactive({ title: curation.value?.title ?? '', description: curation.value?.description ?? '', isPublished: curation.value?.isPublished ?? false })
const busy = ref(false)
const error = ref('')
const info = ref('')
const msg = (e: any) => e?.data?.statusMessage || e?.data?.message || e?.message || 'Terjadi kesalahan'

async function run(fn: () => Promise<unknown>, ok?: string) {
  error.value = ''; info.value = ''; busy.value = true
  try { await fn(); if (ok) info.value = ok } catch (e) { error.value = msg(e) } finally { busy.value = false; await refresh() }
}

const saveMeta = () => run(
  () => $fetch(`/api/admin/curations/${id}`, { method: 'PATCH', body: { title: meta.title, description: meta.description || null, isPublished: meta.isPublished } }),
  'Tersimpan.',
)

// Upload
interface Q { id: number; name: string; pct: number; done: boolean; error: string }
const queue = ref<Q[]>([])
const uploading = ref(false)
let seq = 0

async function onPick(e: Event) {
  const input = e.target as HTMLInputElement
  const files = Array.from(input.files ?? [])
  input.value = ''
  if (!files.length) return
  error.value = ''
  uploading.value = true
  queue.value = files.map((f) => reactive({ id: ++seq, name: f.name, pct: 0, done: false, error: '' }))
  // Berurutan agar urutan file di curation sama dengan urutan pilihan
  for (const [i, file] of files.entries()) {
    const q = queue.value[i]
    try {
      await uploadCurationFile(id, file, (p) => { q.pct = p })
      q.done = true
    } catch (err) { q.error = msg(err) }
  }
  uploading.value = false
  await refresh()
}

// File
const editing = ref<string | null>(null)
const editTitle = ref('')

const saveTitle = (f: { id: string }) => run(async () => {
  await $fetch(`/api/admin/curation-files/${f.id}`, { method: 'PATCH', body: { title: editTitle.value } })
  editing.value = null
})

const moveFile = (i: number, d: number) => run(() => {
  const ids = curation.value!.files.map((f) => f.id)
  ;[ids[i], ids[i + d]] = [ids[i + d], ids[i]]
  return $fetch(`/api/admin/curations/${id}/files/reorder`, { method: 'POST', body: { ids } })
})

function removeFile(f: { id: string; title: string }) {
  if (!confirm(`Hapus file "${f.title}"? File juga dihapus dari storage.`)) return
  return run(() => $fetch(`/api/admin/curation-files/${f.id}`, { method: 'DELETE' }))
}
</script>

<style scoped>
.check { display: flex; gap: .5rem; align-items: center; font-size: .875rem; margin-bottom: 1rem; }
.ok { background: var(--color-brand-soft); color: var(--color-brand-dark); border-radius: var(--radius-sm); padding: .6rem .8rem; font-size: .8125rem; margin-bottom: 1rem; }
.disabled { opacity: .55; pointer-events: none; }
.queue { list-style: none; margin: 1rem 0 0; padding: 0; display: grid; gap: .4rem; }
.queue li { display: flex; justify-content: space-between; gap: 1rem; font-size: .8125rem; }
.queue li.bad .small { color: #8A1C12; }
.q-name { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.list { display: grid; gap: .75rem; }
.item { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem 1rem; }
.meta { display: grid; gap: .15rem; min-width: 0; flex: 1; }
.meta .small { overflow-wrap: anywhere; }
.mact { display: flex; flex-wrap: wrap; gap: .4rem; align-items: center; }
.danger { color: #8A1C12; }
</style>
