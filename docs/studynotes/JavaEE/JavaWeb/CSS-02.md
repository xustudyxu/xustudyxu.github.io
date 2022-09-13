---
title: CSS-02
date: 2022-09-09 23:35:04
permalink: /JavaEE/JavaWeb/CSS-02
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# CSS-02

[[toc]]

## CSS复合选择器

复合选择器是由两个或多个基础选择器，通过不同的方式组合而成的,**目的是为了可以选择更准确更精细的目标元素标签**。

### 并集选择器

并集选择器（css选择器分组）是各个选择器通过**逗号**连接而成的，任何形式的选择器（包括标签选择器、class类选择器，id选择器等），都可以作为并集选择器的一部分。如果某些选择器定义的样式完全相同，或部分相同，就可以利用并集选择器为它们定义相同的CSS样式。

![image-20220513215703484](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220909/image-20220513215703484.3daay7jx6ec0.webp)

>并集选择器和的意思，只要逗号隔开的，所有选择器都会执行后面样式。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* .con {
            color: blue;
            font-size: 24px;
        }
        .main {
            color: blue;
            font-size: 24px;
        } */

        /* 并集选择器，将相同的样式进行统一设置 */
        .con,
        .main {
            color: blue;
            font-size: 24px; 
        }
        .main {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="con">祖国</div>
    <div class="main">统一</div>
    <div>Hello</div>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220909/image.i48pjr8lg3k.webp)

### 后代选择器(重点)

后代选择器又称为包含选择器。

- 用来选择元素或元素组的**子孙后代**。
- 其写法就是把外层标签写在前面，内层标签写在后面，中间用**空格**分隔，先写爷爷父亲，在写儿子孙子。

![image-20220513220452691](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220909/image-20220513220452691.5ro6vwhu8so0.webp)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* 更加精准的选择需要找到的元素 */
        /* 后代选择器 */
        .main span {
            color:red;
        }
    </style>
</head>
<body>
    <div class="main">
        <p>
            <span>
                今年中秋节适逢满月，真正的“十五的月亮十五圆”，月亮最圆时刻为9月10日农历八月十五的17时59分，也是中秋赏月最佳时刻。
            </span>
        </p>
        <span>
            中秋赏月最佳时刻。
        </span>
    </div>
    <span>Test</span>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220909/image.4oni4x8u4pe0.webp)

### 子元素选择器（重点）

子元素选择器只能选择作为某元素子元素的元素。

- 子元素选择器只能选择作为某元素**子元素(亲儿子)**的元素。
- 其写法就是把父级标签写在前面，子级标签写在后面，中间跟一个 `>` 进行连接

![image-20220513221713248](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220909/image-20220513221713248.5nd7isbh0p00.webp)

> 这里的子指的是亲儿子不包含孙子,重孙子之类。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .main>span {
            color:red;
        }
    </style>
</head>
<body>
    <div class="main">
        <p>
            <span>
                今年中秋节适逢满月，真正的“十五的月亮十五圆”，月亮最圆时刻为9月10日农历八月十五的17时59分，也是中秋赏月最佳时刻。
            </span>
        </p>
        <span>
            中秋赏月最佳时刻。
        </span>
    </div>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220909/image.1c1jbfvm5bwg.webp)

### 复合选择器总结

| 选择器       | 作用                     | 特征                 | 使用情况 | 隔开符号及用法               |
| ------------ | ------------------------ | -------------------- | -------- | ---------------------------- |
| 后代选择器   | 用来选择元素后代         | 是选择所有的子孙后代 | 较多     | 符号是**空格** .nav a        |
| 并集选择器   | 选择某些相同样式的选择器 | 可以用于集体声明     | 较多     | 符号是**逗号** .nav, .header |
| 子元素选择器 | 选择最近一级元素         | 只选亲儿子           | 较少     | 符号是**>**   .nav>p         |

### 综合练习

```html
<!-- 主导航栏 -->
<div class="nav">
    <ul>
        <li>
            <a href="">公司首页</a>
        </li>
        <li>
            <a href="">公司简介</a>
        </li>
        <li>
            <a href="">公司产品</a>
        </li>
        <li>
            <a href="">联系我们</a>
        </li>
    </ul>
    <em> 收藏本站 </em>
    <div> 联系我们:
        <em> 1234567890</em>
    </div> 
</div>
<!-- 侧导航栏 -->
<div class="sidebar">
    <div class="sidebarLeft">左侧导航栏</div>
    <div class="sidebarRight"><a href="#">登录</a></div>
</div>
```

