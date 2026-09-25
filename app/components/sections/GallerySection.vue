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
      <div class="galeri-filter">
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
          <div class="photo-bg" :style="{ background: photo.color }">
            <span class="photo-emoji" aria-hidden="true">{{ photo.emoji }}</span>
            <div class="photo-overlay">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
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
            <div class="lightbox-img" :style="{ background: lightboxPhoto.color }">
              <span style="font-size:5rem">{{ lightboxPhoto.emoji }}</span>
            </div>
            <p class="lightbox-caption">{{ lightboxPhoto.caption }}</p>
          </div>
        </div>
      </Teleport>

      <!-- Video section -->
      <div class="video-section">
        <h3 class="h3" style="margin-bottom:1.25rem">Video Teknik Dasar</h3>
        <div class="video-grid">
          <div v-for="video in videos" :key="video.title" class="video-card card">
            <div class="video-thumb" :style="{ background: video.color }">
              <div class="play-btn" aria-label="Putar video">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
              </div>
              <span class="video-emoji" aria-hidden="true">{{ video.emoji }}</span>
            </div>
            <div class="video-info">
              <p class="video-title">{{ video.title }}</p>
              <p class="video-duration">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                {{ video.duration }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const categories = ['Semua', 'Latihan', 'Lomba', 'Silaturahmi']
const activeCategory = ref('Semua')

interface Photo {
  category: string
  caption: string
  emoji: string
  color: string
  size?: string
}

const allPhotos: Photo[] = [
  { category: 'Lomba', caption: 'Kejuaraan Kota Depok 2025', emoji: '🏆', color: '#1A5C38', size: 'span-2' },
  { category: 'Latihan', caption: 'Sesi latihan bersama Sabtu pagi', emoji: '🎯', color: '#2E7D52' },
  { category: 'Latihan', caption: 'Teknik memanah klub Panah Asri', emoji: '🏹', color: '#4A8F5C' },
  { category: 'Silaturahmi', caption: 'Halal bihalal anggota FESPATI 2025', emoji: '🤝', color: '#C89B3C', size: 'span-2' },
  { category: 'Lomba', caption: 'Finalis kategori putra dewasa', emoji: '🥇', color: '#8B6914' },
  { category: 'Latihan', caption: 'Latihan perdana anggota baru', emoji: '🌱', color: '#3D7A55' },
  { category: 'Silaturahmi', caption: 'Jalan sehat FESPATI Depok 2025', emoji: '🚶', color: '#6B5B95' },
  { category: 'Lomba', caption: 'Penyerahan hadiah juara 1', emoji: '🎖️', color: '#C25B92' },
]

const filteredPhotos = computed(() => {
  if (activeCategory.value === 'Semua') return allPhotos
  return allPhotos.filter(p => p.category === activeCategory.value)
})

const lightboxPhoto = ref<Photo | null>(null)

function openLightbox(photo: Photo) {
  lightboxPhoto.value = photo
  document.body.style.overflow = 'hidden'
}

function closeLightbox() {
  lightboxPhoto.value = null
  document.body.style.overflow = ''
}

const videos = [
  { title: 'Teknik Memegang Busur yang Benar', duration: '8:24', emoji: '🏹', color: '#1A5C38' },
  { title: 'Cara Melepas Anak Panah (Thumb Release)', duration: '6:15', emoji: '🎯', color: '#C89B3C' },
  { title: 'Postur & Sikap Dasar Pemanah Tradisional', duration: '10:02', emoji: '🧘', color: '#2E7D52' },
  { title: 'Perawatan Busur Tradisional', duration: '5:38', emoji: '🔧', color: '#8B4513' },
]
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
  grid-auto-rows: 200px;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.photo-item {
  border-radius: var(--radius-lg);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
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
  transition: transform var(--transition);
}

.photo-item:hover .photo-bg { transform: scale(1.02); }

.photo-emoji {
  font-size: 3.5rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
  transition: transform var(--transition);
}

.photo-item:hover .photo-emoji { transform: scale(1.1); }

.photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition);
  color: white;
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
}

/* Lightbox */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  animation: fadeUp 0.2s ease;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  background: rgba(255,255,255,0.1);
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background var(--transition);
}

.lightbox-close:hover { background: rgba(255,255,255,0.2); }

.lightbox-content {
  max-width: 600px;
  width: 90vw;
}

.lightbox-img {
  border-radius: var(--radius-xl);
  height: 360px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-caption {
  color: white;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9375rem;
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
</style>
