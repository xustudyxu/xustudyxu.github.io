---
title: 尚医通-客户端平台
date: 2022-11-01 15:35:57
permalink: /high/SYT/SYT_client
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-客户端平台

[[toc]]

## 服务端渲染技术 NUXT

### 什么是服务端渲染

服务端渲染又称SSR (Server Side Render)是在服务端完成页面的内容，而不是在客户端通过AJAX获取数据。

服务器端渲染(SSR)的优势主要在于：更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。

如果你的应用程序初始展示 loading 菊花图，然后通过 Ajax 获取内容，抓取工具并不会等待异步完成后再进行页面内容的抓取。也就是说，如果 SEO 对你的站点至关重要，而你的页面又是异步获取内容，则你可能需要服务器端渲染(SSR)解决此问题。

另外，使用服务器端渲染，我们可以获得更快的内容到达时间(time-to-content)，无需等待所有的 JavaScript 都完成下载并执行，产生更好的用户体验，对于那些内容到达时间(time-to-content)与转化率直接相关的应用程序而言，服务器端渲染(SSR)至关重要。

### 什么是NUXT

Nuxt.js 是一个基于 Vue.js 的轻量级应用框架,可用来创建服务端渲染 (SSR) 应用,也可充当静态站点引擎生成静态站点应用,具有优雅的代码结构分层和热加载等特性。

官网网站：

[https://zh.nuxtjs.org/](https://zh.nuxtjs.org/)

## NUXT环境初始化

### 下载压缩包

[https://github.com/nuxt-community/starter-template/archive/master.zip](https://github.com/nuxt-community/starter-template/archive/master.zip)

### 解压

将template中的内容复制到 yygh-site

### 修改package.json

name、description、author（必须修改这里，否则项目无法安装）

```json
{
  "name": "p2p-site",
  "version": "1.0.0",
  "description": "尚医通前端平台",
  "author": "qy<493290402@qq.com>",
  "private": true,
  "scripts": {
    "dev": "nuxt",
    "build": "nuxt build",
    "start": "nuxt start",
    "generate": "nuxt generate",
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore .",
    "precommit": "npm run lint"
  },
  ...
}
```

### 修改nuxt.config.js

修改

```javascript
title: '{{ name }}'、content: '{{escape description }}'
```

这里的设置最后会显示在页面标题栏和meta数据中

```javascript
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'yygh-site',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '尚医通 - 预约挂号统一平台' }
    ],
  ...
```

### 终端中进入项目目录安装依赖

```sh
npm install
```

```sh
PS D:\front-WorkSpace\yygh-demo\yygh-site> npm install
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@2.1.3 (node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@2.1.3: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.13 (node_modules\watchpack-chokidar2\node_modules\fsevents):
npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.13: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})

up to date in 19.288s

44 packages are looking for funding
  run `npm fund` for details
```

### 引入element-ui

1. 下载element-ui

```sh
npm install element-ui
```

2. 在plugins文件夹下创建myPlugin.js文件

3. 在myPlugin.js文件引入element-ui

```javascript
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI)
```

4. 在nuxt.config.js文件中使用 myPlugin.js

在build下面添加内容：

```javascript
  plugins: [{
    src: '~plugins/myPlugin',
    ssr: true,
  }],
```

### 测试运行

```sh
npm run dev
```

访问项目：[http://localhost:3000/](http://localhost:3000/)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221101/image.1d0vv96zt2ao.webp)

### NUXT 目录结构

1. 资源目录

 用于组织未编译的静态资源如 LESS、SASS 或 JavaScript。

2. 组件目录 components

用于组织应用的 Vue.js 组件。Nuxt.js 不会扩展增强该目录下 Vue.js 组件，即这些组件不会像页面组件那样有 asyncData 方法的特性。

3. 布局目录 layouts

用于组织应用的布局组件。

4. 页面目录 pages

用于组织应用的路由及视图。Nuxt.js框架读取该目录下所有的 .vue 文件并自动生成对应的路由配置。

5. 插件目录plugins

用于组织那些需要在 根vue.js应用 实例化之前需要运行的 Javascript 插件。

6. nuxt.config.js 文件

nuxt.config.js 文件用于组织Nuxt.js 应用的个性化配置，以便覆盖默认配置。

## 首页数据 api 接口

### 医院分页列表

#### service 接口与实现

在管理平台 医院分页列表时已经提供，目前我们可以直接使用

#### 添加 Controller 接口

```java
@RestController
@RequestMapping("/api/hosp/hospital")
public class HospApiController {

    @Autowired
    private HospitalService hospitalService;

    @ApiOperation(value = "查询医院的列表功能")
    @GetMapping("/findHospList/{page}/{limit}")
    public Result findHospList(@PathVariable Integer page,
                               @PathVariable Integer limit,
                               HospitalQueryVo hospitalQueryVo){
        Page<Hospital> hospitals = hospitalService.selectHospPage(page, limit, hospitalQueryVo);
        return Result.ok(hospitals);
    }
}
```

+ 前端访问测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221101/image.4hjw33z4s0i0.webp)

### 根据医院名称关键字搜索医院列表

#### service 接口与实现

在HospitalService类添加接口

```java
    //根据医院名称做查询
    List<Hospital> findByName(String hosname);
```

在HospitalService类添加接口实现

```java
    //根据医院名称做查询
    @Override
    public List<Hospital> findByName(String hosname) {
        return hospitalRepository.findHospitalByHosnameLike(hosname);
    }
```

#### repository添加接口

在HospitalRepository类添加接口

```java
    //根据医院名称做查询
    List<Hospital> findHospitalByHosnameLike(String hosname);
```

#### 添加controller接口

```java
    @ApiOperation(value = "根据医院名称查询")
    @GetMapping("/findByHosname/{hosname}")
    public Result findByHosname(@PathVariable String hosname){
        List<Hospital> hospitalList = hospitalService.findByName(hosname);
        return Result.ok(hospitalList);
    }
```

+ 前端访问测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221101/image.snmgfhouhe8.webp)

## 医院详情

### 预约挂号

#### 添加service接口与实现

1. 在HospitalService类添加接口

```java
    // 根据医院编号获取医院预约挂号信息
    Map<String, Object> item(String hoscode);
```

2. 在HospitalServiceImpl类实现接口

```java
    @Override
    public Map<String, Object> item(String hoscode) {
        HashMap<String, Object> result = new HashMap<>();
        //医院详情
        Hospital hospital = this.setHospitalHosType(this.getByHosCode(hoscode));
        result.put("hospital",hospital);
        //预约规则
        result.put("bookingRule",hospital.getBookingRule());
        //不需要重复返回
        hospital.setBookingRule(null);
        return result;
    }
```

#### 添加 controller 接口

在HospitalApiController类添加方法

```java
    @Autowired
    private DepartmentService departmentService;

	@ApiOperation(value = "根据医院编号获取科室")
    @GetMapping("/department/{hoscode}")
    public Result index(@PathVariable String hoscode){
        List<DepartmentVo> list = departmentService.findDeptTree(hoscode);
        return Result.ok(list);
    }

    @ApiOperation(value = "根据医院编号获取医院预约挂号信息")
    @GetMapping("/{hoscode}")
    public Result findHospDetail(@PathVariable String hoscode){
        Map<String,Object> map = hospitalService.item(hoscode);
        return Result.ok(map);
    }
}
```

+ 前端访问测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221101/image.571kq8wga280.webp)

