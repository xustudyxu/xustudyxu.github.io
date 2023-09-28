---
title: JavaScript 运算符与语句
date: 2023-02-11 23:07:10
permalink: /JavaEE/JavaWeb/JavaScript_OperatorsaAndStatements
categories:
  - JavaScript
tags:
  - JavaScript
---
# JavaScript 运算符与语句

[[toc]]

## 运算符

### 算术运算符

数字是用来计算的，比如：乘法 * 、除法 / 、加法 + 、减法 - 等等，所以经常和算术运算符一起。

算术运算符：也叫数学运算符，主要包括加、减、乘、除、取余（求模）等

| 运算符 | 作用                                                 |
| ------ | ---------------------------------------------------- |
| +      | 求和                                                 |
| -      | 求差                                                 |
| *      | 求积                                                 |
| /      | 求商                                                 |
| **%**  | 取模（取余数），开发中经常用于作为某个数字是否被整除 |

> 注意：在计算失败时，显示的结果是 NaN （not a number）

```javascript
// 算术运算符
console.log(1 + 2 * 3 / 2) //  4 
let num = 10
console.log(num + 10)  // 20
console.log(num + num)  // 20

// 1. 取模(取余数)  使用场景：  用来判断某个数是否能够被整除
console.log(4 % 2) //  0  
console.log(6 % 3) //  0
console.log(5 % 3) //  2
console.log(3 % 5) //  3

// 2. 注意事项 : 如果我们计算失败，则返回的结果是 NaN (not a number)
console.log('pink' - 2)
console.log('pink' * 2)
console.log('pink' + 2)   // pink2
```

+ 练习

```js
        console.log(1 + 1);//2
        console.log(1 - 1);//0
        console.log(1 * 1);//1
        console.log(1 / 1);//1
        // 1. % 取余 （取模）
        console.log(4 % 2);//0
        console.log(5 % 3);//2
        console.log(3 % 5);//3
        // 2. 浮点数 算术运算里面会有问题
        console.log(0.1 + 0.2); //0.30000000000000004
        console.log(0.07 * 100);//7.000000000000001
        // 3.我们不能直接拿着浮点数来进行比较 是否相等
        var num = 0.1 + 0.2;
        console.log(num == 0.3);//false
        console.log('pink老师'*2)//NaN
```

### 赋值运算符

赋值运算符：对变量进行赋值的运算符

 =     将等号右边的值赋予给左边, 要求左边必须是一个容器

| 运算符 | 作用     |
| ------ | -------- |
| +=     | 加法赋值 |
| -+     | 减法赋值 |
| *=     | 乘法赋值 |
| /=     | 除法赋值 |
| %=     | 取余赋值 |

```javascript
<script>
let num = 1
// num = num + 1
// 采取赋值运算符
// num += 1
num += 3
console.log(num)
</script>
```

+ 练习

```javascript
	let num = 1
    // num = num + 1
    // 采取赋值运算符
    // num += 1
    num += 3
    console.log(num)
```

### 自增/自减运算符

| ++   | 自增 | 变量自身的值加1，例如: x++ |
| ---- | ---- | -------------------------- |
| 符号 | 作用 | 说明                       |
| --   | 自减 | 变量自身的值减1，例如: x-- |

1. ++在前和++在后在单独使用时二者并没有差别，而且一般开发中我们都是独立使用
2. ++在后（后缀式）我们会使用更多

```js
<script>
    // let num = 10
    // num = num + 1
    // num += 1
    // // 1. 前置自增
    // let i = 1
    // ++i
    // console.log(i)

    // let i = 1
    // console.log(++i + 1)
    // 2. 后置自增
    // let i = 1
    // i++
    // console.log(i)
    // let i = 1
    // console.log(i++ + 1)

    // 了解 
    let i = 1
    console.log(i++ + ++i + i)
  </script>
```

+ 练习

