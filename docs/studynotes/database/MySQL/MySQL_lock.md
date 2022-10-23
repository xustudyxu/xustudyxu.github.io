---
title: MySQL 锁
date: 2022-10-01 22:16:57
permalink: /database/MySQL/MySQL_lock
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 锁

[[toc]]

## 概述

锁是计算机协调多个进程或线程并发访问某一资源的机制。在数据库中，除传统的计算资源（`CPU、RAM、I/O`）的争用以外，数据也是一种供许多用户共享的资源。如何保证数据并发访问的一致性、有效性是所有数据库必须解决的一个问题，锁冲突也是影响数据库并发访问性能的一个重要因素。从这个角度来说，锁对数据库而言显得尤其重要，也更加复杂。

MySQL中的锁，按照锁的粒度分，分为以下三类：

+ 全局锁：锁定数据库中的所有表。
+ 表级锁：每次操作锁住整张表。
+ 行级锁：每次操作锁住对应的行数据。

## 全局锁

### 介绍

全局锁就是对整个数据库实例加锁，加锁后整个实例就处于只读状态，后续的DML的写语句，DDL语句，已经更新操作的事务提交语句都将被阻塞。

其典型的使用场景是做全库的逻辑备份，对所有的表进行锁定，从而获取一致性视图，保证数据的完整性。

为什么全库逻辑备份，就需要加全就锁呢？

A. 我们一起先来分析一下不加全局锁，可能存在的问题。

假设在数据库中存在这样三张表: tb_stock 库存表，tb_order 订单表，tb_orderlog 订单日志表。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221001/image.4ireueq20ec0.webp)

+ 在进行数据备份时，先备份了tb_stock库存表。
+ 然后接下来，在业务系统中，执行了下单操作，扣减库存，生成订单（更新tb_stock表，插入tb_order表）。
+ 然后再执行备份 tb_order表的逻辑。
+ 业务中执行插入订单日志操作。
+ 最后，又备份了tb_orderlog表。

此时备份出来的数据，是存在问题的。因为备份出来的数据，tb_stock表与tb_order表的数据不一致(有最新操作的订单信息,但是库存数没减)。

那如何来规避这种问题呢? 此时就可以借助于MySQL的全局锁来解决。

B. 再来分析一下加了全局锁后的情况

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221001/image.4izhidiw1ti0.webp)

对数据库进行进行逻辑备份之前，先对整个数据库加上全局锁，一旦加了全局锁之后，其他的DDL、DML全部都处于阻塞状态，但是可以执行DQL语句，也就是处于只读状态，而数据备份就是查询操作。那么数据在进行逻辑备份的过程中，数据库中的数据就是不会发生变化的，这样就保证了数据的一致性和完整性。

### 语法

1. 加全局锁

```sql
flush tables with read lock;
```

2. 数据备份

```sql
mysqldump -uroot –p1234 itcast > itcast.sql
```

3. 释放锁

```sql
unlock tables;
```

###  特点

数据库中加全局锁，是一个比较重的操作，存在以下问题：

+ 如果在主库上备份，那么在备份期间都不能执行更新，业务基本上就得停摆。
+ 如果在从库上备份，那么在备份期间从库不能执行主库同步过来的二进制日志（binlog），会导致主从延迟。

在InnoDB引擎中，我们可以在备份时加上参数 --single-transaction 参数来完成不加锁的一致性数据备份。

```sql
mysqldump --single-transaction -uroot –p123456 itcast > itcast.sql
```

## 表级锁

### 介绍

表级锁，每次操作锁住整张表。锁定粒度大，发生锁冲突的概率最高，并发度最低。应用在MyISAM、InnoDB、BDB等存储引擎中。

对于表级锁，主要分为以下三类：

+ 表锁
+ 元数据锁（meta data lock，MDL）
+ 意向锁

### 表锁

对于表锁，分为两类：

+ 表共享读锁（read lock）
+ 表独占写锁（write lock）

