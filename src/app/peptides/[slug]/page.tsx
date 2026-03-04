import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { peptides, getPeptide, getAllSlugs } from '@/data/peptides'
import { getComparisonsByPeptide } from '@/data/comparisons'
import { getGoalsByPeptide } from '@/data/goals'
import { getStacksByPeptide } from '@/data/stacks'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { FAQAccordion } from '@/components/FAQAccordion'
import { AuthorBio } from '@/components/AuthorBio'
import { InlineContentCTA } from '@/components/InlineContentCTA'
import { LeadMagnetCTA } from '@/components/LeadMagnetCTA'
import { MedicalWebPageSchema, FAQSchema } from '@/components/SchemaMarkup'
import { ReadingProgress } from '@/components/ReadingProgress'
import { WhereToGet } from '@/components/WhereToGet'
import { RecommendedSupplies } from '@/components/RecommendedSupplies'
import { getCategoryLabel, getCategoryColor, getFdaStatusLabel, getFdaStatusColor } from '@/lib/utils'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const peptide = getPeptide(slug)
  if (!peptide) return { title: 'Not Found' }
  const year = new Date().getFullYear()
  return {
    title: `${peptide.name}: Benefits, Dosage, Side Effects & Research ${year}`,
    description: `Everything you need to know about ${peptide.name}: how it works, dosage protocols, side effects, and what the research actually says. Updated ${new Date().toLocaleString('en-US', { month: 'long' })} ${year}.`,
  }
}

