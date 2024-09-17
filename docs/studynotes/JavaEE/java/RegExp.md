---
title: Java 正则表达式
date: 2021-12-20 18:44:12
permalink: /pages/61ff69/
categories:
  - java
tags:
  - java
---
# Java 正则表达式

## 为什么要学习正则表达式

### 极速体验正则表达式威力

1. 提取文章中所有的英文单词
2. 提取文章中所有的数字
3. 提取文章中所有的英文单词和数字
4. 提取百度热榜标题

结论:**正则表达式是处理文本的利器**

```java
  Pattern pattern = Pattern.compile("[a-zA-Z]+");
  Pattern pattern = Pattern.compile("[0-9]+");
  Pattern pattern = Pattern.compile("([0-9]+)|([a-zA-Z)]+)");
  Pattern pattern = Pattern.compile("<a target=\"_blank\" title=\"(\\S*)\"");
```

## 提出几个问题

1. 给你一个字符串(或文章).请你找出所有四个数字连在一起的子串?
2. 给你一个字符串(或文章),请你找出所有四个数字连在一起的子串,并且这四个数字要满足:第一位与第四位相同,第二位与第三位相同，比如1221 .5775
3. 请验证输入的邮件,是否符合电子邮件格式.
4. 请验证输入的手机号，是否符合手机号格式

## 解决方法-正则表达式

1. 为了解决上述问题，Java提供了正则表达式技术，专门用于处理类似文本问题
2. 简单的说:`正则表达式是对字符串执行模式匹配的技术`。
3. 正则表达式:regular expression => RegExp

## 正则表达式基本介绍

### 介绍

1. 一个正则表达式，就是用某种模式去匹配字符串的一个公式。很多人因为它们看上去比较古怪而且复杂所以不敢去使用，不过，经过练习后,就觉得这些复杂的表达式写起来还是相当简单的，而且，一旦你弄懂它们,你就能把数小时辛苦而且易错的文本处理工作缩短在几分钟(甚至几秒钟)内完成
2. 这里要特别强调,正则表达式不是只有java才有，实际上很多编程语言都支持正则表达式进行字符串操作!

## 正则表达式底层实现(重要)

### 实例分析

为让大家对正则表达式底层实现有一个直观的映象，给大家举个实例给你一段字符串(文本),请找出所有四个数字连在一起的子串，比如:应该找到19981999 3443 9889>分析底层实现RegTheory.java

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/13  11:44
 * 分析java的正则表达式的底层实现
 */
