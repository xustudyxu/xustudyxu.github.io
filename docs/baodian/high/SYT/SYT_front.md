---
title: 尚医通-前端知识点
date: 2022-10-21 23:49:29
permalink: /high/SYT/SYT_fron
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-前端知识点

[[toc]]

## 前端开发与开发工具介绍

### 前端开发

前端工程师“Front-End-Developer”源自于美国。大约从2005年开始正式的前端工程师角色被行业所认可，到了2010年，互联网开始全面进入移动时代，前端开发的工作越来越重要。

最初所有的开发工作都是由后端工程师完成的，随着业务越来越繁杂，工作量变大，于是我们将项目中的可视化部分和一部分交互功能的开发工作剥离出来，形成了前端开发。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221021/image.6n3u679xbjw0.webp)

### VSCode 安装和使用

+ [下载地址](https://code.visualstudio.com/)

+ 插件安装
  + Chinese Lauguage
  + Live Server
  + Vetur
  + vue-helper

## ECMAScript 6

### 什么是 ECMAScript 6

ECMAScript 6.0（简称 ES6）是 JavaScript 语言的下一代标准， 2015 年 6 月正式发布。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

### ECMAScript 和 JavaScript 的关系

一个常见的问题是，ECMAScript 和 JavaScript 到底是什么关系？

要讲清楚这个问题，需要回顾历史。1996 年 11 月，JavaScript 的创造者 Netscape 公司，决定将 JavaScript 提交给标准化组织 ECMA，希望这种语言能够成为国际标准。次年，ECMA 发布 262 号标准文件（ECMA-262）的第一版，规定了浏览器脚本语言的标准，并将这种语言称为 ECMAScript，这个版本就是 1.0 版。

因此，ECMAScript 和 JavaScript 的关系是，前者是后者的规格，后者是前者的一种实现（另外的 ECMAScript 方言还有 Jscript 和 ActionScript）

### 基本语法

ES6相对之前的版本语法更严格，新增了面向对象的很多特性以及一些高级特性。本部分只学习项目开发中涉及到ES6的最少必要知识，方便项目开发中对代码的理解。

#### let 声明变量

```javascript
        //定义变量
        {
            var a = 1;
            let b = 1;
        }
        console.log(a)
        console.log(b)

        // var 可以声明多次
        // let 只能声明一次
        var m = 1;
        var m = 2;
        let n = 10;
        let n = 20;  //'n' has already been declared
        console.log(m)
        console.log(n)
```

#### conset 声明常量 (只读变量)

```javascript
        // 1、声明之后不允许改变    
        const PI = "3.1415926"
        PI = 3     // TypeError: Assignment to constant variable.

        // 2、一但声明必须初始化，否则会报错
        const MY_AGE  // Missing initializer in const declaration
```

#### 解构赋值

创建 03-解构赋值-数组解构.js

解构赋值是对赋值运算符的扩展。

他是一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值。

在代码书写上简洁且易读，语义更加清晰明了；也方便了复杂对象中数据字段获取。

```javascript
		//1、数组解构
        let a = 1, b = 2, c = 3
        //console.log(a, b, c)
        // ES6
        let [x, y, z] = [1, 2, 3]
        //console.log(x, y, z)

        //2、对象解构
        let user = {name: 'Helen', age: 18}
        // 传统
        let name1 = user.name
        let age1 = user.age
        console.log(name1, age1)
        // ES6
        let { name, age } =  user  //注意：结构的变量必须是user中的属性
        console.log(name, age)
```

#### 模板字符串

模板字符串相当于加强版的字符串，用反引号 `，除了作为普通字符串，还可以用来定义多行字符串，还可以在字符串中加入变量和表达式。

```javascript
        //字符串插入变量和表达式。变量名写在 ${} 中，${} 中可以放入 JavaScript 表达式。
        let name = "lucy"
        let age = 20
        let info = `My name is ${name} ,I am ${age+1}`
        console.log(info)
```

#### 声明对象简写

```javascript
        //传统方式定义对象
        const name = "lucy"
        const age = 20
        const user1 = {name:name,age:age}
        //console.log(user1)
        
        //es6
        const user2 = {name,age}
        console.log(user2)
```

#### 对象拓展运算符

拓展运算符（...）用于取出参数对象所有可遍历属性然后拷贝到当前对象。

```javascript
        //对象复制
        let person1 = {name: "Amy", age: 15}
        let someone1 = { ...person1}
        //console.log(someone1)

        //对象合并
        let age = {age: 15}
        let name = {name: "Amy"}
        let person2 = {...age, ...name}
        console.log(person2)
```

#### 箭头函数

箭头函数提供了一种更加简洁的函数书写方式。基本语法是：

参数 => 函数体

箭头函数多用于匿名函数的定义

```javascript
        //传统定义函数
        var f1 = function(a) {
            return a
        }
        console.log(f1(3))

        //es使用箭头函数定义
        //参数==>函数体 
        var f2 = a => a
        console.log(f2(4))

        // 当箭头函数没有参数或者有多个参数，要用 () 括起来。
        // 当箭头函数函数体有多行语句，用 {} 包裹起来，表示代码块，
        // 当只有一行语句，并且需要返回结果时，可以省略 {} , 结果会自动返回。

        var f3 = function(m,n){
            return m+n
        }

        //es
        var f4 = (m,n) => m+n
        console.log(f4(4,5))
```

## Vue 入门

### Vue.js 是什么

在为 AngularJS 工作之后，Vue 的作者尤雨溪开发出了这一框架。他声称自己的思路是提取 Angular 中为自己所喜欢的部分，构建出一款相当轻量的框架。Vue 最早发布于 2014 年 2 月。作者在 Hacker News、Echo JS 与 Reddit 的 javascript 版块发布了最早的版本。一天之内，Vue 就登上了这三个网站的首页。Vue 是 Github 上最受欢迎的开源项目之一。同时，在 JavaScript 框架/函数库中，Vue 所获得的星标数已超过 React，并高于 Backbone.js、Angular 2、jQuery 等项目。

Vue.js 是一款流行的 JavaScript 前端框架，目的是简化 Web 开发。Vue 所关注的核心是 MVC 模式中的视图层，同时，它也能方便地获取数据更新，实现视图与模型的交互。

官方网站：[https://cn.vuejs.org](https://cn.vuejs.org)

```vue
    <script src="./vue.min.js"></script>
    <div id="app">
        <!-- 插值表达式 -->
        {{message}}
    </div>
    <script>
        new Vue({
            el: '#app',
            data: {
                message: 'hello vue'
            }
        })
    </script>
```

这就是声明式渲染：Vue.js 的核心是一个允许采用简洁的模板语法来声明式地将数据渲染进 DOM 的系统

这里的核心思想就是没有繁琐的DOM操作，例如jQuery中，我们需要先找到div节点，获取到DOM对象，然后进行一系列的节点操作

```javascript
data: {
	message: 'Hello Vue!'
}
```

### 创建代码片段

文件 =>  首选项 => 用户片段 => 新建全局代码片段文件：

vue-html.code-snippets

```vue
{
	"vue htm": {
		"scope": "html",
		"prefix": "vuehtml",
		"body": [
			"<!DOCTYPE html>",
			"<html lang=\"en\">",
			"",
			"<head>",
			"    <meta charset=\"UTF-8\">",
			"    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
			"    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">",
			"    <title>Document</title>",
			"</head>",
			"",
			"<body>",
			"    <div id=\"app\">",
			"",
			"    </div>",
			"    <script src=\"vue.min.js\"></script>",
			"    <script>",
			"        new Vue({",
			"            el: '#app',",
			"            data: {",
			"                $1",
			"            }",
			"        })",
			"    </script>",
			"</body>",
			"",
			"</html>",
		],
		"description": "my vue template in html"
	}
}
```

### 基本语法

#### 基本数据渲染和指令

```vue
    <div id="app">
        <div v-bind:style="msg">单向绑定</div>
        <div :style="msg">单向绑定1</div>
    </div>
    <script src="./vue.min.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                msg: 'color:green;'
            }
        })
    </script>
