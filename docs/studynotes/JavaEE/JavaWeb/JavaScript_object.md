---
title: JavaScript 对象
date: 2023-02-27 23:04:54
permalink: /JavaEE/JavaWeb/JavaScript_object
categories:
  - JavaScript
tags:
  - JavaScript
---
# JavaScript 对象

[[toc]]

> 知道对象数据类型的特征，能够利用数组对象渲染页面

- 理解什么是对象，掌握定义对象的语法
- 掌握数学对象的使用

## 对象

> 对象是 JavaScript 数据类型的一种，之前已经学习了数值类型、字符串类型、布尔类型、undefined。对象数据类型可以被理解成是一种数据集合。它由属性和方法两部分构成。

### 语法

声明一个对象类型的变量与之前声明一个数值或字符串类型的变量没有本质上的区别。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 声明字符串类型变量
    let str = 'hello world!'
    
    // 声明数值类型变量
    let num = 199

    // 声明对象类型变量，使用一对花括号
    // user 便是一个对象了，目前它是一个空对象
    let user = {}
  </script>
</body>
</html>
```

+ 练习

```js
    <script>
        //1.声明对象
        let pink = {
            uname: '冯荣旭',
            age: '22',
            gender: '男'
        }

        console.log(pink)
        console.log(typeof pink)

        //把年龄改为18
        pink.age = 18
        console.log(pink)
        //增加属性
        pink.hobby = '踢足球'
        console.log(pink)
        //删（了解）
        delete pink.age
        console.log(pink)
        //1.声明
        console.log(window.name)
        
        let obj = {
            'goods-name': '小米10青春版',
            num: '317231312371',
            weight: '0.55kg',
            address: '中国大陆'
        }

        obj.name = '小米10 PLUS'
        obj.color = '粉色'
        console.log(obj.num)
        console.log(obj.weight)
        console.log(obj.address)
        console.log(obj.color)

        //查的另外一种属性
        //对象名['属性名']
        console.log(obj['goods-name'])

        //查总结
        //(1) 对象名.属性名 obj.age
        console.log(obj.num)
        //(2) 对象名['属性名'] obj['age']
        console.log(obj['num'])

        console.log(address)
        //2.使用属性 查对象名.属性名
        console.log(obj.address)
        console.log(obj.name)
    </script>
```

### 属性和访问

数据描述性的信息称为属性，如人的姓名、身高、年龄、性别等，一般是名词性的。

1. 属性都是成 对出现的，包括属性名和值，它们之间使用英文 `:` 分隔
2. 多个属性之间使用英文 `,` 分隔
3. 属性就是依附在对象上的变量
4. 属性名可以使用 `""` 或 `''`，一般情况下省略，除非名称遇到特殊符号如空格、中横线等

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 通过对象描述一个人的数据信息
    // person 是一个对象，它包含了一个属性 name
    // 属性都是成对出现的，属性名 和 值，它们之间使用英文 : 分隔
    let person = {
      name: '小明', // 描述人的姓名
      age: 18, // 描述人的年龄
      stature: 185, // 描述人的身高
      gender: '男', // 描述人的性别
    }
  </script>
</body>
</html>
```

声明对象，并添加了若干属性后，可以使用 `.` 或 `[]` 获得对象中属性对应的值，我称之为属性访问。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 通过对象描述一个人的数据信息
    // person 是一个对象，它包含了一个属性 name
    // 属性都是成对出现的，属性名 和 值，它们之间使用英文 : 分隔
    let person = {
      name: '小明', // 描述人的姓名
      age: 18, // 描述人的年龄
      stature: 185, // 描述人的身高
      gender: '男', // 描述人的性别
    };
    
    // 访问人的名字
    console.log(person.name) // 结果为 小明
    // 访问人性别
    console.log(person.gender) // 结果为 男
    // 访问人的身高
    console.log(person['stature']) // 结果为 185
   // 或者
    console.log(person.stature) // 结果同为 185
  </script>
</body>
</html>
```

扩展：也可以动态为对象添加属性，动态添加与直接定义是一样的，只是语法上更灵活。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象语法</title>
</head>
<body>

  <script>
    // 声明一个空的对象（没有任何属性）
	let user = {}
    // 动态追加属性
    user.name = '小明'
    user['age'] = 18
    
    // 动态添加与直接定义是一样的，只是语法上更灵活
  </script>
</body>
</html>
```

