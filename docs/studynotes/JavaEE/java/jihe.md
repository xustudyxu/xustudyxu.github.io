---
title: Java 集合
date: 2021-12-20 18:44:12
permalink: /pages/e7e17e/
categories:
  - java
tags:
  - java
---
# Java 集合

## 集合的理解和好处

+ 前面我们保存多个数据使用的是数组，那么数组有不足的地方，我们分析一下

### 数组

1. 长度开始时必须指定，而且一旦指定，不能更改
2. 保存的必须为同一类型的元素
3. 使用数组进行增加/删除元素的示意代码–比较麻烦
   + 写出Person数组扩容示意代码。
+ Person[] pers = new Person[1];1/大小是1per[0]=new Person();
   + //增加新的Person对象?
   + Person[ ] pers2 = new Person[pers.length+1];
   + //新创建数组for(){} //拷贝pers数组的元素到pers2
   + pers2[pers2.length-1]=new Person();
   + //添加新的对象

### 集合

1. 可以**动态保存**任意多个对象，使用比较方便!
2. 提供了一系列方便的操作对象的方法:add、remove. set、get等
3. 使用集合添加,删除新元素的示意代码-简洁了

## 集合的框架体系

+ Java 的集合类很多，主要分为两大类，如图

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/02.png)

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/03.png)

+ 代码演示：

```java
package com.study.collection_;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
@SuppressWarnings({"all"})
public class Collection_ {
    public static void main(String[] args) {
        //1.集合主要是两组(单例集合，双列集合)
        //2.Collection 接口有两个重要的子接口 List Set ，他们的实现子类是单列集合
        //3.Map 接口的实现子类 是双列集合，存放的K-V
        ArrayList arrayList=new ArrayList();
        arrayList.add("Jack");
        arrayList.add("tom");

        HashMap hashMap=new HashMap();
        hashMap.put("NO1","北京");
        hashMap.put("NO2","上海");


    }
}

```

## Collection 接口和常用方法

### Collection 接口实现类的特点

+ public interface Collection\<E\> extends Iterable\<E\>

1. **collection实现子类可以存放多个元素，每个元素可以是Object**
2. **有些Collection的实现类，可以存放重复的元素，有些不可以**
3. **有些Collection的实现类，有些是有序的(List)，有些不是有序(Set)**
4. **Collection接口没有直接的实现子类，是通过它的子接口Set和List来实现的**

Collection 接口常用方法,以实现子类 ArrayList 来演示. CollectionMethod.java

+ 代码演示:

```java
package com.study.collection_;

import java.util.ArrayList;
import java.util.List;
@SuppressWarnings({"all"})
public class CollectionMethod {
    public static void main(String[] args) {
        
        
        List list = new ArrayList();
        //add添加单个元素
        list.add("Jack");
        list.add(10);
        list.add(true);
        System.out.println("list="+list);
        //remove 删除指定元素
        list.remove(0);//删除第一个元素
        list.remove(true);//指定删除某个元素
        System.out.println("list="+list);
        
        //contains查找某个元素
        System.out.println(list.contains("Jack"));//F
        
        //size获取某个元素
        System.out.println(list.size());//1
        
        //isEmpty判断是否为空
        System.out.println(list.isEmpty());//F
        
        //clear清空
        list.clear();
        System.out.println("list="+list);
        
        //addAll 添加多个元素
        ArrayList list2 = new ArrayList();
        list2.add("红楼梦");
        list2.add("三国演义");
        list.addAll(list2);
        System.out.println("list="+list);
        
        //containsAll查找多个元素 是否存在
        System.out.println(list.containsAll(list2));//T
        
        //remove删除多个元素
        list.add("聊斋");
        list.removeAll(list2);
        System.out.println("list="+list);


    }
}

```

### Collection 接口遍历元素方式 1-使用 Iterator(迭代器)

1. **lterator对象称为迭代器，主要用于遍历 Collection集合中的元素。**
2. **所有实现了Collection接口的集合类都有一个iterator()方法，用以返回一个实现了lterator接口的对象,即可以返回一个迭代器。**
3. **lterator仅用于遍历集合，Iterator本身并不存放对象。**

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/07.png)

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/08.png)

+ 代码演示:

```java
package com.study.collection_;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.Iterator;

public class CollectionIterator {
    public static void main(String[] args) {

       Collection col = new ArrayList();
       col.add(new Book("三国演义","罗贯中",10.1));
       col.add(new Book("小李飞刀","古龙",5.1));
       col.add(new Book("红楼梦","曹雪芹",34.6));
        //System.out.println("col="+col);
        //希望遍历集合
        //1.先得到 col 对应的 迭代器
        Iterator iterator= col.iterator();
        //2.使用while循环遍历即可
        while (iterator.hasNext()) {//判断是否还有数据
            //返回下一个元素   类型是obj
            Object obj = iterator.next();
            System.out.println("obj=" + obj);

        }
            //快捷键 itit 回车
            //显示所有快捷键ctrl+J
            //3.当迭代器退出while循环后，这时iterator迭代器，指向最后的元素
            //iterator.next();//NoSuchElementException
            //如果希望再次遍历 需要重置我们的迭代器
            iterator=col.iterator();
        System.out.println("====第二次遍历====");
        while (iterator.hasNext()) {
            Object obj= iterator.next();
            System.out.println("obj="+obj);
        }







    }
}
class Book{
    private String name;
    private String author;
    private double price;

    public Book(String name, String author, double price) {
        this.name = name;
        this.author = author;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Book{" +
                "name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", price=" + price +
                '}';
    }
}
```

### Collection 接口遍历对象方式 2-for 循环增强

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/09.png)

+ 代码演示:
  

```java
package com.study.collection_;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Comparator;
import java.util.Iterator;

public class CollectionIterator {
    public static void main(String[] args) {

       Collection col = new ArrayList();
       col.add(new Book("三国演义","罗贯中",10.1));
       col.add(new Book("小李飞刀","古龙",5.1));
       col.add(new Book("红楼梦","曹雪芹",34.6));
        //System.out.println("col="+col);
        //希望遍历集合
        //1.先得到 col 对应的 迭代器
        Iterator iterator= col.iterator();
        //2.使用while循环遍历即可
        while (iterator.hasNext()) {//判断是否还有数据
            //返回下一个元素   类型是obj
            Object obj = iterator.next();
            System.out.println("obj=" + obj);

        }
            //快捷键 itit 回车
            //显示所有快捷键ctrl+J
            //3.当迭代器退出while循环后，这时iterator迭代器，指向最后的元素
            //iterator.next();//NoSuchElementException
            //如果希望再次遍历 需要重置我们的迭代器
            iterator=col.iterator();
        System.out.println("====第二次遍历====");
        while (iterator.hasNext()) {
            Object obj= iterator.next();
            System.out.println("obj="+obj);
        }







    }
}
class Book{
    private String name;
    private String author;
    private double price;

    public Book(String name, String author, double price) {
        this.name = name;
        this.author = author;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Book{" +
                "name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", price=" + price +
                '}';
    }
}
```

### 课堂练习

1. 创建3个Dog {name, age}对象，放入到 ArrayList中，赋给List 引用用迭代器和增强for循环两种方式来遍历
2. 重写Dog的toString方法，输出name和age

+ 代码演示:

```java
package com.study.collection_;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class CollectionExercise {
    public static void main(String[] args) {
        Collection col = new ArrayList();
        col.add(new Dog("小黄",10));
        col.add(new Dog("小花",9));
        Iterator iterator=col.iterator();
        while (iterator.hasNext()) {
            Object dog =  iterator.next();
            System.out.println("dog="+dog);

        }
        for (Object o :col) {
            System.out.println("Dog="+o);

        }


    }
}
class Dog{
    private String name;
    private int age;

    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Dog{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

## List 接口和常用方法

### List 接口基本介绍

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/11.png)

+ 代码演示：


```java
package com.study.list_;

import java.util.ArrayList;

public class List_ {
    @SuppressWarnings({"all"})
    public static void main(String[] args) {
        //1.List集合类中元素有序（即添加顺序和取出顺序一致、且可重复【案列】）
        ArrayList list = new ArrayList();
        list.add("Tom");
        list.add("Jack");
        list.add("Mary");
        list.add("Tom");
        System.out.println("list="+list);
        //2.List集合中的每个元素都有其对应的顺序索引，即支持索引
        //索引是从0开始的
        System.out.println(list.get(2));
        

    }
}

```

### List 接口的常用方法

+ 代码演示：

```java
package com.study.list_;

import java.util.ArrayList;
import java.util.List;

public class ListMethod {
    @SuppressWarnings({"all"})
    public static void main(String[] args) {
        List list = new ArrayList();
        list.add("张三丰");
        list.add("贾宝玉");
        //1.void add(int index,Object ele):在index位置插入ele元素
        list.add(1,"冯");
        System.out.println("list="+list);
        
        //2.boolean addAll(int index,Collection eles):从index位置开始将eles中的所有元素添加进来
        List list2=new ArrayList();
        list2.add("tom");
        list2.add("Jack");
        list2.add("tom");
        list.addAll(1,list2);
        
        //3.get(int index):获取指定index位置的元素
        //4.indexOf(Object obj) 返回obj在当前集合中首次出现的位置
        System.out.println("list="+list);
        System.out.println(list.indexOf("tom"));
        
        
        //5.lastIndexOf(Object obj):返回obj在当前集合中末次出现的位置
        System.out.println("list="+list);
        System.out.println(list.lastIndexOf("tom"));
        
        
        //6.remove(int index):移除指定index位置的元素，并返回元素
        list.remove(0);
        System.out.println("list="+list);
        
        
        //7.Object set(int index,Object eles):设置指定index位置的元素为ele，相当于是替换
        list.set(1,"玛丽");//索引必须存在 否则报错
        System.out.println("list="+list);
        
        
        //8.List subList(int fromIndex,int toIndex):返回从fromIndex到toIndex位置的子集合
        //注意：返回的子集合 formIndex<=subList<toIndex 左闭右开
        List returnlist=list.subList(0,2);
        System.out.println("returnList"+returnlist);


    }
}

