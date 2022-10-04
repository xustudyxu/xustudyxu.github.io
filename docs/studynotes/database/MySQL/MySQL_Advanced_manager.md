---
title: MySQL 管理
date: 2022-10-04 17:03:07
permalink: /database/MySQL/MySQL_Advanced_manager
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 管理

[[toc]]

## 系统数据库

Mysql数据库安装完成后，自带了一下四个数据库，具体作用如下：

| 数据库             | 含义                                                         |
| ------------------ | ------------------------------------------------------------ |
| mysql              | 存储MySQL服务器正常运行所需要的各种信息 （时区、主从、用户、权限等） |
| information_schema | 提供了访问数据库元数据的各种表和视图，包含数据库、表、字段类型及访问权限等 |
| performance_schema | 为MySQL服务器运行时状态提供了一个底层监控功能，主要用于收集数据库服务器性能参数 |
| sys                | 包含了一系列方便 DBA 和开发人员利用 performance_schema性能数据库进行性能调优和诊断的视图 |

## 常用工具

### mysql

该mysql不是指mysql服务，而是指mysql的客户端工具。

```sh
语法 ：
	mysql [options] [database]
选项 ：
	-u, --user=name #指定用户名
	-p, --password[=name] #指定密码
	-h, --host=name #指定服务器IP或域名
	-P, --port=port #指定连接端口
	-e, --execute=name #执行SQL语句并退出
```

-e选项可以在Mysql客户端执行SQL语句，而不用连接到MySQL数据库再执行，对于一些批处理脚本，这种方式尤其方便。

示例：

```sh
 mysql -u root -p MySQL_Advanced -e "select * from stu";
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221004/image.5qo92img9os0.webp)

### mysqladmin

mysqladmin 是一个执行管理操作的客户端程序。可以用它来检查服务器的配置和当前状态、创建并删除数据库等。

```sh
通过帮助文档查看选项：
	mysqladmin --help
```

```sh
Where command is a one or more of: (Commands may be shortened)
  create databasename   Create a new database
  debug                 Instruct server to write debug information to log
  drop databasename     Delete a database and all its tables
  extended-status       Gives an extended status message from the server
  flush-hosts           Flush all cached hosts
  flush-logs            Flush all logs
  flush-status          Clear status variables
  flush-tables          Flush all tables
  flush-threads         Flush the thread cache
  flush-privileges      Reload grant tables (same as reload)
  kill id,id,...        Kill mysql threads
  password [new-password] Change old password to new-password in current format
  ping                  Check if mysqld is alive
  processlist           Show list of active threads in server
  reload                Reload grant tables
  refresh               Flush all tables and close and open logfiles
  shutdown              Take server down
  status                Gives a short status message from the server
  start-replica         Start replication
  start-slave           Deprecated: use start-replica instead
  stop-replica          Stop replication
  stop-slave            Deprecated: use stop-replica instead
  variables             Prints variables available
  version               Get version info from server
```

```sh
语法:
	mysqladmin [options] command ...
选项:
	-u, --user=name       #指定用户名
	-p, --password[=name] #指定密码
	-h, --host=name       #指定服务器IP或域名
	-P, --port=port       #指定连接端口
```

示例：

```sh
mysqladmin -uroot –p1234 drop 'test01'
mysqladmin -u root –p 123456 version
```

### mysqlbinlog

由于服务器生成的二进制日志文件以二进制格式保存，所以如果想要检查这些文本的文本格式，就会使用到mysqlbinlog 日志管理工具。

```sh
语法 ：
	mysqlbinlog [options] log-files1 log-files2 ...
选项 ：
	-d, --database=name 指定数据库名称，只列出指定的数据库相关操作。
	-o, --offset=# 忽略掉日志中的前n行命令。
	-r,--result-file=name 将输出的文本格式日志输出到指定文件。
	-s, --short-form 显示简单格式， 省略掉一些信息。
	--start-datatime=date1 --stop-datetime=date2 指定日期间隔内的所有日志。
	--start-position=pos1 --stop-position=pos2 指定位置间隔内的所有日志。
