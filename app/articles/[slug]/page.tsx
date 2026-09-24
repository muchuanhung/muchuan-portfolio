import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { MdxContent } from '@/components/MdxContent'
import { NeonButton } from '@/components/NeonButton'
import { TagList } from '@/components/Tag'
import { getAllArticles, getArticleBySlug } from '@/lib/content/articles'
import { formatDate, getExternalSourceName } from '@/lib/format'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug((await params).slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
    // 外連文章以原文為準，避免重複內容
    alternates: article.externalUrl ? { canonical: article.externalUrl } : undefined,
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticleBySlug((await params).slug)
  if (!article) notFound()

  const source = article.externalUrl ? getExternalSourceName(article.externalUrl) : null

  return (
    <article className="wrap pt-20 md:pt-28">
      <Link href="/articles" className="inline-flex items-center gap-2 text-sm text-muted hover:text-highlight">
        <ArrowLeft aria-hidden className="size-4" /> 所有文章
      </Link>

      <header className="mt-10 max-w-4xl">
        <p className="text-xs font-bold tracking-[.13em] text-muted">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          {source && ` · 發表於 ${source}`}
        </p>
        <h1 className="mt-4 text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.08] font-black tracking-[-0.03em]">{article.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">{article.excerpt}</p>
        <div className="mt-6">
          <TagList tags={article.tags} />
        </div>

        {article.externalUrl && (
          <NeonButton href={article.externalUrl} size="lg" className="mt-10">
            前往 {source} 閱讀全文
          </NeonButton>
        )}
      </header>

      {article.body && (
        <div className="mt-14 border-t border-line pt-10">
          {article.externalUrl && <h2 className="text-xs font-bold tracking-[.13em] text-muted">文章大綱</h2>}
          <MdxContent source={article.body} />
        </div>
      )}
    </article>
  )
}
