---
title: 导航栏
date: 2022-04-21 09:07:03
permalink: /pages/a3df94/
categories:
  - 
tags:
  - 
---
# 资源导航

## 开发百宝箱<badge text="New"/>

### 搜索引擎

<ClientOnly>
  <Card :cardData="cardData0" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 代码托管

<ClientOnly>
  <Card :cardData="cardData1" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 前端开发

<ClientOnly>
  <Card :cardData="cardData7_1" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

<ClientOnly>
  <Card :cardData="cardData7_2" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

<ClientOnly>
  <Card :cardData="cardData7_3" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

<ClientOnly>
  <Card :cardData="cardData7_4" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

<ClientOnly>
  <Card :cardData="cardData7_99" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 后端开发

<ClientOnly>
  <Card :cardData="cardData6" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 文档工具

<ClientOnly>
  <Card :cardData="cardData5" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 热门社区

<ClientOnly>
  <Card :cardData="cardData2" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 工具合集

<ClientOnly>
  <Card :cardData="cardData3" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 文档教程

<ClientOnly>
  <Card :cardData="cardData4" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 动态图表

<ClientOnly>
  <Card :cardData="cardData8" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 图片图标

<ClientOnly>
  <Card :cardData="cardData9" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### CSS样式

<ClientOnly>
  <Card :cardData="cardData10" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 网站分析

<ClientOnly>
  <Card :cardData="cardData11" :cardListSize=3 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 其它资源

<ClientOnly>
  <Card :cardData="cardData99" :cardListSize=4 carTitlColor="#000" carHoverColor="#000" />
</ClientOnly>

### 参考来源

`https://www.pdai.tech/md/resource/tools.html`

