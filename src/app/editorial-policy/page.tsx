import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description:
    'Our editorial standards for accuracy, sourcing, and transparency. How we research, write, and review peptide content.',
}

export default function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Editorial Policy', href: '/editorial-policy' }]} />

      <h1 className="text-3xl font-light text-foreground">Editorial Policy</h1>

      <div className="prose-custom mt-8">
        <h2>Our standards</h2>
        <p>
          Every piece of content on Peptide Nerds follows strict editorial guidelines designed to ensure
          accuracy, transparency, and usefulness.
        </p>

        <h2>Research sourcing</h2>
        <ul>
          <li>Medical and scientific claims are supported by peer-reviewed studies published in indexed journals.</li>
          <li>PubMed IDs (PMIDs) are provided for referenced studies so readers can verify sources directly.</li>
          <li>When evidence is preliminary, anecdotal, or based on animal studies, this is clearly stated.</li>
          <li>We distinguish between FDA-approved compounds, those in clinical trials, and research-only peptides.</li>
        </ul>

        <h2>Content review process</h2>
        <ul>
          <li>All content is reviewed for medical accuracy before publication.</li>
          <li>FDA compliance scanning checks for banned claims and ensures proper disclaimers.</li>
          <li>Content is scored across six dimensions: SEO, medical accuracy, compliance, readability, E-E-A-T signals, and engagement.</li>
          <li>Posts must score 85/100 or higher to be published.</li>
        </ul>

        <h2>Transparency</h2>
        <ul>
          <li>We clearly disclose when content contains affiliate links.</li>
          <li>Sponsored content (if any) is labeled as such.</li>
          <li>The author&apos;s personal experience is clearly distinguished from clinical evidence.</li>
          <li>We state conflicts of interest when they exist.</li>
        </ul>

        <h2>Updates and corrections</h2>
        <p>
          Peptide research evolves rapidly. We review and update content regularly. If you find an error or outdated
          information, contact us and we will investigate promptly.
        </p>

        <h2>What we do not do</h2>
        <ul>
          <li>We do not make therapeutic claims for non-FDA-approved compounds.</li>
          <li>We do not recommend specific vendors or sources for research peptides.</li>
          <li>We do not provide personalized medical advice.</li>
          <li>We do not guarantee results from any peptide protocol.</li>
        </ul>
      </div>
    </div>
  )
}
