import type { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ArticleSchema, FAQSchema } from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'GLP-1 Peptides for Weight Loss: Complete Guide to Every Compound (2026)',
  description:
    'Complete guide to GLP-1 receptor agonists for weight loss. Semaglutide, tirzepatide, retatrutide, liraglutide, survodutide — mechanism, trials, dosing, side effects, and comparisons.',
  openGraph: {
    title: 'GLP-1 Peptides for Weight Loss: Every Compound Explained',
    description:
      'In-depth guide to every GLP-1 receptor agonist for weight loss. Clinical trial data, mechanism of action, head-to-head comparisons, and practical dosing information.',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'What is a GLP-1 receptor agonist?',
    answer:
      'A GLP-1 receptor agonist is a medication that mimics the hormone glucagon-like peptide-1 (GLP-1), which your body naturally produces after eating. By activating GLP-1 receptors, these medications reduce appetite, slow gastric emptying, improve insulin sensitivity, and promote weight loss. Examples include semaglutide (Wegovy/Ozempic) and tirzepatide (Zepbound/Mounjaro).',
  },
  {
    question: 'Which GLP-1 is best for weight loss?',
    answer:
      'Among FDA-approved options, tirzepatide (Zepbound) produces the most weight loss — 20.9% average in SURMOUNT-1, and 20.2% in a direct head-to-head against semaglutide (13.7%) in SURMOUNT-5. However, individual responses vary, insurance coverage differs, and some people tolerate one better than the other.',
  },
  {
    question: 'How do GLP-1 medications cause weight loss?',
    answer:
      'GLP-1 medications work through multiple pathways: they activate satiety neurons in the hypothalamus (reducing hunger), slow gastric emptying (you feel full longer), and improve insulin sensitivity (better metabolic function). The net effect is a significant reduction in caloric intake without conscious effort to restrict food.',
  },
  {
    question: 'Are GLP-1 medications safe long-term?',
    answer:
      'Clinical trials of 1-3 years show acceptable safety profiles. The SELECT trial (17,604 participants, 33-month follow-up) showed semaglutide actually reduced cardiovascular events by 20%. Common side effects are GI-related and typically improve with time. Rare risks include pancreatitis and gallbladder events. Longer-term data (5-10 years) is still being collected.',
  },
  {
    question: 'What is the difference between single, dual, and triple agonists?',
    answer:
      'Single agonists (semaglutide, liraglutide) activate only GLP-1 receptors. Dual agonists (tirzepatide) activate GLP-1 and GIP receptors for enhanced metabolic effects. Triple agonists (retatrutide) add glucagon receptor activation for increased energy expenditure and fat burning. Each additional receptor generally produces greater weight loss.',
  },
]

