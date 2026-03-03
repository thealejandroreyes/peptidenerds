'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import type { TrackerData } from '@/lib/tracker-types'
import { loadTracker } from '@/lib/tracker-store'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { TodaySchedule } from './components/today-schedule'
import { ProtocolList } from './components/protocol-list'
import { AddProtocol } from './components/add-protocol'
import { DoseCalendar } from './components/dose-calendar'
import { StreakDisplay } from './components/streak-display'
import { VialTracker } from './components/vial-tracker'

type Tab = 'today' | 'protocols' | 'calendar' | 'stats'

const tabs: { id: Tab; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'protocols', label: 'Protocols' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'stats', label: 'Stats' },
]

export function TrackerClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [data, setData] = useState<TrackerData | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('today')
  const [showAddProtocol, setShowAddProtocol] = useState(false)
  const [initialPeptideSlug, setInitialPeptideSlug] = useState<string | undefined>()
  const [initialStackSlug, setInitialStackSlug] = useState<string | undefined>()

  const refresh = useCallback(() => {
    setData(loadTracker())
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  // Auto-open AddProtocol from URL params
  useEffect(() => {
    const peptide = searchParams.get('peptide')
    const stack = searchParams.get('stack')
    if (peptide) {
      setInitialPeptideSlug(peptide)
      setShowAddProtocol(true)
      router.replace('/tracker', { scroll: false })
    } else if (stack) {
      setInitialStackSlug(stack)
      setShowAddProtocol(true)
      router.replace('/tracker', { scroll: false })
    }
  }, [searchParams, router])

  if (!data) return null

  const hasProtocols = data.protocols.length > 0

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Tools', href: '/tools/dosage-calculator' },
          { name: 'Protocol Tracker', href: '/tracker' },
        ]}
      />

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-foreground">Protocol Tracker</h1>
          <p className="mt-2 text-muted">
            Track your peptide protocols, log doses, and monitor adherence.
          </p>
        </div>
        {hasProtocols && (
          <button
            onClick={() => setShowAddProtocol(true)}
            className="shrink-0 rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
          >
            + Add Protocol
          </button>
        )}
      </div>

      {/* Privacy note */}
      <div className="mt-4 rounded-lg border border-accent/20 bg-soft-sky/20 px-4 py-2.5">
        <p className="text-xs text-muted">
          All data is stored locally in your browser. Nothing is sent to any server. Clear your browser data to reset.
        </p>
      </div>

      {!hasProtocols && !showAddProtocol ? (
        /* Empty state */
        <div className="mt-12 flex flex-col items-center rounded-xl border border-border bg-card p-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-soft-sky/40">
            <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <h2 className="mt-4 text-xl text-foreground">Add your first protocol</h2>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Start from a pre-built template or create a custom protocol. Track your doses, monitor
            your vials, and build consistency.
          </p>
          <button
            onClick={() => setShowAddProtocol(true)}
            className="mt-6 rounded-full bg-cta px-8 py-3 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
          >
            Add Protocol
          </button>
        </div>
      ) : (
        <>
          {/* Tab navigation */}
          {hasProtocols && (
            <nav className="mt-6 flex gap-1 border-b border-border">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-accent text-accent'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          )}

          {/* Tab content */}
          <div className="mt-6">
            {activeTab === 'today' && (
              <TodaySchedule data={data} onUpdate={refresh} />
            )}
            {activeTab === 'protocols' && (
              <ProtocolList
                data={data}
                onUpdate={refresh}
                onAddNew={() => setShowAddProtocol(true)}
              />
            )}
            {activeTab === 'calendar' && (
              <DoseCalendar data={data} />
            )}
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <StreakDisplay data={data} />
                <VialTracker data={data} />
              </div>
            )}
          </div>
        </>
      )}

      {/* Add Protocol Modal */}
      {showAddProtocol && (
        <AddProtocol
          onClose={() => {
            setShowAddProtocol(false)
            setInitialPeptideSlug(undefined)
            setInitialStackSlug(undefined)
          }}
          onSave={() => {
            refresh()
            setShowAddProtocol(false)
            setInitialPeptideSlug(undefined)
            setInitialStackSlug(undefined)
          }}
          initialPeptideSlug={initialPeptideSlug}
          initialStackSlug={initialStackSlug}
        />
      )}

      {/* Disclaimer */}
      <div className="mt-10 rounded-xl border border-warm-sand bg-[#FEF9EC] p-5">
        <p className="text-xs text-[#6B5A40]">
          <span className="font-medium">Disclaimer:</span> This tracker is for personal reference
          only. It does not provide medical advice. Always consult with a healthcare provider
          before starting any peptide protocol. Dosing information is user-entered and not
          verified.
        </p>
      </div>
    </>
  )
}
