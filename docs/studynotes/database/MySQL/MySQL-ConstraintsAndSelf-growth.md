---
title: MySQL 约束与自增长
date: 2022-09-13 21:52:46
permalink: /database/MySQL/MySQL-ConstraintsAndSelf-growth
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 约束与自增长

[[toc]]

## mysql约束

### 基本介绍

<font color=#DC4040 size=4 face="黑体">约束用于确保数据库的数据满足特定的商业规则。在mysql中，约束包括: not null、unique,primary key,foreign key,和check五种。</font>

### primary key(主键)-基本使用

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/43.png)

- 细节说明:

1. <font color=#DC4040 size=4 face="黑体">primary key不能重复而且不能为null。</font>
2. <font color=#DC4040 size=4 face="黑体">一张表最多只能有一个主键,但可以是复合主键主键的指定方式有两种</font>
3. <font color=#DC4040 size=4 face="黑体">直接在字段名后指定:字段名primakry key在表定义最后写primary key(列名);</font>
4. <font color=#DC4040 size=4 face="黑体">使用desc表名，可以看到primary key的情况.</font>
5. <font color=#DC4040 size=4 face="黑体">在实际开发中，每个表往往都会设计一个主键.</font>

```sql
-- 主键使用


-- id name email
CREATE TABLE t17(
	id INT PRIMARY KEY,-- 表示id列是主键
	`name` VARCHAR(32),
	email VARCHAR(32));
	
-- 主键列的值是不可以
INSERT INTO t17
	VALUES(1,'jack','jack@sohu.com')
INSERT INTO t17
	VALUES(2,'tom','tom@sohu.com')
INSERT INTO t17(
	VALUES(1,'frx','frx@sohu.com')
		
SELECT * FROM t17

-- 主键使用的细节讨论
-- primary key 不能重复且不能为null
INSERT INTO t17(
	VALUES(NULL,'frx','frx@sohu.com')
	
-- 一张表最多只能有一个主键，但可以是复合主键(比如 id+name)
-- 演示复合主键
CREATE TABLE t18(
	id INT ,
	`name` VARCHAR(32) ,
	email VARCHAR(32),
	PRIMARY KEY(id,`name`));-- 这里就是复合主键

INSERT INTO t18
	VALUES(1,'tom','tom@sohu.com');
INSERT INTO t18
	VALUES(1,'jack','jack@sohu.com');
SELECT * FROM t18

-- 主键的指定方式 有两种
-- 直接在字段名后指定：字段名 primary key
CREATE TABLE t19(
	id INT,
	`name` VARCHAR(32) PRIMARY KEY,
	email VARCHAR(32));
	
-- 在表定义最后写 primary key(列名);
CREATE TABLE t20(
	id INT,
	`name` VARCHAR(32) ,
	email VARCHAR(32),
	PRIMARY KEY(`name`));
	
-- 使用desc 表名，可以看到primary key的情况下
DESC t20 -- 查看t20 表的结果，显示约束情况
DESC t18	
```

### not null和unique(唯一)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/44.png)

```sql
-- unique的使用

CREATE TABLE t21(
	id INT UNIQUE,-- 表示id列是不可以重复的
	`name` VARCHAR(32),
	email VARCHAR(32)
	);
	
INSERT INTO t21
	VALUES(1,'jack','jack@sohu.com');
INSERT INTO t21
	VALUES(1,'tom','tom@sohu.com');	
	
-- unique的使用细节
-- 1.如果没有指定 not null,则unique字段可以有多个null
-- 如果一个列(字段)，是unique not null 使用效果类似 primary key
INSERT INTO t21
	VALUES(NULL,'tom','tom@sohu.com');
-- 2.一张表可以有多个unique字段
CREATE TABLE t22(
	id INT UNIQUE,-- 表示id列是不可以重复的
	`name` VARCHAR(32) UNIQUE, -- 表示name不可以重复
	email VARCHAR(32)
	);
DESC t22
```

### foreign key(外键)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/45.png)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/46.png)

