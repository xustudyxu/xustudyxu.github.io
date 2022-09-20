---
title: CSS3 2D和3D的使用
date: 2022-09-20 23:21:39
permalink: /JavaEE/JavaWeb/CSS2D3D
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# CSS3 2D和3D的使用

[[toc]]

## 过渡(CSS3) transition

过渡（transition)是CSS3中具有颠覆性的特征之一，我们可以在不使用 Flash 动画或 JavaScript 的情况下，当元素从一种样式变换为另一种样式时为元素添加效果。

帧动画：通过一帧一帧的画面按照固定顺序和速度播放。如电影胶片

在CSS3里使用transition可以实现补间动画（过渡效果），并且当前元素只要有“属性”发生变化时即存在两种状态(我们用A和B代指），就可以实现平滑的过渡，为了方便演示采用hover切换两种状态，但是并不仅仅局限于hover状态来实现过渡。

语法格式:

```css
transition: 要过渡的属性  花费时间  运动曲线  何时开始;
如果有多组属性变化，还是用逗号隔开。
```

| 属性                       | 描述                                         | CSS  |
| -------------------------- | -------------------------------------------- | ---- |
| transition                 | 简写属性，用于在一个属性中设置四个过渡属性。 | 3    |
| transition-property        | 规定应用过渡的 CSS 属性的名称。              | 3    |
| transition-duration        | 定义过渡效果花费的时间。默认是 0。           | 3    |
| transition-timing-function | 规定过渡效果的时间曲线。默认是 "ease"。      | 3    |
| transition-delay           | 规定过渡效果何时开始。默认是 0。             | 3    |

>如果想要所有的属性都变化过渡， 写一个all 就可以
>
>transition-duration  花费时间  单位是  秒 s    比如 0.5s    这个s单位必须写      ms 毫秒
>
>运动曲线   默认是 ease
>
> 何时开始  默认是 0s  立马开始

运动曲线示意图：

![1498445454760](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498445454760.13pt8ld549i8.webp)

```css
div {
    width: 200px;
    height: 100px;
    background-color: pink;
    /* transition: 要过渡的属性  花费时间  运动曲线  何时开始; */
    transition: width 0.6s ease 0s, height 0.3s ease-in 1s;
    /* transtion 过渡的意思  这句话写到div里面而不是 hover里面 */
    /* transition: all 0.6s;   所有属性都变化用all 就可以了  后面俩个属性可以省略 */		
}
div:hover {  
    /* 鼠标经过盒子，我们的宽度变为400 */
    width: 600px;
    height: 300px
}
```

###  手风琴案例

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

        ul {
            list-style-type: none;
        }

        /* 设置main的样式 */
        .main {
            width: 1200px;
            margin: 50px auto;
            height: 125px;
            background-color: skyblue;
            padding: 10px;
            border-radius: 10px;    
        }

        .list {
            width: 1200px;
            height: 125px;
            background-color: pink;
            border-radius: 10px;
        }
        .list li{
            float: left;
            width: 190px;
            height: 125px;
            /* max-width: 5px; */
            margin-right: 10px;
            overflow: hidden;
            border-radius: 10px;
            transition: all 1s;
        }
        .list li:nth-child(1){
            width: 575px;
        }
        .list:hover li{
            width: 190px;
        }
        .list li:hover{
            width: 575px;
        }
    </style>
</head>
<body>
    <div class="main">
        <ul class="list">
            <li>
                <img src="images/1.jpg" alt="">
            </li>
            <li>
                <img src="images/2.jpg" alt="">
            </li>
            <li>
                <img src="images/3.png" alt="">
            </li>
            <li>
                <img src="" alt="">
            </li>
        </ul>
    </div>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/image.ny60ozd3e0g.webp)

## 2D变形(CSS3) transform

transform是CSS3中具有颠覆性的特征之一，可以实现元素的位移、旋转、倾斜、缩放，甚至支持矩阵方式，配合过渡和即将学习的动画知识，可以取代大量之前只能靠Flash才可以实现的效果。

