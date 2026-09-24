import { siteConfig } from '@/config/site'

export function SiteFooter() {
  return (
    <footer className="wrap mt-24 border-t border-line py-6 text-xs text-muted">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <span>
          {siteConfig.name} / {siteConfig.nameEn}
        </span>
        <ul className="flex gap-5" aria-label="社群連結">
          {siteConfig.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-highlight"
              >
                {social.label}
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
