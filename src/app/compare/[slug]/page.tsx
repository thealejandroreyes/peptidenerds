import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { comparisons, getComparison, getAllComparisonSlugs, getRelatedComparisons } from '@/data/comparisons'
import { getPeptide } from '@/data/peptides'
import { getComparisonContent } from '@/lib/comparisons'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { ComparisonTable } from '@/components/ComparisonTable'
import { VerdictBoxes } from '@/components/VerdictBoxes'
import { CitationsSection } from '@/components/CitationsSection'
import { ComparisonTOC } from '@/components/ComparisonTOC'
import { RelatedComparisons } from '@/components/RelatedComparisons'
import { FAQAccordion } from '@/components/FAQAccordion'
import { AuthorBio } from '@/components/AuthorBio'
import { InlineContentCTA } from '@/components/InlineContentCTA'
import { LeadMagnetCTA } from '@/components/LeadMagnetCTA'
import { MedicalWebPageSchema, FAQSchema, BreadcrumbSchema } from '@/components/SchemaMarkup'

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
  const editorial = comparison.hasEditorialContent ? getComparisonContent(slug) : null
  const related = getRelatedComparisons(slug)

  // Build TOC items
  const tocItems: { id: string; title: string }[] = [
    { id: 'comparison-table', title: 'Head-to-Head Comparison' },
  ]
  if (editorial) {
    for (const section of editorial.sections) {
      tocItems.push(section)
    }
  }
  if (comparison.verdicts.length > 0) {
    tocItems.push({ id: 'verdict', title: 'Which Should You Choose?' })
  }
  if (comparison.faqs.length > 0) {
    tocItems.push({ id: 'faq', title: 'Frequently Asked Questions' })
  }
  if (comparison.citations.length > 0) {
    tocItems.push({ id: 'references', title: 'References' })
  }

  return (
    <>
      <MedicalWebPageSchema
        title={comparison.title}
        description={comparison.metaDescription}
        url={`/compare/${comparison.slug}`}
      />
      {comparison.faqs.length > 0 && <FAQSchema faqs={comparison.faqs} />}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Compare', url: '/compare' },
          { name: comparison.title, url: `/compare/${comparison.slug}` },
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Compare', href: '/compare' },
            { name: comparison.title, href: `/compare/${comparison.slug}` },
          ]}
        />

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
          {/* Main content */}
          <div className="min-w-0">
            <h1 className="text-3xl font-light text-foreground">{comparison.title}</h1>

            <div className="mt-3 flex items-center justify-between">
              <AuthorBio />
              {comparison.lastUpdated && (
                <span className="text-xs text-muted">
                  Updated {new Date(comparison.lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>

            {/* Key Takeaway */}
            <div className="mt-6 rounded-xl border-l-4 border-l-accent border border-border bg-accent/5 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent">Key Takeaway</p>
              <p className="mt-2 text-sm text-foreground leading-relaxed">{comparison.keyTakeaway}</p>
            </div>

            {/* Mobile TOC */}
            <div className="mt-6 lg:hidden">
              <ComparisonTOC items={tocItems} />
            </div>

            {/* Comparison Table */}
            <div className="mt-8">
              <h2 className="text-xl text-foreground" id="comparison-table">Head-to-Head Comparison</h2>
              <div className="mt-4 rounded-xl border border-border overflow-hidden">
                <ComparisonTable comparison={comparison} />
              </div>
            </div>

            {/* Editorial prose (from markdown) */}
            {editorial && (
              <div
                className="mt-10 prose prose-sm max-w-none prose-headings:text-foreground prose-headings:font-light prose-p:text-muted prose-p:leading-relaxed prose-a:text-accent prose-strong:text-foreground prose-li:text-muted"
                dangerouslySetInnerHTML={{ __html: editorial.htmlContent }}
              />
            )}

            {/* Verdict Boxes */}
            {comparison.verdicts.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl text-foreground" id="verdict">Which Should You Choose?</h2>
                <div className="mt-4">
                  <VerdictBoxes verdicts={comparison.verdicts} />
                </div>
              </div>
            )}

            {/* Inline CTA — after verdict */}
            <InlineContentCTA type="comparison" />

            {/* FAQ Section */}
            {comparison.faqs.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl text-foreground" id="faq">Frequently Asked Questions</h2>
                <div className="mt-4">
                  <FAQAccordion faqs={comparison.faqs} />
                </div>
              </div>
            )}

            {/* Citations */}
            {comparison.citations.length > 0 && (
              <div className="mt-10">
                <CitationsSection citations={comparison.citations} />
              </div>
            )}

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

            {/* Related Comparisons */}
            {related.length > 0 && (
              <div className="mt-10">
                <RelatedComparisons comparisons={related} />
              </div>
            )}

            <div className="mt-10">
              <LeadMagnetCTA variant="inline" utmSource={`compare-${comparison.slug}`} />
            </div>

            <div className="mt-6 rounded-xl border border-warm-sand bg-[#FEF9EC] p-5">
              <p className="text-xs text-[#6B5A40]">
                <span className="font-medium">Medical Disclaimer:</span> This comparison is for informational purposes only.
                Individual responses vary. Always consult a qualified healthcare provider before starting any peptide protocol.
              </p>
            </div>
          </div>

          {/* Desktop TOC sidebar */}
          <div className="hidden lg:block">
            <ComparisonTOC items={tocItems} />
          </div>
        </div>
      </div>
    </>
  )
}