```

示例:

A. 查看 binlog.000008这个二进制文件中的数据信息

```sh
[root@frx01 ~]# mysqlbinlog binlog.000008
# The proper term is pseudo_replica_mode, but we use this compatibility alias
# to make the statement usable on server versions 8.0.24 and older.
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
mysqlbinlog: File 'binlog.000008' not found (OS errno 2 - No such file or directory)
ERROR: Could not open log file
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;
DELIMITER ;
# End of log file
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
```

上述查看到的二进制日志文件数据信息量太多了，不方便查询。 我们可以加上一个参数 -s 来显示简单格式。

```sh
[root@frx01 ~]# mysqlbinlog -s binlog.000008
WARNING: --short-form is deprecated and will be removed in a future version

# The proper term is pseudo_replica_mode, but we use this compatibility alias
# to make the statement usable on server versions 8.0.24 and older.
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=1*/;
/*!50003 SET @OLD_COMPLETION_TYPE=@@COMPLETION_TYPE,COMPLETION_TYPE=0*/;
DELIMITER /*!*/;
mysqlbinlog: File 'binlog.000008' not found (OS errno 2 - No such file or directory)
ERROR: Could not open log file
SET @@SESSION.GTID_NEXT= 'AUTOMATIC' /* added by mysqlbinlog */ /*!*/;
DELIMITER ;
# End of log file
/*!50003 SET COMPLETION_TYPE=@OLD_COMPLETION_TYPE*/;
/*!50530 SET @@SESSION.PSEUDO_SLAVE_MODE=0*/;
```

### mysqlshow

mysqlshow 客户端对象查找工具，用来很快地查找存在哪些数据库、数据库中的表、表中的列或者索引。

```sh
语法 ：
	mysqlshow [options] [db_name [table_name [col_name]]]
选项 ：
	--count 显示数据库及表的统计信息（数据库，表 均可以不指定）
	-i 显示指定数据库或者指定表的状态信息
示例：
	#查询test库中每个表中的字段书，及行数
	mysqlshow -uroot -p2143 test --count
	#查询test库中book表的详细情况
	mysqlshow -uroot -p2143 test book --count
