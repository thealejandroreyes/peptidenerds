import type { FAQ } from '@/lib/types'

export interface PillarConfig {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  heroDescription: string
  pillarKey: string // matches blog post frontmatter `pillar` field
  faqs: FAQ[]
  relatedPeptides: string[]
  relatedStacks: string[]
  relatedComparisons: string[]
  relatedGoals: string[]
  relatedTools: string[]
}

export const pillarConfigs: PillarConfig[] = [
  {
    slug: 'healing-peptides',
    title: 'Healing Peptides: The Complete Evidence-Based Guide',
    metaTitle: 'Healing Peptides Guide: BPC-157, TB-500, GHK-Cu & More (2026)',
    metaDescription:
      'Evidence-based guide to healing peptides. BPC-157, TB-500, GHK-Cu research, dosing protocols, stacking strategies, and safety profiles.',
    heroDescription:
      'Everything researchers and self-experimenters need to know about peptides used for tissue repair, injury recovery, and inflammation — backed by real studies.',
    pillarKey: 'healing-peptides',
    faqs: [
      {
        question: 'What are healing peptides?',
        answer:
          'Healing peptides are short-chain amino acid sequences that promote tissue repair, reduce inflammation, and accelerate recovery. The most researched include BPC-157 (gastric pentadecapeptide), TB-500 (thymosin beta-4 fragment), and GHK-Cu (copper peptide). None are FDA-approved for therapeutic use in humans.',
      },
      {
        question: 'What is the most researched healing peptide?',
        answer:
          'BPC-157 has the largest body of research with over 100 published studies. Most are animal studies showing accelerated healing of tendons, ligaments, muscles, gut lining, and bone. Human clinical trial data is limited but growing.',
      },
      {
        question: 'Can you stack BPC-157 and TB-500?',
        answer:
          'Many researchers and self-experimenters combine BPC-157 and TB-500 because they work through different mechanisms. BPC-157 promotes angiogenesis and growth factor expression locally, while TB-500 acts systemically on inflammation and cell migration. Stacking is common in community protocols but has not been studied in clinical trials.',
      },
      {
        question: 'Are healing peptides FDA-approved?',
        answer:
          'No healing peptides are currently FDA-approved for therapeutic use. BPC-157, TB-500, and GHK-Cu are classified as research compounds. They are available from research peptide suppliers but are not approved medications. Always consult a healthcare provider before using any peptide.',
      },
      {
        question: 'How are healing peptides typically administered?',
        answer:
          'Most healing peptides are administered via subcutaneous injection near the injury site. Some (like BPC-157) are also available in oral capsule form, though bioavailability differs. GHK-Cu is commonly used topically for skin applications. Proper reconstitution with bacteriostatic water is required for injectable forms.',
      },
    ],
    relatedPeptides: ['bpc-157', 'tb-500', 'ghk-cu', 'thymosin-alpha-1', 'pentosan-polysulfate'],
    relatedStacks: ['healing-recovery'],
    relatedComparisons: ['bpc-157-vs-tb-500'],
    relatedGoals: ['injury-recovery', 'joint-health', 'gut-health'],
    relatedTools: ['dosage-calculator', 'reconstitution-calculator'],
  },
  {
    slug: 'peptide-how-to',
    title: 'Peptide How-To Guides: Dosing, Reconstitution & Protocols',
    metaTitle: 'How to Use Peptides: Dosing, Reconstitution & Injection Guides (2026)',
    metaDescription:
      'Step-by-step peptide guides. Learn how to reconstitute, inject, store, dose, and use peptides safely with calculator tools and protocol walkthroughs.',
    heroDescription:
      'Practical, step-by-step guides for working with peptides — from reconstitution and injection technique to dosing protocols and proper storage.',
    pillarKey: 'peptide-how-to',
    faqs: [
      {
        question: 'How do you reconstitute peptides?',
        answer:
          'Draw bacteriostatic water into a syringe, then inject it slowly against the wall of the peptide vial (never directly onto the powder). Gently swirl until dissolved — do not shake. Common reconstitution volumes are 1-2 mL of bacteriostatic water per vial. Use our reconstitution calculator for exact volumes.',
      },
      {
        question: 'Where do you inject peptides?',
        answer:
          'Subcutaneous injections go into the fat layer just under the skin. Common sites include the abdomen (2 inches from the navel), outer thigh, and upper arm. Rotate injection sites to prevent lipodystrophy. Clean the site with an alcohol swab before injecting.',
      },
      {
        question: 'How should peptides be stored?',
        answer:
          'Unreconstituted peptides should be stored in a cool, dark place — ideally a freezer for long-term storage or refrigerator for short-term. Once reconstituted with bacteriostatic water, peptides must be refrigerated (36-46F) and used within 4-6 weeks. Never freeze reconstituted peptides.',
      },
      {
        question: 'What supplies do you need for peptide injections?',
        answer:
          'You need: bacteriostatic water, insulin syringes (29-31 gauge, 0.5-1 mL), alcohol swabs, and the peptide vial. For reconstitution, you also need a larger syringe (1-3 mL) with a mixing needle. All supplies should be sterile and single-use.',
      },
      {
        question: 'When is the best time to take peptides?',
        answer:
          'Timing depends on the peptide. Growth hormone secretagogues (ipamorelin, CJC-1295) are typically taken on an empty stomach before bed to align with natural GH pulses. BPC-157 is often taken twice daily. GLP-1 agonists are typically injected once weekly. Check each peptide profile for specific timing guidance.',
      },
    ],
    relatedPeptides: ['semaglutide', 'tirzepatide', 'bpc-157', 'ipamorelin'],
    relatedStacks: [],
    relatedComparisons: [],
    relatedGoals: [],
    relatedTools: ['dosage-calculator', 'reconstitution-calculator', 'bac-water-calculator'],
  },
  {
    slug: 'peptide-research',
    title: 'Peptide Research & Science: Clinical Trials, Studies & News',
    metaTitle: 'Peptide Research: Clinical Trials, New Studies & Science News (2026)',
    metaDescription:
      'Latest peptide research and clinical trial data. New weight loss peptides in development, FDA updates, phase 2/3 trial results, and evidence summaries.',
    heroDescription:
      'Where peptide science stands right now — clinical trial updates, new compound developments, FDA regulatory news, and evidence-based analysis of emerging research.',
    pillarKey: 'peptide-research',
    faqs: [
      {
        question: 'What new weight loss peptides are in clinical trials?',
        answer:
          'As of 2026, retatrutide (triple agonist, Eli Lilly), survodutide (dual agonist, Boehringer Ingelheim), orforglipron (oral GLP-1, Eli Lilly), and CagriSema (semaglutide + cagrilintide, Novo Nordisk) are all in Phase 2 or Phase 3 trials. Retatrutide showed up to 24.2% body weight loss in Phase 2.',
      },
      {
        question: 'How do you evaluate peptide research quality?',
        answer:
          'Look for: peer-reviewed publication in indexed journals, PubMed listing with PMID, adequate sample size, human (not just animal) data, randomized controlled trial design, and independent funding. Be cautious with pre-prints, conference abstracts, and industry-funded studies without independent replication.',
      },
      {
        question: 'What is the FDA doing about peptides in 2026?',
        answer:
          'The FDA is expected to finalize its reclassification of certain compounded peptides in 2026. This may restrict access to some research peptides like BPC-157 and TB-500 through compounding pharmacies. GLP-1 agonists remain available by prescription. Check our regulatory updates for the latest.',
      },
      {
        question: 'What does research-only status mean?',
        answer:
          'Research-only means a peptide has not completed the FDA approval process for human therapeutic use. It may have animal studies, preliminary human data, or early-phase clinical trials, but it is not an approved medication. Research-only peptides are sold for laboratory research purposes.',
      },
      {
        question: 'Where can I find peptide clinical trial data?',
        answer:
          'ClinicalTrials.gov lists all registered trials. PubMed (pubmed.ncbi.nlm.nih.gov) indexes published study results. Each peptide profile on this site links directly to relevant PubMed studies with PMID numbers for verification.',
      },
    ],
    relatedPeptides: ['retatrutide', 'survodutide', 'orforglipron', 'cagrisema'],
    relatedStacks: [],
    relatedComparisons: [],
    relatedGoals: ['weight-loss'],
    relatedTools: [],
  },
  {
    slug: 'peptide-comparisons',
    title: 'Peptide Comparisons: Head-to-Head Analysis & Decision Guides',
    metaTitle: 'Peptide Comparisons: Side-by-Side Analysis of Popular Peptides (2026)',
    metaDescription:
      'Compare peptides side by side. Semaglutide vs tirzepatide, BPC-157 vs TB-500, and more — efficacy, dosing, cost, side effects, and evidence strength.',
    heroDescription:
      'Side-by-side peptide analysis to help you understand the differences. Every comparison backed by clinical data, real-world reports, and transparent methodology.',
    pillarKey: 'peptide-comparisons',
    faqs: [
      {
        question: 'What is better for weight loss: semaglutide or tirzepatide?',
        answer:
          'Clinical trial data suggests tirzepatide produces greater average weight loss (up to 22.5% in SURMOUNT-1) compared to semaglutide (up to 16.9% in STEP 1). Tirzepatide is a dual GIP/GLP-1 agonist while semaglutide targets GLP-1 only. Individual responses vary. See our detailed semaglutide vs tirzepatide comparison.',
      },
      {
        question: 'How do you compare peptides fairly?',
        answer:
          'We compare peptides across standardized dimensions: mechanism of action, clinical evidence strength, efficacy data, dosing protocols, side effect profiles, cost, FDA status, and real-world community reports. We cite specific studies with PubMed IDs so you can verify every claim.',
      },
      {
        question: 'Is BPC-157 or TB-500 better for injuries?',
        answer:
          'They work differently. BPC-157 promotes local angiogenesis and growth factor expression — better for tendon, ligament, and gut healing. TB-500 acts systemically on inflammation and cell migration — often preferred for muscle injuries and broader inflammation. Many protocols stack both for synergistic effects.',
      },
      {
        question: 'What is the most effective GLP-1 peptide?',
        answer:
          'By weight loss percentage in clinical trials, retatrutide (triple agonist) showed the highest efficacy at 24.2% in Phase 2. Among approved medications, tirzepatide leads at 22.5% (SURMOUNT-1). Semaglutide 2.4 mg showed 16.9% (STEP 1). Effectiveness varies by individual.',
      },
      {
        question: 'Should I compare brand-name or generic peptides?',
        answer:
          'Compare by active compound, not brand name. Ozempic and Wegovy are both semaglutide at different doses. Mounjaro and Zepbound are both tirzepatide. Compounded versions contain the same active peptide but may differ in purity, concentration, and manufacturing quality.',
      },
    ],
    relatedPeptides: ['semaglutide', 'tirzepatide', 'retatrutide', 'bpc-157', 'tb-500'],
    relatedStacks: [],
    relatedComparisons: [
      'semaglutide-vs-tirzepatide',
      'bpc-157-vs-tb-500',
      'ozempic-vs-wegovy',
      'mounjaro-vs-zepbound',
    ],
    relatedGoals: ['weight-loss', 'fat-loss'],
    relatedTools: [],
  },
  {
    slug: 'peptide-safety',
    title: 'Peptide Safety: Side Effects, Risks & Harm Reduction',
    metaTitle: 'Peptide Safety Guide: Side Effects, Risks & How to Minimize Them (2026)',
    metaDescription:
      'Comprehensive peptide safety guide. Side effects, drug interactions, long-term risks, harm reduction strategies, and when to see a doctor.',
    heroDescription:
      'The safety information you actually need — documented side effects, risk factors, drug interactions, and evidence-based harm reduction for every major peptide class.',
    pillarKey: 'peptide-safety',
    faqs: [
      {
        question: 'What are the most common peptide side effects?',
        answer:
          'Side effects vary by peptide class. GLP-1 agonists commonly cause nausea (20-44%), vomiting, diarrhea, and constipation. Growth hormone peptides can cause water retention, joint pain, and numbness. BPC-157 and TB-500 have minimal reported side effects in research. Injection site reactions (redness, swelling) are common across all injectable peptides.',
      },
      {
        question: 'Can peptides cause cancer?',
        answer:
          'Some GLP-1 agonists carry a boxed warning for thyroid C-cell tumors based on rodent studies. Human data has not confirmed this risk — rodent thyroid anatomy differs significantly. Long-term epidemiological studies are ongoing. There is no established cancer link for most peptides, but long-term safety data is limited for research-only compounds.',
      },
      {
        question: 'Are peptides safe long-term?',
        answer:
          'FDA-approved peptides (semaglutide, tirzepatide) have multi-year safety data from clinical trials and post-market surveillance. Research-only peptides (BPC-157, TB-500, etc.) lack long-term human safety data. The honest answer is: we do not have enough data to confirm long-term safety for most research peptides.',
      },
      {
        question: 'Can you drink alcohol while using peptides?',
        answer:
          'Alcohol can worsen GLP-1 side effects (nausea, gastroparesis). It may also reduce peptide effectiveness and increase dehydration risk. Most healthcare providers recommend limiting alcohol consumption, especially during titration phases. See our detailed guide on alcohol and semaglutide.',
      },
      {
        question: 'When should you stop taking peptides and see a doctor?',
        answer:
          'Seek medical attention for: severe or persistent vomiting, signs of pancreatitis (severe abdominal pain radiating to the back), allergic reactions (difficulty breathing, facial swelling), signs of thyroid issues (neck lump, hoarseness, difficulty swallowing), or any symptom that concerns you. Do not self-treat serious side effects.',
      },
    ],
    relatedPeptides: ['semaglutide', 'tirzepatide', 'bpc-157', 'tb-500'],
    relatedStacks: [],
    relatedComparisons: [],
    relatedGoals: [],
    relatedTools: ['dosage-calculator'],
  },
]

export function getPillarConfig(slug: string): PillarConfig | undefined {
  return pillarConfigs.find((p) => p.slug === slug)
}

export function getAllPillarSlugs(): string[] {
  return pillarConfigs.map((p) => p.slug)
}
