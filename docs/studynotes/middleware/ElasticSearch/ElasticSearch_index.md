---
title: ElasticSearch 入门
date: 2022-06-28 22:57:13
permalink: /pages/39931b/
categories:
  - ElasticSearch
tags:
  - ElasticSearch
---
# ElasticSearch 入门

[[toc]]

##  Elasticsearch 安装

### 下载软件

Elasticsearch 的官方地址：https://www.elastic.co/cn/

Elasticsearch 最新的版本是 7.11.2（截止 2021.3.10），我们选择 7.8.0 版本（最新版本半年前的版本）

下载地址：https://www.elastic.co/cn/downloads/past-releases#elasticsearch![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220628/image.27e4pq25bt34.webp)

Elasticsearch 分为 Linux 和 Windows 版本，基于我们主要学习的是 Elasticsearch 的 Java客户端的使用，所以课程中使用的是安装较为简便的 Windows 版本。

### 安装软件

Windows 版的 Elasticsearch 的安装很简单，解压即安装完毕，解压后的 Elasticsearch 的目录结构如下

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.6oxm14d4fkc0.webp)

| 目录     | 含义           |
| -------- | -------------- |
| bin      | 可执行脚本目录 |
| config   | 配置目录       |
| jdk      | 内置JDK目录    |
| lib      | 类库           |
| logs     | 日志目录       |
| moudules | 模块目录       |
|          | 插件目录       |

解压后，进入 bin 文件目录，点击 elasticsearch.bat 文件启动 ES 服务

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.20npni7unbi8.webp)

> 注意:**9300** 端口为 Elasticsearch 集群间组件的通信端口，**9200** 端口为浏览器访问的 http协议 RESTful 端口。

打开浏览器（推荐使用谷歌浏览器），输入地址：http://localhost:9200，测试结果

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.3dkg1w533xq0.webp)

### 问题解决

+ Elasticsearch 是使用 java 开发的，且 7.8 版本的 ES 需要 JDK 版本 1.8 以上，默认安装包带有 jdk 环境，如果系统配置 JAVA_HOME，那么使用系统默认的 JDK，如果没有配置使用自带的 JDK，一般建议使用系统配置的 JDK。
+ 双击启动窗口闪退，通过路径访问追踪错误，如果是“空间不足”，请修改config/jvm.options 配置文件

```properties
# 设置 JVM 初始内存为 1G。此值可以设置与-Xmx 相同，以避免每次垃圾回收完成后 JVM 重新分配内存
# Xms represents the initial size of total heap space
# 设置 JVM 最大可用内存为 1G
# Xmx represents the maximum size of total heap space
-Xms1g
-Xmx1g
```

## Elasticsearch 基本操作

### RESTful

REST 指的是一组架构约束条件和原则。满足这些约束条件和原则的应用程序或设计就是 RESTful。Web 应用程序最重要的 REST 原则是，客户端和服务器之间的交互在请求之间是无状态的。从客户端到服务器的每个请求都必须包含理解请求所必需的信息。如果服务器在请求之间的任何时间点重启，客户端不会得到通知。此外，无状态请求可以由任何可用服务器回答，这十分适合云计算之类的环境。客户端可以缓存数据以改进性能。

在服务器端，应用程序状态和功能可以分为各种资源。资源是一个有趣的概念实体，它向客户端公开。资源的例子有：应用程序对象、数据库记录、算法等等。每个资源都使用 URI (Universal Resource Identifier) 得到一个唯一的地址。所有资源都共享统一的接口，以便在客户端和服务器之间传输状态。使用的是标准的 HTTP 方法，比如 GET、PUT、POST 和DELETE。

在 REST 样式的 Web 服务中，每个资源都有一个地址。资源本身都是方法调用的目标，方法列表对所有资源都是一样的。这些方法都是标准方法，包括 HTTP GET、POST、PUT、DELETE，还可能包括 HEAD 和 OPTIONS。简单的理解就是，如果想要访问互联网上的资源，就必须向资源所在的服务器发出请求，请求体中必须包含资源的网络路径，以及对资源进行的操作(增删改查)。

### 客户端安装

如果直接通过浏览器向 Elasticsearch 服务器发请求，那么需要在发送的请求中包含HTTP 标准的方法，而 HTTP 的大部分特性且仅支持 GET 和 POST 方法。所以为了能方便地进行客户端的访问，可以使用 Postman 软件。

Postman 是一款强大的网页调试工具，提供功能强大的 Web API 和 HTTP 请求调试。软件功能强大，界面简洁明晰、操作方便快捷，设计得很人性化。Postman 中文版能够发送任何类型的 HTTP 请求 (GET, HEAD, POST, PUT..)，不仅能够表单提交，且可以附带任意类型请求体。

Postman 官网：https://www.getpostman.com
Postman 下载：https://www.getpostman.com/apps

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.6cidzgf2v7k0.webp)

### 数据格式

Elasticsearch 是面向文档型数据库，一条数据在这里就是一个文档。为了方便大家理解，我们将 Elasticsearch 里存储文档数据和关系型数据库 MySQL 存储数据的概念进行一个类比ES 里的 Index 可以看做一个库，而 Types 相当于表，Documents 则相当于表的行。

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.6natuc863q80.webp)

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

###  HTTP 操作

#### 索引操作

##### 创建索引

对比关系型数据库，创建索引就等同于创建数据库

在 Postman 中，向 ES 服务器发 `PUT `请求 ：http://127.0.0.1:9200/shopping

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.4f8730wucdc0.webp)

请求后，服务器返回响应

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.6bms4urzq180.webp)

```json
{
 "acknowledged"【响应结果】: true, # true 操作成功
 "shards_acknowledged"【分片结果】: true, # 分片操作成功
 "index"【索引名称】: "shopping"
}
# 注意：创建索引库的分片数默认 1 片，在 7.0.0 之前的 Elasticsearch 版本中，默认 5 片
```

如果重复添加索引，会返回错误信息

##### 查看全部索引

在 Postman 中，向 ES 服务器发 `GET` 请求 ：http://127.0.0.1:9200/_cat/indices?v

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.6upkg2f88pg0.webp)

这里请求路径中的_cat 表示查看的意思，indices 表示索引，所以整体含义就是查看当前 ES服务器中的所有索引，就好像 MySQL 中的 show tables 的感觉，服务器响应结果如下

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.4oymop77yv40.webp)

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

##### 查看单个索引

在 Postman 中，向 ES 服务器发 GET 请求 ：http://127.0.0.1:9200/shopping

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.2yn85a5vhvk0.webp)

查看索引向 ES 服务器发送的请求路径和创建索引是一致的。但是 HTTP 方法不一致。这里可以体会一下 RESTful 的意义，请求后，服务器响应结果如下：

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.6eiuvxqroag0.webp)

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

##### 删除索引

在 Postman 中，向 ES 服务器发 DELETE 请求 ：http://127.0.0.1:9200/shopping

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.4ywn8aly0p40.webp)

结果:

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.9j5vpyhfae4.webp)

重新访问索引时，服务器返回响应：索引不存在

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.301qkvmr8g60.webp)

结果:

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.5znlvihxoj40.webp)

#### 文档操作

##### 创建文档