public class RegTheory_ {
    public static void main(String[] args) {
        String context = "1998年12月8日,第二代Java平台的企业版J2EE发布.1999年"+
                "第二代 Java 平台（简称为 Java2）的 3 个版本：J2ME（Java2 Micro Edition，Java2 平台的微型" +
                "版），应用于移动、无线及有限资源的环境；J2SE（Java 2 Standard Edition，Java 2 平台的" +
                "标准版），应用于桌面环境；J2EE（Java 2Enterprise Edition，Java 2 平台的企业版），应" +
                "用 3443 于基于 Java 的应用服务器。Java 2 平台的发布，是 Java 发展过程中最重要的一个" +
                "里程碑，标志着 Java 的应用开始普及 9889";

        //目标匹配所有四个数字
        //说明
        //1.\\d表示一个任意的数字
        String regStr="(\\d\\d)(\\d\\d)";
        //2.创建模式对象[即正则表达式对象]
        Pattern pattern = Pattern.compile(regStr);
        //3.创建匹配器
        //说明:创建匹配器matcher,按照正则表达式的规则 去匹配context字符串
        Matcher matcher = pattern.matcher(context);

        //4.开始匹配
        /**
         * matcher.find() 完成的任务
         * 什么是分组，比如 (\d\d)(\d\d),正则表达式中有() 表示分组，第一个()表示第一组，第2个()代表第二组 以此类推
         * 1.根据指定的规则,定位满足规则的字符串(比如(19)(98))
         * 2.找到后，将 字符串的开始的索引记录到matcher对象的属性 int[] groups;
         *        2.1 group[0]=0,把该子字符串的结束的索引+1的值记录到 group[1]=4
         *        2.2 记录1组()匹配到的字符串groups[2]=0 groups[3]=2
         *        2.3 记录2组()匹配到的字符串groups[4]=2 groups[5]=4
         *        2.4 如果有更多的分组。。。。。以此类推
         * 3.同时记录oldLast 的值为子字符串的结束的 索引+1的值即4,即下次执行find时，
         *   就从4开始匹配
         *
         *matcher.group(0) 分析
         *
         * 源码：
         *  public String group(int group) {
         *         if (first < 0)
         *             throw new IllegalStateException("No match found");
         *         if (group < 0 || group > groupCount())
         *             throw new IndexOutOfBoundsException("No group " + group);
         *         if ((groups[group*2] == -1) || (groups[group*2+1] == -1))
         *             return null;
         *         return getSubSequence(groups[group * 2], groups[group * 2 + 1]).toString();
         *     }
         * 1.根据group[0]=0 和 groups[1]=4的记录的位置，从content开始截取子字符串返回
         *      就是[0,4) 包含0但是不包含4的位置
         *
         * 如果再次执行find方法，仍然按照上面分析来执行
         *
         */
        while (matcher.find()){
            System.out.println("找到:"+matcher.group(0));
            System.out.println("第1组()匹配到的值="+matcher.group(1));
            System.out.println("第2组()匹配到的值="+matcher.group(2));
        }


    }
}
```

![01](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/01.png)

`总结`:

1. 如果正则表达式有() 即分组
2. 取出匹配的字符串规则如下
3. <font color=#DC4040 size=4 face="黑体">group(0)表示匹配到的子字符串</font>
4. <font color=#DC4040 size=4 face="黑体">group(1)表示匹配到的子字符串的第一组子串</font>
5. <font color=#DC4040 size=4 face="黑体">group(2)表示匹配到的子字符串的第二组子串</font>
6. <font color=#DC4040 size=4 face="黑体">... 但是分组的数不能越界</font>

## 正则表达式语法

### 基本介绍

如果想要灵活的运用正则表达式，必须了解其中各种元字符的功能，元字符从功能上大致分为:

1. 限定符
2. 选择匹配符
3. 分组组合和反向引用符
4. 特殊字符
5. 字符匹配符
6. 定位符

### 元字符(Metacharacter)-转义号 \\\

\\\ 符号说明:在我们使用正则表达式去检索某些特殊字符的时候，需要用到转义符号，否则检索不到结果，甚至会报错。

案例：用$去匹配"abc$("会怎样?

用(去匹配"abc$("会怎样?

再次提示:

在Java正则表达式中，两个\\\代表其他语言中的一个\\

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/15  21:33
 * 演示转义字符的使用
 */
public class RegExp02 {
    public static void main(String[] args) {
        String content="abc$(abc(123(";
        //匹配(
        String regStr="\\(";
        Pattern pattern = Pattern.compile(regStr);
        Matcher matcher = pattern.matcher(content);

        while (matcher.find()){
            System.out.println(matcher.group(0));
        }

    }
}

```

需要用到转义符号的字符有以下:**. + ( ) $ / \ ? [ ] ^ { }**

### 元字符-字符匹配符

![02](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/02.png)

![03](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/03.png)

+ 应用案例

![04](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/04.png)

![05](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/05.png)

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/16  18:35
 * 演示字符匹配符的使用
 */
