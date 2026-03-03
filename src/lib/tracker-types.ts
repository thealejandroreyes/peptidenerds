export interface TrackerProtocol {
  id: string
  name: string
  peptideSlug: string
  dose: number
  unit: 'mcg' | 'mg'
  frequency: 'daily' | 'twice-daily' | 'eod' | '3x-week' | 'weekly' | 'biweekly' | 'custom'
  customDays?: number[] // 0=Sun...6=Sat
  startDate: string // ISO date
  cycleWeeks?: number
  offWeeks?: number
  isActive: boolean
  notes?: string
  escalation?: {
    schedule: { weekNumber: number; dose: number }[]
  }
  vial?: {
    totalAmount: number // mg in vial
    reconDate: string
    dosesRemaining: number
  }
  createdAt: string
}

export interface DoseLog {
  id: string
  protocolId: string
  timestamp: string // ISO datetime
  dose: number
  unit: 'mcg' | 'mg'
  skipped?: boolean
  notes?: string
}

export interface StreakInfo {
  current: number
  longest: number
  lastLogDate: string
  adherencePercent: number
}

export interface VialStatus {
  dosesRemaining: number
  daysUntilEmpty: number
  isLow: boolean // < 3 doses
  reconDate: string
  daysSinceRecon: number
  isExpired: boolean // > 28 days
}

export interface ScheduledDose {
  protocol: TrackerProtocol
  dose: number
  unit: 'mcg' | 'mg'
  isLogged: boolean
  isSkipped: boolean
  logId?: string
}

export interface TrackerData {
  protocols: TrackerProtocol[]
  doseLogs: DoseLog[]
}
