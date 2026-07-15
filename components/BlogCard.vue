<script setup lang="ts">
defineProps<{ post: BlogPost }>()
</script>

<template>
  <NuxtLink :to="`/blog/${post.slug}`" class="group/reticle block h-full">
    <ReticleFrame class="h-full">
      <article class="card-hud flex h-full flex-col p-6">
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
      </article>
    </ReticleFrame>
  </NuxtLink>
</template>
