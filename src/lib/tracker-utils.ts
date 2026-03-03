import type { TrackerProtocol, DoseLog, ScheduledDose, StreakInfo, VialStatus } from './tracker-types'

function toDateStr(d: Date): string {
  return d.toISOString().split('T')[0]
}

function daysBetween(a: string, b: string): number {
  const da = new Date(a + 'T00:00:00')
  const db = new Date(b + 'T00:00:00')
  return Math.round((db.getTime() - da.getTime()) / 86400000)
}

function getDayOfWeek(dateStr: string): number {
  return new Date(dateStr + 'T12:00:00').getDay()
}

export function isDoseDay(protocol: TrackerProtocol, dateStr: string): boolean {
  if (!protocol.isActive) return false

  const startDate = protocol.startDate
  const days = daysBetween(startDate, dateStr)
  if (days < 0) return false

  // Handle cycle/off weeks
  if (protocol.cycleWeeks && protocol.offWeeks) {
    const totalCycleDays = (protocol.cycleWeeks + protocol.offWeeks) * 7
    const dayInCycle = days % totalCycleDays
    if (dayInCycle >= protocol.cycleWeeks * 7) return false
  }

  switch (protocol.frequency) {
    case 'daily':
      return true
    case 'twice-daily':
      return true // Same day, just 2 doses
    case 'eod':
      return days % 2 === 0
    case '3x-week': {
      const dow = getDayOfWeek(dateStr)
      return dow === 1 || dow === 3 || dow === 5 // Mon, Wed, Fri
    }
    case 'weekly':
      return days % 7 === 0
    case 'biweekly':
      return days % 14 === 0
    case 'custom':
      if (!protocol.customDays?.length) return false
      return protocol.customDays.includes(getDayOfWeek(dateStr))
    default:
      return false
  }
}

export function getDosesPerDay(protocol: TrackerProtocol): number {
  return protocol.frequency === 'twice-daily' ? 2 : 1
}

export function getCurrentDose(protocol: TrackerProtocol, dateStr?: string): number {
  if (!protocol.escalation?.schedule?.length) return protocol.dose

  const today = dateStr || toDateStr(new Date())
  const weeksSinceStart = Math.floor(daysBetween(protocol.startDate, today) / 7)

  // Find the highest matching week in the escalation schedule
  let currentDose = protocol.dose
  for (const step of protocol.escalation.schedule) {
    if (weeksSinceStart >= step.weekNumber - 1) {
      currentDose = step.dose
    }
  }
  return currentDose
}

export function getScheduledDoses(
  protocols: TrackerProtocol[],
  logs: DoseLog[],
  dateStr: string
): ScheduledDose[] {
  const dayLogs = logs.filter((l) => l.timestamp.startsWith(dateStr))

  const scheduled: ScheduledDose[] = []
  for (const protocol of protocols) {
    if (!isDoseDay(protocol, dateStr)) continue

    const dosesNeeded = getDosesPerDay(protocol)
    const protocolLogs = dayLogs.filter((l) => l.protocolId === protocol.id)
    const currentDose = getCurrentDose(protocol, dateStr)

    for (let i = 0; i < dosesNeeded; i++) {
      const matchingLog = protocolLogs[i]
      scheduled.push({
        protocol,
        dose: currentDose,
        unit: protocol.unit,
        isLogged: !!matchingLog && !matchingLog.skipped,
        isSkipped: !!matchingLog?.skipped,
        logId: matchingLog?.id,
      })
    }
  }

  return scheduled
}

