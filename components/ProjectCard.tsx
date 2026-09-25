import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { PROJECT_TONES, type ProjectSummary, type ProjectTone } from '@/lib/content/types'
import { cn } from '@/lib/utils'
import { TagList } from './Tag'

type ProjectCardProps = {
  project: ProjectSummary
  /** 決定編號與（沒指定 tone 時）色塊底色的輪替 */
  index?: number
  /** 作品列表用較矮的色塊（220px），首頁精選用 270px */
  compact?: boolean
  headingLevel?: 'h2' | 'h3'
}

/**
 * 色塊封面樣式（來自 f11c807），字色一律用 var(--canvas)
 */
const TONE_CLASS: Record<ProjectTone, string> = {
  brand: 'bg-brand',
  invert: 'bg-fg',
  violet: 'bg-[#b7a8ff]',
  coral: 'bg-[#ff754d]',
}

export function ProjectCard({ project, index = 0, compact = false, headingLevel: Heading = 'h3' }: ProjectCardProps) {
  const year = project.publishedAt.slice(0, 4)
  const tone = project.tone ?? PROJECT_TONES[index % PROJECT_TONES.length]
  const number = String(index + 1).padStart(2, '0')

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-[28px] bg-surface transition duration-300',
        'hover:-translate-y-1.5 hover:shadow-[0_14px_0_var(--color-brand)]',
        'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-highlight',
      )}
    >
      {project.cover ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.cover}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div
          aria-hidden
          className={cn(
            'flex flex-col justify-between p-5 text-canvas',
            compact ? 'min-h-[220px]' : 'min-h-[240px] md:min-h-[270px]',
            TONE_CLASS[tone],
          )}
        >
          <span className="text-[11px] font-extrabold tracking-[.08em] uppercase">
            {number} / {project.category}
          </span>
          <span className="self-center text-[105px] leading-none font-black">{project.mark}</span>
          <span className="flex items-center justify-between text-[11px] font-extrabold tracking-[.08em]">
            {year}
            <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col px-7 pt-[26px] pb-[30px]">
        <p className="text-[11px] font-bold tracking-[.13em] text-muted uppercase">
          {number} / {project.category} · {year}
        </p>
        <Heading className="my-2.5 text-[31px] leading-tight font-black tracking-[-0.06em]">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </Heading>
        <p className="mb-5 max-w-[430px] leading-[1.55] text-muted md:min-h-12">{project.summary}</p>
        <div className="mt-auto">
          <TagList tags={project.tags} />
        </div>
      </div>
    </article>
  )
}
