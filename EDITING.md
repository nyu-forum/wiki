# 如何维护 Wiki 内容

Wiki 是独立的 VitePress 静态站点。页面正文写在 `docs/` 下的 Markdown 文件中，导航、站点语言和搜索界面文案写在 `docs/.vitepress/config.mts` 中。

## 修改页面

| 内容 | 源文件 |
| --- | --- |
| 首页 | `docs/index.md` |
| Wiki 导览 | `docs/guide/index.md` |
| 新生入门 | `docs/guide/getting-started.md` |
| Forum 介绍 | `docs/guide/forum.md` |
| 吉祥物介绍 | `docs/guide/mascot.md` |
| 纽约海外学习 | `docs/study-away/new-york.md` |
| 科研入门 | `docs/research/getting-started.md` |
| 导航与站点设置 | `docs/.vitepress/config.mts` |

吉祥物正面图和表情图放在 `docs/public/`；Forum 的 Docs 图标位于相邻项目的 `src/components/DocsIcon.vue`，匿名头像位于 `public/anonymous-avatar.png`。

编辑对应文件并保存。新增页面时，在 `docs/` 下添加 `.md` 文件，再按需把页面路径加到 `config.mts` 的 `nav` 和 `sidebar`。站内链接使用以 `/` 开头的 Wiki 路径，例如 `/study-away/new-york`。

在 `wiki/` 目录运行 `npm run docs:dev` 可本地预览，运行 `npm run docs:build` 可检查构建和站内链接。提交 Wiki 代码并重新运行 **Forum 前端发布流程** 后，线上页面才会更新；仅修改本地文件或 Google 文档不会更新已生成的 Wiki 页面。

## 内容上线后在哪里

- **可编辑的正文源文件：**保存在 Wiki 的 Git 仓库中，即本目录的 `docs/*.md` 等文件。
- **访客看到的页面：**构建时由 VitePress 从 Markdown 生成静态 HTML、JavaScript 和搜索索引，输出到 `docs/.vitepress/dist/docs/`。Forum 的发布流程构建 Wiki，并把产物放到主站的 `dist/docs/` 一起部署。
- **主站入口：**Forum 主站的 `/docs/` 直接读取这些静态文件；主站没有保存 Wiki 正文，也没有为 Wiki 配置内容数据库。
- **外部 Google 文档：**原文仍保存在 Google Drive。Wiki 当前只保存人工整理的摘要和指向原文的链接，没有实时同步。修改 Google 文档会改变读者打开原文时看到的内容，但不会自动改变 Wiki 上的摘要；摘要需要编辑 Markdown 并重新部署。读者是否能打开原文取决于该文档的共享权限。

线上部署由相邻 Forum 项目的 `.github/workflows/deploy-frontend.yml` 负责。修改 Wiki 后，需等待下一次 Forum 发布，或手动触发该工作流。
