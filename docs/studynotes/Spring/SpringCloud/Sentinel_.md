---
title: Sentinel 实现熔断与限流
date: 2022-08-26 23:46:48
permalink: /Spring/SpringCloud/Sentinel_
categories:
  - SpringCloud
tags:
  - SpringCloud
---
# Sentinel 实现熔断与限流

[[toc]]

## Sentinel是什么

[官方Github](https://github.com/alibaba/Sentinel)

[官方文档](https://sentinelguard.io/zh-cn/docs/introduction.html)

**Sentinel 是什么？**

随着微服务的流行，服务和服务之间的稳定性变得越来越重要。Sentinel 以流量为切入点，从流量控制、熔断降级、系统负载保护等多个维度保护服务的稳定性。

Sentinel 具有以下特征:

+ **丰富的应用场景**：Sentinel 承接了阿里巴巴近 10 年的双十一大促流量的核心场景，例如秒杀（即突发流量控制在系统容量可以承受的范围）、消息削峰填谷、集群流量控制、实时熔断下游不可用应用等。

+ **完备的实时监控**：Sentinel 同时提供实时的监控功能。您可以在控制台中看到接入应用的单台机器秒级数据，甚至 500 台以下规模的集群的汇总运行情况。

+ **广泛的开源生态**：Sentinel 提供开箱即用的与其它开源框架/库的整合模块，例如与 Spring Cloud、Dubbo、gRPC 的整合。您只需要引入相应的依赖并进行简单的配置即可快速地接入 Sentinel。

+ **完善的 SPI 扩展点**：Sentinel 提供简单易用、完善的 SPI 扩展接口。您可以通过实现扩展接口来快速地定制逻辑。例如定制规则管理、适配动态数据源等。

Sentinel 的主要特性：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220826/image.6o17tpjuxww0.webp)

[link](https://github.com/alibaba/Sentinel/wiki/%E4%BB%8B%E7%BB%8D#sentinel-%E6%98%AF%E4%BB%80%E4%B9%88)

—句话解释，之前我们讲解过的Hystrix。

Hystrix与Sentinel比较：

- Hystrix
  1. 需要我们程序员自己手工搭建监控平台
  2. 没有一套web界面可以给我们进行更加细粒度化得配置流控、速率控制、服务熔断、服务降级
- Sentinel
  1. 单独一个组件，可以独立出来。
  2. 直接界面化的细粒度统一配置。

约定 > 配置 > 编码

都可以写在代码里面，但是我们本次还是大规模的学习使用配置和注解的方式，尽量少写代码

+ Sentinel生态

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220826/image.1b0m1x3sals0.webp)

> sentinel
> 英 [ˈsentɪnl] 美 [ˈsentɪnl]
> n. 哨兵

## Sentinel下载安装运行

[官方文档](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring_cloud_alibaba_sentinel)

服务使用中的各种问题：

- 服务雪崩
- 服务降级
- 服务熔断
- 服务限流

Sentinel 分为两个部分：

- 核心库（Java 客户端）不依赖任何框架/库，能够运行于所有 Java 运行时环境，同时对 Dubbo / Spring Cloud 等框架也有较好的支持。
- 控制台（Dashboard）基于 Spring Boot 开发，打包后可以直接运行，不需要额外的 Tomcat 等应用容器。

安装步骤：

- 下载

  - https://github.com/alibaba/Sentinel/releases
  - 下载到本地sentinel-dashboard-1.8.2.jar

- 运行命令
  - 前提

    - Java 8 环境
    - 8080端口不能被占用

    ```sh
    netstat -ano | findstr 8080
    taskkill -pid pidnumber -f
    ```

  - 命令

    - `java -jar sentinel-dashboard-1.8.2.jar`

- 访问Sentinel管理界面
  - [http://localhost:8080](http://localhost:8080)
  - 登录账号密码均为sentinel

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220826/image.6y6m807az4s0.webp)