import { Suspense } from 'react'
import type { Metadata } from 'next'
import { TrackerClient } from './tracker-client'

export const metadata: Metadata = {
  title: 'Peptide Protocol Tracker',
  description:
    'Track your peptide protocols, log doses, monitor vial inventory, and maintain streaks. Free, private, and runs entirely in your browser.',
  openGraph: {
    title: 'Peptide Protocol Tracker | Peptide Nerds',
    description:
      'Track your peptide protocols, log doses, and monitor adherence. Free tool — no account required.',
    type: 'website',
  },
}

export default function TrackerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Suspense>
        <TrackerClient />
      </Suspense>

      {/* WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Peptide Protocol Tracker',
            url: 'https://peptidenerds.com/tracker',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'Track peptide protocols, log doses, monitor vial inventory, and maintain adherence streaks.',
          }),
        }}
      />
    </div>
  )
}
