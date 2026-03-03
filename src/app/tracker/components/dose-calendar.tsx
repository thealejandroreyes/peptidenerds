'use client'

import { useState } from 'react'
import type { TrackerData } from '@/lib/tracker-types'
import { getScheduledDoses, formatDateFull } from '@/lib/tracker-utils'

interface Props {
  data: TrackerData
}

function toDateStr(d: Date): string {
  return d.toISOString().split('T')[0]
}

type DayStatus = 'all-done' | 'partial' | 'missed' | 'none' | 'future'

function getDayStatus(
  data: TrackerData,
  dateStr: string,
  isToday: boolean,
  isFuture: boolean
): DayStatus {
  const scheduled = getScheduledDoses(data.protocols, data.doseLogs, dateStr)
  if (!scheduled.length) return 'none'
  if (isFuture) return 'future'

  const logged = scheduled.filter((s) => s.isLogged).length
  const total = scheduled.length

  if (logged >= total) return 'all-done'
  if (logged > 0 || (isToday && scheduled.some((s) => s.isSkipped))) return 'partial'
  if (isToday) return 'partial' // Today is still in progress
  return 'missed'
}

const statusDot: Record<DayStatus, string> = {
  'all-done': 'bg-accent',
  partial: 'bg-cta',
  missed: 'bg-red-400',
  none: '',
  future: 'bg-border/50',
}

export function DoseCalendar({ data }: Props) {
  const today = new Date()
  const [viewMonth, setViewMonth] = useState(today.getMonth())
  const [viewYear, setViewYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  const todayStr = toDateStr(today)

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1)
  const lastDay = new Date(viewYear, viewMonth + 1, 0)
  const startPad = firstDay.getDay() // 0=Sun
  const totalDays = lastDay.getDate()

  const monthName = firstDay.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(viewYear - 1)
    } else {
      setViewMonth(viewMonth - 1)
    }
    setSelectedDate(null)
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(viewYear + 1)
    } else {
      setViewMonth(viewMonth + 1)
    }
    setSelectedDate(null)
  }

  const cells: { dateStr: string; day: number; status: DayStatus; isToday: boolean }[] = []
  for (let d = 1; d <= totalDays; d++) {
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const isToday = dateStr === todayStr
    const isFuture = dateStr > todayStr
    cells.push({
      dateStr,
      day: d,
      status: getDayStatus(data, dateStr, isToday, isFuture),
      isToday,
    })
  }

  // Detail view for selected date
  const selectedScheduled = selectedDate
    ? getScheduledDoses(data.protocols, data.doseLogs, selectedDate)
    : []

  return (
    <div>
      {/* Month navigation */}
      <div className="mb-4 flex items-center justify-between">
        <button
          onClick={prevMonth}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-pearl hover:text-foreground"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <h2 className="text-lg text-foreground">{monthName}</h2>
        <button
          onClick={nextMonth}
          className="rounded-lg p-2 text-muted transition-colors hover:bg-pearl hover:text-foreground"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      {/* Calendar grid */}
      <div className="rounded-xl border border-border bg-card p-4">
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
            <div key={d} className="py-1 text-center text-[10px] font-medium text-muted uppercase">
              {d}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {/* Padding for first week */}
          {Array.from({ length: startPad }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}

          {cells.map((cell) => (
            <button
              key={cell.dateStr}
              onClick={() => setSelectedDate(cell.dateStr === selectedDate ? null : cell.dateStr)}
              className={`relative flex flex-col items-center rounded-lg py-2 text-sm transition-colors ${
                cell.isToday
                  ? 'bg-accent/10 font-semibold text-accent'
                  : selectedDate === cell.dateStr
                    ? 'bg-pearl text-foreground'
                    : 'text-foreground hover:bg-pearl'
              }`}
            >
              {cell.day}
              {cell.status !== 'none' && cell.status !== 'future' && (
                <span
                  className={`mt-0.5 h-1.5 w-1.5 rounded-full ${statusDot[cell.status]}`}
                />
              )}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-4 border-t border-border pt-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-[10px] text-muted">All logged</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cta" />
            <span className="text-[10px] text-muted">Partial</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="text-[10px] text-muted">Missed</span>
          </div>
        </div>
      </div>

      {/* Selected date detail */}
      {selectedDate && selectedScheduled.length > 0 && (
        <div className="mt-4 rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-medium text-foreground">{formatDateFull(selectedDate)}</h3>
          <div className="mt-2 space-y-2">
            {selectedScheduled.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                {item.isLogged ? (
                  <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : item.isSkipped ? (
                  <svg className="h-4 w-4 shrink-0 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69z" />
                  </svg>
                ) : (
                  <span className="h-4 w-4 shrink-0 rounded-full border-2 border-red-300" />
                )}
                <span className={item.isLogged ? 'text-foreground' : item.isSkipped ? 'text-muted' : 'text-red-600'}>
                  {item.protocol.name} &mdash; {item.dose} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