语法：

+ 加锁：lock tables 表名... read/write。
+ 释放锁：unlock tables / 客户端断开连接 。

特点:

A. 读锁

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.22qu9jlh84w0.webp)

左侧为客户端一，对指定表加了读锁，不会影响右侧客户端二的读，但是会阻塞右侧客户端的写。

测试:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221023/image.68kspc8r9rs0.webp)

B.写锁

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.69e8kif6xq40.webp)

左侧为客户端一，对指定表加了写锁，会阻塞右侧客户端的读和写。

测试:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.67yjllpu1ok0.webp)

::: tip 结论

读锁不会阻塞其他客户端的读，但是会阻塞写。写锁既会阻塞其他客户端的读，又会阻塞其他客户端的写。

:::

### 元数据锁

meta data lock , 元数据锁，简写MDL。

MDL加锁过程是系统自动控制，无需显式使用，在访问一张表的时候会自动加上。MDL锁主要作用是维护表元数据的数据一致性，在表上有活动事务的时候，不可以对元数据进行写入操作。**为了避免DML与DDL冲突，保证读写的正确性**。

这里的元数据，大家可以简单理解为就是一张表的表结构。 也就是说，某一张表涉及到未提交的事务时，是不能够修改这张表的表结构的。

在MySQL5.5中引入了MDL，当对一张表进行增删改查的时候，加MDL读锁(共享)；当对表结构进行变更操作的时候，加MDL写锁(排他)。

常见的SQL操作时，所添加的元数据锁：

| 对应SQL                                        | 锁类型                                  | 说明                                             |
| ---------------------------------------------- | --------------------------------------- | ------------------------------------------------ |
| lock tables xxx read/write                     | SHARED_READ_ONLY / SHARED_NO_READ_WRITE |                                                  |
| select 、select ... lock in share mode         | SHARED_READ                             | 与SHARED_READ、SHARED_WRITE兼容，与EXCLUSIVE互斥 |
| insert 、update、delete、select ... for update | SHARED_WRITE                            | 与SHARED_READ、SHARED_WRITE兼容，与EXCLUSIVE互斥 |
| alter table ...                                | EXCLUSIVE                               | 与其他的MDL都互斥                                |

演示：

当执行SELECT、INSERT、UPDATE、DELETE等语句时，添加的是元数据共享锁（SHARED_READ /
SHARED_WRITE），之间是兼容的。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.ya2d7wavuvk.webp)

当执行SELECT语句时，添加的是元数据共享锁（SHARED_READ），会阻塞元数据排他锁（EXCLUSIVE），之间是互斥的。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221011/image.394qjn5ovva0.webp)

我们可以通过下面的SQL，来查看数据库中的元数据锁的情况：

```sql
select object_type,object_schema,object_name,lock_type,lock_duration from performance_schema.metadata_locks;
```

我们在操作过程中，可以通过上述的SQL语句，来查看元数据锁的加锁情况。

```sql {5-7}
mysql> select object_type,object_schema,object_name,lock_type,lock_duration from performance_schema.metadata_locks;
+-------------+--------------------+----------------+--------------+---------------+
| object_type | object_schema      | object_name    | lock_type    | lock_duration |
+-------------+--------------------+----------------+--------------+---------------+
| TABLE       | MySQL_Advanced     | tb_user        | SHARED_READ  | TRANSACTION   |
| TABLE       | MySQL_Advanced     | tb_user        | SHARED_READ  | TRANSACTION   |
| TABLE       | MySQL_Advanced     | tb_user        | SHARED_WRITE | TRANSACTION   |
| TABLE       | MySQL_Advanced     | user_logs      | SHARED_WRITE | TRANSACTION   |
| TABLE       | performance_schema | metadata_locks | SHARED_READ  | TRANSACTION   |
+-------------+--------------------+----------------+--------------+---------------+
5 rows in set (0.00 sec)
mysql> alter table tb_user add column java int;
...阻塞
```

