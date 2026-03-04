'use client'

import { useState, useEffect } from 'react'

interface TOCItem {
  id: string
  title: string
}

export function ComparisonTOC({ items }: { items: TOCItem[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -70% 0px' }
    )

    for (const item of items) {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <>
      {/* Desktop sticky sidebar */}
      <nav aria-label="Table of contents" className="hidden lg:block sticky top-24">
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground">On this page</h2>
          <ol className="mt-3 space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`text-sm transition-colors ${
                    activeId === item.id
                      ? 'text-accent font-medium'
                      : 'text-muted hover:text-accent'
                  }`}
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      {/* Mobile inline card */}
      <nav aria-label="Table of contents" className="lg:hidden rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground">On this page</h2>
        <ol className="mt-3 space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-sm text-muted hover:text-accent">
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}
