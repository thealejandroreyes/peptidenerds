import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { NewsletterSignup } from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'About Fat Man in the Arena',
  description:
    'I am 33 lbs into a peptide weight loss journey. This site is my way of sharing everything I learn — the research, the protocols, the results, and the mistakes.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'About', href: '/about' }]} />

      <h1 className="text-3xl font-light text-foreground">About this site</h1>

      <div className="prose-custom mt-8">
        <h2>Who I am</h2>
        <p>
          I go by <strong>Fat Man in the Arena</strong> on Instagram. I am a regular guy — not a doctor, not a
          researcher, not a fitness influencer. I am someone who got tired of being overweight and decided to do
          something about it.
        </p>
        <p>
          33 lbs down so far. Peptides have been a major part of that journey. But finding good information was
          impossible. Everything was either bro science on Reddit, academic papers nobody can understand, or sketchy
          sales pages trying to sell me research chemicals.
        </p>
        <p>So I built this.</p>

        <h2>What this site is</h2>
        <p>
          Peptide Nerds is an evidence-based reference database for peptides. Every claim is backed by
          published research with PubMed citations. Every FAQ answer is written to be useful, not to sell you something.
        </p>
        <p>
          This site covers <strong>40 peptide compounds</strong> with detailed profiles, side-by-side comparisons,
          goal-based recommendations, and stack protocols. It is the resource I wished existed when I started.
        </p>

        <h2>What this site is NOT</h2>
        <ul>
          <li>This is not medical advice. I am not a doctor.</li>
          <li>This is not a peptide store. I do not sell peptides.</li>
          <li>This is not sponsored by any peptide company (unless clearly disclosed).</li>
        </ul>

        <h2>My approach</h2>
        <ul>
          <li><strong>Research-first:</strong> Every peptide profile includes published studies with PubMed links.</li>
          <li><strong>Honest about limitations:</strong> When evidence is preliminary or anecdotal, I say so.</li>
          <li><strong>FDA status clarity:</strong> Every compound clearly states whether it is FDA-approved, in clinical trials, or research-only.</li>
          <li><strong>No hype:</strong> I do not promise miracles. Peptides are tools. Results depend on the full picture — diet, training, sleep, consistency.</li>
        </ul>

        <h2>Follow the journey</h2>
        <p>
          I document everything on Instagram at{' '}
          <a href="https://instagram.com/fatmaninthearena" target="_blank" rel="noopener noreferrer">
            @fatmaninthearena
          </a>
          . The weekly newsletter goes deeper — new research breakdowns, protocol updates, and what I am actually
          taking.
        </p>
      </div>

      <div className="mt-10">
        <NewsletterSignup />
      </div>
    </div>
  )
}
