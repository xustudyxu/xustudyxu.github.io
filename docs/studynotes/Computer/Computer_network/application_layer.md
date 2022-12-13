---
title: 计算机网络-应用层
date: 2022-12-13 22:38:44
permalink: /Computer/Computer_network/application_layer
categories:
  - 计算机网络
tags:
  - 计算机网络
---
# 计算机网络-应用层

[[toc]]

## 应用层概述

### 应用层简介

+ `应用层`是**计算机网络体系结构**的`最顶层`，是`设计和建立计算机网络`的**最终目的**，也是**计算机网络中发展最快的部分。**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.4nuumpggzvo0.webp)

- 早期基于文本的应用(电子邮件、远程登录、文件传输、新闻组)
- **20世纪90年代**将因特网带入干家万户的`万维网www`
- 当今流行的即时通信、P2P文件共享及各种音视频应用
- 计算设备的小型化和“无处不在”，宽带住宅接入和无线接入的日益普及和迅速发展，为未来更多的新型应用提供了广阔的舞台。

### 本章应用层学习内容

+ 在本章中，我们以一些经典的网络应用为例来学习`有关网络应用`的**原理、协议和实现方面的知识**。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.2d1r61k8rrtw.webp)

- 万维网WWW
- 域名系统DNS
- 动态主机配置协议DHCP
- 电子邮件
- 文件传送协议FTP
- P2P文件共享
- 多媒体应用

## 客户/服务器方式和对等方式

+ 网络应用程序运行在处于网络边缘的不同的端系统上，通过彼此间的通信来共同完成某项任务。开发一种新的网络应用`首先要考虑的问题`就是**网络应用程序在各种端系统上的组织方式和它们之间的关系**。**目前流行的主要有以下两种：**

### 客户/服务器方式（C/S方式）

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.5ojqu4ofg6o0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.3bkgvn4zv4q0.webp)



### 对等方式（P2P方式）

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.5noc2qwqwc40.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.37n2om7k3l80.webp)

## 动态主机配置协议DHCP

### 走进DHCP

+ `动态主机配置协议DHCP`(Dynamic Host Configuration Protocol)提供了一种机制，称为**即插即用连网**。`这种机制`**允许一台计算机加入新网络时可自动获取IP地址等网络配置信息而不用手工参与。**

  + `1️⃣DHCP的作用`

  ![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.1ezoif9ovtz4.webp)

  + `2️⃣DHCP的工作过程`

  ![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.8ggtfiprb2o.webp)

  ![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.6dxvvbw5vi80.webp)

  ​	![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.o68or3x0j34.webp)

  ​	![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.1c97t2p1f4cg.webp)

  ​	![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.o0tq8lhr5io.webp)

  + `3️⃣DHCP中继代理`

  ![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.7alcjqsa67w0.webp)

  ![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.5vv1dj3lvnc0.webp)

### 知识拓展

 **DHCP主要使用以下报文来实现其功能：**

- DHCP **DISCOVER**：DHCP`发现`报文
- DHCP **REQUEST**：DHCP`请求`报文
- DHCP **NACK**：DHCP`否认`报文
- DHCP **OFFER**：DHCP`提供`报文
- DHCP **ACK**：DHCP`确认`报文
- DHCP **RELEASE**：DHCP`释放`报文

**DHCP报文**在运输层使用`UDP协议`**封装**

+ DHCP客户使用的UDP端口号为68
+ DHCP服务器使用的UDP端口号为67

**DHCP客户**在未**获取到IP地址**时使用地址**0.0.0.0**

在每一个网络上都设置一个DHCP服务器会使DHCP服务器的数量太多。因此现在是**使每一个网络至少有一个DHCP中继代理**(通常是一台路由器)，它配置了DHCP服务器的IP地址信息，作为各网络中`计算机与DHCP服务器的桥梁`。

## 域名系统DNS

### DNS简介

+ `域名系统DNS`是**因特网使用的命名系统**，用来把便于**人们记忆的具有特定含义的主机名(例如www.abc.com)**，转换为便于机器处理的**IP地址**。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.1wpj3sfwhcbk.webp)

+  **因特网**采用`层次树状结构`的**域名结构**

### 域名以及域名服务器分类

