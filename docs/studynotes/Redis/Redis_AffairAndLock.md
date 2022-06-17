---
title: Redis 事务与锁
date: 2022-06-17 17:08:22
permalink: /pages/8154b5/
categories:
  - Redis
tags:
  - Redis
---
# Redis 事务与锁

[[toc]]

## 事务

### 介绍

Redis 事务是一个单独的隔离操作：事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断。

Redis 事务的本质是一组命令的集合。事务支持一次执行多个命令，一个事务中所有命令都会被序列化。在事务执行过程，会按照顺序串行化执行队列中的命令，其他客户端提交的命令请求不会插入到事务执行命令序列中。

Redis 事务的主要作用就是 **串联多个命令** 防止别的命令插队。

+ Redis 事务没有隔离级别的概念
+ Redis 不保证原子性
+ Redis事务的三个阶段
  - 开始事务
  - 命令入队
  - 执行事务

### 三大特性

- 单独的隔离操作

  事务中的所有命令都会序列化、按顺序地执行。事务在执行的过程中，不会被其他客户端发送来的命令请求所打断

- 没有隔离级别的概念

  队列中的命令没有提交之前都不会实际被执行，因为事务提交前任何指令都不会被实际执行

- 不保证原子性

  中如果有一条命令执行失败，其后的命令仍然会被执行，没有回滚

### 三大指令

开始事务指定

```shell
multi
```

执行事务指定

```shell
exec
```

在执行事务前(exec)，结束事务指令（理解为手动回滚）

```shell
discard
```

> - 从输入 Multi 命令开始，输入的命令都会依次进入命令队列中，但不会执行，直到输入完成
> - Exec 后，Redis 会将之前的命令队列中的命令依次执行。
> - 组队的过程中可以通过 discard 来放弃组队。

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220617/image.5c4bp1qu8z00.webp)

### 案例代码

```shell
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> set key1 value1
QUEUED
127.0.0.1:6379(TX)> set key2 value2
QUEUED
127.0.0.1:6379(TX)> exec
1) OK
2) OK
```

在没有 `exec` 之前，set 和 get 并没有立即执行，它们仅仅进入了命令队列，等待 `exec` 命令后再全部执行。

```shell
127.0.0.1:6379> multi 
OK
127.0.0.1:6379(TX)> set a1 v1
QUEUED
127.0.0.1:6379(TX)> discard
OK
127.0.0.1:6379> get a1
(nil)
```

使用了 `discard`，代表取消事务，则事务里的 `set a1 v1` 没有被执行。

### 错误处理

+ 组队中某个命令出现了报告错误(Multi 中)，执行时整个的所有队列都会被取消

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220617/image.70upunii4zs0.webp)

+ 如果执行阶段(exec)某个命令报出了错误，则只有报错的命令不会被执行，而其他的命令都会执行，不会回滚

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220617/image.3ry9ng5dc660.webp)

### 案例图

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220617/image.6c5ajedxo0g0.webp)

手动回滚

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220617/image.4h76tcpvthu0.webp)

若在事务队列中存在命令性错误（类似于 java 编译性错误），则执行 EXEC 命令时，所有命令都不会执行

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220617/image.6pmk6x7zju.webp)

若在事务队列中存在语法性错误（类似于 java 的 1/0 的运行时异常），则执行 EXEC 命令时，其他正确命令会被执行，错误命令抛出异常。

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220617/image.5f7ho05k7900.webp)

### 事务冲突的问题

想想一个场景：有很多人有你的账户，同时去参加双十一抢购

- 一个请求想给金额减 8000
- 一个请求想给金额减 5000
- 一个请求想给金额减 1000

结果如图：

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220617/image.43ckflvmbhe0.webp)

那么如何解决呢？我们需要利用 Redis 的锁机制。

## 锁

### 悲观锁

