import type { Comparison } from '@/lib/types'

export function ComparisonTable({ comparison }: { comparison: Comparison }) {
  const isTriple = !!comparison.peptideC

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Dimension</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-accent">
              {comparison.peptideA}
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-purple-600">
              {comparison.peptideB}
            </th>
            {isTriple && (
              <th className="px-4 py-3 text-center text-sm font-semibold text-amber-600">
                {comparison.peptideC}
              </th>
            )}
            <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Notes</th>
          </tr>
        </thead>
        <tbody>
          {comparison.dimensions.map((dim, i) => (
            <tr key={dim.name} className={i % 2 === 0 ? 'bg-pearl/50' : ''}>
              <td className="px-4 py-3 text-sm font-medium text-foreground">{dim.name}</td>
              <td className="px-4 py-3 text-center text-sm text-muted">{dim.peptideAScore}</td>
              <td className="px-4 py-3 text-center text-sm text-muted">{dim.peptideBScore}</td>
              {isTriple && (
                <td className="px-4 py-3 text-center text-sm text-muted">{dim.peptideCScore || '—'}</td>
              )}
              <td className="px-4 py-3 text-sm text-muted">{dim.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
