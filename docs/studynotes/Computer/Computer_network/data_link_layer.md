---
title: 计算机网络-数据链路层
date: 2022-12-04 16:57:45
permalink: /Computer/Computer_network/data_link_layer
categories:
  - 计算机网络
tags:
  - 计算机网络
---
# 计算机网络-数据链路层

[[toc]]

## 数据链路层概述

### 数据链路层在网络体系结构中的地位


![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.49lr6dl0vx40.webp)

**概念补充：**

- `链路(Link)`：指从一个结点到相邻结点的一段物理线路,而中间没有任何其他的交换结点。
- `数据链路(DataLink)`：指把实现通信协议的硬件和软件加到链路上,就构成了数据链路。
- **数据链路层**以`帧`为单位传输和处理数据。

### 使用点对点信道的数据链路层的三个重要问题

1️⃣封装成帧

![2a4ae3264be941758413e9d4357beac9](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/2a4ae3264be941758413e9d4357beac9.f5pcbs18e8w.gif)

2️⃣差错检测


![f28773369e4d4443842c54a0df965e5a](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/f28773369e4d4443842c54a0df965e5a.2in7mrg6m6c0.gif)

3️⃣可靠传输


![3833a33aaec6445988af9fcffc946b9e](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/3833a33aaec6445988af9fcffc946b9e.43k5dpqq1q60.webp)

### 使用广播信道的数据链路层


![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.2zyzbzom5900.webp)

`1️⃣共享式以太网的`媒体接入控制协议`CSMA/CD`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.1ghjgq806fc0.webp)

`2️⃣802.11局域网的`媒体接入控制协议`CSMA/CA`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.7221iycupa40.webp)

### 数据链路层的互连设备

+ 网桥和交换机的`工作原理如图：`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.4oftnhldvwy0.webp)

- 集线器（物理层互连设备）与交换机的区别

## 封装成帧

### 封装成帧相关概念

`封装成帧`：指数据链路层给上层交付的协议数据单元**添加帧头和帧尾**使之成为帧。

- 帧头和帧尾中包含有重要的控制信息。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.4698gj7kogw0.webp)

+ 帧头和帧尾的作用之一就是`帧定界限`。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.5rnw9635ifk0.webp)

### 透明传输

`透明传输`：指数据链路层对上层交付的传输数据**没有任何限制**,就好像数据链路层不存在一样。

- `1️⃣面向字节的物理链路使用字节填充实现`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.4zvllsddnng0.webp)

+ `2️⃣面向比特的物理链路使用比特填充实现`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.56uvouiuuaw0.webp)

为了提高**帧的传输效率**,应当使帧的**数据部分的长度**尽可能大些。

考虑到差错控制等多种因素,每一种数据链路层协议都规定了帧的数据部分的长度上限,即`最大传送单元MTU (Maximum Transfer Unit)。`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.702czciz8940.webp)

## 差错检测

### 比特差错

`比特差错`：比特在传输过程中可能会产生差错即**1可能会变成0，而0也可能变成1**。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.4t0mxto03zc.webp)

### 误码率BER

`误码率BER`：在一段时间内，传输错误的比特占所传输比特总数的`比率`。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.1nvrsoz1r8g.webp)

### 差错检测码

**使用差错检测码来检测数据在传输过程中是否产生了比特差错**,是数据链路层所要解决的重要问题之一。

检错码**只能检测出帧在传输过程中出现了差错**，但`并不能定位错误`，因此无法纠正错误。

### 奇偶校验

- 在待发送的数据后面添加1位奇偶校验位，使整个数据(包括所添加的校验位在内)中`"1”的个数为奇数(奇校验)或偶数(偶校验)`。
- 如果有`奇数个位`发生误码，则**奇偶性发生变化**，可以检查出误码;
- 如果有`偶数个位`发生误码，则**奇偶性不发生变化**，不能检查出误码(漏检) ;

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.6vydahuezbs0.webp)

### 循环冗余校验CRC

- 收发双方约定好一个`生成多项式G(x)`;
- 发送方基于待发送的数据和生成多项式`计算出差错检测码(冗余码)`，将其添加到待传输数据的后面一起传输;

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.2pnh5wys7mq0.webp)

- 接收方`通过生成多项式来计算`收到的数据是否产生了`误码`;

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.2s5kkgxqv8k0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.3o4ppdhs51m0.webp)

如果是判断传输是否误码，那第4步检查余数时：

