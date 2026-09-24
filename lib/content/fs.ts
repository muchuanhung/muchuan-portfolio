import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type RawEntry = {
  slug: string
  file: string
  data: Record<string, unknown>
  body: string
}

const CONTENT_ROOT = path.join(process.cwd(), 'content')

/** 讀取 content/<dir> 底下所有 .mdx，檔名即 slug（底線開頭的檔案視為草稿略過） */
export function readContentDir(dir: string): RawEntry[] {
  const absDir = path.join(CONTENT_ROOT, dir)
  if (!fs.existsSync(absDir)) return []

  return fs
    .readdirSync(absDir)
    .filter((name) => name.endsWith('.mdx') && !name.startsWith('_'))
    .map((name) => {
      const file = path.join('content', dir, name)
      const { data, content } = matter(fs.readFileSync(path.join(absDir, name), 'utf8'))
      return { slug: name.replace(/\.mdx$/, ''), file, data, body: content.trim() }
    })
}

/* ---------- frontmatter 欄位檢查：缺欄位或型別錯時直接讓 build 失敗並指出檔案 ---------- */

function fail(file: string, key: string, expected: string): never {
  throw new Error(`[content] ${file}: frontmatter "${key}" 必須是 ${expected}`)
}

export function reqString(entry: RawEntry, key: string): string {
  const value = entry.data[key]
  if (typeof value !== 'string' || value.trim() === '') fail(entry.file, key, '非空字串')
  return value
}

export function optString(entry: RawEntry, key: string): string | undefined {
  const value = entry.data[key]
  if (value === undefined || value === null || value === '') return undefined
  if (typeof value !== 'string') fail(entry.file, key, '字串')
  return value
}

export function reqStringArray(entry: RawEntry, key: string): string[] {
  const value = entry.data[key]
  if (!Array.isArray(value) || !value.every((v) => typeof v === 'string')) {
    fail(entry.file, key, '字串陣列，例如 ["Next.js", "AI"]')
  }
  return value
}

export function optBoolean(entry: RawEntry, key: string): boolean {
  const value = entry.data[key]
  if (value === undefined) return false
  if (typeof value !== 'boolean') fail(entry.file, key, 'true / false')
  return value
}

/** YAML 會把沒加引號的 2024-01-01 解析成 Date，這裡兩種寫法都收，統一回傳 YYYY-MM-DD */
export function reqDate(entry: RawEntry, key: string): string {
  const value = entry.data[key]
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value.toISOString().slice(0, 10)
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value
  fail(entry.file, key, 'YYYY-MM-DD 日期')
}

export function byDateDesc<T extends { publishedAt: string }>(a: T, b: T) {
  return b.publishedAt.localeCompare(a.publishedAt)
}

export function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, 'zh-Hant'))
}
