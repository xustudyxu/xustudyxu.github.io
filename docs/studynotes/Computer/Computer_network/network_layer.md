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

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.3fzdhk9z0yg.webp)

#### 实现网络层要解决的主要问题

`1️⃣网络层向运输层提供怎样的服务(“可靠传输”还是“不可靠传输”)`

![00ce2a4ae2e24bd697b3e993cb071a4a](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/00ce2a4ae2e24bd697b3e993cb071a4a.1kcv7yn0vb8g.gif)

`2️⃣网络层寻址问题`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.3nlwnzrjep40.webp)

#### 知识补充

+ 因特网(Internet)是目前全世界用户数量最多的互联网,它使用`TCP/IP`协议栈。

+ 由于TCP/IP协议栈的网络层使用网际协议IP，它是整个协议栈的核心协议，因此在TCP/IP协议栈中网络层常称为网际层。

  综上所述，我们通过学习TCP/IP协议栈的网际层来学习网络层的理论知识和实践技术。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.680ben8vh8k0.webp)

## 网络层提供的两种服务

### 面向连接的虚电路服务

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.5a0pd9d7vh40.webp)

+ 可靠通信由<mark>网络</mark>来保证
+ 必须建立网络层的<mark>连接-虚电路VC</mark>(Virtual Circuit)
+ 通信双方沿着已建立的虚电路发送分组
+ 目的主机的地址仅在连接建立阶段使用，之后每个分组的首部只需携带<mark>一条虚电路</mark>的编号(构成虚电路的每一段链路都有一个虚电路编号)
+ 这种通信方式如果再使用可靠传输的网络协议，就可使所发送的分组最终**正确到达**接收方(无差错按序到达、不丢失、不重复)，通信结束后，需要释放之前所建立的<mark>虚电路</mark>。

> 很多广域分组交换网都使用**面向连接**的<mark>虚电路服务</mark>。例如，曾经的X.25和逐渐过时的帧中继FR、异步传输模式ATM等。

### 无连接的数据报服务

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.1qjhsp8x1jds.webp)

+ **可靠通信**应当由<mark>用户主机</mark>来保证
+ **不需要建立网络层连接**
+ 每个分组<mark>可走不同的路径</mark>
+ 每个分组的首部**必须携带**目的主机的完整地址
+ 这种通信方式所传送的分组<mark>可能</mark>误码、丢失、重复和失序。

> 由于**网络本身不提供端到端的可靠传输服务**，这就使网络中的路由器可以做得比较简单，而且价格低廉(与电信网的交换机相比较)
> 因特网采用了这种设计思想，也就是将复杂的网络处理功能置于因特网的<mark>边缘</mark>(用户主机和其内部的运输层)，而将相对简单的尽最大努力的分组交付功能置于因特网<mark>核心</mark>。

### 虚电路服务与数据报服务的比较

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.5whzai49rx00.webp)

## IPv4地址及其应用

### IPv4地址概述

+ `IPv4地址`就是给因特网(Internet)上的每一台主机(或路由器)的每一个接口分配一个在全世界范围内是**唯一的32比特的标识符**。
+ **IPv4地址的编址方法**经历了如下<mark>三个历史阶段</mark>：

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.1f3ir6liirb4.webp)

### IPv4地址表示方法

32比特的IPv4地址不方便阅读、记录以及输入等，因此**IPv4地址采用**<mark>点分十进制表示方法</mark>以方便用户使用。

`举例如图：`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.27png73j4atc.webp)

`1️⃣8位无符号二进制整数转十进制数`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.4xxvet7gkv4.webp)

`2️⃣十进制正整数转8位无符号二进制数`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.2xx4szeo8kc0.webp)

### 分类编址的IPv4地址

`1️⃣分类如图`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.3jhtfj5f5e60.webp)

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.76fhib3vxhs0.webp)

### 划分子网的IPv4地址

+ 为新增网络申请新的网络号**会带来以下弊端**:
  + 需要等待时间和花费更多的费用
  + 会增加其他路由器中路由表记录的数量
  + 浪费原有网络号中剩余的大量IP地址
  + 可以从主机号部分借用一部分比特作为`子网号`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.767eucbbyuo0.webp)

