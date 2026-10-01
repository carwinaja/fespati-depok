// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-auth-utils', '@nuxt/fonts'],
  srcDir: 'app/',
  serverDir: 'server',
  components: [
    { path: '~/components/sections', pathPrefix: false },
    '~/components'
  ],
  css: ['~/assets/css/main.css', '~/assets/css/prose.css'],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'FESPATI Depok — Federasi Panahan Tradisional Indonesia Kota Depok',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'FESPATI Depok adalah federasi panahan tradisional resmi di Kota Depok. Temukan informasi klub, jadwal latihan, agenda lomba, galeri kegiatan, dan cara bergabung.',
        },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'FESPATI Depok — Federasi Panahan Tradisional Indonesia' },
        { property: 'og:description', content: 'Pusat informasi panahan tradisional Kota Depok. Bergabunglah bersama kami.' },
        { property: 'og:type', content: 'website' },
      ],
    },
  },
  // Font di-host sendiri saat build (tanpa permintaan ke Google Fonts saat runtime)
  fonts: {
    defaults: { subsets: ['latin', 'latin-ext'] }, // teks bahasa Indonesia
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700, 800] },
      { name: 'Playfair Display', provider: 'google', weights: [700, 800] },
    ],
  },
  // Sesi hanya dimuat di halaman admin (middleware memanggil refresh()). Tanpa ini
  // setiap render halaman publik ikut mengambil sesi, dan ISR tidak aman.
  auth: { loadStrategy: 'none' },
  routeRules: {
    // Halaman publik disajikan dari CDN (ISR) agar tidak kena cold start / render per kunjungan
    '/': { isr: 60 },
    '/berita/**': { isr: 300 },
    // Aset statis di public/ (nama tidak ber-hash): cache 7 hari
    '/hero-fespati.jpg': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
    '/fespati.png': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
    '/logo-club/**': { headers: { 'cache-control': 'public, max-age=604800, stale-while-revalidate=86400' } },
  },
  nitro: {
    // sanitize-html (CJS) me-require htmlparser2 (ESM-only). Node tanpa require(esm)
    // (mis. runtime Vercel) gagal dengan ERR_REQUIRE_ESM, jadi bundle keduanya saat build.
    externals: { inline: ['sanitize-html', 'htmlparser2'] },
  },
  runtimeConfig: {
    databaseUrl: process.env.DATABASE_URL || process.env.app_db,
    s3AccessKey: process.env.s3_access_key,
    s3SecretKey: process.env.s3_secret_key,
    s3Endpoint: process.env.S3_ENDPOINT,
    s3BucketName: process.env.S3_BUCKET_NAME || 'fespatistorage-idnhpb',
    s3Region: process.env.S3_REGION || 'us-east-1',
  }
})

