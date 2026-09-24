import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { MdxContent } from '@/components/MdxContent'
import { NeonButton } from '@/components/NeonButton'
import { ProjectCard } from '@/components/ProjectCard'
import { TagList } from '@/components/Tag'
import { getAllProjects, getProjectBySlug, getRelatedProjects, toProjectSummary } from '@/lib/content/projects'
import { formatDate } from '@/lib/format'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug((await params).slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
    openGraph: project.cover ? { images: [project.cover] } : undefined,
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = getProjectBySlug((await params).slug)
  if (!project) notFound()

  const related = getRelatedProjects(project)

  return (
    <article className="wrap pt-20 md:pt-28">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-highlight">
        <ArrowLeft aria-hidden className="size-4" /> 所有作品
      </Link>

      <header className="mt-10">
        <p className="text-xs font-bold tracking-[.13em] text-muted uppercase">
          {project.category} · <time dateTime={project.publishedAt}>{formatDate(project.publishedAt)}</time>
        </p>
        <h1 className="mt-4 text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] font-black tracking-[-0.05em]">{project.title}</h1>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{project.summary}</p>

        {(project.links.demo || project.links.github) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.demo && <NeonButton href={project.links.demo}>看線上版本</NeonButton>}
            {project.links.github && (
              <NeonButton href={project.links.github} variant="outline">
                GitHub
              </NeonButton>
            )}
          </div>
        )}
      </header>

      {project.cover && (
        <div className="relative mt-14 aspect-[16/9] overflow-hidden rounded-[28px] bg-surface">
          <Image src={project.cover} alt={`${project.title} 畫面截圖`} fill priority sizes="(max-width: 1180px) 100vw, 1180px" className="object-cover" />
        </div>
      )}

      <div className="mt-14 grid gap-12 border-t border-line pt-10 md:grid-cols-[1fr_260px]">
        <MdxContent source={project.body} />

        <aside className="flex flex-col gap-8 md:order-last">
          {project.role && (
            <div>
              <h2 className="text-xs font-bold tracking-[.13em] text-muted">ROLE / 角色</h2>
              <p className="mt-3 text-sm leading-relaxed">{project.role}</p>
            </div>
          )}
          <div>
            <h2 className="text-xs font-bold tracking-[.13em] text-muted">STACK / 技術</h2>
            <ul className="mt-3 space-y-1.5 text-sm">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-3 text-xs font-bold tracking-[.13em] text-muted">TAGS / 標籤</h2>
            <TagList tags={project.tags} />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-24 border-t border-line pt-10">
          <h2 className="mb-8 text-2xl font-black tracking-tight">相關作品</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {related.map((p, i) => (
              <ProjectCard key={p.slug} project={toProjectSummary(p)} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
