---
title: JavaScript For循环与数组
date: 2023-02-18 23:40:30
permalink: /JavaEE/JavaWeb/JavaScript_ForAndArr
categories:
  - JavaScript
tags:
  - JavaScript
---
# JavaScript For循环与数组

[[toc]]

**if 多分支语句和 switch的区别：**

1. 共同点

   - 都能实现多分支选择， 多选1 
   - 大部分情况下可以互换

2. 区别：

   - switch…case语句通常处理case为比较**确定值**的情况，而if…else…语句更加灵活，通常用于**范围判断**(大于，等于某个范围)。
   - switch 语句进行判断后直接执行到程序的语句，效率更高，而if…else语句有几种判断条件，就得判断多少次
   - switch 一定要注意 必须是 ===  全等，一定注意 数据类型，同时注意break否则会有穿透效果
   - 结论：
     - 当分支比较少时，if…else语句执行效率高。
     - 当分支比较多时，switch语句执行效率高，而且结构更清晰。

   

## for 语句

> 掌握 for 循环语句，让程序具备重复执行能力

`for` 是 JavaScript 提供的另一种循环控制的话句，它和 `while` 只是语法上存在差异。

### for语句的基本使用

1. 实现循环的 3 要素

```html
<script>
  // 1. 语法格式
  // for(起始值; 终止条件; 变化量) {
  //   // 要重复执行的代码
  // }

  // 2. 示例：在网页中输入标题标签
  // 起始值为 1
  // 变化量 i++
  // 终止条件 i <= 6
  for(let i = 1; i <= 6; i++) {
    document.write(`<h${i}>循环控制，即重复执行<h${i}>`)
  }
</script>
```

2. 变化量和死循环，`for` 循环和 `while` 一样，如果不合理设置增量和终止条件，便会产生死循环。

3. 跳出和终止循环

```html
<script>
    // 1. continue 
    for (let i = 1; i <= 5; i++) {
        if (i === 3) {
            continue  // 结束本次循环，继续下一次循环
        }
        console.log(i)
    }
    // 2. break
    for (let i = 1; i <= 5; i++) {
        if (i === 3) {
            break  // 退出结束整个循环
        }
        console.log(i)
    }
</script>
```

+ 练习

```js
    <script>
        //1.continue
        for (let i = 1; i <= 5; i++) {
            if (i === 3) {
                continue //退出本次循环，本次循环中 continue下面的语句不再执行
            }
            console.log(i)
            document.write(i)
        }

        //2.break
        for (let i = 1; i <= 5; i++) {
            if (i === 3) {
                break //退出整个循环，结束循环
            }
            console.log(i)
            document.write(i)
        }

        //无限循环
        for (; ;) {
            console.log(11)
        }
    </script>
```

结论：

- `JavaScript` 提供了多种语句来实现循环控制，但无论使用哪种语句都离不开循环的3个特征，即起始值、变化量、终止条件，做为初学者应着重体会这3个特征，不必过多纠结三种语句的区别。
- 起始值、变化量、终止条件，由开发者根据逻辑需要进行设计，规避死循环的发生。
- 当如果明确了循环的次数的时候推荐使用`for`循环,当不明确循环的次数的时候推荐使用`while`循环

> 注意：`for` 的语法结构更简洁，故 `for` 循环的使用频次会更多。

+ 练习

```js
<script>
        //1.输出1~100岁
        for (let i = 1; i <= 100; i++) {
            document.write(`今年我${i}岁了<br>`)
        }

        //2。求1~100之间的偶数和
        let sum = 0
        for (let i = 1; i <= 100; i++) {
            if (i % 2 === 0) {
                //把i加到sum里面去
                sum += i
            }
        }
        document.write(`1~100之间的偶数和为${sum}`)

        //3.页面打印5个小星星
        for (let i = 1; i <= 5; i++) {
            document.write('★')
        }

        //4.打印数组
        let arr = ['刘德华','刘晓强','刘晓庆','刘晓英','刘热巴']
        console.log(arr[0])
        console.log(arr[1])
        console.log(arr[2])
        console.log(arr[3])

        //5. i <= 4 长度-1
        for (let i = 0; i <= arr.length - 1; i++) {
            console.log(arr[i])
        }
        //必须从0开始，因为数组索引从0开始， arr.lenght = 0
        //遍历数组 从第一个循环到最后一个
        for(let i = 0; i < arr.length; i++) {
            console.log(arr[i])
        }

        let arr1 = []
        console.log(arr1)
        console.log(arr1[0]) //undefined
        console.log(arr1[1]) //undefined
    </script>
```



