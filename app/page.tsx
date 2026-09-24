'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, BriefcaseBusiness, GitBranch, Mail, Menu, X } from 'lucide-react'

type Category = 'Web' | 'Mobile' | 'AI' | 'Writing-related tool'
type Project = { id: string; title: string; kicker: string; description: string; category: Category; tags: string[]; tone: string; featured?: boolean; role: string; stack: string; year: string }
type Article = { date: string; title: string; excerpt: string; tags: string[]; medium?: boolean }

const projects: Project[] = [
  { id: 'weather-board', title: 'weather-board', kicker: '01 / AI × COMMUNITY', description: '天氣資訊不只是一張圖。把預報、AI 建議和 Discord 社群放在同一個畫面。', category: 'AI', tags: ['Next.js', 'AI helper', 'Discord'], tone: 'lime', featured: true, role: 'Frontend / Product', stack: 'Next.js · TypeScript · AI SDK · Discord API', year: '2024' },
  { id: 'systex-wms', title: 'SYSTEX WMS', kicker: '02 / ENTERPRISE SYSTEM', description: '重整倉儲管理體驗，從 React Web 到 React Native，讓現場操作更直覺。', category: 'Web', tags: ['React', 'React Native', 'Design System'], tone: 'paper', featured: true, role: 'Frontend Engineer', stack: 'React · React Native · TanStack Query', year: '2023' },
  { id: 'mood-log', title: 'mood log', kicker: '03 / MOBILE EXPERIMENT', description: '一個留給自己呼吸的情緒紀錄工具，少一點表格，多一點溫度。', category: 'Mobile', tags: ['React Native', 'UX', 'Prototype'], tone: 'violet', featured: true, role: 'Design & Development', stack: 'React Native · Expo · Figma', year: '2023' },
  { id: 'mcp-figma', title: 'MCP × Figma', kicker: '04 / FIELD NOTES', description: '用 MCP 加速切版工作流：從設計稿到可部署的 Next.js 頁面。', category: 'Writing-related tool', tags: ['MCP', 'Figma', 'Next.js'], tone: 'orange', role: 'Writer / Engineer', stack: 'MCP · Figma · Next.js', year: '2024' },
]

const articles: Article[] = [
  { date: '2024.06.18', title: 'MCP + Figma 切版，Next.js 部署策略', excerpt: '把設計稿變成產品，不只是複製畫面。記錄我如何拆解、驗證，再部署。', tags: ['MCP', 'Figma', 'Next.js'], medium: true },
  { date: '2024.03.02', title: 'React Native 專案裡的那些取捨', excerpt: '在 Web 與 Mobile 之間，怎麼做出一套團隊真的用得起來的元件。', tags: ['React Native', 'System'] },
  { date: '2023.11.12', title: '我如何看待 AI 進入前端工作流', excerpt: '不是把思考外包，而是把時間留給更值得被解決的問題。', tags: ['AI', 'Workflow'] },
]

