---
title: ElasticSearch 分布式集群和路由计算
date: 2022-07-04 21:58:06
permalink: /middleware/ElasticSearch/ElasticSearch_Distributed_clusterAndRouting_calculation
categories:
  - ElasticSearch
tags:
  - ElasticSearch
---
# ElasticSearch 分布式集群和路由计算

[[toc]]

## 单节点集群

我们在包含一个空节点的集群内创建名为 users 的索引，为了演示目的，我们将分配 3 个主分片和一份副本（每个主分片拥有一个副本分片）

```json
{
    "settings" : {
        "number_of_shards" : 3,  // 3 个主分片
        "number_of_replicas" : 1  // 每 1 个主分片都有 1 个副本
    }
}
```

在 **Postman** 发送 `PUT` 请求：http://127.0.0.1:7001/users

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.3psofat1d9s0.webp)

我们的集群现在是拥有一个索引的单节点集群。所有 3 个主分片都被分配在 node - 1

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.4rxns2h7pou0.webp)

通过 elasticsearch-head 插件查看集群情况

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.36xv8g0vwem0.webp)

看到的 users 是刚才添加的索引

当前我们的集群是正常运行的，但是在硬件故障时有丢失数据的风险。

### 故障转移

当集群中只有一个节点在运行时，意味着会有一个单点故障问题——没有冗余。幸运的是，我们只需再启动一个节点即可防止数据丢失。当你在同一台机器上启动了第二个节点时，只要它和第一个节点有同样的 cluster.name 配置，它就会自动发现集群并加入到其中。但是在不同机器上启动节点的时候，为了加入到同一集群，你需要配置一个可连接到的单播主机列表。之所以配置为使用单播发现，以防止节点无意中加入集群。只有在同一台机器上 运行的节点才会自动组成集群。

如果启动了第二个节点，我们的集群将会拥有两个节点的集群: 所有主分片和副本分片都已被分配

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.531itmxgne40.webp)

通过 elasticsearch-head 插件查看集群情况

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.4634ol2saaq0.webp)

### 水平扩容

怎样为我们的正在增长中的应用程序按需扩容呢？当启动了第三个节点，我们的集群将会拥有三个节点的集群: 为了分散负载而对分片进行重新分配

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.6m818aw0snk0.webp)

通过 elasticsearch-head 插件查看集群情况

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.5102h28o7cw0.webp)

> .geoip_databases 不用看，包括下面的图，它是自带的一个索引，我们探索的是 users 索引

Node 7001 和 Node 7002 上各有一个分片被迁移到了新的 Node 7003 节点，现在每个节点上都拥有 2 个分片，而不是之前的 3 个。 这表示每个节点的硬件资源（CPU, RAM, I/O）将被更少的分片所共享，每个分片的性能将会得到提升。

分片是一个功能完整的搜索引擎，它拥有使用一个节点上的所有资源的能力。我们这个拥有 6 个分片（3 个主分片和 3 个副本分片）的索引可以最大扩容到 6 个节点，每个节点上存在一个分片，并且每个分片拥有所在节点的全部资源。

**但是如果我们想要扩容超过 6 个节点怎么办呢？**

主分片的数目在索引创建时就已经确定了下来。实际上，这个数目定义了这个索引能够存储的最大数据量。（实际大小取决于你的数据、硬件和使用场景。）但是，读操作和返回数据可以同时被主分片或副本分片所处理，所以当你拥有越多的副本分片时，也将拥有越高的吞吐量。

在运行中的集群上是可以动态调整副本分片数目的，我们可以按需伸缩集群。让我们把副本数从默认的 1 增加到 2

```json
{
    "number_of_replicas" : 2
}
```

在 **Postman** 发送 `PUT` 请求：http://127.0.0.1:7001/users/_settings

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.2uixtlw05hm0.webp)