`1️⃣域名分类`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.6ewcilp4f5s0.webp)

+  **顶级域名TLD**(Top Level Domain)**分为以下三类：**
  - 国家顶级域名nTLD
  - 通用顶级域名gTLD
  - 反向域arpa

**域名和IP地址的映射关系**必须保存在**域名服务器**中，供所有其他应用查询。显然不能将所有信息都储存在一台域名服务器中。DNS使用分布在各地的域名服务器来实现域名到IP地址的转换。

`2️⃣域名服务器分类`

+ **域名服务器**可以划分为**以下四种不同的类型：**
  + 根域名服务器
  + 顶级域名服务器
  + 权限域名服务器
  + 本地域名服务器

### 域名查询方式

+ **域名解析**的过程使用**两种**域名查询方式：

`1️⃣递归查询`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.26xakpkgfxwk.webp)

`2️⃣迭代查询`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.22vgv9hrcuqo.webp)

为了提高DNS的查询效率，并减轻根域名服务器的负荷和减少因特网上的DNS查询报文数量，在**域名服务器和主机**中广泛地使用了`高速缓存`。

+ **DNS报文**使用运输层的`UDP协议`进行封装，**运输层端口号为53**。

## 文件传送协议FTP

### FTP是什么？

将某台计算机中的文件通过网络传送到可能相距很远的另一台计算机中，是一项基本的网络应用，即**文件传送**。

+ `文件传送协议FTP`(File Transfer Protocol)是因特网上**使用得最广泛的文件传送协议**。
  + FTP提供·交互式的访问·，允许客户指明文件的类型与格式(如指明是否使用ASCII码)，并·允许文件具有存取权限·(如访问文件的用户必须经过授权,并输入有效的口令)。
  + FTP屏蔽了`各计算机系统的细节`，因而**适合于在异构网络中任意计算机之间传送文件**。

在因特网发展的早期阶段，用FTP传送文件约占整个因特网的通信量的三分之一，而由电子邮件和域名系统所产生的通信量还要小于FTP所产生的通信量。只是到了1995年，万维网WWW的通信量才首次超过了FTP。

## FTP和服务器之前的连接

**FTP客户和服务器之间**要建立以下两个并行的`TCP连接`：

- **控制连接**，在整个会话期间一直保持打开，`用于传送FTP相关控制命令`。
- **数据连接**，`用于文件传输`，在每次文件传输时才建立，传输结束就关闭。默认情况下，FTP使用TCP 21端口进行控制连接，TCP 20端口进行数据连接。

但是，是否使用TCP 20端口建立数据连接与传输模式有关，主动方式使用TCP 20端口被动方式由服务器和客户端自行协商决定。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.340486kfyhe0.webp)

## 电子邮件

### 熟悉又陌生的电子邮件？

**电子邮件系统**采用`客户/服务器`方式。三个主要组成构件：用户代理，邮件服务器，以及电子邮件所需的协议。

- `用户代理`是**用户与电子邮件系统的接口**，又称为电子邮件客户端软件。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.uc6g85vdjio.webp)

+ `邮件服务器`是**电子邮件系统的基础设施**。因特网上所有的ISP都有邮件服务器，其**功能是**`发送和接收邮件`，同时还要负责维护用户的邮箱。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.b55pt8tb5kw.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.2udfbnvbjhg0.webp)

+ `协议`包括**邮件发送协议**(例如`SMTP`)和**邮件读取协议**(例如`POP3`)。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.61hrx6irm6o0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.58onjwivojs0.webp)

### 常用的邮件协议

+ `常用的邮件发送协议`是**简单邮件传送协议SMTP**
  - **基于TCP连接，端口号为25；**
  - 只能传送`ASCII码文本`
  - **用于用户代理向邮件服务器发送邮件以及邮件服务器之间的邮件发送**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.1bgnud39hp7k.webp)

+ **为解决SMTP传送非ASCII码文本的问题**，**提出了**多用途因特网邮件扩展`MIME`。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.3iigvs4j8gi0.webp)

