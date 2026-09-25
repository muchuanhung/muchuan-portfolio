export type ProjectLinks = {
  demo?: string
  github?: string
}

/** 色塊封面的底色：brand 橘／invert 反色／violet 紫／coral 珊瑚橘 */
export const PROJECT_TONES = ['brand', 'invert', 'violet', 'coral'] as const
export type ProjectTone = (typeof PROJECT_TONES)[number]

export type Project = {
  slug: string
  title: string
  summary: string
  /** 圖片路徑（放在 public/ 底下，例如 /projects/weather-board.png）；沒有就顯示色塊封面 */
  cover?: string
  /** 色塊封面中間的大符號。frontmatter 可選填；沒填時由 content layer 自動分配且不重複 */
  mark: string
  /** 色塊封面底色；不填則依卡片順序輪流 */
  tone?: ProjectTone
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
