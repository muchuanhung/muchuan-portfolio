import Link from 'next/link'
import { ArticleCard } from '@/components/ArticleCard'
import { HeroArt } from '@/components/HeroArt'
import { NeonButton } from '@/components/NeonButton'
import { ProjectCard } from '@/components/ProjectCard'
import { SectionHeading } from '@/components/SectionHeading'
import { EmailIcon, getSocial, siteConfig } from '@/config/site'
import { getFeaturedArticles } from '@/lib/content/articles'
import { getFeaturedProjects, toProjectSummary } from '@/lib/content/projects'

/** Medium RSS ISR；必須是字面量數字，Next 才能靜態分析 segment config */
export const revalidate = 3600

const marqueeItems = ['FRONTEND ENGINEER', 'NEXT.JS / REACT', 'REACT NATIVE', 'AI WORKFLOW', 'TAIPEI']

export default async function HomePage() {
  const projects = getFeaturedProjects().map(toProjectSummary)
  const articles = await getFeaturedArticles()

  return (
    <>
      {/* Hero */}
      <section className="wrap flex flex-col gap-8 pt-28 pb-16 md:gap-9 md:pt-36">
        <p className="flex items-center gap-2.5 text-xs font-bold tracking-[.13em] text-muted">
          <span aria-hidden className="size-2.5 rounded-full bg-brand shadow-[0_0_12px_var(--color-brand)]" />
          {siteConfig.role.toUpperCase()} · {siteConfig.location.toUpperCase()}
        </p>
        <div className="grid flex-1 items-center gap-12 md:grid-cols-[minmax(0,1.08fr)_minmax(min(100%,390px),0.92fr)] md:gap-[clamp(40px,8vw,120px)]">
          <div className="@container flex w-full min-w-0 flex-col items-start">
            <h1 className="text-[clamp(3.25rem,min(12vw,18cqi),6.75rem)] leading-[0.92] font-black tracking-[-0.06em]">
              把想法
              <br />
              <span className="text-highlight">做成真的。</span>
            </h1>
            <p className="mt-9 text-base leading-relaxed text-muted md:text-lg">
              我是{siteConfig.name}，熱愛騎公路車的
              <br />
              <strong className="text-fg">{siteConfig.role}</strong>。
              <br />
              專注在把需求，變成可落地實現的產品。
            </p>
            <NeonButton href="#work" className="mt-7">
              看看我的作品
            </NeonButton>
          </div>
          <HeroArt />
        </div>
      </section>

      {/* Marquee（純裝飾） */}
      <div aria-hidden className="overflow-hidden border-y border-line py-4 text-sm font-extrabold tracking-wide whitespace-nowrap text-muted">
        <div className="flex w-max animate-marquee">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex">
              {marqueeItems.map((item) => (
                <span key={item} className="flex items-center">
                  {item}
                  <span className="mx-8 text-highlight">✳</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Featured projects */}
      <section id="work" className="wrap scroll-mt-24 py-24 md:py-36">
        <SectionHeading
          eyebrow="SELECTED WORK / 精選作品"
          title="做過一些"
          highlight="有意思的事。"
          action={
            <NeonButton href="/projects" variant="outline">
              看全部作品
            </NeonButton>
          }
        />
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* About strip */}
      <section className="wrap grid gap-8 border-t border-line pt-8 pb-20 md:grid-cols-[1fr_2fr_1fr]">
        <p className="text-3xl leading-[0.9] font-black tracking-tighter text-highlight">
          {siteConfig.shortName}
          <br />
          <span className="text-xs font-normal tracking-normal text-muted">台北・台灣</span>
        </p>
        <div>
          <h2 className="text-xs font-bold tracking-[.13em] text-muted">A LITTLE ABOUT ME / 關於我</h2>
          <p className="mt-4 text-[clamp(1.6rem,3vw,2.75rem)] leading-tight font-extrabold tracking-tight">
            我相信好的介面不需要解釋太多。讓技術退到後面，讓人專心把事情做好。
          </p>
        </div>
        <div className="text-sm leading-relaxed text-muted md:justify-self-end">
          <p>
            目前在做
            <br />
            <strong className="text-fg">Web · Mobile · AI</strong>
          </p>
          <Link href="/about" className="mt-4 inline-block border-b border-muted pb-1 text-fg hover:border-highlight hover:text-highlight">
            更多關於我
          </Link>
        </div>
      </section>

      {/* Featured articles */}
      <section className="wrap py-24 md:py-32">
        <SectionHeading
          eyebrow="NOTES / 寫作"
          title="寫下來，"
          highlight="才算真的想過。"
          action={
            <NeonButton href="/articles" variant="outline">
              看全部文章
            </NeonButton>
          }
        />
        <div className="border-t border-line">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="wrap scroll-mt-24 pt-24 md:pt-36">
        <p className="text-xs font-bold tracking-[.13em] text-muted">HAVE A PROJECT IN MIND? / 聯絡</p>
        <h2 className="my-12 text-[clamp(3.5rem,11vw,10rem)] leading-[0.95] font-black tracking-[-0.05em]">
          一起做點
          <br />
          <span className="text-highlight">有趣的事。</span>
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <NeonButton href={`mailto:${siteConfig.email}`} size="lg" icon={EmailIcon} className="sm:min-w-[360px]">
            {siteConfig.email}
          </NeonButton>
          <NeonButton href={getSocial('LinkedIn').href} size="lg" icon={getSocial('LinkedIn').icon} variant="outline">
            LinkedIn
          </NeonButton>
        </div>
      </section>
    </>
  )
}
