---
title: Java 常用类
date: 2021-12-20 18:44:12
permalink: /pages/1f9b73/
categories:
  - java
tags:
  - java
---
# Java 常用类

## 包装类

### 包装类的分类 

+ 针对八种基本数据类型相应的引用类型-包装类
+ 有了类的特点，就可以调用类中的方法
+ 如图：

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/01.png)

### 包装类和基本数据的转换

演示包装类和基本数据类型的相互转换,这里以int和Integer演示。
1. <font color=#0099ff size=4 face="黑体">jdk5之前的手动装箱和拆箱方式，装箱:基本类型->包装类型,反之，拆箱</font>
2. <font color=#0099ff size=4 face="黑体">jdk5以后(含jdk5)的自动装箱和拆箱方式</font>
3. <font color=#0099ff size=4 face="黑体">自动装箱底层调用的是valueOf方法，比如Integer.valueOf</font>
4. 其它包装类的用法类似,不一一举例

### 案列演示

+ 代码演示:

```java
package com.study.wrapper;

public class Integer01 {
    public static void main(String[] args) {
        //演示int->Integer
        //jdk5前是手动装箱和拆箱
        //手动装箱
        int n1=100;
        Integer integer=new Integer(n1);
        Integer integer1=Integer.valueOf(n1);
        //手动拆箱
        //Integer->int
        int i=integer.intValue();
        //jdk5之后 就可以自动装箱和自动拆箱了
        int n2=200;
        //自动装箱->Integer
        Integer integer2=n2;//底层是用的是Integer.valueOf(n2)
        //自动拆箱
        int n3=integer2;//底层使用的是Integer.intValue()
    }
}

```

### 课堂测试题

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/02.png)

+ 代码演示：

```java
package com.study.wrapper;

public class WrapperExercise01 {
    public static void main(String[] args) {
        Double d = 100d;//ok,自动装箱 Double.valueOf(100d)
        Float f = 1.5f;//ok 自动装箱 Float.valueOf(1.5f)
        Object obj1 = true ? new Integer(1) : new Double(2.0);//三元运算符 是一个整体
        System.out.println(obj1);//1.0
        Object obj2;
        if(true)
            obj2=new Integer(1);
        else
            obj2=new Double(2.0);
        System.out.println(obj2);//1
    }
}

```

### 包装类型和 String 类型的相互转换

+ 代码演示：

```java
package com.study.wrapper;

public class WrapperVSString {
    public static void main(String[] args) {
        //演示一下 包装类(Integer)->String
        Integer i=100;//自动装箱
        //方式1
        String str=i+"";
        //方式2
        String str2=i.toString();
        //方式3
        String str3=String.valueOf(i);

        //String ->Integer
        String str4="12345";
        Integer i2=Integer.parseInt(str4);//自动装箱
        Integer i3 = new Integer(str4);//构造器
        System.out.println("ok");
    }
}

```

### Integer 类和 Character 类的常用方法

+ 代码演示：

```java
package com.study.wrapper;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/29  20:45
 */
public class WrapperMethod {
    public static void main(String[] args) {
        System.out.println(Integer.MIN_VALUE); //返回最小值
         System.out.println(Integer.MAX_VALUE);//返回最大值
         System.out.println(Character.isDigit('a'));//判断是不是数字
         System.out.println(Character.isLetter('a'));//判断是不是字母
         System.out.println(Character.isUpperCase('a'));//判断是不是大写
         System.out.println(Character.isLowerCase('a'));//判断是不是小写
         System.out.println(Character.isWhitespace('a'));//判断是不是空格
         System.out.println(Character.toUpperCase('a'));//转成大写
         System.out.println(Character.toLowerCase('A'));//转成小写
    }
}

```

### Integer经典题

+ 代码演示：

```java
package com.study.wrapper;

public class WrapperExercise02 {
    public static void main(String[] args) {
        Integer i=new Integer(1);
        Integer j=new Integer(1);
        System.out.println(i==j);//False
        //所以，这里主要是看范围-128~127 就是直接返回
        /*
          public static Integer valueOf(int i) {
        if (i >= IntegerCache.low && i <= IntegerCache.high)
            return IntegerCache.cache[i + (-IntegerCache.low)];
        return new Integer(i);
    }

         */
        Integer m=1;//底层Integer.valueOf(1)
        Integer n=1;//Integer.valueOf(1)
        System.out.println(m==n);//T
        //所以，这里主要是看范围-128~127 就是直接返回
        //否则就new Integer(xx);
        Integer x=128;//底层Integer.valueOf(128)
        Integer y=128;//底层Integer.valueOf(128)
        System.out.println(x==y);//F
    }
}

```

### Integer经典题总结

+ 代码演示：

```java
package com.study.wrapper;

public class WrapperExercise03 {
    public static void main(String[] args) {
        Integer i1 = new Integer(127);
        Integer i2 = new Integer(127);
        System.out.println(i1==i2);//F 不同对象
        Integer i3 = new Integer(127);
        Integer i4 = new Integer(127);
        System.out.println(i3==i4);//F 不同对象
        Integer i5=127; //Integer.valueOf(127);
        Integer i6=127;
        System.out.println(i5==i6);//T -128~127
        Integer i7=128;
        Integer i8=128;
        System.out.println(i7==i8);//F -128~127
        Integer i9=127;
        Integer i10 = new Integer(127);
        System.out.println(i9==i10);//F 不同对象
        Integer i11=127;
        int i12=127;
        System.out.println(i11==i12);//T 有int 比值
        Integer i13=128;
        int i14=128;
        System.out.println(i13==i14);//T 有int 比值

    }
}

```

