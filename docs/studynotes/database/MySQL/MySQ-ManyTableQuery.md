---
title: MySQL 多表查询
date: 2022-09-13 21:50:04
permalink: /database/MySQL/MySQ-ManyTableQuery
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 多表查询

[[toc]]

## mysql多表查询

### 问题的引出(重点，难点)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/40.png)

### 说明

<font color=#DC4040 size=4 face="黑体">多表查询是指基于两个和两个以上的表查询.在实际应用中,查询单个表可能不能满足你的需求.</font>

### 多表查询练习

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/41.png)

```sql
-- 多表查询
-- 显示雇员名，雇员工资及所在部门的名字【笛卡尔积】
SELECT * FROM salgrade
SELECT * FROM emp
SELECT * FROM dept
/*
   分析
   1.雇员名，雇员工资 来自 emp表
   2.部门的名字，来自dept表
   (1)从第一张表中，取出一行和第二张表的每一行进行组合，返回结果[含有两张表的所有列]
   (2)一共返回的记录数第一张表行数*第二张表的行数
   (3)这样多表查询默认处理返回的结果，称为【笛卡尔积】
   (4)解决这个多表的关键就是要写出正确的过滤条件 where
   3.当我们需要指定显示某个表的列时，需要 表.列名
   
   
*/
SELECT  ename,sal,dname,emp.deptno 
	FROM emp,dept
	WHERE emp.deptno=dept.deptno
-- 小技巧：多表查询的条件下不能少于 表的个数-1，否则会出现笛卡尔积

-- 如何显示部门号为10的部门名、员工名和工资
SELECT  ename,sal,dname,emp.deptno 
	FROM emp,dept
	WHERE emp.deptno=dept.deptno AND emp.deptno=10
	
-- 显示各个员工的姓名，工资，及其工资的级别
SELECT ename,sal,grade
	FROM emp,salgrade
	WHERE sal >= losal AND sal<=hisal;
	
-- 显示雇员名，雇员工资及所在部门的名字，并按部门排序
  SELECT ename,sal,dname,emp.deptno
		FROM emp,dept
		WHERE emp.deptno=dept.deptno
		ORDER BY emp.deptno DESC
```

### 自连接

<font color=#DC4040 size=4 face="黑体">自连接是指在同一张表的连接查询[将同一张表看做两张表].</font>

```sql
-- 多表查询的 自连接

-- 思考题：显示公司员工名字和他的上级名字
SELECT *FROM emp
-- 分析：员工名字 在emp,上级的名字 emp
-- 员工和上级是通过 emp表的 mgr 列并联
-- 小结：1.把同一张表当做两张表来使用
--       2.需要给表取别名[表别名]
--       3.列名不明确，可以指定列的别名，列名 AS 列的别名
SELECT worker.ename AS '职员名',boss.ename AS '上级名'
	FROM emp worker,emp boss
	WHERE worker.mgr=boss.empno;
```

## mysql表子查询

### 什么是子查询

<font color=#DC4040 size=4 face="黑体">子查询是指嵌入在其它 sql 语句中的 select 语句,也叫嵌套查询</font>

### 单行子查询

<font color=#DC4040 size=4 face="黑体">单行子查询是指只返回一行数据的子查询语句</font>

> 请思考：如何显示与 SMITH 同一部门的所有员工?

### 多行子查询

<font color=#DC4040 size=4 face="黑体">多行子查询指返回多行数据的子查询 ,使用关键字 in</font>

> 如何查询和部门10的工作相同的雇员的名字、岗位、工资、部门号、但是不含10自己的。

```sql
-- 子查询的演示
-- 请思考：如何显示与SMITH 同一部门的所有员工

/*
  1.先查询到SMITH的部门号得到
  2.把上面的select语句当做一个子查询来使用
*/
SELECT deptno
	FROM emp
	WHERE ename='SMITH'
	
SELECT *
	FROM emp
	WHERE deptno =(
		SELECT deptno
		FROM emp
		WHERE ename='SMITH'
	)
-- 课堂练习：如何查询和部门10的工作相同的雇员的
--   名字、岗位、工资、部门号、但是不含10部门自己的

/*
   1.查询到10号部门有哪些工作
   2.把上面查询的结果当做子查询
*/
SELECT DISTINCT job 
	FROM emp
	WHERE deptno=10;
	
-- 下面语句完整
SELECT ename,job,sal,deptno
	FROM emp
	WHERE job IN (
		SELECT DISTINCT job 
		FROM emp
		WHERE deptno=10
	)AND deptno !=10
```

### 在多行子查询中使用 all 操作符

```sql
-- all 和 any 的使用

-- 请思考：显示工资比部门30的所有员工的工资高的员工的姓名、工资和部门号

SELECT ename,sal,deptno
	FROM emp
	WHERE sal> ALL(
		SELECT sal
		FROM emp
		WHERE deptno =30)
		
-- 可以这样写
SELECT ename,sal,deptno
	FROM emp
	WHERE sal> (
		SELECT MAX(sal)
		FROM emp
		WHERE deptno =30)
		

```

### 在多行子查询中使用 any 操作符

