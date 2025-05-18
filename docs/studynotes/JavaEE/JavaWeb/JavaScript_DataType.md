---
title: JavaScript 数据类型
date: 2023-01-14 23:26:04
permalink: /JavaEE/JavaWeb/JavaScript_DataType
categories:
  - JavaScript
tags:
  - JavaScript
---
# JavaScript 数据类型

[[toc]]

## 数据类型简介

### 为什么需要数据类型

在计算机中，不同的数据所需占用的存储空间是不同的，为了便于把数据分成所需内存大小不同的数据，充分利用存储空间，于是定义了不同的数据类型。

简单来说，数据类型就是数据的类别型号。比如姓名"张三”，年龄18，这些数据的类型是不一样的。

### 变量的数据类型

变量是用来存储值的所在处，它们有名字和数据类型。变量的数据类型决定了如何将代表这些值的位存储到计算机的内存中。**JavaScript 是一种弱类型或者说动态语言**。这意味着不用提前声明变量的类型，在程序运行过程中，类型会被自动确定。

```js
var age = 10; 			// 这是一个数字型
var areYouOk = '是的';  // 这是一个字符串
```

在代码运行时，变量的数据类型是由JS引擎**根据=右边变量值的数据类型来判断**的，运行完毕之后，变量就确定了数据类型。**JavaScript拥有动态类型，同时也意味着相同的变量可用作不同的类型**:

```js
var x = 6; // x 为数字
var x = "Bill"; // x 为字符串 
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        // int num = 10; java
        var num;// 这里的 num 我们是不确定哪种数据类型的
        var num = 10; // num 属于数字型
        // js 的变量数据类型是只有程序在运行过程中，根据等号右边的值来确定的
        var x = 10; //x是数字型
        var str = 'pink';// str是字符型
        var x ='frx';//x是字符型
    </script>
</head>
<body>
    
</body>
</html>
```

### 数据类型的分类

JS 把数据类型分为两类：

+ 简单数据类型(`Number`,`string`,`Boolean`,`Undefined`,`Null`)
+ 复杂数据类型(`object`)

## 简单数据类型

### 基本数据类型

JavaScript中的简单数据类型及其说明如下:

| 简单数据类型 | 说明                                              | 默认值    |
| ------------ | ------------------------------------------------- | --------- |
| Number       | 数字型，包含整型值和浮点型值，如21、0.21          | 0         |
| Boolean      | 布尔值类型，如true .false，等价于1和0             | false     |
| String       | 字符串类型，如"张三"注意咱们js里面,字符串都带引号 | ""        |
| Undefined    | var a;声明了变量a但是没有给值,此时a = undefined   | undefined |
| Null         | var a = null;声明了变量a为空值                    | null      |

### 数字型 Number

JavaScript数字类型既可以用来保存整数值，也可以保存小数(浮点数)。

```js
var age =21;      //整数
varAge =21.3747;  //小数
```

#### 数字型进制

最常见的进制有二进制、八进制、十进制、十六进制。

```js
 // 1.八进制数字序列范围：0~7

var num1 = 07; 	// 对应十进制的7
var num2 = 019; // 对应十进制的19
var num3 = 08; 	// 对应十进制的8

 // 2.十六进制数字序列范围：0~9以及A~F

var num = 0xA;
```

现阶段我们只需要记住，**在JS中八进制前面加0，十六进制前面加 0x**

#### 数字型范围

JavaScript中数值的最大和最小值

```js
alert(Number.MAX_VALUE); // 1.7976931348623157e+308
alert(Number.MIN_VALUE); // 5e-324
```

+ 最大值：Number.MAX_VALUE，这个值为： 1.7976931348623157e+308
+ 最小值：Number.MIN_VALUE，这个值为：5e-32

#### 数字型三个特殊值

```js
alert(Infinity); 	// Infinity
alert(-Infinity);   // -Infinity
alert(NaN); 		// NaN
```

+ Infinity ，代表无穷大，大于任何数值
+ -Infinity ，代表无穷小，小于任何数值
+ NaN ，Not a number，代表一个非数值

#### isNaN()

用来判断一个变量是否为非数字的类型，返回true 或者false

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230114/image.4sjbmc896kg0.webp)

