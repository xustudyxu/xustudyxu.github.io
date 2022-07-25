---
title: RabbitMQ 延迟队列
date: 2022-07-26 01:09:49
permalink: /middleware/RabbitMQ/RabbitMQ_Delay_queue
categories:
  - RabbitMQ
tags:
  - RabbitMQ
---
# RabbitMQ 延迟队列

[[toc]]

## 延迟队列介绍

**延迟队列概念：**

延时队列,队列内部是有序的，最重要的特性就体现在它的延时属性上，延时队列中的元素是希望 在指定时间到了以后或之前取出和处理，简单来说，延时队列就是用来存放需要在指定时间被处理的 元素的队列。

**延迟队列使用场景：**

1. 订单在十分钟之内未支付则自动取消
2. 新创建的店铺，如果在十天内都没有上传过商品，则自动发送消息提醒
3. 用户注册成功后，如果三天内没有登陆则进行短信提醒
4. 用户发起退款，如果三天内没有得到处理则通知相关运营人员
5. 预定会议后，需要在预定的时间点前十分钟通知各个与会人员参加会议

这些场景都有一个特点，需要在某个事件发生之后或者之前的指定时间点完成某一项任务，如： 发生订单生成事件，在十分钟之后检查该订单支付状态，然后将未支付的订单进行关闭；那我们一直轮询数据，每秒查一次，取出需要被处理的数据，然后处理不就完事了吗？

如果数据量比较少，确实可以这样做，比如：对于「如果账单一周内未支付则进行自动结算」这样的需求， 如果对于时间不是严格限制，而是宽松意义上的一周，那么每天晚上跑个定时任务检查一下所有未支付的账单，确实也是一个可行的方案。但对于数据量比较大，并且时效性较强的场景，如：「订单十分钟内未支付则关闭」，短期内未支付的订单数据可能会有很多，活动期间甚至会达到百万甚至千万级别，对这么庞大的数据量仍旧使用轮询的方式显然是不可取的，很可能在一秒内无法完成所有订单的检查，同时会给数据库带来很大压力，无法满足业务要求而且性能低下。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.21tyby27zrog.webp)

## TTL的两种设置

TTL 是什么呢？TTL 是 RabbitMQ 中一个消息或者队列的属性，表明一条消息或者该队列中的所有消息的最大存活时间，单位是毫秒。

换句话说，如果一条消息设置了 TTL 属性或者进入了设置 TTL 属性的队列，那么这条消息如果在 TTL 设置的时间内没有被消费，则会成为「死信」。如果同时配置了队列的 TTL 和消息的 TTL，那么较小的那个值将会被使用，有两种方式设置 TTL。

**队列设置 TTL**

在创建队列的时候设置队列的 x-message-ttl 属性

```java
Map<String, Object> params = new HashMap<>();
params.put("x-message-ttl",5000);
return QueueBuilder.durable("QA").withArguments(args).build(); // QA 队列的最大存活时间位 5000 毫秒
```

**消息设置 TTL**

针对每条消息设置 TTL

```java
rabbitTemplate.converAndSend("X","XC",message,correlationData -> {
    correlationData.getMessageProperties().setExpiration("5000");
});
```

两个代码块来自下方的案例

**两者区别**

如果设置了队列的 TTL 属性，那么一旦消息过期，就会被队列丢弃(如果配置了死信队列被丢到死信队列中)，而第二种方式，消息即使过期，也不一定会被马上丢弃，因为消息是否过期是在即将投递到消费者之前判定的，如果当前队列有严重的消息积压情况，则已过期的消息也许还能存活较长时间，具体看下方案例。

另外，还需要注意的一点是，如果不设置 TTL，表示消息永远不会过期，如果将 TTL 设置为 0，则表示除非此时可以直接投递该消息到消费者，否则该消息将会被丢弃

## 整合SpringBoot

前一小节我们介绍了死信队列，刚刚又介绍了 TTL，至此利用 RabbitMQ 实现延时队列的两大要素已经集齐，接下来只需要将它们进行融合，再加入一点点调味料，延时队列就可以新鲜出炉了。想想看，延时队列，不就是想要消息延迟多久被处理吗，TTL 则刚好能让消息在延迟多久之后成为死信，另一方面，成为死信的消息都会被投递到死信队列里，这样只需要消费者一直消费死信队列里的消息就完事了，因为里面的消息都是希望被立即处理的消息。

