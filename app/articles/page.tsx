import type { Metadata } from 'next'
import { ArticleCard } from '@/components/ArticleCard'
import { NeonButton } from '@/components/NeonButton'
import { SectionHeading } from '@/components/SectionHeading'
import { getSocial } from '@/config/site'
import { getAllArticles } from '@/lib/content/articles'

export const metadata: Metadata = {
  title: '文章',
  description: '洪睦荃的技術文章與筆記，包含 Medium 上的完整系列。',
}

export default function ArticlesPage() {
  const articles = getAllArticles()

  return (
    <div className="wrap pt-24 md:pt-32">
      <SectionHeading
        as="h1"
        eyebrow={`NOTES / 寫作 · ${String(articles.length).padStart(2, '0')} ARTICLES`}
        title="寫下來，"
        highlight="才算真的想過。"
        action={
          <NeonButton href={getSocial('Medium').href} variant="outline">
            Medium 全部文章
          </NeonButton>
        }
      />
      <div className="border-t border-line">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} headingLevel="h2" />
        ))}
      </div>
    </div>
  )
}
