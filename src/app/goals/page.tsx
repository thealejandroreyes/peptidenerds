import type { Metadata } from 'next'
import Link from 'next/link'
import { goals } from '@/data/goals'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Peptide Goals — Find the Best Peptides for Weight Loss and More',
  description:
    'Find the right peptides for your goal. Weight loss, fat loss, body recomposition, gut health, healing, and more. Evidence-based recommendations with research citations.',
}

// Weight-loss-related goals surface first (solar system: sun first)
const priorityOrder = ['weight-loss', 'fat-loss', 'gut-health', 'muscle-growth', 'joint-health', 'injury-recovery']


export default function GoalsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Goals', href: '/goals' }]} />

      <h1 className="text-3xl font-light text-foreground">Find peptides by goal</h1>
      <p className="mt-3 text-muted">
        Not sure where to start? Pick your goal and we will show you the most researched peptides for that purpose.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...goals].sort((a, b) => {
          const aIdx = priorityOrder.indexOf(a.slug)
          const bIdx = priorityOrder.indexOf(b.slug)
          if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx
          if (aIdx !== -1) return -1
          if (bIdx !== -1) return 1
          return 0
        }).map((goal) => (
          <Link
            key={goal.slug}
            href={`/goals/${goal.slug}`}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent hover:bg-card-hover"
          >
            <h2 className="text-lg text-primary group-hover:text-accent transition-colors">
              {goal.name}
            </h2>
            <p className="mt-2 text-sm text-muted line-clamp-3">{goal.description}</p>
            <p className="mt-4 text-xs text-accent">{goal.topPeptides.length} recommended peptides →</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
