import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const PILLARS_DIR = path.join(process.cwd(), 'content', 'pillars')

export interface PillarContent {
  title: string
  htmlContent: string
  wordCount: number
  readingTime: string
  lastUpdated: string
}

export function getPillarContent(slug: string): PillarContent | null {
  const filePath = path.join(PILLARS_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const wordCount = content.split(/\s+/).filter(Boolean).length
  const htmlContent = marked.parse(content) as string

  return {
    title: data.title || '',
    htmlContent,
    wordCount,
    readingTime: `${Math.ceil(wordCount / 200)} min read`,
    lastUpdated: data.last_updated || new Date().toISOString().split('T')[0],
  }
}