## String类

### String 类的理解和创建对象

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/03.png)

+ 代码演示：

```java
package com.study.string_;

public class String01 {
    public static void main(String[] args) {
        //1.String 对象于保存字符中，也就是一组字符序列
        //2."Jack"字符串常量，双引号括起的字符序列
        //3.一个字符（不分字母还是汉字）占两个字节
        //4.String有很多的构造器
        //5.String 类实现了接口Serializable （String可以串行化，可以在网络上传输）
        //6.String 是final类 不能被继承
        //7.String 有属性 private final char value[];用于存放字符串内容
        //8.value 是final类型 不可以修改 即value不能指向新的地址 但是单个字符内容是可以变化的
        String name="Jack";
        name="tom";
        final char[] value={'a','b','c'};
        char[] v2={'t','o','m'};
        value[0]='H';
        //value=v2; 不可以修改value的地址
    }
}

```

### 创建 String 对象的两种方式 

+ <font color=#0099ff size=4 face="黑体">方式一：直接赋值 String s="abc";</font>
+ <font color=#0099ff size=4 face="黑体">方式二：调用构造器 String s=new String("abc");</font>

### 两种创建 String 对象的区别

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/04.png)

### 课堂测试题

+ 代码演示：

```java
package com.study.string_;

public class StringExercise03 {
    public static void main(String[] args) {
        String a="FRX";//a指向 常量池的“FRX”
        String b=new String("FRX");//b指向堆中空间
        System.out.println(a.equals(b));//T
        System.out.println(a==b);//F
        System.out.println(a==b.intern());//intern方法 //T
        System.out.println(b==b.intern());//F
        //当调用intern方法时，如果池已经包含一个等于此 String对象的字符串（用equals（Object）方法确定），
        // 则返回池中的字符串。否则，将此String对象添加到池中，并返回此String对象的引用
        // b.intern()方法最终返回的是   常量池的地址（对象）。
    }
}

```

## 字符串的特性

### 说明

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/05.png)

### 经典题

题一:

String a="hello"+"abc";

创建了几个对象?只有一个对象

String a="hello"+"abc";//==>优化等价 String a="helloabc";

分析:

1. 编译器不傻，做了个优化，判断创建的常量池对象，是否有引用指向

题2：

String a="hello";//创建a对象

String b="abc";//创建b对象

String c=a+b;//创建了三个对象

小结:底层是StringBuilder sb=new StringBuilder(); sb.append(a); sb.append(b);

sb是在堆中，并且append是在原来字符串的基础上追加的.

**重要规则**,String c1 ="ab"+ "cd";//常量相加，看的是池 。

String c1=a+b;//变量相加，是在堆中。

+ 代码演示：

```java
package com.study.string_;

public class StringExercise08 {
    public static void main(String[] args) {
        String s1="hello"+"abc";//等价String s1="helloabc";
        String s2="helloabc";
        //这里只创建了一个对象
        String a="hello";//创建a对象
        String b="abc";//创建b对象
        String c=a+b;
        //1.先创建StringBuilder sb=new StringBuilder();
        //2.执行 sb.append("hello")
        //3.sb.append("abc")
        //4.String c=sb.ToString()
        //a指向池中hello  b指向池中abc
        //最后其实是c指向堆中的对象 (String)value[]->池中"helloabc"
        //创建了三个对象
        String s3=a+"h";
        //hello已经使用过了 不再创建 所以是两个对象
        System.out.println(a==c);//F  a指向常量池   c指向堆中对象 (String)value[]->池中"helloabc"
        System.out.println(s1==s2);//T
        //常量相加是在池中 变量相加是在堆中
        String s6=(a+b).intern();
        System.out.println(s2==s6);//T
        System.out.println(s2.equals(s6));//T
    }
}

```



## String 类的常见方法

### 说明

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/09.png)

### String 类的常见方法一览

+ equals //区分大小写，判断内容是否相等
+ equalslgnoreCase//忽略大小写的判断内容是否相等length//获取字符的个数，字符串的长度
+ indexOf//获取字符在字符串中第1次出现的索引,索引从0开始,如果找不到,返回-1
+ lastIndexOf//获取字符在字符串中最后1次出现的索引,索引从0开始,如找不到,返回-1
+ substring//截取指定范围的子串
+ trim//去前后空格
+ charAt//获取某索引处的字符，注意不能使用Str[index]这种方式.

+ 代码演示：

```java
package com.study.string_;

public class StringMethod01 {
    public static void main(String[] args) {
        //1.equals方法区分大小写
       String str1="frx";
       String str2="frx";
        System.out.println(str1.equals(str2));
        //2.equalsIgnoreCase 忽略大小写 判断内容是否相等
        String name="john";
        if("john".equalsIgnoreCase(name)){
            System.out.println("Success");
        }
        //3.length 获取字符的个数 字符串的长度
        System.out.println("frx".length());
        //4.indexOf 获取字符串对象中第一次出现的索引，索引从0开始 如果找不到 返回-1
        String s1="wdada@dyhsdsj";
        int index=s1.indexOf('@');
        System.out.println(index);
        //5.lastIndexOf 获取字符 在字符串最后一次出现的索引 索引从零 开始 找不到 返回-1
        String s2="wdada@dyhsdsj";
        int index2=s1.lastIndexOf('@');
        System.out.println(index2);
        //6.substring截取指定范围的字符串
        System.out.println(name.substring(2));//截取后面的字符
    }
}

```