```js
    <script>
        //1. 想要一个变量自己加1 num = num + 1比较麻烦
        var num = 1;
        num = num + 1;
        num = num + 1;
        console.log(num);// 3
        //2. 前置递增运算符 ++ 写在变量的前面
        var age = 10;
        ++age; //类似于 age = age + 1
        //3. 先加1 后返回值
        var p = 10;
        console.log(++p + 10);//21
    </script>
	
	 <script>
        var num = 10;
        num++;// num = num + 1; ++num;
        console.log(num);//11
        //1. 前置自增和后置自增单独使用，效果是一样的
        //2. 后置自增 先返回值 后自加1
        var age = 10;
        console.log(age++ + 10);//20
        console.log(age);//11
    </script>

	<script>
        var a = 10;
        ++a; //a = 11
        var b = ++a + 2; //a = 12
        console.log(b);//a = 14

        var c = 10;
        c++; //c = 11
        var d = c++ + 2; //11 + 2
        console.log(d); //13

        var e = 10;
        var f = e++ + ++e; // e++ = 10 e = 11 ++e =12 10+12
        console.log(f);//22
        //后置自增 先表达式再返回值 后面变量再自加1
    </script>
```

### 比较运算符

使用场景：比较两个数据大小、是否相等，根据比较结果返回一个布尔值（true / false）

| 运算符 | 作用                                   |
| ------ | -------------------------------------- |
| >      | 左边是否大于右边                       |
| <      | 左边是否小于右边                       |
| >=     | 左边是否大于或等于右边                 |
| <=     | 左边是否小于或等于右边                 |
| ===    | 左右两边是否`类型`和`值`都相等（重点） |
| ==     | 左右两边`值`是否相等                   |
| !=     | 左右值不相等                           |
| !==    | 左右两边是否不全等                     |

```js
<script>
  console.log(3 > 5)
  console.log(3 >= 3)
  console.log(2 == 2)
  // 比较运算符有隐式转换 把'2' 转换为 2  双等号 只判断值
  console.log(2 == '2')  // true
  // console.log(undefined === null)
  // === 全等 判断 值 和 数据类型都一样才行
  // 以后判断是否相等 请用 ===  
  console.log(2 === '2')
  console.log(NaN === NaN) // NaN 不等于任何人，包括他自己
  console.log(2 !== '2')  // true  
  console.log(2 != '2') // false 
  console.log('-------------------------')
  console.log('a' < 'b') // true
  console.log('aa' < 'ab') // true
  console.log('aa' < 'aac') // true
  console.log('-------------------------')
</script>
```

+ 练习

```js
    <script>
        console.log(3 >= 5);
        console.log(2 <= 4);
        //1. 我们程序里面的等于符号 是 == 默认转换为数据类型 会把字符串型的数据转换为数字型 只要求值相等就可以
        console.log(3 == 5); //false
        console.log('frx' == 'abc');//false
        console.log(18 == 18);//true
        console.log(18 == '18');
        console.log(18 != 18);
        //2. 我们程序里面有全等 一模一样 要求两侧的值 还有 数据类型完全一致 才可以 true
        console.log(18 === 18);
        console.log(18 === '18');//false
    </script>
```

### 逻辑运算符

使用场景：可以把多个布尔值放到一起运算，最终返回一个布尔值

| 符号 | 名称   | 日常读法 | 特点                       | 口诀           |
| ---- | ------ | -------- | -------------------------- | -------------- |
| &&   | 逻辑与 | 并且     | 符号两边有一个假的结果为假 | 一假则假       |
| \|\| | 逻辑或 | 或者     | 符号两边有一个真的结果为真 | 一真则真       |
| !    | 逻辑非 | 取反     | true变false  false变true   | 真变假，假变真 |

| A     | B     | A && B | A \|\| B | !A    |
| ----- | ----- | ------ | -------- | ----- |
| false | false | false  | false    | true  |
| false | true  | false  | true     | true  |
| true  | false | false  | true     | false |
| true  | true  | true   | true     | false |

```js
<script>
    // 逻辑与 一假则假
    console.log(true && true)
    console.log(false && true)
    console.log(3 < 5 && 3 > 2)
    console.log(3 < 5 && 3 < 2)
    console.log('-----------------')
    // 逻辑或 一真则真
    console.log(true || true)
    console.log(false || true)
    console.log(false || false)
    console.log('-----------------')
    // 逻辑非  取反
    console.log(!true)
    console.log(!false)

    console.log('-----------------')

    let num = 6
    console.log(num > 5 && num < 10)
    console.log('-----------------')
  </script>
```

