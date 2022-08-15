---
title: Ribbon 负载均衡服务调用
date: 2022-08-15 20:31:43
permalink: /Spring/SpringCloud/Ribbon_
categories:
  - SpringCloud
tags:
  - SpringCloud
---
# Ribbon 负载均衡服务调用

[[toc]]

## Ribbon入门介绍

Spring Cloud Ribbon是基于Netflix Ribbon实现的一套**客户端负载均衡的工具**。

简单的说，Ribbon是Netflix发布的开源项目，主要功能是提供**客户端的软件负载均衡算法和服务调用**。Ribbon客户端组件提供一系列完善的配置项如连接超时，重试等。

简单的说，就是在配置文件中列出Load Balancer(简称LB)后面所有的机器，Ribbon会自动的帮助你基于某种规则(如简单轮询，随机连接等）去连接这些机器。我们很容易使用Ribbon实现自定义的负载均衡算法。

> ribbon
>
> 英 [ˈrɪbən] 美 [ˈrɪbən]
>
> n. (用于捆绑或装饰的)带子;丝带;带状物;狭长的东西;绶带;勋带

Github-Ribbon

Ribbon目前也进入维护模式。

Ribbon未来可能被Spring Cloud LoadBalacer替代。

LB负载均衡(Load Balance)是什么

简单的说就是将用户的请求平摊的分配到多个服务上，从而达到系统的HA (高可用)。

常见的负载均衡有软件Nginx，LVS，硬件F5等。

**Ribbon本地负载均衡客户端VS Nginx服务端负载均衡区别**

Nginx是服务器负载均衡，客户端所有请求都会交给nginx，然后由nginx实现转发请求。即负载均衡是由服务端实现的。Ribbon本地负载均衡，在调用微服务接口时候，会在注册中心上获取注册信息服务列表之后缓存到JVM本地，从而在本地实现RPC远程服务调用技术。

**集中式LB**

即在服务的消费方和提供方之间使用独立的LB设施(可以是硬件，如F5, 也可以是软件，如nginx)，由该设施负责把访问请求通过某种策略转发至服务的提供方;

**进程内LB**

将LB逻辑集成到消费方，消费方从服务注册中心获知有哪些地址可用，然后自己再从这些地址中选择出一个合适的服务器。

**Ribbon就属于进程内LB**，它只是一个类库，集成于消费方进程，消费方通过它来获取到服务提供方的地址。

**一句话**

负载均衡 + RestTemplate调用

## Ribbon的负载均衡和Rest调用

**架构说明**

总结：Ribbon其实就是一个软负载均衡的客户端组件，它可以和其他所需请求的客户端结合使用，和Eureka结合只是其中的一个实例。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.738a78r6ezs0.webp)

Ribbon在工作时分成两步：

第一步先选择EurekaServer ,它优先选择在同一个区域内负载较少的server。

第二步再根据用户指定的策略，在从server取到的服务注册列表中选择一个地址。

其中Ribbon提供了多种策略：比如轮询、随机和根据响应时间加权。

**POM**

先前工程项目没有引入spring-cloud-starter-ribbon也可以使用ribbon。

```xml
<dependency>
    <groupld>org.springframework.cloud</groupld>
    <artifactld>spring-cloud-starter-netflix-ribbon</artifactid>
</dependency>
```

这是因为spring-cloud-starter-netflix-eureka-client自带了spring-cloud-starter-ribbon引用。

二说RestTemplate的使用

[RestTemplate Java Doc](https://docs.spring.io/spring-framework/docs/5.2.2.RELEASE/javadoc-api/org/springframework/web/client/RestTemplate.html)

**getForObject() / getForEntity() **- GET请求方法

getForObject()：返回对象为响应体中数据转化成的对象，基本上可以理解为Json。

getForEntity()：返回对象为ResponseEntity对象，包含了响应中的一些重要信息，比如响应头、响应状态码、响应体等。

```java
    @GetMapping("/consumer/payment/getForEntity/{id}")
    public CommonResult<Payment> getPayment2(@PathVariable("id") Long id){
        ResponseEntity<CommonResult> entity = restTemplate.getForEntity(PAYMENT_URL + "/payment/get", CommonResult.class);

        if(entity.getStatusCode().is2xxSuccessful()){
            return entity.getBody();
        }else {
            return new CommonResult<>(444,"操作失败");
        }
    }
```

**postForObject() / postForEntity()** - POST请求方法

+ 测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.5idpiwxwga40.webp)

