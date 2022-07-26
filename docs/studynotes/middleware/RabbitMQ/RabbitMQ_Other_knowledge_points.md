---
title: RabbitMQ 其他知识点
date: 2022-07-26 23:55:07
permalink: /middleware/RabbitMQ/RabbitMQ_Other_knowledge_points
categories:
  - RabbitMQ
tags:
  - RabbitMQ
---

# RabbitMQ 其他知识点

[[toc]]

## 幂等性

### 概念

用户对于同一操作发起的一次请求或者多次请求的结果是一致的，不会因为多次点击而产生了副作用。举个最简单的例子，那就是支付，用户购买商品后支付，支付扣款成功，但是返回结果的时候网络异常，此时钱已经扣了，用户再次点击按钮，此时会进行第二次扣款，返回结果成功，用户查询余额发现多扣钱了，流水记录也变成了两条。在以前的单应用系统中，我们只需要把数据操作放入事务中即可，发生错误立即回滚，但是再响应客户端的时候也有可能出现网络中断或者异常等等。

可以理解为验证码，只能输入一次，再次重新输入会刷新验证码，原来的验证码失效。

### 消息重复消费

消费者在消费 MQ 中的消息时，MQ 已把消息发送给消费者，消费者在给 MQ 返回 ack 时网络中断， 故 MQ 未收到确认信息，该条消息会重新发给其他的消费者，或者在网络重连后再次发送给该消费者，但实际上该消费者已成功消费了该条消息，造成消费者消费了重复的消息。

### 解决思路

MQ 消费者的幂等性的解决一般使用全局 ID 或者写个唯一标识比如时间戳 或者 UUID 或者订单消费者消费 MQ 中的消息也可利用 MQ 的该 id 来判断，或者可按自己的规则生成一个全局唯一 id，每次消费消息时用该 id 先判断该消息是否已消费过。

### 消费端的幂等性保障

在海量订单生成的业务高峰期，生产端有可能就会重复发生了消息，这时候消费端就要实现幂等性，这就意味着我们的消息永远不会被消费多次，即使我们收到了一样的消息。

业界主流的幂等性有两种操作：

- 唯一 ID+ 指纹码机制,利用数据库主键去重

指纹码：我们的一些规则或者时间戳加别的服务给到的唯一信息码,它并不一定是我们系统生成的，基本都是由我们的业务规则拼接而来，但是一定要保证唯一性，然后就利用查询语句进行判断这个 id 是否存在数据库中，优势就是实现简单就一个拼接，然后查询判断是否重复；劣势就是在高并发时，如果是单个数据库就会有写入性能瓶颈当然也可以采用分库分表提升性能，但也不是我们最推荐的方式。

- Redis 的原子性

利用 redis 执行 setnx 命令，天然具有幂等性。从而实现不重复消费

## 优先级队列

### 使用场景

在我们系统中有一个订单催付的场景，我们的客户在天猫下的订单，淘宝会及时将订单推送给我们，如果在用户设定的时间内未付款那么就会给用户推送一条短信提醒，很简单的一个功能对吧。

但是，tmall 商家对我们来说，肯定是要分大客户和小客户的对吧，比如像苹果，小米这样大商家一年起码能给我们创造很大的利润，所以理应当然，他们的订单必须得到优先处理，而曾经我们的后端系统是使用 redis 来存放的定时轮询，大家都知道 redis 只能用 List 做一个简简单单的消息队列，并不能实现一个优先级的场景，所以订单量大了后采用 RabbitMQ 进行改造和优化，如果发现是大客户的订单给一个相对比较高的优先级， 否则就是默认优先级。

### 添加方法

+ Web页面添加

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220726/image.2xm08z870l40.webp)

1. 进入 Web 页面，点击 Queue 菜单，然后点击 `Add a new queue`
2. 点击下方的 `Maximum priority`
3. 执行第二步，则会自动在 `Argument` 生成 `x-max-priority` 字符串
4. 点击 `Add queue` 即可添加优先级队列成功

+ 声明队列的时候添加优先级

