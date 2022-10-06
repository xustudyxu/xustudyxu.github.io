---
title: MySQL 分库分表
date: 2022-10-06 11:50:12
permalink: /database/MySQL/MySQL_Mycat
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 分库分表

[[toc]]

## 介绍

### 问题分析

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.4ob3i6abfbe0.webp)

随着互联网及移动互联网的发展，应用系统的数据量也是成指数式增长，若采用单数据库进行数据存储，存在以下性能瓶颈：

1. IO瓶颈：热点数据太多，数据库缓存不足，产生大量磁盘IO，效率较低。 请求数据太多，带宽不够，网络IO瓶颈。
2. CPU瓶颈：排序、分组、连接查询、聚合统计等SQL会耗费大量的CPU资源，请求数太多，CPU出现瓶颈。

为了解决上述问题，我们需要对数据库进行分库分表处理。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.1coobo0w2m9s.webp)

分库分表的中心思想都是将数据分散存储，使得单一数据库/表的数据量变小来缓解单一数据库的性能问题，从而达到提升数据库性能的目的。

### 拆分策略

分库分表的形式，主要是两种：垂直拆分和水平拆分。而拆分的粒度，一般又分为分库和分表，所以组成的拆分策略最终如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.1h7c6b96hrgg.webp)

### 垂直拆分

1. 垂直分库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.191pv8dg3pkw.webp)

垂直分库：以表为依据，根据业务将不同表拆分到不同库中。

特点：

+ 每个库的表结构都不一样。
+ 每个库的数据也不一样。
+ 所有库的并集是全量数据。

2. 垂直分表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.53kx4s5dobg0.webp)

垂直分表：以字段为依据，根据字段属性将不同字段拆分到不同表中。

特点：

+ 每个表的结构都不一样。
+ 每个表的数据也不一样，一般通过一列（主键/外键）关联。
+ 所有表的并集是全量数据。

### 水平拆分

1. 水平分库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.5xzqp4zd4900.webp)

水平分库：以字段为依据，按照一定策略，将一个库的数据拆分到多个库中。

特点：

+ 每个库的表结构都一样。
+ 每个库的数据都不一样。
+ 所有库的并集是全量数据。

2. 水平分表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.6nde0aiacxc0.webp)

水平分表：以字段为依据，按照一定策略，将一个表的数据拆分到多个表中。

特点：

+ 每个表的表结构都一样。
+ 每个表的数据都不一样。
+ 所有表的并集是全量数据。

> 在业务系统中，为了缓解磁盘IO及CPU的性能瓶颈，到底是垂直拆分，还是水平拆分；具体是分库，还是分表，都需要根据具体的业务需求具体分析。

### 实现技术

+ `shardingJDBC`：基于AOP原理，在应用程序中对本地执行的SQL进行拦截，解析、改写、路由处理。需要自行编码配置实现，只支持java语言，性能较高。
+ `MyCat`：数据库分库分表中间件，不用调整代码即可实现分库分表，支持多种语言，性能不及前者。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.138hdd539txc.webp)

本次课程，我们选择了是MyCat数据库中间件，通过MyCat中间件来完成分库分表操作。

## MyCat概述

### 介绍

Mycat是开源的、活跃的、基于Java语言编写的MySQL<mark>数据库中间件</mark>。可以像使用mysql一样来使用mycat，对于开发人员来说根本感觉不到mycat的存在。

开发人员只需要连接MyCat即可，而具体底层用到几台数据库，每一台数据库服务器里面存储了什么数据，都无需关心。 具体的分库分表的策略，只需要在MyCat中配置即可。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.38jnz8if0080.webp)

优势：

+ 性能可靠稳定
+ 强大的技术团队
+ 体系完善
+ 社区活跃

### 下载

下载地址：[http://dl.mycat.org.cn/](http://dl.mycat.org.cn/)

### 安装

Mycat是采用java语言开发的开源的数据库中间件，支持Windows和Linux运行环境，下面介绍MyCat的Linux中的环境搭建。我们需要在准备好的服务器中安装如下软件。

+ MySQL
+ JDK
+ Mycat

| 服务器         | 安装软件   | 说明              |
| -------------- | ---------- | ----------------- |
| 192.168.91.166 | JDK、Mycat | MyCat中间件服务器 |
| 192.168.91.166 | MySQL      | 分片服务器        |
| 192.168.91.167 | MySQL      | 分片服务器        |
| 192.168.91.168 | MySQL      | 分片服务器        |

+ [jdk安装步骤](/pages/600247/#安装新的jdk)
+ 安装Mycat

+ 使用XFTP工具将下载好的文件上传到Linux系统上。
+ 使用解压命令

```sh
tar -zxvf Mycat-server-1.6.7.3-release-20190828135747-linux.tar.gz -C /usr/local
```

### 目录介绍

```sh
[root@MySQL-Master mycat]# ll
总用量 12
drwxr-xr-x 2 root root  190 10月  6 11:36 bin
drwxrwxrwx 2 root root    6 7月  18 2019 catlet
drwxrwxrwx 4 root root 4096 10月  6 11:36 conf
drwxr-xr-x 2 root root 4096 10月  6 11:36 lib
drwxrwxrwx 2 root root    6 8月  28 2019 logs
-rwxrwxrwx 1 root root  227 8月  28 2019 version.txt
```

bin : 存放可执行文件，用于启动停止mycat

conf：存放mycat的配置文件

lib：存放mycat的项目依赖包（jar）

logs：存放mycat的日志文件

+ 由于mycat中的mysql的JDBC驱动包版本比较低，所以我们将它删去，下载8.0版本的

```sh
cd /usr/local/mycat/lib/
rm -rf mysql-connector-java-5.1.35.jar
```

+ [mysql驱动包下载地址](https://downloads.mysql.com/archives/c-j/)

+ 将下载好的驱动包通过XFTP工具上传到Linux系统的/usr/local/mycat/lib/目录。

