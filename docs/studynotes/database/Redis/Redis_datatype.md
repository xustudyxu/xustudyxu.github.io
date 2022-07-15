---
title: 常用五大数据类型
date: 2022-06-12 23:41:12
permalink: /database/Reids/Redis_datatype
categories:
  - Redis
tags:
  - Redis
---
# 常用五大数据类型

[[toc]]

+ [官方reids常用命令](http://redis.cn/commands.html)

**命令大小写都可以，如果你只想单纯看 API，不想看例子，请移到最下面的 [指令总结](/database/Reids/Redis_datatype#指令总结)。**

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

### 数据结构

String的数据结构为简单动态字符串(Simple Dynamic String,缩写SDS)。是可以修改的字符串，内部结构实现上类似于Java的ArrayList，采用预分配冗余空间的方式来减少内存的频繁分配.

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.412xvg9m4nw0.webp)

如图中所示，内部为当前字符串实际分配的空间capacity一般要高于实际字符串长度len。当字符串长度小于1M时，扩容都是加倍现有的空间，如果超过1M，扩容时一次只会多扩1M的空间。需要注意的是字符串最大长度为512M。

## 列表List

### 简介

List 的特点：单键多值。底层实际是个双向链表，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。

Redis 列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）

它的底层实际是个双`向链表`，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.axobasgm674.webp)

### 常用命令

+ `lpush/rpush <key> <value1> <value2> <value3> ...` 指令从左边 / 右边插入一个或多个值，左右也就是首尾

```shell
lpush/rpush <key> <value1> <value2> <value3> ...
```

例子：

```sh
lpush k1 v1 v2 v3
```

+ `lrange <key> <start> <stop>` 指令按照索引下标获得元素(从左到右，先进后出)
+ `lrange <key> 0 -1` 指令如果 start 是 0，stop 是 -1，代表获取所有元素

```shell
127.0.0.1:6379> lpush k1 v1 v2 v3
(integer) 3
127.0.0.1:6379> lrange k1 0 -1
1) "v3"
2) "v2"
3) "v1"
127.0.0.1:6379> rpush k2 v1 v2 v3
(integer) 3
127.0.0.1:6379> lrange k2 0 -1 #取所有值
1) "v1"
2) "v2"
3) "v3"
```

+ `lpop/rpop <key>` 指令从左边 / 右边吐出一个值。吐出后该值就不存在 key 中

```shell
127.0.0.1:6379> lrange k2 0 -1   #从左到右列出k2所有值
1) "v1"
2) "v2"
3) "v3"
127.0.0.1:6379> lpop k2          #从左边吐出一个值
"v1"
127.0.0.1:6379> lrange k2 0 -1   #从左到右列出k2所有值
1) "v2"
2) "v3"
127.0.0.1:6379> rpop k2			 #从右边吐出一个值
"v3"
127.0.0.1:6379> lrange k2 0 -1   #从左到右列出k2所有值
1) "v2"
```

+ `rpoplpush <key1> <key2>` 指令列表`右边吐出一个值，插到列表左边`，其中 key1 是 rpop 的 key，key2 是 lpush 的 key

```shell
127.0.0.1:6379> lpush name feng rong xu
(integer) 3
127.0.0.1:6379> lpush secondName xustudyxu
(integer) 1
127.0.0.1:6379> rpoplpush name secondName
"feng"
127.0.0.1:6379> lrange name 0 -1
1) "xu"
2) "rong"
127.0.0.1:6379> lrange secondName 0 -1
1) "feng"
2) "xustudyxu"
```

+ `lindex <key> <index>` 指令按照索引下标获得元素(从左到右)（-1 代表最后一个，0 代表是第一个）

```shell
127.0.0.1:6379> lindex name 0
"xu"
```

+ `llen <key>` 指令获得列表长度

```shell
127.0.0.1:6379> llen name
(integer) 2
```

+ `linsert <key> before/after <value> <newValue>` 指令在元素某个值的前面 / 后面插入新值，如果 value 有多个，则插入最前面的那个

```shell
127.0.0.1:6379> linsert name before rong Rong
(integer) 3
127.0.0.1:6379> lrange name 0 -1
1) "xu"
2) "Rong"
3) "rong"
```

+ `lrem <key> <n> <value>` 指令从左边删除 n 个 value(从左到右)，如果有多个一样的 lement，则删除列表最前面的的

