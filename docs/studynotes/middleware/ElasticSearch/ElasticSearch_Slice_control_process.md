---
title: ElasticSearch 分片控制流程
date: 2022-07-05 20:23:48
permalink: /middleware/ElasticSearch/ElasticSearch_Slice_control_process
categories:
  - ElasticSearch
tags:
  - ElasticSearch
---
# ElasticSearch 分片控制流程

[[toc]]

## 协调节点

我们假设有一个集群由三个节点组成。它包含一个叫 kele 的索引，有两个主分片，每个主分片有两个副本分片。相同分片的副本不会放在同一节点。

在 **Postman** 发送 `PUT` 请求：http://127.0.0.1:7001/xustudyxu

请求体内容：

```json
{
    "settings": {
        "number_of_shards": 2,
        "number_of_replicas" : 2
    }
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.16jfdcupu3j4.webp)

集群状态：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.39fddcevg6y0.webp)

通过 elasticsearch-head 插件查看集群情况，所以我们的集群是一个有三个节点和一个索引的集群

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.5x9qw61rdm40.webp)

我们可以发送请求到集群中的任一节点。每个节点都有能力处理任意请求。每个节点都知道集群中任一文档位置，所以可以直接将请求转发到需要的节点上。 在下面的例子中，将所有的请求发送到 Node 7001，我们将其称为<mark> 协调节点(coordinating node)</mark>。也可以理解为转发到其他节点的节点。

> 注意
>
> 当发送请求的时候，为了扩展负载，更好的做法是<mark>轮询</mark>集群中所有的节点。

## 写流程

> 注意
>
> 为了便于区分节点个数。Node 7001 是 Node 1，Node 7002 是 Node 2，Node 7003 是 Node 3。

新建、索引和删除请求都是`写`操作，必须在<mark>主分片</mark>上面完成写入操作之后<mark>才能被复制</mark>到相关的副本分片

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.170d25y17d1c.webp)

写操作步骤顺序：

1. 客户端向 Node 1 发送新建、索引或者删除请求
2. 节点使用文档的 `_id` 确定文档属于分片 `P0`。请求会被转发到 Node 3，因为分片 `P0` 的主分片目前被分配在 Node 3 上
3. Node 3 在主分片上面执行请求。如果成功了，它将请求并行转发到 Node 1 和 Node 2 的副本分片上。一旦所有的副本分片都报告成功，Node 3 将向协调节点报告成功，协调节点向客户端报告成功

在客户端收到成功响应时，文档变更已经在主分片和所有副本分片执行完成，<mark>变更是安全的</mark>。有一些可选的请求参数允许您影响这个过程，可能以数据安全为代价提升性能。这些选项很少使用，因为 Elasticsearch 已经很快处理了，但是为了完整起见，请参考下面表格：

| 参数        | 含义                                                         |
| ----------- | ------------------------------------------------------------ |
| consistency | consistency，即一致性。在默认设置下，即使仅仅是在试图执行一个_写_操作之前，主分片都会要求必须要有规定数量(quorum)（或者换种说法，也即必须要有大多数）的分片副本处于活跃可用状态，才会去执行`写`操作(其中分片副本 可以是主分片或者副本分片)。这是为了避免在发生网络分区故障（network partition）的时候进行`写`操作，进而导致数据不一致。`规定数量`即：<br> **int( (primary + number_of_replicas) / 2 ) + 1**<br>consistency 参数的值可以设为 `one` （只要主分片状态 ok 就允许执行`写`操 作）,`all`（必须要主分片和所有副本分片的状态没问题才允许执行_写_操作），或 quorum。默认值为 quorum， 即大多数的分片副本状态没问题就允许执行`写` 操作。 注意，规定数量的计算公式中 number_of_replicas 指的是在索引设置中的设定副本分片数，而不是指当前处理活动状态的副本分片数。如果你的索引设置中指定了当前索引拥有三个副本分片，那规定数量的计算结果即:<br>**int( (primary + 3 replicas) / 2 ) + 1 = 3** <br>如果此时你只启动两个节点，那么处于活跃状态的分片副本数量就达不到规定数量，也因此您将无法检索和删除任何文档。 |
| timeout     | 如果没有足够的副本分片会发生什么？Elasticsearch 会等待，希望更多的分片出现。默认情况下，它最多等待 1 分钟。如果你需要，你可以使用 timeout 参数使它更早终止：100 100 毫秒，30s 是 30 秒。 |

> 新索引默认有 1 个副本分片，这意味着为满足规定数量应该需要两个活动的分片副本。但是，这些默认的设置会阻止我们在单一节点上做任何事情。为了避免这个问题，要求只有当 number_of_replicas 大于 1 的时候，规定数量才会执行。

## 读流程

我们可以从主分片或者从其它任意副本分片检索文档

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.2dxgk2rb01gk.webp)

读流程顺序步骤：

1. 客户端向 Node 1 发送获取请求
2. 节点使用文档的 `_id` 来确定文档属于分片 `P0`。分片 `P0` 的副本分片存在于所有的三个节点上。在这种情况下，它将请求转发到 Node 2
3. Node 2 将文档返回给 Node 1，然后将文档返回给客户端

**每次都是 Node 2返回文档数据吗？**

不是，采用轮询。

在处理读取请求时，协调节点在每次请求的时候都会通过<mark>轮询</mark>所有的副本分片来达到负载均衡。在文档被检索时，已经被检索的文档可能已经存在于主分片上，但是还没有复制到副本分片。在这种情况下，副本分片可能会报告文档不存在，但是主分片可能成功返回文档。一旦索引请求成功返回给用户，文档在主分片和副本分片都是可用的。

## 更新流程

部分更新一个文档，结合了之前的读和写流程：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.146qxbe8k3a8.webp)

更新流程步骤顺序：

1. 客户端向 Node 1 发送更新请求
2. 节点使用文档的 `_id` 来确定文档属于分片 `P0`，它将请求转发到主分片所在的 Node 3,因为分片 `P0` 的主分片目前被分配在 Node 3 上
3. Node 3 从主分片检索文档，修改 `_source` 字段中的 JSON 数据，并且尝试<mark>重新检索</mark>主分片的文档。如果文档已经被另一个进程修改，它会重试步骤 3，超过 retry_on_conflict 次数后放弃
4. 如果 Node 3 成功地更新文档，它将新版本的文档并行转发到 Node 1 和 Node 2 上的副本分片，重新建立索引。一旦所有副本分片都返回成功，Node 3 向协调节点也返回成功，协调节点向客户端返回成功

**主分片同步到副本分片时，是转发更新请求吗？**

不是。当主分片把更改转发到副本分片时，它<mark>不会</mark>转发更新请求。相反，它<mark>转发完整文档的新版本</mark>。请记住，这些数据更改文档将会异步转发到副本分片，并且不能保证数据更改文档以发送它们相同的顺序到达。如果 Elasticsearch 仅转发更改请求，则可能以错误的顺序应用更改，导致得到损坏的文档。

## 多文档操作流程

### mget流程

`mget` 和 bulk API 的模式类似于单文档模式。区别在于协调节点<mark>知道</mark>每个文档存在于哪个分片中。它将整个多文档请求分解成「每个分片」的多文档请求，并且将这些请求并行转发到每个参与节点。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.1g8ofpwj2ta8.webp)

用单个 `mget` 请求取回多个文档所需的步骤顺序:

1. 客户端向 Node 1 发送 mget 请求
2. Node 1 为每个分片构建多文档获取请求，然后<mark>并行转发</mark>这些请求到托管在每个所需的主分片或者副本分片的节点上。一旦收到所有答复，Node 1 构建响应并将其返回给客户端

可以对 docs 数组中每个文档设置 routing 参数

### bulk API流程

`bulk API` 允许在单个批量请求中执行多个创建、索引、删除和更新请求

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.59u3v9fkmg80.webp)

`bulk API` 按执行步骤顺序：

1. 客户端向 Node 1 发送 `bulk` 请求
2. Node 1 为每个节点创建一个批量请求，并将这些请求并行转发到每个包含主分片的节点主机
3. 主分片一个接一个按顺序执行每个操作。当每个操作成功时，主分片<mark>并行转发</mark>新文档（或删除）到副本分片，然后执行下一个操作。一旦所有的副本分片报告所有操作成功，该节点将向协调节点报告成功，协调节点将这些响应收集整理并返回给客户端。