```

你看到的 v-bind 特性被称为指令。指令带有前缀 v- 

除了使用插值表达式{{}}进行数据渲染，也可以使用 v-bind指令，它的简写冒号（:）

```html
<div v-bind:style="msg">单向绑定</div>
<div :style="msg">单向绑定</div>
```

#### 双向数据绑定

```vue
    <div id="app">
        {{keyword}}
        <br>
        <input type="text" :value="keyword">
        <br>
        <input type="text" v-model="keyword">
        
    </div>
    <script src="vue.min.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                keyword: '尚硅谷'
            }
        })
    </script>
```

什么是双向数据绑定？

当数据发生变化的时候，视图也会跟着发生变化

数据模型发生了改变，会直接显示在页面上

当视图发生变化的时候，数据也会跟着同步变化

用户在页面上的修改，会自动同步到数据模型中去

#### 事件

使用 v-on 进行数件处理，v-on:click 表示处理鼠标点击事件，事件调用的方法定义在 vue 对象声明的 methods 节点中

```vue
    <div id="app">
        <button v-on:click="show()">事件绑定</button>
        <button @click="show()">事件绑定2</button>
    </div>
    <script src="vue.min.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                keyword: '尚硅谷'
            },
            methods: {
                show() {
                    console.log("show...")
                }
            }
        })
    </script>
