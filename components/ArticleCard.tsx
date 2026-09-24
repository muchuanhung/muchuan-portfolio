import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { ArticleSummary } from '@/lib/content/types'
import { formatDate, getExternalSourceName } from '@/lib/format'
import { cn } from '@/lib/utils'
import { TagList } from './Tag'

type ArticleCardProps = {
  article: ArticleSummary
  headingLevel?: 'h2' | 'h3'
}

/** 文章列表的一列。一律連到站內詳情頁，外連文章在詳情頁再導去原平台 */
export function ArticleCard({ article, headingLevel: Heading = 'h3' }: ArticleCardProps) {
  const source = article.externalUrl ? getExternalSourceName(article.externalUrl) : null

  return (
    <article
      className={cn(
        'group relative grid gap-3 border-b border-line py-8 transition-[padding] md:grid-cols-[150px_1fr_32px] md:gap-6 md:hover:pl-3',
        'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-highlight',
      )}
    >
      <time dateTime={article.publishedAt} className="text-sm text-muted tabular-nums">
        {formatDate(article.publishedAt)}
      </time>
      <div>
        <Heading className="text-xl font-bold tracking-tight md:text-2xl">
          <Link
            href={`/articles/${article.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {article.title}
          </Link>
          {source && (
            <span className="ml-2 align-middle text-[11px] font-bold tracking-widest whitespace-nowrap text-highlight uppercase">
              {source} ↗
            </span>
          )}
        </Heading>
        <p className="mt-2 mb-4 leading-relaxed text-muted">{article.excerpt}</p>
        <TagList tags={article.tags} />
      </div>
      <ArrowUpRight aria-hidden className="hidden size-7 text-highlight transition-transform group-hover:rotate-45 md:block" />
    </article>
  )
}