users 索引现在拥有 9 个分片：3 个主分片和 6 个副本分片。 这意味着我们可以将集群扩容到 9 个节点，每个节点上一个分片。相比原来 3 个节点时，集群搜索性能可以提升 3 倍。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.5o20s9oa7m40.webp)

通过 elasticsearch-head 插件查看集群情况

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.zwr0ajp90hs.webp)

当然，如果只是在相同节点数目的集群上增加更多的副本分片并不能提高性能，因为每个分片从节点上获得的资源会变少。你需要增加更多的硬件资源来提升吞吐量。

但是更多的副本分片数提高了数据冗余量：按照上面的节点配置，我们可以在失去 2 个节点的情况下不丢失任何数据。

### 宕机故障

没宕机前的集群状态：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.7je7eg9umew0.webp)

我们关闭第一个节点，这时集群的状态为：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.2g1o5pmuqa80.webp)

我们关闭的节点是一个主节点。而集群必须拥有一个主节点来保证正常工作，所以发生的第一件事情就是选举一个新的主节点：Node 7002。在我们关闭 Node 7001 的同时也失去了主分片 1 和 2，并且在缺失主分片的时候索引也不能正常工作。如果此时`立即`检查集群的状况，我们看到的状态将会为 red：不是所有主分片都在正常工作。但是`过一会`检查集群状态如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.522nzxdq7140.webp)

幸运的是，在其它节点上存在着这两个主分片的完整副本，所以新的主节点立即将这些分片在 Node 7002 和 Node 7003 上对应的`副本分片提升为主分片`，此时集群的状态将会为 yellow。这个提升主分片的过程是瞬间发生的，如同按下一个开关一般。

**为什么我们集群状态是 yellow 而不是 green 呢？**

虽然我们拥有所有的三个主分片，但是同时设置了每个主分片需要对应 2 份副本分片，而此时只存在一份副本分片。 所以集群不能为 green 的状态，不过我们不必过于担心：如果我们同样关闭了 Node 7002，我们的程序依然可以保持在不丢任何数据的情况下运行，因为 Node 7003 为每一个分片都保留着一份副本。

`主分片消失，则副本上位，变成主分片`

如果我们重新启动 Node 7001，集群可以将缺失的副本分片再次进行分配，那么集群的状态也将恢复成之前的状态。如果 Node 7001 依然拥有着之前的分片，它将尝试去重用它们，同时仅从主分片复制发生了修改的数据文件。和之前的集群相比，只是 Master 节点切换了。

启动 Node 7001，重新查看集群状态：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220704/image.7k663i9g24w0.webp)

只不过 Master 从 Node 7001 变成了 Node 7002。

## 路由计算

当检索一个文档的时候，文档会被存储到一个主分片中。 Elasticsearch 如何知道一个文档应该存放到哪个分片中呢？当我们创建文档时，它如何决定这个文档应当被存储在分片 1 还是分片 2 中呢？首先这肯定不会是随机的，否则将来要获取文档的时候我们就不知道从何处寻找了。实际上，这个过程是根据下面这个公式决定的：

```mathematica
shard = hash(routing) % number_of_primary_shards
位置 = hash(路由哈希值) $ 分片总数
```

routing 是一个可变值，默认是文档的 _id ，也可以设置成一个自定义的值。routing 通过 hash 函数生成一个数字，然后这个数字再除以 number_of_primary_shards（主分片的数量）后得到余数。这个分布在 0 到 number_of_primary_shards-1 之间的余数，就是我们所寻求的文档所在分片的位置。

这就解释了为什么我们要在创建索引的时候就确定好主分片的数量并且永远不会改变这个数量：因为如果数量变化了，那么所有之前路由的值都会无效，文档也再也找不到了。

所有的文档 API（ get、index、delete、bulk、update 以及 mget ）都接受一个叫做 routing 的路由参数，通过这个参数我们可以自定义文档到分片的映射。一个自定义的路由参数可以用来确保所有相关的文档——例如所有属于同一个用户的文档——都被存储到同一个分片中。

