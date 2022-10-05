---
title: MySQL 日志
date: 2022-10-05 11:37:23
permalink: /database/MySQL/MySQL_journal
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 日志

[[toc]]

## 错误日志

错误日志是 MySQL 中最重要的日志之一，它记录了当 mysqld 启动和停止时，以及服务器在运行过程中发生任何严重错误时的相关信息。当数据库出现任何故障导致无法正常使用时，建议首先查看此日志。

该日志是默认开启的，默认存放目录 /var/log/，默认的日志文件名为 mysqld.log 。查看日志位置：

```sh
show variables like '%log_error%';
```

```sh {6}
mysql> show variables like '%log_error%';
+----------------------------+----------------------------------------+
| Variable_name              | Value                                  |
+----------------------------+----------------------------------------+
| binlog_error_action        | ABORT_SERVER                           |
| log_error                  | /var/log/mysqld.log                    |
| log_error_services         | log_filter_internal; log_sink_internal |
| log_error_suppression_list |                                        |
| log_error_verbosity        | 2                                      |
+----------------------------+----------------------------------------+
5 rows in set (0.13 sec)
```

##  二进制日志

### 介绍

二进制日志（BINLOG）记录了所有的 DDL（数据定义语言）语句和 DML（数据操纵语言）语句，但不包括数据查询（SELECT、SHOW）语句。

作用：①. 灾难时的数据恢复；②. MySQL的主从复制。在MySQL8版本中，默认二进制日志是开启着的，涉及到的参数如下：

```sh
show variables like '%log_bin%';
```

```sh {8}
-rw-r-----  1 mysql mysql       523 10月  2 00:02 binlog.000008
-rw-r-----  1 mysql mysql      9316 10月  2 14:50 binlog.000009
-rw-r-----  1 mysql mysql       398 10月  2 16:45 binlog.000010
-rw-r-----  1 mysql mysql       695 10月  3 00:25 binlog.000011
-rw-r-----  1 mysql mysql      1416 10月  3 15:36 binlog.000012
-rw-r-----  1 mysql mysql      1600 10月  4 22:30 binlog.000013
-rw-r-----  1 mysql mysql       156 10月  5 11:41 binlog.000014
-rw-r-----  1 mysql mysql       224 10月  5 11:41 binlog.index    #二进制索引文件
```

参数说明：

+ `log_bin_basename`：当前数据库服务器的binlog日志的基础名称(前缀)，具体的binlog文件名需要再该basename的基础上加上编号(编号从000001开始)。
+ `log_bin_index`：binlog的索引文件，里面记录了当前服务器关联的binlog文件有哪些。

### 格式

MySQL服务器中提供了多种格式来记录二进制日志，具体格式及特点如下：

| 日志格式  | 含义                                                         |
| --------- | ------------------------------------------------------------ |
| STATEMENT | 基于SQL语句的日志记录，记录的是SQL语句，对数据进行修改的SQL都会记录在日志文件中。 |
| ROW       | 基于行的日志记录，记录的是每一行的数据变更。（默认）         |
| MIXED     | 混合了STATEMENT和ROW两种格式，默认采用STATEMENT，在某些特殊情况下会自动切换为ROW进行记录。 |

```sh
show variables like '%binlog_format';
```

```sh {5}
mysql> show variables like '%binlog_format';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| binlog_format | ROW   |
+---------------+-------+
1 row in set (0.01 sec)
```

如果我们需要配置二进制日志的格式，只需要在 /etc/my.cnf 中配置 binlog_format 参数即可。

### 查看

由于日志是以二进制方式存储的，不能直接读取，需要通过二进制日志查询工具 mysqlbinlog 来查看，具体语法：

```sh
mysqlbinlog [ 参数选项 ] logfilename

参数选项：
	-d 指定数据库名称，只列出指定的数据库相关操作。
	-o 忽略掉日志中的前n行命令。
	-v 将行事件(数据变更)重构为SQL语句
	-vv 将行事件(数据变更)重构为SQL语句，并输出注释信息
```

