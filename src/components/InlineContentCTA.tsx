'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { isSubscribed, markSubscribed, markCTAInteraction } from '@/lib/subscriber-state'

interface InlineContentCTAProps {
  type: 'compound' | 'blog' | 'comparison'
  compoundName?: string
}

export function InlineContentCTA({ type, compoundName }: InlineContentCTAProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    setHidden(isSubscribed())
  }, [])

  if (hidden) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, utm_source: `inline-cta-${type}` }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
        markSubscribed()
        markCTAInteraction()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (type === 'comparison') {
    return (
      <div className="my-8 rounded-xl border border-accent/20 bg-soft-sky/20 p-5">
        <p className="text-sm font-medium text-foreground">Not sure which one to pick?</p>
        <p className="mt-1 text-sm text-muted">
          Take the 60-second{' '}
          <Link href="/tools/peptide-finder" className="text-accent hover:text-accent-hover underline">
            Peptide Finder quiz
          </Link>{' '}
          to get a personalized recommendation based on your goals.
        </p>
      </div>
    )
  }

  const headline = type === 'compound'
    ? `Get the ${compoundName || 'Peptide'} cheat sheet`
    : 'Get the Peptide Starter Kit (free)'

  const description = type === 'compound'
    ? 'Dosing quick-reference, key studies, and side effect management — in your inbox.'
    : 'A quick-start guide to GLP-1 peptides, dosing basics, and what to ask your doctor.'

  if (status === 'success') {
    return (
      <div className="my-8 rounded-xl border border-accent/20 bg-soft-sky/20 p-5">
        <p className="text-sm font-medium text-accent">Check your inbox. It is on the way.</p>
      </div>
    )
  }

  return (
    <div className="my-8 rounded-xl border border-accent/20 bg-soft-sky/20 p-5">
      <p className="text-sm font-medium text-foreground">{headline}</p>
      <p className="mt-1 text-sm text-muted">{description}</p>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-cta px-4 py-2 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending...' : 'Send it'}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-400">Something went wrong. Try again.</p>
      )}
    </div>
  )
}
