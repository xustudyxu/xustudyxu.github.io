---
title: HBase系统架构
date: 2022-03-18 17:17:28
permalink: /pages/e33def/
categories:
  - HBase
tags:
  - HBase
---
# HBase系统架构

[[toc]]

HBase是一个高可靠、高性能、面向列、可伸缩的分布式数据库，底层基大数据存储与管理于Hadoop的HDFS来存储数据。
HBase的系统架构包括**客户端、Zookeeper服务器、HMaster服务器、和RegionServer服务器**这些组件。HBase集群也是主从模式，HMaster是主服务器，regionServer是从服务器，在集群中可允许有多个regionserver。

 同时regionserver上有多个region，region是HBase中数据的物理分片。HBase的底层是HDFS的数据节点，HBase中的数据最终是存储在HDFS上的。

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/03/01.png)

## 客户端

+ HBase系统的入口
  + 客户端是任务的发起者；它是整个储与管理HBase系统的入口，使用者直接通过客户
    端来操作Hbase。
+ 通信功能
  + 客户端与HMaster进行管理类操作的通信；在获取RegionServer的信息后，直接与RegionServer进行数据读写类操作。
+ 客户端的多种形式
  + HBase 自带的HBase shell使用Java语言来实现的客户端

## ZooKeeper

**协调的任务**：

+ **Master选举**：通过选举机制保证同一个时刻只有一个HMaster处于活跃状态。
+ **系统容错**：每个RegionServer在加入集群时都需要到Zookeeper中进行注册，创
  建一个状态节点，Zookeeper会实时监控每个RegionServer的状态。
+ **Region元数据管理**：Region元数据被存储在Meta表中。Meta表是存在Zookeeper中。每次客户端发起新的请求时，需要查下Meta表来获取Region的位置。另外HMaster的地址也由zookeeper告知客户端。
+ **Region状态管理**：HBase 集群中region 会经常发生变更，变更的原因可能是系
  统故障，或者是配置修改，还有region 的分裂和合并。只要region 发生变化，就
  需要集群的所有节点知晓，否则就会出现异常。

## HMaster

HMaster是HBase集群中的主服务器，负责监控集群中的所有大数据存RegionServer，并且是所有元数据更改的接口储与管理. HMaster主要负责表和region的管理工作

1. 管理用户对表的增、删、改、查操作
2. 管理RegionServer的负载均衡，调整region的分布
3. Region的分配和移除
4. 在RegionServer宕机或下线后，负责迁移RegionServer上的Region到其他的RegionServer上

**HMaster故障不影响当前客户端对数据的访问。但需尽快恢复，避免后续操作的正确性**。

## RegionServer

RegionServer主要负责响应用户的请求，向HDFS中读写数据。一般在分布式集群当中，RegionServer大数据存储与管理运行在DataNode服务器上，实现数据的本地性。每个RegionServer包含多个region，它负责的功能有：

1. 处理客户端读写请求。
2. 处理分配给它的region。
3. regionserver接收到客户端的写数据操作后，将数据缓存至
   HDFS中。
4. 处理Region分片：切片在运行过程中变得过大的Region。
5. 执行压缩。

## Hbase相关概念

1. **表（ table ）**：HBase采用表来组织数据；同一个表的数据通常是相关的。
2. **行（ row ）**：每个表都由行组成，每个行由行键（ row key ）来标识，行键可以是任意字符串；数据存储时，按照行键的字典顺序排序。在检索时，可以通过单个row key来访问数据。
3. **列族（ column family ）**：一个table有许多个列族，列族是列的集合，属于表结构，也是表的基本访问控制单元；列族支持动态扩展，用户可以很轻松的添加一个列族或列，无须预定义列的数量以及类型。
4. **列标识（column qualifier）**：列族中的数据通过列标识column qualifier来进行定位，通常以Column Family：Column Qualifier来确定列族中的某列，注意列族与列表之间用冒号来隔开。另外列标识是可以根据需要动态添加的。
5. **时间戳（ timestamp ）**：时间戳用来区分数据的不同版本；即每个单元格保存着同一份数据的多个版本，默认情况下，每一个单元格中的数据插入时都会用时间戳来进行版本标识。读取单元格数据时，如果时间戳没有被指定，则默认返回最新的数据，写入新的单元格数据时，如果没有设置时间戳，默认使用当前时间。
6. **单元格（ cell ）**：在table中，通过行、列族、列、时间戳来确定一个单元格，单元格中存储的数据没有数据类型，以二进制字节来存储，每个单元格保存着同一份数据的多个版本，不同时间版本的数据按照时间的顺序排序，最新时间的数据排在最前面。通过<RowKey，Column Family: Column Qualifier，Timestamp>元组来访问单元格。

## 逻辑模型

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/04/01.png)

**关系型数据库特点：**

- 表结构预先定义；
- 同一列的数据类型相同;
- 空值占用存储空间

**HBase特点:**

- 只需要定义表名和列族可以动态添加列族和列
- 数据都是字符串类型
- 空值不占用存储空间

## 物理模型

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/04/02.png)

## 实际存储方式

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/04/03.png)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/04/04.png)

表中的数据按照行键的字典序分成多个**region**存在不同的**regionserver**上

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/04/05.png)

