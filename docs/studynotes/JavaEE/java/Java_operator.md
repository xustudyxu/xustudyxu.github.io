---
title: Java 运算符
date: 2022-07-20 21:28:04
permalink: /pages/82dd60/
categories:
  - java
tags:
  - java
---
# Java 运算符

[[toc]]

## 运算符介绍

运算符是一种特殊的符号，用以表示数据的运算、赋值和比较等。

1. 算术运算符
2. 赋值运算符
3. 关系运算符[比较运算符]
4. 逻辑运算符
5. 位运算符[需要二进制基础]
6. 三元运算符

## 算术运算符

### 介绍

算术运算符是对数值类型的变量进行运算的，在 Java 程序中使用的非常多。

### 算术运算符一览

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.2msab5zsfcs0.webp)

### 案例演示

案例演示算术运算符的使用

1. +,-,*,/,%,++,--,重点/,%,++

2. 自增：++

   作为独立的语句使用：

   前++和后++都完全等价于i=i+1;

   作为表达式使用

   ​	前++：`++i先自增后赋值`

   ​	后++：`i++先赋值后运算`

3. --,+,-,*是一个道理，完全可以类推。

```java
/**
 * 演示算术运算符的使用
 */
public class ArithmeticOperator {
    public static void main(String[] args) {

        System.out.println(10/4);//从数学看是2.5，Java中是2
        System.out.println(10.0/4);//2.5

        double d=10/4;//java中是10/2=4=>2.0
        System.out.println(d);//2.0

        //%,取模，取余
        //在%的本质看一个公式 a%b=a-a/b*b
        //-10%3=>-10-(-10)/3*3=-10+9=-1
        //10%-3=10-10/(-3)*(-3)=10-9=1
        //-10%3=(-10)-(-10)/(-3)*(-3)=-10+9=-1
        System.out.println(10%3);//1
        System.out.println(-10%3);//-1
        System.out.println(10%-3);//1
        System.out.println(-10%-3);//1

        //++的使用
        int i=10;
        i++;//自增，等价于i=i+1;=>i=11
        ++i;//自增，等价于i=i+1;=>i=12
        System.out.println("i="+i);//12

        //作为表达式使用
        int j=8;
        //int k=++j;////等价 j=j+1;k
        int k=j++;//等价 k=j;j=j+1;
        System.out.println("k="+k+"j="+j);//8 9
    }
}
```

### 细节说明

1. 对于除号"/"，它的整数除和小数除是有区别的:整数之间做除法时，只保留整数部分而舍弃小数部分。例如:int x= 10/3 ,结果是3
2. 当对一个数取模时，可以等价a%b=a-a/b*b，这样我们可以看到取模的一个本质运算。
3. 当自增当做一个独立语言使用时，不管是++i;还是 i++;都是一样的，等价
4. 当自增当做一个表达式使用时j=++i等价[?]
5. 当自增当做一个表达式使用时j=i++等价[?]

+ 练习题

```java
public class ArithmeticOperatorExercise01 {
    public static void main(String[] args) {

        int i=1;
        i=i++;//规则使用临时变量: (1) temp=i;(2) i=i+1;(3)i=temp;
        System.out.println(i);

        i=i++; //规则使用临时变量: (1) i=i+1;(2) temp=i;(3)i=temp;
        System.out.println(i);

        //测试输出
        int i1=10;
        int i2=20;
        int a=i1++;
        System.out.println("a="+a);//10
        System.out.println("i2="+i2);//20
        i=--i2;
        System.out.println("i="+i);//19
        System.out.println("i2="+i2);//19

    }
}
```

## 关系运算符(比较运算符)

### 介绍

1. 关系运算符的结果都是 boolean 型，也就是要么是 true，要么是 false
2. 关系表达式 经常用在 if 结构的条件中或循环结构的

### 关系运算符一览

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.4iijthj2cys0.webp)

### 细节说明

1. 关系运算符的结果都是 boolean 型，也就是要么是 true，要么是 false。
2. 关系运算符组成的表达式，我们称为关系表达式。 a > b
3. 比较运算符"=="不能误写成"="

## 逻辑运算符

### 介绍

用于连接多个条件（多个关系表达式），最终的结果也是一个 boolean 值。

### 逻辑运算符一览

分为两组学习

1. 短路与 && ， 短路或 ||，取反！
2. 逻辑与 &，逻辑或 |，^逻辑异或

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.4w8cidh7tz80.webp)

+ 说明逻辑运算规

1. a&b : & 叫逻辑与：规则：当 a 和 b 同时为 true ,则结果为 true, 否则为 false
2. a&&b : && 叫短路与：规则：当 a 和 b 同时为 true ,则结果为 true,否则为 false
3. a|b : | 叫逻辑或，规则：当 a 和 b ，有一个为 true ,则结果为 true,否则为 false

