'use client'

import { useState } from 'react'
import type { TrackerProtocol } from '@/lib/tracker-types'
import type { Stack, StackEntry } from '@/lib/types'
import { addProtocol, generateId } from '@/lib/tracker-store'
import { peptides } from '@/data/peptides'
import { ProtocolTemplates } from './protocol-templates'

type Mode = 'choose' | 'template' | 'custom'
type Frequency = TrackerProtocol['frequency']

const GLP1_SLUGS = ['semaglutide', 'tirzepatide', 'liraglutide', 'retatrutide']

const SEMA_ESCALATION = [
  { weekNumber: 1, dose: 0.25 },
  { weekNumber: 5, dose: 0.5 },
  { weekNumber: 9, dose: 1.0 },
  { weekNumber: 13, dose: 1.7 },
  { weekNumber: 17, dose: 2.4 },
]

const TIRZ_ESCALATION = [
  { weekNumber: 1, dose: 2.5 },
  { weekNumber: 5, dose: 5.0 },
  { weekNumber: 9, dose: 7.5 },
  { weekNumber: 13, dose: 10.0 },
  { weekNumber: 17, dose: 12.5 },
  { weekNumber: 21, dose: 15.0 },
]

interface Props {
  onClose: () => void
  onSave: () => void
  editProtocol?: TrackerProtocol
  initialPeptideSlug?: string
  initialStackSlug?: string
}

function parseFrequency(freqStr: string): Frequency {
  const lower = freqStr.toLowerCase()
  if (lower.includes('twice daily') || lower.includes('2x daily')) return 'twice-daily'
  if (lower.includes('every other day') || lower === 'eod') return 'eod'
  if (lower.includes('3x') || lower.includes('three times')) return '3x-week'
  if (lower.includes('2x per week') || lower.includes('twice a week') || lower.includes('2x/week')) return 'custom'
  if (lower.includes('biweekly') || lower.includes('every 2 week')) return 'biweekly'
  if (lower.includes('weekly') || lower.includes('once weekly') || lower.includes('once daily for')) return 'weekly'
  if (lower.includes('daily') || lower.includes('once daily')) return 'daily'
  return 'daily'
}

function parseDose(doseStr: string): { dose: number; unit: 'mcg' | 'mg' } {
  // Try to get the first number and unit
  const match = doseStr.match(/([\d.]+)\s*-?\s*[\d.]*\s*(mcg|mg)/i)
  if (match) {
    return { dose: parseFloat(match[1]), unit: match[2].toLowerCase() as 'mcg' | 'mg' }
  }
  // Fallback
  const numMatch = doseStr.match(/([\d.]+)/)
  return { dose: numMatch ? parseFloat(numMatch[1]) : 0, unit: 'mg' }
}

