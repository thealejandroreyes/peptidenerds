import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { SiteStats } from '@/components/SiteStats'
import { GoalFinder } from '@/components/GoalFinder'
import { FAQAccordion } from '@/components/FAQAccordion'
import { LeadMagnetCTA } from '@/components/LeadMagnetCTA'
import { ArticleSchema, FAQSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Start Here — The Complete Beginner Guide to Peptides (2026)',
  description:
    'New to peptides? Start here. Evidence-based introduction to peptides, what they do, FDA status, and how to navigate 44 compound profiles, 7 free tools, and 200+ citations.',
  openGraph: {
    title: 'Start Here — Beginner Guide to Peptides',
    description: 'The #1 entry point for understanding peptides. 44 compounds, 7 free tools, 200+ citations.',
  },
}

const faqs = [
  {
    question: 'What are peptides?',
    answer:
      'Peptides are short chains of amino acids — the same building blocks that make up proteins. Your body naturally produces thousands of peptides that regulate appetite, tissue repair, immune function, and more. Therapeutic peptides are lab-synthesized versions of these natural molecules.',
  },
  {
    question: 'Are peptides safe?',
    answer:
      'FDA-approved peptides (semaglutide, tirzepatide) have extensive clinical safety data from multi-year trials. Research-only peptides (BPC-157, TB-500) have less human safety data. Side effects vary by compound. Always consult a healthcare provider before starting any peptide.',
  },
  {
    question: 'Are peptides legal?',
    answer:
      'FDA-approved peptides are legal with a prescription. Research-only peptides exist in a gray area — they are legal to purchase for research purposes but not FDA-approved for human therapeutic use. Regulations vary by country and are evolving in 2026.',
  },
  {
    question: 'What is the best peptide for weight loss?',
    answer:
      'Based on clinical trial data, tirzepatide (Zepbound) has shown the highest average weight loss at 22.5% in SURMOUNT-1. Semaglutide (Wegovy) showed 16.9% in STEP 1. Retatrutide showed 24.2% in Phase 2 but is not yet approved. Individual results vary significantly.',
  },
  {
    question: 'What is the difference between FDA-approved and research peptides?',
    answer:
      'FDA-approved peptides (semaglutide, tirzepatide, tesamorelin) have completed full clinical trials and are available by prescription. Research-only peptides (BPC-157, TB-500, ipamorelin) have not completed the approval process and are sold for laboratory research purposes only.',
  },
  {
    question: 'Do peptides require injections?',
    answer:
      'Most therapeutic peptides are administered via subcutaneous injection. Some are available in oral form (oral semaglutide as Rybelsus), nasal spray (semax, selank), or topical application (GHK-Cu creams). Injectable forms generally have higher bioavailability.',
  },
  {
    question: 'How much do peptides cost?',
    answer:
      'Costs vary widely. FDA-approved GLP-1 medications range from $900-1,500/month without insurance. Compounded versions are typically $200-500/month. Research peptides range from $30-100 per vial. Insurance coverage is expanding for FDA-approved weight loss medications.',
  },
  {
    question: 'Is this site selling peptides?',
    answer:
      'No. PeptideNerds is an educational reference site. We do not sell peptides, supplements, or medications. We provide evidence-based information to help you make informed decisions with your healthcare provider.',
  },
]

