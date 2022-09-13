---
title: MySQL-CRUD
date: 2022-09-13 21:45:45
permalink: /database/MySQL/MySQL-CRUD
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL-CRUD

[[toc]]

## 数据库 CRUD语句

1. **Insert语句        (添加数据)**
2. **Update语句     (更新数据)**
3. **Delete语句       (删除语句)**
4. **Select语句        (查找语句)**

## Insert 语句

### 使用 INSERT 语句向表中插入数据

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/18.png)

```sql
# 练习insert语句
-- 创建一张商品表 goods(id int,goods_name varchar(10),price double);
-- 添加2条记录
CREATE TABLE goods(
	id INT,
	goods_name VARCHAR(10),
	price DOUBLE);
-- 添加数据
INSERT INTO goods( id,goods_name,price)
	VALUES(10,'华为手机',2000);
	
INSERT INTO goods(id,goods_name,price)
	VALUES(20,'苹果手机',3000);
	
SELECT * FROM goods
	

```

### 细节说明

```sql
# 说明insert 语句的细节
-- 1.插入的数据应与字段的数据类型相同
-- 比如把'abc'添加到int 类型会错误
INSERT INTO `goods`(id,goods_name,price)
	VALUES('30','小米手机',2000);
	
-- 2.数据的长度应在列的规定范围内，例如：不能将一个长度为80的字符串加入到长度为40的列中。
INSERT INTO `goods`(id,goods_name,price)
	VALUES(40,'vivo手机vivo手机',3000);
	
-- 3.在values中列出的数据位置必须与被加入的列的位置相对应。
INSERT INTO `goods`(id,goods_name,price)
	VALUES('vivo手机',40,2000);
	
-- 4.字符和日期型数据应包含在单引号中。
INSERT INTO `goods`(id,goods_name,price)
	VALUES(40,'vivo手机',3000);
	
-- 5.列可以插入空值[前提是该字段允许为空],insert into table value(null)
INSERT INTO `goods`(id,goods_name,price)
	VALUES(40,'vivo手机',NULL);
	
-- 6.insert into tab_name(列名...) values (),(),() 形式添加多条记录
INSERT INTO `goods`(id,goods_name,price)

	VALUES(40,'三星手机',2300)，VALUES(40,'海尔手机',1800);
-- 7.如果是给表中的所有字段添加数据，可以不写前面的字段名称
INSERT INTO `goods`VALUES(45,'华为手机',1500);

-- 8.默认值的使用，当不给某个字段值时，如果有默认值就会添加，否则报错
--   如果某个字段没有指定 not null,那么当添加数据时，没有给定值，则会给默认值
--   如果我们希望指定某个列默认值，
INSERT INTO `goods`(id,goods_name)
	VALUES(80,'格力手机');
SELECT * FROM goods;
INSERT INTO `goods2`(id,goods_name)
	VALUES(80,'格力手机');
SELECT * FROM goods2;
```

## update 语句

### 使用 update 语句修改表中数据

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/19.png)

### 基本使用

要求:在上面创建的employee表中修改表中的纪录

1. 将所有员工薪水修改为5000元。
2. 将姓名为小妖怪的员工薪水修改为3000元。
3. 将老妖怪的薪水在原有基础上增加1000元。

```sql
-- 演示update语句
-- 要求：在上面创建的employee表中修改表中的记录

-- 1.将所有员工薪水修改为5000元[如果没有带where条件，会修改所有的记录，因此要小心]
UPDATE employee SET salary =5000

-- 2.将姓名为 小妖怪 的员工薪水修改为3000元
UPDATE employee 
	SET salary = 3000 
	WHERE user_name='小妖怪';
	
-- 3.将老妖怪 的薪水在原有基础上增加1000元
INSERT INTO employee 
	VALUES(200,'老妖怪','男','2001-02-11','2021-01-05 10:10:10','寻路的',5000,'哈哈','e:\\b.jpg');
UPDATE employee
	SET salary=salary+1000
	WHERE user_name='老妖怪';
	
-- 可以修改多个列
UPDATE employee
	SET salary=salary+1000,job='出主意'
	WHERE user_name='老妖怪';
SELECT * FROM employee;
```

### 使用细节

1. <font color=#DC4040 size=4 face="黑体">UPDATE语法可以用新值更新原有表行中的各列。</font>
2. <font color=#DC4040 size=4 face="黑体">SET子句指示要修改哪些列和要给予哪些值。</font>
3. <font color=#DC4040 size=4 face="黑体">WHERE子句指定应更新哪些行。如没有WHERE子句,则更新所有的行(记录)，因此老师提醒一定小心。</font>
4. <font color=#DC4040 size=4 face="黑体">如果需要修改多个字段,可以通过set字段1=值1,字段2=值2.….</font>

## delete 语句

### 使用 delete 语句删除表中数据

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/21.png)

```sql
 -- delete 语句演示
 -- 删除表中名称为'老妖怪'的记录
 DELETE FROM employee
	WHERE user_name='老妖怪'
	
 -- 删除表中所有记录
 DELETE FROM employee;
 
 -- delete语句不能删除某一列的值(可使用update 设为null或者'')
 UPDATE employee SET job ='' WHERE user_name='老妖怪';
 SELECT * FROM employee
 
 -- 要删除表 
 DROP TABLE employee;
```

### 使用细节

1. <font color=#DC4040 size=4 face="黑体">如果不使用where子句，将删除表中所有数据。</font>
2. <font color=#DC4040 size=4 face="黑体">Delete语句不能删除某一列的值(可使用update设为null或者")</font>
3. <font color=#DC4040 size=4 face="黑体">使用delete语句仅删除记录，不删除表本身。如要删除表，使用drop table语句。drop table表名;</font>

