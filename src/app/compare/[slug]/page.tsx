import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { comparisons, getComparison, getAllComparisonSlugs } from '@/data/comparisons'
import { getPeptide } from '@/data/peptides'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ComparisonTable } from '@/components/ComparisonTable'
import { AuthorBio } from '@/components/AuthorBio'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ArticleSchema } from '@/components/SchemaMarkup'

export function generateStaticParams() {
  return getAllComparisonSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const comparison = getComparison(slug)
  if (!comparison) return { title: 'Not Found' }
  return {
    title: comparison.title,
    description: comparison.metaDescription,
  }
}

export default async function ComparisonDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const comparison = getComparison(slug)
  if (!comparison) notFound()

  const peptideA = getPeptide(comparison.peptideA)
  const peptideB = getPeptide(comparison.peptideB)
  const peptideC = comparison.peptideC ? getPeptide(comparison.peptideC) : null

  return (
    <>
      <ArticleSchema
        title={comparison.title}
        description={comparison.metaDescription}
        url={`/compare/${comparison.slug}`}
      />

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Compare', href: '/compare' },
            { name: comparison.title, href: `/compare/${comparison.slug}` },
          ]}
        />

        <h1 className="text-3xl font-light text-foreground">{comparison.title}</h1>
        <p className="mt-3 text-muted">{comparison.metaDescription}</p>

        {comparison.winner && (
          <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
            <p className="text-sm font-medium text-green-700">Bottom Line</p>
            <p className="mt-1 text-sm text-foreground">
              Based on current research, <span className="font-semibold text-green-700">{comparison.winner}</span> comes
              out ahead in this comparison. See the full breakdown below for context — the best choice depends on your
              specific situation.
            </p>
          </div>
        )}

        {/* Comparison Table */}
        <div className="mt-8 rounded-xl border border-border overflow-hidden">
          <ComparisonTable comparison={comparison} />
        </div>

        {/* Links to peptide pages */}
        <div className="mt-10">
          <h2 className="text-xl text-foreground">Learn more about each peptide</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {peptideA && (
              <Link
                href={`/peptides/${peptideA.slug}`}
                className="rounded-xl border border-border bg-card p-4 transition-all hover:border-accent"
              >
                <p className="text-sm font-medium text-accent">{peptideA.name}</p>
                <p className="mt-1 text-xs text-muted line-clamp-2">{peptideA.description}</p>
              </Link>
            )}
            {peptideB && (
              <Link
                href={`/peptides/${peptideB.slug}`}
                className="rounded-xl border border-border bg-card p-4 transition-all hover:border-accent"
              >
                <p className="text-sm font-medium text-purple-600">{peptideB.name}</p>
                <p className="mt-1 text-xs text-muted line-clamp-2">{peptideB.description}</p>
              </Link>
            )}
            {peptideC && (
              <Link
                href={`/peptides/${peptideC.slug}`}
                className="rounded-xl border border-border bg-card p-4 transition-all hover:border-accent"
              >
                <p className="text-sm font-medium text-amber-600">{peptideC.name}</p>
                <p className="mt-1 text-xs text-muted line-clamp-2">{peptideC.description}</p>
              </Link>
            )}
          </div>
        </div>

        {/* Other comparisons */}
        <div className="mt-10">
          <h2 className="text-xl text-foreground">More comparisons</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {comparisons
              .filter((c) => c.slug !== comparison.slug)
              .slice(0, 4)
              .map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/compare/${comp.slug}`}
                  className="rounded-xl border border-border bg-card p-4 transition-all hover:border-accent"
                >
                  <p className="text-sm font-medium text-foreground">{comp.title}</p>
                </Link>
              ))}
          </div>
        </div>

        <div className="mt-8">
          <NewsletterSignup />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <AuthorBio />
        </div>

        <div className="mt-6 rounded-xl border border-warm-sand bg-[#FEF9EC] p-5">
          <p className="text-xs text-[#6B5A40]">
            <span className="font-medium">Medical Disclaimer:</span> This comparison is for informational purposes only.
            Individual responses vary. Always consult a qualified healthcare provider before starting any peptide protocol.
          </p>
        </div>
      </div>
    </>
  )
}
