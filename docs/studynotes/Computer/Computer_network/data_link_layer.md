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


![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.49lr6dl0vx40.webp)

**概念补充：**

- `链路(Link)`：指从一个结点到相邻结点的一段物理线路,而中间没有任何其他的交换结点。
- `数据链路(DataLink)`：指把实现通信协议的硬件和软件加到链路上,就构成了数据链路。
- **数据链路层**以`帧`为单位传输和处理数据。

### 使用点对点信道的数据链路层的三个重要问题

1️⃣封装成帧

![2a4ae3264be941758413e9d4357beac9](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/2a4ae3264be941758413e9d4357beac9.f5pcbs18e8w.gif)

2️⃣差错检测


![f28773369e4d4443842c54a0df965e5a](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/f28773369e4d4443842c54a0df965e5a.2in7mrg6m6c0.gif)

3️⃣可靠传输


![3833a33aaec6445988af9fcffc946b9e](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/3833a33aaec6445988af9fcffc946b9e.43k5dpqq1q60.webp)

### 使用广播信道的数据链路层


![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.2zyzbzom5900.webp)

`1️⃣共享式以太网的`媒体接入控制协议`CSMA/CD`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.1ghjgq806fc0.webp)

`2️⃣802.11局域网的`媒体接入控制协议`CSMA/CA`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.7221iycupa40.webp)

### 数据链路层的互连设备

+ 网桥和交换机的`工作原理如图：`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.4oftnhldvwy0.webp)

- 集线器（物理层互连设备）与交换机的区别

## 封装成帧

### 封装成帧相关概念

`封装成帧`：指数据链路层给上层交付的协议数据单元**添加帧头和帧尾**使之成为帧。

- 帧头和帧尾中包含有重要的控制信息。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.4698gj7kogw0.webp)

+ 帧头和帧尾的作用之一就是`帧定界限`。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.5rnw9635ifk0.webp)

### 透明传输

`透明传输`：指数据链路层对上层交付的传输数据**没有任何限制**,就好像数据链路层不存在一样。

- `1️⃣面向字节的物理链路使用字节填充实现`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.4zvllsddnng0.webp)

+ `2️⃣面向比特的物理链路使用比特填充实现`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.56uvouiuuaw0.webp)

为了提高**帧的传输效率**,应当使帧的**数据部分的长度**尽可能大些。

考虑到差错控制等多种因素,每一种数据链路层协议都规定了帧的数据部分的长度上限,即`最大传送单元MTU (Maximum Transfer Unit)。`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.702czciz8940.webp)

## 差错检测

### 比特差错

`比特差错`：比特在传输过程中可能会产生差错即**1可能会变成0，而0也可能变成1**。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.4t0mxto03zc.webp)

### 误码率BER

`误码率BER`：在一段时间内，传输错误的比特占所传输比特总数的`比率`。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.1nvrsoz1r8g.webp)

### 差错检测码

**使用差错检测码来检测数据在传输过程中是否产生了比特差错**,是数据链路层所要解决的重要问题之一。

检错码**只能检测出帧在传输过程中出现了差错**，但`并不能定位错误`，因此无法纠正错误。

### 奇偶校验

- 在待发送的数据后面添加1位奇偶校验位，使整个数据(包括所添加的校验位在内)中`"1”的个数为奇数(奇校验)或偶数(偶校验)`。
- 如果有`奇数个位`发生误码，则**奇偶性发生变化**，可以检查出误码;
- 如果有`偶数个位`发生误码，则**奇偶性不发生变化**，不能检查出误码(漏检) ;

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.6vydahuezbs0.webp)

### 循环冗余校验CRC

- 收发双方约定好一个`生成多项式G(x)`;
- 发送方基于待发送的数据和生成多项式`计算出差错检测码(冗余码)`，将其添加到待传输数据的后面一起传输;

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.2pnh5wys7mq0.webp)

- 接收方`通过生成多项式来计算`收到的数据是否产生了`误码`;

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.2s5kkgxqv8k0.webp)

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.3o4ppdhs51m0.webp)

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

![94a2e204a1be4dcda7ff86d00265fe86](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/94a2e204a1be4dcda7ff86d00265fe86.243kw8pughpc.gif)

**数据链路层向上层提供的服务类型**

- `1️⃣不可靠传输服务`
  仅仅丢弃有误码的帧，其他什么也不做
- `2️⃣可靠传输服务`
  想办法实现发送端发送什么，接收端就接收什么。

![69a414c93dca470bb3305766b4d67e0a](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/69a414c93dca470bb3305766b4d67e0a.17vvdbofyc9s.gif)

