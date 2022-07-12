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

## 方法引用与构造器引用

+ 当要传递给Lambda体的操作，已经有实现的方法了，可以使用方法引用！
+ 方法引用可以看做是Lambda表达式深层次的表达。换句话说，方法引用就是Lambda表达式，也就是函数式接口的一个实例，通过方法的名字来指向一个方法，可以认为是Lambda表达式的一个语法糖。
+ 要求：实现接口的抽象方法的参数列表和返回值类型，必须与方法引用的方法的参数列表和返回值类型保持一致！
+ 格式：使用操作符“::” 将类(或对象) 与方法名分隔开来。
+ 如下三种主要使用情况：
  + **对象::实例方法名**
  + **类::静态方法名**
  + **类::实例方法名**

```java {32,44,58,71,86,98,114}
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/11  19:44
 * 1. 使用情况：当要传递给Lambda体的操作，已经有实现的方法了，可以使用方法引用
 *
 * 2. 方法引用，本质就是Lambda表达式，而Lambda表达式作为函数式接口的实例出现的。所以
 *      方法引用，也是函数式接口的实例。
 *
 * 3. 使用格式： 类(或对象) :: 方法名
 *
 * 4. 具体分为如下的三种情况：
 *      对象 :: 非静态方法
 *      类  :: 静态方法
 *      类  :: 非静态方法
 *
 * 5. 方法引用使用的要求：要求接口中的抽象方法的形参列表和返回值类型与方法引用的方法的形参列表
 *      和返回值类型相同！(针对情况一和情况二)
 */
public class MethodRefTest {

    //情况一，对象 :: 实例方法
    //Consumer中的void accept(T t)
    //PrintStream中的void println(T t)
    @Test
    public void test1(){
        Consumer<String> con1= str -> System.out.println(str);
        con1.accept("北京");

        System.out.println("----------------------------方法引用-------------------------------");
        PrintStream ps=System.out;
        Consumer<String> con2=ps :: println;
        con2.accept("beijing");
    }

    //Supplier中的T get()
    //Employee中的String getName()
    @Test
    public void test2(){
        Employee emp = new Employee(1001, "Tom", 23, 5600);
        Supplier<String> sup1= ()-> emp.getName();
        System.out.println(sup1.get());
        System.out.println("----------------------------方法引用-------------------------------");
        Supplier<String> sup2= emp :: getName;
        System.out.println(sup2.get());
    }

    //情况二: 类 :: 静态方法
    //Comparator中的int compare(T t1,T t2)
    //Integer中的int compare(T t1,T t2)
    @Test
    public void test3(){
        Comparator<Integer> com1=(t1, t2) -> Integer.compare(t1,t2);
        System.out.println(com1.compare(12, 21));

        System.out.println("----------------------------方法引用-------------------------------");

        Comparator<Integer> com2=Integer::compare;
        System.out.println(com2.compare(12,21));

    }

    //Function中的R apply(T t)
    //Math中的Long round(Double d)
    @Test
    public void test4(){
        Function<Double,Long> func1 = d -> Math.round(d);
        System.out.println(func1.apply(12.4));

        System.out.println("----------------------------方法引用-------------------------------");
        Function<Double,Long> func2 = Math::round;
        System.out.println(func2.apply(12.7));

    }

    //情况三： 类::实例方法
    //Comparator中的int compare(T t1,T t2)
    //String中的int t1.compareTo(t2)
    @Test
    public void test5(){
        Comparator<String> com1 = (s1,s2) ->s1.compareTo(s2);
        System.out.println(com1.compare("abc", "abd"));

        System.out.println("----------------------------方法引用-------------------------------");

        Comparator<String> com2=String::compareTo;//类型
        System.out.println(com2.compare("abc","aba"));

    }

    //BiPredicate中的boolean test(T t1,T t2);
    //String中的boolean t1.equals(t2)
    @Test
    public void test6(){
        BiPredicate<String,String> pre1 = (s1,s2) ->s1.equals(s2);
        System.out.println(pre1.test("abc","abc"));
        System.out.println("----------------------------方法引用-------------------------------");
        BiPredicate<String,String> pre2 = String::equals;
        System.out.println(pre2.test("abc", "abcd"));

    }

    //Function中的R apply(T t)
    //Employee中的String getName();
    @Test
    public void test7(){

        Employee emp = new Employee(1001,"Jack", 23, 6666);
        Function<Employee,String> func1 = e -> e.getName();
        System.out.println(func1.apply(emp));

        System.out.println("----------------------------方法引用-------------------------------");

        Function<Employee,String> func2 = Employee::getName;
        System.out.println(func2.apply(emp));
    }
}
```

