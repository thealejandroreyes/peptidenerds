import Link from 'next/link'
import { peptides } from '@/data/peptides'
import { comparisons } from '@/data/comparisons'
import { goals } from '@/data/goals'
import { stacks } from '@/data/stacks'
import { PeptideCard } from '@/components/PeptideCard'
import { TrustBar } from '@/components/TrustBar'
import { LeadMagnetCTA } from '@/components/LeadMagnetCTA'
import { OrganizationSchema } from '@/components/SchemaMarkup'

const weightLossComparisons = comparisons.filter((c) =>
  ['semaglutide-vs-tirzepatide', 'semaglutide-vs-retatrutide', 'tirzepatide-vs-retatrutide', 'semaglutide-vs-liraglutide', 'ozempic-vs-wegovy', 'compounded-vs-brand-semaglutide'].includes(c.slug)
)

const weightLossGoals = goals.filter((g) =>
  ['weight-loss', 'fat-loss', 'gut-health', 'muscle-growth'].includes(g.slug)
)

export default function HomePage() {
  const glp1Peptides = peptides.filter((p) =>
    ['semaglutide', 'tirzepatide', 'retatrutide', 'liraglutide', 'survodutide', 'orforglipron'].includes(p.slug)
  )

  const supportPeptides = peptides.filter((p) =>
    ['bpc-157', 'tesamorelin', 'aod-9604', 'mots-c'].includes(p.slug)
  )

  return (
    <>
      <OrganizationSchema />

      {/* Hero — weight loss first */}
      <section className="relative overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(42,122,114,0.35)_0%,transparent_65%),radial-gradient(ellipse_at_20%_80%,rgba(201,169,110,0.15)_0%,transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[3.5px] text-sage mb-5">Evidence-Based Peptide Research</p>
            <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              The peptide{' '}
              <em className="text-sage">weight loss</em>{' '}
              guide
            </h1>
            <p className="mt-6 text-[15px] text-white/65 leading-relaxed max-w-xl">
              44 compound profiles. 200+ clinical citations. 7 free tools. The most comprehensive peptide weight loss reference on the web.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 max-w-4xl">
              <Link
                href="/goals/weight-loss"
                className="rounded-full bg-cta px-5 py-2.5 text-[12.5px] font-semibold tracking-[0.3px] text-cta-foreground transition-colors hover:bg-cta-hover"
              >
                Best peptides for weight loss
              </Link>
              <Link
                href="/compare/semaglutide-vs-tirzepatide-vs-retatrutide"
                className="rounded-full border border-white/20 px-5 py-2.5 text-[12.5px] font-semibold tracking-[0.3px] text-white transition-colors hover:border-white/40 hover:text-white"
              >
                Semaglutide vs Tirzepatide vs Retatrutide
              </Link>
              <Link
                href="/tools/dosage-calculator"
                className="rounded-full border border-white/20 px-5 py-2.5 text-[12.5px] font-semibold tracking-[0.3px] text-white transition-colors hover:border-white/40 hover:text-white"
              >
                Dosage calculator
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* GLP-1 Weight Loss Peptides — the sun */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl text-foreground">GLP-1 weight loss peptides</h2>
            <p className="mt-2 text-sm text-muted">The most effective peptides for significant weight loss, ranked by clinical evidence.</p>
          </div>
          <Link href="/peptides" className="text-sm text-accent hover:text-accent-hover">
            View all peptides →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {glp1Peptides.map((peptide) => (
            <PeptideCard key={peptide.slug} peptide={peptide} />
          ))}
        </div>
      </section>

      {/* Newsletter CTA — green break */}
      <section className="bg-primary">
        <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <LeadMagnetCTA variant="hero" utmSource="homepage-mid" />
        </div>
      </section>

      {/* Weight Loss Comparisons */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl text-foreground">Which GLP-1 is right for you?</h2>
          <p className="mt-2 text-sm text-muted">Side-by-side comparisons of the top weight loss peptides.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {weightLossComparisons.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent"
              >
                <h3 className="text-sm font-medium text-primary group-hover:text-accent transition-colors line-clamp-2">
                  {comp.title}
                </h3>
                <p className="mt-2 text-xs text-muted line-clamp-2">{comp.metaDescription}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/compare" className="text-sm text-accent hover:text-accent-hover">
              View all {comparisons.length} comparisons →
            </Link>
          </div>
        </div>
      </section>

      {/* Supporting peptides — inner planets */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl text-foreground">Peptides that support weight loss</h2>
          <p className="mt-2 text-sm text-muted">
            Manage GLP-1 side effects, preserve muscle, and optimize fat loss with these complementary compounds.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supportPeptides.map((peptide) => (
              <PeptideCard key={peptide.slug} peptide={peptide} />
            ))}
          </div>
        </div>
      </section>

      {/* Weight loss goals */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl text-foreground">Find peptides by goal</h2>
          <p className="mt-2 text-sm text-muted">Weight loss is the starting point. What else do you need?</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {weightLossGoals.map((goal) => (
              <Link
                key={goal.slug}
                href={`/goals/${goal.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent"
              >
                <h3 className="font-medium text-primary group-hover:text-accent transition-colors">{goal.name}</h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">{goal.description}</p>
                <p className="mt-3 text-xs text-accent">{goal.topPeptides.length} peptides →</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link href="/goals" className="text-sm text-accent hover:text-accent-hover">
              View all {goals.length} goals →
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links — tools + stacks */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <Link
              href="/tools"
              className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-accent"
            >
              <h3 className="text-xl font-medium text-primary group-hover:text-accent transition-colors">
                Free Peptide Tools
              </h3>
              <p className="mt-2 text-sm text-muted">
                Dosage calculator, reconstitution calculator, BAC water calculator, peptide finder, stack builder, and more.
              </p>
              <p className="mt-3 text-xs text-accent">7 free tools →</p>
            </Link>
            <Link
              href="/stacks"
              className="group rounded-xl border border-border bg-card p-8 transition-all hover:border-accent"
            >
              <h3 className="text-xl font-medium text-primary group-hover:text-accent transition-colors">
                Peptide Stacks
              </h3>
              <p className="mt-2 text-sm text-muted">
                {stacks.length} combination protocols with dosing, timing, cost estimates, and difficulty ratings.
              </p>
              <p className="mt-3 text-xs text-accent">{stacks.length} stacks →</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Lead Magnet CTA — fullwidth, replaces old newsletter */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
          <LeadMagnetCTA variant="fullwidth" utmSource="homepage-bottom" />
        </div>
      </section>

      {/* New to Peptides — catch-all CTA for scrollers */}
      <section className="bg-primary">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <h2 className="text-2xl text-white sm:text-3xl">New to peptides? Start here.</h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/60">
            Our beginner&apos;s guide covers everything from the basics to your first protocol — what peptides are, how they work, safety, legality, and how to get started.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/start-here"
              className="rounded-full bg-cta px-7 py-3 text-[13.5px] font-semibold tracking-[0.3px] text-cta-foreground transition-colors hover:bg-cta-hover"
            >
              Read the beginner&apos;s guide
            </Link>
            <Link
              href="/peptides"
              className="rounded-full border border-white/20 px-7 py-3 text-[13.5px] font-semibold tracking-[0.3px] text-white transition-colors hover:border-white/40"
            >
              Browse all peptides
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
