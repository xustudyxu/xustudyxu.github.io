---
title: RabbitMQ 交换机
date: 2022-07-24 22:57:04
permalink: /middleware/RabbitMQ/RabbitMQ_Exchanges
categories:
  - RabbitMQ
tags:
  - RabbitMQ
---
# RabbitMQ 交换机

[[toc]]

## Exchanges

RabbitMQ 消息传递模型的核心思想是: **生产者生产的消息从不会直接发送到队列**。实际上，通常生产者甚至都不知道这些消息传递传递到了哪些队列中。

相反，**生产者只能将消息发送到交换机(exchange)**，交换机工作的内容非常简单，一方面它接收来自生产者的消息，另一方面将它们推入队列。交换机必须确切知道如何处理收到的消息。是应该把这些消息放到特定队列还是说把他们到许多队列中还是说应该丢弃它们。这就的由交换机的类型来决定。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.54tzwxwrqco.webp)



### Exchanges的类型

- **直接(direct)**：处理路由键。需要将一个队列绑定到交换机上，要求该消息与一个特定的路由键完全匹配。这是一个完整的匹配。如果一个队列绑定到该交换机上要求路由键 abc ，则只有被标记为 abc 的消息才被转发，不会转发 abc.def，也不会转发 dog.ghi，只会转发 abc。

- **主题(topic)**：将路由键和某模式进行匹配。此时队列需要绑定要一个模式上。符号“#”匹配一个或多个词，符号 * 匹配不多不少一个词。因此 abc.# 能够匹配到 abc.def.ghi，但是 abc.* 只会匹配到 abc.def。

- **标题(headers)**：不处理路由键。而是根据发送的消息内容中的headers属性进行匹配。在绑定 Queue 与 Exchange 时指定一组键值对；当消息发送到RabbitMQ 时会取到该消息的 headers 与 Exchange 绑定时指定的键值对进行匹配；如果完全匹配则消息会路由到该队列，否则不会路由到该队列。headers 属性是一个键值对，可以是 Hashtable，键值对的值可以是任何类型。而 fanout，direct，topic 的路由键都需要要字符串形式的。

  匹配规则 x-match 有下列两种类型：

  x-match = all ：表示所有的键值对都匹配才能接受到消息

  x-match = any ：表示只要有键值对匹配就能接受到消息

- **扇出(fanout)**：不处理路由键。你只需要简单的将队列绑定到交换机上。一个发送到交换机的消息都会被转发到与该交换机绑定的所有队列上。很像子网广播，每台子网内的主机都获得了一份复制的消息。Fanout 交换机转发消息是最快的。

### 默认exchange

通过空字符串("")进行标识的交换机是默认交换

```java
channel.basicPublish("", TASK_QUEUE_NAME, null, message.getBytes("UTF-8"));
```

第一个参数是交换机的名称。空字符串	表示默认或无名称交换机：消息能路由发送到队列中其实是由 routingKey(bindingkey) 绑定指定的 key

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.2nq1gc53kik.webp)

## 临时队列

之前的章节我们使用的是具有特定名称的队列(还记得 hello 和 ack_queue 吗？)。队列的名称我们来说至关重要，我们需要指定我们的消费者去消费哪个队列的消息。

每当我们连接到 Rabbit 时，我们都需要一个全新的空队列，为此我们可以创建一个具有**随机名称的队列**，或者能让服务器为我们选择一个随机队列名称那就更好了。其次一旦我们断开了消费者的连接，队列将被自动删除。

创建临时队列的方式如下:

```java
String queueName = channel.queueDeclare().getQueue();
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.56c9qj8lnyo0.webp)

## 绑定bindings

什么是 bingding 呢，binding 其实是 exchange 和 queue 之间的桥梁，它告诉我们 exchange 和那个队列进行了绑定关系。比如说下面这张图告诉我们的就是 X 与 Q1 和 Q2 进行了绑定

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.1ryp1eu9xtnk.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.2z1b1g3ou5e0.webp)

### Fanout实战

为了说明这种模式，我们将构建一个简单的日志系统。它将由两个程序组成:第一个程序将发出日志消息，第二个程序是消费者。其中启动两个消费者，其中一个消费者接收到消息后把日志存储在磁盘

**图例**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.2mdbijsttri0.webp)

Logs 和临时队列的绑定关系如下图

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.4bl530c0ox20.webp)

::: warning 注意

先启动两个消费者再启动生产者。

生产者生产消息后，如果没有对应的消费者接收，则该消息是遗弃的消息

:::

`ReceiveLogs01` 将接收到的消息打印在控制台

`ReceiveLogs02` 把消息写出到文件

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/24  21:20
 */
//消费者1
public class ReceiveLogs01 {

    //交换机名称
    private static  final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();
        //声明一个交换机
        channel.exchangeDeclare(EXCHANGE_NAME,"fanout");
        //声明一个队列 临时队列
        /**
         * 生成一个临时的队列，队列的名称是随机的
         * 当消费者断开与队列的连接的时候 队列就自动删除
         */
        String queueName = channel.queueDeclare().getQueue();
        /**
         * 绑定交换机与队列
         */
        channel.queueBind(queueName,EXCHANGE_NAME,"");
        System.out.println("等待接收消息，把接收到的消息打印在屏幕上...");
        //接收消息
        //消费者取消消息时回调接口
        DeliverCallback deliverCallback = (consumerTag,message) ->{
            System.out.println("控制台打印接收到的消息:"+new String(message.getBody(),"UTF-8"));
        };
        channel.basicConsume(queueName,true,deliverCallback,consumerTag -> {});
    }
}
```

生产者`EmitLog` 发送消息给两个消费者进行消费

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/24  21:34
 * desc:负责进行发消息给交换机
 */
public class EmitLog {

    //交换机名称
    public static final String EXCHANGE_NAME = "logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();
        /**
         * 声明一个exchange
         * 1.exchange的名称
         * 2.exchange的类型
         */
        channel.exchangeDeclare(EXCHANGE_NAME,"fanout");
        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()){
            String message = scanner.next();
            channel.basicPublish(EXCHANGE_NAME,"",null,message.getBytes("UTF-8"));
            System.out.println("生产者发出消息:"+message);
        }
    }
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.5kb833agark0.webp)

> 一个发送，多个接受，发布/订阅模式

## Direct exchange

在上一节中，我们构建了一个简单的日志记录系统。我们能够向许多接收者广播日志消息。在本节我们将向其中添加一些特别的功能——让某个消费者订阅发布的部分消息。例如我们只把严重错误消息定向存储到日志文件(以节省磁盘空间)，同时仍然能够在控制台上打印所有日志消息。

我们再次来回顾一下什么是 bindings，绑定是交换机和队列之间的桥梁关系。也可以这么理解： **队列只对它绑定的交换机的消息感兴趣**。绑定用参数：routingKey 来表示也可称该参数为 binding key， 创建绑定我们用代码:channel.queueBind(queueName, EXCHANGE_NAME, "routingKey");

绑定之后的意义由其交换类型决定。

### Direct介绍

上一节中的我们的日志系统将所有消息广播给所有消费者，对此我们想做一些改变，例如我们希望将日志消息写入磁盘的程序仅接收严重错误(errros)，而不存储哪些警告(warning)或信息(info)日志 消息避免浪费磁盘空间。Fanout 这种交换类型并不能给我们带来很大的灵活性-它只能进行无意识的广播，在这里我们将使用 direct 这种类型来进行替换，这种类型的工作方式是，消息只去到它绑定的 routingKey 队列中去。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.gi5bzb0sygo.webp)

在上面这张图中，我们可以看到 X 绑定了两个队列，绑定类型是 direct。队列 Q1 绑定键为 orange， 队列 Q2 绑定键有两个：一个绑定键为 black，另一个绑定键为 green.

在这种绑定情况下，生产者发布消息到 exchange 上，绑定键为 orange 的消息会被发布到队列 Q1。绑定键为 blackgreen 和的消息会被发布到队列 Q2，其他消息类型的消息将被丢弃。

### 多重绑定

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.6m5o5nqwvlw0.webp)

当然如果 exchange 的绑定类型是direct，**但是它绑定的多个队列的 key 如果都相同**，在这种情况下虽然绑定类型是 direct **但是它表现的就和 fanout 有点类似了**，就跟广播差不多，如上图所示。

### Direct实战

关系：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.18f9o7wxc5uo.webp)

交换机：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.5x5pk7emz0k0.webp)

C1 消费者：绑定 console 队列，routingKey 为 info、warning

C2 消费者：绑定 disk 队列，routingKey 为 error

当生产者生产消息到 `direct_logs` 交换机里，该交换机会检测消息的 routingKey 条件，然后分配到满足条件的队列里，最后由消费者从队列消费消息。

