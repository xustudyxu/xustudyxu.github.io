---
title: Java 反射
date: 2021-12-20 18:44:12
permalink: /pages/630cd1/
categories:
  - java
tags:
  - java
---
# Java 反射

## 一个需求引出反射

### 请看下面的问题

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/01.png)

+ 代码演示：

```java
package com.reflection.question;

import com.Cat;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/11  17:35
 * 反射问题的引入
 */
@SuppressWarnings({"ALL"})
public class ReflectionQuestion {
    public static void main(String[] args) throws IOException, ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
        //根据配置文件 re.properties 指定信息，创建Cat对象并调用方法hi

        //传统的方式 new 对象 ->调用方法
        //Cat cat = new Cat();
        //cat.hi();

        //我们尝试 做 明白反射的价值

        //1.使用Properties类，可以读写配置文件
        Properties properties = new Properties();
        properties.load(new FileInputStream("src\\re.properties"));
        String classfullpath = properties.get("classfullpath").toString();//"com.Cat"
        String methodName = properties.get("method").toString();//"hi"
        System.out.println("classfullpath="+classfullpath);
        System.out.println("method="+methodName);

        //2.创建对象 传统方法行不通 使用反射机制
        //new classfullpath()

        //3.使用发射机制解决
        //(1) 加载类,返回Class类型的对象cls
        Class cls = Class.forName(classfullpath);
        //(2)通过 cls 得到你加载的类 com.hspedu.Cat 的对象实列
        Object o = cls.newInstance();
        System.out.println("o的运行类型="+o.getClass());//运行类型
        //(3)通过 cls得到你加载的类 com.Cat 的 methodName 的方法对象
        // 即：在反射中，可以把方法视为对象()
        Method method1 = cls.getMethod(methodName);
        //(4)通过method1 调用方法：即通过方法对象来实现调用方法
        System.out.println("=========================");
        method1.invoke(o);//传统方法:对象.方法 ，反射机制 方法.invoke(对象)


    }
}

```

## 反射机制

### Java Reflection

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/02.png)

### Java 反射机制原理示意图!!!

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/03.png)

### Java 反射机制可以完成

1. <font color=#0099ff size=4 face="黑体">在运行时判断任意一个对象所属的类</font>
2. <font color=#0099ff size=4 face="黑体">在运行时构造任意一个类的对象</font>
3. <font color=#0099ff size=4 face="黑体">在运行时得到任意一个类所具有的成员变量和方法</font>
4. <font color=#0099ff size=4 face="黑体">在运行时调用任意一个对象的成员变量和方法</font>
5. <font color=#0099ff size=4 face="黑体">生成动态代理</font>

### 反射相关的主要类

1. <font color=#0099ff size=4 face="黑体">java.lang.Class:代表一个类，Class对象表示某个类加载后在堆中的对象</font>
2. <font color=#0099ff size=4 face="黑体">java.lang.reflect.Method:代表类的方法, Method对象表示某个类的方法</font>
3. <font color=#0099ff size=4 face="黑体">java.lang.reflect.Field:代表类的成员变量, Field对象表示某个类的成员变量</font>
4. <font color=#0099ff size=4 face="黑体">java.lang.reflect.Constructor:代表类的构造方法, Constructor对象表示构造器</font>

+ 这些类在 **java.lang.reflection**

+ 代码演示:

```java
package com.reflection;

import java.io.FileInputStream;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/12  16:10
 */
@SuppressWarnings({"all"})
public class Reflection01  {
    public static void main (String[] args) throws Exception{

        //1.使用Properties类，可以读写配置文件
        Properties properties = new Properties();
        properties.load(new FileInputStream("src\\re.properties"));
        String classfullpath = properties.get("classfullpath").toString();//"com.Cat"
        String methodName = properties.get("method").toString();//"hi"

        //3.使用发射机制解决
        //(1) 加载类,返回Class类型的对象cls
        Class cls = Class.forName(classfullpath);
        //(2)通过 cls 得到你加载的类 com.hspedu.Cat 的对象实列
        Object o = cls.newInstance();
        System.out.println("o的运行类型=" + o.getClass());//运行类型
        //(3)通过 cls得到你加载的类 com.Cat 的 methodName 的方法对象
        // 即：在反射中，可以把方法视为对象()
        Method method1 = cls.getMethod(methodName);
        //(4)通过method1 调用方法：即通过方法对象来实现调用方法
        System.out.println("=========================");
        method1.invoke(o);//传统方法:对象.方法 ，反射机制 方法.invoke(对象)

        //java.lang.reflection.Field:代表类的成员变量，Field对象表示某个类的成员变量
        //得到name字段
        //getField不能得到私有的属性
        Field nameFile = cls.getField("age");//
        System.out.println(nameFile.get(o));//传统写法 对象.成员变量，反射:成员变量的对象.get(对象)

        //java.lang.reflect.Constructor:代表类的构造方法，Constructor对象表示构造器
        Constructor constructor1 = cls.getConstructor();
        System.out.println(constructor1);

        Constructor constructor2 = cls.getConstructor(String.class);//这里老师传入的 String.class 就是String类的Class对象
        System.out.println(constructor2);//Cat(String name)


    }
}
```

