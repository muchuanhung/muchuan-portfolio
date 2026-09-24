export type SocialLink = { label: string; href: string }
export type Experience = { org: string; focus?: string }

export const siteConfig = {
  name: '洪睦筌',
  nameEn: 'MuChuan Hung',
  shortName: 'MCH',
  role: 'Frontend Engineer',
  location: 'Taipei',
  url: 'https://muchuan-portfolio.vercel.app',
  description: '洪睦筌 MuChuan Hung，台北的 Frontend Engineer。用 Next.js、React 與 AI 把複雜的事做得清楚又好用。',
  email: 'mu.chuan.hung@gmail.com',

  socials: [
    { label: 'GitHub', href: 'https://github.com/muchuanhung' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muchuanhung/' },
    { label: 'Medium', href: 'https://mu-chuan-hung.medium.com/' },
  ] satisfies SocialLink[],

  /** 由近到遠 */
  experience: [
    { org: '千享國際', focus: 'Next.js' },
    { org: '自僱', focus: 'Swift' },
    { org: 'SYSTEX', focus: 'React / React Native / CI' },
    { org: 'MegaMount' },
    { org: 'ALPHA Camp' },
  ] satisfies Experience[],

  background: 'VFS 視覺特效背景',

  nav: [
    { label: '作品', href: '/projects' },
    { label: '文章', href: '/articles' },
    { label: '關於我', href: '/about' },
  ],
} as const

export function getSocial(label: 'GitHub' | 'LinkedIn' | 'Medium') {
  return siteConfig.socials.find((s) => s.label === label)!
}
