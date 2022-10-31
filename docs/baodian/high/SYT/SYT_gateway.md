---
title: 尚医通-技术点-整合服务网关
date: 2022-10-31 16:47:58
permalink: /high/SYT/SYT_gateway
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-技术点-整合服务网关

[[toc]]

## 网关介绍

API网关出现的原因是微服务架构的出现，不同的微服务一般会有不同的网络地址，而外部客户端可能需要调用多个服务的接口才能完成一个业务需求，如果让客户端直接与各个微服务通信，会有以下的问题：

1. 客户端会多次请求不同的微服务，增加了客户端的复杂性。
2. 存在跨域请求，在一定场景下处理相对复杂。
3. 认证复杂，每个服务都需要独立认证。
4. 难以重构，随着项目的迭代，可能需要重新划分微服务。例如，可能将多个服务合并成一个或者将一个服务拆分成多个。如果客户端直接与微服务通信，那么重构将会很难实施。

5. 某些微服务可能使用了防火墙 / 浏览器不友好的协议，直接访问会有一定的困难。

以上这些问题可以借助 API 网关解决。API 网关是介于客户端和服务器端之间的中间层，所有的外部请求都会先经过API 网关这一层。也就是说，API 的实现方面更多的考虑业务逻辑，而安全、性能、监控可以交由 API 网关来做，这样既提高业务灵活性又不缺安全性。

## Spring Cloud Gateway介绍

Spring
cloud gateway是spring官方基于Spring 5.0、Spring Boot2.0和Project Reactor等技术开发的网关，Spring Cloud Gateway旨在为微服务架构提供简单、有效和统一的API路由管理方式，Spring Cloud Gateway作为Spring Cloud生态系统中的网关，目标是替代Netflix Zuul，其不仅提供统一的路由方式，并且还基于Filer链的方式提供了网关基本的功能，例如：安全、监控/埋点、限流等。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221031/image.5jsm516p94g0.webp)

## 搭建server-gateway模块

### 修改配置 pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.frx01</groupId>
        <version>0.0.1-SNAPSHOT</version>
        <artifactId>yygh_parent</artifactId>
    </parent>
    <groupId>com.frx01</groupId>
    <artifactId>server-gateway</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>server-gateway</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>common-util</artifactId>
            <version>1.0</version>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-gateway</artifactId>
        </dependency>

        <!-- 服务注册 -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
    </dependencies>
</project>
```

### 在resources下添加配置文件

1. application.properties

```properties
# 服务端口
server.port=81
# 服务名
spring.application.name=service-gateway

# nacos服务地址
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848

#使用服务发现路由
spring.cloud.gateway.discovery.locator.enabled=true

#设置路由id
spring.cloud.gateway.routes[0].id=service-hosp
#设置路由的uri
spring.cloud.gateway.routes[0].uri=lb://service-hosp
#设置路由断言,代理servicerId为auth-service的/auth/路径
spring.cloud.gateway.routes[0].predicates= Path=/*/hosp/**

#设置路由id
spring.cloud.gateway.routes[1].id=service-cmn
#设置路由的uri
spring.cloud.gateway.routes[1].uri=lb://service-cmn
#设置路由断言,代理servicerId为auth-service的/auth/路径
spring.cloud.gateway.routes[1].predicates= Path=/*/cmn/**
```

### 添加启动类

```java
@SpringBootApplication
public class ServerGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServerGatewayApplication.class, args);
    }

}
```

## 跨域处理

跨域：浏览器对于javascript的同源策略的限制 。

以下情况都属于跨域：

| 跨域原因说明       | 示例                                 |
| ------------------ | ------------------------------------ |
| 域名不同           | www.jd.com 与 www.taobao.com         |
| 域名相同，端口不同 | www.jd.com:8080   与 www.jd.com:8081 |
| 二级域名不同       | item.jd.com 与 miaosha.jd.com        |

如果域名和端口都相同，但是请求路径不同，不属于跨域，如：

www.jd.com/item 

www.jd.com/goods

http和https也属于跨域

而我们刚才是从localhost:1000去访问localhost:8888，这属于端口不同，跨域了。

### 为什么有跨域问题？

跨域不一定都会有跨域问题。

因为跨域问题是浏览器对于ajax请求的一种安全限制：一个页面发起的ajax请求，只能是与当前页域名相同的路径，这能有效的阻止跨站攻击。

因此：跨域问题 是针对ajax的一种限制。

但是这却给我们的开发带来了不便，而且在实际生产环境中，肯定会有很多台服务器之间交互，地址和端口都可能不同，怎么办？

### 解决跨域问题

全局配置类实现CorsConfig类

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedMethod("*");
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(new PathPatternParser());
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }
}
```

### 服务调整

目前我们已经在网关做了跨域处理，那么service服务就不需要再做跨域处理了，将之前在controller类上添加过@CrossOrigin标签的去掉，防止程序异常

### 测试

+ 查看医院设置列表

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221031/image.533zg01shhs0.webp)