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

### 方法的传参机制

```java
public class Exam4 {
    public static void main(String[] args) {
        int i = 1;
        String str = "hello";
        Integer num = 200;
        int[] arr = {1,2,3,4,5};
        MyData my = new MyData();

        change(i,str,num,arr,my);

        // arr my变了
        System.out.println("i= " + i);
        System.out.println("str= " + str);
        System.out.println("num= " + num);
        System.out.println("arr= " + Arrays.toString(arr));
        System.out.println("my.a= " + my.a);

    }
    public static void change(int j, String s, Integer n, int[] a, MyData m) {
        j += 1;
        s += "world";
        n += 1;
        a[0] += 1;
        m.a += 1;
    }
}
class MyData {
    int a = 10;

}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221128/image.4dcgbylblj00.webp)

+ 运行结果

```java
i= 1
str= hello
num= 200
arr= [2, 2, 3, 4, 5]
my.a= 11

Process finished with exit code 0
```

**考点**？

方法的参数传递机制

String、包装类等对象的不可变性

**方法的参数传递机制**

1. 形参是基本数据类型
   + 传递数据值
2. 实参是引用数据类型
   + 传递地址值
   + 特殊的类型：String、包装类等对象的不可变性

### 递归与迭代

编程题：有n步台阶，一次只能上1步或2步，共有多少种走法？

1. 递归

```java
public class TestStep {

    @Test
    public void test(){
        long start = System.currentTimeMillis();
        System.out.println(f(10));
        long end = System.currentTimeMillis();
        System.out.println("消耗时间："+(end-start));
    }

    //实现f(n):求n步台阶 一共有几种走法？
    public int f(int n){
        if(n<1){
            throw new IllegalArgumentException(n+"不能小于1");
        }
        if(n==1 || n==2){
            return n;
        }
        return f(n-2)+f(n-1);
    }
}
```

2. 循环迭代

```java
public class TestStep2 {
    
    @Test
    public void test(){

        long start = System.currentTimeMillis();
        System.out.println(loop(10));
        long end = System.currentTimeMillis();
        System.out.println("消耗时间:"+(end-start));
    }

    public int loop(int n){

        if(n<1){
            throw new IllegalArgumentException(n+"不能小于1");
        }

        if(n==1 || n==2){
            return n;
        }
        int one = 2;//初始化为走到第二级台阶的走法
        int two = 1;//初始化为走到第一级台阶的走法
        int sum = 0;

        for (int i = 3; i <= n; i++) {

            //最后跨2步 + 最后跨1步的走法
            sum = two + one;
            two = one;
            one = sum;

        }
        return sum;
    }
}
```

小结:

+ 方法调用自身称为递归，利用变量的原值推出新值称为迭代。
+ 递归
  + 优点：大问题转化为小问题，可以减少代码量，同时代码精简，可读性好；
  + 缺点：递归调用浪费了空间，而且递归太容易造成堆栈的溢出。
+ 迭代
  + 优点：代码运行效率好，因为时间只因循环次数增加而增加，而且没有额外的空间开销；
  + 缺点：代码不如递归简洁，可读性好；

### 成员变量与局部变量

```java
public class Exam5 {
    static int s;//成员变量，类变量
    int i;//成员变量，实例变量
    int j;//成员变量，实例变量
    {
        int i = 1;//非静态代码块的局部变量i
        i++;
        j++;
        s++;
    }
    public void test(int j){//形参，局部变量j
        j++;
        i++;
        s++;
    }

    public static void main(String[] args) {//形参，局部变量，args
        Exam5 obj1 = new Exam5();//局部变量，obj1
        Exam5 obj2 = new Exam5();//局部变量，obj2
        obj1.test(10);
        obj1.test(20);
        obj2.test(30);
        System.out.println(obj1.i+","+obj1.j+","+obj1.s);
        System.out.println(obj2.i+","+obj2.j+","+obj2.s);
    }
}
```

+ 结果

```java
2,1,5
1,1,5