**生产者**

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/24  21:59
 */
public class DirectLogs {

    //交换机名称
    public static final String EXCHANGE_NAME = "direct_logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();


        Scanner scanner = new Scanner(System.in);
        while (scanner.hasNext()){
            String message = scanner.next();
            channel.basicPublish(EXCHANGE_NAME,"info",null,message.getBytes("UTF-8"));
            System.out.println("生产者发出消息:"+message);
        }
    }
}
```

**消费者1**

```java {15-17}
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/24  21:50
 */
public class ReceiveLogsDirect01 {

    public static final String EXCHANGE_NAME="direct_logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();
        //声明一个direct交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
        //声明一个队列
        channel.queueDeclare("console",false,false,false,null);
        channel.queueBind("console",EXCHANGE_NAME,"info");
        channel.queueBind("console",EXCHANGE_NAME,"warning");
        //接收消息
        DeliverCallback deliverCallback = (consumerTag,message) -> {
          System.out.println("ReceiveLogsDirect01控制台打印接收到的消息:"+new String(message.getBody(),"UTF-8"));
        };
        //消费者取消消息时回调接口
        channel.basicConsume("console",true,deliverCallback,consumerTag -> {});

    }
}
```

**消费者2**

```java {15-16}
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/24  21:50
 */
public class ReceiveLogsDirect02 {

    public static final String EXCHANGE_NAME="direct_logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();
        //声明一个direct交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.DIRECT);
        //声明一个队列
        channel.queueDeclare("disk",false,false,false,null);
        channel.queueBind("disk",EXCHANGE_NAME,"error");

        //接收消息
        DeliverCallback deliverCallback = (consumerTag,message) -> {
          System.out.println("ReceiveLogsDirect02控制台打印接收到的消息:"+new String(message.getBody(),"UTF-8"));
        };
        //消费者取消消息时回调接口
        channel.basicConsume("disk",true,deliverCallback,consumerTag -> {});

    }
}
```

+ 让消费者1接收,结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.3fdmnb63j0o0.webp)

## Topics exchange

### Topic的介绍

在上一个小节中，我们改进了日志记录系统。我们没有使用只能进行随意广播的 fanout 交换机，而是使用了 direct 交换机，从而有能实现有选择性地接收日志。

尽管使用 direct 交换机改进了我们的系统，但是它仍然存在局限性——比方说我们想接收的日志类型有 info.base 和 info.advantage，某个队列只想 info.base 的消息，那这个时候direct 就办不到了。这个时候就只能使用 **topic** 类型

**Topic 的要求**

发送到类型是 topic 交换机的消息的 routing_key 不能随意写，必须满足一定的要求，它必须是**一个单词列表**，**以点号分隔开**。这些单词可以是任意单词

比如说："stock.usd.nyse", "nyse.vmw", "quick.orange.rabbit" 这种类型的。

当然这个单词列表最多不能超过 255 个字节。

在这个规则列表中，其中有两个替换符是大家需要注意的：

- ***(星号)可以代替一个位置**
- **#(井号)可以替代零个或多个位置**

### Topic匹配案例

下图绑定关系如下

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.6a89pabmhtg0.webp)

- Q1-->绑定的是
  - 中间带 orange 带 3 个单词的字符串 `(*.orange.*)`
- Q2-->绑定的是
  - 最后一个单词是 rabbit 的 3 个单词 `(*.*.rabbit)`
  - 第一个单词是 lazy 的多个单词 `(lazy.#)`

上图是一个队列绑定关系图，我们来看看他们之间数据接收情况是怎么样的

| 例子                     | 说明                                       |
| ------------------------ | ------------------------------------------ |
| quick.orange.rabbit      | 被队列 Q1Q2 接收到                         |
| azy.orange.elephant      | 被队列 Q1Q2 接收到                         |
| quick.orange.fox         | 被队列 Q1 接收到                           |
| lazy.brown.fox           | 被队列 Q2 接收到                           |
| lazy.pink.rabbit         | 虽然满足两个绑定但只被队列 Q2 接收一次     |
| quick.brown.fox          | 不匹配任何绑定不会被任何队列接收到会被丢弃 |
| quick.orange.male.rabbit | 是四个单词不匹配任何绑定会被丢弃           |
| lazy.orange.male.rabbit  | 是四个单词但匹配 Q2                        |

::: tip 笔记

当一个队列绑定键是 #，那么这个队列将接收所有数据，就有点像 fanout 了

如果队列绑定键当中没有 # 和 * 出现，那么该队列绑定类型就是 direct 了

:::

### Topic实战

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.5kvwh1z1ixk0.webp)