public class RegExp03 {
    public static void main(String[] args) {

        String content="a11c8AB     C";
//        String regStr="[a-z]";//匹配a-z之间任意字符
//        String regStr="[A-Z]";//匹配A-Z之间任意一个字符
//        String regStr="abc";//匹配abc 字符串[默认区分大小写]
//        String regStr="(?i)abc";//匹配abc 字符串[表示abc都不区分大小写]
//        String regStr="a(?i)bc"; //表示bc不区分大小写
//        String regStr="a((?i)b)c"; //只有b不区分大小写
//        String regStr="[0-9]";//匹配0-9之间的任意一个字符
//        String regStr="[a-z]";//匹配不在a-z之间任意一个字符
//        String regStr="[^0-9]";//匹配不在0-9之间的任意一个字符
//        String regStr="[abcd]";//匹配在abcd中任意一个字符
//        String regStr="\\D";//匹配不是 0-9的任意一个字符
//        String regStr="\\w";//匹配的是英文字母 数字和下划线
//        String regStr="\\W";//与\\w相反
//        String regStr="\\s";//匹配任何空白字符(空格 指标等等)
//        String regStr="\\S";//匹配任何非空白字符，和\\s刚好相反
        String regStr=".";//匹配出\n之外的所有字符，如果要匹配，本身则需要使用\\.
        //说明
        //1.创建对象Pattern对象时，指定Pattern.CASE_INSENSITIVE,表示匹配是不区分字母大小写，
        Pattern pattern = Pattern.compile(regStr); //不区分大小写
        Matcher matcher = pattern.matcher(content);

        while (matcher.find()){
            System.out.println("找到 "+matcher.group(0));
        }

    }
}

```

### 元字符-选择匹配符

![06](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/06.png)

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/16  21:06
 * 选择匹配符
 */
public class RegExp04 {
    public static void main(String[] args) {

        String content="fengrongxu 徐 许旭";
        String regStr="xu|旭";

        Pattern compile = Pattern.compile(regStr);
        Matcher matcher = compile.matcher(content);

        while (matcher.find()){
            System.out.println("找到 "+matcher.group(0));
        }

    }
}

```

### 元字符-限定符

用于指定其前面的字符和组合项连续出现多少次

![07](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/07.png)

+ 应用举例

![08](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/08.png)

![09](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/09.png)

![10](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/10.png)

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/17  20:05
 * 演示限定符的使用
 */
public class RegExp05 {
    public static void main(String[] args) {
        String content="11111111aaaaaa";
        //a{3},1{4},(\\d){2}
//        String regStr="a{3}";//表示匹配aaa
//        String regStr="1{4}";//表示匹配 1111
//        String regStr="\\d{2}";//表示匹配任意两位的数字字符

        //a{3,4} 1{4,5},\\d{2,5}

        //细节:java匹配默认贪婪匹配，即尽可能匹配多的
//        String regStr="a{3,4}";//表示匹配aaa 或者 aaaa
//        String regStr="1{4,5}";//表示匹配1111或11111

//        String regStr="\\d{2,5}";//表示匹配两位数 或者3  4 或者5

        //1+
//        String regStr="1+";//匹配一个1或者多个1
//        String regStr="\\d+";//表示匹配一个数字 或者 多个数字

        //1*
//        String regStr="1*";//匹配0个1 或者多个1

        //演示?的使用

        String regStr="a1?";//匹配a 或者a1
        Pattern pattern = Pattern.compile(regStr);
        Matcher matcher = pattern.matcher(content);

        while (matcher.find()){
            System.out.println("找到"+matcher.group(0));
        }

    }
}

```

### 元字符-定位符

定位符, 规定要匹配的字符串出现的位置，比如在字符串的开始还是在结束的位置，这个也是相当有用的，必须掌
握 

![11](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/11.png)

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/17  20:37
 * 演示定位符的使用
 */
public class RegExp06 {
    public static void main(String[] args) {

        String content="123-abc1 abc";
        //以至少1个数字开头，后接任意小写字母的字符串
//        String regStr="^[0-9]+[a-z]*";
        //以至少1个数字开头，必须以至少一个小写字母结束
//        String regStr="^[0-9]+\\-[a-z]+$"

        //表示匹配边界的abc[这里的边界是指：被匹配的字符串最后，
        // 也可以是空格的子字符串的后面 ]
//        String regStr="abc\\b";
        String regStr="abc\\B";

        Pattern pattern = Pattern.compile(regStr);
        Matcher matcher = pattern.matcher(content);


        while (matcher.find()){
            System.out.println("找到 "+matcher.group(0));
        }
    }
}

```

