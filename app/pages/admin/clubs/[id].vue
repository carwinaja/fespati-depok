<template>
  <div>
    <NuxtLink to="/admin/clubs" class="btn btn-ghost" style="margin-bottom:1rem">← Kembali</NuxtLink>

    <form class="panel" @submit.prevent="save">
      <h2 class="h3" style="margin-bottom:1rem">{{ isNew ? 'Klub baru' : 'Data klub' }}</h2>
      <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
      <p v-if="saved" class="ok">Tersimpan.</p>

      <div class="field"><label>Logo</label><AdminImageUpload v-model="form.logoUrl" /></div>
      <div class="grid">
        <div class="field"><label for="name">Nama klub</label><input id="name" v-model="form.name" class="input" required minlength="2" /></div>
        <div class="field"><label for="leader">Nama ketua</label><input id="leader" v-model="form.leaderName" class="input" required minlength="2" /></div>
        <div class="field"><label for="phone">WhatsApp</label><input id="phone" v-model="form.phone" class="input" required inputmode="tel" placeholder="0812xxxxxxx" /></div>
        <div class="field"><label for="loc">Lokasi latihan</label><input id="loc" v-model="form.location" class="input" required /></div>
        <div class="field"><label for="sch">Jadwal latihan</label><input id="sch" v-model="form.schedule" class="input" required placeholder="Sabtu & Minggu, 07.00" /></div>
        <div class="field"><label for="map">Link Google Maps</label><input id="map" v-model="form.mapUrl" type="url" class="input" placeholder="https://maps.google.com/…" /></div>
        <div class="field"><label for="color">Warna banner</label><input id="color" v-model="form.colorHex" type="color" class="input color" /></div>
      </div>
      <div class="field"><label for="desc">Deskripsi</label><textarea id="desc" v-model="form.description" class="input" rows="3"></textarea></div>
      <button class="btn btn-primary" :disabled="busy">{{ busy ? 'Menyimpan…' : 'Simpan' }}</button>
    </form>

    <section v-if="!isNew && club" class="panel" style="margin-top:1.5rem">
      <h2 class="h3" style="margin-bottom:1rem">Anggota ({{ club.members.length }})</h2>
      <p v-if="memberError" class="alert-error" role="alert">{{ memberError }}</p>

      <form class="mform" @submit.prevent="saveMember">
        <input v-model="mf.fullName" class="input" placeholder="Nama lengkap" required minlength="2" aria-label="Nama lengkap" />
        <input v-model="mf.memberNo" class="input" placeholder="No. anggota (opsional)" aria-label="No. anggota" />
        <input v-model="mf.phone" class="input" placeholder="No. HP (opsional)" inputmode="tel" aria-label="No. HP" />
        <select v-model="mf.status" class="input" aria-label="Status"><option value="ACTIVE">Aktif</option><option value="INACTIVE">Nonaktif</option></select>
        <div class="mact">
          <button class="btn btn-primary btn-sm" :disabled="mbusy">{{ editingId ? 'Simpan' : 'Tambah' }}</button>
          <button v-if="editingId" type="button" class="btn btn-outline btn-sm" @click="resetMember">Batal</button>
        </div>
      </form>

      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Nama</th><th>No.</th><th>HP</th><th>Status</th><th></th></tr></thead>
          <tbody>
            <tr v-if="!club.members.length"><td colspan="5" class="small">Belum ada anggota.</td></tr>
            <tr v-for="m in club.members" :key="m.id">
              <td>{{ m.fullName }}</td>
              <td>{{ m.memberNo || '–' }}</td>
              <td>{{ m.phone || '–' }}</td>
              <td>{{ m.status === 'ACTIVE' ? 'Aktif' : 'Nonaktif' }}</td>
              <td class="act">
                <button class="btn btn-outline btn-sm" @click="editMember(m)">Ubah</button>
                <button class="btn btn-outline btn-sm danger" @click="removeMember(m)">Hapus</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Klub — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const route = useRoute()
const id = route.params.id as string
const isNew = id === 'new'
const msg = (e: any) => e?.data?.statusMessage || 'Terjadi kesalahan'

const { data: club, refresh } = isNew ? { data: ref(null), refresh: async () => {} } : await useFetch(`/api/admin/clubs/${id}`)

const form = reactive({
  name: '', leaderName: '', phone: '', location: '', schedule: '', description: '' as string | null,
  logoUrl: null as string | null, mapUrl: '' as string | null, colorHex: '#1A5C38' as string | null,
})
if (club.value) {
  const c = club.value
  Object.assign(form, {
    name: c.name, leaderName: c.leaderName, phone: c.phone, location: c.location, schedule: c.schedule,
    description: c.description ?? '', logoUrl: c.logoUrl, mapUrl: c.mapUrl ?? '', colorHex: c.colorHex || '#1A5C38',
  })
}

const error = ref('')
const saved = ref(false)
const busy = ref(false)

async function save() {
  error.value = ''; saved.value = false; busy.value = true
  try {
    if (isNew) {
      const c = await $fetch<{ id: string }>('/api/admin/clubs', { method: 'POST', body: form })
      await navigateTo(`/admin/clubs/${c.id}`)
    } else {
      await $fetch(`/api/admin/clubs/${id}`, { method: 'PATCH', body: form })
      saved.value = true
      await refresh()
    }
  } catch (e) { error.value = msg(e) } finally { busy.value = false }
}

// ── Anggota ──
const blank = () => ({ fullName: '', memberNo: '', phone: '', status: 'ACTIVE' })
const mf = reactive(blank())
const editingId = ref<string | null>(null)
const memberError = ref('')
const mbusy = ref(false)

function resetMember() { Object.assign(mf, blank()); editingId.value = null }
function editMember(m: any) {
  editingId.value = m.id
  Object.assign(mf, { fullName: m.fullName, memberNo: m.memberNo ?? '', phone: m.phone ?? '', status: m.status })
}
async function saveMember() {
  memberError.value = ''; mbusy.value = true
  try {
    if (editingId.value) await $fetch(`/api/admin/members/${editingId.value}`, { method: 'PATCH', body: mf })
    else await $fetch('/api/admin/members', { method: 'POST', body: { ...mf, clubId: id } })
    resetMember()
    await refresh()
  } catch (e) { memberError.value = msg(e) } finally { mbusy.value = false }
}
async function removeMember(m: { id: string; fullName: string }) {
  if (!confirm(`Hapus anggota "${m.fullName}"?`)) return
  memberError.value = ''
  try { await $fetch(`/api/admin/members/${m.id}`, { method: 'DELETE' }); await refresh() }
  catch (e) { memberError.value = msg(e) }
}
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0 1rem; }
.color { height: 42px; padding: .2rem; }
.ok { background: var(--color-brand-soft); color: var(--color-brand-dark); border-radius: var(--radius-sm); padding: .6rem .8rem; font-size: .8125rem; margin-bottom: 1rem; }
.mform { display: grid; grid-template-columns: 2fr 1.2fr 1.2fr .9fr auto; gap: .5rem; margin-bottom: 1rem; }
.mact { display: flex; gap: .4rem; align-items: center; }
.act { display: flex; gap: .4rem; justify-content: flex-end; }
.danger { color: #8A1C12; }
@media (max-width: 860px) { .mform { grid-template-columns: 1fr 1fr; } }
</style>
