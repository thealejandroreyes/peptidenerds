'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { QuizStep } from './components/quiz-step'
import { QuizOption } from './components/quiz-option'
import { QuizProgress } from './components/quiz-progress'
import { QuizResults } from './components/quiz-results'
import { getRecommendation } from '@/data/quiz-recommendations'
import { isSubscribed, markSubscribed, markCTAInteraction } from '@/lib/subscriber-state'

const GOALS = [
  { value: 'weight-loss', label: 'Weight Loss', description: 'GLP-1 agonists and metabolic peptides' },
  { value: 'healing', label: 'Healing & Recovery', description: 'Tissue repair, inflammation, joint health' },
  { value: 'muscle-growth', label: 'Muscle Growth', description: 'GH secretagogues and anabolic peptides' },
  { value: 'anti-aging', label: 'Anti-Aging', description: 'Longevity, skin health, cellular repair' },
  { value: 'sleep', label: 'Sleep', description: 'Deep sleep, circadian rhythm, recovery' },
  { value: 'cognitive', label: 'Cognitive Enhancement', description: 'Focus, memory, neuroprotection' },
]

const LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'New to peptides, want to start safe' },
  { value: 'intermediate', label: 'Intermediate', description: 'Some experience, ready for more options' },
  { value: 'advanced', label: 'Advanced', description: 'Experienced user, open to research compounds' },
]

const INJECTION_PREFS = [
  { value: 'yes', label: 'Yes, comfortable with injections', description: 'Open to subcutaneous injections' },
  { value: 'no', label: 'No injections', description: 'Only oral, nasal, or topical options' },
  { value: 'not-sure', label: 'Not sure yet', description: 'Show me options and I\'ll decide' },
]

const WEIGHT_AMOUNTS = [
  { value: 'under-20', label: 'Under 20 lbs', description: 'Looking to lose a modest amount' },
  { value: '20-50', label: '20-50 lbs', description: 'Moderate weight loss goal' },
  { value: 'over-50', label: '50+ lbs', description: 'Significant weight loss needed' },
]

