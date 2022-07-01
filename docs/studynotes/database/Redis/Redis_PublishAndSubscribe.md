---
title: Redis 发布和订阅
date: 2022-06-14 20:04:01
permalink: /database/Reids/Redis_PublishAndSubscribe
categories:
  - Redis
tags:
  - Redis
---
# Redis 发布和订阅

[[toc]]

## 什么是发布和订阅

Redis 发布订阅 (pub/sub) 是一种消息通信模式：发送者 (pub) 发送消息，订阅者 (sub) 接收消息。

Redis 客户端可以订阅任意数量的频道。

## 简介

订阅/发布消息图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220614/image.4sun96fpzk40.webp)

下图展示了频道 channel1 ， 以及订阅这个频道的三个客户端 —— client2 、 client5 和 client1 之间的关系:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220614/image.1t1hng9hujgg.webp)

当有新消息通过 PUBLISH 命令发送给频道 channel1 时， 这个消息就会被发送给订阅它的三个客户端：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220614/image.4v6xis5dem00.webp)

## 指令与描述

下表列出了 Redis 发布订阅常用命令：

| 序号 | 命令                                        | 描述                             |
| :--- | :------------------------------------------ | -------------------------------- |
| 1    | PSUBSCRIBE pattern [pattern ...]            | 订阅一个或多个符合给定模式的频道 |
| 2    | PUBSUB subcommand [argument [argument ...]] | 查看订阅与发布系统状态           |
| 3    | PUBLISH channel message                     | 将信息发送到指定的频道           |
| 4    | PUNSUBSCRIBE [pattern [pattern ...]]        | 退订所有给定模式的频道           |
| 5    | SUBSCRIBE channel [channel ...]             | 订阅给定的一个或多个频道的信息   |
| 6    | UNSUBSCRIBE [channel [channel ...]]         | 指退订给定的频道                 |

**大小写都可以。**

## 指令测试

以下实例演示了发布订阅是如何工作的。

我们先打开两个 redis-cli 客户端

在 **第一个 redis-cli 客户端**，创建订阅频道名为 redisChat，输入命令 `SUBSCRIBE channel1`

```shell
127.0.0.1:6379> subscribe channel1
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "channel1"
3) (integer) 1
```

在 **第二个客户端**，发布两次消息，订阅者就能接收到消息。

```shell
127.0.0.1:6379> publish channel1 hello
(integer) 1
```

第一个 redis-cli 客户端，即订阅者的客户端会显示如下消息：

```shell
1) "message"
2) "channel1"
3) "hello"
```

## 原理

Redis 是使用 C 实现的，通过分析 Redis 源码里的 pubsub.c 文件，了解发布和订阅机制的底层实现，来加深对 Redis 的理解。

Redis 通过 PUBLISH 、SUBSCRIBE 和 PSUBSCRIBE 等命令实现发布和订阅功能。

通过 SUBSCRIBE 命令订阅某频道后，redis-server 里维护了一个字典，字典的键就是一个个 channel ，而字典的值则是一个链表，链表中保存了所有订阅这个 channel 的客户端。SUBSCRIBE 命令的关键，就是将客户端添加到给定 channel 的订阅链表中。

通过 PUBLISH 命令向订阅者发送消息，redis-server 会使用给定的频道作为键，在它所维护的 channel 字典中查找记录了订阅这个频道的所有客户端的链表，遍历这个链表，将消息发布给所有订阅者。

Pub/Sub 从字面上理解就是发布（Publish）与订阅（Subscribe），在 Redis 中，你可以设定对某一个 key 值进行消息发布及消息订阅，当一个 key 值上进行了消息发布后，所有订阅它的客户端都会收到相应的消息。这一功能最明显的用法就是用作实时消息系统，比如普通的即时聊天，群聊等功能。

使用场景：Redis 的 Pub/Sub 系统可以构建实时的消息系统，比如很多用 Pub/Sub 构建的实时聊天系统的例子。

**注意：发布的消息没有持久化，如果在订阅的客户端收不到 hello，只能收到订阅后发布的消息。**