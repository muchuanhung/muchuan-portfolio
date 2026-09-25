import type { Metadata } from 'next'
import { ProjectCard } from '@/components/ProjectCard'
import { SectionHeading } from '@/components/SectionHeading'
import { getAllProjects, toProjectSummary } from '@/lib/content/projects'

export const metadata: Metadata = {
  title: '作品',
  description: '洪睦筌的作品集：Web、AI 與前端相關專案。',
}

export default function ProjectsPage() {
  const projects = getAllProjects().map(toProjectSummary)

  return (
    <div className="wrap pt-24 md:pt-32">
      <SectionHeading as="h1" eyebrow="ALL PROJECTS / 全部作品" title="每個作品，" highlight="對應一次具體需求。" />
      <p className="mt-2 mb-10 text-sm text-muted">共 {projects.length} 個作品</p>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} compact headingLevel="h2" />
        ))}
      </div>
    </div>
  )
}
