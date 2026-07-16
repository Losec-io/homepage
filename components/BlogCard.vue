<script setup lang="ts">
import type { Publication } from '~/utils/blog'
defineProps<{ post: Publication }>()
</script>

<template>
  <NuxtLink :to="`/blog/${post.slug}`" class="group/reticle block h-full">
    <ReticleFrame class="h-full">
      <article class="card-hud flex h-full flex-col overflow-hidden">
        <!-- thumbnail -->
        <div v-if="post.thumbnail" class="relative aspect-[16/9] overflow-hidden border-b border-line bg-panel">
          <img
            :src="post.thumbnail"
            :alt="post.title"
            class="h-full w-full object-cover opacity-90 transition-opacity duration-200 group-hover/reticle:opacity-100"
            loading="lazy"
          />
        </div>

        <div class="flex flex-1 flex-col p-6">
          <div class="flex items-center justify-between font-mono text-[0.66rem] uppercase tracking-[0.1em]">
            <span class="text-acid">{{ post.category }}</span>
            <span class="text-haze">{{ formatDate(post.date) }}</span>
          </div>

          <h3 class="mt-4 font-display text-xl font-semibold leading-snug tracking-tightest text-fg transition-colors group-hover/reticle:text-acid">
            {{ post.title }}
          </h3>
          <p class="mt-3 line-clamp-3 flex-1 text-[0.88rem] leading-relaxed text-muted">
            {{ post.excerpt }}
          </p>

          <div class="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[0.68rem] text-haze">
            <span class="text-muted">{{ post.author }}</span>
            <span>{{ post.readTime }}</span>
          </div>
        </div>
      </article>
    </ReticleFrame>
  </NuxtLink>
</template>
