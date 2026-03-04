'use client'

import { useState, useEffect } from 'react'
import { isSubscribed, markSubscribed, markCTAInteraction } from '@/lib/subscriber-state'

interface SidebarNewsletterProps {
  utmSource?: string
}

export function SidebarNewsletter({ utmSource = 'blog-sidebar' }: SidebarNewsletterProps) {
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
      <div className="rounded-xl border border-accent/15 bg-soft-sky/10 p-5">
        <p className="text-sm text-muted">You are subscribed. Check your inbox for the Starter Kit.</p>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-accent/15 bg-soft-sky/10 p-5">
        <p className="text-sm font-medium text-accent">Check your inbox. Your Peptide Starter Kit is on the way.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[2px] text-accent">Free Resource</p>
      <h3 className="mt-2 text-base font-medium leading-snug text-foreground">
        Peptide Starter Kit
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-muted">
        GLP-1 dosing basics, side effect timelines, and what to ask your doctor. One PDF, no fluff.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-full bg-cta px-4 py-2.5 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending...' : 'Send Me the Kit'}
        </button>
      </form>

      {status === 'error' && (
        <p className="mt-2 text-xs text-red-500">Something went wrong. Try again.</p>
      )}

      <p className="mt-3 text-[11px] text-muted/60 text-center">
        Join 2,000+ readers. Unsubscribe anytime.
      </p>
    </div>
  )
}