### 反射优点和缺点

+ <font color=#0099ff size=4 face="黑体">优点:可以动态的创建和使用对象(也是框架底层核心),使用灵活,没有反射机制,框架技术就失去底层支撑。</font>
+ <font color=#0099ff size=4 face="黑体">缺点:使用反射基本是解释执行,对执行速度有影响.</font>

+ 代码演示：

```java
package com.reflection;

import com.Cat;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/12  20:16
 * 测试反射调用的性能,和优化方案
 */
@SuppressWarnings({"all"})
public class Reflection02 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        m1();
        m2();
        m3();


    }

    //传统方法来调用hi
    public static void m1(){

        Cat cat = new Cat();
        long start = System.currentTimeMillis();
        for (int i = 0; i < 90000000; i++) {
            cat.hi();
        }
        long end = System.currentTimeMillis();
        System.out.println("传统方法来调用hi耗时="+(end-start));//4
    }


    //反射机制调用方法
    public static void m2() throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {

        Class cls = Class.forName("com.Cat");
        Object o = cls.newInstance();
        Method method = cls.getMethod("hi");
        long start = System.currentTimeMillis();
        for (int i = 0; i < 90000000; i++) {
            method.invoke(o);

        }
        long end = System.currentTimeMillis();
        System.out.println("反射机制方法来调用hi耗时="+(end-start));//226
    }

    //反射调用优化 + 关闭访问检测

    public static void m3() throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {

        Class cls = Class.forName("com.Cat");
        Object o = cls.newInstance();
        Method method = cls.getMethod("hi");
        method.setAccessible(true);//取消在反射调用方法时，取消访问检查
        long start = System.currentTimeMillis();
        for (int i = 0; i < 90000000; i++) {
            method.invoke(o);

        }
        long end = System.currentTimeMillis();
        System.out.println("m3 调用hi耗时="+(end-start));//164
    }

}

```

## Class类

### 基本介绍

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/04.png)

+ 代码演示:

```java
package com.reflection.class_;

import com.Cat;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/12  21:23
 * 对Class类的特点的梳理
 */
public class Class01 {
    public static void main(String[] args) throws ClassNotFoundException {
        //看Class类图
        //1.Class也是类，因此继承Object类
        //Class
        //2.Class类对象不是new出来的，而是系统创建的
        //(1)传统new对象
        /* ClassLoader类
         public Class<?> loadClass(String name) throws ClassNotFoundException {
                return loadClass(name, false);
            }
         */
        //Cat cat = new Cat();

        //(2)通过反射方式,刚才老师没有debug到
        Class cls1 = Class.forName("com.Cat");
        /*ClassLoader类,仍然是通过ClassLoader类加载Cat类的class类
         public Class<?> loadClass(String name) throws ClassNotFoundException {
                return loadClass(name, false);
            }

         */
        //3.对于某个类的Class类对象，在内存中只有一份，因为类只加载一次
        Class cls2 = Class.forName("com.Cat");
        System.out.println(cls1.hashCode());
        System.out.println(cls2.hashCode());
        Class cls3 = Class.forName("com.Dog");
        System.out.println(cls3.hashCode());

    }
}

```

### Class类的常用方法

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/05.png)

### 应用实例

+ 代码演示：

