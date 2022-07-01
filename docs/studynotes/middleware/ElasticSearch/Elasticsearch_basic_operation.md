---
title: ElasticSearch 基本操作
date: 2022-06-29 17:04:43
permalink: /middleware/ElasticSearch/basic_operation
categories:
  - ElasticSearch
tags:
  - ElasticSearch
---
# ElasticSearch 基本操作

[[toc]]

## RESTful

REST 指的是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是 RESTful。Web 应用程序最重要的 REST 原则是，客户端和服务器之间的交互在请求之间是无状态的。从客户端到服务器的每个请求都必须包含理解请求所必需的信息。如果服务器在请求之间的任何时间点重启，客户端不会得到通知。此外，无状态请求可以由任何可用服务器回答，这十分适合云计算之类的环境。客户端可以缓存数据以改进性能。

在服务器端，应用程序状态和功能可以分为各种资源。资源是一个有趣的概念实体，它向客户端公开。资源的例子有：应用程序对象、数据库记录、算法等等。每个资源都使用 URI (Universal Resource Identifier) 得到一个唯一的地址。所有资源都共享统一的接口，以便在客户端和服务器之间传输状态。使用的是标准的 HTTP 方法，比如 GET、PUT、POST 和DELETE。

在 REST 样式的 Web 服务中，每个资源都有一个地址。资源本身都是方法调用的目标，方法列表对所有资源都是一样的。这些方法都是标准方法，包括 HTTP GET、POST、PUT、DELETE，还可能包括 HEAD 和 OPTIONS。简单的理解就是，如果想要访问互联网上的资源，就必须向资源所在的服务器发出请求，请求体中必须包含资源的网络路径，以及对资源进行的操作(增删改查)。

## 客户端安装

如果直接通过浏览器向 Elasticsearch 服务器发请求，那么需要在发送的请求中包含HTTP 标准的方法，而 HTTP 的大部分特性且仅支持 GET 和 POST 方法。所以为了能方便地进行客户端的访问，可以使用 Postman 软件。

Postman 是一款强大的网页调试工具，提供功能强大的 Web API 和 HTTP 请求调试。软件功能强大，界面简洁明晰、操作方便快捷，设计得很人性化。Postman 中文版能够发送任何类型的 HTTP 请求 (GET, HEAD, POST, PUT..)，不仅能够表单提交，且可以附带任意类型请求体。

Postman 官网：https://www.getpostman.com
Postman 下载：https://www.getpostman.com/apps

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.6cidzgf2v7k0.webp)

## 数据格式

Elasticsearch 是面向文档型数据库，一条数据在这里就是一个文档。为了方便大家理解，我们将 Elasticsearch 里存储文档数据和关系型数据库 MySQL 存储数据的概念进行一个类比ES 里的 Index 可以看做一个库，而 Types 相当于表，Documents 则相当于表的行。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.6natuc863q80.webp)

这里 Types 的概念已经被逐渐弱化，Elasticsearch 6.X 中，一个 index 下已经只能包含一个type，Elasticsearch 7.X 中, Type 的概念已经被删除了。

用 JSON 作为文档序列化的格式，比如一条用户信息：

```json
{
 "name" : "John",
 "sex" : "Male",
 "age" : 25,
 "birthDate": "1990/05/01",
 "about" : "I love to go rock climbing",
 "interests": [ "sports", "music" ]
}
```

## HTTP 操作

### 索引操作

#### 创建索引-PUT

对比关系型数据库，创建索引就等同于创建数据库

在 Postman 中，向 ES 服务器发 `PUT `请求 ：http://127.0.0.1:9200/shopping

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.4f8730wucdc0.webp)

请求后，服务器返回响应

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.6bms4urzq180.webp)

```json
{
 "acknowledged"【响应结果】: true, # true 操作成功
 "shards_acknowledged"【分片结果】: true, # 分片操作成功
 "index"【索引名称】: "shopping"
}
# 注意：创建索引库的分片数默认 1 片，在 7.0.0 之前的 Elasticsearch 版本中，默认 5 片
```

