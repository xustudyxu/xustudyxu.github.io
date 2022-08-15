---
title: Consul 服务注册与发现
date: 2022-08-15 15:03:18
permalink: /Spring/SpringCloud/Consul_
categories:
  - SpringCloud
tags:
  - SpringCloud
---
# Consul 服务注册中心

[[toc]]

## Consul 简介

[Consul官网](https://www.consul.io/)

[Consul下载地址](https://www.consul.io/downloads)

> What is Consul?
>
> Consul is a service mesh solution providing a full featured control plane with service discovery, configuration, and segmentation functionality. Each of these features can be used individually as needed, or they can be used together to build a full service mesh. Consul requires a data plane and supports both a proxy and native integration model. Consul ships with a simple built-in proxy so that everything works out of the box, but also supports 3rd party proxy integrations such as Envoy. link
>
> Consul是一个服务网格解决方案，它提供了一个功能齐全的控制平面，具有服务发现、配置和分段功能。这些特性中的每一个都可以根据需要单独使用，也可以一起用于构建全服务网格。Consul需要一个数据平面，并支持代理和本机集成模型。Consul船与一个简单的内置代理，使一切工作的开箱即用，但也支持第三方代理集成，如Envoy。

> consul
> 英 [ˈkɒnsl] 美 [ˈkɑːnsl]
> n. 领事

Consul是一套开源的分布式服务发现和配置管理系统，由HashiCorp 公司用Go语言开发。

提供了微服务系统中的服务治理、配置中心、控制总线等功能。这些功能中的每一个都可以根据需要单独使用，也可以一起使用以构建全方位的服务网格，总之Consul提供了一种完整的服务网格解决方案。

它具有很多优点。包括：基于raft协议，比较简洁；支持健康检查，同时支持HTTP和DNS协议支持跨数据中心的WAN集群提供图形界面跨平台，支持Linux、Mac、Windows。

> The key features of Consul are:
>
> + **Service Discovery**: Clients of Consul can register a service, such as api or mysql, and other clients can use Consul to discover providers of a given service. Using either DNS or HTTP, applications can easily find the services they depend upon.
>
> + **Health Checking**: Consul clients can provide any number of health checks, either associated with a given service (“is the webserver returning 200 OK”), or with the local node (“is memory utilization below 90%”). This information can be used by an operator to monitor cluster health, and it is used by the service discovery components to route traffic away from unhealthy hosts.
>
> + **KV Store**: Applications can make use of Consul’s hierarchical key/value store for any number of purposes, including dynamic configuration, feature flagging, coordination, leader election, and more. The simple HTTP API makes it easy to use.
>
> + **Secure Service Communication**: Consul can generate and distribute TLS certificates for services to establish mutual TLS connections. [Intentions](https://www.consul.io/docs/connect/intentions) can be used to define which services are allowed to communicate. Service segmentation can be easily managed with intentions that can be changed in real time instead of using complex network topologies and static firewall rules.
>
> + **Multi Datacenter**: Consul supports multiple datacenters out of the box. This means users of Consul do not have to worry about building additional layers of abstraction to grow to multiple regions.
>
>   [link](https://www.consul.io/docs/intro#what-is-consul)
>

能干嘛？

- 服务发现 - 提供HTTP和DNS两种发现方式。
- 健康监测 - 支持多种方式，HTTP、TCP、Docker、Shell脚本定制化
- KV存储 - Key、Value的存储方式
- 多数据中心 - Consul支持多数据中心
- 可视化Web界面

[怎么玩](https://www.springcloud.cc/spring-cloud-consul.html)

## 安装并运行Consul

[官网安装说明](https://learn.hashicorp.com/tutorials/consul/get-started-install)

windows版解压缩后，得consul.exe，打开cmd

- 查看版本`consul -v`：

```sh
DELL@FRXcomputer MINGW64 /d/DevelopTools/Consul/consul_1.13.1_windows_amd64
$ ./consul.exe --version
Consul v1.13.1
Revision c6d0f9ec
Build Date 2022-08-11T19:07:00Z
Protocol 2 spoken by default, understands 2 to 3 (agent will automatically use protocol >2 when speaking to compatible agents)
```

- 开发模式启动`consul agent -dev`：

浏览器输入 - http://localhost:8500/ - 打开Consul控制页。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.5dwbr6vcxb40.webp)

## 服务提供者注册进Consul

1. 新建Module支付服务cloud-providerconsul-payment8006

2. POM

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

    <artifactId>cloud-providerconsul-payment8006</artifactId>

    <dependencies>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.frx01.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--SpringCloud consul-server -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
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
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>RELEASE</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>cn.hutool</groupId>
            <artifactId>hutool-all</artifactId>
            <version>RELEASE</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

3. YML

```yaml
###consul服务端口号
server:
  port: 8006

spring:
  application:
    name: consul-provider-payment
  ####consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        #hostname: 127.0.0.1
        service-name: ${spring.application.name}
```

4. 主启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class PaymentMain8006 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain8006.class,args);
    }
}
```

5. 业务类Controller

```java
@RestController
@Slf4j
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    @RequestMapping(value = "/payment/consul")
    public String paymentConsul(){
        return "springcloud with consul:"+serverPort+"\t"+ UUID.randomUUID().toString();
    }
}
```

6.验证测试

- [http://localhost:8006/payment/consul](http://localhost:8006/payment/consul)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.1cgi418bn9gg.webp)

- [http://localhost:8500](http://localhost:8500)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.5o6cr4jeom40.webp)

## 服务消费者注册进Consul

1. 新建Module消费服务order80 - cloud-consumerconsul-order80

2. POM

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

    <artifactId>cloud-consumerconsul-order80</artifactId>
    <dependencies>
        <!--SpringCloud consul-server -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-consul-discovery</artifactId>
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

3. YML

```yaml
###consul服务端口号
server:
  port: 81

spring:
  application:
    name: cloud-consumer-payment
  ####consul注册中心地址
  cloud:
    consul:
      host: localhost
      port: 8500
      discovery:
        #hostname: 127.0.0.1
        service-name: ${spring.application.name}
```

> 80端口被占用了 ，我换为了81

4. 主启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class OrderConsulMain80 {
    public static void main(String[] args) {
        SpringApplication.run(OrderConsulMain80.class,args);
    }
}
```

5. 配置类

```java
@Configuration
public class ApplicationContextConfig {

    @Bean
    @LoadBalanced
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

6. Controller

```java
@RestController
public class OrderConsulController {

    public static final String INVOKE_URL = "http://consul-provider-payment";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping(value = "/consumer/payment/consul")
    public String paymentInfo(){
        String result = restTemplate.getForObject(INVOKE_URL+"/payment/consul",String.class);
        return result;
    }
}
```

7. 测试

+ 运行consul，cloud-providerconsul-payment8006，cloud-consumerconsul-order80

  http://localhost:8500/ 主页会显示出consul，cloud-providerconsul-payment8006，cloud-consumerconsul-order80三服务。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.aof43930jgo.webp)

+ 访问测试地址 - [http://localhost:81/consumer/payment/consul](http://localhost:81/consumer/payment/consul)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.4tnw181x9hu0.webp)

## 三个注册中心异同点

| 组件名    | 语言CAP | 服务健康检查 | 对外暴露接口 | Spring Cloud集成 |
| --------- | ------- | ------------ | ------------ | ---------------- |
| Eureka    | Java    | AP           | 可配支持     | HTTP             |
| Consul    | Go      | CP           | 支持         | HTTP/DNS         |
| Zookeeper | Java    | CP           | 支持客户端   | 已集成           |

CAP：

- C：Consistency (强一致性)
- A：Availability (可用性)
- P：Partition tolerance （分区容错性)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.94hpz9x1yb0.webp)

**最多只能同时较好的满足两个**。

CAP理论的核心是：**一个分布式系统不可能同时很好的满足一致性，可用性和分区容错性这三个需求**。

因此，根据CAP原理将NoSQL数据库分成了满足CA原则、满足CP原则和满足AP原则三大类:

+ CA - 单点集群，满足—致性，可用性的系统，通常在可扩展性上不太强大。
+ CP - 满足一致性，分区容忍必的系统，通常性能不是特别高。
+ AP - 满足可用性，分区容忍性的系统，通常可能对一致性要求低一些。

AP架构（Eureka）

当网络分区出现后，为了保证可用性，系统B可以返回旧值，保证系统的可用性。

结论：违背了一致性C的要求，只满足可用性和分区容错，即AP

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.edjjxibsaag.webp)

CP架构（ZooKeeper/Consul）

当网络分区出现后，为了保证一致性，就必须拒接请求，否则无法保证一致性。

结论：违背了可用性A的要求，只满足一致性和分区容错，即CP。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.29aygpmd0wu8.webp)

CP 与 AP 对立同一的矛盾关系。