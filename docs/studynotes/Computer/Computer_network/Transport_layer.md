---
title: 计算机网络-运输层
date: 2022-12-12 15:49:49
permalink: /Computer/Computer_network/Transport_layer
categories:
  - 计算机网络
tags:
  - 计算机网络
---
# 计算机网络-运输层

[[toc]]

## 运输层概述

### 走进运输层

之前笔记中所了解到的`物理层、数据链路层以及网络层`它们共同解决了**将主机通过异构网络互联起来**所面临的问题，实现了`主机到主机的通信`。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.4ilb2phz3je0.webp)

+ 但实际上在计算机网络中进行通信的`真正实体`是位于**通信两端主机中的进程**。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.6wvqy2nspr80.webp)

+ 如何为运行在不同主机上的应用进程提供直接的通信服务是**运输层的任务**，运输层协议又称为`端到端协议`。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.7g99mpe66fk0.webp)

运输层向高层用户屏蔽了下面网络核心的细节(如网络拓扑、所采用的路由选择协议等)，它使应用进程看见的就好像是在两个运输层实体之间有`一条端到端的逻辑通信信道`。

### 本章重点

+ 根据**应用需求的不同**，因特网的运输层为应用层提供了`两种`不同的运输协议，即**面向连接的TCP和无连接的UDP**，这两种协议就是本章要讨论的主要内容。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.6503rz3nkow0.webp)

### 运输层端口号、复用与分用的概念

#### 引文介绍

+ 运行在计算机上的进程使用**进程标识符**`PID`来标志。
+ 因特网上的计算机并不是使用统一的操作系统，不同的操作系统(windows, Linux, Mac OS)又使用不同格式的进程标识符。
+ 为了使运行**不同操作系统的计算机的应用进程之间**能够进行<mark>网络通信</mark>，就必须使用**统一的方法对TCP/IP体系的应用进程进行标识**。

#### 端口号

+ **TCP/IP体系的运输层**使用`端口号`来区分应用层的不同应用进程。
+ **端口号**使用`16比特`表示, 取值范围`0~65535`;
  + 端口号只具有**本地意义**，即端口号只是为了标识本计算机应用层中的各进程，在因特网中，不同计算机中的相同端口号是`没有联系的`。
    + **熟知端口号**:0~1023，IANA把这些端口号指派给了TCP/IP体系中最重要的一些应用协议，例如:FTP使用21/20，HTTP使用80，DNS使用53。
    + **登记端口号**:1024~49151，为没有熟知端口号的应用程序使用。使用这类端口号必须在IANA按照规定的手续登记，以防止重复。例如: Microsoft RDP微软远程桌面使用的端口是3389。
    + **短暂端口号**:49152~65535，留给客户进程选择暂时使用。当服务器进程收到客户进程的报文时，就知道了客户进程所使用的动态端。

#### 复用与分用

+ **发送方**的`复用`和**接收方**的`分用`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.3kewg9zvtcq0.webp)

+ **TCP/IP体系的应用层常用协议**所使用的`运输层熟知端口号`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.4r06l2f4lyg0.webp)

## UDP和TCP的对比

+ `UDP和TCP`是**TCP/IP体系结构运输层中**的**两个重要协议**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.1aja6sjf1wsg.webp)

+ **对比总结**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.1mc21iy1ld4w.webp)

## TCP的流量控制

### 流量控制是什么？

+ 一般来说，我们总是希望`数据传输`得更快一些。

+ 但如果发送方把数据发送得过快，接收方就可能来不及接收，这就会造成数据的丢失。

+ 所谓`流量控制(flow control)`就是**让发送方的发送速率不要太快，要让接收方来得及接收**。

+ 流量控制怎么更好地实现？

  + 利用`滑动窗口机制`可以很方便地在TCP连接上实现对发送方的流量控制。

  + TCP接收方利用自己的接收窗口的大小来限制发送方发送窗口的大小。

    

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.2data3orpc2s.webp)

+ TCP发送方收到接收方的零窗口通知后，应启动持续计时器。持续计时器超时后，向接收方发送零窗口探测报文。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.1383702862lc.webp)

## TCP的拥塞控制

### 拥塞控制？

+ 在某段时间,若对**网络中某一资源的需求超过了该资源所能提供的可用部分网络性能就要变坏**。这种情况就叫做**拥塞**(congestion)。
+ 在计算机网络中的链路容量(即带宽)、交换结点中的缓存和处理机等，都是网络的资源。
+ 若出现拥塞而不进行控制，整个网络的吞吐量将随输入负荷的增大而下降。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.2rhjnsq8mt20.webp)

### 拥塞窗口与状态变量

+ 发送方维护一个叫做拥塞窗口**cwnd的状态变量**，其值取决于网络的拥塞程，并且`动态变化`。
  - 拥塞窗口cwnd的维护原则：只要网络没有出现拥塞，拥塞窗口就再增大一些;但只要网络出现拥塞，拥塞窗口就减少一些。
  - 判断出现网络拥塞的依据：没有按时收到应当到达的确认报文(即发生超时重传)。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.295xorkv93i8.webp)

+ 发送方将`拥塞窗口`作为发送窗口swnd，即**swnd= cwnd**。
+ 维护一个慢开始门限`ssthresh状态变量`:
  + 当`cwnd < ssthresh`时，使用**慢开始算法**:
  + 当`cwnd > ssthresh`时，停止使用慢开始算法而**改用拥塞避免算法**;
  + 当`cwnd = ssthresh`时，既**可使用慢开始算法，也可使用拥塞避免算法**。

+ 所谓快重传，就是使发送方**尽快进行重传**，而**不是等超时重传计时器超时**再重传。
  + 要求接收方不要等待自己发送数据时才进行捎带确认，而是要**立即发送确认**;
  + 即使收到了失序的报文段也要立即发出对已收到的报文段的**重复确认**。
  + 发送方一旦**收到3个连续的重复确认**，就将相应的报文段**立即重传**，而不是等该报文段的超时重传计时器超时再重传。
  + 对于个别丢失的报文段，发送方不会出现超时重传，也就不会误认为出现了拥塞（进而降低拥塞窗口cwnd为1)。使用快重传可以使整个网络的吞吐量提高约20%。
+ 发送方一旦**收到3个重复确认**，就知道现在只是丢失了个别的报文段。于是不启动慢开始算法，而执行快恢复算法;
  + **发送方将慢开始门限ssthresh值和拥塞窗口cwnd值调整为当前窗口的一半;开始执行拥塞避免算法**。
  + 也有的快恢复实现是把快恢复开始时的拥塞窗口cwnd值再增大一些，即等于新的ssthresh + 3。
    + 既然发送方收到3个重复的确认，就表明有3个数据报文段已经离开了网络;
    + 这3个报文段不再消耗网络资源而是停留在接收方的接收缓存中;
    + 可见现在网络中不是堆积了报文段而是减少了3个报文段。因此可以适当把拥塞窗口扩大些。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.5ftqrwvw4n80.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221212/image.434aom9plea0.webp)

