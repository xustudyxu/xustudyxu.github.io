---
title: MySQL 视图/存储过程/触发器
date: 2022-09-25 17:19:33
permalink: /database/MySQL/MySQL_Advanced_View
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 视图/存储过程/触发器

[[toc]]

## 视图介绍

视图（View）是一种虚拟存在的表。视图中的数据并不在数据库中实际存在，行和列数据来自定义视图的查询中使用的表，并且是在使用视图时动态生成的。

通俗的讲，视图只保存了查询的SQL逻辑，不保存查询结果。所以我们在创建视图的时候，主要的工作就落在创建这条SQL查询语句上。

## 视图语法

1. 创建视图

```sql
CREATE [OR REPLACE] VIEW 视图名称[(列名列表)] AS SELECT语句 [ WITH [ CASCADED | LOCAL ] CHECK OPTION ]
```

2. 查询视图

```sql
查看创建视图语句：SHOW CREATE VIEW 视图名称;
查看视图数据：SELECT * FROM 视图名称 ...... ;
```

3. 删除视图

```sql
DROP VIEW [IF EXISTS] 视图名称 [,视图名称] ...
```

演示实例：

```sql {2,6,14}
--创建视图
mysql> create or replace view user_v_1 as select id,name from tb_user where id <= 10;
Query OK, 0 rows affected (0.01 sec)

--查询视图
mysql> show create view user_v_1;
+----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------+----------------------+
| View     | Create View                                                                                                                                                                                        | character_set_client | collation_connection |
+----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------+----------------------+
| user_v_1 | CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_v_1` AS select `tb_user`.`id` AS `id`,`tb_user`.`name` AS `name` from `tb_user` where (`tb_user`.`id` <= 10) | utf8mb4              | utf8mb4_0900_ai_ci   |
+----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+----------------------+----------------------+
1 row in set (0.00 sec)

mysql> select * from user_v_1;
+----+-----------+
| id | name      |
+----+-----------+
|  1 | 吕布      |
|  2 | 曹操      |
|  3 | 赵云      |
|  4 | 孙悟空    |
|  5 | 花木兰    |
|  6 | 大乔      |
|  7 | 露娜      |
|  8 | 程咬金    |
|  9 | 项羽      |
| 10 | 白起      |
+----+-----------+
10 rows in set (0.00 sec)

--修改视图
mysql> create or replace view user_v_1 as select id,name,no from student where id <= 10;	--或者下面这条语句
mysql> alter view user_v_1 as select id,name,profession from tb_user where id <= 10;
Query OK, 0 rows affected (0.00 sec)

--删除视图
mysql> drop view if exists user_v_1;
Query OK, 0 rows affected (0.00 sec)
```

上述我们演示了，视图应该如何创建、查询、修改、删除，那么我们能不能通过视图来插入、更新数据呢？ 接下来，做一个测试。

```sql {1,4,21,24,42}
mysql> create or replace view stu_v_1 as select id,name from student where id<=10;
Query OK, 0 rows affected (0.00 sec)

mysql> select * from stu_v_1;
+------+-----------+
| id   | name      |
+------+-----------+
|    1 | 杨过      |
|    2 | 小龙女    |
|    3 | 小龙女    |
|    4 | 小龙女    |
|    5 | 丘处机    |
|    6 | 郭靖      |
|    6 | 孙悟空    |
|    7 | 猪八戒    |
|    8 | 唐僧      |
|    9 | 沙和尚    |
|   10 | 张无忌    |
+------+-----------+

mysql> insert into stu_v_1 values(5,'frx');
Query OK, 1 row affected (0.00 sec)

mysql> insert into stu_v_1 values(13,'xustudyxu');
Query OK, 1 row affected (0.01 sec)

