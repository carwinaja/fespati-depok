<template>
  <section id="agenda" class="agenda-section section" style="background: var(--color-surface-2)">
    <div class="container">
      <div class="section-header">
        <span class="label" style="color:var(--color-brand)">Agenda</span>
        <h2 class="h2">Lomba & Kegiatan</h2>
        <p class="lead" style="max-width:50ch; margin-inline:auto; text-align:center">
          Ikuti berbagai kompetisi dan kegiatan FESPATI Depok, dari tingkat kota hingga nasional.
        </p>
      </div>

      <!-- Tabs -->
      <div class="agenda-tabs" role="tablist">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          role="tab"
          :aria-selected="activeTab === tab.id"
          :id="`tab-${tab.id}`"
          :aria-controls="`panel-${tab.id}`"
          class="agenda-tab"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
          <span class="tab-count">{{ tab.count }}</span>
        </button>
      </div>

      <!-- Internal -->
      <div
        v-show="activeTab === 'internal'"
        id="panel-internal"
        role="tabpanel"
        aria-labelledby="tab-internal"
        class="agenda-list"
      >
        <div v-for="event in internalEvents" :key="event.nama" class="event-card card">
          <div class="event-date-col">
            <span class="event-day">{{ event.day }}</span>
            <span class="event-month">{{ event.month }}</span>
          </div>
          <div class="event-info">
            <div class="event-top">
              <h3 class="event-nama">{{ event.nama }}</h3>
              <span class="badge" :class="event.statusClass">{{ event.status }}</span>
            </div>
            <div class="event-meta-row">
              <span class="event-meta">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ event.lokasi }}
              </span>
              <span class="event-meta">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {{ event.kategori }}
              </span>
            </div>
            <p class="event-desc">{{ event.desc }}</p>
          </div>
        </div>
      </div>

      <!-- External -->
      <div
        v-show="activeTab === 'external'"
        id="panel-external"
        role="tabpanel"
        aria-labelledby="tab-external"
        class="agenda-list"
      >
        <div v-for="event in externalEvents" :key="event.nama" class="event-card card">
          <div class="event-date-col">
            <span class="event-day">{{ event.day }}</span>
            <span class="event-month">{{ event.month }}</span>
          </div>
          <div class="event-info">
            <div class="event-top">
              <h3 class="event-nama">{{ event.nama }}</h3>
              <span class="badge" :class="event.statusClass">{{ event.status }}</span>
            </div>
            <div class="event-meta-row">
              <span class="event-meta">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {{ event.lokasi }}
              </span>
              <span class="event-meta">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                {{ event.kategori }}
              </span>
            </div>
            <p class="event-desc">{{ event.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeTab = ref('internal')

const tabs = [
  { id: 'internal', label: 'Lomba Internal Kota', count: 3 },
  { id: 'external', label: 'Undangan Luar Kota / Nasional', count: 4 },
]

const internalEvents = [
  {
    day: '15', month: 'Okt 2026',
    nama: 'Kejuaraan Panahan Tradisional Kota Depok 2026',
    lokasi: 'Lapangan Merdeka, Depok',
    kategori: 'Semua Kategori',
    status: 'Terbuka',
    statusClass: 'badge-brand',
    desc: 'Kompetisi tahunan antar klub FESPATI Depok yang diperebutkan gelar juara kota.',
  },
  {
    day: '22', month: 'Nov 2026',
    nama: 'Latber Bulanan FESPATI Depok',
    lokasi: 'Lapangan GOR Depok',
    kategori: 'Anggota Aktif',
    status: 'Terbuka',
    statusClass: 'badge-brand',
    desc: 'Latihan bersama bulanan untuk mempererat silaturahmi antar anggota.',
  },
  {
    day: '20', month: 'Des 2026',
    nama: 'Panahan Tradisional Cup Akhir Tahun',
    lokasi: 'Stadion Persikad, Depok',
    kategori: 'Open',
    status: 'Akan Datang',
    statusClass: 'badge-gold',
    desc: 'Penutup tahun dengan turnamen seru dan hadiah menarik dari sponsor.',
  },
]

const externalEvents = [
  {
    day: '05', month: 'Nov 2026',
    nama: 'Kejuaraan Nasional Panahan Tradisional 2026',
    lokasi: 'GOR Senayan, Jakarta',
    kategori: 'Nasional',
    status: 'Terbuka',
    statusClass: 'badge-brand',
    desc: 'Ajang bergengsi tingkat nasional. FESPATI Depok mengirimkan delegasi terbaik.',
  },
  {
    day: '18', month: 'Nov 2026',
    nama: 'Open Tournament Panahan Bogor 2026',
    lokasi: 'Kota Bogor, Jawa Barat',
    kategori: 'Regional Jabar',
    status: 'Terbuka',
    statusClass: 'badge-brand',
    desc: 'Turnamen terbuka se-Jabar. Pendaftaran melalui sekretariat klub masing-masing.',
  },
  {
    day: '10', month: 'Des 2026',
    nama: 'Kejurda Jawa Barat 2026',
    lokasi: 'Bandung, Jawa Barat',
    kategori: 'Provinsi',
    status: 'Akan Datang',
    statusClass: 'badge-gold',
    desc: 'Kejuaraan daerah Jawa Barat untuk menentukan wakil ke Kejurnas.',
  },
  {
    day: '28', month: 'Sep 2026',
    nama: 'Undangan Lomba Bekasi Traditional Archery',
    lokasi: 'Kota Bekasi',
    kategori: 'Kota',
    status: 'Berakhir',
    statusClass: 'badge-closed',
    desc: 'Undangan dari FESPATI Bekasi. Pendaftaran telah ditutup.',
  },
]
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 2rem;
}
.section-header .h2 { margin-bottom: .75rem; }

/* Tabs */
.agenda-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.75rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  padding: 0.3rem;
  width: fit-content;
}