## Ribbon默认自带的负载规则

lRule：根据特定算法中从服务列表中选取一个要访问的服务

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.7hadzarzyps0.webp)

+ RoundRobinRule 轮询
+ RandomRule 随机
+ RetryRule 先按照RoundRobinRule的策略获取服务，如果获取服务失败则在指定时间内会进行重试
+ WeightedResponseTimeRule 对RoundRobinRule的扩展，响应速度越快的实例选择权重越大，越容易被选择
+ BestAvailableRule 会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量最小的服务
+ AvailabilityFilteringRule 先过滤掉故障实例，再选择并发较小的实例
+ ZoneAvoidanceRule 默认规则,复合判断server所在区域的性能和server的可用性选择服务器

## Ribbon负载规则替换

1. 修改cloud-consumer-order80
2. 注意配置细节

官方文档明确给出了警告:

这个自定义配置类不能放在@ComponentScan所扫描的当前包下以及子包下，

否则我们自定义的这个配置类就会被所有的Ribbon客户端所共享，达不到特殊化定制的目的了。

（**也就是说不要将Ribbon配置类与主启动类同包**）

3. 新建package - com.frx01.myrule

4. 在com.frx01.myrule下新建MySelfRule规则类

```java
@Configuration
public class MySelfRule {

    @Bean
    public IRule myRule(){
        return new RandomRule();
    }
}
```

5. 主启动类添加@RibbonClient

```java {3}
@SpringBootApplication
@EnableEurekaClient
@RibbonClient(name = "CLOUD-PAYMENT-SERVICE",configuration = MySelfRule.class)
public class OrderMain80 {
    public static void main(String[] args) {
        SpringApplication.run(OrderMain80.class,args);
    }
}
```

6. 测试

