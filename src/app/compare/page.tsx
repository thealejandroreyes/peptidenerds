import type { Metadata } from 'next'
import Link from 'next/link'
import { comparisons } from '@/data/comparisons'
import { peptides } from '@/data/peptides'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CompareAnyTwo } from '@/components/CompareAnyTwo'
import type { ComparisonCategory } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Peptide Comparisons — Head-to-Head Analysis of 27+ Peptides',
  description:
    'Compare peptides head-to-head: semaglutide vs tirzepatide, BPC-157 vs TB-500, and more. Side-by-side analysis of efficacy, side effects, cost, and availability.',
}

const categoryConfig: { key: ComparisonCategory; label: string; description: string }[] = [
  { key: 'glp1-weight-loss', label: 'Weight Loss / GLP-1', description: 'GLP-1 agonists and weight loss compounds compared head-to-head.' },
  { key: 'brand-vs-brand', label: 'Brand vs Brand', description: 'Same drug, different labels — what actually changes.' },
  { key: 'healing-recovery', label: 'Healing & Recovery', description: 'Tissue repair and injury recovery peptides.' },
  { key: 'gh-secretagogue', label: 'Growth Hormone', description: 'GH secretagogues and growth hormone peptides.' },
  { key: 'metabolic', label: 'Metabolic', description: 'Fat metabolism and metabolic optimization peptides.' },
  { key: 'anti-aging', label: 'Anti-Aging', description: 'Longevity and anti-aging peptide comparisons.' },
  { key: 'nootropic', label: 'Nootropic', description: 'Cognitive enhancement and neuroprotective peptides.' },
  { key: 'sexual-health', label: 'Sexual Health', description: 'Sexual function and reproductive health peptides.' },
  { key: 'cross-category', label: 'Cross-Category', description: 'Peptides from different categories compared.' },
]

function buildPrebuiltMap() {
  const map: Record<string, { slug: string; title: string }> = {}
  for (const comp of comparisons) {
    // All pairwise combinations for this comparison
    const slugs = [comp.peptideA, comp.peptideB]
    if (comp.peptideC) slugs.push(comp.peptideC)

    for (let i = 0; i < slugs.length; i++) {
      for (let j = i + 1; j < slugs.length; j++) {
        const sorted = [slugs[i], slugs[j]].sort()
        const key = `${sorted[0]}::${sorted[1]}`
        if (!map[key]) {
          map[key] = { slug: comp.slug, title: comp.title }
        }
      }
    }
  }
  return map
}

export default function ComparePage() {
  const prebuiltMap = buildPrebuiltMap()
  const peptideOptions = peptides.map((p) => ({ name: p.name, slug: p.slug, category: p.category }))
  const editorialCount = comparisons.filter((c) => c.hasEditorialContent).length

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Compare', href: '/compare' }]} />

      <h1 className="text-3xl font-light text-foreground">Peptide Comparisons</h1>
      <p className="mt-3 text-muted">
        {comparisons.length} head-to-head comparisons with evidence-based analysis. {editorialCount} include full editorial reviews with PubMed citations.
      </p>

      {/* Compare Any Two Tool */}
      <div className="mt-8">
        <CompareAnyTwo peptides={peptideOptions} prebuiltMap={prebuiltMap} />
      </div>

      {/* Category sections */}
      {categoryConfig.map(({ key, label, description }) => {
        const categoryComparisons = comparisons.filter((c) => c.category === key)
        if (categoryComparisons.length === 0) return null

        return (
          <div key={key} className="mt-12">
            <h2 className="text-xl text-foreground">{label}</h2>
            <p className="mt-1 text-sm text-muted">{description}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categoryComparisons.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/compare/${comp.slug}`}
                  className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent hover:bg-card-hover"
                >
                  <h3 className="text-sm text-primary group-hover:text-accent transition-colors">
                    {comp.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted line-clamp-3">{comp.metaDescription}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-accent">{comp.dimensions.length} dimensions</span>
                    {comp.winner && (
                      <span className="rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-xs text-green-700">
                        Winner: {comp.winner}
                      </span>
                    )}
                    {comp.hasEditorialContent && (
                      <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs text-accent">
                        Editorial
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