### 构造器引用与数组引用的使用

格式:`ClassName::new`

与函数式接口相结合，自动与函数式接口中方法兼容。

可以把构造器引用赋值给定义的方法，要求构造器参数列表要与接口中抽象方法的参数列表一致！且方法的返回值即为构造器对应类的对象。

```java {23,37,48,60}
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/11  21:51
 * 一、构造器引用
 *          和方法引用类似，函数式接口的抽象方法的形参列表和构造器的形参列表一致
 *          抽象方法的返回值类型即为构造器所属的类的类型
 * 二、数组引用
 *          大家可以把数组看成是一个特殊的类，则写法与构造器引用一致
 */
public class ConstructorRefTest {

    //构造器引用
    //Supplier中的T get()
    //Employee的空参构造器，Employee()
    @Test
    public void test1(){
        Supplier<Employee> sup1 = () -> new Employee();
        System.out.println(sup1.get());

        System.out.println("---------------------构造器new---------------------");

        Supplier<Employee> sup2 = Employee::new;
        System.out.println(sup2.get());
    }

    //Function中的 apply(T t)
    @Test
    public void test2(){
        Function<Integer,Employee> func1 = id -> new Employee(id);
        Employee employee = func1.apply(1001);
        System.out.println(employee);

        System.out.println("---------------------构造器new---------------------");


        Function<Integer,Employee> fun2 = Employee::new;
        Employee employee1 = fun2.apply(1001);
        System.out.println(employee1);
    }

    //BiFunction中的R apply(T t,U u)
    @Test
    public void test3(){
        BiFunction<Integer,String,Employee> func1=(id,name) -> new Employee(id,name);
        System.out.println(func1.apply(1001,"Lucy"));
        System.out.println("---------------------构造器new---------------------");
        BiFunction<Integer,String,Employee> func2 =Employee::new;
        System.out.println(func2.apply(1001,"Lucy"));
    }

    //数组引用
    //Function 中的 apply(T t)
    @Test
    public void test4(){
        Function<Integer,String[]> func1 = length -> new String[length];
        String[] arr1 = func1.apply(5);
        System.out.println(Arrays.toString(arr1));
        System.out.println("---------------------数组引用---------------------");
        Function<Integer,String[]> func2 = String[]::new;
        String[] arr2 = func2.apply(10);
        System.out.println(Arrays.toString(arr2));
        
    }
    
}
```

## 强大的Stream API

### Stream API的概述

+ Java8中有两大最为重要的改变。第一个是<mark>Lambda 表达式</mark>；另外一个则是<mark>Stream API</mark>。
+ Stream API ( `java.util.stream`)把真正的函数式编程风格引入到Java中。这是目前为止对Java类库最好的补充，因为Stream API可以极大提供Java程序员的生产力，让程序员写出高效率、干净、简洁的代码。
+ Stream 是Java8 中处理集合的关键抽象概念，它可以指定你希望对集合进行的操作，可以执行非常复杂的查找、过滤和映射数据等操作。使用Stream API 对集合数据进行操作，就类似于使用SQL 执行的数据库查询。也可以使用Stream API 来并行执行操作。简言之，Stream API 提供了一种高效且易于使用的处理数据的方式。
+ 为什么要使用Stream API
+ **实际开发中，项目中多数数据源都来自于Mysql，Oracle等。但现在数据源可以更多了，有MongDB，Radis等，而这些NoSQL的数据就需要Java层面去处理**。
+ **Stream 和Collection 集合的区别：Collection 是一种静态的内存数据结构，而Stream 是有关计算的。前者是主要面向内存，存储在内存中，后者主要是面向CPU，通过CPU 实现计算**。

