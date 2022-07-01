---
title: 缓存
date: 2022-02-17 16:17:21
permalink: /pages/c47d25/
categories:
  - MyBatis
tags:
  - MyBatis
---
# 缓存

[[toc]]

## 缓存介绍

[MyBatis官方文档](https://mybatis.org/mybatis-3/zh/sqlmap-xml.html#cache)

MyBatis 包含一个非常强大的查询缓存特性，它可以非常方便地配置和定制。缓存可以极大的提升查询效率。

MyBatis系统中默认定义了两级缓存，一级缓存和二级缓存。

1. 默认情况下，只有一级缓存（ SqlSession级别的缓存，也称为本地缓存）开启。
2. 二级缓存需要手动开启和配置，他是基于namespace级别的缓存。
3. 为了提高扩展性。 MyBatis定义了缓存接口Cache。我们可以通过实现Cache接口来自定义二级缓存

## 一级缓存体验

### 一级缓存

+ 一级缓存(local cache)，即本地缓存，作用域默认为sqlSession。当 Session flush 或 close 后, 该Session 中的所有 Cache 将被清空。
+ 本地缓存不能被关闭, 但可以调用 clearCache() 来清空本地缓存, 或者改变缓存的作用域.
+ 在mybatis3.1之后, 可以配置本地缓存的作用域. 在 mybatis.xml 中配置

| -               | -                                                            | -                 | -       |
| --------------- | ------------------------------------------------------------ | ----------------- | ------- |
| localCacheScope | MyBatis利用本地缓存机制( Local Cache )防止循环引用( circular references )和加速重复嵌套查询。**默认值为SESSION，这种情况下会缓存一个会话中执行的所有查询若设置值为STATEMENT，本地会话仅用在语句执行上，对相同SqlSession的不同调用将不会共享数据。** | SESSION/STATEMENT | SESSION |

### 一级缓存体验

```java
/**
     * 两级缓存:
     * 一级缓存:(本地缓存):
     *      与数据库同一次会话期间查询到的数据会放在本地缓存中
     *      以后如果需要获取相同的数据直接从缓存中拿，没必要再去查询数据库；
     *
     * 二级缓存:(全局缓存):
     */

    @Test
    public void testFirstCache() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession();

        try {
            EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
            Employee emp01 = mapper.getEmpById(1);
            Employee emp02 = mapper.getEmpById(1);
            System.out.println(emp01);
            System.out.println(emp02);
            System.out.println(emp01==emp02);
        }finally {
            openSession.close();
        }
    }
```

输出结果:

```java
DEBUG 02-17 12:19:21,187 ==>  Preparing: select id,last_name lastName,gender,email from tbl_employee where id=?   (BaseJdbcLogger.java:145) 
DEBUG 02-17 12:19:21,217 ==> Parameters: 1(Integer)  (BaseJdbcLogger.java:145) 
DEBUG 02-17 12:19:21,237 <==      Total: 1  (BaseJdbcLogger.java:145) 
Employee{id=1, lastName='admin', email='jerry@123.com', gender='0'}
Employee{id=1, lastName='admin', email='jerry@123.com', gender='0'}
true

Process finished with exit code 0
```

## 一级缓存失效的四种情况

同一次会话期间只要查询过的数据都会保存在当前SqlSession的一个Map中

+ key = hashCode + 查询的SqlId + 编写的sql查询语句 + 参数

一级缓存失效的四种情况：

1. 不同的SqlSession对应不同的一级缓存
2. 同一个SqlSession但是查询条件不同
3. 同一个SqlSession两次查询期间执行了任何一次**增删改**操作
4. 同一个SqlSession两次查询期间手动清空了缓存

## 二级缓存介绍

+ 二级缓存(second level cache)，全局作用域缓存
+ 二级缓存默认不开启，需要手动配置
+ MyBatis提供二级缓存的接口以及实现，缓存实现要求 POJO实现Serializable接口
+ **二级缓存在 SqlSession 关闭或提交之后才会生效**

+ 使用步骤    

1. 全局配置文件中开启二级缓存      
   - `<setting name="cacheEnabled" value="true"/>`
2. 需要使用二级缓存的映射文件处使用cache配置缓存      
   - `<cache />`
3. **注意**： POJO需要实现Serializable接口

cache标签的属性：

+ eviction:缓存的回收策略：
  + LRU – 最近最少使用的：移除最长时间不被使用的对象。
  + FIFO – 先进先出：按对象进入缓存的顺序来移除它们。
  + SOFT – 软引用：移除基于垃圾回收器状态和软引用规则的对象。
  + WEAK – 弱引用：更积极地移除基于垃圾收集器状态和弱引用规则的对象。
  + 默认的是 LRU
+ flushInterval：缓存刷新间隔
  + 缓存多长时间清空一次，默认不清空，设置一个毫秒值
+ readOnly:是否只读
  + true：只读；mybatis认为所有从缓存中获取数据的操作都是只读操作，不会修改数据。mybatis为了加快获取速度，直接就会将数据在缓存中的引用交给用户。不安全，速度快
  + false：非只读：mybatis觉得获取的数据可能会被修改。mybatis会利用序列化&反序列的技术克隆一份新的数据给你。安全，速度慢
+ size：缓存存放多少元素
+ type=""：指定自定义缓存的全类名
  + 实现Cache接口即可

## 二级缓存使用&细节

使用步骤:

1. 全局配置文件中开启二级缓存
   1. `<setting name="cacheEnabled" value="true"/>`
2. 需要使用二级缓存的映射文件处使用cache配置缓存
   1. `<cache />`
3. **注意**： POJO需要实现Serializable接口

mybatis-config.xml

```xml
 <setting name="mapUnderscoreToCamelCase" value="true"/>
```

Employee.java

```java
	public class Employee implements Serializable {
}
```

EmployeeMapper.xml

```xml
<cache eviction="FIFO" flushInterval="6000" readOnly="false" size="1024" ></cache>
```

MyBaseTest.java

```java
    @Test
    public void testSecondLevelCache() throws IOException {
        SqlSessionFactory sqlSessionFactory = getSqlSessionFactory();
        SqlSession openSession = sqlSessionFactory.openSession();
        SqlSession openSession2 = sqlSessionFactory.openSession();
        try {
            EmployeeMapper mapper = openSession.getMapper(EmployeeMapper.class);
            EmployeeMapper mapper2 = openSession2.getMapper(EmployeeMapper.class);

            Employee emp01 = mapper.getEmpById(1);
            System.out.println(emp01);
            openSession.close();


            Employee emp02 = mapper2.getEmpById(1);
            System.out.println(emp02);
            System.out.println(emp01==emp02);

        }finally {
            openSession2.close();
        }
    }
```

输出结果:

```java
DEBUG 02-25 21:49:31,359 ==>  Preparing: select id,last_name lastName,gender,email from tbl_employee where id=?   (BaseJdbcLogger.java:145) 
DEBUG 02-25 21:49:31,399 ==> Parameters: 1(Integer)  (BaseJdbcLogger.java:145) 
DEBUG 02-25 21:49:31,409 <==      Total: 1  (BaseJdbcLogger.java:145) 
Employee{id=1, lastName='admin', email='jerry@123.com', gender='0'}
DEBUG 02-25 21:49:31,409 ==>  Preparing: select id,last_name lastName,gender,email from tbl_employee where id=?   (BaseJdbcLogger.java:145) 
DEBUG 02-25 21:49:31,409 ==> Parameters: 1(Integer)  (BaseJdbcLogger.java:145) 
DEBUG 02-25 21:49:31,419 <==      Total: 1  (BaseJdbcLogger.java:145) 
Employee{id=1, lastName='admin', email='jerry@123.com', gender='0'}
false

Process finished with exit code 0
```

::: tip

数据会从二级缓存中获取，查出的数据都会被默认先放在一级缓存中。只有会话提交或者关闭以后，一级缓存中的数据才会转移到二级缓存中。

:::

## 缓存有关的设置以及属性

1. 全局setting的cacheEnable：

   – 配置二级缓存的开关。一级缓存一直是打开的。

2. select标签的useCache属性：

   – 配置这个select是否使用二级缓存。一级缓存一直是使用的

3. 每个增删改标签的flushCache属性：
   – 增删改默认flushCache=true。sql执行以后，会同时清空一级和二级缓存。查询默认flushCache=false。

4. sqlSession.clearCache()：

   – 只是用来清除一级缓存。

5. 全局setting的localCacheScope：本地缓存作用域：（一级缓存SESSION），当前会话的所有数据保存在会话缓存中；STATEMENT：可以禁用一级缓存。

## 缓存原理图示

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/04/01.png)

