---
title: ElasticSearch 分片操作原理
date: 2022-07-05 21:41:41
permalink: /middleware/ElasticSearch/ElasticSearch_Slicing_operation_principle
categories:
  - ElasticSearch
tags:
  - ElasticSearch
---
# ElasticSearch 分片操作原理

[[toc]]

## 概念

分片是 Elasticsearch 最小的工作单元。但是究竟什么是一个分片，它是如何工作的？

传统的数据库每个字段存储单个值，但这对全文检索并不够。文本字段中的每个单词需要被搜索，对数据库意味着需要单个字段有及检索多值的能力。最好的支持是一个字段多个值需求的数据结构是<mark>倒排索引</mark>。

## 倒排索引

Elasticsearch 使用一种称为<mark>倒排索引</mark>的结构，它适用于快速的全文搜索。

见其名，知其意，有倒排索引，肯定会对应有正向索引（forward index）。倒排索引也称为反向索引（inverted index）。

所谓的<mark>正向索引</mark>，就是搜索引擎会将待搜索的文件都对应一个文件 ID，搜索时将这个 ID 和搜索关键字进行对应，形成 K-V 键值对，然后对关键字进行统计计数。就是通过搜索关键词找到对应的文件。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.spow3fyruxc.webp)

但是互联网上收录在搜索引擎中的文档的数目是个天文数字，这样的索引结构根本无法满足实时返回排名结果的要求。

所以，搜索引擎会将正向索引重新构建为倒排索引，即把文件 ID 对应到关键词的映射转换为关键词到文件ID的映射，每个关键词都对应着一系列的文件，这些文件中都出现这个关键词。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.1why5oxovrk0.webp)

一个倒排索引由文档中所有不重复词的列表构成，对于其中每个词，有一个包含它的文档列表。例如，假设我们有两个文档，每个文档的 content 域包含如下内容：

- The quick brown fox jumped over the lazy dog
- Quick brown foxes leap over lazy dogs in summer

为了创建倒排索引，我们首先将每个文档的 content 域拆分成单独的词（我们称它为词条或 `tokens` ），创建一个<mark>包含所有不重复词条</mark>的排序列表，然后列出每个词条出现在哪个文档。结果如下所示：（`X` 代表存在）

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.5vldzmxdlkw0.webp)

现在，如果我们想搜索 `quick`、`brown` ，我们只需要查找包含每个词条的文档：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.5772inyfqt4.webp)

两个文档都匹配，但是第一个文档比第二个匹配度更高。如果我们使用仅计算匹配词条数量的简单相似性算法，那么我们可以说，对于我们查询的相关性来讲，第一个文档比第二个文档更佳。

但是，目前的倒排索引有一些问题：

- Quick 和 quick 以独立的词条出现，然而用户可能认为它们是相同的词
- fox 和 foxes 非常相似，就像 dog 和 dogs ；他们有相同的词根
- jumped 和 leap，尽管没有相同的词根，但他们的意思很相近。他们是同义词

使用前面的索引搜索 `+Quick`、`+fox` 不会得到任何匹配文档。（记住，+ 前缀表明这个词必须存在。）只有同时出现 `Quick` 和 `fox` 的文档才满足这个查询条件，但是第一个文档包含 quick fox ，第二个文档包含 Quick foxes。

我们的用户可以合理的期望两个文档与查询匹配。我们可以做的更好。如果我们将词条规范为标准模式，那么我们可以找到与用户搜索的词条不完全一致，但具有 足够相关性的文档。例如：

- Quick 可以小写化为 quick
- foxes 可以词干提取，变为词根的格式，为 fox 。类似的，dogs 可以为提取为 dog
- jumped 和 leap 是同义词，可以检索为相同的单词 jump

现在索引看上去像这样：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.1fl593287qrk.webp)

这还远远不够。我们搜索 `+Quick`、`+fox` 仍然会失败，因为在我们的索引中，已经没有 `Quick` 了。但是，如果我们对搜索的字符串使用与 content 域相同的标准化规则，会变成查询 `+quick` `+fox`，这样两个文档都会匹配！分词和标准化的过程称为<mark>分析</mark>。

这非常重要。你只能搜索在索引中出现的词条，所以索引文本和查询字符串必须标准化为相同的格式。

**简单理解**

正向索引:

| id   | name           |
| ---- | -------------- |
| 001  | Im a chinese   |
| 100  | my name is frx |

倒排索引：

| keyword | id   | name           |
| ------- | ---- | -------------- |
| Im      | 001  | Im a chinese   |
| a       | 001  | Im a chinese   |
| chinese | 001  | Im a chinese   |
| my      | 100  | my name is frx |
| name    | 100  | my name is frx |
| is      | 100  | my name is frx |
| frx     | 100  | my name is frx |

正向索引流程：查询 `frx`，需要遍历每一个 id 的 name，从 001 开始

倒排索引流程：查询 `frx`，只需要遍历 keyword，通过 keyword 找到 id，就可以获取 name。

## 文档搜索

早期的全文检索会为整个文档集合建立一个很大的倒排索引并将其写入到磁盘。 一旦新的索引就绪，旧的就会被其替换，这样最近的修改变化便可以被检索到。

倒排索引被写入磁盘后是<mark>不可改变</mark>的：它永远不会修改。

不变性有重要的价值：

- 不需要锁。如果你从来不更新索引，你就不需要担心多进程同时修改数据的问题
- 一旦索引被读入内核的文件系统缓存，便会留在哪里，由于其不变性。只要文件系统缓存中还有足够的空间，那么大部分读请求会直接请求内存，而不会命中磁盘。这提供了很大的性能提升
- 其它缓存(像 filter 缓存)，在索引的生命周期内始终有效。它们不需要在每次数据改变时被重建，因为数据不会变化
- <mark>写入单个大的倒排索引允许数据被压缩</mark>，减少磁盘 I/O 和 需要被缓存到内存的索引的使用量。当然，一个不变的索引也有不好的地方。主要事实是它是不可变的! 你不能修改它。如果你需要让一个新的文档可被搜索，你需要重建整个索引。这要么对一个索引所能包含的数据量造成了很大的限制，要么对索引可被更新的频率造成了很大的限制

## 动态更新索引

> **如何在保留不变性的前提下实现倒排索引的更新？**

答案是: 用更多的索引。通过增加新的补充索引来反映最近的修改，而不是直接重写整个倒排索引。每一个倒排索引都会被轮流查询到，从最早的开始查询完后再对结果<mark>进行合并</mark>（因为不重写索引，所以旧索引要合并减少空间大小）。

Elasticsearch 基于 Lucene，这个 java 库引入了<mark>按段搜索</mark>的概念。 每一段本身都是一个倒排索引，但索引在 Lucene 中除表示所有段的集合外，还增加了提交点的概念：一个列出了所有已知段的文件。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.1ca78zo9jedc.webp)

<mark>按段搜索</mark>会以如下流程执行：

1. 新文档被收集到内存索引缓存

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.2rwt32k2s6a0.webp)

1. 不时地，缓存被提交
   1. 一个新的段：一个追加的倒排索引被写入磁盘
   2. 一个新的包含新段名字的「提交点」 被写入磁盘
   3. 磁盘进行同步，所有在文件系统缓存中等待的写入都刷新到磁盘，以确保它们被写入物理文件
2. 新的段被开启，让它包含的文档可见以被搜索
3. 内存缓存被清空，等待接收新的文档

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.4jiajnwyaum0.webp)

当一个查询被触发，所有已知的段按顺序被查询。词项统计会对所有段的结果进行聚合，以保证每个词和每个文档的关联都被准确计算。 这种方式可以用相对较低的成本将新文档添加到索引。

段是不可改变的，所以既不能从把文档从旧的段中移除，也不能修改旧的段来进行反映文档的更新。取而代之的是，每个提交点会包含一个 .del 文件，文件中会列出这些被删除文档的段信息。

当一个文档被」删除」时，它实际上只是在 .del 文件中被「标记」删除。一个被标记删除的文档仍然可以被查询匹配到，但它<mark>会在最终结果被返回前从结果集中移除</mark>。

文档更新也是类似的操作方式：当一个文档被更新时，旧版本文档被标记删除，文档的新版本被检索到一个新的段中。可能两个版本的文档都会被一个查询匹配到，但被删除的那个旧版本文档在结果集返回前就已经被移除。

## 近实时搜索