```sql {12-14}
-- 另开一个客户端窗口
mysql> select object_type,object_schema,object_name,lock_type,lock_duration from performance_schema.metadata_locks;
+-------------+--------------------+------------------------+---------------------+---------------+
| object_type | object_schema      | object_name            | lock_type           | lock_duration |
+-------------+--------------------+------------------------+---------------------+---------------+
| TABLE       | MySQL_Advanced     | tb_user                | SHARED_READ         | TRANSACTION   |
| GLOBAL      | NULL               | NULL                   | INTENTION_EXCLUSIVE | STATEMENT     |
| BACKUP LOCK | NULL               | NULL                   | INTENTION_EXCLUSIVE | TRANSACTION   |
| SCHEMA      | MySQL_Advanced     | NULL                   | INTENTION_EXCLUSIVE | TRANSACTION   |
| TABLE       | MySQL_Advanced     | tb_user                | SHARED_UPGRADABLE   | TRANSACTION   |
| TABLESPACE  | NULL               | MySQL_Advanced/tb_user | INTENTION_EXCLUSIVE | TRANSACTION   |
| TRIGGER     | MySQL_Advanced     | tb_user_insert_trigger | EXCLUSIVE           | TRANSACTION   |
| TRIGGER     | MySQL_Advanced     | tb_user_update_trigger | EXCLUSIVE           | TRANSACTION   |
| TRIGGER     | MySQL_Advanced     | tb_user_delete_trigger | EXCLUSIVE           | TRANSACTION   |
| TABLE       | MySQL_Advanced     | #sql-261d_18           | EXCLUSIVE           | STATEMENT     |
| TABLE       | MySQL_Advanced     | tb_user                | EXCLUSIVE           | TRANSACTION   |
| TABLE       | performance_schema | metadata_locks         | SHARED_READ         | TRANSACTION   |
+-------------+--------------------+------------------------+---------------------+---------------+
12 rows in set (0.00 sec)
```

### 意向锁

1. 介绍

为了避免DML在执行时，加的行锁与表锁的冲突，在InnoDB中引入了意向锁，使得表锁不用检查每行数据是否加锁，使用意向锁来减少表锁的检查。

假如没有意向锁，客户端一对表加了行锁后，客户端二如何给表加表锁呢，来通过示意图简单分析一下：

首先客户端一，开启一个事务，然后执行DML操作，在执行DML语句时，会对涉及到的行加行锁。

当客户端二，想对这张表加表锁时，会检查当前表是否有对应的行锁，如果没有，则添加表锁，此时就会从第一行数据，检查到最后一行数据，效率较低。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.2ow7a20u3go0.webp)

有了意向锁之后 :

客户端一，在执行DML操作时，会对涉及的行加行锁，同时也会对该表加上意向锁。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.3qyixden7980.webp)

而其他客户端，在对这张表加表锁的时候，会根据该表上所加的意向锁来判定是否可以成功加表锁，而不用逐行判断行锁情况了。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.4kcp8w59518.webp)

2. 分类

+ **意向共享锁(IS): 由语句select ... lock in share mode添加** 。**与表锁共享锁(read)兼容，与表锁排他锁(write)互斥**。
+ **意向排他锁(IX)**: **由insert、update、delete、select...for update添加 **。**与表锁共享锁(read)及排他锁(write)都互斥，意向锁之间不会互斥**。

> 一旦事务提交了，意向共享锁、意向排他锁，都会自动释放。

可以通过以下SQL，查看意向锁及行锁的加锁情况：

```sql
select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks;
```

演示：

A. 意向共享锁与表读锁是兼容的

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.5th2uhlbios0.webp)

B. 意向排他锁与表读锁、写锁都是互斥的

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.1c5a0mcxhhsw.webp)

##  行级锁

### 介绍