export default function Glp1PeptidesPage() {
  return (
    <>
      <ArticleSchema
        title="GLP-1 Peptides for Weight Loss: Complete Guide (2026)"
        description="Complete guide to every GLP-1 receptor agonist for weight loss — mechanism, clinical trials, dosing, side effects, and comparisons."
        url="/glp-1-peptides"
        datePublished="2026-03-03"
        dateModified="2026-03-03"
      />
      <FAQSchema faqs={faqs} />

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: 'GLP-1 Peptides Guide', href: '/glp-1-peptides' }]} />

        <h1 className="text-3xl font-light leading-tight text-foreground sm:text-4xl">
          GLP-1 Peptides for Weight Loss: Every Compound Explained
        </h1>
        <p className="mt-4 text-lg text-muted">
          A complete breakdown of every GLP-1 receptor agonist used for weight loss — approved medications,
          clinical-stage compounds, and next-generation multi-receptor agonists. Updated March 2026.
        </p>

        <div className="mt-6 rounded-xl border border-warm-sand bg-[#FEF9EC] p-5">
          <p className="text-xs text-[#6B5A40]">
            <span className="font-medium">Medical disclaimer:</span> This guide is for educational purposes only.
            Always consult a healthcare provider before starting any medication. See our{' '}
            <a href="/disclaimer" className="underline">full medical disclaimer</a>.
          </p>
        </div>

        <div className="prose-custom mt-10">
          <h2>What is GLP-1?</h2>
          <p>
            Glucagon-like peptide-1 (GLP-1) is an incretin hormone produced in the L-cells of the small
            intestine after eating. It signals the brain to reduce appetite, tells the stomach to slow down,
            and enhances insulin release from the pancreas. GLP-1 receptor agonists are synthetic versions
            of this hormone, engineered to last much longer in the body.
          </p>
          <p>
            Natural GLP-1 has a half-life of about 2 minutes — it is rapidly broken down by the enzyme DPP-4.
            Medications like semaglutide are modified to resist DPP-4 and bind to albumin in the blood,
            extending the half-life to 7 days. This is what enables once-weekly dosing.
          </p>

          <h2>The GLP-1 family: Single, dual, and triple agonists</h2>
          <p>
            The field has evolved from single-receptor to multi-receptor approaches. Each generation
            targets additional hormonal pathways for greater metabolic effect:
          </p>

          <h3>Single agonists (GLP-1 only)</h3>
          <p>
            These activate only the GLP-1 receptor. They reduce appetite and slow gastric emptying but
            do not directly increase energy expenditure.
          </p>
          <ul>
            <li>
              <Link href="/peptides/semaglutide" className="text-accent hover:text-accent-hover">Semaglutide</Link>{' '}
              (Wegovy/Ozempic) — 14.9% weight loss, weekly injection, FDA-approved
            </li>
            <li>
              <Link href="/peptides/liraglutide" className="text-accent hover:text-accent-hover">Liraglutide</Link>{' '}
              (Saxenda/Victoza) — 8% weight loss, daily injection, FDA-approved
            </li>
          </ul>

          <h3>Dual agonists (GLP-1 + one additional receptor)</h3>
          <p>
            These activate two receptors for enhanced metabolic effects:
          </p>
          <ul>
            <li>
              <Link href="/peptides/tirzepatide" className="text-accent hover:text-accent-hover">Tirzepatide</Link>{' '}
              (Zepbound/Mounjaro) — GIP + GLP-1, 20.9% weight loss, FDA-approved
            </li>
            <li>
              <Link href="/peptides/survodutide" className="text-accent hover:text-accent-hover">Survodutide</Link>{' '}
              — Glucagon + GLP-1, 19.2% weight loss, Phase 3 trials
            </li>
            <li>
              <Link href="/peptides/cagrilintide" className="text-accent hover:text-accent-hover">CagriSema</Link>{' '}
              — Amylin analog + semaglutide combination, Phase 3 trials
            </li>
          </ul>

          <h3>Triple agonists (GLP-1 + two additional receptors)</h3>
          <ul>
            <li>
              <Link href="/peptides/retatrutide" className="text-accent hover:text-accent-hover">Retatrutide</Link>{' '}
              — GIP + GLP-1 + Glucagon, 24.2% weight loss, Phase 3 trials
            </li>
          </ul>

          <h2>Head-to-head comparison: Every GLP-1 agonist</h2>
          <table>
            <thead>
              <tr>
                <th>Compound</th>
                <th>Receptors</th>
                <th>Weight Loss</th>
                <th>Trial Duration</th>
                <th>Status</th>
                <th>Dosing</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><Link href="/peptides/semaglutide">Semaglutide</Link></td>
                <td>GLP-1</td>
                <td>14.9%</td>
                <td>68 weeks</td>
                <td>Approved</td>
                <td>Weekly inj</td>
              </tr>
              <tr>
                <td><Link href="/peptides/tirzepatide">Tirzepatide</Link></td>
                <td>GIP/GLP-1</td>
                <td>20.9%</td>
                <td>72 weeks</td>
                <td>Approved</td>
                <td>Weekly inj</td>
              </tr>
              <tr>
                <td><Link href="/peptides/retatrutide">Retatrutide</Link></td>
                <td>GIP/GLP-1/GCGR</td>
                <td>24.2%</td>
                <td>48 weeks</td>
                <td>Phase 3</td>
                <td>Weekly inj</td>
              </tr>
              <tr>
                <td><Link href="/peptides/survodutide">Survodutide</Link></td>
                <td>GLP-1/GCGR</td>
                <td>19.2%</td>
                <td>46 weeks</td>
                <td>Phase 3</td>
                <td>Weekly inj</td>
              </tr>
              <tr>
                <td><Link href="/peptides/liraglutide">Liraglutide</Link></td>
                <td>GLP-1</td>
                <td>8.0%</td>
                <td>56 weeks</td>
                <td>Approved</td>
                <td>Daily inj</td>
              </tr>
              <tr>
                <td><Link href="/peptides/cagrilintide">CagriSema</Link></td>
                <td>AMYR/GLP-1</td>
                <td>TBD</td>
                <td>Phase 3</td>
                <td>Phase 3</td>
                <td>Weekly inj</td>
              </tr>
              <tr>
                <td><Link href="/peptides/mazdutide">Mazdutide</Link></td>
                <td>GLP-1/GCGR</td>
                <td>~18%</td>
                <td>Phase 3</td>
                <td>Phase 3</td>
                <td>Weekly inj</td>
              </tr>
            </tbody>
          </table>
          <p>
            For detailed side-by-side comparisons, see:{' '}
            <Link href="/compare/semaglutide-vs-tirzepatide" className="text-accent hover:text-accent-hover">
              Semaglutide vs Tirzepatide
            </Link>{' | '}
            <Link href="/compare/semaglutide-vs-retatrutide" className="text-accent hover:text-accent-hover">
              Semaglutide vs Retatrutide
            </Link>{' | '}
            <Link href="/compare/tirzepatide-vs-retatrutide" className="text-accent hover:text-accent-hover">
              Tirzepatide vs Retatrutide
            </Link>{' | '}
            <Link href="/compare/semaglutide-vs-liraglutide" className="text-accent hover:text-accent-hover">
              Semaglutide vs Liraglutide
            </Link>
          </p>

          <h2>How GLP-1 agonists work: The science</h2>

          <h3>Appetite regulation</h3>
          <p>
            GLP-1 agonists act on the hypothalamus — the brain region that controls hunger and satiety.
            They activate POMC/CART neurons (which signal &quot;stop eating&quot;) and inhibit NPY/AgRP neurons
            (which signal &quot;eat more&quot;). The result is a significant reduction in hunger, cravings, and
            what many people describe as &quot;food noise&quot; — the constant background thinking about food.
          </p>

          <h3>Gastric emptying</h3>
          <p>
            GLP-1 slows the rate at which food moves from the stomach into the small intestine by 10-30%.
            This means you feel full longer after eating. It is also the primary cause of the nausea that
            some people experience — the stomach is holding food longer than it is used to.
          </p>

          <h3>Insulin and blood sugar</h3>
          <p>
            GLP-1 agonists enhance glucose-dependent insulin secretion — meaning they help your pancreas
            release insulin more effectively when blood sugar rises, but do not cause insulin release when
            blood sugar is already normal. This makes hypoglycemia (dangerously low blood sugar) rare unless
            combined with other diabetes medications.
          </p>

          <h3>Cardiovascular effects</h3>
          <p>
            The SELECT trial demonstrated that semaglutide reduces major adverse cardiovascular events by
            20% in overweight/obese adults with established cardiovascular disease. This cardiovascular
            benefit appears to be a class effect — not just a side benefit of weight loss.
          </p>

          <h2>Side effects by compound</h2>
          <table>
            <thead>
              <tr>
                <th>Side Effect</th>
                <th>Semaglutide</th>
                <th>Tirzepatide</th>
                <th>Retatrutide</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Nausea</td><td>44%</td><td>31%</td><td>25-45%*</td></tr>
              <tr><td>Diarrhea</td><td>30%</td><td>23%</td><td>20-35%*</td></tr>
              <tr><td>Vomiting</td><td>24%</td><td>13%</td><td>10-20%*</td></tr>
              <tr><td>Constipation</td><td>24%</td><td>12%</td><td>12-18%*</td></tr>
            </tbody>
          </table>
          <p className="text-sm">
            *Retatrutide data from Phase 2 (smaller sample). Phase 3 data pending.
          </p>
          <p>
            GI side effects are dose-dependent and improve with slow titration. Most people who
            discontinue these medications for side effects do so during the dose escalation period,
            not after reaching their maintenance dose.
          </p>
          <p>
            Read more: <Link href="/blog/glp-1-side-effects-what-to-expect" className="text-accent hover:text-accent-hover">
              GLP-1 Side Effects: What to Expect
            </Link>
          </p>

          <h2>The weight regain problem</h2>
          <p>
            All GLP-1 medications show significant weight regain after discontinuation. This is the most
            important thing to understand about these medications: they are not a temporary fix.
          </p>
          <ul>
            <li><strong>Semaglutide (STEP 4):</strong> Two-thirds of lost weight regained within 1 year of stopping</li>
            <li><strong>Tirzepatide (SURMOUNT-4):</strong> 14% body weight regain after switching to placebo</li>
          </ul>
          <p>
            This does not mean the medications do not work — it means obesity is a chronic condition that
            requires ongoing treatment, similar to high blood pressure or high cholesterol. The medications
            manage the condition; they do not cure it.
          </p>

          <h2>Cost and access</h2>
          <table>
            <thead>
              <tr>
                <th>Medication</th>
                <th>Monthly Cost (no insurance)</th>
                <th>Insurance Coverage</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Wegovy (semaglutide)</td><td>~$1,300</td><td>Growing but varies</td></tr>
              <tr><td>Zepbound (tirzepatide)</td><td>~$1,060</td><td>Growing but varies</td></tr>
              <tr><td>Saxenda (liraglutide)</td><td>~$1,350</td><td>More established</td></tr>
            </tbody>
          </table>
          <p>
            Insurance coverage is the biggest variable. Some plans cover Wegovy but not Zepbound, or vice versa.
            Manufacturer savings cards, compounding pharmacies, and patient assistance programs can reduce costs.
          </p>

          <h2>Useful tools</h2>
          <ul>
            <li>
              <Link href="/tools/dosage-calculator" className="text-accent hover:text-accent-hover">
                Peptide Dosage Calculator
              </Link> — Calculate injection volumes
            </li>
            <li>
              <Link href="/tools/reconstitution-calculator" className="text-accent hover:text-accent-hover">
                Reconstitution Calculator
              </Link> — Calculate concentrations and doses per vial
            </li>
            <li>
              <Link href="/compare" className="text-accent hover:text-accent-hover">
                All Comparisons
              </Link> — Side-by-side compound comparisons
            </li>
            <li>
              <Link href="/stacks" className="text-accent hover:text-accent-hover">
                Peptide Stacks
              </Link> — Protocol combinations
            </li>
          </ul>

          <h2>Further reading</h2>
          <ul>
            <li><Link href="/peptides-weight-loss-guide" className="text-accent hover:text-accent-hover">Peptides for Weight Loss: The Complete Guide</Link></li>
            <li><Link href="/blog/retatrutide-phase-2-results-triple-agonist" className="text-accent hover:text-accent-hover">Retatrutide Phase 2 Results: What 24% Weight Loss Means</Link></li>
            <li><Link href="/blog/semaglutide-vs-tirzepatide-weight-loss" className="text-accent hover:text-accent-hover">Semaglutide vs Tirzepatide: What the Research Says</Link></li>
            <li><Link href="/blog/glp-1-muscle-loss-what-research-shows" className="text-accent hover:text-accent-hover">Do GLP-1 Medications Cause Muscle Loss?</Link></li>
            <li><Link href="/goals/weight-loss" className="text-accent hover:text-accent-hover">Best Peptides for Weight Loss (Goal Page)</Link></li>
          </ul>

          <h2>FAQ</h2>

          <h3>What is a GLP-1 receptor agonist?</h3>
          <p>
            A GLP-1 receptor agonist is a medication that mimics the hormone glucagon-like peptide-1, which
            your body naturally produces after eating. By activating GLP-1 receptors, these medications reduce
            appetite, slow gastric emptying, improve insulin sensitivity, and promote weight loss. Examples
            include semaglutide (Wegovy/Ozempic) and tirzepatide (Zepbound/Mounjaro).
          </p>

          <h3>Which GLP-1 is best for weight loss?</h3>
          <p>
            Among FDA-approved options, tirzepatide (Zepbound) produces the most weight loss — 20.9% average
            in SURMOUNT-1, and 20.2% in a direct head-to-head against semaglutide (13.7%) in SURMOUNT-5.
            However, individual responses vary, insurance coverage differs, and some people tolerate one
            better than the other.
          </p>

          <h3>How do GLP-1 medications cause weight loss?</h3>
          <p>
            GLP-1 medications work through multiple pathways: they activate satiety neurons in the hypothalamus
            (reducing hunger), slow gastric emptying (you feel full longer), and improve insulin sensitivity
            (better metabolic function). The net effect is a significant reduction in caloric intake.
          </p>

          <h3>Are GLP-1 medications safe long-term?</h3>
          <p>
            Clinical trials of 1-3 years show acceptable safety profiles. The SELECT trial (17,604 participants,
            33-month follow-up) showed semaglutide reduced cardiovascular events by 20%. Common side effects
            are GI-related and typically improve. Rare risks include pancreatitis and gallbladder events.
          </p>

          <h3>What is the difference between single, dual, and triple agonists?</h3>
          <p>
            Single agonists (semaglutide, liraglutide) activate only GLP-1 receptors. Dual agonists (tirzepatide)
            activate GLP-1 and GIP for enhanced metabolic effects. Triple agonists (retatrutide) add glucagon
            for increased energy expenditure. Each additional receptor generally produces greater weight loss.
          </p>
        </div>

        <div className="mt-10 prose-custom">
          <h2>Sources</h2>
          <ol className="text-sm">
            <li>STEP 1 — Semaglutide for weight management (NEJM, 2021; PMID: 33567185)</li>
            <li>SURMOUNT-1 — Tirzepatide for obesity (NEJM, 2022; PMID: 35658024)</li>
            <li>SURMOUNT-5 — Tirzepatide vs semaglutide (NEJM, 2024; PMID: 39652484)</li>
            <li>Retatrutide Phase 2 (NEJM, 2023; PMID: 37351564)</li>
            <li>SELECT — Semaglutide cardiovascular outcomes (NEJM, 2023; PMID: 37952131)</li>
            <li>SCALE — Liraglutide for weight management (NEJM, 2015; PMID: 26132939)</li>
            <li>Survodutide Phase 2 (NEJM, 2024; PMID: 38587239)</li>
          </ol>
        </div>

        <div className="mt-12">
          <NewsletterSignup />
        </div>
      </article>
    </>
  )
}
