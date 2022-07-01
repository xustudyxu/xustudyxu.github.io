---
title: Redis 配置文件
date: 2022-06-13 23:07:34
permalink: /database/Reids/Redis_conf
categories:
  - Redis
tags:
  - Redis
---
# Redis 配置文件

[[toc]]

## 位置

Redis 的配置文件位于 Redis 安装目录下，文件名为 redis.conf。

```shell
config get * # 获取全部的配置
```

我们一般情况下，会单独拷贝出来一份进行操作。来保证初始文件的安全。

正如在 `安装 redis` 中的讲解中拷贝一份。

我的配置文件放在了/etc/redis.conf

## 单位

容量单位不区分大小写，但是容量大小 G 和 GB 有区别。

配置大小单位，开头定义了一些基本的度量单位，`只支持 bytes`，不支持 bit

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.2wldm940hu40.webp)

## include

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.62lr2dieq8g0.webp)

类似 jsp 中的 include，可以通过 includes 包含，redis.conf 可以作为总文件，可以包含其他文件，即**多实例的情况可以把公用的配置文件提取出来**。

## NETWORK网络配置

###  bind、protected-mode、Port

默认情况 `bind=127.0.0.1` 只能接受本机的访问请求，如果注释掉或不写的情况下，无限制接受任何 ip 地址的访问。

生产环境肯定要写你应用服务器的地址，服务器是需要远程访问的，所以需要将其注释掉。

如果开启了 `protected-mode`，那么在没有设定 bind ip 且没有设密码的情况下，Redis 只允许接受本机的响应。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.dj0oyoiz5lc.webp)

### tcp-backlog

设置 tcp 的 backlog。backlog 其实是一个连接队列，backlog 队列总和 = 未完成三次握手队列 + 已经完成三次握手队列。

在高并发环境下你需要一个高 backlog 值来避免慢客户端连接问题。

注意 Linux 内核会将这个值减小到 `/proc/sys/net/core/somaxconn` 的值（128），所以需要确认增大 `/proc/sys/net/core/somaxconn` 和 `/proc/sys/net/ipv4/tcp_max_syn_backlog（128）` 两个值来达到想要的效果。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.12g81csqei5c.webp)

### timeout

一个空闲的客户端维持多少秒会关闭，0 表示关闭该功能。即永不关闭。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.6glvy8su6hk0.webp)

### tcp-keepalive

对访问客户端的一种心跳检测，每个 n 秒检测一次。

单位为秒，如果设置为 0，则不会进行 Keepalive 检测，建议设置成 60。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.6smxk5voaeg0.webp)

## GENERAL通用

### daemonize

是否为后台进程，设置为 yes 为守护进程，后台启动。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.58cxq6t657g0.webp)

### pidfile

存放 pid 文件的位置，每个实例会产生一个不同的 pid 文件

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.4r8ts2i60ce.webp)

###  loglevel

指定日志记录级别，Redis 总共支持四个级别：debug、verbose、notice、warning，默认为 notice。

四个级别根据使用阶段来选择，生产环境选择 notice 或者 warning。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.5dr7ffokpp40.webp)

### logfile

日志文件名称

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.5rxjmoz5t5g0.webp)

### databases

设定库的数量 默认 16，默认数据库为 0，可以使用 `SELECT <dbid>`命令在连接上指定数据库 id。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.4yhdsttiv8k0.webp)

常用模板如下：

```shell
daemonize yes 		 # 默认情况下，Redis 不作为守护进程运行。需要开启的话，改为 yes

supervised no 		 # 可通过 upstart 和 systemd 管理 Redis 守护进程

loglevel notice 	 # 日志级别。可选项有：
					 # debug（记录大量日志信息，适用于开发、测试阶段）
					 # verbose（较多日志信息）
					 # notice（适量日志信息，使用于生产环境）
					 # warning（仅有部分重要、关键信息才会被记录）
logfile "" 			 # 日志文件的位置，当指定为空字符串时，为标准输出
databases 16 		 # 设置数据库的数目。默认的数据库是 DB 0
always-show-logo yes # 是否总是显示 logo
```

## SNAPSHOPTING持久化

由于 Redis 是基于内存的数据库，需要将数据由内存持久化到文件中。

持久化方式：

- RDB
- AOF

AOF 配置：

