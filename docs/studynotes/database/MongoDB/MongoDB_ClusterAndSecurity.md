---
title: MongoDB 集群和安全
date: 2022-06-27 23:23:57
permalink: /database/MongoDB/MongoDB_ClusterAndSecurity
categories:
  - MongoDB
tags:
  - MongoDB
---
# MongoDB 集群和安全

[[toc]]

## 学习目标

+ MongoDB的副本集：操作、主要概念、故障转移、选举规则
+ MongoDB的分片集群：概念、优点、操作、分片策略、故障转移
+ MongoDB的安全认证

## 副本集-Replica Sets

### 简介

MongoDB中的副本集（Replica Set）是一组维护相同数据集的mongod服务。 副本集可提供冗余和高
可用性，是所有生产部署的基础。

也可以说，副本集类似于有自动故障恢复功能的主从集群。通俗的讲就是用多台机器进行同一数据的异
步同步，从而使多台机器拥有同一数据的多个副本，并且当主库当掉时在不需要用户干预的情况下自动
切换其他备份服务器做主库。而且还可以利用副本服务器做只读服务器，实现读写分离，提高负载。

1. 冗余和数据可用性

复制提供冗余并提高数据可用性。 通过在不同数据库服务器上提供多个数据副本，复制可提供一定级别
的容错功能，以防止丢失单个数据库服务器。

在某些情况下，复制可以提供增加的读取性能，因为客户端可以将读取操作发送到不同的服务上， 在不
同数据中心维护数据副本可以增加分布式应用程序的数据位置和可用性。 您还可以为专用目的维护其他
副本，例如灾难恢复，报告或备份。

2. MongoDB中的复制

副本集是一组维护相同数据集的mongod实例。 副本集包含多个数据承载节点和可选的一个仲裁节点。
在承载数据的节点中，一个且仅一个成员被视为主节点，而其他节点被视为次要（从）节点。

主节点接收所有写操作。 副本集只能有一个主要能够确认具有{w：“most”}写入关注的写入; 虽然在某
些情况下，另一个mongod实例可能暂时认为自己也是主要的。主要记录其操作日志中的数据集的所有
更改，即oplog。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220627/image.28iayc515les.webp)

辅助(副本)节点复制主节点的oplog并将操作应用于其数据集，以使辅助节点的数据集反映主节点的数据
集。 如果主要人员不在，则符合条件的中学将举行选举以选出新的主要人员。

3. 主从复制和副本集区别

主从集群和副本集最大的区别就是副本集没有固定的“主节点”；整个集群会选出一个“主节点”，当其挂
掉后，又在剩下的从节点中选中其他节点为“主节点”，副本集总有一个活跃点(主、primary)和一个或多
个备份节点(从、secondary)。

## 副本集的三个角色

副本集有两种类型三种角色

两种类型：

+ 主节点（Primary）类型：数据操作的主要连接点，可读写。
+ 次要（辅助、从）节点（Secondaries）类型：数据冗余备份节点，可以读或选举。

三种角色：

主要成员（Primary）：主要接收所有写操作。就是主节点。

副本成员（Replicate）：从主节点通过复制操作以维护相同的数据集，即备份数据，不可写操作，但可
以读操作（但需要配置）。是默认的一种从节点类型。

仲裁者（Arbiter）：不保留任何数据的副本，只具有投票选举作用。当然也可以将仲裁服务器维护为副
本集的一部分，即副本成员同时也可以是仲裁者。也是一种从节点类型。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220627/image.4ff6racfmye0.webp)

关于仲裁者的额外说明：

您可以将额外的mongod实例添加到副本集作为仲裁者。 仲裁者不维护数据集。 仲裁者的目的是通过
响应其他副本集成员的心跳和选举请求来维护副本集中的仲裁。 因为它们不存储数据集，所以仲裁器可
以是提供副本集仲裁功能的好方法，其资源成本比具有数据集的全功能副本集成员更便宜。

如果您的副本集具有偶数个成员，请添加仲裁者以获得主要选举中的“大多数”投票。 仲裁者不需要专用
硬件。

仲裁者将永远是仲裁者，而主要人员可能会退出并成为次要人员，而次要人员可能成为选举期间的主要
人员。

如果你的副本+主节点的个数是偶数，建议加一个仲裁者，形成奇数，容易满足大多数的投票。

如果你的副本+主节点的个数是奇数，可以不加仲裁者。

##  副本集架构目标

