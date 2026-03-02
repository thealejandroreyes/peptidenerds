import type { Metadata } from 'next'
import Link from 'next/link'
import { comparisons } from '@/data/comparisons'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Peptide Comparisons — Semaglutide vs Tirzepatide and More',
  description:
    'Compare weight loss peptides head-to-head: semaglutide vs tirzepatide, Ozempic vs Wegovy, compounded vs brand-name. Side-by-side efficacy, side effects, cost, and availability.',
}

// Weight loss comparisons first (solar system ordering)
const weightLossSlugs = [
  'semaglutide-vs-tirzepatide',
  'semaglutide-vs-retatrutide',
  'tirzepatide-vs-retatrutide',
  'semaglutide-vs-liraglutide',
  'ozempic-vs-wegovy',
  'mounjaro-vs-zepbound',
  'compounded-vs-brand-semaglutide',
  'semaglutide-vs-tirzepatide-vs-retatrutide',
  'semaglutide-vs-survodutide',
]

export default function ComparePage() {
  const weightLoss = comparisons.filter((c) => weightLossSlugs.includes(c.slug))
  const other = comparisons.filter((c) => !weightLossSlugs.includes(c.slug))

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Compare', href: '/compare' }]} />

      <h1 className="text-3xl font-bold text-foreground">Peptide Comparisons</h1>
      <p className="mt-3 text-muted">
        {comparisons.length} side-by-side comparisons. Each breaks down efficacy, mechanism, side effects, cost,
        and availability to help you decide.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-foreground">Weight Loss Peptide Comparisons</h2>
      <p className="mt-1 text-sm text-muted">GLP-1 agonists and weight loss compounds compared head-to-head.</p>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {weightLoss.map((comp) => (
          <Link
            key={comp.slug}
            href={`/compare/${comp.slug}`}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:bg-card-hover"
          >
            <h2 className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
              {comp.title}
            </h2>
            <p className="mt-2 text-xs text-muted line-clamp-3">{comp.metaDescription}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-accent">{comp.dimensions.length} dimensions compared</span>
              {comp.winner && (
                <span className="rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-xs text-green-700">
                  Winner: {comp.winner}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {other.length > 0 && (
        <>
          <h2 className="mt-12 text-xl font-semibold text-foreground">Other Peptide Comparisons</h2>
          <p className="mt-1 text-sm text-muted">Healing, growth hormone, and specialty peptide matchups.</p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {other.map((comp) => (
              <Link
                key={comp.slug}
                href={`/compare/${comp.slug}`}
                className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:bg-card-hover"
              >
                <h2 className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                  {comp.title}
                </h2>
                <p className="mt-2 text-xs text-muted line-clamp-3">{comp.metaDescription}</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-accent">{comp.dimensions.length} dimensions compared</span>
                  {comp.winner && (
                    <span className="rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-xs text-green-700">
                      Winner: {comp.winner}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
