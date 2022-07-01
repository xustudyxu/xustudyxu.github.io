---
title: HBase基本原理
date: 2022-03-23 21:31:26
permalink: /pages/e16a48/
categories:
  - HBase
tags:
  - HBase
---
# HBase基本原理

[[toc]]

## Region定位

### region

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/06/01.png)

客户端在插入，删除，查询数据时需要知道哪个Region服务器上存有自己所需的数据，这个查找Region的过程称之为Region定位。

### META表

Region标识符，可以唯一标识每个Region，region标识符由‘表名、开始行键、RegionID’组成。为了定位每个Region所在的位置，就可以构建一张映射表，映射表的每个条目包含两项内容，一个是大数据存Region标识符，另一个是Region服务器标识，这个条目就表示储与管理Region和Region服务器之间的对应关系，从而就可以知道某个Region被保存在哪个Region服务器中。

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/06/02.png)

### Region定位

1. 客户端通过Zookeeper获取到Meta表分区存储的地址

2. 然后在对应Region服务器上获取meta表的信息，得到所需表和行键所在的Region信息

3. 然后在从Region服务器上找到所需的数据。

   一般客户端获取到Region信息后会进行缓存，下次再查询不必从Zookeeper开始寻址。

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/06/03.png)

## 数据存储与读取

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/06/04.png)

HBase的核心模块是Region服务器。

Region服务器由多个Region块构成，Region块中存储的一系列连续的数据集。

Region服务器主要构成部分是：**HLog和Region块**。

**HLog**记录该Region的操作日志。

**Region**对象由多个**Store**组成，每个Store对应当前分区中的一个列族，每个Store管理一块内存，即**MemStore**。

在写数据的时候，数据先写入MemStore，当MemStore中的数据达到一定条件时会写入到StoreFile文件中，因此每个Store包含若干个StoreFile文件。StoreFile文件对应HDFS中的HFile文件。

### MemStore

当Region服务器收到写请求的时候，Region服务器会将请求转至相应的Region。数据首先写入到Memstore，然后当到达一定的阀值的时候，Memstore中的数据会被刷到HFile中进行持久性存储。

### Store

Store是Region服务器的核心，存储的是同一个列族下的数据，大数据存每个Store包含有一块MemStore和0个或多个StoreFile。

StoreFile是HBase中最小的数据存储单元。

Store存储是HBase存储的核心，其中由两部分组成，一部分是MemStore，一部分是StoreFile。MemStore是Sorted Memory Buffer（内存写缓存），用户写入的数据首先会放入MemStore，当MemStore满了以后会Flush成一个StoreFile(底层实现是HFile)， 当StoreFile文件数量增长到一定阈值，会触发Compaction合并操作。

### Store的合并分裂

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/06/05.png)

### HFile

HFile里面的每个键值对就是一个简单的byte数组。但是这个byte数组里面包含了很多项，并且有固定的结构。

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/06/06.png)

### HBase写文件流程

+ 客户端首先访问zookeeper，从meta表得到写入数据对应的region信息和相大数据存应的region服务器
+ 找到相应的region服务器,把数据分别写到HLog和MemStore上一份
+ MemStore达到一个阈值后则把数据刷成一个StoreFile文件。（若MemStore中的数据有丢失，则可以从HLog上恢复）
+ 当多个StoreFile文件达到一定的大小后，会触发Compact合并操作，合并为一个StoreFile
+ 当Storefile大小超过一定阈值后，会把当前的Region分割为两个（Split分裂），并由Hmaster分配到相应的HRegionServer，实现负载均衡
+ 客户端先访问zookeeper，从meta表读取Region的信息对应的服务器
+ 客户端向对应Region服务器发送读取数据的请求，Region接收请求后，先从MemStore找数据，如果没有，再到StoreFile上读取，然后将数据返回给客户端。

