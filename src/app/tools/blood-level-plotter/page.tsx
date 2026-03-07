import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { flags } from '@/lib/feature-flags'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { BreadcrumbSchema } from '@/components/SchemaMarkup'
import { PlotterClient } from './plotter-client'

export const metadata: Metadata = {
  title: 'GLP-1 Blood Level Plotter \u2014 Free Tool',
  description:
    'Visualize GLP-1 drug concentration over time. Model titration schedules for semaglutide, tirzepatide, and retatrutide with pharmacokinetic curves.',
  alternates: { canonical: '/tools/blood-level-plotter' },
  openGraph: {
    title: 'GLP-1 Blood Level Plotter \u2014 Free Tool | Peptide Nerds',
    description:
      'Visualize GLP-1 drug concentration over time. Model titration schedules for semaglutide, tirzepatide, and retatrutide.',
    type: 'website',
  },
}

export default function BloodLevelPlotterPage() {
  if (!flags.proEnabled) {
    notFound()
  }

  return (
    <>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { name: 'Tools', href: '/tools' },
            { name: 'Blood Level Plotter', href: '/tools/blood-level-plotter' },
          ]}
        />

        <h1 className="mt-6 text-3xl sm:text-4xl">GLP-1 Blood Level Plotter</h1>
        <p className="mt-3 text-muted">
          Model how drug concentration builds over time with your dosing schedule.
          Adjust compounds, titration steps, and frequency to see estimated blood levels.
        </p>

        <div className="mt-8">
          <Suspense
            fallback={
              <div className="rounded-xl border border-border bg-card p-8 text-center text-muted">
                Loading plotter...
              </div>
            }
          >
            <PlotterClient />
          </Suspense>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <p className="text-xs text-yellow-800">
            <strong>Educational estimate only.</strong> This tool uses simplified single-compartment
            pharmacokinetic modeling. Actual blood levels vary based on individual metabolism, injection
            site, body composition, renal function, and other factors. Concentration values are shown in
            relative units and do not represent actual ng/mL measurements. This tool does not constitute
            medical advice. Always consult your healthcare provider before starting or adjusting any
            medication.
          </p>
        </div>
      </div>

      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Tools', url: '/tools' },
          { name: 'Blood Level Plotter', url: '/tools/blood-level-plotter' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'GLP-1 Blood Level Plotter',
            url: 'https://peptidenerds.com/tools/blood-level-plotter',
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            description:
              'Visualize GLP-1 drug concentration over time. Model titration schedules for semaglutide, tirzepatide, and retatrutide with pharmacokinetic curves.',
          }),
        }}
      />
    </>
  )
}
