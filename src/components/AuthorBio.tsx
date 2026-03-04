import Link from 'next/link'

interface AuthorBioProps {
  lastReviewed?: string // ISO date string, e.g., '2026-03-01'
}

export function AuthorBio({ lastReviewed }: AuthorBioProps) {
  const dateDisplay = lastReviewed
    ? new Date(lastReviewed).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : `Updated ${new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`

  return (
    <div className="flex items-center gap-3 text-xs text-muted">
      <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-[10px] font-bold text-white">
        PN
      </div>
      <p>
        Reviewed by{' '}
        <Link href="/about" className="text-foreground hover:text-accent">
          Peptide Nerds Editorial
        </Link>
        {' '}&middot;{' '}
        {dateDisplay}
      </p>
    </div>
  )
}