1.Stream关注的是对数据的运算，与CPU打交道
 * 集合关注的是数据的存储，与内存打交道

2.

+ ①Stream 自己不会存储元素。
+ ②Stream 不会改变源对象。相反，他们会返回一个持有结果的新Stream。
+ ③Stream 操作是延迟执行的。这意味着他们会等到需要结果的时候才执行

3.Stream 执行流程

+ ① Stream的实例化
+ ② 一系列的中间操作（过滤、映射、...)
+ ③ 终止操作


 4.说明：

+  4.1 一个中间操作链，对数据源的数据进行处理

+  4.2 一旦执行终止操作，就执行中间操作链，并产生结果。之后，不会再被使用

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220711/image.216f5anz1qo0.webp)

### Stream实例化方式

+ 提供用于测试的数据

```java
public class EmployeeData {

    public static List<Employee> getEmployees(){
        List<Employee> list = new ArrayList<>();

        list.add(new Employee(1001, "马化腾", 34, 6000.38));
        list.add(new Employee(1002, "马云", 12, 9876.12));
        list.add(new Employee(1003, "刘强东", 33, 3000.82));
        list.add(new Employee(1004, "雷军", 26, 7657.37));
        list.add(new Employee(1005, "李彦宏", 65, 5555.32));
        list.add(new Employee(1006, "比尔盖茨", 42, 9500.43));
        list.add(new Employee(1007, "任正非", 26, 4333.32));
        list.add(new Employee(1008, "扎克伯格", 35, 2500.32));

        return list;
    }
}
```

:::: tabs cache-lifetime="5" :options="{ useUrlFragment: false }"

::: tab 通过集合

```java
    //创建Stream方式一：通过集合
    @Test
    public void test1(){

        List<Employee> employees = EmployeeData.getEmployees();

        //default Stream<E> stream();返回一个顺序流
        Stream<Employee> stream = employees.stream();

        //default Stream<E> parallelStream(); 返回一个并行流
        Stream<Employee> parallelStream = employees.parallelStream();
        
    }
```

:::

::: tab 通过数组

```java
    //创建Stream方式二：通过数组
    @Test
    public void test2(){

        int[] arr = new int[]{1,2,3,4,5,6};
        //调用Arrays类的static<T> Stream<T> stream(T[] array)：返回一个流
        IntStream stream = Arrays.stream(arr);

        Employee e1 = new Employee(1001,"Tom");
        Employee e2 = new Employee(1002,"Jerry");
        Employee[] arr1 = new Employee[]{e1,e2};
        Stream<Employee> stream1 = Arrays.stream(arr1);
        
    }
```

:::

::: tab 通过Stream的of()

```java
    //创建Stream方式三:通过Stream的of()
    @Test
    public void test3(){

        Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6);
        
    }
```

:::

::: tab 创建无限流

```java
    //创建Stream方式四:创建无限流
    @Test
    public void test4(){

        //迭代
        //public static<T> Stream<T> iterate(final T seed,final UnaryOperator<T> f)
        //遍历前10个偶数
        Stream.iterate(0,t -> t+2).limit(10).forEach(System.out::println);

        //生成
        //public static<T> Stream<T> generate(Supplier<T> s)
        Stream.generate(Math::random).limit(10).forEach(System.out::println);
    }
```

:::

::::

### Stream的中间操作：筛选与切片

多个中间操作可以连接起来形成一个流水线，除非流水线上触发终止操作，否则中间操作不会执行任何的处理！而在终止操作时一次性全部处理，称为“惰性求值”。

| 方法                  | 描述                                                         |
| --------------------- | ------------------------------------------------------------ |
| `filter(Predicate p)` | 接收Lambda ，从流中排除某些元素                              |
| `distinct()`          | 筛选，通过流所生成元素的hashCode() 和equals() 去除重复元素   |
| `limit(long maxSize)` | 截断流，使其元素不超过给定数量                               |
| `skip(long n)`        | 跳过元素，返回一个扔掉了前n 个元素的流。若流中元素不足n 个，则返回一个空流。与limit(n)互补 |

