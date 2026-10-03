import { defineConfig } from 'vitepress'

// The forum (separate repository / separate Vercel project) reverse-proxies
// https://nyuforum.com/docs/* to this project, and this project also serves its
// own Vercel domain at /docs/. `base` therefore has to be the public path
// prefix, not '/'.
//
// FORUM_URL is only used for the "Forum" nav entry that points back at the
// main site. It can be overridden with the FORUM_URL environment variable.
const forumUrl = process.env.FORUM_URL || 'https://nyuforum.com'

export default defineConfig({
  base: '/docs/',
  title: 'NYU Forum Wiki',
  description: '面向中文学生的社区、海外学习与科研指南。',
  lang: 'zh-CN',
  vite: {
    server: { port: 5174, strictPort: true },
  },

  // Emit `/guide/getting-started` instead of `/guide/getting-started.html`.
  // Vercel is configured for this in vercel.json ("cleanUrls": true).
  cleanUrls: true,

  // Nest the built site inside a `docs/` folder of the output directory.
  // The Vercel project publishes `docs/.vitepress/dist`, so the site is served
  // at /docs/... natively by the static file system, on this project's own
  // domain (including preview deployments) *and* through the forum's proxy,
  // without needing any path rewriting in vercel.json. This keeps both sides
  // byte-for-byte identical: every URL under /docs/ means the same thing here
  // and on https://nyuforum.com/docs/.
  outDir: './.vitepress/dist/docs',

  // Fail the build on broken internal links so the docs cannot silently rot.
  ignoreDeadLinks: false,

  themeConfig: {
    nav: [
      { text: 'Wiki 导览', link: '/guide/' },
      { text: '认识吉祥物', link: '/guide/mascot' },
      { text: '认识 Forum', link: '/guide/forum' },
      { text: '海外学习', link: '/study-away/new-york' },
      { text: '寻找科研', link: '/research/getting-started' },
      { text: '进入 Forum', link: forumUrl },
    ],

    sidebar: [
      {
        text: '社区与入学',
        items: [
          { text: 'Wiki 导览', link: '/guide/' },
          { text: '新生入门', link: '/guide/getting-started' },
          { text: '认识 Forum', link: '/guide/forum' },
          { text: '认识吉祥物', link: '/guide/mascot' },
        ],
      },
      {
        text: '学习与探索',
        items: [
          { text: '纽约海外学习', link: '/study-away/new-york' },
          { text: '寻找科研机会', link: '/research/getting-started' },
        ],
      },
    ],

    outline: { level: [2, 3], label: '本页目录' },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索', buttonAriaLabel: '搜索文档' },
          modal: {
            displayDetails: '显示详细结果',
            resetButtonTitle: '清空搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到结果：',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车',
              navigateText: '切换结果',
              navigateUpKeyAriaLabel: '上方向键',
              navigateDownKeyAriaLabel: '下方向键',
              closeText: '关闭',
              closeKeyAriaLabel: '退出键',
            },
          },
        },
      },
    },
    docFooter: { prev: '上一页', next: '下一页' },
    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    skipToContentLabel: '跳转到正文',
    notFound: {
      title: '页面未找到',
      quote: '这个页面可能已移动，试试返回首页或使用搜索。',
      linkText: '返回首页',
      linkLabel: '返回首页',
    },
    socialLinks: [],
    footer: {
      message: 'NYU Forum · 与 CSSA 合作面向华人同学',
    },
  },
})
