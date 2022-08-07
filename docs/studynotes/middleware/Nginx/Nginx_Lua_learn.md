---
title: Nginx Lua学习
date: 2022-08-06 23:18:30
permalink: /middleware/Nginx/Nginx_Lua_learn
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx Lua学习

[[toc]]

## 概念

Nginx 是可扩展的，可用于处理各种使用场景。本内容中，我们一起学习使用 Lua 扩展 Nginx 的功能。

Lua 是一种轻量、小巧的脚本语言，用标准 C 语言编写并以源代码形式开发。设计的目的是为了嵌入到其他应用程序中，从而为应用程序提供灵活的扩展和定制功能。

## 特性

跟其他语言进行比较，Lua 有其自身的特点：

- 轻量级

  Lua 用标准 C 语言编写并以源代码形式开发，编译后仅仅一百余千字节，可以很方便的嵌入到其他程序中。

- 可扩展

  Lua 提供非常丰富易于使用的扩展接口和机制，由宿主语言（通常是 C 或 C++）提供功能，Lua 可以使用它们，就像内置的功能一样。

- 支持面向过程编程和函数式编程

## 应用场景

Lua 在不同的系统中得到大量应用，场景的应用场景如下:

游戏开发、独立应用脚本、Web 应用脚本、扩展和数据库插件、系统安全上。

## Lua的安装

在 Linux 上安装 Lua 非常简单，只需要下载源码包并在终端解压、编译即可使用。

Lua 的官网地址为：[https://www.lua.org](https://www.lua.org/)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.4tduh26e2b20.webp)

点击 download 可以找到对应版本的下载地址，我这里使用最新版 lua-5.4.4，其对应的资源链接地址为 `https://www.lua.org/ftp/lua-5.4.4.tar.gz`，也可以在 Linux 使用 wget 命令直接下载

```sh
wget https://www.lua.org/ftp/lua-5.4.4.tar.gz
```

+ 我这里下载在 `/opt/lua`

```sh
mkdir /opt/lua
cd /opt/lua
wget https://www.lua.org/ftp/lua-5.4.4.tar.gz
```

+ 解压

```sh
tar -zxvf lua-5.4.4.tar.gz
```

+ 检测是否满足 Lua 需要的环境

```sh
cd /opt/lua/lua-5.4.4
make linux test
```

如果在执行 `make linux test` 失败，报如下错误(如果没有,则编译安装):

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220806/image.3h3rcto261s0.webp)

说明当前系统缺少 libreadline-dev 依赖包，需要通过命令来进行安装：

```sh
yum install -y readline-devel
```

+ 编译安装

```sh
make install
```

+ 验证是否安装成功

```sh
[root@master lua-5.4.4]# lua -v
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
```

## 第一个Lua程序

Lua 和 C/C++ 语法非常相似，整体上比较清晰，简洁。条件语句、循环语句、函数调用都与 C/C++ 基本一致。如果对 C/C++ 不太熟悉，也没关系，因为天下语言是一家，基本上理解起来都不会太困难。下面一点一点进行讲解。

大家需要知道的是，Lua 有两种交互方式，分别是：交互式和脚本式，这两者的区别，下面我们分别来讲解下：

### 交互式

交互式是指可以在命令行输入程序，然后回车就可以看到运行的效果。

Lua 交互式编程模式可以通过命令 `lua -i` 或 `lua` 来启用：

```lua
lua -i
// 或者
lua
```

```lua
[root@master lua-5.4.4]# lua
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
>
```

在命令行中输入如下命令，并按回车，会有输出在控制台：

```lua
print("Hello world")
```

```lua
> print("HelloWorld")
HelloWorld
```

CTRL + C 交互式终端。

### 脚本式

脚本式是将代码保存到一个以 lua 为扩展名的文件中并执行的方式。

方式一：

我们需要一个文件名为 hello.lua，在文件中添加要执行的代码，然后通过命令 `lua hello.lua` 来执行，会在控制台输出对应的结果。

创建 hello.lua 文件

```sh
mkdir lua_demo
cd lua_demo
vim hello.lua
```

hello.lua 文件内容

```lua
print("HelloWorld")
```

执行 hello.lua 文件：

```lua
lua hello.lua
```

```sh
[root@master lua_demo]# lua hello.lua
HelloWorld
```

**不想每次都是用 lua hello.lua 来执行该文件，可不可以直接执行 hello.lua 文件？**

方式二：

将 hello.lua 做如下修改

