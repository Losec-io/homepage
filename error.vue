<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error?.statusCode === 404)

useHead({ title: () => `${props.error?.statusCode ?? 'Error'} — LoSec` })

function goHome() {
  clearError({ redirect: '/' })
}
</script>

<template>
  <div class="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-5 text-center">
    <SiteBackground />

    <div aria-hidden="true" class="fx-plasma pointer-events-none absolute inset-x-0 top-1/4 h-1/2 opacity-60" />

    <div class="relative">
      <ReticleFrame always label="losec://error">
        <div class="scanlines border border-line-strong bg-surface px-8 py-12 shadow-hud-lg sm:px-16">
          <p class="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-ember">
            {{ is404 ? 'target not acquired' : 'system fault' }}
          </p>
          <p class="mt-4 font-display text-7xl font-bold tracking-tightest text-fg sm:text-8xl">
            {{ error?.statusCode || 500 }}
          </p>
          <p class="mx-auto mt-4 max-w-sm text-[0.95rem] leading-relaxed text-muted">
            {{ is404
              ? 'This route resolved to nothing. The page you were scanning for is off the grid.'
              : (error?.statusMessage || 'The scanner hit an unexpected condition. Our team has been notified.') }}
          </p>
          <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button type="button" class="btn-primary" @click="goHome">← Back to base</button>
            <NuxtLink to="/blog" class="btn-ghost" @click="goHome">Read the blog</NuxtLink>
          </div>
        </div>
      </ReticleFrame>

      <div class="mt-8 flex justify-center">
        <AppLogo />
      </div>
    </div>
  </div>
</template>
