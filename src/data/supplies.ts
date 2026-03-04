export interface Supply {
  name: string
  url: string
  description: string
  priceRange: string
  category: 'reconstitution' | 'injection' | 'storage' | 'safety'
}

// Injection supplies — Amazon Associates links
// TODO: Replace placeholder URLs with actual Amazon affiliate links
export const supplies: Supply[] = [
  {
    name: 'Bacteriostatic Water (30mL)',
    url: 'https://www.amazon.com/s?k=bacteriostatic+water+30ml',
    description: 'Required for reconstituting lyophilized peptides. 30mL is standard.',
    priceRange: '$8-15',
    category: 'reconstitution',
  },
  {
    name: 'Insulin Syringes (1mL, 29ga)',
    url: 'https://www.amazon.com/s?k=insulin+syringes+1ml+29+gauge',
    description: '1mL insulin syringes with 29-gauge needles for subcutaneous injection.',
    priceRange: '$12-20 (100ct)',
    category: 'injection',
  },
  {
    name: 'Alcohol Prep Pads',
    url: 'https://www.amazon.com/s?k=alcohol+prep+pads',
    description: 'Sterile 70% isopropyl alcohol wipes for injection site prep.',
    priceRange: '$5-10 (200ct)',
    category: 'safety',
  },
  {
    name: 'Sharps Container',
    url: 'https://www.amazon.com/s?k=sharps+disposal+container',
    description: 'FDA-cleared sharps disposal container for used needles.',
    priceRange: '$8-15',
    category: 'safety',
  },
]

export function getSuppliesByCategory(category?: Supply['category']): Supply[] {
  if (!category) return supplies
  return supplies.filter((s) => s.category === category)
}
