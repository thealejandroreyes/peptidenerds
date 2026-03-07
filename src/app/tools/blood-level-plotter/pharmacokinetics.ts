export interface CompoundParams {
  name: string
  slug: string
  halfLifeHours: number
  bioavailability: number
  defaultDoseMg: number
  defaultFrequencyHours: number
  unit: string
  titrationTemplate: { weekStart: number; doseMg: number }[]
}

export const compounds: Record<string, CompoundParams> = {
  'semaglutide-injection': {
    name: 'Semaglutide (Injection)',
    slug: 'semaglutide-injection',
    halfLifeHours: 168,
    bioavailability: 0.89,
    defaultDoseMg: 0.25,
    defaultFrequencyHours: 168,
    unit: 'mg',
    titrationTemplate: [
      { weekStart: 1, doseMg: 0.25 },
      { weekStart: 5, doseMg: 0.5 },
      { weekStart: 9, doseMg: 1.0 },
      { weekStart: 13, doseMg: 1.7 },
      { weekStart: 17, doseMg: 2.4 },
    ],
  },
  'semaglutide-oral': {
    name: 'Semaglutide (Oral)',
    slug: 'semaglutide-oral',
    halfLifeHours: 168,
    bioavailability: 0.01,
    defaultDoseMg: 3,
    defaultFrequencyHours: 24,
    unit: 'mg',
    titrationTemplate: [
      { weekStart: 1, doseMg: 3 },
      { weekStart: 5, doseMg: 7 },
      { weekStart: 9, doseMg: 14 },
    ],
  },
  tirzepatide: {
    name: 'Tirzepatide (Injection)',
    slug: 'tirzepatide',
    halfLifeHours: 120,
    bioavailability: 0.80,
    defaultDoseMg: 2.5,
    defaultFrequencyHours: 168,
    unit: 'mg',
    titrationTemplate: [
      { weekStart: 1, doseMg: 2.5 },
      { weekStart: 5, doseMg: 5.0 },
      { weekStart: 9, doseMg: 7.5 },
      { weekStart: 13, doseMg: 10.0 },
      { weekStart: 17, doseMg: 15.0 },
    ],
  },
  retatrutide: {
    name: 'Retatrutide (Injection)',
    slug: 'retatrutide',
    halfLifeHours: 144,
    bioavailability: 0.80,
    defaultDoseMg: 1.0,
    defaultFrequencyHours: 168,
    unit: 'mg',
    titrationTemplate: [
      { weekStart: 1, doseMg: 0.5 },
      { weekStart: 5, doseMg: 1.0 },
      { weekStart: 9, doseMg: 2.0 },
      { weekStart: 13, doseMg: 4.0 },
      { weekStart: 17, doseMg: 8.0 },
      { weekStart: 21, doseMg: 12.0 },
    ],
  },
}

export interface DoseEvent {
  timeHours: number
  doseMg: number
}

export interface TimeSeriesPoint {
  timeHours: number
  timeDays: number
  timeWeeks: number
  concentration: number
  isDoseEvent: boolean
}

export interface Insights {
  steadyStateWeeks: number
  peakConcentration: number
  troughConcentration: number
  accumulationRatio: number
}

/**
 * Generate all dose events based on a titration schedule and dosing frequency.
 */
export function generateDoseEvents(
  titrationSteps: { weekStart: number; doseMg: number }[],
  frequencyHours: number,
  totalWeeks: number
): DoseEvent[] {
  const totalHours = totalWeeks * 168
  const events: DoseEvent[] = []

  // Sort steps by weekStart ascending
  const sortedSteps = [...titrationSteps].sort((a, b) => a.weekStart - b.weekStart)

  for (let t = 0; t < totalHours; t += frequencyHours) {
    // Find the active dose for this time point
    const currentWeek = Math.floor(t / 168) + 1
    let doseMg = sortedSteps[0]?.doseMg ?? 0

    for (const step of sortedSteps) {
      if (currentWeek >= step.weekStart) {
        doseMg = step.doseMg
      } else {
        break
      }
    }

    events.push({ timeHours: t, doseMg })
  }

  return events
}

/**
 * Calculate concentration at a specific time point given all prior dose events.
 */
export function calculateConcentration(
  timeHours: number,
  doseEvents: DoseEvent[],
  halfLifeHours: number,
  bioavailability: number
): number {
  let total = 0
  const ke = Math.LN2 / halfLifeHours

  for (const event of doseEvents) {
    if (timeHours < event.timeHours) break
    const elapsed = timeHours - event.timeHours
    total += event.doseMg * bioavailability * Math.exp(-ke * elapsed)
  }

  return total
}