### 循环嵌套

利用循环的知识来对比一个简单的天文知识，我们知道地球在自转的同时也在围绕太阳公转，如果把自转和公转都看成是循环的话，就相当于是循环中又嵌套了另一个循环。

![universe](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/universe.5xhfdy5pj9w0.gif)

实际上 JavaScript 中任何一种循环语句都支持循环的嵌套，如下代码所示：

![1647918261399](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/1647918261399.5jg3yrmopm40.jpg)

```html
// 1. 外面的循环 记录第n天 
for (let i = 1; i < 4; i++) {
    document.write(`第${i}天 <br>`)
    // 2. 里层的循环记录 几个单词
    for (let j = 1; j < 6; j++) {
        document.write(`记住第${j}个单词<br>`)
    }
}
```

记住，外层循环循环一次，里层循环循环全部

练习

```js
   <script>
      //打印小星星
      let row = +prompt('请输入行数：')
      let col = +prompt('请输入列数：')
      //外层循环打印行数
      for (let i = 1; i <= row; i++) {
        //里层循环打印几个星星
        for (let j = 1; j <= col; j++) {
            document.write('☆')
        }
        //进行换行显示
        document.write('<br>')
      }
   </script> 
```

#### 倒三角

```javascript
 // 外层打印几行
for (let i = 1; i <= 5; i++) {
    // 里层打印几个星星
    for (let j = 1; j <= i; j++) {
        document.write('★')
    }
    document.write('<br>')
}
```

![1647918678956](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/1647918678956.rnhjx3sca4g.jpg)

```js
    <script>
        //1.外层循环控制行数
        for (let i = 1; i <= 5; i++) {
            //2.里层循环控制行数 (几个星星)
            for (let j = 1; j <= i; j++) {
                document.write('◆')
            }
            //换行
            document.write('<br>')
        }
    </script>
```

#### 九九乘法表

样式css

```css
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
```

javascript 

```javascript
 // 外层打印几行
for (let i = 1; i <= 9; i++) {
    // 里层打印几个星星
    for (let j = 1; j <= i; j++) {
        // 只需要吧 ★ 换成  1 x 1 = 1   
        document.write(`
		<div> ${j} x ${i} = ${j * i} </div>
     `)
    }
    document.write('<br>')
}
```

![1647918734677](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/1647918734677.58fat37nwgw0.jpg)

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
        //1.外层循环控制行数
        for (let i = i; i <= 9; i++) {
            //2.里层循环控制列数
            for (let j = 1; j <= i; j++) {
                document.write(`</span>${j} × ${i} = ${i * j}</span>`)
            }
            //换行
            document.write('<br>')
        }
    </script>
</body>

</html>
```

## 数组

> 知道什么是数组及其应用的场景，掌握数组声明及访问的语法。

### 数组是什么？

**数组：**(Array)是一种可以按顺序保存数据的数据类型

**使用场景：**如果有多个数据可以用数组保存起来，然后放到一个变量中，管理非常方便

### 数组的基本使用

#### 定义数组和数组单元

```html
<script>
  // 1. 语法，使用 [] 来定义一个空数组
  // 定义一个空数组，然后赋值给变量 classes
  // let classes = [];

  // 2. 定义非空数组
  let classes = ['小明', '小刚', '小红', '小丽', '小米']
</script>
```

通过 `[]` 定义数组，数据中可以存放真正的数据，如小明、小刚、小红等这些都是数组中的数据，我们这些数据称为数组单元，数组单元之间使用英文逗号分隔。

```js
    <script>
        //1. 字面量声明数组
        let arr = [1, 2, 'pink', true]
        //2. 使用 new Array 构造函数声明
        let arr1 = new Array(1, 2, 3, 4)
        console.log(arr1)
    </script>
```

#### 访问数组和数组索引

使用数组存放数据并不是最终目的，关键是能够随时的访问到数组中的数据（单元）。其实 JavaScript 为数组中的每一个数据单元都编了号，通过数据单元在数组中的编号便可以轻松访问到数组中的数据单元了。

我们将数据单元在数组中的编号称为索引值，也有人称其为下标。

索引值实际是按着数据单元在数组中的位置依次排列的，注意是从` 0` 开始的，如下图所示：

![array](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/array.1t4jjm6r023k.jpg)

观察上图可以数据单元【小明】对应的索引值为【0】，数据单元【小红】对应的索引值为【2】

```html
<script>
  let classes = ['小明', '小刚', '小红', '小丽', '小米']
  
  // 1. 访问数组，语法格式为：变量名[索引值]
  document.write(classes[0]) // 结果为：小明
  document.write(classes[1]) // 结果为：小刚
  document.write(classes[4]) // 结果为：小米
  
  // 2. 通过索引值还可以为数组单重新赋值
  document.write(classes[3]) // 结果为：小丽
  // 重新为索引值为 3 的单元赋值
  classes[3] = '小小丽'
  document.wirte(classes[3]); // 结果为： 小小丽
