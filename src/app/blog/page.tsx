import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on AI-powered advertising, Meta Ads automation, and digital marketing strategies from the AdsForge AI team.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'AdsForge AI Blog',
    description:
      'Insights on AI-powered advertising, Meta Ads automation, and digital marketing strategies.',
    type: 'website',
    url: 'https://adsforge.io/blog',
  },
}

export default function BlogIndex() {
  const posts = getAllPosts()

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-20">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Blog
        </h1>
        <p className="mt-3 opacity-80 max-w-2xl">
          Insights on AI-powered advertising, campaign automation, and digital
          marketing strategies.
        </p>

        {posts.length === 0 ? (
          <p className="mt-12 opacity-60">
            Posts coming soon. Stay tuned!
          </p>
        ) : (
          <div className="mt-12 space-y-8">
            {posts.map(post => (
              <article
                key={post.slug}
                className="group rounded-xl border border-white/10 bg-white/5 p-6 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
              >
                <Link href={`/blog/${post.slug}`} className="block">
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
                  <h2 className="mt-2 text-xl font-medium group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm opacity-70">{post.description}</p>
                  {post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
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
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
