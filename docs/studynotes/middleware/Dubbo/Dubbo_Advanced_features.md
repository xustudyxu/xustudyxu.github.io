---
title: Dubbo 高级特性
date: 2022-08-11 02:24:32
permalink: /middleware/Dubbo/Dubbo_Advanced_features
categories:
  - Dubbo
tags:
  - Dubbo
---
# Dubbo 高级特性

[[toc]]

## dubbo-admin

+ dubbo-admin管理平台，是图形化的服务管理页面

+ 从注册中心中获取到所有的提供者 / 消费者进行配置管理
+ 路由规则、动态配置、服务降级、访问控制、权重调整、负载均衡等管理功能

+ dubbo-admin 是一个前后端分离的项目。前端使用vue，后端使用springboot
+ 安装dubbo-admin 其实就是部署该项目

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220808/image.oo29wlcrhuo.webp)

### dubbo-admin 安装

**环境准备**

dubbo-admin 是一个前后端分离的项目。前端使用vue，后端使用springboot，安装 dubbo-admin 其实就是部署该项目。我们将dubbo-admin安装到开发环境上。要保证开发环境有jdk，maven，node.js

安装node**(如果当前机器已经安装请忽略)**

因为前端工程是用vue开发的，所以需要安装node.js，node.js中自带了npm，后面我们会通过npm启动

+ [下载地址](https://nodejs.org/en/)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.7cb32o1x7ls0.webp)

**下载 Dubbo-Admin**

进入github，搜索dubbo-admin

+ [下载地址](https://github.com/apache/dubbo-admin)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.739d6xuhk700.webp)

+ 可以通过下载ZIP包的方式。如果安装的有git,也可以使用git命令

```sh
git clone git@github.com:apache/dubbo-admin.git
```

+ 把下载的zip包解压到指定文件夹(解压到那个文件夹随意)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.55ug59dta5s0.webp)

+ 修改配置文件,解压后我们进入…\dubbo-admin-develop\dubbo-admin-server\src\main\resources目录

  找到 **application.properties** 配置文件 进行配置修改

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.1v2cqfl6nmw0.webp)

+ 修改zookeeper地址

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.1k4sjv2uud0g.webp)

```properties
# centers in dubbo2.7
admin.registry.address=zookeeper://192.168.91.200:2181
admin.config-center=zookeeper://192.168.91.200:2181
admin.metadata-report.address=zookeeper://192.168.91.200:2181
```

admin.registry.address注册中心
admin.config-center 配置中心
admin.metadata-report.address元数据中心

- 打包项目

在 dubbo-admin-develop 目录执行打包命令

```sh
mvn  clean package
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.475fknv97zs0.webp)

+ 启动后端

切换到目录

```sh
dubbo-Admin-develop\dubbo-admin-distribution\target>
```

执行下面的命令启动 dubbo-admin，dubbo-admin后台由SpringBoot构建。

```sh
java -jar .\dubbo-admin-0.1.jar
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.4ik4j9cd4oa0.webp)

**前台后端**

dubbo-admin-ui 目录下执行命令

```sh
npm run dev
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.3x3rvit5z3g0.webp)

### 访问测试

+ [http://localhost:8081/](http://localhost:8081/)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.1qcdwi5j1lb.webp)

### dubbo-admin简单使用

注意:Dubbo Admin【服务Mock】【服务统计】将在后续版本发布....

在上面的步骤中，我们已经进入了Dubbo-Admin的主界面，在【快速入门】章节中，我们定义了服务生产者、和服务消费者，下面我们从Dubbo-Admin管理界面找到这个两个服务

#### 点击服务查询

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.5m441o5w2lw0.webp)

#### 查看详情

我们查看com.frx01.service.UserService （服务提供者）的具体详细信息，包含【元数据信息】

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.17ni2egsi9uo.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.7cswnyksevc0.webp)

从【详情】界面查看，主要分为3个区域

A区域：主要包含服务端 基础信息比如服务名称、应用名称等

B区域：主要包含了生产者、消费者一些基本信息

**C区域：是元数据信息，注意看上面的图,元数据信息是空的**

我们需要打开我们的生产者配置文件加入下面配置

```xml
<!-- 元数据配置 -->
<dubbo:metadata-report address="zookeeper://192.168.91.200:2181" />
```
#### 服务测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.242ecsvjjvgg.webp)

## dubbo 常用高级配置

### 序列化

**两个机器传输数据，如何传输Java对象?**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.1e1ihubntj7k.webp)

+ dubbo 内部已经将序列化和反序列化的过程内部封装了
+ 我们只需要在定义pojo类时实现Serializable接口即可
+ 一般会定义一个公共的pojo模块，让生产者和消费者都依赖该模块。

#### 新建dubbo-pojo模块

+ 创建User类

```java
//注意：将来所有的pojo都需要实现Serializable接口
public class User implements Serializable {
    private int id;
    private String username;
    private String password;
	//+set()与get()方法，和AllArgsConstructor
}
```

#### 在模块dubbo-interface中添加dubbo-pojo模块的依赖

```xml
    <dependencies>
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>dubbo-pojo</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
    </dependencies>
