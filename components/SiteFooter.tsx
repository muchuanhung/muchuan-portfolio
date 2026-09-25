import { siteConfig } from '@/config/site'

export function SiteFooter() {
  return (
    <footer className="wrap mt-24 border-t border-line py-6 text-xs text-muted">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span>
          {siteConfig.name} / {siteConfig.nameEn}
        </span>
        <ul className="flex gap-5" aria-label="社群連結">
          {siteConfig.socials.map(({ label, href, icon: Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-highlight"
              >
                <Icon aria-hidden className="size-3.5 shrink-0" />
                {label}
                <span className="sr-only">（另開新視窗）</span>
              </a>
            </li>
          ))}
        </ul>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
