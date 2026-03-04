'use client'

import { useState } from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { CalculatorEmailGate } from '@/components/CalculatorEmailGate'

interface CalcResult {
  concentration: number
  doseVolume: number
  tickMarks: number
  totalDoses: number
}

export default function DosageCalculatorPage() {
  const [peptideAmount, setPeptideAmount] = useState<string>('5')
  const [peptideUnit, setPeptideUnit] = useState<'mg' | 'mcg'>('mg')
  const [bacWater, setBacWater] = useState<string>('2')
  const [desiredDose, setDesiredDose] = useState<string>('250')
  const [doseUnit, setDoseUnit] = useState<'mcg' | 'mg'>('mcg')
  const [syringeSize, setSyringeSize] = useState<'100' | '50' | '30'>('100')
  const [result, setResult] = useState<CalcResult | null>(null)

  function calculate() {
    const peptideMcg = peptideUnit === 'mg' ? parseFloat(peptideAmount) * 1000 : parseFloat(peptideAmount)
    const waterMl = parseFloat(bacWater)
    const doseMcg = doseUnit === 'mg' ? parseFloat(desiredDose) * 1000 : parseFloat(desiredDose)
    const syringeUnits = parseInt(syringeSize)

    if (isNaN(peptideMcg) || isNaN(waterMl) || isNaN(doseMcg) || waterMl === 0) return

    const concentrationMcgPerMl = peptideMcg / waterMl
    const doseVolumeMl = doseMcg / concentrationMcgPerMl
    const tickMarks = doseVolumeMl * syringeUnits
    const totalDoses = peptideMcg / doseMcg

    setResult({
      concentration: concentrationMcgPerMl,
      doseVolume: doseVolumeMl,
      tickMarks: Math.round(tickMarks * 10) / 10,
      totalDoses: Math.floor(totalDoses),
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: 'Tools', href: '/tools/dosage-calculator' },
          { name: 'Dosage Calculator', href: '/tools/dosage-calculator' },
        ]}
      />

      <h1 className="text-3xl font-light text-foreground">Peptide Dosage Calculator</h1>
      <p className="mt-3 text-muted">
        Calculate how much reconstituted peptide to draw for your desired dose. Enter your vial size, bacteriostatic
        water volume, and target dose.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* Peptide amount */}
          <div>
            <label className="block text-sm font-medium text-foreground">Peptide in vial</label>
            <div className="mt-1.5 flex gap-2">
              <input
                type="number"
                value={peptideAmount}
                onChange={(e) => setPeptideAmount(e.target.value)}
                min="0"
                step="0.1"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <select
                value={peptideUnit}
                onChange={(e) => setPeptideUnit(e.target.value as 'mg' | 'mcg')}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
              >
                <option value="mg">mg</option>
                <option value="mcg">mcg</option>
              </select>
            </div>
          </div>

          {/* Bacteriostatic water */}
          <div>
            <label className="block text-sm font-medium text-foreground">Bacteriostatic water added</label>
            <div className="mt-1.5 flex gap-2">
              <input
                type="number"
                value={bacWater}
                onChange={(e) => setBacWater(e.target.value)}
                min="0"
                step="0.1"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <span className="flex items-center rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted">
                mL
              </span>
            </div>
          </div>

          {/* Desired dose */}
          <div>
            <label className="block text-sm font-medium text-foreground">Desired dose per injection</label>
            <div className="mt-1.5 flex gap-2">
              <input
                type="number"
                value={desiredDose}
                onChange={(e) => setDesiredDose(e.target.value)}
                min="0"
                step="1"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <select
                value={doseUnit}
                onChange={(e) => setDoseUnit(e.target.value as 'mcg' | 'mg')}
                className="rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
              >
                <option value="mcg">mcg</option>
                <option value="mg">mg</option>
              </select>
            </div>
          </div>

          {/* Syringe size */}
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

      {/* Results */}
      {result && (
        <div className="mt-6 rounded-xl border border-accent/20 bg-soft-sky/30 p-6">
          <h2 className="text-lg text-foreground">Your dosage</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted uppercase tracking-wider">Concentration</p>
              <p className="mt-1 text-xl font-bold text-foreground">
                {result.concentration.toFixed(1)} mcg/mL
              </p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider">Volume to inject</p>
              <p className="mt-1 text-xl font-bold text-accent">
                {result.doseVolume.toFixed(3)} mL
              </p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider">Syringe units (tick marks)</p>
              <p className="mt-1 text-xl font-bold text-foreground">{result.tickMarks} units</p>
            </div>
            <div>
              <p className="text-xs text-muted uppercase tracking-wider">Total doses per vial</p>
              <p className="mt-1 text-xl font-bold text-foreground">{result.totalDoses} doses</p>
            </div>
          </div>
          <CalculatorEmailGate />
        </div>
      )}

      {/* How to use */}
      <div className="mt-10 prose-custom">
        <h2>How to use this calculator</h2>
        <p>
          <strong>Step 1:</strong> Enter the total amount of peptide in your vial (usually printed on the label, e.g., 5mg).
        </p>
        <p>
          <strong>Step 2:</strong> Enter how much bacteriostatic water you added to reconstitute (a common amount is 2mL).
        </p>
        <p>
          <strong>Step 3:</strong> Enter your desired dose per injection (e.g., 250mcg for BPC-157 or 0.25mg for semaglutide).
        </p>
        <p>
          <strong>Step 4:</strong> Select your syringe size. Most insulin syringes are 1mL / 100 unit.
        </p>
        <p>
          The calculator will tell you exactly how many units (tick marks) to draw on your syringe, the volume in mL,
          and how many total doses you will get from the vial.
        </p>

        <h2>Common reconstitution amounts</h2>
        <ul>
          <li><strong>BPC-157 (5mg vial):</strong> Add 2mL bac water. 250mcg dose = 10 units on a 100-unit syringe.</li>
          <li><strong>Semaglutide (5mg vial):</strong> Add 2mL bac water. 0.25mg dose = 10 units on a 100-unit syringe.</li>
          <li><strong>Ipamorelin (5mg vial):</strong> Add 2.5mL bac water. 200mcg dose = 10 units on a 100-unit syringe.</li>
          <li><strong>TB-500 (5mg vial):</strong> Add 2mL bac water. 2.5mg dose = 100 units (full syringe).</li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 rounded-xl border border-warm-sand bg-[#FEF9EC] p-5">
        <p className="text-xs text-[#6B5A40]">
          <span className="font-medium">Disclaimer:</span> This calculator is for educational reference only. Always
          verify your calculations and consult with a healthcare provider for proper dosing. Errors in peptide
          reconstitution can lead to incorrect dosing.
        </p>
      </div>
    </div>
  )
}
