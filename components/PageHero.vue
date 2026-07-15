<script setup lang="ts">
withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    description?: string
    code?: string
  }>(),
  { description: '', code: '' },
)
</script>

<template>
  <section class="relative overflow-hidden border-b border-line">
    <div aria-hidden="true" class="fx-plasma pointer-events-none absolute -right-20 top-0 h-full w-[55%] opacity-50" />
    <div class="relative mx-auto max-w-shell px-5 pb-14 pt-14 sm:px-8 lg:pb-20 lg:pt-20">
      <div class="mb-5 flex items-center gap-3">
        <span class="h-1.5 w-1.5 rounded-full bg-mint animate-ember" />
        <span class="kicker">{{ eyebrow }}</span>
        <span v-if="code" class="font-mono text-[0.66rem] text-haze">· {{ code }}</span>
      </div>
      <h1 class="text-display max-w-3xl text-fg" style="font-size: clamp(2.4rem, 5vw, 4.5rem)">
        <slot name="title">{{ title }}</slot>
      </h1>
      <p v-if="description" class="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-muted">
        {{ description }}
      </p>
      <slot />
    </div>
  </section>
</template>
