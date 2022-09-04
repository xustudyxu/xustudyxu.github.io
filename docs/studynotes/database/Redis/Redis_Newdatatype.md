---
title: Redis 新数据类型
date: 2022-06-14 21:16:42
permalink: /database/Reids/Redis_Newdatatype
categories:
  - Redis
tags:
  - Redis
---
# Redis 新数据类型

[[toc]]

**命令大小写都可以，如果你只想单纯看 API，不想看例子，请移到最下面的 [指令总结](/database/Reids/Redis_Newdatatype#指令总结)**。

## Bitmaps

在开发中，可能会遇到这种情况：需要统计用户的某些信息，如活跃或不活跃，登录或者不登录；又如需要记录用户一年的打卡情况，打卡了是 1，没有打卡是0，如果使用普通的 key-value 存储，则要记录 365 条记录，如果用户量很大，需要的空间也会很大，所以 Redis 提供了 Bitmap 位图这中数据结构。

Bitmap 就是通过操作二进制位来进行记录，即只有为 0 和 1；如果要记录 365 天的打卡情况，使用 Bitmap 表示的形式大概如下：

```
0101000111000111...........................
```

这样有什么好处呢？当然就是节约内存了，365 天相当于 365 bit，又 1 字节 = 8 bit，所以相当于使用 46 个字节即可。

BitMap 就是通过一个 bit 位来表示某个元素对应的值或者状态，其中的 key 就是对应元素本身，实际上底层也是通过对字符串的操作来实现。Redis 从 2.2 版本之后新增了 setbit，getbit，bitcount 等几个 bitmap 相关命令。

Bitmaps 本身不是一种数据类型， 实际上它就是字符串（key-value），但是它可以对字符串的位进行操作。

### 指令

给偏移量设值(0 或 1)

```shell
setbit <key> <offset> <value>
```

实例：每个独立用户是否访问过网站存放在 Bitmaps 中，将访问的用户记做 1，没有访问的用户记做 0，用偏移量作为用户的 id。假设现在有 20 个用户，userid=1，6，11，15，19 的用户对网站进行了访问

```shell
127.0.0.1:6379> setbit user 1 1
(integer) 0
127.0.0.1:6379> setbit user 6 1
(integer) 0
127.0.0.1:6379> setbit user 11 1
(integer) 0
127.0.0.1:6379> setbit user 15 1
(integer) 0
127.0.0.1:6379> setbit user 19 1
(integer) 0
```

+ 根据偏移量获取值

```shell
getbit <key> <offset>
```

示例：获取 id=8 的用户是否访问过， 返回 0 说明没有访问过

```shell
127.0.0.1:6379> getbit user 8
(integer) 0
```

+ `bitcount <key> [start end]`统计字符串从 start 字节到 end 字节比特值为 1 的数量，start 和 end 代表起始和结束字节数

```shell
127.0.0.1:6379> bitcount user
(integer) 5
```

+ bitop 是一个复合操作，它可以做多个 Bitmaps 的 and（交集）、or（并集）、not（非）、xor（异或）操作并将结果保存在 destkey 中

  `operation`：and（交集）、or（并集）、not（非）、xor（异或）

```shell
bitop <operation> <key1> <key2> ...
```

案例：计算出两天都访问过网站的用户数量

- user:lastday：昨天用户数量的 key
- user:today：今天用户数量的 key

```shell
bittop and users:and user:lastday user:today
```

> 相同id按位与

### Bitmaps 与 Set 对比

**Set 和 Bitmaps 存储一天活跃用户对比**

假设网站有 1 亿用户， 每天独立访问的用户有 5 千万，如果每天用集合类型和 Bitmaps 分别存储活跃用户可以得到表

| 数据类型 | 每个用户 id 占用空间 | 需要存储的用户量 | 全部内存量              |
| -------- | -------------------- | ---------------- | ----------------------- |
| 集合 Set | 64 位                | 50000000         | 64 位*50000000 = 400MB  |
| Bitmaps  | 1 位                 | 100000000        | 1 位*100000000 = 12.5MB |

**Set 和 Bitmaps 存储独立用户空间对比**

很明显，这种情况下使用 Bitmaps 能节省很多的内存空间，尤其是随着时间推移节省的内存还是非常可观的。

| 数据类型 | 一天   | 一个月 | 一年  |
| -------- | ------ | ------ | ----- |
| 集合 Set | 400MB  | 12GB   | 144GB |
| Bitmaps  | 12.5MB | 375MB  | 4.5GB |

**Set 和 Bitmaps 存储一天活跃用户对比（独立用户比较少）**

但 Bitmaps 并不是万金油，假如该网站每天的独立访问用户很少，例如只有 10 万（大量的僵尸用户），那么两者的对比如下表所示，很显然，这时候使用 Bitmaps 就不太合适了， 因为基本上大部分位都是 0

| 数据类型 | 每个 userid 占用空间 | 需要存储的用户量 | 全部内存量              |
| -------- | -------------------- | ---------------- | ----------------------- |
| 集合 Set | 64 位                | 100000           | 64 位*100000 = 800KB    |
| Bitmaps  | 1 位                 | 100000000        | 1 位*100000000 = 12.5MB |

## HyperLogLog(HLL)

Redis 在 2.8.9 版本添加了 HyperLogLog 结构。

Redis HyperLogLog 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定的、并且是很小的。

在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。

HyperLogLog 是一种算法，它提供了不精确的去重计数方案。

举个例子：假如我要统计网页的 UV（浏览用户数量，一天内同一个用户多次访问只能算一次），传统的解决方案是使用 Set 来保存用户 id，然后统计 Set 中的元素数量来获取页面 UV。但这种方案只能承载少量用户，一旦用户数量大起来就需要消耗大量的空间来存储用户 id。我的目的是统计用户数量而不是保存用户，这简直是个吃力不讨好的方案。而使用 Redis 的 HyperLogLog 最多需要 12k 就可以统计大量的用户数，尽管它大概有 0.81% 的错误率，但对于统计 UV 这种不需要很精确的数据是可以忽略不计的。

HyperLogLog 根据输入元素来计算基数，而不会储存输入元素本身（相比较 set），只储存数，不存元素本身，只存储值。

比如数据集 {1, 3, 5, 7, 5, 7, 8}， 那么这个数据集的基数集为 {1, 3, 5 ,7, 8}, 基数(不重复元素总数)为 5。 基数估计就是在误差可接受的范围内，快速计算基数。

**总结就是去掉重复的元素，只存储不重复元素的个数，不会储存元素本身。**

+ 添加指定元素（可添加多个）

```shell
pfadd <key> <element> [element] ...
```

例子:

```shell
127.0.0.1:6379> pfadd program "java"
(integer) 1
127.0.0.1:6379> pfadd program "php" "java" "go" "c++" "js" "python"
(integer) 1
```

+ 计算 HLL 的近似基数（可计算多个）

```shell
pfcount <key> [key] ...
```

例子:

```shell
127.0.0.1:6379> pfcount program
(integer) 6
```

+ 将一个或多个 HLL 合并后的结果存 储在另一个 HLL 中

```shell
pfmerge <newKey> <otherKey> <otherKey> [otherKey] ...
```

例子：

```shell
pfadd hll1 "redis" "mysql" "reids"
pfcount hll1   # 结果 2，因为 redis 重复了

pfadd hll2 "oracle" "mysql"
pfmerge hll3 hll1 hll2
pfcount hll3  # 结果 3，因为 hll1 与 hll2 合并的结果给 hll3
```

## Geospatial

Redis 3.2 中增加了对 GEO 类型的支持。GEO 即 Geographic，地理信息的缩写。该类型，就是元素的二维坐标，在地图上就是经纬度。redis 基于该类型，提供了经纬度设置、查询、范围查询、距离查询、经纬度 Hash 等常见操作。GEO 的数据类型为 zset。

+ 添加地理位置（经度，纬度，名称）（可添加多个）

```shell
geoadd <key> <经度> <维度> <名称> ...
```

例子:

```shell
geoadd china:city 121.47 31.23 上海

# 一次性添加多个地理位置
geoadd china:city 106.50 29.53 广西 114.05 22.52 深圳 116.38 39.90 北京
```

::: warning

两极无法添加，有效的经度从 -180 度到 180 度。有效的纬度从 -85.05112878 度到 85.05112878 度，当坐标位置超出指定范围时，该命令将会返回一个错误。已经添加的数据，是无法再次往里面添加的。

:::

+ 获得指定地区的坐标值

```shell
geopos <key> <名称> [名称...]
```

例子:

```shell
geopos china:city 北京 上海 重庆

# 返回经度和纬度
```

+ 获取两个位置之间的直线距离

```shell
geodist <key> <名称1> <名称2> [m|km|ft|mi]
```

例子：

```shell
geodist china:city 北京 上海 km 

# 结果：1087.4816
```

单位：m 表示单位为米[默认值]。km 表示单位为千米。mi 表示单位为英里。ft 表示单位为英尺

+ 以给定的经纬度为中心，找出某一半径内的元素

```shell
georadius <key> <经度> <维度> 距离 m|km|ft|mi
```

例子：

```shell
georadius china:city 110 30 1000 km

# 返回结果：chongqing  shenzheng
```

## 指令总结

:::: tabs cache-lifetime="5" :options="{ useUrlFragment: false }"

::: tab Bitmaps

| 指令                                | 含义                                                         |
| ----------------------------------- | ------------------------------------------------------------ |
| setbit <key> <offset> <value>       | 给偏移量设值(0 或 1)                                         |
| getbit <key> <offset>               | 根据偏移量获取值                                             |
| bitcount <key> [start end]          | 统计字符串从 start 字节到 end 字节比特值为 1 的数量，start 和 end 代表起始和结束字节数 |
| bitop <operation> <key1> <key2> ... | bitop 是一个复合操作，operation 是 and（交集）、or（并集）、not（非）、xor（异或），可以将结果保存在 destkey 中 |

:::

::: tab HyperLogLog(HLL)

| 指令                                                  | 含义                                              |
| ----------------------------------------------------- | ------------------------------------------------- |
| pfadd <key> <element> [element] ...                   | 添加指定元素（可添加多个）                        |
| pfcount <key> [key] ...                               | 计算 HLL 的近似基数（可计算多个）                 |
| pfmerge <newKey> <otherKey> <otherKey> [otherKey] ... | 将一个或多个 HLL 合并后的结果存 储在另一个 HLL 中 |

:::

::: tab Geospatial

| 指令                                             | 含义                                       |
| ------------------------------------------------ | ------------------------------------------ |
| geoadd <key> <经度> <维度> <名称> ...            | 获得指定地区的坐标值                       |
| geodist <key> <名称1> <名称2> [m\|km\|ft\|mi]    | 获取两个位置之间的直线距离                 |
| georadius <key> <经度> <维度> 距离 m\|km\|ft\|mi | 以给定的经纬度为中心，找出某一半径内的元素 |

::::