```shell
127.0.0.1:6379> lpush name rong rong rong
(integer) 6
127.0.0.1:6379> lrange name 0 -1
1) "rong"
2) "rong"
3) "rong"
4) "xu"
5) "Rong"
6) "rong"
127.0.0.1:6379> lrem name 2 rong
(integer) 2
127.0.0.1:6379> lrange name 0 -1
1) "rong"
2) "xu"
3) "Rong"
4) "rong"
```

+ `lset <key> <index> <value>` 指令将列表 key 下标为 index 的值替换成 value

```shell
127.0.0.1:6379> lset name 1 Rong
OK
127.0.0.1:6379> lrange name 0 -1
1) "rong"
2) "Rong"
3) "Rong"
4) "rong"
```

### 数据结构

List的数据结构为快速链表quickList。

首先在列表元素较少的情况下会使用一块连续的内存存储，这个结构是ziplist，也即是压缩列表。

它将所有的元素紧挨着一起存储，分配的是一块连续的内存。

当数据量比较多的时候才会改成quicklist。

因为普通的链表需要的附加指针空间太大，会比较浪费空间。比如这个列表里存的只是int类型的数据，结构上还需要两个额外的指针prev和next。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.4ueo6wazv3e0.webp)

## 集合Set

### 简介

Redis set对外提供的功能与list类似是一个列表的功能，特殊之处在于set是可以**自动排重**的，当你需要存储一个列表数据，又不希望出现重复数据时，set是一个很好的选择，并且set提供了判断某个成员是否在一个set集合内的重要接口，这个也是list所不能提供的。

Redis的Set是string类型的无序集合。它底层其实是一个value为null的hash表，所以添加，删除，查找的**复杂度都是**`O(1)`。

一个算法，随着数据的增加，执行时间的长短，如果是O(1)，数据增加，查找数据的时间不变

### 常用命令

+ `sadd <key> <value1> <value2> ...` 指令将一个或多个 member 元素加入到集合 key 中，已经存在的 member 元素将被忽略

```shell
127.0.0.1:6379> sadd k1 v1 v2 v3
(integer) 3
127.0.0.1:6379> sadd myset "kele"
(integer) 1
127.0.0.1:6379> sadd myset "kele" # 重复值不插入 返回 0
(integer) 0
```

+ `smembers <key>` 指令取出该集合的所有值

```shell
127.0.0.1:6379> smembers k1
1) "v2"
2) "v3"
3) "v1"
```

+ `sismember <key> <value>` 指令判断集合是否为含有该值，有 1，没有 0

```shell
127.0.0.1:6379> sismember k1 v4
(integer) 0
```

+ `scard <key>` 指令返回该集合的元素个数

```shell
127.0.0.1:6379> scard k1
(integer) 3
```

+ `srem <key> <value1> <value2> ...` 指令删除集合中的某个元素

```shell
127.0.0.1:6379> srem k1 v1 v2
(integer) 2
127.0.0.1:6379> smembers k1
1) "v3"
```

+ `spop <key>` 指令随机从该集合中吐出一个值，key 里就没有该值了

```shell
127.0.0.1:6379> sadd k2 v1 v2 v3 v4
(integer) 4
127.0.0.1:6379> spop k2
"v3"
127.0.0.1:6379> smembers k2
1) "v2"
2) "v4"
3) "v1"
```

+ `srandmember <key> <n>` 指令随机从该集合中取出 n 个值。不会从集合中删除

```shell
127.0.0.1:6379> srandmember k2 2
1) "v2"
2) "v1"
127.0.0.1:6379> srandmember k2 2
1) "v2"
2) "v4"
```

+ `smove <key1> <key2> <value>` 指令把集合中一个值从一个集合移动到另一个集合，其中 key1 为要获取的集合，key2 为放入的集合

```shell
127.0.0.1:6379> sadd k1 v1 v2 v3
(integer) 3
127.0.0.1:6379> sadd k2 v3 v4 v5
(integer) 3
127.0.0.1:6379> smove k1 k2 v3
(integer) 1
127.0.0.1:6379> smembers k1
1) "v2"
2) "v1"
127.0.0.1:6379> smembers k2
1) "v5"
2) "v4"
3) "v3"
```

+ `sinter <key1> <key2>` 指令返回两个集合的交集元素

```shell
127.0.0.1:6379> sadd k3 v4 v6 v7
(integer) 3
127.0.0.1:6379> sinter k2 k3
1) "v4"
```

+ `sunion <key1> <key2>` 指令返回两个集合的并集元素

