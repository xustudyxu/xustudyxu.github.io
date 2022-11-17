
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
  // [
  //   '@vuepress/google-analytics',
  //   {
  //     'ga': 'G-896N66VNVW' // UA-00000000-0
  //   }
  // ],
  [ 'tabs' ],//选项卡
  [
    "meting",
    {
      // 这个 API 是不可用的，只是作为示例而已 https://music.163.com/playlist?id=2555412439&userid=1490434176
      // metingApi: 'https://music.163.com/',
      meting: {
        // 不配置该项的话不会出现全局播放器
        server: "tencent", // 音乐平台，可选值： "netease" | "tencent" | "kuwo" | "kugou" | "baidu" | "xiami"，netease 是网易云
        type: "playlist", // 资源类型（播放列表、单曲、专辑等），可选值： "song" | "album" | "artist" | "playlist"
        mid: "8521978721", // 资源 ID
        // auto: 'https://music.163.com/playlist?id=2555412439',  // 资源 url，填写后可通过资源 url 自动解析资源平台、类型、ID，上述三个选项将被覆盖（本参数仅支持 netease、tencent、xiami 三平台）
      },
      aplayer: {
        fixed: true, // 是否开启吸底模式，即自动隐藏在屏幕边框
        mini: true, // 是否开启迷你模式
        autoplay: false, // 是否开启自动播放
        theme: "#b7daff", // 设置播放器默认主题颜色
        loop: "all", // 设置播放器的播放循环模式，可选值：'all' | 'one' | 'none'
        order: "list", // 设置播放器的播放顺序模式，可选值：'list' | 'random'
        preload: "auto", // 设置音频的预加载模式，可选值：'none' | 'metadata' | 'auto'
        volume: 0.7, // 设置播放器的音量
        additionalAudios: [], // 除 Meting 解析的 audio 外额外添加的 audio，一般官方自带的就行
        mutex: true, // 是否开启互斥模式，即该播放器播放音乐后，停止其他正在播放的播放器
        lrcType: 0, // 设置 lrc 歌词解析模式，可选值：3 | 1 | 0（0：禁用 lrc 歌词，1：lrc 格式的字符串，3：lrc 文件 url）
        listFolded: false, // 刚打开播放器时，是否折叠播放列表
        listMaxHeight: 250, // 设置播放列表最大高度，单位为像素
        storageName: "vuepress-plugin-meting", // 设置存储播放器设置的 localStorage key
      },
      mobile: {
        // 移动端配置
        cover: true, // 是否显示封面图，如果隐藏的话可以防止播放器遮挡移动设备上的文字内容
        lrc: true, // 是否显示歌词
      },
    },
  ],
  // [
  //   "smplayer",
  //   {
  //     bilibili: {
  //       page: 1,
  //       danmaku: !0,
  //       allowfullscreen: "allowfullscreen",
  //       sandbox:
  //         "allow-top-navigation allow-same-origin allow-forms allow-scripts allow-popups",
  //       width: "100%",
  //       height: [9 / 16, 70],
  //     },
  //   },
  // ],
  [
    {
        name: 'custom-plugins',//代码块皮肤,页面信息，评论
        globalUIComponents: ["BlockToggle","PageInfo","Aplayer","Twikoo"],// 2.x 版本 globalUIComponents 改名为 clientAppRootComponentFiles
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
  ['img-lazy'],//图片缓存加载
  ['@vuepress/active-header-links', {
    sidebarLinkSelector: '.sidebar-link',
    headerAnchorSelector: '.header-anchor'
  }],//自动生成侧边栏
  // [
  //   '@vssue/vuepress-plugin-vssue', {
  //     // set `platform` rather than `api`
  //     platform: 'github-v4',

  //     // all other options of Vssue are allowed
  //     owner: 'xustudyxu',
  //     repo: 'xustudyxu.github.io',
  //     clientId: '48eb3723b4711182c6d8',
  //     clientSecret: 'b71348f376e9e59c3b702c3fe26cee857b5ad6b3',
  //     autoCreateIssue: true

  //   }
  // ],//评论
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