+ 32比特的子网掩码可以表明分类IP地址的**主机号**部分被借用了几个比特作为`子网号`
  + 子网掩码使用连续的比特1来对应网络号和子网号
  + 子网掩码使用连续的比特0来对应主机号
  + 将划分子网的IPv4地址与其相应的子网掩码进行逻辑与运算就可得到IPv4地址所在子网的网络地址

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221208/image.h9tecx9enw0.webp)

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

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.5v8vtf7awdk0.webp)

> CIDR消除了传统的A类、B类和C类地址，以及划分子网的概念；
>
> **CIDR可以更加有效地分配IPv4的地址空间**，并且可以在新的IPv6使用之前允许因特网的规模继续增长。

+  CIDR实际上是将**网络前缀都相同的连续的IP地址**组成一个`"CIDR地址块”`。
+ 我们只要知道**CIDR地址块中的任何一个地址**，就可以知道`该地址块的全部细节`：
  + 地址块的最小地址、最大地址、地址数量
  + 地址块聚合某类网络(A类、B类或C类)的数量
  + 地址掩码(也可继续称为子网掩码)

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.5bpumo0sfgc0.webp)

### 路由聚合的方法

+ **路由聚合（构造超网）的方法**是`找共同前缀`
+ `网络前缀越长`，**地址块越小，路由越具体**；

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.4p8a2lgm1yc0.webp)

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.1me0xpk34so0.webp)

若路由器查表转发分组时发现有多条路由可选，则选择网络前缀最长的那条，这称为<mark>最长前缀匹配</mark>，因为这样的路由更具体。

### IPv4地址的应用规划

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.6z1j9gfyric0.webp)

## IP 数据报的发送和转发过程

IP数据报的发送和转发过程包含以下两部分：主机发送IP数据报和路由器转发IP数据报，依次如下：

### 主机发送IP数据报

`1️⃣判断目的主机是否与自己在同一个网络`

若在同一个网络，则属于直接交付；

若不在同一个网络，则属于间接交付，传输给主机所在网络的默认网关(路由器)，由默认网关帮忙转发；

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.kues64l0pww.webp)

### 路由器转发IP数据报

`1️⃣检查IP数据报首部是否出错`

若出错，则直接丢弃该IP数据报并通告源主机；

若没有出错，则进行转发；

`2️⃣根据IP数据报的目的地址在路由表中查找匹配的条目`

若找到匹配的条目，则转发给条目中指示的下一跳；

若找不到则丢弃该IP数据报并通告源主机；

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.x6s15wv33zk.webp)

### 静态路由配置及其可能产生的路由环路问题

#### 静态路由配置及可能产生的相关问题

+ `静态路由配置`是指**用户或网络管理员**使用`路由器的相关命令`给路由器**人工配置路由表**。
  + 这种人工配置方式**简单、开销小**。但不能及时适应网络状态(流量、拓扑等)的变化。
  + 一般只在`小规模网络`中采用。

+  使用`静态路由配置`可能出现以下**导致产生路由环路的错误**
  + 配置错误
  + 聚合了**不存在**的网络
  + 网络故障

+ **路由条目的类型**
  + 直连网络
  + 静态路由(人工配置)
  + 动态路由(路由选择协议)

+ **特殊的静态路由条目**
  + 默认路由(目的网络为0.0.0.0,地址掩码为0.0.0.0)
  + 特定主机路由(目的网络为特定主机的IP地址,地址掩码为255.255.255.255)
  + 黑洞路由(下一跳为null0)

#### 举例

`1️⃣默认路由举例`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.3w8ydxgt4cc0.webp)

`2️⃣特定主机路由举例`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.292aj7t9idz4.webp)

`3️⃣静态路由配置错误导致路由环路`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.39c0ussti0e0.webp)

`4️⃣聚合了不存在的网络而导致路由环路`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.4ya71jjrf5k0.webp)

`5️⃣网络故障而导致路由环路`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.3im7kxjx84g0.webp)

### 路由选择协议

#### 路由选择协议概述

+ 两类路由选择

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.sl5u8l9apq8.webp)

