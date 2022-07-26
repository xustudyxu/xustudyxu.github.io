---
title: RabbitMQ 死信队列
date: 2022-07-25 20:36:34
permalink: /middleware/RabbitMQ/RabbitMQ_Dead_QUEUE
categories:
  - RabbitMQ
tags:
  - RabbitMQ
---
# RabbitMQ 死信队列

[[toc]]

## 死信的概念

先从概念解释上搞清楚这个定义，死信，顾名思义就是无法被消费的消息，字面意思可以这样理解，一般来说，producer 将消息投递到 broker 或者直接到queue 里了，consumer 从 queue 取出消息 进行消费，但某些时候由于特定的原因**导致 queue 中的某些消息无法被消费**，这样的消息如果没有后续的处理，就变成了死信，有死信自然就有了死信队列。

应用场景：为了保证订单业务的消息数据不丢失，需要使用到 RabbitMQ 的死信队列机制，当消息消费发生异常时，将消息投入死信队列中。还有比如说：用户在商城下单成功并点击去支付后在指定时间未支付时自动失效。

## 死信的来源

- 消息 TTL 过期

  TTL是 Time To Live 的缩写, 也就是生存时间

- 队列达到最大长度

  队列满了，无法再添加数据到 MQ 中

- 消息被拒绝

  (basic.reject 或 basic.nack) 并且 requeue = false

## 死信实战

交换机类型是 direct，两个消费者，一个生产者，两个队列：消息队列和死信队列

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.691xh9mh3yk0.webp)

### 消息TTL过期

**生产者**

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/25  19:13
 * desc:死信队列之生产者
 */
public class Producer {
    //普通交换机的名称
    public static final String NORMAL_EXCHANGE = "normal_exchange";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();

        //死信消息 设置ttl时间 live to time 单位是ms
        AMQP.BasicProperties properties =
                new AMQP.BasicProperties().builder().expiration("10000").build();
        for (int i = 1; i <11 ; i++) {
            String message = "info"+i;
            channel.basicPublish(NORMAL_EXCHANGE,"zhangsan",properties,message.getBytes());
        }
    }
}
```

**消费者 C1 代码**(启动之后关闭该消费者 模拟其接收不到消息)

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/25  17:00
 * desc:本次是为了死信队列实战
 * 消费者1
 */
public class Consumer01 {

    //普通交换机的名称
    public static final String NORMAL_EXCHANGE = "normal_exchange";
    //死信交换机的名称
    public static final String DEAD_EXCHANGE = "dead_exchange";

    //普通队列的名称
    public static final String NORMAL_QUEUE = "normal_queue";
    //死信队列的名称
    public static final String DEAD_QUEUE = "dead_queue";

    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMQUtils.getChannel();

        //声明死信和普通交换机，类型为direct
        channel.exchangeDeclare(NORMAL_EXCHANGE, BuiltinExchangeType.DIRECT);
        channel.exchangeDeclare(DEAD_EXCHANGE, BuiltinExchangeType.DIRECT);

        //声明普通队列
        Map<String,Object> arguments = new HashMap<>();
        //过期时间 10s 由生产者指定 更加灵活
        //arguments.put("x-message-ttl",10000);
        //正常的队列设置死信交换机
        arguments.put("x-dead-letter-exchange",DEAD_EXCHANGE);//图中红箭头
        //设置死信routingKey
        arguments.put("x-dead-letter-routingKey","lisi");

        channel.queueDeclare(NORMAL_QUEUE,false,false,false,arguments);
        /////////////////////////////////////////////////////////////////////////
        //声明死信队列
        channel.queueDeclare(DEAD_QUEUE,false,false,false,null);

        //绑定普通的交换机与队列
        channel.queueBind(NORMAL_QUEUE,NORMAL_EXCHANGE,"zhangsan");

        //绑定死信的交换机与死信的队列
        channel.queueBind(DEAD_QUEUE,DEAD_EXCHANGE,"lisi");
        System.out.println("等待接收消息...");

        DeliverCallback deliverCallback = (consumerTag,message) ->{
            System.out.println("Consumer01接受的消息是："+new String(message.getBody(),"UTF-8"));
        };

        channel.basicConsume(NORMAL_QUEUE,true,deliverCallback,consumerTag -> {});
    }

}
```