行级锁，每次操作锁住对应的行数据。锁定粒度最小，发生锁冲突的概率最低，并发度最高。应用在InnoDB存储引擎中。

InnoDB的数据是基于索引组织的，行锁是通过对索引上的索引项加锁来实现的，而不是对记录加的锁。对于行级锁，主要分为以下三类：

+ 行锁（Record Lock）：锁定单个行记录的锁，防止其他事务对此行进行update和delete。在RC、RR隔离级别下都支持。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.rtov5kk31cw.webp)

+ 间隙锁（Gap Lock）：锁定索引记录间隙（不含该记录），确保索引记录间隙不变，防止其他事务在这个间隙进行insert，产生幻读。在RR隔离级别下都支持。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.24mdbeh7vt4.webp)

+ 临键锁（Next-Key Lock）：行锁和间隙锁组合，同时锁住数据，并锁住数据前面的间隙Gap。在RR隔离级别下支持。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.4swt8pe4slc0.webp)



### 行锁

1. 介绍

InnoDB实现了以下两种类型的行锁：

+ 共享锁（S）：允许一个事务去读一行，阻止其他事务获得相同数据集的排它锁。
+ 排他锁（X）：允许获取排他锁的事务更新数据，阻止其他事务获得相同数据集的共享锁和排他
  锁。

两种行锁的兼容情况如下:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.4mxrlvwh3940.webp)

常见的SQL语句，在执行时，所加的行锁如下：

| SQL                           | 行锁类型                            | 说明                                     |
| ----------------------------- | ----------------------------------- | ---------------------------------------- |
| INSERT ...                    | 排他锁                              | 自动加锁                                 |
| UPDATE ...                    | 排他锁                              | 自动加锁                                 |
| DELETE ...                    | 排他锁                              | 自动加锁                                 |
| SELECT（正常）                | <font color="red">不加任何锁</font> |                                          |
| SELECT ... LOCK IN SHARE MODE | 共享锁                              | 需要手动在SELECT之后加LOCK IN SHARE MODE |
| SELECT ... FOR UPDATE         | 排他锁                              | 需要手动在SELECT之后加FOR UPDATE         |

2. 演示

默认情况下，InnoDB在 REPEATABLE READ事务隔离级别运行，InnoDB使用 next-key 锁进行搜索和索引扫描，以防止幻读。

+ 针对唯一索引进行检索时，对已存在的记录进行等值匹配时，将会自动优化为行锁。
+ InnoDB的行锁是针对于索引加的锁，不通过索引条件检索数据，那么InnoDB将对表中的所有记录加锁，此时 就会升级为表锁。

可以通过以下SQL，查看意向锁及行锁的加锁情况：

```sql
select object_schema,object_name,index_name,lock_type,lock_mode,lock_data from performance_schema.data_locks;
```

示例演示

数据准备:

```sql
CREATE TABLE `stu` (
	`id` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
	`name` varchar(255) DEFAULT NULL,
	`age` int NOT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4;
INSERT INTO `stu` VALUES (1, 'tom', 1);
INSERT INTO `stu` VALUES (3, 'cat', 3);
INSERT INTO `stu` VALUES (8, 'rose', 8);
INSERT INTO `stu` VALUES (11, 'jetty', 11);
INSERT INTO `stu` VALUES (19, 'lily', 19);
INSERT INTO `stu` VALUES (25, 'luci', 25);
```

演示行锁的时候，我们就通过上面这张表来演示一下。

A. **普通的select语句，执行时，不会加锁**。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.6dggge8wtr00.webp)

B. select...lock in share mode，加共享锁，**共享锁与共享锁之间兼容**。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.5xvi9xjut140.webp)

共享锁与排他锁之间互斥。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.2z0m89b3tw40.webp)

客户端一获取的是id为1这行的共享锁，客户端二是可以获取id为3这行的排它锁的，因为不是同一行数据。 而如果客户端二想获取id为1这行的排他锁，会处于阻塞状态，以为共享锁与排他锁之间互斥。

