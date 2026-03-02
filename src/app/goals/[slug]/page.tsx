import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { goals, getGoal, getAllGoalSlugs } from '@/data/goals'
import { getPeptide } from '@/data/peptides'
import { getStacksByGoal } from '@/data/stacks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { PeptideCard } from '@/components/PeptideCard'
import { AuthorBio } from '@/components/AuthorBio'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ArticleSchema } from '@/components/SchemaMarkup'

export function generateStaticParams() {
  return getAllGoalSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const goal = getGoal(slug)
  if (!goal) return { title: 'Not Found' }
  return {
    title: `Best Peptides for ${goal.name} — Evidence-Based Recommendations`,
    description: goal.metaDescription,
  }
}

export default async function GoalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const goal = getGoal(slug)
  if (!goal) notFound()

  const topPeptides = goal.topPeptides.map((slug) => getPeptide(slug)).filter(Boolean)
  const relatedStacks = getStacksByGoal(goal.slug)
  const otherGoals = goals.filter((g) => g.slug !== goal.slug)

  return (
    <>
      <ArticleSchema
        title={`Best Peptides for ${goal.name}`}
        description={goal.metaDescription}
        url={`/goals/${goal.slug}`}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Goals', href: '/goals' },
            { name: goal.name, href: `/goals/${goal.slug}` },
          ]}
        />

        <h1 className="text-3xl font-light text-foreground">Best peptides for {goal.name.toLowerCase()}</h1>
        <p className="mt-3 text-muted">{goal.description}</p>

        {/* Key considerations */}
        <div className="mt-8 rounded-xl border border-accent/20 bg-soft-sky/30 p-5">
          <p className="text-sm font-medium text-accent">What to know</p>
          <p className="mt-2 text-sm text-foreground leading-relaxed">{goal.considerations}</p>
        </div>

        {/* Top peptides */}
        <section className="mt-10">
          <h2 className="text-xl text-foreground">Recommended peptides</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {topPeptides.map((peptide) =>
              peptide ? <PeptideCard key={peptide.slug} peptide={peptide} /> : null
            )}
          </div>
        </section>

        {/* Related stacks */}
        {relatedStacks.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Recommended stacks</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedStacks.map((stack) => (
                <Link
                  key={stack.slug}
                  href={`/stacks/${stack.slug}`}
                  className="rounded-xl border border-border bg-card p-4 transition-all hover:border-accent"
                >
                  <p className="text-sm font-medium text-primary">{stack.name}</p>
                  <p className="mt-1 text-xs text-muted">{stack.difficulty} — {stack.estimatedMonthlyCost}</p>
                  <p className="mt-2 text-xs text-muted line-clamp-2">{stack.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Other goals */}
        <section className="mt-10">
          <h2 className="text-xl text-foreground">Explore other goals</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {otherGoals.map((g) => (
              <Link
                key={g.slug}
                href={`/goals/${g.slug}`}
                className="rounded-full border border-border px-3 py-1 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
              >
                {g.name}
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <NewsletterSignup />
        </div>

        <div className="mt-6">
          <AuthorBio />
        </div>
      </div>
    </>
  )
}