1. 创建一个 Maven 工程或者 Spring Boot工程
2. 添加依赖，这里的 Spring Boot 是2.5.5 版本

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.5.5</version>
    <relativePath/> 
</parent>
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>fastjson</artifactId>
        <version>1.2.47</version>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <!--RabbitMQ 依赖-->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-amqp</artifactId>
    </dependency>
</dependencies>
```

3. 创建 `application.yml` 文件

```yaml
server:
  port: 8888
spring:
  rabbitmq:
    host: 192.168.91.200
    port: 5672
    username: root
    password: 123
```

这里是 8808 端口，可根据需求决定端口

4. 新建主启动类

```java
@SpringBootApplication
public class RabbitmqSpringbootApplication {

    public static void main(String[] args) {
        SpringApplication.run(RabbitmqSpringbootApplication.class, args);
    }

}
```

## 队列TTL

### **代码架构图**

创建两个队列 QA 和 QB，两个队列的 TTL 分别设置为 10S 和 40S，然后再创建一个交换机 X 和死信交换机 Y，它们的类型都是 direct，创建一个死信队列 QD，它们的绑定关系如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.6ipia9redgw0.webp)

原先配置队列信息，写在了生产者和消费者代码中，现在可写在配置类中，生产者只发消息，消费者只接受消息

### **配置类代码**

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/25  22:31
 * desc:TTL队列 配置文件类代码
 */
@Configuration
public class TtlQueueConfig {

    //普通交换机的名称
    public static final String X_EXCHANGE="X";
    //死信交换机的名称
    public static final String Y_DEAD_LETTER_EXCHANGE="Y";
    //普通队列的名称
    public static final String QUEUE_A="QA";
    public static final String QUEUE_B="QB";
    //死信队列的名称
    public static final String DEAD_LETTER_QUEUE="QD";

    //声明xExchange  别名
    @Bean("xExchange")
    public DirectExchange xExchange(){
        return new DirectExchange(X_EXCHANGE);
    }

    //声明yExchange 别名
    @Bean("yExchange")
    public DirectExchange yExchange(){
        return new DirectExchange(Y_DEAD_LETTER_EXCHANGE);
    }

    //声明普通队列  要有ttl 为10s
    @Bean("queueA")
    public Queue queueA(){
        Map<String,Object> arguments = new HashMap<>(3);
        //设置死信交换机
        arguments.put("x-dead-letter-exchange",Y_DEAD_LETTER_EXCHANGE);
        //设置死信RoutingKey
        arguments.put("x-dead-letter-routing-key","YD");
        //设置TTL 10s 单位是ms
        arguments.put("x-message-ttl",10000);
        return QueueBuilder.durable(QUEUE_A).withArguments(arguments).build();
    }

    //声明普通队列  要有ttl 为40s
    @Bean("queueB")
    public Queue queueB(){
        Map<String,Object> arguments = new HashMap<>(3);
        //设置死信交换机
        arguments.put("x-dead-letter-exchange",Y_DEAD_LETTER_EXCHANGE);
        //设置死信RoutingKey
        arguments.put("x-dead-letter-routing-key","YD");
        //设置TTL 10s 单位是ms
        arguments.put("x-message-ttl",40000);
        return QueueBuilder.durable(QUEUE_B).withArguments(arguments).build();
    }

    //声明死信队列  要有ttl 为40s
    @Bean("queueD")
    public Queue queueD(){
        return QueueBuilder.durable(DEAD_LETTER_QUEUE).build();
    }

    //声明队列 QA 绑定 X 交换机
    @Bean
    public Binding queueABindingX(@Qualifier("queueA") Queue queueA,
                                  @Qualifier("xExchange") DirectExchange xExchange){
        return BindingBuilder.bind(queueA).to(xExchange).with("XA");
    }

    //声明队列 QB 绑定 X 交换机
    @Bean
    public Binding queueBBindingX(@Qualifier("queueB") Queue queueB,
                                  @Qualifier("xExchange") DirectExchange xExchange){
        return BindingBuilder.bind(queueB).to(xExchange).with("XB");
    }

    //声明队列 QD 绑定 Y 交换机
    @Bean
    public Binding queueDBindingY(@Qualifier("queueD") Queue queueD,
                                  @Qualifier("yExchange") DirectExchange yExchange){
        return BindingBuilder.bind(queueD).to(yExchange).with("YD");
    }

}
```

