export interface Provider {
  name: string
  url: string
  description: string
  priceRange: string
  prescriptionRequired: boolean
}

// Telehealth providers for FDA-approved compounds only
// TODO: Replace placeholder URLs with actual affiliate links when partnerships are established
export const providers: Record<string, Provider[]> = {
  semaglutide: [
    {
      name: 'Hims',
      url: 'https://www.hims.com/weight-loss',
      description: 'Telehealth platform offering compounded semaglutide with online prescriptions.',
      priceRange: '$199-399/mo',
      prescriptionRequired: true,
    },
    {
      name: 'Henry Meds',
      url: 'https://www.henrymeds.com',
      description: 'Compounded GLP-1 medications with monthly subscriptions and provider consultations.',
      priceRange: '$249-449/mo',
      prescriptionRequired: true,
    },
    {
      name: 'Ro',
      url: 'https://www.ro.co/weight-loss',
      description: 'Digital health clinic with brand-name and compounded semaglutide options.',
      priceRange: '$149-599/mo',
      prescriptionRequired: true,
    },
  ],
  tirzepatide: [
    {
      name: 'Hims',
      url: 'https://www.hims.com/weight-loss',
      description: 'Telehealth platform offering compounded tirzepatide with online prescriptions.',
      priceRange: '$299-499/mo',
      prescriptionRequired: true,
    },
    {
      name: 'Henry Meds',
      url: 'https://www.henrymeds.com',
      description: 'Compounded GLP-1 medications including tirzepatide with monthly plans.',
      priceRange: '$349-549/mo',
      prescriptionRequired: true,
    },
    {
      name: 'Ro',
      url: 'https://www.ro.co/weight-loss',
      description: 'Digital health clinic with brand-name and compounded tirzepatide.',
      priceRange: '$299-699/mo',
      prescriptionRequired: true,
    },
  ],
  liraglutide: [
    {
      name: 'Hims',
      url: 'https://www.hims.com/weight-loss',
      description: 'Telehealth prescriptions for Saxenda (liraglutide).',
      priceRange: '$299-499/mo',
      prescriptionRequired: true,
    },
    {
      name: 'Ro',
      url: 'https://www.ro.co/weight-loss',
      description: 'Online prescriptions for liraglutide with home delivery.',
      priceRange: '$249-599/mo',
      prescriptionRequired: true,
    },
  ],
  tesamorelin: [
    {
      name: 'Hims',
      url: 'https://www.hims.com',
      description: 'Telehealth platform with access to tesamorelin prescriptions.',
      priceRange: '$299-499/mo',
      prescriptionRequired: true,
    },
  ],
}

export function getProviders(compoundSlug: string): Provider[] {
  return providers[compoundSlug] || []
}