### 分组

![12](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/12.png)

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/17  21:00
 * 分组
 */
public class RegExp07 {
    public static void main(String[] args) {

        String content="fengrongxu 0101 ndwndja7899feng";

        //下面就是非命名分组
        //说明
        //1.通过matcher.group(0) 得到匹配到的字符串
        //2.通过matcher.group(1) 得到匹配到的字符串的第1个分组的内容
        //2.通过matcher.group(2) 得到匹配到的字符串的第2个分组的内容

//        String regStr="(\\d\\d)(\\d\\d)";//匹配4个数字的字符串

        //命名分组：既可以给分组取名
        String regStr="(?<g1>\\d\\d)(?<g2>\\d\\d)";
        Pattern pattern = Pattern.compile(regStr);
        Matcher matcher = pattern.matcher(content);


        while (matcher.find()){
            System.out.println("找到 "+matcher.group(0));
            System.out.println("第一个分组的内容[通过组名]: "+matcher.group("g1"));
            System.out.println("第二个分组的内容[通过组名]: "+matcher.group("g2"));
        }

    }
}

```

![13](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/13.png)

## 应用实例

### 对字符串进行如下验证

![14](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/14.png)

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/17  21:42
 * 正则表达式的应用实例
 */
public class RegExp10 {
    public static void main(String[] args) {
        String content="123456";


        //汉字
//        String regStr="^[\u0391-\uffe5]+$";

        //邮政编码
        //要求：1-9开头的一个六位数 比如:123789
//        String regStr="^[1-9]\\d{5}$";

        //QQ号
        //要求:是1-9开头的一个(5位数-10位数) 比如:12389 12345687
//        String regStr="^[1-9]\\d{4,9}$";


        //手机号码
        //要求:必须是以13,14，15,18开头的11位数，比如13588889999
        String regStr="^1[3|4|5|8]\\d{9}$";


        Pattern pattern = Pattern.compile(regStr);
        Matcher matcher = pattern.matcher(content);

        if(matcher.find()){
            System.out.println("满足格式");
        }else {
            System.out.println("不满足格式");
        }
    }
}

```

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/17  22:08
 */
public class RegExp11 {
    public static void main(String[] args) {

        String content="https://www.bilibili.com/video/BV1fh411y7R8?from=search&seid=1831060912083761326";

        /**
         * 思路
         * 1.先确定url开始部分https:// | http://
         * 2.然后通过([\w-]+.)+[\w-]+ 匹配 www.bilibili.com
         */
        String regStr="^((http|https)://)([\\w-]+.)+[\\w-]+(\\/[\\w-?=&/%.#])?$";//注意 :[.]表示盘匹配.本身

        Pattern pattern = Pattern.compile(regStr);
        Matcher matcher = pattern.matcher(content);

        if(matcher.find()){
            System.out.println("满足格式");
        }else {
            System.out.println("不满足格式");
        }
    }
}

```

## 正则表达式三个常用类

![15](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/15.png)

+ Pattern类的方法matches()

```java
package com.regexp;

import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/17  22:35
 * 演示matches方法，用于整体匹配 验证输入的字符串 是否满足条件使用
 */
public class PatternMethod {
    public static void main(String[] args) {
        String content="hello abc 韩顺平教育";
//        String regStr="hello";
        String regStr="hello+";
        
        boolean matches = Pattern.matches(regStr, content);
        System.out.println("整体匹配="+matches);
    }
}

