---
title: MySQL 表类型和存储引擎
date: 2022-09-13 21:57:01
permalink: /database/MySQL/MySQL_Table_type_storage_engine
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 表类型和存储引擎

[[toc]]

## mysql 表类型和存储引擎

### 基本介绍

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/62.png)

### 主要的存储引擎/表类型特点

| 特点           | Myism | InnoDB | Memory | Archive |
| -------------- | :---: | :----: | :----: | :-----: |
| 批量插入的速度 |  高   |   底   |   高   | 非常高  |
| 事务安全       |       |  支持  |        |         |
| 全文索引       | 支持  |        |        |         |
| 锁机制         | 表锁  |  行锁  |  表锁  |  行锁   |
| 存储限制       | 没有  |  64TB  |   有   |  没有   |
| B树索引        | 支持  |  支持  |  支持  |         |
| 哈希索引       |       |  支持  |  支持  |         |
| 集群索引       |       |  支持  |        |         |
| 数据缓存       |       |  支持  |  支持  |         |
| 索引缓存       | 支持  |  支持  |  支持  |         |
| 数据可压缩     | 支持  |        |        |  支持   |
| 空间使用       |  底   |   高   |  N/A   |   底    |
| 内存使用       |  底   |   高   |  中等  |   底    |
| 支持外键       |       |  支持  |        |         |

### 细节说明

重点介绍三种:MyISAM、InnoDB、MEMORY

1. <font color=#DC4040 size=4 face="黑体">MylSAM不支持事务、也不支持外键，但其访问速度快，对事务完整性没有要求。</font>
2. <font color=#DC4040 size=4 face="黑体">InnoDB存储引擎提供了具有提交、回滚和崩溃恢复能力的事务安全。但是比起MylSAM存储引擎，InnoDB写的处理效率差一些并且会占用更多的磁盘空间以保留数据和索引。</font>
3. <font color=#DC4040 size=4 face="黑体">MEMORY存储引擎使用存在内存中的内容来创建表。每个MEMORY表只实际对应-个磁盘文件。MEMORY类型的表访问非常得快，因为它的数据是放在内存中的，并且默认使用HASH索引。但是一旦MySQL服务关闭，表中的数据就会丢失掉,表的结构还在。</font>

### 三种存储引擎表使用案例

```sql
-- 查看所有的存储引擎
SHOW ENGINES
-- innodb 存储引擎，是前面使用过
-- 1.支持事务 2.支持外键 3.支持行级锁

-- myisam 存储引擎
CREATE TABLE t28(
	id INT,
	`name` VARCHAR(32)) ENGINE MYISAM
	
-- 1.添加速度快 2.不支持外键和事务 3.支持表级锁

START TRANSACTION
SAVEPOINT t1
INSERT INTO t28 VALUES(1,'jack');
SELECT *FROM t28
ROLLBACK TO t1 -- 没有回滚成功


-- memory 存储引擎
-- 1.数据存储在内存中[关闭mysql服务，数据丢失，但是表结构还在] 
-- 2.执行速度很快(没有IO读写) 3.默认支持索引(hash表)
CREATE TABLE t29(
	id INT,
	`name` VARCHAR(32)) ENGINE MEMORY
	
INSERT INTO t29
	VALUES(1,'tom'),(2,'jack'),(3,'frx')
	
SELECT *FROM t29

-- 修改存储引擎
ALTER TABLE t29 ENGINE =INNODB
```

### 如何选择表的存储引擎

1. <font color=#DC4040 size=4 face="黑体">如果你的应用不需要事务，处理的只是基本的CRUD操作，那么MylSAN是不二选择,速度快</font>
2. <font color=#DC4040 size=4 face="黑体">如果需要支持事务，选择lnnoDB.</font>
3. <font color=#DC4040 size=4 face="黑体">Memory存储引擎就是将数据存储在内存中，由于没有磁盘I./O的等待速度极快。但由于是内存存储引擎，所做的任何修改在服务器重启后都将消失。</font>(经典用法 用户的在线状态().)

