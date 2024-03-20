---
title: Vue 快速上手
date: 2023-09-28 00:33:14
permalink: /pages/6f762f/
categories:
  - Vue
tags:
  - Vue
---
# Vue 快速上手

[[toc]]

## Vue 简介

### 官网

+ [英文官网](https://vuejs.org/)
+ [中文官网](https://cn.vuejs.org/)

#### 介绍与描述

+ `Vue` 是一套用来动态**构建用户界面**的**渐进式** JavaScript 框架
  + **构建用户界面**：把数据通过某种办法变成用户界面
  + **渐进式**：`Vue`可以自底向上逐层的应用，简单应用只需要一个轻量小巧的核心库，复杂应用可以引入各式各样的Vue插件
+ 作者：尤雨溪

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20230218/image.6u1cgo3gfbg0.jpg)

### Vue 特点

1. 遵循 `MVVM` 模式 
2. 编码简洁，体积小，运行效率高，适合移动/PC端开发 
3. 它本身只关注 UI，可以引入其它第三方库开发项目
4. 采用**组件化**模式，提高代码复用率、且让代码更好维护

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20230218/image.6086qdb6ztw0.jpg)

5. **声明式**编码，让编码人员无需直接操作DOM，提高开发效率

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20230218/image.187vtzqdopek.jpg)

6. 使用**虚拟 DOM** 和 **Diff 算法**，尽量复用 `DOM` 节点

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20230218/image.71l0av4cbac0.jpg)

### 与其他 JS 框架的关联

+ 借鉴 angular 的 **模板** 和 **数据绑定** 技术
+ 借鉴 react 的 **组件化** 和 **虚拟DOM** 技术

### Vue 周边库

+ vue-cli：vue 脚手架
+ vue-resource(axios)：ajax 请求
+ vue-router：路由
+ vuex：状态管理（它是 vue 的插件但是没有用 vue-xxx 的命名规则）
+ vue-lazyload：图片懒加载
+ vue-scroller：页面滑动相关
+ mint-ui：基于 vue 的 UI 组件库（移动端）
+ element-ui：基于 vue 的 UI 组件库（PC 端）

## 初识 Vue

**前置工作**

1. 给浏览器安装 [Vue Devtools](https://devtools.vuejs.org/guide/installation.html) 插件
2. 标签引入Vue包
3. （可选）阻止vue在启动时生成生产提示`Vue.config.productionTip = false`
4. `favicon` 需要将页签图标放在项目根路径，重新打开就有了（**shfit+F5** 强制刷新）

**初识Vue**

1. 想让 `Vue` 工作，就必须创建一个 `Vue实例` ，且要传入一个**配置**对象

2. root 容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法

3. root 容器里的代码被称为**Vue模板**

4. Vue 实例与容器是<mark>一一对应</mark>的

5. 真实开发中只有一个Vue实例，并且会配合着组件一起使用

6. `{{xxx}}` 中的 xxx 要写 **js 表达式**，且 xxx 可以自动读取到 `data` 中的所有属性

   **注意区分**：js 表达式 和 js代码（语句）

   > + 表达式：一个表达式会产生一个值，可以放在任何一个需要值的地方
   >
   >   a	a+b		demo(1)		x === y ? 'a' : 'b'
   >
   > + js代码（语句）
   >
   >   if(){}		for(){}

7. 一旦 `data` 中的数据发生变化，那么模板中用到该数据的地方也会自动更新

### Hello 小实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>初识Vue</title>
    <!-- 引入 Vue -->
    <script type="text/javascript" src="../js/vue.js"></script>

</head>
<body>
    <!-- 准备一个容器 -->
    <div id="root">
        <h1>Hello,{{name}}</h1>
    </div>


    <script type="text/javascript">
        Vue.config.productionTip = false; //阻止 vue 在启动时生成生产提示

        //创建 Vue 实例
        const x = new Vue({
            // el: document.getElementById('root')
            el: '#root', // 元素,用于指定当前 Vue 实例为哪个容器服务，值通常为 css 选择器字符串 
            data: { // data 中用于存储数据，数据供 el 所指定的容器去使用，值先暂时写为一个对象
                name: 'Vue'
            }
        })

    </script>
</body>
</html>
```

+ 结果

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20230218/image.a868zxd2fkc.jpg)

### Vue DevTools

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20230218/image.3pf39pfbw0w0.jpg)

+ 可以修改数据

## 插值语法

Vue模板语法有2大类:

- 插值语法：
  - 功能：用于解析标签体内容
  - 写法：`{{xxx}}`，xxx是js表达式，且可以直接读取到data中的所有属性
- 指令语法：
  - 功能：用于解析标签（包括：标签属性、标签体内容、绑定事件…）
  - 举例：`v-bind:href=“xxx”` 或 简写为 `:href=“xxx”`，xxx同样要写js表达式，且可以直接读取到data中的所有属性

