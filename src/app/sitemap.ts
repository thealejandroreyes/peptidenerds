import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/data/peptides'
import { getAllComparisonSlugs } from '@/data/comparisons'
import { getAllGoalSlugs } from '@/data/goals'
import { getAllStackSlugs } from '@/data/stacks'
import { getAllPillarSlugs } from '@/data/pillars'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://peptidenerds.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/peptides`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/goals`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/stacks`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/tools/dosage-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/reconstitution-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tools/bac-water-calculator`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/tracker`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/peptides-weight-loss-guide`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/glp-1-peptides`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/start-here`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/editorial-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/affiliate-disclosure`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Peptide pages (main + sub-pages)
  const peptideSlugs = getAllSlugs()
  const subPages = ['benefits', 'dosage', 'side-effects', 'faq'] as const

  const peptidePages: MetadataRoute.Sitemap = peptideSlugs.map((slug) => ({
    url: `${BASE_URL}/peptides/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const peptideSubPages: MetadataRoute.Sitemap = peptideSlugs.flatMap((slug) =>
    subPages.map((sub) => ({
      url: `${BASE_URL}/peptides/${slug}/${sub}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  )

  // Comparison pages
  const comparisonPages: MetadataRoute.Sitemap = getAllComparisonSlugs().map((slug) => ({
    url: `${BASE_URL}/compare/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Goal pages
  const goalPages: MetadataRoute.Sitemap = getAllGoalSlugs().map((slug) => ({
    url: `${BASE_URL}/goals/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Stack pages
  const stackPages: MetadataRoute.Sitemap = getAllStackSlugs().map((slug) => ({
    url: `${BASE_URL}/stacks/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date).toISOString() : now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Pillar pages
  const pillarPages: MetadataRoute.Sitemap = getAllPillarSlugs().map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...pillarPages, ...peptidePages, ...peptideSubPages, ...comparisonPages, ...goalPages, ...stackPages, ...blogPages]
}