```sql
-- 请思考：如何显示工资比部门30的其中一个员工的工资高的员工的姓名、工资和部门号

SELECT ename,sal,deptno
	FROM emp
	WHERE sal> ANY(
		SELECT sal
		FROM emp
		WHERE deptno =30)
-- 可以这样写
SELECT ename,sal,deptno
	FROM emp
	WHERE sal> (
		SELECT MIN(sal)
		FROM emp
		WHERE deptno =30)
```

### 多列子查询

<font color=#DC4040 size=4 face="黑体">多列子查询是指查询返回多个列数据的子查询语句。</font>

```sql
-- 多列子查询
-- 请思考如何查询与allen的部门和岗位完全相同的所有雇员(并且不含smith本人)
-- (字段1，字段2...)=(select 字段1 ，字段2 from...)

-- 分析：1.得到allen的部门和岗位

SELECT deptno,job
	FROM emp
	WHERE ename='ALLEN'
	
-- 分析：2.把上面的查询当做子查询来使用，并且使用多列子查询的语法进行匹配
SELECT * 	
	FROM emp
	WHERE (deptno,job)=(
		SELECT deptno,job
		FROM emp
		WHERE ename='ALLEN'
		)AND ename != 'ALLEN'
		
-- 请查询和宋江同学数学，英语，语文
-- 成绩完全相同的同学		
SELECT *
	FROM student
	WHERE (chinese,english,math)=(	
		SELECT chinese,english,math 
		FROM student
		WHERE `name`='宋江');
```

### 在 from 子句中使用子查询

> 请思考:查找每个部门工资高于本部门平均工资的人的资料
>
> 这里要用到数据查询的小技巧，把一个子查询当作一个临时表使用
> 请思考:查找每个部门工资最高的人的详细资料

```sql
-- 子查询 练习

-- 请思考：查找每个部门工资高于本部门平均工资的人的资料
-- 这里要用到数据查询的小技巧，把一个子查询当做一个临时表使用

-- 1.先得到每个部门的 部门号和对应的平均工资
SELECT deptno,AVG(sal)
	FROM emp
	GROUP BY deptno
	
	
-- 2.把上面的结果当做子查询，和emp进行多表查询
SELECT  ename,sal,temp.avg_sal,emp.deptno
	FROM emp,(
		SELECT deptno,AVG(sal) AS avg_sal
		FROM emp
		GROUP BY deptno
		)temp
		WHERE emp.deptno=temp.deptno AND emp.sal>temp.avg_sal
		
-- 查找每个部门工资最高的人详细资料
SELECT  ename,sal,temp.max_sal,emp.deptno
	FROM emp,(
		SELECT deptno,MAX(sal) AS max_sal
		FROM emp
		GROUP BY deptno
		)temp
		WHERE emp.deptno=temp.deptno AND emp.sal=temp.max_sal
		
-- 查询每个部门的信息(包括：部门名，编号，地址)和人员数量
-- 1.部门名，编号，地址
-- 2.各个部门的数量
SELECT COUNT(*),deptno 
	FROM emp
	GROUP BY deptno
	
	
	
SELECT dname,dept.deptno ,loc,tmp.per_num AS '人数'
	FROM dept,(
		SELECT COUNT(*) AS per_num,deptno 
		FROM emp
		GROUP BY deptno
		) tmp
		WHERE tmp.deptno=dept.deptno
		
-- 还有一种写法 表.* 表示将该所有列都显示出来
-- 在多表查询中，当多个表的列不重复时，才可以直接写列名

SELECT tmp.* ,dname,loc
	FROM dept,(
		SELECT COUNT(*) AS per_num,deptno
		FROM emp
		GROUP BY deptno
		) tmp
		WHERE tmp.deptno=dept.deptno	

```

## 表复制

### 自我复制数据(蠕虫复制)

<font color=#DC4040 size=4 face="黑体">有时，为了对某个sql语句进行效率测试，我们需要海量数据时，可以使用此法为表创建海量数据。</font>

> 思考题:如何删除掉一张表重复记录

```sql
-- 表的复制
-- 为了对某个sql语句进行效率测试，我们需要海量数据时，可以使用此法为表创建海量数据

CREATE TABLE my_tab01(
	id INT,
	`name` VARCHAR(32),
	sal DOUBLE,
	job VARCHAR(32),
	deptno INT);
DESC my_tab01
SELECT * FROM my_tab01

-- 演示如何自我复制
-- 1.先把emp表的记录复制到my_tab01
INSERT INTO my_tab01
	(id,`name`,sal,job,deptno)
	SELECT empno,ename,sal,job,deptno FROM emp;
	
-- 2.自我复制
INSERT INTO my_tab01
	SELECT * FROM my_tab01;
	
-- 如何删除一张表重复记录
-- 1.先创建一张表 my_tab02,
-- 2.让 my_tab02 有重复的记录

CREATE TABLE my_tab02 LIKE emp;-- 这个语句把emp表的结构(列)，复制到my_tab02

DESC my_tab02; 

INSERT INTO my_tab02
	SELECT * FROM emp;
	
SELECT * FROM my_tab02;
-- 3.考虑去重
/*
	(1)先创建一张临时表，my_tmp,该表的结构和 my_tab02一样
	(2)把my_tmp的记录通过 distinct关键字 处理后，把记录复制到my_tmp
	(3)清除掉my_tab02 记录
	(4)把 my_tmp 表的记录复制到my_tab02
	(5)drop 掉 临时表my_tmp
*/
DROP TABLE my_tmp
-- (1)先创建一张临时表，my_tmp,该表的结构和 my_tab02一样
CREATE TABLE my_tmp LIKE my_tab02
-- (2)把my_tmp的记录通过 distinct关键字 处理后，把记录复制到my_tmp
INSERT INTO my_tmp
	SELECT DISTINCT * FROM my_tab02
-- (3)清除掉my_tab02 记录
DELETE FROM my_tab02
-- (4)把 my_tmp 表的记录复制到my_tab02
INSERT INTO my_tab02
	SELECT * FROM my_tmp
-- (5)drop 掉 临时表my_tmp
DROP TABLE my_tmp

SELECT * FROM my_tab02


```