```

+ 在dubbo-interface模块中添加方法

```java
    //查询用户
    public User findUserById(int id);
```

+ 在dubbo-service模块中重写方法

```java
    @Override
    public User findUserById(int id) {
        //查询User对象
        User user = new User(1, "zhangsan", "123");
        return user;
    }
```

### 测试

+ 访问[http://localhost:8000/user/find.do?id=1](http://localhost:8000/user/find.do?id=1)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.788h0chy1k80.webp)

## 地址缓存

> **注册中心挂了，服务是否可以正常访问？**

+ 可以，因为dubbo服务消费者在第一次调用时，会将服务提供方地址缓存到本地，以后在调用则不会访问注册中心。
+ 当服务提供者地址发生变化时，注册中心会通知服务消费者。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220808/image.oo29wlcrhuo.webp)

## 超时与重试

- 服务消费者在调用服务提供者的时候发生了阻塞、等待的情形，这个时候，服务消费者会一直等待下去。
- 在某个峰值时刻，大量的请求都在同时请求服务消费者，会造成线程的大量堆积，势必会造成雪崩。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.4om4icxxt7a0.webp)

+ dubbo 利用超时机制来解决这个问题，设置一个超时时间，在这个时间段内，无法完成服务访问，则自动断开连接。
+ 使用timeout属性配置超时时间，默认值1000，单位毫秒。

### 修改UserServiceImpl

```java {2,14-19}
//将这这类提供的方法(服务)对外发布，将访问的地址,ip,端口,路径注册到注册中心中
@Service(timeout = 3000)//当前服务3秒超时
public class UserServiceImpl implements UserService {

    @Override
    public String sayHello() {
        return "hello,dubbo~";
    }

    @Override
    public User findUserById(int id) {
        //查询User对象
        User user = new User(1, "zhangsan", "123");
        //假如数据库查询很慢，查了5秒
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return user;
    }
}
```

+ 测试，报超时异常

```java
org.apache.dubbo.remoting.TimeoutException: Waiting server-side response timeout by scan timer. start time: 2022-08-11 00:18:54.577, end time: 2022-08-11 00:18:57.606, client elapsed: 0 ms, server elapsed: 3029 ms, timeout: 3000 ms, request: Request [id=2, version=2.0.2, twoway=true, event=false, broken=false, data=RpcInvocation [methodName=findUserById, parameterTypes=[int], arguments=[1], attachments={path=com.frx01.service.UserService, remote.application=dubbo-web, interface=com.frx01.service.UserService, version=0.0.0, timeout=3000}]], channel: /10.19.242.91:56864 -> /10.19.242.91:20880
	at org.apache.dubbo.remoting.exchange.support.DefaultFuture.doReceived(DefaultFuture.java:189)
	at org.apache.dubbo.remoting.exchange.support.DefaultFuture.received(DefaultFuture.java:153)
	at org.apache.dubbo.remoting.exchange.support.DefaultFuture$TimeoutCheckTask.run(DefaultFuture.java:258)
	at org.apache.dubbo.common.timer.HashedWheelTimer$HashedWheelTimeout.expire(HashedWheelTimer.java:648)
	at org.apache.dubbo.common.timer.HashedWheelTimer$HashedWheelBucket.expireTimeouts(HashedWheelTimer.java:727)
	at org.apache.dubbo.common.timer.HashedWheelTimer$Worker.run(HashedWheelTimer.java:449)
	at java.lang.Thread.run(Thread.java:748)