一主一副本一仲裁

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220627/image.31yuyn1jm8g0.webp)

## 副本集的创建

### 第一步：创建主节点

建立存放数据和日志的目录

```sh
#-----------myrs
#主节点
mkdir -p /mongodb/replica_sets/myrs_27017/log \ &
mkdir -p /mongodb/replica_sets/myrs_27017/data/db
```

新建或修改配置文件

```sh
vim /mongodb/replica_sets/myrs_27017/mongod.conf
```

myrs_27017：

```yaml
systemLog:
  #MongoDB发送所有日志输出的目标指定为文件
  destination: file
  #mongod或mongos应向其发送所有诊断日志记录信息的日志文件的路径
  path: "/mongodb/replica_sets/myrs_27017/log/mongod.log"
  #当mongos或mongod实例重新启动时，mongos或mongod会将新条目附加到现有日志文件的末尾。
  logAppend: true
storage:
  #mongod实例存储其数据的目录。storage.dbPath设置仅适用于mongod。
  dbPath: "/mongodb/replica_sets/myrs_27017/data/db"
  journal:
    #启用或禁用持久性日志以确保数据文件保持有效和可恢复。
    enabled: true
processManagement:
  #启用在后台运行mongos或mongod进程的守护进程模式。
  fork: true
  #指定用于保存mongos或mongod进程的进程ID的文件位置，其中mongos或mongod将写入其PID
  pidFilePath: "/mongodb/replica_sets/myrs_27017/log/mongod.pid"
net:
  #服务实例绑定所有IP，有副作用，副本集初始化的时候，节点名字会自动设置为本地域名，而不是ip
  #bindIpAll: true
  #服务实例绑定的IP
  bindIp: localhost,192.168.72.2
  #bindIp
  #绑定的端口
  port: 27017
replication:
  #副本集的名称
  replSetName: myrs
```

启动节点服务：

```sh
[root@master ~]#  /usr/local/mongodb/bin/mongod -f /mongodb/replica_sets/myrs_27017/mongod.conf
about to fork child process, waiting until server is ready for connections.
forked process: 2038
child process started successfully, parent exiting
```

### 第二步：创建副本节点

建立存放数据和日志的目录

```sh
#-----------myrs
#副本节点
mkdir -p /mongodb/replica_sets/myrs_27018/log \ &
mkdir -p /mongodb/replica_sets/myrs_27018/data/db
```

新建或修改配置文件：

```sh
mkdir /mongodb/replica_sets/myrs_27018/
cd /mongodb/replica_sets/myrs_27017/
cp mongod.conf /mongodb/replica_sets/myrs_27018/mongod.conf
```

myrs_27018：

把myrs_27017中的端口号改为27018即可

```sh
:% s/27017/27018/g
```

启动节点服务：

```sh
[root@master mongodb]#  /usr/local/mongodb/bin/mongod -f /mongodb/replica_sets/myrs_27018/mongod.conf
about to fork child process, waiting until server is ready for connections.
forked process: 2217
child process started successfully, parent exiting
```

### 第三步：创建仲裁节点

建立存放数据和日志的目录

```sh
#-----------myrs
#仲裁节点
mkdir -p /mongodb/replica_sets/myrs_27019/log \ &
mkdir -p /mongodb/replica_sets/myrs_27019/data/db
```

仲裁节点：

新建或修改配置文件：

```sh
mkdir /mongodb/replica_sets/myrs_27019/
cd /mongodb/replica_sets/myrs_27017/
cp mongod.conf /mongodb/replica_sets/myrs_27019/mongod.conf
```

myrs_27019：

把myrs_27017中的端口号改为27019即可

```sh
:% s/27017/27019/g
```

启动节点服务：

```sh
[root@master myrs_27019]#  /usr/local/mongodb/bin/mongod -f /mongodb/replica_sets/myrs_27019/mongod.conf
about to fork child process, waiting until server is ready for connections.
forked process: 2342
child process started successfully, parent exiting
```

+ 使用命令行查看mongo服务

```sh
[root@master myrs_27019]# ps -ef | grep mongo
root       2038      1  0 20:25 ?        00:00:04 /usr/local/mongodb/bin/mongod -f /mongodb/replica_sets/myrs_27017/mongod.conf
root       2217      1  0 20:37 ?        00:00:01 /usr/local/mongodb/bin/mongod -f /mongodb/replica_sets/myrs_27018/mongod.conf
root       2342      1  0 20:43 ?        00:00:00 /usr/local/mongodb/bin/mongod -f /mongodb/replica_sets/myrs_27019/mongod.conf
root       2388   1880  0 20:45 pts/0    00:00:00 grep --color=auto mongo

```