在不修改以上代码的前提下，完成以下任务：

1. 主导航栏和侧导航栏里面文字都是18像素并且是微软雅黑。

2. 链接登录的颜色为红色。

3. 主导航栏里的列表中的文字颜色为深灰色。

4. 收藏本站要求字体加粗。

    > 我们网页的标签非常多，在不同地方会用到不同类型的选择器，以便更好的完成我们的网页。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .nav
        .sidebar{
            font-size: 18px;
            font-family: 微软雅黑;
        }
        .sidebar a {
            color: red;
        }
        .nav>ul>li>a {
            color:darkgray;
        }
        .nav>em {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <!-- 主导航栏 -->
<div class="nav">
    <ul>
        <li>
            <a href="">公司首页</a>
        </li>
        <li>
            <a href="">公司简介</a>
        </li>
        <li>
            <a href="">公司产品</a>
        </li>
        <li>
            <a href="">联系我们</a>
        </li>
    </ul>
    <em> 收藏本站 </em>
    <div> 联系我们:
        <em> 1234567890</em>
    </div> 
</div>
<!-- 侧导航栏 -->
<div class="sidebar">
    <div class="sidebarLeft">左侧导航栏</div>
    <div class="sidebarRight"><a href="#">登录</a></div>
</div> 
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220909/image.3blqygk1kps0.webp)

## 标签显示模式（display）（重点）

**什么是标签的显示模式？**

标签以什么方式进行显示，比如div 自己占一行， 比如span 一行可以放很多个


- 作用： 

  我们网页的标签非常多，再不同地方会用到不同类型的标签，以便更好的完成我们的网页。

- 标签的类型(分类)

  HTML标签一般分为块标签和行内标签两种类型，它们也称块元素和行内元素。

### 块级元素(block-level)

每个块元素通常都会独自占据一整行或多整行，可以对其设置宽度、高度、对齐等属性，常用于网页布局和网页结构的搭建。

```css
常见的块元素有<h1>~<h6>、<p>、<div>、<ul>、<ol>、<li>等，其中<div>标签是最典型的块元素。
```

块级元素的特点：

（1）总是从新行开始。

（2）高度、宽度、行高、外边距以及内边距都可以控制。

（3）宽度默认是容器的100%。

（4）可以容纳内联元素和其他块元素。

### 行内元素(inline-level)

行内元素（内联元素）不占有独立的区域，仅仅靠自身的字体大小和图像尺寸来支撑结构，一般不可以设置宽度、高度、对齐等属性，常用于控制页面中文本的样式。

```css
常见的行内元素有<a>、<strong>、<b>、<em>、<i>、<del>、<s>、<ins>、<u>、<span>等，其中<span>标签最典型的行内元素。
```

行内元素的特点：

（1）和相邻行内元素在一行上。

（2）高、宽无效，但水平方向的padding和margin可以设置，垂直方向的无效。

（3）默认宽度就是它本身内容的宽度。

（4）行内元素只能容纳文本或则其他行内元素。（a特殊）

>注意:
>1. 只有文字才能组成段落因此 p 里面不能放块级元素，同理还有这些标签h1,h2,h3,h4,h5,h6,dt，他们都是文字类块级标签，里面不能放其他块级元素。
>2. 链接里面不能再放链接。

### 行内块元素（inline-block）

```
在行内元素中有几个特殊的标签——<img />、<input />可以对它们设置宽高和对齐属性，有些资料可能会称它们为行内块元素。
```

行内块元素的特点：

（1）默认宽度就是它本身内容的宽度。

（2）宽度，高度，行高、外边距以及内边距都可以控制。

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
            width: 100px;
            height: 200px;
            border: 1px solid red;
            /* div默认的dispaly属性为block */
            /* 转成行内元素 */
            display: inline;
            /* 转成行内块元素 */
            display: inline-block;

        }
        span {
            width: 100px;
            height: 200px;
            border: 1px solid red;
            /* 转成块元素 */
            display: block;
        }
        
    </style>
</head>
<body>
    <div>div元素1</div>
    <div>div元素2</div>
    <span>span元素1</span>
    <span>span元素2</span>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220909/image.oe7t07h9zvk.webp)

### 三种模式总结区别

| 元素模式   | 元素排列               | 设置样式               | 默认宽度         | 包含                     |
| ---------- | ---------------------- | ---------------------- | ---------------- | ------------------------ |
| 块级元素   | 一行只能放一个块级元素 | 可以设置宽度高度       | 容器的100%       | 容器级可以包含任何标签   |
| 行内元素   | 一行可以放多个行内元素 | 不可以直接设置宽度高度 | 它本身内容的宽度 | 容纳文本或则其他行内元素 |
| 行内块元素 | 一行放多个行内块元素   | 可以设置宽度和高度     | 它本身内容的宽度 |                          |

