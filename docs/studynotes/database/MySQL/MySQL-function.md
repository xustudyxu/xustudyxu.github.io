---
title: MySQL-函数
date: 2022-09-13 21:47:29
permalink: /database/MySQL/MySQL-function
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL-函数

[[toc]]

## 合计/统计函数

### count

<font color=#DC4040 size=4 face="黑体">Select count(*) | count(列名) from table_name [WHERE where_definition]</font>

> 统计一个班级共有多少学生?
> 统计数学成绩大于90的学生有多少个?
>
> 统计总分大于250的人数有多少?
> count(*)和count(列)的区别

```sql
-- 演示mysql的统计函数的使用
-- 统计一个班级有多少学生
SELECT COUNT(*) FROM student;

-- 统计数学成绩大于90的学生有多少个
SELECT COUNT(*) FROM student
	WHERE math>90
	
-- 统计总分大于250的人数有多少
SELECT COUNT(*) FROM student
	WHERE (chinese+math+english)>250;
	
-- count(*)和count(列)的区别
-- 解释：conut(*)返回满足条件记录的总行数
-- count(列)：统计满足条件的某列有多少个，但是会排除为 null
CREATE TABLE t15(
	`name` VARCHAR(15));
INSERT INTO t15 VALUES('tom');
INSERT INTO t15 VALUES('jack');
INSERT INTO t15 VALUES('mary');
INSERT INTO t15 VALUES(NULL);

SELECT * FROM t15;

SELECT COUNT(*) FROM t15;-- 4
SELECT COUNT(`name`) FROM t15; -- 3
```

### sum

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/27.png)

```sql
-- 演示sum函数的使用
-- 统计一个班级数学总成绩
SELECT SUM(math) FROM student;
-- 统计一个班级语文、英语、数学各科的总成绩
SELECT SUM(chinese),SUM(math),SUM(english) FROM student;
-- 统计一个班级语文、英语、数学各科的总成绩
SELECT SUM(chinese+math+english) AS total_score FROM student
-- 统计一个班级语文成绩平均分
SELECT SUM(chinese)/COUNT(*) FROM student;
```

### avg

AVG函数返回满足where条件的一列的平均值

Select avg(列名) {avg(列名)...} from tablename [WHERE  where_definition]

```sql
-- 演示avg的使用
-- 求一个班级数学平均分
SELECT AVG(math) FROM student;
-- 求一个班级总分平均分
SELECT AVG(chinese+math+english) FROM student;
```

### max/min

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/29.png)

```sql
-- 演示max和min的使用
-- 求班级最高分和最低分(数值范围在统计中特别有用)
SELECT MAX(math+chinese+english) FROM student;

	
-- 求出班级数学最高分和最低分
SELECT MAX(math),MIN(math) 
	FROM student;
```

### 使用 group by 子句对列进行分组 

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/30.png)

### 使用 having 子句对分组后的结果进行过滤

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/31.png)

