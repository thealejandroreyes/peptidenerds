import type { VerdictBox } from '@/lib/types'

const borderColors = [
  'border-l-accent',
  'border-l-purple-600',
  'border-l-amber-600',
]

export function VerdictBoxes({ verdicts }: { verdicts: VerdictBox[] }) {
  if (verdicts.length === 0) return null

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {verdicts.map((verdict, i) => (
        <div
          key={verdict.peptide}
          className={`rounded-xl border border-border bg-card p-5 border-l-4 ${borderColors[i] || borderColors[0]}`}
        >
          <h3 className="text-sm font-semibold text-foreground">{verdict.heading}</h3>
          <ul className="mt-3 space-y-2">
            {verdict.reasons.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-sm text-muted">
                <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {reason}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
