---
title: Java 面试题
date: 2022-11-21 23:37:31
permalink: /pages/1f387c/
categories:
  - 面试题
tags:
  - 面试题
---
# Java 面试题

[[toc]]

## JavaSE 面试题

### 自增变量

```java
public class Autoincrement {
    public static void main(String[] args) {
        int i = 1;
        i = i++;
        int j = i++;
        int k = i + ++i * i++;
        System.out.println("i="+i);//4
        System.out.println("j="+j);//1
        System.out.println("k="+k);//11
    }
}
```

+ 查看字节码文件`javap -c Autoincrement.class`

```java
F:\yygh\yygh_parent-master\Interview-questions\out\production\Interview-questions\com\frx01\interview\javase>javap -c Autoincrement.class
Compiled from "Autoincrement.java"
public class com.frx01.interview.javase.Autoincrement {
  public com.frx01.interview.javase.Autoincrement();
    Code:
       0: aload_0
       1: invokespecial #1                  // Method java/lang/Object."<init>":()V
       4: return

  public static void main(java.lang.String[]);
    Code:
       0: iconst_1  
       1: istore_1                   // int i = 1; -------->int i = 1;
       2: iload_1                    //加载到栈
       3: iinc          1, 1         //i自增---------------->i = i++;
       6: istore_1					 //把i赋给i   --->i=1
       7: iload_1					 //加载1
       8: iinc          1, 1		 //i自增---------------->int j = i++;
      11: istore_2					 //赋值给第二个变量
      12: iload_1					 //加载i---------------->int k = i + ++i * i++; i=2
      13: iinc          1, 1         //i自增 ++i ----------->i=3
      16: iload_1					 //加载i      ---------->i=3
      17: iload_1                    //加载i 
      18: iinc          1, 1         //i自增为3 i++  ------->i=3
      21: imul                       //把操作数栈中前两个弹出求乘积结果再压入栈 3*3
      22: iadd						 //相加 2+3*3
      23: istore_3                   //赋值给k
      24: getstatic     #2                  // Field 
      ...
}

```

::: tip 总结

+ 赋值=，最后计算
+ =右边的从左到右加载值依次压入操作数栈
+ 实际先算哪个，看运算符优先级
+ 自增、自减操作都是直接修改变量的值，不经过操作数栈
+ 最后的赋值之前，临时结果也是存储在操作数栈中
+  前++：`++i先自增后赋值`; 后++：`i++先赋值后运算`

:::

### 单例设计模式

+ 什么是Singleton：在Java中即指单例设计模式，它是软件开发中最常用的设计模式之一。
+ 单：唯一
+ 例：实例
+ 单例设计模式，即某个类在整个系统中只能有一个实例对象可被获取和使用的代码模式。

+ 例如:代表JVM运行环境的Runtime类。

**要点**

+ 一是某个类只能有一个实例;
  + 构造器私有化
+ 二是它必须自行创建这个实例;
  + 含有一个该类的静态变量来保存这个唯一的实例

+ 三是它必须自行向整个系统提供这个实例;
  + 对外提供获取该实例对象的方式:
    + 直接暴露
    + 用静态变量的 get 方法获取

**几种常见形式**

> + 饿汉式：直接创建对象，不存在线程安全问题
>   + 直接实例化饿汉式（简洁直观)
>   + 枚举式（最简洁)
>   + 静态代码块饿汉式(适合复杂实例化)
> + 懒汉式:延迟创建对象
>   + 线程不安全（适用于单线程)
>   + 线程安全（适用于多线程)
>   + 静态内部类形式(适用于多线程)

#### 饿汉式-直接式

```java
/**
 * desc：
 * 直接创建实例对象，不管你是否需要这个对象
 * 1.把构造器私有化
 * 2.自行创建，并且用静态变量保存
 * 3.向外提供这个实例
 * 4.强调这是一个单例，我们可以用final修饰
 * */
public class Singleton1 {

    public static final Singleton1 INSTANCE = new Singleton1();

    private Singleton1() {
    }
}
```

+ 测试

```java
public class Singleton1Test {
    public static void main(String[] args) {
        Singleton1 s = Singleton1.INSTANCE;
        System.out.println(s);//com.frx01.interview.javase.single.Singleton1@677327b6
    }
}
```

#### 饿汉式-枚举式

```java
/**
 * desc：
 * 枚举类型：表示该类型的对象有限几个
 * 我们可以限定一个，就成了单例
 */
public enum Singleton2 {
    INSTANCE
}
```

+ 测试

```java
public class Singleton2Test {
    public static void main(String[] args) {
        Singleton2 s = Singleton2.INSTANCE;
        System.out.println(s);//INSTANCE
    }
}
```

#### 饿汉式-静态代码块

```java
public class Singleton3 {
    public static final Singleton3 INSTANCE;
    private String info;
    static {
        try {
            Properties properties = new Properties();
            properties.load(Singleton3.class.getClassLoader().getResourceAsStream("single.properties"));
            INSTANCE = new Singleton3(properties.getProperty("info"));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
    private Singleton3(String info) {
        this.info = info;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    @Override
    public String toString() {
        return "Singleton3{" +
                "info='" + info + '\'' +
                '}';
    }
}
```

```properties
info=Hello
```

+ 测试

```java
public class Singleton3Test {
    public static void main(String[] args) {
        Singleton3 s = Singleton3.INSTANCE;
        System.out.println(s);//Singleton3{info='Hello'}
    }
}
```