+ **因特网采用分层次的路由选择协议**

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.af2dbw18uwo.webp)

+ 常见的路由选择协议

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.3cw82688gaw0.webp)

+ 路由器的基本结构

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221209/image.510k7a6yjwk0.webp)

需要说明的是我们在之前的静态路由配置的相关课程中，并没有严格区分路由器中的路由表和转发表，这样有助于简化问题的分析。因此在后续有关路由选择协议的课程中，我们仍然不严格区分路由表和转发表，还是以路由表来表述问题。

路由选择处理机除了处理收到的路由报文外，还会周期性的给其他路由器发送自己所知道的路由信息。

路由器的各端口还应具有输入缓冲区和输出缓冲区，输入缓冲区用来暂存，新进入路由器，但还来不及处理的分组,

输出缓冲区用来暂存，已经处理完毕，但还来不及发送的分组。

需要说明的是路由器的端口一般都具有输入和输出的功能。我们图中分别给出输入端口和输出端口，目的在于更好的演示路由器的基本工作过程，使同学们更容易理解。

#### 路由信息协议RIP的基本工作原理

+ `路由信息协议RIP`(Routing Information Protocol)是内部网关协议IGP中最先得到广泛使用的协议之一，其相关标准文档为RFC 1058。
+ RIP要求自治系统AS内的每一个路由器都要维护从它自己到AS内其他每一个网络的距离记录。这是一组距离，称为`“距离向量D-V(Distance-Vector)"`。

+  **RIP使用**`跳数(Hop Count)`作为度量(Metric)来衡量**到达目的网络的距离**。
  + 路由器到直连网络的距离定义**为1**。
  + 路由器到非直连网络的距离定义为**所经过的路由器数加1**。
  + 允许一条路径**最多只能包含15个路由器**。“距离”等于16时相当于不可达。因此, `RIP只适用于小型互联网`。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.531bqld5a2g0.webp)

+  RIP认为好的路由就是“距离短”的路由，也就是`所通过路由器数量最少`的**路由**。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.3jz5as2nhyy0.webp)

+ RIP认为R1到R5的好路由是：R1->R4->R5

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.2a535av6zbok.webp)

+ RIP的基本工作过程

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.38vdstk4naw0.webp)

+ RIP的路由条目的更新规则

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.67cvrmfe6ns0.webp)

> **RIP存在“坏消息传播得慢”的问题。**

#### 开放最短路径优先OSPF的基本工作原理

+ `开放最短路径优先OSPF`(Open Shortest Path First).是为克服RIP的缺点在1989年开发出来的。
  + “开放”表明OSPF协议不是受某一家厂商控制,而是公开发表的。
  + “最短路径优先”是因为使用了Dijkstra提出的最短路径算法SPF。

+ **OSPF是基于链路状态的，而不像RIP那样是基于距离向量的。**

> **OSPF**`采用SPF算法计算路由`，从算法上保证了不会产生路由环路。
>
> **OSPF不限制网络规模，更新效率高，收敛速度快。**

##### 链路状态

链路状态是指本路由器都和哪些路由器相邻,以及相应链路的“代价” (cost)“。

- 代价”用来表示费用、距离、时延、带宽,等等。这些都由网络管理人员来决定。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.5us1o83hgwo0.webp)

+  **OSPF相邻路由器之间**通过`交互问候(Hello)`分组，建立和维护邻居关系。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.5kiiec41ehk0.webp)

##### 链路状态通告LSA

+  使用OSPF的每个路由器都会产生`链路状态通告LSA`(Link State Advertisement)。 LSA中包含以下内容:
  + 直连网络的链路状态信息
  + 邻居路由器的链路状态信息

+ LSA被封装在链路状态更新分组LSU中,采用洪泛法发送。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.3bfg3k9g0eg0.webp)

+ 使用OSPF的各路由器**基于LSDB进行最短路径优先SPF计算**，构建出各自到达其他各路由器的最短路径，即构建各自的路由表。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.3cwwvftpn0q0.webp)

##### OSPF的分组类型

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.1rrltox8mwqo.webp)

##### OSPF的基本工作过程

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.4xzd4ikehxs0.webp)

