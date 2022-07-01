---
title: Redis 数据库简介
date: 2022-06-07 20:45:03
permalink: /pages/e9cc9f/
categories:
  - Redis
tags:
  - Redis
---
# Redis 数据库简介

[学习视频地址](https://www.bilibili.com/video/BV1Rv41177Af?p=1)

[[toc]]

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.1t1oqnudzvog.jpg)

## 技术发展

技术的分类

1. 解决功能性的问题：Java、Jsp、RDBMS、Tomcat、HTML、Linux、JDBC、SVN
2. 解决扩展性的问题：Struts、Spring、SpringMVC、Hibernate、Mybatis
3. 解决性能的问题：NoSQL、Java线程、Hadoop、Nginx、MQ、ElasticSearch

### Web1.0时代

Web1.0的时代，数据访问量很有限，用一夫当关的高性能的单点服务器可以解决大部分问题。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.6oud1zlmuxc0.jpg)

### Web2.0时代

随着Web2.0的时代的到来，用户访问量大幅度提升，同时产生了大量的用户数据。加上后来的智能移动设备的普及，所有的互联网平台都面临了巨大的性能挑战。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.6z6y7rmb2700.jpg)

### 解决CPU及内存压力

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.68w0snj2wk00.jpg)

### 解决IO压力

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.16879uz0siqo.jpg)

## NoSQL 数据库

### NoSQL数据库概述

NoSQL(NoSQL = **Not Only SQL** )，意即“不仅仅是SQL”，泛指**非关系型的数据库**。 

NoSQL 不依赖业务逻辑方式存储，而以简单的`key-value`模式存储。因此大大的增加了数据库的扩展能力。

+ 不遵循SQL标准。
+ 不支持ACID。
+ 远超于SQL的性能。

### **NoSQL适用场景**

+ 对数据高并发的读写
+ 海量数据的读写
+ 对数据高可扩展性的

### **NoSQL**不适用场景

+ 要事务支持
+ 基于sql的结构化查询存储，处理复杂的关系,需要即席查询。
+ 用不着sql的和用了sql也不行的情况，请考虑用NoSql

### **Memcache**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.182ny65xnqdc.jpg)

+ 很`早`出现的NoSql数据库
+ 数据都在内存中，一般`不持久化`
+ 支持简单的key-value模式，`支持类型单一`
+ 一般是作为`缓存数据库`辅助持久化的数据库

### `Redis`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.4ac55hg7d1k0.jpg)

+ 几乎覆盖了Memcached的绝大部分功能
+ 数据都在内存中，`支持持久化`，主要用作备份恢复
+ 除了支持简单的key-value模式，还`支持多种数据结构的存储`，比如` list、set、hash、zset`等。
+ 一般是作为`缓存数据库`辅助持久化的数据库

### `MongoDB`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.2tdz837532w0.jpg)

+ 高性能、开源、模式自由(schema  free)的`文档型数据库`

+ 数据都在内存中， 如果内存不足，把不常用的数据保存到硬盘
+ 虽然是key-value模式，但是对value（尤其是`json`）提供了丰富的查询功能
+ 支持二进制数据及大型对象
+ 可以根据数据的特点`替代RDBMS` ，成为独立的数据库。或者配合RDBMS，存储特定的数据。

## 行式存储数据库（大数据时代）

### 行式数据库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.6twpui5bneo0.jpg)

### **列式数据库**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.5ufmal4bk20.jpg)

#### **HBase**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.69a056iwlf40.jpg)

HBase是`Hadoop`项目中的数据库。它用于需要对大量的数据进行随机、实时的读写操作的场景中。

HBase的目标就是处理数据量`非常庞大`的表，可以用`普通的计算机`处理超过`10亿行数据`，还可处理有数百万`列`元素的数据表。

####  **Cassandra[kəˈsændrə]**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.4ua54uzp09s0.jpg)

Apache Cassandra是一款免费的开源NoSQL数据库，其设计目的在于管理由大量商用服务器构建起来的庞大集群上的`海量数据集(数据量通常达到PB级别)`。在众多显著特性当中，Cassandra最为卓越的长处是对写入及读取操作进行规模调整，而且其不强调主集群的设计思路能够以相对直观的方式简化各集群的创建与扩展流程。

> 计算机存储单位 计算机存储单位一般用B，KB，MB，GB，TB，EB，ZB，YB，BB来表示，它们之间的关系是：
>
> 位 bit(比特)(Binary Digits)：存放一位二进制数，即 0 或 1，最小的存储单位。
>
> 字节 byte：8个二进制位为一个字节(B)，最常用的单位。
>
> 1KB (Kilobyte 千字节)=1024B，
>
> 1MB (Megabyte 兆字节 简称“兆”)=1024KB，
>
> 1GB (Gigabyte 吉字节 又称“千兆”)=1024MB，
>
> 1TB (Trillionbyte 万亿字节 太字节)=1024GB，其中1024=2^10 ( 2 的10次方)，
>
> `1PB`（Petabyte 千万亿字节 拍字节）=1024TB，
>
> 1EB（Exabyte 百亿亿字节 艾字节）=1024PB，
>
> 1ZB (Zettabyte 十万亿亿字节 泽字节)= 1024 EB,
>
> 1YB (Jottabyte 一亿亿亿字节 尧字节)= 1024 ZB,
>
> 1BB (Brontobyte 一千亿亿亿字节)= 1024 YB.
>
> 注：“兆”为百万级数量单位。

## 图形数据库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.5i6pukp7ya00.jpg)

主要应用：社会关系，公共交通网络，地图及网络拓谱(n*(n-1)/2)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220607/image.29xsu06f6hgk.jpg)

