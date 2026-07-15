<script setup lang="ts">
import copy from '~/content/copy.json'

const hero = copy.hero
const stats = copy.stats

// split the headline around its accent fragment
const parts = computed(() => {
  const [before, after] = hero.headline.split(hero.headlineAccent)
  return { before, accent: hero.headlineAccent, after }
})

// colorize a terminal line by its leading token
function lineClass(line: string) {
  if (line.startsWith('$')) return 'text-fg'
  if (line.includes('[+]')) return 'text-acid'
  if (line.includes('[!]')) return 'text-ember'
  if (line.includes('[✓]')) return 'text-success'
  if (line.includes('[>]')) return 'text-muted'
  return 'text-muted'
}

// progressive "printing" of the scan log
const shown = ref(0)
onMounted(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    shown.value = hero.terminalLines.length
    return
  }
  const tick = () => {
    if (shown.value < hero.terminalLines.length) {
      shown.value += 1
      window.setTimeout(tick, 520)
    }
  }
  window.setTimeout(tick, 450)
})
const done = computed(() => shown.value >= hero.terminalLines.length)
</script>

<template>
  <section class="relative overflow-hidden">
    <!-- localized plasma glow behind the scanner -->
    <div aria-hidden="true" class="fx-plasma pointer-events-none absolute right-0 top-0 h-[80%] w-[70%] opacity-70" />

    <div class="relative mx-auto grid max-w-shell items-center gap-14 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-24 lg:pt-20">
      <!-- copy column -->
      <div>
        <div class="mb-7 inline-flex items-center gap-2.5 border border-line bg-surface/60 px-3 py-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-ember animate-ember" />
          <span class="kicker text-muted">{{ hero.eyebrow }}</span>
        </div>

        <h1 class="text-display text-fg">
          {{ parts.before }}<span class="text-acid">{{ parts.accent }}</span>{{ parts.after }}
        </h1>

        <p class="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-muted">
          {{ hero.subheadline }}
        </p>

        <div class="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <NuxtLink to="/contact" class="btn-primary">
            {{ hero.primaryCta }}
            <span aria-hidden="true">→</span>
          </NuxtLink>
          <NuxtLink to="/#disclosures" class="btn-ghost">
            {{ hero.secondaryCta }}
          </NuxtLink>
        </div>

        <!-- inline stat strip -->
        <dl class="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-4 sm:gap-x-4">
          <div v-for="s in stats" :key="s.label" class="min-w-0">
            <dt class="font-display text-2xl font-black tracking-tightest text-fg sm:text-[1.75rem]">{{ s.value }}</dt>
            <dd class="mt-1 font-mono text-[0.66rem] uppercase leading-tight tracking-[0.08em] text-haze">{{ s.label }}</dd>
          </div>
        </dl>
      </div>

      <!-- live scanner -->
      <ReticleFrame always label="losec://scanner · REF 0x2F">
        <div class="scanlines relative overflow-hidden border border-line-strong bg-[#08090c] shadow-hud">
          <!-- terminal chrome -->
          <div class="flex items-center justify-between border-b border-line px-4 py-2.5">
            <div class="flex items-center gap-1.5">
              <span class="h-2.5 w-2.5 rounded-full border border-line-strong" />
              <span class="h-2.5 w-2.5 rounded-full border border-line-strong" />
              <span class="h-2.5 w-2.5 rounded-full border border-line-strong" />
            </div>
            <span class="font-mono text-[0.66rem] uppercase tracking-[0.14em] text-haze">exhaustive scan</span>
            <span class="inline-flex items-center gap-1.5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-ember">
              <span class="h-1.5 w-1.5 rounded-full bg-ember animate-ember" />
              scanning
            </span>
          </div>

          <!-- scan beam (once on load) -->
          <div
            aria-hidden="true"
            class="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 animate-scanbeam"
            style="background: linear-gradient(to bottom, transparent, rgb(var(--c-acid) / 0.12), transparent)"
          />

          <!-- log body -->
          <div class="relative min-h-[15.5rem] px-4 py-4 font-mono text-[0.78rem] leading-[1.7] sm:text-[0.82rem]">
            <p
              v-for="(line, i) in hero.terminalLines.slice(0, shown)"
              :key="i"
              :class="lineClass(line)"
              class="whitespace-pre-wrap break-words"
            >{{ line }}</p>
            <p class="text-acid">
              <span v-if="done">losec@lab:~$ </span><span v-else>&nbsp;</span><span class="inline-block h-[1.05em] w-[0.6ch] translate-y-[0.15em] bg-acid animate-cursor" />
            </p>
          </div>

          <!-- footer status -->
          <div class="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[0.64rem] text-haze">
            <span>CAL 07.2026</span>
            <span>0-day #147 · CVSS 9.8</span>
          </div>
        </div>
      </ReticleFrame>
    </div>
  </section>
</template>
