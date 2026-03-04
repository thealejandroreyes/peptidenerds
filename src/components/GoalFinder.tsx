'use client'

import { useState } from 'react'
import Link from 'next/link'

interface GoalOption {
  name: string
  slug: string
  description: string
  topPeptides: { name: string; slug: string; note: string }[]
}

const goalOptions: GoalOption[] = [
  {
    name: 'Weight Loss',
    slug: 'weight-loss',
    description: 'GLP-1 agonists are the most clinically validated peptides for weight loss, with 15-26% body weight reduction in trials.',
    topPeptides: [
      { name: 'Semaglutide', slug: 'semaglutide', note: 'FDA-approved, 16.9% weight loss (STEP 1)' },
      { name: 'Tirzepatide', slug: 'tirzepatide', note: 'FDA-approved, 22.5% weight loss (SURMOUNT-1)' },
      { name: 'Retatrutide', slug: 'retatrutide', note: 'Phase 3 trials, 24.2% weight loss in Phase 2' },
    ],
  },
  {
    name: 'Injury Recovery',
    slug: 'injury-recovery',
    description: 'Healing peptides accelerate tissue repair for tendons, ligaments, muscles, and gut lining. Research-only compounds.',
    topPeptides: [
      { name: 'BPC-157', slug: 'bpc-157', note: 'Most researched healing peptide, 100+ studies' },
      { name: 'TB-500', slug: 'tb-500', note: 'Systemic anti-inflammatory, cell migration' },
      { name: 'GHK-Cu', slug: 'ghk-cu', note: 'Copper peptide for skin and tissue repair' },
    ],
  },
  {
    name: 'Muscle Growth',
    slug: 'muscle-growth',
    description: 'Growth hormone secretagogues support lean mass gains by optimizing natural GH pulses.',
    topPeptides: [
      { name: 'Ipamorelin', slug: 'ipamorelin', note: 'Clean GH release with minimal side effects' },
      { name: 'CJC-1295', slug: 'cjc-1295', note: 'Extended GH-releasing hormone analog' },
      { name: 'Tesamorelin', slug: 'tesamorelin', note: 'FDA-approved GHRH analog' },
    ],
  },
  {
    name: 'Anti-Aging',
    slug: 'anti-aging',
    description: 'Peptides targeting cellular repair, telomere maintenance, and skin rejuvenation.',
    topPeptides: [
      { name: 'GHK-Cu', slug: 'ghk-cu', note: 'Skin remodeling and collagen synthesis' },
      { name: 'Epithalon', slug: 'epithalon', note: 'Telomerase activation research' },
      { name: 'BPC-157', slug: 'bpc-157', note: 'Systemic tissue repair and gut health' },
    ],
  },
  {
    name: 'Sleep & Recovery',
    slug: 'sleep-quality',
    description: 'Peptides that optimize sleep architecture and overnight recovery through growth hormone pathways.',
    topPeptides: [
      { name: 'Ipamorelin', slug: 'ipamorelin', note: 'GH pulse during deep sleep' },
      { name: 'DSIP', slug: 'dsip', note: 'Delta sleep-inducing peptide' },
      { name: 'CJC-1295', slug: 'cjc-1295', note: 'Extended overnight GH release' },
    ],
  },
  {
    name: 'Cognitive Enhancement',
    slug: 'cognitive-enhancement',
    description: 'Nootropic peptides targeting focus, memory, and neuroprotection.',
    topPeptides: [
      { name: 'Semax', slug: 'semax', note: 'ACTH fragment, neuroprotective, focus' },
      { name: 'Selank', slug: 'selank', note: 'Anxiolytic, cognitive enhancement' },
      { name: 'Dihexa', slug: 'dihexa', note: 'Angiotensin IV analog, memory research' },
    ],
  },
]

export function GoalFinder() {
  const [activeGoal, setActiveGoal] = useState<string | null>(null)

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {goalOptions.map((goal) => (
          <button
            key={goal.slug}
            onClick={() => setActiveGoal(activeGoal === goal.slug ? null : goal.slug)}
            className={`rounded-xl border p-5 text-left transition-all ${
              activeGoal === goal.slug
                ? 'border-accent bg-soft-sky'
                : 'border-border bg-card hover:border-accent/50'
            }`}
          >
            <h3 className={`font-medium transition-colors ${
              activeGoal === goal.slug ? 'text-accent' : 'text-primary'
            }`}>
              {goal.name}
            </h3>
            <p className="mt-1 text-sm text-muted line-clamp-2">{goal.description}</p>
          </button>
        ))}
      </div>

      {activeGoal && (
        <div className="mt-6 rounded-xl border border-accent/20 bg-soft-sky p-6">
          {(() => {
            const goal = goalOptions.find((g) => g.slug === activeGoal)
            if (!goal) return null
            return (
              <>
                <h3 className="text-lg font-medium text-foreground">
                  Top Peptides for {goal.name}
                </h3>
                <div className="mt-4 space-y-3">
                  {goal.topPeptides.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/peptides/${p.slug}`}
                      className="block rounded-lg border border-border bg-white p-4 transition-colors hover:border-accent"
                    >
                      <p className="font-medium text-primary">{p.name}</p>
                      <p className="mt-1 text-sm text-muted">{p.note}</p>
                    </Link>
                  ))}
                </div>
                <Link
                  href={`/goals/${goal.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                >
                  View full {goal.name.toLowerCase()} guide →
                </Link>
              </>
            )
          })()}
        </div>
      )}
    </div>
  )
}
