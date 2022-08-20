---
title: Java 概述
date: 2022-07-19 00:48:39
permalink: /pages/26a368/
categories:
  - java
tags:
  - java
---
# Java 概述

[[toc]]

## 什么是程序

程序：计算机执行某些操作或解决某个问题而**编写的一系列有序指令的集合**

举例说明:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.6c40gigbzlg0.webp)

## Java 诞生小故事

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.smfx0215pps.webp)

## Java 技术体系平台

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.18qe82ig8uow.webp)

## Java 重要特点

1. Java 语言是面向对象的(**oop**)
2. Java 语言是健壮的。Java 的强类型机制、异常处理、垃圾的自动收集等是 Java 程序健壮性的重要保证
3. Java 语言是**跨平台性的**。[即: 一个编译好的.class 文件可以在多个系统下运行，这种特性称为跨平台]

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.3wy9ddgjnhq0.webp)

4. Java 语言是解释型的[了解]

解释性语言：javascript,PHP, java 编译性语言: c / c++

区别是：解释性语言，编译后的代码，不能直接被机器执行,需要解释器来执行, 编译性语言, 编译后的代码, 可
以直接被机器执行, c /c++

## Java 的开发工具

+ idea
  + [下载地址](https://www.jetbrains.com/idea/)
+ eclipse
  + [下载地址](https://www.eclipse.org/downloads/)
+ notepad++
+ sublime
+ editplus

## Java 运行机制及运行过程

### Java 语言的特点：跨平台性

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.298ar88hqkcg.webp)

### Java 核心机制-Java 虚拟机 [JVM java virtual machine]

+ 基本介绍

1. JVM 是一个虚拟的计算机，具有指令集并使用不同的存储区域。负责执行指令，管理数据、内存、寄存器，包含在JDK 中.
2. 对于不同的平台，有不同的虚拟机。
3. Java 虚拟机机制屏蔽了底层运行平台的差别，实现了“一次编译，到处运行” [说明]

+ 示意图

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.120nz47ipm1c.webp)

## 什么是 JDK，JRE

### JDK 基本介绍

1. JDK 的全称(Java Development Kit Java 开发工具包)

   JDK = JRE + java 的开发工具 [java, javac,javadoc,javap等]

2. JDK 是提供给 Java 开发人员使用的，其中包含了 java 的开发工具，也包括了 JRE。所以安装了 JDK，就不用在单独安装 JRE 了。

### JRE 基本介绍

1. JRE(Java Runtime Environment Java 运行环境)

   JRE = JVM + Java 的核心类库[类]

2. 包括 Java 虚拟机(JVM Java Virtual Machine)和 Java 程序所需的核心类库等，如果想要运行一个开发好的 Java 程序，计算机中只需要安装 JRE 即可。、

### JDK、JRE 和 JVM 的包含关系

1. <mark>JDK = JRE + 开发工具集</mark>（例如 Javac,java 编译工具)
2. <mark>JRE = JVM + Java SE 标准类库</mark>（java 核心类库)
3. 如果只想运行开发好的 .class 文件 只需要JRE

## 下载、安装 JDK

+ [jdk下载地址](https://www.oracle.com/java/technologies/downloads/)

### 配置环境变量Path

+ 为什么要配置 path

+ 原因分析
+ 当前执行的程序在当前目录下如果不存在，win10系统会在系统中已有的一个名为path的环境变量指定的目录中查找。如果仍未找到，会出现以上的错误提示。所以进入到jdk安装路径\bin目录下,执行javac，会看到javac参数提示信息。

### 配置环境变量 path 的步骤

1. 我的电脑--属性--高级系统设置--环境变量
2. 增加`JAVA_HOME`系统环境变量,指向jdk的安装目录,例如:D:\DevelopTools\java\1.8

3. 编辑系统Path变量,增加`%JAVA_HOME%\bin`

4.  打开DOS命令行，任意目录下敲下javac/java。如果出现javac的参数信息，配置成功。

## Java 快速入门

### 需求说明

要求开发一个 Hello.java 程序，可以输出 "hello,World!"

### 开发步骤

1. 将 Java 代码编写到扩展名为 Hello.java 的文件中。[代码说明]

   ```java
   public class Hello{
       public static void main(String[] args){
           System.out.println("Hello,World!")
       }
   }
   ```

2. 通过 javac 命令对该 java 文件进行编译，生成 .class 文件。

3.  通过 java 命令对生成的 class 文件进行运行。

### 运行原理示意图

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.4gl8ci3sme80.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.1j5cgh0dvjq8.webp)

