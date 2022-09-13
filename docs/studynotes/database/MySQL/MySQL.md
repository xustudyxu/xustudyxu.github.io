---
title: MySQL-简介
date: 2022-01-24 09:17:58
permalink: /pages/e72480/
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL-简介

[学习视频地址](https://www.bilibili.com/video/BV1fh411y7R8?from=search&seid=8859201345785431941&spm_id_from=333.337.0.0)

[[toc]]

## 数据库三层结构

1. <font color=#DC4040 size=4 face="黑体">所谓安装Mysql数据库，就是在主机安装一个数据库管理系统(DBMS)，这个管理程序可以管理多个数据库。DBMS(database manage system)</font>
2. <font color=#DC4040 size=4 face="黑体">一个数据库中可以创建多个表,以保存数据(信息)。</font>
3. <font color=#DC4040 size=4 face="黑体">数据库管理系统(DBMS)、数据库和表的关系如图所示:示意图</font>

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/01.png)

## 数据在数据库中的存储方式

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/02.png)

## SQL语句分类

+ <font color=#DC4040 size=4 face="黑体">DDL:数据定义语句[create表，库...]</font>
+ <font color=#DC4040 size=4 face="黑体">DML:数据操作语句[增加insert,修改update，删除delete]</font>
+ <font color=#DC4040 size=4 face="黑体">DQL:数据查询语句[select ]</font>
+ <font color=#DC4040 size=4 face="黑体">DCL:数据控制语句[管理数据库:比如用户权限grant revoke ]</font>

## 创建数据库

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/03.png)

```sql
#演示数据库的操作
# 创建一个名称为frx_db01的数据库。[图形化和指令 演示]

#使用指定创建数据库
CREATE DATABASE frx_db01;

#删除数据库
DROP DATABASE frx_db01;

# 创建一个使用utf8字符集的frx_db02数据库
CREATE DATABASE frx_db02  CHARACTER SET utf8

# 创建一个使用utf8字符集，并带校队规则的frx_db03数据库
CREATE DATABASE frx_db03 CHARACTER SET utf8 COLLATE utf8_bin
#校对规则 utf8_bin 区分大小写 默认utf8_general_ci 不区分大小写
#如果数据库下面的表没有指定字符集和校对规则，以它的数据库校对规则为准
#下面是一条SQL语句，select 查询 * 表示所有字段
SELECT * FROM t1 
WHERE NAME='tom'


	
```

## 查看、删除数据库

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/04.png)

```sql
# 演示删除和查询数据库
# 查看当前数据库服务器中的所有数据库
SHOW DATABASES

#查看前面创建的frx_db01数据库的定义信息
SHOW CREATE DATABASE frx_db01

#说明 在创建数据库，表的时候，为了规避关键字，可以使用反引号解决
CREATE DATABASE `CREATE`

#删除前面创建的frx_db01数据库
DROP DATABASE frx_db01
```

## 备份恢复数据库

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/05.png)

```sql
#练习：database03.sq1 备份hsp_db02 和 hsp_db03 库中的数据，并恢复

#备份，要在Dos下执行mysqldump指令其实在mysql安装目录\bin
#这个备份文件，就是对应的sql语句
mysqldump -u root -p -B frx_db02 frx_db03 >d:\\bak.sql

DROP DATABASE frx_db03;

#恢复数据库(注意：使用 mysql -u root -p  进入Mysql命令行执行)
source d:\\bak.sql
#第二个恢复方法，直接将bak.sql的内容放到查询编辑器中，执行
```

## 创建表

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/06.png)

```sql
#指令创建表
#注意：hsp_db02创建表时，要根据需保存的数据创建相应的列，并根据数据的类型定义相应的列类
#id           整形
#name         字符串
#password     字符串
#birthday     日期
CREATE TABLE `USER`(
	id INT,
	`name` VARCHAR(255),
	`password` VARCHAR(255),
	`birthday` DATE)
	CHARACTER SET utf8 COLLATE utf8_bin ENGINE INNODB;
```

## Mysql 常用数据类型(列类型)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/07.png)

### 数值型(整数)的基本使用

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/08.png)

```sql
# 演示整形的使用 
# 使用 tinyint 来演示范围
# 表的字符集，校验规则，存储引擎，老师使用默认
#1.如果没有指定 unsigned，则TINYINT就是有符号
#2.如果指定 unsigned，则TINYINT就是无符号
CREATE TABLE t3 (
	id TINYINT);
	
CREATE TABLE t4 (
	id TINYINT UNSIGNED);	
INSERT INTO t3 VALUES(127);#添加语句

SELECT * FROM t3

INSERT INTO t4 VALUES(0);

SELECT * FROM t4
```

### 整型如何定义一个无符号的整数

+ <font color=#DC4040 size=4 face="黑体">create table t10(id tinyint);//默认是有符号的</font>
+ <font color=#DC4040 size=4 face="黑体">create table t11(id tinyint unisigned);//无符号的</font>

### 数值型(bit)的使用

1.基本使用

+ **mysql>create table t05(num bit(8));**
+ **mysql> insert into t05 (1,3);**
+ **mysql> insert into t05 values(2,65);**
  2. 细节说明bit.sql
     + **bit字段显示时,按照位的方式显示**.
     + **查询的时候仍然可以用使用添加的数值**
     + **如果一个值只有0.1可以考虑使用bit(1),可以节约空间**
     + **位类型。M指定位数，默认值1，范围1-64**
     + 使用不多.

