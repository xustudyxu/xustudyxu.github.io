---
title: MySQL 存储引擎
date: 2022-09-21 22:34:12
permalink: /database/MySQL/MySQL_Storage_Engine
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 存储引擎

[学习视频地址](https://www.bilibili.com/video/BV1Kr4y1i7ru?p=58&vd_source=6aafd031757cd8c1dbbb98344fb3d363)

[[toc]]

## MySQL 体系结构

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220921/image.281yja2r3g5c.webp)

1. 连接层

最上层是一些客户端和链接服务，包含本地sock 通信和大多数基于客户端/服务端工具实现的类似于
TCP/IP的通信。主要完成一些类似于连接处理、授权认证、及相关的安全方案。在该层上引入了线程
池的概念，为通过认证安全接入的客户端提供线程。同样在该层上可以实现基于SSL的安全链接。服务
器也会为安全接入的每个客户端验证它所具有的操作权限。

2. 服务层

第二层架构主要完成大多数的核心服务功能，如SQL接口，并完成缓存的查询，SQL的分析和优化，部
分内置函数的执行。所有跨存储引擎的功能也在这一层实现，如 过程、函数等。在该层，服务器会解
析查询并创建相应的内部解析树，并对其完成相应的优化如确定表的查询的顺序，是否利用索引等，
最后生成相应的执行操作。如果是select语句，服务器还会查询内部的缓存，如果缓存空间足够大，
这样在解决大量读操作的环境中能够很好的提升系统的性能。

3. 引擎层

存储引擎层， 存储引擎真正的负责了MySQL中数据的存储和提取，服务器通过API和存储引擎进行通
信。不同的存储引擎具有不同的功能，这样我们可以根据自己的需要，来选取合适的存储引擎。数据库
中的索引是在存储引擎层实现的。

4. 存储层

数据存储层， 主要是将数据(如: redolog、undolog、数据、索引、二进制日志、错误日志、查询
日志、慢查询日志等)存储在文件系统之上，并完成与存储引擎的交互。

和其他数据库相比，MySQL有点与众不同，它的架构可以在多种不同场景中应用并发挥良好作用。主要
体现在存储引擎上，插件式的存储引擎架构，将查询处理和其他的系统任务以及数据的存储提取分离。
这种架构可以根据业务的需求和实际需要选择合适的存储引擎。

## 存储引擎介绍

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220921/image.3mofgq8heem0.webp)

大家可能没有听说过存储引擎，但是一定听过引擎这个词，引擎就是发动机，是一个机器的核心组件。
比如，对于舰载机、直升机、火箭来说，他们都有各自的引擎，是他们最为核心的组件。而我们在选择
引擎的时候，需要在合适的场景，选择合适的存储引擎，就像在直升机上，我们不能选择舰载机的引擎
一样。
而对于存储引擎，也是一样，他是mysql数据库的核心，我们也需要在合适的场景选择合适的存储引
擎。接下来就来介绍一下存储引擎。
存储引擎就是存储数据、建立索引、更新/查询数据等技术的实现方式 。存储引擎是基于表的，而不是
基于库的，所以存储引擎也可被称为表类型。我们可以在创建表的时候，来指定选择的存储引擎，如果
没有指定将自动选择默认的存储引擎。

1. 建表时指定存储引擎

```sql
CREATE TABLE 表名(
    字段1 字段1类型 [ COMMENT 字段1注释 ] ,
    ......
    字段n 字段n类型 [COMMENT 字段n注释 ]
) ENGINE = INNODB [ COMMENT 表注释 ] ;
```

2. 查询当前数据库支持的存储引擎

```sql
SHOW ENGINES;
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220921/image.1x1cgtj77p7k.webp)

+ 创建表 my_myisam , 并指定MyISAM存储引擎

```sql
CREATE TABLE my_myisam(
	`id` INT,
	`name` VARCHAR(10)
	)ENGINE = MYISAM;
```

+ 创建表 my_memory , 指定Memory存储引擎

```sql
CREATE TABLE my_memory(
	`id` INT,
	`name` VARCHAR(10)
	)ENGINE = MEMORY;