```sql
CREATE TABLE dept( /*部门表*/
deptno MEDIUMINT   UNSIGNED  NOT NULL  DEFAULT 0,
dname VARCHAR(20)  NOT NULL  DEFAULT "",
loc VARCHAR(13) NOT NULL DEFAULT ""
) ;
INSERT INTO dept VALUES
	(10,'ACCOUNTING','NEW YORK'),
	(20,'RESEARCH','DALLAS'),
	(30,'SALES','CHICAGO'),
	(40,'OPERATIONS','BOSTON');
SELECT * FROM dept;


-- 员工表
# 创建表EMP成员
CREATE TABLE emp
(empno  MEDIUMINT UNSIGNED  NOT NULL  DEFAULT 0, /*编号*/
ename VARCHAR(20) NOT NULL DEFAULT "", /*名字*/
job VARCHAR(9) NOT NULL DEFAULT "",/*工作*/
mgr MEDIUMINT UNSIGNED ,/*上级编号*/
hiredate DATE NOT NULL,/*入职时间*/
sal DECIMAL(7,2)  NOT NULL,/*薪水*/
comm DECIMAL(7,2) ,/*奖金*/
deptno MEDIUMINT UNSIGNED NOT NULL DEFAULT 0 /*部门编号*/
) ;

-- 添加测试数据
INSERT INTO emp VALUES
	(7369, 'SMITH', 'CLERK', 7902, '1990-12-17', 800.00,NULL , 20), 
	(7499, 'ALLEN', 'SALESMAN', 7698, '1991-2-20', 1600.00, 300.00, 30), 
	(7521, 'WARD', 'SALESMAN', 7698, '1991-2-22', 1250.00, 500.00, 30), 
	(7566, 'JONES', 'MANAGER', 7839, '1991-4-2', 2975.00,NULL,20), 
	(7654, 'MARTIN', 'SALESMAN', 7698, '1991-9-28',1250.00,1400.00,30),
	(7698, 'BLAKE','MANAGER', 7839,'1991-5-1', 2850.00,NULL,30), 
	(7782, 'CLARK','MANAGER', 7839, '1991-6-9',2450.00,NULL,10), 
	(7788, 'SCOTT','ANALYST',7566, '1997-4-19',3000.00,NULL,20), 
	(7839, 'KING','PRESIDENT',NULL,'1991-11-17',5000.00,NULL,10),
	(7844, 'TURNER', 'SALESMAN',7698, '1991-9-8', 1500.00, NULL,30), 
	(7900, 'JAMES','CLERK',7698, '1991-12-3',950.00,NULL,30), 
	(7902, 'FORD', 'ANALYST',7566,'1991-12-3',3000.00, NULL,20), 
	(7934,'MILLER','CLERK',7782,'1992-1-23', 1300.00, NULL,10);
	
	SELECT * FROM emp;

-- 工资级别表
CREATE TABLE salgrade
(
grade MEDIUMINT UNSIGNED NOT NULL DEFAULT 0,
losal DECIMAL(17,2)  NOT NULL,
hisal DECIMAL(17,2)  NOT NULL
);

#测试数据
INSERT INTO salgrade VALUES (1,700,1200);
INSERT INTO salgrade VALUES (2,1201,1400);
INSERT INTO salgrade VALUES (3,1401,2000);
INSERT INTO salgrade VALUES (4,2001,3000);
INSERT INTO salgrade VALUES (5,3001,9999);	

SELECT * FROM salgrade;

# 演示group by+having
GROUP BY 用于对查询结果分组统计，
-- having子句用于限制分组显示结果
-- 如何显示每个部门的平均工资和最高工资
# 按照部门来分组查询
SELECT AVG(sal),MAX(sal),deptno
	FROM emp GROUP BY deptno;
	
-- 显示每个部门的每种岗位的平均工资和最低工资
-- 1.显示每个部门的平均工资和最低工资
-- 2.显示每个部门的每种岗位的平均工资和最低工资
SELECT AVG(sal),MIN(sal),deptno,job
	FROM emp GROUP BY deptno,job;
	
-- 显示平均工资低于2000的部门号和他的平均工资
-- 1.显示各个部门的平均工资和部门号和它的平均工资
-- 2.在1的结果基础上，进行过滤，保留 avg(sal)<2000
-- 3.使用别名进行过滤
SELECT AVG(sal),deptno
	FROM emp GROUP BY deptno
	HAVING AVG(sal)<2000;
	
-- 使用别名 
SELECT AVG(sal) AS avg_sal,deptno
	FROM emp GROUP BY deptno
		HAVING avg_sal<2000;
```

## 字符串相关函数

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/32.png)

```sql
-- 演示字符串相关函数的使用
-- CHARSET(str) 返回字串字符集
SELECT CHARSET(ename) FROM emp;

-- CONCAT(string2 [,....]) 连接字串
SELECT CONCAT(ename,' 工作是',job) FROM emp;

-- INSTR (string,substring )返回substring在string中出现的位置，没有返回0
-- dual 亚元表，系统表 可以作为测试表使用
SELECT INSTR('hanshunping','ping')FROM DUAL;

-- UCASE(string2) 转换成大写
SELECT UCASE(ename)FROM emp;

-- LCASE(string2) 转换成小写
SELECT LCASE(ename) FROM emp;

-- LEFT (string2,length) 从string2中的左边起取length个字符
-- RIGTH(string2,length)
SELECT LEFT(ename,2) FROM emp;

-- LENGTH (string) string 长度[按照字节]
SELECT LENGTH(ename) FROM emp;

-- REPLACE (str,serch_str,replace_str)
-- 在str中用replace_str替换search_str
-- 如果是manager 就替换成经理
SELECT ename,REPLACE(job,'MANAGER','经理') FROM emp;

-- STRCMP(string1,string2) 涿字符比较俩字串大小
SELECT STRCMP('hsp','Jsp')FROM DUAL;

-- SUBSTRING(str,position [length]) 
-- 从str的position开始【从1开始计算】，取length个字符
-- 从ename列的第一个位置 开始取出2个字符
SELECT SUBSTRING(ename,1,2)FROM emp;

-- LTRTM(string2)RTRIM(string2) TRIM(string)
-- 去除前段空格后端空格
SELECT LTRIM(' 韩顺平教育')FROM DUAL;
SELECT RTRIM('韩顺平教育 ')FROM DUAL;
SELECT TRIM(' 韩顺平教育 ')FROM DUAL;

```

