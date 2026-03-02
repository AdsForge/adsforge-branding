import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPostBySlug } from '@/lib/blog'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

type Params = { slug: string }

export function generateStaticParams(): Params[] {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<Params> }
): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://adsforge.io/blog/${slug}`,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
      url: 'https://adsforge.io',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AdsForge AI',
      url: 'https://adsforge.io',
      logo: 'https://adsforge.io/logos/Color%20Dark%20-%20Logo.svg',
    },
    mainEntityOfPage: `https://adsforge.io/blog/${slug}`,
    keywords: post.tags.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20">
        <Link
          href="/blog"
          className="text-sm opacity-60 hover:opacity-100 transition-opacity"
        >
          &larr; Back to blog
        </Link>

        <article className="mt-8">
          <header>
            <time
              dateTime={post.date}
              className="text-xs opacity-60 uppercase tracking-wide"
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <h1 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
              {post.title}
            </h1>
            <p className="mt-3 text-lg opacity-70">{post.description}</p>
            {post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs opacity-70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="prose prose-invert prose-sm md:prose-base mt-10 max-w-none prose-headings:tracking-tight prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
