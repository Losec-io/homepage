import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js/lib/core'

// Register a curated set of languages (core keeps the server bundle small and
// avoids OOM from bundling all ~190 grammars). Aliases (js, py, sh, yml, html…)
// register automatically with each language.
import plaintext from 'highlight.js/lib/languages/plaintext'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import python from 'highlight.js/lib/languages/python'
import bash from 'highlight.js/lib/languages/bash'
import shell from 'highlight.js/lib/languages/shell'
import json from 'highlight.js/lib/languages/json'
import yaml from 'highlight.js/lib/languages/yaml'
import xml from 'highlight.js/lib/languages/xml'
import cLang from 'highlight.js/lib/languages/c'
import cpp from 'highlight.js/lib/languages/cpp'
import csharp from 'highlight.js/lib/languages/csharp'
import go from 'highlight.js/lib/languages/go'
import rust from 'highlight.js/lib/languages/rust'
import java from 'highlight.js/lib/languages/java'
import php from 'highlight.js/lib/languages/php'
import ruby from 'highlight.js/lib/languages/ruby'
import sql from 'highlight.js/lib/languages/sql'
import diff from 'highlight.js/lib/languages/diff'
import http from 'highlight.js/lib/languages/http'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import ini from 'highlight.js/lib/languages/ini'
import powershell from 'highlight.js/lib/languages/powershell'
import x86asm from 'highlight.js/lib/languages/x86asm'
import markdown from 'highlight.js/lib/languages/markdown'

for (const [name, def] of Object.entries({
  plaintext, javascript, typescript, python, bash, shell, json, yaml, xml,
  c: cLang, cpp, csharp, go, rust, java, php, ruby, sql, diff, http,
  dockerfile, ini, powershell, x86asm, markdown,
})) {
  hljs.registerLanguage(name, def)
}

// Pulls the real research blog from the decoupled Losec-io/blogs repo.
// publications.json holds the metadata (same idea as content/blog.json); each
// post's body lives in <path>/README.md with images relative to that folder.
// Markdown → HTML (with fenced-code syntax highlighting) happens here, server
// side, so highlight.js never ships to the browser bundle.
marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
      try {
        return hljs.highlight(code, { language }).value
      } catch {
        return hljs.highlight(code, { language: 'plaintext' }).value
      }
    },
  }),
)
marked.setOptions({ gfm: true, breaks: false })

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
  bodyHtml: string
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

  const bodyHtml = marked.parse(body) as string
  return { ...toMeta(p), body, bodyHtml }
}