```

### List 接口课堂练习

添加10个以上的元素(比如String "hello" )，在2号位插入一个元素"韩顺平教育"，获得第5个元素，删除第6个元素，修改第7个元素，在使用迭代器遍历集合，要求:使用List的实现类ArrayList完成。

+ 代码演示:

```java
package com.study.list_;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ListExercise {
    public static void main(String[] args) {
        /*
        添加10个以上的元素（比如String “hello"),在2号位插入一个元素"韩顺平教育"
        获得第5个元素，删除第6个元素，修改第7个元素，在使用迭代器遍历集合
        要求：使用List的实现类ArrayList完成。
         */
        List list = new ArrayList();
        for (int i = 0; i < 12; i++) {
            list.add("hello"+i);
            
        }
        System.out.println("list="+list);
        //在2号位插入一个元素："韩顺平教育"
        list.add(1,"韩顺平教育");
        System.out.println("list="+list);
        //获得第5个元素
        System.out.println("第五个元素="+list.get(4));
        //删除第6个元素
        list.remove(5);
        System.out.println("list="+list);
        //修改第7个元素
        list.set(6,"三国演义");
        System.out.println("list="+list);
        //使用迭代器遍历
        Iterator iterator=list.iterator();
        while (iterator.hasNext()) {
            Object obj = iterator.next();
            System.out.println("obj="+obj);

        }

    }
}

```

### List 的三种遍历方式[ArrayList,LinkedList,Vector]

1. **方式一:使用iterator
   lterator iter = col.iterator();
   while(iter.hasNext0){
   Object o = iter.next();}**
2. **方式二:使用增强for for(Object o:col){}**
3. **方式三:使用普通for
   for(int i=O;i<list.size();i++){
   Object object = list.get(0);
   System.out.println(object);}**
   说明:使用LinkedList完成使用方式和ArrayList一样
+ 代码演示:

```java
package com.study.list_;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ListFor {
    public static void main(String[] args) {
        //List接口的实现子类 Vector LinkedList 运行类型完全OK
        List list = new ArrayList();

        list.add("jack");
        list.add("tom");
        list.add("鱼香肉丝");
        list.add("北京烤鸭");

        //遍历
        //1.迭代器
        Iterator iterator=list.iterator();
        while (iterator.hasNext()) {
            Object obj = iterator.next();
            System.out.println("obj="+obj);
        }

        System.out.println("=======增强for循环========");
        //2.增强for循环
        for (Object o :list) {
            System.out.println("o="+o);

        }
        System.out.println("=======普通for循环========");
        //3.使用普通for循环
        for (int i = 0; i < list.size(); i++) {
            System.out.println("对象="+list.get(i));
            
        }

    }
}

```

### 实现类的课堂练习

ListExercise02.java 5min
使用List的实现类添加三本图书，并遍历，打印如下效果

+ 名称:xx     名称:XX   名称:XX
+ 价格:XX     价格:XX  价格:XX
+ 作者:XX     作者:XX  作者:XX
+ 要求

1. 按价格排序,从低到高(使用冒泡法)
2. 要求使用ArrayList、LinkedList 和Vector三种集合实现 

+ 代码演示:

```java
package com.study.list_;

import java.util.ArrayList;
import java.util.List;

public class ListExercise02 {
    @SuppressWarnings({"all"})
    public static void main(String[] args) {
        List list = new ArrayList();

        list.add(new Book("红楼梦","曹雪芹",100));
        list.add(new Book("西游记","吴承恩",10));
        list.add(new Book("水浒传","施耐庵",19));
        list.add(new Book("三国","曹雪芹",80));
       // list.add(new Book("西游记","曹雪芹",10));


        //遍历
        for (Object o :list) {
            System.out.println(o);

        }
        sort(list);
        System.out.println("===排序后===");
        for (Object o :list) {
            System.out.println(o);

        }


    }
    //价格要求从小到大
    public static void sort(List list){
        int listSize= list.size();
        for (int i = 0; i < listSize-1; i++) {
            for (int j = 0; j < listSize-1-i; j++) {
                //取出对象Book
                Book book1=(Book)list.get(j);
                Book book2=(Book)list.get(j+1);
                if(book1.getPrice()>book2.getPrice()){//交换
                    list.set(j,book2);
                    list.set(j+1,book1);

                }
                
            }
            
        }
    }
}
class Book{
    private String name;
    private String author;
    private double price;

    public Book(String name, String author, double price) {
        this.name = name;
        this.author = author;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "名称:"+name+"\t\t价格:"+price+"\t\t作者:"+author;
    }
}
```

## ArrayList 底层结构和源码分析

### ArrayList 的注意事项

1. **permits all elements, including null , ArrayList可以加入null,并且多个**
2. **ArrayList是由数组来实现数据存储的[后面老师解读源码]**
3. **ArrayList基本等同于Vector，除了ArrayList是线程不安全(执行效率高)看源码在多线程情况下，不建议使用ArrayList**

+ 代码演示:

```java
package com.study.collection_;

import java.lang.reflect.Array;
import java.util.ArrayList;

@SuppressWarnings({"all"})
public class ArrayListDetail {
    public static void main(String[] args) {

        //ArrayList是由数组来实现数据存储的
        //ArrayList时线程不安全的(执行效率高)，可以看源码 没有这个synchronized
        /*
         public boolean add(E e) {
              ensureCapacityInternal(size + 1);  // Increments modCount!!
              elementData[size++] = e;
              return true;
    }
         */
        ArrayList arrayList = new ArrayList();
        arrayList.add(null);
        arrayList.add("Jack");
        arrayList.add(null);
        System.out.println(arrayList);
    }
}

```

### ArrayList 的底层操作机制源码分析(重点，难点.)

+ 代码演示:

```java
public class ArrayListSource {
    /*
    （2）当创建ArrayList对象时，如果使用的是无参构造器，则初始elementData容量为0，
    第一次添加，则扩容elementData为10，如果需再次扩容，则扩容elementData为1.5倍

     */
    public static void main(String[] args) {
		ArrayList list = new ArrayList();
        //使用for循环给list集合添加 1-10数据
        for (int i = 1; i <=10; i++) {
            list.add(i);            
        }
        //使用for循环给list集合添加 11-15数据
        for (int i = 11; i <=15; i++) {
            list.add(i);

        }
        list.add(100);
        list.add(200);
        list.add(null);
    }
}

```

```java
//使用无参构造器创建ArrayList对象
//1.创建了一个空的elementData数组={}
    public ArrayList(){
        this.elementData=DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
        }
//2.执行list.add（1）先确定是否要扩容 （2）然后在执行 赋值
    public boolean add(E e){
        ensureCapacityInternal(size+1);  // Increments modCount!!
        elementData[size++]=e;
        return true;
        }

//3.该方法确定minCapacity (1)第一次扩容  为10
    private void ensureCapacityInternal(int minCapacity){
        ensureExplicitCapacity(calculateCapacity(elementData,minCapacity));
        }
//4.
    private void ensureExplicitCapacity(int minCapacity){
        modCount++;//（1）记录集和修改的次数

        // overflow-conscious code
        if(minCapacity-elementData.length>0)
        	grow(minCapacity);//（2)如果elementData大小不够，就调用grow()去扩容
        }
//5.
    private void grow(int minCapacity){                   //（1）真的扩容
        // overflow-conscious code                        //（2）使用扩容机制确定要扩容到多大
        int oldCapacity=elementData.length;               //（3）第一次newCapacity=10
        int newCapacity=oldCapacity+(oldCapacity>>1);     //（4）第二次及其以后，按照1.5倍扩容
        if(newCapacity-minCapacity< 0)                    //（5）扩容使用的是Arrays.copyOf() 会保留原有的数据
        	newCapacity=minCapacity;
        if(newCapacity-MAX_ARRAY_SIZE>0)
        	newCapacity=hugeCapacity(minCapacity);
        // minCapacity is usually close to size, so this is a win:
        elementData=Arrays.copyOf(elementData,newCapacity);
        }
    /*
        如果使用的是指定大小的构造器，则初始elementData容量为指定大小，
        如果需要扩容，则直接扩容elementData为1.5倍
         */
```

## Vector 底层结构和源码剖析

### Vector 的基本介绍

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/16.png)

+ 代码演示:

```java
package com.study.list_;

import java.util.Vector;

@SuppressWarnings({"all"})
public class Vector_ {
    public static void main(String[] args) {
        //无参构造器
        Vector vector = new Vector();
        for (int i = 0; i < 10; i++) {
            vector.add(i);     
        }
        vector.add(100);
        System.out.println("Vector="+vector);
    }
}

```

```java
//解读源码
//1.new Vector() 底层
    public Vector() {
        this(10);
        }
//补充:如果是 Vector vector=new Vector(8);
//走的方法：
    public Vector(int initialCapacity) {
        this(initialCapacity, 0);
        }

//2.vector.add(i)
//2.1//下面这个方法就是添加数据到Vector集合
    public synchronized boolean add(E e) {
        modCount++;
        ensureCapacityHelper(elementCount + 1);
        elementData[elementCount++] = e;
        return true;
        }
//2.2//确定是否需要扩容条件：minCapacity-elementDate.length>0
    private void ensureCapacityHelper(int minCapacity) {
        // overflow-conscious code
        if (minCapacity - elementData.length > 0)
        	grow(minCapacity);
        }
