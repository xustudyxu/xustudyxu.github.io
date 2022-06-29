---
title: Redis 集群搭建
date: 2022-06-20 21:37:05
permalink: /database/Reids/Redis_ClusterBuild
categories:
  - Redis
tags:
  - Redis
---
# Redis 集群搭建

[[toc]]

## 问题

容量不够，redis 如何进行扩容？并发写操作， redis 如何分摊？另外，主从模式，薪火相传模式，主机宕机，导致 ip 地址发生变化，应用程序中配置需要修改对应的主机地址、端口等信息。

之前通过代理主机来解决，但是 redis3.0 中提供了解决方案。就是 **无中心化集群** 配置：即每个节点都可以和其他节点进行联系。如 A、B、C 节点。想访问 B 节点，可以先访问 A 节点，A 节点会去联系 B 节点。无须代理服务器或者负载均衡去找对应的节点

## 什么是集群

Redis 集群实现了对 Redis 的水平扩容，即启动 N 个 redis 节点，将整个数据库分布存储在这 N 个节点中，每个节点存储总数据的 1/N。

Redis 集群通过分区（partition）来提供一定程度的可用性（availability）：即使集群中有一部分节点失效或者无法进行通讯，集群也可以继续处理命令请求。

## 环境准备

- 将 rdb、aof 文件都删除掉
- 制作 6 个实例，三主三从，三主机端口分别为 6379，6380，6381。三从机端口分别为6389，6390，6391（具体端口视情况）
- 每一个配置文件的基本信息修改（和 **主从复制 - 哨兵模式** 一样）
  - 开启 daemonize yes
  - 指定 6 个端口，不能重复
  - 6 个 Pid 文件名字配置，不能重复，尽量以加上端口进行识别
  - 6 个 Log 文件名字，不能重复，尽量以加上端口进行识别
  - 6 个 dump.rdb 名字，不能重复，尽量以加上端口进行识别
  - Appendonly 关掉或者换名字
- 每一个配置文件的集群信息修改
  - cluster-enabled yes：打开集群模式
  - cluster-config-file nodes-6379.conf：设定节点配置文件名
  - cluster-node-timeout 15000：设定节点失联时间，超过该时间（毫秒），集群自动进行主从切换

6379 配置文件模板：

```shell
include /etc/redis.conf    # 核心配置文件
pidfile /var/run/redis_6379.pid   # 固定
port 6379    #端口
dbfilename dump6379.rdb   # 持久化备份文件
cluster-enabled yes   # 开启集群模式
cluster-config-file nodes-6379.conf   # 自己的节点文件名，自动生成，存放节点信息，路径与配置文件一致
cluster-node-timeout 15000   # 设定节点失联时间，超过该时间（毫秒），集群自动进行主从切换
```

其他 5 个 Redis 实例也加上端口来识别

> **技巧**

先配置好一个如 redis6379.conf 配置文件，然后拷贝出 5 个，并内容把 6379 全改为自己的端口名即可

```shell
[root@master myredis]# cp redis6379.conf redis6380.conf
[root@master myredis]# cp redis6379.conf redis6381.conf
[root@master myredis]# cp redis6379.conf redis6389.conf
[root@master myredis]# cp redis6379.conf redis6390.conf
[root@master myredis]# cp redis6379.conf redis6391.conf
```

使用替换指令

```shell
:%s/6379/6380            # 其中 /6380 可以换成其他如 6381  6389 等
```

总结：创建多个 Redis 配置文件，文件名以及端口以及端口有关的名都不一样即可。主从或者集群关系只需几个指令就可以设置。

分别启动6台redis（如果在的就是当前文件的目录，可以不加目录路径）

```shell
[root@master myredis]# redis-server redis6379.conf
[root@master myredis]# redis-server redis6380.conf
[root@master myredis]# redis-server redis6381.conf
[root@master myredis]# redis-server redis6389.conf
[root@master myredis]# redis-server redis6390.conf
[root@master myredis]# redis-server redis6391.conf
```

确保所有 Redis 实例启动后，nodes-xxxx.conf 文件都生成正常，即配置文件里的 `cluster-config-file nodes-6379.conf` 是否生成，位置与该配置文件一个目录

此时虽然启动了 6 台 Redis，但是他们并没有关联起来，需要指令：

+ 首先进入 Redis 的安装目录下的 src 目录中，如 `/opt/redis/redis-6.2.6/src`，因为指令就在这个目录下
+ 执行的指令模板：

```shell
redis-cli --cluster create --cluster-replicas -a passsword num ip:port ip:port ...
```

