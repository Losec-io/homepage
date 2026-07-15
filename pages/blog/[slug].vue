<script setup lang="ts">
import { marked } from 'marked'

const route = useRoute()
const slug = route.params.slug as string
const post = getPost(slug)

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Writeup not found', fatal: true })
}

marked.setOptions({ gfm: true, breaks: false })
const html = marked.parse(post.body) as string
const related = relatedPosts(slug, 2)

const shareText = encodeURIComponent(`${post.title} — via ${siteConfig.socials.xHandle}`)
const shareUrl = encodeURIComponent(`${siteConfig.url}/blog/${slug}`)

useSeoMeta({
  title: post.title,
  description: post.excerpt,
  ogTitle: post.title,
  ogDescription: post.excerpt,
  ogType: 'article',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <!-- header -->
    <section class="relative overflow-hidden border-b border-line">
      <div aria-hidden="true" class="fx-plasma pointer-events-none absolute -right-20 top-0 h-full w-1/2 opacity-40" />
      <div class="relative mx-auto max-w-3xl px-5 pb-12 pt-10 sm:px-8 lg:pt-14">
        <NuxtLink to="/blog" class="link-underline mb-8 inline-flex text-muted">← All writeups</NuxtLink>

        <div class="flex flex-wrap items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.1em]">
          <span class="border border-acid/30 bg-acid/10 px-2 py-0.5 text-acid">{{ post.category }}</span>
          <span class="text-haze">{{ formatDate(post.date) }}</span>
          <span class="text-haze">· {{ post.readTime }}</span>
        </div>

        <h1 class="mt-5 font-display text-4xl font-bold leading-[1.06] tracking-tightest text-fg sm:text-5xl">
          {{ post.title }}
        </h1>
        <p class="mt-5 text-lg leading-relaxed text-muted">{{ post.excerpt }}</p>

        <div class="mt-7 flex items-center gap-3 border-t border-line pt-6">
          <span class="flex h-9 w-9 items-center justify-center border border-line bg-surface font-mono text-xs text-acid">
            {{ post.author.replace('@', '').slice(0, 2).toUpperCase() }}
          </span>
          <div class="font-mono text-[0.78rem]">
            <p class="text-fg">{{ post.author }}</p>
            <p class="text-haze">LoSec Research</p>
          </div>
        </div>
      </div>
    </section>

    <!-- body -->
    <article class="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <div class="prose-losec" v-html="html" />

      <!-- tags + share -->
      <div class="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="t in post.tags"
            :key="t"
            class="border border-line px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-haze"
          >#{{ t }}</span>
        </div>
        <div class="flex items-center gap-3">
          <span class="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-haze">Share</span>
          <a
            :href="`https://x.com/intent/tweet?text=${shareText}&url=${shareUrl}`"
            target="_blank"
            rel="noopener"
            aria-label="Share on X"
            class="inline-flex h-9 w-9 items-center justify-center border border-line text-muted transition-colors hover:border-acid/40 hover:text-acid"
          >
            <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>
          </a>
        </div>
      </div>
    </article>

    <!-- related -->
    <section v-if="related.length" class="border-t border-line bg-panel/40">
      <div class="mx-auto max-w-shell px-5 py-16 sm:px-8">
        <div class="mb-8 flex items-center gap-3">
          <span class="h-px w-8 bg-line-strong" />
          <span class="kicker">Keep reading</span>
        </div>
        <div class="grid gap-4 md:grid-cols-2">
          <BlogCard v-for="p in related" :key="p.slug" :post="p" />
        </div>
      </div>
    </section>
  </div>
</template>
