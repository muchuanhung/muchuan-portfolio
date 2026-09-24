'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { useTheme } from 'next-themes'
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

/**
 * 圖示由 .dark class 以 CSS 切換，SSR 與 client 輸出一致，不會 hydration mismatch。
 * 手機選單內顯示「圖示 + 文字」一整列，桌機只顯示圓形圖示按鈕。
 */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={cn(
        'flex w-full items-center gap-2 rounded-full px-4 py-3 text-muted transition-colors hover:bg-surface-2 hover:text-highlight',
        'md:grid md:size-10 md:shrink-0 md:place-items-center md:border md:border-line md:p-0 md:text-fg md:hover:border-highlight md:hover:bg-transparent',
      )}
    >
      <Moon aria-hidden className="size-4 dark:hidden" />
      <Sun aria-hidden className="hidden size-4 dark:block" />
      <span className="md:sr-only">切換深色／淺色模式</span>
    </button>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-3 z-30 mx-auto mt-3 w-[min(1240px,calc(100%-24px))] md:top-4 md:mt-4">
      <nav
        aria-label="主選單"
        className="relative flex items-center justify-between gap-2 rounded-full border border-line bg-surface/90 py-2.5 pr-2.5 pl-5 backdrop-blur-lg"
      >
        <Link href="/" onClick={close} className="flex items-center gap-2.5 text-sm font-extrabold tracking-tight">
          <span aria-hidden className="size-2.5 rounded-full bg-brand shadow-[0_0_12px_var(--color-brand)]" />
          {siteConfig.shortName} / {siteConfig.name}
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full md:hidden"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
            <span className="sr-only">{open ? '關閉選單' : '開啟選單'}</span>
          </button>

          <ul
            id="site-menu"
            className={cn(
              'absolute inset-x-0 top-[calc(100%+8px)] flex-col gap-1 rounded-3xl border border-line bg-surface p-2.5 text-sm',
              'md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0',
              open ? 'flex' : 'hidden',
            )}
          >
            {siteConfig.nav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'block rounded-full px-4 py-3 transition-colors md:py-2',
                      active ? 'bg-surface-2 text-fg' : 'text-muted hover:bg-surface-2 hover:text-fg',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
            <li>
              <ThemeToggle />
            </li>
            <li>
              <Link
                href="/#contact"
                onClick={close}
                className="flex items-center justify-between gap-1.5 rounded-full bg-brand px-4 py-3 font-extrabold text-on-brand transition-colors hover:bg-fg hover:text-canvas md:py-2"
              >
                聯絡我 <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}
