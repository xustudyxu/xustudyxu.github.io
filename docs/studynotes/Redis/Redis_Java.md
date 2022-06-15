---
title: Redis Java整合
date: 2022-06-15 23:28:15
permalink: /pages/75815c/
categories:
  - Redis
tags:
  - Redis
---
# Redis Java整合

[[toc]]

##  Jedis

Jedis 是 Redis 官方推荐的 Java 连接开发工具。要在 Java 开发中使用好 Redis 中间件，必须对 Jedis 熟悉才能写成漂亮的代码。

### 测试ping

前提打开了 Redis 服务，否则 Java 无法连接 Redis 服务。

1. 新建一个普通的 Maven 项目
2. 导入 Redis 的依赖，版本自己选择

```xml
<dependencies>
    <!-- https://mvnrepository.com/artifact/redis.clients/jedis -->
    <dependency>
        <groupId>redis.clients</groupId>
        <artifactId>jedis</artifactId>
        <version>3.5.2</version>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.75</version>
    </dependency>
</dependencies>
```

3. 编写测试代码，添加 Redis 服务所在的 IP 和 端口

```shell
public class JedisDemo1 {

    public static void main(String[] args) {
        //创建Jedis对象
        Jedis jedis = new Jedis("192.168.197.200",6379);

        //测试
        String value = jedis.ping();
        System.out.println(value);

    }
}
```

### 常用API

Jedis 提供的 API 其实和我们之前敲的命令名几乎一模一样。

基本操作

```java
public static void main(String[] args) {
    Jedis jedis = new Jedis("192.168.197.200", 6379);

    // 验证密码，如果没有设置密码这段代码省略
    // jedis.auth("password");

    jedis.connect(); 		// 连接
    jedis.disconnect(); 	// 断开连接
    jedis.flushAll(); 		// 清空所有的key
}
```

对key操作的方法

```java
    //操作key
    @Test
    public void testKey(){

        Jedis jedis = new Jedis("192.168.197.200", 6379);

        System.out.println("清空数据：" + jedis.flushDB());
        System.out.println("判断某个键是否存在：" + jedis.exists("username"));
        System.out.println("新增 <'username','frx'> 的键值对：" + jedis.set("username", "frx"));
        System.out.println("新增 <'password','123'> 的键值对：" + jedis.set("password", "123"));

        System.out.println("系统中所有的键如下：");
        Set<String> keys = jedis.keys("*");
        for (String key : keys) {
            System.out.println(key);
        }

        System.out.println("删除键 password:" + jedis.del("password"));
        System.out.println("判断键 password 是否存在：" + jedis.exists("password"));
        System.out.println("查看键 username 所存储的值的类型：" + jedis.type("username"));
        System.out.println("设置 username 的过期时间:"+jedis.expire("username",60));
        System.out.println("查看 username 的过期时间:"+jedis.ttl("username"));
        System.out.println("随机返回 key 空间的一个：" + jedis.randomKey());
        System.out.println("重命名 key：" + jedis.rename("username", "name"));
        System.out.println("取出改后的 name：" + jedis.get("name"));
        System.out.println("按索引查询：" + jedis.select(0));
        System.out.println("删除当前选择数据库中的所有 key：" + jedis.flushDB());
        System.out.println("返回当前数据库中 key 的数目：" + jedis.dbSize());
        System.out.println("删除所有数据库中的所有 key：" + jedis.flushAll());
    }
```

对 String 操作的方法

