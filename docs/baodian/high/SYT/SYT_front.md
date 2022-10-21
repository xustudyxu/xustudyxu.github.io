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

