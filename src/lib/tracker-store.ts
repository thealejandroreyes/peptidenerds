import type { TrackerData, TrackerProtocol, DoseLog } from './tracker-types'

const STORAGE_KEY = 'peptide-nerds-tracker'

function getEmptyData(): TrackerData {
  return { protocols: [], doseLogs: [] }
}

export function loadTracker(): TrackerData {
  if (typeof window === 'undefined') return getEmptyData()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return getEmptyData()
    return JSON.parse(raw) as TrackerData
  } catch {
    return getEmptyData()
  }
}

export function saveTracker(data: TrackerData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function addProtocol(protocol: TrackerProtocol): TrackerData {
  const data = loadTracker()
  data.protocols.push(protocol)
  saveTracker(data)
  return data
}

export function updateProtocol(id: string, updates: Partial<TrackerProtocol>): TrackerData {
  const data = loadTracker()
  const idx = data.protocols.findIndex((p) => p.id === id)
  if (idx !== -1) {
    data.protocols[idx] = { ...data.protocols[idx], ...updates }
  }
  saveTracker(data)
  return data
}

export function deleteProtocol(id: string): TrackerData {
  const data = loadTracker()
  data.protocols = data.protocols.filter((p) => p.id !== id)
  data.doseLogs = data.doseLogs.filter((l) => l.protocolId !== id)
  saveTracker(data)
  return data
}

export function logDose(log: DoseLog): TrackerData {
  const data = loadTracker()
  data.doseLogs.push(log)
  // Update vial doses remaining if tracked
  const protocol = data.protocols.find((p) => p.id === log.protocolId)
  if (protocol?.vial && !log.skipped) {
    const doseInMg = log.unit === 'mcg' ? log.dose / 1000 : log.dose
    protocol.vial.dosesRemaining = Math.max(0, protocol.vial.dosesRemaining - 1)
    const idx = data.protocols.findIndex((p) => p.id === log.protocolId)
    data.protocols[idx] = protocol
  }
  saveTracker(data)
  return data
}

export function undoLog(logId: string): TrackerData {
  const data = loadTracker()
  const log = data.doseLogs.find((l) => l.id === logId)
  if (log) {
    // Restore vial dose if tracked
    const protocol = data.protocols.find((p) => p.id === log.protocolId)
    if (protocol?.vial && !log.skipped) {
      protocol.vial.dosesRemaining += 1
      const idx = data.protocols.findIndex((p) => p.id === log.protocolId)
      data.protocols[idx] = protocol
    }
    data.doseLogs = data.doseLogs.filter((l) => l.id !== logId)
  }
  saveTracker(data)
  return data
}

export function getDoseLogsForDate(date: string): DoseLog[] {
  const data = loadTracker()
  return data.doseLogs.filter((l) => l.timestamp.startsWith(date))
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
