---
title: SpringSecurity 入门案例
date: 2022-10-13 17:07:51
permalink: /Spring/SpringSecurity/SpringSecurity_Getting_start
categories:
  - SpringSecurity
tags:
  - SpringSecurity
---
# SpringSecurity 入门案例

[学习视频地址](https://www.bilibili.com/video/BV1mm4y1X7Hc?p=1)

[[toc]]

## 创建SpringBoot工程

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.4u7acbwkrno0.webp)

## 引入依赖

pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.4.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.frx01.sercuity</groupId>
    <artifactId>sercuitydemo1</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>sercuitydemo1</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

## 编写Controller

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/10/13  16:45
 */
@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/hello")
    public String add(){
        return "Hello,security";
    }

}
```

## 修改application.properties

```properties
#修改端号为8888
server.port=8888 
```

## 启动测试

![QQ22918914922917714320221013170221](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/QQ22918914922917714320221013170221.3q0k05qhdu60.gif)

> 访问我们发现，弹出来了一个登录框

+ SpringSecurity默认用户名为user
+ 默认密码打印在控制台

```java
Using generated security password: 81fb0fc1-9d23-48b4-b170-ecdc8670bb11
```

+ 点击登录，访问成功

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.3bpsahan24m0.webp)