4. a||b : || 叫短路或，规则：当 a 和 b ，有一个为 true ,则结果为 true,否则为 false
5. !a : 叫取反，或者非运算。当 a 为 true, 则结果为 false, 当 a 为 false 是，结果为 true
6. a^b: 叫逻辑异或，当 a 和 b 不同时，则结果为 true, 否则为 false

### && 和 & 基本规则

| 名称     | 语法           | 特点                                      |
| -------- | -------------- | ----------------------------------------- |
| 短路与&& | 条件 1&&条件 2 | 两个条件都为 true，结果为 true,否则false  |
| 逻辑与&  | 条件 1&条件 2  | 两个条件都为 true，结果为 true,否则 false |

### && 和 & 使用区别

1. &&短路与：如果第一个条件为 false，则第二个条件不会判断，最终结果为 false，效率高
2. & 逻辑与：不管第一个条件是否为 false，第二个条件都要判断，效率低

3. 开发中， 我们使用的基本是使用短路与&&, 效率高

### || 和 | 基本规则

| 名称       | 语法            | 特点                                               |
| ---------- | --------------- | -------------------------------------------------- |
| 短路或\|\| | 条件 1\|\|条件2 | 两个条件中只要有一个成立，结果为 true,否则为 false |
| 逻辑或\|   | 条件 1\|条件2   | 只要有一个条件成立，结果为 true,否则为 false       |

### || 和 | 使用区别

1.  ||短路或：如果第一个条件为 true，则第二个条件不会判断，最终结果为 true，效率高
2.  | 逻辑或：不管第一个条件是否为 true，第二个条件都要判断，效率低
3. 开发中，我们基本使用 ||

### ! 取反 基本规则

| 名称        | 语法  | 特点                                        |
| ----------- | ----- | ------------------------------------------- |
| ! 非（取反) | !条件 | 如果条件本身成立，结果为 false，否则为 true |

+ 练习题1

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.6um4drhoxow0.webp)

+ 练习题2

```java
        boolean x=true;
        boolean y=false;
        short z=46;
        if((z++==46)&&(y=true)) z++;
        if((x=false)||(++z==49)) z++;
        System.out.println("z="+z);//50
```

## 赋值运算符

+ 基本赋值运算符  int a =10;
+ 复合赋值运算符

+= ，-= ，*= ， /= ，%= 等 , 重点讲解一个 += ，其它的使用是一个道理
a += b; [等价 a = a + b; ]
a -= b; [等价 a = a-a;]

### 赋值运算符特点

1. 运算顺序从右往左 int num = a + b + c;

2. 赋值运算符的左边 只能是变量,右边 可以是变量、表达式、常量值
   int num = 20; int num2= 78 * 34 - 10; int num3 = a;

3. 复合赋值运算符等价于下面的效果

   比如：a+=3;等价于 a=a+3; 其他类推

4. 复合赋值运算符会进行类型转换。
   byte b = 2; b+=3; b++;

## 三元运算符

### 基本语法

条件表达式 ? 表达式 1: 表达式2;

运算规则：
1. 如果条件表达式为 true，运算后的结果是表达式 1；
2. 如果条件表达式为 false，运算后的结果是表达式 2；

口诀: [一灯大师：一真大师]

## 运算符优先级

1. 运算符有不同的优先级，所谓优先级就是表达式运算中的运算顺序。如右表，上一行运算符总优先于下一行。
2. 只有单目运算符、赋值运算符是从右向左运算的。
3. 一览表, 不要背，使用多了，就熟悉了

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.3reo9834jdk0.webp)

## 键盘输入语句

在编程中，需要接收用户输入的数据，就可以使用键盘输入语句来获取。Input.java , 需要一个 扫描器(对象), 就是
Scanner

### 步骤

1. 导入该类的所在包, java.util.Scanner
2. 创建该类对象（声明变量）
3. 调用里面的功能

```java
public class Input {
    public static void main(String[] args) {

        //Scanner 类 表示 简单文本扫描器，在 java.util 包
        //1. 引入/导入 Scanner 类所在的包
        //2. 创建 Scanner 对象 , new 创建一个对象,体会
        // myScanner 就是 Scanner 类的对象
        Scanner scanner = new Scanner(System.in);
        //3.接收用户输入了， 使用 相关的方法
        System.out.println("请输入名字：");

        //当程序执行到 next 方法时，会等待用户输入~~~
        String name = scanner.next();
        System.out.println("请输入年龄：");

        int age = scanner.nextInt(); //接收用户输入 int
        System.out.println("请输入薪水");

        double sal = scanner.nextDouble(); //接收用户输入 double
        System.out.println("人的信息如下:");
        System.out.println("名字="+name+" 年龄="+age+" 薪水="+sal);
        
    }
}
```

## 进制

### 进制介绍

