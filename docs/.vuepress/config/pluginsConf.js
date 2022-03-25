
const extendsNetworks = {
  pinterest: {
    sharer: 'https://pinterest.com/pin/create/button/?url=@url&media=@media&description=@title',
    type: 'popup',
    icon: '/pinterest.png',
  },
  linkedin: {
    sharer:
      'https://www.linkedin.com/shareArticle?mini=true&url=@url&title=@title&summary=@description',
    type: 'popup',
    color: '#1786b1',
    icon:
      '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M910.336 0H113.664A114.005333 114.005333 0 0 0 0 113.664v796.672A114.005333 114.005333 0 0 0 113.664 1024h796.672A114.005333 114.005333 0 0 0 1024 910.336V113.664A114.005333 114.005333 0 0 0 910.336 0zM352.256 796.330667H207.189333V375.466667h145.066667z m-72.021333-477.866667a77.824 77.824 0 0 1-81.237334-74.069333A77.824 77.824 0 0 1 280.234667 170.666667a77.824 77.824 0 0 1 81.237333 73.728 77.824 77.824 0 0 1-81.237333 73.386666z m582.314666 477.866667H716.8v-227.669334c0-46.762667-18.432-93.525333-73.045333-93.525333a84.992 84.992 0 0 0-81.237334 94.549333v226.304h-140.629333V375.466667h141.653333v60.757333a155.989333 155.989333 0 0 1 136.533334-71.338667c60.416 0 163.498667 30.378667 163.498666 194.901334z" /></svg>',
  },
}
module.exports = [
  [
    'vuepress-plugin-right-anchor',
    {
      showDepth: 2,
      ignore: [
        '/',
        '/api/'
        // more...
      ],
      expand: {
        trigger: 'click',
        clickModeDefaultOpen: true
      },
      customClass: 'your-customClass',
      disableGlobalUI: false,
    }
  
],//右侧导航
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

