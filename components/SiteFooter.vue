<script setup lang="ts">
const year = 2026

const columns = [
  {
    title: 'Lab',
    links: [
      { label: 'Disclosures', to: '/#disclosures' },
      { label: 'Research feed', to: '/#research' },
      { label: 'Blog', to: '/blog' },
      { label: 'Members', to: '/member' },
    ],
  },
  {
    title: 'Engage',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Request a briefing', to: '/contact' },
      { label: 'Report a bug', to: '/contact' },
    ],
  },
]
</script>

<template>
  <footer class="relative border-t border-line bg-panel/60">
    <div class="mx-auto max-w-shell px-5 sm:px-8">
      <!-- top -->
      <div class="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <AppLogo />
          <p class="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            An AI security research lab. We pair autonomous agents with elite
            offensive researchers to find the 0-days before attackers do.
          </p>
          <div class="mt-6 flex items-center gap-2 font-mono text-[0.7rem] text-haze">
            <span class="h-1.5 w-1.5 rounded-full bg-ember animate-ember" />
            losec://targets · scanning
          </div>
        </div>

        <div v-for="col in columns" :key="col.title">
          <h3 class="kicker mb-5">{{ col.title }}</h3>
          <ul class="space-y-3">
            <li v-for="l in col.links" :key="l.label + l.to">
              <NuxtLink :to="l.to" class="font-mono text-[0.82rem] text-muted transition-colors hover:text-acid">
                {{ l.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="kicker mb-5">Connect</h3>
          <ul class="space-y-3">
            <li>
              <a :href="`mailto:${siteConfig.email}`" class="font-mono text-[0.82rem] text-muted transition-colors hover:text-acid">
                {{ siteConfig.email }}
              </a>
            </li>
            <li>
              <a :href="siteConfig.socials.x" target="_blank" rel="noopener" class="font-mono text-[0.82rem] text-muted transition-colors hover:text-acid">
                X · {{ siteConfig.socials.xHandle }}
              </a>
            </li>
            <li>
              <a :href="siteConfig.socials.github" target="_blank" rel="noopener" class="font-mono text-[0.82rem] text-muted transition-colors hover:text-acid">
                GitHub · {{ siteConfig.socials.githubHandle }}
              </a>
            </li>
          </ul>
          <div class="mt-6 flex gap-2">
            <a :href="siteConfig.socials.github" target="_blank" rel="noopener" aria-label="GitHub" class="inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-line-strong hover:text-acid">
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.11 3.08.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" /></svg>
            </a>
            <a :href="siteConfig.socials.x" target="_blank" rel="noopener" aria-label="X" class="inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-line-strong hover:text-acid">
              <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>
            </a>
          </div>
        </div>
      </div>

      <!-- bottom bar -->
      <div class="flex flex-col gap-3 border-t border-line py-6 font-mono text-[0.72rem] text-haze sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright {{ year }} {{ siteConfig.name }} · All rights reserved</p>
        <p>
          Contact business:
          <a :href="`mailto:${siteConfig.businessEmail}`" class="text-muted transition-colors hover:text-acid">
            {{ siteConfig.businessEmail }}
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>