对于整数，有四种表示方式：
二进制：0,1 ，满 2 进 1.以 0b 或 0B 开头。
十进制：0-9 ，满 10 进 1。
八进制：0-7 ，满 8 进 1. 以数字 0 开头表示。
十六进制：0-9 及 A(10)-F(15)，满 16 进 1. 以 `0x` 或 `0X` 开头表示。此处的 A-F 不区分大小写。

## 进制的转换

### 进制转换的介绍

+ 第一组

1. [二进制转十进制](/pages/82dd60/#二进制转换成十进制示例)
2. [八进制转十进制](/pages/82dd60/#八进制转换成十进制示例)
3. [十六进制转十进制](/pages/82dd60/#十六进制转换成十进制示例)

+ 第二组

1. [十进制转二进制](/pages/82dd60/#十进制转换成二进制)
2. [十进制转八进制](/pages/82dd60/#十进制转换成八进制)

3. [十进制转十六进制](/pages/82dd60/#十进制转换成十六进制)

+ 第三组

1. [二进制转八进制](/pages/82dd60/#二进制转换成八进制)
2. [二进制转十六进制](/pages/82dd60/#二进制转换成十六进制)

+ 第四组

1. [八进制转二进制](/pages/82dd60/#八进制转换成二进制)
2. [十六进制转二进制](/pages/82dd60/#十六进制转换成二进制)

### 二进制转换成十进制示例

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.3nudi8q1sy80.webp)

### 八进制转换成十进制示例

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.5xdvrrzdbrc0.webp)

### 十六进制转换成十进制示例

规则：从最低位(右边)开始，将每个位上的数提取出来，乘以 16 的(位数-1)次方，然后求和。

案例：请将 0x23A 转成十进制的数

0x23A = 10 * 16^0 + 3 * 16 ^ 1 + 2 * 16^2 = 10 + 48 + 512 = 570

### 十进制转换成二进制

规则：将该数不断除以 2，直到商为 0 为止，然后将每步得到的余数倒过来，就是对应的二进制。

案例：请将 34 转成二进制 = 0B00100010

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.1zqfjki74kcg.webp)

### 十进制转换成八进制

规则：将该数不断除以 8，直到商为 0 为止，然后将每步得到的余数倒过来，就是对应的八进制。

案例：请将 131 转成八进制 => 0203

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.3ik1ldbbpi20.webp)

### 十进制转换成十六进制

规则：将该数不断除以 16，直到商为 0 为止，然后将每步得到的余数倒过来，就是对应的十六进制。

案例：请将 237 转成十六进制=> 0xED

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.6brb6wpkmxg0.webp)

### 二进制转换成八进制

规则：从低位开始,将二进制数每三位一组，转成对应的八进制数即可。

案例：请将 ob11010101 转成八进制

ob11(3)010(2)101(5) => 0325

### 二进制转换成十六进制

规则：从低位开始，将二进制数每四位一组，转成对应的十六进制数即可。

案例：请将 ob11010101 转成十六进制

ob1101(D)0101(5) = 0xD5

### 八进制转换成二进制

规则：将八进制数每 1 位，转成对应的一个 3 位的二进制数即可。

案例：请将 0237 转成二进制

02(010)3(011)7(111) = 0b10011111

### 十六进制转换成二进制

规则：将十六进制数每 1 位，转成对应的 4 位的一个二进制数即可。

案例：请将 0x23B 转成二进制

0x2(0010)3(0011)B(1011) = 0b001000111011

## 位运算的思考题

1. 请看下面的代码段，回答 a,b,c,d,e 结果

```java
public class BitOperation {
    public static void main(String []args) {
        int a=1>>2; // 1 向右位移 2 位
        int b=-1>>2;//算术右移
        int c=1<<2;//算术左移
        int d=-1<<2;//算术左移
        int e=3>>>2;//无符号右移
        //a,b,c,d,e 结果是多少
        System.out.println("a="+a);//0
        System.out.println("b="+b);//-1
        System.out.println("c="+c);//4
        System.out.println("d="+d);//-4
        System.out.println("e="+e);//0
    }
}
```

## 位运算符

1. java 中有 7 个位运算(&、|、^、~、>>、<<和>>>）

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.1lipps3lvc3k.webp)

2. 还有 3 个位运算符 >>、<< 和 >>> , 运算规则

1. 算术右移` >>`：低位溢出,符号位不变,并用符号位补溢出的高位
2.  算术左移 `<<`: 符号位不变,低位补 0
3. `>>>`逻辑右移也叫无符号右移,运算规则是: 低位溢出，高位补 0
4. 特别说明：没有 <<< 符号

+ 应用案例

1. int a=1>>2; //1 => 00000001 => 00000000 本质 1 /2/2=0
2. int c=1<<2; //1 => 00000001 => 00000100 本质 1 * 2*2=4

### 二进制在运算中的说明

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.5sxz66z6s0g0.webp)

## 原码、反码、补码

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220720/image.1215p5yuaa4g.webp)