C. **排它锁与排他锁之间互斥**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.1fsq73p1a7vk.webp)

当客户端一，执行update语句，会为id为1的记录加排他锁； 客户端二，如果也执行update语句更新id为1的数据，也要为id为1的数据加排他锁，但是客户端二会处于阻塞状态，因为排他锁之间是互斥的。 直到客户端一，把事务提交了，才会把这一行的行锁释放，此时客户端二，解除阻塞。

D. **无索引行锁升级为表锁**

stu表中数据如下:

```sql
mysql> select * from stu;
+----+-----+-------+
| id | age | name  |
+----+-----+-------+
|  1 |   1 | Java  |
|  3 |   3 | Java  |
|  8 |   8 | rose  |
| 11 |  11 | jetty |
| 19 |  19 | lily  |
| 25 |  25 | luci  |
+----+-----+-------+
6 rows in set (0.00 sec)
```

我们在两个客户端中执行如下操作:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.7iii0c906200.webp)

在客户端一中，开启事务，并执行update语句，更新name为Lily的数据，也就是id为19的记录 。然后在客户端二中更新id为3的记录，却不能直接执行，会处于阻塞状态，为什么呢？

原因就是因为此时，客户端一，根据name字段进行更新时，name字段是没有索引的，如果没有索引，此时行锁会升级为表锁(因为行锁是对索引项加的锁，而name没有索引)。

接下来，我们再针对name字段建立索引，索引建立之后，再次做一个测试：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.9mwkzbcpctc.webp)

此时我们可以看到，客户端一，开启事务，然后依然是根据name进行更新。而客户端二，在更新id为3的数据时，更新成功，并未进入阻塞状态。 这样就说明，我们根据索引字段进行更新操作，就可以避免行锁升级为表锁的情况。

###  间隙锁&临键锁

默认情况下，InnoDB在 REPEATABLE READ事务隔离级别运行，InnoDB使用 next-key 锁进行搜索和索引扫描，以防止幻读。

+ 索引上的等值查询(唯一索引)，给不存在的记录加锁时, 优化为间隙锁 。
+ 索引上的等值查询(非唯一普通索引)，向右遍历时最后一个值不满足查询需求时，next-key lock 退化为间隙锁。
+ 索引上的范围查询(唯一索引)--会访问到不满足条件的第一个值为止。

::: tip 注意:

间隙锁唯一目的是防止其他事务插入间隙。间隙锁可以共存，一个事务采用的间隙锁不会阻止另一个事务在同一间隙上采用间隙锁。

:::

 示例演示

A. **索引上的等值查询(唯一索引)，给不存在的记录加锁时, 优化为**间隙锁 。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.2bg1yvv9ouzo.webp)

B. 索引上的等值查询(非唯一普通索引)，向右遍历时最后一个值不满足查询需求时，next-key lock 退化为间隙锁。 

介绍分析一下：

我们知道InnoDB的B+树索引，叶子节点是有序的双向链表。 假如，我们要根据这个二级索引查询值为18的数据，并加上共享锁，我们是只锁定18这一行就可以了吗？ 并不是，因为是非唯一索引，这个结构中可能有多个18的存在，所以，在加锁时会继续往后找，找到一个不满足条件的值（当前案例中也就是29）。此时会对18加临键锁，并对29之前的间隙加锁。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.2hj4xorarn40.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.56pgq9ibofk0.webp)

C. 索引上的范围查询(唯一索引)--会访问到不满足条件的第一个值为止。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221002/image.6sdod08g3tc0.webp)

查询的条件为id>=19，并添加共享锁。 此时我们可以根据数据库表中现有的数据，将数据分为三个部分：

[19]

(19,25]

(25,+∞]

所以数据库数据在加锁是，就是将19加了行锁，25的临键锁（包含25及25之前的间隙），正无穷的临键锁(正无穷及之前的间隙)。

