<template>
  <section id="galeri" class="galeri-section section">
    <div class="container">
      <div class="section-header">
        <span class="label" style="color:var(--color-brand)">Galeri</span>
        <h2 class="h2">Momen & Kenangan</h2>
        <p class="lead" style="max-width:50ch; margin-inline:auto; text-align:center">
          Dokumentasi kegiatan latihan, perlombaan, dan silaturahmi komunitas FESPATI Depok.
        </p>
      </div>

      <!-- Category filter -->
      <div v-if="categories.length > 2" class="galeri-filter">
        <button
          v-for="cat in categories"
          :key="cat"
          class="filter-btn"
          :class="{ active: activeCategory === cat }"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Photo grid -->
      <p v-if="!filteredPhotos.length" class="small" style="text-align:center">Galeri segera hadir.</p>
      <div class="photo-grid">
        <div
          v-for="(photo, i) in filteredPhotos"
          :key="i"
          class="photo-item"
          :class="photo.size"
          role="button"
          tabindex="0"
          :aria-label="`Lihat foto ${photo.caption}`"
          @click="openLightbox(photo)"
          @keypress.enter="openLightbox(photo)"
        >
          <div class="photo-bg" :style="{ background: photo.color || 'var(--color-surface-2)' }">
            <img v-if="photo.src" :src="photo.src" :alt="photo.caption" loading="lazy" class="photo-img" />
            <span v-else class="photo-emoji" aria-hidden="true">{{ photo.emoji }}</span>
            <div class="photo-overlay">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
            </div>
          </div>
          <div class="photo-caption">
            <span class="badge badge-brand">{{ photo.category }}</span>
            <p class="photo-title">{{ photo.caption }}</p>
          </div>
        </div>
      </div>

      <!-- Lightbox -->
      <Teleport to="body">
        <div v-if="lightboxPhoto" class="lightbox" @click.self="closeLightbox" aria-modal="true" role="dialog" aria-label="Lightbox foto">
          <button class="lightbox-close" @click="closeLightbox" aria-label="Tutup">✕</button>
          <div class="lightbox-content">
            <div class="lightbox-media">
              <img v-if="lightboxPhoto.src" :src="lightboxPhoto.src" :alt="lightboxPhoto.caption" class="lightbox-img-real" />
              <div v-else class="lightbox-img" :style="{ background: lightboxPhoto.color }">
                <span style="font-size:5rem">{{ lightboxPhoto.emoji }}</span>
              </div>
            </div>
            <div class="lightbox-details">
              <span class="badge badge-brand">{{ lightboxPhoto.category }}</span>
              <p class="lightbox-caption">{{ lightboxPhoto.caption }}</p>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Video section -->
      <div v-if="videos.length" class="video-section">
        <h3 class="h3" style="margin-bottom:1.25rem">Video</h3>
        <div class="video-grid">
          <a v-for="video in videos" :key="video.id" :href="video.url" target="_blank" rel="noopener" class="video-card card" :aria-label="`Putar video ${video.title}`">
            <div class="video-thumb" style="background: var(--color-brand)">
              <img v-if="video.thumb" :src="video.thumb" :alt="video.title" loading="lazy" class="video-img" />
              <div class="play-btn" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
              </div>
            </div>
            <div class="video-info">
              <p class="video-title">{{ video.title }}</p>
              <p class="video-duration">{{ video.category }}</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Photo { category: string; caption: string; src?: string | null; emoji?: string; color?: string; size?: string }

const { data } = await useFetch('/api/gallery')

const allPhotos = computed<Photo[]>(() =>
  (data.value ?? []).filter((g: any) => g.mediaType === 'PHOTO' && g.mediaUrl)
    .map((g: any) => ({ category: g.category, caption: g.event?.title ? `${g.event.title} - ${g.title}` : g.title, src: g.mediaUrl })),
)
const videos = computed(() =>
  (data.value ?? []).filter((g: any) => g.mediaType === 'VIDEO' && g.youtubeUrl)
    .map((g: any) => {
      const id = youtubeId(g.youtubeUrl)
      return { id: g.id, title: g.title, category: g.category, url: g.youtubeUrl, thumb: id ? `https://i.ytimg.com/vi/${id}/mqdefault.jpg` : null }
    }),
)

const categories = computed(() => ['Semua', ...new Set(allPhotos.value.map((p) => p.category))])
const activeCategory = ref('Semua')

const filteredPhotos = computed(() =>
  activeCategory.value === 'Semua' ? allPhotos.value : allPhotos.value.filter((p) => p.category === activeCategory.value),
)

const lightboxPhoto = ref<Photo | null>(null)

function openLightbox(photo: Photo) {
  lightboxPhoto.value = photo
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxPhoto.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 2rem;
}
.section-header .h2 { margin-bottom: .75rem; }

/* Filter */
.galeri-filter {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.8125rem;
  font-weight: 500;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-ink-2);
  cursor: pointer;
  transition: all var(--transition);
}

.filter-btn:hover { color: var(--color-ink); background: var(--color-surface-2); }
.filter-btn.active {
  background: var(--color-brand);
  color: white;
  border-color: var(--color-brand);
}

/* Photo grid */
.photo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 220px;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.photo-item {
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform var(--transition), box-shadow var(--transition);
}

.photo-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.photo-item.span-2 {
  grid-column: span 2;
}

.photo-bg {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition);
}

.photo-item:hover .photo-img {
  transform: scale(1.06);
}

.photo-emoji {
  font-size: 3.5rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  transition: transform var(--transition);
}

.photo-item:hover .photo-emoji { transform: scale(1.1); }

.photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition);
  color: white;
  backdrop-filter: blur(2px);
}

.photo-item:hover .photo-overlay { opacity: 1; }

.photo-caption {
  background: var(--color-surface);
  padding: 0.6rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-top: 1px solid var(--color-border-soft);
}

.photo-title {
  font-size: 0.75rem;
  color: var(--color-ink-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 1.5rem;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255,255,255,0.15);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition);
  z-index: 1000;
}

.lightbox-close:hover { background: rgba(255,255,255,0.3); }

.lightbox-content {
  max-width: 900px;
  width: 100%;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-media {
  width: 100%;
  max-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xl);
  overflow: hidden;
}

.lightbox-img-real {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: var(--radius-lg);
  box-shadow: 0 12px 40px rgba(0,0,0,0.5);
}

.lightbox-img {
  width: 100%;
  height: 360px;
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-details {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
}

.lightbox-caption {
  color: white;
  font-size: 1rem;
  font-weight: 500;
}

/* Video */
.video-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.video-card { overflow: hidden; display: flex; flex-direction: column; }

.video-thumb {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.play-btn {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-brand);
  z-index: 2;
  transition: transform var(--transition), background var(--transition);
  cursor: pointer;
}

.video-card:hover .play-btn { transform: scale(1.1); background: white; }

.video-emoji {
  font-size: 2.5rem;
  opacity: 0.4;
}

.video-info {
  padding: 0.9rem 1rem;
}

.video-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-ink);
  margin-bottom: 0.35rem;
  line-height: 1.3;
}

.video-duration {
  font-size: 0.75rem;
  color: var(--color-ink-3);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

@media (max-width: 768px) {
  .photo-grid { grid-template-columns: repeat(2, 1fr); }
  .photo-item.span-2 { grid-column: span 1; }
  .video-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .photo-grid { grid-template-columns: 1fr; }
}
.video-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.video-thumb .play-btn { position: relative; z-index: 1; }
a.video-card { display: block; }
</style>
