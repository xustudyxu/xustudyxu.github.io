---
title: 计算机网络-网络层
date: 2022-12-08 16:49:09
permalink: /pages/8ba384/
categories:
  - 计算机网络
tags:
  - 计算机网络
---
# 计算机网络-网络层

[[toc]]

## 网络层概述

### 走进网络层

+ **网络层的主要任务**是`实现网络互连`，进而实现**数据包在各网络之间的传输**。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.3fzdhk9z0yg.webp)

#### 实现网络层要解决的主要问题

`1️⃣网络层向运输层提供怎样的服务(“可靠传输”还是“不可靠传输”)`

![00ce2a4ae2e24bd697b3e993cb071a4a](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/00ce2a4ae2e24bd697b3e993cb071a4a.1kcv7yn0vb8g.gif)

`2️⃣网络层寻址问题`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.3nlwnzrjep40.webp)

#### 知识补充

+ 因特网(Internet)是目前全世界用户数量最多的互联网,它使用`TCP/IP`协议栈。

+ 由于TCP/IP协议栈的网络层使用网际协议IP，它是整个协议栈的核心协议，因此在TCP/IP协议栈中网络层常称为网际层。

  综上所述，我们通过学习TCP/IP协议栈的网际层来学习网络层的理论知识和实践技术。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.680ben8vh8k0.webp)

### 网络层提供的两种服务

#### 面向连接的虚电路服务

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.5a0pd9d7vh40.webp)

+ 可靠通信由<mark>网络</mark>来保证
+ 必须建立网络层的<mark>连接-虚电路VC</mark>(Virtual Circuit)
+ 通信双方沿着已建立的虚电路发送分组
+ 目的主机的地址仅在连接建立阶段使用，之后每个分组的首部只需携带<mark>一条虚电路</mark>的编号(构成虚电路的每一段链路都有一个虚电路编号)
+ 这种通信方式如果再使用可靠传输的网络协议，就可使所发送的分组最终**正确到达**接收方(无差错按序到达、不丢失、不重复)，通信结束后，需要释放之前所建立的<mark>虚电路</mark>。

> 很多广域分组交换网都使用**面向连接**的<mark>虚电路服务</mark>。例如，曾经的X.25和逐渐过时的帧中继FR、异步传输模式ATM等。

#### 无连接的数据报服务

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.1qjhsp8x1jds.webp)

+ **可靠通信**应当由<mark>用户主机</mark>来保证
+ **不需要建立网络层连接**
+ 每个分组<mark>可走不同的路径</mark>
+ 每个分组的首部**必须携带**目的主机的完整地址
+ 这种通信方式所传送的分组<mark>可能</mark>误码、丢失、重复和失序。

> 由于**网络本身不提供端到端的可靠传输服务**，这就使网络中的路由器可以做得比较简单，而且价格低廉(与电信网的交换机相比较)
> 因特网采用了这种设计思想，也就是将复杂的网络处理功能置于因特网的<mark>边缘</mark>(用户主机和其内部的运输层)，而将相对简单的尽最大努力的分组交付功能置于因特网<mark>核心</mark>。

#### 虚电路服务与数据报服务的比较

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.5whzai49rx00.webp)

### IPv4地址及其应用

#### IPv4地址概述

+ `IPv4地址`就是给因特网(Internet)上的每一台主机(或路由器)的每一个接口分配一个在全世界范围内是**唯一的32比特的标识符**。
+ **IPv4地址的编址方法**经历了如下<mark>三个历史阶段</mark>：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.1f3ir6liirb4.webp)

#### IPv4地址表示方法

32比特的IPv4地址不方便阅读、记录以及输入等，因此**IPv4地址采用**<mark>点分十进制表示方法</mark>以方便用户使用。

`举例如图：`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.27png73j4atc.webp)

`1️⃣8位无符号二进制整数转十进制数`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.4xxvet7gkv4.webp)

`2️⃣十进制正整数转8位无符号二进制数`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.2xx4szeo8kc0.webp)

#### 分类编址的IPv4地址

`1️⃣分类如图`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.3jhtfj5f5e60.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.76fhib3vxhs0.webp)

#### 划分子网的IPv4地址

