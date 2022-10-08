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