```java {18,23,28,39}
/**
 * @author frx
 * @version 1.0
 * @date 2022/7/12  12:59
 * desc:测试Stream的中间操作
 */
public class StreamAPITest1 {

    //1.筛选与分片
    @Test
    public void test1(){

        List<Employee> list = EmployeeData.getEmployees();

        //filter(Predicate p)--接收Lambda, 从流中排除某些元素
        Stream<Employee> stream = list.stream();
        //查询员工表中薪资大于7000的员工
        stream.filter(e -> e.getSalary()>7000).forEach(System.out::println);
        System.out.println();

        //limit(n)--使其元素不超过给定数量
        stream = list.stream();
        stream.limit(3).forEach(System.out::println);
        System.out.println();

        //skip(n)--跳过元素，返回一个扔掉了n个元素的流，若流中不足n个，侧返回一个空流。与 limit(n) 互补
        stream = list.stream();
        stream.skip(3).forEach(System.out::println);
        System.out.println();

        //distinct()--筛选，通过流所生成元素的hashCode()和equals()去除重复元素
        stream = list.stream();
        list.add(new Employee(1010, "xustudyxu", 40, 8000));
        list.add(new Employee(1010, "xustudyxu", 40, 8000));
        list.add(new Employee(1010, "xustudyxu", 40, 8000));
        list.add(new Employee(1010, "xustudyxu", 40, 8000));
        list.add(new Employee(1010, "xustudyxu", 40, 8000));
//        System.out.println(list);
        list.stream().distinct().forEach(System.out::println);
        stream.close();
    }
}
```

### Stream的中间操作：映射

| 方法                              | 描述                                                         |
| --------------------------------- | ------------------------------------------------------------ |
| `map(Function f)`                 | 接收一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素。 |
| `mapToDouble(ToDoubleFunction f)` | 接收一个函数作为参数，该函数会被应用到每个元素上，产生一个新的DoubleStream。 |
| `mapToInt(ToIntFunction f)`       | 接收一个函数作为参数，该函数会被应用到每个元素上，产生一个新的IntStream。 |
| `mapToLong(ToLongFunction f)`     | 接收一个函数作为参数，该函数会被应用到每个元素上，产生一个新的LongStream。 |
| `flatMap(Function f)`             | 接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流。 |

```java {9,13,14,18-21,25}
public class StreamAPITest2 {

    //映射
    @Test
    public void test2(){

        //map(Function f)——接收一个函数作为参数，将元素转换成其他形式或提取信息，该函数会被应用到每个元素上，并将其映射成一个新的元素。
        List<String> list = Arrays.asList("aa", "bb", "cc", "dd");
        list.stream().map(str -> str.toUpperCase()).forEach(System.out::println);

        //练习：1：获取员工姓名长度大于3的员工的姓名。
        List<Employee> employees = EmployeeData.getEmployees();
        Stream<String> namesStream = employees.stream().map(Employee::getName);
        namesStream.filter(name -> name.length()>3).forEach(System.out::println);
        System.out.println();

        //练习：2：
        Stream<Stream<Character>> streamStream = list.stream().map(StreamAPITest2::fromStringToStream);
        streamStream.forEach(s -> {
            s.forEach(System.out::println);
        });
        System.out.println();

        //flatMap(Function f)——接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流。
        Stream<Character> characterStream = list.stream().flatMap(StreamAPITest2::fromStringToStream);
        characterStream.forEach(System.out::println);
    }

    //将字符串中的多个字符构成的集合转换成对应的Stream的实例
    public static Stream<Character> fromStringToStream(String str){
        ArrayList<Character> list = new ArrayList<>();
        for (Character c : str.toCharArray()) {
            list.add(c);
        }
        return list.stream();
    }

    @Test
    public void test3(){
        ArrayList list1 = new ArrayList();
        list1.add(1);
        list1.add(2);
        list1.add(3);

        ArrayList list2 = new ArrayList();
        list2.add(1);
        list2.add(2);
        list2.add(3);

        list1.add(list2);
        list1.addAll(list2);
        System.out.println(list1);

    }
}
```

### Stream的中间操作：排序