>  transform 变换 变形的意思  

### 移动 translate(x, y)    

translate 移动平移的意思

![1498443715586](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498443715586.6c4wd2f8ffg0.webp)

```css
translate(50px,50px);
```

使用translate方法来将文字或图像在水平方向和垂直方向上分别移动。

```css
 translate(x,y)水平方向和垂直方向同时移动（也就是X轴和Y轴同时移动）
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
            height: 200px;
            background-image: linear-gradient(rgb(124,219,143),rgb(64,64,247));
            margin: 50px auto;  
            transition: all 1s;
            
        }
        .box:hover {
            /* 按照css的坐标设置值，右正，左负，下正，上负 */
            transform: translate(50px,50px);
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>
```

#### 商城类展示效果

```css
.con1{
    width: 235px;
    height: 291px;
    background: url(images/xiaomi6.png);
    transition: transform 0.6s;
    margin: 300px auto;
}
.con1:hover{
    transform: translateY(-10px);
    box-shadow: 3px 3px 5px #ddd;
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
        * {
            margin: 0;
            padding: 0;
        }

        ul {
            list-style-type: none;
        }

        .main {
            width: 1200px;
            margin: 0 auto;
        }

        .main ul {
            width: 1200px;
            border: 1px solid red;
        
        }

        .main ul li {
            width: 23%;
            height: 330px;
            margin: 10px 1%;
            background-color: blue;
            float: left;
            transition: all 1s;
            box-sizing: border-box;

        }

        .main ul li img {
            width: 100%;
            height: 100%;
        }

        .main ul li:hover {
            transform: translate(0,-10px);
            /* transform: rotate(3600deg); */
            box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.3);
        }

        .con1 {
            width: 1900px;
            height: 800px;
            background-color: #666;
        }

        .clearfix::after {
            content: '.';
            display: block;
            height: 0;
            clear: both;
            visibility: hidden;
        }
        
    </style>
</head>
<body>
    <div class="main">
        <ul>
            <li>
                <img src="images/mi.png" alt="">
            </li>
            <li>
                <img src="images/mi.png" alt="">
            </li>
            <li>
                <img src="images/mi.png" alt="">
            </li>
            <li>
                <img src="images/mi.png" alt="">
            </li>
            <li>
                <img src="images/mi.png" alt="">
            </li>
            <li>
                <img src="images/mi.png" alt="">
            </li>
            <li>
                <img src="images/mi.png" alt="">
            </li>
        </ul>
    </div>
    <div class="con1">

    </div>
</body>
</html>
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/image.44k371mnyag0.webp)

#### 让定位的盒子水平居中

```css
.box {
  width: 500px;
  height: 400px;
  background: pink;
  position: absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);  /* 走的自己的一半 */
}
```
### 缩放 scale(x, y) （0~1）

![1498444645795](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498444645795.694zd7xj9bo0.webp)

```css
transform:scale(0.8,1);
/*可以对元素进行水平和垂直方向的缩放。*/
```
> 注意: scale()的取值默认的值为1，当值设置为0.01到0.99之间的任何值，作用使一个元素缩小；而<font color="red"> 任何大于1的值</font>，作用是让元素放大。

```css
scale(X,Y)使元素水平方向和垂直方向同时缩放（也就是X轴和Y轴同时缩放）
scaleX(x)元素仅水平方向缩放（X轴缩放）
scaleY(y)元素仅垂直方向缩放（Y轴缩放）
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
            height: 200px;
            background-color: pink;
            margin: 100px auto;
            transition: all 1s;
        }

        .box:hover {
            /* 大于1扩大 */
            transform: scale(1.5,1.5);
            /* transform: scale(0.5,0.5); */
            /* 开发中常用比例 */
            /* 1.1 0.9 */
        }
    </style>
</head>
<body>
    <div class="box"></div>