/**
 * Generate full time series for charting.
 * Uses 6-hour intervals for smooth curves.
 */
export function generateTimeSeries(
  doseEvents: DoseEvent[],
  halfLifeHours: number,
  bioavailability: number,
  totalWeeks: number
): TimeSeriesPoint[] {
  const totalHours = totalWeeks * 168
  const interval = 6 // every 6 hours
  const points: TimeSeriesPoint[] = []

  const doseTimesSet = new Set(doseEvents.map((e) => e.timeHours))

  for (let t = 0; t <= totalHours; t += interval) {
    const concentration = calculateConcentration(t, doseEvents, halfLifeHours, bioavailability)

    points.push({
      timeHours: t,
      timeDays: t / 24,
      timeWeeks: t / 168,
      concentration,
      isDoseEvent: doseTimesSet.has(t),
    })
  }

  return points
}

/**
 * Calculate key insights from a time series.
 */
export function calculateInsights(
  timeSeries: TimeSeriesPoint[],
  doseEvents: DoseEvent[],
  halfLifeHours: number,
  bioavailability: number,
  frequencyHours: number
): Insights {
  if (timeSeries.length === 0 || doseEvents.length === 0) {
    return {
      steadyStateWeeks: 0,
      peakConcentration: 0,
      troughConcentration: 0,
      accumulationRatio: 0,
    }
  }

  // Peak concentration: max across entire series
  let peakConcentration = 0
  for (const pt of timeSeries) {
    if (pt.concentration > peakConcentration) {
      peakConcentration = pt.concentration
    }
  }

  // Find trough values (concentration just before each dose).
  // Only consider troughs in the last third of the timeline to get steady-state troughs.
  const lastThirdStart = timeSeries[Math.floor(timeSeries.length * 0.66)]?.timeHours ?? 0
  const lateTroughs: number[] = []
  for (const event of doseEvents) {
    if (event.timeHours <= 0) continue
    // Trough is the concentration just before the next dose
    const troughTime = event.timeHours - 1
    if (troughTime >= lastThirdStart) {
      const c = calculateConcentration(troughTime, doseEvents, halfLifeHours, bioavailability)
      lateTroughs.push(c)
    }
  }

  const troughConcentration =
    lateTroughs.length > 0
      ? lateTroughs.reduce((a, b) => a + b, 0) / lateTroughs.length
      : 0

  // First dose trough: concentration just before the second dose
  let firstDoseTrough = 0
  if (doseEvents.length >= 2) {
    const secondDoseTime = doseEvents[1].timeHours
    firstDoseTrough = calculateConcentration(
      secondDoseTime - 1,
      doseEvents,
      halfLifeHours,
      bioavailability
    )
  }

  const accumulationRatio = firstDoseTrough > 0 ? troughConcentration / firstDoseTrough : 0

  // Steady state detection: find when trough-to-trough variance drops below 5%.
  // Walk through dose events, compare consecutive troughs.
  let steadyStateWeeks = 0
  const troughsByDose: { weekNum: number; trough: number }[] = []
  for (let i = 1; i < doseEvents.length; i++) {
    const troughTime = doseEvents[i].timeHours - 1
    const c = calculateConcentration(troughTime, doseEvents, halfLifeHours, bioavailability)
    const weekNum = Math.ceil(doseEvents[i].timeHours / 168)
    troughsByDose.push({ weekNum, trough: c })
  }

  // Find first point where three consecutive troughs are within 5% of each other
  for (let i = 2; i < troughsByDose.length; i++) {
    const a = troughsByDose[i - 2].trough
    const b = troughsByDose[i - 1].trough
    const c = troughsByDose[i].trough
    if (a === 0) continue

    const maxVal = Math.max(a, b, c)
    const minVal = Math.min(a, b, c)
    const variance = (maxVal - minVal) / maxVal

    if (variance < 0.05) {
      steadyStateWeeks = troughsByDose[i - 2].weekNum
      break
    }
  }

  // If we never found steady state within the data, estimate from half-life (4-5 half-lives)
  if (steadyStateWeeks === 0) {
    steadyStateWeeks = Math.ceil((halfLifeHours * 5) / 168)
  }

  return {
    steadyStateWeeks,
    peakConcentration,
    troughConcentration,
    accumulationRatio,
  }
}
