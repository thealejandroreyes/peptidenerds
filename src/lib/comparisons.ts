import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const COMPARISONS_DIR = path.join(process.cwd(), 'content', 'comparisons')

export interface ComparisonContent {
  slug: string
  htmlContent: string
  sections: { id: string; title: string }[]
}

export function getComparisonContent(slug: string): ComparisonContent | null {
  if (!fs.existsSync(COMPARISONS_DIR)) return null

  const filePath = path.join(COMPARISONS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  const htmlContent = marked.parse(content) as string

  const sections: { id: string; title: string }[] = []
  const regex = /<h2[^>]*>(.*?)<\/h2>/gi
  let match
  while ((match = regex.exec(htmlContent)) !== null) {
    const title = match[1].replace(/<[^>]+>/g, '').trim()
    const id = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    sections.push({ id, title })
  }

  return { slug, htmlContent, sections }
}