+ 一般情况下，`有线链路的误码率比较低`，为了减小开销，并`不要求`数据链路层向上提供可靠传输服务。即使出现了误码，可靠传输的问题由其上层处理。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.yd7ssdpem40.webp)

+ `无线链路`易受干扰，误码率比较高，因此`要求`数据链路层必须向上层提供可靠传输服务。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.5nvfalzkt640.webp)

- `比特差错`只是传输差错中的一种
- 从整个计算机网络体系结构来看，传输差错还包括`分组丢失、分组失序以及分组重复`。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.1eh63uu4np8g.webp)

![qq22918914922917714320221204165012](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/qq22918914922917714320221204165012.7lhq6zp11m80.gif)

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.2yv79tb16h80.webp)

- 分组丢失、分组失序以及分组重复这些传输差错，`一般不会出现在数据链路层`，而会出现在其上层。
- 可靠传输服务并不仅局限于数据链路层，其他各层均可选择实现`可靠传输`。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221204/image.56i9yun4fa40.webp)

- **可靠传输的实现比较复杂，开销也比较大**，是否使用可靠传输`取决于应用需求`。

### 可靠传输的实现机制——停止等待协议

`停止等待`就是每发送完一个分组就停止发送，等待对方的**确认**。在收到确认后再发送下一个分组。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.6fd346l62u80.webp)

<mark>注意事项</mark>

+ 接收端检测到数据分组有误码时，将其丢弃并等待发送方的超时重传。但对于误码率较高的点对点链路，为使发送方**尽早重传**，也可给**发送方发送NAK分组**。
+ 为了让接收方能够判断所收到的数据分组是否是重复的，需要给**数据分组编号**。由于停止-等待协议的停等特性，**只需1个比特编号**就够了，即编号O和1。
+ 为了让发送方能够判断所收到的ACK分组是否是重复的，需要给**ACK分组编号**，所用比特数量**与数据分组编号所用比特数量一样**。数据链路层一般不会出现ACK分组迟到的情况，因此在**数据链路层实现停止-等待协议可以不用给ACK分组编号**。
+ 超时计时器设置的**重传时间**应仔细选择。一般可将重传时间选为**略大于“从发送方到接收方的平均往返时间”**。
  + 在数据链路层点对点的往返时间比较确定，重传时间比较好设定。
  + 然而在运输层，由于端到端往返时间非常不确定，设置合适的重传时间有时并不容易。
+ 停止-等待协议的信道利用率

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.6yctji77qkg0.webp)

### 可靠传输的实现机制——回退N帧GBN协议

`停止-等待协议的信道利用率很低`，若出现超时重传，则信道利用率更低。

 ![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.7azffve52ng0.webp)

**回退N帧协议GBN(Go-Back-N)**：在`流水线传输的基础上`，利用传输窗口，来限制发送方和连续发送分组个数。

+ 累计确认

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.5vyvmab29s00.webp)

+ 有差错情况

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.2sq1v7sfwri0.webp)

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.ctimc1nv8e8.webp)

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.7ldsem9vovs0.webp)

+ 可见,当通信线路质量不好时,回退N帧协议的信道利用率并不比停止=等待协议高。

+ 如果WT超过取值访问的上限。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.ikvrmhfa700.webp)

**GBN协议的发送方和接收方**：

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.3lihf88c39m0.webp)

### 可靠传输的实现机制——选择重传SR协议

**选择重传SR协议在 GBN 协议的基础上进行了改进**，它通过让发送方仅重传那些它怀疑在接收方出错（即丢失或受损）的分组而避免了不必要的重传。`选择重传协议只重传真正丢失的分组`。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.3sc5gk02wig0.webp)

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.8ys4reqjl8o.webp)

**SR协议的发送方和接收方**:

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221205/image.35qu7bunx8y0.webp)

## 点对点协议ppp

**用户如何接入因特网呢？**
⬇
`点对点协议PPP(Point-to-Point Protocol)`是目前使用最广泛的点对点数据链路层协议。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.1y07am34jj40.webp)

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.576slkx3lg80.webp)

### PPP协议的标准文档[RFC1661, RFC1662]

![cee4cf3af7c84d5f98c2eaa83fdc7b97](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/cee4cf3af7c84d5f98c2eaa83fdc7b97.6rzsk5qze3w0.gif)

### PPP协议提供标准方法的三部分构成

> ★该方法是为在点对点链路传输各种协议数据报所提供的。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.4pxvp0uheis0.webp)

- 对各种协议数据报的封装方法（`封装成帧`）

- 链路控制协议`LCP`

  用于建立、配置以及测试数据链路的连接