```java
package com.reflection.class_;

import com.Car;

import java.lang.reflect.Field;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/13  17:19
 */
public class Class02 {
    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchFieldException {

        String classAllPath = "com.Car";
        //1.获取到Car类对应的Class 对象
        //<?>获取不确定的java类型
        Class<?> cls = Class.forName(classAllPath);
        //2.输出cls
        System.out.println(cls);//显示cls对象,是哪个类的Class对象
        System.out.println(cls.getClass());//输出cls运行类型 java.lang.Class
        //3.得到包名
        System.out.println(cls.getPackage().getName());
        //4.得到全类名
        System.out.println(cls.getName());
        //5.通过cls来创一个对象实例
        Car car = (Car)cls.newInstance();
        System.out.println(car);
        //6.通过反射获取属性
        Field brand = cls.getField("brand");
        System.out.println(brand.get(car));//宝马
        //7.通过反射给属性赋值
        brand.set(car,"奔驰");
        System.out.println(brand.get(car));//奔驰
        //8.得到所有的属性(字段)
        System.out.println("========所有的字段属性=======");
        Field[] fields = cls.getFields();
        for (Field f :fields) {
            System.out.println(f.getName());//名称
            
        }


    }
}

```

## 获取Class对象

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/06.png)

+ 代码演示:

```java
package com.reflection.class_;

import com.Car;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/14  10:22
 * 演示得到Class对象的各种方式(6)
 */
public class GetClass_ {
    public static void main(String[] args) throws ClassNotFoundException {


        //1.Class.forName
        String classAllPath = "com.Car";//通过读取配置文件读取
        Class<?> cls1 = Class.forName(classAllPath);
        System.out.println(cls1);

        //2.类名.class，应用场景:用于参数传递
        Class cls2 = Car.class;
        System.out.println(cls2);

        //3.对象.getClass(),应用场景，有对象实例
        Car car = new Car();
        Class cls3 = car.getClass();
        System.out.println(cls3);

        //4.通过类加载器【4种】通过类加载器来获取到类的Class对象
        //(1)先得到类加载器 car
        ClassLoader classLoader = car.getClass().getClassLoader();
        //(2)通过类加载器得到Class对象
        Class cls4 = classLoader.loadClass(classAllPath);
        System.out.println(cls4);

        //cls1,cls2,cls3,cls4 其实是同一个对象 只能有一个类对象与Cat对应
        System.out.println(cls1.hashCode());
        System.out.println(cls2.hashCode());
        System.out.println(cls3.hashCode());
        System.out.println(cls4.hashCode());

        //5.基本数据(int,char,boolean,float,double,byte,long,short)按如下方式得到Class对象
        Class<Integer> integerClass = int.class;
        Class<Character> characterClass = char.class;
        Class<Boolean> booleanClass = boolean.class;
        System.out.println(integerClass);//int

        //6.基本数据类型对应的包装类，可以通过，TYPE 得到Class类对象
        Class<Integer> type = Integer.TYPE;
        Class<Character> type1 = Character.TYPE;//其他包装类BOOLEAN,DOUBLE,LONG,BYTE等
        System.out.println(type1);

        System.out.println(integerClass.hashCode());
        System.out.println(type1.hashCode());
    }
}
```

## 那些类型有Class对象

### 如下类型有 Class 对象

1. <font color=#0099ff size=4 face="黑体">外部类,成员内部类,静态内部类，局部内部类，匿名内部类</font>
2. <font color=#0099ff size=4 face="黑体">interface:接口</font>
3. <font color=#0099ff size=4 face="黑体">数组</font>
4. <font color=#0099ff size=4 face="黑体">enum:枚举</font>
5. <font color=#0099ff size=4 face="黑体">annotation:注解基本数据类型</font>
6. <font color=#0099ff size=4 face="黑体">void</font>

### 应用实例

+ 代码演示:

```java
package com.reflection.class_;

import java.io.Serializable;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/14  16:19
 * 演示哪些类型有Class对象
 */
public class AllTypeClass {
    public static void main(String[] args) {

        Class<String> cls1 = String.class;//外部类
        Class<Serializable> cls2 = Serializable.class;//接口
        Class<Integer[]> cls3 = Integer[].class;//数组
        Class<float[][]> cls4 = float[][].class;//二维数组
        Class<Deprecated> cls5 = Deprecated.class;//注解
        Class<Thread.State> cls6 = Thread.State.class;//枚举
        Class<Long> cls7 = long.class;//基本数据类型
        Class<Void> cls8 = void.class;//void数据类型
        Class<Class> cls9 = Class.class;

        System.out.println(cls1);
        System.out.println(cls2);
        System.out.println(cls3);
        System.out.println(cls4);
        System.out.println(cls5);
        System.out.println(cls6);
        System.out.println(cls7);
        System.out.println(cls8);
        System.out.println(cls9);


    }
}

```