function Tag({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) { return <span className={`tag ${accent ? 'tag-accent' : ''}`}>{children}</span> }

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  return <button className={`project-card tone-${project.tone}`} onClick={() => onOpen(project)} aria-label={`View ${project.title} project`}>
    <div className="project-visual"><span className="visual-index">{project.kicker}</span><span className="visual-mark">{project.id === 'weather-board' ? '☼' : project.id === 'systex-wms' ? '▦' : project.id === 'mood-log' ? '◒' : '↗'}</span><span className="visual-footer">{project.year} <ArrowUpRight size={16} /></span></div>
    <div className="project-card-copy"><span className="eyebrow">{project.kicker}</span><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div></div>
  </button>
}

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<'All' | Category>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const filteredProjects = useMemo(() => activeCategory === 'All' ? projects : projects.filter((project) => project.category === activeCategory), [activeCategory])

  return <main>
    <nav className="nav"><a href="#top" className="brand"><span className="brand-dot" />MCH / 洪睦荃</a><div className={`nav-links ${menuOpen ? 'is-open' : ''}`}><a href="#work" onClick={() => setMenuOpen(false)}>作品</a><a href="#writing" onClick={() => setMenuOpen(false)}>文章</a><a href="#about" onClick={() => setMenuOpen(false)}>關於我</a><a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>聯絡我 <ArrowUpRight size={15} /></a></div><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button></nav>

    <section className="hero wrap" id="top"><div className="hero-label"><span className="status-dot" />AVAILABLE FOR SELECTED WORK</div><h1>把想法<br /><span>做成真的。</span></h1><div className="hero-bottom"><p className="hero-intro">我是洪睦荃，住在台北的<br /><strong>Frontend Engineer</strong>。<br />專注在把複雜的事，做得清楚又好用。</p><a href="#work" className="circle-arrow" aria-label="Scroll to selected work"><ArrowUpRight /></a></div></section>

    <section className="marquee"><div>FRONTEND ENGINEER <span>✳</span> REACT / NEXT.JS <span>✳</span> PRODUCT THINKING <span>✳</span> FRONTEND ENGINEER <span>✳</span> REACT / NEXT.JS <span>✳</span></div></section>

    <section className="section wrap" id="work"><div className="section-heading"><div><span className="eyebrow">SELECTED WORK / 作品選</span><h2>做過一些<br /><span>有意思的事。</span></h2></div><a href="#all-projects" className="text-link">看全部作品 <ArrowUpRight size={16} /></a></div><div className="featured-grid">{projects.filter((p) => p.featured).map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />)}</div></section>

    <section className="all-projects wrap" id="all-projects"><div className="section-heading compact"><div><span className="eyebrow">ALL PROJECTS / 全部作品</span><h2>每個專案，<span>都是一次練習。</span></h2></div></div><div className="filter-row" role="group" aria-label="Filter projects">{(['All', 'Web', 'Mobile', 'AI', 'Writing-related tool'] as const).map((category) => <button key={category} className={`filter-chip ${activeCategory === category ? 'active' : ''}`} onClick={() => setActiveCategory(category)}>{category === 'All' ? '全部' : category}</button>)}</div><div className="project-grid">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />)}</div>{filteredProjects.length === 0 && <div className="empty-state"><span>∅</span><h3>這個分類還沒有作品。</h3><p>更多正在路上，先去看看其他專案吧。</p></div>}</section>

    <section className="about-strip wrap" id="about"><div className="about-stamp">MCH<br /><span>台北・台灣</span></div><div><span className="eyebrow">A LITTLE ABOUT ME / 關於我</span><p>我相信好的介面不需要解釋太多。<br />讓技術退到後面，讓人專心把事情做好。</p></div><div className="about-aside">目前在做<br /><strong>Web · Mobile · AI</strong></div></section>

    <section className="section writing wrap" id="writing"><div className="section-heading"><div><span className="eyebrow">NOTES / 寫作</span><h2>寫下來，<br /><span>才算真的想過。</span></h2></div><span className="writing-count">03 ARTICLES</span></div><div className="article-list">{articles.map((article) => <a className="article-row" href={article.medium ? 'https://medium.com/' : '#contact'} target={article.medium ? '_blank' : undefined} rel={article.medium ? 'noreferrer' : undefined} key={article.title}><span className="article-date">{article.date}</span><div><h3>{article.title} {article.medium && <span className="medium-badge">MEDIUM ↗</span>}</h3><p>{article.excerpt}</p><div className="tag-row">{article.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div></div><ArrowUpRight className="article-arrow" /></a>)}</div></section>

    <section className="contact wrap" id="contact"><div className="contact-top"><span className="eyebrow">HAVE A PROJECT IN MIND?</span><span className="contact-number">05 / 05</span></div><h2>一起做點<br /><span>有趣的事。</span></h2><a className="contact-button" href="mailto:hello@mchung.dev">hello@mchung.dev <ArrowUpRight /></a><div className="contact-footer"><span>洪睦荃 / MCH</span><div><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><GitBranch /></a><a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness /></a><a href="mailto:hello@mchung.dev" aria-label="Email"><Mail /></a></div><span>© 2024</span></div></section>

    {selectedProject && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}><article className="project-modal" role="dialog" aria-modal="true" aria-label={`${selectedProject.title} details`} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><X /></button><div className={`modal-visual tone-${selectedProject.tone}`}><span>{selectedProject.kicker}</span><strong>{selectedProject.title}</strong></div><div className="modal-content"><span className="eyebrow">PROJECT DETAIL / 專案詳細</span><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="modal-meta"><div><span>ROLE</span><strong>{selectedProject.role}</strong></div><div><span>STACK</span><strong>{selectedProject.stack}</strong></div></div><div className="tag-row">{selectedProject.tags.map((tag) => <Tag key={tag} accent>{tag}</Tag>)}</div><div className="modal-links"><a href="#contact" onClick={() => setSelectedProject(null)}>想聊聊 <ArrowUpRight /></a><a href="https://github.com" target="_blank" rel="noreferrer">GitHub <GitBranch /></a></div></div></article></div>}
  </main>
}

// Content is intentionally kept as arrays above so new projects and articles can be added without changing the page structure.

function noop() { return null }
void noop