</body>
</html>
```

### 旋转 rotate(deg) 

| 语法            | 意义                             |
| --------------- | -------------------------------- |
| rotate(*angle*) | 定义 2D 旋转，在参数中规定角度。 |

可以对元素进行旋转，正值为顺时针，负值为逆时针；

![1498443651293](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498443651293.d5bzdfdnzkw.webp)

```css
transform:rotate(45deg);
```

>注意单位是 deg 度数  	

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .imgEle {
            width: 200px;
            display: inline-block;
            margin: 100px auto;
            margin-left: 300px;
            transition: all 0.5s;
            transform-origin: left top;
        }
        .imgEle:hover {
            transform: rotate(90deg);
        }
        .imgEle1 {
            width: 200px;
            display: inline-block;
            padding-left: 200px;
            margin: 100px auto;
            transition: all 0.5s;
        }
        .imgEle1:hover {
            transform: rotate(3600deg);
        }

        .imgEle2 {
            width: 200px;
            display: inline-block;
            padding-left: 200px;
            margin: 100px auto;
            transition: all 0.5s;
        }
        .imgEle2:hover {
            transform: scale(1.5)
        }

    </style>
</head>
<body>
    <img src="images/1663642361696.jpeg" alt="" class="imgEle">
    <img src="images/1663642361696.jpeg" alt="" class="imgEle1">
    <img src="images/1663642361696.jpeg" alt="" class="imgEle2">
</body>
</html>
```

#### 旋转风车

```css
.box{
			width: 360px;
			height: 360px;
			margin: 50px auto;
			transition: transform 10s ;
			
		}
		.box div{
			height: 150px;
			width: 150px;
			background-color: #9BE22D;
			float: left;
			border: 1px solid #000;
			margin: 14px;
		}
		.box:hover{
			transform: rotate(3600deg);
		}
		.div1{
			border-radius: 0px 150px 0px 150px;
		}
		.div2{
			border-radius: 150px 0px 150px 0px;
		}
		.div3{
			border-radius: 150px 0px 150px 0px;
		}
		.div4{
			border-radius: 0px 150px 0px 150px;
		}

```

### transform-origin可以调整元素转换变形的原点

![1498443912530](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498443912530.4w47mulwrtk0.webp)
```css
transform-origin: x-axis y-axis;
```
| 名称 | 值   | 描述 |
| ---- | ---- | ---- |
| x-axis |	位置|（left、center、right）/ 百分数 / 数值	x 轴基点坐标 |
| y-axis |	位置|（top、center、bottom）/ 百分数 / 数值	y 轴基点坐标 |

```css
/* 改变元素原点到左上角，然后进行顺时旋转45度 */    
div{
     transform-origin: left top;
     transform: rotate(45deg); 
}  
```

 如果是4个角，可以用 left top这些，如果想要精确的位置， 可以用  px 像素。

```css
/* 改变元素原点到x 为10  y 为10，然后进行顺时旋转45度 */  
div{
     transform-origin: 10px 10px;
     transform: rotate(45deg); 
} 
```

## D变形(CSS3) transform

2d    x  y  

3d  x  y  z

CSS3中的3D坐标系与上述的3D坐标系是有一定区别的，相当于其绕着X轴旋转了180度，如下图

![1498459001951](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498459001951.3islzg9fepi0.webp)

简单记住他们的坐标：

 x左边是负的，右边是正的

y 上面是负的， 下面是正的

z 里面是负的， 外面是正的

或者用左手法则也行：**伸出左手，大拇指指向正轴方向，四个手指的指向即是旋转正向，但务必记住是左手！**为正顺时针旋转，为负，逆时针旋转。

### rotateX() 

 就是沿着 x 立体旋转.

![1498445756802](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498445756802.7ammmkmssyk0.webp)