```

::: tip 注意

```java
@Reference//远程注入，也有超时属性
@Reference(timeout = 1) //远程注入
```

:::

### 修改UserController

```java {10}
@RestController
@RequestMapping("/user")
public class UserController {

    /**
     * 1.从zookeeper注册中心获取userService的访问url
     * 2.远程的调用RPC
     * 3.将结果封装为代理的对象，给变量赋值
     */
    @Reference(timeout = 1000) //远程注入，当前服务一秒超时
    private UserService userService;

    @RequestMapping("/sayHello")
    public String sayHello(){
        return userService.sayHello();
    }

    /**
     * 根据id查询用户信息
     * @param id
     * @return
     */
    @RequestMapping("/find")
    public User findUserById(int id){
        return userService.findUserById(id);
    }
}
```

::: warning 问题

可以发现，出现了个问题，究竟是@Service注解超时3秒生效，还是@Reference注解超时1秒生效。

:::

> 经过测试，服务生产方的超时时间覆盖了消费方的超时时间，但是超时时间在服务的生产方或者消费方单独地都生效，建议把超时时间配置在服务的生产方

### 重试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.4bympibnr1s0.webp)

- 设置了超时时间，在这个时间段内，无法完成服务访问，则自动断开连接。
- 如果出现网络抖动，则这一次请求就会失败。
- Dubbo 提供重试机制来避免类似问题的发生。
- 通过 retries  属性来设置重试次数。默认为 2 次。

### 修改UserServiceImpl

```java {2}
//将这这类提供的方法(服务)对外发布，将访问的地址,ip,端口,路径注册到注册中心中
@Service(timeout = 3,retries = 2)//当前服务3秒超时,重试两次，一共三次
public class UserServiceImpl implements UserService {

    @Override
    public String sayHello() {
        return "hello,dubbo~";
    }

    int i =1;
    @Override
    public User findUserById(int id) {

        System.out.println("服务被调用了:"+i+++"次");
        //查询User对象
        User user = new User(1, "zhangsan", "123");
        //假如数据库查询很慢，查了5秒
        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return user;
    }
}
```

+ 测试后报错

```java
服务被调用了:1
服务被调用了:2
服务被调用了:3
 WARN 2022-08-11 00:20:22,923 org.apache.dubbo.rpc.filter.TimeoutFilter$TimeoutListener:  [DUBBO] invoke time out. method: findUserById arguments: [1] , url is dubbo://10.19.242.91:20880/com.frx01.service.UserService?anyhost=true&application=dubbo-service&bean.name=ServiceBean:com.frx01.service.UserService&bind.ip=10.19.242.91&bind.port=20880&deprecated=false&dubbo=2.0.2&dynamic=true&generic=false&interface=com.frx01.service.UserService&methods=sayHello,findUserById&pid=22460&release=2.7.4.1&revision=1.0-SNAPSHOT&side=provider&timeout=3000&timestamp=1660148406833, invoke elapsed 5009 ms., dubbo version: 2.7.4.1, current host: 10.19.242.91
```

## 多版本

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.67v72tso2ss0.webp)

+ 灰度发布：当出现新功能时，会让一部分用户先使用新功能，用户反馈没问题时，再将所有用户迁移到新功能。
+ dubbo 中使用version 属性来设置和调用同一个接口的不同版本

### 修改UserServiceImpl

```java {1}
@Service(version = "v1.0")
public class UserServiceImpl implements UserService {

    @Override
    public String sayHello() {
        return "hello,dubbo~";
    }
    
    @Override
    public User findUserById(int id) {

        System.out.println("old...");

        //查询User对象
        User user = new User(1, "zhangsan", "123");

        return user;
    }
}
```

### 新增UserServiceImpl2

```java {1}
@Service(version = "v2.0")
public class UserServiceImpl2 implements UserService {

    @Override
    public String sayHello() {
        return "hello,dubbo~";
    }

    @Override
    public User findUserById(int id) {

        System.out.println("new...");

        //查询User对象
        User user = new User(1, "zhangsan", "123");

        return user;
    }
}
```

### 修改UserController

```java {10}
@RestController
@RequestMapping("/user")
public class UserController {

    /**
     * 1.从zookeeper注册中心获取userService的访问url
     * 2.远程的调用RPC
     * 3.将结果封装为代理的对象，给变量赋值
     */
    @Reference(version = "v1.0") //远程注入
    private UserService userService;

    @RequestMapping("/sayHello")
    public String sayHello(){
        return userService.sayHello();
    }

