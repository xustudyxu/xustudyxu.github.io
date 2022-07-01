---
title: MongoDB 索引-Index
date: 2022-06-25 21:16:12
permalink: /database/MongoDB/MongoDB_index
categories:
  - MongoDB
tags:
  - MongoDB
---
# MongoDB 索引-Index

[[toc]]

## 概述

索引支持在MongoDB中高效地执行查询。如果没有索引，MongoDB必须执行全集合扫描，即扫描集合中的每个文档，以选择与查询语句匹配的文档。这种扫描全集合的查询效率是非常低的，特别在处理大量的数据时，查询可以要花费几十秒甚至几分钟，这对网站的性能是非常致命的。

如果查询存在适当的索引，MongoDB可以使用该索引限制必须检查的文档数。

索引是特殊的数据结构，它以易于遍历的形式存储集合数据集的一小部分。索引存储特定字段或一组字段的值，按字段值排序。索引项的排序支持有效的相等匹配和基于范围的查询操作。此外，MongoDB还可以使用索引中的排序返回排序结果。

[官网文档](https://docs.mongodb.com/manual/indexes/)

了解：

MongoDB索引使用B树数据结构（确切的说是B-Tree，MySQL是B+Tree）

## 索引的类型

### 单字段索引

MongoDB支持在文档的单个字段上创建用户定义的升序/降序索引，称为单字段索引（Single Field Index）。

对于单个字段索引和排序操作，索引键的排序顺序（即升序或降序）并不重要，因为MongoDB可以在任何方向上遍历索引。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220625/image.5l8wdgg3kfg0.webp)

### 复合索引

MongoDB还支持多个字段的用户定义索引，即复合索引（Compound Index）。

复合索引中列出的字段顺序具有重要意义。例如，如果复合索引由 { userid: 1, score: -1 } 组成，则索引首先按userid正序排序，然后在每个userid的值内，再在按score倒序排序。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220625/image.78a8t9ixshc0.webp)

### 其他索引

地理空间索引（Geospatial Index）、文本索引（Text Indexes）、哈希索引（Hashed Indexes）。

地理空间索引（Geospatial Index）

为了支持对地理空间坐标数据的有效查询，MongoDB提供了两种特殊的索引：返回结果时使用平面几何的二维索引和返回结果时使用球面几何的二维球面索引。

文本索引（Text Indexes）

MongoDB提供了一种文本索引类型，支持在集合中搜索字符串内容。这些文本索引不存储特定于语言的停止词（例如“the”、“a”、“or”），而将集合中的词作为词干，只存储根词。

哈希索引（Hashed Indexes）

为了支持基于散列的分片，MongoDB提供了散列索引类型，它对字段值的散列进行索引。这些索引在其范围内的值分布更加随机，但只支持相等匹配，不支持基于范围的查询。

## 索引的管理操作

###  索引的查看

说明:

返回一个集合中的所有索引的数组。

语法：

```sh
db.collection.getIndexes()
```

提示：该语法命令运行要求是MongoDB 3.0+

【示例】

查看comment集合中所有的索引情况

```sh
> db.comment.getIndexes()
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "articledb.comment"
        }
]
```

结果中显示的是默认` _id` 索引。

默认\_id索引：

MongoDB在创建集合的过程中，在 `_id `字段上创建一个唯一的索引，默认名字为` _id_ `，该索引可防止客户端插入两个具有相同值的文档，您不能在_id字段上删除此索引。

> 注意：该索引是唯一索引，因此值不能重复，即` _id `值不能重复的。在分片集群中，通常使用` _id` 作为片键。

### 创建索引

说明:

在集合上创建索引。

语法:

```sh
db.collection.createIndex(keys,options)
```

参数:

| Parameter | Type     | Description                                                  |
| --------- | -------- | ------------------------------------------------------------ |
| `keys`    | document | 包含字段和值对的文档，其中字段是索引键，值描述该字段的索引类型。对于字段上的升序索引，请指定值1；对于降序索引，请指定值-1。比如： `{字段:1或-1}` ，其中1 为指定按升序创建索引，如果你想按降序来创建索引指定为 -1 即可。另外，MongoDB支持几种不同的索引类型，包括文本、地理空间和哈希索引。 |
| `options` | document | 可选。包含一组控制索引创建的选项的文档。有关详细信息，请参见选项详情列表。 |

options（更多选项）列表：

| Parameter          | Type          | Description                                                  |
| ------------------ | ------------- | ------------------------------------------------------------ |
| background         | Boolean       | 建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加"background" 可选参数。 "background" 默认值为`false`。 |
| unique             | Boolean       | 建立的索引是否唯一。指定为true创建唯一索引。默认值为`false`. |
| name               | string        | 索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。 |
| dropDups           | Boolean       | 3.0+版本已废弃。在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为`false` |
| sparse             | Boolean       | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 `false`. |
| expireAfterSeconds | integer       | 指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。 |
| v                  | index version | 索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。 |
| weights            | document      | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。 |
| default_language   | string        | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语 |
| language_override  | string        | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为language. |

> 提示：
>
> 注意在 3.0.0 版本前创建索引方法为 `db.collection.ensureIndex() `，之后的版本使用了 `db.collection.createIndex() `方法，ensureIndex() 还能用，但只是 createIndex() 的别名。

【示例】

#### 单字段索引

对 userid 字段建立索引：

```sh
> db.comment.createIndex({userid:-1})
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}
```

参数1：按升序创建索引

可以查看一下：

```sh
> db.comment.getIndexes()
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "articledb.comment"
        },
        {
                "v" : 2,
                "key" : {
                        "userid" : -1
                },
                "name" : "userid_-1",
                "ns" : "articledb.comment"
        }
]
```