mysql> select * from stu_v_1;
+------+-----------+
| id   | name      |
+------+-----------+
|    1 | 杨过      |
|    2 | 小龙女    |
|    3 | 小龙女    |
|    4 | 小龙女    |
|    5 | 丘处机    |
|    6 | 郭靖      |
|    6 | 孙悟空    |
|    7 | 猪八戒    |
|    8 | 唐僧      |
|    9 | 沙和尚    |
|   10 | 张无忌    |
|    5 | frx       |
+------+-----------+
12 rows in set (0.00 sec)
```

执行上述的SQL，我们会发现，id为5和13的数据都是可以成功插入的。 但是我们执行查询，查询出来的数据，却没有id为13的记录。

因为我们在创建视图的时候，指定的条件为 `id<=10`, `id`为`13`的数据，是不符合条件的，所以没有查询出来，但是这条数据确实是已经成功的插入到了基表中。 

```sql {1,17,18}
mysql> select * from student;
+------+-----------+-------+
| id   | name      | stuId |
+------+-----------+-------+
|    1 | 杨过      |     1 |
|    2 | 小龙女    |     2 |
|    3 | 小龙女    |     3 |
|    4 | 小龙女    |     4 |
|    5 | 丘处机    |     5 |
|    6 | 郭靖      |     6 |
|    6 | 孙悟空    |     6 |
|    7 | 猪八戒    |     7 |
|    8 | 唐僧      |     8 |
|    9 | 沙和尚    |     9 |
|   10 | 张无忌    |    10 |
|   11 | 刘备      |    11 |
|    5 | frx       |  NULL |
|   13 | xustudyxu |  NULL |
+------+-----------+-------+
14 rows in set (0.00 sec)
```

如果我们定义视图时，如果指定了条件，然后我们在插入、修改、删除数据时，**是否可以做到必须满足条件才能操作，否则不能够操作呢**？答案是可以的，这就需要借助于<mark>视图的检查选项</mark>了。

## 检查选项

当使用WITH CHECK OPTION子句创建视图时，MySQL会通过视图检查正在更改的每个行，例如 插入，更新，删除，以使其符合视图的定义。 MySQL允许基于另一个视图创建视图，它还会检查依赖视图中的规则以保持一致性。为了确定检查的范围，mysql提供了两个选项： `CASCADED` 和` LOCAL`，<mark>默认值为 CASCADED</mark> 。

1. `CASCADED` 级联

比如，v2视图是基于v1视图的，如果在v2视图创建的时候指定了检查选项为 cascaded，但是v1视图创建时<font color='red'>未</font>指定检查选项。 则在执行检查时，**不仅会检查v2，还会级联检查v2的关联视图v1**。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220925/image.3w76kvmmjbw0.webp)

2.  `LOCAL` 本地

比如，v2视图是基于v1视图的，如果在v2视图创建的时候指定了检查选项为 local ，但是v1视图创建时<font color='red'>未</font>指定检查选项。 则在执行检查时，**只会检查v2，不会检查v2的关联视图v1**。如果**v1视图创建时指令检查选项，则会执行检查**。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220925/image.5e3plxqvt3c0.webp)

## 视图的更新

要使视图可更新，**视图中的行与基础表中的行之间必须存在一对一的关系**。如果视图包含以下任何一项，则该视图不可更新：

1. 聚合函数或窗口函数（SUM()、 MIN()、 MAX()、 COUNT()等）
2. DISTINCT
3. GROUP BY
4. HAVING
5. UNION 或者 UNION ALL

案例演示:

```sql
create view stu_v_count as select count(*) from student;
```

上述的视图中，就只有一个单行单列的数据，如果我们对这个视图进行更新或插入的，将会报错。

```sql
insert into stu_v_count values(10);
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220925/image.7bhqr4s554g0.webp)

## 视图作用

1. 简单

视图不仅可以简化用户对数据的理解，也可以简化他们的操作。那些被经常使用的查询可以被定义为视图，从而使得用户不必为以后的操作每次指定全部的条件。

2. 安全

数据库可以授权，但不能授权到数据库特定行和特定的列上。通过视图用户只能查询和修改他们所能见到的数据。

3. 数据独立

视图可帮助用户屏蔽真实表结构变化带来的影响。

## 案例

1. 为了保证数据库表的安全性，开发人员在操作tb_user表时，只能看到的用户的基本字段，屏蔽手机号和邮箱两个字段。

```sql
create view tb_user_view as select id,name,profession,age,gender,status,createtime from tb_user;
select * from tb_user_view;
```

2. 查询每个学生所选修的课程（三张表联查），这个功能在很多的业务中都有使用到，为了简化操作，定义一个视图。

```sql
create view tb_stu_course_view as select s.name student_name , s.no student_no , c.name course_name from student s, student_course sc , course c where s.id = sc.studentid and sc.courseid = c.id;

select * from tb_stu_course_view;
```

## 存储过程

### 介绍

存储过程是事先经过编译并存储在数据库中的一段 SQL 语句的集合，调用存储过程可以简化应用开发人员的很多工作，减少数据在数据库和应用服务器之间的传输，对于提高数据处理的效率是有好处的。

存储过程思想上很简单，就是数据库 SQL 语言层面的代码封装与重用。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220927/image.1atiu2xu65k0.webp)