```

#### 条件渲染

```vue
    <div id="app">
        <input type="checkbox" v-model="ok"/>
        <br>
        <div v-if="ok">选中了</div>
        <div v-else>没有选中</div>
    </div>
    <script src="vue.min.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                ok: false
            }
        })
    </script>
```

#### 列表渲染

```vue
    <div id="app">
        <div v-for="user in userlist">
            {{user.name}} -- {{user.age}}
        </div>
        <div v-for="(user,index) in userlist">
           {{index}} -- {{user.name}} -- {{user.age}}
        </div>
    </div>
    <script src="vue.min.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                userlist:[
                    {"name":"lucy","age":20},
                    {"name":"mary","age":30}
                ]
            }
        })
    </script>
```

#### 实例生命周期

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221022/image.3dj5z3jft2w0.webp)

```vue
    <div id="app">
        {{msg}}
    </div>
    <script src="vue.min.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                msg: 'Hello'
            },
            created() { //在页面渲染之前执行
                debugger
                console.log('created...')
            },
            mounted() { //在页面渲染之后执行
                debugger
                console.log('mounted...')
            }
        })
    </script>
```

## axios

### axios的作用

axios是独立于vue的一个项目，可以用于浏览器和node.js中发送ajax请求

### 复制 js 资源

vue.min.js

axios.min.js

```vue
    <div id="app">
        <table>
            <tr v-for="user in userList">
                <td>{{user.name}}</td>
                <td>{{user.age}}</td>
            </tr>
        </table>
    </div>
    <script src="vue.min.js"></script>
    <script src="axios.min.js"></script>
    <script>
        new Vue({
            el: '#app',
            data: {
                userList:[]
            },
            created(){ //在页面渲染之前执行
                //调用方法，得到返回值json数据
                this.getList()

            },
            methods:{
                getList() {
                    //使用axios方式ajax请求
                    axios.get("user.json")
                        .then(response => {
                            //console.log(response)
                           this.userList = response.data.data.items
                           console.log(this.userList)
                        }) //请求成功
                        .catch(error => {
                            console.log(error)
                        }) //请求失败
                }
            }
        })
    </script>
