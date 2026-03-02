import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPeptide, getAllSlugs } from '@/data/peptides'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AuthorBio } from '@/components/AuthorBio'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { MedicalWebPageSchema } from '@/components/SchemaMarkup'
import { getFdaStatusLabel, getFdaStatusColor } from '@/lib/utils'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const peptide = getPeptide(slug)
  if (!peptide) return { title: 'Not Found' }
  const year = new Date().getFullYear()
  return {
    title: `${peptide.name} Side Effects: What to Know Before Starting (${year})`,
    description: `Complete side effects profile for ${peptide.name}. Common and rare side effects, what to watch for, and when to contact your doctor. Research-backed safety information.`,
  }
}

export default async function SideEffectsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const peptide = getPeptide(slug)
  if (!peptide) notFound()

  return (
    <>
      <MedicalWebPageSchema
        title={`${peptide.name} Side Effects`}
        description={`Safety profile and side effects of ${peptide.name}.`}
        url={`/peptides/${peptide.slug}/side-effects`}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Peptides', href: '/peptides' },
            { name: peptide.name, href: `/peptides/${peptide.slug}` },
            { name: 'Side Effects', href: `/peptides/${peptide.slug}/side-effects` },
          ]}
        />

        <h1 className="text-3xl font-light text-foreground">
          {peptide.name} Side Effects
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
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4 text-sm text-muted">
            <strong className="text-foreground">Important safety information.</strong> This page covers known and reported side effects of {peptide.name}. This is not a complete list. Always discuss potential risks with your healthcare provider before starting any peptide protocol.{' '}
            <Link href="/disclaimer" className="text-accent hover:text-accent-hover">Full medical disclaimer</Link>.
          </div>

          <h2>Known side effects</h2>
          <p>
            The following side effects have been {peptide.research.level === 'strong' ? 'reported in clinical trials' : 'reported in research studies and user reports'} for {peptide.name}:
          </p>
          <ul>
            {peptide.sideEffects.map((effect, i) => (
              <li key={i}>{effect}</li>
            ))}
          </ul>

          <h2>Severity and frequency</h2>
          <p>
            {peptide.research.level === 'strong'
              ? `Clinical trial data provides specific frequency data for ${peptide.name} side effects. Most common side effects are mild to moderate and often improve with continued use or dose adjustment.`
              : `Limited clinical data is available for ${peptide.name}. Side effect frequency and severity are based on available research and anecdotal reports. More data is needed for definitive safety profiles.`
            }
          </p>

          <h2>When to seek medical attention</h2>
          <p>Contact your healthcare provider immediately if you experience:</p>
          <ul>
            <li>Severe or persistent symptoms that do not improve</li>
            <li>Signs of an allergic reaction (rash, swelling, difficulty breathing)</li>
            <li>Severe abdominal pain</li>
            <li>Changes in vision or neurological symptoms</li>
            <li>Any symptom that concerns you</li>
          </ul>

          <h2>Risk factors</h2>
          <p>
            Side effect risk may be higher in certain populations. Discuss your complete medical history with your doctor, including:
          </p>
          <ul>
            <li>Pre-existing medical conditions</li>
            <li>Current medications (drug interactions)</li>
            <li>Pregnancy or plans to become pregnant</li>
            <li>History of allergic reactions to peptides or similar compounds</li>
            {peptide.fdaStatus === 'research-only' && (
              <li>Note: {peptide.name} is a research compound without established human safety data from FDA-approved clinical trials</li>
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
          <Link href={`/peptides/${peptide.slug}/dosage`} className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent">
            Dosage
          </Link>
          <Link href={`/peptides/${peptide.slug}/faq`} className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent">
            FAQ
          </Link>
        </div>

        <div className="mt-10">
          <NewsletterSignup />
        </div>
      </div>
    </>
  )
}
