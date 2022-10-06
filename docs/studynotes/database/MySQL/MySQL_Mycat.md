---
title: MySQL 分库分表
date: 2022-10-06 11:50:12
permalink: /database/MySQL/MySQL_Mycat
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 分库分表

[[toc]]

## 介绍

### 问题分析

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.4ob3i6abfbe0.webp)

随着互联网及移动互联网的发展，应用系统的数据量也是成指数式增长，若采用单数据库进行数据存储，存在以下性能瓶颈：

1. IO瓶颈：热点数据太多，数据库缓存不足，产生大量磁盘IO，效率较低。 请求数据太多，带宽不够，网络IO瓶颈。
2. CPU瓶颈：排序、分组、连接查询、聚合统计等SQL会耗费大量的CPU资源，请求数太多，CPU出现瓶颈。

为了解决上述问题，我们需要对数据库进行分库分表处理。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.1coobo0w2m9s.webp)

分库分表的中心思想都是将数据分散存储，使得单一数据库/表的数据量变小来缓解单一数据库的性能问题，从而达到提升数据库性能的目的。

### 拆分策略

分库分表的形式，主要是两种：垂直拆分和水平拆分。而拆分的粒度，一般又分为分库和分表，所以组成的拆分策略最终如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.1h7c6b96hrgg.webp)

### 垂直拆分

1. 垂直分库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.191pv8dg3pkw.webp)

垂直分库：以表为依据，根据业务将不同表拆分到不同库中。

特点：

+ 每个库的表结构都不一样。
+ 每个库的数据也不一样。
+ 所有库的并集是全量数据。

2. 垂直分表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.53kx4s5dobg0.webp)

垂直分表：以字段为依据，根据字段属性将不同字段拆分到不同表中。

特点：

+ 每个表的结构都不一样。
+ 每个表的数据也不一样，一般通过一列（主键/外键）关联。
+ 所有表的并集是全量数据。

### 水平拆分

1. 水平分库

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.5xzqp4zd4900.webp)

水平分库：以字段为依据，按照一定策略，将一个库的数据拆分到多个库中。

特点：

+ 每个库的表结构都一样。
+ 每个库的数据都不一样。
+ 所有库的并集是全量数据。

2. 水平分表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.6nde0aiacxc0.webp)

水平分表：以字段为依据，按照一定策略，将一个表的数据拆分到多个表中。

特点：

+ 每个表的表结构都一样。
+ 每个表的数据都不一样。
+ 所有表的并集是全量数据。

> 在业务系统中，为了缓解磁盘IO及CPU的性能瓶颈，到底是垂直拆分，还是水平拆分；具体是分库，还是分表，都需要根据具体的业务需求具体分析。

### 实现技术

+ `shardingJDBC`：基于AOP原理，在应用程序中对本地执行的SQL进行拦截，解析、改写、路由处理。需要自行编码配置实现，只支持java语言，性能较高。
+ `MyCat`：数据库分库分表中间件，不用调整代码即可实现分库分表，支持多种语言，性能不及前者。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.138hdd539txc.webp)

本次课程，我们选择了是MyCat数据库中间件，通过MyCat中间件来完成分库分表操作。

## MyCat概述

### 介绍

Mycat是开源的、活跃的、基于Java语言编写的MySQL<mark>数据库中间件</mark>。可以像使用mysql一样来使用mycat，对于开发人员来说根本感觉不到mycat的存在。

开发人员只需要连接MyCat即可，而具体底层用到几台数据库，每一台数据库服务器里面存储了什么数据，都无需关心。 具体的分库分表的策略，只需要在MyCat中配置即可。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.38jnz8if0080.webp)

优势：

+ 性能可靠稳定
+ 强大的技术团队
+ 体系完善
+ 社区活跃

### 下载

