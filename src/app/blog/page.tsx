import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog — Peptide Research, Protocols, and Journey Updates',
  description:
    'Latest articles on peptide research, weight loss protocols, community insights, and personal journey updates from @fatmaninthearena.',
}

const pillarLabels: Record<string, string> = {
  'glp-1-peptides': 'GLP-1 Peptides',
  'healing-peptides': 'Healing Peptides',
  'peptide-how-to': 'How-To',
  'peptide-research': 'Research',
  'peptide-comparisons': 'Comparisons',
  'peptide-safety': 'Safety',
  'master-guide': 'Master Guide',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }]} />

      <h1 className="text-3xl font-bold text-foreground">Blog</h1>
      <p className="mt-3 text-muted">
        Research breakdowns, protocol deep dives, and journey updates. New articles published weekly.
      </p>

      {posts.length === 0 ? (
        <div className="mt-12 rounded-xl border border-border bg-card p-10 text-center">
          <p className="text-lg font-semibold text-foreground">Articles are coming soon</p>
          <p className="mt-2 text-sm text-muted">
            We are building out the research library. Subscribe to get notified when new articles drop.
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-border p-6 transition-colors hover:border-accent hover:bg-card"
            >
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {post.pillar && (
                  <>
                    <span className="text-border">&middot;</span>
                    <span className="rounded-full border border-accent/20 bg-soft-sky px-2 py-0.5 text-accent">
                      {pillarLabels[post.pillar] || post.pillar}
                    </span>
                  </>
                )}
                <span className="text-border">&middot;</span>
                <span>{post.reading_time}</span>
              </div>
              <h2 className="mt-2 text-xl font-semibold text-foreground">{post.title}</h2>
              <p className="mt-2 text-sm text-muted line-clamp-2">{post.meta_description}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        <NewsletterSignup />
      </div>
    </div>
  )
}
