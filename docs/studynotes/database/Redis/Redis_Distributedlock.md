---
title: Redis 分布式锁
date: 2022-06-21 20:22:56
permalink: /database/Reids/Redis_Distributedlock
categories:
  - Redis
tags:
  - Redis
---
# Redis 分布式锁

[[toc]]

## 问题描述

随着业务发展的需要，原单体单机部署的系统被演化成分布式集群系统后，由于分布式系统多线程、多进程并且分布在不同机器上，这将使原单机部署情况下的并发控制锁策略失效，单纯的 Java API 并不能提供分布式锁的能力。为了解决这个问题就需要一种跨 JVM 的互斥机制来控制共享资源的访问，这就是分布式锁要解决的问题。

分布式锁主流的实现方案：

- 基于数据库实现分布式锁
- 基于缓存（Redis 等）
- 基于 Zookeeper

每一种分布式锁解决方案都有各自的优缺点：

- 性能：Redis 最高
- 可靠性：zookeeper 最高

本内容，我们就基于 Redis 实现分布式锁。

## 分布式锁指令

使用命令

```shell
set <key> <value> <nx / xx> <px millisecond / ex second>
```

+ `nx` 和 `xx` 二选一：
  + `nx`：只在键不存在时，才对键进行设置操作
  + `xx`：只在键已经存在时，才对键进行设置操作
+ `px millisecond` 和 `ex second` 二选一：
  + `px millisecond`：设置键的过期时间为 millisecond 毫秒
  + `ex second`:设置键的过期时间为 second 秒

```shell
set name "frx" nx ex 10
```

注意：Redis 实现分布式锁的指令是 `setnx`，该指令的功能是：

- 如果插入的 key 没有存在 Redis，则将 key-value 存入 Redis
- 如果插入的 key 已经存在 Redis，则 value 失效，无法重新覆盖原来的 value

这样就实现了分布式锁：key 存在则代表有人操作，其他人无法操作。

## Java分布式锁流程

1. 拿锁
2. 业务操作
3. 释放锁

properties 配置文件内容

```properties
server.port=8081

# Redis 服务器地址
spring.redis.host=192.168.199.27
# Redis 服务器连接端口
spring.redis.port=6379
# Redis 数据库索引（默认为 0）
spring.redis.database= 0
# 连接超时时间（毫秒）
spring.redis.timeout=1800000
# 连接池最大连接数（使用负值表示没有限制）
spring.redis.lettuce.pool.max-active=20
# 最大阻塞等待时间(负数表示没限制)
spring.redis.lettuce.pool.max-wait=-1
# 连接池中的最大空闲连接
spring.redis.lettuce.pool.max-idle=5
# 连接池中的最小空闲连接
spring.redis.lettuce.pool.min-idle=0
```

Redis 核心配置类：

```java
@EnableCaching
@Configuration
public class RedisConfig extends CachingConfigurerSupport {
   
    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory factory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new
                Jackson2JsonRedisSerializer(Object.class);
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        template.setConnectionFactory(factory);
        //key 序列化方式
        template.setKeySerializer(redisSerializer);
        //value 序列化
        template.setValueSerializer(jackson2JsonRedisSerializer);
        //value hashmap 序列化
        template.setHashValueSerializer(jackson2JsonRedisSerializer);
        return template;
    }

    @Bean
    public CacheManager cacheManager(RedisConnectionFactory factory) {
        RedisSerializer<String> redisSerializer = new StringRedisSerializer();
        Jackson2JsonRedisSerializer jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer(Object.class);
        //解决查询缓存转换异常的问题
        ObjectMapper om = new ObjectMapper();
        om.setVisibility(PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
        jackson2JsonRedisSerializer.setObjectMapper(om);
        // 配置序列化（解决乱码的问题）,过期时间 600 秒
        RedisCacheConfiguration config =
                RedisCacheConfiguration.defaultCacheConfig()
                        .entryTtl(Duration.ofSeconds(600))
                        .serializeKeysWith(RedisSerializationContext.SerializationPair.
                                fromSerializer(redisSerializer))
                        .serializeValuesWith(RedisSerializationContext.SerializationPair
                                .fromSerializer(jackson2JsonRedisSerializer))
                        .disableCachingNullValues();
        RedisCacheManager cacheManager = RedisCacheManager.builder(factory)
                .cacheDefaults(config)
                .build();
        return cacheManager;
    }
}
```

