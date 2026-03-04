'use client'

import { useState, useEffect } from 'react'
import { isSubscribed, markSubscribed, markCTAInteraction } from '@/lib/subscriber-state'

interface NewsletterSignupProps {
  utmSource?: string
}

export function NewsletterSignup({ utmSource = 'newsletter-generic' }: NewsletterSignupProps) {
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
      <div className="rounded-xl bg-primary p-6">
        <p className="text-sm text-white/70">You are already subscribed. Welcome aboard.</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-primary p-6">
      <h3 className="text-lg font-medium text-white">Weekly peptide research updates</h3>
      <p className="mt-2 text-sm text-white/70">
        New studies, GLP-1 news, protocol insights, and weight loss data — delivered every week. Free. No spam.
      </p>
      {status === 'success' ? (
        <p className="mt-4 text-sm font-medium text-sage">Check your inbox. Welcome aboard.</p>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white placeholder:text-white/45 focus:border-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-full bg-cta px-5 py-2 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-50"
          >
            {status === 'loading' ? 'Joining...' : 'Subscribe'}
          </button>
        </form>
      )}
      {status === 'error' && (
        <p className="mt-2 text-xs text-red-300">Something went wrong. Try again.</p>
      )}
    </div>
  )
}
