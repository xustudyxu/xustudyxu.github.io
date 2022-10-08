---
title: MySQL 读写分离
date: 2022-10-08 19:58:07
permalink: /database/MySQL/MySQL_Read_write_separation
categories:
  - MySQL
tags:
  - MySQL
---
# MySQL 读写分离

[[toc]]

## 介绍

读写分离,简单地说是把对数据库的读和写操作分开,以对应不同的数据库服务器。主数据库提供写操作，从数据库提供读操作，这样能有效地减轻单台数据库的压力。

通过MyCat即可轻易实现上述功能，不仅可以支持MySQL，也可以支持Oracle和SQL Server。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221008/image.1lmgf0v18c74.webp)

## 一主一从

### 原理

MySQL的主从复制，是基于二进制日志（binlog）实现的。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221008/image.5906a4hbtm80.webp)

在 [主从复制](/database/MySQL/MySQL_Master_slave_replication/) 章节有详细说明。

### 准备

| 主机           | 角色   | 用户名 | 密码   |
| -------------- | ------ | ------ | ------ |
| 192.168.91.166 | master | root   | 123456 |
| 192.168.91.167 | slave  | root   | 123456 |

> 备注：主从复制的搭建，可以参考前面文章中 [主从复制](/database/MySQL/MySQL_Master_slave_replication/) 章节讲解的步骤操作。

+ 结果验证

```sh {13-14}
mysql> show replica status\G
*************************** 1. row ***************************
             Replica_IO_State: Waiting for source to send event
                  Source_Host: 192.168.91.166
                  Source_User: itcast01
                  Source_Port: 3306
                Connect_Retry: 60
              Source_Log_File: binlog.000001
          Read_Source_Log_Pos: 156
               Relay_Log_File: MySQL-Slave-relay-bin.000002
                Relay_Log_Pos: 321
        Relay_Source_Log_File: binlog.000001
           Replica_IO_Running: Yes
          Replica_SQL_Running: Yes
```

## 一主一从读写分离

MyCat控制后台数据库的读写分离和负载均衡由schema.xml文件datahost标签的balance属性控制。

### schema.xml配置

```xml {8,9}
<!-- 配置逻辑库 -->
<schema name="ITCAST_RW" checkSQLschema="true" sqlMaxLimit="100" dataNode="dn7">
</schema>
<dataNode name="dn7" dataHost="dhost7" database="itcast01" />

<dataHost name="dhost7" maxCon="1000" minCon="10" balance="1" writeType="0" dbType="mysql" dbDriver="jdbc" switchType="1" slaveThreshold="100">
	<heartbeat>select user()</heartbeat>
	<writeHost host="master1" url="jdbc:mysql://192.168.91.166:3306?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8" user="root" password="123456" >
	<readHost host="slave1" url="jdbc:mysql://192.168.91.167:3306?useSSL=false&amp;serverTimezone=Asia/Shanghai&amp;characterEncoding=utf8" user="root" password="123456" />
	</writeHost>
</dataHost>
```

上述配置的具体关联对应情况如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221008/image.708uxi3603c0.webp)

writeHost代表的是写操作对应的数据库，readHost代表的是读操作对应的数据库。 所以我们要想实现读写分离，就得配置writeHost关联的是主库，readHost关联的是从库。

而仅仅配置好了writeHost以及readHost还不能完成读写分离，还需要配置一个非常重要的负责均衡的参数 balance，取值有4种，具体含义如下：

| 参数值 | 含义                                                         |
| ------ | ------------------------------------------------------------ |
| 0      | 不开启读写分离机制 , 所有读操作都发送到当前可用的writeHost上 |
| 1      | 全部的readHost 与 备用的writeHost 都参与select 语句的负载均衡（主要针对于双主双从模式） |
| 2      | 所有的读写操作都随机在writeHost , readHost上分发             |
| 3      | 所有的读请求随机分发到writeHost对应的readHost上执行, writeHost不负担读压力 |

所以，在一主一从模式的读写分离中，balance配置1或3都是可以完成读写分离的。

### server.xml配置

配置root用户可以访问SHOPPING、ITCAST 以及 ITCAST_RW逻辑库。

```xml
<user name="root" defaultAccount="true">
	<property name="password">123456</property>
	<property name="schemas">SHOPPING,ITCAST,ITCAST_RW</property>
    
    <!-- 表级 DML 权限设置 -->
    <!--
    <privileges check="true">
		<schema name="DB01" dml="0110" >
			<table name="TB_ORDER" dml="1110"></table>
		</schema>
	</privileges>
-->
</user>
```