```css
img {
  transition:all 0.5s ease 0s;
}
img:hover {

  transform:rotateX(180deg);
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
        body {
            /* 1.透视的属性设置到父元素上的 */
            perspective: 300px;
        }
        img {
            width: 300px;
            display: block;
            margin: 100px auto;
            /* 2.设置过渡 */
            transition: all 2s;
        }
        img:hover {
            /* 3.正值为顺时针，赋值为逆时针 */
            transform: rotateX(360deg);
        }
    </style>
</head>
<body>
    <img src="images/01.png" alt="">
    <!-- <img src="images/01.png" alt=""> -->
</body>
</html>
```

### rotateY()

沿着y轴进行旋转

![1498446043198](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498446043198.4wkuotw2c480.webp)

```css
img {
  transition:all 0.5s ease 0s;
}
img:hove {

  transform:rotateX(180deg);
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
        body {
            /* 1.透视的属性设置到父元素上的 */
            perspective: 300px;
        }
        img {
            width: 300px;
            display: block;
            margin: 100px auto;
            /* 2.设置过渡 */
            transition: all 2s;
        }
        img:hover {
            /* 3.正值为顺时针，赋值为逆时针 */
            transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
        }
    </style>
</head>
<body>
    <!-- <img src="images/1663642361696.jpeg" alt=""> -->
    <img src="images/01.png" alt="">
</body>
</html>
```

### rotateZ()

沿着z轴进行旋转

```css
img {
  transition:all .25s ease-in 0s;
}
img:hover {
  /* transform:rotateX(180deg); */
  /* transform:rotateY(180deg); */
  /* transform:rotateZ(180deg); */
  /* transform:rotateX(45deg) rotateY(180deg) rotateZ(90deg) skew(0,10deg); */
}
```

### 透视(perspective)

电脑显示屏是一个2D平面，图像之所以具有立体感（3D效果），其实只是一种视觉呈现，通过透视可以实现此目的。

透视可以将一个2D平面，在转换的过程当中，呈现3D效果。

- 透视原理： 近大远小 。
- 浏览器透视：把近大远小的所有图像，透视在屏幕上。
- perspective：视距，表示视点距离屏幕的长短。视点，用于模拟透视效果时人眼的位置

注：并非任何情况下需要透视效果，根据开发需要进行设置。

perspective 一般作为一个属性，设置给父元素，作用于所有3D转换的子元素

理解透视距离原理：

![1498446715314](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498446715314.4uyyej6jgae0.webp)

### 开门案例

###  transform-style

语法：

```
transform-style: flat|preserve-3d;
```

| 值          | 描述                       |
| ----------- | -------------------------- |
| flat        | 子元素将不保留其 3D 位置。 |
| preserve-3d | 子元素将保留其 3D 位置。   |

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .main {
            width: 600px;
            height: 500px;
            border: 1px solid red;
            background: url(images/02.png) no-repeat;
            background-size: cover;
            margin: 10px auto;
            position: relative;
            /* 透视 */
            perspective: 1000px;
        }

        .main div {
            height: 500px;
            width: 300px;
            background: url(images/bg.png);
            position: absolute;
            top: 0;
            transition: all 1s;
        }

        .door_l {
            left: 0;
        }

        .door_r {
            right: 0;
        }

        .main:hover .door_l{
            transform: rotateY(60deg);
            transform-origin: left center;
        }

        .main:hover .door_r{
            transform: rotateY(-60deg);
            transform-origin: right center;
        }
    </style>
</head>
<body>
    <div class="main">
        <div class="door_l"></div>
        <div class="door_r"></div>
    </div>
