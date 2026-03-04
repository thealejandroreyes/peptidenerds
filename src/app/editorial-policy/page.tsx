import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TrustBar } from '@/components/TrustBar'

export const metadata: Metadata = {
  title: 'How We Research — Editorial Policy & Methodology',
  description:
    'Our editorial standards for accuracy, sourcing, and transparency. How we research, write, and review peptide content across 279 pages.',
}

export default function EditorialPolicyPage() {
  return (
    <>
      <TrustBar />
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Editorial Policy', href: '/editorial-policy' }]} />

        <h1 className="text-3xl font-light text-foreground">How We Research</h1>
        <p className="mt-3 text-muted">
          Our editorial standards, methodology, and what makes this site different from every other peptide resource on the internet.
        </p>

        <div className="prose-custom mt-8">
          <h2>Research methodology</h2>
          <p>
            Every compound profile on this site follows the same research process:
          </p>
          <ul>
            <li>
              <strong>Primary sources first.</strong> We start with peer-reviewed studies from PubMed, ClinicalTrials.gov,
              and published clinical trial data. Animal studies, case reports, and preliminary data are clearly labeled as such.
            </li>
            <li>
              <strong>PubMed IDs for verification.</strong> Every cited study includes a PMID so you can read the original
              research yourself. We do not cite sources you cannot verify.
            </li>
            <li>
              <strong>Evidence grading.</strong> We classify evidence strength as: strong (large randomized controlled trials),
              moderate (small RCTs, meta-analyses), preliminary (Phase 1/2 data, animal studies), or anecdotal (community reports, case studies).
            </li>
            <li>
              <strong>FDA status tracking.</strong> Every compound clearly states whether it is FDA-approved, in clinical trials,
              or research-only. We track regulatory changes and update pages when status changes.
            </li>
          </ul>

          <h2>Citation standards</h2>
          <p>
            We maintain strict citation standards to ensure you can trust what you read:
          </p>
          <ul>
            <li>All medical and scientific claims link to published research in indexed journals.</li>
            <li>Study details include: journal name, publication year, sample size (where relevant), and key findings.</li>
            <li>We distinguish between human clinical data and preclinical (animal/in-vitro) data.</li>
            <li>Dosing information references clinical trial protocols, not community forums or anecdotal reports.</li>
          </ul>

          <h2>Content review process</h2>
          <p>
            Every piece of content passes through a multi-step review before publication:
          </p>
          <ul>
            <li><strong>Medical accuracy review.</strong> Claims are checked against source studies. Dosing protocols are verified against clinical trial data.</li>
            <li><strong>FDA/FTC compliance scan.</strong> Automated scanning for banned claims, improper health claims, and missing disclaimers.</li>
            <li>
              <strong>6-dimension quality scoring.</strong> Content is scored across SEO optimization, medical accuracy,
              FDA/FTC compliance, readability, E-E-A-T signals, and user engagement. Minimum score to publish: 85/100.
            </li>
            <li><strong>Readability check.</strong> Target: 6th-8th grade reading level. Complex medical concepts are explained in plain language.</li>
          </ul>

          <h2>Update cadence</h2>
          <ul>
            <li><strong>Weekly:</strong> New research monitoring across PubMed, clinical trial registries, and FDA announcements.</li>
            <li><strong>Monthly:</strong> Review of all compound profiles for accuracy against latest research.</li>
            <li><strong>Quarterly:</strong> Comprehensive site-wide review of all 279 pages, including dosing protocols, FDA status, and clinical trial progress.</li>
            <li><strong>As needed:</strong> Immediate updates for FDA approval changes, safety signals, or major trial results.</li>
          </ul>

          <h2>How we are different</h2>
          <p>
            Most peptide content online falls into two categories: vendor sites trying to sell you something,
            or forum posts with unverified anecdotes. We are neither.
          </p>
          <ul>
            <li><strong>No product sales.</strong> We do not sell peptides, supplements, or medications. Period.</li>
            <li><strong>No vendor influence.</strong> Content is written independently. No peptide company has editorial input.</li>
            <li><strong>44 compound profiles.</strong> Not 5 or 10. Every clinically relevant peptide has a complete profile with mechanisms, dosing, side effects, and original research.</li>
            <li><strong>200+ clinical citations.</strong> Real PubMed-indexed studies, not blog posts citing other blog posts.</li>
            <li><strong>7 free tools.</strong> Dosage calculator, reconstitution calculator, peptide finder quiz, protocol tracker, and more. No paywall.</li>
            <li><strong>Honest about limitations.</strong> When evidence is weak, we say so. When a compound is research-only with limited human data, we state that clearly.</li>
          </ul>

          <h2>Transparency</h2>
          <ul>
            <li>
              Affiliate relationships are{' '}
              <Link href="/affiliate-disclosure" className="text-accent hover:text-accent-hover">
                clearly disclosed
              </Link>
              . These are limited to FDA-approved medication providers and injection supplies.
            </li>
            <li>We do not accept sponsored content or paid placements within compound profiles.</li>
            <li>Personal experience is clearly distinguished from clinical evidence.</li>
            <li>Conflicts of interest are disclosed when they exist.</li>
          </ul>

          <h2>What we do not do</h2>
          <ul>
            <li>We do not make therapeutic claims for non-FDA-approved compounds.</li>
            <li>We do not recommend specific vendors or sources for research peptides.</li>
            <li>We do not provide personalized medical advice.</li>
            <li>We do not guarantee results from any peptide protocol.</li>
          </ul>

          <h2>Contact</h2>
          <p>
            Found an error? Have a correction? See outdated information? Contact us and we will investigate and update promptly.
            Accuracy is our highest priority.
          </p>
        </div>
      </div>
    </>
  )
}
