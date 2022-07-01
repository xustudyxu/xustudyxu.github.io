---
title: Spring5 Webflux
date: 2022-04-23 21:00:09
permalink: /pages/9522d9/
categories:
  - Spring5
tags:
  - Spring5
---
# Spring5 Webflux

[[toc]]

## 介绍

1. SpringWebflux是Spring5添加新的模块，用于web开发的，功能和SpringMVC类似的，Webflux使用当前一种比较流行响应式编程出现的框架。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.3vx1gy1s2xg0.webp)

2. 使用传统 web 框架，比如 SpringMVC，这些基于 Servlet 容器，Webflux 是一种异步非阻塞的框架，异步非阻塞的框架在 Servlet3.1 以后才支持，核心**是基于 Reactor 的相关 API 实现的**。

3. 什么是异步非阻塞
   + 异步和同步针对调用者，调用者发送请求，如果等着对方回应之后才去做其他事情就是同
     步，如果发送请求之后不等着对方回应就去做其他事情就是异步。
   + 阻塞和非阻塞针对被调用者，被调用者收到请求之后，做完了请求任务才给出反馈，收到请求之后马上给出犯规然后再去做事情就是非阻塞。
4. Webflux 特点：
   1. **非阻塞式**：在**有限资源下，提高系统吞吐量和伸缩性**，以 Reactor 为基础实现响应式编程
   2. **函数式编程**：Spring5 框架基于 java8，Webflux 使用 Java8 函数式编程方式实现路由请求
5. 与SpringMVC比较

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.3p0804bahdy0.webp)

+ 两个框架都可以使用注解方式，都运行在 Tomet 等容器中
+ SpringMVC 采用命令式编程，Webflux 采用异步响应式编程

## 响应式编程

### 什么是响应式编程

响应式编程是一种**面向数据流**和**变化传播**的编程范式。这意味着可以在编程语言中很方便地表达静态或动态的数据流，而相关的计算模型会自动将变化的值通过数据流进行传播。电子表格程序就是响应式编程的一个例子。单元格可以包含字面值或类似"=B1+C1"的公式，而包含公式的单元格的值会依据其他单元格的值的变化而变化。

### Java8 及其之前版本

提供的**观察者模式**两个类 Observer 和 Observable

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/24  19:16
 */
public class ObserverDemo extends Observable {

    public static void main(String[] args) {
        ObserverDemo observer = new ObserverDemo();
        //添加观察者
        observer.addObserver((o,arg)->{
            System.out.println("发生变化");
        });
        observer.addObserver((o,arg)->{
            System.out.println("被观察者通知，发生改变");
        });
        observer.setChanged();//数据变化
        observer.notifyObservers();//通知

    }
}
```

+ 结果

```java
被观察者通知，发生改变
发生变化

Process finished with exit code 0
```

> java8新特性学了，再继续学习Webflux:satisfied:

