'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Breadcrumbs } from '@/components/Breadcrumbs'

const VIAL_PRESETS = [2, 5, 10, 15, 30]
const WATER_PRESETS = [1, 2, 3, 5]

const presets = [
  { label: 'Semaglutide (5mg)', peptideMg: 5, waterMl: 2, doseMcg: 250, frequency: 0.143, slug: 'semaglutide' },
  { label: 'Tirzepatide (10mg)', peptideMg: 10, waterMl: 2, doseMcg: 2500, frequency: 0.143, slug: 'tirzepatide' },
  { label: 'BPC-157 (5mg)', peptideMg: 5, waterMl: 2, doseMcg: 250, frequency: 2, slug: 'bpc-157' },
  { label: 'Ipamorelin (5mg)', peptideMg: 5, waterMl: 2.5, doseMcg: 200, frequency: 1, slug: 'ipamorelin' },
  { label: 'TB-500 (5mg)', peptideMg: 5, waterMl: 2, doseMcg: 2500, frequency: 0.286, slug: 'tb-500' },
  { label: 'CJC-1295 (5mg)', peptideMg: 5, waterMl: 2.5, doseMcg: 100, frequency: 1, slug: 'cjc-1295' },
]

function SyringeVisual({ fillPercent, units, syringeMax }: { fillPercent: number; units: number; syringeMax: number }) {
  const clampedFill = Math.min(Math.max(fillPercent, 0), 100)
  const barHeight = 160
  const fillHeight = (clampedFill / 100) * barHeight

  return (
    <div className="flex flex-col items-center gap-2">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">Draw to here</p>
      <svg width="72" height="220" viewBox="0 0 72 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Plunger rod */}
        <rect x="32" y="0" width="8" height={30 + (barHeight - fillHeight)} rx="2" fill="#D4C5A9" />
        {/* Plunger top */}
        <rect x="24" y="0" width="24" height="8" rx="3" fill="#B8944E" />
        {/* Barrel */}
        <rect x="20" y="30" width="32" height={barHeight + 4} rx="4" fill="#F8F5F0" stroke="#D4C5A9" strokeWidth="1.5" />
        {/* Fill level */}
        {clampedFill > 0 && (
          <rect
            x="21.5"
            y={31.5 + (barHeight - fillHeight)}
            width="29"
            height={fillHeight}
            rx="2"
            fill="#C8E8E4"
            className="transition-all duration-300"
          />
        )}
        {/* Tick marks */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => (
          <g key={i}>
            <line
              x1="52"
              y1={31.5 + barHeight * (1 - pct)}
              x2={pct === 0.5 ? "62" : "58"}
              y2={31.5 + barHeight * (1 - pct)}
              stroke="#6B8585"
              strokeWidth={pct === 0 || pct === 0.5 || pct === 1 ? 1.5 : 1}
            />
            {(pct === 0 || pct === 0.5 || pct === 1) && (
              <text
                x="64"
                y={35 + barHeight * (1 - pct)}
                fontSize="9"
                fill="#6B8585"
                fontFamily="sans-serif"
              >
                {Math.round(syringeMax * pct)}
              </text>
            )}
          </g>
        ))}
        {/* Fill line indicator */}
        {clampedFill > 0 && clampedFill < 100 && (
          <line
            x1="18"
            y1={31.5 + (barHeight - fillHeight)}
            x2="54"
            y2={31.5 + (barHeight - fillHeight)}
            stroke="#2A7A72"
            strokeWidth="2"
            strokeDasharray="3 2"
            className="transition-all duration-300"
          />
        )}
        {/* Needle hub */}
        <rect x="28" y={barHeight + 34} width="16" height="10" rx="2" fill="#D4C5A9" />
        {/* Needle */}
        <line x1="36" y1={barHeight + 44} x2="36" y2={barHeight + 64} stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <p className="text-center text-lg font-bold text-accent">{units} units</p>
      <p className="text-center text-xs text-muted">on {syringeMax}-unit syringe</p>
    </div>
  )
}

