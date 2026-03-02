import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  content: string
}

export type BlogPostMeta = Omit<BlogPost, 'content'>

export function getAllPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.mdx'))

  const posts = files.map(file => {
    const slug = file.replace(/\.mdx$/, '')
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
    const { data } = matter(raw)

    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ?? new Date().toISOString(),
      author: data.author ?? 'AdsForge AI',
      tags: data.tags ?? [],
    }
  })

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? '',
    date: data.date ?? new Date().toISOString(),
    author: data.author ?? 'AdsForge AI',
    tags: data.tags ?? [],
    content,
  }
}
