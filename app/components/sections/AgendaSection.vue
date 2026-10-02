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

      <div
        v-for="tab in tabs"
        v-show="activeTab === tab.id"
        :id="`panel-${tab.id}`"
        :key="tab.id"
        role="tabpanel"
        :aria-labelledby="`tab-${tab.id}`"
        class="agenda-list"
      >
        <p v-if="!tab.items.length" class="small">Belum ada agenda.</p>
        <article v-for="event in tab.items" :key="event.id" class="event-card card">
          <div class="event-date-col">
            <span class="event-day">{{ event.day }}</span>
            <span class="event-month">{{ event.month }}</span>
          </div>
          <div class="event-thumb" :class="{ 'event-thumb-empty': !event.image }">
            <img v-if="event.image" :src="event.image" :alt="`Poster ${event.nama}`" width="160" height="120" loading="lazy" decoding="async" />
            <svg v-else width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></svg>
          </div>
          <div class="event-info">
            <div class="event-top">
              <h3 class="event-nama">
                <button type="button" class="event-open" :aria-label="`Lihat detail ${event.nama}`" @click="selected = event">{{ event.nama }}</button>
              </h3>
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
            <p v-if="event.desc" class="event-desc">{{ event.desc }}</p>
            <div v-if="event.reg || event.pdf" class="event-links">
              <a v-if="event.reg" :href="event.reg" target="_blank" rel="noopener" class="btn btn-primary btn-sm">Daftar →</a>
              <a v-if="event.pdf" :href="event.pdf" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Unduh PDF</a>
            </div>
          </div>
        </article>
      </div>
    </div>
    <EventModal :event="selected" @close="selected = null" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const activeTab = ref('internal')
const selected = ref<any>(null)

const data = await useSectionData('/api/events')

const STATUS: Record<string, { label: string; cls: string }> = {
  UPCOMING: { label: 'Akan Datang', cls: 'badge-gold' },
  ONGOING: { label: 'Berlangsung', cls: 'badge-brand' },
  DONE: { label: 'Berakhir', cls: 'badge-closed' },
}

const toCard = (e: any) => ({
  id: e.id,
  day: formatDate(e.eventDate, { day: '2-digit' }),
  month: formatDate(e.eventDate, { month: 'short', year: 'numeric' }),
  nama: e.title,
  lokasi: e.location,
  kategori: `${formatDate(e.eventDate, { day: 'numeric', month: 'long', year: 'numeric' })}, ${formatTime(e.eventDate)}`,
  status: STATUS[e.status]?.label ?? e.status,
  statusClass: STATUS[e.status]?.cls ?? 'badge-brand',
  desc: e.description,
  reg: e.status === 'DONE' ? null : e.registrationUrl,
  pdf: e.pdfUrl,
  image: e.imageUrl,
  done: e.status === 'DONE',
  at: new Date(e.eventDate).getTime(),
})

// Yang masih berjalan/akan datang di atas (terdekat dulu), yang selesai di bawah (terbaru dulu)
const byType = (type: string) =>
  (data.value ?? []).filter((e: any) => e.type === type).map(toCard)
    .sort((a, b) => (a.done !== b.done ? Number(a.done) - Number(b.done) : a.done ? b.at - a.at : a.at - b.at))

const internalEvents = computed(() => byType('INTERNAL'))
const externalEvents = computed(() => byType('EXTERNAL'))

const tabs = computed(() => [
  { id: 'internal', label: 'Lomba Internal Kota', count: internalEvents.value.length, items: internalEvents.value },
  { id: 'external', label: 'Undangan Luar Kota / Nasional', count: externalEvents.value.length, items: externalEvents.value },
])
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
  position: relative;
  transition: box-shadow var(--transition), transform var(--transition);
}
.event-card:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); }
.event-card:has(.event-open:focus-visible) { outline: 2px solid var(--color-brand-light); outline-offset: 2px; }

/* Seluruh kartu bisa diklik lewat tombol judul; tautan lain di kartu tetap bisa diklik sendiri */
.event-open {
  all: unset;
  cursor: pointer;
}
.event-open::after { content: ''; position: absolute; inset: 0; }
.event-links { position: relative; z-index: 1; }

.event-thumb {
  flex: 0 0 150px;
  background: var(--color-surface-2);
  border-right: 1px solid var(--color-border-soft);
}
.event-thumb img { display: block; width: 100%; height: 100%; object-fit: cover; }
.event-thumb-empty {
  display: grid;
  place-items: center;
  color: var(--color-brand-light);
  background: linear-gradient(135deg, var(--color-brand-soft), var(--color-gold-soft));
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
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.8125rem;
  color: var(--color-ink-2);
  line-height: 1.6;
}

.badge-closed {
  background: #f0ede9;
  color: var(--color-ink-3);
}

@media (prefers-reduced-motion: reduce) { .event-card, .event-card:hover { transition: none; transform: none; } }

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
  .event-thumb { flex: none; width: 100%; aspect-ratio: 16 / 9; border-right: none; border-bottom: 1px solid var(--color-border-soft); }
  .event-thumb-empty { aspect-ratio: auto; height: 64px; }
  .agenda-tabs { flex-direction: column; width: 100%; }
}
.event-links { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: .75rem; }
.btn-sm { padding: .35rem .9rem; }
</style>
