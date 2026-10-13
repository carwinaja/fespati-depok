<template>
  <section id="tentang" class="about-section section" style="background: var(--color-surface-2)">
    <div class="container">
      <!-- Section header -->
      <div class="section-header">
        <span class="label">Tentang Kami</span>
        <h2 class="h2">Mengenal FESPATI Depok</h2>
        <p class="lead" style="max-width:52ch; margin-inline:auto; text-align:center">
          Wadah resmi bagi pemanah tradisional Kota Depok untuk berlatih, berkompetisi, dan mempererat tali silaturahmi.
        </p>
      </div>

      <!-- Profile + Mission grid -->
      <div class="about-grid">
        <div class="about-card card">
          <div class="about-card-icon">🏹</div>
          <h3 class="h3">Profil Organisasi</h3>
          <p class="lead about-text">
            FESPATI Depok berdiri sejak 2010 sebagai federasi yang menaungi klub-klub panahan tradisional di wilayah Kota Depok. Kami berkomitmen melestarikan warisan budaya panahan Nusantara.
          </p>
        </div>
        <div class="about-card card">
          <div class="about-card-icon">🎯</div>
          <h3 class="h3">Visi</h3>
          <p class="lead about-text">
            Menjadi federasi panahan tradisional terbaik dan terpercaya di Jawa Barat yang menjunjung tinggi nilai sportivitas, kebersamaan, dan kelestarian budaya.
          </p>
        </div>
        <div class="about-card card">
          <div class="about-card-icon">🌱</div>
          <h3 class="h3">Misi</h3>
          <ul class="mission-list">
            <li>Pembinaan atlet panahan tradisional berkualitas</li>
            <li>Penyelenggaraan kompetisi yang sportif dan teratur</li>
            <li>Pelestarian seni & budaya panahan Nusantara</li>
            <li>Pemberdayaan komunitas anggota secara berkelanjutan</li>
          </ul>
        </div>
      </div>

      <!-- Secretariat -->
      <div class="secretariat card">
        <div class="sec-left">
          <span class="label">Alamat Sekretariat</span>
          <h3 class="h3" style="margin-top:.5rem">Kantor FESPATI Depok</h3>
          <div class="sec-details">
            <div class="sec-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Jl. Tampak Siring Raya No. 01 RT.04 RW.13 Kelurahan Limo Kecamatan Limo Kota Depok 16515</span>
            </div>
            <div class="sec-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.07 6.07l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>0818-1377-16 (WhatsApp)</span>
            </div>
            <div class="sec-row">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <span>fespati.depok@gmail.com</span>
            </div>
          </div>
          <a href="https://wa.me/62818137716" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:1.25rem">
            Hubungi Kami →
          </a>
        </div>
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3212155820597!2d106.78134967504789!3d-6.352444962147568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69efeb168f9871%3A0xaee375fd65bf5a9e!2sAl%20Ihsan%20Archery!5e0!3m2!1sid!2sid!4v179cd0670138486!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe>
      </div>

      <!-- Pengurus -->
      <div class="pengurus-section">
        <h3 class="h3" style="text-align:center; margin-bottom:1.75rem">Struktur Pengurus</h3>

        <!-- Pengurus inti -->
        <div class="inti">
          <div class="pengurus-card card ketua">
            <div class="pengurus-avatar" :style="{ background: ketua.color }">{{ initials(ketua.nama) }}</div>
            <div class="pengurus-info">
              <p class="pengurus-nama">{{ ketua.nama }}</p>
              <p class="pengurus-jabatan">{{ ketua.jabatan }}</p>
            </div>
          </div>
          <div class="inti-row">
            <div v-for="p in inti" :key="p.nama" class="pengurus-card card">
              <div class="pengurus-avatar" :style="{ background: p.color }">{{ initials(p.nama) }}</div>
              <div class="pengurus-info">
                <p class="pengurus-nama">{{ p.nama }}</p>
                <p class="pengurus-jabatan">{{ p.jabatan }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bidang: accordion di mobile, selalu terbuka di desktop -->
        <div class="bidang-grid">
          <div v-for="(b, i) in bidang" :key="b.nama" class="bidang-card card" :class="{ open: openBidang.has(i) }">
            <button
              class="bidang-head"
              :aria-expanded="openBidang.has(i)"
              :aria-controls="`bidang-${i}`"
              @click="toggleBidang(i)"
            >
              <span class="bidang-nama">{{ b.nama }}</span>
              <svg class="bidang-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <ul :id="`bidang-${i}`" class="bidang-body">
              <li v-for="n in b.anggota" :key="n">
                <span class="bidang-avatar" aria-hidden="true">{{ initials(n) }}</span>
                {{ n }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const ketua = { nama: 'Bani Magribi', jabatan: 'Ketua', color: '#1A5C38' }
const inti = [
  { nama: 'Anne Rufaidah', jabatan: 'Sekretaris', color: '#2E7D52' },
  { nama: 'Hari Azhari', jabatan: 'Bendahara', color: '#C89B3C' },
]
const bidang = [
  { nama: 'Bidang Organisasi', anggota: ['Mochammad Effendy', 'Rika Yustini'] },
  { nama: 'Bidang Pembinaan & Prestasi', anggota: ['Ridjalena', 'Muzni Ikhsan'] },
  { nama: 'Bidang Humas & Sosial Media', anggota: ['Yuus Sadaputra', 'Tsabit Arra\'id'] },
  { nama: 'Bidang Litbang', anggota: ['Carwin', 'Daris Muji Santoso'] },
  { nama: 'Bidang Perwasitan & Perlombaan', anggota: ['Faisal Yudho Prabowo', 'Andriningrum Sarnoko'] },
]

const initials = (nama: string) =>
  nama.split(/\s+/).slice(0, 2).map((w) => w.charAt(0)).join('').toUpperCase()

// Hanya berpengaruh di mobile; di desktop daftar selalu tampil lewat CSS
const openBidang = ref(new Set<number>())
function toggleBidang(i: number) {
  const next = new Set(openBidang.value)
  next.has(i) ? next.delete(i) : next.add(i)
  openBidang.value = next
}
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-header .label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--color-brand);
}