- 一套网络控制协议`NCPs`

  其中的每一个协议支持不同的网络层协议

帧格式：

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.6z4e24h6ea80.webp)

### PPP帧的透明传输

- `1️⃣面向字节`的**异步链路**使用`字节填充法`（插入转义字符）

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.134qo9z0xqqo.webp)

- `2️⃣面向比特`的**同步链路**使用`比特填充法`（零比特填充）

### PPP协议的工作状态

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.3audj5nrcgm0.webp)

## 媒体接入控制MAC

### 媒体接入控制的基本概念

+ **共享信道**着重考虑一个问题——`如何协调媒体接入控制MAC`(Medium Access Control)。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.2mhukq83oiq0.webp)

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.280s01udv51c.webp)

### 媒体接入控制——静态划分信道

`1️⃣信道复用`

**复用(Multiplexing)是通信技术中的一个重要概念**。`复用`就是通过**一条物理线路同时传输多路用户的**`信号`。

当网络中传输媒体的传输容量大于多条单一信道传输的总通信量时,可利用复用技术在一条物理线路上建立多条通信信道来充分利用传输媒体的带宽。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.4pu8jh6zvgy0.webp)

`2️⃣频分复用FM`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.4clh309v96y0.webp)

频分复用的所有用户同时占用不同的频带资源并行通信。

`3️⃣时分复用TDM`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.4hv0n06v2360.webp)

时分复用的所有用户在不同的时间占用同样的频带宽度。

`4️⃣波分复用WDM`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.2zy3fibqo2u0.webp)

`5️⃣码分复用CDM`

码分复用CDM是另一种共享信道的方法。实际上，由于该技术**主要用于多址接入**，人们更常用的名词是**码分多址CDMA(Code Division Multiple Access)**。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.4njq2uc9hsa0.webp)

码分复用的应用举例

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.72y53lr549s0.webp)

### 媒体接入控制——动态接入控制——随机接入

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.3sbnqicgt0s0.webp)

`2️⃣CSMA/CD协议`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.3ryygwizqa20.webp)

**载波监听多址接入/碰检测CSMA/CD** (Carrier Sense Multiple Access/Collision Detection)

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.2hfsf1hqspk0.webp)

`3️⃣争用期（碰撞窗口）`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.fato0k0tj8w.webp)

+ 主机最多经过2τ(即δ→0)的时长就可检测到本次发送是否遭受了碰撞
+ 因此，以太网的端到端往返传播时延2τ称为**争用期**或**碰撞窗口**。
+ 经过争用期这段时间还没有检测到碰撞，才能肯定这次发送不会发生碰撞。
+ 每一个主机在自己发送帧之后的一小段时间内，存在着遭遇碰撞的可能性。这一小段时间是不确定的。它取决于另一个发送帧的主机到本主机的距离，但不会超过总线的端到端往返传播时延，即一个争用期时间。
+ 显然，在以太网中发送帧的主机越多，端到端往返传播时延越大，发生碰撞的概率就越大。因此，**共享式以太网不能连接太多的主机，使用的总线也不能太长**。
  + 10Mb/s以太网把争用期定为512比特发送时间，即51.2μs，因此其总线长度不能超过5120m，但考虑到其他一些因素，如
    信号衰减等，以太网规定总线长度不能超过2500m。

`4️⃣最小帧长`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.7coyvpsikng0.webp)

+ **以太网规定最小帧长为64字节**，即512比特(512比特时间即为争用期) ;如果要发送的数据非常少，那么必须加入一些填充字节,使帧长不小于64字节。
+ 以太网的**最小帧长确保了主机可在帧发送完成之前就检测到该帧的发送过程中是否遭遇了碰撞**;
+ 如果在争用期(共发送64字节)没有检测到碰撞，那么后续发送的数据就一定不会发生碰撞;
+ 如果在争用期内检测到碰撞，就立即中止发送，这时已经发送出去的数据一定小于64字节，因此凡长度小于64字节的帧都是由于碰撞而异常中止的无效帧。
+ **最小帧长** = 争用期 × 数据传输速率
+ **争用期** = 2 * 端到端距离 / 电磁波信号速率 = 2τ

`5️⃣最大帧长`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.2ucfvk7qe7m0.webp)

`6️⃣截断二进制指数退避算法`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.2ku6hgnv36g0.webp)

+ 若连续多次发生碰撞，就表明可能有较多的主机参与竞争信道。但使用上述退避算法可使重传需要推迟的平均时间随重传次数而增大(这也称为动态退避)，因而减小发生碰撞的概率，有利于整个系统的稳定。