+ 练习

```js
    <script>
        // 1. 逻辑与 && and 两侧都为 true 结果才是 true 只要有一侧为false 结果就为 flase
        console.log(3 > 5 && 3 > 2);//flase
        console.log(3 > 2 && 1 > 0);//true
        // 2. 逻辑或 || or 两侧都为 flase 结果才是 flase 只要有一侧为 true 结果就为 true
        console.log(3 > 1 && 3 > 7);
        console.log(3 > 4 && 2 > 8);
        // 3.逻辑非 not !
        console.log(!true);//flase

    </script>
```

### 运算符优先级

| 优先级 | 运算符     | 顺序                |
| ------ | ---------- | ------------------- |
| 1      | 小括号     | ()                  |
| 2      | 一元运算符 | ++ -- !             |
| 3      | 算数运算符 | **先 * / % 后 + -** |
| 4      |            | \>   >= < <=        |
| 5      |            | == != \==\= \!==    |
| 6      | 逻辑运算符 | **先 && 后 \|\|**   |
| 7      | 赋值运算符 | =                   |
| 8      | 逗号运算符 | ,                   |

> 逻辑运算符优先级： ！> && >  ||  

## 语句

### 表达式和语句

![1671017800406](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20230211/1671017800406.6c85cc1mdj40.jpg)

### 分支语句

分支语句可以根据条件判定真假，来选择性的执行想要的代码

分支语句包含：

1. if分支语句（重点）
2. 三元运算符
3. switch语句

#### if 分支语句

语法：

```js
if(条件表达式) {
  // 满足条件要执行的语句
}
```

小括号内的条件结果是布尔值，为 true 时，进入大括号里执行代码；为false，则不执行大括号里面代码

小括号内的结果若不是布尔类型时，会发生类型转换为布尔值，类似Boolean()

如果大括号只有一个语句，大括号可以省略，但是，俺们不提倡这么做~

```js
<script>
    // 单分支语句
    // if (false) {
    //   console.log('执行语句')
    // }
    // if (3 > 5) {
    //   console.log('执行语句')
    // }
    // if (2 === '2') {
    //   console.log('执行语句')
    // }
    //  1. 除了0 所有的数字都为真
    //   if (0) {
    //     console.log('执行语句')
    //   }
    // 2.除了 '' 所有的字符串都为真 true
    // if ('pink老师') {
    //   console.log('执行语句')
    // }
    // if ('') {
    //   console.log('执行语句')
    // }
    // // if ('') console.log('执行语句')

    // 1. 用户输入
    let score = +prompt('请输入成绩')
    // 2. 进行判断输出
    if (score >= 700) {
      alert('恭喜考入黑马程序员')
    }
    console.log('-----------------')

  </script>
```

+ 练习

```js
    <script>
        // 1.if语法结构 如果if
        // if (条件表达式) {
            //执行语句
        //}

        // 2.执行思路 如果 if 里面的条件表达式为真 true 则执行大括号里面的执行语句
        // 如果 if 条件表达式结果为假 则不执行大括号里面的语句，执行 If 语句后面的语句
        if (3 < 5) {
            alert('HelloWorld');
        }
    </script>
```

#### if 双分支语句

如果有两个条件的时候，可以使用 if else 双分支语句

```js
if (条件表达式){
  // 满足条件要执行的语句
} else {
  // 不满足条件要执行的语句
}
```

例如：

```js
 <script>
    // 1. 用户输入
    let uname = prompt('请输入用户名:')
    let pwd = prompt('请输入密码:')
    // 2. 判断输出
    if (uname === 'pink' && pwd === '123456') {
      alert('恭喜登录成功')
    } else {
      alert('用户名或者密码错误')
    }
  </script>
```

+ 练习

```js
    <script>
        // 1. 语法结构  if 如果  else 否则
        // if (条件表达式) {
        //     // 执行语句1
        // } else {
        //     // 执行语句2 
        // }
        // 2. 执行思路 如果表达式结果为真 那么执行语句1  否则  执行语句2
        // 3. 代码验证
        var age = prompt('请输入您的年龄：');
        if (age >= 18) {
            alert('一起去网吧');
        } else {
            alert('回家写作业')
        }
    </script>
```