### 代码一(无过期时间)

```java
@RestController
@RequestMapping("/redisTest")
public class RedisLocked {
    @Autowired
    private RedisTemplate<String,String> redisTemplate;
    
    @GetMapping("testLock")
    public void testLock(){
        // 1 获取锁，setne
        Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock", "111");
        // 2 获取锁成功、查询 num 的值
        if(lock){
            Object value = redisTemplate.opsForValue().get("num");
            // 2.1 判断 num 为空 return
            if(StringUtils.isEmpty(value)){
                return;
            }
            // 2.2 有值就转成成 int
            int num = Integer.parseInt(value + "");
            // 2.3 把 redis 的 num 加 1
            redisTemplate.opsForValue().set("num", String.valueOf(++num));
            // 2.4 释放锁，del
            redisTemplate.delete("lock");
        }else{
            // 3 获取锁失败、每隔 0.1 秒再获取
            try {
                Thread.sleep(100);
                testLock();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

重启 Redis 服务集群，这里利用 ab 网关压力测试：

```shell
ab -n 1000 -c 100 http://192.168.1.113:8081/redisTest/testLock
```

`192.168.1.113` 是本机的 IP，此时是 Linux 系统访问本机的 Spring Boot 项目。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220621/image.huhs4ur3gw8.webp)

查看 redis 中 num 的值：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220621/image.18pery2i94w0.webp)

可能出现的问题：setnx 刚好获取到锁，业务逻辑出现异常 Exception，导致锁无法释放，卡死。

解决：设置过期时间，自动释放锁。

### 优化之设置锁的过期时间

设置过期时间有两种方式：

- 首先想到通过 expire 设置过期时间（缺乏原子性：如果在 setnx 和 expire 之间出现异常，锁也无法释放）
- 在 set 时指定过期时间（推荐）

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220621/image.3a33n6kntog0.webp)

### 代码二（无唯一标识）

在代码一的基础上加上超时时间，看第八行代码

```java {8}
public class RedisLocked {
    @Autowired
    private RedisTemplate<String,String> redisTemplate;
    
