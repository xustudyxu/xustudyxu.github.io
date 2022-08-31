---
title: Seata 分布式事务
date: 2022-08-31 18:33:52
permalink: /Spring/SpringCloud/Seata_
categories:
  - SpringCloud
tags:
  - SpringCloud
---
# Seata 分布式事务

[[toc]]

## 分布式事务问题由来

分布式前

- 单机单库没这个问题
- 从1:1 -> 1:N -> N:N

单体应用被拆分成微服务应用，原来的三个模块被拆分成三个独立的应用,分别使用三个独立的数据源，业务操作需要调用三三 个服务来完成。此时**每个服务内部的数据一致性由本地事务来保证， 但是全局的数据一致性问题没法保证**。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220831/image.4allg2qmxww0.webp)

一句话：**一次业务操作需要跨多个数据源或需要跨多个系统进行远程调用，就会产生分布式事务问题**。

## Seata术语

**是什么**

Seata是一款开源的分布式事务解决方案，致力于在微服务架构下提供高性能和简单易用的分布式事务服务。

[官方网址](http://seata.io/zh-cn/)

**能干嘛**

一个典型的分布式事务过程

分布式事务处理过程的一ID+三组件模型：

- Transaction ID XID 全局唯一的事务ID
- 三组件概念
  - TC (Transaction Coordinator) - 事务协调者：维护全局和分支事务的状态，驱动全局事务提交或回滚。
  - TM (Transaction Manager) - 事务管理器：定义全局事务的范围：开始全局事务、提交或回滚全局事务。
  - RM (Resource Manager) - 资源管理器：管理分支事务处理的资源，与TC交谈以注册分支事务和报告分支事务的状态，并驱动分支事务提交或回滚。
    

处理过程：

1. TM向TC申请开启一个全局事务，全局事务创建成功并生成一个全局唯一的XID；
2. XID在微服务调用链路的上下文中传播；
3. RM向TC注册分支事务，将其纳入XID对应全局事务的管辖；
4. TM向TC发起针对XID的全局提交或回滚决议；
5. TC调度XID下管辖的全部分支事务完成提交或回滚请求。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220831/image.4jnpi8ows1o0.webp)

## Seata-Server安装

**去哪下**

发布说明: [https://github.com/seata/seata/releases](https://github.com/seata/seata/releases)

**怎么玩**

本地@Transactional

全局@GlobalTransactional

**SEATA 的分布式交易解决方案**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220831/image.79kbqiibjmw0.webp)

我们只需要使用一个 `@GlobalTransactional` 注解在业务方法上:

**Seata-Server安装**

官网地址 - [http://seata.io/zh-cn/](http://seata.io/zh-cn/)

下载版本 - 0.9.0

seata-server-0.9.0.zip解压到指定目录并修改conf目录下的file.conf配置文件

先备份原始file.conf文件

主要修改:自定义事务组名称+事务日志存储模式为db +数据库连接信息

file.conf

service模块

```nginx
service {
    ##fsp_tx_group是自定义的
    vgroup_mapping.my.test.tx_group="fsp_tx_group" 
    default.grouplist = "127.0.0.1:8091"
    enableDegrade = false
    disable = false
    max.commitretry.timeout= "-1"
    max.ollbackretry.timeout= "-1"
}
```

store模块

```nginx
## transaction log store
store {
	## store mode: file, db
	## 改成db
	mode = "db"
	
	## file store
	file {
		dir = "sessionStore"
		
		# branch session size, if exceeded first try compress lockkey, still exceeded throws exceptions
		max-branch-session-size = 16384
		# globe session size, if exceeded throws exceptions
		max-global-session-size = 512
		# file buffer size, if exceeded allocate new buffer
		file-write-buffer-cache-size = 16384
		# when recover batch read size
		session.reload.read_size= 100
		# async, sync
		flush-disk-mode = async
	}

	# database store
	db {
		## the implement of javax.sql.DataSource, such as DruidDataSource(druid)/BasicDataSource(dbcp) etc.
		datasource = "dbcp"
		## mysql/oracle/h2/oceanbase etc.
		## 配置数据源
		db-type = "mysql"
		driver-class-name = "com.mysql.jdbc.Driver"
		url = "jdbc:mysql://127.0.0.1:3306/seata"
		user = "root"
		password = "你自己密码"
		min-conn= 1
		max-conn = 3
		global.table = "global_table"
		branch.table = "branch_table"
		lock-table = "lock_table"
		query-limit = 100
	}
}
```

