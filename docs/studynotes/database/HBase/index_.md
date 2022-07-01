---
title: HBase简介
date: 2022-03-18 16:36:02
permalink: /pages/2aae92/
categories:
  - HBase
tags:
  - HBase
---
# HBase简介

[[toc]]

## Google的三驾马车

谈到Hadoop的起源，就不得不提Google的三驾马车：Google FS、MapReduce、BigTable。虽然Google没有公布这三个产品的源码，但是他发布了这三个产品的详细设计论文，奠定了风靡全球的大数据的基础！

**GFS** —2003     HDFS的理论基础
**MapReduce**—2004      MapReduce的理论基础
**BigTable**—2006     Hbase的理论基础

## Hadoop与Hbase

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/01/01.png)

## 什么是HBase

HBase(Hadoop Database)是一个开源的、面向列大数据存(Column-Oriented)、适合存储海量非结构化数据或半结构化数据的、具备高可靠性、高性能、可灵活储与管理扩展伸缩的、支持实时数据读写的**非关系型分布式数据库**。使用Java语言实现，运行在HDFS之上，将**HDFS作为底层文件存储系统**。

 HBase 是非关系型数据库，它不具备关系型数据库的一些特点，例如，它不要求数据之间有严格的关系，同时它允许在同一列的不同行中存储不同类型的数据。

### HBase的发展历程

Apache HBase最初是Powerset公司为了处理自然语言搜索产生的海量数据而开展的项目

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/01/02.png)

## HBase特性

### 容量巨大

HBase的单表可以有**百亿行**，**百万列**，可以在**横向**和**纵向**两个维度对数据进OPTION行插入，具有很大弹性。

在限定某个列的情况下对于单表存储百亿或更多的数据都没有性能问题，并且自身能够周期性地将较小文件合并成大文件以减少对磁盘的访问

### 类存储

HBase是面向列（族）存储的，并且列（族）拥有独立索引，对数据的权限控制也是从列族层面来实现的。

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/01/03.png)

### 稀疏性

稀疏:  对于为**空(null)**大数据存的列，并**不占用存储空间**，因此，表可以设计的非常稀疏。

### 扩展性

**纵向扩展**：不断优化主服务器的性能，提高存储空间和性能

**横向扩展**：不断向集群添加服务器来提供存储空间和性能

<font color=##dd0000>HBase是横向扩展的，理论上无限横向扩展</font>

### 高可靠性

+ 基于HDFS的多副本机制
+ WAL（Write-Ahead-Log）预写机制
+ Replication 机制

WAL（Write-Ahead-Log）预写日志是在 HBase 服务器处理数据插入和删除的过程中用来记录操作内容的日志，保证了数据写入时不会因集群异常而导致写 入数据的丢失；而 Replication 机制是基于日志操作来做数据同步的。

## Hadoop

- [官方文档](https://hadoop.apache.org/docs/current/index.html)

Hadoop是一个分布式的基础架构，实现分布式的存储和分布式的计算，分别对应hadoop的两个核心设计--HDFS和Mapreduce，HDFS为海量的数据提供了存储，而MapReduce则为海量的数据提供了计算。

## HDFS

- HDFS即Hadoop分布式文件系统（储与管理Hadoop Distributed File System）
- 提供高可靠性和高吞吐量的文件存储服务
- HDFS可以运行在低成本的硬件之上，通过软件设计来保证系统的可靠性
- 具有容错性，高可靠性，高可扩展性，高吞吐率。

### HDFS基本架构

HDFS采用master/slave架构。一个HDFS集群是由一个Namenode和一定数目的Datanodes组成。Namenode是一个中心服务器，负责管理文件系统的名字空间(namespace)以及客户端对文件的访问。集群中的Datanode一般是一个节点一个，负责管理它所在节点上的存储。HDFS暴露了文件系统的名字空间，用户能够以文件的形式在上面存储数据。从内部看，一个文件其实被分成一个或多个数据块，这些块存储在一组Datanode上。Namenode执行文件系统的名字空间操作，比如打开、关闭、重命名文件或目录。它也负责确定数据块到具体Datanode节点的映射。Datanode负责处理文件系统客户端的读写请求。在Namenode的统一调度下进行数据块的创建、删除和复制。

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/02/01.png)

