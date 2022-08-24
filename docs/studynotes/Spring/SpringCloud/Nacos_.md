---
title: Nacos 服务发现、配置管理和服务管理平台
date: 2022-08-24 21:17:42
permalink: /Spring/SpringCloud/Nacos_
categories:
  - SpringCloud
tags:
  - SpringCloud
---
# Nacos 服务发现、配置管理和服务管理平台

[[toc]]

## Nacos简介和下载

**为什么叫Nacos**

+ 前四个字母分别为Naming和Configuration的前两个字母，最后的s为Service。

**是什么**

+ 一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
+ Nacos: Dynamic Naming and Configuration Service
+ Nacos就是注册中心＋配置中心的组合 -> Nacos = **Eureka+Config+Bus**

**能干嘛**

- 替代Eureka做服务注册中心
- 替代Config做服务配置中心

去哪下

- [https://github.com/alibaba/nacos/releases](https://github.com/alibaba/nacos/releases)
- [官网文档](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring cloud alibaba nacos_discovery)

**各中注册中心比较**

| 服务注册与发现框架 | CAP模型 | 控制台管理 | 社区活跃度      |
| ------------------ | ------- | ---------- | --------------- |
| Eureka             | AP      | 支持       | 低(2.x版本闭源) |
| Zookeeper          | CP      | 不支持     | 中              |
| consul             | CP      | 支持       | 高              |
| Nacos              | AP      | 支持       | 高              |

据说Nacos在阿里巴巴内部有超过10万的实例运行，已经过了类似双十一等各种大型流量的考验。

## Nacos安装

- 本地Java8+Maven环境已经OK先

- 从[官网](https://github.com/alibaba/nacos/releases)下载Nacos

- 解压安装包，直接运行bin目录下的startup.cmd

  ```sh
  startup.cmd -m standalone
  ```

- 命令运行成功后直接访问[http://localhost:8848/nacos](http://localhost:8848/nacos)，默认账号密码都是nacos

- 结果页面

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.4i5gdhcivla0.webp)

## Nacos之服务提供者注册

[官方文档](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring_cloud_alibaba_nacos_discovery)

新建Module - cloudalibaba-provider-payment9001

POM

父POM

```xml
<dependencyManagement>
    <dependencies>
        <!--spring cloud alibaba 2.1.0.RELEASE-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.1.0.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

本模块POM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2020</artifactId>
        <groupId>com.frx01.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-provider-payment9001</artifactId>
    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

YML

```yaml
server:
  port: 9001

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #配置Nacos地址

management:
  endpoints:
    web:
      exposure:
        include: '*'
```

主启动

```java
@SpringBootApplication
@EnableDiscoveryClient
public class PaymentMain9001 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain9001.class,args);
    }
}
```

Controller

```java
@RestController
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    @GetMapping("/payment/nacos/{id}")
    public String getPayment(@PathVariable("id") Integer id){
        return "Nacos registry, serverPort: "+serverPort+"\t id:"+id;
    }
}
```

测试

- [http://localhost:9001/payment/nacos/1](http://localhost:9001/payment/nacos/1)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.66o61k206k00.webp)

- nacos控制台

![1661334507137](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\1661334507137.png)

- nacos服务注册中心+服务提供者9001都OK了

为了下一章节演示nacos的负载均衡，参照9001新建9002

- 新建cloudalibaba-provider-payment9002
- 9002其它步骤你懂的
- 或者**取巧**不想新建重复体力劳动，可以利用IDEA功能，直接拷贝虚拟端口映射

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.3mzundrnfq00.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.o3dvyjfk15c.webp)

+ [http://localhost:9011/payment/nacos/1](http://localhost:9011/payment/nacos/1)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.67mts1qd01w0.webp)

+ nacos控制台

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.3w15p0upay0.webp)

+ 新建cloudalibaba-provider-payment9002

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.15ljzsnlk480.webp)

## Nacos之服务消费者注册和负载

新建Module - cloudalibaba-consumer-nacos-order83

POM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2020</artifactId>
        <groupId>com.frx01.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-consumer-nacos-order83</artifactId>
    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.frx01.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

为什么nacos支持负载均衡？<mark>因为spring-cloud-starter-alibaba-nacos-discovery内含netflix-ribbon包</mark>。

YML

```yaml
server:
  port: 83

spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848

#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider
```

主启动

```java
@SpringBootApplication
@EnableDiscoveryClient
public class OrderNacosMain83 {
    public static void main(String[] args) {
        SpringApplication.run(OrderNacosMain83.class,args);
    }
}
```

业务类

ApplicationContextConfig

```java
@Configuration
public class ApplicationConfig {
    
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate(){
        return new RestTemplate();
    }
}
```

OrderNacosController

```java
@RestController
public class OrderNacosController {

    @Resource
    private RestTemplate restTemplate;

    @Value("${service-url.nacos-user-service}")
    private String serverURL;

    @GetMapping("/consumer/payment/nacos/{id}")
    public String paymentInfo(@PathVariable("id") Integer id){
        return restTemplate.getForObject(serverURL+"/payment/nacos/"+id,String.class);
    }
}
```

测试

- 启动nacos控制台
- [http://localhost:83/consumer/payment/nacos/1](http://localhost:83/consumer/payment/nacos/1)

![QQ22918914922917714320220824204517](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/QQ22918914922917714320220824204517.158d055ketts.gif)

- 83访问9001/9002，轮询负载OK

## Nacos服务注册中心对比提升

**Nacos全景图**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.4hatbbv9zz4.webp)

**Nacos和CAP**

Nacos与其他注册中心特性对比

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.6zg3vithqws0.webp)

**Nacos服务发现实例模型**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.2pleq09bklk0.webp)

**Nacos支持AP和CP模式的切换**

C是所有节点在同一时间看到的数据是一致的;而A的定义是所有的请求都会收到响应。

何时选择使用何种模式?

—般来说，如果不需要存储服务级别的信息且服务实例是通过nacos-client注册，并能够保持心跳上报，那么就可以选择AP模式。当前主流的服务如Spring cloud和Dubbo服务，都适用于AP模式，AP模式为了服务的可能性而减弱了一致性，因此AP模式下只支持注册临时实例。

如果需要在服务级别编辑或者存储配置信息，那么CP是必须，K8S服务和DNS服务则适用于CP模式。CP模式下则支持注册持久化实例，此时则是以Raft协议为集群运行模式，该模式下注册实例之前必须先注册服务，如果服务不存在，则会返回错误。

切换命令：

`curl -X PUT '$NACOS_SERVER:8848/nacos/v1/ns/operator/switches?entry=serverMode&value=CP`

