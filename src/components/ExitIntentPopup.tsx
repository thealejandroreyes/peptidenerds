'use client'

import { useState, useEffect, useCallback } from 'react'
import { isSubscribed, isDismissedThisSession, hasInteractedWithCTA, markSubscribed, markCTAInteraction, dismissForSession } from '@/lib/subscriber-state'

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [triggered, setTriggered] = useState(false)

  const dismiss = useCallback(() => {
    setVisible(false)
    dismissForSession()
  }, [])

  useEffect(() => {
    // Suppress if already subscribed, dismissed, or interacted with another CTA
    if (isSubscribed() || isDismissedThisSession() || hasInteractedWithCTA()) return

    // Desktop: mouse leaves viewport toward top
    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0 && !triggered) {
        setTriggered(true)
        setVisible(true)
      }
    }

    // Mobile: rapid scroll-up after 30 seconds on page
    let pageTime = 0
    let lastScrollY = 0
    const scrollThreshold = -200 // px of upward scroll

    const timer = setInterval(() => { pageTime++ }, 1000)

    function handleScroll() {
      if (triggered) return
      const currentY = window.scrollY
      const delta = currentY - lastScrollY

      if (pageTime >= 30 && delta < scrollThreshold) {
        setTriggered(true)
        setVisible(true)
      }
      lastScrollY = currentY
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(timer)
    }
  }, [triggered])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, utm_source: 'exit-intent-popup' }),
      })

      if (res.ok) {
        setStatus('success')
        markSubscribed()
        markCTAInteraction()
        setTimeout(dismiss, 2500)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-card border border-border p-8 shadow-2xl">
        <button
          onClick={dismiss}
          className="absolute right-4 top-4 text-muted transition-colors hover:text-foreground"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="text-center">
            <h3 className="text-xl text-foreground">Check your inbox.</h3>
            <p className="mt-2 text-sm text-muted">Your Peptide Starter Kit is on the way.</p>
          </div>
        ) : (
          <>
            <h3 className="text-xl text-foreground">Before you go</h3>
            <p className="mt-2 text-sm text-muted">
              Get the free Peptide Starter Kit — a quick-start guide to GLP-1 peptides, dosing basics, and what to discuss with your doctor.
            </p>
            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="mt-3 w-full rounded-full bg-cta py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Send Me the Starter Kit'}
              </button>
            </form>
            {status === 'error' && (
              <p className="mt-2 text-xs text-red-400 text-center">Something went wrong. Try again.</p>
            )}
            <button
              onClick={dismiss}
              className="mt-3 block w-full text-center text-xs text-muted underline transition-colors hover:text-foreground"
            >
              No thanks
            </button>
          </>
        )}
      </div>
    </div>
  )
}
