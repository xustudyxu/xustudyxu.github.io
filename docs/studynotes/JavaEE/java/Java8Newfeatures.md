---
title: Java 8新特性
date: 2022-07-10 21:48:45
permalink: /JavaEE/java/Java8Newfeatures
categories:
  - java
tags:
  - java
---
# Java 8新特性

[[toc]]

## Java8概述

- Java 8 (又称为jdk 1.8) 是Java 语言开发的一个主要版本。
- Java 8 是oracle公司于2014年3月发布，可以看成是自Java 5 以来最具革命性的版本。Java 8为Java语言、编译器、类库、开发工具与JVM带来了大量新特性。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220710/image.2i66e6lbvhg0.webp)

## Java8新特性的好处

- 速度更快
- 代码更少(增加了新的语法：Lambda 表达式)
- 强大的Stream API
- 便于并行
- 最大化减少空指针异常：Optional
- Nashorn引擎，允许在JVM上运行JS应用

## 并行流与串行流

并行流就是把一个内容分成多个数据块，并用不同的线程分别处理每个数据块的流。相比较串行的流，并行的流可以很大程度上提高程序的执行效率。

Java 8 中将并行进行了优化，我们可以很容易的对数据进行并行操作。Stream API 可以声明性地通过parallel() 与sequential() 在并行流与顺序流之间进行切换。

## Lambda表达式

### Lambda表达式使用举例

```java {21,39,25}
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/10  20:29
 * desc:Lambda表达式使用举例
 */
public class LambdaTest {

    @Test
    public void test1(){
        Runnable r1 = new Runnable() {
            @Override
            public void run() {
                System.out.println("我爱北京天安门");
            }
        };

        r1.run();
        System.out.println("---------------------使用Lambda表达式--------------------");

        Runnable r2 = () -> System.out.println("我爱北京故宫");
        r2.run();

    }

    @Test
    public void test2(){
        Comparator<Integer> comparator = new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                return Integer.compare((Integer) o1,(Integer)o2);
            }
        };
        int compare1 = comparator.compare(12, 21);
        System.out.println(compare1);

        System.out.println("---------------------使用Lambda表达式--------------------");
        //Lambda表达式
        Comparator<Integer> comparator2 = (o1, o2) -> Integer.compare(o1,o2);
        int compare2 = comparator2.compare(12, 1);
        System.out.println(compare2);

        System.out.println("---------------------方法引用写法--------------------");
        //方法应用
        Comparator<Integer> comparator3 = Integer::compareTo;
        int compare3 = comparator3.compare(12, 1);
        System.out.println(compare3);
        
    }
}
```

### Lambda表达式的使用

1. 举例：*(o1,o2) -> Integer.compare(o1,o2);*
2. 格式：
   + `->` :<mark>lambda操作符</mark> 或 <mark>箭头操作符 </mark>
   + ->`左`边：<mark>lambda形参列表</mark> （其实就是接口中的抽象方法的形参列表）
   + ->`右`边：<mark>lambda体</mark> （其实就是重写的抽象方法的方法体）

3. Lamdba表达式的使用分6种情况介绍

> Lamdba表达式的本质，作为接口的示例

:::: tabs cache-lifetime="5" :options="{ useUrlFragment: false }"

::: tab 语法格式一

```java {14}
    //无参，无返回值
	@Test
    public void test1(){
        Runnable r1 = new Runnable() {
            @Override
            public void run() {
                System.out.println("我爱北京天安门");
            }
        };

        r1.run();
        System.out.println("---------------------使用Lambda表达式--------------------");
        
        Runnable r2 = () -> System.out.println("我爱北京故宫");
        r2.run();
    }
```

:::

::: tab 语法格式二

```java {14-16}
    //Lambda表达式需要一个参数，但是没有返回值
	@Test
    public void test02(){
        Consumer<String> consumer = new Consumer<String>() {

            @Override
            public void accept(String s) {
                System.out.println(s);
            }
        };
        consumer.accept("学习新思想，争做新青年");
        System.out.println("---------------------使用Lambda表达式--------------------");

        Consumer<String> consumer1 = (String s)->{
            System.out.println(s);
        };
        consumer1.accept("欢迎来到青年大学习");

    }
```

:::

::: tab 语法格式三

```java {9-11}
    //数据类型可以省略，因为可由编译器推断得出，成为“类型判断”
	@Test
	public void test03(){
        Consumer<String> consumer1 = (String s)->{
            System.out.println(s);
        };
        consumer1.accept("欢迎来到青年大学习");
        System.out.println("---------------------优化--------------------");
        Consumer<String> consumer2 = (s)->{
            System.out.println(s);
        };
        consumer2.accept("欢迎来到青年大学习");
    }
```

:::

::: tab 语法格式四

```java {9}
    //Lamdba若只有一个参数时，参数的小括号可以省略
	@Test
	public void test04(){
        Consumer<String> consumer1 = (s)->{
            System.out.println(s);
        };
        consumer1.accept("欢迎来到青年大学习");
        System.out.println("---------------------优化--------------------");
        Consumer<String> consumer2 = s->{
            System.out.println(s);
        };
        consumer2.accept("欢迎来到青年大学习");
    }
```

:::

::: tab 语法格式五：Lamdba需要两个或以上的参数，多条执行语句，并且可以有返回值

```java {10}
    //Lamdba需要两个或以上的参数，多条执行语句，并且可以有返回值
	@Test
    public void test6(){
        Comparator<Integer> comparator1 = (o1,o2) -> {
            return o1.compareTo(o2);
        };

        System.out.println(comparator1.compare(12,21));
        System.out.println("---------------------优化--------------------");
        Comparator<Integer> comparator2 = (o1,o2) -> o1.compareTo(o2);
        System.out.println(comparator2.compare(12,21));

    }
```

:::

::::

::: tip 总结

->左边：lambda形参列表的参数类型可以省略(类型推断)；如果lambda形参列表只有一个参数，其一对()也可以省略
->右边：lambda体应该使用一对{}包裹；如果lambda体只有一条执行语句（可能是return语句），省略这一对{}和return关键字

:::