### 删除

对于比较繁忙的业务系统，每天生成的binlog数据巨大，如果长时间不清除，将会占用大量磁盘空间。可以通过以下几种方式清理日志：

| 指令                                             | 含义                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| reset master                                     | 删除全部 binlog 日志，删除之后，日志编号，将从 binlog.000001重新开始 |
| purge master logs to 'binlog.*'                  | 删除 * 编号之前的所有日志                                    |
| purge master logs before 'yyyy-mm-dd hh24:mi:ss' | 删除日志为 "yyyy-mm-dd hh24:mi:ss" 之前产生的所有日志        |

也可以在mysql的配置文件中配置二进制日志的过期时间，设置了之后，二进制日志过期会自动删除。

```sh
show variables like '%binlog_expire_logs_seconds%';
```

## 查询日志

查询日志中记录了客户端的所有操作语句，而二进制日志不包含查询数据的SQL语句。默认情况下，查询日志是未开启的。

```sh
show variables like '%general%';
```

```sh {5,6}
mysql> show variables like '%general%';
+------------------+--------------------------+
| Variable_name    | Value                    |
+------------------+--------------------------+
| general_log      | OFF                      |
| general_log_file | /var/lib/mysql/frx01.log |
+------------------+--------------------------+
2 rows in set (0.00 sec)
```

如果需要开启查询日志，可以修改MySQL的配置文件 /etc/my.cnf 文件，添加如下内容：

```properties
#该选项用来开启查询日志 ， 可选值 ： 0 或者 1 ； 0 代表关闭， 1 代表开启

general_log=1

#设置日志的文件名 ， 如果没有指定， 默认的文件名为 host_name.log

general_log_file=mysql_query.log
```

开启了查询日志之后，在MySQL的数据存放目录，也就是 /var/lib/mysql/ 目录下就会出现mysql_query.log 文件。之后所有的客户端的增删改查操作都会记录在该日志文件之中，长时间运行后，该日志文件将会非常大。

## 慢查询日志

慢查询日志记录了所有执行时间超过参数 long_query_time 设置值并且扫描记录数不小于
min_examined_row_limit 的所有的SQL语句的日志，默认未开启。long_query_time 默认为10 秒，最小为 0， 精度可以到微秒。

如果需要开启慢查询日志，需要在MySQL的配置文件 /etc/my.cnf 中配置如下参数：

```properties
#慢查询日志

slow_query_log=1

#执行时间参数

long_query_time=2
```

默认情况下，不会记录管理语句，也不会记录不使用索引进行查找的查询。可以使用
log_slow_admin_statements和 更改此行为 log_queries_not_using_indexes，如下所述。

```properties
#记录执行较慢的管理语句

log_slow_admin_statements =1

#记录执行较慢的未使用索引的语句

log_queries_not_using_indexes = 1
```

> 上述所有的参数配置完成之后，都需要重新启动MySQL服务器才可以生效。

```sh {12-17}
[root@frx01 mysql]# tail -f frx01-slow.log
# Query_time: 4.687803  Lock_time: 0.000077 Rows_sent: 1  Rows_examined: 0
use frx01;
SET timestamp=1664871559;
SELECT COUNT(*) FROM `tb_user`;
/usr/sbin/mysqld, Version: 8.0.26 (MySQL Community Server - GPL). started with:
Tcp port: 3306  Unix socket: /var/lib/mysql/mysql.sock
Time                 Id Command    Argument
/usr/sbin/mysqld, Version: 8.0.26 (MySQL Community Server - GPL). started with:
Tcp port: 3306  Unix socket: /var/lib/mysql/mysql.sock
Time                 Id Command    Argument
# Time: 2022-10-05T13:40:50.099040Z
# User@Host: root[root] @ localhost []  Id:     8
# Query_time: 3.980600  Lock_time: 0.000070 Rows_sent: 0  Rows_examined: 1000000
use frx01;
SET timestamp=1664977246;
select * from tb_user limit 1000000,10;
```

