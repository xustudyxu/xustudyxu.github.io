---
title: Java 变量
date: 2022-07-19 21:43:18
permalink: /pages/6411dc/
categories:
  - java
tags:
  - java
---
# Java 变量

[[toc]]

## 变量是程序的基本组成单位

不论是使用哪种高级程序语言编写程序,变量都是其程序的基本组成单位。

变量有三个基本要素(类型+名称+值)

### 简单的原理示意图

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.6k21to8w6g00.webp)

## 变(变化)量(值)的介绍

### 概念

**变量相当于内存中一个数据存储空间**的表示，你可以把变量看做是一个房间的门牌号，通过门牌号我们可以找到房间，而通过变量名可以访问到变量(值)。

### 变量使用的基本步骤

1. 声明变量

   int a;

2. 赋值

   a=10;//应该这么说: 把 60 赋给 a

3. 也可以int a = 60; 

## 变量快速入门

```java
public class Val01 {

    public static void main(String[] args) {

        //My Info
        int age = 21;
        double score = 88.8;
        char gender = '男';
        String name = "Jack";
        System.out.println("MyInfo:");
        System.out.println(age);
        System.out.println(score);
        System.out.println(name);
        System.out.println(gender);
    }
}
```

### 变量使用注意事项

1. 变量表示内存中的一个存储区域[不同的变量，类型不同，占用的空间大小不同，比如: int 4个字节,double 就是8个字节,先有基本印象，后面说字节]
2. 该区域有自己的名称[变量名]和类型[数据类型]
3. 变量必须先声明,后使用,即有顺序
4. 该区域的数据/值可以在同一类型范围内不断变化变量在同一个作用域内不能重名
5. 变量=变量名+值+数据类型，这一点请大家注意。变量三要素

```java
public class ValDetail {

    public static void main(String[] args) {
        //变量必须先声明，后使用，即有顺序
        int a =50;
        System.out.println(a);
        //该区域的数据/值可以在同一类型范围内不断变化
        //a="Jack"; //×
        a=88;
        System.out.println(a);

        //变量在同一个作用域内不同重名
        //int a=76; //×
        
    }
}
```

## 程序中+号的使用

1. 当左右两边都是数值型时，则做加法运算
2. 当左右两边有一方为字符串,则做拼接
3. 运算运算顺序,是从左到右

```java
        System.out.println(100+98);//198
        System.out.println("100"+98);//10098
        System.out.println(100+3+"hello");//103hello
        System.out.println("hello"+100+3);//hello1003
```

## 数据类型

每一种数据都定义了明确的数据类型，在内存中分配了不同大小的内存空间(字节)。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.2j6ph9f6gi00.webp)

Java语言提供了八种基本类型。六种数字类型（四个整数型，两个浮点型），一种字符类型，还有一种布尔型。

**byte：**

- byte 数据类型是8位、有符号的，以二进制补码表示的整数；
- 最小值是 **-128（-2^7）**；
- 最大值是 **127（2^7-1）**；
- 默认值是 **0**；
- byte 类型用在大型数组中节约空间，主要代替整数，因为 byte 变量占用的空间只有 int 类型的四分之一；
- 例子：byte a = 100，byte b = -50。

**short：**

- short 数据类型是 16 位、有符号的以二进制补码表示的整数
- 最小值是 **-32768（-2^15）**；
- 最大值是 **32767（2^15 - 1）**；
- Short 数据类型也可以像 byte 那样节省空间。一个short变量是int型变量所占空间的二分之一；
- 默认值是 **0**；
- 例子：short s = 1000，short r = -20000。

**int：**

- int 数据类型是32位、有符号的以二进制补码表示的整数；
- 最小值是 **-2,147,483,648（-2^31）**；
- 最大值是 **2,147,483,647（2^31 - 1）**；
- 一般地整型变量默认为 int 类型；
- 默认值是 **0** ；
- 例子：int a = 100000, int b = -200000。

**long：**