.section-header .h2 {
  margin-bottom: 0.75rem;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.about-card {
  padding: 1.75rem;
}

.about-card-icon {
  font-size: 2rem;
  margin-bottom: 0.9rem;
}

.about-text {
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.mission-list {
  list-style: none;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.mission-list li {
  font-size: 0.875rem;
  color: var(--color-ink-2);
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
}

.mission-list li::before {
  content: '✓';
  color: var(--color-brand);
  font-weight: 700;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Secretariat */
.secretariat {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  overflow: hidden;
  margin-bottom: 3rem;
}

.sec-left {
  padding: 2rem;
}

.sec-details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.sec-row {
  display: flex;
  gap: 0.6rem;
  align-items: flex-start;
  font-size: 0.875rem;
  color: var(--color-ink-2);
}

.sec-row svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--color-brand);
}

.sec-map {
  background: var(--color-surface-2);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border-left: 1px solid var(--color-border-soft);
}

.map-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-ink-3);
}

/* Pengurus */
.inti { display: flex; flex-direction: column; align-items: center; margin-bottom: 2rem; }

.ketua {
  width: min(100%, 320px);
  position: relative;
  margin-bottom: 1.5rem;
}
/* garis penghubung ketua -> sekretaris & bendahara */
.ketua::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  width: 2px;
  height: 1.5rem;
  background: var(--color-border);
}

.inti-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: min(100%, 640px);
}

.pengurus-card {
  display: flex;
  gap: 0.85rem;
  align-items: center;
  padding: 1rem 1.25rem;
}

.pengurus-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.75rem;
  flex-shrink: 0;
}

.pengurus-nama {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-ink);
}

.pengurus-jabatan {
  font-size: 0.75rem;
  color: var(--color-ink-3);
  margin-top: 0.15rem;
}

/* Bidang */
.bidang-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
}
.bidang-card { grid-column: span 2; padding: 1rem 1.25rem; }
/* 5 kartu: baris kedua (2 kartu) dipusatkan */
.bidang-card:nth-child(4) { grid-column: 2 / span 2; }
.bidang-card:nth-child(5) { grid-column: 4 / span 2; }

.bidang-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  text-align: left;
  cursor: default;
  color: inherit;
}
.bidang-nama { font-size: 0.875rem; font-weight: 700; color: var(--color-brand); }
.bidang-chevron { display: none; transition: transform var(--transition); color: var(--color-ink-3); flex-shrink: 0; }

.bidang-body { list-style: none; margin: 0.75rem 0 0; padding: 0; display: grid; gap: 0.5rem; }
.bidang-body li { display: flex; align-items: center; gap: 0.6rem; font-size: 0.875rem; color: var(--color-ink-2); }
.bidang-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-brand-soft);
  color: var(--color-brand);
  font-size: 0.6875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .about-grid { grid-template-columns: 1fr; }
  .secretariat { grid-template-columns: 1fr; }
  .sec-map { min-height: 150px; border-left: none; border-top: 1px solid var(--color-border-soft); }
  .bidang-grid { grid-template-columns: repeat(2, 1fr); }
  .bidang-card,
  .bidang-card:nth-child(4),
  .bidang-card:nth-child(5) { grid-column: auto; }
}

/* Mobile: accordion */
@media (max-width: 768px) {
  .bidang-grid { grid-template-columns: 1fr; gap: 0.5rem; }
  .bidang-card { padding: 0; }
  .bidang-head { padding: 0.9rem 1rem; min-height: 48px; cursor: pointer; }
  .bidang-chevron { display: block; }
  .bidang-card.open .bidang-chevron { transform: rotate(180deg); }
  .bidang-body { display: none; margin: 0; padding: 0 1rem 1rem; }
  .bidang-card.open .bidang-body { display: grid; }

  .inti-row { gap: 0.5rem; }
  .pengurus-card { padding: 0.85rem; }
  .inti-row .pengurus-card { flex-direction: column; text-align: center; gap: 0.5rem; }
}
</style>
