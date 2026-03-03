'use client'

import type { TrackerData } from '@/lib/tracker-types'
import { getVialStatus, formatDateShort } from '@/lib/tracker-utils'

interface Props {
  data: TrackerData
}

export function VialTracker({ data }: Props) {
  const protocolsWithVials = data.protocols.filter((p) => p.vial && p.isActive)

  if (!protocolsWithVials.length) return null

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg text-foreground">Vial Inventory</h2>

      <div className="mt-4 space-y-3">
        {protocolsWithVials.map((protocol) => {
          const status = getVialStatus(protocol, data.doseLogs)
          if (!status) return null

          const fillPercent = protocol.vial
            ? Math.round(
                (status.dosesRemaining /
                  Math.floor(
                    protocol.vial.totalAmount /
                      (protocol.unit === 'mcg' ? protocol.dose / 1000 : protocol.dose)
                  )) *
                  100
              )
            : 0

          return (
            <div key={protocol.id} className="rounded-lg border border-border/60 bg-background p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-foreground">{protocol.name}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {protocol.vial?.totalAmount} mg vial &middot; Reconstituted{' '}
                    {formatDateShort(status.reconDate)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">
                    {status.dosesRemaining} doses
                  </p>
                  <p className="text-xs text-muted">~{status.daysUntilEmpty} days left</p>
                </div>
              </div>

              {/* Fill bar */}
              <div className="mt-3 h-1.5 w-full rounded-full bg-pearl">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    status.isLow ? 'bg-red-400' : status.isExpired ? 'bg-red-400' : 'bg-accent'
                  }`}
                  style={{ width: `${Math.max(fillPercent, 2)}%` }}
                />
              </div>

              {/* Warnings */}
              {(status.isLow || status.isExpired) && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {status.isLow && (
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-medium text-red-700">
                      Low supply — {status.dosesRemaining} doses remaining
                    </span>
                  )}
                  {status.isExpired && (
                    <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-medium text-red-700">
                      {status.daysSinceRecon} days since reconstitution (28-day shelf life)
                    </span>
                  )}
                </div>
              )}

              {/* Shelf life notice */}
              {!status.isExpired && status.daysSinceRecon > 21 && (
                <p className="mt-2 text-[10px] text-cta-foreground">
                  {28 - status.daysSinceRecon} days of shelf life remaining
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
