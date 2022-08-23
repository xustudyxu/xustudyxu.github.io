---
title: SpringCloud Alibaba 简介
date: 2022-08-23 23:14:37
permalink: /Spring/SpringCloud/SpringCloud_Alibaba_introduction
categories:
  - SpringCloud
tags:
  - SpringCloud
---
# SpringCloud Alibaba 简介

[[toc]]

## 为什么会出现SpringCloud alibaba

Spring Cloud Netflix项目进入维护模式

Netflix:Eureka,ribbon,feign,zuul,config

https://spring.io/blog/2018/12/12/spring-cloud-greenwich-rc1-available-now

什么是维护模式？

将模块置于维护模式，意味着Spring Cloud团队将不会再向模块添加新功能。

他们将修复block级别的 bug 以及安全问题，他们也会考虑并审查社区的小型pull request。

## SpringCloud Alibaba带来了什么

**是什么**

[官网](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md)

Spring Cloud Alibaba 致力于提供微服务开发的一站式解决方案。此项目包含开发分布式应用微服务的必需组件，方便开发者通过 Spring Cloud 编程模型轻松使用这些组件来开发分布式应用服务。

依托 Spring Cloud Alibaba，您只需要添加一些注解和少量配置，就可以将 Spring Cloud 应用接入阿里微服务解决方案，通过阿里中间件来迅速搭建分布式应用系统。

诞生：2018.10.31，Spring Cloud Alibaba 正式入驻了Spring Cloud官方孵化器，并在Maven 中央库发布了第一个版本。

**能干嘛**

+ **服务限流降级**：默认支持 WebServlet、WebFlux, OpenFeign、RestTemplate、Spring Cloud Gateway, Zuul, Dubbo 和 RocketMQ 限流降级功能的接入，可以在运行时通过控制台实时修改限流降级规则，还支持查看限流降级 Metrics 监控。
+ **服务注册与发现**：适配 Spring Cloud 服务注册与发现标准，默认集成了 Ribbon 的支持。
+ **分布式配置管理**：支持分布式系统中的外部化配置，配置更改时自动刷新。
+ **消息驱动能力**：基于 Spring Cloud Stream 为微服务应用构建消息驱动能力。
+ **分布式事务**：使用 @GlobalTransactional 注解， 高效并且对业务零侵入地解决分布式事务问题。
+ **阿里云对象存储**：阿里云提供的海量、安全、低成本、高可靠的云存储服务。支持在任何应用、任何时间、任何地点存储和访问任意类型的数据。
+ **分布式任务调度**：提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。同时提供分布式的任务执行模型，如网格任务。网格任务支持海量子任务均匀分配到所有 Worker（schedulerx-client）上执行。
+ **阿里云短信服务**：覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。

**去哪下**

如果需要使用已发布的版本，在 `dependencyManagement` 中添加如下配置。

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.2.5.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

然后在 `dependencies` 中添加自己所需使用的依赖即可使用。

**怎么玩**

+ [Sentinel](https://github.com/alibaba/Sentinel):把流量作为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。
+ [Nacos](https://github.com/alibaba/Nacos):一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
+ [RocketMQ](https://rocketmq.apache.org/):一款开源的分布式消息系统，基于高可用分布式集群技术，提供低延时的、高可靠的消息发布与订阅服务。
+ [Dubbo](https://github.com/apache/dubbo):Apache Dubbo™ 是一款高性能 Java RPC 框架。
+ [Seata](https://github.com/seata/seata):阿里巴巴开源产品，一个易于使用的高性能微服务分布式事务解决方案。
+ [Alibaba Cloud OSS](https://www.aliyun.com/product/oss):阿里云对象存储服务（Object Storage Service，简称 OSS），是阿里云提供的海量、安全、低成本、高可靠的云存储服务。您可以在任何应用、任何时间、任何地点存储和访问任意类型的数据。
+ [Alibaba Cloud SchedulerX](https://help.aliyun.com/document_detail/148185.html):阿里中间件团队开发的一款分布式任务调度产品，提供秒级、精准、高可靠、高可用的定时（基于 Cron 表达式）任务调度服务。
+ [Alibaba Cloud SMS](https://www.aliyun.com/product/sms):覆盖全球的短信服务，友好、高效、智能的互联化通讯能力，帮助企业迅速搭建客户触达通道。

## Spring Cloud Alibaba学习资料获取

+ 官网
  + [https://spring.io/projects/spring-cloud-alibaba#overview](https://spring.io/projects/spring-cloud-alibaba#overview)

+ 英文
  + [https://github.com/alibaba/spring-cloud-alibaba](https://github.com/alibaba/spring-cloud-alibaba)
  + [https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html)
+ 中文
  + [https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md](https://github.com/alibaba/spring-cloud-alibaba/blob/master/README-zh.md)


