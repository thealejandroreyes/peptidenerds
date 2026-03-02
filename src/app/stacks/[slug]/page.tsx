import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { stacks, getStack, getAllStackSlugs } from '@/data/stacks'
import { getPeptide } from '@/data/peptides'
import { getGoal } from '@/data/goals'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AuthorBio } from '@/components/AuthorBio'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ArticleSchema } from '@/components/SchemaMarkup'

export function generateStaticParams() {
  return getAllStackSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const stack = getStack(params.slug)
  if (!stack) return { title: 'Not Found' }
  return {
    title: `${stack.name} — Peptide Stack Protocol`,
    description: stack.metaDescription,
  }
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-green-50 text-green-700 border-green-200',
  intermediate: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  advanced: 'bg-red-50 text-red-700 border-red-200',
}

export default function StackDetailPage({ params }: { params: { slug: string } }) {
  const stack = getStack(params.slug)
  if (!stack) notFound()

  const relatedGoals = stack.goals.map((slug) => getGoal(slug)).filter(Boolean)

  return (
    <>
      <ArticleSchema
        title={stack.name}
        description={stack.metaDescription}
        url={`/stacks/${stack.slug}`}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Stacks', href: '/stacks' },
            { name: stack.name, href: `/stacks/${stack.slug}` },
          ]}
        />

        <h1 className="text-3xl font-light text-foreground">{stack.name}</h1>
        <p className="mt-3 text-muted">{stack.description}</p>

        {/* Quick stats */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted uppercase tracking-wider">Difficulty</p>
            <p className="mt-1">
              <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${difficultyColors[stack.difficulty]}`}>
                {stack.difficulty}
              </span>
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted uppercase tracking-wider">Est. Cost</p>
            <p className="mt-1 text-sm font-medium text-foreground">{stack.estimatedMonthlyCost}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted uppercase tracking-wider">Duration</p>
            <p className="mt-1 text-sm font-medium text-foreground">{stack.duration}</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-muted uppercase tracking-wider">Peptides</p>
            <p className="mt-1 text-sm font-medium text-foreground">{stack.peptides.length} compounds</p>
          </div>
        </div>

        {/* Peptide protocol table */}
        <section className="mt-10">
          <h2 className="text-xl text-foreground">Protocol</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Peptide</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Dose</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Frequency</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Timing</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Role</th>
                </tr>
              </thead>
              <tbody>
                {stack.peptides.map((entry, i) => {
                  const peptide = getPeptide(entry.peptide)
                  return (
                    <tr key={i} className={i % 2 === 0 ? 'bg-pearl/50' : ''}>
                      <td className="px-4 py-3 text-sm">
                        {peptide ? (
                          <Link href={`/peptides/${peptide.slug}`} className="text-accent hover:text-accent-hover">
                            {peptide.name}
                          </Link>
                        ) : (
                          <span className="text-foreground">{entry.peptide}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted">{entry.dose}</td>
                      <td className="px-4 py-3 text-sm text-muted">{entry.frequency}</td>
                      <td className="px-4 py-3 text-sm text-muted">{entry.timing}</td>
                      <td className="px-4 py-3 text-sm text-muted">{entry.role}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Notes */}
        <section className="mt-10">
          <h2 className="text-xl text-foreground">Notes</h2>
          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <p className="text-sm text-muted leading-relaxed">{stack.notes}</p>
          </div>
        </section>

        {/* Related goals */}
        {relatedGoals.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Related goals</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedGoals.map((goal) =>
                goal ? (
                  <Link
                    key={goal.slug}
                    href={`/goals/${goal.slug}`}
                    className="rounded-full border border-border px-3 py-1 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {goal.name}
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

        {/* Other stacks */}
        <section className="mt-10">
          <h2 className="text-xl text-foreground">More stacks</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {stacks
              .filter((s) => s.slug !== stack.slug)
              .slice(0, 4)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/stacks/${s.slug}`}
                  className="rounded-xl border border-border bg-card p-4 transition-all hover:border-accent"
                >
                  <p className="text-sm font-medium text-primary">{s.name}</p>
                  <p className="mt-1 text-xs text-muted">{s.difficulty} — {s.estimatedMonthlyCost}</p>
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

        <div className="mt-6 rounded-xl border border-warm-sand bg-[#FEF9EC] p-5">
          <p className="text-xs text-[#6B5A40]">
            <span className="font-medium">Medical Disclaimer:</span> Peptide stacks are not FDA-approved protocols.
            This information is for educational purposes only. Consult a qualified healthcare provider before combining
            any peptides.
          </p>
        </div>
      </div>
    </>
  )
}