#### 懒汉式-延迟创建

##### 线程不安全（适用于单线程）

```java
/**
 * desc:
 * 懒汉式：
 *  延迟创建这个实例对象
 *
 *  1.构造器私有化
 *  2.用一个静态变量保存这个唯一的实例
 *  3.提供一个静态方法，获取这个实例对象
 */
public class Singleton4 {
    private static Singleton4 instance;
    private Singleton4(){

    }
    public static Singleton4 getInstance(){
        if(instance == null){
            instance = new Singleton4();
        }
        return instance;
    }
}
```

+ 测试

```java
public class Singleton4Test {
    public static void main(String[] args) {
        Singleton4 s1 = Singleton4.getInstance();
        Singleton4 s2 = Singleton4.getInstance();
        System.out.println(s1 == s2);//true
    }
}
```

##### 线程安全（适用于多线程）

```java
public class Singleton5 {
    private static Singleton5 instance;
    private Singleton5(){

    }
    public static Singleton5 getInstance(){
        if(instance == null){
            synchronized (Singleton5.class){
                if(instance == null){
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                    instance = new Singleton5();
                }
            }
        }

        return instance;
    }
}
```

+ 测试

```java
public class Singleton5Test {
    public static void main(String[] args) throws ExecutionException, InterruptedException {

        Callable<Singleton5> c = () -> Singleton5.getInstance();

        ExecutorService es = Executors.newFixedThreadPool(2);
        Future<Singleton5> f1 = es.submit(c);
        Future<Singleton5> f2 = es.submit(c);

        Singleton5 s1 = f1.get();
        Singleton5 s2= f2.get();
        System.out.println(s1 == s2);//true
        System.out.println(s1);
        System.out.println(s2);
        
        es.shutdown();

    }
}
```

##### 静态内部类形式（适用于多线程）

```java
/**
 *  在内部类被加载和初始化时，才创建INSTANCE实例对象
 *  静态内部类不会自动随着外部类的加载和初始化而初始化，它是单独去加载和初始化的
 *  因此是在内部类加载和初始化时，创建的，因此是线程安全的
 */
public class Singleton6 {
    private Singleton6() {

    }
    private static class Inner {
        private static final Singleton6 INSTANCE = new Singleton6();
    }
    public static Singleton6 getInstance(){
        return Inner.INSTANCE;
    }
}
```

+ 测试

```java
public class Singleton6Test {
    public static void main(String[] args) {
        Singleton6 s1 = Singleton6.getInstance();
        Singleton6 s2 = Singleton6.getInstance();
        System.out.println(s1 == s2);//true
    }
}
```

### 类初始化和实例初始化

```java
public class Father {
    private int i = test();
    private static int j = method();

    static {
        System.out.print("(1)");
    }

    Father(){
        System.out.print("(2)");
    }

    {
        System.out.print("(3)");
    }

    public int test(){
        System.out.print("(4)");
        return 1;
    }

    public static int method(){
        System.out.print("(5)");
        return 1;
    }
}
```

```java
public class Son extends Father{
    private int i = test();
    private static int j = method();

    static {
        System.out.print("(6)");
    }

    Son() {
        System.out.print("(7)");
    }
    {
        System.out.print("(8)");
    }
    public int test(){
        System.out.print("(9)");
        return 1;
    }
    public static int method(){
        System.out.print("(10)");
        return 1;
    }

    public static void main(String[] args) {
        Son s1 = new Son();
        System.out.println();
        Son s2 = new Son();
    }

}
```

+ 结果

```java
(5)(1)(10)(6)(9)(3)(2)(9)(8)(7)
(9)(3)(2)(9)(8)(7)
Process finished with exit code 0
```

> 执行顺序：
>
> + 父类的静态代码块和静态属性(优先级一样，按定义顺序执行)
>
> + 子类的静态代码块和静态属性(优先级一样，按定义顺序执行)
> + 父类的普通代码块和普通属性初始化(优先级一样,按定义顺序执行)
> + 父类的构造器
> + 子类的普通代码块和普通属性初始化(优先级一样，按定义顺序执行)
> + 子类的构造方法

#### 类初始化过程

1. 一个类要创建实例需要先加载并初始化该类
   + main方法所在的类需要先加载和初始化
2. 一个子类要初始化需要先初始化父类
3. 一个类初始化就是执行`<clinit>()`方法
   + `<clinit>()`方法由静态类变量显示赋值代码和静态代码块组成
   + 类变量显示赋值代码和静态代码块代码代码从上到下顺序执行
   + `<clinit>`方法只执行一次

#### 实例的初始化过程

1. 实例初始化就是执行`<init>()`方法
   + \<init>()方法可能重载有多个，有几个构造器就有几个\<init>方法
   + \<init>()方法由非静态实例变量显示赋值代码和非静态代码块、对应构造器代码组成
   + 非静态实例变量显示赋值代码和非静态代码块代码从上到下顺序执行，而行应构造器的代码最后执行
   + 每次创建实例对象，调用对应构造器，执行的就是对应的\<init>方法
   + \<init>方法的首行是super()或super(实参列表)，即对应父类的\<init>方法

#### 方法的重写

1. 哪些方法不可以被重写
   + final 方法
   + 静态方法
   + private等子类中不可见方法
2. 对象的多态性
   + 子类如果重写了父类的方法，通过子类对象调用的一定是子类重写过得代码   
   + 非静态方法默认的调用对象是this
   + this对象在构造器或者说`<init>`方法中就是正在创建的对象