## 类加载

### 基本说明

**反射机制是java实现动态语言的关键，也就是通过反射实现类动态加载。**

1. <font color=#0099ff size=4 face="黑体">静态加载:编译时加载相关的类，如果没有则报错,依赖性太强</font>
2. <font color=#0099ff size=4 face="黑体">动态加载:运行时加载需要的类，如果运行时不用该类，即使不存在该类，则不报错，降低了依赖性</font>

### 类加载时机

1. <font color=#0099ff size=4 face="黑体">当创建对象时(new )//静态加载</font>
2. <font color=#0099ff size=4 face="黑体">当子类加载时，父类也加载//静态加载</font>
3. <font color=#0099ff size=4 face="黑体">调用类中的静态成员时//静态加载</font>
4. <font color=#0099ff size=4 face="黑体">通过反射//动态加载</font>

Class.forName("com.test.Cat");

### 类加载过程图

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/07.png)

### 类加载各阶段完成任务

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/08.png)

### 加载阶段

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/09.png)

### 连接阶段-验证

![10](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/10.png)

### 连接阶段-准备

<font color=#0099ff size=4 face="黑体">JVM 会在该阶段对静态变量，分配内存并默认初始化(对应数据类型的默认初始值，如0、OL、null、false等)。这些变量所使用的内存都将在方法区中进行分配</font>

+ 代码演示:

```java
package com.reflection.classload_;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/14  17:54
 * 说明类加载的连接阶段-准备
 */
public class ClassLoad02 {
    public static void main(String[] args) {

    }
}

class A {
    //属性-成员变量-字段
    //分析类加载的链接阶段-准备 属性是如何如理
    //1. n1 是实例属性，不是静态变量，因此在准备阶段，是不会分配内存
    //2. n2 是静态变量，分配内存 n2 是默认初始化 0，而不是20
    //3. n3 是static final 是常量，他和静态变量不一样，因为一旦赋值就不变了 n3=30
    public int n1 = 10;
    public static int n2 = 20;
    public static final int n3 = 30;
}

```

### 连结阶段-解析

**虚拟机将常量池内的符号引用替换为直接引用的过程**

### Initialization（初始化)

![11](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/11.png)

+ 代码演示:

```java
package com.reflection.classload_;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/14  18:16
 * 演示类加载的初始化阶段
 */
public class ClassLoad3 {
    public static void main(String[] args) throws ClassNotFoundException {
        //1.加载B类，并得到B的 Class对象
        //2.链接 num=0
        //3.初始化阶段
        //    依次自动收集类中的所有静态变量的复制动作和静态代码块中的语句,并合并
        /*
            clinit(){
            System.out.println("B 静态代码块被执行");
             //num=300;
             num=100;
            }
            合并：num =100
         */
        new B();//类加载
        System.out.println(B.num);//100 如果直接使用类的静态属性，也会导致类的加载

        //看看加载类的时候，是有同步机制控制
        /*
        protected Class<?> loadClass(String name, boolean resolve)throws ClassNotFoundException{
        //正因为有这个机制，才能保证某个类在内存中, 只有一份 Class 对象
        synchronized (getClassLoadingLock(name)) {
        }
        }
         */
        B b = new B();



    }
}
class B{
    static {
        System.out.println("B 静态代码块被执行");
        num=300;
    }
    static int num=100;
    public B(){
        System.out.println("B 构造器被执行");
    }


}

```

## 通过反射获取类的结构信息

### 第一组: java.lang.Class 类

![12](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/12.png)

### 第二组：java.lang.reflect.Field 类

![13](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/13.png)

### 第三组: java.lang.reflect.Method 类

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/14.png)

### 第四组: java.lang.reflect.Constructor 类 

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/15.png)

+ 代码演示:

