<template>
  <div>
    <form class="panel" @submit.prevent="save">
      <h2 class="h3" style="margin-bottom:1rem">{{ editingId ? 'Ubah item galeri' : 'Tambah ke galeri' }}</h2>
      <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
      <p v-if="info" class="ok">{{ info }}</p>

      <div class="grid">
        <div class="field">
          <label for="mt">Jenis</label>
          <select id="mt" v-model="form.mediaType" class="input" :disabled="!!editingId"><option value="PHOTO">Foto</option><option value="VIDEO">Video (YouTube)</option></select>
        </div>
        <div class="field"><label for="title">Judul</label><input id="title" v-model="form.title" class="input" required minlength="2" /></div>
        <div class="field">
          <label for="cat">Kategori</label>
          <input id="cat" v-model="form.category" class="input" list="gcats" required minlength="2" placeholder="Lomba" />
          <datalist id="gcats"><option>Lomba</option><option>Latihan</option><option>Kejuaraan</option><option>Kegiatan</option></datalist>
        </div>
        <div class="field">
          <label for="ev">Terkait kegiatan (opsional)</label>
          <select id="ev" v-model="form.eventId" class="input"><option value="">— Tidak ada —</option><option v-for="e in events" :key="e.id" :value="e.id">{{ e.title }}</option></select>
        </div>
      </div>

      <div v-if="form.mediaType === 'PHOTO'" class="field">
        <template v-if="editingId">
          <label>Foto</label><AdminImageUpload v-model="form.mediaUrl" />
        </template>
        <template v-else>
          <label for="files">Foto (bisa pilih banyak sekaligus; otomatis dikecilkan agar situs cepat)</label>
          <input id="files" ref="filesEl" type="file" multiple accept="image/webp,image/jpeg,image/png" class="input" />
        </template>
      </div>
      <div v-else class="field">
        <label for="yt">Link YouTube</label>
        <input id="yt" v-model="form.youtubeUrl" type="url" class="input" placeholder="https://www.youtube.com/watch?v=…" />
      </div>
      <div class="field"><label for="desc">Keterangan</label><textarea id="desc" v-model="form.description" class="input" rows="2" maxlength="1000"></textarea></div>

      <div class="mact">
        <button class="btn btn-primary" :disabled="busy">{{ busy ? 'Memproses…' : editingId ? 'Simpan' : 'Tambah' }}</button>
        <button v-if="editingId" type="button" class="btn btn-outline" @click="reset">Batal</button>
      </div>
    </form>

    <div class="filters">
      <button v-for="f in filters" :key="f.v" type="button" class="chip" :class="{ on: filter === f.v }" @click="filter = f.v">{{ f.l }}</button>
    </div>
    <div v-if="loading" class="items">
      <div v-for="n in 4" :key="n" class="skeleton skeleton-block"></div>
    </div>
    <p v-else-if="!shown.length" class="small">Belum ada item.</p>
    <div v-if="!loading" class="items">
      <div v-for="g in shown" :key="g.id" class="panel item">
        <img v-if="g.mediaType === 'PHOTO' && g.mediaUrl" :src="g.mediaUrl" :alt="g.title" class="thumb" loading="lazy" />
        <img v-else-if="ytThumb(g.youtubeUrl)" :src="ytThumb(g.youtubeUrl)!" :alt="g.title" class="thumb" loading="lazy" />
        <div v-else class="thumb nothumb">Video</div>
        <div class="meta">
          <strong>{{ g.title }}</strong>
          <span class="small">{{ g.mediaType === 'PHOTO' ? 'Foto' : 'Video' }} · {{ g.category }}<template v-if="g.event"> · {{ g.event.title }}</template></span>
          <div class="mact">
            <button class="btn btn-outline btn-sm" @click="edit(g)">Ubah</button>
            <button class="btn btn-outline btn-sm danger" @click="remove(g)">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Galeri — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const { data: items, refresh, status } = useFetch('/api/admin/gallery', { lazy: true })
const { data: events } = useFetch('/api/admin/events', { lazy: true })
const loading = computed(() => status.value === 'pending' && !items.value)

