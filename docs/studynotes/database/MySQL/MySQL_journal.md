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