随着按段（per-segment）搜索的发展，一个新的文档从索引到可被搜索的延迟显著降低了。新文档在几分钟之内即可被检索，但这样还是不够快。磁盘在这里成为了瓶颈。提交（Commiting）一个新的段到磁盘需要一个 `fsync` 来确保段被物理性地写入磁盘，这样在断电的时候就不会丢失数据。但是 `fsync` 操作代价很大; 如果每次检索一个文档都去执行一次的话会造成很大的性能问题。

我们需要的是一个更轻量的方式来使一个文档可被搜索，这意味着 `fsync` 要从整个过程中被移除。在 Elasticsearch 和磁盘之间是文件系统缓存。像之前描述的一样，在内存索引缓冲区中的文档会被写入到一个新的段中。但是这里新段会被先写入到文件系统缓存，这一步代价会比较低，稍后再被刷新到磁盘，这一步代价比较高。不过只要文件已经在缓存中，就可以像其它文件一样被打开和读取了。

Lucene 允许新段被写入和打开，使其包含的文档在未进行一次完整提交时便对搜索可见。这种方式比进行一次提交代价要小得多，并且在不影响性能的前提下可以被频繁地执行。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.1i72wek5rb1c.webp)

在 Elasticsearch 中，写入和打开一个新段的轻量的过程叫做 refresh 。默认情况下每个分片会每秒自动刷新一次。这就是为什么我们说 Elasticsearch 是近实时搜索: 文档的变化并不是立即对搜索可见，但会在一秒之内变为可见。这些行为可能会对新用户造成困惑: 他们检索了一个文档然后尝试搜索它，但却没有搜到。这个问题的解决办法是用 refresh API 执行一次手动刷新: `/users/_refresh`

尽管刷新是比提交轻量很多的操作，它还是会有性能开销。当写测试的时候，手动刷新很有用，但是不要在生产环境下每次检索一个文档都去手动刷新。相反，你的应用需要意识到 Elasticsearch 的近实时的性质，并接受它的不足。

并不是所有的情况都需要每秒刷新。可能你正在使用 Elasticsearch 检索大量的日志文件，你可能想优化检索速度而不是近实时搜索，可以通过设置 `refresh_interval`，降低每个索引的刷新频率

```json
{
    "settings": {
        "refresh_interval": "30s" 
    }
}
```

`refresh_interval` 可以在既存索引上进行动态更新。在生产环境中，当你正在建立一个大的新索引时，可以先关闭自动刷新，待开始使用该索引时，再把它们调回来

```sh
# 关闭自动刷新
PUT /users/_settings
{
    "refresh_interval": -1
} 
# 每一秒刷新
PUT /users/_settings
{
    "refresh_interval": "1s"
}
```

## 持久化变更

如果没有用 fsync 把数据从文件系统缓存刷（flush）到硬盘，我们不能保证数据在断电甚至是程序正常退出之后依然存在。为了保证 Elasticsearch 的可靠性，需要确保数据变化被持久化到磁盘。在动态更新索引，我们说一次完整的提交会将段刷到磁盘，并写入一个包含所有段列表的提交点。Elasticsearch 在启动或重新打开一个索引的过程中使用这个提交点来判断哪些段隶属于当前分片。

即使通过每秒刷新（refresh）实现了近实时搜索，我们仍然需要经常进行完整提交来确保能从失败中恢复。但在两次提交之间发生变化的文档怎么办？我们也不希望丢失掉这些数据。Elasticsearch 增加了一个 translog，或者叫事务日志，在每一次对 Elasticsearch 进行 操作时均进行了日志记录。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.2wqzo0d8lye0.webp)

原始的操作直接从内存（Memory）的 `index` 到磁盘（Disk）进行写入数据 `Segment`

去掉 `fsync` 后，添加一层缓存区（OS Cache），当通过 `index` 写入时，存到缓存区里后直接返回结果，缓存区将数据写入磁盘的操作不需要管理，这一步完全可以慢慢写入磁盘，不影响返回给客户端的响应结果。并且双重安全考虑，在写入时，也将数据存入到内存的 Translog 日志里，内存的日志再写入到磁盘的日志中。

整个流程如下：

1. 一个文档被索引之后，就会被添加到内存缓冲区，并且追加到了 translog 日志

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.4cy2su25u8o0.webp)

2. 刷新（refresh）使分片每秒被刷新（refresh）一次：

