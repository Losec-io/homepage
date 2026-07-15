<template>
  <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
    <div class="fx-grid absolute inset-0" />
    <div class="fx-grain absolute inset-0" />
    <!-- faint vignette toward the edges -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(120% 80% at 50% 0%, transparent 55%, rgb(var(--c-ink) / 0.7) 100%)"
    />
  </div>
</template>