```js
var usrAge = 21;
var isOk = isNaN(userAge);
console.log(isNum); 			// false ，21 不是一个非数字
var usrName = "andy";
console.log(isNaN(userName));   // true ，"andy"是一个非数字
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        var num = 10;// num 数字型
        var PI = 3.14; // PI 数字型
        //1. 八进制 0 ~ 7 我们程序里的数字前面加0 表示八进制
        var num1 = 010;
        console.log(num1); //010 八进制转换为八进制 就是8
        var num2 = 012;
        console.log(num2);
        //2. 十六进制 0 ~ 9 a ~ f #ffffff 数字前面加 0x 表示十六进制
        var num3 = 0x9;
        console.log(num3);
        var num4 = 0xa;
        console.log(num4);
        //3. 数字型的最大值
        console.log(Number.MAX_VALUE);
        //4. 数字型的最小值
        console.log(Number.MIN_VALUE);
        //5. 无穷大
        console.log(Number.MAX_VALUE * 2)
        //6. 无穷小
        console.log(Number.MIN_VALUE * 2)
        //7. 非数字
        console.log('pink老师' - 100);// NaN
        
    </script>
</head>
<body>
    
</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        // isNaN() 这个方法用来判断非数字 如果是数字返回 false
        // 如果是非数字，返回 true
        console.log(isNaN(2))
        console.log(isNaN('frx'))
    </script>
</head>
<body>
    
</body>
</html>
```

### 字符串型 String

字符串型可以是引号中的任意文本，其语法为**双引号""**和**单引号"**

```js
var strMsg = "我爱北京天安门~"; // 使用双引号表示字符串
var strMsg2 = '我爱吃猪蹄~';   // 使用单引号表示字符串
// 常见错误 
var strMsg3 = 我爱大肘子;      // 报错，没使用引号，会被认为是js代码，但js没有这些语法
```

因为HTML标签里面的属性使用的是双引号，JS这里我们更**推荐使用单引号**。

#### 字符串引号嵌套

JS可以用**单引号嵌套双引号**，或者用**双引号嵌套单引号(外双内单，外单内双)**

```js
var strMsg = '我是"高帅富"程序猿'; // 可以用''包含""
var strMsg2 = "我是'高帅富'程序猿"; // 也可以用"" 包含'' 
// 常见错误
var badQuotes = 'What on earth?"; // 报错，不能 单双引号搭配
```

#### 字符串转义符

类似HTML里面的特殊字符，字符串中也有特殊字符，我们称之为转义符。

转义符都是\开头的，常用的转义符及其说明如下:

| 转义符 | 解释说明                 |
| ------ | ------------------------ |
| \n     | 换行符，n是newline的意思 |
| \\\    | 斜杠\                    |
| \\'    | '单引号                  |
| \\"    | "双引号                  |
| \t     | tab 缩进                 |
| \b     | 空格，b是blank 的意思    |

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        // 'Hello World' '小苹果'
        var str = '小烟火';
        console.log(str);
        // 字符串转义字符 都是用 \ 开头 但是这些转义字符写到引号里面
        var str1 = '我是一个\n程序员'
        console.log(str1)
    </script>
</head>
<body>
    
</body>
</html>
```

#### 字符串长度

字符串是由若干字符组成的，这些字符的数量就是字符串的长度。通过字符串的 **length**属性可以获取整个字符串的长度。

```js
var strMsg = "我是帅气多金的程序猿！";
alert(strMsg.length); // 显示 11
```

#### 字符串拼接

+ 多个字符串之间可以使用＋进行拼接，其拼接方式为**字符串＋任何类型=拼接之后的新字符串**
+ 拼接前会把与字符串相加的任何类型转成字符串，再拼接成一个新的字符串

```js
//1.1 字符串 "相加" 
alert('hello' + ' ' + 'world'); // hello world
//1.2 数值字符串 "相加" 
alert('100' + '100'); // 100100
//1.3 数值字符串 + 数值
alert('11' + 12); // 1112 
```

**+号总结口诀:数值相加，字符相连**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        //1. 检测获取字符串的长度 length
        var str = 'my name is frx';
        console.log(str.length); //14

        //2. 字符串的拼接 + 只要有字符串和其他类型相拼接 最终的结果是字符串类型
        console.log('frx'+10);//frx10
        console.log('pink' + true);//pinktrue
        console.log('xu' + 'study');//xustudy
        console.log(12 + '123');//12123
        console.log(10 + 10);//20
    </script>
</head>
<body>
    
</body>
</html>
```

#### 字符串拼接加强

```js
console.log('pink老师' + 18); 		 // 只要有字符就会相连
var age = 18;
// console.log('pink老师age岁啦'); 		// 这样不行哦
console.log('pink老师' + age); 		 // pink老师18
console.log('pink老师' + age + '岁啦'); // pink老师18岁啦
```