- **余数为0**，可认为传输过程`无误码`;
- **余数不为0**，可认为传输过程`产生误码`。

**循环冗余校验CRC**有`很好的检错能力`(漏检率非常低),虽然计算比较复杂,但非常易于用硬件实现,因此被`广泛应用于数据链路层`。

+ **检错码**只能检测出帧在传输过程中出现了差错，但并不能定位错误，因此**无法纠正错误**。
+ 要想纠正传输中的差错，可以使用冗余信息更多的**纠错码**进行**前向纠错**，但纠错码的开销比较大，在**计算机网络中较少使用**。
+ 循环冗余校验**CRC**有很好的检错能力，**漏检率非常低**，虽然计算比较复杂，但非常**易于用硬件来实现**，因此被**广泛应用于**计算机网络的**数据链路层**。
+ 在计算机网络中通常采用我们后续课程中将要讨论的**检错重传方式来纠正传输中的差错**，**或者仅仅是丢弃检测到差错的帧**，这取决于数据链路层向其上层提供的是可靠传输服务，还是不可靠传输服务。

## 可靠传输

### 可靠传输的基本概念

+ 使用`差错检测技术`(例如循环冗余校验CRC)，检测**是否产生了误码**(比特错误)。

![94a2e204a1be4dcda7ff86d00265fe86](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/94a2e204a1be4dcda7ff86d00265fe86.243kw8pughpc.gif)

**数据链路层向上层提供的服务类型**

- `1️⃣不可靠传输服务`
  仅仅丢弃有误码的帧，其他什么也不做
- `2️⃣可靠传输服务`
  想办法实现发送端发送什么，接收端就接收什么。

![69a414c93dca470bb3305766b4d67e0a](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/69a414c93dca470bb3305766b4d67e0a.17vvdbofyc9s.gif)

+ 一般情况下，`有线链路的误码率比较低`，为了减小开销，并`不要求`数据链路层向上提供可靠传输服务。即使出现了误码，可靠传输的问题由其上层处理。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.yd7ssdpem40.webp)

+ `无线链路`易受干扰，误码率比较高，因此`要求`数据链路层必须向上层提供可靠传输服务。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.5nvfalzkt640.webp)

- `比特差错`只是传输差错中的一种
- 从整个计算机网络体系结构来看，传输差错还包括`分组丢失、分组失序以及分组重复`。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.1eh63uu4np8g.webp)

![qq22918914922917714320221204165012](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/qq22918914922917714320221204165012.7lhq6zp11m80.gif)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.2yv79tb16h80.webp)

- 分组丢失、分组失序以及分组重复这些传输差错，`一般不会出现在数据链路层`，而会出现在其上层。
- 可靠传输服务并不仅局限于数据链路层，其他各层均可选择实现`可靠传输`。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221204/image.56i9yun4fa40.webp)

- **可靠传输的实现比较复杂，开销也比较大**，是否使用可靠传输`取决于应用需求`。

### 可靠传输的实现机制——停止等待协议

`停止等待`就是每发送完一个分组就停止发送，等待对方的**确认**。在收到确认后再发送下一个分组。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221205/image.6fd346l62u80.webp)

<mark>注意事项</mark>

+ 接收端检测到数据分组有误码时，将其丢弃并等待发送方的超时重传。但对于误码率较高的点对点链路，为使发送方**尽早重传**，也可给**发送方发送NAK分组**。
+ 为了让接收方能够判断所收到的数据分组是否是重复的，需要给**数据分组编号**。由于停止-等待协议的停等特性，**只需1个比特编号**就够了，即编号O和1。
+ 为了让发送方能够判断所收到的ACK分组是否是重复的，需要给**ACK分组编号**，所用比特数量**与数据分组编号所用比特数量一样**。数据链路层一般不会出现ACK分组迟到的情况，因此在**数据链路层实现停止-等待协议可以不用给ACK分组编号**。
+ 超时计时器设置的**重传时间**应仔细选择。一般可将重传时间选为**略大于“从发送方到接收方的平均往返时间”**。
  + 在数据链路层点对点的往返时间比较确定，重传时间比较好设定。
  + 然而在运输层，由于端到端往返时间非常不确定，设置合适的重传时间有时并不容易。
+ 停止-等待协议的信道利用率

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221205/image.6yctji77qkg0.webp)

### 可靠传输的实现机制——回退N帧GBN协议

`停止-等待协议的信道利用率很低`，若出现超时重传，则信道利用率更低。

