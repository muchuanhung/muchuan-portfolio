import type { Metadata } from 'next'
import { ProjectsExplorer } from '@/components/ProjectsExplorer'
import { SectionHeading } from '@/components/SectionHeading'
import {
  getAllProjectCategories,
  getAllProjectTags,
  getAllProjects,
  toProjectSummary,
} from '@/lib/content/projects'

export const metadata: Metadata = {
  title: '作品',
  description: '洪睦荃的所有作品，可依分類與技術標籤篩選。',
}

export default function ProjectsPage() {
  return (
    <div className="wrap pt-24 md:pt-32">
      <SectionHeading as="h1" eyebrow="ALL PROJECTS / 全部作品" title="每個作品，" highlight="對應一次具體需求。" />
      <ProjectsExplorer
        projects={getAllProjects().map(toProjectSummary)}
        categories={getAllProjectCategories()}
        tags={getAllProjectTags()}
      />
    </div>
  )
}