export function AddProtocol({ onClose, onSave, editProtocol, initialPeptideSlug, initialStackSlug }: Props) {
  const initialPeptide = initialPeptideSlug ? peptides.find((p) => p.slug === initialPeptideSlug) : undefined
  const [mode, setMode] = useState<Mode>(
    editProtocol ? 'custom' : initialPeptideSlug ? 'custom' : initialStackSlug ? 'template' : 'choose'
  )

  // Form state
  const [name, setName] = useState(editProtocol?.name || initialPeptide?.name || '')
  const [peptideSlug, setPeptideSlug] = useState(editProtocol?.peptideSlug || initialPeptideSlug || '')
  const [dose, setDose] = useState(editProtocol?.dose?.toString() || '')
  const [unit, setUnit] = useState<'mcg' | 'mg'>(editProtocol?.unit || 'mg')
  const [frequency, setFrequency] = useState<Frequency>(editProtocol?.frequency || 'daily')
  const [customDays, setCustomDays] = useState<number[]>(editProtocol?.customDays || [])
  const [startDate, setStartDate] = useState(
    editProtocol?.startDate || new Date().toISOString().split('T')[0]
  )
  const [cycleWeeks, setCycleWeeks] = useState(editProtocol?.cycleWeeks?.toString() || '')
  const [offWeeks, setOffWeeks] = useState(editProtocol?.offWeeks?.toString() || '')
  const [notes, setNotes] = useState(editProtocol?.notes || '')
  const [useEscalation, setUseEscalation] = useState(!!editProtocol?.escalation)
  const [trackVial, setTrackVial] = useState(!!editProtocol?.vial)
  const [vialSize, setVialSize] = useState(editProtocol?.vial?.totalAmount?.toString() || '5')
  const [peptideSearch, setPeptideSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const isGlp1 = GLP1_SLUGS.includes(peptideSlug)

  function handleTemplateSelect(stack: Stack, entry: StackEntry) {
    const parsed = parseDose(entry.dose)
    setName(entry.peptide.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()))
    setPeptideSlug(entry.peptide)
    setDose(parsed.dose.toString())
    setUnit(parsed.unit)
    setFrequency(parseFrequency(entry.frequency))
    setNotes(`From ${stack.name}: ${entry.role}`)

    if (GLP1_SLUGS.includes(entry.peptide)) {
      setUseEscalation(true)
    }

    setMode('custom')
  }

  function handleSave() {
    const doseNum = parseFloat(dose)
    if (!name || !peptideSlug || isNaN(doseNum) || doseNum <= 0) return

    const protocol: TrackerProtocol = {
      id: editProtocol?.id || generateId(),
      name,
      peptideSlug,
      dose: doseNum,
      unit,
      frequency,
      customDays: frequency === 'custom' ? customDays : undefined,
      startDate,
      cycleWeeks: cycleWeeks ? parseInt(cycleWeeks) : undefined,
      offWeeks: offWeeks ? parseInt(offWeeks) : undefined,
      isActive: true,
      notes: notes || undefined,
      createdAt: editProtocol?.createdAt || new Date().toISOString(),
    }

    if (useEscalation && isGlp1) {
      protocol.escalation = {
        schedule: peptideSlug === 'tirzepatide' ? TIRZ_ESCALATION : SEMA_ESCALATION,
      }
    }

    if (trackVial) {
      const vialMg = parseFloat(vialSize)
      const doseInMg = unit === 'mcg' ? doseNum / 1000 : doseNum
      protocol.vial = {
        totalAmount: vialMg,
        reconDate: startDate,
        dosesRemaining: Math.floor(vialMg / doseInMg),
      }
    }

    addProtocol(protocol)
    onSave()
  }

  const filteredPeptides = peptideSearch
    ? peptides.filter(
        (p) =>
          p.name.toLowerCase().includes(peptideSearch.toLowerCase()) ||
          p.slug.includes(peptideSearch.toLowerCase())
      )
    : peptides

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/40 p-4 pt-20">
      <div className="w-full max-w-lg rounded-xl border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-lg text-foreground">
            {editProtocol ? 'Edit Protocol' : 'Add Protocol'}
          </h2>
          <button
            onClick={onClose}
            className="text-muted transition-colors hover:text-foreground"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5">
          {mode === 'choose' && (
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => setMode('template')}
                className="rounded-xl border border-border p-5 text-left transition-colors hover:border-accent hover:bg-soft-sky/10"
              >
                <p className="font-medium text-foreground">From Template</p>
                <p className="mt-1 text-xs text-muted">
                  Browse pre-built stacks and pick a peptide to track
                </p>
              </button>
              <button
                onClick={() => setMode('custom')}
                className="rounded-xl border border-border p-5 text-left transition-colors hover:border-accent hover:bg-soft-sky/10"
              >
                <p className="font-medium text-foreground">Custom Protocol</p>
                <p className="mt-1 text-xs text-muted">
                  Enter your own peptide, dose, and schedule
                </p>
              </button>
            </div>
          )}

          {mode === 'template' && (
            <>
              <button
                onClick={() => setMode('choose')}
                className="mb-4 text-sm text-accent hover:text-accent-hover transition-colors"
              >
                &larr; Back
              </button>
              <ProtocolTemplates onSelect={handleTemplateSelect} initialStackSlug={initialStackSlug} />
            </>
          )}

          {mode === 'custom' && (
            <div className="space-y-4">
              {!editProtocol && !name && (
                <button
                  onClick={() => setMode('choose')}
                  className="mb-2 text-sm text-accent hover:text-accent-hover transition-colors"
                >
                  &larr; Back
                </button>
              )}

              {/* Peptide search */}
              <div className="relative">
                <label className="block text-sm font-medium text-foreground">Peptide</label>
                <input
                  type="text"
                  value={peptideSearch || name}
                  onChange={(e) => {
                    setPeptideSearch(e.target.value)
                    setShowSearch(true)
                    if (!name) setName(e.target.value)
                  }}
                  onFocus={() => setShowSearch(true)}
                  placeholder="Search peptides..."
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                {showSearch && peptideSearch && (
                  <div className="absolute top-full left-0 z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
                    {filteredPeptides.slice(0, 8).map((p) => (
                      <button
                        key={p.slug}
                        onClick={() => {
                          setName(p.name)
                          setPeptideSlug(p.slug)
                          setPeptideSearch('')
                          setShowSearch(false)
                        }}
                        className="block w-full px-3 py-2 text-left text-sm text-foreground hover:bg-pearl transition-colors"
                      >
                        {p.name}
                        <span className="ml-2 text-xs text-muted">{p.category.replace(/-/g, ' ')}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dose + Unit */}
              <div>
                <label className="block text-sm font-medium text-foreground">Dose per injection</label>
                <div className="mt-1.5 flex gap-2">
                  <input
                    type="number"
                    value={dose}
                    onChange={(e) => setDose(e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="e.g. 250"
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value as 'mcg' | 'mg')}
                    className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                  >
                    <option value="mcg">mcg</option>
                    <option value="mg">mg</option>
                  </select>
                </div>
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-foreground">Frequency</label>
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as Frequency)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
                >
                  <option value="daily">Daily</option>
                  <option value="twice-daily">Twice Daily</option>
                  <option value="eod">Every Other Day</option>
                  <option value="3x-week">3x Per Week (Mon/Wed/Fri)</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Every 2 Weeks</option>
                  <option value="custom">Custom Days</option>
                </select>
              </div>

              {/* Custom days */}
              {frequency === 'custom' && (
                <div className="flex gap-1.5">
                  {dayLabels.map((label, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        setCustomDays((prev) =>
                          prev.includes(i) ? prev.filter((d) => d !== i) : [...prev, i]
                        )
                      }
                      className={`flex-1 rounded-lg py-2 text-xs font-medium transition-colors ${
                        customDays.includes(i)
                          ? 'bg-accent text-primary-foreground'
                          : 'border border-border bg-background text-muted hover:border-accent'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}

              {/* Start date */}
              <div>
                <label className="block text-sm font-medium text-foreground">Start date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              {/* Cycle */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Cycle length <span className="text-muted">(weeks, optional)</span>
                  </label>
                  <input
                    type="number"
                    value={cycleWeeks}
                    onChange={(e) => setCycleWeeks(e.target.value)}
                    min="1"
                    placeholder="e.g. 8"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground">
                    Off weeks <span className="text-muted">(optional)</span>
                  </label>
                  <input
                    type="number"
                    value={offWeeks}
                    onChange={(e) => setOffWeeks(e.target.value)}
                    min="1"
                    placeholder="e.g. 4"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>

              {/* GLP-1 escalation toggle */}
              {isGlp1 && (
                <label className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useEscalation}
                    onChange={(e) => setUseEscalation(e.target.checked)}
                    className="h-4 w-4 rounded border-border accent-accent"
                  />
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto-escalate dose</p>
                    <p className="text-xs text-muted">
                      Follow the standard titration schedule ({peptideSlug === 'tirzepatide' ? '2.5mg → 15mg' : '0.25mg → 2.4mg'})
                    </p>
                  </div>
                </label>
              )}

              {/* Vial tracking toggle */}
              <label className="flex items-center gap-3 rounded-lg border border-border bg-background p-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={trackVial}
                  onChange={(e) => setTrackVial(e.target.checked)}
                  className="h-4 w-4 rounded border-border accent-accent"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">Track vial inventory</p>
                  <p className="text-xs text-muted">
                    Monitor doses remaining and get low-supply warnings
                  </p>
                </div>
              </label>

              {trackVial && (
                <div>
                  <label className="block text-sm font-medium text-foreground">Vial size (mg)</label>
                  <input
                    type="number"
                    value={vialSize}
                    onChange={(e) => setVialSize(e.target.value)}
                    min="0.1"
                    step="0.1"
                    className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Notes <span className="text-muted">(optional)</span>
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Timing, injection site, etc."
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent resize-none"
                />
              </div>

              {/* Save */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="flex-1 rounded-full border border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-foreground hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!name || !peptideSlug || !dose}
                  className="flex-1 rounded-full bg-cta px-4 py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-40"
                >
                  {editProtocol ? 'Save Changes' : 'Add Protocol'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
