---
title: JavaScript
date: 2023-01-09 21:27:35
permalink: /pages/d893c0/
categories:
  - JavaScript
tags:
  - JavaScript
---
# JavaScript

[[toc]]

## 编程语言

### 编程

**编程**：就是让计算机为解决某个问题而使用某种程序设计语言编写程序代码，并最终得到结果的过程。

**计算机程序**：就是计算机所执行的一系列的指令集合，而程序全部都是用我们所掌握的语言来编写的，所以
人们要控制计算机一定要通过计算机语言向计算机发出命令。

从事编程的人员，就是**程序员**。 但是一般程序员都比较幽默，为了形容自己的辛苦工作，也成为“码农”，或者 “程序猿”/ “程序媛”

**注意**:上面所定义的计算机指的是**任何能够执行代码的设备**，可能是智能手机、ATM机、黑莓PI、服务器等等。

### 计算机语言

**计算机语言**指用于**人与计算机之间通讯的语言**，它是人与计算机之间传递信息的**媒介**。

计算机语言的种类非常的多，总的来说可以分成**机器语言**，**汇编语言**和**高级语言**三大类。

实际上计算机最终所执行的都是**机器语言**，它是由“0′和"1"组成的二进制数，**二进制是计算机语言的基础**。

```js
0=00000000 	1=00000001 	2=00000010 	3=00000011 	4=00000100 
5=00000101 	6=00000110 	7=00000111 	8=00001000 	9=00001001 
10=00001010
```

### 编程语言

可以通过类似于人类语言的 ”语言”来控制计算机，让计算机为我们做事情，这样的语言就叫做编程语言（Programming Language）。

编程语言是用来控制计算机的一系列指令，它有固定的格式和词汇（不同编程语言的格式和词汇不一样），必须遵守。

如今通用的编程语言有两种形式：**汇编语言**和**高级语言**。

+ **汇编语言**和机器语言实质是相同的，都是直接对硬件操作，只不过指令采用了英文缩写的标识符，容易识别和记忆。
+ **高级语言**主要是相对于低级语言而言，它并不是特指某一种具体的语言，而是包括了很多编程语言，常用的有C语言、C++、Java、C#、Python、PHP、JavaScript、Go语言、Objective-C、Swift等。

```js
C语言：puts("你好");
PHP：echo "你好";
Java：System.out.println("你好");
JavaScript： alert("你好"）
```

### 翻译器

高级语言所编制的程序不能直接被计算机识别，必须经过转换才能被执行，为此，我们需要一个翻译器。

翻译器可以将我们所编写的源代码转换为机器语言，这也被称为二进制化。 记住1和 0

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20230109/image.5nt9b8tg64g0.webp)

### 编程语言和标记语言区别

+ **编程语言**有很强的逻辑和行为能力。在编程语言里,你会看到很多if else 、for 、while等具有逻辑性和行为能力的指令，这是主动的。
+ **标记语言**(html)不用于向计算机发出指令，常用于格式化和链接。标记语言的存在是用来被读取的,他是被动的。

### 总结

1. 计算机可以帮助人类解决某些问题
2. 程序员利用编程语言编写程序发出指令控制计算机来实现这些任务
3. 编程语言有机器语言、汇编语言、高级语言
4. 高级语言需要一个翻译器转换为计算机识别的机器语言
5. 编程语言是主动的有很强的逻辑性

## 计算机基础

### 计算机组成

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20230109/image.2ybb8rjv55s0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20230109/image.qlvh3qkltq8.webp)

### 数据存储

1. 计算机内部使用二进制0和1来表示数据。
2. 所有数据，包括文件、图片等最终都是以二进制数据(0和1)的形式存放在硬盘中的。
3. 所有程序，包括操作系统，本质都是各种数据，也以二进制数据的形式存放在硬盘中。平时我们所说的安装软件，其实就是把程序文件复制到硬盘中。
4. 硬盘、内存都是保存的二进制数据。

### 数据存储单位

bit < byte < kb <GB<TB<...

+ 位(bit): 1bit可以保存一个О或者1(最小的存储单位)
+ 字节(Byte): 1B = 8b
+ 千字节(KB):1KB = 1024B
+ 兆字节(MB): 1MB = 1024KB
+ 吉字节(GB): 1GB = 1024MB
+ 太字节(TB):1TB = 1024GB

+ ...

### 程序运行

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20230109/image.2ppqoyy0k7o0.webp)

1. 打开某个程序时，先从硬盘中把程序的代码加载到内存中
2. CPU执行内存中的代码

**注意**:之所以要内存的一个重要原因，是因为cpu运行太快了，如果只从硬盘中读数据，会浪费cpu性能，所以，才使用存取速度更快的内存来保存运行时的数据。(内存是电，硬盘是机械)

## 初识 JavaScript

### JavaScript 是什么

+ 布兰登:艾奇(Brendan Eich，1961年~)。
+ 神奇的大哥用10天完成JavaScript设计。
+ 最初命名为LiveScript，后来在与Sun合作之后将其改名为JavaScript。
+ JavaScript是世界上最流行的语言之一，是一种运行在客户端的脚本语言(Script是脚本的意思)
+ 脚本语言:不需要编译，运行过程中由js解释器(js 引擎）逐行来进行解释并执行
+ 现在也可以基于Node.js技术进行服务器端编程

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20230109/image.4vg36ojq6bs0.webp)