+ 当**重传达16次仍不能成功**时，表明同时打算发送帧的主机太多，以至于连续发生碰撞,则丢弃该帧,并向高层报告。
  

:seven: 信道利用率

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.5uvvwzgdga00.webp)

`8️⃣CSMA/CA协议`

+ 载波监听多址接入/碰撞避免 CSMA/CA(Carrier Sense Multiple Access/Collision Avoidance)

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.67wrspg5uz40.webp)

- 帧间间隔**IFS**
  802.11标准规定,所有的站点必须在持续检测到信道空闲一段指定时间后才能发送帧,这段时间称为**帧间间隔IFS**。

- CSMA/CA协议的**工作原理**

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.1a5p0p1xf5z4.webp)

+ CSMA/CA协议的**退避算法**

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.41q9z28x9p80.webp)

+ CSMA/CA协议的**信道预约和虚拟载波监听**

  为了尽可能减少碰撞的概率和降低碰撞的影响,802.11标准允许要发送数据的站点对信道进行预约。

> (1) 源站在发送数据帧之前先发送一个短的控制帧,称为请求发送RTS(Request To Send),它包括源地址、目的地址以及这次通信(包括相应的确认顿)所需的持续时间。
>
> (2) 若目的站正确收到源站发来的RTS帧,且媒体空闲,就发送一个响应控制帧,称为允许发送CTS(Clear To Send),它也包括这次通信所需的持续时间(从RTS帧中将此持续时间复制到CTS帧中)。
>
> (3) 源站收到CTS帧后,再等待一段时间SIFS后,就可发送其数据帧。
>
> (4) 若目的站正确收到了源站发来的数据帧,在等待时间SIFS后,就向源站发送确认帧ACK。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.5nksgswx7740.webp)

除RTS帧和CTS帧会携带通信需要持续的时间，数据帧也能携带通信需要持续的时间，这称为`802.11的虚拟载波监听机制`。

由于利用虚拟载波监听机制,站点只要监听到RTS帧、CTS帧或数据帧中的任何一个，就能知道信道被占用的持续时间，而不需要真正监听到信道上的信号，因此虚拟载波监听机制能减少隐蔽站带来的碰撞问题。
![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.3tt0yrz4oze0.webp)

## MAC地址、IP地址以及ARP协议

关于MAC地址、IP地址以及ARP协议的简要了解：

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.3r7z7xwouy00.webp)

### MAC地址

+ `MAC地址`是以太网的MAC子层所使用的地址;
+ 当多个主机连接在同一个广播信道上，要想实现两个主机之间的通信，则每个主机都必须有一个唯一的标识，即一个数据链路层地址；
+ 在每个主机发送的帧中必须携带标识发送主机和接收主机的地址。**由于这类地址是用于媒体接入控制MAC(Media Access Control)，因此这类地址被称为MAC地址**；

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.4q6xt30pks80.webp)

+ **MAC地址**一般被固化在网卡(网络适配器)的电可擦可编程只读存储器EEPROM中，因此**MAC地址也被称为硬件地址;**

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.5fjzukxbzf40.webp)

+ **MAC地址**有时也被称为`物理地址`。

> **★注意**：这并不意味着MAC地址属于网络体系结构中的物理层！

- 严格来说，MAC地址是对网络上各接口的唯一标识，而不是对网络上各设备的唯一标识。

- **IEEE局域网的MAC地址格式**

  扩展的唯一标识符EUI-48

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.60h8u3rhnas0.webp)

+ `IEEE 802局域网的MAC地址发送顺序`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.4kg8xf521dg.webp)

字节发送顺序：第一字节----->第六字节

字节内的比特发送顺序：b<sub>0</sub>------>b<sub>7</sub>

+ **MAC地址举例**
  `1️⃣单播MAC地址举例`

![e6b37ce1c7fe4b01a3a5d3bc5d84ba12](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/e6b37ce1c7fe4b01a3a5d3bc5d84ba12.gvxlfryy5qg.gif)

​	2️⃣广播MAC地址举例

![4e1eba82e4fd45c6b31ebd9795dd3418](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/4e1eba82e4fd45c6b31ebd9795dd3418.7jv1jtklmz40.gif)

​	3️⃣多播MAC地址举例

![1e0ac043b0b9401d9d08df150331da74](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/1e0ac043b0b9401d9d08df150331da74.6ldt0d1meec0.gif)

###  IP地址

+ `IP地址`：指因特网(Internet)上的主机和路由器所使用的地址，**用于标识两部分信息**:
  **1️⃣网络编号**：标识因特网上数以百万计的`网络口`。
  **2️⃣主机编号**：标识同一网络上`不同主机`(或路由器各接口)。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.pbw3i034pds.webp)

