---
title: JavaScript 变量
date: 2023-01-09 21:43:30
permalink: /pages/341066/
categories:
  - JavaScript
tags:
  - JavaScript
---
# JavaScript 变量

[[toc]]

## 什么是变量

白话:变量就是一个装东西的盒子。

通俗:变量是用于存放数据的**容器**。我们通过**变量名**获取数据，甚至数据可以修改。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20230109/image.68pbrgf1z9s0.webp)

## 变量在内存中的存储

本质:变量是程序在内存中申请的一块用来存放数据的空间。

类似我们酒店的房间，一个房间就可以看做是一个变量。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20230109/image.33s53urzbd80.webp)

## 变量的使用

变量在使用时分为两步:

1. 声明变量
2. 赋值

### 声明变量

```js
 //声明变量 
var age; // 声明一个 名称为age 的变量 
```

+ **var**是一个JS关键字，用来声明变量( variable变量的意思)。使用该关键字声明变量后，计算机会自动为变量分配内存空间，不需要程序员管
+ age是程序员定义的变量名，我们要通过变量名来访问内存中分配的空间

### 赋值

```js
age = 10; // 给 age 这个变量赋值为 10
```

+ **=** 用来把右边的值赋给左边的变量空间中 此处代表赋值的意思
+ 变量值是程序员保存到变量空间里的值

### 变量的初始化

```js
var age = 18; // 声明变量同时赋值为 18
```

声明一个变量并赋值， 我们称之为**变量的初始化**。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        // 1.声明了一个 age 的变量
        var age;
        // 2.赋值 把值存入这个变量中
        age = 10;
        // 3.输出结果
        console.log(age);
        // 4.变量的初始化
        var myname = 'frx';
        console.log(myname);
    </script>
</body>
</html>
```

### 案例

有个叫卡卡西的人在旅店登记的时候前台让他填一张表，这张表里的内容要存到电脑上，表中的内容有:姓名、年龄、邮箱、家庭住址和工资，存储之后需要把这些信息显示出来，所显示的内容如下:

我叫旗木卡卡西，我住在火影村，我今年30岁了，我的邮箱是kakaxi@itcast.cn，我的工资2000

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        var name = '小烟火'
        var sex = '男'
        var email = '123@qq.com'
        var address = '郑州';
        console.log(name)
        console.log(sex)
        console.log(email)
        console.log(address)
    </script>
</head>
<body>
    
</body>
</html>
```

1. 弹出一个输入框，提示用户输入姓名。
2. 弹出一个对话框，输出用户刚才输入的姓名。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        var myname = prompt('请输入名字：')
        alert(myname)
    </script>
</body>
</html>
```

## 变量的语法扩展

### 更新变量

一个变量被重新复赋值后，它原有的值就会被覆盖，变量值将以最后一次赋的值为准。

```js
var age = 18;
age = 81; // 最后的结果就是81因为18 被覆盖掉了 
```

### 同时声明多个变量

同时声明多个变量时，只需要写一个 var， 多个变量名之间使用英文逗号隔开。

```js
var age = 10, name = 'zs', sex = 2; 
```

### 声明变量特殊情况

| 情况                         | 说明                   | 结果      |
| ---------------------------- | ---------------------- | --------- |
| var age ; console.log (age); | 只声明，不赋值         | undefined |
| console.log(age)             | 不声明 不赋值 直接使用 | 报错      |
| age = 10; console.log (age); | 不声明 只赋值          | 10        |

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <script>
        // 1.更新变量
        var myname = '迪丽热巴';
        console.log(myname);
        myname = '古力娜扎';
        console.log(myname);
        // 2. 声明多个变量
        var sex = '女',
            age = 22,
            address = '河南';
        // 3. 声明变量的特殊情况
        // 3.1 只声明不赋值结果是? 程序也不知道里面存的是什么 所以结果是 undefined 未定义的
        var sex;
        console.log(sex);
        // 3.2 不声明 不赋值 直接使用某个变量会报错
        //console.log(tel);
        // 3.3 不声明直接赋值使用
        qq = 110;
        console.log(qq)   
    </script>
</body>
</html>
```

## 变量的命名规范

+ 由字母(A-Za-z)、数字(0-9)、下划线(_)、美元符号( $ )组成，如：usrAge, num01, _name
+ 严格区分大小写。var app; 和 var App; 是两个变量
+ 不能 以数字开头。 18age 是错误的
+ 不能 是关键字、保留字。例如：var、for、while
+ 变量名必须有意义。 MMD BBD nl → age 
+ 遵守驼峰命名法。首字母小写，后面单词的首字母需要大写。 myFirstName
+ 推荐翻译网站： 有道 爱词霸

## 交换变量 

要求：交换两个变量的值 ( 实现思路：使用一个 临时变量 用来做中间存储

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        //1.我们需要一个临时变量 temp 帮助我们
        //2.把 apple1 的变量赋值给 temp
        //3.把 apple2 的变量赋值给 apple1
        //4.把临时变量 temp 里面的值赋值给 apple2
        var temp;
        var apple1 = '青苹果';
        var apple2 = '红苹果';
        temp = apple1;
        apple1 = apple2;
        apple2 = temp;
        console.log(apple1);
        console.log(apple2);
    </script>
</head>
<body>
    
</body>
</html>
```