先启动消费者 C1，创建出队列，然后停止该 C1 的运行，则 C1 将无法收到队列的消息，无法收到的消息 10 秒后进入死信队列。启动生产者 producer 生产消息

**生产者未发送消息**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220726/image.5ldx5kffws00.webp)

**生产者发送了10条消息，此时正常消息队列有10条未消费消息**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220726/image.4k5fjvtukpe0.webp)

**时间过去10秒，正常队列里面的消息由于没有被消费，消息进入死信队列**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.5g2svti1sec0.webp)

**消费者 C2 代码**

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/25  19:30
 */
public class Consumer02 {

    //死信队列的名称
    public static final String DEAD_QUEUE = "dead_queue";

    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMQUtils.getChannel();

        System.out.println("等待接收死信消息...");

        DeliverCallback deliverCallback = (consumerTag, message) ->{
            System.out.println("Consumer02接受的消息是："+new String(message.getBody(),"UTF-8"));
        };

        channel.basicConsume(DEAD_QUEUE,true,deliverCallback,consumerTag -> {});
    }
}
```

**效果演示**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.3a1tkaqx5jm0.webp)

+ 控制台

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.2qvoqd9bcdc0.webp)

### 死信最大长度

1. 消息生产者代码去掉 TTL 属性，`basicPublish` 的第三个参数改为 null

```java {9,10,13}
public class Producer {
    //普通交换机的名称
    public static final String NORMAL_EXCHANGE = "normal_exchange";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();

        //死信消息 设置ttl时间 live to time 单位是ms
        //AMQP.BasicProperties properties =
        //        new AMQP.BasicProperties().builder().expiration("10000").build();
        for (int i = 1; i <11 ; i++) {
            String message = "info"+i;
            channel.basicPublish(NORMAL_EXCHANGE,"zhangsan",null,message.getBytes());
        }
    }
}
```

2. C1 消费者修改以下代码(**启动之后关闭该消费者 模拟其接收不到消息**)

```java {30}
public class Consumer01 {

    //普通交换机的名称
    public static final String NORMAL_EXCHANGE = "normal_exchange";
    //死信交换机的名称
    public static final String DEAD_EXCHANGE = "dead_exchange";

    //普通队列的名称
    public static final String NORMAL_QUEUE = "normal_queue";
    //死信队列的名称
    public static final String DEAD_QUEUE = "dead_queue";

    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMQUtils.getChannel();

        //声明死信和普通交换机，类型为direct
        channel.exchangeDeclare(NORMAL_EXCHANGE, BuiltinExchangeType.DIRECT);
        channel.exchangeDeclare(DEAD_EXCHANGE, BuiltinExchangeType.DIRECT);

        //声明普通队列
        Map<String,Object> arguments = new HashMap<>();
        //过期时间 10s 由生产者指定 更加灵活
        //arguments.put("x-message-ttl",10000);
        //正常的队列设置死信交换机
        arguments.put("x-dead-letter-exchange",DEAD_EXCHANGE);//图中红箭头
        //设置死信routingKey
        arguments.put("x-dead-letter-routing-key","lisi");
        //设置正常队列长度的限制，例如发送10个消息，6个为正常，4个为死信
        arguments.put("x-max-length",6);

        channel.queueDeclare(NORMAL_QUEUE,false,false,false,arguments);
        /////////////////////////////////////////////////////////////////////////
        //声明死信队列
        channel.queueDeclare(DEAD_QUEUE,false,false,false,null);

        //绑定普通的交换机与队列
        channel.queueBind(NORMAL_QUEUE,NORMAL_EXCHANGE,"zhangsan");

