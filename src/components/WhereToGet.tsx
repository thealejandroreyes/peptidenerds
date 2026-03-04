import { getProviders } from '@/data/providers'
import { AffiliateDisclosureBadge } from '@/components/AffiliateDisclosureBadge'

interface WhereToGetProps {
  compoundSlug: string
  compoundName: string
}

export function WhereToGet({ compoundSlug, compoundName }: WhereToGetProps) {
  const providerList = getProviders(compoundSlug)
  if (providerList.length === 0) return null

  return (
    <section className="mt-10">
      <h2 className="text-xl text-foreground">Where to get {compoundName}</h2>
      <p className="mt-2 text-sm text-muted">
        {compoundName} requires a prescription. These telehealth platforms offer online consultations and home delivery.
      </p>
      <div className="mt-2">
        <AffiliateDisclosureBadge />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {providerList.map((provider) => (
          <a
            key={provider.name}
            href={provider.url}
            target="_blank"
            rel="sponsored nofollow noopener"
            className="group rounded-xl border border-border bg-card p-4 transition-all hover:border-accent hover:bg-card-hover"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-medium text-primary group-hover:text-accent transition-colors">
                {provider.name}
              </h3>
              <span className="text-xs font-medium text-accent">{provider.priceRange}</span>
            </div>
            <p className="mt-2 text-xs text-muted line-clamp-2">{provider.description}</p>
            <p className="mt-2 text-xs text-accent">
              {provider.prescriptionRequired ? 'Prescription included' : 'No prescription needed'} →
            </p>
          </a>
        ))}
      </div>
    </section>
  )
}