如果重复添加索引，会返回错误信息

#### 查看全部索引-GET

在 Postman 中，向 ES 服务器发 `GET` 请求 ：http://127.0.0.1:9200/_cat/indices?v

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.6upkg2f88pg0.webp)

这里请求路径中的_cat 表示查看的意思，indices 表示索引，所以整体含义就是查看当前 ES服务器中的所有索引，就好像 MySQL 中的 show tables 的感觉，服务器响应结果如下

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.4oymop77yv40.webp)

| 表头           | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| health         | 当前服务器健康状态：<font color=#00e500>green</font>(集群完整) <font color=#FFFF00>yellow</font>(单点正常、集群不完整)<font color=#FF0000> red</font>(单点不正常) |
| status         | 索引打开、关闭状态                                           |
| index          | 索引名                                                       |
| uuid           | 索引统一编号                                                 |
| pri            | 主分片数量                                                   |
| rep            | 副本数量                                                     |
| docs.count     | 可用文档数量                                                 |
| docs.deleted   | 文档删除状态（逻辑删除）                                     |
| store.size     | 主分片和副分片整体占空间大小                                 |
| pri.store.size | 主分片占空间大小                                             |

#### 查看单个索引-GET

在 Postman 中，向 ES 服务器发 GET 请求 ：http://127.0.0.1:9200/shopping

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.2yn85a5vhvk0.webp)

查看索引向 ES 服务器发送的请求路径和创建索引是一致的。但是 HTTP 方法不一致。这里可以体会一下 RESTful 的意义，请求后，服务器响应结果如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.6eiuvxqroag0.webp)

```json
{
 	"shopping"【索引名】: { 
 		"aliases"【别名】: {},
 		"mappings"【映射】: {},
 		"settings"【设置】: {
			 "index"【设置 - 索引】: {
 				"creation_date"【设置 - 索引 - 创建时间】: "1614265373911",
 				"number_of_shards"【设置 - 索引 - 主分片数量】: "1",
 				"number_of_replicas"【设置 - 索引 - 副分片数量】: "1",
				 "uuid"【设置 - 索引 - 唯一标识】: "eI5wemRERTumxGCc1bAk2A",
 				"version"【设置 - 索引 - 版本】: {
					 "created": "7080099"
				 },
 				"provided_name"【设置 - 索引 - 名称】: "shopping"
 			}
 		}
 	}
}
```

#### 删除索引-DELETE

在 Postman 中，向 ES 服务器发 DELETE 请求 ：http://127.0.0.1:9200/shopping

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.4ywn8aly0p40.webp)

结果:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.9j5vpyhfae4.webp)

重新访问索引时，服务器返回响应：索引不存在

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.301qkvmr8g60.webp)

结果:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.5znlvihxoj40.webp)

### 文档操作

#### 创建文档-POST

索引已经创建好了，接下来我们来创建文档，并添加数据。这里的文档可以类比为关系型数据库中的表数据，添加的数据格式为 JSON 格式

在 Postman 中，向 ES 服务器发`POST` 请求 ：http://127.0.0.1:9200/shopping/_doc

