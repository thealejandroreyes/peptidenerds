'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { goals } from '@/data/goals'
import { cn } from '@/lib/utils'
import {
  NavDropdown,
  MobileNavAccordion,
  type NavDropdownSection,
} from './NavDropdown'

// ---------------------------------------------------------------------------
// Navigation data
// ---------------------------------------------------------------------------

const weightLossSections: NavDropdownSection[] = [
  {
    title: 'Getting Started',
    items: [
      { name: 'Weight Loss Goal', href: '/goals/weight-loss', description: 'Best peptides for weight loss' },
      { name: 'Fat Loss Goal', href: '/goals/fat-loss', description: 'Target stubborn body fat' },
      { name: 'Weight Loss Guide', href: '/peptides-weight-loss-guide', description: 'Complete beginner guide' },
    ],
  },
  {
    title: 'Compare Options',
    items: [
      { name: 'Semaglutide vs Tirzepatide', href: '/compare/semaglutide-vs-tirzepatide' },
      { name: 'Semaglutide vs Retatrutide', href: '/compare/semaglutide-vs-retatrutide' },
      { name: 'Ozempic vs Wegovy', href: '/compare/ozempic-vs-wegovy' },
      { name: 'Mounjaro vs Zepbound', href: '/compare/mounjaro-vs-zepbound' },
      { name: 'Compounded vs Brand', href: '/compare/compounded-vs-brand-semaglutide' },
    ],
  },
  {
    title: 'Stacks',
    items: [
      { name: 'GLP-1 Weight Loss Stack', href: '/stacks/glp1-weight-loss-stack' },
      { name: 'Dual Agonist Fat Loss Stack', href: '/stacks/dual-agonist-foss-stack' },
      { name: 'Body Recomposition Stack', href: '/stacks/body-recomposition-stack' },
    ],
  },
]

const peptideSections: NavDropdownSection[] = [
  {
    title: 'Popular',
    items: [
      { name: 'Semaglutide', href: '/peptides/semaglutide', description: 'GLP-1 weight loss leader' },
      { name: 'Tirzepatide', href: '/peptides/tirzepatide', description: 'Dual GIP/GLP-1 agonist' },
      { name: 'Retatrutide', href: '/peptides/retatrutide', description: 'Triple agonist (next-gen)' },
      { name: 'BPC-157', href: '/peptides/bpc-157', description: 'Healing & recovery' },
      { name: 'TB-500', href: '/peptides/tb-500', description: 'Tissue repair' },
    ],
  },
  {
    title: 'By Category',
    items: [
      { name: 'GLP-1 Weight Loss', href: '/glp-1-peptides' },
      { name: 'Healing & Recovery', href: '/goals/injury-recovery' },
      { name: 'Growth Hormone', href: '/goals/muscle-growth' },
      { name: 'Anti-Aging', href: '/goals/anti-aging' },
    ],
  },
]

// Short descriptions for goals in the dropdown
const goalDescriptions: Record<string, string> = {
  'weight-loss': 'GLP-1s and metabolic peptides',
  'muscle-growth': 'GH secretagogues and recovery',
  'fat-loss': 'Target visceral and stubborn fat',
  'injury-recovery': 'BPC-157, TB-500 and more',
  'anti-aging': 'Longevity and skin health',
  'sleep-quality': 'Improve deep sleep cycles',
  'gut-health': 'Gut lining repair and healing',
  'cognitive-enhancement': 'Focus, memory, neuroprotection',
  'immune-support': 'Immune modulation peptides',
  'skin-health': 'Collagen and rejuvenation',
  'sexual-health': 'Libido and hormonal support',
  'joint-health': 'Joint repair and mobility',
}

// Build goals sections dynamically — split into 2 columns
const goalItems = goals.map((g) => ({
  name: g.name,
  href: `/goals/${g.slug}`,
  description: goalDescriptions[g.slug],
}))

const goalsSections: NavDropdownSection[] = [
  {
    title: 'Weight & Body',
    items: goalItems.filter((g) =>
      ['/goals/weight-loss', '/goals/fat-loss', '/goals/muscle-growth', '/goals/skin-health', '/goals/sexual-health', '/goals/joint-health'].includes(g.href)
    ),
  },
  {
    title: 'Health & Performance',
    items: goalItems.filter((g) =>
      ['/goals/injury-recovery', '/goals/anti-aging', '/goals/sleep-quality', '/goals/gut-health', '/goals/cognitive-enhancement', '/goals/immune-support'].includes(g.href)
    ),
  },
]

const howToSections: NavDropdownSection[] = [
  {
    title: 'Guides',
    items: [
      { name: 'How to Reconstitute Peptides', href: '/blog/how-to-reconstitute-peptides', description: 'Step-by-step mixing guide' },
      { name: 'How to Store Peptides', href: '/blog/how-to-store-peptides-properly', description: 'Keep peptides stable' },
    ],
  },
  {
    title: 'Calculators',
    items: [
      { name: 'Dosage Calculator', href: '/tools/dosage-calculator', description: 'Calculate your dose' },
      { name: 'BAC Water Calculator', href: '/tools/bac-water-calculator', description: 'Multi-vial water volume' },
      { name: 'Reconstitution Calculator', href: '/tools/reconstitution-calculator', description: 'Mixing math made easy' },
    ],
  },
]