```

示例：

A. 查询每个数据库的表的数量及表中记录的数量

`mysqlshow -uroot -p123456 --count`

```sh
[root@frx01 ~]# mysqlshow -uroot -p123456 --count
mysqlshow: [Warning] Using a password on the command line interface can be insecure.
+--------------------+--------+--------------+
|     Databases      | Tables |  Total Rows  |
+--------------------+--------+--------------+
| MySQL_Advanced     |      9 |        13582 |
| frx01              |      1 |      1000000 |
| information_schema |     79 |        31153 |
| mysql              |     37 |         3904 |
| performance_schema |    110 |       242999 |
| sys                |    101 |         5021 |
+--------------------+--------+--------------+
6 rows in set.
```

B. 查看数据库MySQL_Advanced的统计信息

`mysqlshow -uroot -p123456 MySQL_Advanced --count`

```sh
[root@frx01 ~]# mysqlshow -uroot -p123456 MySQL_Advanced --count
mysqlshow: [Warning] Using a password on the command line interface can be insecure.
Database: MySQL_Advanced
+-------------+----------+------------+
|   Tables    | Columns  | Total Rows |
+-------------+----------+------------+
| a           |        2 |          0 |
| employee    |        2 |          0 |
| stu         |        3 |          7 |
| stu_v_1     |        2 |         12 |
| student     |        6 |         18 |
| tb_user     |        9 |         24 |
| tb_user_pro |        3 |      13472 |
| user_logs   |        5 |         39 |
| user_v_1    |        2 |         10 |
+-------------+----------+------------+
9 rows in set.
```

C. 查看数据库db01中的course表的信息

`mysqlshow -uroot -p123456 MySQL_Advanced stu --count`

```sh
[root@frx01 ~]# mysqlshow -uroot -p123456 MySQL_Advanced stu --count
mysqlshow: [Warning] Using a password on the command line interface can be insecure.
Database: MySQL_Advanced  Table: stu  Rows: 7
+-------+--------------+--------------------+------+-----+---------+----------------+---------------------------------+---------+
| Field | Type         | Collation          | Null | Key | Default | Extra          | Privileges                      | Comment |
+-------+--------------+--------------------+------+-----+---------+----------------+---------------------------------+---------+
| id    | int          |                    | NO   | PRI |         | auto_increment | select,insert,update,references |         |
| age   | int          |                    | NO   | MUL |         |                | select,insert,update,references |         |
| name  | varchar(255) | utf8mb4_general_ci | YES  | MUL |         |                | select,insert,update,references |         |
+-------+--------------+--------------------+------+-----+---------+----------------+---------------------------------+---------+
```

D. 查看数据库db01中的course表的id字段的信息

`mysqlshow -uroot -p123456 MySQL_Advanced stu id --count`

```sh
[root@frx01 ~]# mysqlshow -uroot -p123456 MySQL_Advanced stu id --count
mysqlshow: [Warning] Using a password on the command line interface can be insecure.
Database: MySQL_Advanced  Table: stu  Rows: 7  Wildcard: id
+-------+------+-----------+------+-----+---------+----------------+---------------------------------+---------+
| Field | Type | Collation | Null | Key | Default | Extra          | Privileges                      | Comment |
+-------+------+-----------+------+-----+---------+----------------+---------------------------------+---------+
| id    | int  |           | NO   | PRI |         | auto_increment | select,insert,update,references |         |
+-------+------+-----------+------+-----+---------+----------------+---------------------------------+---------+
```

### mysqldump

mysqldump 客户端工具用来备份数据库或在不同数据库之间进行数据迁移。备份内容包含创建表，及插入表的SQL语句。

```sh
语法 ：
	mysqldump [options] db_name [tables]
	mysqldump [options] --database/-B db1 [db2 db3...]
	mysqldump [options] --all-databases/-A
连接选项 ：
	-u, --user=name        指定用户名
	-p, --password[=name]  指定密码
	-h, --host=name        指定服务器ip或域名
	-P, --port=#           指定连接端口
输出选项：
	--add-drop-database    在每个数据库创建语句前加上 drop database 语句
	--add-drop-table       在每个表创建语句前加上 drop table 语句 , 默认开启 ; 不
开启 (--skip-add-drop-table)
	-n, --no-create-db     不包含数据库的创建语句
	-t, --no-create-info   不包含数据表的创建语句
	-d --no-data           不包含数据
	-T, --tab=name         自动生成两个文件：一个.sql文件，创建表结构的语句；一个.txt文件，数据文件
```

示例:

A. 备份db01数据库

`mysqldump -uroot -p123456 frx01 > frx01.sql`

```sh {7}
[root@frx01 ~]# mysqldump -uroot -p123456 frx01 > frx01.sql
mysqldump: [Warning] Using a password on the command line interface can be insecure.
[root@frx01 ~]# ll
总用量 597048
-rw-r--r--. 1 root root 482420224 9月   9 10:23 ABCD.tar
-rw-------. 1 root root      1697 9月   9 09:45 anaconda-ks.cfg
-rw-r--r--  1 root root  70781900 10月  4 16:31 frx01.sql
-rw-r--r--. 1 root root      1745 9月   9 09:49 initial-setup-ks.cfg
-rw-r--r--  1 root root    508543 10月  1 23:47 itcast.sql
-rw-r--r--  1 root root  57650380 9月  25 09:40 load_user_100w_sort.sql
drwxr-xr-x. 2 root root         6 9月   9 09:55 公共
drwxr-xr-x. 2 root root         6 9月   9 09:55 模板
drwxr-xr-x. 2 root root         6 9月   9 09:55 视频
drwxr-xr-x. 2 root root         6 9月   9 09:55 图片
drwxr-xr-x. 2 root root         6 9月   9 09:55 文档
drwxr-xr-x. 2 root root         6 9月   9 09:55 下载
drwxr-xr-x. 2 root root         6 9月   9 09:55 音乐
drwxr-xr-x. 2 root root         6 9月   9 09:55 桌面
```

可以直接打开db01.sql，来查看备份出来的数据到底什么样。

```sh
--
-- Table structure for table `user_logs`
--

