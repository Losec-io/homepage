<script setup lang="ts">
const posts = blogPosts.slice(0, 4)
</script>

<template>
  <section id="research" class="scroll-mt-20 border-t border-line bg-panel/40">
    <div class="mx-auto max-w-shell px-5 py-20 sm:px-8">
      <Reveal>
        <SectionHeader
          index="02"
          eyebrow="From the lab"
          title="Field notes on breaking software"
          description="Deep technical write-ups, exploit chains, and the research methods behind our disclosures — how the bug was found, why it mattered, and how an AI hunch became a CVE."
        >
          <template #action>
            <NuxtLink to="/blog" class="btn-ghost">All writeups →</NuxtLink>
          </template>
        </SectionHeader>
      </Reveal>

      <div class="mt-12 border-t border-line">
        <Reveal v-for="(p, i) in posts" :key="p.slug" :delay="i * 40">
          <NuxtLink :to="`/blog/${p.slug}`" class="group/reticle block">
            <ReticleFrame>
              <article class="grid items-start gap-4 border-b border-line px-1 py-7 transition-colors duration-200 hover:bg-surface/60 sm:grid-cols-[10rem_1fr_auto] sm:gap-8 sm:px-5">
                <div class="flex flex-col gap-1.5 font-mono text-[0.7rem] text-haze">
                  <span class="text-acid-dim">{{ formatDate(p.date) }}</span>
                  <span class="uppercase tracking-[0.1em]">{{ p.category }}</span>
                </div>

                <div class="min-w-0">
                  <h3 class="font-display text-xl font-semibold leading-snug tracking-tightest text-fg transition-colors group-hover/reticle:text-acid">
                    {{ p.title }}
                  </h3>
                  <p class="mt-2 line-clamp-2 max-w-2xl text-[0.9rem] leading-relaxed text-muted">
                    {{ p.excerpt }}
                  </p>
                  <div class="mt-3 flex flex-wrap gap-2">
                    <span
                      v-for="t in p.tags.slice(0, 3)"
                      :key="t"
                      class="border border-line px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-haze"
                    >{{ t }}</span>
                  </div>
                </div>

                <div class="flex items-center justify-between gap-4 font-mono text-[0.7rem] text-haze sm:flex-col sm:items-end sm:gap-2">
                  <span class="text-muted">{{ p.author }}</span>
                  <span>{{ p.readTime }}</span>
                  <span aria-hidden="true" class="text-acid opacity-0 transition-opacity duration-200 group-hover/reticle:opacity-100">read →</span>
                </div>
              </article>
            </ReticleFrame>
          </NuxtLink>
        </Reveal>
      </div>
    </div>
  </section>
</template>
