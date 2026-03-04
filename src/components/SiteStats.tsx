import { peptides } from '@/data/peptides'
import { comparisons } from '@/data/comparisons'
import { stacks } from '@/data/stacks'
import { goals } from '@/data/goals'
import { getAllPosts } from '@/lib/blog'

export function SiteStats() {
  const compoundCount = peptides.length
  const comparisonCount = comparisons.length
  const stackCount = stacks.length
  const goalCount = goals.length
  const blogCount = getAllPosts().length

  // Count total studies across all peptides
  const studyCount = peptides.reduce((acc, p) => acc + p.research.keyStudies.length, 0)

  const stats = [
    { label: 'Compounds Profiled', value: compoundCount },
    { label: 'Clinical Citations', value: `${studyCount}+` },
    { label: 'Head-to-Head Comparisons', value: comparisonCount },
    { label: 'Protocol Stacks', value: stackCount },
    { label: 'Goal Guides', value: goalCount },
    { label: 'Blog Articles', value: blogCount },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="text-2xl font-light text-accent">{stat.value}</p>
          <p className="mt-1 text-xs text-muted">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
