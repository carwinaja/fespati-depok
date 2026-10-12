<template>
  <div>
    <div class="head">
      <p class="lead">{{ loading ? 'Memuat…' : `${clubs?.length ?? 0} klub terdaftar.` }}</p>
      <NuxtLink to="/admin/clubs/new" class="btn btn-primary">+ Tambah klub</NuxtLink>
    </div>
    <p class="small" style="margin-bottom:.75rem">Urutan di sini menentukan urutan klub di section Klub &amp; Anggota pada beranda.</p>
    <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
    <div class="panel table-wrap">
      <table class="table">
        <thead><tr><th>Urutan</th><th>Klub</th><th>Ketua</th><th>Lokasi</th><th>Anggota</th><th></th></tr></thead>
        <tbody>
          <template v-if="loading"><tr v-for="n in 4" :key="n"><td v-for="c in 6" :key="c"><span class="skeleton"></span></td></tr></template>
          <tr v-else-if="!clubs?.length"><td colspan="6" class="small">Belum ada klub.</td></tr>
          <tr v-for="(c, i) in clubs" :key="c.id">
            <td class="ord">
              <button class="btn btn-outline btn-sm" :disabled="i === 0 || busy" aria-label="Naikkan" @click="move(i, -1)">↑</button>
              <button class="btn btn-outline btn-sm" :disabled="i === clubs!.length - 1 || busy" aria-label="Turunkan" @click="move(i, 1)">↓</button>
            </td>
            <td>
              <div class="cell-club">
                <img v-if="c.logoUrl" :src="c.logoUrl" alt="" class="mini" />
                <span v-else class="mini mini-fb" :style="{ background: c.colorHex || 'var(--color-brand)' }">{{ c.name.charAt(0) }}</span>
                <strong>{{ c.name }}</strong>
              </div>
            </td>
            <td>{{ c.leaderName }}</td>
            <td>{{ c.location }}</td>
            <td>{{ c._count.members }}</td>
            <td class="act">
              <NuxtLink :to="`/admin/clubs/${c.id}`" class="btn btn-outline btn-sm">Kelola</NuxtLink>
              <button class="btn btn-outline btn-sm danger" @click="remove(c)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Klub — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const { data: clubs, refresh, status } = useFetch('/api/admin/clubs', { lazy: true })
const loading = computed(() => status.value === 'pending' && !clubs.value)
const error = ref('')
const busy = ref(false)

async function move(i: number, d: number) {
  const list = clubs.value
  if (!list || busy.value) return
  error.value = ''; busy.value = true
  const prev = [...list]
  const next = [...list]
  ;[next[i], next[i + d]] = [next[i + d], next[i]]
  clubs.value = next
  try {
    await $fetch('/api/admin/clubs/reorder', { method: 'POST', body: { ids: next.map((c) => c.id) } })
  } catch (e: any) {
    clubs.value = prev
    error.value = e?.data?.statusMessage || 'Gagal mengubah urutan'
  } finally { busy.value = false; await refresh() }
}

async function remove(c: { id: string; name: string; _count: { members: number } }) {
  if (!confirm(`Hapus klub "${c.name}"? ${c._count.members} anggotanya ikut terhapus.`)) return
  error.value = ''
  try {
    await $fetch(`/api/admin/clubs/${c.id}`, { method: 'DELETE' })
    await refresh()
  } catch (e: any) { error.value = e?.data?.statusMessage || 'Gagal menghapus' }
}
</script>

<style scoped>
.head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.cell-club { display: flex; align-items: center; gap: .6rem; }
.ord { white-space: nowrap; }
.ord .btn + .btn { margin-left: .25rem; }
.mini { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.mini-fb { display: grid; place-items: center; color: #fff; font-weight: 700; }
.act { display: flex; gap: .4rem; justify-content: flex-end; }
.danger { color: #8A1C12; }
</style>
