# muchuan-portfolio

洪睦筌 / MuChuan Hung 的個人站。

- 線上：https://muchuan-portfolio.vercel.app

## 開發

需要 Node.js **20.9 以上**（`.nvmrc` 指定 22）與 pnpm。

```bash
nvm use          # 讀 .nvmrc
pnpm install
pnpm dev         # http://localhost:3000
pnpm build       # 正式建置（含 TypeScript 檢查）
```

## 資料夾結構

```
app/
  page.tsx                 首頁（只顯示 featured 的作品與文章）
  projects/page.tsx        作品列表（分類 + 標籤篩選）
  projects/[slug]/page.tsx 作品詳情
  articles/page.tsx        文章列表
  articles/[slug]/page.tsx 文章詳情（有 externalUrl 時以「前往 Medium」為主）
  about/page.tsx           關於我
components/                ProjectCard、ArticleCard、FilterChips、Tag、NeonButton…
config/site.ts             個人資料、社群連結、經歷、導覽列
content/
  projects/*.mdx           一個檔案 = 一個作品
  articles/*.mdx           一個檔案 = 一篇文章
lib/content/               讀取與驗證 content 的函式與型別
```

## 新增作品

1. 在 `content/projects/` 新增 `<slug>.mdx`，**檔名就是網址**（`my-app.mdx` → `/projects/my-app`）。
2. 填 frontmatter，下方寫 MDX 內文：

```mdx
---
title: My App
summary: 一兩句話說明這個專案做什麼、你負責什麼。
category: Web App            # 分類篩選用，新值會自動出現在篩選列
role: 全端開發               # 選填，顯示在詳情頁側欄
tags: ["Next.js", "AI"]      # 標籤篩選用
stack: ["Next.js", "TypeScript", "Tailwind CSS"]
links:
  demo: https://example.com  # 選填
  github: https://github.com/muchuanhung/my-app  # 選填
cover: /projects/my-app.png  # 選填，圖片放 public/projects/；沒有就顯示色塊封面
mark: ☼                      # 選填，色塊中間的大符號；不填會自動分配且不重複（最多 7 種）
tone: violet                 # 選填，色塊底色 brand / invert / violet / coral；不填依順序輪流
featured: true               # 選填，true 才會出現在首頁
publishedAt: 2026-09-24      # YYYY-MM-DD，列表依此由新到舊排序
---

## 專案概要

這裡是詳情頁內文，支援 Markdown / MDX。
```

3. 存檔即完成。列表、篩選選項、首頁精選、靜態路由都會自動更新。

## 新增文章

在 `content/articles/` 新增 `<slug>.mdx`。

**外連 Medium（只寫 frontmatter 就好）：**

```mdx
---
title: 文章標題
excerpt: 一兩句摘要，會顯示在列表與詳情頁。
tags: ["React", "Next.js"]
featured: true               # 選填，true 才會出現在首頁
publishedAt: 2026-09-24
externalUrl: https://mu-chuan-hung.medium.com/xxxx   # 去掉 ?source=... 參數
---

- 選填：這裡寫的內容會以「文章大綱」顯示在詳情頁
```

**站內文章：** 不填 `externalUrl`，在 frontmatter 下方寫完整 MDX 內文即可（沒有 `externalUrl` 時內文必填）。

## 規則與小技巧

- 檔名以 `_` 開頭（例如 `_draft.mdx`）會被略過，可以拿來放草稿。
- frontmatter 缺欄位或型別錯誤時，`pnpm build` 會直接失敗並指出是哪個檔案的哪個欄位。
- 內文目前沒有開 GFM 表格（沒裝 `remark-gfm`），需要表格時請改用清單，或另外加 plugin。
- 可用的工具函式在 `lib/content/projects.ts`、`lib/content/articles.ts`：
  `getAllProjects`、`getProjectBySlug`、`getProjectsByTag`、`getFeaturedProjects`、`getAllProjectTags`、`getAllProjectCategories`、`getRelatedProjects`、
  `getAllArticles`、`getArticleBySlug`、`getArticlesByTag`、`getFeaturedArticles`、`getAllArticleTags`。

## 色彩與無障礙

支援亮／暗主題（`next-themes`，預設跟隨系統，右上角可切換）。色票定義在 `app/globals.css`：`:root` 是亮色、`.dark` 是暗色，再透過 `@theme inline` 對應成 Tailwind class。

| Token | 用途 | Light | Dark |
| --- | --- | --- | --- |
| `canvas` | 頁面底色 | `#F4F1EB` | `#12100E` |
| `surface` / `surface-2` | 卡片、選單底色 | `#FFFDF8` / `#ECE6DD` | `#1C1815` / `#26201B` |
| `fg` | 主要文字 | `#211C18` | `#F4F1EB` |
| `muted` | 次要文字 | `#706962` | `#B3A9A0` |
| `line` | 邊框 | `#D8D0C7` | `#3A3029` |
| `highlight` | **橘色字**、icon、框線、focus 外框 | `#FF7A1A` | `#FF7A1A` |
| `brand` | **橘色底**（按鈕、chip） | `#FF7A1A` | `#FF7A1A` |
| `on-brand` | 橘色底上的文字 | `#241208` | `#241208` |

- 主題色 `#FF7A1A` 在兩種主題統一。這是設計決策：亮色模式的橘字對比只有 2.31:1，不追求 WCAG AA。
- 橘色字用 `text-highlight`；橘色底用 `bg-brand`，上面的字一律配 `text-on-brand`（6.91:1）。
