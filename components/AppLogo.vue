<script setup lang="ts">
withDefaults(defineProps<{ wordmark?: boolean }>(), { wordmark: true })
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <svg
      viewBox="0 0 32 32"
      class="h-7 w-7 shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" class="stroke-line" />
      <path
        d="M6 9V6h3M26 9V6h-3M6 23v3h3M26 23v3h-3"
        class="stroke-acid"
        stroke-width="1.6"
      />
      <path
        d="M11.5 10v12h9"
        class="stroke-acid"
        stroke-width="2.6"
        stroke-linecap="square"
      />
    </svg>
    <span
      v-if="wordmark"
      class="font-display text-[1.35rem] font-black leading-none tracking-tightest text-fg"
    >
      Lo<span class="text-acid">Sec</span>
    </span>
  </span>
</template>
