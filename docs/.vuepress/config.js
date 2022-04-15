const pluginsConf = require('./config/pluginsConf.js');
const { readFileList, readTotalFileWords, readEachFileWords } = require('./webSiteInfo/readFile');
module.exports = {
  base: '/', //设置站点根路径
  title: 'xustudyxu\'s Blog',
  description: '一起学习编程!',
  dest: 'docs/.vuepress/dist',
  port: '7777',
  plugins: pluginsConf,
  head: [
    ['link', { rel: 'icon', href: './img/02.png' }],
    ['link', { rel: 'stylesheet', href: './css/style.css' }],
    ['script', { charset: 'utf-8', href: './js/main.js' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['link', { rel: 'stylesheet', href: 'https://at.alicdn.com/t/font_3077305_pt8umhrn4k9.css' }]


  ],
  markdown: {
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4']
  },
  theme: 'vdoing',
  themeConfig: {
    nav: require("./nav.js"),
    sidebar: require("./sidebar.js"),
    sidebarDepth: 0,
    lastUpdated: '上次更新',
    search: true,
    searchMaxSuggestions: 6,
    // algolia: {
    //     apiKey: '685c8fc1740599abf382c782da3717a8',
    //     indexName: 'xustudyxu-blog',
    //     // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
    //     appId: '4YPBTYO9VH',
    // },
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: 'xustudyxu/xustudyxu.github.io',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: 'Github',

    // 以下为可选的编辑链接选项
    // 以下为可选的编辑链接选项

    // // 假如你的文档仓库和项目本身不在一个仓库：
    docsRepo: 'xustudyxu/xustudyxu.github.io',
    // // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // // 默认是 false, 设置为 true 来启用


    serviceWorker: {
      updatePopup: {
        message: "有新的内容.",
        buttonText: '更新'
      }
    },
    editLinks: true,
    editLinkText: '帮助我改善此页面',
    social: {
      // iconfontCssFile: '//at.alicdn.com/t/xxx.css', // 可选，阿里图标库在线css文件地址，对于主题没有的图标可自己添加。阿里图片库：https://www.iconfont.cn/
      icons: [
        {
          iconClass: 'icon-youjian',
          title: '发邮件',
          link: 'mailto:1812903531@qq.com',
        },
        {
          iconClass: 'icon-github',
          title: 'GitHub',
          link: 'https://github.com/xustudyxu',
        },
        {
          iconClass: 'icon-weixin',
          title: '微信',
          link: 'https://frxcat.fun/img/wx.png',
        },
      ],
    },
    author: {
      name: '冯荣旭', // 必需
    },
    // 博主信息 (显示在首页侧边栏)
    blogger: {
      avatar: './img/01.png',
      name: 'xustudyxu',
      slogan: '一起学习编程!',
    },
    footer: {
      createYear: 2021, // 博客创建年份
      copyrightInfo:
        'xustudyxu | <a href="https://beian.miit.gov.cn" target="_blank">豫ICP备2022008983号</a>', // 博客版权信息，支持a标签或换行标签</br>
    },

    // 站点配置（首页 & 文章页）
    blogInfo: {
      blogCreate: '2021-7-13', // 博客创建时间
      indexView: true,  // 开启首页的访问量和排名统计，默认 true（开启）
      pageView: true,  // 开启文章页的浏览量统计，默认 true（开启）
      readingTime: true,  // 开启文章页的预计阅读时间，条件：开启 eachFileWords，默认 true（开启）。可在 eachFileWords 的 readEachFileWords 的第二个和第三个参数自定义，默认 1 分钟 300 中文、160 英文
      eachFileWords: readEachFileWords([''], 300, 160),  // 开启每个文章页的字数。readEachFileWords(['xx']) 关闭 xx 目录（可多个，可不传参数）下的文章页字数和阅读时长，后面两个参数分别是 1 分钟里能阅读的中文字数和英文字数。无默认值。readEachFileWords() 方法默认排除了 article 为 false 的文章
      mdFileCountType: 'archives',  // 开启文档数。1. archives 获取归档的文档数（默认）。2. 数组 readFileList(['xx']) 排除 xx 目录（可多个，可不传参数），获取其他目录的文档数。提示：readFileList() 获取 docs 下所有的 md 文档（除了 `.vuepress` 和 `@pages` 目录下的文档）
      totalWords: 'archives',  // 开启本站文档总字数。1. archives 获取归档的文档数（使用 archives 条件：传入 eachFileWords，否则报错）。2. readTotalFileWords(['xx']) 排除 xx 目录（可多个，可不传参数），获取其他目录的文章字数。无默认值
      moutedEvent: '.tags-wrapper',   // 首页的站点模块挂载在某个元素后面（支持多种选择器），指的是挂载在哪个兄弟元素的后面，默认是热门标签 '.tags-wrapper' 下面，提示：'.categories-wrapper' 会挂载在文章分类下面。'.blogger-wrapper' 会挂载在博客头像模块下面
      // 下面两个选项：第一次获取访问量失败后的迭代时间
      indexIteration: 2500,   // 如果首页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 10 次后。默认 3 秒。注意：设置时间太低，可能导致访问量 + 2、+ 3 ......
      pageIteration: 2500,    // 如果文章页获取访问量失败，则每隔多少时间后获取一次访问量，直到获取成功或获取 10 次后。默认 3 秒。注意：设置时间太低，可能导致访问量 + 2、+ 3 ......
      // 说明：成功获取一次访问量，访问量 + 1，所以第一次获取失败后，设置的每个隔段重新获取时间，将会影响访问量的次数。如 100 可能每次获取访问量 + 3
    },

  }

}