```

+ Matcher类的方法

![16](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/16.png)

![17](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/17.png)

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/17  22:44
 * Matcher 类的常用方法
 */
public class MatcherMethod {
    public static void main(String[] args) {
        String content="hello edu jack tom hello smith hello hspedu hspedu";
        String regStr="hello";

        Pattern pattern = Pattern.compile(regStr);
        Matcher matcher = pattern.matcher(content);
        while (matcher.find()){
            System.out.println("=============================");
            System.out.println(matcher.start());
            System.out.println(matcher.end());
            System.out.println("找到: "+content.substring(matcher.start(),matcher.end()));
        }

        //整体匹配方法，常用于，去校验某个字符是否满足某个规则
        System.out.println("整体匹配 :"+matcher.matches());

        //完成如果content 有hspedu 替换成 韩顺平教育
        regStr="hspedu";
        pattern=Pattern.compile(regStr);
        matcher=pattern.matcher(content);
        //注意:返回的字符串才是替换后的字符串 原来的content不变化
        String newContent=matcher.replaceAll("韩顺平教育");
        System.out.println("newContent="+newContent);

    }
}

```

## 分组、捕获、反向引用

### 提出需求

请看下面问题:

给你一段文本，请你找出所有四个数字连在一起的子串，并且这四个数字要满足①第1位与第4位相同②第2位与第3位相同，比如1221,5775...

### 介绍

1. 分组

我们可以用圆括号组成一个比较复杂的匹配模式，那么一个圆括号的部分我们可以看作是一个子表达式/一个分组。

2. 捕获

把正则表达式中子表达式/分组匹配的内容，保存到内存中以数字编号或显式命名的组里，方便后面引用，从左向右，以分组的左括号为标志，第一个出现的分组的组号为1，第二个为2，以此类推。组0代表的是整个正则式

3. 反向引用

圆括号的内容被捕获后，可以在这个括号后被使用，从而写出一个比较实用的匹配模式，这个我们称为**反向引用**,这种引用既可以是在正则表达式内部，也可以是在正则表达式外部，内部反向引用**\\\分组号**，外部反向引用**$分组号**

### 案例

1. 要匹配两个连续的相同数字:(\\\d)\\\1
2. 要匹配五个连续的相同数字:(\\\d)\\\1{4}
3. 要匹配个位与千位相同，十位与百位相同5225,1551  (\\\d)(\\\d)\\\2\\\1

+ 思考题

请在字符串中检索商品编号.形式如:12321-333999111这样的号码,要求满足前面是一个五位数，然后一个-号,然后是一个九位数,连续的每三位要相同

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/17  23:15
 */
public class RegExp12 {
    public static void main(String[] args) {
//        String content="hello jack1441 tom11 jack22 yyy xxx";
        String content="12321-333999111";

//        要匹配两个连续的相同数字:(\\d)\\1
//        String regStr="(\\d)\\1";

        //要匹配五个连续的相同数字:(\\\d)\\\1{4}
//        String regStr="(\\\\\\d)\\\\\\1{4}";

        //要匹配个位与千位相同，十位与百位相同5225,1551  (\\d)(\\d)\\2\\1
//        String regStr="(\\d)(\\d)\\2\\1";

        /**
         * 请在字符串中检索商品编号.形式如:12321-333999111这样的号码,
         * 要求满足前面是一个五位数，然后一个-号,然后是一个九位数,连
         * 续的每三位要相同
         */

        String regStr="\\d{5}-(\\d)\\1{2}(\\d)\\2{2}(\\d)\\3{2}";
        Pattern pattern = Pattern.compile(regStr);
        Matcher matcher = pattern.matcher(content);

        while (matcher.find()){
            System.out.println("找到:"+matcher.group(0));
        }
    }
}

```

### 经典的结巴程序

把类似 : "我....我要....学学学学....编程 java!";

通过正则表达式 修改成 "我要学编程 java" RegExp13.java

```java
package com.regexp;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/17  23:28
 */
