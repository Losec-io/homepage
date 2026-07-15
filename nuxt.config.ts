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
      title: 'LoSec — AI Security Research Lab',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'LoSec is an AI-driven security research lab discovering vulnerabilities and 0-days at machine speed.',
        },
        { name: 'theme-color', content: '#05070a' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'LoSec' },
        { property: 'og:title', content: 'LoSec — AI Security Research Lab' },
        {
          property: 'og:description',
          content: 'AI-driven vulnerability discovery and 0-day research.',
        },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@Losec_io' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        // Google Fonts href injected once the design system is finalized.
      ],
    },
  },

  nitro: {
    preset: 'vercel',
  },
})