| 方法                     | 描述                               |
| ------------------------ | ---------------------------------- |
| `sorted()`               | 产生一个新流，其中按自然顺序排序   |
| `sorted(Comparator com)` | 产生一个新流，其中按比较器顺序排序 |

```java {11,19-26}
/**
 * 排序
 */
public class StreamAPITest3 {

    @Test
    public void test1(){

        //sorted()--自然排序
        List<Integer> list = Arrays.asList(12, 43, 65, 34, 87, 0, -98, 7);
        list.stream().sorted().forEach(System.out::println);

        //List<Employee> employees = EmployeeData.getEmployees();
        //employees.stream().sorted().forEach(System.out::println);
        //抛异常，没有去实现Comparable接口

        //sorted(Comparator com)--定制排序,年龄从小到大，薪水从小到大
        List<Employee> employees = EmployeeData.getEmployees();
        employees.stream().sorted((e1,e2) -> {
            int ageValue = Integer.compare(e1.getAge(),e2.getAge());
            if(ageValue!=0){
                return ageValue;
            }else {
                return Double.compare(e1.getSalary(),e2.getSalary());//从大到小 加-
            }
        }).forEach(System.out::println);
        
    }
}
```

### Stream的终止操作：匹配与查找

- 终端操作会从流的流水线生成结果。其结果可以是任何不是流的值，例如：List、Integer，甚至是void 。
- 流进行了终止操作后，不能再次使用。

| 方法                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `allMatch(Predicate p)`  | 检查是否匹配所有元素                                         |
| `anyMatch(Predicate p)`  | 检查是否至少匹配一个元素                                     |
| `noneMatch(Predicate p)` | 检查是否没有匹配所有元素                                     |
| `findFirst()`            | 返回第一个元素                                               |
| `findAny()`              | 返回当前流中的任意元素                                       |
| `count()`                | 返回流中元素总数                                             |
| `max(Comparator c)`      | 返回流中最大值                                               |
| `min(Comparator c)`      | 返回流中最小值                                               |
| `forEach(Consumer c)`    | 内部迭代(使用Collection 接口需要用户去做迭代，称为外部迭代。相反，Stream API 使用内部迭代——它帮你把迭代做了) |

```java {13,18,23,27,31,36,41,42,47,52,55}
/**
 * 测试Stream的终止操作
 */
public class StreamAPITest4 {

    //1.匹配与查找
    @Test
    public void test1() {
        List<Employee> employees = EmployeeData.getEmployees();

        //allMatch(Predicate p)——检查是否匹配所有元素。
        //练习；是否所有的员工的年龄都大于18
        boolean allMatch = employees.stream().allMatch(e -> e.getAge() > 18);
        System.out.println(allMatch);

        //anyMatch(Predicate p)——检查是否至少匹配一个元素。
        //练习：是否存在员工的工资大于 10000
        boolean anyMatch = employees.stream().anyMatch(e -> e.getSalary() > 10000);
        System.out.println(anyMatch);

        //noneMatch(Predicate p)——检查是否没有匹配的元素。
        //练习：是否存在员工姓“马”
        boolean noneMatch = employees.stream().noneMatch(e -> e.getName().startsWith("马"));
        System.out.println(noneMatch);

        //findFirst——返回第一个元素
        Optional<Employee> employee = employees.stream().findFirst();
        System.out.println(employee);

        //findAny——返回当前流中的任意元素
        Optional<Employee> employee1 = employees.stream().findAny();
        System.out.println(employee1);

        // count——返回流中元素的总个数
        //工资大于4500的
        long count = employees.stream().filter(e -> e.getSalary() > 4500).count();
        System.out.println(count);

        //max(Comparator c)——返回流中最大值
        //返回最高的工资
        Stream<Double> salaryStream = employees.stream().map(e -> e.getSalary());
        Optional<Double> maxSalary = salaryStream.max(Double::compare);
        System.out.println(maxSalary);

        //min(Comparator c)——返回流中最小值
        //返回最低的工资的员工
        Optional<Employee> employee2 = employees.stream().min((e1, e2) -> Double.compare(e1.getSalary(), e2.getSalary()));
        System.out.println(employee2);
        System.out.println();

        //forEach(Consumer c)——内部迭代
        employees.stream().forEach(System.out::println);

        //使用集合遍历的操作
        employees.forEach(System.out::println);
        
    }
}
```

