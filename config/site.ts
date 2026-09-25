import type { IconType } from 'react-icons'
import { FaEnvelope, FaGithub, FaLinkedin, FaMedium } from 'react-icons/fa6'

export type SocialLink = { label: string; href: string; icon?: IconType }

/** 「寫信給我」按鈕用的圖示 */
export const EmailIcon = FaEnvelope
export type Experience = {
  title: string
  org: string
  location?: string
  highlights: string[]
  tags?: string[]
}
export type Education = { school: string; program: string; period: string }
export type Certification = { name: string; issuer?: string }
export type Language = { name: string; level: string }
export type SkillGroup = { label: string; items: string[] }

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
    { label: 'GitHub', href: 'https://github.com/muchuanhung', icon: FaGithub },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muchuanhung/', icon: FaLinkedin },
    { label: 'Medium', href: 'https://mu-chuan-hung.medium.com/', icon: FaMedium },
  ] satisfies SocialLink[],

  /** 工作經歷，由近到遠（刻意不放日期） */
  experience: [
    {
      title: '前端工程師',
      org: '方睿科技',
      location: '台北',
      highlights: [],
    },
    {
      title: '前端工程師',
      org: '千享國際',
      location: '台北',
      highlights: [
        '依業務場景規劃 React + Next.js 的 CSR / SSR 架構，優化頁面載入速度與 SEO',
        '處理跨頁資料預載、動態路由與懶加載，與後端、設計師密切協作',
        '以 Figma MCP 搭配 IDE，將設計稿高效轉為可維護的程式碼',
      ],
      tags: ['Next.js', 'React', 'SSR', 'MCP'],
    },
    {
      title: '軟體工程師',
      org: '精誠資訊 SYSTEX',
      location: '台北',
      highlights: [
        '將資安平台（Django + JS）以 React 前後端分離重構，建立共用元件降低開發成本',
        '以 React Native 將 Web 專案遷移為 App：Redux / Context 狀態管理、生物辨識登入，完成 TestFlight 與 App Store 上架',
        '評估 legacy code 並提出重構策略；以 GitHub Actions、Docker、SonarQube 建立 CI/CD 與靜態分析',
      ],
      tags: ['React', 'React Native', 'Redux', 'CI/CD'],
    },
    {
      title: '網頁設計師',
      org: '百岳國際',
      location: '台北',
      highlights: ['Vue 串接 API、Bootstrap RWD 切版與 BEM 命名', '維護既有專案、GitHub 協作與解衝突'],
      tags: ['Vue', 'Bootstrap'],
    },
    {
      title: '3D Artist',
      org: 'The Monk Studio',
      location: '泰國',
      highlights: ['以 Nuke、Katana 進行燈光與合成', '製作環境場景 3D 資產，以 After Effects 剪輯影片'],
      tags: ['Nuke', 'Katana', 'After Effects'],
    },
  ] satisfies Experience[],

  education: [
    { school: 'Vancouver Film School（加拿大）', program: '3D Animation & Visual Effects', period: '2017 – 2019' },
  ] satisfies Education[],

  certifications: [
    { name: 'AI 應用規劃師（初級）', issuer: 'iPAS 經濟部產業人才能力鑑定' },
    { name: 'TOEIC 675' },
    { name: 'TOEFL 85' },
  ] satisfies Certification[],

  languages: [
    { name: '中文', level: '母語' },
    { name: '英文', level: '精通' },
    { name: '台語', level: '中等' },
    { name: '日文', level: '略懂' },
  ] satisfies Language[],

  skills: [
    { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'React Native', 'Tailwind CSS', 'SCSS', 'Redux'] },
    { label: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'Firebase'] },
    { label: 'Tools & Design', items: ['Git', 'GitHub Actions', 'Docker', 'Figma', 'Photoshop', 'Illustrator', 'After Effects'] },
  ] satisfies SkillGroup[],

  /** 履歷下載（檔案放在 public/resume/，換新版只要覆蓋檔案） */
  resumes: [
    { label: '下載履歷（中文）', href: '/resume/muchuan-hung-resume-zh.pdf' },
    { label: 'Resume (English)', href: '/resume/muchuan-hung-resume-en.pdf' },
  ] satisfies SocialLink[],

  /** 關於我頁的延伸連結（社群以外） */
  links: [
    { label: '3D 作品集', href: 'https://muchuanhung.portfoliobox.net/3d-e9dn' },
    { label: 'Demo Reel', href: 'https://vimeo.com/335639852' },
  ] satisfies SocialLink[],

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
