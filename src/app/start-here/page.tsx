import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ArticleSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Start Here — Beginner Guide to Peptides',
  description:
    'New to peptides? Start here. A plain-language introduction to what peptides are, how they work, which ones are FDA-approved, and how to research safely.',
}

export default function StartHerePage() {
  return (
    <>
      <ArticleSchema
        title="Start Here — Beginner Guide to Peptides"
        description="A plain-language introduction to peptides for beginners."
        url="/start-here"
      />

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Start Here', href: '/start-here' }]} />

        <h1 className="text-3xl font-bold text-foreground">New to peptides? Start here.</h1>
        <p className="mt-3 text-lg text-muted">
          A no-nonsense introduction to peptides — what they are, how they work, and what you need to know before doing
          anything.
        </p>

        <div className="prose-custom mt-10">
          <h2>What are peptides?</h2>
          <p>
            Peptides are short chains of amino acids — the same building blocks that make up proteins. Your body
            naturally produces thousands of peptides that regulate everything from appetite to tissue repair to immune
            function.
          </p>
          <p>
            Therapeutic peptides are lab-synthesized versions of these natural molecules. Some are FDA-approved
            medications (like semaglutide for weight loss). Others are still in clinical trials or available only for
            research purposes.
          </p>

          <h2>Why peptides for weight loss?</h2>
          <p>
            GLP-1 receptor agonists (semaglutide, tirzepatide) are the biggest development in obesity medicine in
            decades. Clinical trials show 15-26% body weight reduction. These are not supplements — they are powerful
            medications that change how your body regulates appetite and metabolism.
          </p>
          <p>
            Beyond weight loss, peptides are used for healing (BPC-157, TB-500), growth hormone optimization
            (ipamorelin, CJC-1295), anti-aging (GHK-Cu, epithalon), and cognitive enhancement (semax, selank).
          </p>

          <h2>FDA-approved vs research peptides</h2>
          <p>This is the most important distinction to understand:</p>
          <ul>
            <li>
              <strong>FDA-approved:</strong> Semaglutide (Ozempic/Wegovy), tirzepatide (Mounjaro/Zepbound), tesamorelin
              (Egrifta), PT-141 (Vyleesi). These have completed clinical trials and are available by prescription.
            </li>
            <li>
              <strong>In clinical trials:</strong> Retatrutide, survodutide, orforglipron. Still being studied. Not yet
              available by prescription.
            </li>
            <li>
              <strong>Research only:</strong> BPC-157, TB-500, ipamorelin, CJC-1295, and many others. Not FDA-approved
              for human use. Available from research peptide suppliers.
            </li>
          </ul>
          <p>
            Every compound on this site clearly states its FDA status. We do not make therapeutic claims for
            non-approved peptides.
          </p>

          <h2>Where to go from here</h2>
        </div>

        {/* Navigation cards */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <Link
            href="/peptides"
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent"
          >
            <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
              Browse all 40 peptides
            </h3>
            <p className="mt-1 text-sm text-muted">Detailed profiles with research, dosing, and FAQ.</p>
          </Link>
          <Link
            href="/goals"
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent"
          >
            <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
              Find by goal
            </h3>
            <p className="mt-1 text-sm text-muted">Weight loss, healing, anti-aging, sleep, and more.</p>
          </Link>
          <Link
            href="/compare"
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent"
          >
            <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
              Compare peptides
            </h3>
            <p className="mt-1 text-sm text-muted">Side-by-side analysis to help you decide.</p>
          </Link>
          <Link
            href="/tools/dosage-calculator"
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent"
          >
            <h3 className="font-semibold text-primary group-hover:text-accent transition-colors">
              Dosage calculator
            </h3>
            <p className="mt-1 text-sm text-muted">Calculate reconstitution and injection volumes.</p>
          </Link>
        </div>

        <div className="mt-10">
          <NewsletterSignup />
        </div>
      </div>
    </>
  )
}
