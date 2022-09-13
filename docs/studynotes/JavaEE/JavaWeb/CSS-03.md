---
title: CSS-03
date: 2022-09-13 21:38:34
permalink: /pages/ac1ebe/
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# 盒子模型

其实，CSS就三个大模块：  盒子模型 、 浮动 、 定位，其余的都是细节。要求这三部分，无论如何也要学的非常精通。  

## 看透网页布局的本质

网页布局中，我们是如何把里面的文字，图片，按照美工给我们的效果图排列的整齐有序呢？

其实就是把网页元素比如文字图片等等，放入盒子里面，然后利用CSS摆放盒子的过程，就是网页布局。

![image-20220513233145379](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/image-20220513233145379.75mc9uh3e3o0.webp)

## 盒子模型（Box Model）

所谓盒子模型：
- 就是把HTML页面中的布局元素看作是一个矩形的盒子，也就是一个盛装内容的容器。
- CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：
- *外边距（margin）、*
- *边框（border）、*
- *内边距（padding）、*
- *实际内容（content）四个属性。*

首先，我们来看一张图，来体会下什么是盒子模型。

![image-20210324160524683](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/image-20210324160524683.2y5i3om1ho80.webp)

> 1.所有的文档元素（标签）都会生成一个矩形框，它描述了一个文档元素在网页布局汇总所占的位置大小。
>
> 2.因此，<strong style="color: #f00;">每个盒子除了有自己大小和位置外，还影响着其他盒子的大小和位置。</strong>
>
> 拿水果来比喻帮助记忆:
>
> ![youzi](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/youzi.1ds5qzp5t9a8.webp)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .box {
            width: 200px;
            height: 100px;
            /* 内边距 */
            padding: 10px;
            /* 边框 */
            border: 20px solid red;
            /* 外边框 */
            /* 盒子与盒子的距离 */
            margin: 20px;
        }
    </style>
</head>
<body>
    <div class="box">
        Hello
    </div>
    <div class="box">
        Hello
    </div>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/image.175vkd6aw2ww.webp)

## 盒子边框（border）

边框就是柚子皮。

语法： 

```css
border : border-width | border-style | border-color 
```

| 属性         |          作用          |
| ------------ | :--------------------: |
| border-width | 定义边框粗细，单位是px |
| border-style |       边框的样式       |
| border-color |        边框颜色        |

边框样式（border-style），常用属性值如下：

```css
none：没有边框即忽略所有边框的宽度（默认值）
solid：边框为单实线(最为常用的)
dashed：边框为虚线  
dotted：边框为点线
double：边框为双实线
```

> 我们在开发中，经常把表单原本的边框去掉，然后添加任意的样式。（border: 0）

### 边框综合设置

```
border : border-width || border-style || border-color 
```

```css
/*没有顺序*/   
border: 1px solid red;  
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
        .box {
            width: 200px;
            height: 100px;
            /* 边框的粗细 */
            border-width: 5px;
            /* 边框的样式  实线*/
            border-style: solid;
            /* 边框的样式  虚线*/
            border-style: dashed;
            /* 边框的颜色 */
            border-color: aqua;
            /* 双实线 */
            border: 20px double orange;
        }
    </style>
</head>
<body>
    <div class="box">box</div>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/image.7botyzqu9740.webp)

### 圆角边框(CSS3)

从此以后，我们的世界不只有矩形。radius 半径（距离）

允许你设置元素的外边框圆角。当使用一个半径时确定一个圆形，当使用两个半径时确定一个椭圆。这个(椭)圆与边框的交集形成圆角效果。

![](media\border-radius-sh.png)

语法格式：

```css
border-radius: 左上角  右上角  右下角  左下角;
```

- 其中每一个值可以为 数值或百分比的形式。 

- 技巧： 让一个正方形  变成圆圈 

  ```
  border-radius: 50%;
  ```

- 以上效果图矩形的圆角， 就不要用 百分比了，因为百分比会是表示高度和宽度的一半。
- 而我们这里矩形就只用 用 高度的一半就好了。精确单位。

演示例子风车：

![fengche](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/fengche.7jv8my4biio0.webp)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .con{
            width: 410px;
            height: 410px;
            /* border: 1px solid #ccc; */
            transition: all 5s;
            margin-top: 200px;
            margin-left: 400px;
        
        }
        .con div {
            width: 200px;
            height: 200px;
            background-color: rgb(53, 234, 53);
            display: inline-block;
        }

        .con1 {
            border-radius: 0px 200px 0px 200px;
        }
        .con2 {
            border-radius: 200px 0px 200px 0px;
        }

        .con:hover {
            /* 旋转 */
            transform: rotate(3600deg);
        }
    </style>

</head>
<body>
    <div class="con">
        <div class="con1"></div>
        <div class="con2"></div>
        <div class="con2"></div>
        <div class="con1"></div>
    </div>
</body>
</html>
```

## 内边距（padding）

padding属性用于设置内边距。 **是指 边框与内容之间的距离。**

```css
padding-top:上内边距
padding-right:右内边距
padding-bottom:下内边距
padding-left:左内边距
```

### 属性值设置

 温馨提示：  后面跟几个数值表示的意思是不一样的。

