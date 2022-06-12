---
title: 常用五大数据类型
date: 2022-06-12 23:41:12
permalink: /pages/d0967d/
categories:
  - Redis
tags:
  - Redis
---
# 常用五大数据类型

[[toc]]

+ [官方reids常用命令](http://redis.cn/commands.html)

## 键(key)操作

+ `keys *`  查看当前库所有key  

```shell
127.0.0.1:6379> keys *
(empty array)
127.0.0.1:6379> set k1 lucy
OK
127.0.0.1:6379> set k2 mary
OK
127.0.0.1:6379> set k3 jack
OK
127.0.0.1:6379> keys *
1) "k3"
2) "k1"
3) "k2"
```

+ `exists key`  判断某个key是否存在,例如 exists k1 (k1是否存在) 

```shell
127.0.0.1:6379> exists k1
(integer) 1
127.0.0.1:6379> exists k4
(integer) 0
```

+  `type key`  查看你的key是什么类型,例如 type k2 (查看k2的类型) 

```shell
127.0.0.1:6379> type k2
string
```

+  `del key`  删除指定的key数据,例如 del k3 (删除k3的数据)

```shell
127.0.0.1:6379> del k3
(integer) 1
127.0.0.1:6379> keys *
1) "k1"
2) "k2"
```

+ `unlink key`:根据value选择非阻塞删除,仅将keys从keyspace元数据中删除，(真正的删除会在后续异步操作根据value选择非阻塞删除 )

```shell
127.0.0.1:6379> keys *
1) "k2"
127.0.0.1:6379> unlink k2
(integer) 1
127.0.0.1:6379> keys *
(empty array)
```

+ `expire key 10`   10秒钟：为给定的key设置过期时间

```shell
127.0.0.1:6379> expire k1 10
(integer) 1
```

+ `ttl key` 查看还有多少秒过期，-1表示永不过期，-2表示已过期

```shell
127.0.0.1:6379> ttl t1
(integer) -2
```

+ `select` 命令切换数据库,如: select 8 

```shell
127.0.0.1:6379> select  3
OK
127.0.0.1:6379[3]> select 0
OK
```

+ `dbsize` 查看当前数据库的key的数量

```sh
127.0.0.1:6379> dbsize
(integer) 1
```

+ `flushdb` 清空当前库

```shell
flushdb
```

+ `flushall` 通杀全部库

```shell
flushall
```

## 字符串String

### 简介

+ String是Redis最基本的类型，你可以理解成与Memcached一模一样的类型，一个key对应一个value。

+ String类型是`二进制安全的`。意味着Redis的string可以包含任何数据。比如jpg图片或者序列化的对象。

+ String类型是Redis最基本的数据类型，一个Redis中字符串value最多可以是`512M`

**数据结构**

String的数据结构为简单动态字符串(Simple Dynamic String,缩写SDS)。是可以修改的字符串，内部结构实现上类似于Java的ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配.

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.412xvg9m4nw0.webp)

如图中所示，内部为当前字符串实际分配的空间capacity一般要高于实际字符串长度len。当字符串长度小于1M时，扩容都是加倍现有的空间，如果超过1M，扩容时一次只会多扩1M的空间。需要注意的是字符串最大长度为512M。

###  单键单值

+ `set <key> <value>` 指令添加键值对

```shell
127.0.0.1:6379> set name frx
OK
```

> *NX：当数据库中key不存在时，可以将key-value添加数据库
>
> *XX：当数据库中key存在时，可以将key-value添加数据库，与NX参数互斥
>
> *EX：key的超时秒数
>
> *PX：key的超时毫秒数，与EX互斥

示例：redis 的分布式锁应用

```sh
set lock locked nx ex 10
```

key 为 lock 的值 locked 在 10 秒内无法重新赋值，只有 10 秒后过期了，才能给 lock 赋值

+ `get <key>` 查看对应键值：

```shell
127.0.0.1:6379> get name 
"frx"
```

+ `append <key> <value>` 追加到原值的末尾：

```shell
127.0.0.1:6379> append name 01
(integer) 5
127.0.0.1:6379> get name
"frx01"
```

+ `strlen <key>` 获得值的长度：

```shell
127.0.0.1:6379> strlen name
(integer) 5
```

+ `setnx <key> <value>` 指令只有 key 不存在时，才加入该 key 的值

