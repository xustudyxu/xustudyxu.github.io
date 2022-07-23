---
title: RabbitMQ 介绍
date: 2022-07-23 16:56:21
permalink: /middleware/RabbitMQ/RabbitMQ_introduct
categories:
  - RabbitMQ
tags:
  - RabbitMQ
---
# RabbitMQ 介绍

[[toc]]

## RabbitMQ的概念

RabbitMQ 是一个消息中间件：它接受并转发消息。你可以把它当做一个快递站点，当你要发送一个包裹时，你把你的包裹放到快递站，快递员最终会把你的快递送到收件人那里，按照这种逻辑 RabbitMQ 是 一个快递站，一个快递员帮你传递快件。RabbitMQ 与快递站的主要区别在于，它不处理快件而是接收，存储和转发消息数据。

## 四大核心概念

生产者：产生数据发送消息的程序

交换机：是 RabbitMQ 非常重要的一个部件，一方面它接收来自生产者的消息，另一方面它将消息 推送到队列中。交换机必须确切知道如何处理它接收到的消息，是将这些消息推送到特定队列还是推送到多个队列，亦或者是把消息丢弃，这个得有交换机类型决定

队列：是 RabbitMQ 内部使用的一种数据结构，尽管消息流经 RabbitMQ 和应用程序，但它们只能存储在队列中。队列仅受主机的内存和磁盘限制的约束，本质上是一个大的消息缓冲区。许多生产者可以将消息发送到一个队列，许多消费者可以尝试从一个队列接收数据。这就是我们使用队列的方式

消费者：消费与接收具有相似的含义。消费者大多时候是一个等待接收消息的程序。请注意生产者，消费者和消息中间件很多时候并不在同一机器上。同一个应用程序既可以是生产者又是可以是消费者。

## RabbitMQ特性

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.dso2q1lbc5s.webp)

## 各个名词介绍

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.15tq7c46aeyk.webp)

`Broker`：接收和分发消息的应用，RabbitMQ Server 就是 Message Broker

`Virtual host`：出于多租户和安全因素设计的，把 AMQP 的基本组件划分到一个虚拟的分组中，类似于网络中的 namespace 概念。当多个不同的用户使用同一个 RabbitMQ server 提供的服务时，可以划分出多个 vhost，每个用户在自己的 vhost 创建 exchange／queue 等

`Connection`：publisher／consumer 和 broker 之间的 TCP 连接

`Channel`：如果每一次访问 RabbitMQ 都建立一个 Connection，在消息量大的时候建立 TCP Connection 的开销将是巨大的，效率也较低。Channel 是在 connection 内部建立的逻辑连接，如果应用程序支持多线程，通常每个 thread 创建单独的 channel 进行通讯，AMQP method 包含了 channel id 帮助客 户端和 message broker 识别 channel，所以 channel 之间是完全隔离的。Channel 作为轻量级的 Connection 极大减少了操作系统建立 TCP connection 的开销

`Exchange`：message 到达 broker 的第一站，根据分发规则，匹配查询表中的 routing key，分发 消息到 queue 中去。常用的类型有：direct (point-to-point)，topic (publish-subscribe) and fanout (multicast)

`Queue`：消息最终被送到这里等待 consumer 取走

`Binding`：exchange 和 queue 之间的虚拟连接，binding 中可以包含 routing key，Binding 信息被保 存到 exchange 中的查询表中，用于 message 的分发依据

