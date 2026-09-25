import type { Article } from './types'

const FEED_URL = 'https://mu-chuan-hung.medium.com/feed'
const DEFAULT_LIMIT = 5
/** ISR：一小時重抓一次 RSS */
export const MEDIUM_REVALIDATE_SECONDS = 3600

function stripTags(html: string) {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function cdata(block: string, tag: string): string | undefined {
  const re = new RegExp(`<${tag}[^>]*>\\s*(?:<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>|([^<]*))\\s*</${tag}>`, 'i')
  const m = block.match(re)
  return (m?.[1] ?? m?.[2])?.trim() || undefined
}

function allCdata(block: string, tag: string): string[] {
  const re = new RegExp(`<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`, 'gi')
  return [...block.matchAll(re)].map((m) => m[1].trim()).filter(Boolean)
}

function cleanUrl(url: string) {
  return url.replace(/\?.*$/, '').replace(/#.*$/, '')
}

function postIdFromGuid(guid: string | undefined, link: string): string {
  const fromGuid = guid?.match(/\/p\/([a-f0-9]+)/i)?.[1]
  if (fromGuid) return fromGuid
  const fromLink = link.match(/-([a-f0-9]{8,})(?:\?|$)/i)?.[1]
  if (fromLink) return fromLink
  return link.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').slice(-24)
}

function toPublishedAt(pubDate: string): string {
  const d = new Date(pubDate)
  if (Number.isNaN(d.getTime())) throw new Error(`[medium] 無法解析 pubDate: ${pubDate}`)
  return d.toISOString().slice(0, 10)
}

function extractExcerpt(encoded: string | undefined): string {
  if (!encoded) return ''
  const h4 = encoded.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i)?.[1]
  const p = encoded.match(/<p[^>]*>([\s\S]*?)<\/p>/i)?.[1]
  const text = stripTags(h4 ?? p ?? '').replace(/。+/g, '。')
  if (text.length <= 140) return text
  return `${text.slice(0, 137).trim()}…`
}

function formatTag(raw: string): string {
  const map: Record<string, string> = {
    mcps: 'MCP',
    nextjs: 'Next.js',
    csr: 'CSR',
    mvc: 'MVC',
    react: 'React',
    figma: 'Figma',
    swift: 'Swift',
    swiftui: 'SwiftUI',
    jsdoc: 'JSDoc',
    frontend: 'Frontend',
    'frontend-development': 'Frontend',
    'front-end-development': 'Frontend',
    'bitwise-operations': 'Bitwise',
  }
  return map[raw.toLowerCase()] ?? raw.replace(/(^|[-_])(\w)/g, (_, _s, c: string) => c.toUpperCase())
}

function parseItem(block: string, index: number): Article {
  const title = cdata(block, 'title')
  const link = cdata(block, 'link')
  const guid = cdata(block, 'guid')
  const pubDate = cdata(block, 'pubDate')
  const encoded = cdata(block, 'content:encoded')
  if (!title || !link || !pubDate) {
    throw new Error(`[medium] RSS item 缺欄位（title/link/pubDate） index=${index}`)
  }

  const externalUrl = cleanUrl(link)
  const tags = [...new Set(allCdata(block, 'category').map(formatTag))]

  return {
    slug: postIdFromGuid(guid, link),
    title: stripTags(title).replace(/^\u200d/, '').trim(),
    excerpt: extractExcerpt(encoded) || title,
    tags: tags.length > 0 ? tags : ['Medium'],
    featured: index < 2,
    publishedAt: toPublishedAt(pubDate),
    externalUrl,
    body: '',
  }
}

/** 從 Medium RSS 抓最新 N 篇，轉成站內 Article 形狀 */
export async function fetchLatestMediumArticles(limit = DEFAULT_LIMIT): Promise<Article[]> {
  const res = await fetch(FEED_URL, {
    next: { revalidate: MEDIUM_REVALIDATE_SECONDS },
    headers: {
      Accept: 'application/rss+xml, application/xml, text/xml',
      'User-Agent': 'muchuan-portfolio/1.0 (+https://muchuan-portfolio.vercel.app)',
    },
  })
  if (!res.ok) throw new Error(`[medium] RSS HTTP ${res.status}`)

  const xml = await res.text()
  const blocks = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map((m) => m[1])
  if (blocks.length === 0) throw new Error('[medium] RSS 沒有 <item>')

  return blocks.slice(0, limit).map(parseItem)
}
