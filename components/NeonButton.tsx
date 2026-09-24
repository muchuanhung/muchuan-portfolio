import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type NeonButtonProps = {
  href: string
  children: React.ReactNode
  /** solid：橘底黑字（主要動作）；outline：深底細框（次要動作） */
  variant?: 'solid' | 'outline'
  size?: 'md' | 'lg'
  arrow?: boolean
  className?: string
}

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href)

/** 膠囊按鈕。內部路徑走 next/link，http(s) 另開新分頁，mailto 直接開信 */
export function NeonButton({
  href,
  children,
  variant = 'solid',
  size = 'md',
  arrow = true,
  className,
}: NeonButtonProps) {
  const classes = cn(
    'group inline-flex items-center justify-between gap-3 rounded-full font-bold transition-colors',
    size === 'lg' ? 'px-6 py-4 text-lg' : 'px-5 py-2.5 text-sm',
    variant === 'solid'
      ? 'bg-brand text-on-brand hover:bg-fg hover:text-canvas'
      : 'border border-line text-fg hover:border-highlight hover:text-highlight',
    className,
  )
  const icon = arrow && (
    <ArrowUpRight aria-hidden className="size-[1.15em] shrink-0 transition-transform group-hover:rotate-45" />
  )

  if (isExternal(href)) {
    const newTab = href.startsWith('http')
    return (
      <a href={href} className={classes} {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })}>
        {children}
        {newTab && <span className="sr-only">（另開新視窗）</span>}
        {icon}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  )
}