<script>
export default {
    data() {
    return {
      // 搜索引擎
      cardData0: [
        {
          id: '0',
          cardSrc: "http://www.baidu.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104224044.png",
          cardName: "百度",
          cardContent:
            "百度——全球最大的中文搜索引擎及最大的中文网站，全球领先的人工智能公司",
        },
        {
          cardSrc: "http://www.google.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104225539.png",
          cardName: "Google",
          cardContent:
            "全球最大的搜索引擎公司",
        },
        {
          cardSrc: "https://www.bing.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104224430.png",
          cardName: "Bing",
          cardContent:
            "微软公司推出的用以取代Live Search的搜索引擎",
        },
      ],
      // 代码托管
      cardData1: [
        {
          id: '1',
          cardSrc: "https://github.com/",
          cardImgSrc: "https://img0.baidu.com/it/u=2382900870,3325593570&fm=26&fmt=auto",
          cardName: "Github",
          cardContent:
            "GitHub是一个面向开源及私有软件项目的托管平台",
        },
        {
          cardSrc: "https://gitee.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104231432.png",
          cardName: "Gitee",
          cardContent:
            "开源中国旗下的代码托管平台：码云",
        },
        {
          cardSrc: "https://vercel.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105210701.png",
          cardName: "Vercel",
          cardContent:
            "Vercel 是前端框架和静态站点的平台，旨在与您的无头内容、商业或数据库集成",
        },
        {
          cardSrc: "https://coding.net/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104231517.png",
          cardName: "Coding",
          cardContent:
            "一站式 DevOps，提升研发效能",
        },
      ],
      // 热门社区
      cardData2: [
        {
          id: '2',
          cardSrc: "http://www.csdn.net/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104232713.png",
          cardName: "CDSN",
          cardContent:
            "中国专业IT社区CSDN",
        },
        {
          cardSrc: "http://www.cnblogs.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104232039.png",
          cardName: "博客园",
          cardContent:
            "开发者的网上家园",
        },
        {
          cardSrc: "https://www.oschina.net/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104232755.png",
          cardName: "OSChina",
          cardContent:
            "中国最大的开源技术社区",
        },
        {
          cardSrc: "https://segmentfault.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105210328.png",
          cardName: "饭否",
          cardContent:
            "中国领先的开发者技术社区",
        },
        {
          cardSrc: "https://juejin.im/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104233516.svg",
          cardName: "掘金",
          cardContent:
            "掘金是一个帮助开发者成长的社区，是一个面向互联网技术人的内容分享平台",
        },
        {
          cardSrc: "https://www.linuxidc.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104233249.png",
          cardName: "Linux公社",
          cardContent:
            "Linux系统门户网站",
        },
        {
          cardSrc: "https://www.ibm.com/developerworks/cn/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104233311.png",
          cardName: "IBM 开发者",
          cardContent:
            "IBM开发者社区",
        },
        {
          cardSrc: "https://www.jianshu.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220111001422.png",
          cardName: "简书",
          cardContent:
            "简书是一个优质的创作社区,在这里,你可以任性地创作,一篇短文、一张照片、一首诗、一幅画……我们相信,每个人都是生活中的艺术家,有着无穷的创造力",
        },
        {
          cardSrc: "https://stackoverflow.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220111001325.png",
          cardName: "stack overflow",
          cardContent:
            "Stack Overflow是最大、最值得信赖的在线社区，供开发人员学习、分享编程知识和建立职业生涯",
        },
        {
          cardSrc: "https://maliquankai.com/designnav/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220111001711.png",
          cardName: "码力全开资源库",
          cardContent:
            "很全很强大，独立开发者/设计干货/优质利器/工具资源",
        },
        {
          cardSrc: "https://www.infoq.cn/topic/Front-end",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220111001811.png",
          cardName: "InfoQ",
          cardContent:
            "在新陈代谢旺盛的前端领域，帮助开发者把握前端未来的方向，关注科技企业的前端实践，在这里看到前端的远端",
        },
      ],
      // 工具合集
      cardData3: [
        {
          id: '3',
          cardSrc: "https://c.runoob.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104234003.png",
          cardName: "菜鸟工具",
          cardContent:
            "菜鸟教程提供的工具集",
        },
        {
          cardSrc: "https://tool.oschina.net/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104232755.png",
          cardName: "工具",
          cardContent:
            "开源中国在线工具",
        },
        {
          cardSrc: "https://tool.lu//",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104234610.png",
          cardName: "Tool工具箱",
          cardContent:
            "程序员的工具箱",
        },
        {
          cardSrc: "http://tools.jb51.net/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104234502.png",
          cardName: "脚本之家",
          cardContent:
            "脚本之家旗下的工具箱",
        },
        {
          cardSrc: "https://123.w3cschool.cn/webtools/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104234731.png",
          cardName: "W3Cschool",
          cardContent:
            "W3Cschool旗下的工具箱",
        },
        {
          cardSrc: "https://gitee.com/explore/all/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104231432.png",
          cardName: "Gitee开源",
          cardContent:
            "Gitee 开源项目推荐列表",
        },
        {
          cardSrc: "https://cloudconvert.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104234641.png",
          cardName: "云转换",
          cardContent:
            "在线转化压缩包、字体、图片、视频、电子书",
        },
      ],
      // 文档教程
      cardData4: [
        {
          id: '4',
          cardSrc: "https://www.runoob.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104234903.png",
          cardName: "菜鸟教程",
          cardContent:
            "菜鸟教程集合",
        },
        {
          cardSrc: "https://www.w3cschool.cn/tutorial/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104234912.png",
          cardName: "w3cschool",
          cardContent:
            "w3cschool主要为初学者技术的人员提供在线学习教程和日常技术资料查询服务",
        },
        {
          cardSrc: "https://www.w3school.com.cn/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104234958.png",
          cardName: "w3cschool",
          cardContent:
            "W3School 是因特网上最大的 WEB 开发者资源，其中包括全面的教程、完善的参考手册以及庞大的代码库",
        },
        {
          cardSrc: "https://developer.mozilla.org/zh-CN/docs/Learn/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104235346.png",
          cardName: "MDN",
          cardContent:
            "源于开发者，服务开发者",
        },
        {
          cardSrc: "https://www.javatpoint.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104235316.png",
          cardName: "JavaPoint",
          cardContent:
            "The Best Portal to Learn Technologies",
        },
      ],
      // 文档工具
      cardData5: [
        {
          id: '5',
          cardSrc: "https://vuepress.vuejs.org/zh/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105000146.png",
          cardName: "VuePress",
          cardContent:
            "Vue 驱动的静态网站生成器，本项目就是使用VuePress开发的",
        },
        {
          cardSrc: "https://doc.xugaoyi.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/xugaoyi/image_store/blog/20200409124835.png",
          cardName: "vuepress-theme-vdoing",
          cardContent:
            "🚀一款简洁高效的 VuePress 知识管理&博客 主题",
        },
        {
          cardSrc: "https://hexo.io/zh-cn/",
          cardImgSrc: "https://d33wubrfki0l68.cloudfront.net/6657ba50e702d84afb32fe846bed54fba1a77add/827ae/logo.svg",
          cardName: "Hexo",
          cardContent:
            "快速、简洁且高效的博客框架",
        },
        {
          cardSrc: "https://www.yuque.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105213419.png",
          cardName: "语雀",
          cardContent:
            "新一代云端知识库，个人笔记与知识创作，团队协同与知识沉淀",
        },
        {
          cardSrc: "https://www.gitbook.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105000040.png",
          cardName: "Gitbook",
          cardContent:
            "一个先进可定制的文档格式工具",
        },
        {
          cardSrc: "https://docsify.js.org/#/zh-cn/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105000115.png",
          cardName: "Docsify",
          cardContent:
            "一个神奇的文档网站生成工具",
        },
      ],
      // 后端开发
      cardData6: [
        {
          id: '6',
          cardSrc: "https://spring.io/projects/spring-boot/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105000450.png",
          cardName: "Spring",
          cardContent:
            "Spring框架是一个开放源代码的J2EE应用程序框架",
        },
        {
          cardSrc: "https://mybatis.org/mybatis-3/zh/index.html",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105000812.png",
          cardName: "MyBatis",
          cardContent:
            "MyBatis 是一款优秀的持久层框架，它支持定制化 SQL、存储过程以及高级映射",
        },
        {
          cardSrc: "https://mybatis.plus/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105000613.png",
          cardName: "MyBatis Plus",
          cardContent:
            "MyBatis 的增强工具，在 MyBatis 的基础上只做增强不做改变，为简化开发、提高效率而生",
        },
        {
          cardSrc: "https://mvnrepository.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105000653.png",
          cardName: "Maven",
          cardContent:
            "Maven 仓库检索，非常常用",
        },
        {
          cardSrc: "https://docs.gradle.org/current/userguide/userguide.html",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105000729.png",
          cardName: "Gradle",
          cardContent:
            "基于Apache Ant和Apache Maven概念的项目自动化构建开源工具",
        },
      ],
      // 前端开发
      // Vue UI
      cardData7_1: [
        {
          id: '7_1',
          title: 'Vue & UI',
          cardSrc: "https://cn.vuejs.org/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105001047.png",
          cardName: "Vue",
          cardContent:
            "渐进式 JavaScript 框架",
        },
        {
          cardSrc: "https://element.eleme.cn/#/zh-CN/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105001602.png",
          cardName: "Element-UI",
          cardContent:
            "Element，一套为开发者、设计师和产品经理准备的基于 Vue 的桌面端组件库",
        },
        {
          cardSrc: "https://next.antdv.com/docs/vue/introduce-cn/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105223748.svg",
          cardName: "Ant Design Vue",
          cardContent:
            "Vue UI 之 Ant Design Vue，蚂蚁金服的 Vue 框架",
        },
        {
          cardSrc: "https://www.iviewui.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105001656.png",
          cardName: "View UI",
          cardContent:
            "View UI 是一套基于 Vue.js 的高质量UI 组件库",
        },
        {
          cardSrc: "https://youzan.github.io/vant/#/zh-CN/",
          cardImgSrc: "https://img01.yzcdn.cn/vant/logo.png",
          cardName: "Vant",
          cardContent:
            "轻量、可靠的移动端 Vue 组件库",
        },
      ],
      // React UI
      cardData7_2: [
        {
          id: '7_2',
          title: 'React & UI',
          cardSrc: "https://react.docschina.org/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105001206.png",
          cardName: "React",
          cardContent:
            "用于构建用户界面的 JavaScript 库",
        },
        {
          cardSrc: "https://ant.design/index-cn",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105223748.svg",
          cardName: "Ant Design",
          cardContent:
            "React 开箱即用的中台前端/设计解决方案",
        },
        {
          cardSrc: "https://react-bootstrap.github.io/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105224229.png",
          cardName: "Ant Design Vue",
          cardContent:
            "最流行的前端框架 bootstrap，为 React 适配",
        },
        {
          cardSrc: "https://mui.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105224500.png",
          cardName: "MATERIAL-UI",
          cardContent:
            "View UI 是一套基于 Vue.js 的高质量UI 组件库",
        },
        {
          cardSrc: "https://youzan.github.io/vant/#/zh-CN/",
          cardImgSrc: "https://img01.yzcdn.cn/vant/logo.png",
          cardName: "Vant",
          cardContent:
            "轻量、可靠的移动端 Vue 组件库",
        },
      ],
      // React UI
      cardData7_3: [
        {
          id: '7_3',
          title: '效果组件',
          cardSrc: "https://animate.style/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105233408.png",
          cardName: "Animate.css",
          cardContent:
            "动画库",
        },
        {
          cardSrc: "https://www.swiper.com.cn/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105233615.png",
          cardName: "Swiper",
          cardContent:
            "轮播组件",
        },
        {
          cardSrc: "http://www.mescroll.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105233730.png",
          cardName: "mescroll",
          cardContent:
            "下拉刷新和上拉加载框架-基于原生JS",
        },
      ],
      // 工具类
      cardData7_4: [
        {
          id: '7_4',
          title: '工具类',
          cardSrc: "https://www.lodashjs.com/",
          cardImgSrc: "https://www.lodashjs.com/img/lodash.png",
          cardName: "Lodash",
          cardContent:
            "Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库",
        },
        {
          cardSrc: "https://dayjs.fenxianglu.cn/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220110235754.png",
          cardName: "Day.js",
          cardContent:
            "Day.js是一个极简的JavaScript库，可以为现代浏览器解析、验证、操作和显示日期和时间",
        },
        {
          cardSrc: "https://github.com/hustcc/timeago.js",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220111000119.png",
          cardName: "Timeago.js",
          cardContent:
            "相对时间，如N小时前",
        },
        {
          cardSrc: "https://echarts.apache.org/zh/index.html",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/logo.png?_v_=20200710_1",
          cardName: "Apache ECharts",
          cardContent:
            "一个基于 JavaScript 的开源可视化图表库",
        },
        {
          cardSrc: "https://pandao.github.io/editor.md/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220111000050.png",
          cardName: "Meditor.md",
          cardContent:
            "开源在线 Markdown 编辑器",
        },
        {
          cardSrc: "https://github.com/validatorjs/validator.js",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220111000249.png",
          cardName: "validator.js",
          cardContent:
            "表单验证库",
        },
      ],
      // 其他
      cardData7_99: [
        {
          id: '7_99',
          title: '其他',
          cardSrc: "https://www.bootcss.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105000409.png",
          cardName: "BootStrap",
          cardContent:
            "简洁、直观、强悍的前端开发框架，让web开发更迅速、简单",
        },
        {
          cardSrc: "https://www.npmjs.cn/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105001006.png",
          cardName: "NPM",
          cardContent:
            "NodeJS 包管理文档",
        },
        {
          cardSrc: "https://www.angularjs.net.cn/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105001414.png",
          cardName: "AngularJS",
          cardContent:
            "AngularJS是一款优秀的前端JS框架",
        },
        {
          cardSrc: "https://electronjs.org/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105001728.png",
          cardName: "Electron",
          cardContent:
            "Electron 是一个赋力前端进行跨平台开发的框架,让开发人员使用 JavaScript，HTML 和 CSS 等前端技术构建跨平台的桌面应用",
        },
        {
          cardSrc: "https://caniuse.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105001759.png",
          cardName: "can i use",
          cardContent:
            "前端常用网站了,查看不同属性和方法的兼容性",
        },
      ],
      // 动态图表
      cardData8: [
        {
          id: '8',
          cardSrc: "https://www.echartsjs.com/examples/zh/index.html",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105014053.png",
          cardName: "Echarts",
          cardContent:
            "百度开发的可定制的数据可视化图表，已经捐给Apache",
        },
        {
          cardSrc: "https://antv.vision/zh",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105014146.png",
          cardName: "AntV",
          cardContent:
            "蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践",
        },
        {
          cardSrc: "https://d3js.org/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105014223.png",
          cardName: "D3",
          cardContent:
            "用动态图形显示数据的JavaScript库",
        },
        {
          cardSrc: "https://threejs.org/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105014307.png",
          cardName: "ThreeJs",
          cardContent:
            "运行在浏览器中的3D 引擎",
        },
        {
          cardSrc: "https://www.highcharts.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105014337.png",
          cardName: "HighCharts",
          cardContent:
            "兼容 IE6+、支持移动端、图表类型丰富的HTML5交互性图表库",
        },
        {
          cardSrc: "https://www.chartjs.org/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105014412.png",
          cardName: "ChartJs",
          cardContent:
            "基于 HTML5 的 JavaScript 图表库",
        },
        {
          cardSrc: "http://www.flotcharts.org/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105014448.png",
          cardName: "FlotCharts",
          cardContent:
            "基于jQuery的Charts，Grafana就是用的它",
        },
      ],
      // 图片图标
      cardData9: [
        {
          id: '9',
          cardSrc: "http://fontawesome.dashgame.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105014740.png",
          cardName: "fonta Wesome",
          cardContent:
            "完美的图标字体库",
        },
        {
          cardSrc: "https://squoosh.app/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105014911.png",
          cardName: "Squoosh",
          cardContent:
            "谷歌出品在线免费图片压缩工具神器",
        },
        {
          cardSrc: "http://zhitu.isux.us/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105014955.png",
          cardName: "智图",
          cardContent:
            "腾讯出品，在线图片压缩，支持转成 webP 处理静态图片时候很好用",
        },
        {
          cardSrc: "https://www.picdiet.com/zh-cn",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105015040.png",
          cardName: "Picdiet",
          cardContent:
            "Picdiet是一款在线批量压缩图片神器，它不需要后端服务器或者API的支持，仅通过你的浏览器来压缩图片大小，这意味着它压缩图片极快并且不会导致隐私或敏感图片泄漏",
        },
        {
          cardSrc: "http://www.aigei.com/bgremover/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105015116.png",
          cardName: "Bgremover",
          cardContent:
            "在线图片去底工具",
        },
        {
          cardSrc: "https://www.photopea.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105015154.png",
          cardName: "Photopea",
          cardContent:
            "网页版本 Photoshop，非常强大",
        },
        {
          cardSrc: "https://www.iconfont.cn/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105015248.png",
          cardName: "Iconfont",
          cardContent:
            "阿里妈妈MUX倾力打造的矢量图标管理、交流平台。设计师将图标上传到Iconfont平台，用户可以自定义下载多种格式的icon，平台也可将图标转换为字体，便于前端工程师自由调整与调用",
        },
        {
          cardSrc: "http://cssicon.space/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105015322.png",
          cardName: "Css Icon",
          cardContent:
            "所有的 icon 都是纯 css 画的 缺点：icon 不够多",
        },
      ],
      // CSS样式
      cardData10: [
        {
          id: '10',
          cardSrc: "http://sass.bootcss.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105015622.png",
          cardName: "SAAS",
          cardContent:
            "Sass 是成熟、稳定、强大的 CSS 扩展语言",
        },
        {
          cardSrc: "https://stylus.bootcss.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105015650.png",
          cardName: "Stylus",
          cardContent:
            "富于表现力、动态的、健壮的 CSS",
        },
        {
          cardSrc: "https://less.bootcss.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105015753.png",
          cardName: "Less",
          cardContent:
            "给 CSS 加点料",
        },
        {
          cardSrc: "http://apps.eky.hk/css-triangle-generator/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105015906.png",
          cardName: "CSS riangle",
          cardContent:
            "帮你快速用 css 做出三角形",
        },
        {
          cardSrc: "http://www.cssarrowplease.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105015951.png",
          cardName: "CSS Arrow",
          cardContent:
            "帮你做对话框三角的",
        },
        {
          cardSrc: "hhttps://bennettfeely.com/image-effects/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020027.png",
          cardName: "CSS Effects",
          cardContent:
            "图片CSS样式控制",
        },
        {
          cardSrc: "https://app.zeplin.io/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "zeplin",
          cardContent:
            "前端和设计师神器，有标注、Style Guide、版本管理、简单的团队协作，重点是前端不用写css 了，复制就可以了",
        },
        {
          cardSrc: "hhttp://bennettfeely.com/clippy/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "clippy",
          cardContent:
            "在线帮你使用 css clip-path 做出各种形状的图形",
        },
      ],
      // 网站分析
      cardData11: [
        {
          id: '11',
          cardSrc: "https://tongji.baidu.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104224044.png",
          cardName: "百度统计",
          cardContent:
            "基于百度大数据能力,实现全域数据自动化采集、融合多种模型算法,赋能企业深入分析洞察用户行为,以驱动用户运营策略优化、产品用户体验提升及全渠道归因最大化转化效果",
        },
        {
          cardSrc: "https://ziyuan.baidu.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220104224044.png",
          cardName: "百度资源",
          cardContent:
            "百度搜索面向合作伙伴的官方平台，为开发者、内容创作者、站点管理者等伙伴，提供优化工具、数据、课程、Q&A等服务，助力资源进入搜索，同时提供搜索项目合作机会，让优质资源脱颖而出",
        },
        {
          cardSrc: "https://developers.google.cn/analytics/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105214915.svg",
          cardName: "谷歌分析",
          cardContent:
            "收集、配置并分析您的数据,助力您覆盖最理想的受众群体",
        },
        {
          cardSrc: "https://www.aicesu.cn/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105214633.png",
          cardName: "爱测速",
          cardContent:
            "谷歌网站测速 PageSpeed Insights - Google网页性能优化测试，全面分析提升网页加载速度与网站测试评分",
        },
        {
          cardSrc: "https://www.boce.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105215329.svg",
          cardName: "BOCE",
          cardContent:
            "拨测-免费的域名检测工具网-网站测速-ping检测-域名污染-域名被墙-dns查询-IPv6网站测试-路由跟踪查询-劫持检测",
        },
      ],
      // 其它资源
      cardData99: [
        {
          id: '99',
          cardSrc: "https://github.com/fkling/astexplorer/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "astexplorer",
          cardContent: "一个在线 ast 生成器",
        },
        {
          cardSrc: "https://30secondsofcode.org/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "30 seconds of code",
          cardContent:
            "收集了许多有用的代码小片段",
        },
        {
          cardSrc: "https://jex.im/regulex/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "jex",
          cardContent:
            "正则可视化网站，配合上面的 Regular Expressions，写正则方便很多",
        },
        {
          cardSrc: "https://jsfiddle.net/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "jsfiddle",
          cardContent:
            "在线运行代码网站 很不错，可惜要翻墙",
        },
        {
          cardSrc: "https://codepan.net/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "codepan",
          cardContent:
            "在线运行代码网站 不用翻墙，可以自己部署",
        },
        {
          cardSrc: "https://fiddle.md/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "fiddle.md",
          cardContent:
            "一个方便的在线共享 markdown 在线笔试题一般都用这个",
        },
        {
          cardSrc: "https://www.jsdelivr.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "jsdelivr",
          cardContent:
            "cdn 服务",
        },
        {
          cardSrc: "https://unpkg.com/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "unpkg",
          cardContent:
            "常用的 cdn 服务",
        },
        {
          cardSrc: "https://coderpad.io/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "coderpad",
          cardContent:
            "远程面试的神器，可以让面试者远程写代码 不过需要翻墙",
        },
        {
          cardSrc: "http://www.icode.live/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "icode",
          cardContent:
            "有赞团队出品的 coderpad 可以互补，它不需要翻墙",
        },
        {
          cardSrc: "https://www.codeadvice.io/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "codeadvice",
          cardContent:
            "又一个让面试者远程写代码的网址",
        },
        {
          cardSrc: "https://snipper.io/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "snipper",
          cardContent:
            "一个代码协同的网站。你新建一个代码片段，然后把网址分享给其他人，就可以看到他们的实时编辑",
        },
        {
          cardSrc: "https://codesandbox.io/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "codesandbox",
          cardContent:
            "一个可以在线编辑且提供在线 demo 的网站 支持 vue react angular 多种框架 神器",
        },
        {
          cardSrc: "https://tympanus.net/codrops/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "codrops",
          cardContent:
            "上面的交互都非常酷炫",
        },
        {
          cardSrc: "https://bestofjs.org/",
          cardImgSrc: "https://fastly.jsdelivr.net/gh/Kele-Bingtang/static/img/tools/20220105020107.png",
          cardName: "bestofjs",
          cardContent:
            "查看一个项目增长经历，Star 数变化的网站，辅助你判断这个库的质量 ",
        },
 	 ],
};
  },
}
</script>>


