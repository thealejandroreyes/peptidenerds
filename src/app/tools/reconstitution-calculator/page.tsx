'use client'

import { useState } from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs'

interface ReconResult {
  concentrationMcgPerMl: number
  concentrationMgPerMl: number
  volumePerDoseMl: number
  tickMarks: number
  totalDoses: number
  daysSupply: number
}

const presets = [
  { label: 'BPC-157 (5mg)', peptideMg: 5, waterMl: 2, doseMcg: 250, frequency: 2 },
  { label: 'Semaglutide (5mg)', peptideMg: 5, waterMl: 2, doseMcg: 250, frequency: 0.143 },
  { label: 'Ipamorelin (5mg)', peptideMg: 5, waterMl: 2.5, doseMcg: 200, frequency: 1 },
  { label: 'TB-500 (5mg)', peptideMg: 5, waterMl: 2, doseMcg: 2500, frequency: 0.286 },
  { label: 'CJC-1295 (5mg)', peptideMg: 5, waterMl: 2.5, doseMcg: 100, frequency: 1 },
  { label: 'GHK-Cu (5mg)', peptideMg: 5, waterMl: 2, doseMcg: 200, frequency: 1 },
]

export default function ReconstitutionCalculatorPage() {
  const [peptideMg, setPeptideMg] = useState<string>('5')
  const [waterMl, setWaterMl] = useState<string>('2')
  const [desiredDoseMcg, setDesiredDoseMcg] = useState<string>('250')
  const [dosesPerDay, setDosesPerDay] = useState<string>('1')
  const [syringeSize, setSyringeSize] = useState<'100' | '50' | '30'>('100')
  const [result, setResult] = useState<ReconResult | null>(null)

  function applyPreset(index: number) {
    const p = presets[index]
    setPeptideMg(String(p.peptideMg))
    setWaterMl(String(p.waterMl))
    setDesiredDoseMcg(String(p.doseMcg))
    setDosesPerDay(String(p.frequency))
    setResult(null)
  }

  function calculate() {
    const peptide = parseFloat(peptideMg)
    const water = parseFloat(waterMl)
    const dose = parseFloat(desiredDoseMcg)
    const freq = parseFloat(dosesPerDay)
    const syringe = parseInt(syringeSize)

    if (isNaN(peptide) || isNaN(water) || isNaN(dose) || isNaN(freq) || water === 0 || dose === 0) return

    const peptideMcg = peptide * 1000
    const concMcgPerMl = peptideMcg / water
    const concMgPerMl = peptide / water
    const volumePerDoseMl = dose / concMcgPerMl
    const tickMarks = volumePerDoseMl * syringe
    const totalDoses = Math.floor(peptideMcg / dose)
    const dailyDoses = freq > 0 ? freq : 1
    const daysSupply = Math.floor(totalDoses / dailyDoses)

    setResult({
      concentrationMcgPerMl: concMcgPerMl,
      concentrationMgPerMl: concMgPerMl,
      volumePerDoseMl,
      tickMarks: Math.round(tickMarks * 10) / 10,
      totalDoses,
      daysSupply,
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: 'Tools', href: '/tools/dosage-calculator' },
          { name: 'Reconstitution Calculator', href: '/tools/reconstitution-calculator' },
        ]}
      />

      <h1 className="text-3xl font-light text-foreground">Peptide Reconstitution Calculator</h1>
      <p className="mt-3 text-muted">
        Calculate the exact concentration after reconstituting your peptide vial with bacteriostatic water.
        See how many doses you will get and how long the vial will last.
      </p>

      {/* Quick presets */}
      <div className="mt-6">
        <p className="text-sm font-medium text-foreground">Quick presets</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => applyPreset(i)}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-foreground">Peptide in vial (mg)</label>
            <input
              type="number"
              value={peptideMg}
              onChange={(e) => setPeptideMg(e.target.value)}
              min="0"
              step="0.5"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Bacteriostatic water (mL)</label>
            <input
              type="number"
              value={waterMl}
              onChange={(e) => setWaterMl(e.target.value)}
              min="0"
              step="0.5"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Desired dose (mcg)</label>
            <input
              type="number"
              value={desiredDoseMcg}
              onChange={(e) => setDesiredDoseMcg(e.target.value)}
              min="0"
              step="10"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Doses per day</label>
            <input
              type="number"
              value={dosesPerDay}
              onChange={(e) => setDosesPerDay(e.target.value)}
              min="0.01"
              step="0.1"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <p className="mt-1 text-xs text-muted">Use 0.143 for once/week, 0.286 for twice/week</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Syringe size</label>
            <select
              value={syringeSize}
              onChange={(e) => setSyringeSize(e.target.value as '100' | '50' | '30')}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
            >
              <option value="100">1 mL (100 unit / U-100)</option>
              <option value="50">0.5 mL (50 unit / U-50)</option>
              <option value="30">0.3 mL (30 unit / U-30)</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculate}
          className="mt-6 w-full rounded-full bg-cta px-6 py-3 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="mt-6 rounded-xl border border-accent/20 bg-soft-sky/30 p-6">
          <h2 className="text-lg text-foreground">Reconstitution results</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Concentration</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {result.concentrationMcgPerMl.toFixed(0)} mcg/mL
              </p>
              <p className="text-sm text-muted">({result.concentrationMgPerMl.toFixed(2)} mg/mL)</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Volume per dose</p>
              <p className="mt-1 text-xl font-bold text-accent">
                {result.volumePerDoseMl.toFixed(3)} mL
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Syringe units (tick marks)</p>
              <p className="mt-1 text-xl font-bold text-foreground">{result.tickMarks} units</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Total doses per vial</p>
              <p className="mt-1 text-xl font-bold text-foreground">{result.totalDoses} doses</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-wider text-muted">Days supply</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {result.daysSupply} days
              </p>
              <p className="text-sm text-muted">
                ({Math.floor(result.daysSupply / 7)} weeks, {result.daysSupply % 7} days)
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 prose-custom">
        <h2>How peptide reconstitution works</h2>
        <p>
          Peptides come as a lyophilized (freeze-dried) powder in a vial. Before you can inject them, you need to
          add bacteriostatic water (BAC water) to dissolve the powder. This process is called reconstitution.
        </p>
        <p>
          <strong>The amount of water you add determines the concentration.</strong> More water = weaker solution = more
          volume per dose. Less water = stronger solution = less volume per dose. The total amount of peptide stays the same.
        </p>

        <h2>Step-by-step reconstitution guide</h2>
        <ol>
          <li>Clean the tops of both vials (peptide and BAC water) with alcohol swabs.</li>
          <li>Draw the desired amount of BAC water into a syringe.</li>
          <li>Insert the needle into the peptide vial at an angle. Let the water run down the side of the vial — do not squirt it directly onto the powder.</li>
          <li>Gently swirl the vial until the powder fully dissolves. Do not shake.</li>
          <li>Store reconstituted peptide in the refrigerator. Use within 30 days.</li>
        </ol>

        <h2>Common reconstitution ratios</h2>
        <table>
          <thead>
            <tr>
              <th>Peptide</th>
              <th>Vial</th>
              <th>BAC Water</th>
              <th>Concentration</th>
              <th>Typical Dose</th>
              <th>Volume</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>BPC-157</td>
              <td>5 mg</td>
              <td>2 mL</td>
              <td>2,500 mcg/mL</td>
              <td>250 mcg</td>
              <td>0.1 mL (10 units)</td>
            </tr>
            <tr>
              <td>Semaglutide</td>
              <td>5 mg</td>
              <td>2 mL</td>
              <td>2,500 mcg/mL</td>
              <td>250 mcg (0.25mg)</td>
              <td>0.1 mL (10 units)</td>
            </tr>
            <tr>
              <td>Ipamorelin</td>
              <td>5 mg</td>
              <td>2.5 mL</td>
              <td>2,000 mcg/mL</td>
              <td>200 mcg</td>
              <td>0.1 mL (10 units)</td>
            </tr>
            <tr>
              <td>TB-500</td>
              <td>5 mg</td>
              <td>2 mL</td>
              <td>2,500 mcg/mL</td>
              <td>2,500 mcg (2.5mg)</td>
              <td>1.0 mL (100 units)</td>
            </tr>
            <tr>
              <td>CJC-1295</td>
              <td>5 mg</td>
              <td>2.5 mL</td>
              <td>2,000 mcg/mL</td>
              <td>100 mcg</td>
              <td>0.05 mL (5 units)</td>
            </tr>
            <tr>
              <td>GHK-Cu</td>
              <td>5 mg</td>
              <td>2 mL</td>
              <td>2,500 mcg/mL</td>
              <td>200 mcg</td>
              <td>0.08 mL (8 units)</td>
            </tr>
          </tbody>
        </table>

        <h2>Tips for accurate reconstitution</h2>
        <ul>
          <li><strong>Use insulin syringes</strong> for drawing doses. They are more precise than standard syringes for small volumes.</li>
          <li><strong>Never shake the vial.</strong> Peptides are fragile proteins. Shaking can damage them. Swirl gently.</li>
          <li><strong>Refrigerate after reconstitution.</strong> Most reconstituted peptides are stable for 30 days refrigerated.</li>
          <li><strong>Use bacteriostatic water, not sterile water.</strong> BAC water contains 0.9% benzyl alcohol as a preservative, allowing multi-dose use.</li>
          <li><strong>Double-check your math.</strong> Or use this calculator. Dosing errors are the most common mistake beginners make.</li>
        </ul>

        <h2>FAQ</h2>

        <h3>What is bacteriostatic water?</h3>
        <p>
          Bacteriostatic water is sterile water with 0.9% benzyl alcohol added as a preservative. The benzyl alcohol
          prevents bacterial growth, making it safe for multi-dose use over 28-30 days. It is the standard diluent
          for reconstituting peptides.
        </p>

        <h3>How long does reconstituted peptide last?</h3>
        <p>
          Most reconstituted peptides remain stable for 28-30 days when stored in the refrigerator at 2-8 degrees
          Celsius (36-46 degrees Fahrenheit). Some peptides like BPC-157 are more stable than others. When in doubt,
          reconstitute a fresh vial after 30 days.
        </p>

        <h3>Can I use more or less water than recommended?</h3>
        <p>
          Yes. The amount of water only changes the concentration, not the total peptide. Using less water means
          a smaller injection volume per dose. Using more water means a larger volume but can be easier to measure
          accurately. Common ranges are 1-3 mL per vial.
        </p>

        <h3>What if the powder does not dissolve?</h3>
        <p>
          Let the BAC water sit on the powder for a few minutes, then gently swirl. Some peptides take longer to
          dissolve. If particles remain after 10 minutes of gentle swirling, the peptide may have been damaged during
          shipping or storage. Do not inject solutions with visible particles.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-warm-sand bg-[#FEF9EC] p-5">
        <p className="text-xs text-[#6B5A40]">
          <span className="font-medium">Disclaimer:</span> This calculator and information are for educational
          reference only. Always verify your calculations and consult with a healthcare provider before using any
          peptide. Errors in reconstitution can lead to incorrect dosing. See our{' '}
          <a href="/disclaimer" className="underline">full medical disclaimer</a>.
        </p>
      </div>
    </div>
  )
}
