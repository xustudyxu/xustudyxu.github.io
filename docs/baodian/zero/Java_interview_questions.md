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

