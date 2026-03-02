import type { Metadata } from 'next'
import { peptides, getPeptidesByCategory } from '@/data/peptides'
import { PeptideCard } from '@/components/PeptideCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import type { PeptideCategory } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Peptide Guide — GLP-1 Weight Loss Peptides and 40 Compounds',
  description:
    'Complete peptide database: GLP-1 weight loss peptides (semaglutide, tirzepatide, retatrutide), healing peptides, metabolic peptides, and more. Research evidence, dosing, and FDA status.',
}

// GLP-1 weight loss first (solar system: sun category leads)
const categories: { key: PeptideCategory; label: string; description: string }[] = [
  { key: 'glp1-weight-loss', label: 'GLP-1 / Weight Loss Peptides', description: 'The most effective peptides for significant weight loss. FDA-approved options available.' },
  { key: 'metabolic', label: 'Metabolic & Fat Loss', description: 'Peptides that target fat metabolism, visceral fat, and body composition.' },
  { key: 'healing-recovery', label: 'Healing & Recovery', description: 'Tissue repair, gut healing, and injury recovery peptides — including GLP-1 side effect support.' },
  { key: 'gh-secretagogue', label: 'Growth Hormone', description: 'GH secretagogues for body recomposition, sleep, and recovery.' },
  { key: 'anti-aging', label: 'Anti-Aging', description: 'Longevity, skin health, and cellular health peptides.' },
  { key: 'nootropic', label: 'Cognitive', description: 'Brain-targeting peptides for focus, memory, and neuroprotection.' },
  { key: 'other', label: 'Other', description: 'Additional peptides covering immune support, sexual health, and more.' },
]

export default function PeptidesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Peptides', href: '/peptides' }]} />

      <h1 className="text-3xl font-light text-foreground">Peptide Guide</h1>
      <p className="mt-3 text-muted">
        {peptides.length} compounds for weight loss, healing, and optimization. Each profile includes research evidence
        with PubMed citations, dosing protocols, side effects, and FDA status.
      </p>

      {categories.map((cat) => {
        const catPeptides = getPeptidesByCategory(cat.key)
        if (catPeptides.length === 0) return null
        return (
          <section key={cat.key} className="mt-12">
            <h2 className="text-xl text-foreground">{cat.label}</h2>
            <p className="mt-1 text-sm text-muted">{cat.description}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {catPeptides.map((p) => (
                <PeptideCard key={p.slug} peptide={p} />
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