### 方法和调用

数据行为性的信息称为方法，如跑步、唱歌等，一般是动词性的，其本质是函数。

1. 方法是由方法名和函数两部分构成，它们之间使用 : 分隔
2. 多个属性之间使用英文 `,` 分隔
3. 方法是依附在对象中的函数
4. 方法名可以使用 `""` 或 `''`，一般情况下省略，除非名称遇到特殊符号如空格、中横线等

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象方法</title>
</head>
<body>

  <script>
    // 方法是依附在对象上的函数
    let person = {
      name: '小红',
      age: 18,
      // 方法是由方法名和函数两部分构成，它们之间使用 : 分隔
      singing: function () {
        console.log('两只老虎，两只老虎，跑的快，跑的快...')
      },
      run: function () {
        console.log('我跑的非常快...')
      }
    }
  </script>
</body>
</html>
```

声明对象，并添加了若干方法后，可以使用 `.` 或 `[]` 调用对象中函数，我称之为方法调用。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象方法</title>
</head>
<body>

  <script>
    // 方法是依附在对象上的函数
    let person = {
      name: '小红',
      age: 18,
      // 方法是由方法名和函数两部分构成，它们之间使用 : 分隔
      singing: function () {
        console.log('两只老虎，两只老虎，跑的快，跑的快...')
      },
      run: function () {
        console.log('我跑的非常快...')
      }
    }
    
    // 调用对象中 singing 方法
    person.singing()
    // 调用对象中的 run 方法
    person.run()

  </script>
</body>
</html>
```

扩展：也可以动态为对象添加方法，动态添加与直接定义是一样的，只是语法上更灵活。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>JavaScript 基础 - 对象方法</title>
</head>
<body>

  <script>
    // 声明一个空的对象（没有任何属性，也没有任何方法）
	let user = {}
    // 动态追加属性
    user.name = '小明'
    user.['age'] = 18
    
    // 动态添加方法
    user.move = function () {
      console.log('移动一点距离...')
    }
    
  </script>
</body>
</html>
```

**注：无论是属性或是方法，同一个对象中出现名称一样的，后面的会覆盖前面的。**

+ 练习

```js
    <script>
        let obj = {
            uname: '刘德华',
            //方法
            song: function (x, y) {
                console.log('冰雨')
                console.log(x + y)
            },
            dance: function () {}
        }

        //方法调用 对象名.方法名
        console.log(obj.song(1, 2))
    </script>
```

### null

null 也是 JavaScript 中数据类型的一种，通常只用它来表示不存在的对象。使用 typeof 检测类型它的类型时，结果为 `object`。

#### 遍历对象

```javascript
let obj = {
    uname: 'pink'
}
for(let k in obj) {
    // k 属性名  字符串  带引号    obj.'uname'     k ===  'uname'
    // obj[k]  属性值    obj['uname']   obj[k]
}
```

for in 不提倡遍历数组 因为 k 是 字符串  

+ 练习

```js
    <script>
        //for in 我们不推荐遍历数组
        let arr = ['pink', 'red', 'blue']
        for (let k in arr) {
            console.log(k)
            console.log(arr[k])
        }
        //1. 遍历对象 for in
        let obj = {
            uname: 'pink老师',
            age: 10,
            gender: '男'
        }
        //2.遍历对象
        for (let k in obj) {
            console.log(k) // 属性名 'uname' 'age'
            console.log(obj.k) // undefined
            console.log(obj[k])// 输出属性值
        }
        
    </script>
```

+ 遍历数组对象

```js
    <script>
        let students = [
            { name: '小明', age: 18, gender: '男', hometown: '河南省'},
            { name: '小红', age: 20, gender: '女', hometown: '湖北省'},
            { name: '小亮', age: 22, gender: '男', hometown: '陕西省'},
            { name: '小丽', age: 13, gender: '女', hometown: '山东省'}
        ]
        for (let i = 0; i <= students.length; i++) {
            console.log(i)
            console.log(students[i].name)
            console.log(students[i].age)
        }
    </script>