+ 我们经常会将字符串和变量来拼接，因为变量可以很方便地修改里面的值
+ 变量是不能添加引号的，因为加引号的变量会变成字符串
+ 如果变量两侧都有字符串拼接，口诀“**引引加加**”，删掉数字，变量写加中间

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        console.log('pink老师' + 18);
        console.log('pink老师' + 18 + '岁');
        var age = 19;
        console.log('pink老师age岁')
        // 我们变量不要写到字符串里面 是通过和字符串相连的方式实现
        console.log('pink老师' + age + '岁');
        // 变量连字符串的口诀 引引加加
    </script>
</head>
<body>
    
</body>
</html>
```

弹出一个输入框，需要用户输入年龄，之后弹出一个警示框显示“您今年xx岁啦”(xx表示刚才输入的年龄)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        //弹出一个输入框 （prompt），让用户输入年龄（用户输入）
        //把用户输入的值用变量保存起来，把刚才输入的年龄与所要输出的字符串拼接（程序内部处理）
        //使用alert语句弹出警示框（输出结果）
        var age = prompt('请输入您的年龄');
        var str = '您今年已经' + age + '岁了';
        alert(str);
    </script>
</head>
<body>
    
</body>
</html>
```

#### 布尔型 Boolean

布尔类型有两个值: true和false，其中 true表示真(对)，而false表示假（错)。

布尔型和数字型相加的时候， true的值为1 ，false 的值为0。

```js
console.log (true + 1);    //2
console .log ( false + 1); // 1
```

#### Undefined 和 Null

一个声明后没有被赋值的变量会有一个默认值undefined(如果进行相连或者相加时，注意结果)

```js
var variable;
console.log(variable); 			// undefined
console.log('你好' + variable);  // 你好undefined
console.log(11 + variable);     // NaN
console.log(true + variable);   // Na
```

一个声明变量给null值，里面存的值为空（学习对象时，我们继续研究null)

```js
var vari = null;
console.log('你好' + vari);  // 你好null
console.log(11 + vari); 	// 11
console.log(true + vari);   // 1
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        var flag = true;// flag 布尔型
        var flag1 = false;// flag1 布尔型
        console.log(flag + 1);//true 参与加法运算当1来看
        console.log(flag1 + 1);//flase 参与加法运算当0来看
        //如果一个变量声明未赋值就是 undefined 未定义数据类型
        var str;
        console.log(str);
        var variable = undefined;
        console.log(variable + 'red');
        console.log(variable + 1);// NaN undefined 和数字相加 最后的结果为NaN
        // null 空值
        var space = null;
        console.log(space + 'red');//nulred
        console.log(space + 1);//1
    </script>
</head>
<body>
    
</body>
</html>
```

## 获取变量数据类型

### 获取检测变量的数据类型

typeof 可用来获取检测变量的数据类型

```js
var num = 18;
console.log(typeof num) // 结果 number
```

不同类型的返回值

| 类型      | 例               | 结果        |
| --------- | ---------------- | ----------- |
| String    | typeof "小白"    | "string"    |
| Number    | typeof 18        | "number"    |
| Boolean   | typeof true      | "boolean"   |
| Undefined | typeof undefined | "undefined" |
| Null      | typeof null      | "object"    |

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        var num = 10;
        console.log(typeof num);//number
        var str = 'pink';
        console.log(typeof str);//string
        var flag = true;
        console.log(typeof flag);//boolean
        var var1 = undefined;
        console.log(typeof var1);//undefined
        var timer = null;
        console.log(typeof timer);// object
        // prompt 取过来的值是 字符型的
        var age = prompt('请输入您的年龄');
        console.log(age);
        console.log(typeof age); //string
    </script>
</head>
<body>
    
</body>
</html>
```

### 字面量

字面量是在源代码中一个固定值的表示法，通俗来说，就是字面量表示如何表达这个值。

+ 数字字面量:8,9,10
+ 字符串字面量:'黑马程序员","大前端”
+ 布尔字面量:true，false

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        console.log(18);
        console.log('18');
        console.log(true);
        console.log(undefined);
        console.log(null);
    </script>
</head>
<body>
    
</body>
</html>
```

## 数据类型转换

### 什么是数据类型转换

使用表单、prompt获取过来的数据默认是字符串类型的，此时就不能直接简单的进行加法运算，而需要转换变量的数据类型。通俗来说，就是**把一种数据类型的变量转换成另外一种数据类型**。

我们通常会实现3种方式的转换:

+ 转换为字符串类型
+ 转换为数字型
+ 转换为布尔型

### 转换为字符串

| 方式               | 说明                         | 案例                                  |
| ------------------ | ---------------------------- | ------------------------------------- |
| toString()         | 转成字符串                   | var num= 1; alert(num.toString());    |
| String()强制转换   | 转成字符串                   | var num= 1; alert(String(num));       |
| **加号拼接字符串** | 和字符串拼接的结果都是字符串 | var num = 1; alert(num+"我是字符串"); |