### Java 开发注意事项和细节说明

1. Java源文件以.java为扩展名。源文件的基本组成部分是类(class)，如本类中的Hello类。

2. Java应用程序的执行入口是main()方法。它有固定的书写格式:

   public static void main(String[] args){...}

3. Java语言严格区分大小写

4. Java方法由一条条语句构成，每个语句以";"结束。

5. 大括号都是成对出现的，缺一不可。[习惯，先写{}再写代码]

6. 一个源文件中最多只能有一个public类。其他类的个数不限。

7. 如果源文件包含一个public类，则文件名必须按照该类名命名。

8. 一个源文件中最多只能有一个public类。其它类的个数不限，也可以将main方法写在public类中，然后指定运行非public类，这样入口方法就是非public的main方法

## 如何快速掌握技术或知识点

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.5gb2mzwj7oo0.webp)

## Java 转义字符

### Java 常用的转义字符

在控制台，输入 tab 键，可以实现命令补全
`\t `：一个制表位，实现对齐的功能

`\n` ：换行符

`\\`：一个\

`\"` :一个"

`\'` ：一个

`\r` :一个回车 System.out.println("你好\r世界"); //韩顺平教育

## 注释(comment)

### 介绍

用于注解说明解释程序的文字就是注释，注释提高了代码的阅读性（可读性）；注释是一个程序员必须要具有的良
好编程习惯。将自己的思想通过注释先整理出来，再用代码去体现。

### Java 中的注释类型

1. 单行注释`//`

2. 多行注释` /* ...*/`

3. 文档注释`/** ...*/ `

> 1. 被注释的文字，不会被 JVM（java 虚拟机）解释执行
> 2. 多行注释里面不允许有多行注释嵌套

## Java代码规范

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.2cw545bgznwg.webp)

## DOS 命令(了解)

### DOS 介绍

Dos： Disk Operating System 磁盘操作系统, 简单说一下 windows 的目录结构。[原理图]

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.22c2k24bikbk.webp)

### 相关的知识补充: 相对路径， 绝对路径

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220718/image.3aju8sve1a00.webp)

### 常用的 dos 命令

1. 查看当前目录是有什么内容 `dir`

```sh
dir d:\abc2
```

2. 切换到其他盘下：盘符号 cd : change directory

```sh
cd /D c:
```

3. 切换到当前盘的其他目录下 (使用相对路径和绝对路径演示), ..\表示上一级目录

```sh
cd d:\abc2\test200 cd ..\..\abc2\test200
```

4. 切换到上一级

```sh
cd ..
```

5. 切换到根目录:cd \

```sh
cd \
```

6. 查看指定的目录下所有的子级目录`tree`
7. 清屏`cls`
8. 退出 DOS `exit`
9. 打开画图工具`mspaint`(没事画)
10. 记事本`notepad`
11. 计算器`calc`

