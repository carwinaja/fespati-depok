<template>
  <section id="daftar" class="join-section section" style="background: var(--color-brand-soft)">
    <div class="container">
      <div class="section-header">
        <span class="label" style="color:var(--color-brand)">Keanggotaan</span>
        <h2 class="h2">Cara Daftar Anggota</h2>
        <p class="lead" style="max-width:52ch; margin-inline:auto; text-align:center">
          Empat langkah untuk menjadi pemanah resmi anggota FESPATI Kota Depok.
        </p>
      </div>

      <ol class="steps">
        <li v-for="(s, i) in steps" :key="i" class="step" :class="{ last: i === steps.length - 1 }">
          <span class="step-num" aria-hidden="true">{{ i + 1 }}</span>
          <div class="step-card card">
            <svg class="step-icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="s.icon"></svg>
            <h3 class="step-title">{{ s.title }}</h3>
            <p class="step-text">{{ s.text }}</p>
          </div>
        </li>
      </ol>

      <div class="join-cta">
        <a href="#klub" class="btn btn-primary">Lihat daftar klub</a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Ikon statis (bukan input pengguna), aman untuk v-html
const steps = [
  {
    title: 'Gabung di klub',
    text: 'Bergabung di salah satu klub yang terdaftar di FESPATI Depok.',
    icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  },
  {
    title: 'Pembinaan & pelatihan',
    text: 'Mengikuti pembinaan dan pelatihan panahan tradisional di klub.',
    icon: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  },
  {
    title: 'Klub mendaftarkan',
    text: 'Klub mendaftarkan anggotanya yang telah dibina dan dilatih ke FESPATI Depok.',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="11" x2="15" y2="11"/>',
  },
  {
    title: 'Resmi jadi anggota',
    text: 'Pemanah resmi menjadi anggota FESPATI Kota Depok dan mendapat Kartu Keanggotaan.',
    icon: '<rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2"/><line x1="13" y1="10" x2="18" y2="10"/><line x1="13" y1="14" x2="18" y2="14"/>',
  },
]
</script>

<style scoped>
.section-header { text-align: center; margin-bottom: 3rem; }
.section-header .h2 { margin-bottom: 0.75rem; }

.steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
}

.step { position: relative; display: flex; flex-direction: column; align-items: center; }

/* Garis penghubung antar langkah (desktop) */
.step:not(.last)::after {
  content: '';
  position: absolute;
  top: 20px;
  left: calc(50% + 28px);
  width: calc(100% + 1.25rem - 56px);
  height: 2px;
  background: repeating-linear-gradient(90deg, var(--color-brand-light, #2E7D52) 0 6px, transparent 6px 12px);
  opacity: 0.55;
}

.step-num {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-brand);
  color: #fff;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  box-shadow: 0 0 0 6px var(--color-brand-soft);
  position: relative;
  z-index: 1;
}

.step-card {
  width: 100%;
  flex: 1;
  padding: 1.5rem 1.25rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step.last .step-num { background: var(--color-gold); }
.step-icon { color: var(--color-brand); margin-bottom: 0.25rem; }
.step-title { font-size: 1rem; font-weight: 700; color: var(--color-ink); }
.step-text { font-size: 0.875rem; color: var(--color-ink-2); line-height: 1.55; }

.join-cta { text-align: center; margin-top: 2.5rem; }

/* Tablet: 2 kolom tanpa garis */
@media (max-width: 900px) {
  .steps { grid-template-columns: repeat(2, 1fr); }
  .step:not(.last)::after { display: none; }
}

/* Mobile: timeline vertikal */
@media (max-width: 560px) {
  .section-header { margin-bottom: 2rem; }
  .steps { grid-template-columns: 1fr; gap: 0; }
  .step { flex-direction: row; align-items: flex-start; gap: 1rem; padding-bottom: 1rem; }
  .step-num { margin-bottom: 0; flex-shrink: 0; }
  .step:not(.last)::after {
    display: block;
    top: 40px;
    bottom: 0;
    left: 19px;
    width: 2px;
    height: auto;
    background: repeating-linear-gradient(180deg, var(--color-brand-light, #2E7D52) 0 6px, transparent 6px 12px);
  }
  .step-card { flex-direction: row; flex-wrap: wrap; text-align: left; align-items: flex-start; padding: 1rem; gap: 0.25rem 0.75rem; }
  .step-icon { flex-shrink: 0; margin: 0; width: 22px; height: 22px; }
  .step-title { flex: 1; align-self: center; }
  .step-text { flex-basis: 100%; }
}
</style>
