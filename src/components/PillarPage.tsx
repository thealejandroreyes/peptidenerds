import Link from 'next/link'
import { getPillarContent } from '@/lib/pillars'
import { getPostsByPillar } from '@/lib/blog'
import { getPeptide } from '@/data/peptides'
import { getComparison } from '@/data/comparisons'
import { getStack } from '@/data/stacks'
import { getGoal } from '@/data/goals'
import type { PillarConfig } from '@/data/pillars'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TableOfContents } from '@/components/TableOfContents'
import { PeptideCard } from '@/components/PeptideCard'
import { FAQAccordion } from '@/components/FAQAccordion'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { MedicalWebPageSchema, FAQSchema } from '@/components/SchemaMarkup'
import { formatDate } from '@/lib/utils'

function addHeadingIds(html: string): string {
  return html.replace(/<h2([^>]*)>(.*?)<\/h2>/gi, (_match, attrs, text) => {
    const plainText = text.replace(/<[^>]+>/g, '').trim()
    const id = plainText
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    return `<h2${attrs} id="${id}">${text}</h2>`
  })
}

export function PillarPage({ config }: { config: PillarConfig }) {
  const content = getPillarContent(config.slug)
  if (!content) return null

  const posts = getPostsByPillar(config.pillarKey)
  const peptides = config.relatedPeptides.map(getPeptide).filter(Boolean)
  const comparisons = config.relatedComparisons.map(getComparison).filter(Boolean)
  const stacks = config.relatedStacks.map(getStack).filter(Boolean)
  const goals = config.relatedGoals.map(getGoal).filter(Boolean)

  const htmlWithIds = addHeadingIds(content.htmlContent)

  return (
    <>
      <MedicalWebPageSchema
        title={config.title}
        description={config.metaDescription}
        url={`/${config.slug}`}
      />
      {config.faqs.length > 0 && <FAQSchema faqs={config.faqs} />}

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Guides', href: '/start-here' },
            { name: config.title.split(':')[0], href: `/${config.slug}` },
          ]}
        />

        {/* Hero */}
        <h1 className="text-3xl font-light leading-tight text-foreground sm:text-4xl">
          {config.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{config.heroDescription}</p>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
          <span>Last updated: {content.lastUpdated}</span>
          <span className="text-border">&middot;</span>
          <span>{content.readingTime}</span>
          <span className="text-border">&middot;</span>
          <span>{content.wordCount.toLocaleString()} words</span>
        </div>

        {/* Key Takeaway */}
        <div className="mt-8 rounded-xl border border-accent/20 bg-soft-sky p-5">
          <p className="text-sm font-semibold text-accent">Key Takeaway</p>
          <p className="mt-1 text-sm text-foreground">
            This guide covers everything you need to know about{' '}
            {config.title.split(':')[0].toLowerCase()}. Scroll to any section using the table of
            contents, or browse related articles at the bottom.
          </p>
        </div>

        {/* TOC + Content layout */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_240px]">
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: htmlWithIds }}
          />
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <TableOfContents html={htmlWithIds} />
            </div>
          </aside>
        </div>

        {/* Cluster posts */}
        {posts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-light text-foreground">Related Articles</h2>
            <p className="mt-2 text-sm text-muted">
              Deep dives and guides in this topic area.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:bg-card-hover"
                >
                  <p className="font-medium text-primary group-hover:text-accent transition-colors">
                    {post.title}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    {formatDate(post.date)} &middot; {post.reading_time}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related peptides */}
        {peptides.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-light text-foreground">Related Compounds</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {peptides.map((p) => (
                <PeptideCard key={p!.slug} peptide={p!} />
              ))}
            </div>
          </section>
        )}

        {/* Related comparisons */}
        {comparisons.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-light text-foreground">Head-to-Head Comparisons</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {comparisons.map((c) => (
                <Link
                  key={c!.slug}
                  href={`/compare/${c!.slug}`}
                  className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:bg-card-hover"
                >
                  <p className="font-medium text-primary group-hover:text-accent transition-colors">
                    {c!.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related stacks */}
        {stacks.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-light text-foreground">Related Stacks</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {stacks.map((s) => (
                <Link
                  key={s!.slug}
                  href={`/stacks/${s!.slug}`}
                  className="group block rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:bg-card-hover"
                >
                  <p className="font-medium text-primary group-hover:text-accent transition-colors">
                    {s!.name}
                  </p>
                  <p className="mt-1 text-sm text-muted line-clamp-2">{s!.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related goals */}
        {goals.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-light text-foreground">Related Goals</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {goals.map((g) => (
                <Link
                  key={g!.slug}
                  href={`/goals/${g!.slug}`}
                  className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-accent hover:bg-card-hover"
                >
                  <p className="font-medium text-primary group-hover:text-accent transition-colors">
                    {g!.name}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related tools */}
        {config.relatedTools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-light text-foreground">Helpful Tools</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {config.relatedTools.map((tool) => (
                <Link
                  key={tool}
                  href={`/tools/${tool}`}
                  className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-accent hover:bg-card-hover"
                >
                  <p className="font-medium text-primary group-hover:text-accent transition-colors capitalize">
                    {tool.replace(/-/g, ' ')}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        {config.faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-light text-foreground">Frequently Asked Questions</h2>
            <div className="mt-6">
              <FAQAccordion faqs={config.faqs} />
            </div>
          </section>
        )}

        {/* Newsletter */}
        <div className="mt-16">
          <NewsletterSignup />
        </div>

        {/* Medical disclaimer */}
        <p className="mt-8 text-xs text-muted">
          This content is for educational and informational purposes only. It is not medical advice.
          Always consult a qualified healthcare provider before starting any peptide protocol. See
          our{' '}
          <Link href="/disclaimer" className="text-accent hover:underline">
            full medical disclaimer
          </Link>
          .
        </p>
      </article>
    </>
  )
}
