---
title: Redis 持久化操作
date: 2022-06-18 22:22:18
permalink: /database/Reids/Redis_Persistence
categories:
  - Redis
tags:
  - Redis
---
# Redis 持久化操作

[[toc]]

## 持久化之RDB

Redis 提供了 2 个不同形式的持久化方式

- RDB（Redis DataBase）
- AOF（Append Of File）

### 什么是RDB

在指定的`时间间隔`内将内存中的数据集`快照`写入磁盘， 也就是行话讲的 Snapshot 快照，它恢复时是将快照文件直接读到内存里。

### 备份是如何执行的

Redis 会单独创建（fork）一个子进程来进行持久化，会先将数据写入到一个临时文件 中，待持久化过程都结束了，再用这个临时文件替换上次持久化好的文件。整个过程中，主进程是不进行任何 IO 操作的，这就确保了极高的性能 如果需要进行大规模数据的恢复，且对于数据恢复的完整性不是非常敏感，那 RDB 方式要比 AOF 方式更加的高效。

RDB 的缺点 **是最后一次持久化后的数据可能丢失**。

###  Fork

Fork 的作用是复制一个与当前进程一样的进程。新进程的所有数据（变量、环境变量、程序计数器等）数值都和原进程一致，但是是一个全新的进程，并作为原进程的子进程 。

在 Linux 程序中，fork() 会产生一个和父进程完全相同的子进程，但子进程在此后多会 exec 系统调用，出于效率考虑，Linux 中引入了「写时复制技术」。

一般情况父进程和子进程会共用同一段物理内存，只有进程空间的各段的内容要发生变化时，才会将父进程的内容复制一份给子进程

###  RDB持久化流程

流程图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.kgx5hx0cyv4.webp)

**文件名**

redis.conf 中默认的 RDB 配置文件名为 dump.rdb，可以修改文件名，但是一般默认就可以了,这个文件会放在redis启动目录中

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.3wieo8h4esc0.webp)

**文件路径**

rdb 文件的保存路径，也可以修改。默认为 Redis 启动时命令行所在的目录下

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.7dryktwh2e00.webp)

**备份策略**

RDB 是整个内存的压缩过的 Snapshot，RDB 的数据结构，可以配置复合的快照触发条件，默认：

- 如果 1 个 key 发生改变（新增，删除，修改），则 1 个小时后备份一次
- 如果 100 个 key 发生改变（新增，删除，修改），则 5 分钟后备份一次
- 如果 10000 个 key 发生改变（新增，删除，修改），则 1 分钟后备份一次

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.qw7nuxyozls.webp)

格式：

```shell
save <秒钟> <写操作次数>
```

> **手动保存**

我们可以使用两个命令手动备份，分别是 `save` 和 `bgsave`。前提是需要连接上 Redis 服务

- save：save 时只管保存，其它不管，全部阻塞。手动保存。**不建议**
- bgsave：Redis 会在后台异步进行快照操作，快照同时还可以响应客户端请求。**推荐**

进入 Redis 客户端后，可以通过 lastsave 命令获取最后一次成功执行快照的时间。

**其他优化命令**

执行 flushall 命令，也会产生 dump.rdb 文件，但里面是空的，无意义。

Stop-writes-on-bgsave-error：如果配置为 no，表示你不在乎数据不一致或者有其他的手段发现和控制，默认为 yes。

rbdcompression：压缩文件。对于存储到磁盘中的快照，可以设置是否进行压缩存储。如果是的话，Redis 会采用 LZF 算法进行压缩，如果你不想消耗 CPU 来进行压缩的话，可以设置为关闭此功能。

rdbchecksum：检查完整性。在存储快照后，还可以让 Redis 使用 CRC64 算法来进行数据校验，但是这样做会增加大约 10% 的性能消耗，如果希望获取到最大的性能提升，可以关闭此功能。默认为 yes。

###  RDB禁用

如果想禁用 RDB 持久化的策略，有两种方式：

配置文件禁用：只要在配置文件不设置任何 save 指令，或者给 save 传入一个空字符串参数也可以。

命令禁用：连接上 Redis 服务，执行如下命令禁用：

```sh
redis-cli config set save ""    # save 后给空值，表示禁用保存策略
```

### RDB备份

先通过 `config get dir` 查询 rdb 文件的目录，然后将 .rdb 文件拷贝到别的地方

```sh
127.0.0.1:6379> config get dir
dir
# 文件所在的目录
/usr/local/bin

cp /usr/local/bin/dump.rdb /opt
```

### RDB恢复

- 关闭 Redis 服务
- 把备份的文件拷贝到 Redis 工作 / 安装目录下

```shell
cp /opt/dump.rdb /usr/local/bin/dump.rdb
```

- 重新启动 Redis，备份数据会直接加载