</body>
</html>
```

### translateX(x)

仅水平方向移动**（X轴移动）

![1498459697576](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498459697576.6rw5ej26gug0.webp)

主要目的实现移动效果

### translateY(y)

仅垂直方向移动（Y轴移动）

![1498459770252](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498459770252.aibccmlei0c.webp)

### translateZ(z)

transformZ的直观表现形式就是大小变化，实质是XY平面相对于视点的远近变化（说远近就一定会说到离什么参照物远或近，在这里参照物就是perspective属性）。比如设置了perspective为200px;那么transformZ的值越接近200，就是离的越近，看上去也就越大，超过200就看不到了，因为相当于跑到后脑勺去了，我相信你正常情况下，是看不到自己的后脑勺的。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            perspective: 500px;
        }
        .box {
            width: 300px;
            height: 200px;
            background-color: pink;
            margin: 200px auto;
            transition: all 2s;
        }
        .box:hover {
            /* X:正值往右边走 */
            /* transform: translateX(200px); */
            /* 负值往左边走 */
            /* transform: translateX(-200px); */
            /* Y:正值往下走 */
            /* transform: translateY(200px); */
            /* 负值往下走 */
            /* transform: translateY(-200px); */
            /* Z：正值放大 */
            /* transform: translateX(200px); */
            /* 负值缩小 */
            transform: translateZ(300px) rotateX(360deg);
        }
    </style>
</head>
<body>
    <div class="box">

    </div>
</body>
</html>
```


## 动画(CSS3) animation

动画是CSS3中具有颠覆性的特征之一，可通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果。

语法格式：

### 定义动画

```css
@keyframes 动画名称 {
  from{ 开始位置 } 
  to{  结束  }
}

@keyframes 动画名称 {
    0%
    55%
     ....
    100%
}
/* 关于几个值，除了名字，动画时间，延时有严格顺序要求其它随意*/
```
### 调用动画

```css
animation:动画名称 动画时间 运动曲线  何时开始  播放次数  是否反方向;
```

![1498461096243](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/1498461096243.6wfp5npwzzs0.webp)


常用属性写法

```css
animation-iteration-count:infinite;  无限循环播放
animation-play-state:paused; 暂停动画

animation-direction:alternate;(动画交替反向运行)alternate-reverse;(动画反向交替运行)reverse(动画反向);

animation-fill-mode: forwards(动画完成后,保持最后状态); 
animation-fill-mode: backwards;(动画将应用在 animation-delay 定义期间启动动画的第一次迭代的关键帧中定义的属性值。)
animation-fill-mode: both;(动画遵循 forwards 和 backwards 的规则。)
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
            height: 150px;
            border-radius: 10px;
            background-color: skyblue;
            position: relative;
            top: 0;
            left: 0;
            /* 调用动画 */
            /* animation-name: boxmove; */
            /* 动画完成的时间 */
            /* animation-duration: 1s; */
            /* 动画的运动曲线 */
            /* ease:默认的缓动动画 */
            /* 匀速动画 */
            /* animation-timing-function: linear; */
            /* 动画的延迟时间 */
            /* animation-delay: 2s; */
            /* 动画的播放次数 */
            /* 无穷 */
            /* animation-iteration-count: infinite; */
            /* 动画的方向 */
            /* (动画交替反向运行) */
            /* animation-direction: alternate; */
            /* 动画反向交替运行 */
            /* animation-direction: alternate-reverse; */
            animation: boxmove 3s linear infinite alternate;
        }

        .box:hover {
            animation-play-state: paused;
        }

        /* 1.定义动画 */
        /* @keyframes boxmove {
            from {
                left: 0;
            }
            to {
                left: 600px;
                /* right: 300px; 
            }
        } */
        @keyframes boxmove {
            0% {
                left: 0;
            }
            100% {
                left: 600px;
                /* right: 300px; */
            }
        }
    </style>
</head>
<body>
    <div class="box">盒子动起来了</div>
</body>
</html>
```

### 小汽车案例

```css
body {
  background: white;
}
img {
  width: 200px;
}
.animation {
  animation-name: goback;
  animation-duration: 5s;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}
@keyframes goback {
  0%{}
  49%{
    transform: translateX(1000px);
  }
  55%{
    transform: translateX(1000px) rotateY(180deg);
  }
  95%{
    transform: translateX(0) rotateY(180deg);
  }
  100%{
    transform: translateX(0) rotateY(0deg);
  }
}
```

![QQ22918914922917714320220920235056](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220920/QQ22918914922917714320220920235056.4z91v5xhlhg0.gif)



