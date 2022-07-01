---
title: NoSQL数据库理论基础
date: 2022-03-11 19:10:40
permalink: /pages/8efc75/
categories:
  - NoSQL
tags:
  - NoSQL
---
# NoSQL数据库理论基础 

[[toc]]

## 分布式数据库的数据管理

1. 什么是数据库系统

数据库系统  =  数据库管理系统 + 数据库

2. 什么是数据库管理系统

数据库管理系统(Database Management System)是一种操纵和管理数据库的大型软件，用于建立、使用和维护数据库，简称DBMS。主要任务就是对外提供数据，对内
要管理数据。

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/NoSQL/images/Nosql1/01.png)

3. 数据处理方式：集中式VS分布式

集中式数据库是指数据库中的数据**集中**存储在一台计算机上，数据的处理也集中
在一台机器上完成。

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/NoSQL/images/Nosql1/02.png)

分布式数据库是指利用高速计算机网络将<font color=##dd0000>物理上分散</font>的多个数据存储单元连接起来组成一个<font color=##dd0000>逻辑上统一</font>的数据库。

### CAP理论

2000年，Eric Brewer教授在PODC的研讨会上提出了一个猜想：在分布式的环境下设计和部署系统时。 有3个核心的系统需求：<font color=#dd00>  一致性（Consistency）、可用性（Availability）和分区容错性（Availability）</font>三者以一种特殊的关系存在，无法在一个分布式系统中被同时满足，并且最多只能满足其中两个

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/NoSQL/images/Nosql1/03.png)

1. C:一致性（consistency）（强一致性）

它是指任何一个读操作总是能够读到之前完成的写操作的结果。所有节点在<font color=#dd00>同一时间具有相同的数据</font>。

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/NoSQL/images/Nosql1/04.png)

2. A:可用性（Availability）（高可用性）

每个请求都能在<font color=#dd00>确定时间</font>内返回一个响应，无论请求是成功或失败。

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/NoSQL/images/Nosql1/05.png)

3. P:分区容忍性（Partition Tolerance）

它是指当出现网络分区情况时，即系统中的一部分节点无法和其他节点进行通信，分离的系统也能<font color=#dd00>正常运行</font>。也就是说，系统中任意信息的丢失或失败不会影响系统的继续运作。

### 为什么不能同时选择C、A、P?

2002年，Lynch与其他人证明了Brewer猜想，从而把CAP上升为一个定理

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/NoSQL/images/Nosql1/06.png)

+ 当处理CAP的问题时，可以有几个明显的选择

1. **CA**：也就是强调一致性（C）和可用性（A），放弃分区容忍性（P），最简单的做法是把所有与事务相关的内容都放到同一台机器上
2. **CP**：也就是强调一致性（C）和分区容忍性（P），放弃可用性（A），当出现网络分区的情况时，受影响的服务需要等待数据一致，因此在等待期间就无法对外提供服务
3. **AP**：也就是强调可用性（A）和分区容忍性（P），放弃一致性（C），允许系统返回不一致的数据

设计原则：在C、A、P之中取舍

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/NoSQL/images/Nosql1/07.png)

P是网络性质，CA是分布式系统性质，分区容忍性不是设计系统时可以选择的东西（因为无论如何，它都要发生，无法控制），CAP合理表述是：在一个允许网络发生故障的系统中，分布式系统该选择一致性C还是可用性A。

### 重新理解CAP

2012年，Eric Brewer发表文章指出：实践过程中应用CAP理论时不得不进行“三选二”存在误导性。

1. P发生的概率很小，不应该在设计之初直接放弃A或者C。

2. 即使在AC之间进行取舍，也不应该粗暴地在系统层面取A舍C或 取C舍A，应该针对不同粒度，子系统差异化。

3. 三者之间也不是非此即彼，应看做连续互相影响，因此可以采用如下策略：

   绝大多数未分区的情况下，尽可能保证CA，当发生网络分区时，系统应能识别P状况，降低CA并进行相应处理。

## ACID、BASE与一致性

### ACID是什么

ACID是关系数据库采纳的原则。

指数据库事务正确执行的四个基本要素的缩写。包含：<font color=##dddd>原子性（Atomicity）、一致性（Consistency）、隔离性（Isolation）、持久性（Durability）</font>

1. 原子性：一个事务的所有系列操作步骤被看成是一个动作，所有的步骤要么全部完成要么都不会完成。
2. 一致性：事务执行前后，数据库的状态都满足所有的完整性约束。不能发生表与表之间存在外键约束，但是有数据却违背这种约束性。
3. 隔离性：并发执行的事务是隔离的，保证多个事务互不影响，隔离能够确保并发执行的事务能够顺序一个接一个执行，通过隔离，一个未完成事务不会影响另外一个未完成事务。
4. 持久性：一个事务一旦提交，它对数据库中数据的改变就应该是永久性的，不会因为和其他操作冲突而取消这个事务。

### BASE原则又是什么

 NoSQL数据库使用的原则。

BASE原则 =   <font color=##dddd>基本可用性（Basically Available）  +  软状态（Soft state）  +  最终一致性（Eventuallyconsistent）</font>

1.  基本可用性：分布式系统在出现故障的时候，允许损失部分可用性，即保证核心功能或者当前最重要功能可用，但是其他功能会被削弱。
2. 软状态：允许系统数据存在中间状态，但不会影响到系统的整体可用性，即允许系统在不同节点的数据副本之间进行数据同步时存在延时。
3. 最终一致性：要求系统数据副本最终能够一致，而不需要实时保证数据副本一致。最终一致性是弱一致性的一种特殊情况。

### 为什么会出现BASE思想

CAP理论定义了分布式存储的根本问题，但并没有指出一致性和可用性之间到底应该如何权衡。于是出现了BASE思想，给出了权衡A与C的一种可行方案。

ACID和BASE代表了在一致性 - 可用性两点之间进行选择的设计哲学

**ACID强调一致性被关系数据库使用，BASE强调可用性被大多数Nosql使用**

