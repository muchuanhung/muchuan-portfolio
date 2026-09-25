import Link from 'next/link'
import { ArrowDownToLine, ArrowUpRight } from 'lucide-react'
import type { IconType } from 'react-icons'
import { cn } from '@/lib/utils'

type NeonButtonProps = {
  href: string
  children: React.ReactNode
  /** solid：橘底黑字（主要動作）；outline：深底細框（次要動作） */
  variant?: 'solid' | 'outline'
  size?: 'md' | 'lg'
  arrow?: boolean
  /** 文字前的圖示（例如社群 logo） */
  icon?: IconType
  /** 下載檔案（例如 public/ 底下的 PDF）：改用一般 <a download>，圖示換成下載箭頭；傳字串可指定下載檔名 */
  download?: boolean | string
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
  icon: Icon,
  download,
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
  const arrowIcon = arrow && (
    <ArrowUpRight aria-hidden className="size-[1.15em] shrink-0 transition-transform group-hover:rotate-45" />
  )
  const label = Icon ? (
    <span className="inline-flex items-center gap-2">
      <Icon aria-hidden className="size-[1.1em] shrink-0" />
      {children}
    </span>
  ) : (
    children
  )

  if (download) {
    return (
      <a href={href} download={download === true ? '' : download} className={classes}>
        {label}
        {arrow && <ArrowDownToLine aria-hidden className="size-[1.15em] shrink-0" />}
      </a>
    )
  }

  if (isExternal(href)) {
    const newTab = href.startsWith('http')
    return (
      <a href={href} className={classes} {...(newTab && { target: '_blank', rel: 'noopener noreferrer' })}>
        {label}
        {newTab && <span className="sr-only">（另開新視窗）</span>}
        {arrowIcon}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {label}
      {arrowIcon}
    </Link>
  )
}
