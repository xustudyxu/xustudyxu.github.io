---
title: MySQL 索引与事务
date: 2022-09-13 21:54:17
permalink: /database/MySQL/MySQL_IndexesAndTransactions
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 索引与事务

[[toc]]

## mysql索引(index)

### 索引快速入门

1. <font color=#DC4040 size=4 face="黑体">说起提高数据库性能,索引是最物美价廉的东西了。不用加内存，不用改程序,不用调sql，查询速度就可能提高百倍干倍。</font>
2. <font color=#DC4040 size=4 face="黑体">没有建立索引的字段，查询起来依旧很慢</font>

### 索引的原理

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/50.png)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/51.png)

1. <font color=#DC4040 size=4 face="黑体">没有索引为什么会慢?因为全表扫描.</font>
2. <font color=#DC4040 size=4 face="黑体">使用索引为什么会快?形成一个索引的数据结构，比如二叉树</font>

- 索引的代价
  1. <font color=#DC4040 size=4 face="黑体">磁盘占用</font>
  2. <font color=#DC4040 size=4 face="黑体">对dml(update delete insert)语句的效率影响,</font>

### 索引的类型

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/52.png)

### 索引使用

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/53.png)

5. **查询索引（三种方式）**

<font color=#DC4040 size=4 face="黑体">show index(ex) from table_name;</font>

<font color=#DC4040 size=4 face="黑体">show keys from table_name;</font>

<font color=#DC4040 size=4 face="黑体">desc table_Name;</font>

```sql
-- 演示mysql的索引的使用
-- 创建索引
CREATE TABLE t25(	
	id INT,
	`name` VARCHAR(32));
	
	
-- 查询表是否有索引
SHOW INDEXES FROM t25;

-- 添加索引
-- 添加唯一索引
CREATE UNIQUE INDEX id_index ON t25(id);

-- 添加普通索引方式1
CREATE INDEX id_index ON t25(id);

-- 如何选择
-- 1.如果某列的值，是不会重复的，则优先考虑使用unique索引,否则使用普通索引

-- 添加普通索引方式2
ALTER TABLE t25 ADD INDEX id_index(id)

-- 添加主键索引
CREATE TABLE t26(	
	id INT ,-- 1. primary key
	`name` VARCHAR(32));
-- 2.
ALTER TABLE t26 ADD PRIMARY KEY(id)

SELECT * FROM t26

-- 删除索引
SELECT * FROM t25
DROP INDEX id_index ON t25


-- 删除主键索引
ALTER TABLE t26 DROP PRIMARY KEY


-- 修改索引，先删除，在添加新的索引
-- 查询索引
-- 1.方式
SHOW INDEX FROM t25
-- 2.方式
SHOW INDEXES FROM t25
-- 3.方式
SHOW KEYS FROM t25
-- 4.方式
DESC t25

-- 创建一张订单表order (id号，商品名,订购人，数量).
-- 要求id号为主键，请使用2种方式来创建主键.
-- (提示:为练习方便，可以是order1 , order2 )
CREATE TABLE ORDER
	( id INT PRIMARY KEY,
	`goods_name` VARCHAR(32),
	person VARCHAR(32),
	num INT);-- 方式一
	
ALTER TABLE ORDER ADD PRIMARY KEY(id) -- 方式二

-- 创建一张特价菜谱表menu(id号，菜谱名,厨师，点餐人身份证，价格).
-- 要求id号为主键，点餐人身份证是unique请使用两种方式
-- 来创建unique.(提示:为练习方便，可以是menu1 , menu2

CREATE TABLE menu(
	id INT,
	`name` VARCHAR(32),
	 厨师 VARCHAR(32),
	身份证 CHAR(18) UNIQUE ,
	price DOUBLE); -- 方式一
CREATE UNIQUE INDEX 身份证 ON menu (身份证)
SHOW INDEX FROM menu


-- 创建一张运动员表sportman (id号，名字，特长).
-- 要求id号为主键，名字为普通索引，
-- 请使用2种方式来创建索引
-- (提示:为练习方便，可以是不同表名sportman1 , sportman2

CREATE TABLE sportman(
	id INT PRIMARY KEY,
	`name` VARCHAR(32),
	hobby VARCHAR(32));
	
CREATE INDEX name_index ON sportman(NAME) -- 方式一
ALTER TABLE sportman ADD INDEX name_index(NAME)-- 方式二
```

### 小结：哪些列上适合使用索引

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/54.png)

## mysql事务

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/55.png)

### 什么是事务

<font color=#DC4040 size=4 face="黑体">事务用于保证数据的一致性,它由一组相关的dml语句组成,该组的dml语句要么全部成功，要么全部失败。如:转账就要用事务来处理,用以保证数据的一致性。</font>

### 事务和锁

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/56.png)

```sql
-- 事务的一个重要的概念和具体操作
-- 演示
-- 1.创建一张测试表
CREATE TABLE t27(
	id INT,
	`name` VARCHAR(32));

-- 2.开始事务
START TRANSACTION
-- 3.设置保存点
SAVEPOINT a
-- 执行dml操作
INSERT INTO t27 VALUES(100,'tom');
SELECT * FROM t27;

SAVEPOINT b
-- 执行dml操作
INSERT INTO t27 VALUES(200,'jack');

-- 回退到b
ROLLBACK TO b
-- 继续回退 a
ROLLBACK TO a
-- 如果这样，表示直接回退到事务开始的状态
ROLLBACK
COMMIT 
```

