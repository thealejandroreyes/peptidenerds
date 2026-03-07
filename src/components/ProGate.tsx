'use client'

import { flags } from '@/lib/feature-flags'
import { useAuth } from '@/hooks/useAuth'

interface ProGateProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Wraps Pro-only content. Shows children to Pro subscribers,
 * shows upgrade prompt to free users, renders nothing if Pro is disabled.
 */
export function ProGate({ children, fallback }: ProGateProps) {
  const { user, isProSubscriber, isLoading } = useAuth()

  // Pro features not enabled -- render nothing
  if (!flags.proEnabled) return null

  // Loading auth state
  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="animate-pulse text-muted">Loading...</div>
      </div>
    )
  }

  // User is a Pro subscriber -- show the content
  if (isProSubscriber) {
    return <>{children}</>
  }

  // User is not Pro -- show fallback or default upgrade prompt
  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <div className="rounded-xl border border-accent/30 bg-accent/5 p-8 text-center">
      <h3 className="text-xl font-light text-foreground">
        Peptide Nerds Pro
      </h3>
      <p className="mt-2 text-sm text-muted">
        Unlock bloodwork analysis, protocol timelines, side effect tracking, and more.
      </p>
      <p className="mt-4 text-2xl font-light text-accent">
        $7<span className="text-sm text-muted">/month</span>
      </p>
      {user ? (
        <a
          href="/pro/subscribe"
          className="mt-4 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Upgrade to Pro
        </a>
      ) : (
        <a
          href="/pro/signup"
          className="mt-4 inline-block rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          Start Free Trial
        </a>
      )}
    </div>
  )
}
