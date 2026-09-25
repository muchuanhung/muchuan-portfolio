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
import { PROJECT_TONES, type Project, type ProjectLinks, type ProjectSummary, type ProjectTone } from './types'

function optTone(entry: RawEntry): ProjectTone | undefined {
  const value = optString(entry, 'tone')
  if (value === undefined) return undefined
  if (!(PROJECT_TONES as readonly string[]).includes(value)) {
    throw new Error(`[content] ${entry.file}: frontmatter "tone" 必須是 ${PROJECT_TONES.join(' / ')} 其中之一`)
  }
  return value as ProjectTone
}

/** frontmatter 解析後、尚未分配 mark 的作品 */
type ParsedProject = Omit<Project, 'mark'> & { mark?: string }

function toProject(entry: RawEntry): ParsedProject {
  const rawLinks = entry.data.links
  const linksEntry: RawEntry = {
    ...entry,
    data: rawLinks && typeof rawLinks === 'object' ? (rawLinks as Record<string, unknown>) : {},
  }
  const links: ProjectLinks = {
    demo: optString(linksEntry, 'demo'),
    github: optString(linksEntry, 'github'),
  }

  return {
    slug: entry.slug,
    title: reqString(entry, 'title'),
    summary: reqString(entry, 'summary'),
    cover: optString(entry, 'cover'),
    mark: optString(entry, 'mark'),
    tone: optTone(entry),
    tags: reqStringArray(entry, 'tags'),
    category: reqString(entry, 'category'),
    role: optString(entry, 'role'),
    stack: reqStringArray(entry, 'stack'),
    links,
    featured: optBoolean(entry, 'featured'),
    publishedAt: reqDate(entry, 'publishedAt'),
    body: entry.body,
  }
}

const MARKS = ['◈', '▦', '◒', '※', '◐', '▲', '✚']

function hashSlug(slug: string) {
  let hash = 0
  for (const char of slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return hash
}

/**
 * 沒填 mark 的作品依 slug 排序分配符號：先拿 hash 算出的那個，被用過就往後找沒用過的。
 * frontmatter 手動填的 mark 優先保留、也算「已使用」。作品超過 MARKS 數量才會開始重複。
 */
function assignMarks(projects: ParsedProject[]): Project[] {
  const used = new Set(projects.flatMap((p) => (p.mark ? [p.mark] : [])))
  const auto = new Map<string, string>()
  const pending = projects.filter((p) => !p.mark).sort((a, b) => a.slug.localeCompare(b.slug))

  for (const project of pending) {
    const start = hashSlug(project.slug) % MARKS.length
    const free = MARKS.map((_, i) => MARKS[(start + i) % MARKS.length]).find((m) => !used.has(m))
    const mark = free ?? MARKS[start]
    used.add(mark)
    auto.set(project.slug, mark)
  }
  return projects.map((p) => ({ ...p, mark: p.mark ?? auto.get(p.slug)! }))
}

export const getAllProjects = cache((): Project[] =>
  assignMarks(readContentDir('projects').map(toProject)).sort(byDateDesc),
)

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug)
}

export function getProjectsByTag(tag: string): Project[] {
  return getAllProjects().filter((project) => project.tags.includes(tag))
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured)
}

export function getAllProjectTags(): string[] {
  return uniqueSorted(getAllProjects().flatMap((project) => project.tags))
}

export function getAllProjectCategories(): string[] {
  return uniqueSorted(getAllProjects().map((project) => project.category))
}

/** 同 tag 的其他作品，依共同 tag 數排序 */
export function getRelatedProjects(project: Project, limit = 2): Project[] {
  return getAllProjects()
    .filter((other) => other.slug !== project.slug)
    .map((other) => ({ other, score: other.tags.filter((t) => project.tags.includes(t)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ other }) => other)
}

export function toProjectSummary({ body: _body, ...summary }: Project): ProjectSummary {
  return summary
}
