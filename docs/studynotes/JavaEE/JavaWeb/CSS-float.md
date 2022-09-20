---
title: CSS-浮动(float)
date: 2022-09-16 21:42:52
permalink: /JavaEE/JavaWeb/CSS-float
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# CSS-浮动(float)

[[toc]]

## CSS 布局的三种机制

网页布局的核心——就是**用 CSS 来摆放盒子**。CSS 提供了 **3 种机制**来设置盒子的摆放位置，分别是**普通流**（标准流）、**浮动**和**定位**，其中： 

1. **普通流**（标准流）
   - **块级元素**会独占一行，**从上向下**顺序排列；
   - **行内元素**会按照顺序，**从左到右**顺序排列，碰到父元素边缘则自动换行；

2. **浮动**
   - 让盒子从普通流中**浮**起来,主要作用让多个块级盒子一行显示。

3. **定位**
   - 将盒子**定**在浏览器的某一个**位**置——CSS 离不开定位，特别是后面的 js 特效。

>总结：html当中有一个相当重要的概念，标准流或者普通流。普通流实际上就是一个网页内标签元素正常从上到下，从左到右排列顺序的意思，比如块级元素会独占一行，行内元素会按顺序依次前后排列；按照这种大前提的布局排列之下绝对不会出现例外的情况叫做普通流布局。

## 为什么需要浮动？

- 盒子一行显示

  ![image-20220514085450141](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514085450141.676dtb8py3o0.webp)

- 盒子的左右对齐

![image-20220514090444248](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514090444248.36k6its0iye0.webp)

## 什么是浮动？

元素的浮动是指设置了浮动属性的元素会**脱离标准普通流**的控制，**移动到其父元素中指定位置**的过程。

在CSS中，通过float属性来定义浮动，其基本语法格式如下：

```css
选择器{
    float:属性值;
}
```

| 属性值 | 描述                 |
| ------ | -------------------- |
| none   | 元素不浮动（默认值） |
| left   | 元素向左浮动         |
| right  | 元素向右浮动         |

## 浮动的特性

浮动脱离标准流，不占位置，会影响标准流。浮动只有左右浮动。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div {
            width: 200px;
            height: 100px;
            /* display: inline-block; */
            /* 浮动 */
            /* 1。使元素在一行内显示,使用浮动 */
            float: left;
            /* 浮动的元素的display属性是block */
        }
        .con1 {
            background-color: red;
        }
        .con2 {
            background-color: blue;
        }
        .con3 {
            background-color: yellow;
        }
    </style>
</head>
<body>
    <div class="con1"></div>
    <div class="con2"></div>
    <div class="con3"></div>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/image.48fey9w1jlg0.webp)

### 浮动的元素的对齐

浮动首先创建包含块的概念（包裹）,总是找理它最近的父级元素,但是不会超出内边距的范围。 

 ![image-20220514125808356](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514125808356.4rjdssm1jme0.webp) 

### 浮动的元素排列位置

浮动的元素排列位置，跟上一个元素（块级）有关系。如果上一个元素有浮动，则A元素顶部会和上一个元素的顶部对齐；如果上一个元素是标准流，则A元素的顶部会和上一个元素的底部对齐。

 ![image-20220514131532201](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514131532201.618ww8qj0yo0.webp)

>总结:
>
>- 浮动的目的就是为了让多个块级元素同一行上显示。
>- 一个父盒子里面的子盒子，如果其中一个子级有浮动的，则其他子级都需要浮动。这样才能一行对齐显示。
>- 元素添加浮动后，浮动的元素脱标,虽然一行内显示但是display属性为block。

# 清除浮动

## 为什么要清除浮动

我们前面说过，浮动本质是用来做一些文字混排效果的，但是被我们拿来做布局用，则会有很多的问题出现， 但是，你不能说浮动不好 。  

由于浮动元素不再占用原文档流的位置，所以它会对后面的元素排版产生影响，为了解决这些问题，此时就需要在该元素中清除浮动。

准确地说，并不是清除浮动，而是**清除浮动后造成的影响。**

如果浮动一开始就是一个美丽的错误，那么请用正确的方法挽救它。

## 清除浮动本质

清除浮动主要为了解决父级元素因为子级浮动引起内部高度为0的问题。

![image-20220514133526396](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514133526396.7bpf8nhfszk0.webp)

## 清除浮动的方法

其实本质叫做闭合浮动更好一些, 记住，清除浮动就是把浮动的盒子圈到里面，让父盒子闭合出口和入口不让他们出来影响其他元素。

在CSS中，clear属性用于清除浮动，其基本语法格式如下：

```css
选择器{
    clear:属性值;
}
```

| 属性值 | 描述                                       |
| ------ | ------------------------------------------ |
| left   | 不允许左侧有浮动元素（清除左侧浮动的影响） |
| right  | 不允许右侧有浮动元素（清除右侧浮动的影响） |
| both   | 同时清除左右两侧浮动的影响                 |

###  使用after伪元素清除浮动

**:after 方式为空元素的升级版，好处是不用单独加标签了** 

使用方法：

```css
 .clearfix:after {  
     content: "."; 
     display: block; 
     height: 0; 
     clear: both; 
     visibility: hidden;  
}   

 .clearfix {
     *zoom: 1;
}   /* IE6、7 专有 */
```

记忆法：code   hate   cv

基本语法

```
zoom : normal | number 
```

语法取值:

- normal  :默认值。使用对象的实际尺寸 

- number  : 百分数 | 无符号浮点实数。浮点实数值为1.0或百分数为100%时相当于此属性的 normal 值  

- 使用说明
  设置或检索对象的缩放比例。设置或更改一个已被呈递的对象的此属性值将导致环绕对象的内容重新流动。
  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* 1.父级元素因为子集元素浮动的问题导致高度为0 */
        .main {
            border: 1px solid red;
            /* height: 300px; */
            background-color: #fff;
        }

        .con1,.con2,.con3 {
            float: left;
            width: 100px;
            height: 100px;
            background-color: #666;
        }
        .main .con1 {
            background-color: blue;
        }
        .main .con2 {
            background-color: green;
        }
        .main .con3 {
            background-color: red;
        }
        /* 清除浮动 */
        /* 给浮动元素的父元素设置清除浮动 */
        .clearfix::after {
            content: '.';
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
        .he {
            width: 600px;
            height: 600px;
            background-color: pink;
        }
    </style>
</head>
<body>
    <div class="main clearfix">
        <div class="con1">
            con1
        </div>
        <div class="con2">
            con2
        </div>
        <div class="con3">
            con3
        </div>
        <!-- 不好 -->
        <!-- <div style="clear: both;"></div> -->
    </div>
    <div class="he"></div>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/image.ut0lbzkrms0.webp)