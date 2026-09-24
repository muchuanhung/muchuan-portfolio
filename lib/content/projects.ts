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
import type { Project, ProjectLinks, ProjectSummary } from './types'

function toProject(entry: RawEntry): Project {
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

export const getAllProjects = cache((): Project[] =>
  readContentDir('projects').map(toProject).sort(byDateDesc),
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
