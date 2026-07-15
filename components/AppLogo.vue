<script setup lang="ts">
// The mark: a near-closed perimeter ring (the defense boundary) with the
// scanning agent's centre dot and a single coral breach dot at the gap.
withDefaults(defineProps<{ wordmark?: boolean }>(), { wordmark: true })
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <svg viewBox="0 0 96 96" class="h-7 w-7 shrink-0" role="img" aria-label="losec.io">
      <title>losec.io</title>
      <circle
        cx="48"
        cy="48"
        r="34"
        fill="none"
        stroke="#5DCAA5"
        stroke-width="7.45"
        stroke-linecap="round"
        stroke-dasharray="167.95 45.70"
      />
      <circle cx="48" cy="48" r="6.93" fill="#9FE1CB" />
      <circle cx="75.16" cy="27.54" r="6.93" fill="#F0997B" />
    </svg>
    <span
      v-if="wordmark"
      class="font-display text-[1.3rem] font-medium leading-none tracking-tight text-fg"
    >losec<span class="text-muted">.io</span></span>
  </span>
</template>