索引名字为`userid_1`

compass查看:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220625/image.a25aczussy.webp)

#### 复合索引

对 userid 和 nickname 同时建立复合（Compound）索引：

```shell
> db.comment.createIndex({userid:-1,nickname:-1})
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 2,
        "numIndexesAfter" : 3,
        "ok" : 1
}
```

查看一下索引：

```sh
> db.comment.getIndexes()
[
        {
                "v" : 2,
                "key" : {
                        "_id" : 1
                },
                "name" : "_id_",
                "ns" : "articledb.comment"
        },
        {
                "v" : 2,
                "key" : {
                        "userid" : -1
                },
                "name" : "userid_-1",
                "ns" : "articledb.comment"
        },
        {
                "v" : 2,
                "key" : {
                        "userid" : -1,
                        "nickname" : -1
                },
                "name" : "userid_-1_nickname_-1",
                "ns" : "articledb.comment"
        }
]
```

compass中：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220625/image.1at13xitxdpc.webp)

### 索引的移除

说明：可以移除指定的索引，或移除所有索引

#### 指定索引的移除

语法：

```sh
db.collection.dropIndex(index)
```

参数:

| Parametar | Type               | Description                                                  |
| --------- | ------------------ | ------------------------------------------------------------ |
| `index`   | string or document | 指定要删除的索引。可以通过索引名称或索引规范文档指定索引。若要删除文本索引，请指定索引名称。 |

【示例】

删除 comment 集合中 userid 字段上的升序索引：

```sh
> db.comment.dropIndex({userid:-1})
{ "nIndexesWas" : 3, "ok" : 1 }
```

#### 所有索引的移除

语法：

```sh
db.comment.dropIndexes()
```

【示例】

删除 spit 集合中所有索引。

```sh
> db.comment.dropIndexes()
{
        "nIndexesWas" : 2,
        "msg" : "non-_id indexes dropped for collection",
        "ok" : 1
}
```

> 提示：` _id` 的字段的索引是无法删除的，只能删除非` _id` 字段的索引。

## 索引的使用

### 执行计划

分析查询性能（Analyze Query Performance）通常使用执行计划（解释计划、Explain Plan）来查看查询的情况，如查询耗费的时间、是否基于索引查询等。

那么，通常，我们想知道，建立的索引是否有效，效果如何，都需要通过执行计划查看。

语法：

```sh
db.collection.find(query,options).explain(options)
```

【示例】

查看根据userid查询数据的情况：

```sh
> db.comment.find({userid:"1003"}).explain()
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "articledb.comment",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "userid" : {
                                "$eq" : "1003"
                        }
                },
                "winningPlan" : {
                        "stage" : "COLLSCAN",
                        "filter" : {
                                "userid" : {
                                        "$eq" : "1003"
                                }
                        },
                        "direction" : "forward"
                },
                "rejectedPlans" : [ ]
        },
        "serverInfo" : {
                "host" : "master",
                "port" : 27017,
                "version" : "4.0.10",
                "gitVersion" : "c389e7f69f637f7a1ac3cc9fae843b635f20b766"
        },
        "ok" : 1
}
```

关键点看： `"stage" : "COLLSCAN"`, 表示全集合扫描

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220625/image.3s2i2nqx02o0.webp)

下面对userid建立索引

```sh
> db.comment.createIndex({userid:1})
{
        "createdCollectionAutomatically" : false,
        "numIndexesBefore" : 1,
        "numIndexesAfter" : 2,
        "ok" : 1
}
```

再次查看执行计划：

```sh
> db.comment.find({userid:"1003"}).explain()
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "articledb.comment",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "userid" : {
                                "$eq" : "1003"
                        }
                },
                "winningPlan" : {
                        "stage" : "FETCH",
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "userid" : 1
                                },
                                "indexName" : "userid_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "userid" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "userid" : [
                                                "[\"1003\", \"1003\"]"
                                        ]
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "serverInfo" : {
                "host" : "master",
                "port" : 27017,
                "version" : "4.0.10",
                "gitVersion" : "c389e7f69f637f7a1ac3cc9fae843b635f20b766"
        },
        "ok" : 1
}
```

关键点看： `"stage" : "IXSCAN"` ,基于索引的扫描

compass查看：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220625/image.1gncli23u55s.webp)

### 涵盖的扫描

Covered Queries

当查询条件和查询的投影仅包含索引字段时，MongoDB直接从索引返回结果(不再去找集合)，而不扫描任何文档或将文档带入内存。 这些覆盖的查询可以非常有效。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220625/image.3ls8cdhjarg0.webp)

【示例】

```sh
>  db.comment.find({userid:"1003"},{userid:1,_id:0})
{ "userid" : "1003" }
{ "userid" : "1003" }
> db.comment.find({userid:"1003"},{userid:1,_id:0}).explain()
{
        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "articledb.comment",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "userid" : {
                                "$eq" : "1003"
                        }
                },
                "winningPlan" : {
                        "stage" : "PROJECTION",
                        "transformBy" : {
                                "userid" : 1,
                                "_id" : 0
                        },
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "userid" : 1
                                },
                                "indexName" : "userid_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "userid" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "userid" : [
                                                "[\"1003\", \"1003\"]"
                                        ]
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "serverInfo" : {
                "host" : "master",
                "port" : 27017,
                "version" : "4.0.10",
                "gitVersion" : "c389e7f69f637f7a1ac3cc9fae843b635f20b766"
        },
        "ok" : 1
}
```

Compass中：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220625/image.1ebr55whcaao.webp)

