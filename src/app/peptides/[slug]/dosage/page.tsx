import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPeptide, getAllSlugs } from '@/data/peptides'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AuthorBio } from '@/components/AuthorBio'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ArticleSchema } from '@/components/SchemaMarkup'
import { getFdaStatusLabel, getFdaStatusColor } from '@/lib/utils'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const peptide = getPeptide(params.slug)
  if (!peptide) return { title: 'Not Found' }
  const year = new Date().getFullYear()
  return {
    title: `${peptide.name} Dosage Guide: Protocols & Timing (${year})`,
    description: `${peptide.name} dosage information based on published research. Typical doses, frequency, cycle length, and important dosing notes. Updated ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.`,
  }
}

export default function DosagePage({ params }: { params: { slug: string } }) {
  const peptide = getPeptide(params.slug)
  if (!peptide) notFound()

  return (
    <>
      <ArticleSchema
        title={`${peptide.name} Dosage Guide`}
        description={`Research-based dosage information for ${peptide.name}.`}
        url={`/peptides/${peptide.slug}/dosage`}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Peptides', href: '/peptides' },
            { name: peptide.name, href: `/peptides/${peptide.slug}` },
            { name: 'Dosage', href: `/peptides/${peptide.slug}/dosage` },
          ]}
        />

        <h1 className="text-3xl font-light text-foreground">
          {peptide.name} Dosage Guide
        </h1>

        <div className="mt-2 flex items-center gap-2">
          <span className={`rounded-full border px-2 py-0.5 text-xs ${getFdaStatusColor(peptide.fdaStatus)}`}>
            {getFdaStatusLabel(peptide.fdaStatus)}
          </span>
        </div>

        <div className="mt-4">
          <AuthorBio />
        </div>

        <div className="prose-custom mt-8">
          <div className="rounded-lg border border-warm-sand bg-[#FEF9EC] p-4 text-sm text-muted">
            <strong className="text-foreground">Not medical advice.</strong> Dosage information is provided for educational purposes based on published research.{' '}
            {peptide.fdaStatus === 'research-only'
              ? 'This compound is not FDA-approved for human use. '
              : ''}
            Always consult a qualified healthcare provider before starting any protocol.{' '}
            <Link href="/disclaimer" className="text-accent hover:text-accent-hover">Full disclaimer</Link>.
          </div>

          <h2>Dosage overview</h2>

          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-foreground bg-card">Typical dose</td>
                  <td className="px-4 py-3">{peptide.dosing.typical}</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-foreground bg-card">Frequency</td>
                  <td className="px-4 py-3">{peptide.dosing.frequency}</td>
                </tr>
                {peptide.dosing.cycleLength && (
                  <tr className="border-b border-border">
                    <td className="px-4 py-3 font-medium text-foreground bg-card">Cycle length</td>
                    <td className="px-4 py-3">{peptide.dosing.cycleLength}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <h2>Dosing notes</h2>
          <p>{peptide.dosing.notes}</p>

          {peptide.fdaApprovedFor && (
            <>
              <h2>FDA-approved indications</h2>
              <p>{peptide.name} is FDA-approved for: {peptide.fdaApprovedFor}.</p>
              <p>Off-label use should only be pursued under the guidance of a licensed healthcare provider.</p>
            </>
          )}

          <h2>Important safety information</h2>
          <p>
            Dosage ranges listed above are based on {peptide.research.level === 'strong' ? 'published clinical trial protocols' : 'available research data and reported protocols'}. Individual dosing should be determined by a qualified healthcare provider based on your specific health profile, goals, and response to treatment.
          </p>
          <ul>
            <li>Start at the lowest effective dose and titrate up gradually</li>
            <li>Monitor for side effects, especially during dose increases</li>
            <li>Do not exceed researched dose ranges without medical supervision</li>
            {peptide.fdaStatus === 'research-only' && (
              <li>This is a research compound — human dosing guidelines are not FDA-established</li>
            )}
          </ul>

          {peptide.research.keyStudies.length > 0 && (
            <>
              <h2>Research references</h2>
              <ul>
                {peptide.research.keyStudies.map((study, i) => (
                  <li key={i}>
                    {study.title} — <em>{study.journal}</em> ({study.year})
                    {study.pmid && (
                      <> [<a href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">PubMed</a>]</>
                    )}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link href={`/peptides/${peptide.slug}`} className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent">
            Overview
          </Link>
          <Link href={`/peptides/${peptide.slug}/benefits`} className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent">
            Benefits
          </Link>
          <Link href={`/peptides/${peptide.slug}/side-effects`} className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent">
            Side Effects
          </Link>
          <Link href={`/peptides/${peptide.slug}/faq`} className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent">
            FAQ
          </Link>
        </div>

        <div className="mt-6 text-center">
          <Link href="/tools/dosage-calculator" className="inline-block rounded-full bg-cta px-6 py-3 text-sm font-medium text-cta-foreground hover:bg-cta-hover">
            Use the Dosage Calculator
          </Link>
        </div>

        <div className="mt-10">
          <NewsletterSignup />
        </div>
      </div>
    </>
  )
}
