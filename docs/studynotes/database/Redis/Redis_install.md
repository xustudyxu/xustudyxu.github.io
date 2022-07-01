---
title: Redis 概述安装
date: 2022-06-10 20:39:01
permalink: /database/Reids/Redis_install
categories:
  - Redis
tags:
  - Redis
---
# Redis 概述安装

[[toc]]

+ Redis是一个`开源`的`key-value`存储系统。
+ 和Memcached类似，它支持存储的value类型相对更多，包括`string`(字符串)、`list`(链表)、`set`(集合)、`zset`(sorted set --有序集合)和`hash`（哈希类型）。
+ 这些数据类型都支持push/pop、add/remove及取交集并集和差集及更丰富的操作，而且这些操作都是`原子性`的。
+ 在此基础上，Redis支持各种不同方式的`排序`。
+ 与memcached一样，为了保证效率，数据都是`缓存在内存`中。
+   区别的是Redis会`周期性`的把更新的`数据写入磁盘`或者把修改操作写入追加的记录文件。
+  并且在此基础上实现了`master-slave(主从)`同步。

## 应用场景

### 配合关系型数据库做高速缓存

+ 高频次，热门访问的数据，降低数据库IO
+ 分布式架构，做session共享

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220610/image.vf65bnc1ctc.jpg)

### **多样的数据结构存储持久化数据**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220610/image.1i2uh69ynf9c.jpg)

## Redis 安装

