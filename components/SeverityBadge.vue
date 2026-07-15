<script setup lang="ts">
const props = defineProps<{ level: string; cvss?: string }>()
const meta = computed(() => severity(props.level))
</script>

<template>
  <span
    class="inline-flex items-center gap-2 border px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em]"
    :class="[meta.text, meta.border, meta.soft]"
  >
    <span class="h-1.5 w-1.5 rounded-full" :class="meta.dot" />
    {{ meta.label }}
    <span v-if="cvss" class="text-fg/70">{{ cvss }}</span>
  </span>
</template>