悲观锁(Pessimistic Lock)，顾名思义，就是很悲观，**认为这个世界是黑暗的**，每次去拿数据的时候都认为别人会修改，所以每次在拿数据的时候都会上锁，这样别人想拿这个数据就会 block 直到它拿到锁。传统的关系型数据库里边就用到了很多这种锁机制，比如行锁，表锁等，读锁，写锁等，都是在做操作之前先上锁。

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220617/image.75iw7f6y5os0.webp)

### 乐观锁

乐观锁(Optimistic Lock)，顾名思义，就是很乐观，**认为这个世界是光明的**，每次去拿数据的时候都认为别人不会修改，所以不会上锁，但是在更新的时候会判断一下在此期间别人有没有去更新这个数据，可以使用版本号等机制。乐观锁适用于多读的应用类型，这样可以提高吞吐量。Redis 就是利用这种 `check-and-set` 机制实现事务的。

**Redis 使用的是乐观锁。**

- 通过指令（可指定多个），开启乐观锁

```shell
watch key [key] ...
```

一旦 watch 某个 key，则会一直监视这个 key，如果 key 发生了变化，就返回提示。

作用：在执行 multi 之前，先执行 `watch key1 [key2]`，可以监视一个(或多个) key ，如果在事务 `exec` 执行之前`这个(或这些) key 被其他命令所改动，那么事务将被打断`。

使用场景：很多人同时对一个值进行操作，一旦这个值被修改，且被其他人监听，则其他人无法修改这个值

+ 测试

初始化信用卡可用余额

```shell
127.0.0.1:6379> set balance 100
OK
```

使用 watch 检测 balance，事务期间 balance 数据未变动，事务执行成功

```shell
#窗口一
127.0.0.1:6379> watch balance  #开启监视
OK
127.0.0.1:6379> multi	# 开启事务
OK
127.0.0.1:6379> incrby balance 10	#  +10
QUEUED
127.0.0.1:6379> exec	# 执行事务
1) (integer) 110
```

```shell
#窗口二
127.0.0.1:6379> watch balance   
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> incrby balance 20  # +20
QUEUED
127.0.0.1:6379(TX)> exec # 修改失败！因为被监视的 balance 值改变 变为了110
(nil)
```

+ 取消 WATCH 命令对所有 key 的监视

缺点：如果单纯使用 watch，可能导致 key 的值无法完全被修改。

场景：假设库存有 500 个商品，2000 个人进行秒杀购买(2000 个程序监听商品的 key)，假设 1999 人同时购买，其内部程序监听的商品数量为 500，最后一个人却已经购买成功，商品数量变为 499，则前面的事务被打断(监听的 500 数量)，导致 1999 人会购买失败，库存还有 499 个商品。

```shell
unwatch key [key] ...
```

```shell
#窗口一
127.0.0.1:6379> get balance 
(integer) 110
127.0.0.1:6379> set balance 1000
OK
```

```shell
#窗口二放弃事务监视 ,然后重来
127.0.0.1:6379> unwatch # 放弃监视，这是取消所有的监视
OK
127.0.0.1:6379> unwatch
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> incrby balance 20 # +20
QUEUED
127.0.0.1:6379(TX)> exec #成功
1) (integer) 1020
```

说明：

一但执行 exec 指令或 descard 指令，无论事务是否执行成功， watch 指令对变量的监控都将被取消。

故当事务执行失败后，需重新执行 watch 命令对变量进行监控，并开启新的事务进行操作。

## 指令总结

Redis 事务相关指令

| 序号 | 命令及描述          | 描述                                                         |
| :--- | :------------------ | ------------------------------------------------------------ |
| 1    | DISCARD             | 取消事务，放弃执行事务块内的所有命令                         |
| 2    | EXEC                | 执行所有事务块内的命令                                       |
| 3    | MULTI               | 标记一个事务块的开始                                         |
| 4    | UNWATCH             | 取消 WATCH 命令对所有 key 的监视                             |
| 5    | WATCH key [key ...] | 监视一个(或多个) key ，如果在事务执行之前这个(或这些) key 被其他命令所改动，那么事务将被打断。类似乐观锁 |