```lua
#!/usr/local/bin/lua
print("Hello World!!!")
```

第一行用来指定 Lua 解释器命令所在位置为 `/usr/local/bin/lua`，加上 # 号标记，解释器会忽略它。一般情况下 #! 就是用来指定用哪个程序来运行本文件。

但是 hello.lua 并不是一个可执行文件，需要通过 chmod 来设置可执行权限，最简单的方式为：

```sh
chmod 755 hello.lua
```

然后执行该文件

```sh
./hello.lua
```

```sh
[root@master lua_demo]# ./hello.lua
Hello World!!!
```

补充一点，如果想在交互式中运行脚本式的 hello.lua 中的内容，我们可以使用一个 dofile 函数，如：

```lua
dofile("lua_demo/hello.lua")
```

```lua
[root@master lua_demo]# lua
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
> dofile("hello.lua")
Hello World!!!
```

::: warning

在 Lua 语言中，连续语句之间的分隔符并不是必须的，也就是说后面不需要加分号，当然加上也不会报错。

:::

在 Lua 语言中，表达式之间的换行也起不到任何作用。如以下四个写法，其实都是等效的

```sh
# 写法一：换行，不加分号
a=1
b=a+2

# 写法二：换行，加分号
a=1;
b=a+2;

# 写法三：不换行，加分号
a=1; b=a+2;

# 写法四：不换行，不加分号
a=1 b=a+2
```

不建议使用第四种方式，可读性太差。

## Lua的注释

关于 Lua 文件的注释要分两种，第一种是单行注释，第二种是多行注释。

单行注释的语法为：

```lua
-- 注释内容
```

多行注释的语法为:

```lua
--[[
	注释内容
	注释内容
--]]
```

```lua
#!/usr/local/bin/lua
print("Hello World!!!")
-- print("HelloWorld")
--[[
print("HelloWorld2")
--]]
```

如果想取消多行注释，只需要在第一个--之前在加一个-即可，如：

```lua
---[[
	注释内容
	注释内容
--]]
```

## Lua标识符

换句话说标识符就是我们的变量名，Lua 定义变量名以一个字母 A 到 Z 或 a 到 z 或下划线 _ 开头后加上 0 个或多个字母，下划线，数字（0 到 9）。这块建议大家最好不要使用下划线加大写字母的标识符，如 _VERSION，因为 Lua 的保留字也是这样定义的，容易发生冲突。注意 Lua 是区分大小写字母的。

## Lua关键字

下列是 Lua 的关键字，大家在定义常量、变量或其他用户自定义标识符都要避免使用以下这些关键字：

|          |       |       |        |
| -------- | ----- | ----- | ------ |
| and      | break | do    | else   |
| elseif   | end   | false | for    |
| function | if    | in    | local  |
| nil      | not   | or    | repeat |
| return   | then  | true  | until  |
| while    | goto  |       |        |

一般约定，以下划线开头连接一串大写字母的名字（比如 _VERSION）被保留用于 Lua 内部全局变量。这个也是上面我们不建议这么定义标识符的原因。

## Lua运算符

Lua中支持的运算符有算术运算符、关系运算符、逻辑运算符、其他运算符。

### 算术运算符

| 符号 | 作用 | 例子            |
| ---- | ---- | --------------- |
| +    | 加法 | 10 + 20 --> 30  |
| -    | 减法 | 20 - 10 --> 10  |
| *    | 乘法 | 10 * 20 --> 200 |
| /    | 除法 | 20 / 10 --> 2   |
| %    | 取余 | 3 % 2 --> 1     |
| ^    | 乘幂 | 10 ^ 2 --> 100  |
| -    | 符号 | -10 --> -10     |

### 关系运算符

| 符号 | 作用     | 例子               |
| ---- | -------- | ------------------ |
| ==   | 等于     | 10 == 10 --> true  |
| ~=   | 不等于   | 10 ~= 10 --> false |
| >    | 大于     | 20 > 10 --> true   |
| <    | 小于     | 20 < 10 --> false  |
| >=   | 大于等于 | 20 >= 10 --> true  |
| <=   | 小于等于 | 20 <= 10 --> false |

### 逻辑运算符

| 符号 | 作用   | 例子                                        |
| ---- | ------ | ------------------------------------------- |
| and  | 逻辑与 | A and B（等价于 Java 的 a && b）            |
| or   | 逻辑或 | A or B（等价于 Java 的 a \|\| b）           |
| not  | 逻辑非 | not A（取反，如果 A 为 true，则返回 false） |

