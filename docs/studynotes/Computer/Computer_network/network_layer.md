---
title: 计算机网络-网络层
date: 2022-12-08 16:49:09
permalink: /Computer/Computer_network/network_layer/
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

## 网络层提供的两种服务

### 面向连接的虚电路服务

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.5a0pd9d7vh40.webp)

+ 可靠通信由<mark>网络</mark>来保证
+ 必须建立网络层的<mark>连接-虚电路VC</mark>(Virtual Circuit)
+ 通信双方沿着已建立的虚电路发送分组
+ 目的主机的地址仅在连接建立阶段使用，之后每个分组的首部只需携带<mark>一条虚电路</mark>的编号(构成虚电路的每一段链路都有一个虚电路编号)
+ 这种通信方式如果再使用可靠传输的网络协议，就可使所发送的分组最终**正确到达**接收方(无差错按序到达、不丢失、不重复)，通信结束后，需要释放之前所建立的<mark>虚电路</mark>。

> 很多广域分组交换网都使用**面向连接**的<mark>虚电路服务</mark>。例如，曾经的X.25和逐渐过时的帧中继FR、异步传输模式ATM等。

### 无连接的数据报服务

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.1qjhsp8x1jds.webp)

+ **可靠通信**应当由<mark>用户主机</mark>来保证
+ **不需要建立网络层连接**
+ 每个分组<mark>可走不同的路径</mark>
+ 每个分组的首部**必须携带**目的主机的完整地址
+ 这种通信方式所传送的分组<mark>可能</mark>误码、丢失、重复和失序。

> 由于**网络本身不提供端到端的可靠传输服务**，这就使网络中的路由器可以做得比较简单，而且价格低廉(与电信网的交换机相比较)
> 因特网采用了这种设计思想，也就是将复杂的网络处理功能置于因特网的<mark>边缘</mark>(用户主机和其内部的运输层)，而将相对简单的尽最大努力的分组交付功能置于因特网<mark>核心</mark>。

### 虚电路服务与数据报服务的比较

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.5whzai49rx00.webp)

## IPv4地址及其应用

### IPv4地址概述

+ `IPv4地址`就是给因特网(Internet)上的每一台主机(或路由器)的每一个接口分配一个在全世界范围内是**唯一的32比特的标识符**。
+ **IPv4地址的编址方法**经历了如下<mark>三个历史阶段</mark>：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.1f3ir6liirb4.webp)

### IPv4地址表示方法

32比特的IPv4地址不方便阅读、记录以及输入等，因此**IPv4地址采用**<mark>点分十进制表示方法</mark>以方便用户使用。

`举例如图：`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.27png73j4atc.webp)

`1️⃣8位无符号二进制整数转十进制数`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.4xxvet7gkv4.webp)

`2️⃣十进制正整数转8位无符号二进制数`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.2xx4szeo8kc0.webp)

### 分类编址的IPv4地址

`1️⃣分类如图`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.3jhtfj5f5e60.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.76fhib3vxhs0.webp)

### 划分子网的IPv4地址

+ 为新增网络申请新的网络号**会带来以下弊端**:
  + 需要等待时间和花费更多的费用
  + 会增加其他路由器中路由表记录的数量
  + 浪费原有网络号中剩余的大量IP地址
  + 可以从主机号部分借用一部分比特作为`子网号`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.767eucbbyuo0.webp)

+ 32比特的子网掩码可以表明分类IP地址的**主机号**部分被借用了几个比特作为`子网号`
  + 子网掩码使用连续的比特1来对应网络号和子网号
  + 子网掩码使用连续的比特0来对应主机号
  + 将划分子网的IPv4地址与其相应的子网掩码进行逻辑与运算就可得到IPv4地址所在子网的网络地址

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221208/image.h9tecx9enw0.webp)

+ 给定一个分类的IP地址和其相应的子网掩码,就可知道`子网划分的细节`:
  + 划分出的子网数量
  + 每个子网可分配的IP地址数量
  + 每个子网的网络地址和广播地址
  + 每个子网可分配的最小和最大地址
  + 默认的子网掩码是指在未划分子网的情况下使用的子网掩码

1️⃣`A类：255.0.0.0`

2️⃣`B类：255.255.0.0`

3️⃣`C类：255.255.255.0`

### 无分类编址的IPv4地址

+ **无分类编制出现的背景**：划分子网在一定程度上缓解了因特网在发展中遇到的困难，但是数量巨大的C类网因为其地址空间太小并没有得到充分使用，而<mark>因特网的IP地址</mark>**仍在加速消耗，整个IPv4地址空间面临全部耗尽的威胁**。

+ 为此，因特网工程任务组IETF又提出了采用<mark>无分类编址</mark>的方法来解决IP地址紧张的问题，同时还专门成立IPv6工作组负责研究新版本IP以彻底解决IP地址耗尽问题。
+  **CIDR使用“斜线记法”**，或称CIDR记法。即在IPv4地址后面加上斜线“/”，在斜线后面写上<mark>网络前缀所占的比特数量</mark>。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221209/image.5v8vtf7awdk0.webp)

> CIDR消除了传统的A类、B类和C类地址，以及划分子网的概念；
>
> **CIDR可以更加有效地分配IPv4的地址空间**，并且可以在新的IPv6使用之前允许因特网的规模继续增长。

+  CIDR实际上是将**网络前缀都相同的连续的IP地址**组成一个`"CIDR地址块”`。
+ 我们只要知道**CIDR地址块中的任何一个地址**，就可以知道`该地址块的全部细节`：
  + 地址块的最小地址、最大地址、地址数量
  + 地址块聚合某类网络(A类、B类或C类)的数量
  + 地址掩码(也可继续称为子网掩码)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221209/image.5bpumo0sfgc0.webp)

### 路由聚合的方法

+ **路由聚合（构造超网）的方法**是`找共同前缀`
+ `网络前缀越长`，**地址块越小，路由越具体**；

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221209/image.4p8a2lgm1yc0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221209/image.1me0xpk34so0.webp)

若路由器查表转发分组时发现有多条路由可选，则选择网络前缀最长的那条，这称为<mark>最长前缀匹配</mark>，因为这样的路由更具体。

### IPv4地址的应用规划

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221209/image.6z1j9gfyric0.webp)

## IP 数据报的发送和转发过程

IP数据报的发送和转发过程包含以下两部分：主机发送IP数据报和路由器转发IP数据报，依次如下：

### 主机发送IP数据报

`1️⃣判断目的主机是否与自己在同一个网络`

若在同一个网络，则属于直接交付；

若不在同一个网络，则属于间接交付，传输给主机所在网络的默认网关(路由器)，由默认网关帮忙转发；

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221209/image.kues64l0pww.webp)

### 路由器转发IP数据报

`1️⃣检查IP数据报首部是否出错`

若出错，则直接丢弃该IP数据报并通告源主机；

若没有出错，则进行转发；

`2️⃣根据IP数据报的目的地址在路由表中查找匹配的条目`

若找到匹配的条目，则转发给条目中指示的下一跳；

若找不到则丢弃该IP数据报并通告源主机；

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221209/image.x6s15wv33zk.webp)

### 静态路由配置及其可能产生的路由环路问题