### 第四步：初始化配置副本集和主节点

使用客户端命令连接任意一个节点，但这里尽量要连接主节点(27017节点)：

```shell
/usr/local/mongodb/bin/mongo --host=192.168.72.200 --port=27017
```

结果，连接上之后，很多命令无法使用，，比如 show dbs 等，必须初始化副本集才行

准备初始化新的副本集：

语法：

```sh
rs.initiate(configuration)
```

选项:

| Parameter       | Type     | Description                                                  |
| --------------- | -------- | ------------------------------------------------------------ |
| `configuration` | document | Optional. A document that specifies configuration for the new replica set. If a configuration is not specified,MongoDB uses a default replica set configuration. |

【示例】

使用默认的配置来初始化副本集：

```sh
rs.initiate()
```

执行结果：

```sh
> rs.initiate()
{
        "info2" : "no configuration specified. Using a default configuration for the set",
        "me" : "localhost:27019",
        "ok" : 1,
        "operationTime" : Timestamp(1656343919, 1),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1656343919, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        }
}
myrs:OTHER>
myrs:PRIMARY>
```

> 提示：
>
> 1. “ok”的值为1，说明创建成功。
> 2. 命令行提示符发生变化，变成了一个从节点角色，此时默认不能读写。稍等片刻，回车，变成主节
>    点。

### 第五步：查看副本集的配置内容

说明：

返回包含当前副本集配置的文档。

语法：

```sh
rs.conf(configuration)
```

> 提示：
>
> rs.config() 是该方法的别名。
>
> configuration：可选，如果没有配置，则使用默认主节点配置。

【示例】

在27017上执行副本集中当前节点的默认节点配置

```sh
myrs:PRIMARY> rs.conf()
{
        "_id" : "myrs",
        "version" : 1,
        "protocolVersion" : NumberLong(1),
        "writeConcernMajorityJournalDefault" : true,
        "members" : [
                {
                        "_id" : 0,
                        "host" : "localhost:27019",
                        "arbiterOnly" : false,
                        "buildIndexes" : true,
                        "hidden" : false,
                        "priority" : 1,
                        "tags" : {

                        },
                        "slaveDelay" : NumberLong(0),
                        "votes" : 1
                }
        ],
        "settings" : {
                "chainingAllowed" : true,
                "heartbeatIntervalMillis" : 2000,
                "heartbeatTimeoutSecs" : 10,
                "electionTimeoutMillis" : 10000,
                "catchUpTimeoutMillis" : -1,
                "catchUpTakeoverDelayMillis" : 30000,
                "getLastErrorModes" : {

                },
                "getLastErrorDefaults" : {
                        "w" : 1,
                        "wtimeout" : 0
                },
                "replicaSetId" : ObjectId("62b9cd6f2c5c46b2620c8b1b")
        }
}
```

- `"_id" : "myrs"` ：副本集的配置数据存储的主键值，默认就是**副本集**的名字
- `"members"` ：副本集成员数组，此时只有一个： `"host" : "180.76.159.126:27017"` ，该成员不是仲裁节点： `"arbiterOnly" : false` ，优先级（权重值）： `"priority" : 1`
- `"settings"` ：副本集的参数配置。

> 提示：副本集配置的查看命令，本质是查询的是 system.replset 的表中的数据：

```sh
myrs:PRIMARY> use local
switched to db local
myrs:PRIMARY> show collections
oplog.rs
replset.election
replset.minvalid
replset.oplogTruncateAfterPoint
startup_log
system.replset
system.rollback.id
myrs:PRIMARY> db.system.replset.find()
{ "_id" : "myrs", "version" : 1, "protocolVersion" : NumberLong(1), "writeConcernMajorityJournalDefault" : true, "members" : [ { "_id" : 0, "host" : "localhost:27019", "arbiterOnly" : false, "buildIndexes" : true, "hidden" : false, "priority" : 1, "tags" : {  }, "slaveDelay" : NumberLong(0), "votes" : 1 } ], "settings" : { "chainingAllowed" : true, "heartbeatIntervalMillis" : 2000, "heartbeatTimeoutSecs" : 10, "electionTimeoutMillis" : 10000, "catchUpTimeoutMillis" : -1, "catchUpTakeoverDelayMillis" : 30000, "getLastErrorModes" : {  }, "getLastErrorDefaults" : { "w" : 1, "wtimeout" : 0 }, "replicaSetId" : ObjectId("62b9cd6f2c5c46b2620c8b1b") } }
```