+ 开启cloud-eureka-server7001，cloud-consumer-order80，cloud-provider-payment8001，cloud-provider-payment8002
+ 浏览器-输入[http://localhost:81/consumer/payment/get/1](http://localhost:81/consumer/payment/get/1)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/image.295ji74h92v4.webp)


  返回结果中的serverPort在8001与8002两种间反复横跳。

## Ribbon默认负载轮询算法原理

默认负载轮训算法: rest接口第几次请求数 % 服务器集群总数量 = 实际调用服务器位置下标，<mark>每次服务重启动后rest接口计数从1开始</mark>。

`List<Servicelnstance> instances = discoveryClient.getInstances("CLOUD-PAYMENT-SERVICE");`

如:

+ List [0] instances = 127.0.0.1:8002
+ List [1] instances = 127.0.0.1:8001

8001+ 8002组合成为集群，它们共计2台机器，集群总数为2，按照轮询算法原理：

+ 当总请求数为1时:1%2=1对应下标位置为1，则获得服务地址为127.0.0.1:8001
+ 当总请求数位2时:2%2=0对应下标位置为0，则获得服务地址为127.0.0.1:8002
+ 当总请求数位3时:3%2=1对应下标位置为1，则获得服务地址为127.0.0.1:8001
+ 当总请求数位4时:4%2=0对应下标位置为0，则获得服务地址为127.0.0.1:8002
+ 如此类推…

## RoundRobinRule源码分析

```java {4}
package com.netflix.loadbalancer;

public interface IRule {
    Server choose(Object var1);

    void setLoadBalancer(ILoadBalancer var1);

    ILoadBalancer getLoadBalancer();
}
```

```java {26,47,54,84-91}
package com.netflix.loadbalancer;

import com.netflix.client.config.IClientConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * The most well known and basic load balancing strategy, i.e. Round Robin Rule.
 *
 * @author stonse
 * @author Nikos Michalakis <nikos@netflix.com>
 *
 */
public class RoundRobinRule extends AbstractLoadBalancerRule {

    private AtomicInteger nextServerCyclicCounter;
    private static final boolean AVAILABLE_ONLY_SERVERS = true;
    private static final boolean ALL_SERVERS = false;

    private static Logger log = LoggerFactory.getLogger(RoundRobinRule.class);

    public RoundRobinRule() {
        nextServerCyclicCounter = new AtomicInteger(0);
    }

    public RoundRobinRule(ILoadBalancer lb) {
        this();
        setLoadBalancer(lb);
    }

    //重点关注这方法。
    public Server choose(ILoadBalancer lb, Object key) {
        if (lb == null) {
            log.warn("no load balancer");
            return null;
        }

        Server server = null;
        int count = 0;
        while (server == null && count++ < 10) {
            List<Server> reachableServers = lb.getReachableServers();
            List<Server> allServers = lb.getAllServers();
            int upCount = reachableServers.size();
            int serverCount = allServers.size();//2

            if ((upCount == 0) || (serverCount == 0)) {
                log.warn("No up servers available from load balancer: " + lb);
                return null;
            }

            int nextServerIndex = incrementAndGetModulo(serverCount);//下标位置
            server = allServers.get(nextServerIndex);//0 1 0 1 0 1...

            if (server == null) {
                /* Transient. */
                Thread.yield();
                continue;
            }

            if (server.isAlive() && (server.isReadyToServe())) {
                return (server);
            }

            // Next.
            server = null;
        }

        if (count >= 10) {
            log.warn("No available alive servers after 10 tries from load balancer: "
                    + lb);
        }
        return server;
    }

    /**
     * Inspired by the implementation of {@link AtomicInteger#incrementAndGet()}.
     *
     * @param modulo The modulo to bound the value of the counter.
     * @return The next value.
     */
    private int incrementAndGetModulo(int modulo) {
        for (;;) {
            int current = nextServerCyclicCounter.get();
            int next = (current + 1) % modulo;//求余法
            if (nextServerCyclicCounter.compareAndSet(current, next))//比较并交换
                return next;
        }
    }

    @Override
    public Server choose(Object key) {
        return choose(getLoadBalancer(), key);
    }

    @Override
    public void initWithNiwsConfig(IClientConfig clientConfig) {
    }
}
```

## Ribbon之手写轮询算法

自己试着写一个类似RoundRobinRule的本地负载均衡器。

+ 7001/7002集群启动
+ 8001/8002微服务改造- controller

```java
@RestController
@Slf4j
public class PaymentController{

    ...
    
	@GetMapping(value = "/payment/lb")
    public String getPaymentLB() {
        return serverPort;//返回服务接口
    }
    
    ...
}
```

- 80订单微服务改造

1. ApplicationContextConfig去掉注解@LoadBalanced，OrderMain80去掉注解@RibbonClient

2. 创建LoadBalancer接口

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/8/16  0:55
 desc:收集现在服务器集群上总共有多少台能够提供服务的机器，放到List里面
 */
public interface LoadBalancer {

    ServiceInstance instances(List<ServiceInstance> serviceInstance);

}
```

3. 创建实现类MyLB，实现LoadBalancer接口

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/8/16  0:58
 */
@Component
public class MyLB implements LoadBalancer {

    private AtomicInteger atomicInteger = new AtomicInteger(0);//初始值为0

    public final int getAndIncrement(){
        int current;
        int next;
        do{
            current = this.atomicInteger.get();//得到初始值
            next = current >= 2147483647 ? 0 : current + 1;
        //比较，如果当前值current与期望值一致，就修改 返回true 取反 跳出循环
        }while (!this.atomicInteger.compareAndSet(current,next));
        System.out.println("-----第几次访问，次数next-----:"+next);//
        return next;
    }

    @Override
    public ServiceInstance instances(List<ServiceInstance> serviceInstance) {

        int index = getAndIncrement() % serviceInstance.size();
        return serviceInstance.get(index);
    }
}
```

4. OrderController

```java
@RestController
@Slf4j
public class OrderController {

    //public static final String PAYMENT_URL= "http://localhost:8001";
    public static final String PAYMENT_URL = "http://CLOUD-PAYMENT-SERVICE";//eureka注册的服务名称
	
    //...

    @Resource
    private LoadBalancer loadBalancer;

    @Resource
    private DiscoveryClient discoveryClient;    
	@GetMapping(value = "/consumer/payment/lb")
    public String getPaymentLB(){
        List<ServiceInstance> instances = discoveryClient.getInstances("CLOUD-PAYMENT-SERVICE");
        if(instances == null || instances.size() <= 0){
            return null;
        }
        ServiceInstance serviceInstance = loadBalancer.instances(instances);
        URI uri = serviceInstance.getUri();
        return restTemplate.getForObject(uri+"/payment/lb",String.class);
    }
    
    //...
}
```

5. 测试 不停地刷新[http://localhost:81/consumer/payment/lb](http://localhost:81/consumer/payment/lb)，可以看到8001/8002交替出现。

![QQ22918914922917714320220816013642](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220815/QQ22918914922917714320220816013642.2mrhybjr73g0.gif)

