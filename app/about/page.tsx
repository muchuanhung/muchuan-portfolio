import type { Metadata } from 'next'
import { NeonButton } from '@/components/NeonButton'
import { SectionHeading } from '@/components/SectionHeading'
import { EmailIcon, siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: '關於我',
  description: `${siteConfig.name} ${siteConfig.nameEn}，${siteConfig.location} 的 ${siteConfig.role}。`,
}

function Eyebrow({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="text-xs font-bold tracking-[.13em] text-muted">
      {children}
    </h2>
  )
}

export default function AboutPage() {
  return (
    <div className="wrap pt-24 md:pt-32">
      <SectionHeading as="h1" eyebrow="ABOUT / 關於我" title={siteConfig.name} highlight={siteConfig.nameEn} />

      {/* 左：簡介 + 聯絡／右：履歷下載（桌機左右並排，手機直排） */}
      <div className="grid gap-14 border-t border-line pt-10 md:grid-cols-[1fr_1.4fr]">
        <div className="text-lg leading-relaxed text-muted">
          <p>
            <strong className="text-fg">{siteConfig.role}</strong> · {siteConfig.location}
          </p>
          <p className="mt-4">
            從視覺特效轉進前端，擅長把設計理念變成可落地又好維護的產品，並持續把 AI 帶進開發流程。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <NeonButton href={`mailto:${siteConfig.email}`} icon={EmailIcon}>
              寫信給我
            </NeonButton>
            {siteConfig.socials.map((social) => (
              <NeonButton key={social.label} href={social.href} icon={social.icon} variant="outline">
                {social.label}
              </NeonButton>
            ))}
          </div>
        </div>

        <section aria-labelledby="resume-heading">
          <Eyebrow id="resume-heading">RESUME / 履歷</Eyebrow>
          <div className="mt-4 border-t border-line pt-6">
            <p className="text-lg leading-relaxed text-muted">經歷、專案與技能都整理在履歷裡，歡迎下載。</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {siteConfig.resumes.map((resume, i) => (
                <NeonButton key={resume.href} href={resume.href} download variant={i === 0 ? 'solid' : 'outline'}>
                  {resume.label}
                </NeonButton>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 延伸連結 */}
      <section aria-labelledby="links-heading" className="mt-24">
        <Eyebrow id="links-heading">MORE / 延伸連結</Eyebrow>
        <div className="mt-4 flex flex-wrap gap-3 border-t border-line pt-6">
          {siteConfig.links.map((link) => (
            <NeonButton key={link.href} href={link.href} variant="outline">
              {link.label}
            </NeonButton>
          ))}
        </div>
      </section>
    </div>
  )
}
