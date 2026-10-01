<template>
  <section id="berita" class="news-section section">
    <div class="container">
      <div class="section-header">
        <span class="label" style="color:var(--color-brand)">Berita & Edukasi</span>
        <h2 class="h2">Info Terkini & Tips Panahan</h2>
        <p class="lead" style="max-width:52ch; margin-inline:auto; text-align:center">
          Temukan artikel edukatif, tips panahan tradisional, dan liputan kegiatan FESPATI Depok.
        </p>
      </div>

      <p v-if="!featured && !articles.length" class="small" style="text-align:center">Artikel segera hadir.</p>

      <!-- Featured article -->
      <div v-if="featured" class="featured-article card">
        <div class="featured-thumb" style="background: linear-gradient(135deg, #1A5C38 0%, #2E7D52 100%)">
          <img v-if="featured.thumbnailUrl" :src="featured.thumbnailUrl" :alt="featured.title" class="thumb-img" />
          <span v-else class="featured-emoji" aria-hidden="true">🏹</span>
          <div class="featured-overlay">
            <span class="badge badge-gold">Artikel Unggulan</span>
          </div>
        </div>
        <div class="featured-body">
          <div class="article-meta">
            <span class="badge badge-brand">{{ featured.category }}</span>
            <span class="small">{{ formatDate(featured.publishedAt, { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
            <span class="small">oleh {{ featured.author }}</span>
          </div>
          <h2 class="h3 featured-title">{{ featured.title }}</h2>
          <p v-if="featured.excerpt" class="lead" style="font-size:.9rem">{{ featured.excerpt }}</p>
          <NuxtLink :to="`/berita/${featured.slug}`" class="btn btn-primary" style="margin-top:1rem">Baca Selengkapnya →</NuxtLink>
        </div>
      </div>

      <!-- Article grid -->
      <div v-if="articles.length" class="article-grid">
        <article v-for="article in articles" :key="article.id" class="article-card card">
          <div class="article-thumb" style="background: linear-gradient(135deg, #1A5C38 0%, #2E7D52 100%)">
            <img v-if="article.thumbnailUrl" :src="article.thumbnailUrl" :alt="article.title" class="thumb-img" loading="lazy" />
            <span v-else class="article-emoji" aria-hidden="true">🏹</span>
          </div>
          <div class="article-body">
            <div class="article-meta">
              <span class="badge badge-brand">{{ article.category }}</span>
              <span class="small">{{ date(article.publishedAt) }}</span>
            </div>
            <h3 class="article-title">{{ article.title }}</h3>
            <p v-if="article.excerpt" class="article-excerpt">{{ article.excerpt }}</p>
            <NuxtLink :to="`/berita/${article.slug}`" class="btn-ghost" style="font-size:.8rem">Baca →</NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const data = await useSectionData('/api/articles')

const featured = computed(() => (data.value ?? []).find((a: any) => a.isFeatured) ?? null)
const articles = computed(() => (data.value ?? []).filter((a: any) => a.id !== featured.value?.id).slice(0, 6))
const date = (iso: string) => formatDate(iso)
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.section-header .h2 { margin-bottom: .75rem; }

/* Featured */
.featured-article {
  display: grid;
  grid-template-columns: 2fr 3fr;
  overflow: hidden;
  margin-bottom: 2rem;
}

.featured-thumb {
  min-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.featured-emoji {
  font-size: 5rem;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.2));
}

.featured-overlay {
  position: absolute;
  top: 1rem;
  left: 1rem;
}

.featured-body {
  padding: 2rem;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.featured-title {
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

/* Article grid */
.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.article-card { overflow: hidden; }

.article-thumb {
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.article-emoji {
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
}

.article-body {
  padding: 1.25rem;
}

.article-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1.35;
  margin: 0.6rem 0 0.5rem;
}

.article-excerpt {
  font-size: 0.8125rem;
  color: var(--color-ink-2);
  line-height: 1.6;
  margin-bottom: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 900px) {
  .featured-article { grid-template-columns: 1fr; }
  .featured-thumb { min-height: 180px; }
  .article-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .article-grid { grid-template-columns: 1fr; }
}
.featured-thumb, .article-thumb { position: relative; overflow: hidden; }
.thumb-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.featured-overlay { z-index: 1; }
</style>
