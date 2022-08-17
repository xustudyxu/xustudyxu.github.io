---
title: OpenFeign 简化服务调用
date: 2022-08-17 00:42:45
permalink: /Spring/SpringCloud/OpenFeign_
categories:
  - SpringCloud
tags:
  - SpringCloud
---
# OpenFeign 简化服务调用

[[toc]]

## OpenFeign是什么

[官方文档](https://cloud.spring.io/spring-cloud-static/Hoxton.SR1/reference/htmlsingle/#spring-cloud-openfeign)

[Github地址](https://github.com/spring-cloud/spring-cloud-openfeign)

> [Feign](https://github.com/OpenFeign/feign) is a declarative web service client. It makes writing web service clients easier. To use Feign create an interface and annotate it. It has pluggable annotation support including Feign annotations and JAX-RS annotations. Feign also supports pluggable encoders and decoders. Spring Cloud adds support for Spring MVC annotations and for using the same `HttpMessageConverters` used by default in Spring Web. Spring Cloud integrates Ribbon and Eureka, as well as Spring Cloud LoadBalancer to provide a load-balanced http client when using Feign. link
>
> Feign是一个声明式WebService客户端。使用Feign能让编写Web Service客户端更加简单。它的使用方法是**定义一个服务接口然后在上面添加注解**。Feign也支持可拔插式的编码器和解码器。Spring Cloud对Feign进行了封装，使其支持了Spring MVC标准注解和HttpMessageConverters。Feign可以与Eureka和Ribbon组合使用以支持负载均衡。

**Feign能干什么**

Feign旨在使编写Java Http客户端变得更容易。

前面在使用Ribbon+RestTemplate时，利用RestTemplate对http请求的封装处理，形成了一套模版化的调用方法。但是在实际开发中，由于对服务依赖的调用可能不止一处，往往一个接口会被多处调用，所以通常都会针对每个微服务自行封装一些客户端类来包装这些依赖服务的调用。所以，Feign在此基础上做了进一步封装，由他来帮助我们定义和实现依赖服务接口的定义。在Feign的实现下，我们只需创建一个接口并使用注解的方式来配置它(以前是Dao接口上面标注Mapper注解,现在是一个微服务接口上面标注一个Feign注解即可)，即可完成对服务提供方的接口绑定，简化了使用Spring cloud Ribbon时，自动封装服务调用客户端的开发量。

**Feign集成了Ribbon**

利用Ribbon维护了Payment的服务列表信息，并且通过轮询实现了客户端的负载均衡。而与Ribbon不同的是，**通过feign只需要定义服务绑定接口且以声明式的方法**，优雅而简单的实现了服务调用。

**Feign和OpenFeign两者区别**

**Feign**是Spring Cloud组件中的一个轻量级RESTful的HTTP服务客户端Feign内置了Ribbon，用来做客户端负载均衡，去调用服务注册中心的服务。Feign的使用方式是:使用Feign的注解定义接口，调用这个接口，就可以调用服务注册中心的服务。

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-feign</artifactId>
</dependency>
```

OpenFeign是Spring Cloud在Feign的基础上支持了SpringMVC的注解，如@RequesMapping等等。OpenFeign的@Feignclient可以解析SpringMVc的@RequestMapping注解下的接口，并通过动态代理的方式产生实现类，实现类中做负载均衡并调用其他服务。

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

> feign
> 英 [feɪn] 美 [feɪn]
> v. 假装，装作，佯装(有某种感觉或生病、疲倦等)

## OpenFeign服务调用

接口+注解：微服务调用接口 + @FeignClient

1. 新建cloud-consumer-feign-order80

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

    <artifactId>cloud-consumer-feign-order80</artifactId>

    <dependencies>
        <!--openfeign-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-openfeign</artifactId>
        </dependency>
        <!--eureka client-->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.frx01.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!--web-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般基础通用配置-->
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
server:
  port: 81

eureka:
  client:
    register-with-eureka: false
    service-url:
      defaultZone: http://eureka7001.com:7001/eureka/,http://eureka7002.com:7002/eureka/
```

> 因为80端口被占用，我换为了81端口

4. 主启动

```java
@SpringBootApplication
@EnableFeignClients
public class OrderFeignMain80 {
    public static void main(String[] args) {
        SpringApplication.run(OrderFeignMain80.class,args);
    }
}
```

5. 业务类

业务逻辑接口+@FeignClient配置调用provider服务

新建PaymentFeignService接口并新增注解@FeignClien

```java
@Component
@FeignClient(value = "CLOUD-PAYMENT-SERVICE")
public interface PaymentFeignService {

    @GetMapping(value = "/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id);
}
```

控制层Controller

```java
@RestController
@Slf4j
public class OrderFeignController {

    @Resource
    private PaymentFeignService paymentFeignService;

    @GetMapping(value = "/consumer/payment/get/{id}")
    public CommonResult<Payment> getPaymentById(@PathVariable("id") Long id){
        return paymentFeignService.getPaymentById(id);
    }
}
```

6. 测试

先启动2个eureka集群7001/7002

再启动2个微服务8001/8002

启动OpenFeign启动

+ [http://localhost:81/consumer/payment/get/1](http://localhost:81/consumer/payment/get/1)

![QQ22918914922917714320220816235147](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220816/QQ22918914922917714320220816235147.2cgl1whlgoys.gif)

Feign自带负载均衡配置项

## OpenFeign超时控制

**超时设置，故意设置超时演示出错情况**

1. 服务提供方8001/8002故意写暂停程序

```java
@RestController
@Slf4j
public class PaymentController {
    
    //...
    
    @Value("${server.port}")
    private String serverPort;

    //...
    
    @GetMapping(value = "/payment/feign/timeout")
    public String paymentFeignTimeout()
    {
        // 业务逻辑处理正确，但是需要耗费3秒钟
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return serverPort;
    }
    
    //...
}
```

2. 服务消费方80添加超时方法PaymentFeignService

```java
@Component
@FeignClient(value = "CLOUD-PAYMENT-SERVICE")
public interface PaymentFeignService {
	
    //...
    @GetMapping(value = "/payment/feign/timeout")
    public String paymentFeignTimeout();
}
```

3. 服务消费方80添加超时方法OrderFeignController

```java
@RestController
@Slf4j
public class OrderFeignController {

    @Resource
    private PaymentFeignService paymentFeignService;

    //...

    @GetMapping(value = "/consumer/payment/feign/timeout")
    public String paymentFeignTimeout(){
        //openfeign-ribbon，客户端一般默认等待1秒钟
        return paymentFeignService.paymentFeignTimeout();
    }
}
```

4. 测试

多次刷新+ [http://localhost:81/consumer/payment/feign/timeout](http://localhost:81/consumer/payment/feign/timeout)

将会跳出错误Spring Boot默认错误页面，主要异常：`feign.RetryableException:Read timed out executing GET http://CLOUD-PAYMENT-SERVCE/payment/feign/timeout`。

**OpenFeign默认等待1秒钟，超过后报错**

**YML文件里需要开启OpenFeign客户端超时控制**

```yaml
#设置feign客户端超时时间(OpenFeign默认支持ribbon)(单位：毫秒)
ribbon:
  #指的是建立连接所用的时间，适用于网络状况正常的情况下,两端连接所用的时间
  ReadTimeout: 5000
  #指的是建立连接后从服务器读取到可用资源所用的时间
  ConnectTimeout: 5000
```

+ 重新访问

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220816/image.3e2gqggpype0.webp)

## OpenFeign日志增强

**日志打印功能**

Feign提供了日志打印功能，我们可以通过配置来调整日恙级别，从而了解Feign 中 Http请求的细节。

说白了就是对Feign接口的调用情况进行监控和输出

**日志级别**

- NONE：默认的，不显示任何日志;
- BASIC：仅记录请求方法、URL、响应状态码及执行时间;
- HEADERS：除了BASIC中定义的信息之外，还有请求和响应的头信息;
- FULL：除了HEADERS中定义的信息之外，还有请求和响应的正文及元数据。

**配置日志bean**

```java
import feign.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {

    @Bean
    Logger.Level feignLoggerLevel(){
        return Logger.Level.FULL;
    }
}
```

**YML文件里需要开启日志的Feign客户端**

```yaml
logging:
  level:
    # feign日志以什么级别监控哪个接口
    com.frx01.springcloud.service.PaymentFeignService: debug
```

**后台日志查看**

再次访问[http://localhost:81/consumer/payment/get/1](http://localhost:81/consumer/payment/get/1)，得到更多日志信息。

::: details 控制台打印

```java
2022-08-17 00:41:09.362 DEBUG 18640 --- [p-nio-81-exec-6] c.f.s.service.PaymentFeignService        : [PaymentFeignService#getPaymentById] ---> GET http://CLOUD-PAYMENT-SERVICE/payment/get/1 HTTP/1.1
2022-08-17 00:41:09.362 DEBUG 18640 --- [p-nio-81-exec-6] c.f.s.service.PaymentFeignService        : [PaymentFeignService#getPaymentById] ---> END HTTP (0-byte body)
2022-08-17 00:41:09.369 DEBUG 18640 --- [p-nio-81-exec-6] c.f.s.service.PaymentFeignService        : [PaymentFeignService#getPaymentById] <--- HTTP/1.1 200 (6ms)
2022-08-17 00:41:09.369 DEBUG 18640 --- [p-nio-81-exec-6] c.f.s.service.PaymentFeignService        : [PaymentFeignService#getPaymentById] connection: keep-alive
2022-08-17 00:41:09.369 DEBUG 18640 --- [p-nio-81-exec-6] c.f.s.service.PaymentFeignService        : [PaymentFeignService#getPaymentById] content-type: application/json
2022-08-17 00:41:09.369 DEBUG 18640 --- [p-nio-81-exec-6] c.f.s.service.PaymentFeignService        : [PaymentFeignService#getPaymentById] date: Tue, 16 Aug 2022 16:41:09 GMT
2022-08-17 00:41:09.370 DEBUG 18640 --- [p-nio-81-exec-6] c.f.s.service.PaymentFeignService        : [PaymentFeignService#getPaymentById] keep-alive: timeout=60
2022-08-17 00:41:09.370 DEBUG 18640 --- [p-nio-81-exec-6] c.f.s.service.PaymentFeignService        : [PaymentFeignService#getPaymentById] transfer-encoding: chunked
2022-08-17 00:41:09.370 DEBUG 18640 --- [p-nio-81-exec-6] c.f.s.service.PaymentFeignService        : [PaymentFeignService#getPaymentById] 
2022-08-17 00:41:09.370 DEBUG 18640 --- [p-nio-81-exec-6] c.f.s.service.PaymentFeignService        : [PaymentFeignService#getPaymentById] {"code":200,"message":"查询成功,serverPort:8002","data":{"id":1,"serial":"水果"}}
2022-08-17 00:41:09.370 DEBUG 18640 --- [p-nio-81-exec-6] c.f.s.service.PaymentFeignService        : [PaymentFeignService#getPaymentById] <--- END HTTP (87-byte body)
```

:::