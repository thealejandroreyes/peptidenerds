'use client'

import type { TrackerData } from '@/lib/tracker-types'
import { calculateStreak } from '@/lib/tracker-utils'

interface Props {
  data: TrackerData
}

export function StreakDisplay({ data }: Props) {
  const streak = calculateStreak(data.protocols, data.doseLogs)

  if (!data.protocols.length) {
    return null
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-lg text-foreground">Adherence</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {/* Current streak */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-3xl font-bold text-accent">{streak.current}</span>
            {/* Fire icon in CSS */}
            {streak.current > 0 && (
              <svg className="h-6 w-6 text-cta" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 23c-3.6 0-8-2.4-8-7.7 0-3 1.5-5.3 3-7.1.6-.7 1.2-1.3 1.7-2 .3-.4.9-.4 1.2 0 .5.6.8 1.4.9 2.2.7-.8 1.4-1.8 1.8-2.9.2-.5.8-.7 1.2-.4C16.6 7 20 10.5 20 15.3 20 20.6 15.6 23 12 23zm-4-7.7c0 3.3 2.7 4.7 4 4.7s4-1.4 4-4.7c0-2.7-1.5-4.8-3.2-6.3-.8 1.5-2 2.8-3.2 3.7-.4.3-1 .1-1.2-.3-.3-.7-.5-1.5-.5-2.3-.6.8-1 1.7-1.3 2.5-.4 1-.6 1.8-.6 2.7z"/>
              </svg>
            )}
          </div>
          <p className="mt-1 text-xs text-muted uppercase tracking-wider">Current Streak</p>
          <p className="text-xs text-muted">{streak.current === 1 ? 'day' : 'days'}</p>
        </div>

        {/* Longest streak */}
        <div className="text-center">
          <span className="text-3xl font-bold text-foreground">{streak.longest}</span>
          <p className="mt-1 text-xs text-muted uppercase tracking-wider">Longest Streak</p>
          <p className="text-xs text-muted">{streak.longest === 1 ? 'day' : 'days'}</p>
        </div>

        {/* Adherence rate */}
        <div className="text-center">
          <span className="text-3xl font-bold text-foreground">{streak.adherencePercent}%</span>
          <p className="mt-1 text-xs text-muted uppercase tracking-wider">Adherence</p>
          <p className="text-xs text-muted">overall</p>
        </div>
      </div>

      {/* Adherence bar */}
      {streak.adherencePercent > 0 && (
        <div className="mt-5">
          <div className="h-2 w-full rounded-full bg-pearl">
            <div
              className="h-2 rounded-full bg-accent transition-all"
              style={{ width: `${streak.adherencePercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