```sql
# 演示bit类型使用
# 说明
#1.bit(m) m在1-64
#2.添加数据 范围 按照你给的位数来确定，比如m=8 表示一个字节 0~255
#3.显示按照bit
#4.查询时，仍然可以按照数来查询
CREATE TABLE t05 (num  BIT(8));
INSERT INTO t05 VALUES(255);
SELECT * FROM t05;
SELECT * FROM t05 WHERE num = 1;

```

### 数值型(小数)的基本使用

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/09.png)

```sql
# 演示decimal类型、float、double使用

# 创建表
CREATE TABLE t06(
	num1 FLOAT,
	num2 DOUBLE,
	num3 DECIMAL(30,20));
# 添加数据
 INSERT INTO t06 VALUES(88.12345678912345,88.12345678912345,88.12345678912345);
 SELECT * FROM t06;
 
# decimal 可以存放很大的数
CREATE TABLE t07(
	num DECIMAL(65));
INSERT INTO t07 VALUES(999999999999999999999888888888888888888887777777777777776666666);

SELECT * FROM t07;

CREATE TABLE t08(
	num BIGINT UNSIGNED);
INSERT INTO t08 VALUES(999999999999999999999888888888888888888887777777777777776666666);
SELECT * FROM t08;
	
```

### 字符串的基本使用

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/11.png)

```sql
# 演示字符串类型的使用 char varchar
# 注释快捷键 shift+ctrl+c 取消注释 shift+ctrl+r
#  CHAR（size)
#  固定长度字符串 最大255 字符
#  VARCHAR(size) 0-65535
#  可变长度字符串 最大65532字节[utf-8编码最大21844字符 1-3个字节用于记录大小]
#  如果表的编码是 utf8 varchar(size) size=(65535-3)/3=21844
#  如果的编码是   gbk  varchar(size) size=(65535-3)/2=32766
CREATE TABLE t09(
	`name` CHAR(255));
	
CREATE TABLE t10(
	`name` VARCHAR(32766)) CHARSET gbk;
	
DROP TABLE t10;
```

### 字符串使用细节

![12](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/12.png)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/13.png)

```sql
# 演示字符串的使用细节
# char(4)和varchar(4)这个表4示的是字符，而不是字节，不区分是汉字还是字母
CREATE TABLE t11(
	`name` CHAR(4));
INSERT INTO t11 VALUES('你好你好');
SELECT * FROM t11;

CREATE TABLE t12(
	`name` VARCHAR(4));
INSERT INTO t12 VALUES('ab北京');
SELECT * FROM t12;

# 如果varchar 不够用，可以考虑使用mediumtext 或者 longtext,
# 如果想简单点，可以直接使用text
CREATE TABLE t13 (content TEXT,content2 MEDIUMTEXT, content3 LONGTEXT);
INSERT INTO t13 VALUES('韩顺平教育','韩顺平教育100','韩顺平教育1000~');
SELECT * FROM t13;
```

### 日期类型的基本使用

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/14.png)

```sql
# 演示时间相关的类型
# 创建一张表，date,datatime,timestamp
CREATE TABLE t14(
	birthday DATE, -- 生日
	job_time DATETIME, -- 记录年月日 时分秒
	login_time TIMESTAMP
	NOT NULL DEFAULT CURRENT_TIMESTAMP
	ON UPDATE CURRENT_TIMESTAMP);-- 登陆时间，如果希望login_time自动更新，需要配置
	
SELECT * FROM t14;
INSERT INTO t14(birthday,job_time)
	VALUE('2022-11-11','2022-11-11 10:10:10');
	-- 如果我们更新 t14表的某条记录，login_time列会自动的以当前时间进行更新
```

## 创建表练习

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/15.png)

```sql
# 创建表的课堂练习
-- 字段 属性
-- Id   整形
-- name 字符型
-- sex  字符型
-- birthday   日期型(date)
-- entry_date 日期型(date)
-- job  字符型
-- Salary     小数型
-- resume     文本型
CREATE TABLE `emp`(
	id INT,
	NAME VARCHAR(32),
	sex CHAR(1),
	birthday DATE,
	entry_date DATETIME,
	job VARCHAR(32),
	salary DOUBLE,
	`resume` TEXT) CHARSET utf8 COLLATE utf_8 ENGINE INNODB;
	
	
```

## 修改表-基本介绍

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/16.png)

## 修改表-课堂练习

+ 应用实例
  + 员工表emp的上增加一个image列，varchar类型(要求在resume后面).
  + 修改job列，使其长度为60。
  + 删除sex列
  + 表名改为employee.
  + 修改表的字符集为utf8
  + 列名name修改为user_name

alter table user change column name username varchar(20);

```sql
# 修改表的操作
-- 员工表emp的上增加一个image列，varchar类型(要求在resume后面)
ALTER TABLE emp 
	ADD image VARCHAR(32) NOT NULL DEFAULT ''
	AFTER RESUME
	
DESC employee -- 显示表结构，可以查看表的所有列

-- 修改job列，使其长度`emp`为60
ALTER TABLE emp
	MODIFY job VARCHAR(60) NOT NULL DEFAULT ''
	
-- 删除sex列。
ALTER TABLE emp
	DESC sex
	
-- 表名改为employee
RENAME TABLE emp TO employee

-- 修改表的字符集为utf8
ALTER TABLE employee CHARACTER SET utf8

-- 列名name修改位user_name
ALTER TABLE employee 
	CHANGE `name` user_name VARCHAR(32) NOT NULL DEFAULT ''
```