Process finished with exit code 0
```

**考点**

1. 就近原则
2. 变量的分类
   + 成员变量：类变量、实例变量
   + 局部变量
3. 非静态代码块的执行：每次创建实例对象都会执行
4. 方法的调用规则：调用一次执行一次

**分析如图**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221129/image.4yw1yt2bmr80.webp)

**局部变量与成员变量的区别**

1. 声明的位置
   + 局部变量：方法体{}中、代码块{}中、形参
   + 成员方法：类中的方法外
     + 类变量：有static修饰
     + 实例变量：没有static修饰
2. 修饰符
   + 局部变量：`final`
   + 成员变量：`public`、`protected`、`private`、`final`、`static`、`volatile`、`transient`
3. 值存储的位置
   + 局部变量：栈
   + 实例变量：堆
   + 类变量：方法区
4. 作用域
   + 局部变量：声明处开始、到所属的}结束
   + 实例变量：在当前类中 “this ”（有时this. 可以省略），在其他类中 “对象名. ” 访问
   + 类变量：在当前类中 “类名” （有时类名. 可以省略），在其它类中 “类名.” 或 “对象名.” 访问
5. 声明周期
   + 局部变量：每一个线程，每一次调用执行都是新的生命周期
   + 实例变量：随着对象的创建而初始化，随着对象的被回收而消亡，每一个对象的实例变量都是独立的
   + 类变量：随着类的初始化而初始化，随着类的卸载而消亡，该类的所有对象的类变量是共享的

**当局部变量与XX变量重名时，如何区分**

1. 局部变量与实例变量重名

在实例变量前面加 “this.”

2. 局部变量与类变量重名

在类变量前面加 “类名.”

## SSM 面试题

### Spring Bean 的作用域

在 Spring 的配置文件中，给 bean 加上 scope 属性来指定 bean 的作用域如下：

+ singleton：唯一 bean 实例，Spring 中的 bean 默认都是单例的。
+ prototype：每次请求都会创建一个新的 bean 实例。
+ request： 每一次 HTTP 请求都会产生一个新的 bean，该 bean 仅在当前 HTTP request 内有效。
+ session：每一次 HTTP 请求都会产生一个新的 bean，该 bean 仅在当前 HTTP session 内有效。
+ global-session：全局session作用域，仅仅在基于portlet的web应用中才有意义，Spring5已经没有了。Portlet是能够生成语义代码(例如：HTML)片段的小型Java Web插件。它们基于portlet容器，可以像servlet一样处理HTTP请求。但是，与 servlet 不同，每个 portlet 都有不同的会话。

### Spring 支持的常用数据库事务传播行为和事务的隔离级别？

#### 事务的隔离级别

TransactionDefinition 接口中定义了五个表示隔离级别的常量：

+ TransactionDefinition.ISOLATION_DEFAULT: 使用后端数据库默认的隔离级别，Mysql 默认采用的 REPEATABLE_READ隔离级别 Oracle 默认采用的 READ_COMMITTED隔离级别.
+ TransactionDefinition.ISOLATION_READ_UNCOMMITTED: 最低的隔离级别，允许读取尚未提交的数据变更，可能会导致脏读、幻读或不可重复读
+ TransactionDefinition.ISOLATION_READ_COMMITTED: 允许读取并发事务已经提交的数据，可以阻止脏读，但是幻读或不可重复读仍有可能发生
+ TransactionDefinition.ISOLATION_REPEATABLE_READ: 对同一字段的多次读取结果都是一致的，除非数据是被本身事务自己所修改，可以阻止脏读和不可重复读，但幻读仍有可能发生。
+ TransactionDefinition.ISOLATION_SERIALIZABLE: 最高的隔离级别，完全服从ACID的隔离级别。所有的事务依次逐个执行，这样事务之间就完全不可能产生干扰，也就是说，该级别可以防止脏读、不可重复读以及幻读。但是这将严重影响程序的性能。通常情况下也不会用到该级别。

#### 事务的传播行为

支持当前事务的情况：

+ TransactionDefinition.PROPAGATION_REQUIRED： 如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务。
+ TransactionDefinition.PROPAGATION_SUPPORTS： 如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行。
+ TransactionDefinition.PROPAGATION_MANDATORY： 如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常。（mandatory：强制性）

不支持当前事务的情况：

+ TransactionDefinition.PROPAGATION_REQUIRES_NEW： 创建一个新的事务，如果当前存在事务，则把当前事务挂起。
+ TransactionDefinition.PROPAGATION_NOT_SUPPORTED： 以非事务方式运行，如果当前存在事务，则把当前事务挂起。
+ TransactionDefinition.PROPAGATION_NEVER： 以非事务方式运行，如果当前存在事务，则抛出异常。

其他情况：

+ TransactionDefinition.PROPAGATION_NESTED： 如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于TransactionDefinition.PROPAGATION_REQUIRED。

### Spring MVC 如果解决 POST 请求中文乱码问题？

##### 1、解决 POST 请求中文乱码问题

修改项目中web.xml文件

```xml
  <filter>
    <filter-name>CharacterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
    <init-param>
      <param-name>forceEncoding</param-name>
      <param-value>true</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>CharacterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

##### 2、解决 Get 请求中文乱码问题

修改tomcat中server.xml文件

```xml
<Connector URIEncoding="UTF-8" port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
```

### Spring MVC 的工作流程？

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221129/image.2w16yitcfoc0.webp)

流程说明（重要）：
1、客户端（浏览器）发送请求，直接请求到 **DispatcherServlet**。
2、**DispatcherServlet** 根据请求信息调用 **HandlerMapping**，解析请求对应的 **Handler**。
3、解析到对应的 **Handler**（也就是我们平常说的 **Controlle**r 控制器）后，开始由 **HandlerAdapter** 适配器处理。
4、**HandlerAdapter** 会根据 Handler 来调用真正的处理器来处理请求，并处理相应的业务逻辑。
5、处理器处理完业务后，会返回一个 **ModelAndView** 对象，**Model** 是返回的数据对象，**View** 是个逻辑上的 View。
6、**ViewResolver** 会根据逻辑 **View** 查找实际的 **View**。
7、**DispaterServlet** 把返回的 **Model** 传给 **View**（视图渲染）。
8、把 **View** 返回给请求者（浏览器）

### Mybatis 中当实体类中的属性名和表中的字段不一样，怎么解决？

解决方案有三种如下：
1、写 SQL 语句的时候 写别名
2、在MyBatis的全局配置文件中开启驼峰命名规则，前提是符合驼峰命名规则

```xml
<!-- 开启驼峰命名规则，可以将数据库中下划线映射为驼峰命名
	列如 last_name 可以映射为 lastName
-->
<setting name="mapUnderscoreToCameLCase" value="true" />
```

3. 在Mapper映射文件中使用 resultMap 自定义映射

```xml
<!-- 
	自定义映射
-->
<resultMap type="com.atguigu.pojo.Employee" id="myMap">
    <!-- 映射主键 -->
	<id cloumn="id" property="id"/>
    <!-- 映射其他列 -->
    <result column="last_name" property="lastName" />
    <result column="email" property="email" />
    <result column="salary" property="salary" />
    <result column="dept_id" property="deptId" />
</resultMap>
```