#### if 多分支语句

使用场景： 适合于有多个条件的时候

```js
 <script>
    // 1. 用户输入
    let score = +prompt('请输入成绩：')
    // 2. 判断输出
    if (score >= 90) {
      alert('成绩优秀，宝贝，你是我的骄傲')
    } else if (score >= 70) {
      alert('成绩良好，宝贝，你要加油哦~~')
    } else if (score >= 60) {
      alert('成绩及格，宝贝，你很危险~')
    } else {
      alert('成绩不及格，宝贝，我不想和你说话，我只想用鞭子和你说话~')
    }
  </script>
```

+ 练习

```js
    <script>
        //通过 prompt 来接受输入的成绩 判断成绩的好坏
        var score = prompt('请输入成绩(0-100):');
        if (score >= 90) {
            alert('优秀');
        } else if (score >= 80) {
            alert('良好');
        } else if (score >= 70) {
            alert('中等');
        } else if (score >= 60) {
            alert('及格');
        } else {
            alert('不及格')
        }
    </script>
```

#### 三元运算符（三元表达式）

**使用场景**： 一些简单的双分支，可以使用  三元运算符（三元表达式），写起来比 if  else双分支 更简单

**符号**：? 与 : 配合使用

语法：

```js
条件 ? 表达式1 ： 表达式2
```

例如：

```js
// 三元运算符（三元表达式）
// 1. 语法格式
// 条件 ? 表达式1 : 表达式2 

// 2. 执行过程 
// 2.1 如果条件为真，则执行表达式1
// 2.2 如果条件为假，则执行表达式2

// 3. 验证
// 5 > 3 ? '真的' : '假的'
console.log(5 < 3 ? '真的' : '假的')

// let age = 18 
// age = age + 1
//  age++

// 1. 用户输入 
let num = prompt('请您输入一个数字:')
// 2. 判断输出- 小于10才补0
// num = num < 10 ? 0 + num : num
num = num >= 10 ? num : 0 + num
alert(num)
```

+ 练习

```js
	<script>
        var num = 10;
        var res = num > 5 ? '大于5':'小于或者等于5';
        alert(res);
    </script>
```

#### switch语句（了解）

使用场景： 适合于有多个条件的时候，也属于分支语句，大部分情况下和 if多分支语句 功能相同

注意：

1. switch case语句一般用于等值判断, if适合于区间判断
2. switchcase一般需要配合break关键字使用 没有break会造成case穿透
3. if 多分支语句开发要比switch更重要，使用也更多

例如：

```js
// switch分支语句
// 1. 语法
// switch (表达式) {
//   case 值1:
//     代码1
//     break

//   case 值2:
//     代码2
//     break
//   ...
//   default:
//     代码n
// }

<script>
  switch (2) {
    case 1:
    console.log('您选择的是1')
    break  // 退出switch
    case 2:
    console.log('您选择的是2')
    break  // 退出switch
    case 3:
    console.log('您选择的是3')
    break  // 退出switch
    default:
    console.log('没有符合条件的')
  }
</script>
```

#### 断点调试

**作用：**学习时可以帮助更好的理解代码运行，工作时可以更快找到bug

浏览器打开调试界面

1. 按F12打开开发者工具
2. 点到源代码一栏 （ sources ）
3. 选择代码文件

**断点：**在某句代码上加的标记就叫断点，当程序执行到这句有标记的代码时会暂停下来

### 循环语句

使用场景：重复执行 指定的一段代码，比如我们想要输出10次 '我学的很棒'

学习路径：

1.while循环

2.for 循环（重点）

#### while循环

while :  在…. 期间， 所以 while循环 就是在满足条件期间，重复执行某些代码。

语法：

```js
while (条件表达式) {
   // 循环体    
}
```

例如：

```js
// while循环: 重复执行代码

// 1. 需求: 利用循环重复打印3次 '月薪过万不是梦，毕业时候见英雄'
let i = 1
while (i <= 3) {
  document.write('月薪过万不是梦，毕业时候见英雄~<br>')
  i++   // 这里千万不要忘了变量自增否则造成死循环
}
```