### 总结-块级元素和行内元素分别有哪些？

1. 行内元素有：a b span img input select strong（强调的语气）
2. 块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p table form


### 标签显示模式转换 display

- 块转行内：display:inline;
- 行内转块：display:block;
- 块、行内元素转换为行内块： display: inline-block;

## 背景样式（重点）

### 背景颜色

| 属性名 | background-color                                             |
| ------ | ------------------------------------------------------------ |
| 属性值 | 合法的颜色的名，比如：`red`；十六进制值，比如：`#ff0000`；RGB 值，比如：`rgb(255,0,0)` |
| 默认值 | transparent                                                  |
| 描述   | 设置背景颜色。                                               |

 示例如下：

```css
.box {
    /* 下面3种写法是等价的 */
    background-color: red;
    background-color: rgb(255, 0, 0);
    background-color: #ff0000;
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .con {
            width: 200px;
            height: 300px;
            /* 预定义 */
            /* background-color: red; */
            /* 十六进制 */
            /* background-color: #fff; */
            background-color: red;
            background-color: rgba(255,0,0,0.5);
        }
        /* 背景图片 */
        .box {
            width: 800px;
            height: 1000px;
            border: 1px solid red;
            background-image: url(images/01.png);
            /* 背景重复方式 */
            /* 只在水平位置显示 */
            /* background-repeat: repeat-x; */
            background-repeat: no-repeat;
            /* 背景的位置 */
            /* 水平 垂直 */
            /* 右下 */
            background-position: right bottom;
            /* 中间 */
            background-position: center center;
            /* 像素值 */
            background-position: 50px 50px;
            /* 水平 垂直 */
            background-position: 50% 30%;
            /* 如果只设置一个值，另外一个值是50% 居中的 */
            background-position: right;


        }
    </style>
</head>
<body>
    
</body>
    <div class="box">哈哈</div>
    <div class="con"></div>
</html>
```

### 背景图片

| 属性名 | background-image |
| ------ | ---------------- |
| 属性值 | 图片所在路径     |
| 默认值 | none             |
| 描述   | 设置背景图片。   |

 示例如下：

```css
.box {
    background-image: url("./logo.jpg");
}
```

### 图片重复方式

| 属性名 | background-repeat                           |
| ------ | ------------------------------------------- |
| 属性值 | repeat \| repeat-x \| repeat-y \| no-repeat |
| 默认值 | repeat                                      |
| 描述   | 设置背景图片。                              |

   **属性值**

| 值        | 描述                                       |
| --------- | ------------------------------------------ |
| repeat    | 默认。背景图像将在垂直方向和水平方向重复。 |
| repeat-x  | 背景图像将在水平方向重复。                 |
| repeat-y  | 背景图像将在垂直方向重复。                 |
| no-repeat | 背景图像将仅显示一次。                     |

示例如下：

```css
.box {
    /* repeat 默认值，默认情况下，在水平和垂直方向上都重复*/
    background-repeat: repeat;
    background-repeat: repeat-x;
    background-repeat: repeat-y;
    background-repeat: no-repeat;
}
```

## 图片位置(重点)

| 属性名 | background-position              |
| ------ | -------------------------------- |
| 属性值 | 长度 \| 百分比 \| 表示方位的单词 |
| 默认值 | 0% 0%                            |
| 描述   | 背景图片的位置                   |

示例如下：

```css
/*
    水平：left center right
    垂直：top  center bottom
*/

.box {
    background-position: 40px 40px;（水平位置、垂直位置）
    background-position: 20% 20%;
    background-position: right bottom;
}
```



### 为什么需要CSS精灵技术

![sss](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220909/sss.5gmsgkgijj80.webp)

图所示为网页的请求原理图，当用户访问一个网站时，需要向服务器发送请求，网页上的每张图像都要经过一次请求才能展现给用户。

然而，一个网页中往往会应用很多小的背景图像作为修饰，当网页中的图像过多时，服务器就会频繁地接受和发送请求，这将大大降低页面的加载速度。

现在我们来回答为什么需要精灵技术？

> **为了有效地减少服务器接受和发送请求的次数，提高页面的加载速度。**

### 精灵技术