```shell
127.0.0.1:6379> sunion k2 k3
1) "v3"
2) "v4"
3) "v5"
4) "v6"
5) "v7"
```

+ `sdiff <key1> <key2>` 指令返回两个集合的差集元素(key1 中的，不包含 key2 中的)

```shell
127.0.0.1:6379> sdiff k2 k3
1) "v3"
2) "v5"
```

### 数据结构

Set数据结构是dict字典，字典是用哈希表实现的。

Java中HashSet的内部实现使用的是HashMap，只不过所有的value都指向同一个对象。Redis的set结构也是一样，它的内部也使用hash结构，所有的value都指向同一个内部值。

## 哈希Hash

### 简介

Redis hash 是一个键值对集合。

Redis hash是一个string类型的`field`和`value`的映射表，hash特别适合用于存储对象。

类似Java里面的Map<String,Object>

用户ID为查找的key，存储的value用户对象包含姓名，年龄，生日等信息，如果用普通的key/value结构来存储

主要有以下2种存储方式：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.5knxcnh942k0.webp)

### 常用命令

+ `hset <key> <field1> <value> <field2> <value> ...` 指令给集合 key 的 filed 键赋值 value，批量也可以，4.0 之前是 hmset，现在 hset 也可以批量添加

```shell
127.0.0.1:6379> hset user:1001 id 1
(integer) 1
127.0.0.1:6379> hset user:1001 name zhangsan
(integer) 1
127.0.0.1:6379> hset user:1001 age 21 email 123@qq.com
(integer) 2
```

+ `hget <key> <field>` 指令从 key 集合取出 value

```shell
127.0.0.1:6379> hget user:1001 email
"123@qq.com"
```

+ `hexists <key> <field>` 指令查看哈希表 key 中，给定域 field 是否存在

```shell
127.0.0.1:6379> hexists user:1001 age
(integer) 1
127.0.0.1:6379> hexists user:1001 gender
(integer) 0
```

+ `hkeys <key>` 指令列出该 hash 集合的所有 field

```shell
127.0.0.1:6379> hkeys user:1001
1) "id"
2) "name"
3) "age"
4) "email"
```

+ `hvals <key>` 指令列出该 hash 集合的所有 value

```shell
127.0.0.1:6379> hvals user:1001
1) "1"
2) "zhangsan"
3) "21"
4) "123@qq.com"
```

+ `hincrby <key> <field> <increment>` 指令为哈希表 key 中的域 field 的值加上增量

```shell
127.0.0.1:6379> hincrby user:1001 age 10
(integer) 31
127.0.0.1:6379> hget user:1001 age
"31"
```

+ `hsetnx <key> <filed> <value>` 指令将哈希表 key 中的域 field 的值设置为 value ，当且仅当域 field 不存在

```shell
127.0.0.1:6379> hsetnx user:1001 gender man
(integer) 1   #设置成功，返回1
127.0.0.1:6379> hsetnx user:1001 gender woman
(integer) 0   #设置失败，返回0
127.0.0.1:6379> hget user:1001 gender
"man"
```

### 数据结构

Hash类型对应的数据结构是两种：ziplist（压缩列表），hashtable（哈希表）。当field-value长度较短且个数较少时，使用ziplist，否则使用hashtable

## 有序集合Zset

### 简介

Redis有序集合zset与普通集合set非常相似，是一个`没有重复元素`的字符串集合。

不同之处是有序集合的每个成员都关联了一个`评分（score）`,这个评分（score）被用来按照从最低分到最高分的方式排序集合中的成员。`集合的成员是唯一的，但是评分可以是重复了` 。

因为元素是有序的, 所以你也可以很快的根据评分（score）或者次序（position）来获取一个范围的元素。

访问有序集合的中间元素也是非常快的,因此你能够使用有序集合作为一个没有重复成员的智能列表。

### 常用命令

+ `zadd <key> <score1> <value1> <score2> <value2> ...` 指令将一个或多个 member 元素及其 score 值加入到有序集 key 当中

```shell
127.0.0.1:6379> zadd topn 200 java 300 c++ 400 mysql 500 php
(integer) 4
```

+ `zrange <key> <start> <stop> [withscores]` 指令返回有序集 key 中，下标在 star t和 stop 之间的元素

  带 WITHSCORES，可以让分数一起和值返回到结果集

  例如：(0 和 -1 代表查询所有)

