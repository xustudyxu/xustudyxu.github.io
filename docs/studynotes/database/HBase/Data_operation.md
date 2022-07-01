---
title: HBase数据操作
date: 2022-03-23 21:17:09
permalink: /pages/0ef396/
categories:
  - HBase
tags:
  - HBase
---
# HBase数据操作

[[toc]]

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/05/01.png)

## put

+ 语法

```shell
put  '表名','行键','列族:列限定符','单元格值',时间戳
```

+ 描述
  + 必须指定表名、行键、列族、列限定符
  + 列族必须是已经创建的，否则HBase会报错
  + 列名是临时定义的，所以列族里的列是可以随意扩展的
  + 时间戳是可选参数，如不设置，则系统会自动插入当前时间为时间戳
  + 参数区分大小写，字符串使用单引号
  + 只能插入单个数据

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/05/02.png)

+ 描述:如果指定的单元格已经存在，则put操作为更新数据；
  + 单元格会保存指定VERSIONS=>n的多个版本数据

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/05/03.png)

## delete

+ 语法

```shell
delete  '表名','行键','列族<:列限定符>',<时间戳>
```

+ 描述：必须指定表名、行键和列族，列限定符和时间戳是可选参数；

  + delete最小删除粒度为单元格，且不能跨列族删除

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/05/04.png)

::: warning 注意

delete操作并不会马上删除数据，只是将对应的数据打上删除标记，只有在数据产生合并时，数据才会被删除。

:::

## 数据查询

### get

+ 语法

```shell
get  '表名','行键',<'列族:列限定符',时间戳>
```

> get 'student','001'
>
> get 'student','001',{COLUMN=>'Grades'}

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/HBase/images/05/05.png)

> get 'student','001' ,{COLUMN=>'Grades',TIMERANGE => [1,2]}
>
> get 'student','001' ,{COLUMN=>'StuInfo',VERSIONS=>2} 

> hbase(main):020:0> put 'student', '001', 'StuInfo:Name','jim green',2
>
> 0 row(s) in 0.0140 seconds
>
> hbase(main):021:0> put 'student', '001', 'StuInfo:Name','jerry',3
>
> 0 row(s) in 0.0140 seconds
>
> hbase(main):022:0> put 'student', '001', 'StuInfo:Name','curry',4
>
> 0 row(s) in 0.0690 seconds
>
> hbase(main):023:0> get 'student','001',{COLUMN => 'StuInfo',VERSIONS => 2}
>
> COLUMN                                        CELL         
>
> StuInfo:Age                                  timestamp=1541039335956, value=18        
>
> StuInfo:Name                              timestamp=4, value=curry                     
>
> StuInfo:Name                              timestamp=3, value=jerry                                                           
>
> StuInfo:Sex                                   timestamp=1541039336280, value=Male    
>
> 4 row(s) in 0.0240 seconds                                                                                                             

### scan

+ 语法

```shell
scan  '表名',{< '列族:列限定符',时间戳>}
```

1. 扫描全表:scan '表名'
2. 指定列族名称:

> scan 'student', **{COLUMN=>**'stuinfo'**}**

3. 指定列族和列的名称

> scan 'student', **{COLUMN=>**'stuInfo:Name'**}**

4. 指定输出行数

> scan 'student',  **{LIMIT => **1**}**

5. 指定输出行键范围

> scan 'student', **{STARTROW =>**'001',**ENDROW =>** '003'**}**

6. 指定组合条件查询

> scan 'student', **{COLUMN=>**'stuinfo',**STARTROW =>**'001',**ENDROW =>** '002'**}**

## 数据统计

+ 语法

```shell
count  '表名'
```

> hbase(main):004:0> count ‘student’
>
> 3 row(s) in 0.0440 seconds

在关系型数据库中，有多少条记录就有多少行，表中的行数很容易统计。而在 HBase 里，计算逻辑行需要扫描全表的内容，重复的行键是不纳入计数的，且标记为删除的数据也不纳入计数。

执行 count 命令其实是一个开销较大的进程，特别是应用在大数据场景时，可能需要持续很长时间，因此，用户一般会结合 Hadoop 的 MapReduce 架构来进行分布式的扫描计数。

