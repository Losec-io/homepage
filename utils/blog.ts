// Blog posts are sourced at build/prerender time from the Losec-io/blogs repo
// via the /api/publications routes. This is the client-facing shape.
export interface Publication {
  title: string
  slug: string
  excerpt: string
  tags: string[]
  category: string
  date: string
  author: string
  readTime: string
  thumbnail: string | null
  body?: string
}