其中 num 代表每个主节点需要的从节点数，如下面的 1，代表每个主节点都有一个从节点,-a 代表要输入密码

+ 完整指令

```shell
redis-cli --cluster create --cluster-replicas 1 192.168.197.200:6379 192.168.197.200:6380 192.168.197.200:6381 192.168.197.200:6389 192.168.197.200:6390 192.168.197.200:6391
```

- **此处不要用 127.0.0.1， 请用真实 IP 地址**，如果有密码，加入在 `--cluster-replicas` 后加 -a 密码即可。

此时不报错，说明集群已经搭建成功，进入任意主机即可。但是进入客户端前需要指定是集群模式和端口号：

```shell
redis-cli -c -p 6379
redis-cli -c -p 6380
redis-cli -c -p 6381
redis-cli -c -p 6389
redis-cli -c -p 6390
redis-cli -c -p 6391
```

**-c 必须加，代表进入的是集群策略。**

```shell
>>> Performing Cluster Check (using node 192.168.197.200:6379)
M: c9de66e8534c691d10a6a99946fc9f3928b404db 192.168.197.200:6379
   slots:[0-5460] (5461 slots) master
   1 additional replica(s)
M: bfe1a2a2ae71f07a71c4930a5640a86da7989af0 192.168.197.200:6380
   slots:[5461-10922] (5462 slots) master
   1 additional replica(s)
S: f08e89bc607e1a0409159362733bf90623755b5d 192.168.197.200:6390
   slots: (0 slots) slave
   replicates e680c86301b353f274316b8687dfb852b9bc4760
M: e680c86301b353f274316b8687dfb852b9bc4760 192.168.197.200:6381
   slots:[10923-16383] (5461 slots) master
   1 additional replica(s)
S: f9b5e77fd39411989cdbbc35b114039ac33ec5ac 192.168.197.200:6391
   slots: (0 slots) slave
   replicates c9de66e8534c691d10a6a99946fc9f3928b404db
S: c743893f689f4c21c15eb6dab5002ac500603055 192.168.197.200:6389
   slots: (0 slots) slave
   replicates bfe1a2a2ae71f07a71c4930a5640a86da7989af0
[OK] All nodes agree about slots configuration.
>>> Check for open slots...
>>> Check slots coverage...
[OK] All 16384 slots covered.
```

## 插槽slot

启动集群后，会看到如下提示：

```shell
[OK] All 16384 slots covered.
```

16384 代表插槽数量，不是固定的。

每个节点负责一部分插槽。即 16384 个插槽分成三份给三个节点。

集群使用公式 `CRC16(key) % 16384` 来计算键 key 属于哪个槽， 其中 CRC16(key) 语句用于计算键 key 的 CRC16 校验和。

示例：

节点 A 负责处理 0 号至 5460 号插槽。 节点 B 负责处理 5461 号至 10922 号插槽。 节点 C 负责处理 10923 号至 16383 号插槽。

```shell
set k1 v1
set k2 v2
set k3 v3
```

当存储 k1，k2，k3 的值时，对这三个 key 分别计算出 slot 值，然后存入管理不同的 slot 范围的节点里。

假设 k1 的 slot 值为 440，则存入 A 节点里，k2 的 slot 值为 8999，则存入 B 节点里。

当 get 取值时，会根据 key 计算 slot 值去对应的节点拿到值。

### 在集群中录入值

在 redis-cli 每次录入、查询键值，redis 都会计算出该 key 应该送往的插槽，如果不是 该客户端对应服务器的插槽，redis 会报错，并告知应前往的 redis 实例地址和端口。

redis-cli 客户端提供了 –c 参数实现自动重定向。

如 `redis-cli -c –p 6379` 登入后，再录入、查询键值对可以自动重定向

```shell
127.0.0.1:6379> set k1 v1
-> Redirected to slot [12706] located at 192.168.197.200:6381
OK
192.168.197.200:6381>
```

### 缺点

不在一个 slot 下的键值，是不能使用 mget、mset 等多键操作，因为添加多个 key 时，不同的 key 计算出来的 slot 是不一样的

```shell
192.168.197.200:6381> mset name lucy age 20 sex woman
(error) CROSSSLOT Keys in request don't hash to the same slot
```

解决：

可以通过 {} 来定义组的概念，从而使 key 中 {} 内相同内容的键值对放到一个 slot 中去

```shell
192.168.197.200:6381> mset name{user} lucy age{user} 20 sex{user} woman
-> Redirected to slot [5474] located at 192.168.197.200:6380
OK
```

## 集群指令

查看键的插槽值

