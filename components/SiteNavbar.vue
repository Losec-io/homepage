<script setup lang="ts">
const open = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 12
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// close the mobile drawer on route change
const route = useRoute()
watch(() => route.fullPath, () => (open.value = false))
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-colors duration-300"
    :class="scrolled ? 'border-b border-line bg-ink/85 backdrop-blur-md' : 'border-b border-transparent'"
  >
    <nav class="mx-auto flex h-16 max-w-shell items-center justify-between gap-6 px-5 sm:px-8">
      <!-- brand -->
      <NuxtLink to="/" class="group inline-flex items-center gap-2.5" aria-label="LoSec home">
        <AppLogo />
      </NuxtLink>

      <!-- desktop links -->
      <ul class="hidden items-center gap-7 lg:flex">
        <li v-for="l in navLinks" :key="l.to">
          <NuxtLink
            :to="l.to"
            class="font-mono text-[0.8rem] text-muted transition-colors duration-150 hover:text-fg"
            active-class="text-fg"
          >
            <span class="text-acid/70">/</span>{{ l.label.toLowerCase() }}
          </NuxtLink>
        </li>
      </ul>

      <!-- right cluster -->
      <div class="flex items-center gap-2">
        <a
          :href="siteConfig.socials.github"
          target="_blank"
          rel="noopener"
          aria-label="LoSec on GitHub"
          class="hidden h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-flex"
        >
          <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.48.11-3.08 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.6.23 2.78.11 3.08.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" /></svg>
        </a>
        <a
          :href="siteConfig.socials.x"
          target="_blank"
          rel="noopener"
          aria-label="LoSec on X"
          class="hidden h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-flex"
        >
          <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>
        </a>
        <NuxtLink to="/contact" class="hidden md:inline-flex btn-primary !py-2 !px-4 text-[0.75rem]">
          Request briefing
        </NuxtLink>

        <!-- mobile toggle -->
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center border border-line text-fg lg:hidden"
          :aria-expanded="open"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <div class="flex flex-col gap-1.5">
            <span class="h-px w-5 bg-current transition-transform" :class="open ? 'translate-y-[3.5px] rotate-45' : ''" />
            <span class="h-px w-5 bg-current transition-transform" :class="open ? '-translate-y-[3.5px] -rotate-45' : ''" />
          </div>
        </button>
      </div>
    </nav>

    <!-- mobile drawer -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="open" class="border-b border-line bg-ink/95 backdrop-blur-md lg:hidden">
        <ul class="mx-auto flex max-w-shell flex-col px-5 py-3 sm:px-8">
          <li v-for="l in navLinks" :key="l.to" class="border-b border-line/60 last:border-0">
            <NuxtLink
              :to="l.to"
              class="flex items-center justify-between py-3.5 font-mono text-sm text-muted hover:text-fg"
              active-class="text-fg"
            >
              <span><span class="text-acid/70">/</span>{{ l.label.toLowerCase() }}</span>
              <span class="text-haze">→</span>
            </NuxtLink>
          </li>
          <li class="pt-4">
            <NuxtLink to="/contact" class="btn-primary w-full">Request briefing</NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </header>
</template>
