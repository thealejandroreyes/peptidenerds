'use client'

import Link from 'next/link'
import { useState } from 'react'

const navigation = [
  { name: 'Weight Loss', href: '/goals/weight-loss' },
  { name: 'GLP-1 Guide', href: '/peptides' },
  { name: 'Compare', href: '/compare' },
  { name: 'Stacks', href: '/stacks' },
  { name: 'Calculator', href: '/tools/dosage-calculator' },
  { name: 'Blog', href: '/blog' },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-primary bg-primary backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-serif text-xl font-medium tracking-wide text-white">
            Peptide<span className="text-sage">Nerds</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm text-white/75 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white/75 hover:text-white"
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
        <nav className="border-t border-white/10 bg-primary px-4 py-4 md:hidden">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm text-white/75 transition-colors hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
