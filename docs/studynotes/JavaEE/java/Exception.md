---
title: Java 异常-Exception
date: 2021-12-20 18:44:12
permalink: /pages/59d732/
categories:
  - java
tags:
  - java
---
# Java 异常-Exception

## 看个实际的问题和一段代码

运行下面的代码，看看有什么问题-> 引出异常和异常处理机制

```java
public static void main(String[] args) {

        int num1=10;
        int num2=0;
        int res=num1/num2;
    System.out.println("程序继续执行...");
```

## 解决方案-异常捕获

<font color=#0099ff size=4 face="黑体">对异常进行捕获，保证程序可以继续运行.</font>

+ 代码演示：

```java
package com.study.study15exception_;

public class Exception01 {
    public static void main(String[] args) {

        int num1=10;
        int num2=0;
        try{
            int res=num1/num2;
        }catch (Exception e){
//            e.printStackTrace();
            System.out.println(e.getMessage());//输出异常信息
        }



            System.out.println("程序继续执行...");

    }
}

```

## 异常介绍

**Java语言中，将程序执行中发生的不正常情况称为“异常”。**(开发过程中的语法错误和逻辑错误不是异常)

+ 执行过程中所发生的异常事件可分为两大类

1. <font color=#0099ff size=4 face="黑体">Error(错误):Java虚拟机无法解决的严重问题。如:JVM系统内部错误、资源耗尽等严重情况。比如: StackOverflowError[栈溢出]和OOM(out ofmemory). Error是严重错误，程序会崩溃。</font>
2. **Exception:其它因编程错误或偶然的外在因素导致的一般性问题，可以使用针对性的代码进行处理。例如空指针访问，试图读取不存在的文件，网络连接中断等等，Exception 分为两大类:**
   + <font color=#0099ff size=4 face="黑体">运行时异常[程序运行时，发生的异常]</font>
   + <font color=#0099ff size=4 face="黑体">编译时异常[编程时,编译器检查出的异常]。</font>

## 异常体系图一览

### 异常体系图

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Exception/01.png)

### 异常体系图的小结

1. <font color=#0099ff size=4 face="黑体">异常分为两大类，运行时异常和编译时异常.</font>
2. <font color=#0099ff size=4 face="黑体">运行时异常，编译器检查不出来。一般是指编程时的逻辑错误，是程序员应该避免其出现的异常。java.lang.RuntimeException类及它的子类都是运行时异常</font>
3. <font color=#0099ff size=4 face="黑体">对于运行时异常，可以不作处理，因为这类异常很普遍，若全处理可能会对程序的可读性和运行效率产生影响</font>
4. <font color=#0099ff size=4 face="黑体">编译时异常，是编译器要求必须处置的异常。</font>

## 常见的运行时异常

### 常见的运行时异常包括

+ **NullPointerException 空指针异常**
+ **ArithmeticException 数学运算异常**
+ **ArrayIndexOutOfBoundsException 数组下标越界异常**
+ **ClassCastException 类型转换异常**
+ **NumberFormatException 数字格式不正确异常**

### 常见的运行时异常举例

```java
package com.study.study15exception_.try_.Exception_;

public class ArrayIndexOutOfBoundsException_ {
    public static void main(String[] args) {
        int arr[]={1,2,4};
        for(int i=0;i<=arr.length;i++){//数组下标越界
            System.out.println(arr[i]);
        }
    }
}

```

```java
package com.study.study15exception_.try_.Exception_;

public class ClassCastException_ {
    public static void main(String[] args) {
         A b = new B();//向上转型
         B b2=(B)b;//向下转型
         C c2=(C)b;//这里抛出ClassCastException  类型转换异常

    }

}
class A{}
class B extends A{}
class C extends B{}

```

```java
package com.study.study15exception_.try_.Exception_;

public class NullPointerException_ {
    public static void main(String[] args) {
        String name=null;//空指针异常
        System.out.println(name.length());
    }
}

```

```java
package com.study.study15exception_.try_.Exception_;

public class NumberFormatException_ {
    public static void main(String[] args) {
        String name="frx";
        int num=Integer.parseInt(name);//NumberFormatException 数字格式不正确异常
    }
}

```

## 编译异常

### 介绍

**编译异常是指在编译期间，就必须处理的异常，否则代码不能通过编译.**

