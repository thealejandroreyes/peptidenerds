import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ArticleSchema, FAQSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Peptides for Weight Loss: The Complete Guide (2026)',
  description:
    'Everything you need to know about peptides for weight loss. GLP-1 agonists, dual and triple agonists, research peptides, dosing, side effects, and how to choose the right one.',
  openGraph: {
    title: 'Peptides for Weight Loss: The Complete Guide (2026)',
    description:
      'Comprehensive guide to weight loss peptides — GLP-1 agonists, dual agonists, research compounds. Clinical trial data, comparisons, and practical information.',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'What is the most effective peptide for weight loss?',
    answer:
      'Based on clinical trial data, retatrutide shows the highest weight loss (24.2% in Phase 2), followed by tirzepatide (20.9% in SURMOUNT-1) and semaglutide (14.9% in STEP 1). However, retatrutide is not yet FDA-approved. Among approved medications, tirzepatide produces the most weight loss.',
  },
  {
    question: 'Are weight loss peptides safe?',
    answer:
      'FDA-approved GLP-1 medications like semaglutide and tirzepatide have been studied in over 25,000 clinical trial participants with acceptable safety profiles. Common side effects are gastrointestinal (nausea, diarrhea). Rare risks include pancreatitis and gallbladder events. Research-only peptides have less safety data. Always work with a healthcare provider.',
  },
  {
    question: 'Do you need a prescription for weight loss peptides?',
    answer:
      'FDA-approved medications (semaglutide/Wegovy, tirzepatide/Zepbound, liraglutide/Saxenda) require a prescription. Research peptides like AOD-9604 and tesofensine are not FDA-approved and are available through some compounding pharmacies or research suppliers, though their use is not regulated for weight loss.',
  },
  {
    question: 'How much weight can you lose on peptides?',
    answer:
      'Weight loss varies by medication and individual. Clinical trial averages: semaglutide 14.9% body weight at 68 weeks, tirzepatide 20.9% at 72 weeks, retatrutide 24.2% at 48 weeks. For a 250-pound person, this ranges from roughly 37 to 60 pounds. Individual results vary significantly.',
  },
  {
    question: 'Do you regain weight after stopping peptides?',
    answer:
      'Research shows significant weight regain after discontinuing GLP-1 medications. STEP 4 showed two-thirds of lost weight regained within a year of stopping semaglutide. SURMOUNT-4 showed 14% body weight regain after stopping tirzepatide. Most physicians recommend ongoing treatment, similar to managing other chronic conditions.',
  },
]