特点:

+ 封装，复用 --------------------------------------> 可以把某一业务SQL封装在存储过程中，需要用到的时候直接调用即可。
+ 可以接收参数，也可以返回数据 ----------> 再存储过程中，可以传递参数，也可以接收返回值。
+ 减少网络交互，效率提升 -------------------> 如果涉及到多条SQL，每执行一次都是一次网络传输。 而如果封装在存储过程中，我们只需要网络交互一次可能就可以了。

### 基本语法

1. 创建

```sql
CREATE PROCEDURE 存储过程名称 ([ 参数列表 ])
BEGIN
	-- SQL语句
END ;
```

2. 调用

```sql
CALL 名称 ([ 参数 ]);
```

3.  查看

```sql
SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA = 'xxx'; -- 查询指定数据库的存储过程及状态信息
SHOW CREATE PROCEDURE 存储过程名称 ; -- 查询某个存储过程的定义
```

4. 删除

```sql
DROP PROCEDURE [ IF EXISTS ] 存储过程名称 ；
```

::: tip 注意:

在命令行中，执行创建存储过程的SQL时，需要通过关键字 `delimiter` 指定SQL语句的结束符。

:::

+ 演示案例

```sql
-- 存储过程基本语法
-- 创建
create procedure p1()
begin
	select count(*) from student;
end;
-- 调用
call p1()

-- 查看
select * from information_schema.ROUTINES where ROUTINE_SCHEMA = 'MySQL_Advanced';

show create procedure p1;

-- 删除
drop procedure if exists p1;
```

### 变量

在MySQL中变量分为三种类型: 系统变量、用户定义变量、局部变量。

#### 系统变量

系统变量 是MySQL服务器提供，不是用户定义的，属于服务器层面。分为全局变量（`GLOBAL`）、会话变量（`SESSION`）。

1. 查看系统变量

```sql
SHOW [ SESSION | GLOBAL ] VARIABLES ;               -- 查看所有系统变量
SHOW [ SESSION | GLOBAL ] VARIABLES LIKE '......';  -- 可以通过LIKE模糊匹配方式查找变量
SELECT @@[SESSION | GLOBAL] 系统变量名;               -- 查看指定变量的值
```

2. 设置系统变量

```sql
SET [ SESSION | GLOBAL ] 系统变量名 = 值 ;
SET @@[SESSION | GLOBAL]系统变量名 = 值 ;
```

::: tip 注意:

如果没有指定`SESSION/GLOBAL`，默认是`SESSION`，会话变量。

mysql服务重新启动之后，所设置的全局参数会失效，要想不失效，可以在 `/etc/my.cnf `中配置。

+ 全局变量(GLOBAL): 全局变量针对于所有的会话。
+ 会话变量(SESSION): 会话变量针对于单个会话，在另外一个会话窗口就不生效了。

:::

演示案例：

```sql {10,14}
-- 查看全局系统变量
SHOW GLOBAL VARIABLES;
SHOW SESSION VARIABLES;

-- 查看事务提交的开关
SHOW SESSION VARIABLES LIKE 'auto%';

-- 查看指定变量
SELECT @@SESSION.autocommit;
SET SESSION autocommit=0;
INSERT INTO student VALUES(18,"小红",18);
SELECT * from student;
-- 只有手动提交事务后，其他的会话才能查询到小红这条记录
COMMIT;
```

#### 用户定义变量

用户定义变量 是用户根据需要自己定义的变量，用户变量不用提前声明，在用的时候直接用 "@变量名" 使用就可以。其<mark>作用域为当前连接</mark>。

1. 赋值

方式一:

```sql
SET @var_name = expr [, @var_name = expr] ... ;
SET @var_name := expr [, @var_name := expr] ... ;
```

赋值时，可以使用` =` ，也可以使用` :=` ,推荐使用`:=`。

方式二:

```sql
SELECT @var_name := expr [, @var_name := expr] ... ;
SELECT 字段名 INTO @var_name FROM 表名;
```

2. 使用

```sql
SELECT @var_name ;
```

::: tip 注意:

用户定义的变量无需对其进行声明或初始化，只不过获取到的值为NULL。

:::

演示案例:

```sql
-- 用户变量
SET @myname = 'xustudyxu';
set @myage := 21;
set @mygender := '男',@myhobby := 'java';

select @mycolor := 'red';
SELECT COUNT(*) into @mycount from student;

-- 使用
SELECT @myname,@myage,@mygender;

SELECT @mycolor,@mycount;
```

























