生产多个消息到交换机，交换机按照通配符分配消息到不同的队列中，队列由消费者进行消费

**生产者 EmitLogTopic**

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/24  22:44
 * desc:生产者
 */
public class EmitLogTopic {

    //交换机的名称
    public static final String EXCHANGE_NAME = "topic_logs";

    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();
        /**
         * Q1-->绑定的是
         *      中间带 orange 带 3 个单词的字符串(*.orange.*)
         * Q2-->绑定的是
         *      最后一个单词是 rabbit 的 3 个单词(*.*.rabbit)
         *      第一个单词是 lazy 的多个单词(lazy.#)
         */
        HashMap<String, String> bindingKeyMap = new HashMap<>();
        bindingKeyMap.put("quick.orange.rabbit", "被队列 Q1Q2 接收到");
        bindingKeyMap.put("lazy.orange.elephant", "被队列 Q1Q2 接收到");
        bindingKeyMap.put("quick.orange.fox", "被队列 Q1 接收到");
        bindingKeyMap.put("lazy.brown.fox", "被队列 Q2 接收到");
        bindingKeyMap.put("lazy.pink.rabbit", "虽然满足两个绑定但只被队列 Q2 接收一次");
        bindingKeyMap.put("quick.brown.fox", "不匹配任何绑定不会被任何队列接收到会被丢弃");
        bindingKeyMap.put("quick.orange.male.rabbit", "是四个单词不匹配任何绑定会被丢弃");
        bindingKeyMap.put("lazy.orange.male.rabbit", "是四个单词但匹配 Q2");
        for (Map.Entry<String,String> bindingKeyEntry : bindingKeyMap.entrySet()){
            String routingKey = bindingKeyEntry.getKey();
            String message = bindingKeyEntry.getValue();

            channel.basicPublish(EXCHANGE_NAME,routingKey,null,message.getBytes("UTF-8"));
            System.out.println("生产者发出消息:"+message);
        }
    }
}
```

**消费者C1**

```java {21}
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/24  22:31
 * desc:声明主题交换机及相关队列
 *      消费者C1
 */
public class ReceiveLogsTopic01 {

    //交换机的名称
    public static final String EXCHANGE_NAME = "topic_logs";

    //接收消息
    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();
        //声明交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.TOPIC);
        //声明队列
        String queueName = "Q1";
        channel.queueDeclare(queueName,false,false,false,null);
        channel.queueBind(queueName,EXCHANGE_NAME,"*.orange.*");
        System.out.println("等待接收消息...");

        DeliverCallback deliverCallback = (consumerTag,message) -> {
            System.out.println(new String(message.getBody(),"UTF-8"));
            System.out.println("接收队列："+queueName+"  绑定键:"+message.getEnvelope().getRoutingKey());
        };
        //接收消息
        channel.basicConsume(queueName,true,deliverCallback,consumerTag ->{});
    }
}
```

**消费者C2**

```java {21,22}
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/24  22:31
 * desc:声明主题交换机及相关队列
 *      消费者C2
 */
public class ReceiveLogsTopic02 {

    //交换机的名称
    public static final String EXCHANGE_NAME = "topic_logs";

    //接收消息
    public static void main(String[] args) throws IOException, TimeoutException {
        Channel channel = RabbitMQUtils.getChannel();
        //声明交换机
        channel.exchangeDeclare(EXCHANGE_NAME, BuiltinExchangeType.TOPIC);
        //声明队列
        String queueName = "Q2";
        channel.queueDeclare(queueName,false,false,false,null);
        channel.queueBind(queueName,EXCHANGE_NAME,"*.*.rabbit");
        channel.queueBind(queueName,EXCHANGE_NAME,"lazy.#");

        System.out.println("等待接收消息...");
        
        DeliverCallback deliverCallback = (consumerTag,message) -> {
            System.out.println(new String(message.getBody(),"UTF-8"));
            System.out.println("接收队列："+queueName+"  绑定键:"+message.getEnvelope().getRoutingKey());
        };
        //接收消息
        channel.basicConsume(queueName,true,deliverCallback,consumerTag ->{});
    }
}
```

+ 测试结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220724/image.4xiiz5wc7cg0.webp)