循环三要素：

1.初始值 （经常用变量）

2.终止条件

3.变量的变化量

例如：

```js
<script>
  // // 1. 变量的起始值
  // let i = 1
  // // 2. 终止条件
  // while (i <= 3) {
  //   document.write('我要循环三次 <br>')
  //   // 3. 变量的变化量
  //   i++
  // }
  // 1. 变量的起始值
  let end = +prompt('请输入次数:')
let i = 1
// 2. 终止条件
while (i <= end) {
  document.write('我要循环三次 <br>')
  // 3. 变量的变化量
  i++
}

</script>
```

+ 练习

```js
  <script>
    // // 1. 变量的起始值
    // let i = 1
    // // 2. 终止条件
    // while (i <= 3) {
    //   document.write('我要循环三次 <br>')
    //   // 3. 变量的变化量
    //   i++
    // }
    // 1. 变量的起始值
    let end = +prompt('请输入次数:')
    let i = 1
    // 2. 终止条件
    while (i <= end) {
      document.write('我要循环三次 <br>')
      // 3. 变量的变化量
      i++
    }

  </script>
```

#### 中止循环

`break`   中止整个循环，一般用于结果已经得到, 后续的循环不需要的时候可以使用（提高效率）  

`continue`  中止本次循环，一般用于排除或者跳过某一个选项的时候

```js
<script>
    // let i = 1
    // while (i <= 5) {
    //   console.log(i)
    //   if (i === 3) {
    //     break  // 退出循环
    //   }
    //   i++

    // }


    let i = 1
    while (i <= 5) {
      if (i === 3) {
        i++
        continue
      }
      console.log(i)
      i++

    }
  </script>
```

+ 练习

```js
  <script>
    // let i = 1
    // while (i <= 5) {
    //   console.log(i)
    //   if (i === 3) {
    //     break  // 退出循环
    //   }
    //   i++

    // }


    let i = 1
    while (i <= 5) {
      if (i === 3) {
        i++
        continue
      }
      console.log(i)
      i++

    }
  </script>
```

#### 无限循环

1.`while(true)` 来构造“无限”循环，需要使用break退出循环。（常用）

2.`for(;;)` 也可以来构造“无限”循环，同样需要使用break退出循环。

```js
// 无限循环  
// 需求： 页面会一直弹窗询问你爱我吗？
// (1). 如果用户输入的是 '爱'，则退出弹窗
// (2). 否则一直弹窗询问

// 1. while(true) 无限循环
// while (true) {
//   let love = prompt('你爱我吗?')
//   if (love === '爱') {
//     break
//   }
// }

// 2. for(;;) 无限循环
for (; ;) {
  let love = prompt('你爱我吗?')
  if (love === '爱') {
    break
  }
}
```

## 综合案例-ATM存取款机

![1671018781557](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20230211/1671018781557.1zhv5s7bawow.jpg)

分析：

①：提示输入框写到循环里面（无限循环）

②：用户输入4则退出循环 break

③：提前准备一个金额预先存储一个数额 money

④：根据输入不同的值，做不同的操作

​     (1)  取钱则是减法操作， 存钱则是加法操作，查看余额则是直接显示金额

​     (2) 可以使用 if else if 多分支 来执行不同的操作

完整代码：

```js
  <script>
    // 1. 开始循环 输入框写到 循环里面
    // 3. 准备一个总的金额
    let money = 100
    while (true) {
      let re = +prompt(`
        请您选择操作：
        1.存钱
        2.取钱
        3.查看余额
        4.退出
        `)
      // 2. 如果用户输入的 4 则退出循环， break  写到if 里面，没有写到switch里面， 因为4需要break退出循环
      if (re === 4) {
        break
      }
      // 4. 根据输入做操作
      switch (re) {
        case 1:
          // 存钱
          let cun = +prompt('请输入存款金额')
          money = money + cun
          break
        case 2:
          // 存钱
          let qu = +prompt('请输入取款金额')
          money = money - qu
          break
        case 3:
          // 存钱
          alert(`您的银行卡余额是${money}`)
          break
      }
    }
  </script>
```