+ [Redis官方网站](https://redis.io/)
+ [Redis中文官方网站](http://redis.cn/)

### 安装版本

for Linux(`redis-6.2.1.tar.gz`)

不用考虑在windows环境下对Redis的支持

### 安装步骤

+ 准备工作:下载安装最新版的gcc编译器

+ 使用XFTP工具将redis压缩包上传到Linux系统中

```shell
mkdir /opt/redis
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220610/image.3bkgvfqxogy0.jpg)

+ 安装C 语言的编译环境

```shell
yum install centos-release-scl scl-utils-build
```

```shell
yum install -y devtoolset-8-toolchain
```

```shell
scl enable devtoolset-8 bash
```

+ 测试gcc版本`gcc --version`

```shell {2}
[root@master redis]# gcc --version
gcc (GCC) 8.3.1 20190311 (Red Hat 8.3.1-3)
Copyright (C) 2018 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

+ 解压文件

```shell
cd /opt/redis
tar -zxvf redis-6.2.1.tar.gz
```

+ 解压完进入目录

```shell
[root@master redis]# cd redis-6.2.1/
[root@master redis-6.2.1]# ls
00-RELEASENOTES  CONDUCT       COPYING  INSTALL   MANIFESTO  redis.conf  runtest-cluster    runtest-sentinel  src    TLS.md
BUGS             CONTRIBUTING  deps     Makefile  README.md  runtest     runtest-moduleapi  sentinel.conf     tests  utils
```

+ 在redis-6.2.1目录下再次执行make命令

```shell {1}
[root@master redis-6.2.1]# make
cd src && make all
make[1]: 进入目录“/opt/redis/redis-6.2.1/src”
    CC Makefile.dep
rm -rf redis-server redis-sentinel redis-cli redis-benchmark redis-check-rdb redis-check-aof *.o *.gcda *.gcno *.gcov redis.info lcov-html Makefile.dep dict-benchmark
...
```

+ 执行make install

```shell {1}
[root@master redis-6.2.1]# make install
cd src && make install
make[1]: 进入目录“/opt/redis/redis-6.2.1/src”
    CC Makefile.dep

Hint: It's a good idea to run 'make test' ;)

    INSTALL install
    INSTALL install
    INSTALL install
make[1]: 离开目录“/opt/redis/redis-6.2.1/src”
```

+ 切换到/usr/local/bin，并查看

```shell {3}
[root@master redis-6.2.1]# cd /usr/local/bin
[root@master bin]# ls
redis-benchmark  redis-check-aof  redis-check-rdb  redis-cli  redis-sentinel  redis-server
```

### 后台启动(推荐)

+ 拷贝一份redis.conf到其它目录

```shell {1,2,5}
[root@master redis-6.2.1]# cd /opt/redis/redis-6.2.1/
[root@master redis-6.2.1]# ls
00-RELEASENOTES  CONDUCT       COPYING  INSTALL   MANIFESTO  redis.conf  runtest-cluster    runtest-sentinel  src    TLS.md
BUGS             CONTRIBUTING  deps     Makefile  README.md  runtest     runtest-moduleapi  sentinel.conf     tests  utils
[root@master redis-6.2.1]# cp redis.conf /etc/redis.conf
```

+ 修改etc目录下的redis.conff(247行)文件将里面的`daemonize no` 改成 `daemonize yes`，让服务在后台启动

```shell
[root@master redis-6.2.1]# cd /etc/
[root@master etc]# vim redis.conf
```

+ 切换到/usr/local/bin,使用启动命令`redis-server /etc/redis.conf`

```shell
[root@master etc]# cd /usr/local/bin/
[root@master bin]# redis-server /etc/redis.conf
```

+ 查看关于redis线程状态

```shell
[root@master bin]# ps -ef|grep redis
root       7174      1  0 11:30 ?        00:00:00 redis-server 127.0.0.1:6379
root       7191   2210  0 11:32 pts/0    00:00:00 grep --color=auto redis
```

#### 客户端访问redis

+ 使用命令`redis-cli`,使用`ping`查看链接状态

```shell
[root@master bin]# redis-cli
127.0.0.1:6379> ping
PONG
```

+ 关闭redis,使用命令`shutdown`

```shell
127.0.0.1:6379> shutdown
not connected>
```

> 多实例关闭，指定端口关闭：redis-cli -p 6379 shutdown
>
> 也可以通过杀进程关闭kill -9 进程号

### 前台启动

使用命令`redis-server`

```shell
[root@master bin]# redis-server
6970:C 10 Jun 2022 11:19:08.451 # oO0OoO0OoO0Oo Redis is starting oO0OoO0OoO0Oo
6970:C 10 Jun 2022 11:19:08.451 # Redis version=6.2.1, bits=64, commit=00000000, modified=0, pid=6970, just started
6970:C 10 Jun 2022 11:19:08.451 # Warning: no config file specified, using the default config. In order to specify a config file use redis-server /path/to/redis.conf
6970:M 10 Jun 2022 11:19:08.451 * Increased maximum number of open files to 10032 (it was originally set to 1024).
6970:M 10 Jun 2022 11:19:08.451 * monotonic clock: POSIX clock_gettime
                _._
           _.-``__ ''-._
      _.-``    `.  `_.  ''-._           Redis 6.2.1 (00000000/0) 64 bit
  .-`` .-```.  ```\/    _.,_ ''-._
 (    '      ,       .-`  | `,    )     Running in standalone mode
 |`-._`-...-` __...-.``-._|'` _.-'|     Port: 6379
 |    `-._   `._    /     _.-'    |     PID: 6970
  `-._    `-._  `-./  _.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |           http://redis.io
  `-._    `-._`-.__.-'_.-'    _.-'
 |`-._`-._    `-.__.-'    _.-'_.-'|
 |    `-._`-._        _.-'_.-'    |
  `-._    `-._`-.__.-'_.-'    _.-'
      `-._    `-.__.-'    _.-'
          `-._        _.-'
              `-.__.-'

6970:M 10 Jun 2022 11:19:08.452 # WARNING: The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.
6970:M 10 Jun 2022 11:19:08.452 # Server initialized
6970:M 10 Jun 2022 11:19:08.452 # WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.
6970:M 10 Jun 2022 11:19:08.452 * Ready to accept connections
```

> 这个窗口就不能再做其他操作了，不推荐

## **Redis介绍相关知识**

端口6379从何而来

Alessia  Merz

默认16个数据库，类似数组下标从0开始，初始`默认使用0号库`

使用命令 select   \<dbid> 来切换数据库。如: select 8

统一密码管理，所有库同样密码。

`dbsize`  查看当前数据库的key的数量

`flushdb` 清空当前库

`flushall` 通杀全部库

Redis是单线程+多路IO复用技术

多路复用是指使用一个线程来检查多个文件描述符（Socket）的就绪状态，比如调用select和poll函数，传入多个文件描述符，如果有一个文件描述符就绪，则返回，否则阻塞直到超时。得到就绪状态后进行真正的操作可以在同一个线程里执行，也可以启动线程执行（比如使用线程池）

`串行   vs   多线程+锁（memcached） vs   单线程+多路IO复用(Redis)`

（与Memcache三点不同: 支持多数据类型，支持持久化，单线程+多路IO复用）  

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220610/image.3aetgolac1s0.webp)