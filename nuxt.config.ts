// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/tailwindcss'],

  css: ['~/assets/css/tailwind.css'],

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
        { property: 'og:image', content: 'https://losec.io/og-image-1200x630.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/png' },
        { property: 'og:image:alt', content: 'LoSec — AI Security Research Lab. Zero days, minus one.' },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@Losec_io' },
        { name: 'twitter:image', content: 'https://losec.io/og-image-1200x630.png' },
        { name: 'twitter:image:alt', content: 'LoSec — AI Security Research Lab.' },
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
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/blog/**': { prerender: true },
  },
})