+ toUpperCase
+ toLowerCaseconcat
+ replace替换字符串中的字符
+ split 分割字符串,对于某些分割字符，我们需要转义比如|\\\等
+ 案例: String poem="锄禾日当午,汗滴禾下土,谁知盘中餐,粒粒皆辛苦";和文件路径.
+ compareTo //比较两个字符串的大小toCharArray l/转换成字符数组
+ format//格式字符串,%s字符串%c字符%d整型%.2f 浮点型
+ 案例，将一个人的信息格式化输出.

+ 代码演示：

```java
package com.study.string_;

import java.util.Locale;

public class StringMethod02 {
    public static void main(String[] args) {
        //1.toUpperCase转成大写
        String s="hello";
        System.out.println(s.toUpperCase());
        //2. toLowerCase
        System.out.println(s.toLowerCase());
        //3.concat拼接字符串
        String s1="frx";
        s1=s1.concat("f").concat("f").concat("f");
        System.out.println(s1);
        //4.replace 替换字符串中的字符
        s1="adc,ddd,dab,gaf";
        s1=s1.replace("ddd","aaa");
        //返回的结果才是 替换过得 对本身的s1没有影响
        System.out.println(s1);
        //5.split分割字符串，对于某些字符串 我们需要转义 比如| \\
        String poem="锄禾日当午，汗滴禾下土，谁知盘中餐，粒粒皆辛苦";
        String split[]=poem.split("，");
         poem="E:\\aa\\bb\\cc";
        split=poem.split("\\\\");
        for (int i = 0; i < split.length ; i++) {
            System.out.println(split[i]);
        }
        //6.toCharArray 转换成字符数组
        s="happy";
        char chs[]=s.toCharArray();
        for (int i = 0; i < chs.length; i++) {
            System.out.println(chs[i]);
        }
        //7.compareTo 比较两个字符串的大小 如果前者大范返回正数
        //后者大 则返回负数  如果相等 返回零
        String s2="frx";
        String s3="frxx";
        System.out.println(s2.compareTo(s3));


    }
}

```

## StringBuffer 类 

### 基本介绍

![12](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/12.png)

+ 代码演示：

```java
package com.study.stringbuffer_;

public class StringBuffer01 {
    public static void main(String[] args) {
        //1.StringBuffer的直接父类 AbstractStringBuilder
        //2.StringBuffer 实现了Serializable,即StringBuilder的对象可以串行化
        //3.在父类中     AbstractStringBuilder有属性char[] value,不是final
        // 该value数组存放字符串内容，引出存放在堆中
        //4.StringBuffer是final类 不可被继承
        //5.StingBuffer 字符内容存在 char[] value所有的变化(删除，增加)
        //不用每次都创建新的对象 所以它的效率高于String
        StringBuffer stringBuffer = new StringBuffer();
    }
}

```

### String VS StringBuffer 

1. <font color=#0099ff size=4 face="黑体">String保存的是字符串常量,里面的值不能更改，每次String类的更新实际上就是更改地址，效率较低</font>//private final char value[];
2. <font color=#0099ff size=4 face="黑体">StringBuffer保存的是字符串变量，里面的值可以更改，每次StringBuffer的更新实际上可以更新内容，不用每次更新地址，效率较高</font>//char[] value;//这个放在堆.

### String 和 StringBuffer 相互转换

+ 代码演示：

```java
package com.study.stringbuffer_;

public class StringAndStringBuffer {
    public static void main(String[] args) {
        //String->StringBuffer
        String str="hello tom";
        //方式一 使用构造器
        //注意：返回的才是StringBuffer对象，对str本身没有影响
        StringBuffer stringBuffer = new StringBuffer(str);
        //方式二 使用append方法
        StringBuffer stringBuffer1 = new StringBuffer();
       stringBuffer1=stringBuffer1.append(str);



       //StringBuffer->String
        StringBuffer stringBuffer2=new StringBuffer("frx");
        //方式一 使用StringBuffer提供的toString方法
        String s=stringBuffer2.toString();
        //方式二 使用构造器 来搞定
        String s1 = new String(stringBuffer);

    }
}

```

### StringBuffer 类常见方法

+ 代码演示：

```java
package com.study.stringbuffer_;

public class StringBufferMethod {
    public static void main(String[] args) {
        //1.append追加 返回的还是StringBuffer
        StringBuffer stringBuffer = new StringBuffer("hello");
        stringBuffer.append("a");
        stringBuffer.append("n");
        stringBuffer.append("c").append("c");
        System.out.println(stringBuffer.toString());
        //2.delete 删除  [1,3)
        //删除>=start&&<end的字符串
        System.out.println(stringBuffer.delete(1, 3));
        //3.replace 替换 [2,4)
        System.out.println(stringBuffer.replace(2,4,"x"));
        //4.indexOf 查找指定的字符串第一次出现的位置 如果找不到 返回-1
        int index=stringBuffer.indexOf("x");
        System.out.println(index);
        //5.insert 插入 原来索引为的位置自动后移
        System.out.println(stringBuffer.insert(5,"obj"));

    }
}

```

### StringBuffer 类课堂测试题

+ 代码演示：

```java
package com.study.stringbuffer_;

public class StringBufferExercise01 {
    public static void main(String[] args) {
        String str=null;
        StringBuffer sb=new StringBuffer();
        sb.append(str);//底层调用的是AbstractStringBuffer的 appendNull
        System.out.println(sb.length());//4
        System.out.println(sb);//null
        //下面的构造器 会抛出空指针异常
        StringBuffer stringBuffer = new StringBuffer(str);
        //super(str.length()+16);
        System.out.println(stringBuffer);

    }
}

```

### StringBuffer 类课后练习 2

