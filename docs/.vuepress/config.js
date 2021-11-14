module.exports = {
    base: '/Blog/', //设置站点根路径
    title: '个人博客',
    description: '纸上得带终觉浅,绝知此事要躬行',
    dest: './dist',
    port: '7777',
    head: [
        ['link', { rel: 'icon', href: '/img/01.favicon' }],
        ['link', { rel: 'stylesheet', href: '/css/style.css' }],
        ['script', { charset: 'utf-8', href: '/js/main.js' }]
    ],
    plugins: {
        '@vuepress/medium-zoom': {
          selector: 'img.zoom-custom-imgs',
          // medium-zoom options here
          // See: https://github.com/francoischalifour/medium-zoom#options
          options: {
            margin: 16
          }
        }
      },
    markdown: {
        lineNumbers: true
    },
    themeConfig: {
        nav: require("./nav.js"),
        sidebar: require("./sidebar.js"),
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
        searchMaxSuggestoins: 10,
        serviceWorker: {
            updatePopup: {
                message: "有新的内容.",
                buttonText: '更新'
            }
        },
        editLinks: true,
        editLinkText: '在 GitHub 上编辑此页 ！'
    }
    }

 