        //绑定死信的交换机与死信的队列
        channel.queueBind(DEAD_QUEUE,DEAD_EXCHANGE,"lisi");
        System.out.println("等待接收消息...");

        DeliverCallback deliverCallback = (consumerTag,message) ->{
            System.out.println("Consumer01接受的消息是："+new String(message.getBody(),"UTF-8"));
        };

        channel.basicConsume(NORMAL_QUEUE,true,deliverCallback,consumerTag -> {});
    }

}
```

::: tip 注意

因为参数改变了，所以需要把原先队列删除

:::

3. C2 消费者代码不变

+ 启动消费者C1，创建出队列，然后停止该 C1 的运行，启动生产者

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.6nv41w7ky0o0.webp)

+ 启动 C2 消费者

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.3mg5ph9jr020.webp)

+ 控制台

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.664h3njwl6w0.webp)

### 死信消息被拒

1. 消息生产者代码同上生产者一致
2. 需求：消费者 C1 拒收消息 "info5"，开启手动应答

**消费者C1**

```java {30,46-53,57}
public class Consumer01 {

    //普通交换机的名称
    public static final String NORMAL_EXCHANGE = "normal_exchange";
    //死信交换机的名称
    public static final String DEAD_EXCHANGE = "dead_exchange";

    //普通队列的名称
    public static final String NORMAL_QUEUE = "normal_queue";
    //死信队列的名称
    public static final String DEAD_QUEUE = "dead_queue";

    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMQUtils.getChannel();

        //声明死信和普通交换机，类型为direct
        channel.exchangeDeclare(NORMAL_EXCHANGE, BuiltinExchangeType.DIRECT);
        channel.exchangeDeclare(DEAD_EXCHANGE, BuiltinExchangeType.DIRECT);

        //声明普通队列
        Map<String,Object> arguments = new HashMap<>();
        //过期时间 10s 由生产者指定 更加灵活
        //arguments.put("x-message-ttl",10000);
        //正常的队列设置死信交换机
        arguments.put("x-dead-letter-exchange",DEAD_EXCHANGE);//图中红箭头
        //设置死信routingKey
        arguments.put("x-dead-letter-routing-key","lisi");
        //设置正常队列长度的限制，例如发送10个消息，6个为正常，4个为死信
        //arguments.put("x-max-length",6);

        channel.queueDeclare(NORMAL_QUEUE,false,false,false,arguments);
        /////////////////////////////////////////////////////////////////////////
        //声明死信队列
        channel.queueDeclare(DEAD_QUEUE,false,false,false,null);

        //绑定普通的交换机与队列
        channel.queueBind(NORMAL_QUEUE,NORMAL_EXCHANGE,"zhangsan");

        //绑定死信的交换机与死信的队列
        channel.queueBind(DEAD_QUEUE,DEAD_EXCHANGE,"lisi");
        System.out.println("等待接收消息...");

        DeliverCallback deliverCallback = (consumerTag,message) ->{
            String msg = new String(message.getBody(), "UTF-8");
            if(msg.equals("info5")){
                System.out.println("Consumer01接受的消息是："+msg+"： 此消息是被C1拒绝的");
                //requeue 设置为 false 代表拒绝重新入队 该队列如果配置了死信交换机将发送到死信队列中
                channel.basicReject(message.getEnvelope().getDeliveryTag(), false);
            }else {
                System.out.println("Consumer01接受的消息是："+msg);
                channel.basicAck(message.getEnvelope().getDeliveryTag(), false);
            }

        };
        //开启手动应答，也就是关闭手动应答
        channel.basicConsume(NORMAL_QUEUE,false,deliverCallback,consumerTag -> {});
    }

}
```

+ 开启消费者C1，创建出队列，然后停止该 C1 的运行，启动生产者

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.ncokzmns2t.webp)

+ 启动消费者 C1 等待 10 秒之后，再启动消费者 C2

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.1xxchsmgsgdc.webp)

+ C1控制台

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.5zgbkg8gij80.webp)

+ C2控制台

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220725/image.783con5n7f40.webp)

