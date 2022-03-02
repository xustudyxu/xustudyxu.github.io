module.exports = [
  [
    'social-share',
    {
      networks: ['qq', 'email'],
      email: '1812903531@qq.com',
      qq: '1812903531',
      autoQuote: true,
      isPlain: true,
      extendsNetworks,
    },
  ],
  ["plausible-analytics"],// plausible.io 添加分析
  ['authors'],
  ['@vuepress/active-header-links'],//页面滚动时自动激活侧边栏链接的插件
  ['vuepress-plugin-gotop-plus'],//返回页首
  ['vuepress-plugin-smooth-scroll'],//平滑插件
  ['vuepress-plugin-baidu-autopush'],
  ['vuepress-plugin-global-toc'],//全局目录
  ['@vuepress/last-updated', {
    transformer: (timestamp, lang) => {
      const moment = require('moment');
      moment.locale("zh-cn");
      return moment(timestamp).format("LLLL")
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
      repo: 'VuepressBlog',
      clientId: 'e97a81e2f3ce480d4016',
      clientSecret: 'de09bd084d2ea89c85a7d07c87ea27ce261c19d3',
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
  ], ['@vuepress/nprogress']//进度条
  , ['vuepress-plugin-toolbar', {

    opts: [{
      icon: '',
      name: '纯展示'
    },
    {
      icon: '',
      name: '文本',
      popover: {
        type: 'text',
        title: '纯文本说明',
        text: '在b站学编程'
      }
    },
    {
      icon: '',
      name: 'github',
      popover: {
        type: 'html',
        title: '使用简单的 HTML 显示',
        html: '<h1>使用简单的 HTML</h1> 进行展示 <a href="https://github.com/xustudyxu/VuepressBlog"> 链接到github </a>'
      }
    }, {
      icon: '',
      name: '用手机看',
      link: '',
      popover: {
        title: '扫描二维码',
        type: 'image',
        imageUrl: 'https://qr.api.cli.im/newqr/create?data=https%3A%2F%2Fqr06.cn%2FEsHCt1&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&logoshape=no&size=500&kid=cliim&key=2dac2ea9cf7baabae1f72caf377cb890',
      }
    }
    ]
  }
  ],
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

