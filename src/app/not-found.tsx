import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-foreground">404</h1>
      <p className="mt-4 text-lg text-muted">This page does not exist.</p>
      <div className="mt-8 flex gap-4">
        <Link
          href="/"
          className="rounded-full bg-cta px-6 py-3 text-[13.5px] font-semibold tracking-[0.3px] text-cta-foreground transition-colors hover:bg-cta-hover"
        >
          Go home
        </Link>
        <Link
          href="/peptides"
          className="rounded-full border border-border px-6 py-3 text-[13.5px] font-semibold tracking-[0.3px] text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          Browse peptides
        </Link>
      </div>
    </div>
  )
}
