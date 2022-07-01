---
title: Java 泛型
date: 2021-12-20 18:44:12
permalink: /pages/6a0f85/
categories:
  - java
tags:
  - java
---
# Java 泛型

## 泛型的理解和好处

### 看一个需求

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/fanxing/01.png)

代码实现：

```java
package cmd.study.generic;

import java.lang.reflect.Array;
import java.util.ArrayList;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  17:34
 */
public class Generic01 {
    public static void main(String[] args) {
        ArrayList arrayList = new ArrayList();
        arrayList.add(new Dog("旺财",10));
        arrayList.add(new Dog("发财",1));
        arrayList.add(new Dog("小黄",5));

        //假如程序员不小心添加了一只猫
        arrayList.add(new Cat("发财猫",8));
        //类型转换异常
        //遍历
        for (Object o :arrayList) {
            //向下转型Object->Dog
            Dog dog =(Dog) o;
            System.out.println(dog);

        }

    }

}
/*
请编写程序，在ArrayList中，添加3个Dog对象
Dog对象含有name和age，并输出name和age(要求使用getXxx())
 */
class Dog {
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
class Cat {
    private String name;
    private int age;

    public Cat(String name, int age) {
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

### 使用传统方法的问题分析

1. **不能对加入到集合ArrayList中的数据类型进行约束(不安全)**
2. **遍历的时候，需要进行类型转换,如果集合中的数据量较大，对效率有影响**

### 泛型快速体验-用泛型来解决前面的问题

代码实现：

```java
package cmd.study.generic.improve;

import java.util.ArrayList;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  17:39
 */
@SuppressWarnings({"all"})
public class Generic02 {
    public static void main(String[] args) {

        //使用泛型
        //1.当我们ArrayList<Dog>表示存放到ArrayList 集合元素中是Dog类型
        //2.如果编译器发现添加的类型，不满足要求，就会报错
        //3.在遍历的时候，可以直接取出Dog类型 而不是Object类型
        ArrayList<Dog> arrayList = new ArrayList<Dog>();
        arrayList.add(new Dog("旺财",10));
        arrayList.add(new Dog("发财",1));
        arrayList.add(new Dog("小黄",5));

        //加入程序员不小心添加了一只猫
        //arrayList.add(new Cat("发财猫",8));
        System.out.println("===使用泛型===");
        for (Dog dog :arrayList) {
            System.out.println(dog);
            
        }

    }
}
/*
请编写程序，在ArrayList中，添加3个Dog对象
Dog对象含有name和age，并输出name和age(要求使用getXxx())
 */
class Dog {
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
class Cat {
    private String name;
    private int age;