export function calculateStreak(
  protocols: TrackerProtocol[],
  logs: DoseLog[]
): StreakInfo {
  if (!protocols.length) {
    return { current: 0, longest: 0, lastLogDate: '', adherencePercent: 0 }
  }

  const today = toDateStr(new Date())
  let current = 0
  let longest = 0
  let totalScheduled = 0
  let totalLogged = 0
  let lastLogDate = ''

  // Find the actual log entries
  const logDates = [...new Set(logs.filter((l) => !l.skipped).map((l) => l.timestamp.split('T')[0]))]
  if (logDates.length) {
    lastLogDate = logDates.sort().reverse()[0]
  }

  // Walk backwards from today to count streak + adherence
  const earliest = protocols.reduce((min, p) => (p.startDate < min ? p.startDate : min), today)
  const daysToCheck = Math.min(daysBetween(earliest, today), 365) // Cap at 1 year

  let streakBroken = false
  let tempStreak = 0

  for (let d = 0; d <= daysToCheck; d++) {
    const checkDate = new Date()
    checkDate.setDate(checkDate.getDate() - d)
    const dateStr = toDateStr(checkDate)

    const scheduled = getScheduledDoses(protocols, [], dateStr)
    if (!scheduled.length) continue

    totalScheduled += scheduled.length
    const dayLogs = logs.filter((l) => l.timestamp.startsWith(dateStr) && !l.skipped)
    const loggedCount = Math.min(dayLogs.length, scheduled.length)
    totalLogged += loggedCount

    const allLogged = loggedCount >= scheduled.length

    if (!streakBroken) {
      if (allLogged) {
        tempStreak++
      } else if (d === 0) {
        // Today is not yet complete — don't break streak for today
        // Only count if at least one dose was logged
        if (loggedCount > 0) tempStreak++
      } else {
        streakBroken = true
        current = tempStreak
      }
    }

    if (allLogged) {
      // Track consecutive for longest
    }
  }

  if (!streakBroken) current = tempStreak

  // Calculate longest streak with a separate forward pass
  const forwardDays = daysToCheck
  let runStreak = 0
  for (let d = forwardDays; d >= 0; d--) {
    const checkDate = new Date()
    checkDate.setDate(checkDate.getDate() - d)
    const dateStr = toDateStr(checkDate)

    const scheduled = getScheduledDoses(protocols, [], dateStr)
    if (!scheduled.length) continue

    const dayLogs = logs.filter((l) => l.timestamp.startsWith(dateStr) && !l.skipped)
    if (dayLogs.length >= scheduled.length) {
      runStreak++
      if (runStreak > longest) longest = runStreak
    } else {
      runStreak = 0
    }
  }

  const adherencePercent = totalScheduled > 0 ? Math.round((totalLogged / totalScheduled) * 100) : 0

  return { current, longest, lastLogDate, adherencePercent }
}

export function getVialStatus(protocol: TrackerProtocol, logs: DoseLog[]): VialStatus | null {
  if (!protocol.vial) return null

  const protocolLogs = logs.filter((l) => l.protocolId === protocol.id && !l.skipped)
  const logsSinceRecon = protocolLogs.filter((l) => l.timestamp >= protocol.vial!.reconDate)

  const doseInMg = protocol.unit === 'mcg' ? protocol.dose / 1000 : protocol.dose
  const totalDosesInVial = Math.floor(protocol.vial.totalAmount / doseInMg)
  const dosesUsed = logsSinceRecon.length
  const dosesRemaining = Math.max(0, totalDosesInVial - dosesUsed)

  // Calculate doses per week based on frequency
  let dosesPerWeek: number
  switch (protocol.frequency) {
    case 'daily': dosesPerWeek = 7; break
    case 'twice-daily': dosesPerWeek = 14; break
    case 'eod': dosesPerWeek = 3.5; break
    case '3x-week': dosesPerWeek = 3; break
    case 'weekly': dosesPerWeek = 1; break
    case 'biweekly': dosesPerWeek = 0.5; break
    case 'custom': dosesPerWeek = (protocol.customDays?.length || 1); break
    default: dosesPerWeek = 1
  }

  const daysUntilEmpty = dosesPerWeek > 0 ? Math.round((dosesRemaining / dosesPerWeek) * 7) : 999

  const today = toDateStr(new Date())
  const daysSinceRecon = daysBetween(protocol.vial.reconDate, today)

  return {
    dosesRemaining,
    daysUntilEmpty,
    isLow: dosesRemaining < 3,
    reconDate: protocol.vial.reconDate,
    daysSinceRecon,
    isExpired: daysSinceRecon > 28,
  }
}

export function getFrequencyLabel(freq: TrackerProtocol['frequency']): string {
  const labels: Record<string, string> = {
    'daily': 'Daily',
    'twice-daily': 'Twice Daily',
    'eod': 'Every Other Day',
    '3x-week': '3x Per Week',
    'weekly': 'Weekly',
    'biweekly': 'Every 2 Weeks',
    'custom': 'Custom',
  }
  return labels[freq] || freq
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function formatDateFull(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}
