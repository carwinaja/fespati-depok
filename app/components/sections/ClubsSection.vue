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
      <p v-if="!clubs.length" class="small" style="text-align:center">Data klub segera hadir.</p>
      <div
        ref="gridEl"
        class="clubs-grid"
        :class="{ collapsed: !expanded }"
        @scroll.passive="onScroll"
      >
        <div
          v-for="(club, i) in clubs"
          :key="club.key"
          class="club-card card"
          :class="{ 'is-extra': i >= DESKTOP_LIMIT, 'is-extra-tablet': i >= TABLET_LIMIT }"
        >
          <!-- ATAS: Banner Warna & Logo Klub -->
          <div class="club-header" :style="{ background: club.colorHex || 'var(--color-brand)' }">
            <div class="club-logo-wrap">
              <img 
                v-if="club.logo && !imageErrors[club.key]"
                :src="club.logo" 
                :alt="club.name" 
                class="club-logo" 
                @error="imageErrors[club.key] = true"
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
              <a :href="`https://wa.me/${club.wa}`" target="_blank" rel="noopener" class="btn-action btn-wa" :aria-label="`Chat WhatsApp ${club.name}`" :title="`WhatsApp: +${club.wa}`">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              </a>

              <!-- Map Lokasi -->
              <a v-if="club.map" :href="club.map" target="_blank" rel="noopener" class="btn-action btn-map" :aria-label="`Buka lokasi ${club.name} di peta`" title="Buka Lokasi Map">
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

      <!-- Mobile: indikator halaman slider -->
      <div v-if="pages > 1" class="clubs-dots" role="tablist" aria-label="Halaman klub">
        <button
          v-for="n in pages"
          :key="n"
          class="dot"
          :class="{ active: page === n - 1 }"
          role="tab"
          :aria-selected="page === n - 1"
          :aria-label="`Halaman ${n} dari ${pages}`"
          @click="goTo(n - 1)"
        ></button>
      </div>

      <!-- Tablet/desktop: lihat semua -->
      <div v-if="clubs.length > DESKTOP_LIMIT" class="clubs-more" :class="{ 'hide-tablet': clubs.length <= TABLET_LIMIT }">
        <button class="btn btn-outline" :aria-expanded="expanded" @click="expanded = !expanded">
          {{ expanded ? 'Tampilkan lebih sedikit' : `Lihat semua klub (${clubs.length})` }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const DESKTOP_LIMIT = 8 // grid 4 kolom
const TABLET_LIMIT = 9 // grid 3 kolom
const PER_PAGE = 4 // mobile: 2 kolom x 2 baris

const expanded = ref(false)
const gridEl = ref(null)
const page = ref(0)

const imageErrors = ref({})

const data = await useSectionData('/api/clubs')
const clubs = computed(() =>
  (data.value ?? []).map((c) => ({
    key: c.id, name: c.name, logo: c.logoUrl, colorHex: c.colorHex,
    wa: c.phone, map: c.mapUrl, lokasi: c.location, jadwal: c.schedule,
  })),
)

const pages = computed(() => Math.ceil(clubs.value.length / PER_PAGE))

// Lebar satu halaman = jarak antar kartu pertama tiap halaman
function pageStep() {
  const kids = gridEl.value?.children
  if (!kids || kids.length <= 2) return 0
  return kids[2].offsetLeft - kids[0].offsetLeft
}

function onScroll() {
  const el = gridEl.value
  const step = pageStep()
  if (!el || !step) return
  const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2
  page.value = atEnd ? pages.value - 1 : Math.min(pages.value - 1, Math.round(el.scrollLeft / step))
}

function goTo(n) {
  gridEl.value?.scrollTo({ left: n * pageStep(), behavior: 'smooth' })
}
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
  flex: 0 0 auto;
  padding-inline: 0.85rem;
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

.clubs-dots { display: none; }
.clubs-more { text-align: center; margin-top: 2rem; }

/* Desktop: batasi 8 klub sampai "Lihat semua" ditekan */
.clubs-grid.collapsed .is-extra { display: none; }

@media (max-width: 1024px) {
  .clubs-grid { grid-template-columns: repeat(3, 1fr); }
  .clubs-grid.collapsed .is-extra { display: flex; }
  .clubs-grid.collapsed .is-extra-tablet { display: none; }
  .clubs-more.hide-tablet { display: none; }
}

/* Mobile: slider 2 kolom x 2 baris per halaman, halaman berikut mengintip */
@media (max-width: 768px) {
  .section-header { margin-bottom: 2rem; }

  .clubs-grid {
    grid-template-columns: none;
    grid-template-rows: repeat(2, auto);
    grid-auto-flow: column;
    grid-auto-columns: calc(50% - 1.5rem);
    gap: 0.75rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    overscroll-behavior-x: contain;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 0.5rem;
  }
  .clubs-grid::-webkit-scrollbar { display: none; }
  .clubs-grid.collapsed .is-extra,
  .clubs-grid.collapsed .is-extra-tablet { display: flex; }

  /* kartu pertama di tiap halaman (2 kartu = 1 kolom) */
  .club-card:nth-child(4n + 1),
  .club-card:nth-child(4n + 2) { scroll-snap-align: start; }
  .club-card:hover { transform: none; }

  .clubs-more { display: none; }

  .clubs-dots {
    display: flex;
    justify-content: center;
    gap: 0.25rem;
    margin-top: 0.75rem;
  }
  .dot {
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    position: relative;
  }
  .dot::after {
    content: '';
    position: absolute;
    inset: 8px;
    border-radius: 50%;
    background: var(--color-border, #d9d4cc);
    transition: all 0.2s ease;
  }
  .dot.active::after {
    inset: 8px -2px;
    background: var(--color-brand, #1A5C38);
  }

  /* Kartu lebih ringkas */
  .club-header { height: 64px; }
  .club-logo-wrap { width: 56px; height: 56px; bottom: -28px; padding: 3px; }
  .club-body { padding: 2.25rem 0.6rem 0.75rem; }
  .club-name { font-size: 0.875rem; line-height: 1.25; }
  .club-lokasi {
    font-size: 0.75rem;
    margin-bottom: 0.75rem;
    align-items: flex-start;
    text-align: left;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .club-lokasi svg { display: none; }
  .club-actions { gap: 0.35rem; }
  .btn-action { padding: 0.5rem; min-height: 36px; }
  .btn-map span { display: none; }
}
</style>