### 生产者

**Controller 层代码，获取消息，放到 RabbitMQ** 里

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/25  23:00
 * desc:发送延迟消息
 */
@Slf4j
@RestController
@RequestMapping("/ttl")
public class SendMsgController {

    @Autowired
    private RabbitTemplate rabbitTemplate;
    //开始发消息
    @GetMapping("/sendMsg/{message}")
    public void sendMsg(@PathVariable("message") String message){
        log.info("当前时间:{},发送一条信息给两个TTL队列：{}",new Date().toString(),message);
        rabbitTemplate.convertAndSend("X","XA","消息来自ttl为10s的队列:"+message);
        rabbitTemplate.convertAndSend("X","XB","消息来自ttl为40s的队列:"+message);

    }
}
```

发起一个请求：[http://localhost:8888/ttl/sendMsg/嘻嘻嘻](http://localhost:8888/ttl/sendMsg/%E5%98%BB%E5%98%BB%E5%98%BB)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.2x90cjk4j3c0.webp)

第一条消息在 10S 后变成了死信消息，然后被消费者消费掉，第二条消息在 40S 之后变成了死信消息， 然后被消费掉，这样一个延时队列就打造完成了。

不过，如果这样使用的话，岂不是每增加一个新的时间需求，就要新增一个队列，这里只有 10S 和 40S 两个时间选项，如果需要一个小时后处理，那么就需要增加 TTL 为一个小时的队列，如果是预定会议室然后提前通知这样的场景，岂不是要增加无数个队列才能满足需求？

## 延时队列TTL优化

在这里新增了一个队列 QC，该队列不设置 TTL 时间，根据前端的请求确定 TTL 时间，绑定关系如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.267zky9xj8dc.webp)

### **配置类代码**

新增一个配置文件类，用于新增队列 QC，也可以放在上方的配置文件类里

```java
@Configuration
public class MsgTtlQueueConfig {

    //普通队列的名称
    public static final String QUEUE_C = "QC";

    //死信交换机的名称
    public static final String Y_DEAD_LETTER_EXCHANGE="Y";

    //声明QC
    @Bean("queueC")
    public Queue QueueC(){
        Map<String,Object> arguments = new HashMap<>(3);
        //设置死信交换机
        arguments.put("x-dead-letter-exchange",Y_DEAD_LETTER_EXCHANGE);
        //设置死信RoutingKey
        arguments.put("x-dead-letter-routing-key","XC");
        return QueueBuilder.durable(QUEUE_C).withArguments(arguments).build();
    }
    //声明队列 QC 绑定 X 交换机
    @Bean
    public Binding queueCBindingX(@Qualifier("queueC") Queue queueC,
                                  @Qualifier("xExchange")DirectExchange xExchange){
        return BindingBuilder.bind(queueC).to(xExchange).with("XC");
    }

}
```

### 生产者

**Controller 新增方法**

该方法接收的请求要带有 TTL 时间

```java {18-28}
@Slf4j
@RestController
@RequestMapping("/ttl")
public class SendMsgController {

    @Autowired
    private RabbitTemplate rabbitTemplate;
    //开始发消息
    @GetMapping("/sendMsg/{message}")
    public void sendMsg(@PathVariable("message") String message){
        log.info("当前时间:{},发送一条信息给两个TTL队列：{}",new Date().toString(),message);
        rabbitTemplate.convertAndSend("X","XA","消息来自ttl为10s的队列:"+message);
        rabbitTemplate.convertAndSend("X","XB","消息来自ttl为40s的队列:"+message);

    }