    public Cat(String name, int age) {
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

## 泛型的理解和好处

### 泛型的好处

1. **编译时，检查添加元素的类型，提高了安全性**
2. **减少了类型转换的次数,提高效率**[说明]
+ √不使用泛型
+ Dog -加入-> object -取出-> Dog //放入到ArrayList 会先转成Object，在取出时，还需要转换成Dog
+ √使用泛型
+ Dog -> Dog -> Dog 1/放入时，和取出时，不需要类型转换，提高效率
3. **不再提示编译警告**

## 泛型介绍

**泛(广泛)型(类型)=> Integer, String,Dog**
1. **泛型又称参数化类型，是jdk5.0出现的新特性,解决数据类型的安全性问题**
2. **在类声明或实例化时只要指定好需要的具体的类型即可。**
3. **Java泛型可以保证如果程序在编译时没有发出警告，运行时就不会产ClassCastException异常。同时，代码更加简洁、健壮**
4. 泛型的作用是:**可以在类声明时通过一个标识表示类中某个属性的类型，或者是某个方法的返回值的类型，或者是参数类型**。[有点难,举例GenericO3.java]

代码演示：

```java
package cmd.study.generic.improve;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  19:38
 */
public class Generic03 {
    public static void main(String[] args) {
        //注意，特别强调E具体的数据类型在定义Person对象的时候指定,即在编译期间，就确定E是什么类型

        Person<String> person = new Person<>("哈哈哈哈");
        person.show();

        /*
        可以理解成
        class Person{
            String s;//E表示s的数据类型，该数据类型在定义Person对象的时候指定,即在编译期间，就确定E是什么

            public Person(String s) {//E也可以是参数类型
                this.s = s;
            }
            public String f(){//返回类型使用E
                return s;
            }
        }

         */
        Person<Integer> person1 = new Person<>(100);

    }
}
//泛型的作用是：可以在类声明时通过一个标识表示类中的某个属性的类型，
//  或者是某个方法的返回值的类型，或者是参数类型
class Person<E>{
    E s;//E表示s的数据类型，该数据类型在定义Person对象的时候指定

    public Person(E s) {//E也可以是参数类型
        this.s = s;
    }
    public E f(){//返回类型使用E
        return s;
    }
    public void show(){
        System.out.println(s.getClass());//显示s的运行类型
    }
}
```

## 泛型的语法

### 泛型的声明

**interface接口 \<T\> {}和  class类<K，V>{}**
+ 比如:**List , ArrayList**
+ 说明:
1. **其中，T,K,V不代表值,而是表示类型。**
2. **任意字母都可以。常用T表示，是Type的缩写。**

### 泛型的实例化

要在类名后面指定类型参数的值(类型)。如:
1. **List\<String> strList = new  ArrayList\<String>();**[举例说明]
2. **lterator\<Customer> iterator = customers.iterator();**

### 泛型使用举例

举例说明，泛型在 HashSet,HashMap的使用情况,
练习:
1. 创建3个学生对象
2. 放入到HashMap中，使用.
3. 要求Key 是 String name, Value就是学生对象
4. 使用两种方式遍历

代码演示：

```java
package cmd.study.generic;

import java.util.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  20:05
 */
@SuppressWarnings({"all"})
public class GenericExercise {
    public static void main(String[] args) {


        //使用泛型方式给HashSet 放入3个学生对象
        HashSet<Student> students = new HashSet<Student>();
        students.add(new Student("jack",18));
        students.add(new Student("tom",28));
        students.add(new Student("mary",19));


        //遍历
        for (Student student :students) {
            System.out.println(student);

        }
        //使用泛型方式给HashMap 放入3个学生对象
     //   k->String V->Student
        HashMap<String, Student> studentHashMap = new HashMap<String,Student>();
        studentHashMap.put("milan",new Student("milan",38));
        studentHashMap.put("smith",new Student("smith",48));

        //迭代器 EntrySet
        /*public Set<Map.Entry<K,V>> entrySet() {
            Set<Map.Entry<K,V>> es;
          return (es = entrySet) == null ? (entrySet = new EntrySet()) : es; }
            */

        Set<Map.Entry<String, Student>> entries = studentHashMap.entrySet();
        /*
        /* public final Iterator<Map.Entry<K,V>> iterator() {
               return new EntryIterator();
          } */


        Iterator<Map.Entry<String, Student>> iterator = entries.iterator();
        System.out.println("==========================");
        while (iterator.hasNext()) {
            Map.Entry<String, Student> next = iterator.next();
            System.out.println(next.getKey()+"-"+next.getValue());

        }



    }
}
class Student{
    private String name;
    private int age;

    public Student(String name, int age) {
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
        return "Student{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

### 泛型使用的注意事项和细节 

1. **interface List\<T\>0 , public class Hashset\<E>0..等等说明:T,E只能是引用类型**
2. 看下面语句是否正确?
   + List\<Integer> list = new ArrayList\<Integer>();//OK
   + List\<int> list2 = new ArrayList\<int>();//错误
3. **在给泛型指定具体类型后，可以传入该类型或者其子类类型**
4. **泛型使用形式**
    + **List\<Integer> list1 = new ArrayList\<Integer>();**
    + **List\<Integer> list2 = new ArrayList\<>();[说明:]**
    + **如果我们这样写List list3 = new ArrayList(;默认给它的泛型是[\<E>E就是 Object ]**

```java
package cmd.study.generic;

import java.util.ArrayList;
import java.util.List;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  20:30
 */
public class GenericDetail {
    //给泛型指向数据类型时，要求是引用数据类型，不能是基本数据类型
    public static void main(String[] args) {
        List<Integer> list = new ArrayList<Integer>();//OK
        //List<int> list2 = new ArrayList<int>();//错误


        //2.
        //因为 E指向了 A类型，构造器传入了 new A()
        //在给泛型指定具体类型后，可以传入该类型或者其子类类型
        Pig<A> aPig = new Pig<A>(new A());
        aPig.f();
        Pig<A> aPig2 = new Pig<A>(new B());
        aPig2.f();

        //3.泛型使用形式
        ArrayList<Integer> list1 = new ArrayList<Integer>();
        List<Integer> list2 = new ArrayList<Integer>();
        //在实际开发中，我们往往简写
        //编译器会进行类型推断
        ArrayList<Integer> list3 = new ArrayList<>();
        List<Integer> list4 = new ArrayList<>();

        //4.如果是这样写，泛型默认是Object
        ArrayList<Object> arrayList = new ArrayList<>();//等价ArrayList arrayList = new ArrayList();

        /*
            public boolean add(E e) {
                ensureCapacityInternal(size + 1);  // Increments modCount!!
                elementData[size++] = e;
                return true;
            }
         */


        Tiger tiger = new Tiger();
  /*
class Tiger { //类
        Object e;
        public Tiger() {}
        public Tiger(Object e) {
         this.e = e; }
         }
         */


    }
}

class Tiger<E>{//类
    E e;

    public Tiger() {
    }

    public Tiger(E e) {
        this.e = e;
    }
}
class A{}
class B extends A{}
class Pig<E>{//
    E e;

    public Pig(E e) {
        this.e = e;
    }
    public void f(){
        System.out.println(e.getClass());
    }
}
```

## 泛型课堂练习

### 泛型课堂练习题

 + 定义 Employee类 
1. 该类包含：private成员变量name,sal,birthday,其中birthday为MyDate类的对象； 
2. 为每一个属性定义 getter,setter 方法； 
3. 重写 toString 方法输出 name,  sal, birthday  
4. MyDate 类包含: private 成员变量 month,day,year；并为每一个属性定义 getter, setter 方法； 
5. 创建该类的 3 个对象，并把这些对象放入 ArrayList 集合中（ArrayList 需使用泛型来定义），对集合中的元素进 行排序，并遍历输出： 
6. 排序方式:调用 ArrayList 的 sort 方法 , 
传入 Comparator 对象[使用泛型]，先按照 name 排序，如果 name 相同，则按生日日期的先后排序【即：定制排序】 

```java
package cmd.study.generic;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  21:13
 */
public class MyDate implements Comparable<MyDate>{
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
    public int compareTo(MyDate o) {//把对year-month-day

        int yearMinus=year-o.getYear();
        if(yearMinus!=0){
            return yearMinus;
        }
        //如果year相同，就比较month
        int monthMinus=month-o.getMonth();
        if(monthMinus!=0){
            return monthMinus;
        }
        return day-o.getDay();
    }
}

```

```java
package cmd.study.generic;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  21:13
 */
public class Employee {
    private String name;
    private double sal;
    private MyDate birthday;

    public Employee(String name, double sal, MyDate birthday) {
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
        return "\nEmployee{" +
                "name='" + name + '\'' +
                ", sal=" + sal +
                ", birthday=" + birthday +
                '}';
    }
}


```

```java
package cmd.study.generic;

import java.util.ArrayList;
import java.util.Comparator;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  21:09
 */
@SuppressWarnings({"all"})
public class GenericExercise02 {
    public static void main(String[] args) {
        ArrayList<Employee> employees = new ArrayList<>();
        employees.add(new Employee("tom",20000,new MyDate(2000,1,1)));
        employees.add(new Employee("jack",12000,new MyDate(1980,1,1)));
        employees.add(new Employee("tom",50000,new MyDate(1980,1,2)));

        System.out.println("employees="+employees);


        System.out.println("=======对雇员进行排序==========");
        employees.sort(new Comparator<Employee>() {
            @Override
            public int compare(Employee emp1, Employee emp2) {
//                先按照 name 排序，如果 name 相同，则按生日日期的先后排序
                //比较name
                int i = emp1.getName().compareTo(emp2.getName());
                if (i != 0) {
                    return i;
                }
                //如果name相同，就比较birthday-year

                //封装后，将来可维护性和复用性 大大增加
                return emp1.getBirthday().compareTo(emp2.getBirthday());
            }
        });
        System.out.println("======对雇员进行排序=========");
        System.out.println(employees);


    }
}
```

## 自定义泛型

### 自定义泛型类 (难度)

基本语法
+ **class类名<T,R...>{//.表示可以有多个泛型成员**
+ 注意细节
1. **普通成员可以使用泛型(属性、方法)**
2. **使用泛型的数组，不能初始化**
3. **静态方法中不能使用类的泛型**
4. **泛型类的类型，是在创建对象时确定的(因为创建对象时，需要指定确定类型)**
5. **如果在创建对象时,没有指定类型,默认为Object**

```java
package cmd.study.generic.customgeneric;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/15  21:58
 */@SuppressWarnings({"all"})
public class CustomGeneric_ {
    public static void main(String[] args) {


        //T=Double, R=String, M=Integer
        Tiger<Double, String, Integer> g = new Tiger<>("john");
        g.setT(10.9);//ok
        //g.setT("Y");//错误 类型不对
        System.out.println(g);

        Tiger g2 = new Tiger("john");//OK T=Object R=Object M=Object
        g2.setT("YY");//ok String是Object的子类
        System.out.println("g2="+g2);


    }

}

//1.Tiger后面泛型，所以我们把 Tiger就称为自定义泛型类
//2.T,R,M 泛型的标识符，一般是单个大写字母
//3.泛型的标识符可以有多个
//4.普通成员可以使用泛型(属性、方法）
//5.使用泛型的数组，不能初始化
//6.静态方法中不能使用类的泛型 因为静态和类是相关的，
// 在类加载时，对象还没有创建 JVM不能完成初始化
class Tiger<T,R,M>{
    String name;
    R r;//属性使用泛型
    M m;
    T t;
    //因为数组在 new 不能确定T的类型，就无法在内存开空间
    T[] ts;

    public Tiger(String name) {
        this.name = name;
    }

    public Tiger(R r, M m, T t) {//构造器使用泛型
        this.r = r;
        this.m = m;
        this.t = t;
    }
    //方法使用泛型

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public R getR() {
        return r;
    }

    public void setR(R r) {
        this.r = r;
    }

    public M getM() {//返回类型使用泛型
        return m;
    }

    public void setM(M m) {
        this.m = m;
    }

    public T getT() {
        return t;
    }

    public void setT(T t) {
        this.t = t;
    }
 @Override
    public String toString() {
        return "Tiger{" +
                "name='" + name + '\'' +
                ", r=" + r +
                ", m=" + m +
                ", t=" + t +
                ", ts=" + Arrays.toString(ts) +
                '}';
    }
}
```

### 自定义泛型接口

 基本语法
+ **interface 接口名<T,R...> {}**
 + 注意细节
1. **接口中，静态成员也不能使用泛型(这个和泛型类规定一样)**
2. **泛型接口的类型,在继承接口或者实现接口时确定**
3. **没有指定类型，默认为Object**



- ```java
  package cmd.study.generic.customgeneric;
  
  /**
   * @author frx
   * @version 1.0
   * @date 2021/7/15  22:39
   */
  public class CustomInterfaceGeneric {
      public static void main(String[] args) {
  
      }
  }
  /**
   *泛型接口使用的说明
   * 1.接口中，静态成员也不能使用泛型
   * 2.泛型接口的类型，在继承接口或者实现接口时确定
   * 3.没有指定类型，默认为Object
   */
  
  //实现接口时，直接指定泛型接口的类型
      //给U 指定Integer 给R 指定了 Float
      //所以，当我们实现IUsb方法时，会使用Integer替换U，使用Float 替换R
  class BB implements IUsb<Integer,Float>{
  
      @Override
      public Float get(Integer integer) {
          return null;
      }
  
      @Override
      public void hi(Float aFloat) {
  
      }
  
      @Override
      public void run(Float r1, Float r2, Integer u1, Integer u2) {
  
      }
  }
  
  //没有指定类型，默认为Object
  class CC implements IUsb{
      @Override
      public Object get(Object o) {
          return null;
      }
  
      @Override
      public void hi(Object o) {
  
      }
  
      @Override
      public void run(Object r1, Object r2, Object u1, Object u2) {
  
      }//等价class CC implements IUsb<Object,Object>
  
  }
  interface IUsb<U,R>{
  
      int n=10;
      //U name;不能使用
      //普通方法中，可以使用接口泛型
      R get(U u);
  
      void hi(R r);
  
      void run(R r1,R r2,U u1,U u2);
  
      //在jdk8中，可以在接口中，使用默认方法
      default R method(U u){
          return null;
      }
  }
  //在继承接口 指定泛型接口的类型
  interface IA extends IUsb<String,Double>{
  }
  //当我们去实现IA接口时，因为IA在继承IUsb接口时，指定了 U为String R为Double
  //在实现IUsb接口的方法时，使用String替换U Double 替换R
  class AA implements IA{
  
              @Override
              public Double get(String s) {
                  return null;
              }
  
              @Override
              public void hi(Double aDouble) {
  
              }
  
              @Override
              public void run(Double r1, Double r2, String u1, String u2) {
  
              }
          }
  ```


### 自定义泛型方法

  + 基本语法
   + **修饰符<T,R..>返回类型方法名(参数列表){}** 
 + 注意细节
1. **泛型方法,可以定义在普通类中,也可以定义在泛型类中**
2. **当泛型方法被调用时,类型会确定**
3. **public void eat(E e){},修饰符后没有<T,R..> eat方法不是泛型方法,而是使用了泛型**

```java
package cmd.study.customgeneric;

import java.util.ArrayList;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/16  10:04
 */
@SuppressWarnings({"all"})
public class CustomMethodGeneric {
    public static void main(String[] args) {
        Car car = new Car();
        car.fly("宝马",100);//当调用方法时，传入参数，编译器，就会确定类型
        System.out.println("========");
        car.fly(300,100.0);


        //T-> String R->ArrayList
        Fish<String, ArrayList> fish = new Fish<>();
        fish.hello(new ArrayList(),11.3f);




    }
}
//1.泛型方法,可以定义在普通类中,也可以定义在泛型类中
class Car{
    //普通类
    public void run(){//普通方法

    }
    //说明
    //1.<T,R>就是泛型
    //2.提供给fly方法使用的
    public <T,R> void fly(T t,R r){
        System.out.println(t.getClass());//String
        System.out.println(r.getClass());//Integer

    }
}
class Fish<T,R>{//泛型类
    public void run(){

    }
    public <U,M> void eat(U u,M m){//泛型方法

    }
    //1.下面的方法不是泛型方法
    //2.是hi方法使用了类声明的 泛型
    public void hi(T t){

    }
    //泛型方法，可以使用类声明的泛型，也可以使用自己声明的泛型
    public <K> void hello(R r,K k){
        System.out.println(r.getClass());//ArrayList
        System.out.println(k.getClass());//Float

    }


}
```

### 自定义泛型方法练习

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/fanxing/02.png)

```java
package cmd.study.customgeneric;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/16  10:40
 */
public class CustomMethodGenericExercise {
    public static void main(String[] args) {
        //T->String, R->Integer, M->Double
        Apple<String, Integer, Double> apple = new Apple<>();
        apple.fly(10);//10 会被自动装箱 Integer10, 输出 Integer
        apple.fly(new Dog());//Dog

    }
}
class Apple<T,R,M>{//自定义泛型类
    public <E> void fly(E e){
        System.out.println(e.getClass().getSimpleName());

    }
    //public void eat(U u){}//错误，因为U没有声明
    public void run(M m){}//ok

}
class Dog{}
```

## 泛型的继承和通配符 

### 泛型的继承和通配符说明 

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/fanxing/03.png)

### 应用案例

代码演示：

```java
package cmd.study.customgeneric;

import java.util.ArrayList;
import java.util.List;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/16  12:07
 * 泛型的继承和通配符
 */
public class GenericExtends {
    public static void main(String[] args) {

        Object o = new String("xx");

        //泛型不具备继承性
        //List<Object> list=new ArrayList<>(String)();

        List<Object> list1 = new ArrayList<>();
        List<String> list2 = new ArrayList<>();
        List<A> list3 = new ArrayList<>();
        List<B> list4 = new ArrayList<>();
        List<C> list5 = new ArrayList<>();

        //如果是list<?> c,可以接受任意的泛型类型
        printCollection1(list1);
        printCollection1(list2);
        printCollection1(list3);
        printCollection1(list4);
        printCollection1(list5);

        //List<? extends A c 可以接受A或者A的子类
        printCollection2(list3);//A
        printCollection2(list4);//B
        printCollection2(list5);//C


        //List<? super A> c支持A类以及A类的父类
        printCollection3(list1);//Object
        printCollection3(list3);


    }
    //说明:List<?>表示任意的泛型都可以接受

    public static void printCollection1(List<?> c) {
        for (Object object : c) {//通配符，取出时，就是Object
            System.out.println(object);


        }
    }
        //？extends A 表示上限 ，可以接受A或者A子类
        public static void printCollection2(List<? extends A> c){
            for (Object object : c) {
                System.out.println(object);

            }
        }
        //? super 子类类名A：支持A类以及A类的父类，不限于直接父类
        public static void printCollection3(List<? super A> c){
            for (Object object :c) {
                System.out.println(object);


            }


        }


    }

class A{

}
class B extends A{

}
class C extends B{}
```

## 本章作业

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/fanxing/04.png)

代码实现：

```java
package cmd.study.homework01;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/16  12:57
 */
public class User {
    private int id;
    private int age;
    private String name;

    public User(int id, int age, String name) {
        this.id = id;
        this.age = age;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", age=" + age +
                ", name='" + name + '\'' +
                '}';
    }
}

```

```java
package cmd.study.homework01;

import java.util.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/16  12:58
 */
public class DAO <T>{
    private Map<String,T> map=new HashMap<>();
    public void save(String id,T entity){//把entity保存到map
        map.put(id,entity);
    }
    public T get(String id){
        return map.get(id);
    }
    public void update(String id,T entity){
        map.put(id,entity);
    }
    //返回map中 存放的所有T对象
//遍历map[k-v]，将map的所有value（T entity),封装到ArrayList返回即可
    public List<T> list(){
        //创建ArrayList
        List<T> list = new ArrayList<>();
        //遍历map
        Set<String> keySet=map.keySet();
        for (String key :keySet) {
            list.add(get(key));//直接使用本类的get()

        }
        return list;
    }
    public void delete(String id){
        map.remove(id);
    }
}

```

```java
package cmd.study.homework01;

import org.junit.jupiter.api.Test;

import java.util.List;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/16  12:55
 */
public class Homework01 {
    public static void main(String[] args) {


    }
    @Test
    public void testList(){

        //这里我们给 T 指定类型是User
        DAO<User> dao=new DAO<>();
        dao.save("001",new User(1,10,"jack"));
        dao.save("002",new User(2,18,"king"));
        dao.save("003",new User(3,38,"smith"));

        List<User> list= dao.list();
        System.out.println("list="+list);

        dao.update("003",new User(3,58,"milan"));
        dao.delete("001");//删除001
        System.out.println("======修改后=======");

        list= dao.list();

        System.out.println("list="+list);

        System.out.println("id=003="+dao.get("003"));

    }
}
/**
 * 思路分析：
 * 1.定义User类
 */
```

## JUnit

### 为什么需要 JUnit

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/fanxing/05.png)

代码演示：

```java
package junit_;

import org.junit.jupiter.api.Test;

/**
 * @author frx
 * @version 1.0
 * @date 2021/7/16  12:46
 */
public class Junit_ {
    public static void main(String[] args) {
        //传统方式
        //new JUnit_().m1();


    }
    @Test
    public void m1(){ //可以单独run debug
        System.out.println("mi方法被调用");
    }
    @Test
    public void m2(){
        System.out.println("m2方法被调用");
    }
}

```

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/fanxing/06.png)

