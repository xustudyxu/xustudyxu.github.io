---
title: ElasticSearch 集群搭建
date: 2022-07-03 19:27:17
permalink: /middleware/ElasticSearch/ElasticSearch_buildcluster
categories:
  - ElasticSearch
tags:
  - ElasticSearch
---
# ElasticSearch 集群搭建

[[toc]]

## 相关概念

### 单机 & 集群

单台 Elasticsearch 服务器提供服务，往往都有最大的负载能力，超过这个阈值，服务器性能就会大大降低甚至不可用，所以生产环境中，一般都是运行在指定服务器集群中。

除了负载能力，单点服务器也存在其他问题：

- 单台机器存储容量有限
- 单服务器容易出现单点故障，无法实现高可用
- 单服务的并发处理能力有限

配置服务器集群时，集群中节点数量没有限制，大于等于 2 个节点就可以看做是集群了。一般出于高性能及高可用方面来考虑集群中节点数量都是 3 个以上。

### 集群Cluster

一个集群就是由一个或多个服务器节点组织在一起，共同持有整个的数据，并一起提供索引和搜索功能。一个 Elasticsearch 集群有一个唯一的名字标识，这个名字默认就是 `elasticsearch`。这个名字是重要的，因为一个节点只能通过指定某个集群的名字，来加入这个集群。

### 节点Node

集群中包含很多服务器，一个节点就是其中的一个服务器。作为集群的一部分，它存储数据，参与集群的索引和搜索功能。

一个节点也是由一个名字来标识的，默认情况下，这个名字是一个随机的漫威漫画角色的名字，这个名字会在启动的时候赋予节点。这个名字对于管理工作来说挺重要的，因为在这个管理过程中，你会去确定网络中的哪些服务器对应于 Elasticsearch 集群中的哪些节点。

一个节点可以通过配置集群名称的方式来加入一个指定的集群。默认情况下，每个节点都会被安排加入到一个叫做 `elasticsearch` 的集群中，这意味着，如果你在你的网络中启动了若干个节点，并假定它们能够相互发现彼此，它们将会自动地形成并加入到一个叫做 `elasticsearch` 的集群中。

在一个集群里，只要你想，可以拥有任意多个节点。而且，如果当前你的网络中没有运行任何 Elasticsearch 节点，这时启动一个节点，会默认创建并加入一个叫做 `elasticsearch` 的集群。

## Windows 集群

### 部署集群

1. 创建 elasticsearch-cluster 文件夹，在内部复制三个 elasticsearch 服务

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220703/image.2gxdjx5tkk80.webp)

2. 修改集群文件目录中每个节点的 config/elasticsearch.yml 配置文件

:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"

::: tab node-1001节点

```yaml
#节点 1 的配置信息：
#集群名称，节点之间要保持一致
cluster.name: my-elasticsearch
#节点名称，集群内要唯一
node.name: node-1001
node.master: true
node.data: true
#ip 地址
network.host: localhost
#http 端口
http.port: 7001
#tcp 监听端口
transport.tcp.port: 9301
#discovery.seed_hosts: ["localhost:9301", "localhost:9302","localhost:9303"]
#discovery.zen.fd.ping_timeout: 1m
#discovery.zen.fd.ping_retries: 5
#集群内的可以被选为主节点的节点列表
cluster.initial_master_nodes: ["node-1001", "node-1002","node-1003"]
#跨域配置
#action.destructive_requires_name: true
http.cors.enabled: true
http.cors.allow-origin: "*"
```

:::

::: tab node-1002节点

```yaml
#节点 2 的配置信息：
#集群名称，节点之间要保持一致
cluster.name: my-elasticsearch
#节点名称，集群内要唯一
node.name: node-1002
node.master: true
node.data: true
#ip 地址
network.host: localhost
#http 端口
http.port: 7002
#tcp 监听端口
transport.tcp.port: 9302
discovery.seed_hosts: ["localhost:9301"]
discovery.zen.fd.ping_timeout: 1m
discovery.zen.fd.ping_retries: 5
#集群内的可以被选为主节点的节点列表
cluster.initial_master_nodes: ["node-1001", "node-1002","node-1003"]
#跨域配置
#action.destructive_requires_name: true
http.cors.enabled: true
http.cors.allow-origin: "*"
```

:::

::: tab node-1003节点

