<template>
  <section class="hero section">
    <div class="container hero-inner">
      <!-- Left: Text -->
      <div class="hero-text">
        <div class="badge badge-brand hero-badge">
          <span class="pulse-dot" aria-hidden="true"></span>
          Aktif sejak 2010 · Kota Depok
        </div>

        <h1 class="display hero-heading">
          Panahan Tradisional,<br>
          <span class="brand-accent">Warisan</span> yang Hidup
        </h1>

        <p class="lead hero-lead">
          FESPATI Depok adalah rumah bagi pecinta panahan tradisional Indonesia. Bergabunglah dengan komunitas yang melestarikan seni busur & anak panah di Kota Depok.
        </p>

        <div class="hero-stats">
          <div v-for="stat in stats" :key="stat.label" class="stat-item">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </div>
        </div>

        <div class="hero-actions">
          <a href="#daftar" class="btn btn-primary">Bergabung Sekarang →</a>
          <a href="#tentang" class="btn btn-outline">Pelajari Lebih Lanjut</a>
        </div>
      </div>

      <!-- Right: Visual Card -->
      <div class="hero-visual" aria-hidden="true">
        <div class="hero-card animate-float">
          <div class="hc-header">
            <span class="hc-dot"></span>
            <span class="hc-title">Agenda Terdekat</span>
            <span class="badge badge-brand">Terbuka</span>
          </div>
          <div class="hc-event">
            <div class="hc-event-icon">🎯</div>
            <div>
              <p class="hc-event-name">Lomba Internal Kota Depok 2026</p>
              <p class="hc-event-date">15 Oktober 2026 · Lapangan Merdeka Depok</p>
            </div>
          </div>
          <hr class="divider" style="margin-block: 0.75rem" />
          <div class="hc-clubs">
            <span class="label">Klub Aktif</span>
            <div class="club-avatars">
              <div v-for="n in 5" :key="n" class="club-av" :style="{ background: clubColors[n-1], left: `${(n-1)*20}px` }">
                {{ clubInitials[n-1] }}
              </div>
              <div class="club-av club-av-more">+3</div>
            </div>
            <span class="small" style="margin-top:.4rem">8 klub terdaftar</span>
          </div>
        </div>

        <!-- Decorative elements -->
        <div class="deco deco-1"></div>
        <div class="deco deco-2"></div>
        <div class="deco deco-3">🏹</div>
      </div>
    </div>

    <!-- Bottom wave -->
    <div class="hero-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 C360,60 1080,60 1440,0 L1440,60 L0,60 Z" fill="var(--color-surface-2)"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: '8+', label: 'Klub Aktif' },
  { value: '200+', label: 'Anggota' },
  { value: '15+', label: 'Kejuaraan' },
  { value: '2010', label: 'Berdiri' },
]

const clubColors = ['#1A5C38', '#C89B3C', '#2E7D52', '#8B4513', '#4A90A4']
const clubInitials = ['PA', 'MB', 'DS', 'GA', 'PK']
</script>

<style scoped>
.hero {
  background: var(--color-bg);
  position: relative;
  padding-bottom: 0;
  overflow: hidden;
}

.hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  padding-block: clamp(3rem, 6vw, 5rem);
}

/* Left text */
.hero-badge {
  margin-bottom: 1.5rem;
  gap: 0.5rem;
}

.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--color-brand);
  display: inline-block;
  animation: pulse-dot 2s ease-in-out infinite;
}

.hero-heading {
  margin-bottom: 1.25rem;
}

.brand-accent {
  color: var(--color-brand);
  font-style: italic;
}

.hero-lead {
  max-width: 44ch;
  margin-bottom: 2rem;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  border: 1px solid var(--color-border-soft);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-bottom: 2rem;
  background: var(--color-surface);
}

.stat-item {
  padding: 0.9rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  border-right: 1px solid var(--color-border-soft);
}

.stat-item:last-child {
  border-right: none;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-brand);
  line-height: 1;
}

.stat-label {
  font-size: 0.6875rem;
  color: var(--color-ink-3);
  font-weight: 500;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* Right visual */
.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 360px;
}

.hero-card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 1.25rem;
  width: 100%;
  max-width: 340px;
  box-shadow: var(--shadow-lg);
  position: relative;
  z-index: 2;
}

.hc-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.hc-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-brand);
  flex-shrink: 0;
}

.hc-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-ink-2);
  flex: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hc-event {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.hc-event-icon {
  font-size: 1.5rem;
  line-height: 1;
  flex-shrink: 0;
}

.hc-event-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1.3;
  margin-bottom: 0.2rem;
}

.hc-event-date {
  font-size: 0.75rem;
  color: var(--color-ink-3);
}

.hc-clubs {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.club-avatars {
  position: relative;
  height: 28px;
  display: flex;
  align-items: center;
}

.club-av {
  position: absolute;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid var(--color-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.55rem;
  font-weight: 700;
  color: white;
}

.club-av-more {
  left: 100px;
  background: var(--color-surface-2);
  color: var(--color-ink-3);
  font-size: 0.6rem;
}

/* Decorative */
.deco {
  position: absolute;
  border-radius: 50%;
  z-index: 1;
}

.deco-1 {
  width: 180px;
  height: 180px;
  background: radial-gradient(circle, rgba(26,92,56,0.12) 0%, transparent 70%);
  top: -20px;
  right: -20px;
}

.deco-2 {
  width: 120px;
  height: 120px;
  background: radial-gradient(circle, rgba(200,155,60,0.15) 0%, transparent 70%);
  bottom: 20px;
  left: 10px;
}

.deco-3 {
  position: absolute;
  font-size: 2.5rem;
  bottom: 60px;
  right: 20px;
  z-index: 3;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
  animation: float 5s ease-in-out infinite;
  animation-delay: 1s;
}

/* Wave */
.hero-wave {
  margin-top: 2rem;
}

.hero-wave svg {
  display: block;
  width: 100%;
  height: 60px;
}

@media (max-width: 900px) {
  .hero-inner {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-lead {
    max-width: 100%;
    margin-inline: auto;
  }

  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-visual {
    min-height: 260px;
  }

  .hero-card {
    max-width: 300px;
  }

  .hero-badge {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-stats {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