### 测试

配置完毕MyCat后，重新启动MyCat。

```sh
bin/mycat stop
bin/mycat start
```

然后观察，在执行增删改操作时，对应的主库及从库的数据变化。 在执行查询操作时，检查主库及从库对应的数据变化。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221008/image.61kc2y9660g0.webp)

在数据库写入一条数据，发现主从节点都增加一条数据，其实这条数据是从主节点写入的，因为数据是由主机点同步到从节点。

在数据库修改一条数据，发现主节点没有改变，从节点改变了，还是因为数据是由主机点同步到从节点。

在测试中，我们可以发现当主节点Master宕机之后，业务系统就只能够读，而不能写入数据了。

```sql {14}
mysql> select * from tb_user;
+------+---------+-----+
| id   | name    | sex |
+------+---------+-----+
|    1 | Tom     | 1   |
|    2 | Trigger | 0   |
|    3 | Dawn    | 1   |
|    8 | It5     | 0   |
+------+---------+-----+
4 rows in set (0.01 sec)

mysql> insert into tb_user(id,name,sex) values(10,'It5',0);
ERROR:
No operations allowed after connection closed.
mysql>
```

那如何解决这个问题呢？这个时候我们就得通过另外一种主从复制结构来解决了，也就是我们接下来演示的双主双从。

## docker 搭建MySQL一主一从