    /**
     * 根据id查询用户信息
     * @param id
     * @return
     */
    @RequestMapping("/find")
    public User findUserById(int id){
        return userService.findUserById(id);
    }
}
```

+ 测试

```java
old...
```

+ 将@Reference的version属性修改为v2.0，dubbo-web重新启动，测试

```java
new...
```

## 负载均衡

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.796u40d7npk0.webp)

+ Random ：按权重随机，默认值。按权重设置随机概率。
+ RoundRobin ：按权重轮询

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.26sv25gub94w.webp)

+ LeastActive：最少活跃调用数，相同活跃数的随机。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.1uvybtq4843k.webp)

+ ConsistentHash：一致性 Hash，相同参数的请求总是发到同一提供者。

### 修改UserServiceImpl

```java {1,6}
@Service(weight = 100)
public class UserServiceImpl implements UserService {

    @Override
    public String sayHello() {
        return "1.......";
    }

    @Override
    public User findUserById(int id) {

        //查询User对象
        User user = new User(1, "zhangsan", "123");
        return user;
    }
}
```

### 启动第一台机器

### 修改UserServiceImpl

```java {1,6}
@Service(weight = 200)
public class UserServiceImpl implements UserService {

    @Override
    public String sayHello() {
        return "2......";
    }

    @Override
    public User findUserById(int id) {

        //查询User对象
        User user = new User(1, "zhangsan", "123");
        return user;
    }
}
```

### 修改applicationContext.xml

```xml {3,5-7}
	<!--<context:component-scan base-package="com.frx01.service"/>-->
	<!--dubbo的配置-->
	<dubbo:protocol port="20882"/>
	<!--1.项目的名称-->
	<dubbo:application name="dubbo-service">
		<dubbo:parameter key="qos.port" value="4444"/>
	</dubbo:application>
	<!--2.配置一下注册中心的地址-->
	<dubbo:registry address="zookeeper://192.168.91.200:2181"/>
	<!--3.配置dubbo包扫描-->
	<dubbo:annotation package="com.frx01.service.impl"/>
	<dubbo:metadata-report address="zookeeper://192.168.91.200:2181" />
```

+ 修改pom.xml文件中tomcat启动端口为9002

### 启动第二台机器

+ 使用dubbo-admin查看服务

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.1bdla5oh43a.webp)

### 修改UserController

```java {10}
@RestController
@RequestMapping("/user")
public class UserController {

    /**
     * 1.从zookeeper注册中心获取userService的访问url
     * 2.远程的调用RPC
     * 3.将结果封装为代理的对象，给变量赋值
     */
    @Reference(loadbalance = "random") //远程注入 //random:按权重随机
    private UserService userService;

    @RequestMapping("/sayHello")
    public String sayHello(){
        return userService.sayHello();
    }

    /**
     * 根据id查询用户信息
     * @param id
     * @return
     */
    @RequestMapping("/find")
    public User findUserById(int id){
        return userService.findUserById(id);
    }
}
```

+ 经过测试，发现第二台的机器服务生成的概率更高些

## 集群容错

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.2udthynuq3u0.webp)

集群容错模式：

+ Failover Cluster：失败重试。默认值。当出现失败，重试其它服务器 ，默认重试2次，使用 retries 配置。一般用于读操作
+ Failfast Cluster ：快速失败，只发起一次调用，失败立即报错。通常用于写操作。
+ Failsafe Cluster ：失败安全，出现异常时，直接忽略。返回一个空结果。
+ Failback Cluster ：失败自动恢复，后台记录失败请求，定时重发。通常用于消息通知操作。
+ Forking Cluster ：并行调用多个服务器，只要一个成功即返回。
+ Broadcast  Cluster ：广播调用所有提供者，逐个调用，任意一台报错则报错。

### 第一台机器

```java
@Service
public class UserServiceImpl implements UserService {

    @Override
    public String sayHello() {
        return "hello dubbo Test~";
    }

    @Override
    public User findUserById(int id)  {
        System.out.println("1...");
        //查询User对象
        User user = new User(1, "zhangsan", "123");
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return user;
    }
}
```

+ 启动此机器

### 第二台机器

```java
@Service
public class UserServiceImpl implements UserService {

    @Override
    public String sayHello() {
        return "hello dubbo Test~";
    }

