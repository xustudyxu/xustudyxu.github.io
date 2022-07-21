---
title: Java 程序控制结构
date: 2022-07-21 21:54:13
permalink: /pages/ea5663/
categories:
  - java
tags:
  - java
---
# Java 程序控制结构

[[toc]]

## 程序流程控制介绍

在程序中，程序运行的流程控制决定程序是如何执行的，是我们必须掌握的，主要有三大流程控制语句。

1. 顺序控制
2. 分支控制
3. 循环结构

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.5mmiwliepdg0.webp)

## 分支控制 if-else

### 分支控制 if-else 介绍

让程序有选择的的执行,分支控制有三种

1. 单分支if
2. 双分支 if-else
3. 多分支 if-else if -....-else

### 单分支

+ 基本语法

```java
if(条件表达式){

	执行代码块;(可以有多条语句)

}
```

>  说明:当条件表达式为ture时，就会执行{}的代码。如果为false,就不执行。特别说明，如果{}中有一条语句时，则可以不写{},但是建议写上{}

```java
public class If01 {

    public static void main(String[] args) {
        //编写一个程序,可以输入人的年龄,如果该同志的年龄大于 18 岁
        //则输出 "你年龄大于 18,要对自己的行为负责,送入监狱

        Scanner scanner = new Scanner(System.in);
        System.out.println("输入你的年龄：");
        int age = scanner.nextInt();
        if(age>18){
            System.out.println("你年龄大于 18,要对自己的行为负责,送入监狱");
        }

    }
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.5u5znknurto0.webp)

### 双分支

+ 基本语法

```java
if(条件表达式){
    执行代码块1;
}
else{
    执行代码块2;
}
```

> 说明：当条件表达式成立，即执行代码块1，否则执行代码块2。如果执行代码块只有一条语句，则{}可以省略，否则，不能省略

```java
public class If02 {
    public static void main(String[] args) {

        //编写一个程序,可以输入人的年龄,如果该同志的年龄大于 18 岁,
        // 则输出 "你年龄大于 18,要对自己的行为负责, 送入监狱"。
        // 否则 ,输出"你的年龄不大这次放过你了."

        Scanner scanner = new Scanner(System.in);
        int age = scanner.nextInt();
        System.out.println("请输入你的年龄:");
        if(age>18){
            System.out.println("你年龄大于 18,要对自己的行为负责, 送入监狱");
        }else {
            System.out.println("你的年龄不大这次放过你了");
        }
    }
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.6yxau3kskxs0.webp)

### 多分支

+ 基本语法

```java
if(条件表达式1){
    执行代码块1;
}
else if(条件表达式2){
    执行代码块2;
}
...
else{
    执行代码块n;
}
```

> 特别说明：
>
> 1. 多分支可以没有else,如果所有的条件表达式都不成立，则一个执行入口都没有
> 2. 如果没有else,如果所有的条件表达式都不成立，则默认执行else代码块

```java
public class If03 {

    public static void main(String[] args) {
        /*
        输入保国同志的芝麻信用分：
        如果：
        信用分为 100 分时，输出 信用极好；
        信用分为(80，99]时，输出 信用优秀；
        信用分为[60,80]时，输出 信用一般；
        其它情况 ，输出 信用 不及格
        请从键盘输入保国的芝麻信用分，并加以判断
        假定信用分数为 int
        */

        Scanner scanner = new Scanner(System.in);
        System.out.println("输入保国同志的芝麻信用分(1-100)：");
        int i = scanner.nextInt();
        if(i >=1 && i <= 1) {
            if (i == 100) {
                System.out.println("信用极好");
            } else if (i > 80 && i <= 99) {
                System.out.println("信用优秀");
            } else if (i > 60 && i <= 80) {
                System.out.println("信用一般");
            } else {
                System.out.println("信用不及格");
            }
        }else{
            System.out.println("信用分在1-100之间，请重新输入");
        }
    }
}
```

+ 思考题

```java
public class If04 {
    public static void main(String[] args) {
        boolean b=true;
        if(b=false){
            System.out.println("a");
        }else if(b){
            System.out.println("b");
        }else if(!b){
            System.out.println("c");
        }else {
            System.out.println("d");
        }
    }
}
```

## 嵌套分支

### 基本介绍

**在一个分支结构中又完整的嵌套了另一个完整的分支结构**，里面的分支的结构称为内层分支外面的分支结构称为外
层分支。老师建议: 不要超过 3 层 （可读性不好)

### 基本语法

```java
if()	
    if(){
        //if-else
    }else{
        //if-else
    }
}
```