public class RegExp13 {
    public static void main(String[] args) {
        String content="我....我要....学学学学....编程 java!";

        //1.去掉所有的.

        Pattern pattern = Pattern.compile("\\.");
        Matcher matcher = pattern.matcher(content);

        content=matcher.replaceAll(""); //把.替换为

        //2.去掉重复的字
        //思路:
        //(1)使用(.)\\1+
        //(2)使用反向引用$1 来替换匹配到的内容

        //注意:因为正则表达式变化，所以需要重置
        pattern=Pattern.compile("(.)\\1+");//分组的捕获内容记录到$1
        matcher=pattern.matcher(content);
        while (matcher.find()){
            System.out.println("找到="+matcher.group(0));
        }

        //使用反向引用$1来替换匹配到的内容

        content=matcher.replaceAll("$1");
        System.out.println("content="+content);

        //3.使用一条语句 去掉重复的汉字

        content= Pattern.compile("(.)\\1+").matcher(content).replaceAll("$1");

        System.out.println(content);


    }
}

```

## String类中使用正则表达式

### 替换功能

String 类 public String replaceAll(String regex,String replacement)

### 判断功能

String 类 public boolean matches(String regex){}  //使用 Pattern 和 Matcher 类

### 分割功能

String 类 public String[] split(String regex)

```java
package com.regexp;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/17  23:46
 */
public class StringReg {
    public static void main(String[] args) {

        String content="2000 年 5 月，JDK1.3、JDK1.4 和 J2SE1.3 相继发布，几周后其" +
                "获得了 Apple 公司 Mac OS X 的工业标准的支持。2001 年 9 月 24 日，J2EE1.3 发布。" +
                "2002 年 2 月 26 日，J2SE1.4 发布。自此 Java 的计算能力有了";


        //使用正则表达式方式。将JDK1.3和JDK1.4替换成JDK
        content= content.replaceAll("JDK1\\.3|JDK1\\.4", "JDK");
        System.out.println(content);

        //要求 验证一个手机号 要求必须是138 139开头的

        content="13699998888";
        if(content.matches("1(38|39)\\d{8}")){
            System.out.println("验证成功");
        }else {
            System.out.println("验证失败");
        }

        //要求按照#或者 - 或者~ 或者数字来分割
        content= "hello#abc-jack12smith~北京";
        String[] split = content.split("#|-|~|\\d+");
        for (String s : split) {
            System.out.println(s);
        }

    }
}

```

## 本章作业

![18](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/18.png)

![19](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/java/images/RegExp/19.png)

```java
package com.regexp;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/17  23:57
 */
public class Homework01 {
    public static void main(String[] args) {


        //规定电子邮件规则为
        //只能有一个@
        //@前面是用户名，可以是a-z A-Z 0-9_-字符
        //@后面是域名，并且域名只能是英文单词，比如sohu.com或者tsinghua.org.cn
        //    写出对应的正则表达式，验证输入的字符串是否为满足规则

        String content = "frx@shu.com";
        String regStr = "^[\\w-]+@([a-zA-Z]+\\.)+[a-zA-Z]+$";

        //1.String的matcher是整体匹配
        //2.看看matches的底层
        /**
         * String的matches
         *  public boolean matches(String regex) {
         *         return Pattern.matches(regex, this);
         *     }
         *
         * Pattern
         *  public static boolean matches(String regex, CharSequence input) {
         *         Pattern p = Pattern.compile(regex);
         *         Matcher m = p.matcher(input);
         *         return m.matches();
         *     }
         *  Matcher类match
         *  整体匹配
         *  public boolean matches() {
         *         return match(from, ENDANCHOR);
         *     }
         */
        if (content.matches(regStr)){
            System.out.println("匹配成功");
        }else {
            System.out.println("匹配失败");
        }

    }

}

```

```java
package com.regexp;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/18  0:12
 */