    @Override
    public User findUserById(int id)  {
        System.out.println("2...");
        //查询User对象
        User user = new User(1, "zhangsan", "123");
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return user;
    }
}
```

```xml
	<!--dubbo的配置-->
	<dubbo:protocol port="20882"/>
	<!--&lt;!&ndash;1.项目的名称&ndash;&gt;-->
	<dubbo:application name="dubbo-service">
		<dubbo:parameter key="qos.port" value="4445"/>
	</dubbo:application>
	<!--2.配置一下注册中心的地址-->
	<dubbo:registry address="zookeeper://192.168.91.200:2181"/>
	<!--3.配置dubbo包扫描-->
	<dubbo:annotation package="com.frx01.service.impl"/>
	<dubbo:metadata-report address="zookeeper://192.168.91.200:2181" />
```

+ 修改tomcat端口为9002

+ 启动此机器

### 第三台机器

```java
@Service
public class UserServiceImpl implements UserService {

    @Override
    public String sayHello() {
        return "hello dubbo Test~";
    }

    @Override
    public User findUserById(int id)  {
        System.out.println("3...");
        //查询User对象
        User user = new User(1, "zhangsan", "123");
        return user;
    }
}
```

```xml
	<dubbo:protocol port="20888"/>
	<!--&lt;!&ndash;1.项目的名称&ndash;&gt;-->
	<dubbo:application name="dubbo-service">
		<dubbo:parameter key="qos.port" value="4446"/>
	</dubbo:application>
	<!--2.配置一下注册中心的地址-->
	<dubbo:registry address="zookeeper://192.168.91.200:2181"/>
	<!--3.配置dubbo包扫描-->
	<dubbo:annotation package="com.frx01.service.impl"/>
	<dubbo:metadata-report address="zookeeper://192.168.91.200:2181" />
```

+ 修改tomcat端口号为9003

+ 启动此机器

### 使用dubbo-admin查看服务

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.2bo4mskxvlz4.webp)

### 设置集群容错策略

+ 修改UserController

```java {10}
@RestController
@RequestMapping("/user")
public class UserController {

    /**
     * 1.从zookeeper注册中心获取userService的访问url
     * 2.远程的调用RPC
     * 3.将结果封装为代理的对象，给变量赋值
     */
    @Reference(cluster = "failover") //重试 并且重试两次
    private UserService userService;

    @RequestMapping("/sayHello")
    public String sayHello(){
        return userService.sayHello();
    }

    /**
     * 根据id查询用户信息
     * @param id
     * @return
     */
    @RequestMapping("/find")
    public User findUserById(int id){
        return userService.findUserById(id);
    }
}
```

+ 启动dubbo-web,并访问[http://localhost:8000/user/find.do?id=1](http://localhost:8000/user/find.do?id=1)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.5npf2b9mqdk0.webp)

+ 中间dubbo-web报超时错误，超时只是中间错误，依然能返回正确结果

## 服务降级

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.5auqhza16po0.webp)

服务降级方式:

+ mock=force:return null 表示消费方对该服务的方法调用都直接返回null值，不发起远程调用。用来屏蔽不重要服务不可用时对调用方的影响。

+ mock=fail:return null 表示消费方应对该服务的方法调用在失败后，再返回null值，不抛异常。用来容忍不重要服务不稳定时对调用方的影响。

### 启动dubbo-service

### 修改UserServiceImpl

```java {10}
@RestController
@RequestMapping("/user")
public class UserController {

    /**
     * 1.从zookeeper注册中心获取userService的访问url
     * 2.远程的调用RPC
     * 3.将结果封装为代理的对象，给变量赋值
     */
    @Reference(mock = "force:return null")//不再去调用userService的服务了
    private UserService userService;

    @RequestMapping("/sayHello")
    public String sayHello(){
        return userService.sayHello();
    }

    /**
     * 根据id查询用户信息
     * @param id
     * @return
     */
    @RequestMapping("/find")
    public User findUserById(int id){
        return userService.findUserById(id);
    }
}
```

+ 访问测试:[http://localhost:8000/user/find.do?id=1](http://localhost:8000/user/find.do?id=1)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220810/image.43siodrhv4w0.webp)

返回为null,也不报错，一个空白的页面

+ 将@Reference(mock = "force:return null")改为@Reference(mock = "fail:return null"),再次访问

+ 控制台报错，超时，但是仍然是空白的页面