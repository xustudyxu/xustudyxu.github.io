---
title: Java 枚举和注解
date: 2021-12-20 18:44:12
permalink: /pages/d8cd4d/
categories:
  - java
tags:
  - java
---
# Java 枚举和注解

## 先看一个需求

```java
package com.study.study13enum_;

public class Enumeration01 {
    public static void main(String[] args) {
        //使用
        Season spring = new Season("春天", "温暖");
        Season summer = new Season("夏天","炎热");
        Season autumn = new Season("秋天","凉爽");
        Season winter = new Season("冬天","寒冷");
        //因为对于季节而言，她的对象是具体的 固定的 不会有更多
        //不能体现季节是固定的  引出枚举类


    }
}
class Season{
    private String name;
    private String desc;//描述

    public Season(String name, String desc) {
        this.name = name;
        this.desc = desc;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }
}
```

## 分析问题

### 创建 Season 对象有如下特点

1. 季节的值是有限的几个值(spring, summer, autumn, winter)
2. 只读，不需要修改。

## 解决方案-枚举

1. <font color=#FF1493 size=4>枚举对应英文(enumeration, 简写 enum)</font>
2. <font color=#FF1493 size=4>枚举是一组常量的集合。</font>
3. <font color=#FF1493 size=4>可以这里理解：枚举属于一种特殊的类，里面只包含一组有限的特定的对象。</font>

## 枚举的二种实现方式

1. <font color=#FF1493 size=4>自定义类实现枚举</font>
2. <font color=#FF1493 size=4>使用 enum 关键字实现枚举 </font>

## 自定义类实现枚举-应用案例

1. <font color=#FF1493 size=4>不需要提供setXxx方法,因为枚举对象值通常为只读.</font>
2. <font color=#FF1493 size=4>对枚举对象/属性使用 final + static共同修饰,实现底层优化.</font>
3. <font color=#FF1493 size=4>枚举对象名通常使用全部大写，常量的命名规范.</font>
4. <font color=#FF1493 size=4>枚举对象根据需要,也可以有多个属性</font>

+ 代码演示：

```java
package com.study.study13enum_;

public class Enumeration02 {
    public static void main(String[] args) {
        System.out.println(Season1.AUTUMN);
        System.out.println(Season1.SPRING);
    }


}
//演示定义枚举实现
class Season1 {
    private String name;
    private String desc;//描述
    //1.将构造器私有化 目的 防止直接new
    //2.去掉set方法 防止属性被修改
    //3.在Season内部，直接创建固定的属性
    //4.可以加入final 修饰符
    public static final Season1 SPRING =new Season1("春天", "温暖");
    public static final Season1 SUMMER =new Season1("夏天", "炎热");
    public static final Season1 AUTUMN =new Season1("秋天", "凉爽");
    public static final Season1 WINTER =new Season1("冬天", "寒冷");

    private Season1(String name, String desc) {
        this.name = name;
        this.desc = desc;
    }

    @Override
    public String toString() {
        return "Season1{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }



    public String getDesc() {
        return desc;
    }

}
```

## 自定义类实现枚举-小结

### 小结：进行自定义类实现枚举，有如下特点：

1. <font color=#FF1493 size=4>构造器私有化 </font>
2. <font color=#FF1493 size=4>本类内部创建一组对象[四个 春夏秋冬]</font>
3. <font color=#FF1493 size=4>对外暴露对象（通过为对象添加 public final static 修饰符）</font>
4. <font color=#FF1493 size=4>可以提供 get 方法，但是不要提供 set</font>

## enum 关键字实现枚举-快速入门 

### 说明

```java
package com.study.study13enum_;

public class Enumeration03 {
    public static void main(String[] args) {
        System.out.println(Season2.SPRING);
        System.out.println(Season2.AUTUMN);
        System.out.println(Season2.SUMMER);
        System.out.println(Season2.WINTER);
    }
}
enum Season2{
    //1.使用枚举类 用enum来代替 class
    //2.SPRING("春天", "温暖");  常量名（实参列表）
    //3.如果有多个常量（对象），是用逗号间隔 即可
    //4.如果使用enum来实现枚举，要求将定义对象，写在前面
    //5.如果使用无参构造器，创建常量对象，则可以省略()
    WINTER("冬天", "寒冷"),
    SUMMER("夏天", "炎热"),
    SPRING("春天", "温暖"),
    WHAT,
    AUTUMN("秋天", "凉爽");
    private String name;
    private String desc;//描述
    //


    private Season2() {
    }

    private Season2(String name, String desc) {
        this.name = name;
        this.desc = desc;
    }

    @Override
    public String toString() {
        return "Season1{" +
                "name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }



    public String getDesc() {
        return desc;
    }

}
```

