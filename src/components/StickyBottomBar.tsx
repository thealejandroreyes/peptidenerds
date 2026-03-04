'use client'

import { useState, useEffect, useRef } from 'react'
import { isSubscribed, isDismissedThisSession, dismissForSession, markSubscribed, markCTAInteraction } from '@/lib/subscriber-state'

export function StickyBottomBar() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isSubscribed() || isDismissedThisSession()) return

    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show bar when sentinel is NOT visible (user scrolled past it)
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  function dismiss() {
    setVisible(false)
    dismissForSession()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, utm_source: 'sticky-bottom-bar' }),
      })

      if (res.ok) {
        setStatus('success')
        markSubscribed()
        markCTAInteraction()
        setTimeout(() => setVisible(false), 2000)
      }
    } catch {
      // Silently fail — this is a passive CTA
    }
  }

  return (
    <>
      {/* Sentinel element placed near top of page — bar appears after user scrolls past this */}
      <div ref={sentinelRef} className="pointer-events-none absolute top-[600px] h-px w-px" aria-hidden="true" />

      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm shadow-lg">
          <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6">
            {status === 'success' ? (
              <p className="text-sm font-medium text-accent">Check your inbox.</p>
            ) : (
              <>
                <p className="hidden text-sm font-medium text-foreground sm:block">
                  Get the free Peptide Starter Kit
                </p>
                <form onSubmit={handleSubmit} className="flex flex-1 items-center gap-2 sm:flex-initial">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                    required
                    className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none sm:w-48"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="whitespace-nowrap rounded-full bg-cta px-4 py-1.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-50"
                  >
                    {status === 'loading' ? '...' : 'Get it free'}
                  </button>
                </form>
              </>
            )}
            <button
              onClick={dismiss}
              className="ml-2 flex-shrink-0 text-muted transition-colors hover:text-foreground"
              aria-label="Dismiss"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
