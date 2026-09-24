export type ProjectLinks = {
  demo?: string
  github?: string
}

export type Project = {
  slug: string
  title: string
  summary: string
  /** 圖片路徑（放在 public/ 底下，例如 /projects/weather-board.png）；沒有就顯示色塊封面 */
  cover?: string
  tags: string[]
  category: string
  /** 我在這個專案的角色，例如「全端開發」 */
  role?: string
  stack: string[]
  links: ProjectLinks
  featured: boolean
  /** YYYY-MM-DD */
  publishedAt: string
  /** MDX 內文（frontmatter 以下的部分） */
  body: string
}

/** 傳給 client component 用的精簡版，不帶 MDX 內文 */
export type ProjectSummary = Omit<Project, 'body'>

export type Article = {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  featured: boolean
  /** YYYY-MM-DD */
  publishedAt: string
  /** 有值時代表文章本體在外部（例如 Medium），詳情頁以「前往閱讀」為主 */
  externalUrl?: string
  body: string
}

export type ArticleSummary = Omit<Article, 'body'>