+ 代码演示：

```java
package com.study.stringbuffer_;

public class StringBufferExercise02 {
    public static void main(String[] args) {
        /*
        输入商品价格 要求打印效果实例，试用前面学习的方法完成：
        商品名 商品价格
        手机 123,45.59


        思路分析
        1.先定义一个Scanner对象，接受用户输入的价格 ·（String)
        2.希望使用到StringBuffer的 insert的    需要将String转成 StringBugger
        3.然后使用相关方法进行字符串的处理
         */
        String input="123456.626";
        StringBuffer stringBuffer=new StringBuffer(input);
        int sb= stringBuffer.lastIndexOf(".");
        stringBuffer=stringBuffer.insert(sb-3,",");
//        for (int i = stringBuffer.lastIndexOf(".")-3; i >0 ; i-=3) {
//            stringBuffer.insert(i,",");
//        }
        System.out.println(stringBuffer);//123,456.626 

    }
}

```

## StringBuilder 类

### 基本介绍

1. <font color=#0099ff size=4 face="黑体">一个可变的字符序列。此类提供一个与StringBuffer兼容的API，但不保证同步(StringBuilder 不是线程安全)。该类被设计用作 StringBuffer的一个简易替换，用在字符串缓冲区被单个线程使用的时候。如果可能，建议优先采用该类因为在大多数实现中，它比 StringBuffer要快</font>[后面测]
2. <font color=#0099ff size=4 face="黑体">在 StringBuilder上的主要操作是append和insert方法，可重载这些方法，以接受任意类型的数据。</font>

+ 代码演示：

```java
package com.study.stringbuilder_;

public class StringBuilder01 {
    public static void main(String[] args) {
        //1.StringBuilder 继承AbstractStringBuilder 类
        //2.实现了Serializable,说明StringBuilder对象可以串行化（对象可以网络传输，可以保存到文件）
        //3.StringBuilder 是final类 不能被继承
        //4.StringBuilder 对象字符序列仍然是存放 在其父类 AbstractStringBuilder的 char[] value
        //  因此字符序列是在堆中
        //5.StringBuilder的方法 没有做互斥处理
        StringBuilder stringBuilder = new StringBuilder();

    }
}

```

### StringBuilder 常用方法

![13](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/13.png)

### String、StringBuffer和StringBuilder 的比较

1. StringBuilder 和StringBuffer非常类似，均代表可变的字符序列，而且方法也一样

2. String:不可变字符序列,效率低,但是复用率高。

3. StringBuffer:可变字符序列、效率较高(增删)、线程安全,看源码

4. StringBuilder:可变字符序列、效率最高、线程不安全

5. String使用注意说明:

   string s="a";//创建了一个字符串

   s += "b";

//实际上原来的"a"字符串对象已经丢弃了，现在又产生了一个字符串s+"b”(也就是"ab")。如果多次执行这些改变串内容的操作，会导致大量副本字符串对象存留在内存中，降低效率。如果这样的操作放到循环中，会极大影响程序的性能=>**结论**:如果我们对String做大量修改，不要使用String

### String、StringBuffer 和 StringBuilder 的效率测试

+ 代码演示：

```java
package com.study.stringbuilder_;

public class StringBuilderVSStringBufferVSString {
    public static void main(String[] args) {
        String test="";
        long startTime=0L;
        long endTime=0L;
        StringBuffer buffer = new StringBuffer("");
        StringBuilder builder = new StringBuilder("");
        startTime=System.currentTimeMillis();
        for (int i = 0; i < 20000; i++) {
            buffer.append(String.valueOf(i));
        }
        endTime=System.currentTimeMillis();
        System.out.println("StringBuffer的执行时间："+(endTime-startTime));
        startTime=System.currentTimeMillis();
        for (int i = 0; i < 20000; i++) {
            builder.append(String.valueOf(i));

        }
        endTime=System.currentTimeMillis();
        System.out.println("StringBuilder的执行时间："+(endTime-startTime));
        startTime=System.currentTimeMillis();
        for (int i = 0; i < 20000; i++) {
           test=test+i;

        }
        endTime=System.currentTimeMillis();
        System.out.println("String的执行时间："+(endTime-startTime));
    }
    }


```

### String、StringBuffer 和 StringBuilder 的选择

1. <font color=#0099ff size=4 face="黑体">如果字符串存在大量的修改操作，一般使用 StringBuffer 或StringBuilder</font>
2. <font color=#0099ff size=4 face="黑体">如果字符串存在大量的修改操作,并在单线程的情况,使用 StringBuilder</font>
3. <font color=#0099ff size=4 face="黑体">如果字符串存在大量的修改操作，并在多线程的情况,使用 StringBuffer</font>
4. <font color=#0099ff size=4 face="黑体">如果我们字符串很少修改，被多个对象引用,使用String,比如配置信息等</font>

## Math 类

## 基本介绍

Math 类包含用于执行基本数学运算的方法，如初等指数、对数、平方根和三角函数。

### 方法一览(均为静态方法)

![15](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/15.png)

### Math 类常见方法应用案例

+ 代码演示:

```java
package com.study.math_;

public class MathMethod {
    public static void main(String[] args) {
        //abs 绝对值
        int abs=Math.abs(-9);
        System.out.println(abs);
        //2.pow 求幂
        double pow=Math.pow(2,6);//2的6次方
        System.out.println(pow);
        //3.ceil 向上取整  返回>=该参数的最小整数
        double ceil=Math.ceil(2.54646);
        System.out.println(ceil);//2.0
        //4.floor 向下取整 返回<=改参数的最小整数
        double floor=Math.floor(4.0001);
        System.out.println(floor);//4.0
        //5.round 四舍五入
        long round=Math.round(5.5);
        System.out.println(round);//6.0
        //6.sqrt 开方
        double sqrt=Math.sqrt(4);
        System.out.println(sqrt);
        //7. random 求随机数
        //random 是返回 0<=x<1
        //返回一个 a<=x<=b
        //(int)(a)<=x<=(int)(a+Math.random()*(b-a+1))
        System.out.println((int)(0+(Math.random()*68)));
        int min=Math.min(6,9);
        int max=Math.max(1,90);
        System.out.println(min+" "+max);
    }

}

```

## Arrays 类

### Arrays 类常见方法应用案例

Arrays里面包含了一系列静态方法，用于管理或操作数组(比如排序和搜索)

1. toString返回数组的字符串形式

   Arrays.toString(arr)

2. sort排序(自然排序和定制排序)

3. binarySearch通过二分搜索法进行查找,要求必须排好序

   int index = Arrays.binarySearch(arr, 3);

```java
package com.study.arrays_;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Comparator;

public class ArrayMethod01 {
    public static void main(String[] args) {
        Integer integer[] = {1, 10, 20};
//        for (int i = 0; i < integer.length; i++) {
//            System.out.println(integer[i]);
//        }
        //直接使用Arrays的toString方法 显示数组信息
        System.out.println(Arrays.toString(integer));

        Integer arr[] = {5, 2, -5, 56, 32, 0};
        Arrays.sort(arr);
        System.out.println("==排序后===");
        System.out.println(Arrays.toString(arr));
        //1.演示 sort方法 排序  默认从小到大 排序
        //2.因为数组是引用类型，所以通过sort排序后， 会直接影响到实参arr
        //3.sort重载的，也可以通过传入一个接口实现了 Comparator来实现定制排序
        //4.调用定制排序时，传入两个参数， （1）排序的数组arr
        //（2）实现了 Comparator接口的匿名内部类，要求实现compare 方法
        //5.
        //6.这体现了接口编程的方式，
        //  源码分析
        //（1）Arrays.sort(arr,new Comparator()
        // (2)最终到 private static <T> void binarySort(T[] a, int lo, int hi, int start,
        //                                       Comparator<? super T> c) （）
        //（3）执行到 binarySort方法的代码，会根据动态绑定机制 c.compare()执行我们传入的
        //  匿名内部类compare()
        // while (left < right) {
        //                int mid = (left + right) >>> 1;
        //                if (c.compare(pivot, a[mid]) < 0)
        //                    right = mid;
        //                else
        //                    left = mid + 1;
        //            }
        //（4）new Comparator<Object>() {
        //            @Override
        //            public int compare(Object o1, Object o2) {
        //                Integer i1 = (Integer) o1;
        //                Integer i2 = (Integer) o2;
        //                return i1 - i2;
        //            }
        //(5) public int compare(Object o1, Object o2)  返回的值>0还是<0
            //  会影响整个排序结果  这就充分体现了 接口编程+动态绑定+匿名内部类的综合使用
        //      将来的底层框架和源码的使用方式，会非常常见
        //Array.sort(arr);//默认排序方法
        //定制排序
        Arrays.sort(arr, new Comparator<Object>() {
            @Override
            public int compare(Object o1, Object o2) {
                Integer i1 = (Integer) o1;
                Integer i2 = (Integer) o2;
                return i1 - i2;
            }
        });
        for (int i = 0; i < arr.length; i++) {

            System.out.println(arr[i]);
        }
    }
}

```

+ 代码演示：

```java
package com.study.arrays_;

import java.util.Arrays;
import java.util.Comparator;

public class ArraySortCustom {
    public static void main(String[] args) {
        int arr[]={1,-1,0,8,20};

      //  bubble01(arr);
        bubble02(arr, new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                int i1=(Integer) o1;
                int i2=(Integer) o2;
                return i1-i2;//return i2-i1;
            }
        });
        System.out.println("=====排序后的情况======");
        System.out.println(Arrays.toString(arr));

    }
    //使用冒泡排序
    public static void bubble01(int []arr){
        int temp=0;
        for (int i = 0; i < arr.length-1; i++) {
            for (int j = 0; j < arr.length-i-1; j++) {
                //从小到大
                if(arr[j]>arr[j+1]){
                    temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;

                }

            }
        }
    }
    //结合冒泡+定制
    public static void bubble02(int []arr, Comparator c){
        int temp=0;
        for (int i = 0; i < arr.length-1; i++) {
            for (int j = 0; j < arr.length-i-1; j++) {
                //数组的排序由c.compare(arr[j],arr[j+1]) 决定
                if(c.compare(arr[j],arr[j+1])>0){
                    temp=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=temp;

                }

            }
        }
    }
}

```

4. copyOf 数组元素的复制

   Integer[] newArr = Arrays.copyOf(arr, arr.length);

5. fill数组元素的填充

   Integer[] num = new Integer[]{9,3.2};

   Arrays.fill(num,99);

6. equals比较两个数组元素内容是否完全一致

   boolean equals = Arrays.equals(arr, arr2);

7. asList将一组值，转换成list

   List\<Integer> asList = Arrays.asList(2,3,4,5,6,1);

+ 代码演示：