export default async function PeptideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const peptide = getPeptide(slug)
  if (!peptide) notFound()

  const relatedComparisons = getComparisonsByPeptide(peptide.slug)
  const relatedGoals = getGoalsByPeptide(peptide.slug)
  const relatedStacks = getStacksByPeptide(peptide.slug)
  const relatedPeptides = peptide.relatedPeptides
    .map((slug) => getPeptide(slug))
    .filter(Boolean)

  return (
    <>
      <ReadingProgress />
      <MedicalWebPageSchema
        title={peptide.name}
        description={peptide.description}
        url={`/peptides/${peptide.slug}`}
      />
      {peptide.faq.length > 0 && <FAQSchema faqs={peptide.faq} />}

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Peptides', href: '/peptides' },
            { name: peptide.name, href: `/peptides/${peptide.slug}` },
          ]}
        />

        {/* Header */}
        <div className="flex flex-wrap items-start gap-3">
          <h1 className="text-3xl font-light text-foreground">{peptide.name}</h1>
          {peptide.abbreviation && (
            <span className="mt-1 text-lg text-muted">({peptide.abbreviation})</span>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getCategoryColor(peptide.category)}`}>
            {getCategoryLabel(peptide.category)}
          </span>
          <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getFdaStatusColor(peptide.fdaStatus)}`}>
            {getFdaStatusLabel(peptide.fdaStatus)}
          </span>
          <span className="inline-flex items-center rounded-full border border-border px-3 py-1 text-xs text-muted">
            {peptide.research.level} evidence
          </span>
          <Link
            href={`/tracker?peptide=${peptide.slug}`}
            className="inline-flex items-center rounded-full bg-cta px-6 py-3 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
          >
            Track This Protocol
          </Link>
        </div>

        {/* Author byline — small, trust signal only */}
        <div className="mt-4">
          <AuthorBio />
        </div>

        {/* Key Takeaway */}
        <div className="mt-6 rounded-xl border border-accent/20 bg-soft-sky/30 p-5">
          <p className="text-sm font-medium text-accent">Key Takeaway</p>
          <p className="mt-2 text-sm text-foreground leading-relaxed">{peptide.description}</p>
        </div>

        {/* Mechanism */}
        <section className="mt-10">
          <h2 className="text-xl text-foreground">How it works</h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">{peptide.mechanism}</p>
        </section>

        {/* Benefits */}
        <section className="mt-10">
          <h2 className="text-xl text-foreground">Benefits</h2>
          <ul className="mt-3 space-y-2">
            {peptide.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                {b}
              </li>
            ))}
          </ul>
        </section>

        {/* Clinical Comparisons */}
        {peptide.clinicalComparisons && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Clinical comparisons</h2>
            <div className="mt-3 text-sm text-muted leading-relaxed whitespace-pre-line">{peptide.clinicalComparisons}</div>
          </section>
        )}

        {/* Side Effects */}
        <section className="mt-10">
          <h2 className="text-xl text-foreground">Side effects</h2>
          <ul className="mt-3 space-y-2">
            {peptide.sideEffects.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-muted">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* Dosing */}
        <section className="mt-10">
          <h2 className="text-xl text-foreground">Dosing protocol</h2>
          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-muted uppercase tracking-wider">Typical Dose</p>
                <p className="mt-1 text-sm text-foreground">{peptide.dosing.typical}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted uppercase tracking-wider">Frequency</p>
                <p className="mt-1 text-sm text-foreground">{peptide.dosing.frequency}</p>
              </div>
              {peptide.dosing.cycleLength && (
                <div>
                  <p className="text-xs font-medium text-muted uppercase tracking-wider">Cycle Length</p>
                  <p className="mt-1 text-sm text-foreground">{peptide.dosing.cycleLength}</p>
                </div>
              )}
            </div>
            {peptide.dosing.notes && (
              <p className="mt-4 text-sm text-muted border-t border-border pt-4">{peptide.dosing.notes}</p>
            )}
          </div>
          <div className="mt-4">
            <Link
              href={`/tracker?peptide=${peptide.slug}`}
              className="inline-flex items-center rounded-full bg-cta px-6 py-3 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
            >
              Track This Protocol
            </Link>
          </div>
        </section>

        {/* Recommended Supplies — after dosing */}
        <RecommendedSupplies />

        {/* Inline CTA — after dosing section */}
        <InlineContentCTA type="compound" compoundName={peptide.name} />

        {/* Research */}
        {peptide.research.keyStudies.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Key research</h2>
            <div className="mt-4 space-y-4">
              {peptide.research.keyStudies.map((study, i) => (
                <div key={i} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-sm font-medium text-foreground">{study.title}</h3>
                  <p className="mt-1 text-xs text-muted">
                    {study.journal} ({study.year})
                    {study.pmid && (
                      <>
                        {' — '}
                        <a
                          href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent-hover"
                        >
                          PubMed
                        </a>
                      </>
                    )}
                  </p>
                  <p className="mt-2 text-sm text-muted">{study.keyFinding}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Real-World Data */}
        {peptide.realWorldData && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Real-world data</h2>
            <div className="mt-3 text-sm text-muted leading-relaxed whitespace-pre-line">{peptide.realWorldData}</div>
          </section>
        )}

        {/* FDA Status */}
        {peptide.fdaApprovedFor && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">FDA status</h2>
            <p className="mt-3 text-sm text-muted">
              <span className="font-medium text-green-400">FDA Approved</span> for: {peptide.fdaApprovedFor}
            </p>
          </section>
        )}

        {/* Where to Get — only for FDA-approved compounds */}
        {peptide.fdaStatus === 'approved' && (
          <WhereToGet compoundSlug={peptide.slug} compoundName={peptide.name} />
        )}

        {/* Drug Interactions */}
        {peptide.drugInteractions && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Drug interactions</h2>
            <div className="mt-3 text-sm text-muted leading-relaxed whitespace-pre-line">{peptide.drugInteractions}</div>
          </section>
        )}

        {/* Special Populations */}
        {peptide.populationNotes && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Special populations</h2>
            <div className="mt-3 text-sm text-muted leading-relaxed whitespace-pre-line">{peptide.populationNotes}</div>
          </section>
        )}

        {/* Second Inline CTA — before FAQ */}
        <InlineContentCTA type="compound" compoundName={peptide.name} />

        {/* FAQ */}
        {peptide.faq.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Frequently asked questions</h2>
            <div className="mt-4">
              <FAQAccordion faqs={peptide.faq} />
            </div>
          </section>
        )}

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Compare {peptide.name}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedComparisons.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/compare/${comp.slug}`}
                  className="rounded-xl border border-border bg-card p-4 transition-all hover:border-accent"
                >
                  <p className="text-sm font-medium text-primary">{comp.title}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Stacks */}
        {relatedStacks.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Stacks with {peptide.name}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedStacks.map((stack) => (
                <Link
                  key={stack.slug}
                  href={`/stacks/${stack.slug}`}
                  className="rounded-xl border border-border bg-card p-4 transition-all hover:border-accent"
                >
                  <p className="text-sm font-medium text-primary">{stack.name}</p>
                  <p className="mt-1 text-xs text-muted">{stack.difficulty} — {stack.estimatedMonthlyCost}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Goals */}
        {relatedGoals.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Goals</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedGoals.map((goal) => (
                <Link
                  key={goal.slug}
                  href={`/goals/${goal.slug}`}
                  className="rounded-full border border-border px-3 py-1 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {goal.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Peptides */}
        {relatedPeptides.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl text-foreground">Related peptides</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedPeptides.map((rp) =>
                rp ? (
                  <Link
                    key={rp.slug}
                    href={`/peptides/${rp.slug}`}
                    className="rounded-full border border-border px-3 py-1 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {rp.name}
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

        {/* Weight loss internal link — on every page (solar system: all planets link to sun) */}
        {peptide.category !== 'glp1-weight-loss' && (
          <section className="mt-10 rounded-xl border border-accent/10 bg-soft-sky/30 p-5">
            <p className="text-sm text-foreground">
              <span className="font-medium">Looking for weight loss peptides?</span>{' '}
              See our complete guide to the{' '}
              <Link href="/goals/weight-loss" className="text-accent hover:text-accent-hover">
                best peptides for weight loss
              </Link>
              {' '}or compare{' '}
              <Link href="/compare/semaglutide-vs-tirzepatide" className="text-accent hover:text-accent-hover">
                semaglutide vs tirzepatide
              </Link>
              .
            </p>
          </section>
        )}

        {/* Lead Magnet CTA — replaces old newsletter */}
        <div className="mt-8">
          <LeadMagnetCTA variant="inline" utmSource={`compound-${peptide.slug}`} />
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 rounded-xl border border-warm-sand bg-[#FEF9EC] p-5">
          <p className="text-xs text-[#6B5A40]">
            <span className="font-medium">Medical Disclaimer:</span> This content is for informational and educational
            purposes only. It is not intended as medical advice or a substitute for professional medical consultation,
            diagnosis, or treatment. Always consult a qualified healthcare provider before starting any peptide protocol.
          </p>
        </div>
      </div>
    </>
  )
}