下载地址：[http://dl.mycat.org.cn/](http://dl.mycat.org.cn/)

### 安装

Mycat是采用java语言开发的开源的数据库中间件，支持Windows和Linux运行环境，下面介绍MyCat的Linux中的环境搭建。我们需要在准备好的服务器中安装如下软件。

+ MySQL
+ JDK
+ Mycat

| 服务器         | 安装软件   | 说明              |
| -------------- | ---------- | ----------------- |
| 192.168.91.166 | JDK、Mycat | MyCat中间件服务器 |
| 192.168.91.166 | MySQL      | 分片服务器        |
| 192.168.91.167 | MySQL      | 分片服务器        |
| 192.168.91.168 | MySQL      | 分片服务器        |

+ [jdk安装步骤](/pages/600247/#安装新的jdk)
+ 安装Mycat

+ 使用XFTP工具将下载好的文件上传到Linux系统上。
+ 使用解压命令

```sh
tar -zxvf Mycat-server-1.6.7.3-release-20190828135747-linux.tar.gz -C /usr/local
```

### 目录介绍

```sh
[root@MySQL-Master mycat]# ll
总用量 12
drwxr-xr-x 2 root root  190 10月  6 11:36 bin
drwxrwxrwx 2 root root    6 7月  18 2019 catlet
drwxrwxrwx 4 root root 4096 10月  6 11:36 conf
drwxr-xr-x 2 root root 4096 10月  6 11:36 lib
drwxrwxrwx 2 root root    6 8月  28 2019 logs
-rwxrwxrwx 1 root root  227 8月  28 2019 version.txt
```

bin : 存放可执行文件，用于启动停止mycat

conf：存放mycat的配置文件

lib：存放mycat的项目依赖包（jar）

logs：存放mycat的日志文件

+ 由于mycat中的mysql的JDBC驱动包版本比较低，所以我们将它删去，下载8.0版本的

```sh
cd /usr/local/mycat/lib/
rm -rf mysql-connector-java-5.1.35.jar
```

+ [mysql驱动包下载地址](https://downloads.mysql.com/archives/c-j/)

+ 将下载好的驱动包通过XFTP工具上传到Linux系统的/usr/local/mycat/lib/目录。

### 概念介绍

在MyCat的整体结构中，分为两个部分：上面的逻辑结构、下面的物理结构。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.4u4c01j1h1u0.webp)

在MyCat的逻辑结构主要负责逻辑库、逻辑表、分片规则、分片节点等逻辑结构的处理，而具体的数据存储还是在物理结构，也就是数据库服务器中存储的。

在后面讲解MyCat入门以及MyCat分片时，还会讲到上面所提到的概念。

## MyCat入门

### 需求

由于 tb_order 表中数据量很大，磁盘IO及容量都到达了瓶颈，现在需要对 tb_order 表进行数据分片，分为三个数据节点，每一个节点主机位于不同的服务器上, 具体的结构，参考下图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.ua40csdhxxc.webp)

### 环境准备

准备3台服务器：

+ 192.168.91.166：MyCat中间件服务器，同时也是第一个分片服务器。
+ 192.168.91.167：第二个分片服务器。
+ 192.168.91.168：第三个分片服务器。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.18ehbfcmnzuo.webp)

并且在上述3台数据库中创建数据库 db01 。

### 配置

1. schema.xml

在schema.xml中配置逻辑库、逻辑表、数据节点、节点主机等相关信息。具体的配置如下：

```xml {12,16,20}
<?xml version="1.0"?>
<!DOCTYPE mycat:schema SYSTEM "schema.dtd">
<mycat:schema xmlns:mycat="http://io.mycat/">
    <schema name="DB01" checkSQLschema="true" sqlMaxLimit="100">
        <table name="TB_ORDER" dataNode="dn1,dn2,dn3" rule="auto-sharding-long"/>
    </schema>
    <dataNode name="dn1" dataHost="dhost1" database="db01"/>
    <dataNode name="dn2" dataHost="dhost2" database="db01"/>
    <dataNode name="dn3" dataHost="dhost3" database="db01"/>
    <dataHost name="dhost1" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc" switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master" url="jdbc:mysql://192.168.91.166:3306?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8" user="root" password="123456"/>
    </dataHost>
    <dataHost name="dhost2" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc" switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master" url="jdbc:mysql://192.168.91.167:3306?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8" user="root" password="123456"/>
    </dataHost>
    <dataHost name="dhost3" maxCon="1000" minCon="10" balance="0" writeType="0" dbType="mysql" dbDriver="jdbc" switchType="1" slaveThreshold="100">
        <heartbeat>select user()</heartbeat>
        <writeHost host="master" url="jdbc:mysql://192.168.91.168:3306?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8" user="root" password="123456"/>
    </dataHost>
</mycat:schema>
```