```shell
127.0.0.1:6379> setnx name frx
(integer) 0
127.0.0.1:6379> setnx gender man
(integer) 1
```

### 自增自减

+ `incr <key>` 指令将 key 中储存的数字值增 1，只能对数字值操作，如果为空，新增值为 1：

```shell
127.0.0.1:6379> get age
"21"
127.0.0.1:6379> incr age
(integer) 22
127.0.0.1:6379> get age
"22"
```

+ `decr <key>` 指令将 key 中储存的数字值减 1，只能对数字值操作，如果为空，新增值为 -1：

```shell
127.0.0.1:6379> get age
"22"
127.0.0.1:6379> decr age
(integer) 21
127.0.0.1:6379> get age
"21"
```

+ `incrby / decrby <key> <步长>` 指令将 key 中储存的数字值增减。自定义步长：

```shell
127.0.0.1:6379> get age
"21"
127.0.0.1:6379> incrby age 10
(integer) 31
127.0.0.1:6379> get age
"31"
127.0.0.1:6379> decrby age 5
(integer) 26
127.0.0.1:6379> get age
"26"
```

> 自增自减操作具有原子性
>
> 所谓**原子**操作是指不会被线程调度机制打断的操作；
>
> 这种操作一旦开始，就一直运行到结束，中间不会有任何 （切换到另一个线程）。
>
> （1）在单线程中， 能够在单条指令中完成的操作都可以认为是"原子操作"，因为中断只能发生于指令之间。
>
> （2）在多线程中，不能被其它进程（线程）打断的操作就叫原子操作。
>
> Redis单命令的原子性主要得益于Redis的单线程。

### 多键多值

+ `mset <key1> <value> <key2> <value2> ......` 指令设置一个或者多个 key-value 键值对

```shell
127.0.0.1:6379> mset email 123@qq.com phone 123456
OK
127.0.0.1:6379> keys *
1) "gender"
2) "name"
3) "email"
4) "phone"
5) "age"
```

+ `mget <key1> <key2> ......` 指令获取一个或者多个 key-value 键值对

```shell
127.0.0.1:6379> mget name age phone
1) "frx01"
2) "26"
3) "123456"
```

+ `msetnx <key1> <value> <key2> <value2> ......` 指令同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在,如果有一个存在，就不会成功

```shell
127.0.0.1:6379> msetnx k11 v11 k12 v12
(integer) 1
127.0.0.1:6379> keys *
1) "k12"
2) "k11"
3) "gender"
4) "name"
5) "email"
6) "phone"
7) "age"
```

###  range范围

+ `getrange <key> <起始位置> <结束位置>` 指令获得值的范围，`前包，后包`，类似 java 中的 substring：

```shell
127.0.0.1:6379> set key1 abcdefg
OK
127.0.0.1:6379> getrange key1 0 3
"abcd"
127.0.0.1:6379> getrange key1 0 -1 # 获得全部的值
"abcdefg"
```

+ `setrange <key> <位置> <newValue>` 指令设置指定区间范围内的值,用\<value>  覆写\<key>所储存的字符串值，从<起始位置>开始(`索引从0开始`)。

```shell
127.0.0.1:6379> setrange key1 1 66
(integer) 7
127.0.0.1:6379> get key1
"a66defg"
```

### 键值条件

+ `setex <key> <过期时间/秒> <value>` 指令设置键值的同时，设置过期时间，单位秒

```shell
127.0.0.1:6379> setex key2 60 expire
OK
127.0.0.1:6379> ttl key2
(integer) 50
```

+ `psetex <key> <过时间/毫秒> <value>` 指令设置键值的同时，设置过期时间，单位毫秒

```shell
127.0.0.1:6379> psetex key3 1000000 expire
OK
127.0.0.1:6379> ttl key3
(integer) 987
```

+ `getset <key> <value>` 指令以新换旧，设置了新值同时获得旧值

```shell
127.0.0.1:6379> getset db mongodb   # 没有旧值，返回 nil
(nil)
127.0.0.1:6379> get db
"mongodb"
127.0.0.1:6379> getset db redis     # 返回旧值 mongodb
"mongodb"
127.0.0.1:6379> get db
"redis"
```

### 存储对象

格式：

```sh
set user:1 value（json数据）
```

案例：

```shell
127.0.0.1:6379> mset user:1:name zhangsan user:1:age 2
OK
127.0.0.1:6379> mget user:1:name user:1:age
1) "zhangsan"
2) "2"
```

