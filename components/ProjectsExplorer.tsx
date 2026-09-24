'use client'

import { useMemo, useState } from 'react'
import type { ProjectSummary } from '@/lib/content/types'
import { FilterChips, type FilterOption } from './FilterChips'
import { ProjectCard } from './ProjectCard'

const ALL = '__all__'

type ProjectsExplorerProps = {
  projects: ProjectSummary[]
  categories: string[]
  tags: string[]
}

/** /projects 的篩選 + 卡片牆。分類與標籤選項由 content 自動產生 */
export function ProjectsExplorer({ projects, categories, tags }: ProjectsExplorerProps) {
  const [category, setCategory] = useState(ALL)
  const [tag, setTag] = useState(ALL)

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) => (category === ALL || p.category === category) && (tag === ALL || p.tags.includes(tag)),
      ),
    [projects, category, tag],
  )

  const toOptions = (values: string[], count: (v: string) => number): FilterOption[] => [
    { value: ALL, label: '全部', count: projects.length },
    ...values.map((v) => ({ value: v, label: v, count: count(v) })),
  ]

  const reset = () => {
    setCategory(ALL)
    setTag(ALL)
  }

  return (
    <div>
      <div className="flex flex-col gap-4 border-y border-line py-6">
        <FilterChips
          label="分類"
          options={toOptions(categories, (c) => projects.filter((p) => p.category === c).length)}
          value={category}
          onChange={setCategory}
        />
        <FilterChips
          label="標籤"
          options={toOptions(tags, (t) => projects.filter((p) => p.tags.includes(t)).length)}
          value={tag}
          onChange={setTag}
        />
      </div>

      <p aria-live="polite" className="mt-6 mb-6 text-sm text-muted">
        共 {filtered.length} 個作品
      </p>

      {filtered.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2">
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} headingLevel="h2" />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-line px-5 py-20 text-center">
          <p className="text-4xl text-highlight" aria-hidden>
            ∅
          </p>
          <p className="mt-4 text-xl font-bold">這個組合還沒有作品。</p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 rounded-full border border-line px-5 py-2.5 text-sm hover:border-highlight hover:text-highlight"
          >
            清除篩選
          </button>
        </div>
      )}
    </div>
  )
}
