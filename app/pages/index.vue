<template>
  <div class="page-wrapper">
    <TheNavbar />

    <main id="main-content">
      <HeroSection />
      <GallerySection />
      <AgendaSection />
      <ClubsSection />
      <AboutSection />
      <NewsSection />
      <CtaBanner />
    </main>

    <TheFooter />
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'FESPATI Depok — Federasi Panahan Tradisional Indonesia Kota Depok',
  description: 'FESPATI Depok adalah wadah resmi bagi pemanah tradisional di Kota Depok. Informasi klub, jadwal latihan, agenda lomba, galeri kegiatan, dan cara bergabung.',
  ogTitle: 'FESPATI Depok — Federasi Panahan Tradisional Indonesia',
  ogDescription: 'Pusat informasi panahan tradisional Kota Depok. Temukan klub, agenda, galeri, dan bergabunglah bersama kami.',
})
</script>

<style>
/* Skip to content accessibility */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  background: var(--color-brand);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  z-index: 999;
  transition: top 0.2s;
}
.skip-link:focus { top: 0.5rem; }
</style>
