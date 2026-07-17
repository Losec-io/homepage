// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vercel/analytics/nuxt',
    '@vercel/speed-insights/nuxt',
    '@nuxt/image',
  ],

  css: ['~/assets/css/tailwind.css'],

  image: {
    // allow optimizing the remote blog images hosted on GitHub raw
    domains: ['raw.githubusercontent.com'],
    // higher quality — the blog images are text/UI screenshots that go soft
    // when over-compressed
    quality: 86,
    format: ['webp'],
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      htmlAttrs: { lang: 'en', class: 'dark' },
      title: 'AI Security - Research & Redteaming | Losec Labs',
      titleTemplate: (t) =>
        t && !t.includes('Losec Labs') ? `${t} | Losec Labs` : (t || 'AI Security - Research & Redteaming | Losec Labs'),
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'LoSec is an AI-driven security research lab discovering vulnerabilities and 0-days at machine speed.',
        },
        { name: 'theme-color', content: '#0A130F' },
        { name: 'author', content: 'LoSec' },
        // Open Graph — site-level defaults; per-page title/description/url/canonical
        // are set via the useSeo() composable so each route is unique.
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'LoSec' },
        { property: 'og:locale', content: 'en_US' },
        // og:image + dimensions are set per-page in useSeo() (posts use their
        // own thumbnail, other pages use the default 1200×630 card).
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@Losec_io' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon-180.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Space Grotesk (display · brand) · IBM Plex Sans (body) · IBM Plex Mono (data)
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap',
        },
      ],
    },
  },

  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: true,
      routes: ['/', '/blog', '/contact', '/member', '/sitemap.xml'],
      // don't try to prerender/cache optimized image URLs (handled at runtime)
      ignore: ['/_ipx', '/_vercel/image'],
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/blog/**': { prerender: true },
  },
})
