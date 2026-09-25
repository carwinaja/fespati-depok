<template>
  <section id="klub" class="clubs-section section">
    <div class="container">
      <div class="section-header">
        <span class="label" style="color:var(--color-brand)">Klub & Anggota</span>
        <h2 class="h2">Komunitas yang Solid</h2>
        <p class="lead" style="max-width:52ch; margin-inline:auto; text-align:center">
          8 klub aktif yang tersebar di seluruh wilayah Kota Depok, siap menyambut anggota baru.
        </p>
      </div>

      <!-- Clubs grid -->
      <div class="clubs-grid">
        <div v-for="klub in klubList" :key="klub.nama" class="klub-card card">
          <div class="klub-header" :style="{ background: klub.color }">
            <span class="klub-initial">{{ klub.initial }}</span>
          </div>
          <div class="klub-body">
            <h3 class="klub-nama">{{ klub.nama }}</h3>
            <p class="klub-lokasi">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {{ klub.lokasi }}
            </p>
            <div class="klub-meta">
              <span class="badge badge-brand">{{ klub.anggota }} anggota</span>
              <span class="klub-hari">{{ klub.jadwal }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Jadwal latihan -->
      <div class="jadwal-section">
        <h3 class="h3" style="margin-bottom:1.25rem">Jadwal Latihan Rutin</h3>
        <div class="jadwal-table-wrap">
          <table class="jadwal-table">
            <thead>
              <tr>
                <th>Klub</th>
                <th>Hari</th>
                <th>Waktu</th>
                <th>Lokasi Latihan</th>
                <th>Kontak</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="j in jadwalList" :key="j.klub">
                <td><strong>{{ j.klub }}</strong></td>
                <td>{{ j.hari }}</td>
                <td>{{ j.waktu }}</td>
                <td>{{ j.lokasi }}</td>
                <td>
                  <a :href="`https://wa.me/62${j.wa}`" target="_blank" class="btn-ghost" style="font-size:.8rem">
                    WA →
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Cara daftar -->
      <div id="daftar" class="daftar-section card">
        <div class="daftar-left">
          <span class="badge badge-gold" style="margin-bottom:1rem">Bergabung Sekarang</span>
          <h3 class="h3">Cara Daftar Anggota Baru</h3>
          <p class="lead" style="font-size:.9rem; margin-top:.6rem">
            Proses pendaftaran mudah dan gratis. Ikuti langkah-langkah berikut untuk bergabung dengan komunitas FESPATI Depok.
          </p>
        </div>
        <div class="daftar-steps">
          <div v-for="(step, i) in daftarSteps" :key="step.title" class="step-item">
            <div class="step-num">{{ i + 1 }}</div>
            <div>
              <p class="step-title">{{ step.title }}</p>
              <p class="step-desc">{{ step.desc }}</p>
            </div>
          </div>
          <a href="https://wa.me/628123456789" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:.5rem; align-self:flex-start">
            Daftar via WhatsApp →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const klubList = [
  { initial: 'PA', nama: 'Panah Asri', lokasi: 'Beji, Depok', anggota: 32, jadwal: 'Sabtu & Minggu', color: '#1A5C38' },
  { initial: 'MB', nama: 'Mekar Busur', lokasi: 'Sawangan, Depok', anggota: 28, jadwal: 'Sabtu', color: '#C89B3C' },
  { initial: 'DS', nama: 'Depok Sakti', lokasi: 'Cinere, Depok', anggota: 24, jadwal: 'Minggu', color: '#2E7D52' },
  { initial: 'GA', nama: 'Genta Agung', lokasi: 'Sukmajaya, Depok', anggota: 20, jadwal: 'Sabtu & Rabu', color: '#8B4513' },
  { initial: 'PK', nama: 'Pusaka Kencana', lokasi: 'Cimanggis, Depok', anggota: 18, jadwal: 'Minggu', color: '#4A90A4' },
  { initial: 'BN', nama: 'Busur Nusantara', lokasi: 'Pancoran Mas, Depok', anggota: 30, jadwal: 'Sabtu', color: '#6B5B95' },
  { initial: 'JA', nama: 'Jaya Abadi', lokasi: 'Tapos, Depok', anggota: 22, jadwal: 'Minggu & Rabu', color: '#E8651A' },
  { initial: 'SP', nama: 'Saka Panah', lokasi: 'Bojongsari, Depok', anggota: 16, jadwal: 'Sabtu', color: '#C25B92' },
]

const jadwalList = [
  { klub: 'Panah Asri', hari: 'Sabtu & Minggu', waktu: '07:00 – 10:00', lokasi: 'Lapangan Beji', wa: '8111000001' },
  { klub: 'Mekar Busur', hari: 'Sabtu', waktu: '06:30 – 09:30', lokasi: 'Lapangan Sawangan', wa: '8111000002' },
  { klub: 'Depok Sakti', hari: 'Minggu', waktu: '07:00 – 10:00', lokasi: 'GOR Cinere', wa: '8111000003' },
  { klub: 'Genta Agung', hari: 'Sabtu & Rabu', waktu: '07:00 – 09:00', lokasi: 'Lapangan Sukmajaya', wa: '8111000004' },
  { klub: 'Busur Nusantara', hari: 'Sabtu', waktu: '07:30 – 10:30', lokasi: 'Lapangan Pancoran Mas', wa: '8111000005' },
]

const daftarSteps = [
  { title: 'Hubungi Sekretariat', desc: 'Kirim pesan via WhatsApp ke nomor resmi FESPATI Depok.' },
  { title: 'Isi Formulir Pendaftaran', desc: 'Lengkapi data diri dan pilih klub yang diinginkan.' },
  { title: 'Lampirkan Dokumen', desc: 'Siapkan fotokopi KTP/KK dan pas foto 3x4.' },
  { title: 'Ikuti Latihan Perdana', desc: 'Hadir di sesi latihan dan mulai petualangan memanahmu!' },
]
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 3rem;
}
.section-header .h2 { margin-bottom: .75rem; }

