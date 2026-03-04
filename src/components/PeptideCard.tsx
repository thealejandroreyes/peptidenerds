import Link from 'next/link'
import type { Peptide } from '@/lib/types'
import { getCategoryLabel, getCategoryColor, getFdaStatusLabel, getFdaStatusColor } from '@/lib/utils'

export function PeptideCard({ peptide }: { peptide: Peptide }) {
  return (
    <Link
      href={`/peptides/${peptide.slug}`}
      className="group block rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:border-accent hover:bg-card-hover hover:scale-[1.01] hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-medium text-primary group-hover:text-accent transition-colors">
            {peptide.name}
          </h3>
          {peptide.abbreviation && (
            <p className="text-sm text-muted">{peptide.abbreviation}</p>
          )}
        </div>
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(peptide.category)}`}>
          {getCategoryLabel(peptide.category)}
        </span>
      </div>
      <p className="mt-3 text-sm text-muted line-clamp-2">{peptide.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs ${getFdaStatusColor(peptide.fdaStatus)}`}>
          {getFdaStatusLabel(peptide.fdaStatus)}
        </span>
        <span className="inline-flex items-center rounded-full border border-border bg-pearl px-2 py-0.5 text-xs text-muted">
          {peptide.research.level} evidence
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {peptide.goals.slice(0, 3).map((goal) => (
          <span key={goal} className="rounded bg-soft-sky/50 px-2 py-0.5 text-xs text-accent">
            {goal}
          </span>
        ))}
        {peptide.goals.length > 3 && (
          <span className="rounded bg-soft-sky/50 px-2 py-0.5 text-xs text-accent">
            +{peptide.goals.length - 3} more
          </span>
        )}
      </div>
    </Link>
  )
}