### enum 关键字实现枚举注意事项

1. <font color=#FF1493 size=4>当我们使用 enum 关键字开发一个枚举类时，默认会继承 Enum 类, 而且是一个 final 类</font>
2. <font color=#FF1493 size=4>传统的 public static final Season2 SPRING = new Season2("春天", "温暖"); 简化成 SPRING("春天", "温暖")， 这里必 须知道，它调用的是哪个构造器</font>
3. <font color=#FF1493 size=4>如果使用无参构造器 创建 枚举对象，则实参列表和小括号都可以省略</font>
4. <font color=#FF1493 size=4>当有多个枚举对象时，使用,间隔，最后有一个分号结尾</font>
5. <font color=#FF1493 size=4>枚举对象必须放在枚举类的行首.</font>

## enum 常用方法应用实例 

1. **toString:Enum 类已经重写过了，返回的是当前对象名,子类可以重写该方法，用于返回对象的属性信息**
2. **name：返回当前对象名（常量名），子类中不能重写**
3. **ordinal：返回当前对象的位置号，默认从 0 开始** 
4. **values：返回当前枚举类中所有的常量**
5. **valueOf：将字符串转换成枚举对象，要求字符串必须 为已有的常量名，否则报异常!**
6. **compareTo：比较两个枚举常量，比较的就是编号!**

+ 代码演示：

```java
package com.study.study13enum_;

import com.study.study13enum_.Season2;

public class EnumMethod {
    public static void main(String[] args) {
        //使用Season2枚举类，来演示各种方法
        Season2 autumn=Season2.AUTUMN;
        //输出枚举对象的名字
        System.out.println(autumn.name());
        //ordinal()输出对象的编号 从零开始
        //AUTUMN 枚举对象是第五个 所以输出4
        System.out.println(autumn.ordinal());
        //从反编译可以看出 values方法，返回Season2[]
        //含有定义的所有枚举对象
        Season2 values[]=Season2.values();
        System.out.println("=======遍历取出枚举对象=======");
        for(Season2 season:values){//增强for循环
            System.out.println(season);
        }
        //valueOf:将字符串转化成枚举对象，要求字符串必须为已有的常量名，否则报异常
        //执行流程
        //1.根据你输入的：“AUTUMN”到Season2的枚举对象去查找
        //2.如果找到了，就返回，如果没有 就报错
        Season2 autumn1=Season2.valueOf("AUTUMN");
        System.out.println("autumn1="+autumn1);
        System.out.println(autumn==autumn1);
        //compareTo:比较两个枚举常量，比较的是编写
        //1.就是把Season.AUTUMN 枚举对象的编号和Season.SUMMER 枚举对象的编号进行比较
        System.out.println(Season2.AUTUMN.compareTo(Season2.SUMMER));

//
//        int nums[]={1,2,9};
//        //普通for循环
//        System.out.println("=======普通for循环==========");
//        for (int i = 0; i < nums.length; i++) {
//            System.out.println(nums[i]);
//        }
//        System.out.println("========增强for循环==========");
//        for(int i:nums){//执行流程 依次从nums数组中 取出数据 取出完毕 退出增强for循环
//            System.out.println("i="+i);
//
//        }
    }
}

```

```java
package com.study.study13enum_;

public class EnumExercise02 {
    public static void main(String[] args) {
        Week weeks[]=Week.values();
        for(Week week:weeks){
            System.out.println(week);

        }


    }
}
enum Week{
    Monday("星期一"),
    Tuesday("星期二"),
    WEDNESDAY("星期三"),
    THURSDAY("星期四"),
    FRIDAY("星期五"),
    SATURDAY("星期六"),
    SUNDAY("星期天");


    private String name;

    private Week(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
```

## enum 实现接口

1. <font color=#FF1493 size=4>使用 enum 关键字后，就不能再继承其它类了，因为 enum 会隐式继承 Enum，而 Java 是单继承机制。</font>
2. <font color=#FF1493 size=4>枚举类和普通类一样，可以实现接口，如下形式。 enum 类名 implements 接口 1，接口 2{}</font>

+ 代码演示：

```java
package com.study.study13enum_;

public class EnumDetail {
    public static void main(String[] args) {
        Season3.ClassicMusic.play();

    }
}
enum Season3 implements IPlaying{
   ClassicMusic;

    @Override
    public void play() {
        System.out.println("播放好听的音乐");
    }
}
interface IPlaying{
    public void play();


}
```

## 注解的理解

