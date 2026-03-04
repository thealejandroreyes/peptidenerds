import Link from 'next/link'

interface AffiliateDisclosureBadgeProps {
  compact?: boolean
}

export function AffiliateDisclosureBadge({ compact = false }: AffiliateDisclosureBadgeProps) {
  if (compact) {
    return (
      <span className="text-xs text-muted">
        (affiliate link —{' '}
        <Link href="/affiliate-disclosure" className="underline hover:text-foreground">
          disclosure
        </Link>
        )
      </span>
    )
  }

  return (
    <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-pearl/50 px-3 py-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted flex-shrink-0">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
      </svg>
      <p className="text-xs text-muted">
        This page contains affiliate links.{' '}
        <Link href="/affiliate-disclosure" className="underline hover:text-foreground">
          Learn more
        </Link>
      </p>
    </div>
  )
}