+ 应用案例
+ 4_10旺季:
  + 成人(18-60):60
  + 儿童(<18):半价
  + 老人(>60):1/3
+ 淡季:
  + 成人40
  + 其他20

使用嵌套分支处理

```java
public class If04 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入季节:(1-12)");
        int i = scanner.nextInt();
        System.out.println("请输入年龄:");
        int age =scanner.nextInt();
        if(i>=4&&i<=10){
            if(age>=18&&age<=60){
                System.out.println("旺季成人票为60");
            }else if(age<18){
                System.out.println("旺季儿童票为30");
            }else {
                System.out.println("旺季老人票为20");
            }
        }else {
            if(age>=18&&age<=60){
                System.out.println("淡季成人票为40");
            }else {
                System.out.println("淡季其他票为20");
            }
        }
    }
}
```

## switch 分支结构

### 基本语法

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.1grz763w476o.webp)

### 流程图

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.73p0ssz5si40.webp)

### 快速入门

请编写一个程序，该程序可以接收一个字符，比如:a,b,c,d,e,f,g

a 表示星期一，b 表示星期二...

根据用户的输入显示相应的信息.要求使用 switch 语句完成代码

```java
public class Switch01 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入一个字符(a-g):");
        char c = scanner.next().charAt(0);
        switch (c){
            case 'a':
                System.out.println("今天星期一");
                break;
            case 'b':
                System.out.println("今天星期二");
                break;
            case 'c':
                System.out.println("今天星期三");
                break;
            case 'd':
                System.out.println("今天星期四");
                break;
            case 'e':
                System.out.println("今天星期五");
                break;
            case 'f':
                System.out.println("今天星期六");
                break;
            case 'g':
                System.out.println("今天星期日");
                break;
            default:
                System.out.println("输入错误，请重新输入");
        }
    }
}
```

### switch 注意事项和细节讨论

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.6nzu750ae3g0.webp)

### switch 和 if 的比较

1. 如果判断的具体数值不多，而且符合 byte、 short 、int、 char, enum[枚举], String 这 6 种类型。虽然两个语句都可以使用，建议使用 swtich 语句。
2. 其他情况：对区间判断，对结果为 boolean 类型判断，使用 if，if 的使用范围更广

## for循环控制

基本介绍:听其名而知其意,就是让你的代码可以循环的执行.

### 基本语法

```java
for(循环变量初始化;循环条件;循环变量迭代){
    循环操作(可以多条语句);
}
```

+ 基本说明

1. for 关键字，表示循环控制
2. for有四要素:(1)循环变量初始化(2)循环条件(3)循环操作(4)循环变量迭代
3. 循环操作 , 这里可以有多条语句，也就是我们要循环执行的代码
4. 如果 循环操作(语句) 只有一条语句，可以省略 {}, 建议不要省略

### for循环执行流程分析

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.38i6t0f75de0.webp)

### 注意事项和细节说明

1. 循环条件是返回一个布尔值的表达式
2. for(;循环判断条件;) 中的初始化和变量迭代可以写到其它地方，但是两边的分号不能省略。
3. 循环初始值可以有多条初始化语句，但要求类型一样，并且中间用逗号隔开，循环变量迭代也可以有多条变量迭代语句，中间用逗号隔开。

+ 习题案例

1. 打印 1~100 之间所有是 9 的倍数的整数，统计个数 及 总和

```java
public class ForExercise {
    public static void main(String[] args) {
//        打印 1~100 之间所有是 9 的倍数的整数统计个数 及 总和

        int startNum=1;
        int endNum=100;
        int num=9;
        int sum=0;
        int count=0;
        for (int i=startNum;i<endNum;i++){

            if(i%num==0){
                sum+=i;
                count++;
            }
        }
        System.out.println("1-100之间所有是9的倍数的整数个数为:"+count+"和为:"+sum);
    }

}
```

## while循环控制

### 基本语法

```java
循环变量初始化;
while(循环条件){
    循环体(语句);
    循环变量迭代;
}
```

1. while循环也有四要素
2. 只是四要素放的位置和for不一样

### while循环执行流程分析

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.23eo2xddt8n4.webp)

+ 使用while打印十次Hello,World！

```java
public class While01 {

    public static void main(String[] args) {

        int i=0;
        while (i<10){
            System.out.println("Hello,World!");
            i++;
        }
        System.out.println("i="+i);//10
    }
}
```

## do...while循环控制

### 基本语法

```java
循环变量初始化;
do{
    循环体(语句);
    循环变量迭代;
}while(循环条件);
```

1. do while 是关键字
2. 也有循环四要素, 只是位置不一样
3. 先执行，再判断，也就是说，一定会至少执行一次
4. 最后 有一个 分号