```java
package com.reflection;

import org.junit.jupiter.api.Test;

import java.lang.annotation.Annotation;
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/14  19:25
 * 演示如何通过反射获取类的结构信息
 */
public class ReflectionUtils {
    public static void main(String[] args) {

    }

    @Test
    public void api_02()throws ClassNotFoundException{
        Class<?> personCls = Class.forName("com.reflection.Person");
        //getDeclaredFields:获取本类中所有属性
        Field[] declaredFields = personCls.getDeclaredFields();
        for (Field declaredField : declaredFields) {
            System.out.println(" 本类中所有属性="+declaredField.getName()
            +" 该属性的修饰符值="+declaredField.getModifiers()
            + " 该属性的类型="+declaredField.getType());
        }
        //getDeclaredMethods:获取本类中所有方法
        Method[] declaredMethods = personCls.getDeclaredMethods();
        for (Method declaredMethod : declaredMethods) {
            System.out.println("本类中所有方法="+declaredMethod.getName()
                    +" 该方法的访问修饰符="+declaredMethod.getModifiers()
                  +" 该方法返回类型"+declaredMethod.getReturnType());
            //输出当前方法的形参数组情况
            Class<?>[] parameterTypes = declaredMethod.getParameterTypes();
            for (Class<?> parameterType : parameterTypes) {
                System.out.println("该方法的形参类型="+parameterType.getName());
            }
        }
        //getDeclaredConstructions:获取本类中所有的构造器
        Constructor<?>[] declaredConstructors = personCls.getDeclaredConstructors();
        for (Constructor<?>  declaredConstructor: declaredConstructors) {
            System.out.println("本类中所有的构造器="+declaredConstructor.getName());
            Class<?>[] parameterTypes = declaredConstructor.getParameterTypes();
            for (Class<?> parameterType : parameterTypes) {
                System.out.println("该构造器的形参类型="+parameterType.getName());
            }
        }


    }
    //第一组方法API
    @Test
    public void api_01() throws ClassNotFoundException {

        //得到Class对象
        Class<?> personCls = Class.forName("com.reflection.Person");
        //getName:获取全类名
        System.out.println(personCls.getName());//com.reflection.Person
        //getSimpleName:获取简单类名
        System.out.println(personCls.getSimpleName());//Person
        //getFields:获取所有public修饰的属性，包含本类以及父类的
        Field[] fields = personCls.getFields();
        for (Field field : fields) {//增强for
            System.out.println("本类及父类的属性="+field.getName());
        }
        //getDeclaredFields:获取本类中所有属性
        Field[] declaredFields = personCls.getDeclaredFields();
        for (Field declaredField : declaredFields) {
            System.out.println("本类中所有属性="+declaredField.getName());
        }
        //getMethods:获取所有public修饰的方法，包含本类以及父类的
        Method[] methods = personCls.getMethods();
        for (Method method : methods) {
            System.out.println("本类及父类的="+method.getName());
        }
        //getDeclaredMethods:获取本类中所有方法
        Method[] declaredMethods = personCls.getDeclaredMethods();
        for (Method declaredMethod : declaredMethods) {
            System.out.println("本类中所有方法="+declaredMethod.getName());
        }
        //getConstructors:获取所有public 修饰的构造器，包含本类的
        Constructor<?>[] constructors = personCls.getConstructors();
        for (Constructor<?> constructor : constructors) {
            System.out.println("本类构造器="+constructor.getName());
        }
        //getDeclaredConstructions:获取本类中所有的构造器
        Constructor<?>[] declaredConstructors = personCls.getDeclaredConstructors();
        for (Constructor<?>  declaredConstructor: declaredConstructors) {
            System.out.println("本类中所有的构造器="+declaredConstructor.getName());
        }
        //getPackage:以Package形式返回 包信息
        System.out.println(personCls.getPackage());
        //getSuperClass:以Class形式返回父类信息
        Class<?> superclass = personCls.getSuperclass();
        System.out.println("父类的Class对象="+superclass);
        //getInterfaces:以Class[]形式返回接口信息
        Class<?>[] interfaces = personCls.getInterfaces();
        for (Class<?> anInterface : interfaces) {
            System.out.println("接口信息="+anInterface.getName());
        }
        //getAnnotations:以Annotation[] 形式返回注解信息
        Annotation[] annotations = personCls.getAnnotations();
        for (Annotation annotation : annotations) {
            System.out.println("注解信息="+annotation);
        }


    }

}
interface IA{}
interface IB{}
class A{
    public String hobby;
    public A(){

    }
}
@Deprecated
class Person extends A implements IA,IB{
    //属性
    public String name;
    protected static int age;
    String job;
    private double sal;
    //构造器
    public Person(){}
    public Person(String name){}
    private Person(String name,int age){}


    //方法
    public void m1(String name,int age,double sal){

    }
    protected String m2(){
        return null;

    }
    void m3(){

    }
    private void m4(){

    }

}
```