### 常见的编译异常

+ **SQLException/操作数据库时，查询表可能发生异常**
+ **IOException//操作文件时，发生的异常**
+ **FileNotFoundException//当操作一个不存在的文件时，发生异常**
+ **ClassNotFoundException//加载类,而该类不存在时,异常**
+ **EOFException//操作文件，到文件未尾,发生异常**
+ **lllegalArguementException//参数异常**

### 案列说明

+ 代码演示：

```java
package com.study.study15exception_;

import java.io.FileInputStream;
import java.io.IOException;

public class Exception02 {
    public static void main(String[] args) {
        FileInputStream fis;
        try {
        fis=new FileInputStream("d:\\aa.jpg");
        int len;
        while ((len= fis.read())!=-1){
            System.out.println(len);
        }
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
        }
    }
}

```

## 异常处理

### 基本介绍

**异常处理就是当异常发生时，对异常处理的方式。**

### 异常处理的方式

1. **try-catch-finally**

+ <font color=#0099ff size=4 face="黑体">程序员在代码中捕获发生的异常，自行处理</font>

2. **throws**

+ <font color=#0099ff size=4 face="黑体">将发生的异常抛出，交给调用者(方法)来处理，最顶级的处理者就是JVM</font>

### 示意图

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Exception/02.png)

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Exception/03.png)

## try-catch 异常处理

### try-catch 方式处理异常说明 

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Exception/04.png)

### try-catch 方式处理异常-快速入门

+ 代码演示：

```java
package com.study.study15exception_;

public class Exception01 {
    public static void main(String[] args) {

        int num1=10;
        int num2=0;
        //1.当执行到num1/num2 时 程序就会抛出异常 ArithmeticException 算术异常
        //2.当抛出异常后，程序就退出，崩溃了，下面的代码就不再执行
        //3.这样的程序不好 不应该出现一个不算致命的问题 就导致整个系统崩溃
//        int res=num1/num2;
        //4.如果程序员觉得一带代码会出现异常 可以使用try-catch异常处理机制来解决
        //从而保证代码的健壮性
        //6.如果进项异常处理，那么即使出现了异常，程序可以继续执行
        try{//5.选中带代码块 ctrl alt t 选中 try-catch
            int res=num1/num2;
        }catch (Exception e){
//            e.printStackTrace();
            System.out.println(e.getMessage());//输出异常信息
        }



            System.out.println("程序继续执行...");

    }
}

```

### try-catch 方式处理异常-注意事项

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Exception/05.png)

+ 代码演示：

```java
package com.study.study15exception_.try_;

public class TryCatchDetail01 {
    public static void main(String[] args) {
        //alt+ctrl+t
        //1.如果异常发生了，则异常发生后面的代码不会执行，直接进入到catch板块
        //2.如果异常没有发生，则顺序执行try的代码块，不会进入到catch
        //3.如果不管异常是否发生，都执行某段代码（比如关闭资源，释放资源等）则使用如下代码-finally
        try {
            String str1="frx";
            int n=Integer.parseInt(str1);
            System.out.println("数字："+n);
        } catch (NumberFormatException e) {
            System.out.println("异常信息："+e.getMessage());
        }finally {
            System.out.println("finally代码块被执行..");
        }
        System.out.println("程序继续...");
    }
}

```

### 异常处理课堂练习

```java
package com.study.study15exception_.try_;

public class TryCatchExercise01 {
    public static void main(String[] args) {
        System.out.println(method());

    }
    public static int method(){
        try{
            String names[]=new String[3];//
            if(names[1].equals("tom")){//NullPointerException
                System.out.println(names[1]);
            }else {
                names[3]="frx";
            }
            return 1;
        }catch (ArrayIndexOutOfBoundsException e){
            return 2;
        }catch (NullPointerException e){
            return 3;
        }finally {
            return 4;

        }

    }
}
//1.如果没有异常，则执行try中所有语句，不执行catch块中语句，如果有finally，
//最后的执行 finally中的语句
//2.如果出现异常，则try代码块中异常发生后，try块中剩下的语句不再执行，
// 将执行catch快中的语句，如果有finally,最后还需执行finally中的语句
```

