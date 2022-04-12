module.exports = [
  [{ 'seo': { /* options */ }}],
  [
    '@vuepress/google-analytics',
    {
      'ga': 'G-896N66VNVW' // UA-00000000-0
    }
  ],
  [
    'meting',
    {
       auto: 'https://music.163.com/#/playlist?id=7342774859'
    },
 ],//音乐播放器
  ['ribbon'],//漂亮丝带
  ['cursor-effects'],//点击效果
  ['dynamic-title'],//动态标题
  ['fulltext-search'],//全文搜索
  ["plausible-analytics"],// plausible.io 添加分析
  ['@vuepress/active-header-links'],//页面滚动时自动激活侧边栏链接的插件
  // ['@vuepress/back-to-top'],//返回页首
  ['vuepress-plugin-smooth-scroll'],//平滑插件
  ['vuepress-plugin-baidu-autopush'],
  ['@vuepress/last-updated', {
    transformer: (timestamp, lang) => {
      const moment = require('moment');
      moment.locale("zh-cn");
      return moment(timestamp).format("LL")
    }
  }
  ],//最后更新插件
  ['vuepress-plugin-code-copy', true],//复制代码插件
  ['img-lazy'],//图片缓存加载
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
  // ['vuepress-plugin-toolbar', {

  //   opts: [
  //      {
  //       icon: '',
  //       name: '纯展示'
  //     },{
  //     icon: '',
  //     name: '用手机看',
  //     link: '',
  //     popover: {
  //       title: '扫描二维码',
  //       type: 'image',
  //       imageUrl: 'https://qr.api.cli.im/newqr/create?data=https%253A%252F%252Fxustudyxu.github.io%252FVuepressBlog%252F&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=500&kid=cliim&key=35192b7bdf2849a3a25b259e110339be',
  //     }
  //   }
  //   ]
  // }
  // ],
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

