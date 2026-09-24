import type { Metadata } from 'next'
import { NeonButton } from '@/components/NeonButton'
import { SectionHeading } from '@/components/SectionHeading'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: '關於我',
  description: `${siteConfig.name} ${siteConfig.nameEn}，${siteConfig.location} 的 ${siteConfig.role}。`,
}

export default function AboutPage() {
  return (
    <div className="wrap pt-24 md:pt-32">
      <SectionHeading as="h1" eyebrow="ABOUT / 關於我" title={siteConfig.name} highlight={siteConfig.nameEn} />

      <div className="grid gap-14 border-t border-line pt-10 md:grid-cols-[1fr_1.4fr]">
        <div className="text-lg leading-relaxed text-muted">
          <p>
            <strong className="text-fg">{siteConfig.role}</strong> · {siteConfig.location}
          </p>
          <p className="mt-4">
            從 {siteConfig.background}走進前端，習慣先想清楚畫面與體驗，再用 Next.js、React 與 AI 工具把它做出來。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <NeonButton href={`mailto:${siteConfig.email}`}>寫信給我</NeonButton>
            {siteConfig.socials.map((social) => (
              <NeonButton key={social.label} href={social.href} variant="outline">
                {social.label}
              </NeonButton>
            ))}
          </div>
        </div>

        <section aria-labelledby="experience-heading">
          <h2 id="experience-heading" className="text-xs font-bold tracking-[.13em] text-muted">
            EXPERIENCE / 經歷
          </h2>
          <ol className="mt-4 border-t border-line">
            {siteConfig.experience.map((item) => (
              <li key={item.org} className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line py-5">
                <span className="text-2xl font-black tracking-tight">{item.org}</span>
                {'focus' in item && <span className="text-sm text-muted">{item.focus}</span>}
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">背景：{siteConfig.background}</p>
        </section>
      </div>
    </div>
  )
}