```json
{
 "title":"小米手机",
 "category":"小米",
 "images":"http://www.gulixueyuan.com/xm.jpg",
 "price":3999.00
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.5wglnskmpgs0.webp)

此处发送请求的方式必须为 `POST`，不能是` PUT`，否则会发生错误,

服务器响应结果如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.1ta5l39n7z7k.webp)

```json
{
 	"_index"【索引】: "shopping",
 	"_type"【类型-文档】: "_doc",
	"_id"【唯一标识】: "Xhsa2ncBlvF_7lxyCE9G", #可以类比为 MySQL 中的主键，随机生成
	"_version"【版本】: 1,
 	"result"【结果】: "created", #这里的 create 表示创建成功
 	"_shards"【分片】: {
 		"total"【分片 - 总数】: 2,
 		"successful"【分片 - 成功】: 1,
 		"failed"【分片 - 失败】: 0
 	},
 	"_seq_no": 0,
 	"_primary_term": 1
}
```

上面的数据创建后，由于没有指定数据唯一性标识（ID），默认情况下，ES 服务器会随机生成一个。

如果想要`自定义唯一性标识`，需要在创建时指定：http://127.0.0.1:9200/shopping/_doc/1

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.58rsz7uqqt40.webp)

服务器响应结果如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.d2a3e2zo0bs.webp)

> 此处需要注意：如果增加数据时明确数据主键，那么请求方式也可以为 PUT

#### 查看文档-GET

查看文档时，需要指明文档的唯一性标识，类似于 MySQL 中数据的主键查询

在 Postman 中，向 ES 服务器发` GET `请求 ：http://127.0.0.1:9200/shopping/_doc/1

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.5gnvg6vy2xw0.webp)

服务器响应结果如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.3aiusoqfb2o0.webp)

```json
{
 	"_index"【索引】: "shopping",
 	"_type"【文档类型】: "_doc",
 	"_id": "1",
 	"_version": 2,
 	"_seq_no": 2,
 	"_primary_term": 2,
 	"found"【查询结果】: true, # true 表示查找到，false 表示未查找到
 	"_source"【文档源信息】: {
 		"title": "华为手机",
 		"category": "华为",
 		"images": "http://www.gulixueyuan.com/hw.jpg",
 		"price": 4999.00
 	}
}
```

查询所有数据:	http://127.0.0.1:9200/shopping/_search   发送`	GET`请求

#### 修改文档-POST

- 全局修改

和新增文档一样，输入相同的 URL 地址请求，如果请求体变化，会将原有的数据内容覆盖

在 Postman 中，向 ES 服务器发` POST` 请求 ：http://127.0.0.1:9200/shopping/_doc/1

```json
{
 	"title":"华为手机",
 	"category":"华为",
 	"images":"http://www.gulixueyuan.com/hw.jpg",
 	"price":4999.00
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.334ba6eupjy0.webp)

服务器响应结果如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.cmq143r0no8.webp)

- 局部修改

在 Postman 中，向 ES 服务器发` POST` 请求 ：http://127.0.0.1:9200/shopping/_updata/1



服务器响应结果如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.5qg2uu195m80.webp)

再次查看文档:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.6m71s5usigw0.webp)

#### 删除文档-DELETE

删除一个文档不会立即从磁盘上移除，它只是被标记成已删除（逻辑删除）。

在 Postman 中，向 ES 服务器发` DELETE `请求 ：http://127.0.0.1:9200/shopping/_doc/1

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.476ikbhzz5e0.webp)

服务器响应结果如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.6y551su4g080.webp)

```json
{
	 "_index": "shopping",
 	 "_type": "_doc",
 	 "_id": "1",
 	 "_version"【版本】: 4, #对数据的操作，都会更新版本
 	 "result"【结果】: "deleted", # deleted 表示数据被标记为删除
 	 "_shards": {
 		"total": 2,
 		"successful": 1,
 		"failed": 0
 	},
 	"_seq_no": 4,
 	"_primary_term": 2
}
```

删除后再查询当前文档信息

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.3m13d7xdiqg0.webp)

#### 条件删除文档-POST

首先分别增加多条数据：

```json
{
    "title":"小米手机",
    "category":"小米",
    "images":"http://www.gulixueyuan.com/hw.jpg",
    "price":4000.00
}
{
    "title":"华为手机",
    "category":"华为",
    "images":"http://www.gulixueyuan.com/hw.jpg",
    "price":4000.00
}
```

在 Postman 中，向 ES 服务器发` POST `请求 ：http://127.0.0.1:9200/shopping/_doc/1000和http://127.0.0.1:9200/shopping/_doc/2000

