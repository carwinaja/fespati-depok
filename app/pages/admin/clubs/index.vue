<template>
  <div>
    <div class="head">
      <p class="lead">{{ clubs?.length ?? 0 }} klub terdaftar.</p>
      <NuxtLink to="/admin/clubs/new" class="btn btn-primary">+ Tambah klub</NuxtLink>
    </div>
    <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
    <div class="panel table-wrap">
      <table class="table">
        <thead><tr><th>Klub</th><th>Ketua</th><th>Lokasi</th><th>Anggota</th><th></th></tr></thead>
        <tbody>
          <tr v-if="!clubs?.length"><td colspan="5" class="small">Belum ada klub.</td></tr>
          <tr v-for="c in clubs" :key="c.id">
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

const { data: clubs, refresh } = await useFetch('/api/admin/clubs')
const error = ref('')

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
.mini { width: 32px; height: 32px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.mini-fb { display: grid; place-items: center; color: #fff; font-weight: 700; }
.act { display: flex; gap: .4rem; justify-content: flex-end; }
.danger { color: #8A1C12; }
</style>
