const BASE = 'https://losec.io'

const esc = (s: string) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

function rfc822(date: string): string {
  const d = new Date(String(date).split(' ')[0])
  return Number.isNaN(d.getTime()) ? '' : d.toUTCString()
}

export default defineEventHandler(async (event) => {
  const pubs = await getPublications().catch(() => [])

  const items = pubs
    .map((p) => {
      const link = `${BASE}/blog/${p.slug}`
      const cats = (p.tags || []).map((t) => `\n      <category>${esc(t)}</category>`).join('')
      const pub = rfc822(p.date)
      return (
        '    <item>\n' +
        `      <title>${esc(p.title)}</title>\n` +
        `      <link>${link}</link>\n` +
        `      <guid isPermaLink="true">${link}</guid>\n` +
        (pub ? `      <pubDate>${pub}</pubDate>\n` : '') +
        `      <dc:creator>${esc(p.author)}</dc:creator>\n` +
        `      <description>${esc(p.excerpt)}</description>${cats}\n` +
        '    </item>'
      )
    })
    .join('\n')

  const lastBuild = pubs[0] ? rfc822(pubs[0].date) : ''

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">\n' +
    '  <channel>\n' +
    '    <title>LoSec — Research Blog</title>\n' +
    `    <link>${BASE}/blog</link>\n` +
    `    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml" />\n` +
    '    <description>Deep technical write-ups, exploit chains and research methodology from the LoSec AI security research lab.</description>\n' +
    '    <language>en</language>\n' +
    (lastBuild ? `    <lastBuildDate>${lastBuild}</lastBuildDate>\n` : '') +
    `${items}\n` +
    '  </channel>\n' +
    '</rss>\n'

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return xml
})