```java
package com.study.study15exception_.try_;

public class TryCatchExercise02 {
    public static void main(String[] args) {
        System.out.println(method());


    }
    public static int method() {
        int i = 1;
        try{
            i++;//i 2
            String names[] = new String[3];//
            if (names[1].equals("tom")) {//NullPointerException
                System.out.println(names[1]);
            } else {
                names[3] = "frx";
            }
            return 1;
        } catch (ArrayIndexOutOfBoundsException e) {
            return 2;
        } catch (NullPointerException e) {
            return ++i;//i 3
        } finally {
            return ++i;// i 4


        }
    }
}

```

```java
package com.study.study15exception_.try_;

public class TryCatchExercise03 {
    public static void main(String[] args) {
        System.out.println(method());

    }

    public static int method() {
        int i = 1;
        try {
            i++;//i 2
            String names[] = new String[3];//
            if (names[1].equals("tom")) {//NullPointerException
                System.out.println(names[1]);
            } else {
                names[3] = "frx";
            }
            return 1;
        } catch (ArrayIndexOutOfBoundsException e) {
            return 2;
        } catch (NullPointerException e) {
            return ++i;//i 3=>保存临时变量 temp=3
        } finally {
             ++i;// i 4
            System.out.println("i="+i);


        }
    }
}
```

### try-catch-finally 执行顺序小结

1. <font color=#0099ff size=4 face="黑体">如果没有出现异常，则执行try块中所有语句，不执行catch块中语句，如果有finally，最后还需要执行finally里面的语句</font>
2. <font color=#0099ff size=4 face="黑体">如果出现异常，则try块中异常发生后，try块剩下的语句不再执行。将执行catch块中的语句，如果有finally,最后还需要执行finally里面的语句!</font>

### 课后练习题

```java
package com.study.study15exception_.try_;

import java.util.Scanner;

public class TryCatchExercise04 {
    public static void main(String[] args) {
        //如果用户输入的不是一个整数，就提示他反复输入，直到输入一个整数为止
        //1.创建Scanner对象
        //2.使用无限循环 去接受一个输入
        //3.将该输入的值 转换成一个int
        //4.如果在转换时，抛出异常，说明输入的内容不是一个可以转成int的内容
        //5.如果没有抛出异常，则break该循环
        Scanner scanner = new Scanner(System.in);
        int num=0;
        String inputStr="";
        while(true){
            System.out.println("请输入一个整数：");
            inputStr=scanner.next();
            try {
                 num= Integer.parseInt(inputStr);
                 break;
            } catch (NumberFormatException e) {
                System.out.println("你输入的不是一个整数：");
            }

        }
        System.out.println("你输入的值是"+num);

    }

}

```

## throws 异常处理

### 基本介绍

1. <font color=#0099ff size=4 face="黑体">如果一个方法(中的语句执行时)可能生成某种异常，但是并不能确定如何处理这种异常，则此方法应显示地声明抛出异常,表明该方法将不对这些异常进行处理,而由该方法的调用者负责处理。</font>
2. <font color=#0099ff size=4 face="黑体">在方法声明中用throws语句可以声明抛出异常的列表，throws后面的异常类型可以是方法中产生的异常类型,也可以是它的父类。</font>

### 快速入门案例

+ 代码演示:

```java
package com.study.study15exception_.throws_;

import java.io.FileInputStream;

public class Throws01 {
    public static void main(String[] args) {

    }
    public void f2() throws Exception {
        //创建一个文件流对象
        //1.这里的异常是一个FileNotFoundException 编译异常
        //2.使用前面讲过的 try-catch_finally
        //3.使用throws，抛出异常，让调用f2方法的调用者（方法）处理
        //4.throws后面的异常可以是方法中产生的异常，也可以是它的父类
        //5.throws关键字后也可以是 异常列表，既可以抛出多个异常

        FileInputStream fis = new FileInputStream("d://aa.xt");

    }
}

```

### 注意事项和使用细节

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Exception/06.png)

+ 代码演示：