+ **常用的邮件读取协议有以下两个：**
  - `邮局协议POP3`：**非常简单、功能有限的邮件读取协议**。用户只能以下载并删除方式或下载并保留方式从邮件服务器下载邮件到用户方计算机。不允许用户在邮件服务器上管理自己的邮件。
  - `因特网邮件访问协议IMAP`：**功能比POP3强大的邮件读取协议**。用户在自己的计算机上就可以操控邮件服务器中的邮箱，就像在本地操控一样，因此IMAP是一个联机协议。
  - `POP3和IMAP4`都采用基于**TCP连接的客户/服务器方式**。POP3使用端口110，IMAP4使用端口143。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.6dmrbh2bczo0.webp)

### 基于万维网的电子邮件

+ 通过浏览器登录(提供用户名和口令)邮件服务器万维网网站就可以撰写、收发、阅读和管理电子邮件。这种工作模式与IMAP很类似,不同的是用户计算机无需安装专门的用户代理程序,只需要使用通用的万维网浏览器。
+ 这种工作模式在**用户浏览器与邮件服务器网站之间**使用`HTTP协议`，而**邮件服务器之间**使用`SMTP协议`。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.4qzvy8nvavc0.webp)

## 万维网WWW

### WWW是什么？

+ `万维网WWW` (Worid Wide Web)是**一个大规模的、联机式的信息储藏所，是运行在因特网上的一个分布式应用。**
+  **万维网**利用`网页之间的超链接`将不同网站的网页链接成一张逻辑上的信息网。

**万维网**是欧洲粒子物理实验室的**Tim Berners-Lee**最初于1989年3月提出的。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.4en3zg77vws.webp)

**浏览器**最重要的部分是渲染引擎，也就是**浏览器内核，负责对网页内容进行解析和显示。**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.32bgotmwxiu0.webp)

+ `万维网`使用**统一资源定位符URL**来指明因特网上任何种类“资源”的**位置**。**其一般形式为:<协议>://<主机>:<端口>/<路径>**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.2suz3oxy5p20.webp)

### 万维网文档

1️⃣ `超文本标记语言HTML`，使用**多种“标签”来描述网页的结构和内容**。(网页扩展名为.htm)

2️⃣ `层叠样式表CSS`，**从审美角度来描述网页的样式**。(文件扩展名为.css)

3️⃣`脚本语言JavaScript` (与Java没有任何关系)，**控制网页的行为。**(文件扩展名为.js)

### HTTP

+ `超文本传输协议HTTP` (HyperText Transfer Protocol)**定义了浏览器**(即万维网客户进程)**怎样向万维网服务器请求万维网文档**，**以及万维网服务器怎样把万维网文档传送给**`浏览器`。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.1v0kxlpao9b4.webp)

+ `HTTP/1.0`采用**非持续连接方式**。每次浏览器要请求一个文件都要与服务器建立TCP连接(80端口)，当收到响应后就立即关闭连接。
  + **每请求一个文档**就要有`两倍的RTT的开销`。
  + 为了减小时延，浏览器通常会建立多个并行的TCP连接同时请求多个对象。

### HTTP报文

HTTP有两类报文：**请求报文和响应报文**。报文中的每一个字段都是一些`ASCII码串`，并且**每个字段的长度**都是`不确定的`。

`1️⃣请求报文格式`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.ni0oupr3yio.webp)

+ HTTP请求报文支持以下方法

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.4mip9qhd8sg0.webp)

`2️⃣响应报文格式`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.3jbbhbjmeoo0.webp)

### 知识拓展

+ `Cookie`提供了一种机制**使得万维网服务器能够“记住”用户**。而无需用户主动提供用户标识信息。也就是说，Cookie是一种对无状态的HTTP进行状态化的技术。
+ 使用Cookie在服务器上记录用户信息

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.2khh7v4w2qk0.webp)

+ 在万维网**加粗样式**中还可以使用`缓存机制`以提高**万维网的效率**。`万维网缓存`又称为**Web缓存**，可位于客户机，也可位于中间系统上，位于中间系统上的Web缓存又称为代理服务器。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.aea0gk75548.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.s2261236c5s.webp)

+ 原始服务器与代理服务器中的文件一致

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.7abspmxy0280.webp)

+ 原始服务器与代理服务器中的文件不一致

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221213/image.7dkdn3uqa2c0.webp)