    //开始发消息 发TTL
    @GetMapping("/sendExpirationMsg/{message}/{ttlTime}")
    public void sendMsg(@PathVariable("message") String message,
                        @PathVariable("ttlTime") String ttlTime){
        log.info("当前时间:{},发送一条时长是{}毫秒TTL信息给队列QC：{}",
                new Date().toString(),ttlTime,message);
        rabbitTemplate.convertAndSend("X","XC",message,msg -> {
            //发送消息的时候的延迟时长
            msg.getMessageProperties().setExpiration(ttlTime);
            return msg;
        });
    }
}
```

重启下面，发送请求：

[http://localhost:8888/ttl/sendExpirationMsg/你好1/20000]()

[http://localhost:8888/ttl/sendExpirationMsg/你好2/2000]()

> **出现问题**:
>
> ![1658765665496](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220726/1658765665496.39yyrmljat80.webp)

看起来似乎没什么问题，但是在最开始的时候，就介绍过如果使用在消息属性上设置 TTL 的方式，消息可能并不会按时「死亡」

> 因为 RabbitMQ 只会检查第一个消息是否过期，如果过期则丢到死信队列， 如果第一个消息的延时时长很长，而第二个消息的延时时长很短，第二个消息并不会优先得到执行

这也就是为什么如图的时间：你好 2 延时 2 秒，却后执行，还要等待你好 1 消费后再执行你好2

## Rabbitmq插件实现延迟队列

上文中提到的问题，确实是一个问题，如果不能实现在消息粒度上的 TTL，并使其在设置的 TTL 时间及时死亡，就无法设计成一个通用的延时队列。那如何解决呢，接下来我们就去解决该问题。

**安装延时队列插件**

可去[官网下载](https://www.rabbitmq.com/community-plugins.html)找到 **rabbitmq_delayed_message_exchange** 插件，放置到 RabbitMQ 的插件目录。

因为官网也是跳转去该插件的 GitHub 地址进行下载：[点击跳转](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/releases)

打开 Linux，用 `Xftp` 将插件放到 RabbitMQ 的<mark>安装目录</mark>下的 plgins 目录，

RabbitMQ 与其 plgins 目录默认分别位于

```sh
# RabbitMQ 安装目录
cd /usr/lib/rabbitmq/lib/rabbitmq_server-3.8.8   
# RabbitMQ 的 plgins 所在目录
cd /usr/lib/rabbitmq/lib/rabbitmq_server-3.8.8/plugins
```

其中我的版本是 `/rabbitmq_server-3.8.8`

进入目录后执行下面命令让该插件生效，然后重启 RabbitMQ

```sh
# 安装
rabbitmq-plugins enable rabbitmq_delayed_message_exchange
# 重启服务
systemctl restart rabbitmq-server
```

```sh
[root@master plugins]# rabbitmq-plugins enable rabbitmq_delayed_message_exchange
Enabling plugins on node rabbit@master:
rabbitmq_delayed_message_exchange
The following plugins have been configured:
  rabbitmq_delayed_message_exchange
  rabbitmq_management
  rabbitmq_management_agent
  rabbitmq_web_dispatch
Applying plugin configuration to rabbit@master...
The following plugins have been enabled:
  rabbitmq_delayed_message_exchange

