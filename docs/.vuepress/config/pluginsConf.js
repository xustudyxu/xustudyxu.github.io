const autometa_options = {
  site: {
    name   : 'frxcat',
    twitter: 'frxcat',
  },
  canonical_base: 'https://frxcat.fun/',
};
module.exports = [
//   [ //记录上次阅读位置
//     {
//         name: 'custom-plugins',
//         globalUIComponents: ["LastReadingPopup"] // 2.x 版本 globalUIComponents 改名为 clientAppRootComponentFiles
//     }
// ],
  [{ 'seo': { /* options */ }}],
  [
    '@vuepress/google-analytics',
    {
      'ga': 'G-896N66VNVW' // UA-00000000-0
    }
  ],
  [
    {
        name: 'custom-plugins',//代码块皮肤
        globalUIComponents: ["BlockToggle"] // 2.x 版本 globalUIComponents 改名为 clientAppRootComponentFiles
    }
],
  //  全局提示
//   [
//     {
//         name: 'custom-plugins',
//         globalUIComponents: ["GlobalTip"] // 2.x 版本 globalUIComponents 改名为 clientAppRootComponentFiles
//     }
// ],
  // ['ribbon'],//漂亮丝带
  // ['dynamic-title'],//动态标题
  // ['fulltext-search'],//全文搜索
  ["plausible-analytics"],// plausible.io 添加分析
  ['@vuepress/active-header-links'],//页面滚动时自动激活侧边栏链接的插件
  // ['@vuepress/back-to-top'],//返回页首
  ['vuepress-plugin-baidu-autopush'],//百度自动推送
  [ 'autometa', autometa_options ],//自动元标记插件，有助于SEO
  ['seo'],
  ['@vuepress/last-updated', {
    transformer: (timestamp, lang) => {
      const moment = require('moment');
      moment.locale("zh-cn");
      return moment(timestamp).format("LL")
    }
  }
  ],//最后更新插件
  ['one-click-copy', {
    copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'], // String or Array
    copyMessage: '复制成功', // default is 'Copied successfully!'
    toolTipMessage: '复制失败', // default is ''Copy to clipboard'
    duration: 1000, // prompt message display time
  }],//复制代码插件
  // ['img-lazy'],//图片缓存加载
  ['@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor'
  }],//自动生成侧边栏
  [
    '@vssue/vuepress-plugin-vssue', {
      // set `platform` rather than `api`
      platform: 'github-v4',

      // all other options of Vssue are allowed
      owner: 'xustudyxu',
      repo: 'xustudyxu.github.io',
      clientId: '48eb3723b4711182c6d8',
      clientSecret: 'b71348f376e9e59c3b702c3fe26cee857b5ad6b3',
      autoCreateIssue: true

    }
  ],//评论
  [
    '@vuepress/medium-zoom', { //图片放大
      selector: 'img',

    }
  ], [
    '@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: {
        message: "发现新内容可用",  //有新内容，提示
        buttonText: "刷新"
      }
    }
  ], ['@vuepress/nprogress'],//进度条
  [ 'code-switcher' ],//多种语言代码块
  [
    'vuepress-plugin-clean-urls', //支持链接
    {
      normalSuffix: '/',
      indexSuffix: '/',
      notFoundPath: '/404.html',
    },
  ],
  [
    'vuepress-plugin-dehydrate',//修改生成的html文件
    {
      // 禁用 SSR
      noSSR: '404.html',
      // 移除 scripts
      noScript: [
        // 支持 glob patterns
        'foo/*.html',
        '**/static.html',
      ],
    },
  ]
]

