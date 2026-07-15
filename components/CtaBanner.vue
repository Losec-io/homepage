<script setup lang="ts">
import copy from '~/content/copy.json'
const cta = copy.ctaBanner
</script>

<template>
  <section class="mx-auto max-w-shell px-5 py-20 sm:px-8">
    <Reveal>
      <ReticleFrame always label="losec://engage">
        <div class="scanlines relative overflow-hidden border border-line-strong bg-surface px-6 py-14 shadow-hud-lg sm:px-14">
          <div aria-hidden="true" class="fx-plasma pointer-events-none absolute inset-0 opacity-80" />
          <div class="relative mx-auto max-w-2xl text-center">
            <p class="kicker mb-5 text-acid">// {{ siteConfig.tagline }}</p>
            <h2 class="section-title text-fg">{{ cta.title }}</h2>
            <p class="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-muted">
              {{ cta.description }}
            </p>
            <div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <NuxtLink to="/contact" class="btn-primary">
                {{ cta.cta }}
                <span aria-hidden="true">→</span>
              </NuxtLink>
              <a :href="`mailto:${siteConfig.email}`" class="btn-ghost">{{ siteConfig.email }}</a>
            </div>
          </div>
        </div>
      </ReticleFrame>
    </Reveal>
  </section>
</template>