export default function ReconstitutionCalculatorPage() {
  const [peptideMg, setPeptideMg] = useState('5')
  const [waterMl, setWaterMl] = useState('2')
  const [doseValue, setDoseValue] = useState('250')
  const [doseUnit, setDoseUnit] = useState<'mcg' | 'mg'>('mcg')
  const [dosesPerDay, setDosesPerDay] = useState('1')
  const [syringeSize, setSyringeSize] = useState<'100' | '50' | '30'>('100')
  const [activePreset, setActivePreset] = useState<number | null>(null)

  const result = useMemo(() => {
    const peptide = parseFloat(peptideMg)
    const water = parseFloat(waterMl)
    const rawDose = parseFloat(doseValue)
    const freq = parseFloat(dosesPerDay)
    const syringe = parseInt(syringeSize)

    if (isNaN(peptide) || isNaN(water) || isNaN(rawDose) || isNaN(freq) || water <= 0 || rawDose <= 0 || peptide <= 0) {
      return null
    }

    const doseMcg = doseUnit === 'mg' ? rawDose * 1000 : rawDose
    const peptideMcg = peptide * 1000
    const concMcgPerMl = peptideMcg / water
    const concMgPerMl = peptide / water
    const volumePerDoseMl = doseMcg / concMcgPerMl
    const tickMarks = volumePerDoseMl * syringe
    const totalDoses = Math.floor(peptideMcg / doseMcg)
    const dailyDoses = freq > 0 ? freq : 1
    const daysSupply = Math.floor(totalDoses / dailyDoses)
    const fillPercent = (volumePerDoseMl / (syringe === 100 ? 1 : syringe === 50 ? 0.5 : 0.3)) * 100

    return {
      concentrationMcgPerMl: concMcgPerMl,
      concentrationMgPerMl: concMgPerMl,
      volumePerDoseMl,
      tickMarks: Math.round(tickMarks * 10) / 10,
      totalDoses,
      daysSupply,
      fillPercent,
      syringeMax: syringe,
    }
  }, [peptideMg, waterMl, doseValue, doseUnit, dosesPerDay, syringeSize])

  function applyPreset(index: number) {
    const p = presets[index]
    setPeptideMg(String(p.peptideMg))
    setWaterMl(String(p.waterMl))
    setDoseValue(String(p.doseMcg))
    setDoseUnit('mcg')
    setDosesPerDay(String(p.frequency))
    setActivePreset(index)
    // Scroll to results after a brief delay for state to update
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: 'Tools', href: '/tools' },
          { name: 'Reconstitution Calculator', href: '/tools/reconstitution-calculator' },
        ]}
      />

      <h1 className="text-3xl font-light text-foreground">Peptide Reconstitution Calculator</h1>
      <p className="mt-3 text-muted">
        Calculate the exact concentration after reconstituting your peptide vial with bacteriostatic water.
        See how much to draw and how long the vial will last.
      </p>

      {/* Quick presets */}
      <div className="mt-6">
        <p className="text-sm font-medium text-foreground">Common protocols <span className="font-normal text-muted">(click to auto-fill)</span></p>
        <div className="mt-2 flex flex-wrap gap-2">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => applyPreset(i)}
              className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                activePreset === i
                  ? 'border-accent bg-accent text-white shadow-sm'
                  : 'border-border bg-card text-muted shadow-sm hover:border-accent hover:bg-accent/5 hover:text-accent'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Vial size */}
          <div>
            <label className="block text-sm font-medium text-foreground">Peptide in vial (mg)</label>
            <div className="mt-1.5 flex gap-2">
              <input
                type="number"
                value={peptideMg}
                onChange={(e) => { setPeptideMg(e.target.value); setActivePreset(null) }}
                min="0"
                step="0.5"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {VIAL_PRESETS.map((v) => (
                <button
                  key={v}
                  onClick={() => setPeptideMg(String(v))}
                  className={`rounded-md px-2 py-0.5 text-xs transition-colors ${
                    peptideMg === String(v)
                      ? 'bg-accent/10 text-accent'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {v}mg
                </button>
              ))}
            </div>
          </div>

          {/* BAC water */}
          <div>
            <label className="block text-sm font-medium text-foreground">Bacteriostatic water (mL)</label>
            <div className="mt-1.5 flex gap-2">
              <input
                type="number"
                value={waterMl}
                onChange={(e) => { setWaterMl(e.target.value); setActivePreset(null) }}
                min="0"
                step="0.5"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {WATER_PRESETS.map((w) => (
                <button
                  key={w}
                  onClick={() => setWaterMl(String(w))}
                  className={`rounded-md px-2 py-0.5 text-xs transition-colors ${
                    waterMl === String(w)
                      ? 'bg-accent/10 text-accent'
                      : 'text-muted hover:text-foreground'
                  }`}
                >
                  {w}mL
                </button>
              ))}
            </div>
          </div>

          {/* Desired dose with unit toggle */}
          <div>
            <label className="block text-sm font-medium text-foreground">Desired dose</label>
            <div className="mt-1.5 flex gap-2">
              <input
                type="number"
                value={doseValue}
                onChange={(e) => { setDoseValue(e.target.value); setActivePreset(null) }}
                min="0"
                step={doseUnit === 'mg' ? '0.01' : '10'}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <div className="flex overflow-hidden rounded-lg border border-border">
                <button
                  onClick={() => {
                    if (doseUnit === 'mg') {
                      const val = parseFloat(doseValue)
                      if (!isNaN(val)) setDoseValue(String(val * 1000))
                    }
                    setDoseUnit('mcg')
                  }}
                  className={`px-3 py-2 text-xs font-medium transition-colors ${
                    doseUnit === 'mcg' ? 'bg-accent text-white' : 'bg-background text-muted hover:text-foreground'
                  }`}
                >
                  mcg
                </button>
                <button
                  onClick={() => {
                    if (doseUnit === 'mcg') {
                      const val = parseFloat(doseValue)
                      if (!isNaN(val)) setDoseValue(String(val / 1000))
                    }
                    setDoseUnit('mg')
                  }}
                  className={`px-3 py-2 text-xs font-medium transition-colors ${
                    doseUnit === 'mg' ? 'bg-accent text-white' : 'bg-background text-muted hover:text-foreground'
                  }`}
                >
                  mg
                </button>
              </div>
            </div>
          </div>

          {/* Doses per day */}
          <div>
            <label className="block text-sm font-medium text-foreground">Doses per day</label>
            <input
              type="number"
              value={dosesPerDay}
              onChange={(e) => { setDosesPerDay(e.target.value); setActivePreset(null) }}
              min="0.01"
              step="0.1"
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <p className="mt-1 text-xs text-muted">Use 0.143 for once/week, 0.286 for twice/week</p>
          </div>

          {/* Syringe size */}
          <div className="sm:col-span-2">
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
      </div>

      {/* Results */}
      {result && (
        <div id="results" className="mt-6 rounded-xl border border-accent/20 bg-soft-sky/30 p-6">
          <h2 className="text-lg text-foreground">Your results</h2>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row">
            {/* Syringe visual */}
            <div className="flex justify-center sm:justify-start">
              <SyringeVisual
                fillPercent={result.fillPercent}
                units={result.tickMarks}
                syringeMax={result.syringeMax}
              />
            </div>

            {/* Numbers */}
            <div className="grid flex-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Concentration</p>
                <p className="mt-1 text-xl font-bold text-foreground">
                  {result.concentrationMcgPerMl.toLocaleString(undefined, { maximumFractionDigits: 0 })} mcg/mL
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
                <p className="text-xs uppercase tracking-wider text-muted">Syringe units to draw</p>
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
        </div>
      )}

      {/* Common protocols table */}
      <div className="mt-10 prose-custom">
        <h2>Common reconstitution protocols</h2>
        <table>
          <thead>
            <tr>
              <th>Peptide</th>
              <th>Vial</th>
              <th>BAC Water</th>
              <th>Typical Dose</th>
              <th>Volume</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Semaglutide', slug: 'semaglutide', vial: '5 mg', water: '2 mL', dose: '250 mcg', volume: '0.1 mL (10 units)', presetIndex: 0 },
              { name: 'Tirzepatide', slug: 'tirzepatide', vial: '10 mg', water: '2 mL', dose: '2.5 mg', volume: '0.5 mL (50 units)', presetIndex: 1 },
              { name: 'BPC-157', slug: 'bpc-157', vial: '5 mg', water: '2 mL', dose: '250 mcg', volume: '0.1 mL (10 units)', presetIndex: 2 },
              { name: 'Ipamorelin', slug: 'ipamorelin', vial: '5 mg', water: '2.5 mL', dose: '200 mcg', volume: '0.1 mL (10 units)', presetIndex: 3 },
              { name: 'TB-500', slug: 'tb-500', vial: '5 mg', water: '2 mL', dose: '2.5 mg', volume: '1.0 mL (100 units)', presetIndex: 4 },
              { name: 'CJC-1295', slug: 'cjc-1295', vial: '5 mg', water: '2.5 mL', dose: '100 mcg', volume: '0.05 mL (5 units)', presetIndex: 5 },
            ].map((row) => (
              <tr key={row.slug}>
                <td><Link href={`/peptides/${row.slug}`} className="text-accent hover:text-accent-hover">{row.name}</Link></td>
                <td>{row.vial}</td>
                <td>{row.water}</td>
                <td>{row.dose}</td>
                <td>{row.volume}</td>
                <td>
                  <button
                    onClick={() => applyPreset(row.presetIndex)}
                    className="whitespace-nowrap rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent hover:text-white"
                  >
                    Calculate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
