// Minimal static file server for previewing the prerendered output.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { join, extname } from 'node:path'

const ROOT = join(process.cwd(), '.vercel', 'output', 'static')
const PORT = Number(process.env.PORT || 4321)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
}

async function resolve(pathname) {
  let p = decodeURIComponent(pathname.split('?')[0])
  if (p.endsWith('/')) p += 'index.html'
  let full = join(ROOT, p)
  try {
    const s = await stat(full)
    if (s.isDirectory()) full = join(full, 'index.html')
    return full
  } catch {
    // fall back to <path>/index.html (Nuxt route dirs)
    try {
      const alt = join(ROOT, p, 'index.html')
      await stat(alt)
      return alt
    } catch {
      return join(ROOT, '404.html')
    }
  }
}

createServer(async (req, res) => {
  const file = await resolve(req.url || '/')
  try {
    const data = await readFile(file)
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' })
    res.end(data)
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('Not found')
  }
}).listen(PORT, () => console.log(`static server on http://localhost:${PORT}`))