2. server.xml

需要在server.xml中配置用户名、密码，以及用户的访问权限信息，具体的配置如下：

```xml {2-3,14-15}
<user name="root" defaultAccount="true">
	<property name="password">123456</property>
	<property name="schemas">DB01</property>
	<!-- 表级 DML 权限设置 -->
	<!--
	<privileges check="true">
		<schema name="DB01" dml="0110" >
			<table name="TB_ORDER" dml="1110"></table>
		</schema>
	</privileges>
	-->
</user>
<user name="user">
	<property name="password">123456</property>
	<property name="schemas">DB01</property>
	<property name="readOnly">true</property>
</user>
```

上述的配置表示，定义了两个用户 root 和 user ，这两个用户都可以访问 DB01 这个逻辑库，访问密码都是123456，但是root用户访问DB01逻辑库，既可以读，又可以写，但是 user用户访问DB01逻辑库是只读的。

::: details

```xml
<?xml version="1.0" encoding="UTF8"?>
<!DOCTYPE mycat:server SYSTEM "server.dtd">
<mycat:server xmlns:mycat="http://io.mycat/">
	<system>
	<property name="nonePasswordLogin">0</property> 
	<property name="useHandshakeV10">1</property>
	<property name="useSqlStat">0</property>  
	<property name="useGlobleTableCheck">0</property>  
		<property name="sqlExecuteTimeout">300</property>  
		<property name="sequnceHandlerType">2</property>
		<property name="sequnceHandlerPattern">(?:(\s*next\s+value\s+for\s*MYCATSEQ_(\w+))(,|\)|\s)*)+</property>
	<property name="subqueryRelationshipCheck">false</property> 
    
		<property name="processorBufferPoolType">0</property>
		<property name="handleDistributedTransactions">0</property>

		<property name="useOffHeapForMerge">0</property>

        <property name="memoryPageSize">64k</property>

		<property name="spillsFileBufferSize">1k</property>

		<property name="useStreamOutput">0</property>

		<property name="systemReserveMemorySize">384m</property>


		<property name="useZKSwitch">false</property>
		<property name="strictTxIsolation">false</property>
		
		<property name="useZKSwitch">true</property>
		
	</system>
	
	<user name="root" defaultAccount="true">
		<property name="password">123456</property>
		<property name="schemas">DB01</property>
	</user>

	<user name="user">
		<property name="password">123456</property>
		<property name="schemas">DB01</property>
		<property name="readOnly">true</property>
	</user>

</mycat:server>
```

:::

### 测试

#### 启动

配置完毕后，先启动涉及到的3台分片服务器，然后启动MyCat服务器。切换到Mycat的安装目录，执行如下指令，启动Mycat：

```sh
#启动
bin/mycat start
#停止
bin/mycat stop
```

Mycat启动之后，占用端口号 8066。

启动完毕之后，可以查看logs目录下的启动日志，查看Mycat是否启动完成。