const toolsSections: NavDropdownSection[] = [
  {
    title: 'Calculators',
    items: [
      { name: 'Dosage Calculator', href: '/tools/dosage-calculator', description: 'Calculate your dose' },
      { name: 'BAC Water Calculator', href: '/tools/bac-water-calculator', description: 'Multi-vial water volume' },
      { name: 'Reconstitution Calculator', href: '/tools/reconstitution-calculator', description: 'Mixing math made easy' },
    ],
  },
  {
    title: 'Research Tools',
    items: [
      { name: 'Peptide Finder', href: '/tools/peptide-finder', description: 'Find the right peptide' },
      { name: 'Stack Builder', href: '/tools/stack-builder', description: 'Build your protocol' },
      { name: 'Cost Calculator', href: '/tools/cost-calculator', description: 'Estimate monthly cost' },
      { name: 'Protocol Tracker', href: '/tracker', description: 'Track your cycle' },
    ],
  },
]

// ---------------------------------------------------------------------------
// Helper — check if current path is within a nav section
// ---------------------------------------------------------------------------
function isPathActive(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((p) => pathname === p || pathname.startsWith(p + '/'))
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const closeMobile = () => setMobileOpen(false)

  const weightLossActive = isPathActive(pathname, ['/goals/weight-loss', '/goals/fat-loss', '/peptides-weight-loss-guide', '/compare', '/stacks'])
  const peptidesActive = isPathActive(pathname, ['/peptides', '/glp-1-peptides'])
  const goalsActive = pathname === '/goals' || (pathname.startsWith('/goals/') && !weightLossActive)
  const howToActive = isPathActive(pathname, ['/blog/how-to-reconstitute-peptides', '/blog/how-to-store-peptides-properly'])
  const toolsActive = isPathActive(pathname, ['/tools', '/tracker'])
  const blogActive = pathname === '/blog' || (pathname.startsWith('/blog/') && !howToActive)
  const startHereActive = pathname === '/start-here'

  return (
    <header className="sticky top-0 z-50 border-b border-primary bg-primary backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-medium tracking-wide text-white">
            Peptide<span className="text-sage">Nerds</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-5 lg:flex">
          {/* Start Here */}
          <Link
            href="/start-here"
            className={cn(
              'text-sm transition-colors',
              startHereActive ? 'text-cta' : 'text-white/75 hover:text-white'
            )}
          >
            Start Here
          </Link>

          {/* Weight Loss */}
          <NavDropdown
            label="Weight Loss"
            sections={weightLossSections}
            footerLink={{ label: 'View all comparisons →', href: '/compare' }}
            isActive={weightLossActive}
          />

          {/* Peptides */}
          <NavDropdown
            label="Peptides"
            sections={peptideSections}
            footerLink={{ label: 'Browse all 44 peptides →', href: '/peptides' }}
            isActive={peptidesActive}
          />

          {/* Goals */}
          <NavDropdown
            label="Goals"
            sections={goalsSections}
            footerLink={{ label: 'View all goals →', href: '/goals' }}
            isActive={goalsActive}
          />

          {/* How-To */}
          <NavDropdown
            label="How-To"
            sections={howToSections}
            footerLink={{ label: 'View all how-to guides →', href: '/blog?pillar=peptide-how-to' }}
            isActive={howToActive}
          />

          {/* Tools */}
          <NavDropdown
            label="Tools"
            sections={toolsSections}
            footerLink={{ label: 'View all tools →', href: '/tools' }}
            isActive={toolsActive}
          />

          {/* Blog */}
          <Link
            href="/blog"
            className={cn(
              'text-sm transition-colors',
              blogActive ? 'text-cta' : 'text-white/75 hover:text-white'
            )}
          >
            Blog
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white/75 hover:text-white"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-white/10 bg-primary px-4 py-2 lg:hidden">
          {/* Start Here */}
          <Link
            href="/start-here"
            onClick={closeMobile}
            className={cn(
              'block border-b border-white/10 py-3 text-sm transition-colors',
              startHereActive ? 'text-cta' : 'text-white/75 hover:text-white'
            )}
          >
            Start Here
          </Link>

          {/* Weight Loss */}
          <MobileNavAccordion
            label="Weight Loss"
            sections={weightLossSections}
            footerLink={{ label: 'View all comparisons →', href: '/compare' }}
            isActive={weightLossActive}
            defaultOpen
            onLinkClick={closeMobile}
          />

          {/* Peptides */}
          <MobileNavAccordion
            label="Peptides"
            sections={peptideSections}
            footerLink={{ label: 'Browse all 44 peptides →', href: '/peptides' }}
            isActive={peptidesActive}
            defaultOpen
            onLinkClick={closeMobile}
          />

          {/* Goals */}
          <MobileNavAccordion
            label="Goals"
            sections={goalsSections}
            footerLink={{ label: 'View all goals →', href: '/goals' }}
            isActive={goalsActive}
            onLinkClick={closeMobile}
          />

          {/* How-To */}
          <MobileNavAccordion
            label="How-To"
            sections={howToSections}
            footerLink={{ label: 'View all how-to guides →', href: '/blog?pillar=peptide-how-to' }}
            isActive={howToActive}
            onLinkClick={closeMobile}
          />

          {/* Tools */}
          <MobileNavAccordion
            label="Tools"
            sections={toolsSections}
            footerLink={{ label: 'View all tools →', href: '/tools' }}
            isActive={toolsActive}
            onLinkClick={closeMobile}
          />

          {/* Blog */}
          <Link
            href="/blog"
            onClick={closeMobile}
            className={cn(
              'block py-3 text-sm transition-colors',
              blogActive ? 'text-cta' : 'text-white/75 hover:text-white'
            )}
          >
            Blog
          </Link>
        </nav>
      )}
    </header>
  )
}
