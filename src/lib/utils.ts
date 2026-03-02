export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getReadingTime(wordCount: number): string {
  const minutes = Math.ceil(wordCount / 200)
  return `${minutes} min read`
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'glp1-weight-loss': 'GLP-1 / Weight Loss',
    'healing-recovery': 'Healing & Recovery',
    'gh-secretagogue': 'Growth Hormone',
    'anti-aging': 'Anti-Aging',
    'nootropic': 'Cognitive',
    'metabolic': 'Metabolic',
    'other': 'Other',
  }
  return labels[category] || category
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    'glp1-weight-loss': 'bg-soft-sky text-accent border-accent/20',
    'healing-recovery': 'bg-blue-50 text-blue-700 border-blue-200',
    'gh-secretagogue': 'bg-purple-50 text-purple-700 border-purple-200',
    'anti-aging': 'bg-amber-50 text-amber-700 border-amber-200',
    'nootropic': 'bg-soft-sky text-accent border-accent/20',
    'metabolic': 'bg-orange-50 text-orange-700 border-orange-200',
    'other': 'bg-pearl text-muted border-border',
  }
  return colors[category] || colors.other
}

export function getFdaStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    'approved': 'FDA Approved',
    'clinical-trials': 'Clinical Trials',
    'research-only': 'Research Only',
  }
  return labels[status] || status
}

export function getFdaStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'approved': 'bg-[#E8F4F2] text-[#1A4A4A] border-sage',
    'clinical-trials': 'bg-[#FEF3C7] text-[#92400E] border-amber-300',
    'research-only': 'bg-pearl text-muted border-border',
  }
  return colors[status] || colors['research-only']
}
