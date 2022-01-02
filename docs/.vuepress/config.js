const moment = require('moment');
module.exports = {
    base: '/Blog/', //设置站点根路径
    title: '个人博客',
    description: '纸上得带终觉浅,绝知此事要躬行',
    dest: './dist',
    port: '7777',
    plugins: {
          '@vuepress/last-updated':{
            transformer: (timestamp, lang) => {
              moment.locale(lang)
              return moment(timestamp).format("LLLL")
            }
          },
          '@vssue/vuepress-plugin-vssue': {
            // set `platform` rather than `api`
            platform: 'github-v4',
      
            // all other options of Vssue are allowed
            owner: 'xustudyxu',
            repo: 'Blog',
            clientId: '6183c7ad1308a51ceab2',
            clientSecret: '653fbccad90a90c6630c2a1716e5d23f0b1d3f7d',
            autoCreateIssue:true
          
        },
        '@vuepress/medium-zoom': {
            selector: 'img',
        
          }
    },
    

    head: [
        ['link', { rel: 'icon', href: '/img/01.favicon' }],
        ['link', { rel: 'stylesheet', href: '/css/style.css' }],
        ['script', { charset: 'utf-8', href: '/js/main.js' }]
    ],
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