public class Homework02 {
    public static void main(String[] args) {
        //要求验证是不是整数或者小数
        //提示: 这个题目考虑正数和负数
        //比如；123-345 34.89 -87.9 -0.01 0.45等

        /**
         * 思路
         * 1.先写出简单的正则表达式
         * 2.在逐步的完善[根据各种情况来完善]
         */
        String content="0.123";
        String regStr="[-+]?([1-9]\\d*|0)(\\.\\d+)?$";

        if(content.matches(regStr)){
            System.out.println("匹配成功 是整数或者小数");
        }else{
            System.out.println("匹配失败");
        }
    }
}

```

## java正则表达式参考

### 校验数字的表达式

- 数字：`^[0-9]*$`
- n位的数字：`^\d{n}$`
- 至少n位的数字：`^\d{n,}$`
- m-n位的数字：`^\d{m,n}$`
- 零和非零开头的数字：`^(0|[1-9][0-9]*)$`
- 非零开头的最多带两位小数的数字：`^([1-9][0-9]*)+(\.[0-9]{1,2})?$`
- 带1-2位小数的正数或负数：`^(\-)?\d+(\.\d{1,2})$`
- 正数、负数、和小数：`^(\-|\+)?\d+(\.\d+)?$`
- 有两位小数的正实数：`^[0-9]+(\.[0-9]{2})?$`
- 有1~3位小数的正实数：`^[0-9]+(\.[0-9]{1,3})?$`
- 非零的正整数：`^[1-9]\d*$ 或 ^([1-9][0-9]*){1,3}$` 或 `^\+?[1-9][0-9]*$`
- 非零的负整数：`^\-[1-9][]0-9"*$` 或 `^-[1-9]\d*$`
- 非负整数：`^\d+$` 或 `^[1-9]\d*|0$`
- 非正整数：`^-[1-9]\d*|0$` 或 `^((-\d+)|(0+))$`
- 非负浮点数：`^\d+(\.\d+)?$` 或 `^[1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0$`
- 非正浮点数：`^((-\d+(\.\d+)?)|(0+(\.0+)?))$` 或 `^(-([1-9]\d*\.\d*|0\.\d*[1-9]\d*))|0?\.0+|0$`
- 正浮点数：`^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$` 或 `^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.+ [0-9]+)|([0-9]*[1-9][0-9]*))$`
- 负浮点数：`^-([1-9]\d*\.\d*|0\.\d*[1-9]\d*)$` 或 `^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$`
- 浮点数：`^(-?\d+)(\.\d+)?$` 或 `^-?([1-9]\d*\.\d*|0\.\d*[1-9]\d*|0?\.0+|0)$`

### 校验字符的表达式

