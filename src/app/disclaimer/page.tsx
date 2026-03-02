import type { Metadata } from 'next'
import { Breadcrumbs } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Medical Disclaimer',
  description:
    'Important medical disclaimer for Peptide Nerds. This site provides educational content only and is not a substitute for professional medical advice.',
}

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: 'Medical Disclaimer', href: '/disclaimer' }]} />

      <h1 className="text-3xl font-light text-foreground">Medical Disclaimer</h1>

      <div className="prose-custom mt-8">
        <p>
          <strong>Last updated:</strong> March 2026
        </p>

        <h2>Not medical advice</h2>
        <p>
          The content on Peptide Nerds (peptidenerds.com) is provided for general informational
          and educational purposes only. It is not intended to be, and should not be construed as, medical advice,
          diagnosis, or treatment recommendations.
        </p>

        <h2>Consult a healthcare provider</h2>
        <p>
          Always seek the advice of a qualified healthcare provider with any questions you may have regarding a medical
          condition, treatment plan, or peptide protocol. Never disregard professional medical advice or delay in seeking
          it because of something you have read on this website.
        </p>

        <h2>No doctor-patient relationship</h2>
        <p>
          Use of this website does not create a doctor-patient, therapist-patient, or other healthcare professional
          relationship between you and the authors or operators of this site.
        </p>

        <h2>Research peptides</h2>
        <p>
          Many peptides discussed on this site are classified as &quot;research only&quot; and are not FDA-approved for human
          use. Information about such compounds is provided for educational purposes to reflect current scientific
          literature. Mention of these compounds does not constitute an endorsement of their use.
        </p>

        <h2>FDA-approved medications</h2>
        <p>
          Some peptides discussed (such as semaglutide, tirzepatide, and others) are FDA-approved medications for
          specific indications. Off-label use should only be pursued under the guidance of a licensed healthcare provider.
        </p>

        <h2>Individual results vary</h2>
        <p>
          Any results, dosages, or experiences shared on this site represent individual cases and should not be taken as
          typical or guaranteed outcomes. Your results may vary based on your individual health profile, genetics,
          lifestyle factors, and adherence to protocols.
        </p>

        <h2>Personal experience disclaimer</h2>
        <p>
          Where personal experiences are shared by the author (@fatmaninthearena), these represent one individual&apos;s
          journey and should not be interpreted as clinical evidence or medical recommendations.
        </p>

        <h2>Liability limitation</h2>
        <p>
          The operators of this website assume no liability for any injury, illness, or adverse outcome that may result
          from the use or misuse of information provided on this site. You assume full responsibility for how you choose
          to use this information.
        </p>

        <h2>Emergency situations</h2>
        <p>
          If you are experiencing a medical emergency, call 911 (in the United States) or your local emergency services
          immediately. Do not rely on this website for emergency medical guidance.
        </p>
      </div>
    </div>
  )
}
