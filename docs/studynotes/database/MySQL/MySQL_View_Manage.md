---
title: MySQL 视图与管理
date: 2022-09-13 21:58:01
permalink: /database/MySQL/MySQL_View_Manage
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 视图与管理

[[toc]]

## 视图(view)

### 看需求

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/63.png)

### 基本概念

1. <font color=#DC4040 size=4 face="黑体">视图是一个虚拟表，其内容由查询定义。同真实的表一样，视图包含列,其数据来自对应的真实表(基表)</font>
2. 视图和基表关系的示意图

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/64.png)

### 视图的基本使用

1. <font color=#DC4040 size=4 face="黑体">create view视图名as select语句</font>
2. <font color=#DC4040 size=4 face="黑体">alter view视图名as select语句   --更新成新的视图</font>
3. <font color=#DC4040 size=4 face="黑体">SHOW CREATE VIEW 视图名</font>
4. <font color=#DC4040 size=4 face="黑体">drop view视图名1,视图名2</font>

```sql
-- 视图的使用
-- 创建一个视图 emp_view01,只能查询emp表的(emp、ename、job和deptno)信息


-- 创建视图
CREATE VIEW emp_view01
	AS
	SELECT empno,ename,job,deptno FROM emp;
	
	
-- 查看视图
DESC emp_view01

SELECT  * FROM emp_view01
SELECT empno,job FROM emp_view01;

-- 查看创建视图的指令
SHOW CREATE VIEW emp_view01
-- 删除视图
DROP VIEW emp_view01
```

### 视图细节讨论

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/65.png)

```sql
-- 视图的细节
-- 1.创建视图后，到数据库去看，对应视图只有一个视图结构文件(形式:视图名.frm)
-- 2.视图的数据变化会影响到基表，基表的数据变化也会影响到视图[insert update delete ]

-- 修改视图
UPDATE emp_view01 
	SET job='manager' 
	WHERE empno=7369
	
SELECT * FROM emp
SELECT * FROM emp_view01

-- 修改基本表，会影响到视图
UPDATE  emp
	SET job='SALESMAN'
	WHERE empno=7369
	
	
-- 3.视图中可以使用视图，比如emp_view 01视图中，选出empno,和ename 作出新视图
 DESC	emp_view01
 
 CREATE VIEW emp_view02
	AS
	SELECT empno,ename FROM emp_view01

SELECT * FROM emp_view02
```

### 视图最佳实践

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/66.png)

### 视图课堂练习

> 针对emp , dept,和salgrade张三表.创建一个视图emp_view03，可以显示雇员编号，雇员名，雇员部门名称和薪水级别[即使用三张表，构建一个视图] view02.sql

```sql
-- 视图的练习
-- 针对 emp,dept,和salgrade 张三表，创建一个视图 emp_view03
-- 可以显示雇员编号，雇员名，雇员部门名称和薪水级别[即使用三张表，构建一个视图] view02.sql
/*
分析：使用三表联合查询，得到结果

*/

CREATE VIEW emp_view03
	AS
    SELECT  empno,ename,dname,grade
	FROM emp,dept,salgrade 
	WHERE emp.deptno=dept.deptno AND 
	(sal BETWEEN losal AND hisal)
	
DESC emp_view03

SELECT  * FROM emp_view03
```

## Mysql管理

### Mysql 用户

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/67.png)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/68.png)

### 创建用户

<font color=#DC4040 size=4 face="黑体">create user  '用户名 '@'允许登录位置'identified by   ‘密码'  </font>

说明:创建用户,同时指定密码

### 删除用户

<font color=#DC4040 size=4 face="黑体">drop user ‘用户名’@’允许登录位置’;</font>

### 用户修改密码

修改自己的密码:
<font color=#DC4040 size=4 face="黑体">set password = password('密码');</font>
修改他人的密码（需要有修改用户密码权限):
<font color=#DC4040 size=4 face="黑体">set password for '用户名'@'登录位置'= password(密码');</font>

### mysql中的权限

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/71.png)

### 给用户授权

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/70.png)

### 回收用户权限

基本语法：<font color=#DC4040 size=4 face="黑体">revoke权限列表on库.对象名from '用户名"@"登录位置';</font>

### 权限生效指令

如果权限没有生效，可以执行下面命令.

- 基本语法:
  <font color=#DC4040 size=4 face="黑体">FLUSH PRIVILEGES;</font>

### 课堂练习题

> 创建一个用户(你的名字，拼音)，密码123，并且只可以从本地登录，不让远程登录mysql
> 创建库和表testdb下的news表,要求:使用root用户创建
> 给用户分配查看news表和添加数据的权限
> 测试看看用户是否只有这几个权限
> 修改密码为abc ,要求:使用root用户完成重新登录
> 示回收权限
> 使用root 用户删除你的用户 演示回收权限

```sql
-- 演示用户权限的管理
-- 创建用户 rongxu 密码 123，从本地登录
CREATE USER 'rongxu'@'localhost ' IDENTIFIED BY '123'

-- 使用root 用户创建 testdb，表news
CREATE DATABASE testdb
CREATE TABLE news(	
	id INT,
	content VARCHAR(32))
	
-- 添加一条测试数据
INSERT INTO news VALUES(100,'北京新闻');
SELECT * FROM news

-- 给 rongxu 分配查看 news 表和添加news的权限
GRANT SELECT,INSERT
	ON testdb.news
	TO 'rongxu'@'localhost'
	
-- 可以增加权限
GRANT UPDATE
	ON testdb.news
	TO 'rongxu'@'localhost'
	
-- 修改rongxu密码为abc
SET PASSWORD FOR 'rongxu'@'localhost' =PASSWORD('abc')

-- 回收rongxu用户在testdb.news表的所有权限
REVOKE SELECT,UPDATE,INSERT ON testdb.news FROM 'rongxu'@'localhost'
REVOKE ALL testdb.news FROM 'rongxu'@'localhost'

-- 删除 rongxu用户
DROP USER 'rongxu'@'localhost'
```

### 细节说明

1. <font color=#DC4040 size=4 face="黑体">在创建用户的时候，如果不指定Host,则为%，%表示表示所有IP都有连接权限create user XXX;</font>
2. <font color=#DC4040 size=4 face="黑体">你也可以这样指定 create user 'xxx' @'192.168.1.%’表示xxx用户在192.168.1.*的ip可以登录mysql</font>
3. <font color=#DC4040 size=4 face="黑体">在删除用户的时候，如果host 不是%,需要明确指定‘用户'@'host值'</font>

```sql
-- 在创建用户的时候，如果不指定Host,则为%，%表示表示所有IP都有连接权限
-- create user xXx;
CREATE USER jack;

SELECT `host`,`user` FROM mysql.user


-- 你也可以这样指定
-- create user 'xxx' @'192.168.1.%’表示 xxx用户在192.168.1.*的ip可以登录mysql

CREATE USER 'smith'@'192.168.1.%'
-- 在删除用户的时候，如果host 不是%,需要明确指定‘用户'@'host值'
 
DROP USER jack  -- 默认就是 DROP USER 'jack'@'%'

DROP USER 'smith'@'192.168.1.%'
```

