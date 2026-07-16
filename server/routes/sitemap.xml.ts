const BASE = 'https://losec.io'

export default defineEventHandler(async (event) => {
  const staticEntries = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    { path: '/blog', priority: '0.9', changefreq: 'weekly' },
    { path: '/member', priority: '0.6', changefreq: 'monthly' },
    { path: '/contact', priority: '0.5', changefreq: 'yearly' },
  ]

  const pubs = await getPublications().catch(() => [])
  const postEntries = pubs.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: p.date,
  }))

  const urls = [...staticEntries, ...postEntries]
    .map((u) => {
      const loc = `${BASE}${u.path === '/' ? '/' : u.path}`
      const lastmod = 'lastmod' in u && u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''
      return `  <url>\n    <loc>${loc}</loc>${lastmod}\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return xml
})
