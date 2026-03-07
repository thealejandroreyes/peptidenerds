'use client'

import { useState, useMemo, useCallback } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
} from 'recharts'
import {
  compounds,
  generateDoseEvents,
  generateTimeSeries,
  calculateInsights,
  type CompoundParams,
} from './pharmacokinetics'

type FrequencyOption = {
  label: string
  hours: number
}

const frequencyOptions: FrequencyOption[] = [
  { label: 'Once weekly', hours: 168 },
  { label: 'Every 10 days', hours: 240 },
  { label: 'Every 2 weeks', hours: 336 },
  { label: 'Twice weekly', hours: 84 },
  { label: 'Daily', hours: 24 },
]

const timelineOptions = [4, 8, 12, 16, 20, 24, 36, 52]

interface TitrationStep {
  weekStart: number
  doseMg: number
}

function getDefaultFrequency(compound: CompoundParams): number {
  return compound.defaultFrequencyHours
}

export function PlotterClient() {
  const [compoundKey, setCompoundKey] = useState('semaglutide-injection')
  const [frequencyHours, setFrequencyHours] = useState(168)
  const [totalWeeks, setTotalWeeks] = useState(24)
  const [titrationSteps, setTitrationSteps] = useState<TitrationStep[]>([
    { weekStart: 1, doseMg: 0.25 },
  ])
  const [titrationOpen, setTitrationOpen] = useState(false)

  const compound = compounds[compoundKey]

  const handleCompoundChange = useCallback((key: string) => {
    setCompoundKey(key)
    const c = compounds[key]
    const freq = getDefaultFrequency(c)
    setFrequencyHours(freq)
    setTitrationSteps([{ weekStart: 1, doseMg: c.defaultDoseMg }])
    setTitrationOpen(false)
  }, [])

  const loadTemplate = useCallback(() => {
    setTitrationSteps([...compound.titrationTemplate])
    setTitrationOpen(true)
    // Ensure timeline is long enough to show the full titration
    const lastStep = compound.titrationTemplate[compound.titrationTemplate.length - 1]
    if (lastStep && lastStep.weekStart + 8 > totalWeeks) {
      setTotalWeeks(Math.min(52, lastStep.weekStart + 8))
    }
  }, [compound, totalWeeks])

  const addStep = useCallback(() => {
    setTitrationSteps((prev) => {
      if (prev.length >= 5) return prev
      const lastStep = prev[prev.length - 1]
      return [
        ...prev,
        {
          weekStart: (lastStep?.weekStart ?? 0) + 4,
          doseMg: (lastStep?.doseMg ?? compound.defaultDoseMg) * 2,
        },
      ]
    })
  }, [compound.defaultDoseMg])

  const removeStep = useCallback((index: number) => {
    setTitrationSteps((prev) => {
      if (prev.length <= 1) return prev
      return prev.filter((_, i) => i !== index)
    })
  }, [])

  const updateStep = useCallback(
    (index: number, field: 'weekStart' | 'doseMg', value: number) => {
      setTitrationSteps((prev) =>
        prev.map((step, i) => (i === index ? { ...step, [field]: value } : step))
      )
    },
    []
  )

  // Core calculations
  const { timeSeries, insights, doseEvents } = useMemo(() => {
    const events = generateDoseEvents(titrationSteps, frequencyHours, totalWeeks)
    const series = generateTimeSeries(
      events,
      compound.halfLifeHours,
      compound.bioavailability,
      totalWeeks
    )
    const ins = calculateInsights(
      series,
      events,
      compound.halfLifeHours,
      compound.bioavailability,
      frequencyHours
    )
    return { timeSeries: series, insights: ins, doseEvents: events }
  }, [titrationSteps, frequencyHours, totalWeeks, compound])

  // Chart data: downsample for display
  const chartData = useMemo(() => {
    // Show every point for short timelines, skip some for long ones
    const skip = totalWeeks > 24 ? 2 : 1
    return timeSeries
      .filter((_, i) => i % skip === 0)
      .map((pt) => ({
        timeWeeks: Math.round(pt.timeWeeks * 100) / 100,
        concentration: Math.round(pt.concentration * 1000) / 1000,
        isDoseEvent: pt.isDoseEvent,
      }))
  }, [timeSeries, totalWeeks])

  // Steady state line value (average of last 10% of data)
  const steadyStateLine = useMemo(() => {
    if (insights.steadyStateWeeks >= totalWeeks) return null
    const steadyPoints = timeSeries.filter(
      (pt) => pt.timeWeeks >= insights.steadyStateWeeks
    )
    if (steadyPoints.length === 0) return null
    const avg =
      steadyPoints.reduce((sum, pt) => sum + pt.concentration, 0) / steadyPoints.length
    return Math.round(avg * 1000) / 1000
  }, [timeSeries, insights.steadyStateWeeks, totalWeeks])

  // Dose event markers for the chart
  const doseMarkers = useMemo(() => {
    return doseEvents
      .filter((e) => {
        const week = e.timeHours / 168
        return week <= totalWeeks
      })
      .map((e) => ({
        timeWeeks: Math.round((e.timeHours / 168) * 100) / 100,
        concentration: 0,
      }))
      // Limit markers to avoid clutter (daily dosing = too many)
      .filter((_, i, arr) => {
        if (arr.length <= 60) return true
        const step = Math.ceil(arr.length / 60)
        return i % step === 0
      })
  }, [doseEvents, totalWeeks])

  return (
    <div className="space-y-8">
      {/* Section 1: Compound & Dose */}
      <div>
        <h2 className="text-xl font-light text-foreground">Compound & Dose</h2>

        {/* Compound selector */}
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {Object.entries(compounds).map(([key, c]) => (
            <button
              key={key}
              onClick={() => handleCompoundChange(key)}
              className={`rounded-xl border p-3 text-left text-sm transition-colors ${
                compoundKey === key
                  ? 'border-accent bg-accent/5 font-medium text-accent'
                  : 'border-border bg-card text-foreground hover:border-accent/50'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Frequency */}
        <div className="mt-4">
          <label className="text-sm font-medium text-foreground">Dosing Frequency</label>
          <select
            value={frequencyHours}
            onChange={(e) => setFrequencyHours(Number(e.target.value))}
            className="mt-1.5 block w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {frequencyOptions.map((opt) => (
              <option key={opt.hours} value={opt.hours}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 2: Titration Schedule */}
      <div>
        <button
          onClick={() => setTitrationOpen(!titrationOpen)}
          className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:border-accent/50"
        >
          <div>
            <h2 className="text-xl font-light text-foreground">Titration Schedule</h2>
            <p className="mt-0.5 text-xs text-muted">
              {titrationSteps.length === 1
                ? `Fixed dose: ${titrationSteps[0].doseMg} ${compound.unit}`
                : `${titrationSteps.length} steps configured`}
            </p>
          </div>
          <svg
            className={`h-5 w-5 text-muted transition-transform ${titrationOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {titrationOpen && (
          <div className="mt-3 space-y-3 rounded-xl border border-border bg-card p-4">
            {/* Load template button */}
            <button
              onClick={loadTemplate}
              className="rounded-lg border border-accent bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
            >
              Load {compound.name} template
            </button>

            {/* Steps */}
            {titrationSteps.map((step, i) => (
              <div key={i} className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="text-xs text-muted">Start week</label>
                  <input
                    type="number"
                    min={1}
                    max={totalWeeks}
                    value={step.weekStart}
                    onChange={(e) =>
                      updateStep(i, 'weekStart', Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted">Dose ({compound.unit})</label>
                  <input
                    type="number"
                    min={0.01}
                    step={0.01}
                    value={step.doseMg}
                    onChange={(e) =>
                      updateStep(i, 'doseMg', Math.max(0.01, parseFloat(e.target.value) || 0.01))
                    }
                    className="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                {titrationSteps.length > 1 && (
                  <button
                    onClick={() => removeStep(i)}
                    className="mb-0.5 rounded-lg border border-border px-2.5 py-2 text-xs text-muted transition-colors hover:border-red-300 hover:text-red-500"
                    aria-label="Remove step"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            {titrationSteps.length < 5 && (
              <button
                onClick={addStep}
                className="rounded-lg border border-dashed border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
              >
                + Add step
              </button>
            )}
          </div>
        )}
      </div>

      {/* Section 3: Timeline */}
      <div>
        <h2 className="text-xl font-light text-foreground">Timeline</h2>
        <div className="mt-3">
          <label className="text-sm text-muted">Duration: {totalWeeks} weeks</label>
          <input
            type="range"
            min={4}
            max={52}
            step={1}
            value={totalWeeks}
            onChange={(e) => setTotalWeeks(Number(e.target.value))}
            className="mt-2 block w-full accent-[#2A7A72]"
          />
          <div className="mt-1 flex justify-between text-[10px] text-muted">
            <span>4 wk</span>
            <span>26 wk</span>
            <span>52 wk</span>
          </div>
        </div>
      </div>

      {/* Section 4: Chart */}
      <div className="rounded-xl border border-border bg-card p-4">
        <h2 className="mb-4 text-xl font-light text-foreground">Blood Level Chart</h2>
        <div className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, bottom: 10, left: -10 }}>
              <defs>
                <linearGradient id="concentrationFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2A7A72" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#2A7A72" stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />

              <XAxis
                dataKey="timeWeeks"
                tick={{ fontSize: 10, fill: 'var(--muted)' }}
                tickLine={false}
                axisLine={{ stroke: 'var(--border)' }}
                label={{
                  value: 'Weeks',
                  position: 'insideBottomRight',
                  offset: -5,
                  style: { fontSize: 11, fill: 'var(--muted)' },
                }}
                tickFormatter={(v: number) => `${Math.round(v)}`}
                interval={Math.max(0, Math.floor(chartData.length / 10) - 1)}
              />

              <YAxis
                tick={{ fontSize: 10, fill: 'var(--muted)' }}
                tickLine={false}
                axisLine={false}
                width={50}
                label={{
                  value: 'Estimated Active Level',
                  angle: -90,
                  position: 'insideLeft',
                  offset: 15,
                  style: { fontSize: 10, fill: 'var(--muted)', textAnchor: 'middle' },
                }}
                tickFormatter={(v: number) => v.toFixed(2)}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: 'var(--foreground)',
                }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={((value: any) => [
                  typeof value === 'number' ? value.toFixed(4) : String(value ?? ''),
                  'Concentration',
                ]) as any}
                labelFormatter={(label) =>
                  `Week ${Number(label).toFixed(1)} (Day ${Math.round(Number(label) * 7)})`
                }
              />

              {/* Steady state reference line */}
              {steadyStateLine !== null && (
                <ReferenceLine
                  y={steadyStateLine}
                  stroke="#C9A96E"
                  strokeDasharray="6 4"
                  strokeWidth={1}
                  label={{
                    value: 'Avg steady state',
                    position: 'right',
                    style: { fontSize: 10, fill: '#C9A96E' },
                  }}
                />
              )}

              <Area
                type="monotone"
                dataKey="concentration"
                stroke="#2A7A72"
                strokeWidth={2}
                fill="url(#concentrationFill)"
                dot={false}
                activeDot={{ r: 4, fill: '#2A7A72', stroke: '#fff', strokeWidth: 2 }}
              />

              {/* Dose markers on X-axis */}
              {doseMarkers.map((marker, i) => (
                <ReferenceDot
                  key={i}
                  x={marker.timeWeeks}
                  y={0}
                  r={2}
                  fill="var(--accent)"
                  stroke="none"
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Section 5: Key Insights */}
      <div>
        <h2 className="text-xl font-light text-foreground">Key Insights</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <InsightCard
            label="Time to steady state"
            value={`~${insights.steadyStateWeeks} weeks`}
            sublabel={`~${insights.steadyStateWeeks * 7} days (${(insights.steadyStateWeeks / 4).toFixed(1)} months)`}
          />
          <InsightCard
            label="Peak concentration"
            value={`${insights.peakConcentration.toFixed(3)}`}
            sublabel="relative units"
          />
          <InsightCard
            label="Trough concentration"
            value={`${insights.troughConcentration.toFixed(3)}`}
            sublabel="steady-state average"
          />
          <InsightCard
            label="Accumulation ratio"
            value={`${insights.accumulationRatio.toFixed(2)}x`}
            sublabel="steady-state trough / first-dose trough"
          />
        </div>
      </div>
    </div>
  )
}

function InsightCard({
  label,
  value,
  sublabel,
}: {
  label: string
  value: string
  sublabel: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-1 text-2xl font-light text-accent">{value}</p>
      <p className="mt-0.5 text-[10px] text-muted">{sublabel}</p>
    </div>
  )
}