[docker的安装](/project-management/Docker/Docker_install/#安装方法)

1. 镜像下载

```sh
docker pull mysql:5.7
```

2. **新建主服务器容器实例:3307**

```sh
docker run -p 3307:3306 --name mysql-master  -v /mydata/mysql-master/log:/var/log/mysql -v /mydata/mysql-master/data:/var/lib/mysql -v /mydata/mysql-master/conf:/etc/mysql -e MYSQL_ROOT_PASSWORD=root  -d mysql:5.7
```

```sh
[root@MySQL-Master ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
48c39e5628e8        mysql:5.7           "docker-entrypoint.s…"   10 minutes ago      Up 10 minutes       33060/tcp, 0.0.0.0:3307->3306/tcp   mysql-master
```

3. 进入`/mydata/mysql-master/conf`目录下新建my.cnf

```sh
[root@MySQL-Master mycat]# cd /mydata/mysql-master/conf
[root@MySQL-Master conf]# vim my.cnf
```

```properties
[mysqld]

## 设置server_id，同一局域网中需要唯一

server_id=101 

## 指定不需要同步的数据库名称

binlog-ignore-db=mysql  

## 开启二进制日志功能

log-bin=mall-mysql-bin  

## 设置二进制日志使用内存大小（事务）

binlog_cache_size=1M  

## 设置使用的二进制日志格式（mixed,statement,row）

binlog_format=mixed  

## 二进制日志过期清理时间。默认值为0，表示不自动清理。

expire_logs_days=7  

## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。

## 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致

slave_skip_errors=1062
```

4. 修改完配置后重启master实例

```sh
docker restart mysql-master
```

5. 进入mysql-master容器

```sh
docker exec -it mysql-master /bin/bash
```

```sh
mysql -u root -p #登录
```

6. master容器实例内创建数据同步用户

```sh
CREATE USER 'slave'@'%' IDENTIFIED BY '123456';
GRANT REPLICATION SLAVE,REPLICATION CLIENT ON *.* TO 'slave'@'%';
```

7. **新建从服务器容器实例3308**

```sh
docker run -p 3308:3306 --name mysql-slave -v /mydata/mysql-slave/log:/var/log/mysql -v /mydata/mysql-slave/data:/var/lib/mysql -v /mydata/mysql-slave/conf:/etc/mysql -e MYSQL_ROOT_PASSWORD=root  -d mysql:5.7
```

```sh
[root@MySQL-Master ~]# docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
4dba1c095b94        mysql:5.7           "docker-entrypoint.s…"   17 seconds ago      Up 15 seconds       33060/tcp, 0.0.0.0:3308->3306/tcp   mysql-slave
48c39e5628e8        mysql:5.7           "docker-entrypoint.s…"   10 minutes ago      Up 10 minutes       33060/tcp, 0.0.0.0:3307->3306/tcp   mysql-master
```

8. 进入`/mydata/mysql-slave/conf`目录下新建my.cnf

```sh
cd /mydata/mysql-slave/conf
vim my.cnf
```

```properties
[mysqld]

## 设置server_id，同一局域网中需要唯一

server_id=102

## 指定不需要同步的数据库名称

binlog-ignore-db=mysql  

## 开启二进制日志功能，以备Slave作为其它数据库实例的Master时使用

log-bin=mall-mysql-slave1-bin  

## 设置二进制日志使用内存大小（事务）

binlog_cache_size=1M  

## 设置使用的二进制日志格式（mixed,statement,row）

binlog_format=mixed  

## 二进制日志过期清理时间。默认值为0，表示不自动清理。

expire_logs_days=7  

## 跳过主从复制中遇到的所有错误或指定类型的错误，避免slave端复制中断。

## 如：1062错误是指一些主键重复，1032错误是因为主从数据库数据不一致

slave_skip_errors=1062  

## relay_log配置中继日志

relay_log=mall-mysql-relay-bin  

## log_slave_updates表示slave将复制事件写进自己的二进制日志

log_slave_updates=1  

## slave设置为只读（具有super权限的用户除外）

read_only=1
```

9. 修改完配置后重启slave实例

```sh
docker restart mysql-slave
```

10. 进入mysql-slave容器

```sh
docker exec -it mysql-slave /bin/bash
```

```sh
mysql -u root -p
```

11. 在从数据库中配置主从复制

> 这条命令中的mall-mysql-bin.000001和617,要与master节点二进制日志坐标保持一致。

```sh
change master to master_host='192.168.91.166', master_user='slave', master_password='123456', master_port=3307, master_log_file='mall-mysql-bin.000001', master_log_pos=617, master_connect_retry=30;
```

| 参数                 | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| master_host          | 主数据库的IP地址                                             |
| master_port          | 主数据库的运行端口                                           |
| master_password      | 在主数据库创建的用于同步数据的用户密码                       |
| master_log_file      | 指定从数据库要复制数据的日志文件，通过查看主数据的状态，获取File参数 |
| master_log_pos       | 指定从数据库从哪个位置开始复制数据，通过查看主数据的状态，获取Position参数 |
| master_connect_retry | 连接失败重试的时间间隔，单位为秒                             |

12. 在从数据库中查看主从同步状态

```sh
show slave status\G
```

```sh {13,14}
mysql> show slave status\G
*************************** 1. row ***************************
               Slave_IO_State:
                  Master_Host: 192.168.91.166
                  Master_User: slave
                  Master_Port: 3307
                Connect_Retry: 30
              Master_Log_File: mall-mysql-bin.000002
          Read_Master_Log_Pos: 371
               Relay_Log_File: mall-mysql-relay-bin.000002
                Relay_Log_Pos: 325
        Relay_Master_Log_File: mall-mysql-bin.000002
             Slave_IO_Running: No
            Slave_SQL_Running: No
```

13. 在从数据库中开启主从同步

```sh
start slave;
```

14. 再次从数据库中查看主从同步状态

```sh {1，13,14}
mysql> show slave status\G
*************************** 1. row ***************************
               Slave_IO_State: Waiting for master to send event
                  Master_Host: 192.168.91.166
                  Master_User: slave
                  Master_Port: 3307
                Connect_Retry: 30
              Master_Log_File: mall-mysql-bin.000002
          Read_Master_Log_Pos: 371
               Relay_Log_File: mall-mysql-relay-bin.000002
                Relay_Log_Pos: 325
        Relay_Master_Log_File: mall-mysql-bin.000002
             Slave_IO_Running: Yes
            Slave_SQL_Running: Yes
```

### 测试

1. 主机新建库-使用库-新建表-插入数据,ok

```sql
mysql> create database db01;
Query OK, 1 row affected (0.00 sec)

mysql> use db01;
Database changed
mysql> create table tb01(id int,name varchar(10));
Query OK, 0 rows affected (0.01 sec)

mysql> insert into tb01 values (1,'frx');
Query OK, 1 row affected (0.08 sec)

```

2. 从机使用库-查看记录,ok

```sql
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| db01               |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
5 rows in set (0.00 sec)

mysql> use db01;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
mysql> show tables;
+----------------+
| Tables_in_db01 |
+----------------+
| tb01           |
+----------------+
1 row in set (0.00 sec)

mysql> select * from tb01 where id = 1;
+------+------+
| id   | name |
+------+------+
|    1 | frx  |
+------+------+
1 row in set (0.00 sec)
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221008/image.6tk44n5jro40.webp)