逻辑运算符可以作为 if 的判断条件，返回的结果如下:

```lua
A = true
B = true

A and B	    --> true
A or  B     --> true
not A 	    --> false

A = true
B = false

A and B	   --> false
A or  B    --> true
not A 	   --> false

A = false
B = true

A and B	   --> false
A or  B    --> true
not A 	   --> true
```

### 其他运算符

| 符号 | 作用                             | 例子                              |
| ---- | -------------------------------- | --------------------------------- |
| ..   | 连接两个字符串                   | "HELLO ".."WORLD" --> HELLO WORLD |
| #    | 一元预算法，返回字符串或表的长度 | #"HELLO" --> 5                    |

```lua
[root@master lua_demo]# lua
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
> "Hello".."World"
HelloWorld
> #"HelloWorld"
10
```

## Lua全局变量&局部变量

在 Lua 语言中，全局变量无须声明即可使用。在默认情况下，变量总是认为是全局的，如果未提前赋值，默认为 nil:

```lua
[root@master lua_demo]# lua
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
> print(b)
nil
> b=100
> print(b)
100
> b=nil
> print(b)
nil
```

要想声明一个局部变量，需要使用 local 来声明

```lua
[root@master lua_demo]# lua
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
> local a=100
> print(a)
nil
> local a=100 print(a)
100
```

如上所示，终端交互式的 local 声明的变量在同一行使用，换行了则离开了该变量的作用域。如果使用了 function 之类的结构或者在文件里使用 local，则可以换行，具体往下看。

## Lua数据类型

Lua 有 8 个数据类型

| 数据类型名 | 作用                |
| ---------- | ------------------- |
| nil        | 空，无效值          |
| boolean    | 布尔，true \| false |
| number     | 数值                |
| string     | 字符串              |
| function   | 函数                |
| table      | 表                  |
| thread     | 线程                |
| userdata   | 用户数据            |

可以使用 type 函数测试给定变量或者的类型：

```lua
print(type(nil))				--> nil
print(type(true))               --> boolean
print(type(1.1*1.1))            --> number
print(type("Hello world"))      --> string
print(type(io.stdin))			--> userdata
print(type(print))              --> function
print(type(type))               --> function
print(type{})					--> table
print(type(type(X)))            --> string
```

### nil

nil 是一种只有一个 nil 值的类型，它的作用可以用来与其他所有值进行区分。当想要移除一个变量时，只需要将该变量名赋值为 nil，垃圾回收就会会释放该变量所占用的内存。

### boolean

boolean 类型具有两个值，true 和 false。boolean 类型一般被用来做条件判断的真与假。在 Lua 语言中，只会将 false 和 nil 视为假，其他的都视为真，**特别是在条件检测中 0 和空字符串都会认为是真**，这个和我们熟悉的大多数语言不太一样。

### number

在 Lua5.3 版本开始，Lua 语言为数值格式提供了两种选择 integer（整型）和 float（双精度浮点型），和其他语言不太一样，float 不代表单精度类型。

数值常量的表示方式：

```lua
4			--> 4
0.4		--> 0.4
4.75e-3	--> 0.00475
4.75e3		--> 4750.0
```

```lua
[root@master lua_demo]# lua
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
> 4
4
> 0.4
0.4
> 4.75e-3
0.00475
> 4.75e3
4750.0
```

不管是整型还是双精度浮点型，使用 type() 函数来取其类型，都会返回的是 number

```lua
type(3)	--> number
type(3.3)	--> number
```

```lua
[root@master lua_demo]# lua
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
> type(3)
number
> type(3.3)
number
```

所以它们之间是可以相互转换的，同时，具有相同算术值的整型值和浮点型值在 Lua 语言中是相等的

### string

Lua 语言中的字符串即可以表示单个字符，也可以表示一整本书籍。在 Lua 语言中，操作 100K 或者 1M 个字母组成的字符串的程序很常见。

可以使用单引号或双引号来声明字符串

```lua
a = "hello"
b = 'world'
print(a)	--> hello
print(b) 	--> world
```

```lua
[root@master lua_demo]# lua
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
> a = "Hello"
> b = "World"
> print(a)
Hello
> print(b)
World
```

如果声明的字符串比较长或者有多行，则可以使用如下方式进行声明

```lua
html = [[
<html>
<head>
<title>Lua-string</title>
</head>
<body>
<a href="http://www.lua.org">Lua</a>
</body>
</html>
]]
```