### 第六步：查看副本集状态

返回包含状态信息的文档。此输出使用从副本集的其他成员发送的心跳包中获得的数据反映副本集的当 前状态

```sh
rs.status()
```

【示例】

在27017上查看副本集状态：

```sh
myrs:PRIMARY> rs.status()
{
        "set" : "myrs",
        "date" : ISODate("2022-06-27T15:37:26.398Z"),
        "myState" : 1,
        "term" : NumberLong(1),
        "syncingTo" : "",
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "heartbeatIntervalMillis" : NumberLong(2000),
        "optimes" : {
                "lastCommittedOpTime" : {
                        "ts" : Timestamp(1656344241, 1),
                        "t" : NumberLong(1)
                },
                "readConcernMajorityOpTime" : {
                        "ts" : Timestamp(1656344241, 1),
                        "t" : NumberLong(1)
                },
                "appliedOpTime" : {
                        "ts" : Timestamp(1656344241, 1),
                        "t" : NumberLong(1)
                },
                "durableOpTime" : {
                        "ts" : Timestamp(1656344241, 1),
                        "t" : NumberLong(1)
                }
        },
        "lastStableCheckpointTimestamp" : Timestamp(1656344211, 1),
        "members" : [
                {
                        "_id" : 0,
                        "name" : "localhost:27019",
                        "health" : 1,
                        "state" : 1,
                        "stateStr" : "PRIMARY",
                        "uptime" : 566,
                        "optime" : {
                                "ts" : Timestamp(1656344241, 1),
                                "t" : NumberLong(1)
                        },
                        "optimeDate" : ISODate("2022-06-27T15:37:21Z"),
                        "syncingTo" : "",
                        "syncSourceHost" : "",
                        "syncSourceId" : -1,
                        "infoMessage" : "",
                        "electionTime" : Timestamp(1656343919, 2),
                        "electionDate" : ISODate("2022-06-27T15:31:59Z"),
                        "configVersion" : 1,
                        "self" : true,
                        "lastHeartbeatMessage" : ""
                }
        ],
        "ok" : 1,
        "operationTime" : Timestamp(1656344241, 1),
        "$clusterTime" : {
                "clusterTime" : Timestamp(1656344241, 1),
                "signature" : {
                        "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                        "keyId" : NumberLong(0)
                }
        }
}
```

> 说明：
>
> 1. "set" :  "myrs" ：副本集的名字
> 2.  "myState" : 1：说明状态正常
> 3.  "members" ：副本集成员数组，此时只有一个： "name" : "180.76.159.126:27017" ，该成员的角色是 "stateStr" : "PRIMARY", 该节点是健康的： "health" : 1 。

### 添加副本节点

在主节点添加从节点，将其他成员加入到副本集

```sh
rs.add(host, arbiterOnly)
```

选项:

| Parameter   | Type               | Description                                                  |
| ----------- | ------------------ | ------------------------------------------------------------ |
| host        | string or document | 要添加到副本集的新成员。指定为字符串或配置文档：1）如果是一个字符串，则需要指定新成员的主机名和可选的端口号；2）如果是一个文档，请指定在members数组中找到的副本集成员配置文档。您必须在成员配置文档中指定主机字段。有关文档配置字段的说明，详见下方文档："主机成员的配置文档" |
| arbiterOnly | boolean            | 可选的。仅在值为字符串时适用。如果为true，则添加的主机是仲裁者。 |

主机成员的配置文档：

```sh
{
  _id:<int>,
  host:<string>,
  arbiterOnly:<boolean>,
  buildIndexes:<boolean>,
  hidden:<boolean>,
  priority:<number>,
  tags:<document>,
  slaveDelay:<int>,
  votes:<number>
}
```

示例：

将27018的副本节点加添加到副本集汇总：

```sh
rs.add("localhost:27018")
```

### 添加仲裁从节点

```sh
rs.add(host,arbiterOnly)
或
rs.addArb(host)

例子：
rs.addArb("localhost:27019")
```

## 副本集的数据读写操作

副本节点 (SECONDARY) 默认不能 read , 更不可能 write 数据, 需要

