'use client'

import { useMemo } from 'react'
import { InlineContentCTA } from '@/components/InlineContentCTA'

interface BlogContentWithCTAProps {
  htmlContent: string
}

export function BlogContentWithCTA({ htmlContent }: BlogContentWithCTAProps) {
  const { before, after } = useMemo(() => {
    // Split at the 3rd <h2> to insert a CTA mid-content
    const h2Regex = /<h2[\s>]/gi
    let matchCount = 0
    let splitIndex = -1

    let match: RegExpExecArray | null
    while ((match = h2Regex.exec(htmlContent)) !== null) {
      matchCount++
      if (matchCount === 3) {
        splitIndex = match.index
        break
      }
    }

    if (splitIndex === -1) {
      return { before: htmlContent, after: '' }
    }

    return {
      before: htmlContent.slice(0, splitIndex),
      after: htmlContent.slice(splitIndex),
    }
  }, [htmlContent])

  if (!after) {
    return (
      <>
        <div
          className="prose-custom mt-10"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
        <InlineContentCTA type="blog" />
      </>
    )
  }

  return (
    <>
      <div
        className="prose-custom mt-10"
        dangerouslySetInnerHTML={{ __html: before }}
      />
      <InlineContentCTA type="blog" />
      <div
        className="prose-custom"
        dangerouslySetInnerHTML={{ __html: after }}
      />
    </>
  )
}