1. <font color=#FF1493 size=4>注解(Annotation)也被称为元数据(Metadata)，用于修饰解释 包、类、方法、属性、构造器、局部变量等数据信息。</font>
2. <font color=#FF1493 size=4>和注释一样，注解不影响程序逻辑，但注解可以被编译或运行，相当于嵌入在代码中的补充信息。</font>
3. <font color=#FF1493 size=4>在 JavaSE 中，注解的使用目的比较简单，例如标记过时的功能，忽略警告等。在 JavaEE 中注解占据了更重要的角 色，例如用来配置应用程序的任何切面，代替 java EE 旧版中所遗留的繁冗代码和 XML 配置等。</font> 

## 基本的 Annotation 介绍 

使用 Annotation 时要在其前面增加 @ 符号, 并把该 Annotation 当成一个修饰符使用。用于修饰它支持的程序元 

素 .

+ 三个基本的 Annotation:

1. @Override: 限定某个方法，是重写父类方法, 该注解只能用于方法
2. @Deprecated: 用于表示某个程序元素(类, 方法等)已过时
3. @SuppressWarnings: 抑制编译器警告

## 基本的 Annotation 应用案例

### @Override 注解的案例

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/11/01.png)

+ 代码演示：

```java
package com.study.study14annotation_;

public class Override_ {
    public static void main(String[] args) {

    }
}
class Father{
    public void fly(){
        System.out.println("Father...");
    }
}
class Son extends Father{
    @Override
    //1. @Override注解放在fly方法上，表示子类重写了父类的fly()方法
    //2.如果没有写@Override注解，还是会重写
    //3.如果写了Override 注解，编译器就回去检查方法是否真的重写了父类的方法
    //如果的确重写 编译通过 如果没有构成重写 则编译错误
    //4.Override的定义
    //如果发现 @interface 表示一个注解类
    /*
     * @Target(ElementType.METHOD)  //@Target修饰注解的注解 称为源注解
     * @Retention(RetentionPolicy.SOURCE)
     * public @interface Override {
     * }
     */
    public void fly() {
        System.out.println("Son...");
    }
}
```

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/11/02.png)

### @Deprecated 注解的案例

+ 代码演示：

```java
package com.study.study14annotation_;


public class Deprecated_ {
    public static void main(String[] args) {
        A a = new A();
        a.hi();
        System.out.println(a.n1);

    }
}
//1.Deprecated 修饰某个元素，表示该元素已经过时
//2.即不再推荐使用，但是仍然可以使用
//3.查看 @Deprecated 注解类的源码
//4.可以修饰方法，类，字段，包，参数 等等
//5.@Deprecated可以做版本升级 过渡使用
/*
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target(value={CONSTRUCTOR, FIELD, LOCAL_VARIABLE, METHOD, PACKAGE, PARAMETER, TYPE})
public @interface Deprecated {
}

 */
@Deprecated
class A{
    @Deprecated
    public int n1=10;
    @Deprecated
    public void hi(){

    }
}

```

### @SuppressWarnings 注解的案例

+ 代码演示：

```java
package com.study.study14annotation_;


import java.util.ArrayList;
import java.util.List;

@SuppressWarnings({"all"})
public class SuppressWarnings_ {
    //1.当我们不希望看到这些警告的时候，可以使用SuppressWarnings注解来抑制警告信息
    //2.在{""}中，可以写入你希望抑制（不显示）警告信息
    //3.all
    //4关于SuppressWarnings作用范围是和你放置的位置相关
    //  比如@SuppressWarnings放置在main 方法，那么抑制警告的范围就是 main
    //通常我们可以放置具体的语句，方法，类
    //5.源码
   /* @Target({TYPE, FIELD, METHOD, PARAMETER, CONSTRUCTOR, LOCAL_VARIABLE})//放置的位置
    @Retention(RetentionPolicy.SOURCE)
    public @interface SuppressWarnings {
        String[] value(); //该注解类有数组
    }*/

    @SuppressWarnings({"all"})
    public static void main(String[] args) {
        List list=new ArrayList();
        list.add("");
        list.add("");
        list.add("");
        int i;
        System.out.println(list.get(1));

    }
}

```

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/11/03.png)

## JDK 的元 Annotation

### 元注解的基本介绍

JDK 的元 Annotation 用于修饰其他 Annotation

### 元注解的种类

1. Retention //指定注解的作用范围，三种 SOURCE,CLASS,RUNTIME 
2. Target // 指定注解可以在哪些地方使用 
3. Documented //指定该注解是否会在 javadoc 体现 
4. Inherited //子类会继承父类注解 