### Stream的终止操作：归约

| 方法                               | 描述                                                 |
| ---------------------------------- | ---------------------------------------------------- |
| `reduce(T iden, BinaryOperator b)` | 可以将流中元素反复结合起来，得到一个值。返回T        |
| `reduce(BinaryOperator b)`         | 可以将流中元素反复结合起来，得到一个值。返回Optional |

> 备注：map 和reduce 的连接通常称为map-reduce 模式，因Google 用它来进行网络搜索而出名。

```java {9,15-17}
public class StreamAPITest5 {

    @Test
    public void test1(){

        //reduce(T identity, BinaryOperator)——可以将流中元素反复结合起来，得到一个值。返回 T
        //练习1：计算1-10的自然数的和
        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6, 7,8,9,10);
        Integer sum = list.stream().reduce(0, Integer::sum);//0是初始值
        System.out.println(sum);

        //reduce(BinaryOperator) ——可以将流中元素反复结合起来，得到一个值。返回 Optional<T>
        //练习2：计算公司所有员工工资的总和
        List<Employee> employees = EmployeeData.getEmployees();
        Stream<Double> salaryStream = employees.stream().map(e -> e.getSalary());
        //Optional<Double> sumMoney = salaryStream.reduce(Double::sum);
        Optional<Double> sumMoney = salaryStream.reduce((d1, d2) -> d1 + d2);
        System.out.println(sumMoney);

    }
}
```

### Stream的终止操作：收集

| 方法                   | 描述                                                         |
| ---------------------- | ------------------------------------------------------------ |
| `collect(Collector c)` | 将流转换为其他形式。接收一个Collector接口的实现，用于给Stream中元素做汇总的方法 |

```java {12,16}
/**
 * 收集
 */
public class StreamAPITest6 {

    @Test
    public void test1(){

        //collect(Collector c)——将流转换为其他形式。接收一个 Collector接口的实现，用于给Stream中元素做汇总的方法
        //练习1：查找工资大于6000的员工，结果返回为一个List或Set
        List<Employee> employees = EmployeeData.getEmployees();
        List<Employee> employeeList = employees.stream().filter(e -> e.getSalary() > 6000).collect(Collectors.toList());
        employeeList.forEach(System.out::println);
        System.out.println();

        Set<Employee> employeeSet = employees.stream().filter(e -> e.getSalary() > 6000).collect(Collectors.toSet());
        employeeSet.forEach(System.out::println);
    }

}
```

> `Collector` 接口中方法的实现决定了如何对流执行收集的操作(如收集到`List、Set、Map`)。
>
> `Collectors`实用类提供了很多静态方法，可以方便地创建常见收集器实例，具体方法与实例如下表：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220713/image.1dobi5og323k.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220713/image.209xe7n0pqhs.webp)

## Optional类

### Optional类的介绍

到目前为止，臭名昭著的空指针异常是导致Java应用程序失败的最常见原因。以前，为了解决空指针异常，Google公司著名的Guava项目引入了Optional类，Guava通过使用检查空值的方式来防止代码污染，它鼓励程序员写更干净的代码。受到Google Guava的启发，Optional类已经成为Java 8类库的一部分。

+ `Optional` 类(`java.util.Optional`) 是一个容器类，它可以保存类型T的值，代表这个值存在。或者仅仅保存`null`，表示这个值不存在。原来用null 表示一个值不存在，现`在Optional` 可以更好的表达这个概念。并且可以避免空指针异常。
+ Optional类的Javadoc描述如下：这是一个可以为null的容器对象。如果值存在则`isPresent()`方法会返回`true`，调用`get()`方法会返回该对象。
+ Optional提供很多有用的方法，这样我们就不用显式进行空值检测。
+ 创建Optional类对象的方法：
  + `Optional.of(T t)`: 创建一个Optional 实例，<mark>t必须非空</mark>；
  + `Optional.empty()` : 创建一个空的Optional 实例
  + `Optional.ofNullable(T t)`：<mark>t可以为null</mark>