```shell
cluster keyslot k1
```

查看插槽值里有几个key

```shell
cluster countkeysinslot 4847             #只能看自己插槽的值
```

查看集群信息

```shell
cluster nodes
```

查询集群中的值

```shell
cluster getkeysinslot <slot> <count>     #返回 count 个 slot 槽中的键
```

## 故障恢复

+ 查看集群信息命令

```shell
cluster nodes
```

> **如果主节点下线？从节点能否自动升为主节点？**

注意：15 秒超时（前面配置文件配置的）

```shell {4}
127.0.0.1:6380> cluster nodes
c743893f689f4c21c15eb6dab5002ac500603055 192.168.197.200:6389@16389 slave bfe1a2a2ae71f07a71c4930a5640a86da7989af0 0 1655730683000 2 connected
f08e89bc607e1a0409159362733bf90623755b5d 192.168.197.200:6390@16390 slave e680c86301b353f274316b8687dfb852b9bc4760 0 1655730685448 3 connected
c9de66e8534c691d10a6a99946fc9f3928b404db 192.168.197.200:6379@16379 master,fail - 1655730523215 1655730521191 1 disconnected
e680c86301b353f274316b8687dfb852b9bc4760 192.168.197.200:6381@16381 master - 0 1655730684439 3 connected 10923-16383
f9b5e77fd39411989cdbbc35b114039ac33ec5ac 192.168.197.200:6391@16391 master - 0 1655730684000 7 connected 0-5460
bfe1a2a2ae71f07a71c4930a5640a86da7989af0 192.168.197.200:6380@16380 myself,master - 0 1655730684000 2 connected 5461-10922
```

重连6379

```shell
127.0.0.1:6380> cluster nodes 
c743893f689f4c21c15eb6dab5002ac500603055 192.168.197.200:6389@16389 slave bfe1a2a2ae71f07a71c4930a5640a86da7989af0 0 1655731466000 2 connected
f08e89bc607e1a0409159362733bf90623755b5d 192.168.197.200:6390@16390 slave e680c86301b353f274316b8687dfb852b9bc4760 0 1655731468209 3 connected
c9de66e8534c691d10a6a99946fc9f3928b404db 192.168.197.200:6379@16379 slave f9b5e77fd39411989cdbbc35b114039ac33ec5ac 0 1655731464000 7 connected
e680c86301b353f274316b8687dfb852b9bc4760 192.168.197.200:6381@16381 master - 0 1655731467189 3 connected 10923-16383
f9b5e77fd39411989cdbbc35b114039ac33ec5ac 192.168.197.200:6391@16391 master - 0 1655731465144 7 connected 0-5460
bfe1a2a2ae71f07a71c4930a5640a86da7989af0 192.168.197.200:6380@16380 myself,master - 0 1655731467000 2 connected 5461-10922
```

> **如果所有某一段插槽的主从节点都宕掉，Redis 服务是否还能继续？**

答：看配置文件的配置。redis.conf 中的参数 `cluster-require-full-coverage`：

- 如果某一段插槽的主从都挂掉，而 `cluster-require-full-coverage` 为 yes ，那么 ，整个集群都挂掉
- 如果某一段插槽的主从都挂掉，而 `cluster-require-full-coverage` 为 no ，那么，该插槽数据全都不能使用，也无法存储

## Java整合

集群配置好后，使用 Java 进行整合。

Java 中，只需连接一个主节点即可，因为 **无中心化配置** 可以让内容在每一个节点间互相传递，即：无论从哪台主机写的数据，其他主机上都能读到数据。

如果但是连接的节点可能宕机，需要连接多个节点，用 set 集合即可。

```java
public class RedisClusterDemo {

    public static void main(String[] args) throws IOException {
        //创建对象,redis集群无中心化的，写一个端口号就可以了
        HostAndPort hostAndPort = new HostAndPort("192.168.197.200", 6379);
        JedisCluster jedisCluster = new JedisCluster(hostAndPort);

        //进行操作
        jedisCluster.set("b1","v1");
        String v1 = jedisCluster.get("b1");
        System.out.println(v1);

        jedisCluster.close();

    }
}
```

## 集群优缺点

优点：

- 实现扩容
- 分摊压力
- 无中心配置相对简单

缺点：

- 多键操作是不被支持的
- 多键的 Redis 事务是不被支持的。lua 脚本不被支持
- 由于集群方案出现较晚，很多公司已经采用了其他的集群方案，而代理或者客户端分片的方案想要迁移至 redis cluster，需要整体迁移而不是逐步过渡，复杂度较大