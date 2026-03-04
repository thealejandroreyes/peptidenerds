'use client'

import { useState, useEffect } from 'react'
import { isSubscribed, markSubscribed, markCTAInteraction } from '@/lib/subscriber-state'

export function CalculatorEmailGate() {
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
        body: JSON.stringify({ email, utm_source: 'calculator-save-results' }),
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

  if (status === 'success') {
    return (
      <div className="mt-4 rounded-xl border border-accent/20 bg-soft-sky/20 p-4">
        <p className="text-sm font-medium text-accent">Saved. Check your inbox for your results and the Peptide Starter Kit.</p>
      </div>
    )
  }

  return (
    <div className="mt-4 rounded-xl border border-accent/20 bg-soft-sky/20 p-4">
      <p className="text-sm font-medium text-foreground">Save your results</p>
      <p className="mt-1 text-xs text-muted">
        Get your calculation emailed to you, plus the free Peptide Starter Kit.
      </p>
      <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-full bg-cta px-4 py-1.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Save'}
        </button>
      </form>
      {status === 'error' && (
        <p className="mt-1 text-xs text-red-400">Something went wrong. Try again.</p>
      )}
    </div>
  )
}
