import { cache } from 'react'
import {
  byDateDesc,
  optBoolean,
  optString,
  readContentDir,
  reqDate,
  reqString,
  reqStringArray,
  uniqueSorted,
  type RawEntry,
} from './fs'
import type { Article } from './types'

function toArticle(entry: RawEntry): Article {
  const externalUrl = optString(entry, 'externalUrl')
  if (!externalUrl && !entry.body) {
    throw new Error(`[content] ${entry.file}: 沒有 externalUrl 時必須有 MDX 內文`)
  }

  return {
    slug: entry.slug,
    title: reqString(entry, 'title'),
    excerpt: reqString(entry, 'excerpt'),
    tags: reqStringArray(entry, 'tags'),
    featured: optBoolean(entry, 'featured'),
    publishedAt: reqDate(entry, 'publishedAt'),
    externalUrl,
    body: entry.body,
  }
}

export const getAllArticles = cache((): Article[] =>
  readContentDir('articles').map(toArticle).sort(byDateDesc),
)

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug)
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((article) => article.tags.includes(tag))
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((article) => article.featured)
}

export function getAllArticleTags(): string[] {
  return uniqueSorted(getAllArticles().flatMap((article) => article.tags))
}