### table

table 是 Lua 语言中最主要和强大的数据结构。使用 table 表时，Lua 语言可以以一种简单、统一且高效的方式表示数组、集合、记录和其他很多数据结构。Lua 语言中的表本质上是一种辅助数组。这种数组比 Java 中的数组更加灵活，可以使用数值做索引，也可以使用字符串或其他任意类型的值作索引（除 nil 外）。

创建表的最简单方式：

```lua
a = {}
```

**创建数组方式一**

我们都知道数组就是相同数据类型的元素按照一定顺序排列的集合，那么使用 table 如何创建一个数组呢？

```lua
arr = {"TOM","JERRY","ROSE"}
```

要想获取数组中的值，我们可以通过如下内容来获取：

```lua
print(arr[0])		-- nil
print(arr[1])		-- TOM
print(arr[2])		-- JERRY
print(arr[3])		-- ROSE
```

从上面的结果可以看出来，**数组的下标默认是从 1 开始的**。

**创建数组方式二**

上述创建数组，也可以通过如下方式来创建：

```lua
arr = {}
arr[1] = "TOM"
arr[2] = "JERRY"
arr[3] = "ROSE"
```

**创建数组方式三**

表的索引即可以是数字，也可以是字符串等其他的内容，所以也可以将索引更改为字符串来创建：

```lua
arr = {}
arr["X"] = 10
arr["Y"] = 20
arr["Z"] = 30
```

当然，如果想要获取这些数组中的值，可以使用下面的方式

```lua
-- 方式一
print(arr["X"])
print(arr["Y"])
print(arr["Z"])

-- 方式二
print(arr.X)
print(arr.Y)
print(arr.Z)
```

**创建数组方式四**

当前 table 的灵活不仅于此，还有更灵活的声明方式：

```lua
arr = {"TOM",X=10,"JERRY",Y=20,"ROSE",Z=30}
```

如何获取上面的值？

```lua
arr[1]       -- TOM
arr["X"]	 -- 10
arr.X   	 -- 10
arr[2]		 -- JERRY
arr["Y"]	 -- 20
arr.Y		 --20
arr[3]		 -- ROSE
```

```lua
[root@master lua_demo]# lua
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
> arr = {"TOM",X=10,"JERRY",Y=20,"ROSE",Z=30}
> arr[0]
nil
> arr[1]
TOM
> arr[2]
JERRY
> arr[3]
ROSE
> arr["X"]
10
> arr["Y"]
20
> arr["Z"]
30
```

###  function

在 Lua 语言中，函数（Function）是对语句和表达式进行抽象的主要方式。

定义函数的语法为：

```lua
function functionName(params)

end
```

函数被调用的时候，传入的参数个数与定义函数时使用的参数个数不一致的时候，Lua 语言会通过抛弃多余参数和将不足的参数设为 nil 的方式来调整参数的个数。

```lua
-- 函数
function  f(a,b)
    print(a,b)
end

-- 调用函数
f()			--> nil  nil
f(2)		--> 2 nil
f(2,6)		--> 2 6
f(2.6.8)	--> 2 6 (8 被丢弃)
```

可变长参数函数

```lua
-- 函数
function add(...)
    a,b,c=...    -- 按顺序令 a,b,c 等于多个参数的前三个
    print(a)
    print(b)
    print(c)
end

-- 调用函数
add(1,2,3)  --> 1 2 3
```

```lua
[root@master lua_demo]# lua
Lua 5.4.4  Copyright (C) 1994-2022 Lua.org, PUC-Rio
> function f(a,b)
>> return a,b
>> end
> x,y = f(11,12)
> print(x,y)
11      12
> function add(...)
>> a,b,c=...
>> print(a)
>> print(b)
>> print(c)
>> end
> add(1,2,3)
1
2
3
```

函数返回值可以有多个，这点和 Java 不太一样

```lua
-- 函数
function f(a,b)
    return a,b
end

-- 调用函数
x,y = f(11,22)	--> x=11,y=22	
```

### thread

thread 翻译过来是线程的意思，在 Lua 中，thread 用来表示执行的独立线路，用来执行协同程序。

### userdata

userdata 是一种用户自定义数据，用于表示一种由应用程序或 C/C++ 语言库所创建的类型。

## Lua控制结构