## 通过反射创建对象

1. <font color=#DC4040 size=4 face="黑体">方式一:调用类中的public修饰的无参构造器</font>
2. <font color=#DC4040 size=4 face="黑体">方式二:调用类中的指定构造器</font>
3. **Class类相关方法**
   + <font color=#DC4040 size=4 face="黑体">newlnstance:调用类中的无参构造器,获取对应类的对象</font>
   + <font color=#DC4040 size=4 face="黑体">getConstructor(Class..clazz):根据参数列表，获取对应的public构造器对象</font>
   + <font color=#DC4040 size=4 face="黑体">getDecalaredConstructor(Class...clazz):根据参数列表，获取对应的所有构造器对象</font>
4. **Constructor类相关方法**
   + <font color=#DC4040 size=4 face="黑体">setAccessible:暴破</font>
   + <font color=#DC4040 size=4 face="黑体">(Object...obj):调用构造器</font>

### 案例演示

> 测试 1：通过反射创建某类的对象，要求该类中必须有 public 的无参构造 

> 测试 2：通过调用某个特定构造器的方式，实现创建某类的对象 

+ 代码演示：

```java
package com.reflection;

import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/14  20:35
 * 演示通过反射机制创建实例
 */
public class ReflectCreateInstance {
    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException, NoSuchFieldException {

        //1.先获取到User类的Class对象
        Class<?> userClass = Class.forName("com.reflection.User");
        //2.通过public的无参构造器创建实例
        Object o = userClass.newInstance();
        System.out.println(o);
        //3.通过public的有参构造器创建实例
        /*
        constructor对象就是
        public User(String name) {//public有参构造器
            this.name = name;
        }
         */
        //3.1 先得到对应的构造器
        Constructor<?> constructor = userClass.getConstructor(String.class);
        //3.2 创建实例，并传入实参
        Object hhh = constructor.newInstance("hhh");
        System.out.println("hhh="+hhh);
        //4.通过非public的有参构造器实例   迪克你yie
        //4.1得到private的构造器对象
        Constructor<?> constructor1 = userClass.getDeclaredConstructor(int.class, String.class);
        //4.2 创建实例
        constructor1.setAccessible(true);//暴破【暴力破解】,使用反射可以访问private构造器/方法/属性
        Object user2 = constructor1.newInstance(100, "张三丰");
        System.out.println("user2="+user2);


    }
}
class User{//User类
    private int age;
    private String name="frx";

    public User() {//无参 public
    }

    public User(String name) {//public有参构造器
        this.name = name;
    }

    private User(int age, String name) {//private 有参构造器
        this.age = age;
        this.name = name;
    }


    @Override
    public String toString() {
        return "User{" +
                "age=" + age +
                ", name='" + name + '\'' +
                '}';
    }
}
```

## 通过反射访问类中的成员

### 访问属性

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/16.png)

+ 代码演示:

```java
package com.reflection;

import java.lang.reflect.Field;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/14  21:12
 */
public class ReflectAccessProperty {
    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchFieldException {

        //1.得到Student类对应的Class 对象
        Class<?> stuClass = Class.forName("com.reflection.Student");
        //2.创建对象
        Object o = stuClass.newInstance();//o 的运行类型就是Student
        System.out.println(o.getClass());//Student
        //3.使用反射得到age 属性对象
        Field age = stuClass.getField("age");
        age.set(o,88);//通过反射来操作属性
        System.out.println(o);
        System.out.println(age.get(o));//返回age属性的值


        //4.使用反射操作name 属性
        Field name = stuClass.getDeclaredField("name");
        //对name 进行暴破，可以操作private 属性
        name.setAccessible(true);
        //name.set(o,"小米");
        name.set(null,"小明");//因为name是static属性，因此o也可以写null
        System.out.println(o);
        System.out.println(name.get(null));//获取属性值，要求name是静态的
        System.out.println(name.get(o));

    }
}
class Student{//类
    public int age;
    private static String name;
    public Student(){//构造器

    }

    @Override
    public String toString() {
        return "Student{" +
                "age=" + age +
                '}';
    }
}
```