```sql
-- 外键演示

-- 创建 主表 my_class
CREATE TABLE my_class(
	id INT PRIMARY KEY, -- 班级编号
	`name` VARCHAR(32) NOT NULL DEFAULT '');
	
-- 创建 从表 my_stu
CREATE TABLE my_stu(
	id INT PRIMARY KEY,-- 学生编号
	`name` VARCHAR(32) NOT NULL DEFAULT '',
	class_id INT, -- 学生所在班级编号 
	-- 下面指定外键关系
	FOREIGN KEY (class_id) REFERENCES my_class(id))
	
-- 测试数据
INSERT INTO my_class
	VALUES(100,'java'),(200,'web');
SELECT * FROM my_class	

INSERT INTO my_stu
	VALUES(1,'tom',100);
INSERT INTO my_stu
	VALUES(2,'jack',200);
INSERT INTO my_stu
	VALUES(4,'marry',NULL);	-- 可以。外键没有写 not null
INSERT INTO my_stu
	VALUES(3,'frx',300);-- 添加失败 300号班机不存在
SELECT * FROM my_stu
SELECT * FROM my_class

-- 一旦建立主外键关系，数据不能随意删除了
DELETE FROM my_class
	WHERE id=100 -- 没有任何一条记录指向 主表100,就可以删去
```

### check

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/47.png)

```sql
-- 演示check的使用

-- mysql5.7目前还不支持check,只做语法校验，但不会生效

-- 测试
CREATE TABLE t23(
	id INT PRIMARY KEY,
	`name` VARCHAR(32),
	sex VARCHAR(6) CHECK (sex IN('man','woman')),
	sal DOUBLE CHECK(sal>1000 AND sal<2000));
	
-- 添加数据
INSERT INTO t23
	VALUES(1,'jack','mid',1);
SELECT * FROM t23
```

### 商店售货系统表设计案例

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/48.png)

```sql
CREATE TABLE goods_(
	goods_id INT PRIMARY KEY,
	goods_name VARCHAR(64) NOT NULL DEFAULT '',
	unitprice  DECIMAL(10,2) NOT NULL 
		CHECK (unitprice>=1.0 AND unitprice <=9999.99),
	category   INT NOT NULL DEFAULT 0,
	provider   VARCHAR(64) NOT NULL);
	
CREATE TABLE customer(
	customer_id CHAR(8) PRIMARY KEY,
	`name` VARCHAR(64) NOT NULL DEFAULT '',
	address VARCHAR(64) NOT NULL DEFAULT '',
	email VARCHAR(64) UNIQUE NOT NULL,
	sex ENUM('男','女')NOT NULL, -- 这里使用枚举类型
	card_Id CHAR(18));
	
CREATE TABLE purchase(
	order_id INT UNSIGNED PRIMARY KEY,
	customer_id CHAR(8) NOT NULL DEFAULT '', -- 指向customer表的customer_id
	goods_id INT NULL DEFAULT 0,-- 指向goods表的goods_id 
	nums INT NOT NULL DEFAULT 0,
	FOREIGN KEY (customer_id) REFERENCES customer(customer_id),
	FOREIGN KEY (goods_id) REFERENCES goods_(goods_id));
	DESC customer
	DESC goods_
	DESC purchase
```

## 自增长

### 自增长基本介绍

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/49.png)

### 自增长使用细节

1. <font color=#DC4040 size=4 face="黑体">一般来说自增长是和primary key配合使用的</font>
2. <font color=#DC4040 size=4 face="黑体">自增长也可以单独使用[但是需要配合一个unique]</font>
3. <font color=#DC4040 size=4 face="黑体">自增长修饰的字段为整数型的(虽然小数也可以但是非常非常少这样使用)</font>
4. <font color=#DC4040 size=4 face="黑体">自增长默认从1开始,你也可以通过如下命令修改altertable表名auto increment=新的开始值;</font>
5. <font color=#DC4040 size=4 face="黑体">如果你添加数据时，给自增长字段(列)指定的有值，则以指定的值为准,如果指定了自增长，一般来说，就按照自增长的规则来添加数据</font>

```sql
-- 演示自增长的使用
-- 创建表
CREATE TABLE t24(
	id INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(32) NOT NULL DEFAULT '',
	`name` VARCHAR(32) NOT NULL DEFAULT '');
DESC t24

-- 测试自增长的使用
INSERT INTO t24
	VALUES(NULL,'jack@qq.com','jack')
	
INSERT INTO t24
	(email,`name`)VALUES('jack@qq.com','jack');

SELECT * FROM t24

-- 修改默认的自增长开始值
ALTER TABLE t25 AUTO_INCREMENT =100
CREATE TABLE t25(
	id INT PRIMARY KEY AUTO_INCREMENT,
	email VARCHAR(32) NOT NULL DEFAULT '',
	`name` VARCHAR(32) NOT NULL DEFAULT '');
INSERT INTO t25
	VALUES(NULL,'jack@qq.com','jack');
INSERT INTO t25
	VALUES(666,'jack@qq.com','jack');
INSERT INTO t25
	VALUES(NULL,'mary@qq.com','mary');
SELECT * FROM t25;

-- 如果指定了自增长，一般来说，就按照自增长的规则来添加数据
```