```

## element-ui

element-ui 是饿了么前端出品的基于 Vue.js的 后台组件库，方便程序员进行页面快速布局和构建

官网： [https://element.eleme.cn/#/zh-CN](https://element.eleme.cn/#/zh-CN)

具体ui组件我们在项目中学习

## Node.js

### Node.js的概念

#### JavaScript引擎

浏览器的内核包括两部分核心：

DOM渲染引擎

JavaScript解析引擎

Chrome浏览器内置V8引擎，V8引擎执行Javascript的速度非常快，性能非常好。

#### 什么是Node.js

脱离浏览器环境也可以运行JavaScript，只要有JavaScript引擎就可以。

Node.js是一个基于Chrome V8引擎的JavaScript运行环境：即Node.js内置了Chrome的V8 引擎，可以在Node.js环境中直接运行JavaScript程序。

在Node.js中写JavaScript和在Chrome浏览器中写JavaScript基本没有什么不一样。哪里不一样呢？

Node.js没有浏览器API，即document，window的等。

加了许多Node.js 专属API，例如文件系统，进程，http功能。

#### Node.js有什么用

如果你想开发类似JavaWeb的简单的后端程序，那么学习Node.js是一个非常好的选择。

如果你想部署一些高性能的服务，那么学习Node.js也是一个非常好的选择。

通常他会被用来作一个BFF层，即 Backend For Frontend（服务于前端的后端），通俗的说是一个专门用于为前端业务提供数据的后端程序

### BFF

#### BFF 解决什么问题

一个前端页面向 Service A、Service B 以及 Service C发送请求，不同的微服务返回的值用于渲染页面中不同的组件。此时，每次访问该页面都需要发送 3 个请求。我们需要一个服务来聚合Service
A、Service B 以及 Service C响应的数据，这个服务层叫做BFF。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221022/image.5c7h4orpgds0.webp)

手机、平板端、PC机等用户终端都需要向每个Service，例如Service A发送请求。对于同一个功能，不同的终端需要的数据格式和内容会有不同。此时 Service A 的一个接口，不能同时满足三个客户端的不同需求。我们可以在Service A中开发三个接口，也可以增加一个数据裁剪服务，将数据按照不同终端的不同要求进行裁剪，这个服务层叫做BFF。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221022/image.15d6p2dti74w.webp)

BFF层的作用是让前端有能力自由组装后台数据，减少大量的业务沟通成本，加快业务的迭代速度。

无论是数据聚合还是数据剪裁，这类程序的特点是不需要太强大的服务器运算能力，但是对程序的灵活性有较高的要求，这两个特点都正好和Node.js的优势相吻合。

#### 什么是BFF

用户体验适配器

### 安装

#### 下载

官网：[https://nodejs.org/en/](https://nodejs.org/en/)

中文网：[http://nodejs.cn/](http://nodejs.cn/)

LTS：长期支持版本

Current：最新版

#### 安装

双击安装 node-v10.14.2-x64.msi

#### 查看版本

```sh
Node -v
```

#### 控制台查询

创建 01.js

```javascript
console.log('Hello Node.js')
```

打开命令行终端：Ctrl + Shift + y

进入到程序所在的目录，输入

```sh
node 01.js
```

#### 服务器端应用开发（了解）

创建 02-server-app.js

```javascript
//引入http模块
const http = require('http');
//创建服务器
http.createServer(function (request, response) {
// 发送 HTTP 头部 
// HTTP 状态值: 200 : OK
// 内容类型: text/plain
response.writeHead(200, {'Content-Type': 'text/html'});
// 发送响应数据 "Hello World"
response.end('<h1>Hello Node.js Server</h1>');
}).listen(8888);
// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```

运行服务器程序

```sh
node 02-server-app.js
```