```java
    //操作string
    @Test
    public void testString(){
        Jedis jedis = new Jedis("192.168.197.200", 6379);

        jedis.flushDB();

        System.out.println("=========== 增加数据开始 ===========");
        System.out.println(jedis.set("key1", "value1"));
        System.out.println(jedis.set("key2", "value2"));
        System.out.println(jedis.set("key3", "value3"));

        System.out.println("删除键 key2:" + jedis.del("key2"));
        System.out.println("获取键 key2:" + jedis.get("key2"));
        System.out.println("修改 key1:" + jedis.set("key1", "newValue1"));
        System.out.println("获取 key1 的值：" + jedis.get("key1"));
        System.out.println("在 key3 后面加入值：" + jedis.append("key3", "key4"));
        System.out.println("key3 的值：" + jedis.get("key3"));
        System.out.println("增加多个键值对：" + jedis.mset("key01", "value01", "key02", "value02", "key03", "value03"));
        System.out.println("获取多个键值对：" + jedis.mget("key01", "key02", "key03"));
        System.out.println("获取多个键值对：" + jedis.mget("key01", "key02", "key03", "key04"));
        System.out.println("删除多个键值对：" + jedis.del("key01", "key02"));
        System.out.println("获取多个键值对：" + jedis.mget("key01", "key02", "key03"));
        System.out.println("=========== 增加数据结束 ===========");

        jedis.flushDB();

        System.out.println("=========== 新增键值对防止覆盖原先值开始 ==============");
        System.out.println(jedis.setnx("key1", "value1"));
        System.out.println(jedis.setnx("key2", "value2"));
        System.out.println(jedis.setnx("key2", "value2-new"));
        System.out.println(jedis.get("key1"));
        System.out.println(jedis.get("key2"));
        System.out.println("=========== 新增键值对防止覆盖原先值结束 ==============");

        System.out.println("=========== 新增键值对并设置有效时间开始 =============");
        System.out.println(jedis.setex("key3", 2, "value3"));
        System.out.println(jedis.get("key3"));
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println(jedis.get("key3"));
        System.out.println("=========== 新增键值对并设置有效时间结束 =============");

        System.out.println("=========== 获取原值，更新为新值开始 ==========");
        System.out.println(jedis.getSet("key2", "key2GetSet"));
        System.out.println(jedis.get("key2"));
        System.out.println("获得 key2 的值的字串：" + jedis.getrange("key2", 2,4));
        System.out.println("=========== 获取原值，更新为新值结束 ==========");

    }
```

对List操作的方法

```java
    //操作List
    @Test
    public void testList(){
        Jedis jedis = new Jedis("192.168.197.200", 6379);
        jedis.flushDB();

        System.out.println("===========添加一个 list===========");
        jedis.lpush("collections", "ArrayList", "Vector", "Stack", "HashMap", "WeakHashMap", "LinkedHashMap");
        jedis.lpush("collections", "HashSet");
        jedis.lpush("collections", "TreeSet");
        jedis.lpush("collections", "TreeMap");
        //-1 代表倒数第一个元素，-2 代表倒数第二个元素，end 为 -1 表示查询全部
        System.out.println("collections 的内容：" + jedis.lrange("collections", 0, -1));
        System.out.println("collections 区间 0-3 的元素：" + jedis.lrange("collections", 0, 3));

        System.out.println("===============================");
        // 删除列表指定的值 ，第二个参数为删除的个数（有重复时），后 add 进去的值先被删，类似于出栈
        System.out.println("删除指定元素个数：" + jedis.lrem("collections", 2, "HashMap"));
        System.out.println("collections 的内容：" + jedis.lrange("collections", 0, -1));
        System.out.println("删除下表 0-3 区间之外的元素：" + jedis.ltrim("collections", 0, 3));
        System.out.println("collections 的内容：" + jedis.lrange("collections", 0, -1));
        System.out.println("collections 列表出栈（左端）：" + jedis.lpop("collections"));
        System.out.println("collections 的内容：" + jedis.lrange("collections", 0, -1));
        System.out.println("collections 添加元素，从列表右端，与 lpush 相对应：" + jedis.rpush("collections", "EnumMap"));
        System.out.println("collections 的内容：" + jedis.lrange("collections", 0, -1));
        System.out.println("collections 列表出栈（右端）：" + jedis.rpop("collections"));
        System.out.println("collections 的内容：" + jedis.lrange("collections", 0, -1));
        System.out.println("修改 collections 指定下标 1 的内容：" + jedis.lset("collections", 1, "LinkedArrayList"));
        System.out.println("collections 的内容：" + jedis.lrange("collections", 0, -1));

        System.out.println("===============================");
        System.out.println("collections 的长度：" + jedis.llen("collections"));
        System.out.println("获取 collections 下标为 2 的元素：" + jedis.lindex("collections", 2));

        System.out.println("===============================");
        jedis.lpush("sortedList", "3", "6", "2", "0", "7", "4");
        System.out.println("sortedList 排序前：" + jedis.lrange("sortedList", 0, -1));
        System.out.println(jedis.sort("sortedList"));
        System.out.println("sortedList 排序后：" + jedis.lrange("sortedList", 0, -1));
    }
```

对Set操作的方法