    @GetMapping("testLock1")
    public void testLock(){
        // 1 获取锁，setne
        Boolean lock = redisTemplate.opsForValue().setIfAbsent("lock", "111", 2, TimeUnit.SECONDS);
        // 2 获取锁成功、查询 num 的值
        if(lock){
            Object value = redisTemplate.opsForValue().get("num");
            // 2.1 判断 num 为空 return
            if(StringUtils.isEmpty(value)){
                return;
            }
            // 2.2 有值就转成成 int
            int num = Integer.parseInt(value + "");
            // 2.3 把 redis 的 num 加 1
            redisTemplate.opsForValue().set("num", String.valueOf(++num));
            // 2.4 释放锁，del
            redisTemplate.delete("lock");
        }else{
            // 3 获取锁失败、每隔 0.1 秒再获取
            try {
                Thread.sleep(100);
                testLock();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

```

出现的问题：如果线程 1 持有锁，但是操作卡顿 3 秒，而锁是 2 秒过期，导致 2 秒后线程 2 拿到锁，当线程 2 拿到锁时，再过 1 秒后线程 1 才释放锁，也就是释放了进程 2 拿的锁。

解决：setnx 获取锁时，设置一个指定的唯一值（例如：uuid）；释放前获取这个值，判断是否自己的锁。

### 优化之UUID防误删

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220621/image.6phsp1292zk0.webp)

### 代码三（无原子性）

在代码一的基础上，加上了 uuid，看第 23 - 26 行代码

```java {23-26}
public class RedisLocked {
    @Autowired
    private RedisTemplate<String,String> redisTemplate;
    
    @GetMapping("testLock")
    public void testLocked(){
        String locKey = "lock";
        String uuid = UUID.randomUUID().toString();
        Boolean lock = redisTemplate.opsForValue().setIfAbsent(locKey, uuid, 2, TimeUnit.SECONDS);

        if(lock){
            String value = redisTemplate.opsForValue().get("num");
            if(StringUtils.isEmpty(value)){
                return;
            }
            int num = Integer.parseInt(value + "");
            redisTemplate.opsForValue().set("num", String.valueOf(++num));

            // 问题：如果上一行卡顿3秒，而 lock 是 2 秒过期，导致2秒后其他进程拿到锁，而再过 1 秒后这里删除的是其他进程拿的锁
            // redisTemplate.delete(locKey); 

            // 利用UUID判断，解决上面的问题
            if(uuid.equals(redisTemplate.opsForValue().get(locKey))){
                // 新问题：如果进入这一行代码即将执行下面的删除操作，但是 lock 正好过期了，导致下面删除的依然是其他进程拿到的锁
                redisTemplate.delete(locKey);
            }
        }else {
            try {
                Thread.sleep(200);
                testLocked();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
} 
```

遇到的问题：当 uuid 相等时，进入方法里，执行释放锁的那一瞬间之前，锁过期了，那么其他进程拿到了锁，但释放的是其他进程拿的锁。

有时候就是那么巧，虽然 if 判断的时候锁没有过期，但是进入 if 里面的那一瞬间，过期了，导致过期后被其他进程拿到锁，可惜没拿稳，就被释放了。

解决：利用 LUA 脚本实现原子性，即流程没有完全结束（释放锁），不会被其他进程拿到锁。

### 代码四（终极版）

```java
public class RedisLocked {
    @Autowired
    private RedisTemplate<String,String> redisTemplate;

    @GetMapping("testLock")
    public void testLocked(){
        String locKey = "lock";
        String uuid = UUID.randomUUID().toString();
        Boolean lock = redisTemplate.opsForValue().setIfAbsent(locKey, uuid, 2, TimeUnit.SECONDS);

        if(lock){
            String value = redisTemplate.opsForValue().get("num");
            if(StringUtils.isEmpty(value)){
                return;
            }
            int num = Integer.parseInt(value + "");
            redisTemplate.opsForValue().set("num", String.valueOf(++num));

            // 问题：如果上一行卡顿3秒，而lock 是2秒过期，导致2秒后其他进程拿到锁，而再过1秒后这里删除的是其他进程拿的锁
            // redisTemplate.delete(locKey); 

            // 利用UUID判断，解决上面的问题
            /*if(uuid.equals(redisTemplate.opsForValue().get(locKey))){
                // 新问题：如果进入这一行代码即将执行下面的删除操作，但是lock正好过期了，导致下面删除的依然是其他进程拿到的锁
                redisTemplate.delete(locKey);
            }*/

            /*使用 lua 脚本来解决上面出现的问题*/
            // 定义 lua 脚本
            String script = "if redis.call('get', KEYS[1]) == ARGV[1] then return redis.call('del', KEYS[1]) else return 0 end";
            // 使用 redis 执行 lua 执行
            DefaultRedisScript<Long> redisScript = new DefaultRedisScript<>();
            redisScript.setScriptText(script);
            // 设置一下返回值类型 为 Long
            // 因为删除判断的时候，返回的 0,给其封装为数据类型。如果不封装那么默认返回 String 类型，
            // 那么返回字符串与 0 会有发生错误。
            redisScript.setResultType(Long.class);
            // 第一个要是 script 脚本 ，第二个需要判断的 key，第三个就是 key 所对应的值。
            redisTemplate.execute(redisScript, Arrays.asList(locKey), uuid);

        }else {
            try {
                Thread.sleep(200);
                testLocked();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
```

## 总结

> **Java 代码总结**

- 加锁（setnx 指令）
- 添加过期时间（setnx 指令加时间）
- 添加唯一标识如：uuid（将 uuid 放入 Reids，然后操作时获取 uuid，添加 if 判断）
- 添加原子性，用 LUA 语言实现（第 2、3 步用 LUA 语言编写）

> **分布式锁总结**

为了确保分布式锁可用，我们至少要确保锁的实现同时满足以下四个条件：

- 互斥性。在任意时刻，只有一个客户端能持有锁
- 不会发生死锁。即使有一个客户端在持有锁的期间崩溃而没有主动解锁，也能保证后续其他客户端能加锁
- 解铃还须系铃人。加锁和解锁必须是同一个客户端，客户端自己不能把别人加的锁给解了
- 加锁和解锁必须具有原子性