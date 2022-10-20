---
title: 尚医通-后台接口
date: 2022-10-21 00:37:15
permalink: /high/SYT/SYT_HospitalSet
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-后台接口

[[toc]]

## 医院设置需求

### 需求

医院设置主要是用来保存开通医院的一些基本信息，每个医院一条信息，保存了医院编号（平台分配，全局唯一）和接口调用相关的签名key等信息，是整个流程的第一步，只有开通了医院设置信息，才可以上传医院相关信息。

我们所开发的功能就是基于单表的一个CRUD、锁定/解锁和发送签名信息这些基本功能。

### 表结构

```sql
#
# Database "yygh_hosp"
#

CREATE DATABASE IF NOT EXISTS `yygh_hosp` CHARACTER SET utf8mb4;
USE `yygh_hosp`;

#
# Structure for table "hospital_set"
#

CREATE TABLE `hospital_set` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `hosname` VARCHAR(100) DEFAULT NULL COMMENT '医院名称',
  `hoscode` VARCHAR(30) DEFAULT NULL COMMENT '医院编号',
  `api_url` VARCHAR(100) DEFAULT NULL COMMENT 'api基础路径',
  `sign_key` VARCHAR(50) DEFAULT NULL COMMENT '签名秘钥',
  `contacts_name` VARCHAR(20) DEFAULT NULL COMMENT '联系人',
  `contacts_phone` VARCHAR(11) DEFAULT NULL COMMENT '联系人手机',
  `status` TINYINT(3) NOT NULL DEFAULT '0' COMMENT '状态',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_deleted` TINYINT(3) NOT NULL DEFAULT '0' COMMENT '逻辑删除(1:已删除，0:未删除)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_hoscode` (`hoscode`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='医院设置表';
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221020/image.5v4gay33ivw0.webp)

| 字段名         | 含义                                                         |
| -------------- | ------------------------------------------------------------ |
| hosname        | 医院名称                                                     |
| hoscode        | 医院编号（平台分配，全局唯一，api接口必填信息）              |
| api_url        | 医院回调的基础url（如：预约下单，我们要调用该地址去医院下单） |
| sign_key       | 双方api接口调用的签名key，有平台生成                         |
| contacts_name  | 医院联系人姓名                                               |
| contacts_phone | 医院联系人手机                                               |
| status         | 状态（锁定/解锁）                                            |

## 医院模块开发

### 搭建医院模块service-hosp

1. 配置pom.xml

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>service</artifactId>
        <groupId>com.frx01</groupId>
        <version>1.0</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>service_hosp</artifactId>
    <packaging>jar</packaging>
    <name>service-hosp</name>
    <description>service-hosp</description>
    <dependencies>
    </dependencies>
    <build>
        <finalName>service-hosp</finalName>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

2. 添加配置文件application.properties

```properties
# 服务端口
server.port=8201
# 服务名
spring.application.name=service-hosp

# 环境设置：dev、test、prod
spring.profiles.active=dev

# mysql数据库连接
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/yygh_hosp?characterEncoding=utf-8&useSSL=false
spring.datasource.username=root
spring.datasource.password=hsp

#返回json的全局时间格式
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
spring.jackson.time-zone=GMT+8

#配置mapper xml文件的路径
#mybatis-plus.mapper-locations=classpath:com/atguigu/yygh/mapper/xml/*.xml
mybatis-plus.mapper-locations=classpath:com/atguigu/yygh/mapper/xml/*.xml
# nacos服务地址
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848

#开启sentinel
feign.sentinel.enabled=true
#设置sentinel地址
spring.cloud.sentinel.transport.dashboard=http://127.0.0.1:8858

#mongodb地址
spring.data.mongodb.host=127.0.0.1
spring.data.mongodb.port=27017
spring.data.mongodb.database=yygh_hosp

#rabbitmq地址
spring.rabbitmq.host=127.0.0.1
spring.rabbitmq.port=5672
spring.rabbitmq.username=guest
spring.rabbitmq.password=guest
```

3. 添加启动类

```java
@SpringBootApplication
public class ServiceHospApplication {
    public static void main(String[] args) {
        SpringApplication.run(ServiceHospApplication.class, args);
    }
}
```

### 引入实体类

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221020/image.5fcpjfrlh700.webp)

### 添加mapper

```java
@Mapper
public interface HospitalSetMapper extends BaseMapper<HospitalSet> {
}
```

在mapper/xml下添加HospitalSetMapper.xml

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd" >
<mapper namespace="com.frx01.yygh.mapper.HospitalSetMapper">

