<script setup lang="ts">
import certs from '~/content/certs.json'
import copy from '~/content/copy.json'
</script>

<template>
  <section class="mx-auto max-w-shell px-5 py-16 sm:px-8">
    <Reveal>
      <div class="mb-8 flex items-center gap-3">
        <span class="h-px w-8 bg-line-strong" />
        <span class="kicker">{{ copy.trustBar.label }}</span>
      </div>

      <div class="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-5">
        <div
          v-for="cert in certs"
          :key="cert.code"
          class="group/reticle relative border-b border-r border-line p-6 transition-colors duration-200 hover:bg-surface"
        >
          <div class="flex items-baseline justify-between">
            <span class="font-display text-3xl font-bold tracking-tightest text-fg transition-colors group-hover/reticle:text-acid">
              {{ cert.code }}
            </span>
            <span class="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-haze">{{ cert.issuer }}</span>
          </div>
          <p class="mt-4 text-[0.82rem] leading-snug text-muted">{{ cert.name }}</p>
          <p class="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-acid-dim">{{ cert.domain }}</p>
        </div>
      </div>
    </Reveal>
  </section>
</template>
