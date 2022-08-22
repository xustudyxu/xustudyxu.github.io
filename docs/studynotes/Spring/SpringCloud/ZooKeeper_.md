---
title: ZooKeeper 服务注册与发现
date: 2022-08-14 22:16:34
permalink: /Spring/SpringCloud/ZooKeeper_
categories:
  - SpringCloud
tags:
  - SpringCloud
---
# ZooKeeper 服务注册中心

[[toc]]

## 支付服务注册进ZooKeeper

+ 注册中心Zookeeper

zookeeper是一个分布式协调工具，可以实现注册中心功能

关闭Linux服务器防火墙后，启动zookeeper服务器

用到的Linux命令行：

+ `systemctl stop firewalld`关闭防火墙

+ `systemctl status firewalld`查看防火墙状态

+ `ipconfig`查看IP地址

+ `ping`查验结果

zookeeper服务器取代Eureka服务器，zk作为服务注册中心

+ [CentOS安装ZooKeeper步骤](/middleware/Dubbo/Dubbo_Geting_start/#zookeeper安装)

```sh
[root@master ~]# cd /opt/zookeeper/apache-zookeeper-3.5.6-bin/bin/
[root@master bin]# ls
README.txt    zkCli.cmd  zkEnv.cmd  zkServer.cmd            zkServer.sh          zkTxnLogToolkit.sh
zkCleanup.sh  zkCli.sh   zkEnv.sh   zkServer-initialize.sh  zkTxnLogToolkit.cmd
[root@master bin]# ./zkServer.sh start
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper/apache-zookeeper-3.5.6-bin/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
```

- 服务提供者

1.新建名为cloud-provider-payment8004的Maven工程。

2.POM

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

    <artifactId>cloud-provider-payment8004</artifactId>
    <dependencies>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency><!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
            <groupId>com.frx01.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>${project.version}</version>
        </dependency>
        <!-- SpringBoot整合zookeeper客户端 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
            <!--先排除自带的zookeeper3.5.3 防止与3.5.6起冲突-->
            <exclusions>
                <exclusion>
                    <groupId>org.apache.zookeeper</groupId>
                    <artifactId>zookeeper</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <!--添加zookeeper3.5.6版本-->
        <dependency>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
            <version>3.5.6</version>
        </dependency>
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

3. 编写YML

```yaml
#8004表示注册到zookeeper服务器的支付服务提供者端口号
server:
  port: 8004

#服务别名----注册zookeeper到注册中心名称
spring:
  application:
    name: cloud-provider-payment
  cloud:
    zookeeper:
      connect-string: 192.168.91.200:2181 # zookeeper服务IP加端口号
```

4. 主启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class PaymentMain8004 {
    public static void main(String[] args) {
        SpringApplication.run(PaymentMain8004.class,args);
    }
}
```

5. Controller

```java
@RestController
@Slf4j
public class PaymentController {

    @Value("${server.port}")
    private String serverPort;

    @RequestMapping(value = "/payment/zk")
    public String paymentzk(){
        return "springcloud with zookeeper: "+serverPort+"\t"+ UUID.randomUUID().toString();
    }
}
```

6. 启动8004注册进zookeeper（要先启动zookeeper的server）

- 验证测试：浏览器 - http://localhost:8004/payment/zk
- 验证测试2 ：接着用zookeeper客户端操作

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220814/image.79ugu9at2540.webp)

```sh
[zk: localhost:2181(CONNECTED) 1] ls /
[dubbo, services, zookeeper]
[zk: localhost:2181(CONNECTED) 2] ls /services/cloud-provider-payment
[54ba4644-818d-404f-ac73-e76f525b10a4]
[zk: localhost:2181(CONNECTED) 3] get /services/cloud-provider-payment/54ba4644-818d-404f-ac73-e76f525b10a4
{"name":"cloud-provider-payment","id":"54ba4644-818d-404f-ac73-e76f525b10a4","address":"localhost","port":8004,"sslPort":null,"payload":{"@class":"org.springframework.cloud.zookeeper.discovery.ZookeeperInstance","id":"application-1","name":"cloud-provider-payment","metadata":{}},"registrationTimeUTC":1660484409499,"serviceType":"DYNAMIC","uriSpec":{"parts":[{"value":"scheme","variable":true},{"value":"://","variable":false},{"value":"address","variable":true},{"value":":","variable":false},{"value":"port","variable":true}]}}
```

json格式化`get /services/cloud-provider-payment/54ba4644-818d-404f-ac73-e76f525b10a4`的结果：

```json
{
  "name": "cloud-provider-payment",
  "id": "54ba4644-818d-404f-ac73-e76f525b10a4",
  "address": "localhost",
  "port": 8004,
  "sslPort": null,
  "payload": {
    "@class": "org.springframework.cloud.zookeeper.discovery.ZookeeperInstance",
    "id": "application-1",
    "name": "cloud-provider-payment",
    "metadata": {}
  },
  "registrationTimeUTC": 1660484409499,
  "serviceType": "DYNAMIC",
  "uriSpec": {
    "parts": [
      {
        "value": "scheme",
        "variable": true
      },
      {
        "value": "://",
        "variable": false
      },
      {
        "value": "address",
        "variable": true
      },
      {
        "value": ":",
        "variable": false
      },
      {
        "value": "port",
        "variable": true
      }
    ]
  }
}
```

## 临时还是持久节点

ZooKeeper的服务节点是**临时节点**，没有Eureka那含情脉脉。

## 订单服务注册进zookeeper

1.新建cloud-consumerzk-order80

2.POM

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

    <artifactId>cloud-consumerzk-order80</artifactId>
    <dependencies>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <!-- SpringBoot整合zookeeper客户端 -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-zookeeper-discovery</artifactId>
            <!--先排除自带的zookeeper-->
            <exclusions>
                <exclusion>
                    <groupId>org.apache.zookeeper</groupId>
                    <artifactId>zookeeper</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
        <!--添加zookeeper3.5.6版本-->
        <dependency>
            <groupId>org.apache.zookeeper</groupId>
            <artifactId>zookeeper</artifactId>
            <version>3.5.6</version>
        </dependency>
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

#服务别名----注册zookeeper到注册中心名称
spring:
  application:
    name: cloud-consumer-order
  cloud:
    zookeeper:
      connect-string: 192.168.91.200:2181
```

> 80端口被占用了，我换为81

4. 主启动类

```java
@SpringBootApplication
@EnableDiscoveryClient
public class OrderZKMain80 {
    public static void main(String[] args) {
        SpringApplication.run(OrderZKMain80.class,args);   
    }
}
```

5. 业务类

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

```java
@RestController
@Slf4j
public class OrderZKController {

    public static final String INVOKE_URL = "http://cloud-provider-payment";

    @Resource
    private RestTemplate restTemplate;

    @GetMapping(value = "/consumer/payment/zk")
    public String paymentInfo(){
        String result = restTemplate.getForObject(INVOKE_URL+"/payment/zk",String.class);
        return result;
    }
}
```

6.验证测试

运行ZooKeeper服务端，cloud-consumerzk-order80，cloud-provider-payment8004。

打开ZooKeeper客户端：

```sh
[zk: localhost:2181(CONNECTED) 4] ls /services
[cloud-consumer-order]
[zk: localhost:2181(CONNECTED) 5] ls /services
[cloud-consumer-order, cloud-provider-payment]
```

7. 访问测试地址 - [http://localhost:81/consumer/payment/zk](http://localhost:81/consumer/payment/zk)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220814/image.22vnyckev000.webp)