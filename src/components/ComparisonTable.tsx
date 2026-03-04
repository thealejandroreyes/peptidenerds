import type { Comparison } from '@/lib/types'

function WinnerCheck() {
  return (
    <svg className="ml-1 inline h-3.5 w-3.5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

function getWinnerBg(winner: string | undefined, position: 'A' | 'B' | 'C') {
  if (winner === position) return 'bg-green-50'
  return ''
}

export function ComparisonTable({ comparison }: { comparison: Comparison }) {
  const isTriple = !!comparison.peptideC

  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
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
                <td className={`px-4 py-3 text-center text-sm text-muted ${getWinnerBg(dim.winner, 'A')}`}>
                  {dim.peptideAScore}
                  {dim.winner === 'A' && <WinnerCheck />}
                </td>
                <td className={`px-4 py-3 text-center text-sm text-muted ${getWinnerBg(dim.winner, 'B')}`}>
                  {dim.peptideBScore}
                  {dim.winner === 'B' && <WinnerCheck />}
                </td>
                {isTriple && (
                  <td className={`px-4 py-3 text-center text-sm text-muted ${getWinnerBg(dim.winner, 'C')}`}>
                    {dim.peptideCScore || '—'}
                    {dim.winner === 'C' && <WinnerCheck />}
                  </td>
                )}
                <td className="px-4 py-3 text-sm text-muted">{dim.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="sm:hidden divide-y divide-border">
        {comparison.dimensions.map((dim) => (
          <div key={dim.name} className="py-4 px-4">
            <p className="text-sm font-medium text-foreground">{dim.name}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div className={`rounded-lg p-2 ${dim.winner === 'A' ? 'bg-green-50 border border-green-200' : 'bg-pearl/50'}`}>
                <p className="text-xs font-medium text-accent">{comparison.peptideA}</p>
                <p className="mt-0.5 text-sm text-foreground">
                  {dim.peptideAScore}
                  {dim.winner === 'A' && <WinnerCheck />}
                </p>
              </div>
              <div className={`rounded-lg p-2 ${dim.winner === 'B' ? 'bg-green-50 border border-green-200' : 'bg-pearl/50'}`}>
                <p className="text-xs font-medium text-purple-600">{comparison.peptideB}</p>
                <p className="mt-0.5 text-sm text-foreground">
                  {dim.peptideBScore}
                  {dim.winner === 'B' && <WinnerCheck />}
                </p>
              </div>
              {isTriple && comparison.peptideC && (
                <div className={`col-span-2 rounded-lg p-2 ${dim.winner === 'C' ? 'bg-green-50 border border-green-200' : 'bg-pearl/50'}`}>
                  <p className="text-xs font-medium text-amber-600">{comparison.peptideC}</p>
                  <p className="mt-0.5 text-sm text-foreground">
                    {dim.peptideCScore || '—'}
                    {dim.winner === 'C' && <WinnerCheck />}
                  </p>
                </div>
              )}
            </div>
            <p className="mt-2 text-xs text-muted">{dim.notes}</p>
          </div>
        ))}
      </div>
    </>
  )
}