+ 从**网络体系结构**看IP地址与MAC地址

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.4ncqekurbxu0.webp)

+ **数据包转发过程中**`IP地址与MAC地址的变化情况`

![1670322337085](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\1670322337085.png)

`1️⃣数据包转发过程中`**源IP地址和目的IP地址保持不变**；
`2️⃣数据包转发过程中`**源MAC地址和目的MAC地址逐个链路(或逐个网络)改变**。

### ARP协议

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.29ptpujc263o.webp)

+ 源主机在自己的ARP高速缓存表中查找目的主机的IP地址所对应的MAC地址，若找到了，则可以封装MAC帧进行发送;若找不到，则发送ARP请求(封装在广播MAC帧中);
+ 目的主机收到ARP请求后,将源主机的IP地址与MAC地址记录到自己的ARP高速缓存表中，然后给源主机发送ARP响应(封装在单播MAC帧中)，ARP响应中包含有目的主机的IP地址和MAC地址;

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.4girqfa28jk0.webp)

- 源主机收到ARP响应后，将目的主机的IP地址与MAC地址记录到自己的ARP高速缓存表中，然后就可以封装之前想发送的MAC帧并发送给目的主机;
- **ARP的作用范围**：`逐段链路或逐个网络使用`。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.7avaka3ovho0.webp)

## 集线器与交换机的区别

### 早期的总线型以太网

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.1ch3dtcee6g0.webp)

### 使用双绞线和集线器HUB的星型以太网

- 使用集线器的以太网在逻辑上仍然是**总线网**，使用`CSMA/CD协议`。
- 集线器只工作在`物理层`。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.2c0mtb78vhhc.webp)

### 使用集线器HUB在物理层扩展以太网

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.og6pafcpips.webp)

### 以太网交换机

此时的前提条件：

- 忽略ARP过程
- 假设交换机的帧交换表已“学习好了”

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.4wf1jyolhau0.webp)

### 对比集线器和交换机

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.7bfa4z898bo0.webp)

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.409l0fezxjw.webp)

## 以太网交换机自学习和转发帧的流程

+ `以太网交换机工作在数据链路层`（也包括物理层）

+ **收到帧后进行登记**。登记的内容为帧的源MAC地址及进入交换机的接口号

+ 根据帧的目的MAC地址和交换机的帧交换表对帧进行转发，有以下三种情况:
  1️⃣**明确转发**：交换机知道应当从哪个(或哪些)接口转发该帧(单播,多播,广播)
  2️⃣**盲目转发**：交换机不知道应当从哪个端口转发帧,只能将其通过除进入交换机的接口外的其他所有接口转发(也称为泛洪)
  3️⃣**明确丢弃**：交换机知道不应该转发该帧,将其丢弃

+ A->B

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.e4acryqdee0.webp)

+ B->A

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.6lldya62di00.webp)

+ E->A

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.45hdb38sy200.webp)

+ G->A

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.5bqjfxgvf480.webp)

## 以太网交换机的生成树协议STP

- **如何提高以太网的可靠性**?

  `添加冗余链路`可以提高以太网的可靠性

- 但是,冗余链路也会带来负面效应-形成网络环路

- 网络环路会带来网络风暴等问题

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.3ptd8qij5i80.webp)

- **因此提出**的以太网交换机使用`生成树协议STP`(Spanning Tree Protocol)解决了这个问题，可以在增加冗余链路来提高网络可靠性的同时又避免网络环路带来的各种问题。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.3999lqgjro80.webp)

## 虚拟局域网VLAN

### 虚拟局域网VLAN概述

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.3r4mp82n1km0.webp)

由于巨大的广播域会带来弊端，因此需要分割广播域，有以下两种方法：

`1️⃣使用路由器隔离广播域`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.3vxxdogckga0.webp)

路由器的成本较高，因此虚拟局域网VLAN也就应运而生

`2️⃣虚拟局域网VLAN(Virtual Local Area Network)`

**VLAN**是一种将局域网内的设备划分成与物理位置无关的逻辑组的技术。

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.1wd0xe7wl3fk.webp)

### 虚拟局域网VLAN的实现机制

`1️⃣IEEE 802.1Q帧`

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.38tpjghaezq0.webp)

::: tip 注意

802.1Q帧是由交换机来处理的，而不是用户主机来处理的。

:::

`2️⃣交换机的端口`

交换机的端口有三种类型：

<font color="green">Access</font>、<font color="skyblue">Trunk</font>、<font color="orange">Hybrid</font>

![image](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20221206/image.3n5yf9ywmze0.webp)