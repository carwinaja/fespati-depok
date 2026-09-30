<template>
  <section id="klub" class="clubs-section section">
    <div class="container">
      <div class="section-header">
        <span class="label" style="color:var(--color-brand)">Klub & Anggota</span>
        <h2 class="h2">Komunitas yang Solid</h2>
        <p class="lead" style="max-width:52ch; margin-inline:auto; text-align:center">
          Klub-klub panahan aktif yang tersebar di wilayah Kota Depok, siap menyambut anggota baru.
        </p>
      </div>

      <!-- Clubs Grid -->
      <div class="clubs-grid">
        <div v-for="club in clubs" :key="club.name" class="club-card card">
          <!-- ATAS: Banner Warna & Logo Klub -->
          <div class="club-header" :style="{ background: club.colorHex || 'var(--color-brand)' }">
            <div class="club-logo-wrap">
              <img 
                v-if="!imageErrors[club.name]"
                :src="club.logo" 
                :alt="club.name" 
                class="club-logo" 
                @error="imageErrors[club.name] = true"
              />
              <div v-else class="club-logo-fallback">
                {{ club.name.charAt(0) }}
              </div>
            </div>
          </div>

          <!-- DI BAWAH: Nama Klub, No WhatsApp, & Map Lokasi -->
          <div class="club-body">
            <h3 class="club-name">{{ club.name }}</h3>
            
            <p v-if="club.lokasi" class="club-lokasi">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {{ club.lokasi }}
            </p>

            <div class="club-actions">
              <!-- No WhatsApp -->
              <a :href="`https://wa.me/${club.wa}`" target="_blank" rel="noopener" class="btn-action btn-wa" :title="`WhatsApp: +${club.wa}`">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.07 6.07l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              <!-- Map Lokasi -->
              <a :href="club.map" target="_blank" rel="noopener" class="btn-action btn-map" title="Buka Lokasi Map">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="1 6 1 22 8 18 15 22 23 18 23 2 15 6 8 2 1 6"/>
                  <line x1="8" y1="2" x2="8" y2="18"/>
                  <line x1="15" y1="6" x2="15" y2="22"/>
                </svg>
                <span>Map Lokasi</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const imageErrors = ref({})

const clubs = [
  { name: 'Al Ihsan Archery', logo: '/logo-club/al-ihsan.webp', colorHex: '#1A5C38', wa: '6281234567890', map: 'https://maps.google.com', lokasi: 'Cinere,Limo, Depok' },
  { name: 'Focus Archery ', logo: '/logo-club/focus.webp', colorHex: '#C89B3C', wa: '6285817133059', map: 'https://maps.google.com', lokasi: 'Kalibaru,Cilodong, Depok' },
  { name: 'Nest Archery', logo: '/logo-club/nest.webp', colorHex: '#2E7D52', wa: '6281234567890', map: 'https://maps.google.com', lokasi: 'Curug,Bojongsari, Depok' },
  { name: 'PBM Archery', logo: '/logo-club/pbm.webp', colorHex: '#334155', wa: '6281234567890', map: 'https://maps.google.com', lokasi: 'Rangkapanjaya Baru,Pancoran Mas, Depok' },
  { name: 'Al-Quds Archery', logo: '/logo-club/al-ihsan.webp', colorHex: '#4A90A4', wa: '6281234567890', map: 'https://maps.google.com', lokasi: 'Sukamaju Baru,Cilodong Depok' },
  { name: 'ALLSUNN ARCHERY', logo: '/logo-club/focus.webp', colorHex: '#6B5B95', wa: '6281234567890', map: 'https://maps.google.com', lokasi: 'Sukamaju Baru,Tapos, Depok' },
  { name: 'Phoenix Archery Indonesia', logo: '/logo-club/nest.webp', colorHex: '#E8651A', wa: '6281234567890', map: 'https://maps.google.com', lokasi: 'Depokjaya,Pancoran MAs Depok' },
  { name: 'Komunitas Panahan Depok', logo: '/logo-club/pbm.webp', colorHex: '#C25B92', wa: '6281234567890', map: 'https://maps.google.com', lokasi: 'Bojongsari, Komplek Deppen RRI Depok' },
]
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header .h2 {
  margin-bottom: 0.75rem;
}

/* Grid layout serupa pengurus grid */
.clubs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.club-card {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-lg, 16px);
  background: var(--color-surface, #ffffff);
  border: 1px solid var(--color-border-soft, #ede9e3);
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.06));
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.club-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md, 0 4px 16px rgba(0,0,0,0.08));
}

/* Header atas dengan logo */
.club-header {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.club-logo-wrap {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #ffffff;
  padding: 5px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -36px;
  z-index: 2;
  border: 3px solid #ffffff;
}

.club-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

.club-logo-fallback {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--color-brand-soft, #E8F5EE);
  color: var(--color-brand, #1A5C38);
  font-weight: 800;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Card Body */
.club-body {
  padding: 2.75rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1;
}

.club-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-ink, #1c1a17);
  margin-bottom: 0.25rem;
}

.club-lokasi {
  font-size: 0.8125rem;
  color: var(--color-ink-3, #8c857c);
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1.25rem;
}

/* Tombol Aksi (WhatsApp & Map) */
.club-actions {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  margin-top: auto;
}

.btn-action {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.55rem 0.75rem;
  border-radius: var(--radius-md, 10px);
  font-size: 0.78125rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-wa {
  background: #25D366;
  color: #ffffff;
}

.btn-wa:hover {
  background: #1ebc57;
}

.btn-map {
  background: var(--color-brand, #1A5C38);
  color: #ffffff;
}

.btn-map:hover {
  background: var(--color-brand-dark, #124028);
}

@media (max-width: 1024px) {
  .clubs-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .clubs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .clubs-grid {
    grid-template-columns: 1fr;
  }
}
</style>