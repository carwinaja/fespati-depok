<template>
  <div>
    <TheNavbar />
    <main class="section">
      <article class="container art">
        <NuxtLink to="/#berita" class="btn btn-ghost">← Semua berita</NuxtLink>
        <div class="meta">
          <span class="badge badge-brand">{{ article!.category }}</span>
          <span class="small">{{ new Date(article!.publishedAt).toLocaleDateString('id-ID', { dateStyle: 'long' }) }}</span>
          <span class="small">oleh {{ article!.author }}</span>
        </div>
        <h1 class="display">{{ article!.title }}</h1>
        <img v-if="article!.thumbnailUrl" :src="article!.thumbnailUrl" :alt="article!.title" class="hero" />
        <div class="prose" v-html="article!.content"></div>
      </article>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const slug = useRoute().params.slug as string
const { data: article, error } = await useFetch(`/api/articles/${slug}`)
if (error.value || !article.value) throw createError({ statusCode: 404, statusMessage: 'Artikel tidak ditemukan', fatal: true })

useHead({
  title: `${article.value.title} — FESPATI Depok`,
  meta: [
    { name: 'description', content: article.value.excerpt || article.value.title },
    { property: 'og:title', content: article.value.title },
    { property: 'og:type', content: 'article' },
    ...(article.value.thumbnailUrl ? [{ property: 'og:image', content: article.value.thumbnailUrl }] : []),
  ],
})
</script>

<style scoped>
.art { max-width: 760px; padding-top: 5rem; }
.meta { display: flex; flex-wrap: wrap; align-items: center; gap: .75rem; margin: 1.25rem 0 .75rem; }
.hero { width: 100%; max-height: 420px; object-fit: cover; border-radius: var(--radius-lg); margin: 1.5rem 0; }
</style>