### 回退事务

<font color=#DC4040 size=4 face="黑体">在介绍回退事务前，先介绍一下保存点(savepoint).保存点是事务中的点.用于取消部分事务，当结束事务时(commit),会自动的删除该事务所定义的所有保存点.当执行回退事务时，通过指定保存点可以回退到指定的点。</font>

### 提交事务

<font color=#DC4040 size=4 face="黑体">使用commit语句可以提交事务.当执行了commit语句子后,会确认事务的变化、结金事除徨专野放锁数据生效。当使用commit语句结束事务子后，其它会话[其他连接]将可以查着到事务变化后的新数据[所有数据就正式生效.]</font>

### 事务细节讨论

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/57.png)

```sql
-- 讨论事务细节
-- 1.如果不开始事务，默认情况下，dml操作是自动提交的，不能回滚
INSERT	INTO t27 VALUES(300,'milan'); -- 自动提交commit

SELECT * FROM t27


-- 2.如果开始一个事务，你没有创建保存点.你可以执行rollback,
-- 默认就是回退到你事务开始的状态.
START	TRANSACTION
INSERT INTO t27 VALUES(400,'king');
INSERT INTO t27 VALUES(500,'scott')
ROLLBACK -- 表示直接回退到事务开始的状态

-- 3.你也可以在这个事务中(还没有提交时),创建多个保存点.
-- 比如: savepoint aaa;执行dml , savepoint bbb;


-- 4.你可以在事务没有提交前，选择回退到哪个保存点.

-- 5.mysql的事务机制需要innodb的存储引擎才可以使用,myisam不支持.
-- 6.开始一个事务start transaction, set autocommit=off;

```

## mysql 事务隔离级别

### 事务隔离级别介绍

1. <font color=#DC4040 size=4 face="黑体">多个连接开启各自事务操作数据库中数据时，数据库系统要负责隔离操作，以保证各个连接在获取数据时的准确性。</font>（通俗解释)
2. 如果不考虑隔离性,可能会引发如下问题:
   - <font color=#DC4040 size=4 face="黑体">脏读</font>
   - <font color=#DC4040 size=4 face="黑体">不可重复读</font>
   - <font color=#DC4040 size=4 face="黑体">幻读</font>

### 查看事务隔离级别

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/58.png)

### 事务隔离级别

概念:Mysql隔离级别定义了**事务与事务之间的隔离程度。**

| Mysql隔离级别(4种)          | 脏读 | 不可重复读 | 幻读 | 加锁读 |
| --------------------------- | ---- | ---------- | ---- | ------ |
| 读未提交(Read uncommited)   | √    | √          | √    | 不加锁 |
| **读已提交(Read commited)** | ×    | √          | √    | 不加锁 |
| 可重复读(Repeatable)        | ×    | ×          | √    | 不加锁 |
| **可串行化(Serializable)**  | ×    | ×          | ×    | 加锁   |

说明：√可能出现 ×不会出现 

### 设置事务隔离级别

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/59.png)

```sql
-- 演示mysql的事务隔离级别

-- 1.开启两个mysql的控制台
-- 2.查看当前mysql的隔离级别
SELECT @@tx_isolation;

-- mysql> SELECT @@tx_isolation;
-- +-----------------+
-- | @@tx_isolation  |
-- +-----------------+
-- | REPEATABLE-READ |
-- +-----------------+

-- 3.把其中一个控制台的隔离级别设置 Read uncommitted
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
-- mysql> SELECT @@tx_isolation;
-- +------------------+
-- | @@tx_isolation   |
-- +------------------+
-- | READ-UNCOMMITTED |
-- +------------------+
-- 1 row in set (0.00 sec)

-- 4.创建表
CREATE TABLE `account`(
	id INT,
	`name` VARCHAR(32),
	money INT);
	
	
-- 查看当前会话隔离级别
SELECT @@tx_isolation;
-- 查看系统当前隔离级别
SELECT @@ global.tx_isplation
-- 设置当前会话隔离级别
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
-- 设置系统当前隔离级别
SET GLOBAL TRANSACTION ISOLATION LEVEL [设置你想设置的级别]
```



![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/60.png)

**左边的事务没有提交，但是右边可以看到左边添加的100用户信息，这就是脏读**

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/61.png)

**左边的事务经过修改和添加，但是提交了，右边依然可以看到修改和添加的信息，这就是不可重复度和幻读，因为左边的提交已经直接影响到了右边的操作。**

## mysql 事务 ACID

### 事务的 acid 特性

1. <font color=#DC4040 size=4 face="黑体">原子性(Atomicity)</font>
   **原子性是指事务是一个不可分割的工作单位，事务中的操作要么都发生，要么都不发生。**
2. <font color=#DC4040 size=4 face="黑体">一致性(Consistency)</font>
   **事务必须使数据库从一个一致性状态变换到另外一个一致性状态**
3. <font color=#DC4040 size=4 face="黑体">隔离性(lsolation)</font>
   **事务的隔离性是多个用户并发访问数据库时，数据库为每一个用户开启的事务，不能被其他事务的操作数据所干扰，多个并发事务之间要相互隔离。**
4. <font color=#DC4040 size=4 face="黑体">持久性(Durability)</font>
   **持久性是指一个事务一旦被提交，它对数据库中数据的改变就是永久性的，接下来即使数据库发生故障也不应该对其有任何影响**