```yaml
#节点 3 的配置信息：
#集群名称，节点之间要保持一致
cluster.name: my-elasticsearch
#节点名称，集群内要唯一
node.name: node-1003
node.master: true
node.data: true
#ip 地址
network.host: localhost
#http 端口
http.port: 7003
#tcp 监听端口
transport.tcp.port: 9303
discovery.seed_hosts: ["localhost:9301", "localhost:9302"]
discovery.zen.fd.ping_timeout: 1m
discovery.zen.fd.ping_retries: 5
#集群内的可以被选为主节点的节点列表
cluster.initial_master_nodes: ["node-1001", "node-1002","node-1003"]
#跨域配置
#action.destructive_requires_name: true
http.cors.enabled: true
http.cors.allow-origin: "*"
```

:::

::::

### 启动集群

启动前先删除每个节点中的 data 目录中所有内容（如果存在）

进入 bin 目录，分别双击执行 bin/elasticsearch.bat，启动节点服务器，启动后，会自动加入指定名称的集群

谁先启动就会成为 master

### 测试集群

查看集群状态

在 **Postman** 发送 `GET` 请求：http://127.0.0.1:7001/_cluster/health

+ **node-1001 节点**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220703/image.6rqqfxejph40.webp)

+ **node-1002 节点**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220703/image.601al7uk88k0.webp)

+ **node-1003 节点**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220703/image.1tldok7c7400.webp)

`statu`：当前集群在总体上是否工作正常，有三种颜色

- green：所有的主分片和副本分片都正常运行
- yellow：所有的主分片都正常运行，但不是所有副本分片都正常运行
- red：有主分片没能正常运行

`numnber_of_nodes`：集群里多少个节点

`numnber_of_data_nodes`：集群里多少个节点可以存储数据

向集群中的 node-7001 节点增加索引

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220703/image.6054tzdists0.webp)

在集群的node-1002节点查询刚刚添加的索引

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220703/image.3638txpbrai0.webp)

## Linux 集群