## 第三方缓存整合原理

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/04/02.png)

+ EhCache 是一个纯Java的进程内缓存框架，具有快速、精干等特点，是Hibernate中默认的CacheProvider。
+ MyBatis定义了Cache接口方便我们进行自定义扩展。

```java
package org.apache.ibatis.cache;

import java.util.concurrent.locks.ReadWriteLock;

public interface Cache {

  String getId();

  void putObject(Object key, Object value);

  Object getObject(Object key);

  Object removeObject(Object key);

  void clear();

  int getSize();
  
  ReadWriteLock getReadWriteLock();

}
```

## MyBatis整合EHCache

### 添加依赖

```xml
    <dependencies>
        <!--  Mybatis核心  -->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.7</version>
        </dependency>
        <!--  junit测试  -->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
        <!--  MySQL驱动  -->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.3</version>
        </dependency>
        <!--  log4j日志  -->
        <dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
        </dependency>
        <!--  Mybatis EHCache整合包  -->
        <dependency>
            <groupId>org.mybatis.caches</groupId>
            <artifactId>mybatis-ehcache</artifactId>
            <version>1.2.1</version>
        </dependency>
        <!--  slf4j日志门面的一个具体实现  -->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.2.3</version>
       </dependency>
    </dependencies>
```

| jar包名称       | 作用                           |
| --------------- | ------------------------------ |
| mybatis-ehcache | Mybatis和EHCache的整合包       |
| echache         | EHCache核心包                  |
| sl4j-api        | SL4J日志门面包                 |
| logback-classic | 支持SL4J门面接口的一个具体实现 |