```sh
rs.slaveOk()
```

```sh
myrs:SECONDARY> show dbs; 

"errmsg" : "not master and slaveOk=false",

# 非主节点同时 slaveOk=false 无法读写
```

数据会自动同步, 但是会有延迟

仲裁者节点, 不存放任何数据 -> `rs.slaveOk()` 也看不到数据

## 主节点的选举原则

MongoDB在副本集中，会自动进行主节点的选举，主节点选举的触发条件

1. 主节点故障
2. 主节点网络不可达 (默认心跳信息为 10 秒)
3. 人工干预 `rs.stepDown(600)`

一旦触发选举，就要根据一定规则来选主节点

选举规则是根据票数来决定谁获胜

- 票数最高，且获得了“大多数”成员的投票支持的节点获胜。
  - “大多数”的定义为：假设复制集内投票成员数量为N，则大多数为 N/2 + 1。例如：3个投票成员， 则大多数的值是2。当复制集内存活成员数量不足大多数时，整个复制集将无法选举出Primary， 复制集将无法提供写服务，处于只读状态。
- 若票数相同，且都获得了“大多数”成员的投票支持的，数据新的节点获胜。
  - 数据的新旧是通过操作日志 oplog 来对比的。

在获得票数的时候，优先级（priority）参数影响重大。

可以通过设置优先级（priority）来设置额外票数。优先级即权重，取值为0-1000，相当于可额外增加 0-1000的票数，优先级的值越大，就越可能获得多数成员的投票（votes）数。指定较高的值可使成员 更有资格成为主要成员，更低的值可使成员更不符合条件。

默认情况下，优先级的值是 1

## 故障测试

###  副本节点故障测试

关闭 `27018` 副本节点

- 主节点和仲裁节点对 `27018` 的心跳失败。因为主节点还在，因此，没有触发投票选举。
- 如果此时，在主节点写入数据。再启动从节点，会发现，**主节点写入的数据**，**会自动同步给从节点**。

#### 主节点故障测试

关闭27017节点

- 从节点和仲裁节点对27017的心跳失败，当失败超过10秒，此时因为没有主节点了，会自动发起投票。
- 而副本节点只有27018，因此，候选人只有一个就是27018，开始投票。
- 27019向27018投了一票，27018本身自带一票，因此共两票，超过了“大多数”
- 27019是仲裁节点，没有选举权，27018不向其投票，其票数是0.

最终结果，27018成为主节点。具备读写功能。 在27018写入数据查看。

#### 仲裁节点和主节点故障

先关掉仲裁节点27019， 关掉现在的主节点27018 登录27017后

- 27017仍然是从节点，副本集中没有主节点了，导致此时，副本集是只读状态， 无法写入。
- 为啥不选举了？
  - 因为27017的票数，没有获得大多数，即没有大于等于2，它只有默认的一票（优先级 是1）
  - 如果要触发选举，随便加入一个成员即可。
    - 如果只加入27019仲裁节点成员，则主节点一定是27017，因为没得选了，仲裁节点不参与选举， 但参与投票
    - 如果只加入27018节点，会发起选举。因为27017和27018都是两票，则按照谁数据新，谁当主节点。

#### 仲裁节点和从节点故障

先关掉仲裁节点 `27019`，关掉现在的副本节点 `27018`

10秒后，`27017` 主节点自动降级为副本节点。（服务降级）

副本集不可写数据了，已经故障了。

## SpringDataMongoDB连接副本集

副本集语法：

```sh
mongodb://host1,host2,host3/articledb?connect=replicaSet&slaveOk=true&replicaSet=副本集名字
```

其中：

- slaveOk=true：开启副本节点读的功能，可实现读写分离。
- connect=replicaSet：自动到副本集中选择读写的主机。如果slaveOk是打开的，则实现读写分离。

示例：

连接replica set三台服务器（端口27017，27018，27019），直接连接第一个服务器，无论是replica set一部分或者主服务器或者从服务器，写入操作应用在主服务器并且分布查询到从服务器。

修改配置文件application.yml

```yaml
spring: 
	#数据源配置
	data:
		mongodb: 
			#主机地址
			#host: localhost
			#数据库
			#database: test
			#默认端口号是27017
			#port: 27017
			#也可以使用uri连接
			uri: mongodb://localhost:27017,localhost:27018,localhost:27019/test?connect=replicaSet&slaveOk=true&replicaSet=myrs
```