```

##  存储引擎特点

上面我们介绍了什么是存储引擎，以及如何在建表时如何指定存储引擎，接下来我们就来介绍下来上面
重点提到的三种存储引擎 InnoDB、MyISAM、Memory的特点。

### InnoDB

1. 介绍

InnoDB是一种兼顾高可靠性和高性能的通用存储引擎，在 MySQL 5.5 之后，InnoDB是默认的
MySQL 存储引擎。

2. 特点

+ DML操作**遵循ACID**模型，支持**事务**；
+ **行级锁**，提高并发访问性能；
+ 支持**外键FOREIGN KEY约束**，保证数据的完整性和正确性；

3. 文件

xxx.ibd：xxx代表的是表名，innoDB引擎的每张表都会对应这样一个表空间文件，存储该表的表结
构（frm-早期的 、sdi-新版的）、数据和索引。

参数：innodb_file_per_table

```sql
show variables like 'innodb_file_per_table';
```

| Variable_name         | Value |
| --------------------- | ----- |
| innodb_file_per_table | ON    |

如果该参数开启，代表对于InnoDB引擎的表，每一张表都对应一个ibd文件。 我们直接打开MySQL的
数据存放目录： `D:\DevelopTools\mysql-5.7.19-winx64\data` ， 这个目录下有很多文件
夹，不同的文件夹代表不同的数据库，我们直接打开frx_db02文件夹。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220921/image.4kesau30czu0.webp)

可以看到里面有很多的ibd文件，每一个ibd文件就对应一张表，比如：我们有一张表 account，就有这样的一个account.ibd文件，而在这个ibd文件中不仅存放表结构、数据，还会存放该表对应的索引信息。 而该文件是基于二进制存储的，不能直接基于记事本打开，我们可以使用mysql提供的一个指令 ibd2sdi ，通过该指令就可以从ibd文件中提取sdi信息，而sdi数据字典信息中就包含该表的表结构。

```sh
ibd2sdi account.ibd
```

> 针对MySQL8有效

4. 逻辑存储结构

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220921/image.4je97rm23p80.webp)

+ 表空间 : InnoDB存储引擎逻辑结构的最高层，ibd文件其实就是表空间文件，在表空间中可以包含多个Segment段。
+ 段 : 表空间是由各个段组成的， 常见的段有数据段、索引段、回滚段等。InnoDB中对于段的管理，都是引擎自身完成，不需要人为对其控制，一个段中包含多个区。
+ 区 : 区是表空间的单元结构，每个区的大小为1M。 默认情况下， InnoDB存储引擎页大小为16K， 即一个区中一共有64个连续的页。
+ 页 : 页是组成区的最小单元，**页也是InnoDB 存储引擎磁盘管理的最小单元**，每个页的大小默认为 16KB。为了保证页的连续性，InnoDB 存储引擎每次从磁盘申请 4-5 个区。
+ 行 : InnoDB 存储引擎是面向行的，也就是说数据是按行进行存放的，在每一行中除了定义表时所指定的字段以外，还包含两个隐藏字段(后面会详细介绍)。

### MyISAM

1. 介绍

MyISAM是MySQL早期的默认存储引擎。

2. 特点

不支持事务，不支持外键

支持表锁，不支持行锁

访问速度快

3. 文件

xxx.sdi：存储表结构信息

xxx.MYD: 存储数据

xxx.MYI: 存储索引

### Memory

1. 介绍

Memory引擎的表数据时存储在内存中的，由于受到硬件问题、或断电问题的影响，只能将这些表作为
临时表或缓存使用。

2. 特点

内存存放

hash索引（默认）

3. 文件

xxx.sdi：存储表结构信息

## 区别及特点

| 特点         | InnoDB            | MyISAM | Memory |
| ------------ | ----------------- | ------ | ------ |
| 存储限制     | 64TB              | 有     | 有     |
| 事务安全     | 支持              | -      | -      |
| 锁机制       | 行锁              | 表锁   | 表锁   |
| B+tree索引   | 支持              | 支持   | 支持   |
| Hash索引     | -                 | -      | 支持   |
| 全文索引     | 支持(5.6版本之后) | 支持   | -      |
| 空间使用     | 高                | 底     | N/A    |
| 内存使用     | 高                | 底     | 中等   |
| 批量插入速度 | 低                | 高     | 高     |
| 支持外键     | 支持              | -      | -      |

::: tip 面试题:

InnoDB引擎与MyISAM引擎的区别 ?

①. InnoDB引擎, 支持事务, 而MyISAM不支持。

②. InnoDB引擎, 支持行锁和表锁, 而MyISAM仅支持表锁, 不支持行锁。

③. InnoDB引擎, 支持外键, 而MyISAM是不支持的。

主要是上述三点区别，当然也可以从索引结构、存储限制等方面，更加深入的回答，具体参
考如下官方文档：

[https://dev.mysql.com/doc/refman/8.0/en/innodb-introduction.html](https://dev.mysql.com/doc/refman/8.0/en/innodb-introduction.html)

[https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html](https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html)

:::

## 存储引擎选择

在选择存储引擎时，应该根据应用系统的特点选择合适的存储引擎。对于复杂的应用系统，还可以根据
实际情况选择多种存储引擎进行组合。

+ InnoDB: 是Mysql的默认存储引擎，支持事务、外键。如果应用对事务的完整性有比较高的要
  求，在并发条件下要求数据的一致性，数据操作除了插入和查询之外，还包含很多的更新、删除操
  作，那么InnoDB存储引擎是比较合适的选择。
+ MyISAM ： 如果应用是以读操作和插入操作为主，只有很少的更新和删除操作，并且对事务的完
  整性、并发性要求不是很高，那么选择这个存储引擎是非常合适的。
+ MEMORY：将所有数据保存在内存中，访问速度快，通常用于临时表及缓存。MEMORY的缺陷就是
  对表的大小有限制，太大的表无法缓存在内存中，而且无法保障数据的安全性。