//2.3 //如果 需要的数组大小不够用，就扩容，扩容后的算法
    private void grow(int minCapacity) {
        // overflow-conscious code
        int oldCapacity = elementData.length;
        int newCapacity = oldCapacity + ((capacityIncrement > 0) ?
        capacityIncrement : oldCapacity);
        //就是扩容两倍
        if (newCapacity - minCapacity < 0)
        	newCapacity = minCapacity;
        if (newCapacity - MAX_ARRAY_SIZE > 0)
        	newCapacity = hugeCapacity(minCapacity);
        elementData = Arrays.copyOf(elementData, newCapacity);
        }
```

### Vector 和 ArrayList 的比较

|           |     底层结构     |  版本  | 线程安全(同步)效率 | 扩容倍数                                                     |
| :-------: | :--------------: | :----: | :----------------: | ------------------------------------------------------------ |
| ArrayList |     可变数组     | jdk1.2 |   不安全，效率高   | 如果有参构造器1.5倍 。  \|   如果是无参：1.第一次10   2.从第二次开始按1.5倍。 |
|  Vector   | 可变数组Object[] | jdk1.0 |   安全，效率不高   | 如果是无参，默认10，满后就按2倍扩容。\|   如果指定大小，则每次直接按2倍扩容。 |

## LinkedList 底层结构

![17](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/17.png)

### LinkedList 的全面说明

1. **LinkedList底层实现了双向链表和双端队列特点 **
2. **可以添加任意元素(元素可以重复),包括null**
3. **线程不安全,没有实现同步**

### LinkedList 的底层操作机制

1. **LinkedList底层维护了一个双向链表.**
2. **LinkedList中维护了两个属性first和last分别指向首节点和尾节点****
3. **每个节点(Node对象)，里面又维护了prev、next、item三个属性，其中通过
   prev指向前一个，通过next指向后一个节点。最终实现双向链表.**
4. **所以LinkedList的元素的添加和删除，不是通过数组完成的，相对来说效率较高。**
5. **模拟一个简单的双向链表【走代码】LinkedList01.java**

+ 代码演示:

```java
package com.study.list_;

public class LinkedList01 {
    public static void main(String[] args) {
        //模拟一个简单的双向链表
        Node jack = new Node("Jack");
        Node tom = new Node("Tom");
        Node frx = new Node("Frx");

        //链接三个结点，形成双向链表
        //jack->Tom->frx
        jack.next=tom;
        tom.next=frx;
        //frx->Tom->jack
        frx.pre=tom;
        tom.pre=jack;

        Node first=jack;//让first引用指向jack，就是双向链表的头结点
        Node last=frx;//让last引用指向hsp，就是双向链表的尾结点

        //演示从头到尾进行遍历
        System.out.println("===从头到尾进行遍历===");
        while(true){
            if(first==null){
                break;
            }
            //输出first信息
            System.out.println(first);
            first=first.next;
        }
        //添加一个数据
        //要求在 tom和frx 插入一个对象 smith

        //1.先创建一个Node 结点
        Node smith = new Node("Smith");
        //下面就把Smith加入双向链表
        smith.next=frx;
        smith.pre=tom;
        frx.pre=smith;
        tom.next=smith;

        //让first再次指向jack
        first=jack;

        System.out.println("===从头到尾进行遍历===");
        while(true){
            if(first==null){
                break;
            }
            //输出first信息
            System.out.println(first);
            first=first.next;
        }

    }
}
//定义一个Node类，Node对象 表示双向链表的一个结点
class Node{
    public Object item;//真正存放数据
    public Node next;//指向后一个结点
    public Node pre;//指向前一个结点
    public Node(Object name){
        this.item=name;
    }

    @Override
    public String toString() {
        return "Node{" +
                "name=" + item +
                '}';
    }
}
```

### LinkedList 的增删改查案例

+ 代码演示:

```java
package com.study.list_;

import java.util.Iterator;
import java.util.LinkedList;
@SuppressWarnings({"all"})
public class LinkedListCRUD {
    public static void main(String[] args) {

        LinkedList linkedList = new LinkedList();
        linkedList.add(1);
        linkedList.add(2);
        linkedList.add(3);
    System.out.println("liskedList="+linkedList);
    //演示删除结点的源码
        linkedList.remove();//默认删除第一个结点
        //linkedList.remove(2);

        System.out.println("liskedList="+linkedList);
        //修改某个结点对象
        linkedList.set(1,999);
        System.out.println("liskedList="+linkedList);

        //得到某个结点对象
        //get(1) 是得到双向链表的第二个对象
        Object o=linkedList.get(1);
        System.out.println(o);

        //因为LinkedList 是实现List接口，遍历方式
        System.out.println("==========LinkedList遍历迭代器=============");
        Iterator iterator = linkedList.iterator();
        while (iterator.hasNext()) {
            Object next =  iterator.next();
            System.out.println("next="+next);
            
        }
        for (Object o1 :linkedList) {
            System.out.println("o1="+o1);
        }
    }
}

```

```java
//源码阅读
//1.LinkedList linkedList = new LinkedList();
    public LinkedList() {
        }
//2.这时linkedlist 的属性 first=null last=null
//3.执行
    public boolean add(E e) {
        linkLast(e);
        return true;
        }
        //4. 将新的结点，加入到我们的双向链表的最后
    void linkLast(E e) {
        final Node<E> l = last;
        final Node<E> newNode = new Node<>(l, e, null);
        last = newNode;
        if (l == null)
            first = newNode;
        else
            l.next = newNode;
        size++;
        modCount++;
        }
//1.执行 removeFirst();
    public E remove() {
        return removeFirst();
    }
//2.
    public E removeFirst() {
    final Node<E> f = first;
        if (f == null)
            throw new NoSuchElementException();
        return unlinkFirst(f);
        }
//3.执行unlinkFirst，将f 指向双向链表的第一个结点
    private E unlinkFirst(Node<E> f) {
// assert f == first && f != null;
        final E element = f.item;
        final Node<E> next = f.next;
        f.item = null;
        f.next = null; // help GC
        first = next;
        if (next == null)
            last = null;
        else
            next.prev = null;
        size--;
        modCount++;
        return element;
        }
```

## ArrayList 和 LinkedList 比较

### ArrayList 和 LinkedList 的比较

|            | 底层结构 |     增删的效率     | 改查的效率 |
| :--------: | -------- | :----------------: | :--------: |
| ArrayList  | 可变数组 |   较低，数组扩容   |    较高    |
| LinkedList | 双向链表 | 较高，通过链表追加 |    较低    |

+ 如何选择ArrayList和LinkedList:
1. **如果我们改查的操作多，选择ArrayList**
2. **如果我们增删的操作多，选择LinkedList**
3. **一般来说，在程序中，80%-90%都是查询，因此大部分情况下会选择ArrayList**
4. **在一个项目中，根据业务灵活选择，也可能这样，一个模块使用的是ArrayList,另外一个模块是LinkedList,也就是说，要根据业务来进行选择**

## Set 接口和常用方法

### Set 接口基本介绍

![17](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/19.png)

### Set 接口的常用方法

和 List 接口一样, Set 接口也是 Collection 的子接口，因此，常用方法和 Collection 接口一样.

### Set 接口的遍历方式

+ 同Collection的遍历方式一样，因为Set接口是Collection接口的子接口。

1. 可以使用迭代器
2. 增强for
3. 不能使用索引的方式来获取.

### Set 接口的常用方法举例

+ 代码演示:

```java
package com.study.set_;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@SuppressWarnings({"all"})
public class SetMethod {
    public static void main(String[] args) {

        //1.以Set接口 的实现类 HashSet 来讲解 Set 接口的方法
        //2.set接口的实现类的对象（Set接口对象)，不能存放重复的元素，可以添加一个null
        //3.set接口对象存放数据是无序(即添加的顺序和取出的顺序不一致)
        //4.注意：取出的顺序虽然不是添加的顺序，但是它是固定的
       Set set = new HashSet();
       set.add("john");
       set.add("lucy");
       set.add("john");//重复的数据
       set.add("jack");
       set.add("john");
       set.add("frx");
       set.add(null);
       set.add(null);

       set.remove(null);

        System.out.println("set="+set);



        //遍历
        //方式一：使用迭代器
        System.out.println("=====使用迭代器遍历======");
        Iterator iterator = set.iterator();
        while (iterator.hasNext()) {
            Object obj = iterator.next();
            System.out.println("obj="+obj);
        }


        //方式二：增强for循环
        System.out.println("=======增强for循环=======");

        for (Object o :set) {
            System.out.println("o="+o);

        }
        //set 接口对象 不能通过索引来获取

    }
}

```

## Set 接口实现类-HashSet

### HashSet 的全面说明

1. **HastSet实现了Set接口**
2. **HashSet实际上是HashMap**
3. **可以存放null值，但是只能有一个null**
4. **HashSet不保证元素是有序的，取决于hash后，再确定索引的位置（即：不确定存放元素的顺序和取出的顺序一致）**
5. **不能有重复元素/对象**

```java
package com.study.set_;

import java.util.HashSet;
import java.util.Set;

public class Hashset_ {
    public static void main(String[] args) {
        Set hashSet = new HashSet();
        hashSet.add(null);
        hashSet.add(null);
        System.out.println("hashset="+hashSet);


        /*
        1.  public HashSet() {
              map = new HashMap<>();
    }
        2.  hashset可以存放null，但是只能有一个null 即元素不能重复


         */
    }
}

```

### HashSet 案例说明

看2个案列 虽然困难，但是很有意思

```java
package com.study.set_;

