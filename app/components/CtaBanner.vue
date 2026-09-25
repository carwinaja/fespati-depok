<template>
  <section class="cta-banner section">
    <div class="container">
      <div class="cta-inner">
        <div class="cta-glow cta-glow-1" aria-hidden="true"></div>
        <div class="cta-glow cta-glow-2" aria-hidden="true"></div>
        <div class="cta-content">
          <span class="cta-icon" aria-hidden="true">🏹</span>
          <h2 class="display" style="color:white">Siap Mulai<br><span style="color: #86efac">Memanah?</span></h2>
          <p class="lead" style="color:rgba(255,255,255,0.75); max-width:44ch; margin-inline:auto">
            Bergabunglah dengan ratusan pemanah tradisional di Kota Depok. Tidak perlu pengalaman — kami menyambut semua kalangan!
          </p>
          <div class="cta-actions">
            <a href="#daftar" class="btn cta-btn-primary">Daftar Anggota Gratis →</a>
            <a href="https://wa.me/628123456789" target="_blank" rel="noopener" class="btn cta-btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              Hubungi via WhatsApp
            </a>
          </div>
          <div class="cta-trust">
            <div v-for="t in trustItems" :key="t" class="trust-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20,6 9,17 4,12"/></svg>
              {{ t }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const trustItems = [
  'Gratis & tanpa biaya pendaftaran',
  'Pelatih berpengalaman',
  'Komunitas yang ramah & supportif',
]
</script>

<style scoped>
.cta-banner {
  background: linear-gradient(135deg, #0F3D25 0%, #1A5C38 50%, #0F3D25 100%);
  position: relative;
  overflow: hidden;
  padding-block: clamp(3.5rem, 8vw, 6rem);
}

.cta-inner {
  position: relative;
}

.cta-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.cta-glow-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(200,155,60,0.15) 0%, transparent 70%);
  top: -100px;
  right: -100px;
}

.cta-glow-2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(46,125,82,0.3) 0%, transparent 70%);
  bottom: -80px;
  left: -50px;
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.cta-icon {
  font-size: 3.5rem;
  display: block;
  margin-bottom: 1.25rem;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
}

.cta-content .display {
  margin-bottom: 1rem;
}

.cta-content .lead {
  margin-bottom: 2rem;
}

.cta-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.cta-btn-primary {
  background: white;
  color: var(--color-brand);
  font-weight: 600;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius-full);
  font-size: 0.9375rem;
}

.cta-btn-primary:hover {
  background: #f0fdf4;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}

.cta-btn-ghost {
  background: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  font-size: 0.9375rem;
}

.cta-btn-ghost:hover {
  background: rgba(255,255,255,0.2);
}

.cta-trust {
  display: flex;
  gap: 1.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.trust-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8125rem;
  color: rgba(255,255,255,0.7);
}

.trust-item svg {
  color: #86efac;
  flex-shrink: 0;
}

@media (max-width: 600px) {
  .cta-trust { flex-direction: column; align-items: center; }
  .cta-actions { flex-direction: column; align-items: center; }
}
</style>