### do...while 循环执行流程分析

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.3jedd1tjqcu0.webp)

### 注意事项和细节说明

1. 循环条件是返回一个布尔值的表达式
2. do..while 循环是先执行，再判断， 因此它至少执一次

+ 习题案例

1. 如果李三不还钱，则老韩将一直使出五连鞭，直到李三说还钱为止

   [System.out.println("老韩问：还钱吗？y/n")] do...while

```java
public class DoWhile01 {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);
        char answer='\u0000';
        //如果李三不还钱，则老韩将一直使出五连鞭，直到李三说还钱为止
        do{
            System.out.println("老韩使出五连鞭~");
            System.out.println("问还钱吗?(y):");
            answer = scanner.next().charAt(0);
            System.out.println("它的回答是:"+answer);

        }while (answer!='y');
        System.out.println("李三还钱了");
    }
}
```

## 多重循环控制

### 介绍

1. 将一个循环放在另一个循环体内，就形成了嵌套循环。其中，for ,while ,do…while 均可以作为外层循环和内层循环。

   【建议一般使用两层，最多不要超过 3 层, 否则，代码的可读性很差】

2. 实质上，嵌套循环就是把内层循环当成外层循环的循环体。当只有内层循环的循环条件为 false 时，才会完全跳出内层循环，才可结束外层的当次循环，开始下一次的循环[听不懂，走案例]。

3. 设外层循环次数为 m 次，内层为 n 次，则内层循环体实际上需要执行 m*n 次

### 习题案例

1. 统计 3 个班成绩情况，每个班有 5 名同学，求出各个班的平均分和所有班级的平均分[学生的成绩从键盘输入]。
2. 统计三个班及格人数，每个班有 5 名同学。

```java
public class MulForExercise01 {

    public static void main(String[] args) {

        //创建 Scanner 对象
        Scanner myScanner = new Scanner(System.in);
        double totalScore = 0; //累积所有学生的成绩
        int passNum = 0;//累积 及格人数
        int classNum = 3; //班级个数
        int stuNum = 5;//学生
        for (int i=0;i<classNum;i++) {
            for (int j = 0; j < stuNum; j++){
                System.out.println("请输入一个学生的成绩：");
                int i1 = myScanner.nextInt();
                //当有一个学生成绩>=60, passNum++
                if(i1 >= 60) {
                    passNum++;
                }
                totalScore += i1;
            }
            System.out.println("第"+i+"班的平均分为:"+totalScore/stuNum);
        }
        System.out.println("所有班级的平均分为:"+totalScore/stuNum/classNum);
        System.out.println("及格人数为:"+passNum);
    }
}
```

3. 打印九九乘法表

```java
public class MulForExercise02 {
    public static void main(String[] args) {
        //打印九九乘法表
        for (int i=1;i<=9;i++){
            for (int j=1;j<=i;j++){
                System.out.print(j+"*"+i+"="+i*j+" ");
            }
            System.out.println();
        }
    }
}
```

## 跳转控制语句-break

### 看下面一个需求

随机生成 1-100 的一个数，直到生成了 97 这个数，看看你一共用了几次?

提示使用 (int)(Math.random() * 100) + 1

思路分析：

循环，但是循环的次数不知道. -> break ,当某个条件满足时，终止循环

通过该需求可以说明其它流程控制的必要性，比如 break

### 基本介绍

**break 语句用于终止某个语句块的执行**，一般使用在 switch 或者循环[for , while , do-while]

### 基本语法

```java
{
    ...
    break;
    ...
}
```

### 以 while 使用 break 为例,画出示意图

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.183crhgw4ebg.webp)

### 快速入门

```java
public class Break01 {
    public static void main(String[] args) {
        for (int i=0;i<10;i++){
            if(i==3){
                break;
            }
            System.out.println("i="+i);
        }
    }
}
```

### 注意事项和细节说明

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.1hnvolk98om8.webp)

## 跳转控制语句-continue

### 基本介绍

1. continue 语句用于结束本次循环，继续执行下一次循环。
2.  continue 语句出现在多层嵌套的循环语句体中时，可以通过标签指明要跳过的是哪一层循环 , 这个和前面的标签的使用的规则一样。

### 基本语法

```java
{
    ...
    continue;
    ...
}
```

### 以 while 使用 continue 为例,画出示意图

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220721/image.570e6tkznbk0.webp)

## 跳转控制语句-return

return 使用在方法，表示跳出所在的方法，在讲解方法的时候，会详细的介绍，这里我们简单的提一下。注意：如果 return 写在 main 方法，退出程序。