服务器启动成功后，在浏览器中输入：[http://localhost:8888/](http://localhost:8888/) 查看webserver成功运行，并输出html页面

停止服务：ctrl + c

## NPM 包管理器

### 简介

什么是NPM

NPM全称Node Package Manager，是Node.js包管理工具，是全球最大的模块生态系统，里面所有的模块都是开源免费的；也是Node.js的包管理工具，相当于前端的Maven 。

```sh
#在命令提示符输入 npm -v 可查看当前npm版本
npm-v
```

### 使用npm管理项目

创建npm_pro文件夹

#### 项目初始化

```sh
#建立一个空文件夹，在命令提示符进入该文件夹  执行命令初始化
npm init
#按照提示输入相关信息，如果是用默认值则直接回车即可。
#name: 项目名称
#version: 项目版本号
#description: 项目描述
#keywords: {Array}关键词，便于用户搜索到我们的项目
#最后会生成package.json文件，这个是包的配置文件，相当于maven的pom.xml
#我们之后也可以根据需要进行修改。
#如果想直接生成 package.json 文件，那么可以使用命令
npm init -y
```

#### 修改npm镜像

NPM官方的管理的包都是从 http://npmjs.com下载的，但是这个网站在国内速度很慢。

这里推荐使用淘宝 NPM 镜像 http://npm.taobao.org/ ，淘宝 NPM 镜像是一个完整 npmjs.com 镜像，同步频率目前为 10分钟一次，以保证尽量与官方服务同步。

**设置镜像地址：**

```sh
#经过下面的配置，以后所有的 npm install 都会经过淘宝的镜像地址下载
npm config set registry https://registry.npm.taobao.org 
#查看npm配置信息
npm config list
```

#### npm install命令的使用

基本命令

```sh
#使用 npm install 安装依赖包的最新版，
#模块安装的位置：项目目录\node_modules
#同时package.json 文件中，依赖包会被添加到dependencies节点下，类似maven中的 <dependencies>
#默认参数：--save  简写  -S  将当前依赖保存在dependencies节点下
npm install jquery
```

下载特定版本的依赖

```sh
#如果安装时想指定特定的版本
npm install jquery@2.1.x
```

下载开发依赖

```sh
#devDependencies节点：开发时的依赖包，项目打包到生产环境的时候不包含的依赖
#使用 -D参数将依赖添加到devDependencies节点
npm install --save-dev eslint
#或简写
npm i -D eslint
```

下载全局依赖

```sh
#全局安装
#Node.js全局安装的npm包和工具的位置：用户目录\AppData\Roaming\npm\node_modules
#一些命令行工具常使用全局安装的方式
npm install --global webpack
#或简写
npm install -g webpack
```

根据依赖下载安装包

```sh
#npm管理的项目在备份和传输的时候一般不携带node_modules文件夹
#安装会自动在项目目录下添加 package-lock.json文件，这个文件帮助锁定安装包的版本
npm install #根据package.json中的配置下载依赖，初始化项目
```

#### 其他命令

```sh
#更新包（更新到最新版本）
npm update 包名
#全局更新
npm update -g 包名
#卸载包
npm uninstall 包名
#全局卸载
npm uninstall -g 包名
```

## 模块化

### 模块化简介

随着网站逐渐变成"互联网应用程序"，嵌入网页的Javascript代码越来越庞大，越来越复杂。

Javascript模块化编程，已经成为一个迫切的需求。理想情况下，开发者只需要实现核心的业务逻辑，其他都可以加载别人已经写好的模块。

### 模块化规范

CommonJS模块化规范（基于ES6语法之前）

ES6模块化规范（使用ES6语法）

### ES6模块化规范

创建modularization_pro文件夹

#### 导出模块

创建src/01.js 文件

```javascript
export default {
    getList() {
        console.log('获取讲师列表')
    },
    save() {
        console.log('保存讲师')
    }
}
```

#### 导入模块

创建src/02.js 文件

```javascript
import teacher from"./01.js"
teacher.getList()
teacher.save()
```

**ES6使用 export 和 import 来导出、导入模块。**

#### 运行程序

```sh
node ./02.js
```

**注意：这时的程序无法运行的，因为ES6的模块化无法在Node.js中执行，需要用Babel编辑成ES5后再执行。**

### 使用Babel转码 

ES6的某些高级语法在浏览器环境甚至是Node.js环境中无法执行。

Babel是一个广泛使用的转码器，可以将ES6代码转为ES5代码，从而在现有环境执行执行。

这意味着，你可以现在就用 ES6 编写程序，而不用担心现有环境是否支持。

#### 安装

Babel提供babel-cli工具，用于命令行转码。它的安装命令如下：

```sh
npm install -g babel-cli
#查看是否安装成功
babel --version
```

#### 初始化项目

在module_demo目录下初始化项目

```sh
npm init -y
```

#### 配置.babelrc

Babel的配置文件是.babelrc，存放在项目的根目录下，该文件用来设置转码规则和插件，presets字段设定转码规则

```json
{
    "presets": ["es2015"],
    "plugins": []
}
```

#### 安装转码器

在module_deom目录中安装

```sh
npm install -D babel-preset-es2015
```

#### 转码

```sh
# 整个目录转码
# --out-dir 或 -d 参数指定输出目录
babel src -d dist
```

#### 运行程序

```sh
node dist/02.js
```

### 更多的方式

ES6模块化规范还有一些其他的语法格式，常见的另一种写法如下：

src/01.js：

```javascript
export function getList() {
	console.log('获取讲师列表2')
}
export function save() {
	console.log('保存讲师2')
}
```

src/02.js

```javascript
import {getList, save} from"./01.js"
getList()
save()
```

## Webpack

### 什么是Webpack

Webpack 是一个前端资源加载/打包工具。它将根据模块的依赖关系进行静态分析，然后将这些模块按照指定的规则生成对应的静态资源。

从图中我们可以看出，Webpack 可以将多种静态资源 js、css、less 转换成一个静态文件，减少了页面的请求。 

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221022/image.3kccadmrrhs0.webp)