##### 邻居关系

+ OSPF在多点接入网络中路由器`邻居关系的建立`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.5dznqk6dql8.webp)

##### 区域

+ 为了使OSPF能够用于规模很大的网络，OSPF把一个自治系统再划分为若干个更小的范围，叫做`区域(Area)`。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.5gu6bdckrio0.webp)

#### 边界网关协议BGP的基本工作原理

+ 因特网采用`分层次的路由选择协议`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.6lqltkysh7k0.webp)

+ `内部网关协议IGP`(例如路由信息协议RIP或开放最短路径优先OSPF)

  + 设法使分组在一个自治系统内尽可能有效地从源网络传输到目的网络

  + 无需考虑自治系统外部其他方面的策略

    外部网关协议EGP(例如边界网关协议BGP)

  + 在不同自治系统内,度量路由的“代价” (距离,带宽,费用等)可能不同。因此,对于自治系统之间的路由选择,使用“代价”作为度量来寻找最佳路由是不行的。
    

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.2sg6ut5isz0.webp)

+ 在配置BGP时,每个自治系统的管理员要选择至少一个路由器作为该自治系统的“BGP发言人”

  **BGP**适用于`多级结构的互联网`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.383m6zg11aa0.webp)

##### BGP-4的四种报文

`1️⃣OPEN(打开)报文`

> **用来与相邻的另一个BGP发言人建立关系**，使通信初始化。

`2️⃣UPDATE(更新)报文`

> **用来通告某一路由的信息**，以及列出要撤销的多条路由。

`3️⃣KEEPALIVE(保活)报文`

> **用来周期性地证实邻站的连通性。**

`4️⃣NOTIFICATION(通知)报文`

> **用来发送检测到的差错。**

+ IP协议封装规则

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.2jxs9zp4h020.webp)

### IPv4数据报的首部格式

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.4qv9clittsi0.webp)

**1.首部长度**

> **占4比特，表示IP数据报首部的长度**。该字段的取值以`4字节`为单位。最小十进制取值为5，表示IP数据报首部只有20字节固定部分;最大十进制取值为15，表示IP数据报首部包含20字节固定部分和最大40字节可变部分。

**2.可选字段**

> **长度从1个字节到40个字节不等**。`用来支持排错、测量及安全等措施`。可选字段增加了IP数据报的功能,但这同时也使得IP数据报的首部长度成为可变的。这就增加了每一个路由器处理IP数据报的开销。实际上可选字段很少被使用。

**3.填充字段**

> **确保首部长度为4字节的整数倍**。使用`全0`进行填充。

**4.区分服务**

> **占8比特，用来获得更好的服务。**

**5.总长度**

> **占16比特**，表示`IP数据报的总长度`(首部+数据载荷)。
>
> 最大取值为十进制的65535，以字节为单位。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.ptm56r0ehn4.webp)

**6.标识**

> **占16比特**，属于同一个数据报的各分片数据报应该具有相同的标识。
>
> IP软件维持一个计数器，每产生一个数据报，计数器值加1，并将此值赋给标识字段。

**7.标志**

> **占3比特**，`各比特含义如下`：
>
> ![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.1xqgdajia7c0.webp)

**8.片偏移**

> **占13比特**，指出分片数据报的`数据载荷部分偏移`其在原数据报的位置**有多少个单位**。
>
> 片偏移以8个字节为单位。

**9.生存时间TTL**

> **占8比特**，最初`以秒为单位`，**最大生存周期**为`255秒`；

**10.协议**

> **占8比特**，指明IPv4数据报的数据部分是`何种协议数据单元`。
>
> 常用的一些协议和相应的协议字段值如下。
>
> ![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.3rs9fh0g6xm0.webp)

**11.首部检验和**

> **占16比特**，用来`检测首部`在传输过程中是否出现差错。比CRC检验码简单，称为**因特网检验和**。

**12.源IP地址和目的IP地址**

> **各占32比特**，用来填写发送该IP数据报的源主机的IP地址和接收该IP数据报的目的主机的IP地址。

### 网际控制报文协议ICMP

#### 走进ICMP