- 汉字：`^[\u4e00-\u9fa5]{0,}$`
- 英文和数字：`^[A-Za-z0-9]+$` 或 `^[A-Za-z0-9]{4,40}$`
- 长度为3-20的所有字符：`^.{3,20}$`
- 由26个英文字母组成的字符串：`^[A-Za-z]+$`
- 由26个大写英文字母组成的字符串：`^[A-Z]+$`
- 由26个小写英文字母组成的字符串：`^[a-z]+$`
- 由数字和26个英文字母组成的字符串：`^[A-Za-z0-9]+$`
- 由数字、26个英文字母或者下划线组成的字符串：`^\w+$ 或 ^\w{3,20}$`
- 中文、英文、数字包括下划线：`^[\u4E00-\u9FA5A-Za-z0-9_]+$`
- 中文、英文、数字但不包括下划线等符号：`^[\u4E00-\u9FA5A-Za-z0-9]+$` 或 `^[\u4E00-\u9FA5A-Za-z0-9]{2,20}$`
  - 可以输入含有\^%&',;=?$\"等字符：`[^%&',;=?$\x22]+`
  - 禁止输入含有\~的字符：`[^~\x22]+`

### 特殊需求表达式

- Email地址：`^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$`
- 域名：`[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?`
- InternetURL：`[a-zA-z]+://[^\s]*` 或 `^http://([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$`
- 手机号码：`^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$`
- 电话号码("XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX)：`^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$`
- 国内电话号码(0511-4405222、021-87888822)：`\d{3}-\d{8}|\d{4}-\d{7}`
- 电话号码正则表达式（支持手机号码，3-4位区号，7-8位直播号码，1－4位分机号）: `((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)`
- 身份证号(15位、18位数字)，最后一位是校验位，可能为数字或字符X：`(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)`
- 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)：`^[a-zA-Z][a-zA-Z0-9_]{4,15}$`
- 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：`^[a-zA-Z]\w{5,17}$`
- 强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)：`^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$`
- 强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间)：`^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$`
- 日期格式：`^\d{4}-\d{1,2}-\d{1,2}`
- 一年的12个月(01～09和1～12)：`^(0?[1-9]|1[0-2])$`
- 一个月的31天(01～09和1～31)：`^((0?[1-9])|((1|2)[0-9])|30|31)$`
- 钱的输入格式： 
  - 有四种钱的表示形式我们可以接受:"10000.00" 和 "10,000.00", 和没有 "分" 的 "10000" 和 "10,000"：`^[1-9][0-9]*$`
  - 这表示任意一个不以0开头的数字,但是,这也意味着一个字符"0"不通过,所以我们采用下面的形式：`^(0|[1-9][0-9]*)$`
  - 一个0或者一个不以0开头的数字.我们还可以允许开头有一个负号：`^(0|-?[1-9][0-9]*)$`
  - 这表示一个0或者一个可能为负的开头不为0的数字.让用户以0开头好了.把负号的也去掉,因为钱总不能是负的吧。下面我们要加的是说明可能的小数部分：`^[0-9]+(.[0-9]+)?$`
  - 必须说明的是,小数点后面至少应该有1位数,所以"10."是不通过的,但是 "10" 和 "10.2" 是通过的：`^[0-9]+(.[0-9]{2})?$`
  - 这样我们规定小数点后面必须有两位,如果你认为太苛刻了,可以这样：`^[0-9]+(.[0-9]{1,2})?$`
  - 这样就允许用户只写一位小数.下面我们该考虑数字中的逗号了,我们可以这样：`^[0-9]{1,3}(,[0-9]{3})*(.[0-9]{1,2})?$`
  - 1到3个数字,后面跟着任意个 逗号+3个数字,逗号成为可选,而不是必须：`^([0-9]+|[0-9]{1,3}(,[0-9]{3})*)(.[0-9]{1,2})?$`
  - 备注：这就是最终结果了,别忘了"+"可以用"*"替代如果你觉得空字符串也可以接受的话(奇怪,为什么?)最后,别忘了在用函数时去掉去掉那个反斜杠,一般的错误都在这里
- xml文件：`^([a-zA-Z]+-?)+[a-zA-Z0-9]+\\.[x|X][m|M][l|L]$`
- 中文字符的正则表达式：`[\u4e00-\u9fa5]`
- 双字节字符：`[^\x00-\xff]` (包括汉字在内，可以用来计算字符串的长度(一个双字节字符长度计2，ASCII字符计1))
- 空白行的正则表达式：`\n\s*\r` (可以用来删除空白行)
- HTML标记的正则表达式：`<(\S*?)[^>]*>.*?|<.*? />` ( 首尾空白字符的正则表达式：`^\s*|\s*$`或`(^\s*)|(\s*$)` (可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)，非常有用的表达式)
- 腾讯QQ号：`[1-9][0-9]{4,}` (腾讯QQ号从10000开始)
- 中国邮政编码：`[1-9]\d{5}(?!\d)` (中国邮政编码为6位数字)
- IP地址：`\d+\.\d+\.\d+\.\d+`(提取IP地址时有用)

## 资源

- [Cyrilex](https://extendsclass.com/regex-tester.html#java) - 一个在线工具，用于测试、调试和可视化正则表达式。
