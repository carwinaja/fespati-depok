// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'app/',
  components: [
    { path: '~/components/sections', pathPrefix: false },
    '~/components'
  ],
  css: ['~/assets/css/main.css'],
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
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap',
        },
      ],
    },
  },
})
