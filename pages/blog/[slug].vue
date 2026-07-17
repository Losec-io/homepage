<script setup lang="ts">
import type { Publication } from '~/utils/blog'

const route = useRoute()
const slug = route.params.slug as string

const { data: post } = await useAsyncData(`pub-${slug}`, () =>
  $fetch<Publication>(`/api/publications/${slug}`),
)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Writeup not found', fatal: true })
}

const { data: all } = await useAsyncData('publications', () => $fetch<Publication[]>('/api/publications'))
const related = computed(() => (all.value ?? []).filter((p) => p.slug !== slug).slice(0, 2))

// body is rendered to HTML (with syntax highlighting) on the server;
// route each <img> through @nuxt/image for resized/optimized delivery
const img = useImage()
function optimizeImages(rawHtml: string): string {
  return rawHtml.replace(/(<img\b[^>]*?\bsrc=")([^"]+)("[^>]*>)/g, (m, pre, src, post) => {
    if (!/^https?:\/\//.test(src)) return m
    // wider + higher quality so text screenshots stay crisp on hi-DPI screens
    const optimized = img(src, { width: 1600, quality: 90, format: 'webp' })
    const zoom = img(src, { width: 2200, quality: 92, format: 'webp' })
    let tag = pre + optimized + post
    if (!/\bloading=/.test(tag)) tag = tag.replace('<img', '<img loading="lazy"')
    if (!/\bdecoding=/.test(tag)) tag = tag.replace('<img', '<img decoding="async"')
    // higher-res source for the click-to-zoom lightbox
    tag = tag.replace('<img', `<img data-zoom="${zoom}"`)
    return tag
  })
}
const html = computed(() => optimizeImages(post.value?.bodyHtml ?? ''))

// wire the per-code-block copy buttons (content is v-html, so delegate)
const proseEl = ref<HTMLElement | null>(null)

function legacyCopy(text: string): boolean {
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

function markCopied(btn: HTMLElement) {
  const label = btn.querySelector('.code-block__copy-label')
  btn.setAttribute('data-copied', 'true')
  if (label) label.textContent = 'Copied'
  window.setTimeout(() => {
    btn.removeAttribute('data-copied')
    if (label) label.textContent = 'Copy'
  }, 1600)
}

// click-to-zoom lightbox for body images and diagrams
const zoomSrc = ref<string | null>(null)
const zoomSvg = ref<string | null>(null)
const zoomAlt = ref('')
const zoomOpen = computed(() => Boolean(zoomSrc.value || zoomSvg.value))
function closeZoom() {
  zoomSrc.value = null
  zoomSvg.value = null
}

function onProseClick(e: MouseEvent) {
  const el = e.target as HTMLElement

  const btn = el.closest('.code-block__copy') as HTMLElement | null
  if (btn) {
    const code = btn.closest('.code-block')?.querySelector('pre code')
    const text = code?.textContent ?? ''
    if (!text) return
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(
        () => markCopied(btn),
        () => {
          if (legacyCopy(text)) markCopied(btn)
        },
      )
    } else if (legacyCopy(text)) {
      markCopied(btn)
    }
    return
  }

  // mermaid diagram → zoom the rendered SVG (vector, scales crisply)
  const mmd = el.closest('pre.mermaid') as HTMLElement | null
  if (mmd) {
    const svg = mmd.querySelector('svg')
    if (svg) zoomSvg.value = svg.outerHTML
    return
  }

  if (el.tagName === 'IMG') {
    const im = el as HTMLImageElement
    zoomAlt.value = im.getAttribute('alt') || ''
    zoomSrc.value = im.getAttribute('data-zoom') || im.currentSrc || im.src
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeZoom()
}
watch(zoomOpen, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})
// render any ```mermaid blocks into diagrams (lazy — only when present)
async function renderMermaid() {
  const nodes = proseEl.value?.querySelectorAll<HTMLElement>(
    'pre.mermaid:not([data-processed="true"])',
  )
  if (!nodes || !nodes.length) return
  try {
    const mermaid = (await import('mermaid')).default
    // paper look, but high-contrast: near-black text, strong node borders and
    // edges so labels/boxes read clearly (author classDef colors still win)
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      fontFamily: '"IBM Plex Sans", ui-sans-serif, sans-serif',
      themeVariables: {
        darkMode: false,
        fontSize: '15px',
        background: '#fbf6ec',
        primaryColor: '#ffffff',
        primaryBorderColor: '#334155',
        primaryTextColor: '#0f172a',
        secondaryColor: '#eef2f0',
        tertiaryColor: '#f7f1e3',
        lineColor: '#334155',
        textColor: '#0f172a',
        nodeBorder: '#334155',
        clusterBkg: '#f1ebdc',
        clusterBorder: '#7c8a85',
        titleColor: '#0f172a',
        edgeLabelBackground: '#fbf6ec',
      },
    })
    await mermaid.run({ nodes: Array.from(nodes) })
  } catch {
    // rendering failed — reveal the raw source as a fallback
    nodes.forEach((n) => n.setAttribute('data-processed', 'true'))
  }
}

onMounted(async () => {
  proseEl.value?.addEventListener('click', onProseClick)
  window.addEventListener('keydown', onKeydown)
  await renderMermaid()
})
onUnmounted(() => {
  proseEl.value?.removeEventListener('click', onProseClick)
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})

const url = `${siteConfig.url}/blog/${slug}`
const image = post.value.thumbnail || `${siteConfig.url}/og-image-1200x630.png`
const shareText = encodeURIComponent(`${post.value.title} — via ${siteConfig.socials.xHandle}`)
const shareUrl = encodeURIComponent(url)

useSeo({
  title: post.value.title,
  description: post.value.excerpt,
  type: 'article',
  image: post.value.thumbnail || undefined,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.value.title,
    description: post.value.excerpt,
    datePublished: post.value.date,
    dateModified: post.value.date,
    author: { '@type': 'Person', name: post.value.author },
    publisher: {
      '@type': 'Organization',
      name: 'LoSec',
      url: siteConfig.url,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/losec-mark-512.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image,
    keywords: post.value.tags.join(', '),
    articleSection: post.value.category,
    url,
  },
})

function monogram(author: string) {
  return author.replace('@', '').slice(0, 2).toUpperCase()
}
</script>

<template>
  <div v-if="post">
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
            {{ monogram(post.author) }}
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
      <div ref="proseEl" class="prose-losec" v-html="html" />

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

    <!-- image zoom lightbox -->
    <ClientOnly>
      <Teleport to="body">
        <Transition
          enter-active-class="transition-opacity duration-200 ease-out"
          enter-from-class="opacity-0"
          leave-active-class="transition-opacity duration-150 ease-in"
          leave-to-class="opacity-0"
        >
          <div
            v-if="zoomOpen"
            class="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-ink/92 p-4 backdrop-blur-sm sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Preview"
            @click="closeZoom"
          >
            <img
              v-if="zoomSrc"
              :src="zoomSrc"
              :alt="zoomAlt"
              class="max-h-full max-w-full border border-line-strong object-contain shadow-2xl"
            />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-else class="lightbox-diagram" v-html="zoomSvg" />
            <button
              type="button"
              class="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center border border-line-strong bg-surface/80 font-mono text-lg text-fg backdrop-blur transition-colors hover:border-acid/50 hover:text-acid"
              aria-label="Close preview"
              @click.stop="closeZoom"
            >
              ✕
            </button>
            <p class="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-haze">
              click anywhere · esc to close
            </p>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </div>
</template>
