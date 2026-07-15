<script setup lang="ts">
import team from '~/content/team.json'
import certs from '~/content/certs.json'

const certMap = Object.fromEntries(certs.map((c) => [c.code, c]))

useSeo({
  title: 'Members',
  description:
    'The operators behind LoSec — offensive & defensive researchers holding CAPE, CWEE, OSWE, OSEP and CDSA, building AI that finds vulnerabilities at machine scale.',
})

function monogram(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}
</script>

<template>
  <div>
    <PageHero
      eyebrow="The operators"
      code="losec://members"
      title="The people behind the findings"
      description="A small team of offensive researchers and AI engineers. We hold CAPE, CWEE, OSWE, OSEP and CDSA — and we build the machines that read code faster than any of us can."
    />

    <section class="mx-auto max-w-shell px-5 py-16 sm:px-8">
      <div class="grid gap-4 md:grid-cols-2">
        <Reveal v-for="(m, i) in team" :key="m.handle" :delay="i * 45">
          <ReticleFrame class="h-full">
            <article class="card-hud flex h-full flex-col p-6 sm:p-7">
              <div class="flex items-start gap-4">
                <span class="flex h-14 w-14 shrink-0 items-center justify-center border border-line-strong bg-panel font-display text-lg font-bold tracking-tightest text-acid">
                  {{ monogram(m.name) }}
                </span>
                <div class="min-w-0">
                  <h2 class="font-display text-xl font-bold leading-tight tracking-tightest text-fg">{{ m.name }}</h2>
                  <p class="mt-0.5 font-mono text-[0.78rem] text-acid">@{{ m.handle }}</p>
                  <p class="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.08em] text-haze">{{ m.role }}</p>
                </div>
              </div>

              <p class="mt-5 flex-1 text-[0.88rem] leading-relaxed text-muted">{{ m.bio }}</p>

              <div class="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-4">
                <span
                  v-for="cert in m.certs"
                  :key="cert"
                  :title="certMap[cert]?.name"
                  class="border border-acid/25 bg-acid/[0.06] px-2 py-1 font-mono text-[0.64rem] font-medium uppercase tracking-[0.1em] text-acid"
                >{{ cert }}</span>
                <span class="ml-auto font-mono text-[0.64rem] uppercase tracking-[0.08em] text-haze">{{ m.focus }}</span>
              </div>
            </article>
          </ReticleFrame>
        </Reveal>
      </div>

      <!-- certifications legend -->
      <Reveal>
        <div class="mt-14 border border-line bg-surface p-6 sm:p-8">
          <div class="mb-6 flex items-center gap-3">
            <span class="h-px w-8 bg-line-strong" />
            <span class="kicker">Team certifications</span>
          </div>
          <dl class="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <div v-for="c in certs" :key="c.code" class="flex items-baseline gap-4">
              <dt class="w-16 shrink-0 font-mono text-sm font-semibold text-acid">{{ c.code }}</dt>
              <dd>
                <p class="text-[0.9rem] text-fg">{{ c.name }}</p>
                <p class="font-mono text-[0.66rem] uppercase tracking-[0.08em] text-haze">{{ c.issuer }} · {{ c.domain }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </Reveal>

      <!-- join cta -->
      <Reveal>
        <div class="mt-8 flex flex-col items-start justify-between gap-4 border border-line bg-panel/60 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 class="font-display text-xl font-bold tracking-tightest text-fg">Think you can break what we can't?</h3>
            <p class="mt-1.5 text-[0.9rem] text-muted">We're always reading applications from serious researchers.</p>
          </div>
          <a :href="`mailto:${siteConfig.email}?subject=${encodeURIComponent('Joining LoSec')}`" class="btn-primary shrink-0">
            Join the lab →
          </a>
        </div>
      </Reveal>
    </section>
  </div>
</template>
