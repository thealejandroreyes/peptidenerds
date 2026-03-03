'use client'

import Link from 'next/link'
import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface NavDropdownItem {
  name: string
  href: string
  description?: string
}

export interface NavDropdownSection {
  title: string
  items: NavDropdownItem[]
}

export interface NavDropdownProps {
  label: string
  sections: NavDropdownSection[]
  footerLink?: { label: string; href: string }
  isActive?: boolean
}

// Desktop dropdown — hover-triggered with fade-in, click-away close, keyboard accessible
export function NavDropdown({ label, sections, footerLink, isActive }: NavDropdownProps) {
  const [open, setOpen] = useState(false)
  const [focusIndex, setFocusIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Flatten all items for keyboard navigation
  const allItems: NavDropdownItem[] = sections.flatMap((s) => s.items)
  if (footerLink) {
    allItems.push({ name: footerLink.label, href: footerLink.href })
  }

  const close = useCallback(() => {
    setOpen(false)
    setFocusIndex(-1)
  }, [])

  // Click-away listener
  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, close])

  // Escape key
  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, close])

  function handleMouseEnter() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  function handleMouseLeave() {
    timeoutRef.current = setTimeout(() => {
      setOpen(false)
      setFocusIndex(-1)
    }, 150)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(!open)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) setOpen(true)
      setFocusIndex((prev) => Math.min(prev + 1, allItems.length - 1))
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusIndex((prev) => (prev <= 0 ? -1 : prev - 1))
    }
  }

  // Determine column layout — use 2 columns if more than 1 section and total items > 5
  const totalItems = sections.reduce((sum, s) => sum + s.items.length, 0)
  const useTwoColumns = sections.length > 1 && totalItems > 5

  let flatIdx = -1

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          'flex items-center gap-1 text-sm transition-colors',
          isActive ? 'text-cta' : 'text-white/75 hover:text-white'
        )}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <svg
          className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div
          className={cn(
            'absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-xl border border-border bg-card shadow-lg',
            'animate-dropdown',
            useTwoColumns ? 'w-[520px]' : 'w-[280px]'
          )}
          role="menu"
        >
          <div className={cn('p-4', useTwoColumns && 'grid grid-cols-2 gap-4')}>
            {sections.map((section) => (
              <div key={section.title}>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  {section.title}
                </p>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    flatIdx++
                    const idx = flatIdx
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            'block rounded-lg px-3 py-2 transition-colors hover:bg-card-hover',
                            idx === focusIndex && 'bg-card-hover'
                          )}
                          role="menuitem"
                          tabIndex={idx === focusIndex ? 0 : -1}
                          onClick={close}
                        >
                          <span className="text-sm font-medium text-foreground">{item.name}</span>
                          {item.description && (
                            <span className="mt-0.5 block text-xs text-muted">{item.description}</span>
                          )}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>

          {footerLink && (
            <div className="border-t border-border px-4 py-3">
              <Link
                href={footerLink.href}
                className={cn(
                  'text-xs font-medium text-accent transition-colors hover:text-accent-hover',
                  flatIdx + 1 === focusIndex && 'underline'
                )}
                role="menuitem"
                onClick={close}
              >
                {footerLink.label}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Mobile accordion — tap to expand/collapse, used inside mobile menu
export function MobileNavAccordion({
  label,
  sections,
  footerLink,
  isActive,
  defaultOpen = false,
  onLinkClick,
}: NavDropdownProps & { defaultOpen?: boolean; onLinkClick: () => void }) {
  const [expanded, setExpanded] = useState(defaultOpen)

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        className={cn(
          'flex w-full items-center justify-between py-3 text-sm transition-colors',
          isActive ? 'text-cta' : 'text-white/75'
        )}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {label}
        <svg
          className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {expanded && (
        <div className="pb-3 pl-3">
          {sections.map((section) => (
            <div key={section.title} className="mb-3 last:mb-0">
              <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                {section.title}
              </p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-lg py-1.5 pl-2 text-sm text-white/60 transition-colors hover:text-white"
                      onClick={onLinkClick}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {footerLink && (
            <Link
              href={footerLink.href}
              className="mt-1 block pl-2 text-xs text-sage transition-colors hover:text-white"
              onClick={onLinkClick}
            >
              {footerLink.label}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
