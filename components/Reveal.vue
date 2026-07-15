<script setup lang="ts">
/** Sparse, fast scroll-reveal: opacity + 10px rise, once, with optional stagger. */
const props = withDefaults(defineProps<{ delay?: number; as?: string }>(), {
  delay: 0,
  as: 'div',
})

const el = ref<HTMLElement | null>(null)

onMounted(() => {
  const node = el.value
  if (!node) return

  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduce || !('IntersectionObserver' in window)) {
    node.classList.add('is-in')
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => node.classList.add('is-in'), props.delay)
          io.unobserve(node)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )
  io.observe(node)
})
</script>

<template>
  <component :is="props.as" ref="el" class="reveal">
    <slot />
  </component>
</template>
