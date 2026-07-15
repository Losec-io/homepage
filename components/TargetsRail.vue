<script setup lang="ts">
// duplicated for a seamless marquee loop
const loop = [...targets, ...targets]
</script>

<template>
  <div class="relative border-y border-line bg-panel/50">
    <div class="mx-auto flex max-w-shell items-center gap-4 px-5 sm:px-8">
      <span class="shrink-0 border-r border-line py-3.5 pr-4 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-acid">
        targets //
      </span>
      <div
        class="relative flex-1 overflow-hidden py-3.5"
        style="-webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent); mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)"
      >
        <div class="flex w-max animate-marquee items-center gap-8">
          <span
            v-for="(t, i) in loop"
            :key="i"
            class="inline-flex items-center gap-8 font-mono text-[0.78rem] text-muted"
          >
            {{ t }}
            <span class="text-line-strong">·</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