.agenda-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.1rem;
  border-radius: calc(var(--radius-md) - 4px);
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--color-ink-2);
  background: none;
  border: none;
  cursor: pointer;
  transition: background var(--transition), color var(--transition);
}

.agenda-tab:hover { color: var(--color-ink); }

.agenda-tab.active {
  background: var(--color-brand);
  color: white;
}

.tab-count {
  font-size: 0.7rem;
  background: rgba(255,255,255,0.2);
  border-radius: var(--radius-full);
  padding: 0.1rem 0.45rem;
}

.agenda-tab:not(.active) .tab-count {
  background: var(--color-surface-2);
  color: var(--color-ink-3);
}

/* Event cards */
.agenda-list {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.event-card {
  display: flex;
  gap: 0;
  overflow: hidden;
}

.event-date-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.25rem 1.5rem;
  background: var(--color-surface-2);
  border-right: 1px solid var(--color-border-soft);
  min-width: 80px;
  flex-shrink: 0;
}

.event-day {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-brand);
  line-height: 1;
}

.event-month {
  font-size: 0.7rem;
  color: var(--color-ink-3);
  white-space: nowrap;
}

.event-info {
  padding: 1.25rem 1.5rem;
  flex: 1;
}

.event-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.event-nama {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1.3;
}

.event-meta-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 0.6rem;
}

.event-meta {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  font-size: 0.75rem;
  color: var(--color-ink-3);
}

.event-meta svg { color: var(--color-brand); }

.event-desc {
  font-size: 0.8125rem;
  color: var(--color-ink-2);
  line-height: 1.6;
}

.badge-closed {
  background: #f0ede9;
  color: var(--color-ink-3);
}

@media (max-width: 600px) {
  .event-card { flex-direction: column; }
  .event-date-col {
    flex-direction: row;
    gap: 0.4rem;
    padding: 0.75rem 1.25rem;
    border-right: none;
    border-bottom: 1px solid var(--color-border-soft);
    justify-content: flex-start;
  }
  .event-day { font-size: 1.1rem; }
  .agenda-tabs { flex-direction: column; width: 100%; }
}
</style>
