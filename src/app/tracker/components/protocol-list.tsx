'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { TrackerData, TrackerProtocol } from '@/lib/tracker-types'
import { updateProtocol, deleteProtocol } from '@/lib/tracker-store'
import { getFrequencyLabel, getCurrentDose, getVialStatus } from '@/lib/tracker-utils'
import { AddProtocol } from './add-protocol'

interface Props {
  data: TrackerData
  onUpdate: () => void
  onAddNew: () => void
}

export function ProtocolList({ data, onUpdate, onAddNew }: Props) {
  const [editingProtocol, setEditingProtocol] = useState<TrackerProtocol | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  const active = data.protocols.filter((p) => p.isActive)
  const paused = data.protocols.filter((p) => !p.isActive)

  function handlePause(id: string) {
    updateProtocol(id, { isActive: false })
    onUpdate()
  }

  function handleResume(id: string) {
    updateProtocol(id, { isActive: true })
    onUpdate()
  }

  function handleDelete(id: string) {
    deleteProtocol(id)
    setConfirmDelete(null)
    onUpdate()
  }

  function renderCard(protocol: TrackerProtocol) {
    const currentDose = getCurrentDose(protocol)
    const vialStatus = getVialStatus(protocol, data.doseLogs)
    const doseLabel =
      currentDose >= 1 && protocol.unit === 'mg'
        ? `${currentDose} mg`
        : `${currentDose} ${protocol.unit}`

    return (
      <div
        key={protocol.id}
        className={`rounded-xl border bg-card p-4 ${
          protocol.isActive ? 'border-border' : 'border-border/50 opacity-60'
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-foreground">{protocol.name}</h3>
            <p className="mt-0.5 text-sm text-muted">
              {doseLabel} &middot; {getFrequencyLabel(protocol.frequency)}
            </p>
            {protocol.escalation && (
              <p className="mt-0.5 text-xs text-accent">Auto-escalating dose</p>
            )}
          </div>
          <div className="flex gap-1">
            {protocol.isActive ? (
              <button
                onClick={() => handlePause(protocol.id)}
                title="Pause"
                className="rounded-lg p-1.5 text-muted transition-colors hover:bg-pearl hover:text-foreground"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => handleResume(protocol.id)}
                title="Resume"
                className="rounded-lg p-1.5 text-muted transition-colors hover:bg-pearl hover:text-foreground"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
              </button>
            )}
            <button
              onClick={() =>
                confirmDelete === protocol.id
                  ? handleDelete(protocol.id)
                  : setConfirmDelete(protocol.id)
              }
              title={confirmDelete === protocol.id ? 'Confirm delete' : 'Delete'}
              className={`rounded-lg p-1.5 transition-colors ${
                confirmDelete === protocol.id
                  ? 'bg-red-50 text-red-600'
                  : 'text-muted hover:bg-pearl hover:text-foreground'
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>

        {/* Vial warning */}
        {vialStatus && (
          <div className="mt-3 flex items-center gap-2">
            {vialStatus.isExpired ? (
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[10px] font-medium text-red-700">
                Vial expired ({vialStatus.daysSinceRecon}d since recon)
              </span>
            ) : vialStatus.isLow ? (
              <span className="rounded-full bg-cta/20 px-2.5 py-0.5 text-[10px] font-medium text-cta-foreground">
                {vialStatus.dosesRemaining} doses left
              </span>
            ) : (
              <span className="rounded-full bg-pearl px-2.5 py-0.5 text-[10px] text-muted">
                {vialStatus.dosesRemaining} doses remaining
              </span>
            )}
          </div>
        )}

        {protocol.notes && (
          <p className="mt-2 text-xs text-muted line-clamp-2">{protocol.notes}</p>
        )}

        <div className="mt-3 flex items-center justify-between">
          <Link
            href={`/peptides/${protocol.peptideSlug}`}
            className="text-xs text-accent hover:text-accent-hover transition-colors"
          >
            Learn more
          </Link>
          {protocol.cycleWeeks && (
            <span className="text-xs text-muted">
              {protocol.cycleWeeks}wk on / {protocol.offWeeks || 0}wk off
            </span>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {active.length > 0 && (
        <div className="space-y-3">
          {active.map(renderCard)}
        </div>
      )}

      {paused.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-3 text-sm font-medium text-muted">Paused</h3>
          <div className="space-y-3">{paused.map(renderCard)}</div>
        </div>
      )}

      <button
        onClick={onAddNew}
        className="mt-6 w-full rounded-xl border-2 border-dashed border-border p-4 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
      >
        + Add Protocol
      </button>

      {editingProtocol && (
        <AddProtocol
          editProtocol={editingProtocol}
          onClose={() => setEditingProtocol(null)}
          onSave={() => {
            setEditingProtocol(null)
            onUpdate()
          }}
        />
      )}
    </div>
  )
}