+ toString()和String(使用方式不一样。

+ 三种转换方式，我们更喜欢用第三种加号拼接字符串转换方式，这一种方式也称之为隐式转换。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        //1. 把数字型转换为字符串型变量.toString()
        var num = 10;
        var str = num.toString();
        console.log(str);
        console.log(typeof str);
        //2. 我们利用 String(变量)
        console.log(String(num))
        //3.利用 + 拼接字符串的方法实现转换效果 隐式转换
        console.log(num + '');

    </script>
</head>
<body>
    
</body>
</html>
```

### 转换为数字型（重点）

| 方式                   | 说明                         | 案例                |
| ---------------------- | ---------------------------- | ------------------- |
| parselnt(string)函数   | 将string类型转成整数数值型   | parselnt(78')       |
| parseFloat(string)函数 | 将string类型转成浮点数数值型 | parseFloat('78.21') |
| Number()强制转换函数   | 将string类型转换为数值型     | Number('12')        |
| js隐式转换(- * / )     | 利用算术运算隐式转换为数值型 | '12' - 0            |

+ 注意parselnt和parseFloat **单词的大小写**，这2个是重点
+ 隐式转换是我们在进行算数运算的时候，JS自动转换了数据类型

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        var age = prompt('请输入您的年龄：');
        //1. parseInt(变量) 可以吧 字符型的转换为数字型 得到的是整数
        console.log(parseInt(age))
        console.log(parseInt('3.14'));// 3 取整
        console.log(parseInt('3.94')) // 3 取整
        console.log(parseInt('120px'));// 120 会去到这个px单位
        console.log(parseInt('rem120px'));//NaN
        //2. parseFloat(变量) 可以把 字符串的转换为数字型 得到的是小数 浮点数
        console.log(parseFloat('3.14'));// 3.14
        console.log(parseFloat('120px'));// 120 会去掉这个 px 单位
        console.log(parseFloat('rem120px'));// NaN
        //3. 利用 Number(变量)
        var str = '123';
        console.log(Number(str));
        console.log(Number('12'));
        //4. 利用了算数运算 - * / 隐式转换
        console.log('12' - 0);
        console.log('123' - '120');
        console.log('123' * 1);

    </script>
</head>
<body>
    
</body>
</html>
```

此案例要求在页面中弹出一个输入框，我们输入出生年份后，能计算出我们的年龄。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        // 弹出一个输入框（prompt），让用户输入出生年份（用户输入）
        // 把用户输入的值用变量保存起来，然后用今年的年份减去变量值，结果就是现在的年龄（程序内部）
        //弹出警示框（alert），把计算的结果输出（输出结果）
        var year = prompt('请输入您的出生年份：');
        var age = 2023 - year; //year 取过来是字符串类型 但是这里减法 隐式转换
        alert('您今年已经' + age +'岁了');
    </script>
</head>
<body>
    
</body>
</html>
```

计算两个数的值，用户输入第一个值后，继续弹出第二个输入框并输入第二个值，最后通过弹出窗口显示出两次输入值相加的结果。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        // 先弹出第一个输入框，提示用户输入第一个值 保存起来
        // 在弹出第二个框，提示用户输入第二个值 保存起来
        // 把这两个值相加，并将结果赋给新的变量（注意数据类型转换）
        //弹出警示框(alert)，把计算的结果输出（输出结果）
        var num1 = prompt('请输入第一个值：');
        var num2 = prompt('请输入第二个值：')
        var result = parseFloat(num1)  + parseFloat(num2);
        alert(result);
    </script>
</head>
<body>
    
</body>
</html>
```

### 转换为布尔型

| 方式        | 说明                 | 案例            |
| ----------- | -------------------- | --------------- |
| Boolean函数 | 其他类型转换成布尔值 | Boolean('true') |

+ 代表**空、否定的值**会被转换为false ,如"、0、NaN、null、undefined
+ 其余值都会被转换为true

```js
console.log(Boolean('')); // false
console.log(Boolean(0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean('小白')); // true
console.log(Boolean(12)); // true
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        console.log(Boolean(''));//false
        console.log(Boolean(0));
        console.log(Boolean(NaN));
        console.log(Boolean(null));
        console.log(Boolean(undefined));
        console.log('-----------------------------------')
        console.log(Boolean('Hello World'));//true
        console.log(Boolean('123'))
        console.log(Boolean('我很好'))
    </script>
</head>
<body>
    
</body>
</html>
```