```java
package com.study.study15exception_.throws_;

import java.io.FileNotFoundException;

public class ThrowsDetail {
    public static void main(String[] args) {
        f2();

    }

    public static void f2() throws ArithmeticException{
        //1.对于编译异常，程序中必须处理，比如 try-catch或者 throws
        //2.对于运行时异常，程序中如果没有处理，默认就是throws的方式处理
        int n1 = 0;
        int n2 = 0;
        double res = n1 / n2;
    }

    public static void f1() {
        //1.f()方法 抛出编译异常
        //2.记者时，就要去f1() 必须处理这个编译异常
        //3. （1） throws FileNotFoundException (2) t c f

        try {
            f3();//抛出异常
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

    }

    public static void f3() throws FileNotFoundException {

    }
    public static void f4(){
        //1.在f4()方法中 调用f5()方法是OK的
        //2.原因是f5()抛出的是运行异常
        //3.而Java 并不要求 程序员显示处理，因为有默认处理机制
        f5();

    }
    public static void f5() throws ArithmeticException{

    }
}
class Father{
    public void method() throws RuntimeException{

    }

}
class Son extends Father{
    //3.子类重写父类的方法时，对抛出异常的规定：子类重写的方法
    // 所抛出的异常要么和父类抛出的异常一致，要么为父类抛出异常的子类型
    @Override
    public void method() throws NullPointerException {
        super.method();
    }
}
```

## 自定义异常

### 基本概念

**当程序中出现了某些“错误”，但该错误信息并没有在Throwable子类中描述处理，这个时候可以自己设计异常类,用于描述该错误信息。**

### 自定义异常的步骤

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/Exception/07.png)

+ 代码演示：

```java
package com.study.study15exception_.customException_;

public class CustomException {
    public static void main(String[] args) {
        int age=180;
        if(!(age>=8&&age<=120)){
            throw new AgeException("年龄须在18-120之间");

        }
        System.out.println("你的年龄范围是正确的");

    }
}
//自定义的一个异常
//1.一般情况下，我们自定义异常是继承 RuntimeException
//2.即把自定义异常继承运行时异常 好处 我们可以使用默认处理机制
class AgeException extends RuntimeException{
    public AgeException(String message) {
        super(message);
    }
}
```

## throw 和 throws 的区别

### 一览表

|        | 意义                     | 位置       | 后面跟的东西 |
| :----- | ------------------------ | ---------- | ------------ |
| throws | 异常处理的一种方式       | 方法声明处 | 异常类型     |
| throw  | 手动生成异常对象的关键字 | 方法体中   | 异常对象     |

### 测试题

+ 代码演示：

```java
package com.study.study15exception_.customException_;

public class ThrowException {
    public static void main(String[] args) {
        try {
            ReturnExceptionDemo.methodA();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            ReturnExceptionDemo.methodB();
        }

    }
}
class ReturnExceptionDemo{
    static void methodA(){
        try {
            System.out.println("进入方法A");//1
            throw new RuntimeException("制造异常");//3
        } finally {
            System.out.println("调用A方法的finally");//2
        }
    }
    static void methodB(){
        try {
            System.out.println("进入方法B");//4
            return;
        } finally {
            System.out.println("调用B方法的finally");//5

        }
    }
}
```

## 本章作业

```java
package com.study.study15exception_.homework;

public class Homework01 {
    public static void main(String[] args) {

        try {
            if(args.length!=2){
                throw new ArrayIndexOutOfBoundsException("数字个数不对");
            }
            int n1=Integer.parseInt(args[0]);
            int n2=Integer.parseInt(args[1]);
            double res=cal(n1,n2);
            System.out.println("计算结果是"+res);
        } catch (NullPointerException e) {
            System.out.println(e.getMessage());
        } catch (NumberFormatException e) {
            System.out.println("参数格式不正确，需要输出整数");
        }catch (ArithmeticException e){
            System.out.println("出现了除0的异常");
        }
    }
    public static double cal(int n1,int n2){
        return n1/n2;
    }
}

```

```java
package com.study.study15exception_.homework;

public class Homework02 {
    public static void main(String[] args) {
        if(args[4].equals("john")){//可能发生NullPointerException
            System.out.println("AA");
        }
        else {
            System.out.println("BB");
        }
        Object o=args[2];//String->Object ，向上转型
        Integer i=(Integer) o;//错误这里一定发生ClassCastException
    }
}

```

```java
package com.study.study15exception_.homework;

public class Homework03 {
    public static void main(String[] args) {
        try{
            func();
            System.out.println("A");
        }catch (Exception e){
            System.out.println("C");//2
        }
        System.out.println("D");//3
    }
    public static void func(){
        try {
            throw new RuntimeException();

        }finally {
            System.out.println("B");//1
            }
        }
    }


```