```java
package com.study.arrays_;

import java.util.Arrays;
import java.util.List;

public class ArrayMethod02 {
    public static void main(String[] args) {
        Integer[] arr={-1,2,90,123,567};
        //binarySearch 通过二分搜索法进行查找，要求必须拍好
        //1.使用binarySearch 二叉查找
        //2.要求该数组是有序的，如果该数组是无序的，不能使用binarySearch
        //3.如果数组不存在该元素，就返回  return -(low+1);
        int index= Arrays.binarySearch(arr,233);
        System.out.println("index="+index);

        //copyOf 数组元素的复制
        //1.从arr数组中，拷贝 arr.length个元素到 newArr数组中
        //2.如果拷贝的长度>arr.length 就在新数组的后面 增加null
        //3.如果拷贝长度小于0，就抛出异常NegativeArraySizeException
        //4.该方法的底层使用的是 System.arraycopy()
        Integer[] newArr=Arrays.copyOf(arr,arr.length);
        System.out.println("==拷贝执行完毕后==");
        System.out.println(Arrays.toString(newArr));

        //ill数组元素的 填充
        Integer[] num=new Integer[]{9,3,2};
        Arrays.fill(num,99);
        System.out.println("==num数组填充后==");
        System.out.println(Arrays.toString(num));

        //equals 比较两个数组元素内容是否完全一致
        Integer[] arr2={1,2,90,123,567};
        //1.如果arr和arr2数组的元素一样，则方法返回true;
        //2.如果不是完全一样，就返回false
        boolean equals=Arrays.equals(arr,arr2);
        System.out.println("equals="+equals);

        //asList 将一组值，转换成list
        //1.asList方法，会将（2，3，4，5，6，1）数据转换成一个List集合
        //2.返回的asList 编译类型 List(接口)
        //3.aList 运行类型 java.util.Arrays#ArrayList,是Arrays类的
        //静态内部类 private static class ArrayList<E> extends AbstractList<E>
        //        implements RandomAccess, java.io.Serializable
        List asList =Arrays.asList(2,3,4,5,6,1);
        System.out.println("asList="+asList);
        System.out.println("asList的运行类型"+asList.getClass());



    }
}

```

## System 类 

### System 类常见方法和案例 

exit 退出当前程序

arraycopy:复制数组元系，比较适合底层调用,一般使用Arrays.copyOf完成复制数组.

int[] src={1,2,3};

int[] dest = new int[3];

System.arraycopy(src, 0, dest, 0, 3);

currentTimeMillens:返回当前时间距离1970-1-1的毫秒数

gc:运行垃圾回收机制System.gc0);

+ 代码演示：

```java
package com.study.system_;

import java.util.Arrays;

public class System_ {
    public static void main(String[] args) {


        //exit退出 当前程序
//        System.out.println("ok1");
//        //1.exit(0)表示程序退出
//        //2. 0表示一个状态，正常的状态
//        System.exit(0);
//        System.out.println("ok2");


        //arraycopy:复制数组元素，比较适合底层调用
        //一般使用Arrays.copyOf完成复制数组
        int []src={1,2,3};
        int []dest=new int[3];
        //主要搞清楚这五个参数的含义：
        //1.src: 源数组
        //2.srcPos: 从源数组的哪个索引位置开始拷贝
        //3.dest:  目标数组，即把源数组的数据拷贝到哪个数组
        //4.dest Pos: 把源数组的数据拷贝到 目标数组的哪个索引
        //5.length :从源数组拷贝多少个数据到目标数组
        System.arraycopy(src,0,dest,0,src.length);
        System.out.println("dest="+ Arrays.toString(dest));



        //currentTimeMillens:返回当前时间距离1970-1-1的毫秒数
        System.out.println(System.currentTimeMillis());
    }
}

```

## BigInteger 和 BigDecimal 类

### BigInteger 和 BigDecimal 介绍

+ **BigInteger适合保存比较大的整型**
+ **BigDecimal适合保存精度更高的浮点型(小数)**

### BigInteger 和 BigDecimal 常见方法

+ 代码演示：

```java
package com.study.bignum;

import java.math.BigInteger;

public class BigInteger_ {
    public static void main(String[] args) {


        //当我们 编程中，需要处理很大的整数，long 不够用
        //可以使用BigInteger的类来搞定
        long l=237888888888l;
        System.out.println("l="+l);

        BigInteger bigInteger = new BigInteger("5555555555555555555555555555555555555555555555555");
        BigInteger bigInteger2 = new BigInteger("100");
        System.out.println(bigInteger);


        //1.在对 BigInteger 进行加减乘除的时候，需要使用对应的方法，不能直接加减乘除
        //2.可以创建一个 要操作的BigInteger 然后进行相应操作
        BigInteger add=bigInteger.add(bigInteger2);
        System.out.println(add);
        BigInteger subtract=bigInteger.subtract(bigInteger2);
        System.out.println(subtract);//减
        BigInteger multiply=bigInteger.multiply(bigInteger2);
        System.out.println(multiply);//乘法
        BigInteger divide = bigInteger.divide(bigInteger2);
        System.out.println(divide);//除法

    }
}

```

```java
package com.study.bignum;

import java.math.BigDecimal;

public class BigDecimal_ {
    public static void main(String[] args) {
        //当我们需要保存一个精度很高的数时， double 不够用
        //可以是BigDecimal
        double d=19999.1111111111111;
        BigDecimal bigDecimal = new BigDecimal("19343434.556526222222222222222222222");
        BigDecimal bigDecimal1 = new BigDecimal("23.562");
        System.out.println(bigDecimal);



        //1.如果对bigDecimal 进行加减运算，比如加减乘除，需要使用·对应的方法
        //2.创建一个需要操作的 BigDecimal 然后调用相应的方法即可
        System.out.println(bigDecimal.add(bigDecimal1));//加
        System.out.println(bigDecimal.subtract(bigDecimal1));//减
        System.out.println(bigDecimal.multiply(bigDecimal1));//乘
        //System.out.println(bigDecimal.divide(bigDecimal1));//可能抛出异常
        //在调用divide 方法时，指定精度时，BigDecimal.ROUND_CEILING
        //如果有无限循环小数，就会保留分子的精度
        System.out.println(bigDecimal.divide(bigDecimal1,BigDecimal.ROUND_CEILING));//除


    }
}

```

