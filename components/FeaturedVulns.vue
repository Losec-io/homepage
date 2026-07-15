<script setup lang="ts">
import featured from '~/content/vulns-featured.json'

// alternating bento spans → each lg row sums to 3 cols (never 3 identical cards)
const spans = ['lg:col-span-2', 'lg:col-span-1', 'lg:col-span-1', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-1']
</script>

<template>
  <section class="mx-auto max-w-shell px-5 py-20 sm:px-8">
    <Reveal>
      <SectionHeader
        index="01"
        eyebrow="Proof, not promises"
        title="Bugs we broke first"
        description="Every finding starts as a hypothesis and ends as a working proof-of-concept. From memory corruption in parsers to logic flaws in auth flows, here's what our AI surfaced and our researchers weaponized — all responsibly disclosed."
      />
    </Reveal>

    <div class="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Reveal
        v-for="(v, i) in featured"
        :key="v.ref"
        :delay="i * 45"
        :class="spans[i % spans.length]"
      >
        <ReticleFrame class="h-full">
          <article class="card-hud flex h-full flex-col p-6">
            <div class="flex items-center justify-between">
              <span class="font-mono text-[0.7rem] text-haze">{{ String(i + 1).padStart(2, '0') }} · {{ v.ref }}</span>
              <SeverityBadge :level="v.severity" :cvss="v.cvss" />
            </div>

            <p class="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-acid">{{ v.type }}</p>
            <h3 class="mt-2 font-display text-lg font-semibold leading-snug tracking-tightest text-fg">
              {{ v.title }}
            </h3>
            <p class="mt-3 line-clamp-4 flex-1 text-[0.88rem] leading-relaxed text-muted">
              {{ v.blurb }}
            </p>

            <div class="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[0.68rem] text-haze">
              <span class="truncate">{{ v.vendor }} · {{ v.product }}</span>
              <span>{{ formatDate(v.date) }}</span>
            </div>
          </article>
        </ReticleFrame>
      </Reveal>
    </div>
  </section>
</template>
