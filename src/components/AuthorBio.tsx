import Link from 'next/link'

export function AuthorBio() {
  return (
    <div className="flex items-center gap-3 text-xs text-muted">
      <div className="h-6 w-6 flex-shrink-0 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-[10px] font-bold text-white">
        FM
      </div>
      <p>
        Reviewed by{' '}
        <Link href="/about" className="text-foreground hover:text-accent">
          Fat Man in the Arena
        </Link>
        {' '}&middot;{' '}
        Updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>
    </div>
  )
}