```

+ 渲染学生表

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table {
            width: 600px;
            text-align: center;
        }

        table,
        th,
        td {
            border: 1px solid #ccc;
            border-collapse: collapse;
        }

        caption {
            font-size: 18px;
            margin-bottom: 10px;
            font-weight: 700;
        }

        tr {
            height: 40px;
            cursor: pointer;
        }

        table tr:nth-child(1) {
            background-color: #ddd;
        }

        table tr:not(:first-child):hover {
            background-color: #eee;
        }
    </style>
</head>

<body>
    <h2>学生信息</h2>
    <p>将数据渲染到页面中</p>

    <table>
        <caption>学生列表</caption>
        <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>性别</th>
            <th>家乡</th>
        </tr>
        <script>
            //1.数据准备
            let students = [
                { name: '小明', age: 18, gender: '男', hometown: '河北省' },
                { name: '小红', age: 19, gender: '女', hometown: '河南省' },
                { name: '小刚', age: 17, gender: '男', hometown: '山西省' },
                { name: '小丽', age: 18, gender: '女', hometown: '山东省' },
                { name: '晓强', age: 16, gender: '女', hometown: '蓝翔技校' }
            ]
            //2.喧染页面
            for (let i = 0; i < students.length; i++) {
                document.write(`
            <tr>
                <td>${i + 1}</td>
                <td>${students[i].name}</td>
                <td>${students[i].age}</td>
                <td>${students[i].gender}</td>
                <td>${students[i].hometown}</td>
            </tr>
            `)
            }
        </script>
    </table>
</body>

</html>
```

## 内置对象

回想一下我们曾经使用过的 `console.log`，`console`其实就是 JavaScript 中内置的对象，该对象中存在一个方法叫 `log`，然后调用 `log` 这个方法，即 `console.log()`。

除了 `console` 对象外，JavaScritp 还有其它的内置的对象

### Math

`Math` 是 JavaScript 中内置的对象，称为数学对象，这个对象下即包含了属性，也包含了许多的方法。

```js
    <script>
        //属性
        console.log(Math.PI)
        //方法
        //ceil 天花板 向上取整
        console.log(Math.ceil(1.1))//2
        console.log(Math.ceil(1,5))//2
        console.log(Math.ceil(1.9))//2
        //floor 地板 向下取整
        console.log(Math.floor(1.1)) //1
        console.log(Math.floor(1.5)) //1
        console.log(Math.floor(1.9)) //1
        console.log(Math.floor('12px'))

        //四舍五入 round
        console.log(Math.round(1.1))  //1
        console.log(Math.round(1.49)) //1
        console.log(Math.round(1.5))  //2
        console.log(Math.round(1.9))  //2
        console.log(Math.round(-1.1)) //-1
        console.log(Math.round(-1.5)) //-1
        console.log(Math.round(-1.51))//-2

        
        // 取整函数 parseInt(1.2)   // 1
        // 取整函数 parseInt('12px')   // 12
        console.log(Math.max(1, 2, 3, 4, 5))
        console.log(Math.min(1, 2, 3, 4, 5))
        console.log(Math.abs(-1))

        // null 类似 let obj = {}
        let obj = null
    </script>
```

#### 属性

- Math.PI，获取圆周率

```javascript
// 圆周率
console.log(Math.PI);
```

#### 方法

- Math.random，生成 0 到 1 间的随机数

```javascript
// 0 ~ 1 之间的随机数, 包含 0 不包含 1
Math.random()
```

- Math.ceil，数字向上取整

```javascript
// 舍弃小数部分，整数部分加1
Math.ceil(3.4)
```

- Math.floor，数字向下取整

```javascript
// 舍弃小数部分，整数部分不变
Math.floor(4.68)
```

- Math.round，四舍五入取整

```javascript
// 取整，四舍五入原则
Math.round(5.46539)
Math.round(4.849)
```

- Math.max，在一组数中找出最大的

```javascript
// 找出最大值
Math.max(10, 21, 7, 24, 13)
```

- Math.min，在一组数中找出最小的

```javascript
// 找出最小值
Math.min(24, 18, 6, 19, 21)
```

- Math.pow，幂方法

