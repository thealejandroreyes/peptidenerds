'use client'

import { useState } from 'react'
import { Breadcrumbs } from '@/components/Breadcrumbs'

interface BacResult {
  totalWaterMl: number
  vialsNeeded: number
  leftoverMl: number
  costEstimate: string
}

interface VialEntry {
  id: number
  peptideName: string
  waterMl: string
}

export default function BacWaterCalculatorPage() {
  const [vials, setVials] = useState<VialEntry[]>([
    { id: 1, peptideName: 'BPC-157', waterMl: '2' },
  ])
  const [bacWaterSize, setBacWaterSize] = useState<'10' | '20' | '30'>('30')
  const [result, setResult] = useState<BacResult | null>(null)

  function addVial() {
    setVials([...vials, { id: Date.now(), peptideName: '', waterMl: '2' }])
  }

  function removeVial(id: number) {
    if (vials.length > 1) {
      setVials(vials.filter((v) => v.id !== id))
    }
  }

  function updateVial(id: number, field: 'peptideName' | 'waterMl', value: string) {
    setVials(vials.map((v) => (v.id === id ? { ...v, [field]: value } : v)))
  }

  function calculate() {
    const totalWater = vials.reduce((sum, v) => sum + (parseFloat(v.waterMl) || 0), 0)
    const bacSize = parseInt(bacWaterSize)
    const vialsNeeded = Math.ceil(totalWater / bacSize)
    const leftover = vialsNeeded * bacSize - totalWater

    setResult({
      totalWaterMl: totalWater,
      vialsNeeded,
      leftoverMl: Math.round(leftover * 10) / 10,
      costEstimate: `$${(vialsNeeded * 3.5).toFixed(2)} - $${(vialsNeeded * 8).toFixed(2)}`,
    })
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: 'Tools', href: '/tools/dosage-calculator' },
          { name: 'BAC Water Calculator', href: '/tools/bac-water-calculator' },
        ]}
      />

      <h1 className="text-3xl font-light text-foreground">Bacteriostatic Water Calculator</h1>
      <p className="mt-3 text-muted">
        Calculate how much bacteriostatic water you need for your peptide protocol. Add all your peptide
        vials and find out how many BAC water bottles to order.
      </p>

      <div className="mt-8 rounded-xl border border-border bg-card p-6">
        <p className="text-sm font-medium text-foreground">Your peptide vials</p>

        <div className="mt-4 space-y-3">
          {vials.map((vial) => (
            <div key={vial.id} className="flex items-end gap-3">
              <div className="flex-1">
                <label className="block text-xs text-muted">Peptide name (optional)</label>
                <input
                  type="text"
                  value={vial.peptideName}
                  onChange={(e) => updateVial(vial.id, 'peptideName', e.target.value)}
                  placeholder="e.g. BPC-157"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div className="w-28">
                <label className="block text-xs text-muted">Water (mL)</label>
                <input
                  type="number"
                  value={vial.waterMl}
                  onChange={(e) => updateVial(vial.id, 'waterMl', e.target.value)}
                  min="0.5"
                  step="0.5"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              {vials.length > 1 && (
                <button
                  onClick={() => removeVial(vial.id)}
                  className="rounded-lg border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-red-300 hover:text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addVial}
          className="mt-3 text-sm text-accent transition-colors hover:text-accent-hover"
        >
          + Add another vial
        </button>

        <div className="mt-6 border-t border-border pt-6">
          <label className="block text-sm font-medium text-foreground">BAC water bottle size</label>
          <select
            value={bacWaterSize}
            onChange={(e) => setBacWaterSize(e.target.value as '10' | '20' | '30')}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
          >
            <option value="10">10 mL</option>
            <option value="20">20 mL</option>
            <option value="30">30 mL (most common)</option>
          </select>
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
          <h2 className="text-lg text-foreground">What you need</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Total BAC water needed</p>
              <p className="mt-1 text-xl font-bold text-foreground">{result.totalWaterMl.toFixed(1)} mL</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Bottles to buy ({bacWaterSize} mL)</p>
              <p className="mt-1 text-xl font-bold text-accent">{result.vialsNeeded}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Leftover water</p>
              <p className="mt-1 text-xl font-bold text-foreground">{result.leftoverMl} mL</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Estimated cost</p>
              <p className="mt-1 text-xl font-bold text-foreground">{result.costEstimate}</p>
            </div>
          </div>

          {vials.length > 1 && (
            <div className="mt-4 border-t border-accent/10 pt-4">
              <p className="text-xs uppercase tracking-wider text-muted">Breakdown by vial</p>
              <div className="mt-2 space-y-1">
                {vials.map((v) => (
                  <p key={v.id} className="text-sm text-foreground">
                    {v.peptideName || 'Unnamed vial'}: {v.waterMl} mL
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-10 prose-custom">
        <h2>What is bacteriostatic water?</h2>
        <p>
          Bacteriostatic water (BAC water) is sterile water that contains 0.9% benzyl alcohol as a preservative.
          The benzyl alcohol prevents bacteria from growing in the water, making it safe to use multiple times
          from the same vial over 28-30 days.
        </p>
        <p>
          It is the standard diluent for reconstituting lyophilized (freeze-dried) peptides.
          Do not confuse it with sterile water for injection, which contains no preservative and must be
          used immediately after opening.
        </p>

        <h2>BAC water vs sterile water</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>BAC Water</th>
              <th>Sterile Water</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Preservative</td>
              <td>0.9% benzyl alcohol</td>
              <td>None</td>
            </tr>
            <tr>
              <td>Multi-dose use</td>
              <td>Yes (28-30 days)</td>
              <td>No (single use)</td>
            </tr>
            <tr>
              <td>Best for</td>
              <td>Peptides you dose multiple times</td>
              <td>Single-use reconstitution</td>
            </tr>
            <tr>
              <td>Storage after opening</td>
              <td>Room temperature, up to 28 days</td>
              <td>Discard unused portion</td>
            </tr>
            <tr>
              <td>Cost</td>
              <td>$3-8 per 30 mL vial</td>
              <td>$2-5 per vial</td>
            </tr>
          </tbody>
        </table>

        <h2>How much BAC water per vial?</h2>
        <p>
          There is no single right answer. Common amounts are 1-3 mL per peptide vial. The amount only changes
          the concentration — not the total peptide. Here are the trade-offs:
        </p>
        <ul>
          <li><strong>Less water (1 mL):</strong> Stronger concentration, smaller injection volume. Harder to measure precisely.</li>
          <li><strong>Standard (2 mL):</strong> Good balance of concentration and measurability. Most common choice.</li>
          <li><strong>More water (3 mL):</strong> Weaker concentration, larger injection volume. Easier to measure small doses.</li>
        </ul>

        <h2>Storage and shelf life</h2>
        <ul>
          <li><strong>Unopened BAC water:</strong> Store at room temperature. Check expiration date on vial.</li>
          <li><strong>Opened BAC water:</strong> Use within 28 days. Store at room temperature away from direct light.</li>
          <li><strong>Reconstituted peptide:</strong> Refrigerate at 2-8 degrees C. Use within 28-30 days.</li>
        </ul>

        <h2>FAQ</h2>

        <h3>How many peptide vials can I reconstitute with one 30 mL BAC water bottle?</h3>
        <p>
          If you use 2 mL per peptide vial (the most common amount), a single 30 mL bottle of BAC water will
          reconstitute 15 peptide vials. Most people running 1-2 peptides need only one bottle per month.
        </p>

        <h3>Can I reuse BAC water after opening?</h3>
        <p>
          Yes. The benzyl alcohol preservative allows multi-dose use for up to 28 days after first puncture.
          Always use a new sterile needle each time you draw from the vial.
        </p>

        <h3>Where do I buy bacteriostatic water?</h3>
        <p>
          BAC water is available over the counter from most pharmacies, medical supply stores, and online
          retailers. It does not require a prescription. Typical cost is $3-8 per 30 mL vial.
        </p>

        <h3>Can I use saline instead of BAC water?</h3>
        <p>
          Bacteriostatic saline (0.9% NaCl with benzyl alcohol preservative) can be used for some peptides.
          However, plain normal saline without a preservative should not be used for multi-dose vials. When
          in doubt, use bacteriostatic water — it is the standard for peptide reconstitution.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-warm-sand bg-[#FEF9EC] p-5">
        <p className="text-xs text-[#6B5A40]">
          <span className="font-medium">Disclaimer:</span> This calculator is for educational reference only.
          Always consult with a healthcare provider before using any peptide. See our{' '}
          <a href="/disclaimer" className="underline">full medical disclaimer</a>.
        </p>
      </div>
    </div>
  )
}