## 日期类

### 第一代日期类

![19](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/19.png)

+ 代码演示：

```java
package com.study.date_;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.SimpleTimeZone;

public class Date01 {
    public static void main(String[] args) throws ParseException {

        //1.获取当前系统时间
        //2.这里的Date类是在java.util包
        //3.默认输出的日期格式是国外的方式，因此通常需要对格式进行转换
        Date d1 = new Date();
        System.out.println("d当前日期="+d1);
        Date d2 = new Date(6925155);
        System.out.println("d2="+d2);

        //1.创建 SimpleDateFormat对象，可以指定相应的格式
        //2.这里的格式使用字母是规定好，不能乱写

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy年MM月dd日 hh:mm:ss E");
        String format =sdf.format(d1);//format:将日期转换成指定格式的字符串
        System.out.println("当前日期="+format);

        //1.可以把一个格式化的字符串String转化为 Date
        //2.得到的Date 仍然在输出时，还是按照国外的形式，如果希望指定格式输出，需要转换
        //3.在把一个String转换成Date,使用的 sdf 格式需要和你给的String的格式一样，否则会抛出异常
        String s="1996年01月01日 10:20:30 星期一";
        Date parse=sdf.parse(s);
        System.out.println("parse="+parse);

    }
}


```

### 第二代日期类

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/20.png)

+ 代码演示：

```java
package com.study.date_;

import java.util.Calendar;

public class Calendar_ {
    public static void main(String[] args) {
        //1.Calender是一个抽象类，并且构造器是private
        //2.可以通过 getInstance()来获取实例
        //3.提供大量的方法和字段提供给程序员
        //4.Calendar没有提供相应的格式化的类，因此需要程序员自己组合来输出(灵活)
        //5.如果我们需要按照 24小时进制来获取时间， Calender.HOUR==改成=> Calender.HOUR_OF_DAY

        Calendar c=Calendar.getInstance();//创建日历对象//比较简单，自由
        System.out.println("c="+c);
        //2.获取  日历对象的某个日历字段
        System.out.println("年:"+c.get(Calendar.YEAR));
        //这里为什么要加 1 因为Calender 返会月的时候，是按照0开始编号
        System.out.println("月:"+(c.get(Calendar.MONTH)+1));
        System.out.println("日:"+c.get(Calendar.DAY_OF_MONTH));
        System.out.println("小时:"+c.get(Calendar.HOUR));
        System.out.println("分钟:"+c.get(Calendar.MINUTE));
        System.out.println("秒:"+c.get(Calendar.SECOND));
        //Calender 没有专门的格式化方法，所以需要程序员自己来组合显示
        System.out.println(c.get(Calendar.YEAR)+"-"+(c.get(Calendar.MONTH)+1)+"-"+
                c.get(Calendar.DAY_OF_MONTH)+"  "+c.get(Calendar.HOUR_OF_DAY)+":"+
                c.get(Calendar.MINUTE)+":"+c.get(Calendar.SECOND));



    }
}

```

### 第三代日期类

![21](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/21.png)

+ 代码演示：

```java
package com.study.date_;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class LocalDate_ {
    public static void main(String[] args) {
        //第三代日期
        //1.我们使用now() 返回当前日期时间的对象
        LocalDateTime ldt=LocalDateTime.now();
        //LocalDate().now(); 年月日
        // LocalTime.now() 时分秒
        System.out.println(ldt);


        //2.使用DateTimeFormatter 对象来进行格式化
        //创建 DateTimeFormatter对象
        DateTimeFormatter dateTimeFormatter=DateTimeFormatter.ofPattern("yyyy年MM月dd日 HH:mm:ss E");
        String format=dateTimeFormatter.format(ldt);
        System.out.println("格式化的日期="+format);

        System.out.println("年="+ldt.getYear());
        System.out.println("月="+ldt.getMonth());
        System.out.println("月="+ldt.getMonthValue());
        System.out.println("日="+ldt.getDayOfMonth());
        System.out.println("时="+ldt.getHour());
        System.out.println("分="+ldt.getMinute());
        System.out.println("秒="+ldt.getSecond());


    }
}

```

### Instant 时间戳

类似于Date

提供了一系列和Date类转换的方式lnstant—>Date:

Date date = Date.from(instant);

Date—>Instant:

Instant instant = date.tolnstant();

案例演示:

Instant now = Instant.now();

System.out.println(now);

Date date = Date.from(now);

Instant instant = date.tolnstant();

+ 代码演示：

```java
package com.study.date_;

import java.time.Instant;
import java.util.Date;

public class Instant_ {
    public static void main(String[] args) {
        //1.通过静态方法 now() 来表示当前时间戳的对象
        Instant now = Instant.now();
        System.out.println(now);
        //2.通过from可以把Instant 转换成Date
        Date date=Date.from(now);
        //3.通过date的toInstant() 可以把date 转换成Instant对象
        Instant instant=date.toInstant();
    }
}

```

### 第三代日期类更多方法

+ LocalDateTime类
+ MonthDay类：检查重复事件
+ 是否是闰年
+ 增加日期的某个部分
+ 使用plus方法测试查看一年前和一年后的日期
+ 使用时，查看API即可