## select 语句

### 基本语法

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/22.png)

### 注意事项 

1. <font color=#DC4040 size=4 face="黑体">Select 指定查询哪些列的数据。</font>
2. <font color=#DC4040 size=4 face="黑体">column指定列名。</font>
3. <font color=#DC4040 size=4 face="黑体">*号代表查询所有列。</font>
4. <font color=#DC4040 size=4 face="黑体">From指定查询哪张表。</font>
5. <font color=#DC4040 size=4 face="黑体">DISTINCT可选，指显示结果时，是否去掉重复数据</font>

### 课堂练习

> 查询表中所有学生的信息。
>
> 查询表中所有学生的姓名和对应的英语成绩。
>
> 过滤表中重复数据distinct。
>
> 要查询的记录,每个字段都相同，才会去重

```sql
-- select 语句
CREATE TABLE student(
	id INT NOT NULL DEFAULT 1,
	NAME VARCHAR(20) NOT NULL DEFAULT '',
	chinese FLOAT NOT NULL DEFAULT 0.0,
	english FLOAT NOT NULL DEFAULT 0.0,
	math FLOAT NOT NULL DEFAULT 0.0);
INSERT INTO student(id,NAME,chinese,english,math) VALUES(1,'jack',89,78,90);
INSERT INTO student(id,NAME,chinese,english,math) VALUES(2,'张飞',67,98,56);
INSERT INTO student(id,NAME,chinese,english,math) VALUES(3,'宋江',87,78,77);
INSERT INTO student(id,NAME,chinese,english,math) VALUES(4,'关羽',85,78,90);
INSERT INTO student(id,NAME,chinese,english,math) VALUES(5,'赵云',89,78,94);
INSERT INTO student(id,NAME,chinese,english,math) VALUES(6,'欧阳锋',69,76,90);
INSERT INTO student(id,NAME,chinese,english,math) VALUES(7,'黄蓉',59,73,96);

SELECT * FROM student

-- 查询表中所有学生的信息
SELECT * FROM student;

-- 查询表中所有学生的姓名和对应的英语成绩
SELECT `name`,english FROM student;

-- 过滤表中重复数据 distinct
SELECT DISTINCT english FROM student;

-- 要查询的记录，每个字段都相同，才会去重
SELECT DISTINCT `name`,english FROM student;

```

### 使用表达式对查询的列进行运算

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/23.png)

### 在 select 语句中可使用 as 语句

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/24.png)

### 练习

> 统计每个学生的总分
> 在所有学生总分加10分的情况
>
> 使用别名表示学生分数。
>
> 在赵云的总分上增加60%
>
> 统计关羽的总分。
> 使用别名表示学生的数学分数。

```sql
-- select 语句使用
-- 统计每个学生的总分
SELECT `name`,(chinese+english+math) FROM student;

-- 在所有学生总分加10分的情况
SELECT `name`,(chinese+english+math+10) AS total_score FROM student;
-- 使用别名表示学生分数

SELECT `name` AS '名字',(chinese+english+math) AS total_score FROM student;

SELECT `name`,(chinese+english+math)*1.6 AS total_score FROM student
 WHERE `name`='赵云';

SELECT `name`,(chinese+english+math) AS total_score FROM student
 WHERE `name`='关羽';
 
 
SELECT `math` AS`Math` FROM student
```

### 在 where 子句中经常使用的运算符

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/25.png)

### 使用 where 子句，进行过滤查询

> 查询姓名为赵云的学生成绩
>
> 查询英语成绩大于90分的同学
>
> 查询总分大于200分的所有同学

- 使用where子句，课堂练习[5min]:

  > 查询math大于60并且(and) id大于90的学生成绩
  >
  > 查询英语成绩大于语文成绩的同学
  > 查询总分大于200分并且数学成绩小于语文成绩,的姓韩的学生.

```sql
-- select语句
-- 查询姓名为赵云的学生成绩
SELECT * FROM student
	WHERE `name`='赵云'

-- 查询英语成绩大于90分的同学
SELECT * FROM student
	WHERE english>90
	
-- 查询总分大于200分的所有同学
SELECT * FROM student
	WHERE (chinese+english+math)>200
	
-- 查询math大于60 并且(and) id大于4的学生成绩
SELECT * FROM student
	WHERE math>60 AND id>4
	
-- 查询英语成绩大于语文成绩的同学
SELECT * FROM student
	WHERE english>chinese
	
-- 查询总分大于200 分并且数学成绩小于语文成绩 的姓韩的学生
SELECT * FROM student
	WHERE (chinese+math+english)>200 AND 
	math<chinese AND `name` LIKE'张%';
	
-- 查询英语分数为80-90之间的同学
SELECT * FROM student
	WHERE english>=80 AND english<=90
	
-- 查询数学分数为89，90，91的同学
SELECT * FROM student
	WHERE math IN(89,90,91);
	
-- 查询所有姓李的学生
SELECT * FROM student
	WHERE `name` LIKE '李%';
```

### 使用 order by 子句排序查询结果

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/26.png)

```sql
-- 演示order by使用
-- 对数学成绩排序后输出【升序】
SELECT * FROM student
	ORDER BY math;
	
-- 对总分按从高到低的顺序输出
SELECT  `name`,(chinese+math+english) AS total_score FROM student
	ORDER BY total_score DESC;
	
-- 对姓李的学生成绩排序输出(升序)
SELECT `name`,(chinese+math+english) AS total_score FROM student
	WHERE `name` LIKE '韩%'
	ORDER BY total_score;
```

