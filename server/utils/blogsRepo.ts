// Pulls the real research blog from the decoupled Losec-io/blogs repo.
// publications.json holds the metadata (same idea as content/blog.json); each
// post's body lives in <path>/README.md with images relative to that folder.

interface RawPub {
  title: string
  slug: string
  path: string
  excerpt: string
  tags?: string[]
  category: string
  date: string
  author: string
  thumbnail?: string
  time?: string
  readTime?: string
}

export interface PubMeta {
  title: string
  slug: string
  excerpt: string
  tags: string[]
  category: string
  date: string
  author: string
  readTime: string
  thumbnail: string | null
}

export interface PubFull extends PubMeta {
  body: string
}

const REPO = 'https://raw.githubusercontent.com/Losec-io/blogs/main'

// Cache the index for the lifetime of the server instance (one fetch per build
// prerender pass / per serverless cold start).
let indexCache: Promise<RawPub[]> | null = null
function rawIndex(): Promise<RawPub[]> {
  if (!indexCache) {
    indexCache = $fetch<RawPub[]>(`${REPO}/publications.json`, { responseType: 'json' })
      .then((v) => (Array.isArray(v) ? v : []))
      .catch(() => [])
  }
  return indexCache
}

function toMeta(p: RawPub): PubMeta {
  return {
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    tags: p.tags ?? [],
    category: p.category,
    date: p.date,
    author: p.author,
    readTime: p.time ?? p.readTime ?? '',
    thumbnail: p.thumbnail ? `${REPO}/${p.thumbnail}` : null,
  }
}

export async function getPublications(): Promise<PubMeta[]> {
  const list = await rawIndex()
  return [...list]
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))
    .map(toMeta)
}

export async function getPublication(slug: string): Promise<PubFull | null> {
  const list = await rawIndex()
  const p = list.find((x) => x.slug === slug)
  if (!p) return null

  const md = await $fetch<string>(`${REPO}/${p.path}/README.md`, {
    responseType: 'text',
  }).catch(() => '')

  const base = `${REPO}/${p.path}`
  const body = md
    // the page renders the title itself — drop a leading H1 to avoid duplicates
    .replace(/^﻿?\s*#\s+[^\n]*\r?\n+/, '')
    // rewrite relative image paths to absolute raw URLs
    .replace(
      /!\[([^\]]*)\]\(\s*(?!https?:\/\/|\/)([^)\s]+)\s*\)/g,
      (_m, alt: string, src: string) => `![${alt}](${base}/${src.replace(/^\.\//, '')})`,
    )

  return { ...toMeta(p), body }
}