started 1 plugins.
[root@master plugins]# systemctl restart rabbitmq-server
```

::: tip 解释

安装命令不能出现插件版本和后缀，如 `rabbitmq-plugins enable rabbitmq_delayed_message_exchange-3.8.0.ez` 会报错

必须是 `rabbitmq-plugins enable rabbitmq_delayed_message_exchange`，后面不允许填入版本和文件后缀

:::

打开 Web 界面，查看交换机的新增功能列表，如果多出了如图所示，代表成功添加插件

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.3nqc69j0pws0.webp)

## 插件实战

在这里新增了一个队列 delayed.queue，一个自定义交换机 delayed.exchange，绑定关系如下:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.1tla4z5g4yps.webp)

### 配置类代码

新增一个配置类 `DelayedQueueConfig`，也可以放在原来的配置文件里，代码里使用了 `CustomExchange` 类，通过参数来自定义一个类型(direct、topic等)

在我们自定义的交换机中，这是一种新的交换类型，该类型消息支持延迟投递机制消息传递后并不会立即投递到目标队列中，而是存储在 mnesia(一个分布式数据系统)表中，当达到投递时间时，才投递到目标队列中。

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/26  0:39
 */
@Configuration
public class DelayedQueueConfig {

    //交换机
    public static final String DELAYED_EXCHANGE_NAME = "delayed.exchange";
    //队列
    public static final String DELAYED_QUEUE_NAME = "delayed.queue";
    //routingKey
    public static final String DELAYED_ROUTING_KEY = "delayed.routingkey";


    @Bean
    public Queue delayedQueue(){
        return new Queue(DELAYED_QUEUE_NAME);
    }

    //声明交换机,基于插件的交换机
    @Bean
    public CustomExchange delayedExchange(){

        Map<String,Object> arguments = new HashMap<>();
        arguments.put("x-delayed-type","direct");
        /**
         * 1.交换机的名称
         * 2.交换机的类型 x-delayed-message
         * 3.是否需要持久化
         * 4.是否需要自动删除
         * 5.其他的参数
         */
        return new CustomExchange(DELAYED_EXCHANGE_NAME,"x-delayed-message",
                true,false,arguments);
    }

    //绑定
    @Bean
    public Binding delayedQueueBindingDelayedExchange(
            @Qualifier("delayedQueue") Queue delayedQueue,
            @Qualifier("delayedExchange")CustomExchange delayedExchange){
        return BindingBuilder.bind(delayedQueue).to(delayedExchange)
                .with(DELAYED_ROUTING_KEY).noargs();
    }
}
```

**生产者代码**

在 controller 里新增一个方法

```java
    //开始发消息，基于插件的 消息及 延迟的时间
    @GetMapping("/sendDelayMsg/{message}/{delayTime}")
    public void sendMsg(@PathVariable("message") String message,
                        @PathVariable("delayTime") Integer delayTime){
        log.info("当前时间:{},发送一条时长是{}毫秒TTL信息给延迟队列delayed.queue：{}",
                new Date().toString(),delayTime,message);

        rabbitTemplate.convertAndSend(DelayedQueueConfig.DELAYED_EXCHANGE_NAME,
                DelayedQueueConfig.DELAYED_ROUTING_KEY,message, msg -> {
            //发送消息的时候的延迟时长 单位ms
            msg.getMessageProperties().setDelay(delayTime);
            return msg;
        });
    }
```

**消费者代码**

监听延时队列，如果有消息进入该队列，则打印到控制台

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/26  1:00
 * desc:消费者，消费基于插件的延迟消息
 */
@Slf4j
@Component
public class DelayQueueConsumer {

    @RabbitListener(queues = DelayedQueueConfig.DELAYED_QUEUE_NAME)
    public void receiveDelayQueue(Message message){
        String msg = new String(message.getBody());
        log.info("当前时间：{},收到延时队列的消息：{}", new Date().toString(), msg);
    }
}
```

[http://localhost:8888/ttl/sendDelayMsg/hello1/20000](http://localhost:8888/ttl/sendDelayMsg/hello1/20000)

[http://localhost:8888/ttl/sendDelayMsg/hello2/2000](http://localhost:8888/ttl/sendDelayMsg/hello2/2000)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.17h77dwilchs.webp)

可以看到哪怕 hello1 需要20秒再进入延时队列，hello2 2 秒后直接进入延时队列，无需等待 hello1

## 总结

延时队列在需要延时处理的场景下非常有用，使用 RabbitMQ 来实现延时队列可以很好的利用 RabbitMQ 的特性，如：消息可靠发送、消息可靠投递、死信队列来保障消息至少被消费一次以及未被正确处理的消息不会被丢弃。另外，通过 RabbitMQ 集群的特性，可以很好的解决单点故障问题，不会因为单个节点挂掉导致延时队列不可用或者消息丢失。

当然，延时队列还有很多其它选择，比如利用 Java 的 DelayQueue，利用 Redis 的 zset，利用 Quartz 或者利用 kafka 的时间轮，这些方式各有特点,看需要适用的场景。