```java
    //操作Set
    @Test
    public void testSet(){
        Jedis jedis = new Jedis("192.168.197.200", 6379);
        jedis.flushDB();

        System.out.println("============向集合中添加元素（不重复）============");
        System.out.println(jedis.sadd("eleSet", "e1", "e2", "e4", "e3", "e0", "e8", "e7", "e5"));
        System.out.println(jedis.sadd("eleSet", "e6"));
        System.out.println(jedis.sadd("eleSet", "e6"));
        System.out.println("eleSet 的所有元素为：" + jedis.smembers("eleSet"));
        System.out.println("删除一个元素 e0：" + jedis.srem("eleSet", "e0"));

        System.out.println("eleSet 的所有元素为：" + jedis.smembers("eleSet"));
        System.out.println("删除两个元素 e7 和 e6：" + jedis.srem("eleSet", "e7", "e6"));
        System.out.println("eleSet 的所有元素为：" + jedis.smembers("eleSet"));
        System.out.println("随机的移除集合中的一个元素：" + jedis.spop("eleSet"));
        System.out.println("随机的移除集合中的一个元素：" + jedis.spop("eleSet"));
        System.out.println("eleSet 的所有元素为：" + jedis.smembers("eleSet"));
        System.out.println("eleSet 中包含元素的个数：" + jedis.scard("eleSet"));
        System.out.println("e3 是否在 eleSet 中：" + jedis.sismember("eleSet", "e3"));
        System.out.println("e1 是否在 eleSet 中：" + jedis.sismember("eleSet", "e1"));
        System.out.println("e1 是否在 eleSet 中：" + jedis.sismember("eleSet", "e5"));

        System.out.println("=================================");
        System.out.println(jedis.sadd("eleSet1", "e1", "e2", "e4", "e3", "e0", "e8", "e7", "e5"));
        System.out.println(jedis.sadd("eleSet2","e1", "e2", "e4", "e3", "e0", "e8"));
        // 移到集合元素
        System.out.println("将 eleSet1 中删除 e1 并存入 eleSet3 中：" + jedis.smove("eleSet1", "eleSet3", "e1"));
        System.out.println("将 eleSet1 中删除 e2 并存入 eleSet3 中：" + jedis.smove("eleSet1", "eleSet3", "e2"));
        System.out.println("eleSet1 中的元素：" + jedis.smembers("eleSet1"));
        System.out.println("eleSet3 中的元素：" + jedis.smembers("eleSet3"));

        System.out.println("============集合运算=================");
        System.out.println("eleSet1 中的元素：" + jedis.smembers("eleSet1"));
        System.out.println("eleSet2 中的元素：" + jedis.smembers("eleSet2"));
        System.out.println("eleSet1 和 eleSet2 的交集:" + jedis.sinter("eleSet1", "eleSet2"));
        System.out.println("eleSet1 和 eleSet2 的并集:" + jedis.sunion("eleSet1", "eleSet2"));
        // eleSet1 中有，eleSet2 中没有
        System.out.println("eleSet1和eleSet2的差集:" + jedis.sdiff("eleSet1", "eleSet2"));
        // 求交集并将交集保存到 dstkey 的集合
        jedis.sinterstore("eleSet4", "eleSet1", "eleSet2");
        System.out.println("eleSet4 中的元素：" + jedis.smembers("eleSet4"));
    }
```

对Hash操作的方法

```java
    //操作Hash
    @Test
    public void testHash(){

        Jedis jedis = new Jedis("192.168.197.200", 6379);
        jedis.flushDB();
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        map.put("key3", "value3");
        map.put("key4", "value4");
        //添加名称为hash（key）的hash元素
        jedis.hmset("hash", map);
        //向名称为hash的hash中添加key为key5，value为value5元素
        jedis.hset("hash", "key5", "value5");
        System.out.println("散列hash的所有键值对为：" + jedis.hgetAll("hash"));//return Map<String,String>

        System.out.println("散列hash的所有键为：" + jedis.hkeys("hash"));//returnSet<String>
        System.out.println("散列hash的所有值为：" + jedis.hvals("hash"));//returnList<String>
        System.out.println("将key6保存的值加上一个整数，如果key6不存在则添加key6：" + jedis.hincrBy("hash", "key6", 6));
        System.out.println("散列hash的所有键值对为：" + jedis.hgetAll("hash"));
        System.out.println("将key6保存的值加上一个整数，如果key6不存在则添加key6：" + jedis.hincrBy("hash", "key6", 3));
        System.out.println("散列hash的所有键值对为：" + jedis.hgetAll("hash"));
        System.out.println("删除一个或者多个键值对：" + jedis.hdel("hash", "key2"));
        System.out.println("散列hash的所有键值对为：" + jedis.hgetAll("hash"));
        System.out.println("散列hash中键值对的个数：" + jedis.hlen("hash"));
        System.out.println("判断hash中是否存在key2：" + jedis.hexists("hash", "key2"));
        System.out.println("判断hash中是否存在key3：" + jedis.hexists("hash", "key3"));
        System.out.println("获取hash中的值：" + jedis.hmget("hash", "key3"));
        System.out.println("获取hash中的值：" + jedis.hmget("hash", "key3", "key4"));
    }
```

