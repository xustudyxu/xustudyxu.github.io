const moment = require('moment');
moment.locale("zh-cn");
module.exports=[
        [ "plausible-analytics"],// plausible.io 添加分析
        ['authors'],
        ['@vuepress/active-header-links'],//页面滚动时自动激活侧边栏链接的插件
        [ 'vuepress-plugin-gotop-plus' ] ,//返回页首
        ['vuepress-plugin-smooth-scroll'],//平滑插件
        ['vuepress-plugin-baidu-autopush'],
        ['vuepress-plugin-global-toc'],//全局目录
        ['@vuepress/last-updated', {
                transformer: (timestamp, lang) => {
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
                repo: 'Blog',
                clientId: '6183c7ad1308a51ceab2',
                clientSecret: '653fbccad90a90c6630c2a1716e5d23f0b1d3f7d',
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
        ],['@vuepress/nprogress']//进度条
        ,['vuepress-plugin-toolbar',{
       
        opts: [ {
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
    ],[
        'vuepress-plugin-dehydrate', //修改你的 VuePress 生成的 HTML 文件
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
      ],
    ]

