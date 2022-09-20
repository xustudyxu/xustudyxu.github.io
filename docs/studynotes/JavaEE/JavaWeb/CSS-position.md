---
title: CSS-定位(position)
date: 2022-09-16 21:50:41
permalink: /JavaEE/JavaWeb/CSS-position
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# CSS-定位(position)

[[toc]]

如果说浮动， 关键在一个 “浮” 字上面， 那么,定位关键在于一个 “位” 上。

## 为什么要用定位？

那么定位，最长运用的场景再那里呢？   

1. 左右箭头压住图片：

![image-20220514201510497](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514201510497.4z7o8mnm1sk0.webp)

2.固定在窗口的广告

![image-20220514201806384](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514201806384.j7fi2sgnkeg.webp)

## 元素的定位属性

元素的定位属性主要包括定位模式和边偏移两部分。

1.定位模式(定位的分类)

在CSS中，position属性用于定义元素的定位模式，其基本语法格式如下：

```css
选择器{
    position:属性值;
}
```

position属性的常用值

| 值       | 描述                                             |
| -------- | ------------------------------------------------ |
| static   | 自动定位（默认定位方式）                         |
| relative | 相对定位，相对于其原文档流的位置进行定位         |
| absolute | 绝对定位，相对于其上一个已经定位的父元素进行定位 |
| fixed    | 固定定位，相对于浏览器窗口进行定位               |

2.边偏移

| 边偏移属性 | 描述                                           |
| ---------- | ---------------------------------------------- |
| top        | 顶端偏移量，定义元素相对于其父元素上边线的距离 |
| bottom     | 底部偏移量，定义元素相对于其父元素下边线的距离 |
| left       | 左侧偏移量，定义元素相对于其父元素左边线的距离 |
| right      | 右侧偏移量，定义元素相对于其父元素右边线的距离 |

## 静态定位(static)

静态定位是所有元素的默认定位方式，当position属性的取值为static时，可以将元素定位于静态位置。 所谓静态位置就是各个元素在HTML文档流中默认的位置。

在静态定位状态下，无法通过边偏移属性（top、bottom、left或right）来改变元素的位置。

## 相对定位relative(自恋型)

相对定位是将元素相对于它在标准流中的位置进行定位，当position属性的取值为relative时，可以将元素定位于相对位置。

对元素设置相对定位后，可以通过边偏移属性改变元素的位置，但是它在文档流中的位置仍然保留。如下图所示，即是一个相对定位的效果展示：

![image-20220514193428435](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514193428435.3xyowwdfocq0.webp)

注意：   

1. 相对定位最重要的一点是，它可以通过边偏移移动位置，但是原来的所占的位置，继续占有。
2. 其次，每次移动的位置，是以自己的左上角为基点移动（相对于自己来移动位置）

就是说，相对定位的盒子仍在标准流中，它后面的盒子仍以标准流方式对待它。（相对定位不脱标）

如果说浮动的主要目的是 让多个块级元素一行显示，那么定位的主要价值就是移动位置， 让盒子到我们想要的位置上去。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .father {
            width: 600px;
            height: 400px;
            border: 1px solid red;
        }

        .father div {
            width: 100px;
            height: 100px;
        }
        .son1 {
            background-color: yellow;
        }
        .son2 {
            background-color: red;
            /* 相对定位 */
            /* 相对于原来自己的位置进行移动,原来的位置仍然占位 */
            position: relative;
            /* 边偏移  2个方向配合即可*/

            
            left: 100px;
            top: 50px;
        }
        .son3 {
            background-color: blue;
        }
    </style>
</head>
<body>
    <div class="father">
        <div class="son1">son1</div>
        <div class="son2">son2</div>
        <div class="son3">son3</div>
    </div>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/image.6133ran2i9g0.webp)

## 绝对定位absolute (拼爹型)

当position属性的取值为absolute时，可以将元素的定位模式设置为绝对定位。

绝对定位最重要的一点是，它可以通过边偏移移动位置，但是它完全脱标，不占位置。

### 父级没有定位

若所有父元素都没有定位，以浏览器为准对齐(document文档)。

![image-20220514194512742](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514194512742.3h1ldgotkek0.webp)

### 父级有定位

绝对定位是将元素依据最近的已经定位（绝对、固定或相对定位）的父元素（祖先）进行定位。 