| 值的个数 | 表达意思                                                     |
| -------- | ------------------------------------------------------------ |
| 1个值    | padding：上下左右边距 比如padding: 3px; 表示上下左右都是3像素 |
| 2个值    | padding: 上下边距 左右边距 比如 padding: 3px 5px; 表示 上下3像素 左右 5像素 |
| 3个值    | padding：上边距 左右边距 下边距 比如 padding: 3px 5px 10px; 表示 上是3像素 左右是5像素 下是10像素 |
| 4个值    | padding:上内边距 右内边距 下内边距 左内边距 比如: padding: 3px 5px 10px 15px; 表示 上3px 右是5px 下 10px 左15px 顺时针 |

![image-20210709124751335](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/image-20210709124751335.1eixwqg5jnpc.webp)

## 外边距（margin）

margin属性用于设置外边距。  设置外边距会在元素之间创建“空白”， 这段空白通常不能放置其他内容。

```css
margin-top:上外边距
margin-right:右外边距
margin-bottom:下外边距
margin-left:上外边距
margin:上外边距 右外边距  下外边距  左外边
```

取值顺序跟内边距相同。

### 外边距实现盒子居中

可以让一个盒子实现水平居中，需要满足一下两个条件：

1. 必须是块级元素。     
2. 盒子必须指定了宽度（width）

然后就给**左右的外边距都设置为auto**，就可使块级元素水平居中。

实际工作中常用这种方式进行网页布局，示例代码如下：

```css
.header{ width:960px; margin:0 auto;}
```

### 文字(行内元素)居中

1. 文字水平居中是  text-align: center
2. 盒子水平居中:左右margin 改为 auto 

```css
text-align: center; /*  文字居中水平 */
margin: 10px auto;  /* 盒子水平居中  左右margin 改为 auto 就阔以了 */
```
### 清除元素的默认内外边距

为了更方便地控制网页中元素，制作网页时，可使用如下代码清除元素的默认内外边距： 

```css
* {
   padding:0;         /* 清除内边距 */
   margin:0;          /* 清除外边距 */
}
```

注意：  行内元素是只有左右外边距的，是没有上下外边距的。 内边距，在ie6等低版本浏览器也会有问题。

我们尽量不要给行内元素指定上下的内外边距就好了。

### 外边距合并

使用margin定义块元素的垂直外边距时，可能会出现外边距的合并。

#### 相邻块元素垂直外边距的合并

当上下相邻的两个块元素相遇时，如果上面的元素有下外边距margin-bottom，下面的元素有上外边距margin-top，则他们之间的垂直间距不是margin-bottom与margin-top之和，而是两者中的较大者。这种现象被称为相邻块元素垂直外边距的合并（也称外边距塌陷）。

![www](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/www.1cdjrsaor1ls.webp)

> 解决方案： 不要这样设置。

#### 嵌套块元素垂直外边距的合并

对于两个嵌套关系的块元素，如果父元素没有上内边距及边框，则父元素的上外边距会与子元素的上外边距发生合并，合并后的外边距为两者中的较大者，即使父元素的上外边距为0，也会发生合并。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220913/n.20m1e8bycov4.webp)

>解决方案：
>
>1. 可以为父元素定义1像素的上边框或上内边距。
>2. 可以为父元素添加overflow:hidden(overflow 属性规定当内容溢出元素框时发生的事情）。

## 盒子阴影

语法格式：

```css
box-shadow:水平阴影 垂直阴影 模糊距离 阴影尺寸 阴影颜色  内/外阴影；
```

| 值         | 说明                                                         |
| :--------- | :----------------------------------------------------------- |
| *h-shadow* | 必需的。水平阴影的位置。允许负值                             |
| *v-shadow* | 必需的。垂直阴影的位置。允许负值                             |
| *blur*     | 可选。模糊距离                                               |
| *spread*   | 可选。阴影的大小                                             |
| *color*    | 可选。阴影的颜色。在[CSS颜色值](https://www.runoob.com/cssref/css_colors_legal.aspx)寻找颜色值的完整列表 |
| inset      | 可选。从外层的阴影（开始时）改变阴影内侧阴影                 |

> 注意:
>
> 1. 前两个属性是必须写的。其余的可以省略。
> 2. 默认是外阴影 (outset) ，不用设置， 想要内阴影设为 inset 。
> 3. X轴与Y轴如果有值，就改变了（正值 向右 向下）

```css
div {
    width: 200px;
    height: 200px;
    border: 10px solid red;
    /* box-shadow: 5px 5px 3px 4px rgba(0, 0, 0, .4);  */
    /* box-shadow:水平位置 垂直位置 模糊距离 阴影尺寸（影子大小） 阴影颜色  内/外阴影； */
    box-shadow: 0 15px 30px  rgba(0, 0, 0, .4);			
}
```

## overflow 溢出

检索或设置当对象的内容超过其指定高度及宽度时如何管理内容。

```css
visible(默认) : 　不剪切内容也不添加滚动条。
auto : 　 超出自动显示滚动条，不超出不显示滚动条
hidden : 　不显示超过对象尺寸的内容，超出的部分隐藏掉
scroll : 　不管超出内容否，总是显示滚动条
```

应用:**溢出的文字隐藏**

```css
.hid-kk{
    width: 100px;
    height: 100px;
    display: block;
    /*1. 先强制一行内显示文本*/
    white-space: nowrap;
    /*2. 超出的部分隐藏*/
    overflow: hidden;
    /*3. 文字用省略号替代超出的部分*/
    text-overflow: ellipsis;
}
```

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



