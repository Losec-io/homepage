<script setup lang="ts">
withDefaults(
  defineProps<{
    index?: string
    eyebrow: string
    title: string
    description?: string
  }>(),
  { index: '', description: '' },
)
</script>

<template>
  <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
    <div class="max-w-2xl">
      <div class="mb-4 flex items-center gap-3">
        <span v-if="index" class="font-mono text-xs text-acid">{{ index }}</span>
        <span class="h-px w-8 bg-line-strong" />
        <span class="kicker">{{ eyebrow }}</span>
      </div>
      <h2 class="section-title text-fg">{{ title }}</h2>
      <p v-if="description" class="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-muted">
        {{ description }}
      </p>
    </div>
    <div v-if="$slots.action" class="shrink-0">
      <slot name="action" />
    </div>
  </div>
</template>
