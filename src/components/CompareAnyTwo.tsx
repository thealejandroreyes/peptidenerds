'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface PeptideOption {
  name: string
  slug: string
  category: string
}

interface PrebuiltMatch {
  slug: string
  title: string
}

export function CompareAnyTwo({
  peptides,
  prebuiltMap,
}: {
  peptides: PeptideOption[]
  prebuiltMap: Record<string, PrebuiltMatch>
}) {
  const [slugA, setSlugA] = useState('')
  const [slugB, setSlugB] = useState('')

  const matchKey = useMemo(() => {
    if (!slugA || !slugB || slugA === slugB) return null
    const sorted = [slugA, slugB].sort()
    return `${sorted[0]}::${sorted[1]}`
  }, [slugA, slugB])

  const match = matchKey ? prebuiltMap[matchKey] : null

  return (
    <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
      <h2 className="text-lg font-medium text-foreground">Compare Any Two Peptides</h2>
      <p className="mt-1 text-sm text-muted">
        Select two peptides to see their head-to-head comparison.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="peptide-a" className="text-xs font-medium text-muted">
            First peptide
          </label>
          <select
            id="peptide-a"
            value={slugA}
            onChange={(e) => setSlugA(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground"
          >
            <option value="">Select a peptide...</option>
            {peptides.map((p) => (
              <option key={p.slug} value={p.slug} disabled={p.slug === slugB}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="peptide-b" className="text-xs font-medium text-muted">
            Second peptide
          </label>
          <select
            id="peptide-b"
            value={slugB}
            onChange={(e) => setSlugB(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground"
          >
            <option value="">Select a peptide...</option>
            {peptides.map((p) => (
              <option key={p.slug} value={p.slug} disabled={p.slug === slugA}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {slugA && slugB && slugA === slugB && (
        <p className="mt-3 text-sm text-amber-600">Select two different peptides to compare.</p>
      )}

      {slugA && slugB && slugA !== slugB && match && (
        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-700 font-medium">Full comparison available</p>
          <p className="mt-1 text-sm text-foreground">{match.title}</p>
          <Link
            href={`/compare/${match.slug}`}
            className="mt-3 inline-block rounded-full bg-cta px-5 py-2 text-sm font-medium text-cta-foreground transition-opacity hover:opacity-90"
          >
            View Full Comparison
          </Link>
        </div>
      )}

      {slugA && slugB && slugA !== slugB && !match && (
        <div className="mt-4 rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted">
            No pre-built comparison exists for this pair yet. Check the individual peptide pages for details:
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Link
              href={`/peptides/${slugA}`}
              className="rounded-full border border-accent px-3 py-1 text-sm text-accent hover:bg-accent/5"
            >
              View {peptides.find((p) => p.slug === slugA)?.name}
            </Link>
            <Link
              href={`/peptides/${slugB}`}
              className="rounded-full border border-purple-600 px-3 py-1 text-sm text-purple-600 hover:bg-purple-50"
            >
              View {peptides.find((p) => p.slug === slugB)?.name}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