CSS 精灵其实是将网页中的一些背景图像整合到一张大图中（精灵图），然而，各个网页元素通常只需要精灵图中不同位置的某个小图，要想精确定位到精灵图中的某个小图。

这样，当用户访问该页面时，只需向服务发送一次请求，网页中的背景图像即可全部展示出来。

我们需要使用CSS的

- background-image
- background-repeat
- background-position属性进行背景定位，
- 其中最关键的是使用background-position 属性精确地定位。

> 注意:
>
> css精灵技术主要针对于背景图片，插入的图片img 是不需要这个技术的。
>
> 1. 精确测量，每个小背景图片的大小和 位置。
> 2. 给盒子指定小背景图片时， 背景定位基本都是负值。

## 简写属性

| 属性名 | background                   |
| ------ | ---------------------------- |
| 属性值 | color image  repeat position |
| 默认值 | 每个属性的默认值             |
| 描述   | 设置背景图片是否随内容滚动   |

示例如下：

```css
.box {
    background: #00ff00 url("index.png") no-repeat fixed center;
}
```
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .con {
            /* 1.测量元素的宽和高 */
            width: 62px;
            height: 58px;
            border: 1px solid red;
            /* 2.引入图片 */
            /* background-image: url(images/01.png);
            background-repeat: -181px; */
            /* 3.设置图片的位置，测量后将测量值的值设置 */

            /* 如果只设置一个值 */
            /* 颜色，图片，背景重复方式，位置 */
            background: red url(images/01.png) no-repeat 0px 0px;
        }
    </style>
</head>
<body>
    
</body>
    <div class="con"></div>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/image.1f4su0daopj4.webp)

## 背景透明(CSS3)

CSS3支持背景半透明的写法语法格式是:

```css
background: rgba(0,0,0,0.3);
```

 最后一个参数是alpha 透明度  取值范围 0~1之间

 注意：  背景半透明是指盒子背景半透明， 盒子里面的内容不收影响。

## 背景缩放(CSS3)

通过background-size设置背景图片的尺寸，就像我们设置img的尺寸一样，在移动Web开发中做屏幕适配应用非常广泛。

其参数设置如下：

a) 可以设置长度单位(px)（img大小一样）或百分比（设置百分比时，参照盒子的宽高）

b) 设置为cover时，会自动调整缩放比例，保证图片始终填充满背景区域，如有溢出部分则会被隐藏。我们平时用的cover 最多

c) 设置为contain会自动调整缩放比例，保证图片始终完整显示在背景区域。

```css
background-image: url('images/bg.jpg');
background-size: 300px 100px;
/* background-size: contain; */
/* background-size: cover; */
```
> 注意:`background-size`属性一定要写在`background`属性后面。

## 背景总结

| 属性                | 作用           | 值                                                           |
| ------------------- | :------------- | :----------------------------------------------------------- |
| background-color    | 背景颜色       | 预定义的颜色值/十六进制/RGB代码                              |
| background-image    | 背景图片       | url(图片路径)                                                |
| background-repeat   | 是否平铺       | repeat/no-repeat/repeat-x/repeat-y                           |
| background-position | 背景位置       | length/position    分别是x  和 y坐标， 切记 如果有 精确数值单位，则必须按照先X 后Y 的写法 |
| 背景简写            | 更简单         | 背景颜色 背景图片地址 背景平铺 背景滚动 背景位置;  他们没有顺序 |
| 背景透明            | 让盒子半透明   | background: rgba(0,0,0,0.3);   后面必须是 4个值              |
| 背景缩放            | 背景图片的尺寸 | 长度单位、cover、contain                                     |

## 导航案例

```        html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>		
        a {
            width: 150px;
            height: 50px;
            /* 把a行内元素转换为行内块元素 */
            display: inline-block;
            /* 文字水平居中 */
            text-align: center;
            /* 我们设定行高等于盒子的高度，就可以使文字垂直居中 */
            line-height: 50px;
            /* 字体颜色 */
            color: #666;
            /* 取消下划线 文本装饰 */
            text-decoration: none;
        }
        a:hover {  /* 鼠标经过 给我们的链接添加背景图片*/
            background: url(images/btn.png) no-repeat; 
        }
    </style>
</head>
<body>
    <a href="#">首页</a>
    <a href="#">业务介绍</a>
    <a href="#">关于我们</a>
    <a href="#">联系我们</a>
</body>
```

+ 鼠标放在业务介绍

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/image.4cko362ezv0.webp)

# list-style 属性

list-style 简写属性在一个声明中设置所有的列表属性。

可以按顺序设置如下属性：

- list-style-type
- list-style-position
- list-style-image

