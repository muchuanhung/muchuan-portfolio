import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  eyebrow: string
  /** 第一行白字 */
  title: React.ReactNode
  /** 第二行橘字強調 */
  highlight?: React.ReactNode
  as?: 'h1' | 'h2'
  action?: React.ReactNode
  className?: string
}

/** 大繁中標題：eyebrow 小標 + 兩行標題（第二行橘色） */
export function SectionHeading({ eyebrow, title, highlight, as: Heading = 'h2', action, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between', className)}>
      <div>
        <p className="text-xs font-bold tracking-[.13em] text-muted">{eyebrow}</p>
        <Heading className="mt-4 text-[clamp(2.75rem,8vw,6.5rem)] leading-[1.02] font-black tracking-[-0.04em]">
          {title}
          {highlight && (
            <>
              <br />
              <span className="text-highlight">{highlight}</span>
            </>
          )}
        </Heading>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
