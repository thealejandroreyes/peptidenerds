import { supplies } from '@/data/supplies'
import { AffiliateDisclosureBadge } from '@/components/AffiliateDisclosureBadge'

export function RecommendedSupplies() {
  return (
    <section className="mt-10">
      <h2 className="text-xl text-foreground">What you will need</h2>
      <p className="mt-2 text-sm text-muted">
        Basic supplies for reconstitution and subcutaneous injection.
      </p>
      <div className="mt-2">
        <AffiliateDisclosureBadge />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {supplies.map((supply) => (
          <a
            key={supply.name}
            href={supply.url}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:border-accent hover:bg-card-hover"
          >
            <div className="flex-shrink-0 mt-0.5 h-8 w-8 rounded-lg bg-soft-sky/50 flex items-center justify-center">
              <CategoryIcon category={supply.category} />
            </div>
            <div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-medium text-primary group-hover:text-accent transition-colors">
                  {supply.name}
                </h3>
                <span className="flex-shrink-0 text-xs font-medium text-accent">{supply.priceRange}</span>
              </div>
              <p className="mt-1 text-xs text-muted">{supply.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function CategoryIcon({ category }: { category: string }) {
  // Simple text-based icons to avoid external dependencies
  const icons: Record<string, string> = {
    reconstitution: 'R',
    injection: 'I',
    storage: 'S',
    safety: '!',
  }
  return (
    <span className="text-xs font-bold text-accent">
      {icons[category] || '?'}
    </span>
  )
}