+ `为了更有效地转发IP数据报和提高交付成功的机会`，在网际层使用了**网际控制报文协议ICMP(Internet Control Message Protocol)。**
+ 主机或路由器使用ICMP来发送差错报告报文和询问报文。
+ ICMP报文被封装在IP数据报中发送。

#### ICMP差错报告报文的种类

`1️⃣终点不可达`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.50cjalpkgi80.webp)

`2️⃣源点抑制`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.54s1pqywwsg0.webp)

`3️⃣时间超过`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.746qun774ok0.webp)

+ 另外，当终点在预先规定的时间内不能收到一个数据报的全部数据报片时就把已收到的数据报片都丢弃，也会向源点发送时间超过报文。

`4️⃣参数问题`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.4jqgrex8ymi0.webp)

`5️⃣改变路由（重定向）`

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.3nnaaiytnac0.webp)

+ **以下情况不应发送ICMP差错报告报文：**
  + 对ICMP差错报告报文不再发送ICMP差错报告报文
  + 对第一个分片的数据报片的所有后续数据报片都不发送ICMP差错报告报文
  + 对具有多播地址的数据报都不发送ICMP差错报告报文
  + 对具有特殊地址(如127.0.0.0或0.0.0.0)的数据报不发送ICMP差错报告报文

**常用的ICMP询问报文有以下两种：**

a.回答请求和回答

b.时间戳请求和回答

####  ICMP的应用

`1️⃣分组网间探测PING`

用来测试主机或路由器间的连通性

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.1ihbjy8iknr4.webp)

`2️⃣跟踪路由traceroute`

用来测试IP数据报从源主机到达目的主机主要经过哪些路由器

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.5c7o7ylenas0.webp)

### 虚拟专用网VPN与网络地址转换NAT

#### 虚拟专用网VPN

+  利用公用的因特网作为本机构各专用网之间的通信载体，这样的专用网又称为`虚拟专用网`。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.77f88i6a8780.webp)

+ **根据具体用途有所不同**，可分为：`内联网VPN、外联网VPN、远程接入VPN`。

`1️⃣内联网VPN`

同一机构内不同部门的内部网络所构成的虚拟专用网VPN又称为内联网VPN。

`2️⃣外联网VPN`

有时一个机构的VPN需要有某些外部机构(通常就是合作伙伴)参加进来。这样的VPN就称为外联网VPN。

`3️⃣远程接入VPN`

在外地工作的员工需要访问公司内部的专用网络时,只要在任何地点接入到因特网,运行驻留在员工PC中的VPN软件，在员工的PC和公司的主机之间建立VPN隧道,即可访问专用网络中的资源。这种VPN称为远程接入VPN。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.74dmzaredns0.webp)

#### 网络地址转换NAT

+ 虽然因特网采用了<mark>无分类编址方式</mark>来减缓IPv4地址空间耗尽的速度，但**由于因特网用户数目的激增**，特别是大量小型办公室网络和家庭网络接入因特网的需求不断增加，**IPv4地址空间**即将<mark>面临耗尽的危险仍然没有被解除</mark>。

+ 1994年提出了一种**网络地址转换NAT的方法**再次缓解了<mark>IPv4地址空间即将耗尽的问题</mark>。

  NAT能使大量使用**内部专用地址**的**专用网络**用户共享少量外部全球地址来访问因特网上的主机和资源。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.18qzhvvvlxvk.webp)

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.1r0bxwhrjrgg.webp)

+ 用一个全球IP地址就可以使多个拥有本地地址的主机同时和因特网上的主机进行通信。这种将端口号和IP地址一起进行转换的技术叫作`网络地址与端口号转换NAPT`(Network Address and Port Translation)。

![image](https://jsd.cdn.zzko.cn/gh/xustudyxu/image-hosting1@master/20221210/image.5g0c9qkgacg0.webp)

**★注意：对于一些P2P网络应用，需要外网主机主动与内网主机进行通信**，在通过NAT时会遇到问题，需要网络应用自己使用一些特殊的`NAT穿越技术`来解决问题。

另外，由于**NAT**对外网屏蔽了内网主机的**网络地址**，能为内网的主机提供一定的`安全保护`。

