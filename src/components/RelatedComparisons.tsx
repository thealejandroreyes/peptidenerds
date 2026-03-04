import Link from 'next/link'
import type { Comparison } from '@/lib/types'

const categoryLabels: Record<string, string> = {
  'glp1-weight-loss': 'GLP-1',
  'healing-recovery': 'Healing',
  'gh-secretagogue': 'Growth Hormone',
  'metabolic': 'Metabolic',
  'brand-vs-brand': 'Brand',
  'anti-aging': 'Anti-Aging',
  'nootropic': 'Nootropic',
  'cross-category': 'Cross-Category',
  'sexual-health': 'Sexual Health',
}

export function RelatedComparisons({ comparisons }: { comparisons: Comparison[] }) {
  if (comparisons.length === 0) return null

  return (
    <div>
      <h2 className="text-xl text-foreground" id="related-comparisons">Related Comparisons</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {comparisons.map((comp) => (
          <Link
            key={comp.slug}
            href={`/compare/${comp.slug}`}
            className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-accent hover:bg-card-hover"
          >
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-pearl px-2 py-0.5 text-[10px] font-medium text-muted">
                {categoryLabels[comp.category] || comp.category}
              </span>
              <span className="text-[10px] text-muted">{comp.dimensions.length} dimensions</span>
              {comp.winner && (
                <span className="rounded-full bg-green-50 border border-green-200 px-2 py-0.5 text-[10px] text-green-700">
                  Winner: {comp.winner}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
              {comp.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
