<template>
  <div>
    <div class="head">
      <p class="lead">{{ events?.length ?? 0 }} lomba & kegiatan.</p>
      <NuxtLink to="/admin/events/new" class="btn btn-primary">+ Tambah kegiatan</NuxtLink>
    </div>
    <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
    <div class="panel table-wrap">
      <table class="table">
        <thead><tr><th>Kegiatan</th><th>Tanggal</th><th>Jenis</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr v-if="!events?.length"><td colspan="5" class="small">Belum ada kegiatan.</td></tr>
          <tr v-for="e in events" :key="e.id">
            <td><strong>{{ e.title }}</strong><br /><span class="small">{{ e.location }}</span></td>
            <td>{{ new Date(e.eventDate).toLocaleDateString('id-ID', { dateStyle: 'medium' }) }}</td>
            <td>{{ e.type === 'INTERNAL' ? 'Internal' : 'Eksternal' }}</td>
            <td>{{ statusLabel[e.status] ?? e.status }}</td>
            <td class="act">
              <NuxtLink :to="`/admin/events/${e.id}`" class="btn btn-outline btn-sm">Ubah</NuxtLink>
              <button class="btn btn-outline btn-sm danger" @click="remove(e)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Lomba & Kegiatan — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const statusLabel: Record<string, string> = { UPCOMING: 'Akan datang', ONGOING: 'Berlangsung', DONE: 'Selesai', CANCELLED: 'Dibatalkan' }
const { data: events, refresh } = await useFetch('/api/admin/events')
const error = ref('')

async function remove(e: { id: string; title: string; _count: { galleries: number } }) {
  const extra = e._count.galleries ? ` ${e._count.galleries} foto/video terkait tidak dihapus, hanya dilepas dari kegiatan.` : ''
  if (!confirm(`Hapus "${e.title}"?${extra}`)) return
  error.value = ''
  try { await $fetch(`/api/admin/events/${e.id}`, { method: 'DELETE' }); await refresh() }
  catch (err: any) { error.value = err?.data?.statusMessage || 'Gagal menghapus' }
}
</script>

<style scoped>
.head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.act { display: flex; gap: .4rem; justify-content: flex-end; }
.danger { color: #8A1C12; }
</style>