export function PeptideFinderQuiz() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [goal, setGoal] = useState<string | null>(null)
  const [level, setLevel] = useState<string | null>(null)
  const [injection, setInjection] = useState<string | null>(null)
  const [weightToLose, setWeightToLose] = useState<string | null>(null)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')
  const [showResults, setShowResults] = useState(false)
  const [showEmailGate, setShowEmailGate] = useState(false)
  const [gateEmail, setGateEmail] = useState('')
  const [gateStatus, setGateStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const [skipGate, setSkipGate] = useState(false)

  const needsWeightStep = goal === 'weight-loss'
  const totalSteps = needsWeightStep ? 4 : 3

  // Read URL params on mount to restore results state
  useEffect(() => {
    const g = searchParams.get('goal')
    const l = searchParams.get('level')
    const i = searchParams.get('injection')
    const w = searchParams.get('weight')

    if (g && l && i) {
      setGoal(g)
      setLevel(l)
      setInjection(i)
      if (w) setWeightToLose(w)

      const rec = getRecommendation(g, l, i, g === 'weight-loss' ? w || undefined : undefined)
      if (rec) {
        setShowResults(true)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const updateUrl = useCallback(
    (g: string, l: string, i: string, w?: string) => {
      const params = new URLSearchParams({ goal: g, level: l, injection: i })
      if (w) params.set('weight', w)
      router.replace(`/tools/peptide-finder?${params.toString()}`, { scroll: false })
    },
    [router]
  )

  const handleComplete = useCallback(
    (g: string, l: string, i: string, w?: string) => {
      updateUrl(g, l, i, w)
      // Show email gate unless already subscribed
      if (isSubscribed()) {
        setShowResults(true)
      } else {
        setShowEmailGate(true)
      }
    },
    [updateUrl]
  )

  async function handleGateSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!gateEmail) return
    setGateStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: gateEmail, utm_source: 'quiz-results-gate' }),
      })
      if (res.ok) {
        markSubscribed()
        markCTAInteraction()
      }
    } catch {
      // Continue regardless
    }
    setGateStatus('done')
    setShowEmailGate(false)
    setShowResults(true)
  }

  function handleSkipGate() {
    setSkipGate(true)
    setShowEmailGate(false)
    setShowResults(true)
  }

  const selectGoal = (value: string) => {
    setGoal(value)
    // Reset downstream selections when goal changes
    setLevel(null)
    setInjection(null)
    setWeightToLose(null)
    setDirection('forward')
    setStep(1)
  }

  const selectLevel = (value: string) => {
    setLevel(value)
    setInjection(null)
    setWeightToLose(null)
    setDirection('forward')
    setStep(2)
  }

  const selectInjection = (value: string) => {
    setInjection(value)
    setDirection('forward')
    if (goal === 'weight-loss') {
      setWeightToLose(null)
      setStep(3)
    } else {
      handleComplete(goal!, level!, value)
    }
  }

  const selectWeight = (value: string) => {
    setWeightToLose(value)
    setDirection('forward')
    handleComplete(goal!, level!, injection!, value)
  }

  const goBack = () => {
    if (showResults) {
      setShowResults(false)
      setStep(needsWeightStep ? 3 : 2)
      return
    }
    if (step > 0) {
      setDirection('backward')
      setStep(step - 1)
    }
  }

  const startOver = () => {
    setStep(0)
    setGoal(null)
    setLevel(null)
    setInjection(null)
    setWeightToLose(null)
    setShowResults(false)
    setDirection('forward')
    router.replace('/tools/peptide-finder', { scroll: false })
  }

  // Email gate between quiz completion and results
  if (showEmailGate && !skipGate) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h2 className="text-xl">Your results are ready</h2>
        <p className="mt-2 text-sm text-muted">
          Enter your email to get your personalized recommendation plus the free Peptide Starter Kit.
        </p>
        <form onSubmit={handleGateSubmit} className="mt-4 flex gap-2">
          <input
            type="email"
            value={gateEmail}
            onChange={(e) => setGateEmail(e.target.value)}
            placeholder="you@email.com"
            required
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <button
            type="submit"
            disabled={gateStatus === 'loading'}
            className="rounded-full bg-cta px-5 py-2.5 text-sm font-medium text-cta-foreground transition-colors hover:bg-cta-hover disabled:opacity-50"
          >
            {gateStatus === 'loading' ? '...' : 'Show My Results'}
          </button>
        </form>
        <button
          onClick={handleSkipGate}
          className="mt-3 text-xs text-muted underline transition-colors hover:text-foreground"
        >
          Skip — just show me the results
        </button>
      </div>
    )
  }

  if (showResults && goal && level && injection) {
    const rec = getRecommendation(
      goal,
      level,
      injection,
      goal === 'weight-loss' ? weightToLose || undefined : undefined
    )
    if (rec) {
      return (
        <QuizResults
          recommendation={rec}
          answers={{ goal, level, injection, weightToLose }}
          onStartOver={startOver}
          onBack={goBack}
        />
      )
    }
  }

  return (
    <div>
      <QuizProgress currentStep={step} totalSteps={totalSteps} />

      {step > 0 && (
        <button
          onClick={goBack}
          className="mt-4 flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>
      )}

      <QuizStep key={step} direction={direction}>
        {step === 0 && (
          <div>
            <h2 className="mb-4 text-xl">What is your primary goal?</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {GOALS.map((g) => (
                <QuizOption
                  key={g.value}
                  label={g.label}
                  description={g.description}
                  selected={goal === g.value}
                  onClick={() => selectGoal(g.value)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="mb-4 text-xl">What is your experience level?</h2>
            <div className="grid gap-3">
              {LEVELS.map((l) => (
                <QuizOption
                  key={l.value}
                  label={l.label}
                  description={l.description}
                  selected={level === l.value}
                  onClick={() => selectLevel(l.value)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="mb-4 text-xl">Are you comfortable with injections?</h2>
            <div className="grid gap-3">
              {INJECTION_PREFS.map((i) => (
                <QuizOption
                  key={i.value}
                  label={i.label}
                  description={i.description}
                  selected={injection === i.value}
                  onClick={() => selectInjection(i.value)}
                />
              ))}
            </div>
          </div>
        )}

        {step === 3 && needsWeightStep && (
          <div>
            <h2 className="mb-4 text-xl">How much weight do you want to lose?</h2>
            <div className="grid gap-3">
              {WEIGHT_AMOUNTS.map((w) => (
                <QuizOption
                  key={w.value}
                  label={w.label}
                  description={w.description}
                  selected={weightToLose === w.value}
                  onClick={() => selectWeight(w.value)}
                />
              ))}
            </div>
          </div>
        )}
      </QuizStep>
    </div>
  )
}