```shell
127.0.0.1:6379> zrange topn 0 -1
1) "java"
2) "c++"
3) "mysql"
4) "php"
127.0.0.1:6379> zrange topn 0 -1 withscores
1) "java"
2) "200"
3) "c++"
4) "300"
5) "mysql"
6) "400"
7) "php"
8) "500"
```

+ `zrevrange <key> <start> <stop> [withscores]` 指令同上，改为从大到小排列

  ```shell
  zrevrange <key> <start> <stop> [withscores]
  ```

+ `zrangebyscore <key> <min> <max> [withscores] [limit offset count]` 指令返回有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max )的成员。 有序集成员按 score 值递增(从小到大)次序排列

```shell
127.0.0.1:6379> zrangebyscore topn 300 500
1) "c++"
2) "mysql"
3) "php"
127.0.0.1:6379> zrangebyscore topn 300 500 withscores
1) "c++"
2) "300"
3) "mysql"
4) "400"
5) "php"
6) "500"
```

+ `zrevrangebyscore <key> <min> <max> [withscores] [limit offset count]` 指令同上，改为从大到小排列

  ```shell
  zrevrangebyscore <key> <min> <max> [withscores] [limit offset count]
  ```

例子：

```shell
127.0.0.1:6379> zadd salary 2500 xiaoming
(integer) 1
127.0.0.1:6379> zadd salary 5000 xiaohong
(integer) 1
127.0.0.1:6379> zadd salary 500 kele
(integer) 1

# Inf 无穷大量 +∞,同样地,-∞ 可以表示为 -Inf。
127.0.0.1:6379> zrangebyscore salary -inf +inf # 显示整个有序集
1) "kele"
2) "xiaoming"
3) "xiaohong"
127.0.0.1:6379> zrangebyscore salary -inf +inf withscores # 递增排列
1) "kele"
2) "500"
3) "xiaoming"
4) "2500"
5) "xiaohong"
6) "5000"
127.0.0.1:6379> zrevrange salary 0 -1 withscores # 递减排列
1) "xiaohong"
2) "5000"
3) "xiaoming"
4) "2500"
5) "kele"
6) "500"
# 显示工资 <= 2500 的所有成员
127.0.0.1:6379> zrangebyscore salary -inf 2500 withscores 
1) "kele"
2) "500"
3) "xiaoming"
4) "2500"
```

+ `zincrby <key> <increment> <value>` 指令为元素的 score 加上增量

```shell
127.0.0.1:6379> zincrby topn 50 java
"250"
```

+ `zrem <key> <value>` 指令删除该集合下，指定值的元素

```shell
127.0.0.1:6379> zrange salary 0 -1
1) "kele"
2) "xiaoming"
3) "xiaohong"
127.0.0.1:6379> rem salary xiaohong
(integer) 1
127.0.0.1:6379> zrange salary 0 -1
1) "kele"
2) "xiaoming"
```

+ `zcount <key> <min> <max>` 指令统计该集合，分数区间内的元素个数

```shell
127.0.0.1:6379> zadd name 1 feng
(integer) 1
127.0.0.1:6379> zadd name 2 rong 3 xu
(integer) 2
127.0.0.1:6379> zcount name 1 3
(integer) 3
127.0.0.1:6379> zcount name 2 3
(integer) 2
```

+ `zrank <key> <value>` 指令返回该值在集合中的排名，从 0 开始

```shell
127.0.0.1:6379> zrank name rong
(integer) 1
```

+ `zrevrank <key> <value>` 指令返回有序集中成员的排名。其中有序集成员按分数值递减(从大到小)排序

```shell
127.0.0.1:6379> zrevrank name xu
(integer) 0
```

例子:利用 zset 实现一个文章访问量的排行榜

```shell
zadd topn 1000 java 800 c++ 600 php 400 js  # 添加文章以及评分
zrevrange topn 0 9 withscores # 评分从大到小查询
```

### 数据结构

SortedSet(zset)是Redis提供的一个非常特别的数据结构，一方面它等价于Java的数据结构Map<String, Double>，可以给每一个元素value赋予一个权重score，另一方面它又类似于TreeSet，内部的元素会按照权重score进行排序，可以得到每个元素的名次，还可以通过score的范围来获取元素的列表。

zset底层使用了两个数据结构

+ hash，hash的作用就是关联元素value和权重score，保障元素value的唯一性，可以通过元素value找到相应的score值。
+ 跳跃表，跳跃表的目的在于给元素value排序，根据score的范围获取元素列表。

#### 跳跃表(跳表)

**简介**

