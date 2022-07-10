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

```java {21,39,45}
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

> Lamdba表达式的本质，作为接口的实例

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

::: tab 语法格式五

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

## 函数式(Functional)接口

### 函数式接口的介绍

如果一个<mark>接口</mark>中，<mark>只声明了一个抽象方法</mark>，则此接口就称为函数式接口。我们可以在一个接口上使用 `@FunctionalInterface `注解，  这样做可以检查它是否是一个函数式接口。

 ```java
@FunctionalInterface
public interface MyInterface {

    void method1();
}
 ```

+ 在java.util.function包下定义了Java 8 的丰富的函数式接口
+ Java从诞生日起就是一直倡导“一切皆对象”，在Java里面面向对象(OOP)编程是一切。但是随着python、scala等语言的兴起和新技术的挑战，Java不得不做出调整以便支持更加广泛的技术要求，也即**java不但可以支持OOP还可以支持OOF（面向函数编程）**
+ 在函数式编程语言当中，函数被当做一等公民对待。在将函数作为一等公民的编程语言中，Lambda表达式的类型是函数。但是在Java8中，有所不同。在Java8中，Lambda表达式是对象，而不是函数，它们必须依附于
+ 一类特别的对象类型——函数式接口。
+ 简单的说，在Java8中，Lambda表达式就是一个函数式接口的实例。这就是Lambda表达式和函数式接口的关系。也就是说，**只要一个对象是函数式接口的实例，那么该对象就可以用Lambda表达式来表示**。
+ **所以以前用匿名实现类表示的现在都可以用Lambda表达式来写**。

### Java内置的函数式接口介绍及使用举例

#### Java内置四大核心函数式接口

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220710/image.4p8dm1dmkaw0.webp)

```java {28,49}
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/10  23:06
 * desc:
 * java内置的四大核心函数式接口
 *
 * 消费型接口 Consumer<T>    void accept(T t)
 * 供给型接口 Supplier<T>    T get()
 * 函数型接口 Function<T,R>  apply(T t)
 * 断定型接口 Predicate<T>   boolean test(T t)
 */
public class LambdaTest2 {

    /**
     * 消费型接口 Consumer<T>    void accept(T t)
     */
    @Test
    public void test1(){
        happyTime(500, new Consumer<Double>() {
            @Override
            public void accept(Double aDouble) {
                System.out.println("学习很开心,买了瓶快乐水，价格为:"+aDouble);
            }
        });

        System.out.println("---------------------使用Lambda表达式--------------------");
        happyTime(400,money -> System.out.println("学习很开心,买了瓶快乐水，价格为:"+money));
    }

    public void happyTime(double money, Consumer<Double> consumer){
        consumer.accept(money);
    }

    /**
     * 供给型接口 Supplier<T>    T get()
     */
    @Test
    public void test2(){
        List<String> list = Arrays.asList("北京", "南京", "天津", "东京", "普京");
        List<String> filterStrs=filterString(list, new Predicate<String>() {
            @Override
            public boolean test(String s) {
                return s.contains("京");
            }
        });
        System.out.println(filterStrs);
        System.out.println("---------------------使用Lambda表达式--------------------");
        List<String> filterStrs1=filterString(list,s -> s.contains("京"));
        System.out.println(filterStrs1);
    }

    //根据给定的规则，过滤集合中的字符串，此规则是由Predicate的方法决定
    public List<String> filterString(List<String> list, Predicate<String> pre){

        ArrayList<String> filterList = new ArrayList<>();
        for (String s : list) {
            if(pre.test(s)){
                filterList.add(s);
            }
        }

        return filterList;

    }
}
```

#### 其他函数式接口

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220710/image.5nfyrs4e38k0.webp)

::: tip 使用总结

+ **何时使用lambda表达式？**

当需要对一个函数式接口实例化的时候，可以使用 lambda 表达式。

+ **何时使用给定的函数式接口？**

如果我们开发中需要定义一个函数式接口，首先看看在已有的jdk提供的函数式接口是否提供了能满足需求的函数式接口。如果有，则直接调用即可，不需要自己再自定义了。

:::

