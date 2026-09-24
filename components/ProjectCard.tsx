import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ProjectSummary } from '@/lib/content/types'
import { cn } from '@/lib/utils'
import { TagList } from './Tag'

type ProjectCardProps = {
  project: ProjectSummary
  /** 用來交錯色塊封面的底色 */
  index?: number
  headingLevel?: 'h2' | 'h3'
}

export function ProjectCard({ project, index = 0, headingLevel: Heading = 'h3' }: ProjectCardProps) {
  const year = project.publishedAt.slice(0, 4)

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[28px] bg-surface transition duration-300',
        'hover:-translate-y-1.5 hover:shadow-[0_14px_0_var(--color-brand)]',
        'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-highlight',
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {project.cover ? (
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden
            className={cn(
              'flex h-full flex-col justify-between p-5',
              index % 2 === 0 ? 'bg-brand text-on-brand' : 'bg-fg text-canvas',
            )}
          >
            <span className="flex justify-between text-[11px] font-bold tracking-[.08em] uppercase">
              <span>{String(index + 1).padStart(2, '0')} / {project.category}</span>
              <span>{year}</span>
            </span>
            <span className="text-5xl leading-none font-black tracking-tighter md:text-6xl">{project.title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6 md:p-7">
        <p className="text-xs font-bold tracking-[.13em] text-muted uppercase">
          {project.category} · {year}
        </p>
        <Heading className="flex items-start justify-between gap-4 text-2xl font-black tracking-tight md:text-3xl">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
          <ArrowUpRight aria-hidden className="mt-1 size-6 shrink-0 text-highlight transition-transform group-hover:rotate-45" />
        </Heading>
        <p className="leading-relaxed text-muted">{project.summary}</p>
        <div className="mt-auto pt-2">
          <TagList tags={project.tags} />
        </div>
      </div>
    </article>
  )
}