</mapper>
```

### 添加service接口及实现类

1. 添加HospitalSetService接口

```java
public interface HospitalSetService extends IService<HospitalSet> {
}
```

2. 添加HospitalSetServiceImpl接口实现

```java
@Service
public class HospitalSetServiceImpl extends ServiceImpl<HospitalSetMapper, HospitalSet> implements HospitalSetService {
}
```

### 添加Controller

```java
@RestController
@RequestMapping("/admin/hosp/hospitalSet")
public class HospitalSetController {

    @Autowired
    private HospitalSetService hospitalSetService;
}
```

### 医院设置CRUD

由于com.baomidou.mybatisplus.extension.service.impl.ServiceImpl类已经默认实现 了单表的CRUD，分页查询也有默认实现，能够更加灵活和代码简洁把分页查询功能实现。

### 添加Controller方法

## Swagger2 介绍与集成

什么是swagger2

编写和维护接口文档是每个程序员的职责，根据Swagger2可以快速帮助我们编写最新的API接口文档，再也不用担心开会前仍忙于整理各种资料了，间接提升了团队开发的沟通效率。

常用注解

swagger通过注解表明该接口会生成文档，包括接口名、请求方法、参数、返回信息的等等。

 `@Api`：修饰整个类，描述Controller的作用

`@ApiOperation`：描述一个类的一个方法，或者说一个接口

`@ApiParam`：单个参数描述

`@ApiModel`：用对象来接收参数

`@ApiModelProperty`：用对象接收参数时，描述对象的一个字段

`@ApiImplicitParam`：一个请求参数

`@ApiImplicitParams`：多个请求参数

### 在项目中整合swagger2

在common模块pom.xml引入依赖

```xml
<!--swagger-->
<dependency>
	<groupId>io.springfox</groupId>
	<artifactId>springfox-swagger2</artifactId>
</dependency>
<dependency>
	<groupId>io.springfox</groupId>
	<artifactId>springfox-swagger-ui</artifactId>
</dependency>
```

说明：我们在yygh-parent中的pom.xml中添加了版本控制，这里不需要添加版本，已引入就忽略

### 添加swagger2配置类

在service-util模块添加配置类：

```java
@Configuration
@EnableSwagger2
public class Swagger2Config {
    @Bean
    public Docket webApiConfig(){
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("webApi")
                .apiInfo(webApiInfo())
                .select()
                //只显示api路径下的页面
                .paths(Predicates.and(PathSelectors.regex("/api/.*")))
                .build();
    }

    @Bean
    public Docket adminApiConfig(){
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("adminApi")
                .apiInfo(adminApiInfo())
                .select()
                //只显示admin路径下的页面
                .paths(Predicates.and(PathSelectors.regex("/admin/.*")))
                .build();
    }

    private ApiInfo webApiInfo(){
        return new ApiInfoBuilder()
                .title("网站-API文档")
                .description("本文档描述了网站微服务接口定义")
                .version("1.0")
                .contact(new Contact("atguigu", "http://atguigu.com", "493211102@qq.com"))
                .build();
    }

    private ApiInfo adminApiInfo(){
        return new ApiInfoBuilder()
                .title("后台管理系统-API文档")
                .description("本文档描述了后台管理系统微服务接口定义")
                .version("1.0")
                .contact(new Contact("atguigu", "http://atguigu.com", "49321112@qq.com"))
                .build();
    }

}
```

### 使用swagger2测试

+ 访问[http://localhost:8201/swagger-ui.html](http://localhost:8201/swagger-ui.html)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221020/image.5pfnbi022aw0.webp)

```java
@Api("医院设置管理")
@RestController
@RequestMapping("/admin/hosp/hospitalSet")
public class HospitalSetController {

    @Autowired
    private HospitalSetService hospitalSetService;

    //1.查询医院设置表里面的所有信息
    @ApiOperation(value = "获取所有医院设置的信息")
    @GetMapping("/findAll")
    public List<HospitalSet> findAllHospitalSet(){
        List<HospitalSet> list = hospitalSetService.list();
        return list;
    }

    //2.逻辑删除医院设置
    @ApiOperation(value = "逻辑删除医院设置")
    @DeleteMapping("{id}")
    public boolean removeHospitalSet(@PathVariable Long id){
        boolean flag = hospitalSetService.removeById(id);
        return flag;
    }
    
}
```

+ 测试删除

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221020/image.6z5v87ol3gc0.webp)

+ 数据库中的表变化

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221020/image.70jzhdeh89k0.webp)