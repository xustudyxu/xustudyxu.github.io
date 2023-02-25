---
title: JavaScript 函数
date: 2023-02-25 22:39:44
permalink: /JavaEE/JavaWeb/JavaScript_function
categories:
  - JavaScript
tags:
  - JavaScript
---
# JavaScript 函数

[[toc]]

> 理解封装的意义，能够通过函数的声明实现逻辑的封装，知道对象数据类型的特征，结合数学对象实现简单计算功能。

- 理解函数的封装的特征
- 掌握函数声明的语法
- 理解什么是函数的返回值
- 知道并能使用常见的内置函数

> 理解函数的封装特性，掌握函数的语法规则

## 声明和调用

函数可以把具有相同或相似逻辑的代码“包裹”起来，通过函数调用执行这些被“包裹”的代码逻辑，这么做的优势是有利于精简代码方便复用。

### 声明（定义）

声明（定义）一个完整函数包括关键字、函数名、形式参数、函数体、返回值5个部分

[![pppugYQ.jpg](https://s1.ax1x.com/2023/02/25/pppugYQ.jpg)](https://imgse.com/i/pppugYQ)

### 调用

声明（定义）的函数必须调用才会真正被执行，使用 `()` 调用函数。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 声明和调用</title>
</head>
<body>
  <script>
    // 声明（定义）了最简单的函数，既没有形式参数，也没有返回值
    function sayHi() {
      console.log('嗨~')
    }
    // 函数调用，这些函数体内的代码逻辑会被执行
    // 函数名()
        
    sayHi()
    // 可以重复被调用，多少次都可以
    sayHi()
  </script>
</body>
</html>
```

> 注：函数名的命名规则与变量是一致的，并且尽量保证函数名的语义。

小案例： 小星星

```javascript
<script>
        // 函数声明
        function sayHi() {
            // document.write('hai~')
            document.write(`*<br>`)
            document.write(`**<br>`)
            document.write(`***<br>`)
            document.write(`****<br>`)
            document.write(`*****<br>`)
            document.write(`******<br>`)
            document.write(`*******<br>`)
            document.write(`********<br>`)
            document.write(`*********<br>`)
        }
        // 函数调用
        sayHi()
        sayHi()
        sayHi()
        sayHi()
        sayHi()
    </script>
```

+ 作业

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        span {
            display: inline-block;
            width: 100px;
            padding: 5px 10px;
            border: 1px solid pink;
            margin: 2px;
            border-radius: 5px;
            box-shadow: 2px 2px 2px rgba(255, 192, 203, .4);
            background-color: rgba(255, 192, 203, .1);
            text-align: center;
            color: hotpink;
        }
    </style>
</head>

<body>
    <script>
        function sheet99() {
            for (let i = 1; i <= 9; i++) {
                for (let j = 1; j <= i; j++) {
                    document.write(`<span>${j} X ${i} = ${i * j}</span>`)
                }
                document.write(`<br>`)
            }
        } 

        sheet99()
        sheet99()
    </script>
</body>

</html>
```

## 参数

通过向函数传递参数，可以让函数更加灵活多变，参数可以理解成是一个变量。

声明（定义）一个功能为打招呼的函数

- 传入数据列表
- 声明这个函数需要传入几个数据
- 多个数据用逗号隔开

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 函数参数</title>
</head>
<body>

  <script>
    // 声明（定义）一个功能为打招呼的函数
    // function sayHi() {
    //   console.log('嗨~')
    // }
    // 调用函数
    // sayHi()
	

    // 这个函数似乎没有什么价值，除非能够向不同的人打招呼
    // 这就需要借助参数来实现了
    function sayHi(name) {
      // 参数 name 可以被理解成是一个变量
      console.log(name)
      console.log('嗨~' + name)
    }

    // 调用 sayHi 函数，括号中多了 '小明'
    // 这时相当于为参数 name 赋值了
    sayHi('小明')// 结果为 小明

    // 再次调用 sayHi 函数，括号中多了 '小红'
    // 这时相当于为参数 name 赋值了
    sayHi('小红') // 结果为 小红
  </script>
</body>
</html>
```

总结：

1. 声明（定义）函数时的形参没有数量限制，当有多个形参时使用 `,` 分隔
2. 调用函数传递的实参要与形参的顺序一致

### 形参和实参

形参：声明函数时写在函数名右边小括号里的叫形参（形式上的参数）

实参：调用函数时写在函数名右边小括号里的叫实参（实际上的参数）

形参可以理解为是在这个函数内声明的变量（比如 num1 = 10）实参可以理解为是给这个变量赋值

开发中尽量保持形参和实参个数一致

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 函数参数</title>
</head>
<body>
  <script>
    // 声明（定义）一个计算任意两数字和的函数
    // 形参 x 和 y 分别表示任意两个数字，它们是两个变量
    function count(x, y) {
      console.log(x + y);
    }
    // 调用函数，传入两个具体的数字做为实参
    // 此时 10 赋值给了形参 x
    // 此时 5  赋值给了形参 y
    count(10, 5); // 结果为 15
  </script>
</body>
</html>
```

+ 函数参数

```js
    <script>
        //1.求1~n的参数和
        function getSum(end) {
            let sum = 0
            for (let i = 1; i <= end; i++) {
                sum += i;
            }
            console.log(sum)
        }
        getSum(50)

        //2.求两个数之间的和
        function getSum1(start,end) {
            let sum = 0
            for (let i = start; i <= end; i++) {
                sum += i;
            }
            console.log(sum)
        }

        getSum1(67,90)
    </script>
```

+ 默认参数

```js
    <script>
        //函数求和
        function getSum(x = 0, y = 0) {
            document.write(x + y)
        }
        getSum()//0
        document.write(`<br>`)
        getSum(2323, 454)
        document.write(`<br>`)
        function getSum1(start = 0, end = 0) {
            let sum = 0
            for (let i = start; i <= end; i++) {
                sum += i
            }
            document.write(sum)
        }

        getSum1(4545, 24545)

    </script>
```

+ 封装数组

```js
    <script>
        //1.封装数组
        //给一个参数的默认值
        function getArrSum(arr = []) {
            let sum = 0
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i]
            }
            console.log(sum)
        }

        getArrSum([1, 2, 3, 4, 5, 6, 7])
        getArrSum([11, 22, 33, 55])
        getArrSum()//0
    </script>
```

+ 实参可以是变量

```js
    <script>
        //求 n ~ m 的累加和
        function getSum(n = 0, m = 0) {
            let sum = 0
            for (let i = n; i <= m; i++) {
                sum += i
            }
            document.write(sum)
        }

        let n = +prompt('请输入起始值：')
        let m = +prompt('请输入结束值：')
        //调用函数
        getSum(n, m)
    </script>
```

## 返回值

函数的本质是封装（包裹），函数体内的逻辑执行完毕后，函数外部如何获得函数内部的执行结果呢？要想获得函数内部逻辑的执行结果，需要通过 `return` 这个关键字，将内部执行结果传递到函数外部，这个被传递到外部的结果就是返回值。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 函数返回值</title>
</head>
<body>

  <script>
    // 定义求和函数
    function count(a, b) {
      let s = a + b
      // s 即为 a + b 的结果
      // 通过 return 将 s 传递到外部
      return s
    }

    // 调用函数，如果一个函数有返回值
    // 那么可将这个返回值赋值给外部的任意变量
    let total = count(5, 12)
  </script>
</body>
</html>
```

总结：

1. 在函数体中使用return 关键字能将内部的执行结果交给函数外部使用
2. 函数内部只能出现1 次 return，并且 return 下一行代码不会再被执行，所以return 后面的数据不要换行写
3. return会立即结束当前函数
4. 函数可以没有return，这种情况默认返回值为 undefined

```js
    <script>
        //函数的返回值
        function fn() {
            return 20
        }

        //fn() 调用者 相当于执行了 fn() = 20
        //return 的值返回给了调用者
        console.log(fn())

        //求和函数的写法
        function getTotalPrice(x, y) {
            return x + y
            //return 后面的代码不会执行
        }

        console.log(getTotalPrice(5, 6))

        function fn1() {

        }
        let re = fn1()
        console.log(re)
    </script>
```

+ 求最大值的函数

```js
    <script>
        //1.求最大值
        function getMax(x, y) {
            return x > y ? x : y
        }
        let max = getMax(11, 234)
        console.log(max)

        //2.求任意数组的最大值，并且返回
        function getArrValue(arr = []) {
            //(1)先准备一个max变量存放数组的第一个值
            let max = arr[0]    
            //(2)遍历笔记
            for (let i = 1; i < arr.length; i++) {
                if (max < arr[i]) {
                    max = arr[i]
                }
            }
            //(3)返回值
            return max
        }

        //调用方法
        document.write(getArrValue([1, 4, 6, 76, 43, 753]))

        //3.求任意数组的最大值和最小值，并且返回
        function getArrValue1(arr = []) {
            let max = arr[0]
            let min = arr[0]
            for (let i = 1; i < arr.length; i++) {
                if (max < arr[i]) {
                    max = arr[i]
                }
                if (min > arr[i]) {
                    min = arr[i]
                }
            }
            return [max, min]
        }

        let newArr = getArrValue1([232, 565, 656, 6543, 6565])
        console.log(`数组中的最大值是${newArr[0]}`)
        console.log(`数组中的最小值是${newArr[1]}`)
    </script>
```

+ 函数细节

```js
    <script>
        function getSum(x, y) {
            return x + y
            //返回值返回给了谁？函数的调用者 getSum(1,2)
            // getSum(1, 2) = 3

        }
        let result = getSum(1, 2) //3
        let num = parseInt(`12px`)

        //1.函数名相同 后面覆盖前面
        function fn() {
            console.log(1)
        }

        function fn() {
            console.log(2)
        }

        fn()

        //2.参数不匹配
        function fn1(a, b) {
            console.log(a + b)
        }
        //(1) 实参多余形参
        fn1(1, 2, 3)
        //(2) 实参小于形参
        fn1(1) //1 + undefined = NaN
    </script>
```

## 作用域

通常来说，一段程序代码中所用到的名字并不总是有效和可用的，而限定这个名字的可用性的代码范围就是这个名字的作用域。

作用域的使用提高了程序逻辑的局部性，增强了程序的可靠性，减少了名字冲突。

### 全局作用域

作用于所有代码执行的环境(整个 script 标签内部)或者一个独立的 js 文件

处于全局作用域内的变量，称为全局变量

### 局部作用域

作用于函数内的代码环境，就是局部作用域。 因为跟函数有关系，所以也称为函数作用域。

处于局部作用域内的变量称为局部变量

> 如果函数内部，变量没有声明，直接赋值，也当全局变量看，但是强烈不推荐
>
> 但是有一种情况，函数内部的形参可以看做是局部变量。

+ 函数作用域

```js
    <script>
        //1. 全局变量
        let num = 10
        console.log(num)
        function fn() {
            console.log(num)
        }
        fn()

        //2. 局部变量
        function fun() {
            let str = 'pink'
        }
        console.log(str) //错误
    </script>
```

+ 变量的特殊情况

```js
    <script>
        let num = 20
        function fn() {
            num = 10 //全局变量来看 强烈不允许
        }
        fn()
        console.log(num)

        function fun(x, y) {
            //形参可以看做是函数的局部变量
            console.log(x)
        }
        fun(1, 2)
        console.log(x) //错误的

        let num1 = 10
        function fn() {
            let num1= 20
            function fun() {
                console.log(num1)
            }
            fun()
        }
        fn()
    </script>
```

## 匿名函数

函数可以分为具名函数和匿名函数

匿名函数：没有名字的函数,无法直接使用。

### 函数表达式

```javascript
// 声明
let fn = function() { 
   console.log('函数表达式')
}
// 调用
fn()
```

+ 练习

```js
    <script>
        //1.函数表达式
        let fn = function(x, y) {
            console.log('我是函数表达式')
            console.log(x + y)
        }

        // 函数表达式和 具名函数的不同   function fn() {}
        //1. 具名函数的调用可以写到任何位置
        //2. 函数表达式，必须声明函数表达式，后调用
        // function fun() {
        //     console.log(1)
        // }
        // fun()
    </script>
```

### 立即执行函数

```javascript
(function(){ xxx  })();
(function(){xxxx}());
```

> 无需调用，立即执行，其实本质已经调用了
>
> 多个立即执行函数之间用分号隔开
>
> 在能够访问到的情况下 先局部 局部没有在找全局

+ 练习

```js
    <script>
        //1.第一种写法
        (function(x, y){
            console.log(x + y)
        })(1, 2);
        // (function(){})();

        //2.第二种写法
        (function(x, y){
            console.log(x + y)
        }(1, 2));
        // (function(){}())
    </script>
```

+ 综合案例

```js
    <script>
        //1.用户输入
        let second = +prompt('请输入参数：')
        //2.封装函数
        function getTime(t) {
            console.log(t) //总的秒数
            //3.转换
            // 小时：  h = parseInt(总秒数 / 60 / 60 % 24)
            // 分钟：  m = parseInt(总秒数 / 60 % 60)
            // 秒数: s = parseInt(总秒数 % 60) 
            let h = parseInt(t / 60 / 60 % 24)
            let m = parseInt(t / 60 % 60)
            let s = parseInt(t % 60)
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;
            return `转换完之后是${h}小时${m}分钟${s}秒`
        }
        let str = getTime(second)
        document.write(str)
        console.log(h)
    </script>
```

+ 逻辑中断

```js
    <script>
        function fn(x, y) {
            x = x || 0
            y = y || 0
            console.log(x + y)
        }
        fn(1, 2)
        console.log(false && 22)   //false
        console.log(false && 3 + 5)//false
        let age = 15

        console.log(false && age++) //age++ 不执行 一假则假
        console.log(age)//15

        console.log(true || age++)//true
        console.log(age)//15

        console.log(11 && 22) //都是真，这返回最后一个真值 22
        console.log(11 || 22) //输出第一个真值 11
    </script>
```

+ 布尔转换

```js
    <script>
        function fn(x, y) {
            x = x || 0
            y = y || 0
            console.log(x + y)
        }
        fn(1, 2)
        console.log(false && 22)   //false
        console.log(false && 3 + 5)//false
        let age = 15

        console.log(false && age++) //age++ 不执行 一假则假
        console.log(age)//15

        console.log(true || age++)//true
        console.log(age)//15

        console.log(11 && 22) //都是真，这返回最后一个真值 22
        console.log(11 || 22) //输出第一个真值 11
    </script>
```