## 本章作业

```java
package com.study.homework;

public class Homework01 {
    public static void main(String[] args) {
        /*
        (1)将字符串中中指定部分进行反转，比如将“abcdef”反转成“aedcbf"
        (2)编写方法 public static String reverse(String str,int start,int end)搞定

         */
        String str = "abcdef";
        System.out.println("====交换前====");
        System.out.println(str);
        try {
            str = reserve(str, 1, 4);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return;
        }
        System.out.println("====交换后====");
        System.out.println(str);


    }

    public static String reserve(String str, int start, int end) {
        //对输入的参数做一个验证
        //重要的编程技巧
        //（1）写出正确的情况
        //（2）然后取反即可
        if(!(str!=null&&start>=0&&end>start&&end<str.length())){
            throw new RuntimeException("参数不正确");

        }
        char[] chars = str.toCharArray();
        char temp = ' ';
        for (int i = start, j = end; i < j; i++,j--) {
            temp = chars[i];
            chars[i] = chars[j];
            chars[j] = temp;

        }
        //使用chars交换后的 重新构建一个String返回即可
        return new String(chars);

    }
}


```

```java
package com.study.homework;

public class Homework02 {
    public static void main(String[] args) {
        String name="Jack";
        String pwd="123456";
        String email="Jack@sogou.com";
        try {
            userRegister(name,pwd,email);
            System.out.println("恭喜你注册成功！");
        }catch (Exception e){
            System.out.println(e.getMessage());
        }


    }

    /**
     * 输入用户名、密码、邮箱，如果有信息录入正确，则提示注册成功，否则生成异常对象
     * 要求：
     * （1）用户长度为2或3或4
     * （2）密码的长度为6，要求是全是数字
     * （3）邮箱中包含@和. 并且@在.前面
     * <p>
     * 思路分析：
     * （1）先编写方法 userRegister(String name,String pwd,String email){}
     * (2)针对输入的内容进行校验，如果发现有问题，就抛出异常，给出提示
     * (3)单独写方法，判断密码是否全部是数字字符 boolean
     */

    public static void userRegister(String name, String pwd, String email) {




        //再加入一些校验
        if(!(name!=null&&pwd!=null&email!=null)){
            throw new RuntimeException("参数不能为空");
        }
        //过关斩将
        //第一关
        int userLength = name.length();
        if (!(userLength >= 2 && userLength <= 4)) {
            throw new RuntimeException("用户长度为2或3或4");

        }

        //第二关
        if (!(pwd.length() == 6 && isDigital(pwd))) {
            throw new RuntimeException("密码的长度为6，要求是全是数字");

        }
        //第三关
        int i=email.indexOf('@');
        int j=email.indexOf('.');
        if(!(i>0&&j>1)){
            throw new RuntimeException("邮箱中包含@和.  并且@在.的前面");

        }

    }

    //单独写方法，判断密码是否全部是数字字符 boolean
    public static boolean isDigital(String str) {
        char[] chars = str.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            if (chars[i] < '0' || chars[i] > '9') {
                return false;
            }


        }
        return true;
    }
}


```

```java
package com.study.homework;

import java.util.Locale;

public class Homework03 {
    public static void main(String[] args) {
        String name="Feng Rong Xu";
        printName(name);

    }
    /**
     * 编写方法：完成输出格式要求的字符串
     * 编写java程序，输入形式为：Feng Rong Xu的人名，以 Xu,Feng .R的形式打印
     * 出来，其中.R是中间单词的首字母
     *
     * 思路分析
     * （1）对输入的字符串进行分割split(" ")
     * (2)对得到的String[] 进行格式化String.format()
     * （3）对输入的字符串校验即可
     *
     *
     */
    public static void printName(String str){
        if(str==null){
            System.out.println("str 不能为空");
            return;
        }
        String[] names=str.split(" ");
        if(names.length!=3){
            System.out.println("输入的字符格式不对");
            return;
        }
        String format = String.format("%s,%s .%c", names[2], names[1], names[1].toUpperCase().charAt(0));
        System.out.println(format);


    }
}

```

```java
package com.study.homework;

import java.awt.datatransfer.StringSelection;

public class Homework04 {
    public static void main(String[] args) {
        String str="abcFRX  U 133";
        countStr(str);
    }
    /**
     * 输入字符串，判断里面有多少个大写字母，多少个小写字母，多少个数字
     * 思路分析
     * （1）遍历字符串，如果 char在'0'~'9'就是一个数字
     * （2）如果 char 在'a'~'z' 就是一个小写字母
     * （3）如果 char 在'A'~'z' 就是一个大写字母
     * （4）使用三个变量来记录 统计结果
     */
    public static void countStr(String str){
        if(str==null){
            System.out.println("输入不能为null");
            return;
        }
        int strLen=str.length();
        int numCount=0;
        int lowerCount=0;
        int upperCount=0;
        int otherCount=0;
        for (int i = 0; i < str.length(); i++) {
            if(str.charAt(i)>='0'&&str.charAt(i)<='9'){
                numCount++;
            }else if(str.charAt(i)>='a'&&str.charAt(i)<='z'){
                 lowerCount++;
            }else if(str.charAt(i)>='A'&&str.charAt(i)<='Z'){
                upperCount++;
            }else {
                otherCount++;

            }

        }
        System.out.println("数字有 "+numCount);
        System.out.println("小写字母有 "+lowerCount);
        System.out.println("大写字母有 "+upperCount);
        System.out.println("其他有 "+otherCount);
    }
}
```

![23](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/CYlei/23.png)