![image-20220514194643551](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514194643551.kqgzpc76hdo.webp)

### 子绝父相

- 这个“子绝父相”太重要了，是我们学习定位的口诀。

- **子绝父相**就是指子元素设置绝对定位，而父元素设置相对定位。
- 换句话说：如果要对一个子元素使用定位的话，让子元素（绝对定位）以其父元素（相对定位）为标准来定位。

>因为子级是绝对定位，不会占有位置， 可以放到父盒子里面的任何一个地方。
>
>父盒子布局时，需要占有位置，因此父亲只能是 相对定位. 
>
>这就是子绝父相的由来。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        .father {
            width: 600px;
            height: 400px;
            border: 1px solid red;
        }

        .father div {
            width: 100px;
            height: 100px;
        }
        .son1 {
            background-color: yellow;
        }
        .son2 {
            background-color: red;
            /* 绝对定位 */
            /* 绝对定位，完全脱标，脱离标准流，不占位置 */
            position: absolute;
            /* 边偏移  2个方向配合即可*/

            
            left: 100px;
            top: 0px;
        }
        .son3 {
            background-color: blue;
        }
    </style>
</head>
<body>
    <div class="father">
        <div class="son1">son1</div>
        <div class="son2">son2</div>
        <div class="son3">son3</div>
    </div>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/image.1ied7kxdm268.webp)

## 定位的扩展

### 绝对定位的盒子水平/垂直居中

普通的盒子是左右margin 改为 auto就可， 但是对于绝对定位就无效了。

定位的盒子也可以水平或者垂直居中，有一个算法。

![image-20220514200027548](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514200027548.5put7avqgck0.webp)

1. 首先left 50%,top50%父盒子的一半大小。  

2. 然后外边距退回自己宽度及高度的一半值就可以了 。

   ```css
   .father {
       width: 600px;
       height: 400px;
       background-color: #ccc;
       margin: 100px auto;
       /* 1.设定父元素为相对定位 */
       position: relative;
   }
   
   .son {
       width: 200px;
       height: 200px;
       background-color: rgb(113, 113, 238);
       /* 2.子元素为绝对定位 */
       position: absolute;
       left: 50%;
       top: 50%;
       /* 3.倒回去自身的一半 */
       margin-left: -100px;
       margin-top: -100px;
   }
   ```

### 固定定位fixed(认死理型)

固定定位是绝对定位的一种特殊形式,它以浏览器窗口作为参照物来定义网页元素。当position属性的取值为fixed时，即可将元素的定位模式设置为固定定位。

当对元素设置固定定位后，它将脱离标准文档流的控制，始终依据浏览器窗口来定义自己的显示位置。不管浏览器滚动条如何滚动也不管浏览器窗口的大小如何变化，该元素都会始终显示在浏览器窗口的固定位置。

>固定定位有两点：
>
>1. 固定定位的元素跟父亲没有任何关系，只认浏览器。
>2. 固定定位完全脱标，不占有位置，不随着滚动条滚动。

### 叠放次序（z-index）

当对多个元素同时设置定位时，定位元素之间有可能会发生重叠。

![image-20220514200801604](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220916/image-20220514200801604.7i6vqf461e80.webp)

在CSS中，要想调整重叠定位元素的堆叠顺序，可以对定位元素应用z-index层叠等级属性，其取值可为正整数、负整数和0。

>注意：
>
>1. z-index的默认属性值是0，取值越大，定位元素在层叠元素中越居上。
>2. 如果取值相同，则根据书写顺序，后来居上。
>3. 后面数字一定不能加单位。  
>4. 只有相对定位，绝对定位，固定定位有此属性，其余标准流，浮动，静态定位都无此属性，亦不可指定此属性。

## 四种定位总结

| 定位模式         | 是否脱标占有位置     | 是否可以使用边偏移 | 移动位置基准                     |
| ---------------- | -------------------- | ------------------ | -------------------------------- |
| 静态static       | 不脱标，正常模式     | 不可以             | 正常模式                         |
| 相对定位relative | 不脱标，占有位置     | 可以               | 相对自身位置移动（自恋型）       |
| 绝对定位absolute | 完全脱标，不占有位置 | 可以               | 相对于定位父级移动位置（拼爹型） |
| 固定定位fixed    | 完全脱标，不占有位置 | 可以               | 相对于浏览器移动位置（认死理型） |

