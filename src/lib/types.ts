export type PeptideCategory =
  | 'glp1-weight-loss'
  | 'healing-recovery'
  | 'gh-secretagogue'
  | 'anti-aging'
  | 'nootropic'
  | 'metabolic'
  | 'other'

export interface Study {
  title: string
  journal: string
  year: number
  pmid?: string
  keyFinding: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Peptide {
  name: string
  slug: string
  abbreviation?: string
  category: PeptideCategory
  subcategory?: string
  description: string
  mechanism: string
  benefits: string[]
  sideEffects: string[]
  dosing: {
    typical: string
    frequency: string
    cycleLength?: string
    notes: string
  }
  research: {
    level: 'strong' | 'moderate' | 'preliminary' | 'anecdotal'
    keyStudies: Study[]
  }
  fdaStatus: 'approved' | 'clinical-trials' | 'research-only'
  fdaApprovedFor?: string
  goals: string[]
  clinicalComparisons?: string
  realWorldData?: string
  drugInteractions?: string
  populationNotes?: string
  faq: FAQ[]
  relatedPeptides: string[]
  stacksWith: string[]
}

export interface ComparisonDimension {
  name: string
  peptideAScore: string
  peptideBScore: string
  peptideCScore?: string
  notes: string
}

export interface Comparison {
  slug: string
  peptideA: string
  peptideB: string
  peptideC?: string
  title: string
  metaDescription: string
  winner?: string
  dimensions: ComparisonDimension[]
}

export interface Goal {
  name: string
  slug: string
  description: string
  metaDescription: string
  topPeptides: string[]
  considerations: string
}

export interface StackEntry {
  peptide: string
  dose: string
  frequency: string
  timing: string
  role: string
}

export interface Stack {
  name: string
  slug: string
  description: string
  metaDescription: string
  peptides: StackEntry[]
  goals: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedMonthlyCost: string
  duration: string
  notes: string
}

export interface BlogPost {
  title: string
  slug: string
  description: string
  date: string
  pillar: string
  keywords: string[]
  content: string
}
