import posts from '~/content/blog.json'

export interface BlogPost {
  title: string
  slug: string
  excerpt: string
  tags: string[]
  category: string
  date: string
  author: string
  readTime: string
  body: string
}

// newest first
export const blogPosts: BlogPost[] = [...(posts as BlogPost[])].sort((a, b) =>
  b.date.localeCompare(a.date),
)

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function relatedPosts(slug: string, n = 2): BlogPost[] {
  return blogPosts.filter((p) => p.slug !== slug).slice(0, n)
}
