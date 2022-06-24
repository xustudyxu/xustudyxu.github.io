---
title: HBase数据定义
date: 2022-03-23 20:56:04
permalink: /pages/c23c27/
categories:
  - HBase
tags:
  - HBase
---
# HBase数据定义

[[toc]]

## HBase Shell

HBase Shell：HBase的命令行工具，最简单的接口，适合HBase管理使用； 

```shell
[root@localhost bin]# hbase shell
HBase Shell; enter 'help<RETURN>' for list of supported commands.
Type "exit<RETURN>" to leave the HBase Shell
Version 1.2.6, rUnknown, Mon May 29 02:25:32 CDT 2017
hbase(main):001:0>
```

| 命令       | 描述                      | 语法          |
| ---------- | ------------------------- | ------------- |
| help       | 查看命令的使用描述        | help '命令名' |
| whoami     | 我是谁                    | whoami        |
| version    | 返回hbase版本的信息       | version       |
| status     | 返回hbase集群的状态信息   | status        |
| table_help | 查看如何操作表            | table_help    |
| shutdown   | 关闭hbase集群(与exit不同) |               |
| tools      | 列出hbase所支持的工具     |               |
| exit       | 推出hbase shell           |               |

## 数据定义

| 命令           | 描述                                                         |
| -------------- | ------------------------------------------------------------ |
| create         | 创建指定模式的新表                                           |
| alter          | 修改表的结构，如添加新的列族                                 |
| describe       | 展示表结构的信息，包括列族的数量与属性                       |
| list           | 列出HBase中已有的表                                          |
| disable/enable | 删除或更改表时，需禁用表，更改完后需要解禁表                 |
| disable_all    | 禁用所有的表                                                 |
| is_disabled    | 判断一个表是否被禁用                                         |
| drop           | 删除表                                                       |
| truncate       | 如果只是想删除数据而不是表结构，用truncate来禁用表、删除表并自动重建表结构 |

## 创建表

+ 语法

```shell
create    '表名','列族名'
```

+ 描述
  + 必须指定表名和列族；
  + 可以创建多个列族
  + 列可在插入数据时直接定义
  + 可以对表和列族指明一些参数
  + 参数大小写敏感
  + 字符串参数需要包含在单引号中

+ 案例演示

> 例1：create 'teacher','f1','f2'
>
> 例2：create 'teacher','f1',f2',MAX_FILESIZE=>'134217718'
>
> 例3：create 'teacher'，{NAME=>‘f1’,VERSIONS=>5,BLOCKCACHE=>true}
>
> 例4：create 'teachEr','f1','f2'
>
> 例5：create 'teacher','F1','f2'
>
> 例6：create 'teacher',‘f1','f1'

## 表相关操作

### 查看某个表是否存在

+ 语法

```shell
exists
```

> Hbase(main):005:0>exists  ’teacher’
>
> Table teacher does exist
>
> 0 row(s) in 0.2080 seconds

### 查看当前HBase所有的表名

+ 语法

```shell
list
```

> Hbase(main):006:0>list
>
> TABLE
>
> teacher
>
> Hbase thrift
>
> Student
>
> Test
>
> 4 row(s) in 0.0560 seconds

### 查看选定表的列族及其参数

+ 语法

```shell
describe
```

> hbase(main):006:0>describe ‘teacher'
>
> Table teacher is ENABLED                                                               
>
> tercher                                                                                
>
> COLUMN FAMILIES DESCRIPTION                                                            
>
> {NAME => ‘f1', BLOOMFILTER => 'ROW', VERSIONS => '1', IN_MEMORY => 'false', KEEP_DE
> LETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE', TTL => 'FOREVER', COMPRESSION =>
>  'NONE', MIN_VERSIONS => '0', BLOCKCACHE => 'true', BLOCKSIZE => '65536', REPLICATION_S
> COPE => '0'}                                                                           
>
> {NAME => ‘f2', BLOOMFILTER => 'ROW', VERSIONS => ‘5', IN_MEMORY => 'false', KEEP_D
> ELETED_CELLS => 'FALSE', DATA_BLOCK_ENCODING => 'NONE', TTL => 'FOREVER', COMPRESSION ='NONE', MIN_VERSIONS => '0', BLOCKCACHE => ‘false', BLOCKSIZE => '65536', REPLICATION_
> SCOPE => '0'}                                                                                      
>
> 2 row(s) in 0.0340 seconds

### 修改表结构

+ 功能
  + 修改表中列族的参数信息
  + 增加列族
  + 移除或删除已有的列族

+ 语法
+ 添加一个列族	

```shell
alter '表名', '列族名'
```

+ 删除列族

```shell
alter '表名', {NAME=> '列族名', METHOD=> 'delete'}
```

> 例1：alter 'teacher', {NAME => 'f1', VERSIONS => 4}
>
> 例2：alter  'teacher', 'f3'
>
> 例3：alter  'teacher', {NAME=>'f3', METHOD=>'delete'}
>
> 例4：alter  'teacher', 'delete' => 'f3'

::: warning 注意

删除列族时，表中至少有两个列族；

:::

### 删除表

+ 语法

```shell
disable 'teacher'
drop ' teacher '
```

+ 注意:删除表之前需要先禁用表

### 清空数据

+ 语法

```shell
truncate
```

> truncate 'teacher'