```sh
[root@MySQL-Master mycat]# tail -10 logs/wrapper.log
STATUS | wrapper  | 2022/10/06 23:08:01 | TERM trapped.  Shutting down.
STATUS | wrapper  | 2022/10/06 23:08:03 | <-- Wrapper Stopped
STATUS | wrapper  | 2022/10/06 23:08:08 | --> Wrapper Started as Daemon
STATUS | wrapper  | 2022/10/06 23:08:08 | Launching a JVM...
INFO   | jvm 1    | 2022/10/06 23:08:08 | Java HotSpot(TM) 64-Bit Server VM warning: ignoring option MaxPermSize=64M; support was removed in 8.0
INFO   | jvm 1    | 2022/10/06 23:08:08 | Wrapper (Version 3.2.3) http://wrapper.tanukisoftware.org
INFO   | jvm 1    | 2022/10/06 23:08:08 |   Copyright 1999-2006 Tanuki Software, Inc.  All Rights Reserved.
INFO   | jvm 1    | 2022/10/06 23:08:08 |
INFO   | jvm 1    | 2022/10/06 23:08:09 | Loading class `com.mysql.jdbc.Driver'. This is deprecated. The new driver class is `com.mysql.cj.jdbc.Driver'. The driver is automatically registered via the SPI and manual loading of the driver class is generally unnecessary.
INFO   | jvm 1    | 2022/10/06 23:08:11 | MyCAT Server startup successfully. see logs in logs/mycat.log
```

#### 测试

1. 连接MyCat

通过如下指令，就可以连接并登陆MyCat。

```sh
mysql -h 192.168.91.166 -P 8066 -u root -p 123456
```

```sh {5}
[root@MySQL-Master ~]# mysql -h 192.168.91.166 -P 8066 -u root -p
Enter password:
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 2
Server version: 5.6.29-mycat-1.6.7.3-release-20190828215749 MyCat Server (OpenCloudDB)

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

我们看到我们是通过MySQL的指令来连接的MyCat，因为MyCat在底层实际上是模拟了MySQL的协议。

2. 数据测试

然后就可以在MyCat中来创建表，并往表结构中插入数据，查看数据在MySQL中的分布情况。

```sql
CREATE TABLE TB_ORDER (
	id BIGINT(20) NOT NULL,
    title VARCHAR(100) NOT NULL ,
	PRIMARY KEY (id)
) ENGINE=INNODB DEFAULT CHARSET=utf8 ;
INSERT INTO TB_ORDER(id,title) VALUES(1,'goods1');
INSERT INTO TB_ORDER(id,title) VALUES(2,'goods2');
INSERT INTO TB_ORDER(id,title) VALUES(3,'goods3');

INSERT INTO TB_ORDER(id,title) VALUES(1,'goods1');
INSERT INTO TB_ORDER(id,title) VALUES(2,'goods2');
INSERT INTO TB_ORDER(id,title) VALUES(3,'goods3');
INSERT INTO TB_ORDER(id,title) VALUES(5000000,'goods5000000');
INSERT INTO TB_ORDER(id,title) VALUES(10000000,'goods10000000');
INSERT INTO TB_ORDER(id,title) VALUES(10000001,'goods10000001');
INSERT INTO TB_ORDER(id,title) VALUES(15000000,'goods15000000');
INSERT INTO TB_ORDER(id,title) VALUES(15000001,'goods15000001');
```

```sql
mysql> INSERT INTO TB_ORDER(id,title) VALUES(5000000,'goods5000000');
Query OK, 1 row affected (0.00 sec)
 OK!

mysql> INSERT INTO TB_ORDER(id,title) VALUES(10000000,'goods10000000');
Query OK, 1 row affected (0.03 sec)
 OK!

mysql> INSERT INTO TB_ORDER(id,title) VALUES(10000001,'goods10000001');
Query OK, 1 row affected (0.00 sec)
 OK!

mysql> INSERT INTO TB_ORDER(id,title) VALUES(15000000,'goods15000000');
Query OK, 1 row affected (0.00 sec)
 OK!

mysql> INSERT INTO TB_ORDER(id,title) VALUES(15000001,'goods15000001');
ERROR 1064 (HY000): can't find any valid datanode :TB_ORDER -> ID -> 1500                                                                              0001
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221006/image.ws7ewrq0r74.webp)

经过测试，我们发现，在往 TB_ORDER 表中插入数据时：

+ 如果id的值在1-500w之间，数据将会存储在第一个分片数据库中。
+ 如果id的值在500w-1000w之间，数据将会存储在第二个分片数据库中。
+ 如果id的值在1000w-1500w之间，数据将会存储在第三个分片数据库中。

+ 如果id的值超出1500w，在插入数据时，将会报错。

为什么会出现这种现象，数据到底落在哪一个分片服务器到底是如何决定的呢？ 这是由逻辑表配置时的一个参数 rule 决定的，而这个参数配置的就是分片规则，关于分片规则的配置，在后面会详细讲解。