### 创建EHCache的配置文件ehcache.xml

```xml
<?xml version="1.0" encoding="utf-8" ?>
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="../config/ehcache.xsd">
    <!-- 磁盘保存路径 -->
    <diskStore path="D:\atguigu\ehcache"/>
    <defaultCache
            maxElementsInMemory="1000"
            maxElementsOnDisk="10000000"
            eternal="false"
            overflowToDisk="true"
            timeToIdleSeconds="120"
            timeToLiveSeconds="120"
            diskExpiryThreadIntervalSeconds="120"
            memoryStoreEvictionPolicy="LRU">
    </defaultCache>
</ehcache>
```

### 设置二级缓存的类型

```xml
<cache type="org.mybatis.caches.ehcache.EhcacheCache"/>
```

### 加入logback日志

存在SLF4J时，作为简易日志的log4j将失效，此时我们需要借助SLF4J的具体实现logback来打印日志。
创建logback的配置文件logback.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration debug="true">
    <!-- 指定日志输出的位置 -->
    <appender name="STDOUT"
              class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
    <!-- 日志输出的格式 -->
    <!-- 按照顺序分别是：时间、日志级别、线程名称、打印日志的类、日志主体内容、换行 -
    ->
    <pattern>[%d{HH:mm:ss.SSS}] [%-5level] [%thread] [%logger]
    [%msg]%n</pattern>
    </encoder>
    </appender>
    <!-- 设置全局日志级别。日志级别按顺序分别是：DEBUG、INFO、WARN、ERROR -->
    <!-- 指定任何一个日志级别都只打印当前级别和后面级别的日志。 -->
    <root level="DEBUG">
        <!-- 指定打印日志的appender，这里通过“STDOUT”引用了前面配置的appender -->
        <appender-ref ref="STDOUT" />
    </root>
    <!-- 根据特殊需求指定局部日志级别 -->
    <logger name="com.atguigu.crowd.mapper" level="DEBUG"/>
</configuration>
```

### EHCache配置文件说明

| 属性名                          | 是否必须 | 作用                                                         |
| ------------------------------- | -------- | ------------------------------------------------------------ |
| maxElementsInMemory             | 是       | 在内存中缓存的element的最大数目                              |
| maxElementsOnDisk               | 是       | 在磁盘上缓存的element的最大数目，若是0表示无穷大             |
| eternal                         | 是       | 设定缓存的elements是否永远不过期。 如果为true，则缓存的数据始终有效， 如果为false那么还要根据timeToIdleSeconds、timeToLiveSeconds判断 |
| overflowToDisk                  | 是       | 设定当内存缓存溢出的时候是否将过期的element缓存到磁盘上      |
| timeToIdleSeconds               | 否       | 当缓存在EhCache中的数据前后两次访问的时间超过timeToIdleSeconds的属性取值时， 这些数据便会删除，默认值是0,也就是可闲置时间无穷大 |
| timeToLiveSeconds               | 否       | 缓存element的有效生命期，默认是0.,也就是element存活时间无穷大 |
| diskSpoolBufferSizeMB           | 否       | DiskStore(磁盘缓存)的缓存区大小。默认是30MB。每个Cache都应该有自己的一个缓冲区 |
| diskPersistent                  | 否       | 在VM重启的时候是否启用磁盘保存EhCache中的数据，默认是false。 |
| diskExpiryThreadIntervalSeconds | 否       | 磁盘缓存的清理线程运行间隔，默认是120秒。每个120s， 相应的线程会进行一次EhCache中数据的清理工作 |
| memoryStoreEvictionPolicy       | 否       | 当内存缓存达到最大，有新的element加入的时候， 移除缓存中element的策略。 默认是LRU（最近最少使用），可选的有LFU（最不常使用）和FIFO（先进先出） |

**另外**：

参照缓存： 若想在命名空间中共享相同的缓存配置和实例。可以使用 cache-ref 元素来引用另外一个缓存。

```xml
<mapper namespace="com.frx01.mybatis.dao.DepartmentMapper">
	<!-- 引用缓存：namespace：指定和哪个名称空间下的缓存一样 -->
	<cache-ref namespace="com.frx01.mybatis.dao.EmployeeMapper"/>
```