export default function PeptidesWeightLossGuidePage() {
  return (
    <>
      <ArticleSchema
        title="Peptides for Weight Loss: The Complete Guide (2026)"
        description="Comprehensive guide to weight loss peptides — GLP-1 agonists, dual agonists, research compounds, clinical data, and practical information."
        url="/peptides-weight-loss-guide"
        datePublished="2026-03-03"
        dateModified="2026-03-03"
      />
      <FAQSchema faqs={faqs} />

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'Peptides for Weight Loss Guide', href: '/peptides-weight-loss-guide' }]} />

        <h1 className="text-3xl font-light leading-tight text-foreground sm:text-4xl">
          Peptides for Weight Loss: The Complete Guide
        </h1>
        <p className="mt-4 text-lg text-muted">
          Everything you need to know about peptides used for weight loss — from FDA-approved GLP-1 medications
          to next-generation triple agonists still in clinical trials. Research-backed, regularly updated.
        </p>

        <div className="mt-6 rounded-xl border border-warm-sand bg-[#FEF9EC] p-5">
          <p className="text-xs text-[#6B5A40]">
            <span className="font-medium">Medical disclaimer:</span> This guide is for educational purposes only
            and is not medical advice. Always consult a qualified healthcare provider before starting any medication
            or peptide protocol. See our <a href="/disclaimer" className="underline">full medical disclaimer</a>.
          </p>
        </div>

        <div className="prose-custom mt-10">
          {/* Table of Contents */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="mt-0 text-lg">In this guide</h2>
            <ol className="text-sm">
              <li><a href="#what-are-weight-loss-peptides">What are weight loss peptides?</a></li>
              <li><a href="#fda-approved">FDA-approved weight loss peptides</a></li>
              <li><a href="#clinical-trials">Next-generation peptides in clinical trials</a></li>
              <li><a href="#research-compounds">Research compounds</a></li>
              <li><a href="#comparison">Head-to-head comparison</a></li>
              <li><a href="#how-they-work">How weight loss peptides work</a></li>
              <li><a href="#side-effects">Side effects and safety</a></li>
              <li><a href="#choosing">How to choose the right one</a></li>
              <li><a href="#tools">Dosing tools and calculators</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ol>
          </div>

          <h2 id="what-are-weight-loss-peptides">What are weight loss peptides?</h2>
          <p>
            Weight loss peptides are medications or research compounds that reduce body weight through
            hormonal signaling pathways. The most clinically validated class is GLP-1 receptor agonists,
            which mimic the incretin hormones your body naturally produces after eating.
          </p>
          <p>
            These compounds work primarily by reducing appetite, slowing gastric emptying, and improving
            metabolic function. Unlike stimulants or thermogenics, they target the hormonal systems that
            regulate hunger and satiety — addressing a root cause of weight gain rather than masking symptoms.
          </p>
          <p>
            The field has evolved rapidly since 2021, when semaglutide (Wegovy) became the first GLP-1
            approved specifically for weight management. Dual-receptor agonists like tirzepatide followed,
            and triple-receptor agonists like retatrutide are now in Phase 3 trials.
          </p>

          <h2 id="fda-approved">FDA-approved weight loss peptides</h2>
          <p>
            Three peptide-based medications are currently FDA-approved for chronic weight management:
          </p>

          <h3>Semaglutide (Wegovy)</h3>
          <p>
            <Link href="/peptides/semaglutide" className="text-accent hover:text-accent-hover">Semaglutide</Link> is
            a GLP-1 receptor agonist approved for adults and adolescents 12+ with BMI 30+ (or 27+ with a
            weight-related comorbidity). Average weight loss: 14.9% over 68 weeks in the STEP 1 trial. Also
            shown to reduce cardiovascular events by 20% in the SELECT trial.
          </p>
          <ul>
            <li><strong>Brand names:</strong> Wegovy (weight loss), Ozempic (diabetes)</li>
            <li><strong>Dose:</strong> 2.4 mg weekly injection (16-20 week titration)</li>
            <li><strong>Key evidence:</strong> STEP 1-5, SELECT trial — 10,000+ participants</li>
            <li><strong>Cost:</strong> ~$1,300/month without insurance</li>
          </ul>

          <h3>Tirzepatide (Zepbound)</h3>
          <p>
            <Link href="/peptides/tirzepatide" className="text-accent hover:text-accent-hover">Tirzepatide</Link> is
            a dual GIP/GLP-1 receptor agonist that produces more weight loss than semaglutide. In the SURMOUNT-5
            head-to-head trial, tirzepatide 15 mg achieved 20.2% weight loss versus 13.7% with semaglutide 2.4 mg.
          </p>
          <ul>
            <li><strong>Brand names:</strong> Zepbound (weight loss), Mounjaro (diabetes)</li>
            <li><strong>Dose:</strong> 15 mg weekly injection (20-24 week titration)</li>
            <li><strong>Key evidence:</strong> SURMOUNT 1-5, SURPASS 1-6 — 15,000+ participants</li>
            <li><strong>Cost:</strong> ~$1,060/month without insurance</li>
          </ul>

          <h3>Liraglutide (Saxenda)</h3>
          <p>
            <Link href="/peptides/liraglutide" className="text-accent hover:text-accent-hover">Liraglutide</Link> is
            an older GLP-1 agonist requiring daily injection. Average weight loss: 8% over 56 weeks. Largely
            superseded by weekly semaglutide but remains an option for patients who prefer daily dosing.
          </p>
          <ul>
            <li><strong>Brand names:</strong> Saxenda (weight loss), Victoza (diabetes)</li>
            <li><strong>Dose:</strong> 3.0 mg daily injection</li>
            <li><strong>Cost:</strong> ~$1,350/month without insurance</li>
          </ul>

          <h2 id="clinical-trials">Next-generation peptides in clinical trials</h2>

          <h3>Retatrutide (Triple agonist)</h3>
          <p>
            <Link href="/peptides/retatrutide" className="text-accent hover:text-accent-hover">Retatrutide</Link> activates
            three receptors (GIP + GLP-1 + glucagon) and showed 24.2% weight loss in Phase 2 — the highest
            ever reported for any anti-obesity medication. The addition of glucagon receptor activation increases
            energy expenditure and dramatically reduces liver fat. Phase 3 trials (TRIUMPH program) are ongoing
            with results expected in 2026-2027.
          </p>

          <h3>Survodutide</h3>
          <p>
            <Link href="/peptides/survodutide" className="text-accent hover:text-accent-hover">Survodutide</Link> is
            a dual GLP-1/glucagon agonist (different from tirzepatide which is GIP/GLP-1). Phase 2 showed
            19.2% weight loss. Being developed for both obesity and liver disease (MASH/NAFLD).
          </p>

          <h3>CagriSema</h3>
          <p>
            <Link href="/peptides/cagrilintide" className="text-accent hover:text-accent-hover">CagriSema</Link> combines
            semaglutide with cagrilintide (an amylin analog), attacking appetite through two independent
            hormonal pathways. Phase 3 trials are ongoing.
          </p>

          <h2 id="research-compounds">Research compounds</h2>
          <p>
            These compounds are not FDA-approved for weight loss but are available through research channels
            or compounding pharmacies. Evidence is more limited than for approved medications.
          </p>
          <ul>
            <li>
              <Link href="/peptides/tesofensine" className="text-accent hover:text-accent-hover">Tesofensine</Link> —
              Triple monoamine reuptake inhibitor (oral, not injectable). Different mechanism than GLP-1s.
            </li>
            <li>
              <Link href="/peptides/aod-9604" className="text-accent hover:text-accent-hover">AOD-9604</Link> —
              Fragment of growth hormone. Modest evidence for fat metabolism.
            </li>
            <li>
              <Link href="/peptides/mots-c" className="text-accent hover:text-accent-hover">MOTS-c</Link> —
              Mitochondrial peptide with metabolic effects. Very early research.
            </li>
          </ul>

          <h2 id="comparison">Head-to-head comparison</h2>
          <table>
            <thead>
              <tr>
                <th>Peptide</th>
                <th>Mechanism</th>
                <th>Avg Weight Loss</th>
                <th>FDA Status</th>
                <th>Dosing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Link href="/peptides/semaglutide">Semaglutide</Link></td>
                <td>GLP-1</td>
                <td>14.9% (68 wk)</td>
                <td>Approved</td>
                <td>Weekly injection</td>
              </tr>
              <tr>
                <td><Link href="/peptides/tirzepatide">Tirzepatide</Link></td>
                <td>GIP/GLP-1</td>
                <td>20.9% (72 wk)</td>
                <td>Approved</td>
                <td>Weekly injection</td>
              </tr>
              <tr>
                <td><Link href="/peptides/retatrutide">Retatrutide</Link></td>
                <td>GIP/GLP-1/Glucagon</td>
                <td>24.2% (48 wk)</td>
                <td>Phase 3</td>
                <td>Weekly injection</td>
              </tr>
              <tr>
                <td><Link href="/peptides/survodutide">Survodutide</Link></td>
                <td>GLP-1/Glucagon</td>
                <td>19.2% (46 wk)</td>
                <td>Phase 3</td>
                <td>Weekly injection</td>
              </tr>
              <tr>
                <td><Link href="/peptides/liraglutide">Liraglutide</Link></td>
                <td>GLP-1</td>
                <td>8.0% (56 wk)</td>
                <td>Approved</td>
                <td>Daily injection</td>
              </tr>
              <tr>
                <td><Link href="/peptides/tesofensine">Tesofensine</Link></td>
                <td>Triple reuptake</td>
                <td>~12% (Phase 2)</td>
                <td>Research only</td>
                <td>Daily oral</td>
              </tr>
            </tbody>
          </table>
          <p>
            For detailed side-by-side comparisons, see our{' '}
            <Link href="/compare/semaglutide-vs-tirzepatide" className="text-accent hover:text-accent-hover">
              semaglutide vs tirzepatide
            </Link>,{' '}
            <Link href="/compare/semaglutide-vs-retatrutide" className="text-accent hover:text-accent-hover">
              semaglutide vs retatrutide
            </Link>, and{' '}
            <Link href="/compare/tirzepatide-vs-retatrutide" className="text-accent hover:text-accent-hover">
              tirzepatide vs retatrutide
            </Link>{' '}
            comparison pages.
          </p>

          <h2 id="how-they-work">How weight loss peptides work</h2>
          <p>
            Most weight loss peptides work through the incretin system — hormones released by the gut after
            eating that regulate appetite, blood sugar, and metabolism.
          </p>
          <p>
            <strong>GLP-1 pathway:</strong> Reduces appetite through hypothalamic signaling, slows gastric
            emptying (you feel full longer), and enhances insulin secretion. This is how semaglutide,
            liraglutide, and the GLP-1 component of tirzepatide and retatrutide work.
          </p>
          <p>
            <strong>GIP pathway:</strong> Enhances insulin response, improves fat metabolism, and may have
            direct effects on adipose tissue. Added by tirzepatide and retatrutide on top of GLP-1.
          </p>
          <p>
            <strong>Glucagon pathway:</strong> Increases energy expenditure, promotes hepatic fat oxidation,
            and stimulates thermogenesis. This &quot;burn more&quot; mechanism is unique to retatrutide and survodutide.
          </p>
          <p>
            The evolution from single (GLP-1) to dual (GIP/GLP-1) to triple (GIP/GLP-1/glucagon) agonism
            represents increasingly effective metabolic intervention. Each additional receptor targets a
            complementary pathway, producing additive weight loss effects.
          </p>

          <h2 id="side-effects">Side effects and safety</h2>
          <p>
            All GLP-1-based medications share a similar side effect profile. Gastrointestinal symptoms are
            the most common:
          </p>
          <table>
            <thead>
              <tr>
                <th>Side Effect</th>
                <th>Semaglutide</th>
                <th>Tirzepatide</th>
                <th>Liraglutide</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Nausea</td><td>44%</td><td>31%</td><td>40%</td></tr>
              <tr><td>Diarrhea</td><td>30%</td><td>23%</td><td>21%</td></tr>
              <tr><td>Vomiting</td><td>24%</td><td>13%</td><td>16%</td></tr>
              <tr><td>Constipation</td><td>24%</td><td>12%</td><td>19%</td></tr>
            </tbody>
          </table>
          <p>
            Rare but serious risks include pancreatitis (0.1-0.2%), gallbladder events (1-2%), and potential
            thyroid concerns (boxed warning based on rodent studies). These medications should not be used
            during pregnancy or in people with a personal or family history of medullary thyroid carcinoma.
          </p>
          <p>
            Lean mass loss is a concern — research shows 25-40% of weight lost is lean mass without
            resistance training. Read more about{' '}
            <Link href="/blog/glp-1-muscle-loss-what-research-shows" className="text-accent hover:text-accent-hover">
              GLP-1 medications and muscle loss
            </Link>.
          </p>

          <h2 id="choosing">How to choose the right weight loss peptide</h2>
          <p>The choice depends on several factors:</p>
          <ul>
            <li><strong>Insurance coverage:</strong> Check if your plan covers Wegovy or Zepbound. This often decides the choice.</li>
            <li><strong>Weight loss goal:</strong> Higher BMI or more aggressive goals may favor tirzepatide over semaglutide.</li>
            <li><strong>GI tolerance:</strong> Tirzepatide has lower GI side effect rates than semaglutide in head-to-head data.</li>
            <li><strong>Diabetes status:</strong> If you also have type 2 diabetes, both medications improve blood sugar significantly.</li>
            <li><strong>Liver health:</strong> Retatrutide and survodutide show the strongest liver fat reduction (when available).</li>
            <li><strong>Daily vs weekly:</strong> Most people prefer weekly injection over daily (semaglutide/tirzepatide over liraglutide).</li>
          </ul>
          <p>
            Visit our <Link href="/goals/weight-loss" className="text-accent hover:text-accent-hover">weight loss goal page</Link> for
            personalized compound recommendations.
          </p>

          <h2 id="tools">Dosing tools and calculators</h2>
          <p>
            If you are using research peptides that require reconstitution, we built free tools to help:
          </p>
          <ul>
            <li>
              <Link href="/tools/dosage-calculator" className="text-accent hover:text-accent-hover">
                Peptide Dosage Calculator
              </Link> — Calculate syringe units for any peptide dose
            </li>
            <li>
              <Link href="/tools/reconstitution-calculator" className="text-accent hover:text-accent-hover">
                Reconstitution Calculator
              </Link> — Calculate concentration, doses per vial, and days supply
            </li>
            <li>
              <Link href="/tools/bac-water-calculator" className="text-accent hover:text-accent-hover">
                BAC Water Calculator
              </Link> — Calculate how much bacteriostatic water to buy for your protocol
            </li>
          </ul>

          <h2 id="faq">FAQ</h2>

          <h3>What is the most effective peptide for weight loss?</h3>
          <p>
            Based on clinical trial data, retatrutide shows the highest weight loss (24.2% in Phase 2),
            followed by tirzepatide (20.9% in SURMOUNT-1) and semaglutide (14.9% in STEP 1). However,
            retatrutide is not yet FDA-approved. Among approved medications, tirzepatide produces the most
            weight loss.
          </p>

          <h3>Are weight loss peptides safe?</h3>
          <p>
            FDA-approved GLP-1 medications like semaglutide and tirzepatide have been studied in over 25,000
            clinical trial participants with acceptable safety profiles. Common side effects are
            gastrointestinal (nausea, diarrhea). Rare risks include pancreatitis and gallbladder events.
            Research-only peptides have less safety data. Always work with a healthcare provider.
          </p>

          <h3>Do you need a prescription for weight loss peptides?</h3>
          <p>
            FDA-approved medications (semaglutide/Wegovy, tirzepatide/Zepbound, liraglutide/Saxenda) require
            a prescription. Research peptides like AOD-9604 and tesofensine are not FDA-approved and are
            available through some compounding pharmacies or research suppliers, though their use is not
            regulated for weight loss.
          </p>

          <h3>How much weight can you lose on peptides?</h3>
          <p>
            Weight loss varies by medication and individual. Clinical trial averages: semaglutide 14.9% body
            weight at 68 weeks, tirzepatide 20.9% at 72 weeks, retatrutide 24.2% at 48 weeks. For a
            250-pound person, this ranges from roughly 37 to 60 pounds. Individual results vary significantly.
          </p>

          <h3>Do you regain weight after stopping peptides?</h3>
          <p>
            Research shows significant weight regain after discontinuing GLP-1 medications. STEP 4 showed
            two-thirds of lost weight regained within a year of stopping semaglutide. SURMOUNT-4 showed 14%
            body weight regain after stopping tirzepatide. Most physicians recommend ongoing treatment,
            similar to managing other chronic conditions.
          </p>
        </div>

        <div className="mt-10 prose-custom">
          <h2>Sources</h2>
          <ol className="text-sm">
            <li>STEP 1 — Semaglutide for weight management (NEJM, 2021; PMID: 33567185)</li>
            <li>SURMOUNT-1 — Tirzepatide for obesity (NEJM, 2022; PMID: 35658024)</li>
            <li>SURMOUNT-5 — Tirzepatide vs semaglutide head-to-head (NEJM, 2024; PMID: 39652484)</li>
            <li>Retatrutide Phase 2 — Triple agonist for obesity (NEJM, 2023; PMID: 37351564)</li>
            <li>SELECT — Semaglutide cardiovascular outcomes (NEJM, 2023; PMID: 37952131)</li>
            <li>SCALE — Liraglutide for weight management (NEJM, 2015; PMID: 26132939)</li>
          </ol>
        </div>

        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </article>
    </>
  )
}
