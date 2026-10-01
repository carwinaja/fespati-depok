<template>
  <div>
    <div class="head">
      <p class="lead">{{ articles?.length ?? 0 }} artikel.</p>
      <NuxtLink to="/admin/articles/new" class="btn btn-primary">+ Tulis artikel</NuxtLink>
    </div>
    <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
    <div class="panel table-wrap">
      <table class="table">
        <thead><tr><th>Judul</th><th>Kategori</th><th>Status</th><th>Tanggal</th><th></th></tr></thead>
        <tbody>
          <tr v-if="!articles?.length"><td colspan="5" class="small">Belum ada artikel.</td></tr>
          <tr v-for="a in articles" :key="a.id">
            <td><strong>{{ a.title }}</strong><span v-if="a.isFeatured" class="badge badge-gold" style="margin-left:.5rem">Unggulan</span></td>
            <td>{{ a.category }}</td>
            <td>{{ a.isPublished ? 'Terbit' : 'Draf' }}</td>
            <td>{{ new Date(a.publishedAt).toLocaleDateString('id-ID', { dateStyle: 'medium' }) }}</td>
            <td class="act">
              <NuxtLink v-if="a.isPublished" :to="`/berita/${a.slug}`" target="_blank" class="btn btn-outline btn-sm">Lihat</NuxtLink>
              <NuxtLink :to="`/admin/articles/${a.id}`" class="btn btn-outline btn-sm">Ubah</NuxtLink>
              <button class="btn btn-outline btn-sm danger" @click="remove(a)">Hapus</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Artikel — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const { data: articles, refresh } = await useFetch('/api/admin/articles')
const error = ref('')

async function remove(a: { id: string; title: string }) {
  if (!confirm(`Hapus artikel "${a.title}"?`)) return
  error.value = ''
  try { await $fetch(`/api/admin/articles/${a.id}`, { method: 'DELETE' }); await refresh() }
  catch (e: any) { error.value = e?.data?.statusMessage || 'Gagal menghapus' }
}
</script>

<style scoped>
.head { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap; }
.act { display: flex; gap: .4rem; justify-content: flex-end; }
.danger { color: #8A1C12; }
</style>
