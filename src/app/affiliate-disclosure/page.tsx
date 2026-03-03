import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure — Peptide Nerds',
  description:
    'Full affiliate and advertising disclosure for peptidenerds.com. We believe in transparency about how this site is funded.',
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Affiliate Disclosure', href: '/affiliate-disclosure' }]} />

      <h1 className="text-3xl font-light text-foreground">Affiliate Disclosure</h1>
      <p className="mt-3 text-muted">
        Last updated: March 2026
      </p>

      <div className="prose-custom mt-8">
        <h2>How this site makes money</h2>
        <p>
          Peptide Nerds is an independently operated educational website. Maintaining this site — research,
          writing, hosting, tools — costs money. Here is how we fund it, with full transparency.
        </p>

        <h2>Affiliate links</h2>
        <p>
          Some pages on this site contain affiliate links to products, services, or peptide-related suppliers.
          When you click an affiliate link and make a purchase, we may earn a small commission at no additional
          cost to you.
        </p>
        <p>
          Affiliate relationships <strong>never influence our editorial content.</strong> Our peptide profiles,
          comparisons, and recommendations are based on published clinical research and personal experience —
          not on which company pays us a commission.
        </p>
        <p>
          Pages that contain affiliate links will be clearly marked with a disclosure notice.
        </p>

        <h2>What we will never do</h2>
        <ul>
          <li>Recommend a product solely because it pays a higher commission</li>
          <li>Write favorable reviews in exchange for payment without disclosure</li>
          <li>Hide affiliate relationships from our readers</li>
          <li>Let advertisers influence clinical data, research citations, or safety information</li>
          <li>Accept payment to remove or suppress negative information about a product</li>
        </ul>

        <h2>Advertising</h2>
        <p>
          This site may display advertisements from third-party ad networks or direct advertisers. Advertising
          content is clearly distinguished from editorial content. The presence of an advertisement does not
          constitute an endorsement of the advertised product or service.
        </p>

        <h2>Newsletter</h2>
        <p>
          Our free newsletter is distributed via Beehiiv. The newsletter may contain sponsored content or
          affiliate links, which will always be clearly identified. Subscribing to the newsletter is free and
          you can unsubscribe at any time.
        </p>

        <h2>Product reviews and comparisons</h2>
        <p>
          When we review or compare products, our assessments are based on:
        </p>
        <ul>
          <li>Published clinical trial data and peer-reviewed research</li>
          <li>FDA approval status and regulatory information</li>
          <li>Personal experience where applicable (clearly labeled as anecdotal)</li>
          <li>Community feedback and reported experiences</li>
        </ul>
        <p>
          We do not accept payment for favorable reviews. If a product was provided free for review purposes,
          this will be disclosed.
        </p>

        <h2>FTC compliance</h2>
        <p>
          This disclosure is provided in accordance with the Federal Trade Commission (FTC) guidelines on
          endorsements and testimonials. We are committed to honest, transparent communication about any
          financial relationships that could affect the content on this site.
        </p>

        <h2>Questions?</h2>
        <p>
          If you have questions about our affiliate relationships or advertising policies, please{' '}
          <a href="/contact">contact us</a>.
        </p>
      </div>
    </div>
  )
}
