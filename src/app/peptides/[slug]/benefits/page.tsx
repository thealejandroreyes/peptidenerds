import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPeptide, getAllSlugs } from '@/data/peptides'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AuthorBio } from '@/components/AuthorBio'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ArticleSchema } from '@/components/SchemaMarkup'
import { getCategoryLabel, getFdaStatusLabel, getFdaStatusColor } from '@/lib/utils'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const peptide = getPeptide(params.slug)
  if (!peptide) return { title: 'Not Found' }
  const year = new Date().getFullYear()
  return {
    title: `${peptide.name} Benefits: What the Research Shows (${year})`,
    description: `Evidence-based overview of ${peptide.name} benefits. What the clinical research actually supports, how it works, and what results to realistically expect. Updated ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.`,
  }
}

export default function BenefitsPage({ params }: { params: { slug: string } }) {
  const peptide = getPeptide(params.slug)
  if (!peptide) notFound()

  const relatedPeptides = peptide.relatedPeptides
    .map((slug) => getPeptide(slug))
    .filter(Boolean)
    .slice(0, 4)

  return (
    <>
      <ArticleSchema
        title={`${peptide.name} Benefits`}
        description={`Evidence-based overview of ${peptide.name} benefits and what the research supports.`}
        url={`/peptides/${peptide.slug}/benefits`}
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Peptides', href: '/peptides' },
            { name: peptide.name, href: `/peptides/${peptide.slug}` },
            { name: 'Benefits', href: `/peptides/${peptide.slug}/benefits` },
          ]}
        />

        <h1 className="text-3xl font-light text-foreground">
          {peptide.name} Benefits
        </h1>

        <div className="mt-2 flex items-center gap-2">
          <span className={`rounded-full border px-2 py-0.5 text-xs ${getFdaStatusColor(peptide.fdaStatus)}`}>
            {getFdaStatusLabel(peptide.fdaStatus)}
          </span>
          <span className="text-xs text-muted">{getCategoryLabel(peptide.category)}</span>
        </div>

        <div className="mt-4">
          <AuthorBio />
        </div>

        <div className="prose-custom mt-8">
          <div className="rounded-lg border border-warm-sand bg-[#FEF9EC] p-4 text-sm text-muted">
            <strong className="text-foreground">Not medical advice.</strong> This content is for educational purposes only. Consult a healthcare provider before starting any peptide protocol.{' '}
            <Link href="/disclaimer" className="text-accent hover:text-accent-hover">Full disclaimer</Link>.
          </div>

          <h2>How {peptide.name} works</h2>
          <p>{peptide.mechanism}</p>

          <h2>Reported benefits</h2>
          <p>
            Based on {peptide.research.level === 'strong' ? 'published clinical trials' : peptide.research.level === 'moderate' ? 'available research data' : 'preliminary research and anecdotal reports'}, {peptide.name} has been associated with the following benefits:
          </p>
          <ul>
            {peptide.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>

          {peptide.research.keyStudies.length > 0 && (
            <>
              <h2>Supporting research</h2>
              {peptide.research.keyStudies.map((study, i) => (
                <div key={i} className="rounded-lg border border-border p-4 mb-4">
                  <p className="font-medium text-foreground">{study.title}</p>
                  <p className="text-xs text-muted mt-1">
                    {study.journal}, {study.year}
                    {study.pmid && (
                      <> &middot; <a href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent-hover">PMID: {study.pmid}</a></>
                    )}
                  </p>
                  <p className="text-sm mt-2">{study.keyFinding}</p>
                </div>
              ))}
            </>
          )}

          <h2>Important context</h2>
          <p>
            Benefits reported in clinical trials represent average outcomes across study populations. Individual results vary based on genetics, dosage, duration, and lifestyle factors. {peptide.fdaStatus === 'research-only' ? 'This compound is not FDA-approved for human use. Benefits described are based on research data and should not be interpreted as therapeutic claims.' : ''}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link href={`/peptides/${peptide.slug}`} className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent">
            Overview
          </Link>
          <Link href={`/peptides/${peptide.slug}/dosage`} className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent">
            Dosage
          </Link>
          <Link href={`/peptides/${peptide.slug}/side-effects`} className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent">
            Side Effects
          </Link>
          <Link href={`/peptides/${peptide.slug}/faq`} className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent">
            FAQ
          </Link>
        </div>

        {relatedPeptides.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg text-foreground">Related peptides</h2>
            <div className="mt-3 grid gap-2">
              {relatedPeptides.map((rp) => (
                <Link key={rp!.slug} href={`/peptides/${rp!.slug}/benefits`} className="block rounded-lg border border-border p-3 text-sm hover:border-accent">
                  <span className="font-medium text-primary">{rp!.name}</span>
                  <span className="text-muted"> — {rp!.benefits[0]}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <NewsletterSignup />
        </div>
      </div>
    </>
  )
}