## WebPack 安装

### 全局安装

```sh
npm install -g webpack webpack-cli
或
npm install -g webpack
npm install -g webpack-cli
```

### 安装后查看版本号

```sh
webpack -v
```

#### src下创建01.js

```javascript
exports.info=function (str) {
    document.write(str)
}
```

#### src下创建02.js

```javascript
exports.add=function (a, b) {
    returna+b
}
```

#### src下创建main.js

```javascript
const a = require('./01.js')
const b = require('./02.js')
common.info('Hello world!'+utils.add(100, 200))
```

### JS 打包

#### 创建配置文件

webpack_pro目录下创建配置文件webpack.config.js

以下配置的意思是：

读取当前项目目录下src文件夹中的main.js（入口文件）内容，分析资源依赖，把相关的js文件打包

打包后的文件放入当前目录的dist文件夹下

打包后的js文件名为bundle.js

```javascript
const path =require("path") //Node.js内置模块
module.exports= {
	entry: './src/main.js', //配置入口文件
	output: {
        path: path.resolve(__dirname, './dist'), //输出路径，__dirname：当前文件所在路径
        filename: 'bundle.js'//输出文件
    }
}
```

#### 执行编译命令

```sh
webpack --mode=development
#执行后查看bundle.js 里面包含了上面两个js文件的内容并进行了代码打包
```

也可以配置项目的npm运行命令，修改package.json文件

```json
"scripts": {
	//...,
	"dev": "webpack --mode=development",
	"prod": "webpack --mode=production"
 }
```

运行npm命令执行打包

```sh
npm run dev #开发打包
或
npm run prod #生产打包
```

#### 创建入口页面

webpack_pro目录下创建index.html，引用bundle.js

```html
<script src="dist/bundle.js"></script>
```

#### 测试

浏览器中查看index.html

### CSS打包

#### 安装插件

Webpack 本身只能处理 JavaScript 模块，如果要处理其他类型的文件，就需要使用 loader 进行转换。

Loader 可以理解为是模块和资源的转换器。

首先我们需要安装相关Loader插件，css-loader 是将 css 装载到 javascript；style-loader 是让 javascript 认识css

```sh
npm install -D style-loader css-loader 
```

#### 修改webpack.config.js

```javascript
const path = require("path"); //Node.js内置模块
module.exports= {
	//...,
	output:{
	//其他配置
    },
	module: {
	rules: [  
            {  
				test: /\.css$/,    //打包规则应用到以css结尾的文件上
				use: ['style-loader', 'css-loader']
            }  
        ]  
    }
}
```

#### 在src文件夹创建style.css

```css
body{
	background: pink;
}
```

#### 修改main.js 

在第一行引入style.css

```javascript
require('./style.css')
```

#### 运行编译命令

```sh
npm run dev
```

#### 测试

浏览器中查看index.html，看看背景是不是变成粉色啦？