### 事务

这里涉及到了 Redis 的三个事务命令，因为 Redis 事务的内容在后面，所以可以先停下来，去学习 Redis 事务再来看，或者先看这个，再看事务，理解可能更佳！

```java
public class TestMulti {
    public static void main(String[] args) {
        // 创建客户端连接服务端，redis 服务端需要被开启
        Jedis jedis = new Jedis("192.168.197.200", 6379);
        jedis.flushDB();
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("hello", "world");
        jsonObject.put("name", "java");
        
        // 开启事务
        Transaction multi = jedis.multi();
        String result = jsonObject.toJSONString();
        try {
            // 向 redis 存入一条数据
            multi.set("json", result);
            // 再存入一条数据
            multi.set("json2", result);
            // 这里引发了异常，用 0 作为被除数
            int i = 100 / 0;
            // 如果没有引发异常，执行进入队列的命令
            multi.exec();
        } catch (Exception e) {
            e.printStackTrace();
            // 如果出现异常，回滚
            multi.discard();
        } finally {
            System.out.println(jedis.get("json"));
            System.out.println(jedis.get("json2"));
            // 最终关闭客户端
            jedis.close();
        }
    }
}
```

### 随机验证码案例

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220615/image.3voo67if0pk0.webp)

```java
public class PhoneCode {

    private static String phone="18129035311";

    public static void main(String[] args) {

        String code = getCode();
        System.out.println(code);
        verifyCode(phone);
        getRedisCode(phone,"123456");
    }

    //1.生成六位的数字验证码
    public static String getCode(){
        Random  random=new Random();
        StringBuffer code = new StringBuffer();
        for (int i = 0; i < 6; i++) {
            int rand = random.nextInt(10);
            code.append(rand);
        }
        return code.toString();
    }

    //2.每个手机每天只能发送三次验证码，放到redis中去，设置过期时间
    public static void verifyCode(String phone){
        //连接redis
        Jedis jedis = new Jedis("192.168.197.200", 6379);

        //拼接key
        //手机发送次数key
        String countKey="VerifyCode+"+phone+":count";
        //验证码key
        String codeKey="VerifyCode"+phone+":code";
        
        //每个手机每天只能发送三次
        String count = jedis.get(countKey);
        if(count==null){
            //没有发送次数，第一次发送
            jedis.setex(countKey,24*60*60,"1");
        }else if (Integer.parseInt(count)<=2){
            //发送次数加一
            jedis.incr(countKey);

        }else if(Integer.parseInt(count)>2){
            //发送三次，不能再发送
            System.out.println("今天发送次数已经超过了三次");
            jedis.close();
        }

        //发送的验证码可以放到redis里面去
        String vcode = getCode();
        jedis.setex(codeKey,120,vcode);
        jedis.close();
        return;

    }

    //3.验证码校验
    public static void getRedisCode(String phone,String code){

        //从redis获取验证码
        Jedis jedis = new Jedis("192.168.197.200", 6379);
        String codeKey="VerifyCode"+phone+":code";
        String redisCode = jedis.get(codeKey);
        //判断
        if(redisCode.equals(code)){
            System.out.println("成功");
        }else {
            System.out.println("失败");
        }
    jedis.close();
    }
}
```

## SpringBoot整合Redis

在 Spring Boot 中一般使用 RedisTemplate 提供的方法来操作 Redis。那么使用 Spring Boot 整合 Redis 需要如下步骤：

- JedisPoolConfig：这个是配置连接池
- RedisConnectionFactory：这个是配置连接信息，这里的 RedisConnectionFactory 是一个接口，我们需要使用它的实现类，在 Spring Data Redis 方案中提供了以下四种工厂模型：
  - JredisConnectionFactory
  - JedisConnectionFactory
  - LettuceConnectionFactory
  - SrpConnectionFactory
- RedisTemplate 基本操作

### 基础使用

+ 创建 Spring Boot 项目
+ 引入依赖

```xml
<!-- redis   -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<!-- spring 2.X 集成 redis 所需 common-pool2-->
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-pool2</artifactId>
    <version>2.6.0</version>
</dependency>
```

说明：在 Spring Boot 2.x 之后，原来使用的 jedis 被替换成 lettuce

+ 配置文件

```yaml
# Redis 服务器地址
spring.redis.host=192.168.197.200

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