/* Clubs grid */
.clubs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
}

.klub-card { overflow: hidden; }

.klub-header {
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.klub-initial {
  font-size: 1.75rem;
  font-weight: 800;
  color: rgba(255,255,255,0.9);
  letter-spacing: 0.05em;
}

.klub-body {
  padding: 1rem;
}

.klub-nama {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-ink);
  margin-bottom: 0.35rem;
}

.klub-lokasi {
  font-size: 0.75rem;
  color: var(--color-ink-3);
  display: flex;
  gap: 0.3rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

.klub-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.klub-hari {
  font-size: 0.7rem;
  color: var(--color-ink-3);
}

/* Jadwal table */
.jadwal-section {
  margin-bottom: 2.5rem;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-soft);
  padding: 1.5rem;
}

.jadwal-table-wrap {
  overflow-x: auto;
}

.jadwal-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.jadwal-table th {
  text-align: left;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: var(--color-ink-3);
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid var(--color-border-soft);
}

.jadwal-table td {
  padding: 0.65rem 0.75rem;
  color: var(--color-ink-2);
  border-bottom: 1px solid var(--color-border-soft);
}

.jadwal-table tr:last-child td { border-bottom: none; }
.jadwal-table tr:hover td { background: var(--color-surface-2); }

/* Daftar section */
.daftar-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  overflow: hidden;
}

.daftar-left {
  padding: 2.5rem;
  background: var(--color-brand);
  color: white;
}

.daftar-left .h3 { color: white; margin-top: 0; }
.daftar-left .lead { color: rgba(255,255,255,0.8); }

.daftar-steps {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.step-item {
  display: flex;
  gap: 0.9rem;
  align-items: flex-start;
}

.step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-brand-soft);
  color: var(--color-brand);
  font-weight: 700;
  font-size: 0.8125rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-ink);
  margin-bottom: 0.15rem;
}

.step-desc {
  font-size: 0.8125rem;
  color: var(--color-ink-3);
}

@media (max-width: 1024px) {
  .clubs-grid { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 768px) {
  .clubs-grid { grid-template-columns: repeat(2, 1fr); }
  .daftar-section { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .clubs-grid { grid-template-columns: 1fr 1fr; }
}
</style>