### HDFS-块

- 块是文件存储处理的逻辑单元
- HDFS的文件被分成块进行存储
- HDFS块的默认大小是64MB

**分块的好处**：

- 支持大规模的文件存储，文件大小不受单点存储容量限制。
- 简化了系统设计，每个节点存储多少个文件块很容易计算。
- 适合数据备份，每个分块冗余的备份存储到多个节点。
- 利于负载均衡，当某个节点处于繁忙状态时，客户端还可以从其他
  节点获取这个块的副本。

<font color=##dd0000>块大小可自行设置，不能太大，也不宜过小</font>。块太大，不利于副本的存储，块太小导致块数量过多，计算过程中占有的内存多

### HDFS-NameNode

- NameNode，也叫做名称节点。
- NameNode是主服务器，负责存储文件的储与管理**元数据**
  - 元数据指的是目录，文件，权限等信息；
  - 文件分块，副本存储等信息（比如一个文件对应哪些块，每块存储节点的位置）
- Namenode在数据访问时给客户端提供元数据信息,当客户端发起数据请求时，仅仅从NameNode中获取文件的元数据信息，具体的数据传输不经过NameNode，而是直接与具体的DataNode进行交互
- 与Datanode交互，分配全局的数据存储节点
- 两个核心的数据结构：**fsimage**和**editlog**
  - fsimage(映象文件)：用于维护文件系统树以及文件树中所有的文件和文件储与管理
    夹的元数据
  - editlog(事务日志)：记录了所有针对文件的创建、删除、重命名等操作
- NameNode启动
  - 在Namenode启动时，fsimage文件的内容会加载到内存中，之后一直处于只读状态，当需要修改元数据时，比如系统中新建了文件等，不能直接修改fsimage文件，而是将这些修改事务写到editlog文件中，editlog文件会定期的合并，形成新的fsimage文件来替代旧的fsimage文件，这个合并工作由另一个组件SecondaryNameNode来完成。

### HDFS-SecondaryNameNode

作用：定期的合并editslog和fsimage文件，合并过程会周期性的进行

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/02/02.png)

- Checkpiont：合并的时间点，默认3600秒，或editlog文件达到64M。

### HDFS-DataNode

- 分布式文件系统中的每一个文件,都被切分成若干个数据块,每一个数据块都被存储在不同的服务器上,此服务器称之为数据服务器，这就是DataNode（数据节点）
- 负责存储数据块
- 负责为客户端提供数据块的读写服务
- 响应NameNode的相关指令，比如完成数据块的复制、删除等
- 定期发送心跳信息给NameNode，告知NameNode当前节点存储的文件块信息

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/02/03.png)

### HDFS-读文件机制

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/02/04.png)

### HDFS-写文件机制

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/02/05.png)

### HDFS-副本机制

- 默认副本数为3
- 跨越多个机架
- 默认副本策略：在HDFS默认3个副本情况下，会把第一个副本放到机架的一个节点上，第二副本放在同一个机架的另一个节点上，第三个节点放在不同的机架上。这种策略减少了跨机架副本的个数，提高了数据块的写性能，也允许一个机架出故障的情况。

### HDFS-容错

- HDFS具有较高的容错性，可以兼容廉价的硬件，它把硬件出错看作一种常态，而不是异常，并设计了相应的机制检测数据错误和进行自动恢复，主要包括以下几种情形：
  - 名称节点出错
  - 数据节点出错
  - 数据出错

1. NameNode出错：用Secondary NameNode备份的fsimage恢复
2. DataNode出错：DataNode与NameNode通过“心跳”报告状态，当DataNode失效后，副本数减少，而NameNode会定期检查各节点的副本数量， 检查出问题后会启动数据冗余机制。
3. 数据出错：在文件被创建时，客户端就会对每一个文件块进行信息摘录，并保存总和校验码，读取时校验。

`小结`

HDFS：储与管理可以存储大容量的数据文件容错性，故障监测机制，随时发现集群故障节点高可扩展性