### JavaScript 的作用

+ 表单动态校验（密码强度检测)(JS产生最初的目的)
+ 网页特效
+ 服务端开发(Node.js)
+ 桌面程序(Electron)
+ App(Cordova)
+ 控制硬件-物联网(Ruff)
+ 游戏开发(cocos2d-js)

### HTML/CSS/JS 的关系

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20230109/image.5cubi5734gs0.webp)

### 浏览器执行JS简介

浏览器分成两部分:渲染引擎和JS引擎

+ **渲染引擎**:用来解析HTML与CSS，俗称内核，比如chrome浏览器的 blink，老版本的webkit
+ **JS引擎**:也称为JS解释器。用来读取网页中的JavaScript代码，对其处理后运行，比如chrome浏览器的V8

> 浏览器本身并不会执行JS代码，而是通过内置JavaScript引擎(解释器)来执行JS代码。JS引擎执行代码时逐行解释每一句源码(转换为机器语言)，然后由计算机去执行，所以JavaScript 语言归为脚本语言，会逐行解释执行.

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20230109/image.41v3nyhyyf20.webp)

### JS 的组成

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20230109/image.4st2jnqy8z60.webp)

#### ECMAScript

**ECMAScript** 是由ECMA 国际（ 原欧洲计算机制造商协会）进行标准化的一门编程语言，这种语言在万维网上应用广泛，它往往被称为 JavaScript 或 JScript，但实际上后两者是 ECMAScript 语言的实现和扩展。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20230109/image.6dh59rqz0ik0.webp)

> ECMAScript: ECMAScript规定了JS的编程语法和基础核心知识，是所有浏览器厂商共同遵守的一套JS语法工业标准。

更多参看MDN:[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/JavaScript_technologies_overview](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/JavaScript_technologies_overview)

#### DOM - 文档对象模型

**文档对象模型**(Document Object Model，简称DOM)，是W3C组织推荐的处理可扩展标记语言的**标准编程接口**。通过DOM提供的接口可以对页面上的各种元素进行操作(大小、位置、颜色等)。

#### BOM - 浏览器对象模型

**BOM**(Browser Object Model，简称BOM)是指浏览器对象模型，它提供了独立于内容的、可以与浏览器窗口进行互动的对象结构。通过BOM可以操作浏览器窗口，比如弹出框、控制浏览器跳转、获取分辨率等。

### JS 初体验

JS有3种书写位置，分别为行内、内嵌和外部。

#### 行内式

```html
<input type="button" value="点我试试" onclick="alert('Hello World')" />
```

+ 可以将单行或少量 JS 代码写在HTML标签的事件属性中（以 on 开头的属性），如：onclick
+ 注意单双引号的使用：在**HTML**中我们推荐使用**双引号**, **JS** 中我们推荐使用**单引号**
+ 可读性差， 在html中编写JS大量代码时，不方便阅读；
+ 引号易错，引号多层嵌套匹配时，非常容易弄混；
+ 特殊情况下使

#### 内嵌 JS

```js
<script>
 	alert('Hello World~!');
</script>
```

+ 可以将多行JS代码写到 `<script>` 标签中
+ 内嵌 JS 是学习时常用的方式

### 外部 JS 文件

```html
<script src="my.js"></script>
```

+ 利于HTML页面代码结构化，把大段 JS代码独立到 HTML 页面之外，既美观，也方便文件级别的复用
+ 引用外部 JS文件的 script 标签中间不可以写代码
+ 适合于JS 代码量比较大的情况

## JS 注释

### 单行注释

为了提高代码的可读性，JS与CSS一样，也提供了注释功能。JS中的注释主要有两种，分别是**单行注释**和**多行注释**。

单行注释的注释方式如下:

```js
// 我是一行文字，不想被 JS引擎 执行，所以 注释起来
```

`//` 用来注释单行文字（ 快捷键 `ctrl + /` ）

### 多行注释

多行注释的注释方式如下：

```js
/*
 获取用户年龄和姓名
并通过提示框显示出来
*/
```

`/* */` 用来注释多行文字（ 默认快捷键 alt + shift + a ）

快捷键修改为： ctrl + shift + / 

vscode -> 首选项按钮 -> 键盘快捷方式 -> 查找 原来的快捷键 -> 修改为新的快捷键 -> 回车确认

## JavaScript 输入输出语句

为了方便信息的输入输出，JS中提供了一些输入输出语句，其常用的语句如下:

| 方法             | 说明                           | 归属   |
| ---------------- | ------------------------------ | ------ |
| alert(msg)       | 浏览器弹出警示框               | 浏览器 |
| console.log(msg) | 浏览器控制台打印输出信息       | 浏览器 |
| prompt(info)     | 浏览器弹出输入框，用户可以输入 | 浏览器 |

**注意**: alert()主要用来显示消息给用户，console.log()用来给程序员自己看运行时的消息。