如果没有在 Linux 安装过 ElasticSearch，[安装传送门](/middleware/ElasticSearch/ElasticSearch_install/#linux%E4%B8%8A%E5%AE%89%E8%A3%85es)

分别在多台机器安装 ElasticSearch。安装目录位于`/usr/local/elastic-stack/`里，在该目录下复制三份 ES 目录，名字自定义，这里的名字为了标识性，与端口有关

```sh
cp -r es node-7001
cp -r es node-7002
cp -r es node-7003
```

这样就有 4 个 ElasticSearch 服务。

其中 es 是解压后的 ES 目录，复制三份出来是为了集群，且不动用 es 目录。这样以后集群就用三个复制出来的目录，一个就用 es 目录。

效果如下：

```sh
drwxr-xr-x  7 root root    128 7月   3 18:17 node-7001
drwxr-xr-x  7 root root    128 7月   3 18:17 node-7002
drwxr-xr-x  7 root root    128 7月   3 18:17 node-7003
```

### 创建用户

因为安全问题，Elasticsearch 不允许 root 用户直接运行，所以要在每个节点中创建新用户，在 root 用户中创建新用户

```sh
useradd es # 新增用户
passwd es # 设置密码
userdel -r es # 如果错了，可以删除再加
# 文件夹所有者
chown -R es /usr/local/elastic-stack/node-7001 
chown -R es /usr/local/elastic-stack/node-7002
chown -R es /usr/local/elastic-stack/node-7003
```

因为安全问题，Elasticsearch 不允许 root 用户直接运行，所以要在每个节点中创建新用户，在 root 用户中创建新用户,在Linux单节点我已创建过es用户,赋予es用户权限

```sh
chown -R es /usr/local/elastic-stack/node-7001 
chown -R es /usr/local/elastic-stack/node-7002
chown -R es /usr/local/elastic-stack/node-7003
```

效果如下:

```sh
drwxr-xr-x  8 es   root                138 7月   3 18:23 node-7001
drwxr-xr-x 10 es   root                178 7月   3 18:23 node-7002
drwxr-xr-x 10 es   root                178 7月   3 18:23 node-7003
```

### 修改配置文件

因为是单台机器，所以 IP 地址不变，端口改变

修改三个 ES 目录里的 config/elasticsearch.yml 文件

```sh
vim /usr/local/elastic-stack/node-7001/config/elasticsearch.yml
vim /usr/local/elastic-stack/node-7002/config/elasticsearch.yml
vim /usr/local/elastic-stack/node-7003/config/elasticsearch.yml
```

我的 Linux 地址是 `192.168.91.200` 在底部添加以下内容：（键盘的 `G` 快速移动到底部）

:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"

::: tab node-7001

```yaml
# 加入如下配置
#集群名称
cluster.name: cluster-es
#节点名称，每个节点的名称不能重复
node.name: node-7001
#ip 地址，每个节点的地址不能重复
network.host: linux1
#是不是有资格主节点
node.master: true
node.data: true
http.port: 9200
# head 插件需要这打开这两个配置
http.cors.allow-origin: "*"
http.cors.enabled: true
http.max_content_length: 200mb
#es7.x 之后新增的配置，初始化一个新的集群时需要此配置来选举 master
cluster.initial_master_nodes: ["node-7001"]
#es7.x 之后新增的配置，节点发现
discovery.seed_hosts: ["linux1:9300","linux2:9300","linux3:9300"]
gateway.recover_after_nodes: 2
network.tcp.keep_alive: true
network.tcp.no_delay: true
transport.tcp.compress: true
#集群内同时启动的数据任务个数，默认是 2 个
cluster.routing.allocation.cluster_concurrent_rebalance: 16
#添加或删除节点及负载均衡时并发恢复的线程个数，默认 4 个
cluster.routing.allocation.node_concurrent_recoveries: 16
#初始化数据恢复时，并发恢复线程的个数，默认 4 个
cluster.routing.allocation.node_initial_primaries_recoveries: 16
```

:::

::: tab node-7002

```yaml
# 加入如下配置
#集群名称
cluster.name: cluster-es
#节点名称，每个节点的名称不能重复
node.name: node-7002
#ip 地址，每个节点的地址不能重复
network.host: linux1
#是不是有资格主节点
node.master: true
node.data: true
http.port: 9200
# head 插件需要这打开这两个配置
http.cors.allow-origin: "*"
http.cors.enabled: true
http.max_content_length: 200mb
#es7.x 之后新增的配置，初始化一个新的集群时需要此配置来选举 master
cluster.initial_master_nodes: ["node-7001"]
#es7.x 之后新增的配置，节点发现
discovery.seed_hosts: ["linux1:9300","linux2:9300","linux3:9300"]
gateway.recover_after_nodes: 2
network.tcp.keep_alive: true
network.tcp.no_delay: true
transport.tcp.compress: true
#集群内同时启动的数据任务个数，默认是 2 个
cluster.routing.allocation.cluster_concurrent_rebalance: 16
#添加或删除节点及负载均衡时并发恢复的线程个数，默认 4 个
cluster.routing.allocation.node_concurrent_recoveries: 16
#初始化数据恢复时，并发恢复线程的个数，默认 4 个
cluster.routing.allocation.node_initial_primaries_recoveries: 16
```

:::

::: tab node-7003

```yaml
# 加入如下配置
#集群名称
cluster.name: cluster-es
#节点名称，每个节点的名称不能重复
node.name: node-7003
#ip 地址，每个节点的地址不能重复
network.host: linux1
#是不是有资格主节点
node.master: true
node.data: true
http.port: 9200
# head 插件需要这打开这两个配置
http.cors.allow-origin: "*"
http.cors.enabled: true
http.max_content_length: 200mb
#es7.x 之后新增的配置，初始化一个新的集群时需要此配置来选举 master
cluster.initial_master_nodes: ["node-7001"]
#es7.x 之后新增的配置，节点发现
discovery.seed_hosts: ["linux1:9300","linux2:9300","linux3:9300"]
gateway.recover_after_nodes: 2
network.tcp.keep_alive: true
network.tcp.no_delay: true
transport.tcp.compress: true
#集群内同时启动的数据任务个数，默认是 2 个
cluster.routing.allocation.cluster_concurrent_rebalance: 16
#添加或删除节点及负载均衡时并发恢复的线程个数，默认 4 个
cluster.routing.allocation.node_concurrent_recoveries: 16
#初始化数据恢复时，并发恢复线程的个数，默认 4 个
cluster.routing.allocation.node_initial_primaries_recoveries: 16
```

:::

::::

**配置文件修改**

1. 修改系统中允许应用最多创建多少文件等的限制权限。Linux 默认来说，一般限制应用最多创建的文件是 65535 个。但是 ES 至少需要 65536 的文件创建权限。
2. 修改系统中允许用户启动的进程开启多少个线程。默认的 Linux 限制 root 用户开启的进程可以开启任意数量的线程，其他用户开启的进程可以开启 1024个线程。必须修改限制数为 4096+。因为ES至少需要 4096 的线程池预备。ES在 5.x 版本之后，强制要求在 Linux 中不能使用 root 用户启动 ES 进程。所以必须使用其他用户启动 ES 进程才可以。
3. Linux 低版本内核为线程分配的内存是 128K。4.x 版本的内核分配的内存更大。如果虚拟机的内存是 1G，最多只能开启 3000+ 个线程数。至少为虚拟机分配 1.5G 以上的内存。

ES 可以对每个进程的文件数进行限制等，如果服务器内存或空间不足，可以通过修改配置文件，进行「裁剪」

修改 /etc/security/limits.conf，在文件末尾中增加下面内容：

```sh
vim /etcsecurity/limits.conf
# 每个进程可以打开的文件数的限制
es soft nofile 65536
es hard nofile 65536
```

修改 /etc/security/limits.d/20-nproc.conf，在文件末尾中增加下面内容:

```sh
vim /etc/security/limits.d/20-nproc.conf
# 每个进程可以打开的文件数的限制
es soft nofile 65536
es hard nofile 65536
# 操作系统级别对每个用户创建的进程数的限制
* hard nproc 4096
# 注：* 带表 Linux 所有用户名称
```

修改 /etc/sysctl.conf，在文件末尾中增加下面内容：

```sh
vim /etc/sysctl.conf
# 一个进程可以拥有的 VMA (虚拟内存区域)的数量,默认值为 65536
vm.max_map_count=655360
```

配置文件后，记得重新加载

```sh
sysctl -p
```

### 测试集群

分别在不同节点上启动 ES 服务器，-d 代表后台启动。

```sh
# 节点1
cd /usr/local/elastic-stack/node-7001
bin/elasticsearch -d
# 节点2
cd /usr/local/elastic-stack/node-7002
bin/elasticsearch -d
# 节点3
cd /usr/local/elastic-stack/node-7003
bin/elasticsearch -d
```

## Linux 集群之单台机器

如果没有在 Linux 安装过 ElasticSearch，[安装传送门](https://frxcat.fun/middleware/ElasticSearch/ElasticSearch_install/#linux%E4%B8%8A%E5%AE%89%E8%A3%85es)

分别在多台机器安装 ElasticSearch。安装目录位于`/usr/local/elastic-stack/`里，在该目录下复制三份 ES 目录，名字自定义，这里的名字为了标识性，与端口有关

### 修改配置文件

因为是多台机器，所以端口不变，IP 地址改变，假设 IP 地址分别是：

- 192.168.91.200
- 192.168.91.201
- 192.168.91.2002

修改三个 ES 目录里的 config/elasticsearch.yml 文件

```sh
vim /usr/local/elastic-stack/es/config/elasticsearch.yml
```

在底部添加以下内容：（键盘的 `G` 快速移动到底部）

:::: tabs cache-lifetime="10" :options="{ useUrlFragment: false }"

::: tab node-1

```yaml
# 集群名称
cluster.name: cluster-es
# 节点名称，每个节点的名称不能重复
node.name: node-1
# ip 地址
network.host: 192.168.91.200
# 是不是有资格主节点
node.master: true
node.data: true
# http 请求端口
http.port: 9200
# tcp 监听端口
transport.tcp.port: 9300
# head 插件需要这打开这两个配置
http.cors.allow-origin: "*"
http.cors.enabled: true
http.max_content_length: 200mb
# es7.x 之后新增的配置，初始化一个新的集群时需要此配置来选举 master
cluster.initial_master_nodes: ["node-1"]
# es7.x 之后新增的配置，发现其他节点
discovery.seed_hosts: ["192.168.199.27:9300","192.168.199.28:9300","192.168.199.29:9300"]
gateway.recover_after_nodes: 2
network.tcp.keep_alive: true
network.tcp.no_delay: true
transport.tcp.compress: true
# 集群内同时启动的数据任务个数，默认是 2 个
cluster.routing.allocation.cluster_concurrent_rebalance: 16
# 添加或删除节点及负载均衡时并发恢复的线程个数，默认 4 个
cluster.routing.allocation.node_concurrent_recoveries: 16
# 初始化数据恢复时，并发恢复线程的个数，默认 4 个
cluster.routing.allocation.node_initial_primaries_recoveries: 16
```

:::

::: tab node-2

```yaml
# 集群名称
cluster.name: cluster-es
# 节点名称，每个节点的名称不能重复
node.name: node-2
# ip 地址
network.host: 192.168.91.200
# 是不是有资格主节点
node.master: true
node.data: true
# http 请求端口
http.port: 9200
# tcp 监听端口
transport.tcp.port: 9300
# head 插件需要这打开这两个配置
http.cors.allow-origin: "*"
http.cors.enabled: true
http.max_content_length: 200mb
# es7.x 之后新增的配置，初始化一个新的集群时需要此配置来选举 master
cluster.initial_master_nodes: ["node-1"]
# es7.x 之后新增的配置，发现其他节点
discovery.seed_hosts: ["192.168.91.200:9300","192.168.91.200:9300","192.168.91.200:9300"]
gateway.recover_after_nodes: 2
network.tcp.keep_alive: true
network.tcp.no_delay: true
transport.tcp.compress: true
# 集群内同时启动的数据任务个数，默认是 2 个
cluster.routing.allocation.cluster_concurrent_rebalance: 16
# 添加或删除节点及负载均衡时并发恢复的线程个数，默认 4 个
cluster.routing.allocation.node_concurrent_recoveries: 16
# 初始化数据恢复时，并发恢复线程的个数，默认 4 个
cluster.routing.allocation.node_initial_primaries_recoveries: 16
```

:::

::: tab node-3

```yaml
# 集群名称
cluster.name: cluster-es
# 节点名称，每个节点的名称不能重复
node.name: node-3
# ip 地址
network.host: 192.168.91.200
# 是不是有资格主节点
node.master: true
node.data: true
# http 请求端口
http.port: 9200
# tcp 监听端口
transport.tcp.port: 9300
# head 插件需要这打开这两个配置
http.cors.allow-origin: "*"
http.cors.enabled: true
http.max_content_length: 200mb
# es7.x 之后新增的配置，初始化一个新的集群时需要此配置来选举 master
cluster.initial_master_nodes: ["node-1"]
# es7.x 之后新增的配置，发现其他节点
discovery.seed_hosts: ["192.168.91.200:9300","192.168.91.200:9300","192.168.91.200:9300"]
gateway.recover_after_nodes: 2
network.tcp.keep_alive: true
network.tcp.no_delay: true
transport.tcp.compress: true
# 集群内同时启动的数据任务个数，默认是 2 个
cluster.routing.allocation.cluster_concurrent_rebalance: 16
# 添加或删除节点及负载均衡时并发恢复的线程个数，默认 4 个
cluster.routing.allocation.node_concurrent_recoveries: 16
# 初始化数据恢复时，并发恢复线程的个数，默认 4 个
cluster.routing.allocation.node_initial_primaries_recoveries: 16
```

:::

::::

**配置文件修改**

1. 修改系统中允许应用最多创建多少文件等的限制权限。Linux 默认来说，一般限制应用最多创建的文件是 65535 个。但是 ES 至少需要 65536 的文件创建权限。
2. 修改系统中允许用户启动的进程开启多少个线程。默认的 Linux 限制 root 用户开启的进程可以开启任意数量的线程，其他用户开启的进程可以开启 1024个线程。必须修改限制数为 4096+。因为ES至少需要 4096 的线程池预备。ES在 5.x 版本之后，强制要求在 Linux 中不能使用 root 用户启动 ES 进程。所以必须使用其他用户启动 ES 进程才可以。
3. Linux 低版本内核为线程分配的内存是 128K。4.x 版本的内核分配的内存更大。如果虚拟机的内存是 1G，最多只能开启 3000+ 个线程数。至少为虚拟机分配 1.5G 以上的内存。

ES 可以对每个进程的文件数进行限制等，如果服务器内存或空间不足，可以通过修改配置文件，进行「裁剪」

修改 /etc/security/limits.conf，在文件末尾中增加下面内容

```sh
vim /etc/security/limits.d/20-nproc.conf
# 每个进程可以打开的文件数的限制
es soft nofile 65536
es hard nofile 65536
# 操作系统级别对每个用户创建的进程数的限制
* hard nproc 4096
# 注：* 带表 Linux 所有用户名称
```

修改 /etc/security/limits.d/20-nproc.conf，在文件末尾中增加下面内容：

```sh
vim /etc/security/limits.d/20-nproc.conf
# 每个进程可以打开的文件数的限制
es soft nofile 65536
es hard nofile 65536
# 操作系统级别对每个用户创建的进程数的限制
* hard nproc 4096
# 注：* 带表 Linux 所有用户名称
```

修改 /etc/sysctl.conf，在文件末尾中增加下面内容：

```sh
vim /etc/sysctl.conf
# 一个进程可以拥有的 VMA (虚拟内存区域)的数量,默认值为 65536
vm.max_map_count=655360
```

配置文件后，记得重新加载

```sh
sysctl -p
```

### 启动软件

分别在不同节点上启动 ES 服务器，-d 代表后台启动。

```sh
cd /usr/local/elastic-stack/es
# 启动
bin/elasticsearch
# 后台启动
bin/elasticsearch -d
```

### 测试集群

在浏览器地址发送请求：http://192.168.91.200:9200/_cat/nodes

有三个节点出现，说明配置成功。

