'use client'

import { useState, useEffect } from 'react'
import { isSubscribed, markSubscribed, markCTAInteraction } from '@/lib/subscriber-state'

interface LeadMagnetCTAProps {
  variant: 'hero' | 'inline' | 'fullwidth'
  utmSource?: string
}

export function LeadMagnetCTA({ variant, utmSource = 'lead-magnet-cta' }: LeadMagnetCTAProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [alreadySubscribed, setAlreadySubscribed] = useState(false)

  useEffect(() => {
    setAlreadySubscribed(isSubscribed())
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, utm_source: utmSource }),
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

  if (alreadySubscribed) {
    return (
      <div className={wrapperClass(variant)}>
        <p className={variant === 'hero' ? 'text-sm text-white/70' : 'text-sm text-muted'}>
          You are already subscribed. Check your inbox for the Starter Kit.
        </p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className={wrapperClass(variant)}>
        <p className={variant === 'hero' ? 'text-sm font-medium text-sage' : 'text-sm font-medium text-accent'}>
          Check your inbox. Your Peptide Starter Kit is on the way.
        </p>
      </div>
    )
  }

  if (variant === 'hero') {
    return (
      <div className="rounded-xl bg-white/5 border border-white/10 p-6 sm:p-8">
        <h3 className="text-lg font-medium text-white">Get the Peptide Starter Kit (free)</h3>
        <p className="mt-2 text-sm text-white/60">
          A quick-start guide to GLP-1 peptides, dosing basics, and what to discuss with your doctor. Delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send Me the Starter Kit'}
          </button>
        </form>
        {status === 'error' && (
          <p className="mt-2 text-xs text-red-300">Something went wrong. Try again.</p>
        )}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className="rounded-xl border border-accent/20 bg-soft-sky/20 p-5">
        <h3 className="text-base font-medium text-foreground">Get the Peptide Starter Kit (free)</h3>
        <p className="mt-1 text-sm text-muted">
          Quick-start guide to GLP-1 peptides, dosing basics, and what to ask your doctor.
        </p>
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
            {status === 'loading' ? 'Sending...' : 'Send Me the Kit'}
          </button>
        </form>
        {status === 'error' && (
          <p className="mt-2 text-xs text-red-400">Something went wrong. Try again.</p>
        )}
      </div>
    )
  }

  // fullwidth
  return (
    <div className="rounded-xl bg-primary p-6 sm:p-8">
      <div className="mx-auto max-w-xl text-center">
        <h3 className="text-lg font-medium text-white">Get the Peptide Starter Kit (free)</h3>
        <p className="mt-2 text-sm text-white/60">
          A quick-start guide covering GLP-1 peptides, dosing basics, side effect management, and what to discuss with your doctor.
        </p>
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2 justify-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="flex-1 max-w-xs rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send Me the Starter Kit'}
          </button>
        </form>
        {status === 'error' && (
          <p className="mt-2 text-xs text-red-300">Something went wrong. Try again.</p>
        )}
      </div>
    </div>
  )
}

function wrapperClass(variant: 'hero' | 'inline' | 'fullwidth'): string {
  if (variant === 'hero') return 'rounded-xl bg-white/5 border border-white/10 p-6'
  if (variant === 'inline') return 'rounded-xl border border-accent/20 bg-soft-sky/20 p-5'
  return 'rounded-xl bg-primary p-6 text-center'
}