DROP TABLE IF EXISTS `user_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `operation` varchar(20) NOT NULL COMMENT '操作类型, insert/update/delete',
  `operate_time` datetime NOT NULL COMMENT '操作时间',
  `operate_id` int NOT NULL COMMENT '操作的ID',
  `operate_params` varchar(500) DEFAULT NULL COMMENT '操作参数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_logs`
--
```

备份出来的数据包含：

+ 删除表的语句
+ 创建表的语句
+ 数据插入语句

如果我们在数据备份时，不需要创建表，或者不需要备份数据，只需要备份表结构，都可以通过对应的参数来实现。

B. 备份db01数据库中的表数据，不备份表结构(`-t`)
`mysqldump -uroot -p123456 -t frx01 > frx02.sql`

打开 db02.sql ，来查看备份的数据，只有insert语句，没有备份表结构。

```sh
LOCK TABLES `tb_user` WRITE;
/*!40000 ALTER TABLE `tb_user` DISABLE KEYS */;
INSERT INTO `tb_user` VALUES (1,'jdTmmKQlwu1','jdTmmKQlwu','jdTmmKQlwu','2020-10-13','1'),(2,'BTJOeWjRiw2','BTJOeWjRiw','BTJOeWjRiw','202
0-06-12','2'),(3,'waQTJIIlHI3','waQTJIIlHI','waQTJIIlHI','2020-06-02','0'),(4,'XmeFHwozIo4','XmeFHwozIo','XmeFHwozIo','2020-01-11','1'),(
5,'xRrvQSHcZn5','xRrvQSHcZn','xRrvQSHcZn','2020-10-18','2'),(6,'gTDfGFNLEj6','gTDfGFNLEj','gTDfGFNLEj','2020-01-13','0'),(7,'nBETIlVCle7'
,'nBETIlVCle','nBETIlVCle','2020-09-27','1'),(8,'vmePKKZjJU8','vmePKKZjJU','vmePKKZjJU','2020-10-20','2'),(9,'pWjaLhJVaB9','pWjaLhJVaB','
pWjaLhJVaB','2020-05-07','0'),(10,'zimgGFPEQe10','zimgGFPEQe','zimgGFPEQe','2020-08-01','1'),(11,'uHpIsEALNp11','uHpIsEALNp','uHpIsEALNp'
,'2020-12-17','2'),(12,'kCfPeCgMjn12','kCfPeCgMjn','kCfPeCgMjn','2020-07-13','0'),(13,'QRkLwosIdM13','QRkLwosIdM','QRkLwosIdM','2020-08-2
4','1'),(14,'ipsKyeFeJy14','ipsKyeFeJy','ipsKyeFeJy','2020-02-22','2'),(15,'ZRrcPvYDtF15','ZRrcPvYDtF','ZRrcPvYDtF','2020-12-07','0'),(16
,'BbLUYWHeTg16','BbLUYWHeTg','BbLUYWHeTg','2020-04-17','1'),(17,'DalMVUpMnk17','DalMVUpMnk','DalMVUpMnk','2020-10-16','2'),(18,'HFtmFtnZP
i18','HFtmFtnZPi','HFtmFtnZPi','2020-11-25','0'),(19,'maHoYocalj19','maHoYocalj','maHoYocalj','2020-03-03','1'),(20,'nHKmkDGSeH20','nHKmk
DGSeH','nHKmkDGSeH','2020-01-02','2'),(21,'MZZziMtXLH21','MZZziMtXLH','MZZziMtXLH','2020-04-01','0'),(22,'bjUXRogYgF22','bjUXRogYgF','bjU
XRogYgF','2020-07-12','1'),(23,'CVgMEIwyGf23','CVgMEIwyGf','CVgMEIwyGf','2020-12-05','2'),(24,'yXVrVLgSmR24','yXVrVLgSmR','yXVrVLgSmR','2
020-04-11','0'),(25,'oaFXNzAigC25','oaFXNzAigC','oaFXNzAigC','2020-11-09','1'),(26,'IJrJiutZtD26','IJrJiutZtD','IJrJiutZtD','2020-07-17',
'2'),(27,'WGwcrfrFOB27','WGwcrfrFOB','WGwcrfrFOB','2020-09-22','0'),(28,'RbCMhegoiU28','RbCMhegoiU','RbCMhegoiU','2020-06-01','1'),(29,'R
zRzNPEsQm29','RzRzNPEsQm','RzRzNPEsQm','2020-02-24','2'),(30,'SYzgGoVRwv30','SYzgGoVRwv','SYzgGoVRwv','2020-07-03','0'),(31,'hLuUHxjJhk31
','hLuUHxjJhk','hLuUHxjJhk','2020-01-09','1'),(32,'jhUhcVaQkV32','jhUhcVaQkV','jhUhcVaQkV','2020-04-27','2'),(33,'MmbKbOrEpK33','MmbKbOrE
pK','MmbKbOrEpK','2020-05-02','0');
```

C. 将db01数据库的表的表结构与数据分开备份(`-T`)

`mysqldump -uroot -p123456 -T /root frx01 score`

执行上述指令，会出错，数据不能完成备份，原因是因为我们所指定的数据存放目录/root，MySQL认为是不安全的，需要存储在MySQL信任的目录下。那么，哪个目录才是MySQL信任的目录呢，可以查看一下系统变量 `secure_file_priv` 。执行结果如下：

```sh
mysql> show variables like '%secure_file_priv%';
+------------------+-----------------------+
| Variable_name    | Value                 |
+------------------+-----------------------+
| secure_file_priv | /var/lib/mysql-files/ |
+------------------+-----------------------+
1 row in set (0.01 sec)
```

```sh
mysqldump -uroot -p123456 -T /var/lib/mysql-files/ frx01 score
```

```sh {6-7}
[root@frx01 ~]# mysqldump -uroot -p123456 -T /var/lib/mysql-files/ MySQL_Advanced stu
mysqldump: [Warning] Using a password on the command line interface can be insecure.
[root@frx01 ~]# cd /var/lib/mysql-files/
[root@frx01 mysql-files]# ll
总用量 8
-rw-r--r-- 1 root  root  1596 10月  4 16:48 stu.sql     #表结构文件
-rw-r----- 1 mysql mysql   68 10月  4 16:48 stu.txt     #表数据文件
```

上述的两个文件 score.sql 中记录的就是表结构文件，而 score.txt 就是表数据文件，但是需要注意表数据文件，并不是记录一条条的insert语句，而是按照一定的格式记录表结构中的数据。如下：

```sh
[root@frx01 mysql-files]# cat stu.txt
1       1       c
3       3       Java
7       7       Marry
8       8       rose
11      11      jetty
19      19      xuan
25      25      luci
```

### mysqlimport/source

1. mysqlimport

mysqlimport 是客户端数据导入工具，用来导入mysqldump 加 -T 参数后导出的文本文件。

```sh
语法 ：
	mysqlimport [options] db_name textfile1 [textfile2...]
示例 ：
	mysqlimport -uroot -p2143 test /tmp/city.txt
```

```sh
[root@frx01 mysql-files]# mysqlimport -u root -p MySQL_Advanced /var/lib/mysql-files/stu.txt
Enter password:
MySQL_Advanced.stu: Records: 7  Deleted: 0  Skipped: 0  Warnings: 0
```

2. source

如果需要导入sql文件,可以使用mysql中的source 指令 :

```sh
语法 ：
	source /root/xxxxx.sql
```

```sql
mysql> source /var/lib/mysql-files/stu.sql
Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.01 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected, 1 warning (0.14 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)

Query OK, 0 rows affected (0.00 sec)
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221004/image.2cmla4jxlpog.webp)