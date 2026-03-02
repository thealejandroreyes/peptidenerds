import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPeptide, getAllSlugs } from '@/data/peptides'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { AuthorBio } from '@/components/AuthorBio'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { FAQSchema } from '@/components/SchemaMarkup'

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const peptide = getPeptide(slug)
  if (!peptide) return { title: 'Not Found' }
  const year = new Date().getFullYear()
  return {
    title: `${peptide.name} FAQ: Common Questions Answered (${year})`,
    description: `Frequently asked questions about ${peptide.name}. Research-backed answers about dosage, side effects, results, and safety. Updated ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}.`,
  }
}

export default async function FAQPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const peptide = getPeptide(slug)
  if (!peptide) notFound()

  if (peptide.faq.length === 0) notFound()

  return (
    <>
      <FAQSchema faqs={peptide.faq} />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Peptides', href: '/peptides' },
            { name: peptide.name, href: `/peptides/${peptide.slug}` },
            { name: 'FAQ', href: `/peptides/${peptide.slug}/faq` },
          ]}
        />

        <h1 className="text-3xl font-light text-foreground">
          {peptide.name}: Frequently Asked Questions
        </h1>

        <div className="mt-4">
          <AuthorBio />
        </div>

        <div className="prose-custom mt-8">
          <div className="rounded-lg border border-warm-sand bg-[#FEF9EC] p-4 text-sm text-muted">
            <strong className="text-foreground">Not medical advice.</strong> These answers are for educational purposes based on published research.{' '}
            <Link href="/disclaimer" className="text-accent hover:text-accent-hover">Full disclaimer</Link>.
          </div>

          {peptide.faq.map((faq, i) => (
            <div key={i} className="mt-8">
              <h2>{faq.question}</h2>
              <p>{faq.answer}</p>
            </div>
          ))}

          {peptide.research.keyStudies.length > 0 && (
            <>
              <h2>Sources</h2>
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
          <Link href={`/peptides/${peptide.slug}/side-effects`} className="rounded-full border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-accent">
            Side Effects
          </Link>
        </div>

        <div className="mt-10">
          <NewsletterSignup />
        </div>
      </div>
    </>
  )
}