Lua 语言提供了一组精简且常用的控制结构，包括用于条件执行的证 以及用于循环的 while、repeat 和 for。所有的控制结构语法上都有一个显式的终结符：end 用于终结 if、for 及 while 结构，until 用于终结 repeat 结构。

### if判断

if 语句先测试其条件，并根据条件是否满足执行相应的 then 部分或 else 部分。else 部分是可选的。

```lua
function testif(a)
    if a > 0 then
        print("a是正数")
    end
end

function testif(a)
    if a > 0 then
        print("a是正数")
    else
        print("a是负数")
    end
end
```

如果要编写嵌套的 if 语句，可以使用 elseif。 它类似于在 else 后面紧跟一个if。根据传入的年龄返回不同的结果，如

```lua
function show(age)
    if age<=18 then
        return "青少年"
    elseif age>18 and age<=45 then
        return "青年"
    elseif age>45 and age<=60 then
        return "中年人"
    elseif age>60 then
        return "老年人"
    end
end
```

```lua
> function show(age)
>>      if age<=18 then
>>              return "青少年"
>>      elseif age>18 and age<=45 then
>>              return "青年"
>>      elseif age>45 and age<=60 then
>>              return "中年人"
>>      elseif age>60 then
>>              return "老年人"
>>      end
>> end
> show(59)
中年人
```

### while循环

顾名思义，当条件为真时 while 循环会重复执行其循环体。Lua 语言先测试 while 语句的条件，若条件为假则循环结束；否则，Lua 会执行循环体并不断地重复这个过程。

语法：

```lua
while 条件 do
	循环体
end
```

例子：实现数组的循环

```lua
function testWhile()
    local i = 1
    while i <= 10 do
        print(i)
        i = i + 1
    end
end
```

```lua
> function testwhile()
>>      local i=1
>>      while i<=10 do
>>              print(i)
>>              i=i+1
>>      end
>> end
> testwhile()
1
2
3
4
5
6
7
8
9
10
```

### repeat循环

顾名思义， repeat-until 语句会重复执行其循环体直到条件为真时结束。由于条件测试在循环体之后执行，所以循环体至少会执行一次。

语法：

```lua
repeat
	循环体
until 条件
```

例子：

```lua
function testRepeat()
    local i = 10
    repeat
        print(i)
        i = i - 1
    until i < 1
end
```

```lua
> function testRepeat()
>>      local i=10
>>      repeat
>>              print(i)
>>              i=i-1
>>      until i<1
>> end
> testRepeat(10)
10
9
8
7
6
5
4
3
2
1
```

### for循环

**数值型 for 循环**

语法:

```lua
for param = exp1,exp2,exp3 do
	循环体
end
```

param 的值从 exp1 变化到 exp2 之前的每次循环会执行循环体，并在每次循环结束后将步长（step）exp3 赋值给到 param 上。exp3 可选，如果不设置默认为 1。

```lua
for i = 1,100,10 do
    print(i)
end
```

```lua
> for i=1,100,10 do
>>      print(i)
>> end
1
11
21
31
41
51
61
71
81
91
```

**泛型 for 循环**

泛型 for 循环通过一个迭代器函数来遍历所有值，类似于 Java 中的 foreach 语句。

语法：

```lua
for i,v in ipairs(x) do
	循环体
end
```

i 是数组索引值，v 是对应索引的数组元素值，ipairs 是 Lua 提供的一个迭代器函数，用来迭代数组，x 是要遍历的数组。

例如：

```lua
arr = {"TOME","JERRY","ROWS","LUCY"}

for i,v in ipairs(arr) do
    print(i,v)
end
```

```lua
> arr ={"TOM","JERRY","ROWS","LUCY"}
> for i,v in ipairs(arr) do
>>      print(i,v)
>> end
1       TOM
2       JERRY
3       ROWS
4       LUCY
```

但是如果将 arr 的值进行修改为：

```lua
arr = {"TOME","JERRY","ROWS",x="JACK","LUCY"}
```

同样的代码在执行的时候，就只能看到和之前一样的结果，而其中的 x 为 JACK 就无法遍历出来，缺失了数据，如果解决呢？

我们可以将迭代器函数由 `ipairs` 变成 `pairs`，如

```lua
> arr = {"TOM","JERRY","ROWS",x="JACK","LUCY"}
> for i,v in pairs(arr) do
>>      print(i,v)
>> end
1       TOM
2       JERRY
3       ROWS
4       LUCY
x       JACK
```

这只是简单的 Lua 学习，完整、系统的学习后面我会更新。

