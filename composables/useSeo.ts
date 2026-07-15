interface SeoInput {
  title?: string
  /** override the OG/Twitter title (defaults to `title`) */
  socialTitle?: string
  description?: string
  /** absolute URL or root-relative path; defaults to the site OG image */
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
  /** one or more schema.org JSON-LD blocks to inject */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Centralised per-page SEO: sets a unique canonical + og:url for the current
 * route, page title/description, Open Graph + Twitter tags, and optional
 * JSON-LD structured data. Site-level defaults live in nuxt.config.
 */
export function useSeo(input: SeoInput = {}) {
  const route = useRoute()
  const path = route.path.replace(/\/+$/, '') // strip trailing slash
  const url = `${siteConfig.url}${path === '' ? '/' : path}`
  const image = input.image
    ? input.image.startsWith('http')
      ? input.image
      : `${siteConfig.url}${input.image}`
    : `${siteConfig.url}/og-image-1200x630.png`

  const socialTitle = input.socialTitle ?? input.title

  useSeoMeta({
    title: input.title,
    description: input.description,
    ogTitle: socialTitle,
    ogDescription: input.description,
    ogType: input.type ?? 'website',
    ogUrl: url,
    ogImage: image,
    twitterTitle: socialTitle,
    twitterDescription: input.description,
    twitterImage: image,
    robots: input.noindex ? 'noindex, nofollow' : 'index, follow',
  })

  const head: Parameters<typeof useHead>[0] = {
    link: [{ rel: 'canonical', href: url }],
  }

  if (input.jsonLd) {
    const blocks = Array.isArray(input.jsonLd) ? input.jsonLd : [input.jsonLd]
    head.script = blocks.map((block) => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(block),
    }))
  }

  useHead(head)

  return { url, image }
}