+ 判断Optional容器中是否包含对象：
    + `boolean isPresent() `: 判断是否包含对象
    + `void ifPresent(Consumer<? super T> consumer)` ：如果有值，就执行Consumer接口的实现代码，并且该值会作为参数传给它。
+ 获取Optional容器的对象：
    + `T get()`: 如果调用对象包含值，返回该值，否则抛异常
    +  `T orElse(T other)` ：如果有值则将其返回，否则返回指定的other对象。
    + `T orElseGet(Supplier<? extends T> other)` ：如果有值则将其返回，否则返回由Supplier接口实现提供的对象。
    +  `T orElseThrow(Supplier<? extends X> exceptionSupplier) `：如果有值则将其返回，否则抛出由Supplier接口实现提供的异常。

> Girl类

```java
public class Girl {

    private String name;

    public Girl() {
    }

    public Girl(String name) {
        this.name = name;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Girl{" +
                "name='" + name + '\'' +
                '}';
    }
}
```

> Boy类

```java
public class Boy {

    private Girl girl;

    public Boy() {
    }

    public Boy(Girl girl) {
        this.girl = girl;
    }

    public Girl getGirl() {
        return girl;
    }

    public void setGirl(Girl girl) {
        this.girl = girl;
    }

    @Override
    public String toString() {
        return "Boy{" +
                "girl=" + girl +
                '}';
    }
}
```

> 测试类

```java {14,24,27}
public class OptionalTest {

    /**
     * Optional.of(T t) : 创建一个 Optional 实例，t必须非空；
     * Optional.empty() : 创建一个空的 Optional 实例
     * Optional.ofNullable(T t)：t可以为null
     */

    @Test
    public void test(){

        Girl girl = new Girl();
        //girl=null;//报空指针异常 of(T t)方法 必须保证t非空
        Optional<Girl> optionalGirl = Optional.of(girl);

    }

    @Test
    public void test1(){

        Girl girl = new Girl();
        girl=null;
        //ofNullable(T t) //t可以为null
        Optional<Girl> optionalGirl = Optional.ofNullable(girl);
        //orElse(T t1):如果当前的Optional内部封装的t是非空的，则返回内部的t
        //如果内部的t是空的，则返回orElse()方法中的参数t1
        Girl lucy = optionalGirl.orElse(new Girl("Lucy"));
        System.out.println(lucy);

    }
}
```

### Optional类的使用举例

> 测试类

```java
/**
 * Optional类：为了在程序中避免出现空指针异常而创建的。
 *
 * 常用的方法：ofNullable(T t)
 *           orElse(T t)
 */
public class OptionTest1 {

    public String getGirlName(Boy boy){
        return boy.getGirl().getName();
    }

    @Test
    public void test2(){
        //让boy.getGirl()为null
        Boy boy = new Boy();
        String girlName = getGirlName(boy);
        System.out.println(girlName);
    }

    //优化以后的getGirlName():
    //没有Optional
    /*public String getGirlName1(Boy boy){
        if(boy !=null){
            Girl girl = boy.getGirl();
            if(girl!=null){
                return girl.getName();
            }
        }
        return null;
    }*/

    //优化以后的getGirlName():
    //有Optional
    //使用Optional类的getGirlName()
    public String getGirlName2(Boy boy){
        Optional<Boy> boyOptional = Optional.ofNullable(boy);
        //此时的boy1一定非空
        Boy boy1 = boyOptional.orElse(new Boy(new Girl("Smith")));
        Girl girl = boy1.getGirl();
        Optional<Girl> girlOptional = Optional.ofNullable(girl);
        //此时的girl1一定非空
        Girl girl1 = girlOptional.orElse(new Girl("Mary"));
        return girl1.getName();
    }

    @Test
    public void test3(){
        Boy boy = null;//boy为null
        String girlName2 = getGirlName2(boy);
        System.out.println(girlName2);//Smith
        boy=new Boy();//girl为null
        String girlName3= getGirlName2(boy);
        System.out.println(girlName3);//Mary

        Boy boy1 = new Boy(new Girl("Lucy"));
        String girlName4 = getGirlName2(boy1);
        System.out.println(girlName4);//Lucy

    }

}
```