## 数学相关函数

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/33.png)

```sql
-- 演示数学相关函数

-- ABS(num) 绝对值
SELECT ABS(10) FROM DUAL;

-- BIN(decimal_number)   十进制转二进制
SELECT BIN(10) FROM DUAL;

-- CEILING(number2 )向上取整 ，得到比num2 大的最小整数
SELECT CEILING(1.1) FROM DUAL;

-- CONV(number2,from_base,to base)  进制转化
-- 下面的含义是 8 是十进制的8 转成2进制输出
SELECT CONV(8,10,2) FROM DUAL;

-- 下面的含义是 16 是十六进制的16 转成10进制输出
SELECT CONV(16,16,10) FROM DUAL;

-- FLOOR(number2)    向下取整，得到比 num2小的最大整数
SELECT FLOOR(-1.1) FROM DUAL;

-- FORMAT (number,decial_places) 保留小数位数,四舍五入
SELECT FORMAT(78.125458,2) FROM DUAL;

-- HEX(DeciamlNumber )转十六进制
SELECT HEX(5) FROM DUAL;

-- LEAST(number,number2[...]) 求最小值
SELECT LEAST(0,1,-10,4) FROM DUAL;

-- MOD(nuerator,denominator)  求余
SELECT MOD(10,3) FROM DUAL;

-- RAND([seed]) RAND([seed])  返回随机数 其范围为 0<=v<=1.0
-- 如果使用rand() 每次返回不同的随机数，在0<=v<=1.0,如果seed不变，该随机数也不变了
SELECT RAND() FROM DUAL;

```

## 时间日期相关函数

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/34.png)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/35.png)

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/36.png)

```sql
-- 日期时间相关函数

-- CURRENT_DATE( )        当前日期
SELECT CURRENT_DATE FROM DUAL;

-- CURRENT_TIME( )        当前时间
SELECT CURRENT_TIME FROM DUAL;

-- CURRENT_TIMESTAMP( )   当前时间戳
SELECT CURRENT_TIMESTAMP() FROM DUAL;

-- 创建测试表 信息表
CREATE TABLE mes(
	id INT,
	content VARCHAR(30),
	send_time DATETIME);


-- 添加一条记录
INSERT INTO mes
	VALUES(1,'北京新闻',CURRENT_TIMESTAMP());

INSERT INTO mes VALUE(2,'上海新闻',NOW());
INSERT INTO mes VALUE(3,'广州新闻','2020-11-11');
	

SELECT *FROM mes;
SELECT NOW() FROM DUAL;

-- 上应用案例
-- 显示所有新闻信息，发布日期只显示日期，不用显示时间
SELECT id,content,DATE(send_time)
	FROM mes;
	
-- 请查询在10分钟内发布的帖子
SELECT  * FROM mes -- 发送时间加上10分钟 开是否大于或等于当前时间
	WHERE DATE_ADD(send_time,INTERVAL 10 MINUTE)>=NOW()
	
SELECT * FROM mes --  现在时间减去10分钟 看是否在发送时间之前
	WHERE send_time>= DATE_SUB(NOW(),INTERVAL 10 MINUTE)
	

-- 请在mysql的sql语句中求出 2011-11-11 和 1990-1-1 相差多少天
SELECT DATEDIFF('2011-11-11','1990-01-01') FROM DUAL;

-- 请用mysql的 sql语句求出你活了多少天？[练习]
SELECT DATEDIFF('2021-08-11','2001-01-01') FROM DUAL

-- 如果你能活80岁，求出你还能活多少天
-- year可以是年月日时分秒都行 ，'2001-01-05'可以是date,datetime timestamp
SELECT DATEDIFF(DATE_ADD('2001-01-05',INTERVAL 80 YEAR),NOW()) FROM DUAL

SELECT TIMEDIFF('10:11:11','06:10:10') FROM DUAL;


-- YEAR|Month|DAY|DATE|(datetime)
SELECT YEAR(NOW()) FROM DUAL;
SELECT MONTH(NOW()) FROM DUAL;
SELECT DAY(NOW()) FROM DUAL;
SELECT YEAR('2013-11-10') FROM DUAL;

-- unix_timestamp()1970-1-1 到现在的秒数
SELECT UNIX_TIMESTAMP()/(24*3600*365) FROM DUAL;

-- FROM_UNIXTIME()  可以把一个unix_timestamp秒数，转成指定格式的日期

-- %Y-%m-%d 格式是规定好的，表示年月日
SELECT FROM_UNIXTIME(1618483484,'%Y-%m-%d') FROM DUAL;
SELECT FROM_UNIXTIME(1618493484,'%Y-%m-%d %H:%i:%s')FROM DUAL;
-- 意义：在开发中，可以存放一个整数，然后表示时间，通过FROM_UNIXTIME转换

```