### RDB优缺点

优点：

- 适合大规模的数据恢复
- 对数据完整性和一致性要求不高更适合使用
- 节省磁盘空间
- 恢复速度快

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.64pgxyxrcas0.webp)

缺点：

- Fork 的时候，内存中的数据被克隆了一份，大致 2 倍的膨胀性需要考虑
- 虽然 Redis 在 fork 时使用了写时拷贝技术,但是如果数据庞大时还是比较消 耗性能
- 在备份周期在一定间隔时间做一次备份，所以如果 Redis 意外 down 掉的话， 就会丢失最后一次快照后的所有修改

## 持久化之AOF

### 什么是AOF

以日志的形式来记录每个写操作（增量保存），将 Redis 执行过的所有写指令记录下来(读操作不记录)，只许追加文件但不可以改写文件，Redis 启动之初会读取该文件重新构建数据，换言之，redis 重启的话就根据日志文件的内容将写指令从前到后执行一次以完成数据的恢复工作。

###  AOF持久化流程

（1）客户端的请求写命令会被 append 追加到 AOF 缓冲区内；

（2）AOF 缓冲区根据 AOF 持久化策略[always,everysec,no]将操作 sync 同步到磁盘的 AOF 文件中；

（3）AOF 文件大小超过重写策略或手动重写时，会对 AOF 文件 rewrite 重写，压缩 AOF 文件容量；

（4）Redis 服务重启时，会重新 load 加载 AOF 文件中的写操作达到数据恢复的目的；

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.7dtmu6toxa80.webp)

### AOF开启

首先要知道 AOF 的默认配置文件名叫 appendonly.aof，如果想修改配置名，那么在 redis.conf 中配置文件里修改。

AOF **默认不开启**，如果想开启，在 redis.conf 中配置文件里，将 `appendonly no` 改为 `appendonly yes`。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.7ig8h7innrk0.webp)

AOF 文件默认的保存路径，同 RDB 的路径一致，如果修改，可以在配置文件修改。

> **AOF 和 RDB 同时开启，redis 听谁的？**

AOF 和 RDB 同时开启，系统默认取 AOF 的数据（数据不会存在丢失）

> **AOF 同步频率设置**

AOF 同步频率设置只能三选一：

appendfsync always：始终同步，每次 Redis 的写入都会立刻记入日志；性能较差但数据完整性比较好

appendfsync everysec： 每秒同步，每秒记入日志一次，如果宕机，本秒的数据可能丢失。

appendfsync no ：redis 不主动进行同步，把同步时机交给操作系统。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.1r1exeuk52qo.webp)

> **AOF 启动/修复/恢复**

AOF 的备份机制和性能虽然和 RDB 不同，但是备份和恢复的操作同 RDB 一样，都是拷贝备份文件，需要恢复时再拷贝到 Redis 工作目录下，启动系统即加载。

正常恢复

- 修改默认的 appendonly no，改为 yes
- 将有数据的 aof 文件复制一份保存到对应目录(查看目录：config get dir)
- 恢复：重启 redis 然后重新加载

异常恢复

- 修改默认的 appendonly no，改为 yes
- 如遇到 AOF 文件损坏，通过/usr/local/bin/redis-check-aof--fix appendonly.aof 进行恢复
- 备份被写坏的 AOF 文件
- 恢复：重启 redis，然后重新加载

### Rewrite重写

AOF 采用文件追加方式，文件会越来越大为避免出现此种情况，新增了重写机制，当 AOF 文件的大小超过所设定的阈值时，Redis 就会启动 AOF 文件的内容压缩，只保留可以恢复数据的最小指令集，可以使用命令 `bgrewriteaof`。

> **重写原理，如何实现重写？**

AOF 文件持续增长而过大时，会 fork 出一条新进程来将文件重写(也是先写临时文件最后再 rename)，redis4.0 版本后的重写，是指上就是把 rdb 的快照，以二级制的形式附在新的 aof 头部，作为已有的历史数据，替换掉原来的流水账操作。

需要用到新的指令 `no-appendfsync-on-rewrite：`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.4mczo73f8tq0.webp)

如果 `no-appendfsync-on-rewrite` 改为 yes，代表不写入 AOF 文件，只写入缓存，用户请求不会阻塞，但是在这段时间如果宕机会丢失这段时间的缓存数据。（降低数据安全性，提高 性能）

如果 `no-appendfsync-on-rewrite` 改为 no，还是会把数据往磁盘里刷，但是遇到重写操作，可能会发生阻塞。（数据安全，但是性能降低）

> **触发机制，何时重写？**

Redis 会记录上次重写时的 AOF 大小，默认配置是当 AOF 文件大小是上次 rewrite 后大小的一倍且文件大于 64M 时触发。

