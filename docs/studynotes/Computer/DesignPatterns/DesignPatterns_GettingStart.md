---
title: 设计模式入门
date: 2023-12-30 23:22:14
permalink: /pages/57297b/
categories:
  - 设计模式
tags:
  - 设计模式
---
# 设计模式入门

[学习视频地址](https://www.bilibili.com/video/BV1Np4y1z7BU?p=1&vd_source=6aafd031757cd8c1dbbb98344fb3d363)

[[toc]]

## 设计模式概述

###  软件设计模式的产生背景

"设计模式"最初并不是出现在软件设计中，而是被用于建筑领域的设计中。

1977年美国著名建筑大师、加利福尼亚大学伯克利分校环境结构中心主任`克里斯托夫·亚历山大（Christopher Alexander）`在他的著作《建筑模式语言：城镇、建筑、构造》中描述了一些常见的建筑设计问题，并提出了 253 种关于对城镇、邻里、住宅、花园和房间等进行设计的基本模式。

1990年软件工程界开始研讨设计模式的话题，后来召开了多次关于设计模式的研讨会。直到1995 年，艾瑞克·伽马（ErichGamma）、理査德·海尔姆（Richard Helm）、拉尔夫·约翰森（Ralph Johnson）、约翰·威利斯迪斯（John Vlissides）等 4 位作者合作出版了《设计模式：可复用面向对象软件的基础》一书，在此书中收录了 23 个设计模式，这是设计模式领域里程碑的事件，导致了软件设计模式的突破。这 4 位作者在软件开发领域里也以他们的“四人组”（Gang of Four，GoF）著称。  

### 软件设计模式的概念

软件设计模式（Software Design Pattern），又称设计模式，是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。它描述了在软件设计过程中的一些不断重复发生的问题，以及该问题的解决方案。也就是说，它是解决特定问题的一系列套路，是前辈们的代码设计经验的总结，具有一定的普遍性，可以反复使用。

### 学习设计模式的必要性

设计模式的本质是面向对象设计原则的实际运用，是对类的封装性、继承性和多态性以及类的关联关系和组合关系的充分理解。

正确使用设计模式具有以下优点。

- 可以提高程序员的思维能力、编程能力和设计能力。
- 使程序设计更加标准化、代码编制更加工程化，使软件开发效率大大提高，从而缩短软件的开发周期。
- 使设计的代码可重用性高、可读性强、可靠性高、灵活性好、可维护性强。

### 设计模式分类

- **创建型模式**

  用于描述“怎样创建对象”，它的主要特点是“将对象的创建与使用分离”。GoF（四人组）书中提供了单例、原型、工厂方法、抽象工厂、建造者等 5 种创建型模式。

- **结构型模式**

  用于描述如何将类或对象按某种布局组成更大的结构，GoF（四人组）书中提供了代理、适配器、桥接、装饰、外观、享元、组合等 7 种结构型模式。

- **行为型模式**

  用于描述类或对象之间怎样相互协作共同完成单个对象无法单独完成的任务，以及怎样分配职责。GoF（四人组）书中提供了模板方法、策略、命令、职责链、状态、观察者、中介者、迭代器、访问者、备忘录、解释器等 11 种行为型模式。

## UML 图

统一建模语言（Unified Modeling Language，UML）是用来设计软件的可视化建模语言。它的特点是简单、统一、图形化、能表达软件设计中的动态与静态信息。

UML 从目标系统的不同角度出发，定义了用例图、类图、对象图、状态图、活动图、时序图、协作图、构件图、部署图等 9 种图。

###  类图概述

类图(Class diagram)是显示了模型的静态结构，特别是模型中存在的类、类的内部结构以及它们与其他类的关系等。类图不显示暂时性的信息。类图是面向对象建模的主要组成部分。

###  类图的作用

- 在软件工程中，类图是一种静态的结构图，描述了系统的类的集合，类的属性和类之间的关系，可以简化了人们对系统的理解；
- 类图是系统分析和设计阶段的重要产物，是系统编码和测试的重要模型。

### 类图表示法

#### 类的表示方式

在 UML 类图中，类使用包含类名、属性(field) 和方法(method) 且带有分割线的矩形来表示，比如下图表示一个Employee类，它包含 name,age 和 address 这3个属性，以及work()方法。 

![Employee](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/Employee.2qm8gfjo6o40.jpg)

属性/方法名称前加的加号和减号表示了这个属性/方法的可见性，UML类图中表示可见性的符号有三种：

- `+`：表示 `public`
- `-`：表示 `private`
- `#`：表示 `protected`

属性的完整表示方式是： **可见性  名称 ：类型 [ = 缺省值]**  

方法的完整表示方式是： **可见性  名称(参数列表) [ ： 返回类型]**

> 注意：
>
> ​	1，中括号中的内容表示是可选的
>
> ​	2，也有将类型放在变量名前面，返回值类型放在方法名前面

**举个栗子：**

![demo](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/demo.7j2ooqq63ag0.png)

上图Demo类定义了三个方法：

- method()方法：修饰符为public，没有参数，没有返回值。
- method1()方法：修饰符为private，没有参数，返回值类型为String。
- method2()方法：修饰符为protected，接收两个参数，第一个参数类型为int，第二个参数类型为String，返回值类型是int。

#### 类与类之间关系的表示方式

##### 关联关系

关联关系是对象之间的一种引用关系，用于表示一类对象与另一类对象之间的联系，如老师和学生、师傅和徒弟、丈夫和妻子等。关联关系是类与类之间最常用的一种关系，分为一般关联关系、聚合关系和组合关系。我们先介绍一般关联。

关联又可以分为单向关联，双向关联，自关联。

1. **单向关联**

![customer_address](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/customer_address.3esgjv1keuw0.webp)

在UML类图中单向关联用一个带箭头的实线表示。上图表示每个顾客都有一个地址，这通过让Customer类持有一个类型为Address的成员变量类实现。

2. **双向关联**

![customer_product](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/customer_product.b68px5fzlvc.webp)

从上图中我们很容易看出，所谓的双向关联就是双方各自持有对方类型的成员变量。

在UML类图中，双向关联用一个不带箭头的直线表示。上图中在Customer类中维护一个List\<Product>，表示一个顾客可以购买多个商品；在Product类中维护一个Customer类型的成员变量表示这个产品被哪个顾客所购买。

3. **自关联**

![node](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/node.4a0165cvkk00.webp)

自关联在UML类图中用一个带有箭头且指向自身的线表示。上图的意思就是Node类包含类型为Node的成员变量，也就是“自己包含自己”

##### **聚合关系**

聚合关系是关联关系的一种，是强关联关系，是整体和部分之间的关系。

聚合关系也是通过成员对象来实现的，其中成员对象是整体对象的一部分，但是成员对象可以脱离整体对象而独立存在。例如，学校与老师的关系，学校包含老师，但如果学校停办了，老师依然存在。

在 UML 类图中，聚合关系可以用带空心菱形的实线来表示，菱形指向整体。下图所示是大学和教师的关系图：

![image-20191229173422328](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/image-20191229173422328.30dulf2ybho0.webp)

##### 组合关系

组合表示类之间的整体与部分的关系，但它是一种更强烈的聚合关系。

在组合关系中，整体对象可以控制部分对象的生命周期，一旦整体对象不存在，部分对象也将不存在，部分对象不能脱离整体对象而存在。例如，头和嘴的关系，没有了头，嘴也就不存在了。

在 UML 类图中，组合关系用带实心菱形的实线来表示，菱形指向整体。下图所示是头和嘴的关系图：

![image-20191229173455149](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/image-20191229173455149.2sasg6juxfq0.webp)

##### 依赖关系

依赖关系是一种使用关系，它是对象之间耦合度最弱的一种关联方式，是临时性的关联。在代码中，某个类的方法通过局部变量、方法的参数或者对静态方法的调用来访问另一个类（被依赖类）中的某些方法来完成一些职责。

在 UML 类图中，依赖关系使用带箭头的虚线来表示，箭头从使用类指向被依赖的类。下图所示是司机和汽车的关系图，司机驾驶汽车：

![image-20191229173518926](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/image-20191229173518926.2yatj3eoy5i0.webp)

##### 继承关系

继承关系是对象之间耦合度最大的一种关系，表示一般与特殊的关系，是父类与子类之间的关系，是一种继承关系。

在 UML 类图中，泛化关系用带空心三角箭头的实线来表示，箭头从子类指向父类。在代码实现时，使用面向对象的继承机制来实现泛化关系。例如，Student 类和 Teacher 类都是 Person 类的子类，其类图如下图所示：

![image-20191229173539838](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/image-20191229173539838.3ltbco6pcoq0.webp)

##### 实现关系

实现关系是接口与实现类之间的关系。在这种关系中，类实现了接口，类中的操作实现了接口中所声明的所有的抽象操作。

在 UML 类图中，实现关系使用带空心三角箭头的虚线来表示，箭头从实现类指向接口。例如，汽车和船实现了交通工具，其类图如图 9 所示。

![image-20191229173554296](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/image-20191229173554296.49wvqne4l6e0.webp)

## 软件设计原则

### 开闭原则

对扩展开放，对修改关闭**。在程序需要进行拓展的时候，不能去修改原有的代码，实现一个热插拔的效果。简言之，是为了使程序的扩展性好，易于维护和升级。

想要达到这样的效果，我们需要使用接口和抽象类。

因为抽象灵活性好，适应性广，只要抽象的合理，可以基本保持软件架构的稳定。而软件中易变的细节可以从抽象派生来的实现类来进行扩展，当软件需要发生变化时，只需要根据需求重新派生一个实现类来扩展就可以了。

下面 搜狗输入法的皮肤为例介绍开闭原则的应用。

【例】搜狗输入法 的皮肤设计。

分析：`搜狗输入法` 的皮肤是输入法背景图片、窗口颜色和声音等元素的组合。用户可以根据自己的喜爱更换自己的输入法的皮肤，也可以从网上下载新的皮肤。这些皮肤有共同的特点，可以为其定义一个抽象类（`AbstractSkin`），而每个具体的皮肤（`DefaultSpecificSkin` 和`HeimaSpecificSkin`）是其子类。用户窗体可以根据需要选择或者增加新的主题，而不需要修改原代码，所以它是满足开闭原则的。

![open-close](https://cdn.jsdmirror.com//gh/xustudyxu/image-hosting1@master/20230218/open-close.4v17y1nvbo60.webp)

### 里氏代换原则

里氏代换原则是面向对象设计的基本原则之一。

里氏代换原则：任何基类可以出现的地方，子类一定可以出现。通俗理解：子类可以扩展父类的功能，但不能改变父类原有的功能。换句话说，子类继承父类时，除添加新的方法完成新增功能外，尽量不要重写父类的方法。

如果通过重写父类的方法来完成新的功能，这样写起来虽然简单，但是整个继承体系的可复用性会比较差，特别是运用多态比较频繁时，程序运行出错的概率会非常大。

下面看一个里氏替换原则中经典的一个例子

【例】正方形不是长方形。

![正方形不是长方形](https://cdn.jsdmirror.com//gh/xustudyxu/picx-images-hosting@master/20231230/正方形不是长方形.3x1lwobrr5o0.webp)

在数学领域里，正方形毫无疑问是长方形，它是一个长宽相等的长方形。所以，我们开发的一个与几何图形相关的软件系统，就可以顺理成章的让正方形继承自长方形。

代码如下：

**长方形类（Rectangle）：**

```java
/**
 * @author frx
 * @date 2023-12-23 15:37
 * @desc 长方形类
 */
@Data
public class Rectangle {
    public double length;
    public double width;
}
```

**正方形（Square）：**

由于正方形的长和宽相同，所以在方法setLength和setWidth中，对长度和宽度都需要赋相同值。

```java
/**
 * @author frx
 * @date 2023-12-23 15:39
 * @desc 正方形
 */
public class Square extends Rectangle {
    @Override
    public void setLength(double length) {
        super.setLength(length);
        super.setWidth(length);
    }

    @Override
    public void setWidth(double width) {
        super.setLength(length);
        super.setWidth(length);
    }
}
```

类RectangleDemo是我们的软件系统中的一个组件，它有一个resize方法依赖基类Rectangle，resize方法是RectandleDemo类中的一个方法，用来实现宽度逐渐增长的效果。


```java
/**
 * @author frx
 * @date 2023-12-23 15:41
 * @desc
 */
public class RectangleDemo {
    public static void main(String[] args) {

        Rectangle rectangle = new Rectangle();
        //设置长和宽
        rectangle.setLength(20);
        rectangle.setWidth(10);
        //调用扩宽
        resize(rectangle);
        printLengthAndWidth(rectangle);
        System.out.println("====================================");
        Rectangle square = new Square();
        square.setLength(10);
        resize(rectangle);
        printLengthAndWidth(rectangle);

    }

    //扩宽
    public static void resize(Rectangle rectangle) {
        //判断宽如果比长小，进行扩宽的操作
        while (rectangle.getWidth() <= rectangle.getLength()) {
            rectangle.setWidth(rectangle.getWidth() + 1);
        }
    }

    //打印长和宽
    public static void printLengthAndWidth(Rectangle rectangle) {
        System.out.println(rectangle.getLength());
        System.out.println(rectangle.getWidth());
    }
}
```

我们运行一下这段代码就会发现，假如我们把一个普通长方形作为参数传入resize方法，就会看到长方形宽度逐渐增长的效果，当宽度大于长度,代码就会停止，这种行为的结果符合我们的预期；假如我们再把一个正方形作为参数传入resize方法后，就会看到正方形的宽度和长度都在不断增长，代码会一直运行下去，直至系统产生溢出错误。所以，普通的长方形是适合这段代码的，正方形不适合。
我们得出结论：在resize方法中，Rectangle类型的参数是不能被Square类型的参数所代替，如果进行了替换就得不到预期结果。因此，Square类和Rectangle类之间的继承关系违反了里氏代换原则，它们之间的继承关系不成立，正方形不是长方形。

如何改进呢？此时我们需要重新设计他们之间的关系。抽象出来一个四边形接口(Quadrilateral)，让Rectangle类和Square类实现Quadrilateral接口

![正方形不是长方形改进](https://cdn.jsdmirror.com//gh/xustudyxu/picx-images-hosting@master/20231230/正方形不是长方形改进.2exauh7vwizo.webp)

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @date 2023-12-23 17:52
 * @desc 四边形接口
 */
public interface Quadrilateral {

    //获取长
    double getLength();

    //获取宽
    double getWidth();
}
```

```java
/**
 * @author frx
 * @date 2023-12-23 17:59
 * @desc 长方形类
 */
@Setter
public class Rectangle implements Quadrilateral{

    private double length;

    private double width;
    @Override
    public double getLength() {
        return length;
    }

    @Override
    public double getWidth() {
        return width;
    }
}
```

```java
/**
 * @author frx
 * @date 2023-12-23 17:54
 * @desc 正方形
 */
@Data
public class Square implements Quadrilateral{

    private double side;


    @Override
    public double getLength() {
        return side;
    }

    @Override
    public double getWidth() {
        return side;
    }
}
```

```java
/**
 * @author frx
 * @date 2023-12-23 18:01
 * @desc
 */
public class RectangleDemo {
    public static void main(String[] args) {
        //创建长方形对象
        Rectangle rectangle = new Rectangle();
        rectangle.setLength(20);
        rectangle.setWidth(10);
        //扩宽
        resize(rectangle);
        printLengthAndWidth(rectangle);


    }
    //扩宽的方法
    public static void resize(Rectangle rectangle) {
        //判断宽如果比长小，进行扩宽的操作
        while (rectangle.getWidth() <= rectangle.getLength()) {
            rectangle.setWidth(rectangle.getWidth() + 1);
        }
    }

    //打印长和宽
    public static void printLengthAndWidth(Quadrilateral quadrilateral) {
        System.out.println(quadrilateral.getLength());
        System.out.println(quadrilateral.getWidth());
    }
}
```

:::

### 依赖倒转原则

高层模块不应该依赖低层模块，两者都应该依赖其抽象；抽象不应该依赖细节，细节应该依赖抽象。简单的说就是要求对抽象进行编程，不要对实现进行编程，这样就降低了客户与实现模块间的耦合。

下面看一个例子来理解依赖倒转原则

【例】组装电脑

现要组装一台电脑，需要配件cpu，硬盘，内存条。只有这些配置都有了，计算机才能正常的运行。选择cpu有很多选择，如Intel，AMD等，硬盘可以选择希捷，西数等，内存条可以选择金士顿，海盗船等。

**类图如下：**

![依赖倒转原则](https://cdn.jsdmirror.com//gh/xustudyxu/picx-images-hosting@master/20231230/依赖倒转原则.6t9z1dgbpy40.webp)

代码如下：

**希捷硬盘类（XiJieHardDisk）:**

```java
/**
 * @author frx
 * @date 2023-12-23 19:12
 * @desc 希捷硬盘
 */
public class XiJieHardDisk {

    //存储数据的方法
    public void save(String data) {
        System.out.println("使用希捷硬盘存储数据为：" + data);
    }

    public String get() {
        System.out.println("使用希捷硬盘读取数据");
        return "数据";
    }
}
```

**Intel处理器（IntelCpu）：**

```java
/**
 * @author frx
 * @date 2023-12-30 15:35
 * @desc Intel Cpu
 */
public class IntelCpu {

    public void run() {
        System.out.println("使用 Intel 处理器.....");
    }
}
```

**金士顿内存条（KingstonMemory）：**

```java
/**
 * @author frx
 * @date 2023-12-30 15:39
 * @desc 金士顿内存条
 */
public class KingstonMemory {

    public void save() {
        System.out.println("使用金士顿内存条...");
    }
}
```

**电脑（Computer）：**

```java
/**
 * @author frx
 * @date 2023-12-30 15:41
 * @desc
 */
@Data
public class Computer {

    private XiJieHardDisk hardDisk;

    private IntelCpu cpu;

    private KingstonMemory memory;

    public void run() {
        System.out.println("运行计算机");
        String data = hardDisk.get();
        System.out.println("从硬盘上获取的数据是：" + data);
        cpu.run();
        memory.save();
    }

}
```

**测试类（TestComputer）：**

测试类用来组装电脑。

```java
/**
 * @author frx
 * @date 2023-12-30 15:43
 * @desc
 */
public class ComputerDemo {

    public static void main(String[] args) {

        //创建组件对象
        XiJieHardDisk hardDisk = new XiJieHardDisk();
        IntelCpu intelCpu = new IntelCpu();
        KingstonMemory memory = new KingstonMemory();

        //创建计算机对象
        Computer computer = new Computer();
        //组装计算机
        computer.setCpu(intelCpu);
        computer.setHardDisk(hardDisk);
        computer.setMemory(memory);

        computer.run();

    }
}
```

+ 结果

```java
运行计算机
使用希捷硬盘读取数据
从硬盘上获取的数据是：数据
使用 Intel 处理器.....
使用金士顿内存条...

Process finished with exit code 0
```

上面代码可以看到已经组装了一台电脑，但是似乎组装的电脑的cpu只能是Intel的，内存条只能是金士顿的，硬盘只能是希捷的，这对用户肯定是不友好的，用户有了机箱肯定是想按照自己的喜好，选择自己喜欢的配件。

根据依赖倒转原则进行改进：

代码我们只需要修改Computer类，让Computer类依赖抽象（各个配件的接口），而不是依赖于各个组件具体的实现类。

**类图如下：**

![依赖倒转原则改进](https://cdn.jsdmirror.com//gh/xustudyxu/picx-images-hosting@master/20231230/依赖倒转原则改进.9kn2gsuc6qg.webp)

**硬盘接口：**

```java
/**
 * @author frx
 * @date 2023-12-30 16:01
 * @desc
 */
public interface HardDisk {

    //存储数据
    void save(String data);

    //获取数据
    String get();
}
```

+ 希捷硬盘实现这个接口

```java {1}
public class XiJieHardDisk implements HardDisk{
}
```

**Cpu 接口：**

```java
/**
 * @author frx
 * @date 2023-12-30 16:08
 * @desc Cpu接口
 */
public interface Cpu {
    public void run();
}
```

+ IntelCpu 实现这个接口

```java {1}
public class IntelCpu implements Cpu {
}
```

**内存条接口：**

```java
/**
 * @author frx
 * @date 2023-12-30 16:09
 * @desc
 */
public interface Memory {

    public void save();
}
```

+ 金士顿内存条实现这个接口

```java {1}
public class KingstonMemory implements Memory {
}
```

 **电脑（Computer）：**

```java
/**
 * @author frx
 * @date 2023-12-30 16:10
 * @desc
 */
@Data
public class Computer {

    private HardDisk hardDisk;
    private Cpu cpu;
    private Memory memory;

    //运行计算机
    public void run() {
        System.out.println("运行计算机");
        String data = hardDisk.get();
        System.out.println("从硬盘上获取的数据是：" + data);
        cpu.run();
        memory.save();
    }
}
```

**测试类（TestComputer）：**

测试类用来组装电脑。

```java
/**
 * @author frx
 * @date 2023-12-30 16:11
 * @desc
 */
public class ComputerDemo {
    public static void main(String[] args) {

        //创建计算机的组件对象
        HardDisk hardDisk = new XiJieHardDisk();
        Cpu intelCpu = new IntelCpu();
        KingstonMemory kingstonMemory = new KingstonMemory();

        //计算机对象
        Computer computer = new Computer();
        computer.setHardDisk(hardDisk);
        computer.setCpu(intelCpu);
        computer.setMemory(kingstonMemory);

        //运行计算机
        computer.run();
    }
}
```

+ 结果

```java
运行计算机
使用希捷硬盘读取数据
从硬盘上获取的数据是：数据
使用 Intel 处理器.....
使用金士顿内存条...

Process finished with exit code 0
```

### 接口隔离原则

客户端不应该被迫依赖于它不使用的方法；一个类对另一个类的依赖应该建立在最小的接口上。

下面看一个例子来理解接口隔离原则

【例】安全门案例

我们需要创建一个<mark>某马</mark>品牌的安全门，该安全门具有防火、防水、防盗的功能。可以将防火，防水，防盗功能提取成一个接口，形成一套规范。类图如下：

![接口隔离原则](https://cdn.jsdmirror.com//gh/xustudyxu/picx-images-hosting@master/20231230/接口隔离原则.74nz6pdn1a80.webp)

上面的设计我们发现了它存在的问题，某马品牌的安全门具有防盗，防水，防火的功能。现在如果我们还需要再创建一个传智品牌的安全门，而该安全门只具有防盗、防水功能呢？很显然如果实现 `SafetyDoor` 接口就违背了接口隔离原则，那么我们如何进行修改呢？看如下类图：

![接口隔离原则1](https://cdn.jsdmirror.com//gh/xustudyxu/picx-images-hosting@master/20231230/接口隔离原则1.aux2v0025g8.webp)

代码如下：

**AntiTheft（接口）：**

```java
/**
 * @author frx
 * @date 2023-12-30 20:17
 * @desc 防盗
 */
public interface AntiTheft {
    void antiTheft();
}
```

**Fireproof（接口）：**

```java
/**
 * @author frx
 * @date 2023-12-30 20:18
 * @desc 防火
 */
public interface Fireproof {
    void fireproof();
}
```

**Waterproof（接口）：**

```java
public interface Waterproof {
    void waterproof();
}
```

**MouMaSafetyDoor（类）：**

```java
/**
 * @author frx
 * @date 2023-12-30 21:06
 * @desc
 */
public class MoumaSafetyDoor implements AntiTheft,Fireproof,Waterproof{
    @Override
    public void antiTheft() {
        System.out.println("防盗...");
    }

    @Override
    public void fireproof() {
        System.out.println("防火....");
    }

    @Override
    public void waterproof() {
        System.out.println("防水...");
    }
}
```

**ItfrxMaSafetyDoor（类）：**

```java
/**
 * @author frx
 * @date 2023-12-30 21:09
 * @desc
 */
public class ItfrxSafetyDoor implements AntiTheft, Fireproof {
    @Override
    public void antiTheft() {
        System.out.println("防盗...");
    }

    @Override
    public void fireproof() {
        System.out.println("防火...");
    }

}
```

+ 测试

```java
/**
 * @author frx
 * @date 2023-12-30 21:07
 * @desc
 */
public class Client {
    public static void main(String[] args) {
        //创建某马安全门对象
        MoumaSafetyDoor door = new MoumaSafetyDoor();
        //调用功能
        door.antiTheft();
        door.fireproof();
        door.waterproof();

        System.out.println("==============================");
        //创建 itfrx 安全门对象
        ItfrxSafetyDoor itfrxSafetyDoor = new ItfrxSafetyDoor();
        itfrxSafetyDoor.antiTheft();;
        itfrxSafetyDoor.fireproof();
    }
}
```

+ 结果

```java
防盗...
防火....
防水...
==============================
防盗...
防火...

Process finished with exit code 0
```

### 迪米特法则

迪米特法则又叫最少知识原则。

只和你的直接朋友交谈，不跟“陌生人”说话（Talk only to your immediate friends and not to strangers）。

其含义是：如果两个软件实体无须直接通信，那么就不应当发生直接的相互调用，可以通过第三方转发该调用。其目的是降低类之间的耦合度，提高模块的相对独立性。

迪米特法则中的“朋友”是指：当前对象本身、当前对象的成员对象、当前对象所创建的对象、当前对象的方法参数等，这些对象同当前对象存在关联、聚合或组合关系，可以直接访问这些对象的方法。

下面看一个例子来理解迪米特法则

【例】明星与经纪人的关系实例

明星由于全身心投入艺术，所以许多日常事务由经纪人负责处理，如和粉丝的见面会，和媒体公司的业务洽淡等。这里的经纪人是明星的朋友，而粉丝和媒体公司是陌生人，所以适合使用迪米特法则。

类图如下：

![迪米特法则](https://cdn.jsdmirror.com//gh/xustudyxu/picx-images-hosting@master/20231230/迪米特法则.77kxu9rxvms0.webp)

代码如下：

**明星类（Star）**

```java
/**
 * @author frx
 * @date 2023-12-30 21:27
 * @desc 明星类
 */
@Getter
@AllArgsConstructor
public class Star {
    private String name;

}
```

**粉丝类（Fans）**

```java
/**
 * @author frx
 * @date 2023-12-30 21:27
 * @desc 粉丝类
 */
@AllArgsConstructor
@Getter
public class Fans {
    private String name;

}
```

**媒体公司类（Company）**

```java
/**
 * @author frx
 * @date 2023-12-30 21:34
 * @desc 媒体公司类
 */
@Getter
@AllArgsConstructor
public class Company {

    private String name;

}
```

**经纪人类（Agent）**

```java
/**
 * @author frx
 * @date 2023-12-30 21:36
 * @desc 经纪人类
 */
@Setter
public class Agent {
    private Star star;
    private Fans fans;
    private Company company;

    //和粉丝见面的方法
    public void meeting() {
        System.out.println(star.getName() + "和粉丝" + fans.getName() + "见面");
    }

    //和媒体公司洽谈的方法
    public void business() {
        System.out.println(star.getName() + "和：" + company.getName() + "洽谈");
    }

}
```

+ 测试

```java
/**
 * @author frx
 * @date 2023-12-30 21:40
 * @desc
 */
public class Client {
    public static void main(String[] args) {
        //创建经纪人类
        Agent agent = new Agent();
        //创建明星对象
        Star star = new Star("小红");
        agent.setStar(star);
        //创建粉丝对象
        Fans fans = new Fans("小王");
        agent.setFans(fans);

        //创建媒体公司对象
        Company company = new Company("黑马媒体公司");
        agent.setCompany(company);

        agent.meeting();
        agent.business();

    }
}
```

+ 结果

```java
小红和粉丝小王见面
小红和：黑马媒体公司洽谈

Process finished with exit code 0
```

### 合成复用原则

合成复用原则是指：尽量先使用组合或者聚合等关联关系来实现，其次才考虑使用继承关系来实现。

通常类的复用分为继承复用和合成复用两种。

继承复用虽然有简单和易实现的优点，但它也存在以下缺点：

1. 继承复用破坏了类的封装性。因为继承会将父类的实现细节暴露给子类，父类对子类是透明的，所以这种复用又称为“白箱”复用。
2. 子类与父类的耦合度高。父类的实现的任何改变都会导致子类的实现发生变化，这不利于类的扩展与维护。
3. 它限制了复用的灵活性。从父类继承而来的实现是静态的，在编译时已经定义，所以在运行时不可能发生变化。

采用组合或聚合复用时，可以将已有对象纳入新对象中，使之成为新对象的一部分，新对象可以调用已有对象的功能，它有以下优点：

1. 它维持了类的封装性。因为成分对象的内部细节是新对象看不见的，所以这种复用又称为“黑箱”复用。
2. 对象间的耦合度低。可以在类的成员位置声明抽象。
3. 复用的灵活性高。这种复用可以在运行时动态进行，新对象可以动态地引用与成分对象类型相同的对象。

下面看一个例子来理解合成复用原则

【例】汽车分类管理程序

汽车按“动力源”划分可分为汽油汽车、电动汽车等；按“颜色”划分可分为白色汽车、黑色汽车和红色汽车等。如果同时考虑这两种分类，其组合就很多。类图如下： 

![合成复用原则](https://cdn.jsdmirror.com//gh/xustudyxu/picx-images-hosting@master/20231230/合成复用原则.6n7kvu4quv40.webp)

从上面类图我们可以看到使用继承复用产生了很多子类，如果现在又有新的动力源或者新的颜色的话，就需要再定义新的类。我们试着将继承复用改为聚合复用看一下。

![合成复用原则1](https://cdn.jsdmirror.com//gh/xustudyxu/picx-images-hosting@master/20231230/合成复用原则1.4kdzyh1ssq00.webp)