- 这些在内存缓冲区的文档被写入到一个新的段中，且没有进行 fsync 操作
- 这个段被打开，使其可被搜索
- 内存缓冲区被清空

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.3ylja6rewxk0.webp)

3. 这个进程继续工作，更多的文档被添加到内存缓冲区和追加到事务日志

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.4czulsx2el00.webp)

4. 每隔一段时间，例如 translog 变得越来越大，索引被刷新（flush）；一个新的 translog 被创建，并且一个全量提交被执行

- 所有在内存缓冲区的文档都被写入一个新的段
- 缓冲区被清空
- 一个提交点被写入硬盘
- 文件系统缓存通过 fsync 被刷新（flush）
- 老的 translog 被删除

translog 提供所有还没有被刷到磁盘的操作的一个持久化纪录。当 Elasticsearch 启动的时候，它会从磁盘中使用最后一个提交点去恢复已知的段，并且会重放 translog 中所有在最后一次提交后发生的变更操作。

translog 也被用来提供实时 CRUD。当你试着通过 ID 查询、更新、删除一个文档，它会在尝试从相应的段中检索之前，首先检查 translog 任何最近的变更。这意味着它总是能够实时地获取到文档的最新版本。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.2n6d7ac5vze0.webp)

执行一个提交并且截断 translog 的行为在 Elasticsearch 被称作一次 `flush` 分片每 30 分钟被自动刷新（flush），或者在 translog 太大的时候也会刷新。

你很少需要自己手动执行 flush 操作；通常情况下，自动刷新就足够了。这就是说，在重启节点或关闭索引之前执行 flush 有益于你的索引。当 Elasticsearch 尝试恢复或重新打开一个索引，它需要重放 translog 中所有的操作，所以如果日志越短，恢复越快。

translog 的目的是保证操作不会丢失，在文件被 fsync 到磁盘前，被写入的文件在重启之后就会丢失。默认 translog 是每 5 秒被 fsync 刷新到硬盘， 或者在每次写请求完成之后执行(e.g., index, delete, update, bulk)。这个过程在主分片和复制分片都会发生。最终，基本上，这意味着在整个请求被 fsync 到主分片和复制分片的 translog 之前，你的客户端不会得到一个 200 OK 响应。

在每次请求后都执行一个 fsync 会带来一些性能损失，尽管实践表明这种损失相对较小（特别是 bulk 导入，它在一次请求中平摊了大量文档的开销）。

但是对于一些大容量的偶尔丢失几秒数据问题也并不严重的集群，使用异步的 fsync 还是比较有益的。比如，写入的数据被缓存到内存中，再每 5 秒执行一次 fsync。如果你决定使用异步 translog 的话，你需要保证在发生 crash 时，丢失掉 `sync_interval` 时间段的数据也无所谓。请在决定前知晓这个特性。如果你不确定这个行为的后果，最好是使用默认的参数（ "index.translog.durability": "request" ）来避免数据丢失。

## 段合并

由于自动刷新流程每秒会创建一个新的段，这样会导致短时间内的段数量暴增。而段数目太多会带来较大的麻烦。每一个段都会消耗文件句柄、内存和 cpu 运行周期。更重要的是，每个搜索请求都必须轮流检查每个段；所以段越多，搜索也就越慢。

Elasticsearch 通过在后台进行段合并来解决这个问题。小的段被合并到大的段，然后这些大的段再被合并到更大的段。

段合并的时候会将那些旧的已删除文档从文件系统中清除。被删除的文档（或被更新文档的 旧版本）不会被拷贝到新的大段中。

启动段合并不需要你做任何事。进行检索和搜索时会自动进行。

- 当检索的时候，刷新（refresh）操作会创建新的段并将段打开以供搜索使用
- 合并进程选择一小部分大小相似的段，并且在后台将它们合并到更大的段中。这并不会中断检索和搜索

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.7azx5r0frvo0.webp)

- 一旦合并结束，老的段被删除
  - 新的段被刷新（flush）到了磁盘。 ** 写入一个包含新段且排除旧的和较小的段的新提交点
  - 新的段被打开用来搜索
  - 老的段被删除

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220705/image.rzljm90yps0.webp)

合并大的段需要消耗大量的 I/O 和 CPU 资源，如果任其发展会影响搜索性能。Elasticsearch 在默认情况下会对合并流程进行资源限制，所以搜索仍然有足够的资源很好地执行。