### 访问方法

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/17.png)

+ 代码演示：

```java
package com.reflection;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/14  21:24
 * 演示通过反射调用方法
 */
public class ReflectAccessMethod {
    public static void main(String[] args) throws ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, NoSuchFieldException, InvocationTargetException {

        //1.得到Boss类对应的Class对象
        Class<?> bossClass = Class.forName("com.reflection.Boss");
        //2.创建一个对象
        Object o = bossClass.newInstance();
        //3.调用public的hi方法
        //Method hi = bossClass.getMethod("hi");//获取共有的
        //3.1得到hi方法对象
        Method hi = bossClass.getDeclaredMethod("hi",String.class);//获取全部的
        //3.2 调用
        hi.invoke(o, "快乐每一天");

        //4.调用private static 方法
        //4.1 得到say方法对象
        Method say = bossClass.getDeclaredMethod("say", int.class, String.class, char.class);
        //4.2因为say是私有的，所以需要爆破，原理和前面讲的构造器和属性一样
        say.setAccessible(true);
        System.out.println(say.invoke(o,100,"张三",'男'));
        //4.3因为say方法是static的，还可以这样调用
        System.out.println(say.invoke(null,200,"李四",'女'));

        //5.在反射中，如果有方法有返回值，统一返回Object,但是它的运行类型和方法定义的返回类型一致
        Object reVal = say.invoke(null, 300, "王五", '男');
        System.out.println("reVal 的运行类型="+reVal.getClass());//String




    }
}

class Boss {
    public int age;
    private static String name;

    public Boss() {
    }

    private static String say(int n, String s, char c) {//静态私有方法
        return n + " " + s + " " + c;

    }

    public void hi(String s) {//普通public方法
        System.out.println("hi " + s);

    }
}
```

## 本章作业

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Reflection/18.png)

```java
package com.reflection.homework;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/14  21:47
 */
public class Homework01 {
    public static void main(String[] args) throws IllegalAccessException, InstantiationException, NoSuchFieldException, NoSuchMethodException, InvocationTargetException {

        //1.得到PrivateTest类对应的Class对象
        Class<PrivateTest> privateTestClass = PrivateTest.class;
        //2.创建对象实例
        PrivateTest privateTestObj = privateTestClass.newInstance();
        //3.得到name属性对象
        Field name = privateTestClass.getDeclaredField("name");
        //4.暴破name
        name.setAccessible(true);
        name.set(privateTestObj,"hh");
        //5.得到getName方法对象
        Method getName = privateTestClass.getMethod("getName");
        //6.因为getName是公有的
        Object invoke = getName.invoke(privateTestObj);
        System.out.println("name的属性值="+invoke);//hh

    }
}
class PrivateTest{
    private String name="hello";

    public String getName(){
        return name;
    }
}

```

```java
package com.reflection.homework;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/14  22:01
 */
public class Homework02 {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {

        //1.Class类的forName方法得到File类的class 对象
        Class<?> fileClass = Class.forName("java.io.File");
        //2.得到所有的构造器
        Constructor<?>[] declaredConstructors = fileClass.getDeclaredConstructors();
        for (Constructor<?> declaredConstructor : declaredConstructors) {
            System.out.println("File构造器="+declaredConstructor);
        }
        //3.单独得到 File构造器=public java.io.File(java.lang.String)
        Constructor<?> declaredConstructor = fileClass.getDeclaredConstructor(String.class);
        String fileALLPath="E:\\Mynew.txt";
        Object file = declaredConstructor.newInstance(fileALLPath);//创建File对象
        //4.得到createNewFile()的方法对象
        Method createNewFile = fileClass.getMethod("createNewFile");
        createNewFile.invoke(file);//创建文件 调用的是createNewFile
        //file的运行类型就是File
        System.out.println(file.getClass());
        System.out.println("创建文件成功"+fileALLPath);


    }
}

```