```shell
# 900秒（15分钟）内至少 1 个 key 值改变（则进行数据库保存--持久化）
save 900 1
# 300秒（5分钟）内至少 10 个 key 值改变（则进行数据库保存--持久化）
save 300 10
# 60秒（1分钟）内至少 10000 个 key 值改变（则进行数据库保存--持久化）
save 60 10000
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.1240hsnunjls.webp)

RDB 配置：（内容太长，以代码显示）

```shell
stop-writes-on-bgsave-error yes # 持久化出现错误后，是否依然进行继续进行工作

rdbcompression yes # 使用压缩 rdb 文件 yes：压缩，但是需要一些 cpu 的消耗。no：不压缩，需要更多的磁盘空间

rdbchecksum yes # 是否校验 rdb 文件，更有利于文件的容错性，但是在保存 rdb 文件的时候，会有大概 10% 的性能损耗

dbfilename dump.rdb # dbfilenamerdb 文件名称

dir ./ 	# dir 数据目录，数据库的写入会在这个目录。rdb、aof 文件也会写在这个目录
```

## REPLICATION主从复制

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.292e2mnfuyv4.webp)

简单认识，后面详细说。

## SECURITY安全

命令访问密码的查看，设置和取消，缺点：在命令中设置密码，只是临时的。重启 redis 服务器，密码就还原了。

```shell
# 启动redis
# 连接客户端

# 获得和设置密码
config get requirepass
config set requirepass "123456"

#测试ping，发现需要验证
127.0.0.1:6379> ping
NOAUTH Authentication required.
# 验证
127.0.0.1:6379> auth 123456
OK
127.0.0.1:6379> ping
PONG
```

或者在配置文件修改密码

```shell
requirepass "123456"
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.4f1aycqioec0.webp)

## 客户端连接相关

###  maxclients

设置 redis 同时可以与多少个客户端进行连接。

默认情况下为 10000 个客户端，如果达到了此限制，redis 则会拒绝新的连接请求，并且向这些连接请求方发出 `max number of clients reached` 以作回应。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.65bq1oeq7t80.webp)

###  maxmemory

建议必须设置，否则，将内存占满，造成服务器宕机，设置 redis 可以使用的内存量。一旦到达内存使用上限，redis 将会试图移除内部数据，移除规则可以通过 maxmemory-policy 来指定。

如果 redis 无法根据移除规则来移除内存中的数据，或者设置了「不允许移除」， 那么 redis 则会针对那些需要申请内存的指令返回错误信息，比如 SET、LPUSH 等。

但是对于无内存申请的指令，仍然会正常响应，比如 GET 等。如果你的 redis 是主 redis（说明你的 redis 有从 redis），那么在设置内存使用上限时，需要在系统中留出一些内存空间给同步队列缓存，只有在你设置的是「不移除」的情况下，才不用考虑这个因素。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.18vbghy9nohs.webp)

###  maxmemory-policy

`maxmemory-policy` 六种方式：

- volatile-lru：利用 LRU 算法移除设置过过期时间的 key
- allkeys-lru： 用 lru 算法删除 key
- volatile-random：随机删除即将过期 key
- allkeys-random：随机删除
- volatile-ttl：删除即将过期的
- noevictionx：不移除任何 key，只是返回一个写错误

redis 中的 **默认** 的过期策略是 `volatile-lru`。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.61m0c6j7l6g0.webp)

命令设置方式

```shell
config set maxmemory-policy volatile-lru 
```

配置文件设置

```shell
maxclients 10000  # 最大客户端数量
maxmemory <bytes> # 最大内存限制
maxmemory-policy noeviction # 内存达到限制值的处理策略
```

### maxmemory-samples

设置样本数量，LRU 算法和最小 TTL 算法都并非是精确的算法，而是估算值，所以你可以设置样本的大小，redis 默认会检查这么多个 key 并选择其中 LRU 的那个。

一般设置 3 到 7 的数字，数值越小样本越不准确，但性能消耗越小。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.4k9gvtjhemm0.webp)

## append only模式

AOF 相关部分

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.1n579oynzb28.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.4b9868dsuv20.webp)

```shell
appendfsync everysec 
# appendfsync aof 持久化策略的配置
# no 表示不执行 fsync，由操作系统保证数据同步到磁盘，速度最快。
# always表示每次写入都执行 fsync，以保证数据同步到磁盘。
# everysec表示每秒执行一次 fsync，可能会导致丢失这 1s数据。
```