## 合并查询

### 介绍

<font color=#DC4040 size=4 face="黑体">有时在实际应用中，为了合并多个select语句的结果，可以使用集合操作符号union , union all </font>

1. **nuion all**
   - <font color=#DC4040 size=4 face="黑体">该操作符用于取得两个结果集的并集。当使用该操作符时，不会取消重复行。</font>
2. **union**
   - <font color=#DC4040 size=4 face="黑体">该操作赋与union all相似,但是会自动去掉结果集中重复行。</font>.

```sql
-- 合并查询

SELECT ename,sal,job FROM emp WHERE sal>2500 -- 5

SELECT ename,sal,job FROM emp WHERE job='MANAGER' -- 3

-- union all 就是将两个查询结果合并，不会去重
SELECT ename,sal,job FROM emp WHERE sal>2500
UNION ALL
SELECT ename,sal,job FROM emp WHERE job='MANAGER'-- 8

-- union  就是两个查询结果合并，会去重，不会出现同步记录
SELECT ename,sal,job FROM emp WHERE sal>2500
UNION 
SELECT ename,sal,job FROM emp WHERE job='MANAGER'-- 6
```

### 外连接

1. <font color=#DC4040 size=4 face="黑体">左外连接(如果左侧的表完全显示我们就说是左外连接) select...from 表1 left join 表2 on条件 [表1：左表 表2：右表]</font>
2. <font color=#DC4040 size=4 face="黑体">右外连接(如果右侧的表完全显示我们就说是右外连接) select...from 表1 rigth join 表2 on条件 [表1：左表 表2：右表]</font>

> -- 表stu                                 --表exam
>
> id       name                           id      grade
>
> 1         Jack                              1         56
>
> 2         Tom                             2         76
>
> 3         Kity                             11          8
>
> 4         nono

3. **使用左连接(显示所有人的成绩，如果没有成绩，也要显示该人的姓名和id号,成绩显示为空)**

```sql
-- 外连接
-- 比如:列出部门名称和这些部门的员工名称和工作，同时要求 显示出那些没有员工的部门

-- 使用我们学习过的多表查询的sql,看看效果

SELECT dname,ename,job 
	FROM emp,dept
	WHERE emp.deptno=dept.deptno
	ORDER BY dname
	
-- 先创建 stu
CREATE TABLE stu(
	id INT,
	`name` VARCHAR(32));
INSERT INTO stu VALUES(1,'Jack'),(2,'tom'),(3,'kity'),(4,'nono');
SELECT * FROM stu;

-- 创建exam
CREATE TABLE exam(
	id INT,
	grade INT);
INSERT INTO exam VALUES(1,56),(2,76),(11,8);
SELECT * FROM exam;


-- 使用左连接
-- (显示所有人的成绩，如果没有成绩，也要显示该人的姓名和id号，成绩显示为空)
SELECT `name`,stu.id,grade
	FROM stu,exam
	WHERE stu.id=exam.id;
	
-- 改成左外连接
SELECT `name`,stu.id,grade
	FROM stu LEFT JOIN exam
	ON stu.id=exam.id;
	
-- 使用右外连接(显示所有人的成绩，如果没有名字匹配，显示为空)
-- 即：右边的表(exam)和左表没有匹配的记录，也会把右表的记录显示出来
SELECT `name`,stu.id,grade
	FROM stu RIGHT JOIN exam
	ON stu.id=exam.id;
```

### 课堂练习

> 列出部门名称和这些部门的员工信息(名字和工作)，同时列出那些没有员工的部门名。5min
> 1．使用左外连接实现
>
> 2.使用右外连接实现

```sql
-- 列出部门名称和这些部门的员工信息(名字和工作)，
-- 同时列出那些没有员工的部门名。5min
-- 1使用左外连接实现
SELECT dname,ename,job
	FROM dept LEFT JOIN emp
	ON emp.deptno=dept.deptno

-- 2.使用右外连接实现	
SELECT dname,ename,job
	FROM emp RIGHT JOIN dept
	ON emp.deptno=dept.deptno
```