- long 数据类型是 64 位、有符号的以二进制补码表示的整数；
- 最小值是 **-9,223,372,036,854,775,808（-2^63）**；
- 最大值是 **9,223,372,036,854,775,807（2^63 -1）**；
- 这种类型主要使用在需要比较大整数的系统上；
- 默认值是 **0L**；
- 例子： **long a = 100000L**，**long b = -200000L**。
  "L"理论上不分大小写，但是若写成"l"容易与数字"1"混淆，不容易分辩。所以最好大写。

**float：**

- float 数据类型是单精度、32位、符合IEEE 754标准的浮点数；
- float 在储存大型浮点数组的时候可节省内存空间；
- 默认值是 **0.0f**；
- 浮点数不能用来表示精确的值，如货币；
- 例子：float f1 = 234.5f。

**double：**

- double 数据类型是双精度、64 位、符合 IEEE 754 标准的浮点数；
- 浮点数的默认类型为 double 类型；
- double类型同样不能表示精确的值，如货币；
- 默认值是 **0.0d**；

**boolean：**

- boolean数据类型表示一位的信息；
- 只有两个取值：true 和 false；
- 这种类型只作为一种标志来记录 true/false 情况；
- 默认值是 **false**；
- 例子：boolean one = true。

**char：**

- char 类型是一个单一的 16 位 Unicode 字符；
- 最小值是 **\u0000**（十进制等效值为 0）；
- 最大值是 **\uffff**（即为 65535）；
- char 数据类型可以储存任何字符；
- 例子：char letter = 'A';。

## 整数类型

### 基本介绍

Java 的整数类型就是用于存放整数值的，比如 12 , 30, 3456 等等

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.2yc01u79rto0.webp)

### 整型的使用细节

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.63ma5hep1ko0.webp)

## 浮点类型

### 基本介绍

Java 的浮点类型可以表示一个小数，比如 123.4 ，7.8 ，0.12等等

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.379hid4vy680.webp)

### 说明一下

1. 关于浮点数在机器中存放形式的简单说明,浮点数=符号位+指数位+尾数位
2. 尾数部分可能丢失，造成精度损失(小数都是近似值)。

### 浮点型使用细节

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.3f1m6yperx80.webp)

## Java API 文档

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.41f8ynsxu4u0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.6wkiug3vzuc0.webp)

## 字符类型(char)

### 基本介绍

字符类型可以表示单个字符,字符类型是 char，char 是两个字节(可以存放汉字)，多个字符我们用字符串 String(我们后面详细讲解 String

### 字符类型使用细节

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.3k7ileywj4a0.webp)

```java
public class CharDetail {

    public static void main(String[] args) {

        //在 java 中，char 的本质是一个整数，在默认输出时，是 unicode 码对应的字符
        //要输出对应数字，可以(int)字符
        char c1 =97;
        System.out.println(c1);//a

        char c2 = 'a';
        System.out.println((int)(c2));

        //char 类型是可以进行运算的，相当于一个整数，因为它都对应有 Unicode 码
        char c3 ='a'+1;
        System.out.println(c3);//b
        System.out.println((int)(c3));//98
    }
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.6x7yhh0j68s0.webp)

### ASCII码(了解)

1. ASCII码:上个世纪60年代，美国制定了一套字符编码(使用一个字符)，对英语字符与二进制之间的关系，做了统一规定。这被称为ASCII码。ASCII码一共规定了128个字符的编码，只占用了一个字节的后面7位，最前面的1位统一规定为0。
2. 缺点：不能表示所有字符。

### Unicode 编码介绍(了解)

1. UTF-8是在互联网上使用最广的一种Unicode的实现方式(改进)
2. UTF-8是一种变长的编码方式。它可以使用1-6个字节表示一个符号，根据不同的符号而变化字节长度。
3. 使用大小可变的编码字母占1个字节，汉字占3个字节。

### 布尔类型：boolean

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.7aabjc22mcw0.webp)

## 基本数据类型转换

### 自动类型转换

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.3xu5usy5bo40.webp)

### 自动类型转换注意和细节

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220719/image.3vikegsio0g0.webp)