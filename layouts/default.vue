<script setup lang="ts">
// Site-wide structured data (Organization + WebSite).
const orgLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: 'LoSec',
      alternateName: 'Losec Labs',
      url: siteConfig.url,
      logo: `${siteConfig.url}/losec-mark-512.png`,
      email: siteConfig.email,
      description:
        'AI Security Research Lab — AI-driven vulnerability discovery and 0-day research.',
      sameAs: [siteConfig.socials.x, siteConfig.socials.github],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteConfig.url}/#website`,
      name: 'LoSec',
      url: siteConfig.url,
      inLanguage: 'en',
      publisher: { '@id': `${siteConfig.url}/#organization` },
      description:
        'AI-driven vulnerability discovery and 0-day research. Zero days, minus one.',
    },
  ],
}

useHead({
  script: [{ type: 'application/ld+json', innerHTML: JSON.stringify(orgLd) }],
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col">
    <SiteBackground />
    <SiteNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
