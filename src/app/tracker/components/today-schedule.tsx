'use client'

import Link from 'next/link'
import type { TrackerData } from '@/lib/tracker-types'
import { getScheduledDoses, getCurrentDose, formatDateFull } from '@/lib/tracker-utils'
import { logDose, undoLog, generateId } from '@/lib/tracker-store'

function todayStr(): string {
  return new Date().toISOString().split('T')[0]
}

interface Props {
  data: TrackerData
  onUpdate: () => void
}

export function TodaySchedule({ data, onUpdate }: Props) {
  const today = todayStr()
  const scheduled = getScheduledDoses(data.protocols, data.doseLogs, today)

  if (!scheduled.length) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <p className="text-lg text-foreground">No doses scheduled today</p>
        <p className="mt-2 text-sm text-muted">
          Enjoy the rest day. Your next dose will show up here when it is due.
        </p>
      </div>
    )
  }

  const allDone = scheduled.every((s) => s.isLogged || s.isSkipped)

  function handleLog(item: (typeof scheduled)[0]) {
    logDose({
      id: generateId(),
      protocolId: item.protocol.id,
      timestamp: new Date().toISOString(),
      dose: item.dose,
      unit: item.unit,
    })
    onUpdate()
  }

  function handleSkip(item: (typeof scheduled)[0]) {
    logDose({
      id: generateId(),
      protocolId: item.protocol.id,
      timestamp: new Date().toISOString(),
      dose: item.dose,
      unit: item.unit,
      skipped: true,
    })
    onUpdate()
  }

  function handleUndo(logId: string) {
    undoLog(logId)
    onUpdate()
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg text-foreground">{formatDateFull(today)}</h2>
        {allDone && (
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
            All done
          </span>
        )}
      </div>

      <div className="space-y-3">
        {scheduled.map((item, idx) => {
          const doseLabel =
            item.dose >= 1 && item.unit === 'mg'
              ? `${item.dose} mg`
              : item.unit === 'mcg'
                ? `${item.dose} mcg`
                : `${item.dose} ${item.unit}`

          const isEscalating = !!item.protocol.escalation?.schedule?.length
          const weekNum = isEscalating
            ? Math.floor(
                (new Date().getTime() - new Date(item.protocol.startDate + 'T00:00:00').getTime()) /
                  (7 * 86400000)
              ) + 1
            : null

          return (
            <div
              key={`${item.protocol.id}-${idx}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
            >
              {/* Status indicator */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                {item.isLogged ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                    <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                ) : item.isSkipped ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pearl">
                    <svg className="h-5 w-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z" />
                    </svg>
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border" />
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-foreground">{item.protocol.name}</p>
                  {isEscalating && (
                    <span className="rounded bg-soft-sky/50 px-1.5 py-0.5 text-[10px] font-medium text-accent">
                      Week {weekNum}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted">
                  {doseLabel}
                  {item.protocol.frequency === 'twice-daily' && (
                    <span className="ml-1.5 text-xs">({idx === 0 ? 'AM' : 'PM'})</span>
                  )}
                </p>
                <Link
                  href={`/peptides/${item.protocol.peptideSlug}`}
                  className="text-xs text-accent hover:text-accent-hover transition-colors"
                >
                  Learn more
                </Link>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 gap-2">
                {item.isLogged || item.isSkipped ? (
                  <button
                    onClick={() => item.logId && handleUndo(item.logId)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                  >
                    Undo
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleSkip(item)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground"
                    >
                      Skip
                    </button>
                    <button
                      onClick={() => handleLog(item)}
                      className="rounded-full bg-cta px-4 py-1.5 text-xs font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
                    >
                      Log Dose
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
