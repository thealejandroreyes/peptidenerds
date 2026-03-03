'use client'

import { useEffect, useRef } from 'react'
import { stacks } from '@/data/stacks'
import type { Stack, StackEntry } from '@/lib/types'

interface Props {
  onSelect: (stack: Stack, entry: StackEntry) => void
  initialStackSlug?: string
}

const difficultyColors: Record<string, string> = {
  beginner: 'bg-accent/10 text-accent',
  intermediate: 'bg-cta/20 text-cta-foreground',
  advanced: 'bg-primary/10 text-primary',
}

export function ProtocolTemplates({ onSelect, initialStackSlug }: Props) {
  const highlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialStackSlug && highlightRef.current) {
      highlightRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [initialStackSlug])

  return (
    <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
      {stacks.map((stack) => (
        <div
          key={stack.slug}
          ref={stack.slug === initialStackSlug ? highlightRef : undefined}
          className={`rounded-xl border bg-card p-4 ${
            stack.slug === initialStackSlug ? 'border-cta ring-2 ring-cta/30' : 'border-border'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{stack.name}</h3>
              <span
                className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
                  difficultyColors[stack.difficulty]
                }`}
              >
                {stack.difficulty}
              </span>
            </div>
            <p className="shrink-0 text-xs text-muted">{stack.estimatedMonthlyCost}</p>
          </div>

          <div className="mt-3 space-y-2">
            {stack.peptides.map((entry) => (
              <div
                key={entry.peptide}
                className="flex items-center justify-between rounded-lg border border-border/60 bg-background px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground capitalize">
                    {entry.peptide.replace(/-/g, ' ')}
                  </p>
                  <p className="text-xs text-muted">
                    {entry.dose} &middot; {entry.frequency}
                  </p>
                </div>
                <button
                  onClick={() => onSelect(stack, entry)}
                  className="shrink-0 rounded-full border border-accent px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-primary-foreground"
                >
                  Use
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