</script>
```

练习

```js
    <script>
        let arr = [2, 6, 1, 7, 4]
        //1. 求和的变量 sum
        let sum = 0
        //2. 遍历累加
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i])
            sum += arr[i]
        }
        console.log(`数组的和的结果是：${sum}`)
        //3. 平均值 和 / arr.length = 4
        console.log(`数组的平均值结果是：${sum / arr.length}`)
        
    </script>
```

```js
    <script>
        let arr = [2, 6, 1, 7, 400, 55, 88, 100]
        //max里面要存的是最大值
        let max = arr[0]
        //min 要存放的是最小值
        let min = arr[0]
        //遍历数组
        for (let i = 1; i < arr.length; i++) {
            //如果max 比 数组元素里面的值小，我们就需要把这元素赋值给 max]
            max < arr[i] ? max = arr[j] : max
            //如果min 比 数组元素大， 我们就需要把数组元素给min
            min > arr[i] ? min = arr[i] : min
        }
        //输出max，min
        console.log(`最大值是：${max}`)
        console.log(`最小值是：${min}`)
    </script>
```

#### 数据单元值类型

数组做为数据的集合，它的单元值可以是任意数据类型

```html
<script>
  // 6. 数组单值类型可以是任意数据类型

  // a) 数组单元值的类型为字符类型
  let list = ['HTML', 'CSS', 'JavaScript']
  // b) 数组单元值的类型为数值类型
  let scores = [78, 84, 70, 62, 75]
  // c) 混合多种类型
  let mixin = [true, 1, false, 'hello']
</script>

```

#### 数组长度属性

重申一次，数组在 JavaScript 中并不是新的数据类型，它属于对象类型。

```html
<script>
  // 定义一个数组
  let arr = ['html', 'css', 'javascript']
  // 数组对应着一个 length 属性，它的含义是获取数组的长度
  console.log(arr.length) // 3
</script>

```

### 操作数组

数组做为对象数据类型，不但有 `length` 属性可以使用，还提供了许多方法：

1. push 动态向数组的尾部添加一个单元
2. unshit 动态向数组头部添加一个单元
3. pop 删除最后一个单元
4. shift 删除第一个单元
5. splice 动态删除任意单元

使用以上4个方法时，都是直接在原数组上进行操作，即成功调任何一个方法，原数组都跟着发生相应的改变。并且在添加或删除单元时 `length` 并不会发生错乱。

```html
<script>
  // 定义一个数组
  let arr = ['html', 'css', 'javascript']

  // 1. push 动态向数组的尾部添加一个单元
  arr.push('Nodejs')
  console.log(arr)
  arr.push('Vue')

  // 2. unshit 动态向数组头部添加一个单元
  arr.unshift('VS Code')
  console.log(arr)

  // 3. splice 动态删除任意单元
  arr.splice(2, 1) // 从索引值为2的位置开始删除1个单元
  console.log(arr)

  // 4. pop 删除最后一个单元
  arr.pop()
  console.log(arr)

  // 5. shift 删除第一个单元
  arr.shift()
  console.log(arr)
</script>

```

+ 改

```js
    <script>
        let arr = []
        console.log(arr)
        console.log(arr[0])
        arr[0] = 1
        arr[1] = 5
        console.log(arr)
        let arr = ['pink', 'red', 'grenn']
        //修改
        arr[0] = 'hotpink'
        console.log(arr)
        //给所有的数组元素加个老师 修改
        for (let i = 0; i < arr.length; i++) {
            console.log(arr[i])
        }
        console.log(arr)
    </script>
```

+ 增

```js
    <script>
        let arr = ['pink', 'hotpink']
        //新增 push 推末尾
        console.log(arr.push('deeppink'))//3
        arr.push('deeppinnk', 'linghtpink')
        console.log(arr)
        //开头追加                          
        arr.unshift('red')
        console.log(arr)
    </script>
```