const sections = [
  {
    title: 'Pillar Guides',
    items: [
      { name: 'Weight Loss Guide', href: '/peptides-weight-loss-guide', desc: 'Complete weight loss peptide overview' },
      { name: 'GLP-1 Peptides', href: '/glp-1-peptides', desc: 'GLP-1 agonist deep dive' },
      { name: 'Healing Peptides', href: '/healing-peptides', desc: 'BPC-157, TB-500, GHK-Cu' },
      { name: 'How-To Guides', href: '/peptide-how-to', desc: 'Dosing, reconstitution, injection' },
      { name: 'Research & Science', href: '/peptide-research', desc: 'Clinical trials and new compounds' },
      { name: 'Comparisons', href: '/peptide-comparisons', desc: 'Head-to-head peptide analysis' },
      { name: 'Safety Guide', href: '/peptide-safety', desc: 'Side effects and harm reduction' },
    ],
  },
  {
    title: 'Free Tools',
    items: [
      { name: 'Dosage Calculator', href: '/tools/dosage-calculator', desc: 'Calculate injection volumes' },
      { name: 'Reconstitution Calculator', href: '/tools/reconstitution-calculator', desc: 'Mix peptides correctly' },
      { name: 'BAC Water Calculator', href: '/tools/bac-water-calculator', desc: 'Bacteriostatic water volumes' },
      { name: 'Peptide Finder', href: '/tools/peptide-finder', desc: 'Find the right compound' },
      { name: 'Stack Builder', href: '/tools/stack-builder', desc: 'Build peptide protocols' },
      { name: 'Cost Calculator', href: '/tools/cost-calculator', desc: 'Estimate monthly costs' },
      { name: 'Protocol Tracker', href: '/tracker', desc: 'Track your protocol' },
    ],
  },
  {
    title: 'Browse',
    items: [
      { name: 'All Peptides', href: '/peptides', desc: '44 compound profiles' },
      { name: 'Goals', href: '/goals', desc: '12 goal-based guides' },
      { name: 'Comparisons', href: '/compare', desc: '15 head-to-head analyses' },
      { name: 'Stacks', href: '/stacks', desc: '12 protocol templates' },
      { name: 'Blog', href: '/blog', desc: 'Latest articles and research' },
    ],
  },
]