条件删除：向 ES 服务器发 `POST` 请求 ：http://127.0.0.1:9200/shopping/_delete_by_query

中文请求参数容易乱码，通过请求体来传递参数:

删除价格为 4000.00 的文档，请求体内容：

```json
{
    "query":{
        "match":{
            "price":4000.00
        }
    }
}
```

服务端响应结果如下:

```json
{
    "took"【耗时】: 1175,
    "timed_out"【是否超时】: false,
    "total"【总数】: 3,
    "deleted"【删除数量】: 3,
    "batches": 1,
    "version_conflicts": 0,
    "noops": 0,
    "retries": {
        "bulk": 0,
        "search": 0
    },
    "throttled_millis": 0,
    "requests_per_second": -1.0,
    "throttled_until_millis": 0,
    "failures": []
}
```

## 映射基本操作

### 原理

有了索引库，等于有了数据库中的 database。

接下来就需要建索引库(index)中的映射了，类似于数据库(database)中的表结构(table)。创建数据库表需要设置字段名称，类型，长度，约束等；索引库也一样，需要知道这个类型下有哪些字段，每个字段有哪些约束信息，这就叫做映射(mapping)。

### 创建映射-PUT

首先创建 stuednt 索引，向 ES 服务器发 `PUT` 请求：`http://127.0.0.1:9200/student`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.63rsnl20ypg0.webp)

在 Postman 中，向 ES 服务器发 `PUT` 请求：`http://127.0.0.1:9200/student/_mapping`

请求体内容为：

```json
{
    "properties": {
        "name":{
            "type": "text",
            "index": true
        },
        "sex":{
            "type": "keyword",
            "index": true
        },
        "age":{
            "type": "keyword",
            "index": false
        }
    }
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.4ij534b6i0e0.webp)

映射数据说明：

- 字段名：任意填写，下面指定许多属性，例如：title、subtitle、images、price

- type：类型，Elasticsearch 中支持的数据类型非常丰富，说几个关键的：

  - String 类型，又分两种：
    - text：可分词，支持模糊查询，支持准确查询，不支持聚合查询
    - keyword：不可分词，数据会作为完整字段进行匹配，支持模糊查询，支持准确查询，支持聚合查询。
  - Numerical：数值类型，分两类
    - 基本数据类型：long、integer、short、byte、double、float、half_float
    - 浮点数的高精度类型：scaled_float
  - Date：日期类型
  - Array：数组类型
  - Object：对象

- index：是否索引，默认为 true，也就是说你不进行任何配置，所有字段都会被索引。

  - true：字段会被索引，则可以用来进行搜索
  - false：字段不会被索引，不能用来搜索

- store：是否将数据进行独立存储，默认为 false

  原始的文本会存储在 _source 里面，默认情况下其他提取出来的字段都不是独立存储 的，是从 _source 里面提取出来的。当然你也可以独立的存储某个字段，只要设置 "store": true 即可，获取独立存储的字段要比从 _source 中解析快得多，但是也会占用 更多的空间，所以要根据实际业务需求来设置。

- analyzer：分词器，这里的 ik_max_word 即使用 ik 分词器

### 查看映射-GET

在 Postman 中，向 ES 服务器发 `GET` 请求：`http://127.0.0.1:9200/student/_mapping`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.1ukxbj5ceqjk.webp)

### 索引映射关联-PUT

创建新的索引 `student1`，与之前的 `student` 进行映射关联

在 Postman 中，向 ES 服务器发 `PUT` 请求：`http://127.0.0.1:9200/student1`

请求体内容：（填写要映射的索引映射内容）

```json
{
    "settings": {},
    "mappings": {
        "properties": {
            "name":{
                "type": "text",
                "index": true

            },
            "sex":{
                "type": "text",
                "index": false
            },
            "age":{
                "type": "long",
                "index": false
            }
        }
    }
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.4uc0hgnj0su0.webp)

