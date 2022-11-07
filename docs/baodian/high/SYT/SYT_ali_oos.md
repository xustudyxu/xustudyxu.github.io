---
title: 尚医通- 阿里云OSS、用户认证与就诊人
date: 2022-11-07 21:59:30
permalink: /high/SYT/SYT_SYT_ali_oos
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通- 阿里云OSS、用户认证与就诊人

[[toc]]

## 阿里云 oss

用户认证需要上传证件图片、首页轮播也需要上传图片，因此我们要做文件服务，阿里云oss是一个很好的分布式文件服务系统，所以我们只需要集成阿里云oss即可。

### 开通“对象存储OSS”服务

1. 申请阿里云账号
2. 实名认证
3. 开通“对象存储OSS”服务
4. 进入管理控制台

#### 创建 Bucket

选择：低频存储、公共读、不开通

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221107/image.2jj0kjwjl3o0.webp)

#### 上传默认头像

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221107/image.70vsuii4lug0.webp)

### 如何使用

+ [文档地址](https://help.aliyun.com/document_detail/32009.html)

## 文件服务实现

### 搭建 service-oss 模块

#### 修改配置

1. 修改 pom.xml，引入阿里云 oss 依赖

```xml
<dependencies>
    <!-- 阿里云oss依赖 -->
    <dependency>
        <groupId>com.aliyun.oss</groupId>
        <artifactId>aliyun-sdk-oss</artifactId>
    </dependency>

    <!-- 日期工具栏依赖 -->
    <dependency>
        <groupId>joda-time</groupId>
        <artifactId>joda-time</artifactId>
    </dependency>
</dependencies>
```

2. 添加配置文件 application.properties

```yaml
# 服务端口
server.port=8205
# 服务名
spring.application.name=service-oss

#返回json的全局时间格式
spring.jackson.date-format=yyyy-MM-dd HH:mm:ss
spring.jackson.time-zone=GMT+8

# nacos服务地址
spring.cloud.nacos.discovery.server-addr=127.0.0.1:8848

aliyun.oss.endpoint=oss-cn-beijing.aliyuncs.com
aliyun.oss.accessKeyId=LTAI5tPcTiq8WZ2qzisnQnjb
aliyun.oss.secret=JlUoZaupyMCZL1GCMMWNAENjHssKgO
aliyun.oss.bucket=gili-file-oos
```

#### 启动类

```java
@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
@EnableDiscoveryClient
@ComponentScan(basePackages = {"com.frx01"})
public class ServiceOssApplication {

    public static void main(String[] args) {
        SpringApplication.run(ServiceOssApplication.class, args);
    }

}
```

#### 配置网关

```yaml
#设置路由id
spring.cloud.gateway.routes[5].id=service-oss
#设置路由的uri
spring.cloud.gateway.routes[5].uri=lb://service-oss
#设置路由断言,代理servicerId为auth-service的/auth/路径
spring.cloud.gateway.routes[5].predicates= Path=/*/oss/**
```

### 测试 SDK

```java
public class OssTest {
    public static void main(String[] args) {
        // yourEndpoint填写Bucket所在地域对应的Endpoint。以华东1（杭州）为例，Endpoint填写为https://oss-cn-hangzhou.aliyuncs.com。
        String endpoint = "https://oss-cn-beijing.aliyuncs.com";
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        String accessKeyId = "LTAI5tPcTiq8WZ2qzisnQnjb";
        String accessKeySecret = "JlUoZaupyMCZL1GCMMWNAENjHssKgO";
        String bucketName = "yygh-testoss43";

        // 创建OSSClient实例。
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        // 创建存储空间
        ossClient.createBucket(bucketName);

        // 关闭OSSClient。
        ossClient.shutdown();
    }
}
```

+ 测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221107/image.2gn1d2vleao0.webp)