import java.util.HashSet;
import java.util.Set;
@SuppressWarnings({"all"})
public class Hashset01 {
    public static void main(String[] args) {
        HashSet set = new HashSet();


        //说明：
        //1.在执行add方法后，会返回一个boolean值
        //2.如果添加成功，返回true，否则返回false
        //3.可以通过remove指定删除某个对象
        System.out.println(set.add("john"));//T
        System.out.println(set.add("lucy"));//T
        System.out.println(set.add("john"));//F
        System.out.println(set.add("jack"));//T
        System.out.println(set.add("Rose"));//T



        set.remove("john");
        System.out.println("set="+set);//3个


        //
        set=new HashSet();
        System.out.println("set="+set);//0个
        //Hashset 不能添加相同的元素/数据
        set.add("lucy");//添加成功
        set.add("lucy");//加入不了
        set.add(new Dog("tom"));
        set.add(new Dog("tom"));//两个不同的对象
        System.out.println("set="+set);


        //看源码
        set.add(new String("frx"));//ok
        set.add(new String("frx"));//加入不了


    }
}
class Dog{//定义了Dog类
    private String name;

    public Dog(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Dog{" +
                "name='" + name + '\'' +
                '}';
    }
}
```

## HashSet 底层机制说明

## Java7 HashMap

### 概述

之所以把*HashSet*和*HashMap*放在一起讲解，是因为二者在Java里有着相同的实现，前者仅仅是对后者做了一层包装，也就是说*HashSet*里面有一个*HashMap*(适配器模式)。因此本文将重点分析*HashMap*。

*HashMap*实现了*Map*接口，即允许放入`key`为`null`的元素，也允许插入`value`为`null`的元素；除该类未实现同步外，其余跟`Hashtable`大致相同；跟*TreeMap*不同，该容器不保证元素顺序，根据需要该容器可能会对元素重新哈希，元素的顺序也会被重新打散，因此不同时间迭代同一个*HashMap*的顺序可能会不同。 根据对冲突的处理方式不同，哈希表有两种实现方式，一种开放地址方式(Open addressing)，另一种是冲突链表方式(Separate chaining with linked lists)。**Java7 HashMap采用的是冲突链表方式**。

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/45.png)

从上图容易看出，如果选择合适的哈希函数，`put()`和`get()`方法可以在常数时间内完成。但在对*HashMap*进行迭代时，需要遍历整个table以及后面跟的冲突链表。因此对于迭代比较频繁的场景，不宜将*HashMap*的初始大小设的过大。

有两个参数可以影响*HashMap*的性能: 初始容量(inital capacity)和负载系数(load factor)。初始容量指定了初始`table`的大小，负载系数用来指定自动扩容的临界值。当`entry`的数量超过`capacity*load_factor`时，容器将自动扩容并重新哈希。对于插入元素较多的场景，将初始容量设大可以减少重新哈希的次数。

将对象放入到*HashMap*或*HashSet*中时，有两个方法需要特别关心: `hashCode()`和`equals()`。**hashCode()方法决定了对象会被放到哪个bucket里，当多个对象的哈希值冲突时，equals()方法决定了这些对象是否是“同一个对象”**。所以，如果要将自定义的对象放入到`HashMap`或`HashSet`中，需要*@Override*`hashCode()`和`equals()`方法。

### get()

`get(Object key)`方法根据指定的`key`值返回对应的`value`，该方法调用了`getEntry(Object key)`得到相应的`entry`，然后返回`entry.getValue()`。因此`getEntry()`是算法的核心。 算法思想是首先通过`hash()`函数得到对应`bucket`的下标，然后依次遍历冲突链表，通过`key.equals(k)`方法来判断是否是要找的那个`entry`。

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/46.png)

上图中`hash(k)&(table.length-1)`等价于`hash(k)%table.length`，原因是*HashMap*要求`table.length`必须是2的指数，因此`table.length-1`就是二进制低位全是1，跟`hash(k)`相与会将哈希值的高位全抹掉，剩下的就是余数了。

```java
//getEntry()方法
final Entry<K,V> getEntry(Object key) {
	......
	int hash = (key == null) ? 0 : hash(key);
    for (Entry<K,V> e = table[hash&(table.length-1)];//得到冲突链表
         e != null; e = e.next) {//依次遍历冲突链表中的每个entry
        Object k;
        //依据equals()方法判断是否相等
        if (e.hash == hash &&
            ((k = e.key) == key || (key != null && key.equals(k))))
            return e;
    }
    return null;
}
```

### put()

`put(K key, V value)`方法是将指定的`key, value`对添加到`map`里。该方法首先会对`map`做一次查找，看是否包含该元组，如果已经包含则直接返回，查找过程类似于`getEntry()`方法；如果没有找到，则会通过`addEntry(int hash, K key, V value, int bucketIndex)`方法插入新的`entry`，插入方式为**头插法**。

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/47.png)

```java
//addEntry()
void addEntry(int hash, K key, V value, int bucketIndex) {
    if ((size >= threshold) && (null != table[bucketIndex])) {
        resize(2 * table.length);//自动扩容，并重新哈希
        hash = (null != key) ? hash(key) : 0;
        bucketIndex = hash & (table.length-1);//hash%table.length
    }
    //在冲突链表头部插入新的entry
    Entry<K,V> e = table[bucketIndex];
    table[bucketIndex] = new Entry<>(hash, key, value, e);
    size++;
}
```

### remove()

`remove(Object key)`的作用是删除`key`值对应的`entry`，该方法的具体逻辑是在`removeEntryForKey(Object key)`里实现的。`removeEntryForKey()`方法会首先找到`key`值对应的`entry`，然后删除该`entry`(修改链表的相应引用)。查找过程跟`getEntry()`过程类似。

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/48.png)

```java
//removeEntryForKey()
final Entry<K,V> removeEntryForKey(Object key) {
	......
	int hash = (key == null) ? 0 : hash(key);
    int i = indexFor(hash, table.length);//hash&(table.length-1)
    Entry<K,V> prev = table[i];//得到冲突链表
    Entry<K,V> e = prev;
    while (e != null) {//遍历冲突链表
        Entry<K,V> next = e.next;
        Object k;
        if (e.hash == hash &&
            ((k = e.key) == key || (key != null && key.equals(k)))) {//找到要删除的entry
            modCount++; size--;
            if (prev == e) table[i] = next;//删除的是冲突链表的第一个entry
            else prev.next = next;
            return e;
        }
        prev = e; e = next;
    }
    return e;
}
```

##  Java8 HashMap

Java8 对 HashMap 进行了一些修改，最大的不同就是利用了红黑树，所以其由 **数组+链表+红黑树** 组成。

根据 Java7 HashMap 的介绍，我们知道，查找的时候，根据 hash 值我们能够快速定位到数组的具体下标，但是之后的话，需要顺着链表一个个比较下去才能找到我们需要的，时间复杂度取决于链表的长度，为 O(n)。

为了降低这部分的开销，在 Java8 中，当链表中的元素达到了 8 个时，会将链表转换为红黑树，在这些位置进行查找的时候可以降低时间复杂度为 O(logN)。

来一张图简单示意一下吧：

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/49.png)

注意，上图是示意图，主要是描述结构，不会达到这个状态的，因为这么多数据的时候早就扩容了。

下面，我们还是用代码来介绍吧，个人感觉，Java8 的源码可读性要差一些，不过精简一些。

Java7 中使用 Entry 来代表每个 HashMap 中的数据节点，Java8 中使用 Node，基本没有区别，都是 key，value，hash 和 next 这四个属性，不过，Node 只能用于链表的情况，红黑树的情况需要使用 TreeNode。

我们根据数组元素中，第一个节点数据类型是 Node 还是 TreeNode 来判断该位置下是链表还是红黑树的。

### put 过程分析

```java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

// 第四个参数 onlyIfAbsent 如果是 true，那么只有在不存在该 key 时才会进行 put 操作
// 第五个参数 evict 我们这里不关心
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    // 第一次 put 值的时候，会触发下面的 resize()，类似 java7 的第一次 put 也要初始化数组长度
    // 第一次 resize 和后续的扩容有些不一样，因为这次是数组从 null 初始化到默认的 16 或自定义的初始容量
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    // 找到具体的数组下标，如果此位置没有值，那么直接初始化一下 Node 并放置在这个位置就可以了
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);

    else {// 数组该位置有数据
        Node<K,V> e; K k;
        // 首先，判断该位置的第一个数据和我们要插入的数据，key 是不是"相等"，如果是，取出这个节点
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        // 如果该节点是代表红黑树的节点，调用红黑树的插值方法，本文不展开说红黑树
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        else {
            // 到这里，说明数组该位置上是一个链表
            for (int binCount = 0; ; ++binCount) {
                // 插入到链表的最后面(Java7 是插入到链表的最前面)
                if ((e = p.next) == null) {
                    p.next = newNode(hash, key, value, null);
                    // TREEIFY_THRESHOLD 为 8，所以，如果新插入的值是链表中的第 8 个
                    // 会触发下面的 treeifyBin，也就是将链表转换为红黑树
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        treeifyBin(tab, hash);
                    break;
                }
                // 如果在该链表中找到了"相等"的 key(== 或 equals)
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    // 此时 break，那么 e 为链表中[与要插入的新值的 key "相等"]的 node
                    break;
                p = e;
            }
        }
        // e!=null 说明存在旧值的key与要插入的key"相等"
        // 对于我们分析的put操作，下面这个 if 其实就是进行 "值覆盖"，然后返回旧值
        if (e != null) {
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
    }
    ++modCount;
    // 如果 HashMap 由于新插入这个值导致 size 已经超过了阈值，需要进行扩容
    if (++size > threshold)
        resize();
    afterNodeInsertion(evict);
    return null;
}
```

和 Java7 稍微有点不一样的地方就是，Java7 是先扩容后插入新值的，Java8 先插值再扩容，不过这个不重要。

### 数组扩容

resize() 方法用于初始化数组或数组扩容，每次扩容后，容量为原来的 2 倍，并进行数据迁移。

```java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    if (oldCap > 0) { // 对应数组扩容
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        // 将数组大小扩大一倍
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                 oldCap >= DEFAULT_INITIAL_CAPACITY)
            // 将阈值扩大一倍
            newThr = oldThr << 1; // double threshold
    }
    else if (oldThr > 0) // 对应使用 new HashMap(int initialCapacity) 初始化后，第一次 put 的时候
        newCap = oldThr;
    else {// 对应使用 new HashMap() 初始化后，第一次 put 的时候
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }

    if (newThr == 0) {
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr;

    // 用新的数组大小初始化新的数组
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab; // 如果是初始化数组，到这里就结束了，返回 newTab 即可

    if (oldTab != null) {
        // 开始遍历原数组，进行数据迁移。
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null;
                // 如果该数组位置上只有单个元素，那就简单了，简单迁移这个元素就可以了
                if (e.next == null)
                    newTab[e.hash & (newCap - 1)] = e;
                // 如果是红黑树，具体我们就不展开了
                else if (e instanceof TreeNode)
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                else { 
                    // 这块是处理链表的情况，
                    // 需要将此链表拆成两个链表，放到新的数组中，并且保留原来的先后顺序
                    // loHead、loTail 对应一条链表，hiHead、hiTail 对应另一条链表，代码还是比较简单的
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    if (loTail != null) {
                        loTail.next = null;
                        // 第一条链表
                        newTab[j] = loHead;
                    }
                    if (hiTail != null) {
                        hiTail.next = null;
                        // 第二条链表的新的位置是 j + oldCap，这个很好理解
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab;
}
```

### get 过程分析

相对于 put 来说，get 真的太简单了。

- 计算 key 的 hash 值，根据 hash 值找到对应数组下标: hash & (length-1)
- 判断数组该位置处的元素是否刚好就是我们要找的，如果不是，走第三步
- 判断该元素类型是否是 TreeNode，如果是，用红黑树的方法取数据，如果不是，走第四步
- 遍历链表，直到找到相等(==或equals)的 key

```java
public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}
final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) {
        // 判断第一个节点是不是就是需要的
        if (first.hash == hash && // always check first node
            ((k = first.key) == key || (key != null && key.equals(k))))
            return first;
        if ((e = first.next) != null) {
            // 判断是否是红黑树
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);

            // 链表遍历
            do {
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}
  
```

1. **HashSet 底层是HashMap**
2. **添加一个元素时，先得到hash值，会转成->索引值***
3. **找到存储数据表table，看这个索引位置是否已经存放的有元素**
4. **如果没有，直接加入**
5. **如果有，调用 equals比较，如果相同，就放弃添加，如果不相同，则添加到最后**
6. **在java8中，如果一条链表的元素个数到达 TREEIFY_THRESHOLD(默认64) 就会进行树化（红黑树）**

### HashSet 课堂练习 

定义一个Employee类，该类包含:private成员属性name,age要求:

1. 创建3个Employee 对象放入 HashSet中
2. 当name和age的值相同时，认为是相同员工，不能添加到HashSet集合中

+ 代码演示：

```java
package com.study.set_;

import java.util.HashSet;
import java.util.Objects;

public class HashSetExercise {
    public static void main(String[] args) {
        /**
        定义一个Employee类，该类包含：private成员属性name，age 要求：
         创建3个Employee 对象放入HashSet中
         当name和age的值相同时，认为是相同员工，不能添加到HashSet集合中
         */
        HashSet hashSet = new HashSet();
        hashSet.add(new Employee("milan",18));
        hashSet.add(new Employee("smith",28));
        hashSet.add(new Employee("milan",18));


        System.out.println("hashSet="+hashSet);
    }
}
class Employee{
    private String name;
    private int age;

    public Employee(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
    //如果name 和 age 值相同，则返回相同的hash值

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return age == employee.age && Objects.equals(name, employee.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}
```

### HashSet 课后练习

定义一个Employee类，该类包含：private成员属性name，salbirthday(MyDate类型),其中birthday为Mydate类型(属性包括:year,month,day),
   + 要求：
1. 创建3个Employee 放入HashSet中
2. 当name和birthday的值相同时，认为是相同员工，不能添加到HashSet集合中

+ 代码演示:

```java
package com.study.set_;

import java.util.HashSet;
import java.util.Objects;
@SuppressWarnings({"all"})
/**
 * 定义一个Employee类，该类包含：private成员属性name，salbirthday(MyDate类型),
 * 其中birthday为Mydate类型(属性包括:year,month,day),要求：
 * 1.创建3个Employee 放入HashSet中
 * 2.当name和birthday的值相同时，认为是相同员工，不能添加到HashSet集合中
 */
public class HashSetExercise02 {
    public static void main(String[] args) {
        HashSet hashSet = new HashSet();
        hashSet.add(new Employee1("frx",10.0,new MyDate(2001,1,1)));
        hashSet.add(new Employee1("frx",20.0,new MyDate(2001,1,1)));
        hashSet.add(new Employee1("milan",20.0,new MyDate(2001,1,1)));
        System.out.println("employer="+hashSet);


    }
}
class Employee1 {
    private String name;
    private double sal;
    private MyDate birthday;

    public Employee1(String name, double sal, MyDate birthday) {
        this.name = name;
        this.sal = sal;
        this.birthday = birthday;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSal() {
        return sal;
    }

    public void setSal(double sal) {
        this.sal = sal;
    }

    public MyDate getBirthday() {
        return birthday;
    }

    public void setBirthday(MyDate birthday) {
        this.birthday = birthday;
    }

    @Override
    public String toString() {
        return "Employee1{" +
                "name='" + name + '\'' +
                ", sal=" + sal + "," +
                birthday +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee1 employee1 = (Employee1) o;
        return Objects.equals(name, employee1.name) && Objects.equals(birthday, employee1.birthday);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, birthday);
    }
}
class MyDate{
    private int year;
    private int month;
    private int day;

    public MyDate(int year, int month, int day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    @Override
    public String toString() {
        return "MyDate{" +
                "year=" + year +
                ", month=" + month +
                ", day=" + day +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MyDate myDate = (MyDate) o;
        return year == myDate.year && month == myDate.month && day == myDate.day;
    }

    @Override
    public int hashCode() {
        return Objects.hash(year, month, day);
    }
}
```

## Set 接口实现类-LinkedHashSet

### LinkedHashSet 的全面说明

1. **LinkedHashSet是 HashSet的子类**
2. **LinkedHashSet底层是一个 LinkedHashMap，底层维护了一个数组+双向链表**
3. **LinkedHashSet根据元素的hashCode值来决定元素的存储位置，同时使用链表维护元素的次序(图)，这使得元素看起来是以插入顺序保存的。**
4. **LinkedHashSet不允许添重复元素**

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/25.png)

+ 代码演示:

```java
package com.study.set_;

import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.Set;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/5  15:00
 */
public class LinkedHashSetSource {
    public static void main(String[] args) {
        //分析LinkedHashSet的底层机制
        Set set = new LinkedHashSet();
        set.add(new String("AA"));
        set.add(456);
        set.add(456);
        set.add(new Customer("冯",1001));
        set.add(123);
        set.add("frx");

        System.out.println("set="+set);
        //1.LinkedHashSet 加入顺序和取出元素/数据的顺序一致
        //2.LinkedHashSet 底层维护的是一个LinkedHashMap(是HashMap)的子类
        //3.LinkedHashSet 底层结构(数组+双向链表)
        //4.添加第一次时，直接将数组table 扩容到16,存放的节点类型是LinkedHashMap$Entry
        //5.数组是 HashMap$Node[] 存放的元素/数据是 LinkedHashMap$Entry类型
        /*
        //继承关系是在内部类完成，
         static class Entry<K,V> extends HashMap.Node<K,V> {
            Entry<K,V> before, after;
            Entry(int hash, K key, V value, Node<K,V> next) {
                super(hash, key, value, next);
            }
    }
         */
    }


}
class Customer{
    String name;
    int tell;

    public Customer(String name, int tell) {
        this.name = name;
        this.tell = tell;
    }
}
```

### LinkedHashSet 课后练习题 

Car类(属性:name,price)，如果name和price一样,则认为是相同元素，就不能添加。

+ 代码演示:

```java
package com.study.set_;

import java.util.LinkedHashSet;
import java.util.Objects;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/5  15:42
 */
@SuppressWarnings({"all"})
public class LinkedHashSetExercise {
    public static void main(String[] args) {
        LinkedHashSet linkedHashSet = new LinkedHashSet();
        linkedHashSet.add(new Car("奥拓",1000));
        linkedHashSet.add(new Car("奥迪",300000));
        linkedHashSet.add(new Car("法拉利",10000000));
        linkedHashSet.add(new Car("奥迪",300000));
        linkedHashSet.add(new Car("保时捷",70000000));
        linkedHashSet.add(new Car("奥迪",300000));

        System.out.println("linkedHashSet="+linkedHashSet);


    }
}

/**
 * Car 类（属性：name ,price) 如果name和 price一样
 * 则认为是相同元素，就不能添加
 */
class Car{
    private String name;
    private double price;

    public Car(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "\nCar{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
    //重写equals方法 和hashCode
    //当name和 price相同时，就返回相同的 hashCode值，equals 返回true

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Car car = (Car) o;
        return Double.compare(car.price, price) == 0 && Objects.equals(name, car.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, price);
    }
}
```

### TreeSet底层机制及源码剖析

+ 代码演示：

```java
package com.study.set_;

import java.util.Comparator;
import java.util.TreeSet;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/14  10:51
 */
@SuppressWarnings({"all"})
public class TreeSet_ {
    public static void main(String[] args) {


        //1.当我们使用无参构造器，创建TreeSet时，仍然是无序的
        //2.老师希望添加的元素，按照字符串大小来排序
        //3.使用TresSet提供的一个构造器，可以传入一个比较器
        //  并指定排序位置


        TreeSet treeSet = new TreeSet(new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {

                //下面调用String的  compareTo 方法进行字符串大小
//                return ((String)o1).compareTo((String)o2);
                return ((String) o1).length()-((String) o2).length();
            }
        });


//       添加数据
        treeSet.add("jack");
        treeSet.add("tom");
        treeSet.add("sp");
        treeSet.add("a");

        System.out.println("treeSet="+treeSet);


        //源码解读
        //1.构造器把传入的比较器对象，赋给了TreeSet的底层的 TreeMap的属性this.comparator
        /*
         public TreeMap(Comparator<? super K> comparator) {
                this.comparator = comparator;
            }
          2.在调用 treeSet.add("tom"),在底层会执行到
           if (cpr != null) {//cpr就是我们的匿名内部类(对象)
            do {
                parent = t;
                cmp = cpr.compare(key, t.key);
                //动态绑定到我们的匿名内部类(对象)compare
                if (cmp < 0)
                    t = t.left;
                else if (cmp > 0)
                    t = t.right;
                else  //如果相等，即返回0，这个key就没有加入
                    return t.setValue(value);
            } while (t != null);
        }

         */
    }
}

```

## Map 接口和常用方法

### Map 接口实现类的特点 

1. **Map与Collection并列存在，用于保存具有映射关系的数据：Key-Value（双列元素)**
2. **Map 中的 key 和 value 可以是任何引用数据类型，会封装到HashMap和$Node对象中**
3. **Map 中的 key 不允许重复，，原因和Hashset 一样，**
4. **Map 中的value可以重复**
5. **Map 中的key可以为null，value 也可以为null，注意key为null，只能有一个，value为 null，可以有多个**
6. **常用String类作为Map的key**
7. **key 和 value之间存在单向一对一关系，即通过指定的key 总能找到对应的value**

- 代码演示:

```java
package com.study.map_;

import java.util.HashMap;
import java.util.Map;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/7  16:12
 */
public class Map_ {
    public static void main(String[] args) {
        //Map 接口实现类的特点
        //1.Map与Collection并列存在，用于保存具有映射关系的数据：Key-Value（双列元素）
        //2.Map 中的 key 和 value 可以是任何引用数据类型，会封装到HashMap和$Node对象中
        //3.Map 中的 key 不允许重复，，原因和Hashset 一样，
        //4.Map 中的value可以重复
        //5.Map 中的key可以为null，value 也可以为null，注意key为null，只能有一个，value为 null，可以有多个

        Map map = new HashMap();
        map.put("n01","frx");//k-v
        map.put("n02","张无忌");//k-v
        map.put("n01","hhh");//当有相同的key 时 就等价于替换。
        map.put("n03","frx");//k-v

        map.put(null,null);
        map.put(null,"abc");//等价替换
        map.put("n04",null);//k-v
        map.put("n05",null);
        map.put(1,"赵敏");
        map.put(new Object(),"hh");

        System.out.println(map.get("n03"));
        //通过get方法，传入key，会返回对应的 value

        System.out.println("map="+map);


    }
}

```

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/28.png)

### Map 接口常用方法

- 代码演示:

```java
package com.study.map_;

import java.awt.print.Book;
import java.util.HashMap;
import java.util.Map;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/7  17:15
 */
@SuppressWarnings({"all"})
public class MapMethod {
    public static void main(String[] args) {
        //演示map接口常用方法

        Map map = new HashMap();
        map.put("邓超",new Book0("",100));
        map.put("邓超","孙俪");//替换
        map.put("宝宝","哈哈");//ok
        map.put("继续","努力");//ok
        map.put("明天","努力");//ok
        map.put("加油",null);//ok
        map.put(null,"牛牛");//ok
        map.put("去去","来来");//ok

        System.out.println("map="+map);

        //remove:根据键删除映射关系
        map.remove(null);
        System.out.println("map="+map);
        //get:根据键获取值
        Object val=map.get("明天");
        System.out.println("val="+val);
        //size：获取元素个数
        System.out.println("k-v="+map.size());
        //isEmpty：判断个数是否为空
        System.out.println(map.isEmpty());
        //clear:清除k-v
      //  map.clear();
        System.out.println("map"+map);
        //containsKey:查找键是否存在
        System.out.println("结果为"+map.containsKey("加油"));//F



    }
}
class Book0{
    private String name;
    private int num;

    public Book0(String name, int num) {
        this.name = name;
        this.num = num;
    }
}
```

### Map 接口遍历方法

1. **containsKey:查找键是否存在**
2. **keySet:获取所有的键**
3. **entrySet:获取所有关系k-v**
4. **values:获取所有的值**

- 代码演示:

```java
package com.study.map_;

import java.util.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/7  19:54
 */
@SuppressWarnings({"all"})
public class MapFor_ {
    public static void main(String[] args) {
        Map map = new HashMap();
        map.put("宝宝","哈哈");//ok
        map.put("继续","努力");//ok
        map.put("明天","努力");//ok
        map.put("加油",null);//ok
        map.put(null,"牛牛");//ok
        map.put("去去","来来");//ok

        //第一组：先取出所有的key，通过key取出对应的Value
        Set keyset= map.keySet();
        //(1)增强for
        System.out.println("-------第一种方式------");
        for (Object key :keyset) {
            System.out.println(key+"-"+map.get(key));

        }
        //(2)迭代器
        System.out.println("-------第二钟方式------");
        Iterator iterator = keyset.iterator();
        while (iterator.hasNext()) {
            Object key =  iterator.next();
            System.out.println(key+"-"+map.get(key));

        }
        //第二组：把所有的value值取出来
        Collection values = map.values();
        //这里可以使用所有的Collections使用的遍历方式
        //(1)增强for
        System.out.println("------取出所有的value------");
        for (Object value :values) {
            System.out.println(value);

        }
        //(2)迭代器
        System.out.println("------取出所有得value------");
        Iterator iterator1 = values.iterator();
        while (iterator1.hasNext()) {
            Object value =  iterator1.next();
            System.out.println(value);

        }
        //第三组：通过EntrySet 来获取 k-v
        Set entrySet = map.entrySet();
        //(1)增强for
        System.out.println("-----使用EntrySet的 for增强(第3种)-------");
        for (Object entry :entrySet) {
            //将entry转成 Map.Entry
            Map.Entry m=(Map.Entry) entry;
            System.out.println(m.getKey()+"-"+m.getValue());

        }
        //(2)迭代器
        System.out.println("-----使用EntrySet的 迭代器(第4种)---------");
        Iterator iterator2 = entrySet.iterator();
        while (iterator2.hasNext()) {
            Object entry = iterator2.next();
          //  System.out.println(entry.getClass());//HashMap$Node-实现->Map.Entry(getKey,getVal)
            //向下转性 Map.Entry
            Map.Entry m=(Map.Entry) entry;

            System.out.println(m.getKey()+"-"+m.getValue());

        }


    }
}

```

### Map 接口课堂练习

1. 使用HashMap添加3个员工对象，要求
2. 键:员工id
3. 值:员工对象
4. 并遍历显示工资>18000的员工(遍历方式最少两种)员工类:姓名、工资、员工id

- 代码演示:

```java
package com.study.map_;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/8  16:35
 */
public class MapExercise_ {
    public static void main(String[] args) {

        Map hashMap = new HashMap();
        //添加对象
        hashMap.put(1,new Emp("Jack",300000,1));
        hashMap.put(2,new Emp("tom",21000,2));
        hashMap.put(1,new Emp("milan",12000,3));

        //遍历2种方式：
        //1.使用keySet->增强for
        Set keySet= hashMap.keySet();
        for (Object key :keySet) {
            //获取    value
            Emp emp = (Emp) hashMap.get(key);
            if (emp.getSal()>18000){
                System.out.println(emp);
            }
        }


        //2.使用EntrySet->迭代器
        Set entrySet=hashMap.entrySet();
        System.out.println("=======迭代器========");
        Iterator iterator = entrySet.iterator();
        while (iterator.hasNext()) {
            Map.Entry entry = (Map.Entry) iterator.next();
            System.out.println(entry.getClass());
            //通过entry 取得key 和value
            Emp emp=(Emp) entry.getValue();
            if(emp.getSal()>18000){
                System.out.println(emp);
            }

            
        }


    }
}
/**
 * 使用HashMap添加3个员工对象，要求
 * 键：员工id
 * 值：员工对象
 *
 * 并遍历显示工资>18000的员工(遍历方式最少两种)
 * 员工类：姓名、工资、员工id
 */
class Emp{
    private String name;
    private double sal;
    private int id;

    public Emp(String name, double sal, int id) {
        this.name = name;
        this.sal = sal;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSal() {
        return sal;
    }

    public void setSal(double sal) {
        this.sal = sal;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Emp{" +
                "name='" + name + '\'' +
                ", sal=" + sal +
                ", id=" + id +
                '}';
    }
}
```

## Map 接口实现类-HashMap

### HashMap 小结

1. **Map接口的常用实现类:HashMap、Hashtable和Properties。**
2. **HashMap是 Map 接口使用频率最高的实现类。**
3. **HashMap是以 key-val对的方式来存储数据(HashMap$Node类型)[案例Entry ]**
4. **key不能重复,但是值可以重复,允许使用null键和null值.**
5. **如果添加相同的key，则会覆盖原来的key-val ,等同于修改.(key不会替换，val会替换)**
6. **与HashSet一样，不保证映射的顺序，因为底层是以hash表的方式来存储的. (jdk8的hashMap底层数组+链表+红黑树)**
7. **HashMap没有实现同步，因此是线程不安全的,方法没有做同步互斥的操作，没有
   synchronized**

### HashMap 底层机制及源码剖析图

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/32.png)

### HashMap 底层机制及源码剖析

- 代码演示:

```java
package com.study.map_;

import java.util.HashMap;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/10  20:54
 */
@SuppressWarnings({"all"})
public class HashMapSource01 {
    public static void main(String[] args) {
        HashMap map = new HashMap();
        map.put("java",10);//ok
        map.put("php",10);//ok
        map.put("java",20);//替换value


        System.out.println("map="+map);

    }
}

```

```java
//1.执行构造器 new HashMap()
	public HashSet() {
        map = new HashMap<>();
        }
  //初始化加载因子 loadFactor=0.75
  // HashMap$Node[] table =null
//2.执行put  调用hash方法，计算key的hash值(h = key.hashCode()) ^ (h >>> 16)
    public V put(K key,V value){
        return putVal(hash(key),key,value,false,true);
        }
//3.执行putVal方法
    final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                   boolean evict) {
        Node<K,V>[] tab; Node<K,V> p; int n, i;//辅助变量
        
        //如果底层的table 数组为 null，或者 length=0，就扩容到16
        if ((tab = table) == null || (n = tab.length) == 0)
            n = (tab = resize()).length;
        
        //取出hash值对应的table的索引位置的Node,如果为null，就直接把加入的k-v
        //创建一个Node ，加入该位置即可
        if ((p = tab[i = (n - 1) & hash]) == null)
            tab[i] = newNode(hash, key, value, null);
        else {
            Node<K,V> e; K k;//辅助变量
            
            if (p.hash == hash &&
                ((k = p.key) == key || (key != null && key.equals(k))))
                //如果table的索引位置的key的hash相同和key的hash相同
                //并满足（存在的结点key和准备添加的key是同一个对象 || equals返回真 )
                //就认为不能加入新的k-v
                e = p;
            else if (p instanceof TreeNode)//如果当前的table的已有的Node是红黑数，就按照红黑树的方式处理
                e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
            else {
                //如果找到的结点，后面是链表，就循环比较
                for (int binCount = 0; ; ++binCount) { //死循环
                    if ((e = p.next) == null) {  //如果整个链表，没有和他相同，就加到该链表的最后
                        p.next = newNode(hash, key, value, null);
                        //加入后，判断当前链表的个数，是否已经到8个，到8个，后
                        //就调用 treeifyBin 方法进行红黑树的转换
                        if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                            treeifyBin(tab, hash);
                        break; 
                    }
                    if (e.hash == hash &&
                        ((k = e.key) == key || (key != null && key.equals(k))))
                        break; //如果在循环比较中，发现有相同，就break
                    p = e;
                }
            }
            if (e != null) { // existing mapping for key
                V oldValue = e.value;
                if (!onlyIfAbsent || oldValue == null)
                    e.value = value;  //替换key对应的value
                afterNodeAccess(e);
                return oldValue;
            }
        }
        ++modCount;  //每增加一个Node,就size++
        if (++size > threshold)//如size>临界值，就扩容
            resize();
        afterNodeInsertion(evict);
        return null;
    }
//4.关于树化(转成红黑树)
////如果table为 null 或者大小还没到 64，展示不会树化，而是进行扩容
////否则才会真正的树化 ->剪枝（删除的足够多 转化为链表)
   final void treeifyBin(Node<K,V>[] tab, int hash) {
        int n, index; Node<K,V> e;
        if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
            resize();
        else if ((e = tab[index = (n - 1) & hash]) != null) {
            TreeNode<K,V> hd = null, tl = null;
            do {
                TreeNode<K,V> p = replacementTreeNode(e, null);
                if (tl == null)
                    hd = p;
                else {
                    p.prev = tl;
                    tl.next = p;
                }
                tl = p;
            } while ((e = e.next) != null);
            if ((tab[index] = hd) != null)
                hd.treeify(tab);
        }
    }
```

## Map 接口实现类-Hashtable

### HashTable 的基本介绍)

1. 存放的元素是键值对：即k-v
2. hashtable的键和值都不能为null，否则会抛出NullPointerException
3. hashtable使用的方法基本上和HashMap一样
4. hashtable是线程安全的(synchronized),hashMap是线程不安全的

- 代码演示：

```java
package com.study.map_;

import java.util.Hashtable;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/12  17:23
 */
@SuppressWarnings({"all"})
/*
Hashtable 简介
1.存放的元素是键值对：即k-v
2.hashtable的键和值都不能为null，否则会抛出NullPointerException
3.hashtable使用的方法基本上和HashMap一样
4.hashtable是线程安全的(synchronized),hashMap是线程不安全的
 */
public class HashTableExercise {
    public static void main(String[] args) {
        Hashtable table = new Hashtable();//ok
        table.put("john",100);//ok
       // table.put(null,100);//异常  NullPointerEeception
       // table.put("john",null);//异常 NullPointerEeception
        table.put("lucy",100);//ok
        table.put("lic",100);//ok
        table.put("lic",88);//替换
        table.put("hello1",1);
        table.put("hello2",1);
        table.put("hello3",1);
        table.put("hello4",1);
        table.put("hello5",1);
        table.put("hello6",1);
        table.put("hello7",1);

        System.out.println(table);

        //简单说明一下Hashtable的底层
        //1.底层有数组 Hashtable$Entry[] 初始化大小为11
        //2.临界值threshold 8=11 * 0.75
        //3.扩容：按照自己的扩容机制来进行即可，
        //4.执行方法 addEntry(hash,key,value,index):添加k-v 封装到Entry
        //5.当 if(count>=threshold)满足时，就进行扩容
        //6.按照 int newCapacity=(oldCapacity<<1)+1;的大小扩容

       


    }
}

```

### Hashtable 和 HashMap 对比

|           | 版本 | 线程安全(同步) | 效率 | 运行null键null值 |
| :-------: | :--- | -------------- | :--- | :--------------- |
|  HashMap  | 1.2  | 不安全         | 高   | 可以             |
| Hashtable | 1.0  | 安全           |      | 不可以           |

## Map 接口实现类-Properties

### 基本介绍

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/34.png)

### 基本使用

- 代码演示:

```java
package com.study.map_;

import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/14  9:54
 */
public class Properties_ {
    public static void main(String[] args) {


        //1.Properties 继承了 Hashtable
        //2.可以通过k-v 存放数据，当然key和value不能为null

        //增加
        Properties properties = new Properties();

//        properties.put(null,"abc");
//        properties.put("abc",null); 空指针异常
        properties.put("john",100);//k-v

        properties.put("lucy",100);
        properties.put("lic",100);
        properties.put("lic",88);//替换


        System.out.println("properties"+properties);


        //通过k 获取对应v
        System.out.println(properties.get("lic"));//88

        //删除
        properties.remove("john");
        System.out.println("properties="+properties);

    }
}

```

## 总结-开发中如何选择集合实现类(记住)

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/35.png)

## Collections 工具类

### Collections 工具类介绍

1. **Collections是一个操作 Set、List和 Map等集合的工具类**
2. **Collections中提供了一系列静态的方法对集合元素进行排序、查询和修改等操作**

### 排序操作：（均为 static 方法)

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/36.png)

- 查找，替换：

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/37.png)

- 代码演示：

```java
package com.study.collections_;

import java.lang.reflect.Array;
import java.util.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/14  15:17
 */
public class Collections_ {
    public static void main(String[] args) {

        //创建ArrayList集合，用于测试Collections工具类的静态方法
        List list = new ArrayList();
        list.add("tom");
        list.add("smith");
        list.add("king");
        list.add("milan");

        //reverse(list):反转List 中元素的顺序
        for (int i = 0; i < 5; i++) {


            Collections.reverse(list);
        }
        System.out.println("list=" + list);

        //shuffle(List): 对List集合进行随机排序

        Collections.shuffle(list);
        System.out.println("list=" + list);

        //sort(list)根据元素的自然排序 对指定 List集合元素按升序集合
        Collections.sort(list);
        System.out.println("自然排序后");
        System.out.println("list=" + list);

        //sort(list, Comparator):根据指定的 Comparator 产生的顺序对 List 集合元素
        //希望按照字符串的长度大小排序
        Collections.sort(list, new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                //可以加入校验代码
                return ((String) o2).length() - ((String) o1).length();
            }
        });
        System.out.println("字符串长度大小排序=" + list);

        //swap(List,int,int):将指定list集合中的i处元素和j处元素进行交换
        Collections.swap(list,0,1);
        System.out.println("交换后的情况");
        System.out.println("list="+list);


        //Object max(Collection):根据元素的自然顺序，返回给定集合中的最大元素
        System.out.println("自然顺序最大元素="+Collections.max(list));
        //Object max(Collection,Comparator):指定的顺序，返回给定集合中的最大元素
        //比如，我们要返回长度最大的元素

        Object maxObject =Collections.max(list, new Comparator() {
            @Override
            public int compare(Object o1, Object o2) {
                return ((String)o1).length()-((String)o2).length();
            }
        });
        System.out.println("长度最大的="+maxObject);


        //int frequency(Collection,Object):返回指定集合中指定元素的出现次数
        System.out.println("tom出现的次数="+Collections.frequency(list,"tom"));


        //void copy(List dest,List src):将src中的内容复制到dest中

        ArrayList dest = new ArrayList();
        //为了完成一个完整拷贝，我们需要先给dest 赋值，
        //拷贝

        Collections.copy(dest,list);
        System.out.println("dest="+dest);

        //boolean replaceAll(List list,Object oldVal,Object newVal):使用新值替换List 对象的所有旧址
        //如果list中，有tom就替换成 汤姆
        Collections.replaceAll(list,"tom","汤姆");
        System.out.println("list替换后="+list);



}


}
```

## TreeMap底层机制及源码剖析

- 代码实现：

```java
package com.study.map_;

import java.util.Comparator;
import java.util.TreeMap;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/14  14:22
 */
@SuppressWarnings({"all"})
public class TreeMap_ {
    public static void main(String[] args) {

        //使用默认构造器，创建TressMap,是无序的(也没有排序)

        TreeMap treeMap = new TreeMap(
                new Comparator() {
                    @Override
                    public int compare(Object o1, Object o2) {
//                        要求：按照传入的key(String) 的大小排序
//                        return ((String) o1).compareTo((String) o2);
                        //要求按照字符串的长度大小来排序
                        return ((String) o1).length()-((String) o2).length();
                    }
                }
        );
        treeMap.put("jack","杰克");
            treeMap.put("tom","汤姆");
        treeMap.put("kristina","克瑞斯提诺");
        treeMap.put("smith","史密斯");
        treeMap.put("frx","冯荣旭");//加入不了


        System.out.println("treeMap="+treeMap);

        /*1.构造器，把传入的实现了Comparator接口的匿名内部类，传给了TreeMap
                   public TreeMap(Comparator<? super K> comparator) {
                    this.comparator = comparator;
    }
          2.调用put方法
          2.1第一次添加，把k-v封装到Entry 对象，放入boot
          if (t == null) {
            compare(key, key); // type (and possibly null) check

            root = new Entry<>(key, value, null);
            size = 1;
            modCount++;
            return null;
        }
          2.2以后添加
           if (cpr != null) {
            do {//遍历所有的key，给当前的key找到适当位置
                parent = t;
                cmp = cpr.compare(key, t.key);//动态绑定到我们的匿名内部类的compare
                if (cmp < 0)
                    t = t.left;
                else if (cmp > 0)
                    t = t.right;
                else//如果遍历过程中，发现准备添加key 和当前已有的key 相等，就不添加
                    return t.setValue(value);
            } while (t != null);
        }



         */
    }
}

```

## 本章作业

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/38.png)

```java
package com.study.homework;

import java.util.ArrayList;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/14  23:30
 */
public class Homework01 {
    public static void main(String[] args) {

        ArrayList arrayList = new ArrayList();
        arrayList.add(new News("新冠确诊病例超千万，数百万印度教信徒赴恒河“圣域”因民众担忧"));
        arrayList.add(new News("男子突然想起2个月前钓的鱼还在网兜里，捞起一看赶紧放生"));

       
        int size= arrayList.size();
        for (int i = size-1; i >=0 ; i--) {
           // System.out.println(arrayList.get(i));
            News news=(News) arrayList.get(i);
            System.out.println(processTitle(news.getTittle()));
            
        }
    }

    //专门写个方法，处理现实新闻标题
    public static String processTitle(String title){
        if(title==null){
            return "";
        }
        if (title.length()>15){
            return title.substring(0,15)+"...";//

        }else {
            return title;
        }
    }

}

/**
 * (1)封装一个新闻类，包含标题和内容属性，提供get.set方法，重写toString方法，打印对象
 * (2)只提供一个带参数的构造器，实例化对象时，只初始化标题：并且实例化两个对象：
 * 新闻一：新冠确诊病例超千万，数百万印度教信徒赴恒河“圣域”因民众担忧
 * 新闻二：男子突然想起2个月前钓的鱼还在网兜里，捞起一看赶紧放生
 * (3)将新闻对象添加到ArrayList集合中，并且进行倒序遍历；
 * (4)在遍历集合过程中，对新闻标题进行处理，超过15字的只保留15个，然后在后面加"..."
 * (5)在控制台打印遍历出经过处理的新闻标题；
 */
class News{
    private String tittle;
    private String content;

    public News(String tittle) {
        this.tittle = tittle;
    }

    public String getTittle() {
        return tittle;
    }

    public void setTittle(String tittle) {
        this.tittle = tittle;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public String toString() {
        return "News{" +
                "tittle='" + tittle + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}

```

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/39.png)

```java
package com.study.homework;

import java.util.ArrayList;
import java.util.Iterator;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  0:31
 */
public class Homework02 {
    public static void main(String[] args) {

        ArrayList arrayList = new ArrayList();
        Car car=new Car("xxx",25);
        Car car2=new Car("xxX",55);

//         *1.add:添加单个元素
        arrayList.add(car);
        arrayList.add(car2);
//                *2.remove:删除指定元素
        arrayList.remove(car2);
//                *3.contains:查找元素是否存在
        System.out.println(arrayList.contains(car2));//F
//                *4.size:获取元素个数
        System.out.println(arrayList.size());//1
//                *5.isEmpty:判断是否为空
        System.out.println(arrayList.isEmpty());//F
//                *6.clear:清空
       // System.out.println(arrayList.clear());
//                *7.addAll:添加多个元素
        System.out.println(arrayList.addAll(arrayList));
//                *8.containsAll:查找多个元素是否都存在
//                *9.removeAll:删除多个元素
  //      arrayList.removeAll(arrayList);//清空
//                * 使用增强for和迭代器来遍历所有的car，需要重写Car的toString方法
        for (Object o :arrayList) {
            System.out.println("o="+o);

        }

        Iterator iterator = arrayList.iterator();
        while (iterator.hasNext()) {
            Object obj = iterator.next();
            System.out.println("obj="+obj);
        }


    }
}
/**使用ArrayList完成对 对象Car{name,price}的各种操作
 *1.add:添加单个元素
 *2.remove:删除指定元素
 *3.contains:查找元素是否存在
 *4.size:获取元素个数
 *5.isEmpty:判断是否为空
 *6.clear:清空
 *7.addAll:添加多个元素
 *8.containsAll:查找多个元素是否都存在
 *9.removeAll:删除多个元素
 * 使用增强for和迭代器来遍历所有的car，需要重写Car的toString方法
 *
 *
 *
 */
class Car{
    private String name;
    private double price;

    public Car(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Car{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }
}
```

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/40.png)

```java
package com.study.homework;

import java.util.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  9:54
 */
@SuppressWarnings({"all"})
public class Homework03 {
    public static void main(String[] args) {

        Map m= new HashMap();
        m.put("jack",650);
        m.put("tom",1200);
        m.put("smith",2900);
        System.out.println(m);

        m.put("jack",2600);//替换
        System.out.println(m);

        //为所有员工工资加薪100元；
        //keySet //先得到key 再用key得到value+100
        Set keySet=m.keySet();
        for (Object key :keySet) {
            m.put(key,(Integer)m.get(key)+100);//向下转型

        }
        System.out.println(m);

        for (Object key :keySet) {
            System.out.println(key+"-"+m.get(key));

        }

        System.out.println("=====使用迭代器遍历所有员工=====");
        Set entrySet= m.entrySet();
        Iterator iterator = entrySet.iterator();
        //迭代器 //entrySet 得到的是键值对 最后再用 getkey 和 getvalue 来获得key和value
        while (iterator.hasNext()) {
            Map.Entry entry =  (Map.Entry) iterator.next();
            System.out.println(entry.getKey()+"-"+entry.getValue());
        }
        System.out.println("=====遍历所有的工资=====");
        Collection values=m.values();
        for (Object value :values) {
            System.out.println("value="+value);

        }

    }
}

```

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/42.png)

```java
package com.study.homework;

import java.util.TreeMap;
import java.util.TreeSet;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  11:06
 */
public class Homework05 {
    public static void main(String[] args) {

        TreeSet treeSet = new TreeSet();
        //分析源码
        //add 方法，因为TreeSet()方法 构造器没有传入Comparator接口的匿名内部类
        //所以在底层Comparable<? super K> k = (Comparable<? super K>) key;
        //即 把Person 转成Comparable类型
        treeSet.add(new Person());//ClassCastException

    }
}
class Person implements Comparable{
    @Override
    public int compareTo(Object o) {

        return 0;
    }
}
```

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/43.png)

```java
package com.study.homework;

import java.util.HashSet;
import java.util.Objects;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  11:35
 */
public class Homework06 {
    public static void main(String[] args) {
        HashSet hashSet = new HashSet();


        Person p1 = new Person(1111, "aaa");
        Person p2 = new Person(2222, "bbb");
        hashSet.add(p1);
        hashSet.add(p2);

        p1.name="CCC";//p1属性发生变化 底层hash值 发生变化

        hashSet.remove(p1); //删除的时候发现原来的p1hash值 找不到了 删除失败
        System.out.println(hashSet);


        hashSet.add(new Person(1001,"DDD"));
        System.out.println(hashSet);

        hashSet.add(new Person(1001,"aaa"));
        System.out.println(hashSet); //跟p1 的1001，”ccc“ 比较hash值不同 添加成功

    }
}
class Person{
    public int id;
    public String name;

    public Person(int id, String name) {
        this.id = id;
        this.name = name;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return id == person.id && Objects.equals(name, person.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "Person{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
```

- 运行结果：

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jihe/44.png)

## 参考资料

+ https://www.pdai.tech/

  





