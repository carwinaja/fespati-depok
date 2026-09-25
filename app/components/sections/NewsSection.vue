<template>
  <section id="berita" class="news-section section" style="background: var(--color-surface-2)">
    <div class="container">
      <div class="section-header">
        <span class="label" style="color:var(--color-brand)">Berita & Edukasi</span>
        <h2 class="h2">Info Terkini & Tips Panahan</h2>
        <p class="lead" style="max-width:52ch; margin-inline:auto; text-align:center">
          Temukan artikel edukatif, tips panahan tradisional, dan liputan kegiatan FESPATI Depok.
        </p>
      </div>

      <!-- Featured article -->
      <div class="featured-article card">
        <div class="featured-thumb" style="background: linear-gradient(135deg, #1A5C38 0%, #2E7D52 100%)">
          <span class="featured-emoji" aria-hidden="true">🏹</span>
          <div class="featured-overlay">
            <span class="badge badge-gold">Artikel Unggulan</span>
          </div>
        </div>
        <div class="featured-body">
          <div class="article-meta">
            <span class="badge badge-brand">Tips Panahan</span>
            <span class="small">25 September 2026</span>
            <span class="small">oleh Tim Redaksi FESPATI</span>
          </div>
          <h2 class="h3 featured-title">
            5 Teknik Dasar Panahan Tradisional yang Wajib Dikuasai Pemanah Pemula
          </h2>
          <p class="lead" style="font-size:.9rem">
            Panahan tradisional memiliki teknik dan filosofi tersendiri yang berbeda dari panahan modern. Pelajari 5 fondasi utama yang akan membantu perjalananmu sebagai pemanah tradisional.
          </p>
          <a href="#" class="btn btn-primary" style="margin-top:1rem">Baca Selengkapnya →</a>
        </div>
      </div>

      <!-- Article grid -->
      <div class="article-grid">
        <article v-for="article in articles" :key="article.title" class="article-card card">
          <div class="article-thumb" :style="{ background: article.color }">
            <span class="article-emoji" aria-hidden="true">{{ article.emoji }}</span>
          </div>
          <div class="article-body">
            <div class="article-meta">
              <span class="badge" :class="article.badgeClass">{{ article.category }}</span>
              <span class="small">{{ article.date }}</span>
            </div>
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-excerpt">{{ article.excerpt }}</p>
            <a href="#" class="btn-ghost" style="font-size:.8rem">Baca →</a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const articles = [
  {
    category: 'Liputan',
    badgeClass: 'badge-brand',
    date: '18 Sep 2026',
    title: 'FESPATI Depok Raih 3 Medali di Kejurda Jawa Barat 2026',
    excerpt: 'Tiga atlet terbaik FESPATI Depok berhasil naik podium di kejuaraan daerah tingkat Jawa Barat yang berlangsung di Bandung.',
    emoji: '🥇',
    color: '#1A5C38',
  },
  {
    category: 'Tips Panahan',
    badgeClass: 'badge-gold',
    date: '10 Sep 2026',
    title: 'Memilih Busur Tradisional yang Tepat untuk Pemula',
    excerpt: 'Panduan lengkap memilih jenis busur tradisional yang sesuai dengan postur tubuh, budget, dan tujuan berlatih.',
    emoji: '🏹',
    color: '#C89B3C',
  },
  {
    category: 'Liputan',
    badgeClass: 'badge-brand',
    date: '01 Sep 2026',
    title: 'Latber Agustus: 120 Anggota Berkumpul di GOR Depok',
    excerpt: 'Latihan bersama bulanan kali ini dihadiri rekor peserta terbanyak sepanjang sejarah FESPATI Depok.',
    emoji: '🤝',
    color: '#2E7D52',
  },
  {
    category: 'Tips Panahan',
    badgeClass: 'badge-gold',
    date: '22 Agu 2026',
    title: 'Filosofi di Balik Panahan Tradisional Nusantara',
    excerpt: 'Lebih dari sekedar olahraga, panahan tradisional adalah perpaduan seni, meditasi, dan kearifan leluhur.',
    emoji: '📿',
    color: '#6B5B95',
  },
  {
    category: 'Liputan',
    badgeClass: 'badge-brand',
    date: '15 Agu 2026',
    title: 'Pelatihan Juri Panahan Tradisional Sertifikasi PABSI',
    excerpt: 'FESPATI Depok mengadakan pelatihan juri bersertifikasi nasional bagi anggota yang ingin menjadi wasit resmi.',
    emoji: '📋',
    color: '#4A90A4',
  },
  {
    category: 'Tips Panahan',
    badgeClass: 'badge-gold',
    date: '05 Agu 2026',
    title: 'Cara Merawat Busur Bambu agar Tahan Lama',
    excerpt: 'Tips praktis dari para pengrajin busur tradisional tentang cara merawat, menyimpan, dan memperbaiki busur bambu.',
    emoji: '🌿',
    color: '#8B4513',
  },
]
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.section-header .h2 { margin-bottom: .75rem; }

/* Featured */
.featured-article {
  display: grid;
  grid-template-columns: 2fr 3fr;
  overflow: hidden;
  margin-bottom: 2rem;
}

.featured-thumb {
  min-height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.featured-emoji {
  font-size: 5rem;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.2));
}

.featured-overlay {
  position: absolute;
  top: 1rem;
  left: 1rem;
}

.featured-body {
  padding: 2rem;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;
}

.featured-title {
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

/* Article grid */
.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
}

.article-card { overflow: hidden; }

.article-thumb {
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.article-emoji {
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.15));
}

.article-body {
  padding: 1.25rem;
}

.article-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1.35;
  margin: 0.6rem 0 0.5rem;
}

.article-excerpt {
  font-size: 0.8125rem;
  color: var(--color-ink-2);
  line-height: 1.6;
  margin-bottom: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 900px) {
  .featured-article { grid-template-columns: 1fr; }
  .featured-thumb { min-height: 180px; }
  .article-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .article-grid { grid-template-columns: 1fr; }
}
</style>