设置队列的最大优先级 最大可以设置到 255 官网推荐 1-10 如果设置太高比较吃内存和 CPU

```java
Map<String, Object> params = new HashMap();
// 优先级为 10
params.put("x-max-priority", 10);
channel.queueDeclare("hello", true, false, false, params);
```

::: tip 注意事项

队列实现优先级需要做的事情有如下：队列需要设置为优先级队列，消息需要设置消息的优先级，消费者需要等待消息已经发送到队列中才去消费，因为这样才有机会对消息进行排序

:::

## 实战

生产者发送十个消息，如果消息为 `info5`，则优先级是最高的，当消费者从队列获取消息的时候，优先获取 `info5` 消息

### 非SpringBoot

#### 生产者代码

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/26  23:53
 * desc:优先级 生产者
 */
public class PriorityProducer {

    private static final String QUEUE_NAME = "priority_queue";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();

        //给消息赋予一个priority属性
        AMQP.BasicProperties properties =
                new AMQP.BasicProperties().builder().priority(1).priority(10).build();

        for (int i = 1; i < 11; i++) {
            String message = "info"+i;
            if(i==5){
                channel.basicPublish("",QUEUE_NAME,properties,message.getBytes());
            }else {
                channel.basicPublish("",QUEUE_NAME,null,message.getBytes());
            }
            System.out.println("消息发送完成："+message);
        }
    }
}
```

#### 消费者代码

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/26  23:58
 * desc:优先级 消费者
 */
public class PriorityConsumer {

    private final static String QUEUE_NAME = "priority_queue";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();

        //设置队列的最大优先级 最大可以设置到255 官网推荐1-10 如果设置太高比较吃内存和CPU
        Map<String, Object> params = new HashMap<>();
        params.put("x-max-priority",10);
        channel.queueDeclare(QUEUE_NAME,true,false,false,params);

        //推送消息如何进行消费的接口回调
        DeliverCallback deliverCallback = (consumerTag, delivery) ->{
            String message = new String(delivery.getBody());
            System.out.println("消费的消息: "+message);
        };

        //取消消费的一个回调接口 如在消费的时候队列被删除掉了
        CancelCallback cancelCallback = (consumerTag) ->{
            System.out.println("消息消费被中断");
        };

        channel.basicConsume(QUEUE_NAME,true,deliverCallback,cancelCallback);
    }
}
```

**效果演示**

info 5 的优先级为 10，优先级最高。消费者消费信息效果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220726/image.3vjjukfu3r00.webp)

### 整合SpringBoot

仅需在声明队列的时候加上参数即可

#### **配置类代码**

声明队列时，给队列设置优先级

```java
@Configuration
public class QueueConfig {

    //声明优先队列
    @Bean("queue")
    public Queue queue(){
        Map<String,Object> args = new HashMap<>(3);
        args.put("x-max-priority",10);
        return QueueBuilder.durable("priority_queue").withArguments(args).build();
    }

    //声明一个交换机
    @Bean("exchange")
    public DirectExchange exchange(){
        return new DirectExchange("priority_exchange");
    }

    //交换机和优先级队列进行绑定
    @Bean
    public Binding queueBindingX(@Qualifier("queue") Queue queue,
                                 @Qualifier("exchange") DirectExchange exchange){
        return BindingBuilder.bind(queue).to(exchange).with("priority");
    }
}
```

#### 生成者Controller代码

获取请求发来的消息，并给消息设置优先级

```java
@Slf4j
@RestController
@RequestMapping("/ttl")
public class SendMsgController {
    
    @Autowired
    private RabbitTemplate rabbitTemplate; 
    
	@GetMapping("sendExpirationMsg/{message}")
    public void sendExpirationMsg(@PathVariable("message") String message){
        rabbitTemplate.convertAndSend("X","XC",message,correlationData ->{
            //设置消息的优先级
            correlationData.getMessageProperties().setPriority(10);
            return correlationData;
        });
        log.info("当前时间：{},发送一条信息给队列:{}", new Date(), message);
    }
}
```

#### **消费者代码**

