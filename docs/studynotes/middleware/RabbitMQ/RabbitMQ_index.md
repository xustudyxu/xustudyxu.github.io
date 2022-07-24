---
title: RabbitMQ 入门案例
date: 2022-07-23 23:17:55
permalink: /middleware/RabbitMQ/RabbitMQ_index
categories:
	- RabbitMQ
tags:
	- RabbitMQ
---

# RabbitMQ 入门案例

[[toc]]

## Hello RabbitMQ

用 Java 编写两个程序。发送单个消息的生产者和接收消息并打印出来的消费者

在下图中，“ P” 是我们的生产者，“ C” 是我们的消费者。中间的框是一个队列 RabbitMQ 代表使用者保留的消息缓冲区

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.53zsdpm4hbk0.webp)

::: tip 注意

Java 进行连接的时候，需要 Linux 开放 5672 端口，否则会连接超时

访问 Web 界面的端口是 15672，连接服务器的端口是 5672

:::

步骤图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.5zalz3u39nk0.webp)

### 添加依赖

先创建好 Maven 工程，pom.xml 添入依赖：

```xml
    <dependencies>
        <!--rabbitmq 依赖客户端-->
        <dependency>
            <groupId>com.rabbitmq</groupId>
            <artifactId>amqp-client</artifactId>
            <version>5.8.0</version>
        </dependency>
        <!--操作文件流的一个依赖-->
        <dependency>
            <groupId>commons-io</groupId>
            <artifactId>commons-io</artifactId>
            <version>2.6</version>
        </dependency>
    </dependencies>

    <!--指定 jdk 编译版本-->
    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>8</source>
                    <target>8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
```

版本根据需求选择

### 消息生产者

创建一个类作为生产者，最终生产消息到 RabbitMQ 的队列里

步骤：

1. 创建 RabbitMQ 连接工厂
2. 进行 RabbitMQ 工厂配置信息
3. 创建 RabbitMQ 连接
4. 创建 RabbitMQ 信道
5. 生成一个队列
6. 发送一个消息到交换机，交换机发送到队列。"" 代表默认交换机

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/23  21:59
 * desc:生产者：发消息
 */
public class Producer {

    //对列名称
    public static final String QUEUE_NAME="hello";

    //发消息
    public static void main(String[] args) throws IOException, TimeoutException {
        //创建一个连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        //工厂IP 连接RabbitMQ对列
        factory.setHost("192.168.91.200");
        //用户名
        factory.setUsername("root");
        //密码
        factory.setPassword("123");

        //创建连接
        Connection connection = factory.newConnection();
        //获取信道
        Channel channel = connection.createChannel();
        /**
         * 生产一个对列
         * 1.对列名称
         * 2.对列里面的消息是否持久化，默认情况下，消息存储在内存中
         * 3.该队列是否只供一个消费者进行消费，是否进行消息共享，true可以多个消费者消费 false：只能一个消费者消费
         * 4.是否自动删除，最后一个消费者端开链接以后，该队列是否自动删除，true表示自动删除
         * 5.其他参数
         */
        channel.queueDeclare(QUEUE_NAME,false,false,false,null);
        //发消息
        String message = "Hello,world";
        /**
         * 发送一个消息
         * 1.发送到哪个交换机
         * 2.路由的key值是哪个本次是队列的名称
         * 3.其他参数信息
         * 4.发送消息的消息体
         */
        channel.basicPublish("",QUEUE_NAME,null,message.getBytes());
        System.out.println("消息发送完毕");
    }
}
```

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.x5zo4wuta74.webp)

消息队列名字和步骤 2 的信息根据自己的需求进行配置

**方法解释**

声明队列：

```java
channel.queueDeclare(队列名/String, 持久化/boolean, 共享消费/boolean, 自动删除/boolean, 配置参数/Map);
```

配置参数现在是 null，后面死信队列延迟队列等会用到，如：

队列的优先级

队列里的消息如果没有被消费，何去何从？（死信队列）

```java
Map<String, Object> params = new HashMap();
// 设置队列的最大优先级 最大可以设置到 255 官网推荐 1-10 如果设置太高比较吃内存和 CPU
params.put("x-max-priority", 10);
// 声明当前队列绑定的死信交换机
params.put("x-dead-letter-exchange", Y_DEAD_LETTER_EXCHANGE);
// 声明当前队列的死信路由 key
params.put("x-dead-letter-routing-key", "YD");
channel.queueDeclare(QUEUE_NAME, true, false, false, params);
```

发布消息：

```java
channel.basicPublish(交换机名/String, 队列名/String, 配置参数/Map, 消息/String);
```

配置参数现在是 null，后面死信队列、延迟队列等会用到，如：

发布的消息优先级

发布的消息标识符 id

```java
// 给消息赋予 优先级 ID 属性
AMQP.BasicProperties properties = new AMQP.BasicProperties().builder().priority(10).messageId("1")build();
channel.basicPublish("", QUEUE_NAME, properties, message.getBytes());
```

### 消息消费者

创建一个类作为消费者，消费 RabbitMQ 队列的消息

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/23  22:21
 * desc:消费者：接受消息
 */
public class Consumer {

    //队列的名称
    public static final String QUEUE_NAME="hello";
    //接受消息
    public static void main(String[] args) throws IOException, TimeoutException {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost("192.168.91.200");
        factory.setUsername("root");
        factory.setPassword("123");
        Connection connection = factory.newConnection();

        Channel channel = connection.createChannel();

        //声明接收消息
        DeliverCallback deliverCallback = (consumerTag,message) -> {
            System.out.println(new String(message.getBody()));
        };
        //取消消息时的回调
        CancelCallback cancelCallback = consumerTag ->{
            System.out.println("消息消费被中断");
        };

        /**
         * 消费者消费消息
         * 1.消费哪个队列
         * 2.消费成功之后是否要自动应答true：代表自动应答false:代表手动应答
         * 3.消费者未成功消费的回调
         * 4.消费者取消消费的回调
         */
        channel.basicConsume(QUEUE_NAME,true,deliverCallback,cancelCallback);
    }
}
```