export default function StartHerePage() {
  return (
    <>
      <ArticleSchema
        title="Start Here — The Complete Beginner Guide to Peptides"
        description="Evidence-based introduction to peptides for beginners. 44 compounds, 7 free tools, 200+ citations."
        url="/start-here"
      />
      <FAQSchema faqs={faqs} />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Start Here', href: '/start-here' }]} />

        {/* Hero */}
        <div className="text-center">
          <h1 className="text-4xl font-light leading-tight text-foreground sm:text-5xl">
            The Evidence-Based Guide to Peptides
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            No hype. No sales. Just research-backed information on every peptide that matters — from
            FDA-approved GLP-1 medications to emerging research compounds.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/peptides"
              className="rounded-full bg-cta px-6 py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
            >
              Browse All Compounds
            </Link>
            <Link
              href="/goals"
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Find by Goal
            </Link>
          </div>
        </div>

        {/* Site Stats */}
        <div className="mt-12">
          <SiteStats />
        </div>

        {/* Lead Magnet CTA — after stats */}
        <div className="mt-10">
          <LeadMagnetCTA variant="inline" utmSource="start-here-top" />
        </div>

        {/* Goal Finder */}
        <section className="mt-16">
          <h2 className="text-2xl font-light text-foreground">What are you looking for?</h2>
          <p className="mt-2 text-sm text-muted">
            Select a goal to see the most relevant peptides and research.
          </p>
          <div className="mt-6">
            <GoalFinder />
          </div>
        </section>

        {/* What Are Peptides */}
        <section className="mt-16">
          <h2 className="text-2xl font-light text-foreground">What Are Peptides?</h2>
          <div className="prose-custom mt-4">
            <p>
              Peptides are short chains of amino acids — the same building blocks that make up
              proteins. Your body naturally produces thousands of peptides that regulate everything
              from appetite to tissue repair to immune function.
            </p>
            <p>
              Therapeutic peptides are lab-synthesized versions of these natural molecules. Some
              have completed rigorous clinical trials and received FDA approval. Others are still
              being studied or available only for research purposes.
            </p>
            <h3>Three categories you need to understand</h3>
            <p>
              <strong>FDA-approved medications.</strong> Semaglutide (Ozempic, Wegovy), tirzepatide
              (Mounjaro, Zepbound), tesamorelin (Egrifta), and PT-141 (Vyleesi) have completed full
              clinical trials. They are available by prescription and covered by some insurance
              plans. These have the strongest safety and efficacy data.
            </p>
            <p>
              <strong>Clinical trial compounds.</strong> Retatrutide, survodutide, orforglipron, and
              CagriSema are in Phase 2 or Phase 3 trials. Early results are promising, but they are
              not yet approved or available by prescription. We track their progress in our{' '}
              <a href="/peptide-research">research section</a>.
            </p>
            <p>
              <strong>Research-only compounds.</strong> BPC-157, TB-500, ipamorelin, CJC-1295,
              GHK-Cu, and many others have preclinical data (mostly animal studies) but have not
              completed the FDA approval process. They are available from research peptide suppliers
              and are not approved for human therapeutic use. Every compound on this site clearly
              states its FDA status.
            </p>
          </div>
        </section>

        {/* GLP-1 Quick Explainer */}
        <section className="mt-16">
          <h2 className="text-2xl font-light text-foreground">The GLP-1 Revolution</h2>
          <div className="prose-custom mt-4">
            <p>
              GLP-1 receptor agonists are the biggest development in obesity medicine in decades.
              Clinical trials consistently show 15-26% body weight reduction — numbers that were
              unheard of before these medications existed.
            </p>
            <p>
              These are not supplements. They are powerful medications that fundamentally change how
              your body regulates appetite and metabolism. Semaglutide and tirzepatide are both
              FDA-approved for chronic weight management, with different mechanisms: semaglutide
              targets GLP-1 receptors only, while tirzepatide targets both GLP-1 and GIP receptors.
            </p>
            <p>
              The next generation — retatrutide (triple agonist targeting GLP-1, GIP, and glucagon
              receptors) — showed 24.2% weight loss in Phase 2 trials. Multiple new compounds are
              racing through clinical trials.
            </p>
            <p>
              See our{' '}
              <a href="/peptides-weight-loss-guide">weight loss peptide guide</a>,{' '}
              <a href="/glp-1-peptides">GLP-1 deep dive</a>, or{' '}
              <a href="/compare/semaglutide-vs-tirzepatide">semaglutide vs tirzepatide comparison</a>{' '}
              for detailed analysis.
            </p>
          </div>
        </section>

        {/* Explore the Site */}
        <section className="mt-16">
          <h2 className="text-2xl font-light text-foreground">Explore the Site</h2>
          <p className="mt-2 text-sm text-muted">
            Everything is free. No accounts, no paywalls, no upsells.
          </p>
          <div className="mt-8 space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
                  {section.title}
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group block rounded-xl border border-border bg-card p-4 transition-all hover:border-accent hover:bg-card-hover"
                    >
                      <p className="font-medium text-primary group-hover:text-accent transition-colors">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-muted">{item.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-light text-foreground">Frequently Asked Questions</h2>
          <div className="mt-6">
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

        {/* Trust Signals */}
        <section className="mt-16 rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-medium text-foreground">Our Standards</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-foreground">Evidence-based content</p>
              <p className="mt-1 text-xs text-muted">
                Every claim links to published research with PubMed IDs. We distinguish between
                strong evidence (large RCTs) and preliminary data (animal studies, case reports).
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Editorial independence</p>
              <p className="mt-1 text-xs text-muted">
                We do not sell peptides or accept sponsored content. Affiliate relationships are{' '}
                <Link href="/affiliate-disclosure" className="text-accent hover:underline">
                  disclosed
                </Link>
                .
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Regular updates</p>
              <p className="mt-1 text-xs text-muted">
                Content is reviewed and updated as new research publishes. Last site-wide review:
                March 2026.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Medical disclaimer</p>
              <p className="mt-1 text-xs text-muted">
                This is not medical advice. Always consult a qualified healthcare provider.{' '}
                <Link href="/disclaimer" className="text-accent hover:underline">
                  Full disclaimer
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Lead Magnet CTA — fullwidth, replaces old newsletter */}
        <div className="mt-12">
          <LeadMagnetCTA variant="fullwidth" utmSource="start-here-bottom" />
        </div>
      </div>
    </>
  )
}