## 加密和系统函数

| USER()            | 查询用户                                                     |
| ----------------- | ------------------------------------------------------------ |
| **DATABSE()**     | **数据库名称**                                               |
| **MD5（str)**     | **为字符串算出一个 MD5 32的字符串，常用(用户密码)加密**      |
| **PASSWORD(str)** | **从原文密码str 计算并返回密码字符串, 通常用于对mysql数据库的用户密码加密** |

```sql
-- 演示加密函数和系统函数

-- USER()  查询用户
-- 可以查看登录到mysql的有哪些用户，以及登录的ip
SELECT USER() FROM DUAL; -- 用户@ip地址

-- DATABASE() 查询当前使用数据库名称
SELECT DATABASE();

-- MD5(str)   为字符串算出一个 MD5 32的字符串，常用(用户密码)加密
-- root 密码是 hsp -> 加密md5 ->在数据库中存放的是加密后的密码
SELECT MD5('hsp') FROM DUAL;
SELECT LENGTH(MD5('hsp')) FROM DUAL;

-- 演示用户表，存放密码时，是md5
CREATE TABLE users(
	id INT,
	NAME VARCHAR(32) NOT NULL DEFAULT'',
	pwd CHAR(32) NOT NULL DEFAULT '');

INSERT INTO users
	VALUES(100,'冯荣旭',MD5('hsp'));
	
SELECT *FROM users;

SELECT * FROM users -- SQL 注入问题
	WHERE `name`='冯荣旭' AND pwd =MD5('hsp')
	
-- PASSWORD(str) -- 加密函数，MySQL数据库的用户密码就是 PASSWORD函数加密

SELECT PASSWORD('hsp') FROM DUAL;

-- select * from mysql.user \G 从原文密码str 计算并返回密码字符串
-- 通常用于对mysql数据库的用户密码加密
-- mysql.user 表示  数据库.表
SELECT *FROM mysql.user

```

## 流程控制函数

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MySQL/images/37.png)

```sql
 #演示流程控制语句
 
 # IF(expr1,expr2,expr3) 如果expr1为True,则返回expr2 否则返回expr3
 SELECT IF(TRUE,'北京','上海') FROM DUAL;
 
 #IFNULL(expr1,expr2)  如果expr1不为空null,则返回expr1,否则返回expr2
 SELECT IFNULL('jack','韩顺平教育') FROM DUAL;
 
 # SELECT CASE WHEN expr1 THEN expr2 WHEN expr3 THEN expr4 ELSE expr5 END;[类似多重分支]
 # 如果expr1 为TRUE,则返回expr2,如果 expr2 为t，返回 expr4,否则返回 expr5
 SELECT CASE 
	WHEN TRUE THEN 'jack' 
	WHEN FALSE THEN 'tom' 
	ELSE 'mary' END

-- 1.查询emp 表，如果comm 是null 则显示0.0
--  老师说明,判断是否为null 要使用 is null,判断不为空 使用 is not
SELECT ename,IF (comm IS NULL,0.0,comm)
	FROM emp;
SELECT ename,IFNULL(comm,0.0)
	FROM emp;
	
-- 2.如果emp 表的 job 是 CLERK 则显示职员，如果是 MANAGER 则显示经理
--   如果是SALESMAN 则显示 销售人员，其他正常显示
SELECT ename,(
	SELECT CASE
	WHEN job ='CLERK' THEN '职员' 
	WHEN job ='manager' THEN '经理' 
	WHEN job ='SALESMAN'THEN'销售人员'
	ELSE job END) AS 'job',job
	FROM emp;
```