+ 结果

```java
SLF4J: Failed to load class "org.slf4j.impl.StaticLoggerBinder".
SLF4J: Defaulting to no-operation (NOP) logger implementation
SLF4J: See http://www.slf4j.org/codes.html#StaticLoggerBinder for further details.
Hello,world
```

值得一提的是，`basicConsume` 的参数中，第三个和第四个参数都是接口，所以需要实现该接口的方法

```java
channel.basicConsume(队列名字/String, 是否自动签收/boolean, 消费时的回调/接口类, 无法消费的回调/接口类);
```

## Work Queues

Work Queues 是工作队列（又称任务队列）的主要思想是避免立即执行资源密集型任务，而不得不等待它完成。相反我们安排任务在之后执行。我们把任务封装为消息并将其发送到队列。在后台运行的工作进程将弹出任务并最终执行作业。当有多个工作线程时，这些工作线程将一起处理这些任务。

### 轮询消费

轮询消费消息指的是轮流消费消息，即每个工作队列都会获取一个消息进行消费，并且获取的次数按照顺序依次往下轮流。

案例中生产者叫做 Task，一个消费者就是一个工作队列，启动两个工作队列消费消息，这个两个工作队列会以轮询的方式消费消息。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.3iwquz975vw0.webp)

### 轮询案例

- 首先把 RabbitMQ 的配置参数封装为一个工具类：`RabbitMQUtils`

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/23  22:46
 * desc:此类为连接工厂创建信道的工具类
 */
public class RabbitMQUtils {

    public static Channel getChannel() throws IOException, TimeoutException {

        //创建一个连接工厂
        ConnectionFactory factory = new ConnectionFactory();
        //工厂IP 连接RabbitMQ对列
        factory.setHost("192.168.91.200");
        //用户名
        factory.setUsername("root");
        //密码
        factory.setPassword("123");

        //创建连接
        Connection connection = factory.newConnection();
        //获取信道
        Channel channel = connection.createChannel();

        return channel;
    }
}
```

+ 创建两个工作队列，并且启动

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/23  22:51
 * desc:这是一个工作线程，相当于之间的Consumer
 */
public class Work01 {

    //队列的名称
    public static final String QUEUE_NAME="hello";


    //接收消息
    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();

        //消息的接受
        DeliverCallback deliverCallback = (consumerTag,message) ->{
            System.out.println("接收到的消息:"+new String(message.getBody()));
        };

        //消息接受被取消时，执行下面的内容
        CancelCallback cancelCallback = consumerTag -> {
            System.out.println(consumerTag+"消息被消费者取消消费接口回调逻辑");
        };

        //消息的接受
        channel.basicConsume(QUEUE_NAME,true,deliverCallback,cancelCallback);
    }
}
```

创建好一个工作队列，只需要以多线程方式启动两次该 main 函数即可，以 first、second 区别消息队列。

要开启多线程功能，首先启动该消息队列，然后如图开启多线程：

![1658588553672](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/1658588553672.629xpapm6wg0.webp)

两个工作队列都启动后

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.3fh698ujarc0.webp)

+ 创建一个生产者，发送消息进程

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/23  23:07
 * desc:生产者：可以发送大量的消息
 */
public class Task01 {

    //队列名称
    public static final String QUEUE_NAME="hello";

    //发送大量消息
    public static void main(String[] args) throws IOException, TimeoutException {

        Channel channel = RabbitMQUtils.getChannel();
        //队列的声明
        channel.queueDeclare(QUEUE_NAME,false,false,false,null);

        //发送消息
        //从控制台当中接受信息
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()) {
            String message = scanner.next();
            channel.basicPublish("",QUEUE_NAME,null,message.getBytes());
            System.out.println("消息发送完成:"+message);
        }
    }
    
}
```

+ 结果演示

通过程序执行发现生产者总共发送 4 个消息，消费者 first 和消费者 second 分别分得两个消息，并且是按照有序的一个接收一次消息

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.13a9691kkkyo.webp)

## Web页面添加队列

进入自己的 RabbitMQ Web 页面，点击 Queues 菜单

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.701dj3uqk400.webp)

1. 点击 `Queues` 菜单
2. 点击 `Add a new queue`，弹出下拉菜单
3. 下方的很多参数可以进行选择（旁边有 ？的参数），如优先级（`Lazy mode`）、绑定死信队列（`Dead letter exchange/routing key`）
4. 执行步骤 3 后，在 `Arguments` 的第一个文本框弹出对应的参数，类似于 Map 的 key
5. 第二个文本框填写参数，类似于 Map 的 value
6. 第三个是下拉菜单，选择 value 类型
7. 点击 `Add queue`，添加队列

旁边有 ？的参数，就是 `channel.queueDeclare(队列名/String, 持久化/boolean, 共享消费/boolean, 自动删除/boolean, 配置参数/Map);` 或者 `channel.basicPublish(交换机名/String, 队列名/String, 配置参数/Map, 消息/String);` 的参数：配置参数/Map 的 key