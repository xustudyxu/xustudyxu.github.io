---
title: 计算机网络-物理层
date: 2022-12-03 19:05:37
permalink: /Computer/Computer_network/physical_layer
categories:
  - 计算机网络
tags:
  - 计算机网络
---
# 计算机网络-物理层

[[toc]]

## 物理层的基本概念

物理层协议的主要任务

1. 机械特性

指明接口所用接线器的 **形状** 和 **尺寸** 、 **引脚数目** 和 **排列** 、 **固定和锁定** 装置。

2. 电气特性

指明在接口电缆的各条线上出现的 **电压的范围** 。

3. 功能特性

指明某条显示行出现某一电平的 **电压表示何种意义**。

4. 过程特性

指明对于不同功能的各种可能 **事件的出现顺序**。

物理层的主要作用

1. 物理层考虑的是怎样才能连接各种尖酸的传输媒体上传输数据比特流
2. 物理层为数据链路层屏蔽了各种传输媒体的差异，是数据链路层只需要考虑如何完成本层的协议，不必考虑网络具体传输的媒体是什么。

## 物理层下面的传输媒体

传输媒体

### 导引型传输媒体

1. 双绞线

   ![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.694l6v3vj5s0.webp)

2. 同轴电缆

   ![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.1291a2a495og.webp)

3. 光纤

   ![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.5vqervoc2qg0.webp)

   + 光在光纤中传输的基本原理

   ![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.3hls1grtz9g0.webp)

   ![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.12rqru8cqtls.webp)

4. 电力线

   ![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.1p7fzbzx3ezk.webp)

### 非引导型传输媒体

1. 无线电波
2. 微波

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.fqktiaiu508.webp)

3. 红外线
4. 可见光

## 传输方式

1. 串行与并行
2. 同步与异步
   - 同步传输时，收发双方同步的方法
     - 外同步：在收发双方之间添加一条单独的时钟信号线
     - 内同步：发送端将始终同步信号变慢到发送数据中一起传输
   - 异步发送时，每个字节单独发送，且起始段与结束段有单独的标记。
3. 单向通信/双向交替通信/双方同时通信(单工/半双工/全双工)

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.36ld283rxom0.webp)

## 编码与调制

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.68hcn22uf880.webp)

### 常见的基带调制编码方式

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.z6k4dfxm0io.webp)

- 不归零编码中存在时钟不一致的问题
- 归零编码中存在浪费数据带宽的问题
- 曼切斯特编码有自动同步的能力
- 差分曼切斯特编码相交上面的编码变化少，更适合网络传输

练习题：

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.z2bp6646hps.webp)

### 基本的调制方式

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.1gk02ylk9c0w.webp)

不过有一个缺点，使用基本调制方式，一个码元只能包含一个比特信息。通常来说可以有混合调制的方式，也就是多个维度一起调制的方式。

下面就是一个典型的例子

正交振幅调制 QAM

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.4tc9rfwo3l40.webp)

## 信道的极限容量

> 任何信道都存在各种失真，各种干扰

信号在信道上传输速率的因素主要有以下两个方面决定

1. 奈氏准则

   在假定的理想条件下，**为了避免码间串扰**，**码元传输速率是有上限的**。

   在理想带宽为 W(hz) 的信道中。

   1. 理想低通信道的最高码元传输速率 = 2W Baud
   2. 理想带通信道的最高码元传输速率 = W Baud

   > 其中，码元传输速度也叫调制速度
   >
   > *W* 为信道带宽
   >
   > *Baud* 为波特，即 码元/秒

   波特率 *B* 与传输速率 *C* 的关系如下

<center><em>C = Blog<sub>2</sub>N</em></center>
2. 香农定理 公式: *C = Wlog<sub>2</sub>(1 + S/N)*

   > C：信道的极限信息传输速率（单位：b/s）
   >
   > W：信道带宽（单位：Hz）
   >
   > S：信道内所传信号的平均功率
   >
   > N：信道内的高斯噪声功率
   >
   > S/N：信噪比，使用分贝（dB）作为度量单位
   >
   > + 信噪比（dB）= *10 × log<sub>10</sub>(S/N)（dB）*

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.6u8tung63co0.webp)

## 信道的复用技术

### 频分复用、时分复用和统计时分复用

1. 频分复用

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.4hed19sa9cg.webp)

每个用户划分出一个频段来就是频分复用。
存在大量的带宽闲置的问题

2. 时分复用(TDM)

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.58cg0bzk2uw0.webp)

- 所有用户被划分在了不同的时间帧中，每个用户周期出现。
- 存在大量的限制

3. 统计时分复用

动态分配时间间隙，提高利用率

### 波分复用(WDM)

波分复用就是光频拆分出来，通过一个光纤来传输多个信号。

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.4jwgzkrt4nq0.webp)

### 码分复用(CDMA)

所有的用户在同一时刻使用同一频带进行通信。

工作原理:

1. 一个用户在传输数据的时候，1 bit 的数据通常要化成 m bit 的码片进行传输。
2. 每个码片中的所有的数字仅有 `1` 和 `-1`。

3. 假设用户的码片信息为 S1,S2,…,Sn 的话，不同码片之间的内积为 0，即对于任意的 i,j 满足 i≠j 而言， S<sub>i</sub>⋅S<sub>j</sub> ÷ m=0 成立。
4. 传输比特 1 ，则传输码片 S，否则传输码片的反码 ![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.4qwjfif0uae0.webp)。

5. 我们发现 S⋅S=1,S⋅![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.4qwjfif0uae0.webp)=−1 ，而 S<sub>i</sub>⋅S<sub>j</sub>=0，那么在多个用户信息之间叠加的话，我们可以通过这种计算内积的方法把其他用户的内积给去除。

以书上的例子为例。

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting1@master/20221203/image.7dobfgww0c00.webp)