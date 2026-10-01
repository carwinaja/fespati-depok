<template>
  <div>
    <NuxtLink to="/admin/articles" class="btn btn-ghost" style="margin-bottom:1rem">← Kembali</NuxtLink>
    <form class="panel" @submit.prevent="save">
      <h2 class="h3" style="margin-bottom:1rem">{{ isNew ? 'Artikel baru' : 'Ubah artikel' }}</h2>
      <p v-if="error" class="alert-error" role="alert">{{ error }}</p>
      <p v-if="saved" class="ok">Tersimpan.</p>

      <div class="field"><label for="title">Judul</label><input id="title" v-model="form.title" class="input" required minlength="3" maxlength="200" /></div>
      <div class="grid">
        <div class="field">
          <label for="cat">Kategori</label>
          <input id="cat" v-model="form.category" class="input" list="cats" required minlength="2" placeholder="Tips Panahan" />
          <datalist id="cats"><option>Tips Panahan</option><option>Edukasi</option><option>Berita</option><option>Liputan Lomba</option></datalist>
        </div>
        <div class="field"><label for="author">Penulis</label><input id="author" v-model="form.author" class="input" required minlength="2" /></div>
        <div class="field"><label for="date">Tanggal terbit</label><input id="date" v-model="form.publishedAt" type="date" class="input" required /></div>
      </div>
      <div class="field"><label>Thumbnail</label><AdminImageUpload v-model="form.thumbnailUrl" /></div>
      <div class="field">
        <label for="exc">Ringkasan (maks. 300 karakter)</label>
        <textarea id="exc" v-model="form.excerpt" class="input" rows="2" maxlength="300"></textarea>
      </div>
      <div class="field"><label>Isi artikel</label><AdminRichEditor v-model="form.content" /></div>

      <div class="checks">
        <label><input v-model="form.isPublished" type="checkbox" /> Terbitkan</label>
        <label><input v-model="form.isFeatured" type="checkbox" /> Jadikan artikel unggulan</label>
      </div>
      <button class="btn btn-primary" :disabled="busy">{{ busy ? 'Menyimpan…' : form.isPublished ? 'Simpan & terbitkan' : 'Simpan draf' }}</button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: 'admin' })
useHead({ title: 'Artikel — Admin FESPATI', meta: [{ name: 'robots', content: 'noindex, nofollow' }] })

const id = useRoute().params.id as string
const isNew = id === 'new'
const today = () => new Date().toISOString().slice(0, 10)

const { data: article } = isNew ? { data: ref(null) } : await useFetch(`/api/admin/articles/${id}`)

const form = reactive({
  title: '', category: '', author: 'Admin FESPATI', excerpt: '' as string | null, content: '',
  thumbnailUrl: null as string | null, isPublished: false, isFeatured: false, publishedAt: today(),
})
if (article.value) {
  const a = article.value
  Object.assign(form, {
    title: a.title, category: a.category, author: a.author, excerpt: a.excerpt ?? '', content: a.content,
    thumbnailUrl: a.thumbnailUrl, isPublished: a.isPublished, isFeatured: a.isFeatured, publishedAt: a.publishedAt.slice(0, 10),
  })
}

const error = ref('')
const saved = ref(false)
const busy = ref(false)

async function save() {
  error.value = ''; saved.value = false
  if (!form.content) { error.value = 'Isi artikel wajib diisi'; return }
  busy.value = true
  try {
    if (isNew) {
      const a = await $fetch<{ id: string }>('/api/admin/articles', { method: 'POST', body: form })
      await navigateTo(`/admin/articles/${a.id}`)
    } else {
      await $fetch(`/api/admin/articles/${id}`, { method: 'PATCH', body: form })
      saved.value = true
    }
  } catch (e: any) {
    error.value = e?.data?.statusMessage || 'Terjadi kesalahan'
  } finally { busy.value = false }
}
</script>

<style scoped>
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0 1rem; }
.checks { display: flex; flex-wrap: wrap; gap: 1.5rem; margin: 1rem 0; font-size: .875rem; }
.checks label { display: flex; align-items: center; gap: .4rem; cursor: pointer; }
.ok { background: var(--color-brand-soft); color: var(--color-brand-dark); border-radius: var(--radius-sm); padding: .6rem .8rem; font-size: .8125rem; margin-bottom: 1rem; }
</style>