重写虽然可以节约大量磁盘空间，减少恢复时间。但是每次重写还是有一定的负担的，因此设定 Redis 要满足一定条件才会进行重写。

触发条件需要用到 `auto-aof-rewrite-percentage` 和 `auto-aof-rewrite-min-size` 指令：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.cstsvqyigo8.webp)

- `auto-aof-rewrite-percentage`：设置重写的基准值，文件达到 100% 时开始重写（文件是原来重写后文件的 2 倍时触发）
- `auto-aof-rewrite-min-size`：设置重写的基准值，最小文件 64MB。达到这个值开始重写

例如：文件达到 64MB 开始重写，降到 50MB，下次什么时候开始重写？100MB，因为重写大小后的两倍 = 50 * 2

系统载入时或者上次重写完毕时，Redis 会记录此时 AOF 大小，设为 base_size，如果 Redis 的 AOF 当前大小 >= `base_size + base_size * 100%`(默认)且当前大小 >= 64mb(默认)的情况下，Redis 会对 AOF 进行重写。

> **重写流程**

- bgrewriteaof 触发重写，判断是否当前有 bgsave 或 bgrewriteaof 在运行，如果有，则等待该命令结束后再继续执行
- 主进程 fork 出子进程执行重写操作，保证主进程不会阻塞
- 子进程遍历 redis 内存中数据到临时文件，客户端的写请求同时写入 `aof_buf` 缓冲区和 `aof_rewrite_buf` 重写缓冲区保证原 AOF 文件完整以及新 AOF 文件生成期间的 新的数据修改动作不会丢失
- 子进程写完新的 AOF 文件后，向主进程发信号，父进程更新统计信息
- 主进程把 `aof_rewrite_buf` 中的数据写入到新的 AOF 文件。
- 使用新的 AOF 文件覆盖旧的 AOF 文件，完成 AOF 重写

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.4lqce1ojkae0.webp)

### RDB优缺点

优点：

- 备份机制更稳健，丢失数据概率更低
- 可读的日志文本，通过操作 AOF 稳健，可以处理误操作

缺点：

- 比起 RDB 占用更多的磁盘空间
- 恢复备份速度要慢
- 每次读写都同步的话，有一定的性能压力
- 存在个别 Bug，造成恢复不能

## 两者总结

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220618/image.bgdt2y98ndc.webp)

### 用哪个好

官方推荐两个都启用。

如果对数据不敏感，可以选单独用 RDB。

不建议单独用 AOF，因为可能会出现 Bug。

如果只是做纯内存缓存，可以都不用。

### 总结

- RDB 持久化方式能够在指定的时间间隔内对你的数据进行快照存储
- AOF 持久化方式记录每次对服务器写的操作，当服务器重启的时候会重新执行这些命令来恢复原始的数据，AOF 命令以 Redis 协议追加保存每次写的操作到文件末尾
- Redis 还能对 AOF 文件进行后台重写，使得 AOF 文件的体积不至于过大
- 只做缓存，如果你只希望你的数据在服务器运行的时候存在，你也可以不使用任何持久化
- 同时开启两种持久化方式
  - 在这种情况下，当 Redis 重启的时候会优先载入 AOF 文件来恢复原始的数据，因为在通常情况下 AOF 文件保存的数据集要比 RDB 文件保存的数据集要完整
  - RDB 的数据不实时，同时使用两者时服务器重启也只会找 AOF 文件，那要不要只使用 AOF 呢？建议不要，因为 RDB 更适合用于备份数据库（AOF 在不断变化不好备份），快速重启，而且不会有 AOF 可能潜在的 Bug，留着作为一个万一的手段
- 性能建议
  - 因为 RDB 文件只用作后备用途，建议只在 Slave 上持久化 RDB 文件，而且只要 15 分钟备份一次就够 了，只保留 `save 900 1` 这条规则。
  - 如果使用 AOF ，好处是在最恶劣情况下也只会丢失不超过两秒数据，启动脚本较简单只 load 自己的 AOF 文件就可以了，代价：
    - 一是带来了持续的 IO
    - 二是 AOF rewrite 的最后将 rewrite 过程中产生的新数据写到新文件造成的阻塞几乎是不可避免的
  - 只要硬盘许可，应该尽量减少 AOF rewrite 的频率，AOF 重写的基础大小默认值 64M 太小了，可以设到 5G 以上，默认超过原大小 100% 大小重 写可以改到适当的数值
  - 如果不使用 AOF ，仅靠 `Master-Slave Repllcation` 实现高可用性也可以，能省掉一大笔 IO，也 减少了 rewrite 时带来的系统波动。代价是如果 Master/Slave 同时倒掉，会丢失十几分钟的数据， 启动脚本也要比较两个 Master/Slave 中的 RDB 文件，载入较新的那个，微博就是这种架构