有序集合在生活中比较常见，例如根据成绩对学生排名，根据得分对玩家排名等。对于有序集合的底层实现，可以用数组、平衡树、链表等。数组不便元素的插入、删除；平衡树或红黑树虽然效率高但结构复杂；链表查询需要遍历所有效率低。Redis采用的是跳跃表。跳跃表效率堪比红黑树，实现远比红黑树简单。

**实例**

对比有序链表和跳跃表，从链表中查询出51

1.   有序链表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.7e61gymwxrs0.webp)

要查找值为51的元素，需要从第一个元素开始依次查找、比较才能找到。共需要6次比较。

2.   跳跃表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/image.67ivzlf1vio0.webp)

从第2层开始，1节点比51节点小，向后比较。

21节点比51节点小，继续向后比较，后面就是NULL了，所以从21节点向下到第1层

在第1层，41节点比51节点小，继续向后，61节点比51节点大，所以从41向下

在第0层，51节点为要查找的节点，节点被找到，共查找4次。

从此可以看出跳跃表比有序链表效率要高

## 指令总结

虽然看了五个数据类型的 API 和例子，但是两者混为一起，难免心生抵触，不想看例子，这里以表格形式总结 API，不惨任何例子。

### 键(key)命令

| 指令            | 含义                                                         |
| --------------- | ------------------------------------------------------------ |
| dbsize          | 查看当前数据库的 key 的数量                                  |
| keys *          | 指令查看当前库所有 key                                       |
| exists key      | 指令判断某个 key 是否存在                                    |
| type key        | 指令查看 key 的类型是哪个                                    |
| del key         | 指令删除指定的 key                                           |
| unlink key      | 指令根据 value 选择非阻塞删除（先将 keys 从 keysapce 元数据中删除，真正的删除会在后续异步操作） |
| expire key time | 指令给指定的 key 设置过期时间（time 以秒为单位），当 key 过期时(生存时间为 0 )，它会被自动删除 |
| ttl key         | 指令查看 key 还有多少秒过期，-1 表示永不过期，-2 表示已过期  |
| select num      | 指令选择数据库，num 代表从 0-16，默认是 0                    |
| flushdb         | 清空当前库                                                   |
| flushall        | 清空所有库                                                   |

### 字符串String

| 指令                                         | 含义                                                         |
| -------------------------------------------- | ------------------------------------------------------------ |
| set <key> <value>                            | 添加键值对，如果 key 已经存在则覆盖 value                    |
| get <key>                                    | 查看对应键值                                                 |
| append <key> <value>                         | 追加到原值的末尾                                             |
| strlen <key>                                 | 获得值的长度                                                 |
| setnx <key> <value>                          | 只有 key 不存在时，才加入该 key 的值                         |
| incr <key>                                   | 将 key 中储存的数字值增 1，只能对数字值操作，如果为空，新增值为 1 |
| decr <key>                                   | 将 key 中储存的数字值减 1，只能对数字值操作，如果为空，新增值为 -1 |
| incrby / decrby <步长>                       | 将 key 中储存的数字值增减。自定义步长                        |
| mset <key1> <value> <key2> <value2> ......   | 设置一个或者多个 key-value 键值对                            |
| mget <key1> <key2> ......                    | 获取一个或者多个 key-value 键值对                            |
| msetnx <key1> <value> <key2> <value2> ...... | 同时设置一个或多个 key-value 对，当且仅当所有给定 key 都不存在 |
| getrange <key> <起始位置> <结束位置>         | 获得值的范围，类似 java 中的 substring                       |
| getrange <key> <起始位置> <value>            | 用 value 覆写所储存的字符串值，从 <起始位置> 开始(索引从 0 开始) |
| setrange <key> <位置> <newValue>             | 设置指定区间范围内的值                                       |
| setex <key> <过期时间/秒> <value>            | 设置键值的同时，设置过期时间，单位秒                         |
| psetex <key> <过期时间/毫秒> <value>         | 设置键值的同时，设置过期时间，单位毫秒                       |
| getset <key> <value>                         | 以新换旧，设置了新值同时获得旧值                             |
| set user:1 value（json数据）                 | 存储对象                                                     |

### 列表List

