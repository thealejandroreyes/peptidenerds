export function TrustBar() {
  return (
    <div className="border-y border-border/60 bg-pearl/50">
      <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-muted">
          <span>44 Compounds</span>
          <span className="hidden sm:inline text-border">|</span>
          <span>279 Research Pages</span>
          <span className="hidden sm:inline text-border">|</span>
          <span>PubMed-Cited</span>
          <span className="hidden sm:inline text-border">|</span>
          <span>Updated Weekly</span>
        </div>
      </div>
    </div>
  )
}
