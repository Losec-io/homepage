<script setup lang="ts">
const [feature, ...rest] = blogPosts

useSeo({
  title: 'Research Blog',
  socialTitle: 'LoSec Research Blog',
  description:
    'Deep technical write-ups, exploit chains and research methodology from the LoSec lab — 0-day disclosures, tooling and threat research.',
  type: 'website',
})
</script>

<template>
  <div>
    <PageHero
      eyebrow="From the lab"
      code="losec://blog"
      title="Field notes on breaking software"
      description="Deep technical write-ups, exploit chains, and the research methods behind our disclosures. No fluff — just how the bug was found, why it mattered, and how an AI hunch became a CVE."
    />

    <section class="mx-auto max-w-shell px-5 py-16 sm:px-8">
      <!-- featured post -->
      <Reveal>
        <NuxtLink :to="`/blog/${feature.slug}`" class="group/reticle block">
          <ReticleFrame label="latest">
            <article class="card-hud grid gap-8 p-7 md:grid-cols-[1fr_1fr] md:p-9">
              <div class="flex flex-col justify-center">
                <div class="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.1em]">
                  <span class="text-acid">{{ feature.category }}</span>
                  <span class="text-haze">{{ formatDate(feature.date) }}</span>
                </div>
                <h2 class="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tightest text-fg transition-colors group-hover/reticle:text-acid">
                  {{ feature.title }}
                </h2>
                <p class="mt-4 text-[0.95rem] leading-relaxed text-muted">{{ feature.excerpt }}</p>
                <div class="mt-6 flex items-center gap-4 font-mono text-[0.7rem] text-haze">
                  <span class="text-muted">{{ feature.author }}</span>
                  <span>·</span>
                  <span>{{ feature.readTime }}</span>
                </div>
              </div>
              <div class="relative hidden overflow-hidden border border-line bg-panel md:block">
                <div class="scanlines absolute inset-0" />
                <div class="flex h-full flex-col justify-between p-6 font-mono text-[0.72rem]">
                  <div class="flex items-center justify-between text-haze">
                    <span>losec://writeup</span>
                    <span class="text-acid">FIG.01</span>
                  </div>
                  <div class="space-y-1.5">
                    <p v-for="t in feature.tags" :key="t" class="text-muted">
                      <span class="text-acid-dim">#</span> {{ t }}
                    </p>
                  </div>
                  <p class="text-right text-acid">read the writeup →</p>
                </div>
              </div>
            </article>
          </ReticleFrame>
        </NuxtLink>
      </Reveal>

      <!-- grid -->
      <div class="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Reveal v-for="(p, i) in rest" :key="p.slug" :delay="i * 40">
          <BlogCard :post="p" />
        </Reveal>
      </div>
    </section>
  </div>
</template>