例如:把图像设置为列表中的列表项目标记：

```css
ul
  {
  	list-style:square inside url(media/arrow.gif);
  }
```

## list-style-type

| 值     | 描述                 |
| :----- | :------------------- |
| none   | 无标记。             |
| disc   | 默认。标记是实心圆。 |
| circle | 标记是空心圆。       |
| square | 标记是实心方块       |

## list-style-position

| 值      | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| inside  | 列表项目标记放置在文本以内，且环绕文本根据标记对齐。         |
| outside | 默认值。保持标记位于文本的左侧，列表项目标记放置在文本以外，且环绕文本不根据标记对齐。 |

## list-style-image

| 值    | 描述                 |
| :---- | :------------------- |
| *URL* | 图像的路径。         |
| none  | 默认。无图形被显示。 |

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        /* ul元素上有小圆点 */
        ul {
            /* 去掉小圆点 */
            list-style-type: none;
            /* list-style-type: ; */
            /* list-style-type: disc; 默认实心圆 */
            /* list-style-type: circle; 空心圆 */
            list-style-type: square;
            /* 小圆点位置 */
            list-style-position: inside;

            list-style-image: url(../../CSS/HomeWork/images/sq.png);
        }
    </style>
</head>
<body>
    <ul>
        <li>元素</li>
    </ul>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/image.7fu6ni53s5c.webp)

# CSS 三大特性

层叠,继承,优先级是我们学习CSS 必须掌握的三个特性。

## CSS层叠性

- 所谓层叠性是指多种CSS样式的叠加,就是css处理冲突的能力。

**一般情况下，如果出现样式冲突，则会按照CSS书写的顺序，以最后的样式为准。**

当同一个元素被两个选择器选中时，CSS会根据选择器的权重决定使用哪一个选择器。权重低的选择器效果会被权重高的选择器效果覆盖（层叠）。

可以这样理解权重：这个选择器对于这个元素的重要性。

## CSS继承性

所谓继承性是指书写CSS样式表时，子标签会继承父标签的某些样式，如文本颜色和字号。想要设置一个可继承的属性，只需将它应用于父元素即可。

> 注意：
>
> 1.**所以对于字体、文本属性等网页中通用的样式可以使用继承。**例如，字体、字号、颜色、行距等可以在body元素中统一设置，然后通过继承影响文档中所有文本。
>
> 2.并不是所有的CSS属性都可以继承，例如，下面的属性就不具有继承性：边框、外边距、内边距、背景、定位、元素高属性。

## CSS优先级

定义CSS样式时，经常出现两个或更多规则应用在同一元素上，这时就会出现优先级的问题,即考虑权重的问题。

**!important>行内样式表>ID选择器>类选择器>标签选择器>通配符>继承的样式>浏览器默认样式**

在考虑权重时，初学者还需要注意一些特殊的情况，具体如下：

- 继承样式的权重为0。即在嵌套结构中，不管父元素样式的权重多大，被子元素继承时，他的权重都为0，也就是说子元素定义的样式会覆盖继承来的样式。
- 行内样式优先。应用style属性的元素，其行内样式的权重非常高，可以理解为远大于100。总之，他拥有比上面提高的选择器都大的优先级。
- 权重相同时，CSS遵循就近原则。也就是说靠近元素的样式具有最大的优先级，或者说排在最后的样式优先级最大。 
- CSS定义了一个!important命令，该命令被赋予最大的优先级。也就是说不管权重如何以及样式位置的远近，!important都具有最大优先级。

| 继承或者* 的贡献值       | 0,0,0,0  |
| ------------------------ | -------- |
| 每个元素（标签）贡献值为 | 0,0,0,1  |
| 每个类，伪类贡献值为     | 0,0,1,0  |
| 每个ID贡献值为           | 0,1,0,0  |
| 每个行内样式贡献值       | 1,0,0,0  |
| 每个!important贡献值     | ∞ 无穷大 |

**权重是可以叠加的**

 比如的例子：

| 选择器     | 权重    |
| ---------- | ------- |
| div ul  li | 0,0,0,3 |
| .nav ul li | 0,0,1,2 |
| a:hover    | 0,0,1,1 |
| .nav a     | 0,0,1,1 |
| #nav p     | 0,1,0,1 |

> 注意:
>
> 1.数位之间没有进制 比如说： 0,0,0,5 + 0,0,0,5 =0,0,0,10 而不是 0,0, 1, 0， 所以不会存在10个div能赶上一个类选择器的情况。
>
> 2.继承的权重是 0