| 指令                                             | 含义                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| lpush/rpush <key> <value1> <value2> <value3> ... | 从左边/右边插入一个或多个值，左右也就是首尾                  |
| lrange <key> <start> <stop>                      | 按照索引下标获得元素(从左到右，先进后出)                     |
| lrange <key> 0 -1                                | 如果 start 是 0，stop 是 -1，代表获取所有元素                |
| lindex <key> <index>                             | 按照索引下标获得元素(从左到右)（-1 代表最后一个，0 代表是第一个） |
| lpop/rpop <key>                                  | 从左边/右边吐出一个值。吐出后该值就不存在 key 中             |
| rpoplpush <key1> <key2>                          | 列表右边吐出一个值，插到列表左边，其中 key1 是 rpop 的 key，key2 是 lpush 的 key |
| llen <key>                                       | 获得列表长度                                                 |
| linsert <key> before/after <value> <newValue>    | 在元素某个值的前面/后面插入新值，如果 value 有多个，则插入最前面的那个 |
| lrem <key> <n> <value>                           | 从左边删除 n 个 value(从左到右)，如果有多个一样的 lement，则删除列表最前面的的 |
| lset <key> <index> <value>                       | 将列表 key 下标为 index 的值替换成 value                     |
| ltrim key                                        | 对一个列表进行修剪(trim)，只保留指定列表中区间内的元素，不在指定区间之内的元素都将被删除 |

### 集合Set

| 指令                             | 含义                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| sadd <key> <value1> <value2> ... | 将一个或多个 member 元素加入到集合 key 中，已经存在的 member 元素将被忽略 |
| smembers <key>                   | 取出该集合的所有值                                           |
| sismember <key> <value>          | 判断集合是否为含有该值，有 1，没有 0                         |
| scard <key>                      | 返回该集合的元素个数                                         |
| srem <key> <value1> <value2> ... | 删除集合中的某个元素                                         |
| spop <key>                       | 随机从该集合中吐出一个值，key 里就没有该值了                 |
| srandmember <key> <n>            | 随机从该集合中取出 n 个值。不会从集合中删除                  |
| smove <key1> <key2> <value>      | 把集合中一个值从一个集合移动到另一个集合，其中 key1 为要获取的集合，key2 为放入的集合 |
| sinter <key1> <key2>             | 返回两个集合的交集元素                                       |
| sunion <key1> <key2>             | 返回两个集合的并集元素                                       |
| sdiff <key1> <key2>              | 返回两个集合的差集元素(key1 中的，不包含 key2 中的)          |

### 哈希Hash

| 指令                                             | 含义                                                         |
| ------------------------------------------------ | ------------------------------------------------------------ |
| hset <key> <field1> <value> <field2> <value> ... | 给集合 key 的 filed 键赋值 value，批量也可以，4.0 之前是 hmset，现在 hset 也可以批量添加 |
| hget <key> <field>                               | 从 key 集合取出 value                                        |
| hexists <key> <field>                            | 查看哈希表 key 中，给定域 field 是否存在                     |
| hkeys <key>                                      | 列出该 hash 集合的所有 field                                 |
| hvals <key>                                      | 列出该 hash 集合的所有 value                                 |
| hincrby <key> <field> <increment>                | 为哈希表 key 中的域 field 的值加上增量                       |
| hsetnx <key> <filed> <value>                     | 将哈希表 key 中的域 field 的值设置为 value ，当且仅当域 field 不存在 |

### 有序集合Zset

| 指令                                                         | 含义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| zadd <key> <score1> <value1> <score2> <value2> ...           | 将一个或多个 member 元素及其 score 值加入到有序集 key 当中   |
| zrange <key> <start> <stop> [withscores]                     | 返回有序集 key 中，下标在 star t和 stop 之间的元素，带 WITHSCORES，可以让分数一起和值(从小到大)返回到结果集 |
| zrevrange <key> <start> <stop> [withscores]                  | 同上，改为从大到小排列                                       |
| zrangebyscore <key> <min> <max> [withscores] [limit offset count] | 返回有序集 key 中，所有 score 值介于 min 和 max 之间(包括等于 min 或 max )的成员。 有序集成员按 score 值递增(从小到大)次序排列 |
| zrevrangebyscore <key> <min> <max> [withscores] [limit offset count] | 同上，改为从大到小排列                                       |
| zincrby <key> <increment> <value>                            | 为元素的 score 加上增量                                      |
| zrem <key> <value>                                           | 删除该集合下，指定值的元素                                   |
| zcount <key> <min> <max>                                     | 统计该集合，分数区间内的元素个数                             |
| zrank <key> <value>                                          | 返回该值在集合中的排名，从 0 开始                            |
| zrevrank <key> <value>                                       | 返回有序集中成员的排名。其中有序集成员按分数值递减(从大到小)排序 |