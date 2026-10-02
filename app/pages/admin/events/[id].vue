<template>
  <div>
    <NuxtLink to="/admin/events" class="btn btn-ghost" style="margin-bottom:1rem">← Kembali</NuxtLink>
    <form class="panel" @submit.prevent="save">
      <h2 class="h3" style="margin-bottom:1rem">{{ isNew ? 'Kegiatan baru' : 'Ubah kegiatan' }}</h2>
      <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
      <p v-if="saved" class="ok">Tersimpan.</p>

      <div class="field"><label for="title">Nama lomba / kegiatan</label><input id="title" v-model="form.title" class="input" required minlength="3" maxlength="200" /></div>
      <div class="grid">
        <div class="field"><label for="date">Tanggal & waktu</label><input id="date" v-model="form.eventDate" type="datetime-local" class="input" required /></div>
        <div class="field"><label for="loc">Lokasi</label><input id="loc" v-model="form.location" class="input" required /></div>
        <div class="field">
          <label for="type">Jenis</label>
          <select id="type" v-model="form.type" class="input"><option value="INTERNAL">Internal (FESPATI)</option><option value="EXTERNAL">Eksternal</option></select>
        </div>
        <div class="field">
          <label for="status">Status</label>
          <select id="status" v-model="form.status" class="input">
            <option value="UPCOMING">Akan datang</option><option value="ONGOING">Berlangsung</option>
            <option value="DONE">Selesai</option><option value="CANCELLED">Dibatalkan (disembunyikan)</option>
          </select>
        </div>
      </div>
      <div class="field"><label>Poster / thumbnail (opsional, tampil di agenda beranda)</label><AdminImageUpload v-model="form.imageUrl" /></div>
      <div class="field"><label for="reg">Link pendaftaran</label><input id="reg" v-model="form.registrationUrl" type="url" class="input" placeholder="https://…" /></div>
      <div class="field"><label>Dokumen (technical meeting / juknis, PDF)</label><AdminPdfUpload v-model="form.pdfUrl" /></div>
      <div class="field"><label for="desc">Deskripsi</label><textarea id="desc" v-model="form.description" class="input" rows="4" maxlength="5000"></textarea></div>
      <button class="btn btn-primary" :disabled="busy">{{ busy ? 'Menyimpan…' : 'Simpan' }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Kegiatan — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const id = useRoute().params.id as string
const isNew = id === 'new'
const { data: ev } = isNew ? { data: ref(null) } : await useFetch(`/api/admin/events/${id}`)

// <input type="datetime-local"> memakai waktu lokal tanpa zona
const toLocal = (iso: string) => { const d = new Date(iso); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 16) }

const form = reactive({
  title: '', eventDate: '', location: '', type: 'INTERNAL', status: 'UPCOMING',
  registrationUrl: '' as string | null, pdfUrl: null as string | null, imageUrl: null as string | null, description: '' as string | null,
})
if (ev.value) {
  const e = ev.value
  Object.assign(form, { title: e.title, eventDate: toLocal(e.eventDate), location: e.location, type: e.type, status: e.status,
    registrationUrl: e.registrationUrl ?? '', pdfUrl: e.pdfUrl, imageUrl: e.imageUrl, description: e.description ?? '' })
}

const error = ref('')
const saved = ref(false)
const busy = ref(false)

async function save() {
  error.value = ''; saved.value = false; busy.value = true
  const body = { ...form, eventDate: new Date(form.eventDate).toISOString() }
  try {
    if (isNew) {
      const e = await $fetch<{ id: string }>('/api/admin/events', { method: 'POST', body })
      await navigateTo(`/admin/events/${e.id}`)
    } else {
      await $fetch(`/api/admin/events/${id}`, { method: 'PATCH', body })
      saved.value = true
    }
  } catch (e: any) { error.value = e?.data?.statusMessage || 'Terjadi kesalahan' } finally { busy.value = false }
}
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0 1rem; }
.ok { background: var(--color-brand-soft); color: var(--color-brand-dark); border-radius: var(--radius-sm); padding: .6rem .8rem; font-size: .8125rem; margin-bottom: 1rem; }
</style>
