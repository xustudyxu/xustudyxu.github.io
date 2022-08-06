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

