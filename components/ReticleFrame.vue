<script setup lang="ts">
/**
 * The signature "lock-on" reticle — four acid L-brackets that snap inward
 * around the framed element on hover / focus, like a scope acquiring a target.
 */
const props = withDefaults(
  defineProps<{
    /** keep the reticle permanently locked (focal panels) */
    always?: boolean
    /** optional mono coordinate label pinned to a corner */
    label?: string
  }>(),
  { always: false, label: '' },
)

const corners = [
  { k: 'tl', pos: 'top-0 left-0', side: 'border-l-2 border-t-2', out: '-translate-x-1.5 -translate-y-1.5' },
  { k: 'tr', pos: 'top-0 right-0', side: 'border-r-2 border-t-2', out: 'translate-x-1.5 -translate-y-1.5' },
  { k: 'bl', pos: 'bottom-0 left-0', side: 'border-l-2 border-b-2', out: '-translate-x-1.5 translate-y-1.5' },
  { k: 'br', pos: 'bottom-0 right-0', side: 'border-r-2 border-b-2', out: 'translate-x-1.5 translate-y-1.5' },
]
</script>

<template>
  <div class="group/reticle relative">
    <slot />

    <span
      v-for="c in corners"
      :key="c.k"
      aria-hidden="true"
      class="pointer-events-none absolute z-20 h-3.5 w-3.5 border-acid transition-all duration-200 ease-out-hud"
      :class="[
        c.pos,
        c.side,
        props.always
          ? 'translate-x-0 translate-y-0 opacity-100'
          : [c.out, 'opacity-0 group-hover/reticle:translate-x-0 group-hover/reticle:translate-y-0 group-hover/reticle:opacity-100 group-focus-within/reticle:translate-x-0 group-focus-within/reticle:translate-y-0 group-focus-within/reticle:opacity-100'],
      ]"
    />

    <span
      v-if="props.label"
      aria-hidden="true"
      class="pointer-events-none absolute -top-2.5 left-4 z-20 bg-ink px-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-haze"
    >{{ props.label }}</span>
  </div>
</template>
