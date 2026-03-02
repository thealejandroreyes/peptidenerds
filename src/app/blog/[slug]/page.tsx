import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllSlugs, getPost, getRelatedPosts } from '@/lib/blog'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AuthorBio } from '@/components/AuthorBio'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ArticleSchema, FAQSchema } from '@/components/SchemaMarkup'
import { formatDate } from '@/lib/utils'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost(params.slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: post.meta_title,
    description: post.meta_description,
    openGraph: {
      title: post.meta_title,
      description: post.meta_description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  }
}

function extractFAQs(html: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = []
  const faqSectionMatch = html.match(/<h2[^>]*>.*?FAQ.*?<\/h2>([\s\S]*?)(?=<h2|$)/i)
  if (!faqSectionMatch) return faqs

  const faqHtml = faqSectionMatch[1]
  const questionMatches = faqHtml.matchAll(/<h3[^>]*>(.*?)<\/h3>\s*([\s\S]*?)(?=<h3|$)/g)

  for (const match of questionMatches) {
    const question = match[1].replace(/<[^>]+>/g, '').trim()
    const answer = match[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
    if (question && answer) {
      faqs.push({ question, answer })
    }
  }

  return faqs
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(params.slug, 3)
  const faqs = extractFAQs(post.htmlContent)

  const pillarLabels: Record<string, string> = {
    'glp-1-peptides': 'GLP-1 Peptides',
    'healing-peptides': 'Healing Peptides',
    'peptide-how-to': 'How-To',
    'peptide-research': 'Research',
    'peptide-comparisons': 'Comparisons',
    'peptide-safety': 'Safety',
    'master-guide': 'Master Guide',
  }

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.meta_description}
        url={`/blog/${post.slug}`}
        datePublished={post.date}
        dateModified={post.date}
      />
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}

      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Blog', href: '/blog' },
            { name: post.title, href: `/blog/${post.slug}` },
          ]}
        />

        {/* Meta bar */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
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

        {/* Title */}
        <h1 className="mt-4 text-3xl font-light leading-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>

        {/* Author */}
        <div className="mt-6">
          <AuthorBio />
        </div>

        {/* Body */}
        <div
          className="prose-custom mt-10"
          dangerouslySetInnerHTML={{ __html: post.htmlContent }}
        />

        {/* Newsletter CTA */}
        <div className="mt-12">
          <NewsletterSignup />
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl text-foreground">Related articles</h2>
            <div className="mt-4 grid gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="block rounded-lg border border-border p-4 transition-colors hover:border-accent hover:bg-card"
                >
                  <p className="font-medium text-foreground">{r.title}</p>
                  <p className="mt-1 text-xs text-muted">
                    {formatDate(r.date)} &middot; {r.reading_time}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  )
}