```javascript
// 求某个数的多少次方
Math.pow(4, 2) // 求 4 的 2 次方
Math.pow(2, 3) // 求 2 的 3 次方
```

- Math.sqrt，平方根

```javascript
// 求某数的平方根
Math.sqrt(16)
```

数学对象提供了比较多的方法，这里不要求强记，通过演示数学对象的使用，加深对对象的理解。

### 练习

+ 随机数函数

```js
    <script>
        //左闭右开 能取到 0 但是取不到 1 中间的一个随机小数
        //console.log(Math.random())

        //0~10 之间的整数
        console.log(Math.floor(Math.random() * 11))
        let arr = ['red', 'grenn', 'blue']
        let random = Math.floor(Math.random() * arr.length)
        console.log(random)
        console.log(arr[random])

        //取到N ~ M 的随机整数
        function getRandom(N, M) {
            return Math.floor(Math.random() * (M - N + 1)) + N
        }
        console.log(getRandom(4, 8))
    </script>
```

+ 随机点名

```js
    <script>
        let arr = ['赵云', '黄忠', '关羽', '张飞', '马超', '刘备', '曹操']
        //1.得到一个随机数， 作为数组的索引号， 这个随机数 0~6
        let random = Math.floor(Math.random() * arr.length)
        //2. 页面输出数组里面的元素
        document.write(arr[random])
        
        //3.splice(起始位置(下标)，删除几个元素)
        arr.splice(random, 1)
        console.log(arr)
    </script>
```

+ 猜数字游戏

```js
    <script>
        //1.随机生成一个数字 1~10
        // 取到 N ~ M 的随机整数
        function getRandom(N, M) {
            return Math.floor(Math.random() * (M - N + 1)) + N
        }

        let random = getRandom(1, 10)
        console.log(random)

        //需要不断的循环
        while (true) {
            //2.用户输入一个数
            let num = +prompt('请输入你猜的数字：')
            //3.判断输出
            if (num > random) {
                alert('您猜小了')
            } else if (num < random) {
                alert('您猜小了')
            } else {
                alert('猜对啦，真厉害')
                break //退出循环
            }
        }
    </script>
```

+ 猜数字游戏，设定次数

```js {10,18,24-26}
    <script>
        //1.随机生成一个数字 1~10
        // 取到 N ~ M 的随机整数
        function getRandom(N, M) {
            return Math.floor(Math.random() * (M - N + 1)) + N
        }

    let random = getRandom(1, 10)
    //2.设定三次 三次没猜对就直接退出
    let flag = true
    for (let i = 1; i <= 3; i++) {
        let num = + prompt('请输入1~10之间的一个数字：')
        if (num > random) {
            alert('您猜大了，继续')
        } else if (num < random) {
            alert('您猜小了，继续')
        } else {
            flag = false
            alert('猜对啦，真厉害')
            break
        }
    }
    //写到for的外面来
    if (flag) {
        alert('次数已经用完')
    }
    </script>
```

+ 随机颜色案例

```js
    <script>
        //1.自定义一个随机颜色函数
        function getRandomColor(flag = true) {
            if (flag) {
                //3.如果是true 则返回 #ffffff
                let str = '#'
                let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
                //利用for循环随机抽6次 累加到 str 里面
                for (let i = 1; i <= 6; i++) {
                    //每次要随机抽6次 累加到 str 里面
                    //random 是数组的索引号 是随机的
                    let random = Math.floor(Math.random() * arr.length)
                    str += arr[random]
                }
                return str
            } else {
                //4. 否则是 false 则返回 rgb(255,255,255)
                let r = Math.floor(Math.random() * 256)
                let g = Math.floor(Math.random() * 256)
                let b = Math.floor(Math.random() * 256)
                
                return `rgb(${r},${g},${b})`
            }
        }
        //2.调用函数 getRandomColor(布尔值)
        console.log(getRandomColor(false))
        console.log(getRandomColor(true))
        console.log(getRandomColor())
    </script>
```

+ 数据类型存储

```js
    <script>
        let num1 = 10
        let num2 = num1
        num2 = 20
        console.log(num1) //结果是 ? 10

        let obj1 = {
            age: 18
        }

        let obj2 = obj1
        //修改属性
        obj2.age = 20
        console.log(obj1.age) //20
    </script>
```