```sh
cmd指令大全指令
一、启动CMD命令提示符控制器
“开始”→“运行”→输入“cmd”回车;或者：win+R(两个键同时按)打开“运行”窗口→输入“cmd”回车。
二、小编常用的CMD命令

dir：查看文件夹

mstsc：打开远程桌面连接。

services.msc：打开本地服务设置。

notepad：打开记事本。

control：打开控制面板。

regedit：打开注册列表编辑器。

三、Windows CMD命令大全

gpedit.msc-----组策略

sndrec32-------录音机

Nslookup-------IP地址侦测器 ，是一个 监测网络中 DNS 服务器是否能正确实现域名解析的命令行工具。 它在 Windows NT/2000/XP 中均可使用 , 但在 Windows 98 中却没有集成这一个工具。

explorer-------打开资源管理器

logoff---------注销命令

shutdown-------60秒倒计时关机命令

lusrmgr.msc----本机用户和组

services.msc---本地服务设置

oobe/msoobe /a----检查XP是否激活

notepad--------打开记事本

cleanmgr-------垃圾整理

net start messenger----开始信使服务

compmgmt.msc---计算机管理

net stop messenger-----停止信使服务

conf-----------启动netmeeting

dvdplay--------DVD播放器

charmap--------启动字符映射表

diskmgmt.msc---磁盘管理实用程序

calc-----------启动计算器

dfrg.msc-------磁盘碎片整理程序
 
chkdsk.exe-----Chkdsk磁盘检查

devmgmt.msc--- 设备管理器

regsvr32 /u *.dll----停止dll文件运行

drwtsn32------ 系统医生
 
rononce -p----15秒关机

dxdiag---------检查DirectX信息
 
regedt32-------注册表编辑器

Msconfig.exe---系统配置实用程序

rsop.msc-------组策略结果集

mem.exe--------显示内存使用情况
 
regedit.exe----注册表
 
winchat--------XP自带局域网聊天 

progman--------程序管理器

winmsd---------系统信息
 
perfmon.msc----计算机性能监测程序
 
winver---------检查Windows版本

sfc /scannow-----扫描错误并复原

taskmgr-----任务管理器(2000/xp/2003
 
wmimgmt.msc----打开windows管理体系结构(WMI)
 
wupdmgr--------windows更新程序

wscript--------windows脚本宿主设置
 
write----------写字板 

wiaacmgr-------扫描仪和照相机向导 

winchat--------XP自带局域网聊天

mplayer2-------简易widnows media player

mspaint--------画图板

mstsc----------远程桌面连接

magnify--------放大镜实用程序

mmc------------打开控制台

mobsync--------同步命令
 
iexpress-------木马捆绑工具，系统自带 

fsmgmt.msc-----共享文件夹管理器 

utilman--------辅助工具管理器

dcomcnfg-------打开系统组件服务

ddeshare-------打开DDE共享设置

osk------------打开屏幕键盘

odbcad32-------ODBC数据源管理器

oobe/msoobe /a----检查XP是否激活

ntbackup-------系统备份和还原

narrator-------屏幕“讲述人”

ntmsmgr.msc----移动存储管理器

ntmsoprq.msc---移动存储管理员操作请求

netstat -an----(TC)命令检查接口

syncapp--------创建一个公文包

sysedit--------系统配置编辑器

sigverif-------文件签名验证程序

ciadv.msc------索引服务程序

shrpubw--------创建共享文件夹

secpol.msc-----本地安全策略

syskey---------系统加密，一旦加密就不能解开，保护windows xp系统的双重密码

services.msc---本地服务设置

Sndvol32-------音量控制程序

sfc.exe--------系统文件检查器

sfc /scannow---windows文件保护

ciadv.msc------索引服务程序

tourstart------xp简介(安装完成后出现的漫游xp程序)

taskmgr--------任务管理器

eventvwr-------事件查看器

eudcedit-------造字程序

compmgmt.msc---计算机管理

packager-------对象包装程序

perfmon.msc----计算机性能监测程序

charmap--------启动字符映射表

cliconfg-------SQL SERVER 客户端网络实用程序

Clipbrd--------剪贴板查看器

conf-----------启动netmeeting

certmgr.msc----证书管理实用程序

regsvr32 /u *.dll----停止dll文件运行

regsvr32 /u zipfldr.dll------取消ZIP支持

cmd.exe--------CMD命令提示符
```



