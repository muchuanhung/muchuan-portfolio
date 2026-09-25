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
import { fetchLatestMediumArticles } from './medium'
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

function readLocalArticles(): Article[] {
  return readContentDir('articles').map(toArticle).sort(byDateDesc)
}

/**
 * 文章列表：優先 Medium RSS 最新 5 篇；抓失敗才退回 content/articles/*.mdx。
 * RSS 有 `next.revalidate`，部署後約一小時更新一次。
 */
export const getAllArticles = cache(async (): Promise<Article[]> => {
  try {
    return await fetchLatestMediumArticles(5)
  } catch (error) {
    console.error('[articles] Medium RSS 失敗，改用本地 MDX', error)
    return readLocalArticles()
  }
})

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return (await getAllArticles()).find((article) => article.slug === slug)
}

export async function getArticlesByTag(tag: string): Promise<Article[]> {
  return (await getAllArticles()).filter((article) => article.tags.includes(tag))
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return (await getAllArticles()).filter((article) => article.featured)
}

export async function getAllArticleTags(): Promise<string[]> {
  return uniqueSorted((await getAllArticles()).flatMap((article) => article.tags))
}