const blank = () => ({ title: '', category: '', mediaType: 'PHOTO' as 'PHOTO' | 'VIDEO', mediaUrl: null as string | null, youtubeUrl: '' as string | null, description: '' as string | null, eventId: '' as string | null })
const form = reactive(blank())
const editingId = ref<string | null>(null)
const filesEl = ref<HTMLInputElement | null>(null)
const error = ref(''); const info = ref(''); const busy = ref(false)

const filter = ref<'ALL' | 'PHOTO' | 'VIDEO'>('ALL')
const filters = [{ v: 'ALL', l: 'Semua' }, { v: 'PHOTO', l: 'Foto' }, { v: 'VIDEO', l: 'Video' }] as const
const shown = computed(() => (items.value ?? []).filter((g) => filter.value === 'ALL' || g.mediaType === filter.value))

function ytThumb(url?: string | null) {
  const m = url?.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{6,})/)
  return m ? `https://i.ytimg.com/vi/${m[1]}/mqdefault.jpg` : null
}
const msg = (e: any) => e?.data?.message || e?.data?.statusMessage || 'Terjadi kesalahan'

function reset() { Object.assign(form, blank()); editingId.value = null; if (filesEl.value) filesEl.value.value = '' }
function edit(g: any) {
  editingId.value = g.id; info.value = ''; error.value = ''
  Object.assign(form, { title: g.title, category: g.category, mediaType: g.mediaType, mediaUrl: g.mediaUrl, youtubeUrl: g.youtubeUrl ?? '', description: g.description ?? '', eventId: g.eventId ?? '' })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function save() {
  error.value = ''; info.value = ''; busy.value = true
  try {
    if (editingId.value) {
      await $fetch(`/api/admin/gallery/${editingId.value}`, { method: 'PATCH', body: form })
      info.value = 'Tersimpan.'
    } else if (form.mediaType === 'PHOTO') {
      const files = Array.from(filesEl.value?.files ?? [])
      if (!files.length) throw { data: { statusMessage: 'Pilih minimal satu foto' } }
      let ok = 0
      for (const f of files) {
        try {
          const mediaUrl = await uploadImage(f)
          await $fetch('/api/admin/gallery', { method: 'POST', body: { ...form, mediaUrl, title: files.length > 1 ? `${form.title} ${ok + 1}` : form.title } })
          ok++
        } catch (e) { throw { data: { statusMessage: `${ok} dari ${files.length} foto berhasil. Gagal pada "${f.name}": ${msg(e)}` } } }
      }
      info.value = `${ok} foto ditambahkan.`
    } else {
      await $fetch('/api/admin/gallery', { method: 'POST', body: form })
      info.value = 'Video ditambahkan.'
    }
    const keep = info.value
    reset(); info.value = keep
  } catch (e) { error.value = msg(e) } finally { busy.value = false; await refresh() }
}

async function remove(g: { id: string; title: string }) {
  if (!confirm(`Hapus "${g.title}" dari galeri?`)) return
  try { await $fetch(`/api/admin/gallery/${g.id}`, { method: 'DELETE' }); await refresh() } catch (e) { error.value = msg(e) }
}
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0 1rem; }
.mact { display: flex; gap: .4rem; align-items: center; }
.ok { background: var(--color-brand-soft); color: var(--color-brand-dark); border-radius: var(--radius-sm); padding: .6rem .8rem; font-size: .8125rem; margin-bottom: 1rem; }
.filters { display: flex; gap: .4rem; margin: 1.5rem 0 1rem; }
.chip { border: 1px solid var(--color-border); background: var(--color-surface); border-radius: var(--radius-full); padding: .3rem .9rem; font: inherit; font-size: .8125rem; cursor: pointer; }
.chip.on { background: var(--color-brand); color: #fff; border-color: var(--color-brand); }
.items { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; }
.item { padding: 0; overflow: hidden; display: flex; flex-direction: column; }
.thumb { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; background: var(--color-surface-2); }
.nothumb { display: grid; place-items: center; color: var(--color-ink-3); }
.meta { display: grid; gap: .35rem; padding: .8rem; }
.danger { color: #8A1C12; }
</style>
