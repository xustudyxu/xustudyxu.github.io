---
title: Spring核心之控制反转IOC
date: 2021-12-20 18:44:20
permalink: /pages/ba30cb/
categories:
  - Spring5
tags:
  - Spring5
---
# Spring核心之控制反转IOC

[[toc]]

## IOC 概念和原理

### 什么是IOC

1. <font color=#DC4040 size=4 face="黑体">控制反转，把对象创建和对象之间的调用过程，交给Spring进行管理</font>
2. <font color=#DC4040 size=4 face="黑体">使用IOC目的：为了降低耦合度</font>
3. 做入门案例就是IOC实现

### IOC 底层原理

1. xml解析、工厂模式、反射

+ 原始方式与工厂模式对比

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/02/01.png)

### 图解IOC底层原理

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/02/02.png)

## IOC 接口(BeanFactory)

1. **IOC思想基于IOC容器完成，IOC容器底层就是对象工厂**

2. Spring提供IOC容器实现两种方式:(两个接口)

   + BeanFactory:IOC容器基本实现，是Spring内部的使用接口，不提供开发人员进行使用

     > 特点:加载配置文件时候不会创建对象，在获取对象(或者使用对象)才去创建对象

   + <font color=#DC4040 size=4 face="黑体">ApplicationContext:BeanFactory接口的子接口，提供更多更强大的功能，一般由开发人人员进行调用</font>

     > 特点:加载配置文件时候就会把在配置文件对象进行创建

3. ApplicationContext接口有实现类

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/02/03.png)

+ FileSystemXmlApplicationContext

  `configLocation:要写上配置文件在系统盘(某个盘)里的路径`

+ ClassPathXmlApplicationContext

  `configLocation:要写上类路径`

# IOC操作Bean管理

## 概念

1. 什么是Bean管理
   + Bean管理指的是两个操作
     1. <font color=#DC4040 size=4 face="黑体">Spring 创建对象</font>
     2. <font color=#DC4040 size=4 face="黑体">Spring 注入属性</font>
2. Bean管理操作有两种方式
   1. <font color=#DC4040 size=4 face="黑体">基于xml配置文件方式实现</font>
   2. <font color=#DC4040 size=4 face="黑体">基于注解方式实现</font>

## IOC操作Bean管理-基于xml方式

1. 基于xml方式创建对象

   ```xml
   <!--配置User对象创建-->
   <bean id="user" class="com.frx01.spring5.User"></bean>
   ```

   1. **在Spring配置文件中，使用bean标签，标签里面添加对应属性，就可以实现对象创建**
   2. 在bean标签有很多属性，介绍常用的属性
      + id属性:**唯一标识**
      + class属性:**类全路径(包和类路径)**
   3. **创建对象时候，默认也是执行无参构造方法**

2. 基于xml方式注入属性

   1. **DI:依赖注入,就是注入属性**

      > DI是IOC一种具体实现，表示依赖注入，注入属性是在创建对象的基础之上进行完成

### 第一种注入方式:**使用set方法进行注入**

1. 创建类，定义属性和对应的set方法

```java
 /**
   * 演示set方法注入属性
   */
  public class Book {
  
      //创建属性
      private String bname;
      private String bauthor;
  
      //创建属性对应set方法
      public void setBauthor(String bauthor) {
          this.bauthor = bauthor;
      }
      public void setBname(String bname) {
          this.bname = bname;
      }
  }
```

2. 在Spring配置文件对象创建，配置属性注入

```xml
 <!--set方法注入属性-->
      <bean id="book" class="com.frx01.spring5.testdemo.Book">
          <!--使用property完成属性注入
              name：类里面属性名称
              value：向属性注入的值-->
          <property name="bname" value="易筋经"></property>
          <property name="bauthor" value="达摩老祖"></property>
  
      </bean>
```

###   第二种注入方式:**使用有参数构造方法进行注入**

1. 创建类，定义属性，创建属性对应有参构造方法

```java
/**
 *使用有参数构造注入
 */
public class Orders {

    private String oname;
    private String address;

    public Orders(String oname, String address) {
        this.oname = oname;
        this.address = address;
    }
}
```

2. 在Spring配置文件中进行配置

```xml
<!--用有参构造注入属性-->
    <bean id="orders" class="com.frx01.spring5.testdemo.Orders">
        <constructor-arg name="oname" value="computer"></constructor-arg>
        <constructor-arg name="address"value="China"></constructor-arg>
    </bean>
```

### p名称空间注入(了解)

1. 使用p名称空间注入，可以简化基于xml配置方式
   1. 添加p名称空间在配置文件中

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd"></beans>
```

2. 进行属性注入，在bean标签里面进行操作

```xml
 <!--set方法注入属性-->
        <bean id="book" class="com.frx01.spring5.testdemo.Book" p:bname="九阳神功" p:bauthor="无名氏">
        </bean>
```

## xml注入其他类型属性

### 字面量

1. **null值**

```xml
     <!--null值-->
        <property name="address">
            <null/>
        </property>
```

2. **属性值包含特殊符号**

```xml
    <!--属性值包含特殊符号
         1. 把<>进行转义 &lt;&gt;
         2. 把带特殊符号内容写到CDATA
		-->
        <property name="address">
            <value><![CDATA[<<南京>>]]></value>
        </property>
```

### 注入属性-外部bean

1. 创建两个类service类和dao类
2. 在service调用dao里面的方法

```java
package com.frx01.service;

import com.frx01.dao.UserDao;
import com.frx01.dao.UserDaoImpl;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/2  21:31
 */
public class UserService {

    private UserDao userDao;

    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void add(){
        System.out.println("service add.................");
        userDao.update();


    }
}

```

3. 在spring配置文件中进行配置

```xml

    	<!--1 配置service和dao对象相关的创建-->
    <bean id="userService" class="com.frx01.spring5.service.UserService">
	<!--注入userDao对象
        name属性值:类里面属性名称
        ref属性:创建userDao对象bean标签id值-->
        <property name="userDao" ref="userDaoImpl"></property>
    </bean>
    <bean id="UserDao" class="com.frx01.spring5.dao.UserDaoImpl"></bean>
	<bean id="userDaoImpl" class="com.frx01.spring5.dao.UserDaoImpl"/></bean>

```

### 注入属性-内部bean

1. 一对多关系，部门和员工

> 一个部门有多个员工，一个员工属于一个部门，部门是一，员工是多。

2. 在实体类之间表示一对多的关系,员工所属的部门，使用对象类型属性进行表示

```java
public class Dept {

    private String dname;

    public void setDname(String dname) {
        this.dname = dname;
    }
}

```

```java
//员工类
public class Emp {
    private String name;
    private String gender;

    //员工属于某一个部门,使用对象表示
    private Dept dept;

    public void setName(String name) {
        this.name = name;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
```

3. 在Spring配置文件

```xml
    <!--内部bean-->
    <bean id="Emp" class="com.frx01.spring5.bean.Emp">
    <!--设置两个普通属性-->
        <property name="name" value="lucy"></property>
        <property name="gender" value="女"></property>
    <!--设置对象类型的属性-->
        <property name="dept">
            <bean id="dept" class="com.frx01.spring5.bean.Dept">
                <property name="dname" value="保安部"></property>
            </bean>

        </property>
    </bean>
```

### 注入属性-级联赋值

1. 第一种写法

```xml
   <!--内部bean-->
    <bean id="Emp" class="com.frx01.spring5.bean.Emp">
    <!--设置两个普通属性-->
        <property name="name" value="lucy"></property>
        <property name="gender" value="女"></property>
        <!--级联赋值-->
        <property name="dept" ref="dept"></property>
    </bean>
    <bean id="dept" class="com.frx01.spring5.bean.Dept">
        <property name="dname" value="财务部"></property>
    </bean>
```

2. 第二种写法

   在Emp类中添加属性dept的getDept方法

```xml
   <!--内部bean-->
    <bean id="Emp" class="com.frx01.spring5.bean.Emp">
    <!--设置两个普通属性-->
        <property name="name" value="lucy"></property>
        <property name="gender" value="女"></property>
        <!--级联赋值-->
        <property name="dept" ref="dept"></property>
        <property name="dept.dname" value="技术部"></property>
    </bean>
    <bean id="dept" class="com.frx01.spring5.bean.Dept">
        <property name="dname" value="财务部"></property>
    </bean>
```

### xml方式注入集合属性

1. 注入数组类型属性
2. 注入List集合类型属性
3. 注入Map集合类型属性

第一步，创建类，定义数组，list,map,set类型属性，生成对应set方法

```java
public class Stu {
//    1.数组类型的属性
    private String[] course;

//    2.List集合类型
    private List<String> list;

//    3.Map集合类型
    private Map<String,String> map;

//    4.set集合类型
    private Set<String> set;
    public void setCourse(String[] course) {
        this.course = course;
    }

    public void setList(List<String> list) {
        this.list = list;
    }

    public void setSet(Set<String> set) {
        this.set = set;
    }

    public void setMap(Map<String, String> map) {
        this.map = map;
    }
}
```

第二步，在Spring配置文件进行配置

```xml
<!--完成集合类型属性的注入-->
    <bean id="stu" class="com.frx01.spring5.collectiontype.Stu">
        <!--数组类型的属性注入-->
        <property name="courses">
            <array>
                <value>java课程</value>
                <value>数据库课程</value>
            </array>
        </property>
        <!--list属性注入-->
        <property name="list">
            <list>
                <value>张三</value>
                <value>李四</value>
            </list>
        </property>
        <!--Map类型注入-->
        <property name="map">
            <map>
                <entry key="JAVA" value="java" ></entry>
                <entry key="PHP" value="php"></entry>
            </map>
        </property>
        <!--set集合注入-->
        <property name="set">
            <set>
                <value>MySQL</value>
                <value>redis</value>
            </set>
        </property>
    </bean>
```

+ 在集合里面设置对象类型的值

```xml
     <!--注入list集合类型，值是对象-->
        <property name="courseList">
            <list>
                <ref bean="course1"></ref>
                <ref bean="course2"></ref>
            </list>
        </property>
    </bean>
<!--    创建多个course对象-->
    <bean id="course1" class="com.frx01.spring5.collectiontype.Course">
        <property name="cname" value="Spring5框架"></property>
    </bean>
    <bean id="course2" class="com.frx01.spring5.collectiontype.Course">
        <property name="cname" value="Mybatis框架"></property>
    </bean>
```

+ 把集合注入部分提取出来

1. 在Spring配置文件中引入名称空间util

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/util/spring-beans.xsd
                            http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd">
        <!--把集合注入部分提取出来-->
</beans>
```

2. 使用util标签完成list集合注入提取

```xml
       <!--1.把提取list集合类型属性注入-->
    <util:list id="bookList">
        <value>易筋经</value>
        <value>九阳神功</value>
        <value>九阴真经</value>
    </util:list>

        <!--2.提取list集合类型属性注入使用-->
    <bean id="book" class="com.frx01.spring5.collectiontype.Book">
        <property name="list" ref="bookList"></property>
    </bean>
```

## FactoryBean

1. **Spring有两种类型bean,一种普通bean,另一种工厂bean(FactoryBean)**
2. **普通bean:在配置文件中定义bean类型就是返回类型**
3. **工厂bean:在配置文件中定义bean类型可以和返回类型不一样**

第一步，创建类，让这个类作为工厂bean，实现接口FactoryBean

```java
/**
 * @author frx
 * @version 1.0
 * @date 2021/12/4  17:42
 */
public class MyBean implements FactoryBean<Course> {

    //定义返回bean
    @Override
    public Course getObject() throws Exception {
        Course course = new Course();
        String cou[]={"math,english"};
        course.setCname(cou);
        return course;
    }

    @Override
    public Class<?> getObjectType() {
        return null;
    }

    @Override
    public boolean isSingleton() {
        return false;
    }
}

```

第二步，配置Spring配置文件

```xml
<bean id="myBean" class="com.frx01.spring5.factorybean.MyBean"></bean>
```

## bean 作用域

1. 在Spring里面，可以设置bean实例是单实例还是多实例
2. 在Spring里面，默认情况下，bean是单实例对象

```java
    @Test
    public void testCollection2(){
        ApplicationContext context=new ClassPathXmlApplicationContext("bean2.xml");
        Book book =context.getBean("book", Book.class);
        Book book1 =context.getBean("book", Book.class);
        System.out.println(book);
        System.out.println(book1);

    }
```

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/02/04.png)

3. 如何设置单实例还是多实例
   
   1. **在Spring配置文件bean标签里面有属性(scope)用于设置单实例还是多实例**
   2. scope属性值
   
   第一个值默认值，**singleton**，表示单实例对象
   
   第二个值**prototype**，表示是多实例对象

```xml
    <!--2 提取list集合类型属性注入使用-->
    <bean id="myBean" class="com.frx01.spring5.factorybean.MyBean" scope="prototype"></bean>
</beans>
```

```java
    @Test
    public void testCollection2(){
        ApplicationContext context=new ClassPathXmlApplicationContext("bean2.xml");
        Book book =context.getBean("book", Book.class);
        Book book1 =context.getBean("book", Book.class);
        System.out.println(book);
        System.out.println(book1);

    }
```

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/02/05.png)

+ singleton和prototype区别

1. **singleton表示单实例，prototype表示多实例**
2. **设置scope值singleton时候，加载spring配置文件就会创建一个单实例对象**
   + **设置scope值是prototype时候，不是在加载spring配置文件时候创建对象，在调用getBean方法时候创建多实例对象**

## bean 生命周期

1. 生命周期

   + **从对象创建到对象销毁的过程**

2. bean生命周期

   1. **通过构造器创建bean实例(无参数构造)**

   2. **为bean的属性设置值和对其他bean引用(调用set方法)**

   3. **调用bean初始化的方法(需要进行配置初始化方法)**

   4. **bean可以使用了(对象获取到了)**

   5. **当容器关闭时候，调用bean的销毁的方法(需要进行配置销毁的方法)**

3. 演示bean生命周期

```java
public class Orders {

//  无参数构造
    public Orders() {
        System.out.println("第一步 执行无参构造创建bean实例");
    }

    private String oname;

    public void setOname(String oname) {
        this.oname = oname;
        System.out.println("第二步 调用set方法设置属性的值");
    }

//    创建执行的初始化方法
    public void initMethod(){
        System.out.println("第三步 执行初始化方法");
    }

    //    创建执行的销毁方法
    public void destroyMethod(){
        System.out.println("第五步 执行销毁方法");
    }

}
```

```java
    @Test
    public void testCollection4() {
//        ApplicationContext context =
//                new ClassPathXmlApplicationContext("bean4.xml");
        ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("bean4.xml");
        Orders orders = context.getBean("orders", Orders.class);
        System.out.println("第四步 获取创建bean实例对象");
        System.out.println(orders);

//        手动让bean实例销毁
        context.close();

    }
```

```xml
    <bean id="orders" class="com.frx01.spring5.bean.Orders" init-method="initMethod" destroy-method="destroyMethod">
        <property name="oname" value="手机"></property>
    </bean>
```

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/02/06.png)

4. bean的后置处理器，bean生命周期有七步

   1. **通过构造器创建bean实例(无参数构造)**
   2. **为bean的属性设置值和对其他bean引用(调用set方法)**
   3. **<font color=#DC4040 size=4 face="黑体">把bean实例传递bean前置处理器的方法postProcessBeforeInitialization</font>**
   4. **调用bean初始化的方法(需要进行配置初始化方法)**
   5. **<font color=#DC4040 size=4 face="黑体">把bean实例传递bean后置处理器的方法postProcessAfterInitialization</font>**
   6. **bean可以使用了(对象获取到了)**
   7. **当容器关闭时候，调用bean的销毁的方法(需要进行配置销毁的方法)**

5. 演示添加后置处理器效果

   1. 创建一个类，实现接口BeanPostProcessor，创建后处理器

   ```java
   public class MyBeanPost implements BeanPostProcessor {
       @Override
       public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
           System.out.println("在初始化之前执行的方法");
           return bean;
       }
   
       @Override
       public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
           System.out.println("在初始化之后执行的方法");
           return bean;
       }
   
   }
   ```

   ```java
       @Test
       public void testCollection4() {
   //        ApplicationContext context =
   //                new ClassPathXmlApplicationContext("bean4.xml");
           ClassPathXmlApplicationContext context =
                   new ClassPathXmlApplicationContext("bean4.xml");
           Orders orders = context.getBean("orders", Orders.class);
           System.out.println("第四步 获取创建bean实例对象");
           System.out.println(orders);
   
   //        手动让bean实例销毁
           context.close();
   ```

   ```xml
   <!--    配置后置处理器-->
       <bean id="MyBeanPost" class="com.frx01.spring5.bean.MyBeanPost"></bean>
   </beans>
   ```

   ![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/02/07.png)

## xml 自动装配

1. 什么是自动装配

   + **根据指定装配规则(属性名称或者属性类型)，Spring自动将匹配的属性值进行注入**

2. 演示自动装配过程
+ 根据属性名称自动注入

```xml
<!--    实现自动装配
        bean标签属性autowire,配置自动装配
        autowire属性常用两个值:
            byName根据属性名称注入,注入值bean的id值和类属性名称一样
            byType根据属性类型注入
       -->
    <bean id="emp" class="com.frx01.spring5.autowire.Emp" autowire="byName">
<!--        <property name="dept" ref="dept"></property>-->
    </bean>
    <bean id="dept" class="com.frx01.spring5.autowire.Dept"></bean>

```

+ 根据属性类型自动注入

```xml
    <bean id="emp" class="com.frx01.spring5.autowire.Emp" autowire="byType">
<!--        <property name="dept" ref="dept"></property>-->
    </bean>
    <bean id="dept" class="com.frx01.spring5.autowire.Dept"></bean>
```

## 引入外部属性文件

1. 直接配置数据库信息

   1. 配置德鲁伊连接池
   2. 引入德鲁伊连接池依赖jar包

```xml
<!--直接配置连接池-->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
    <property name="driverClassName" value="com.mysql.jdbc.Driver"></property>
    <property name="url" value="jdbc:mysql://localhost:3306/userDb"></property>
    <property name="username" value="root"></property>
    <property name="password" value="root"></property>
    </bean>
```

2. 引入外部属性文件配置数据库连接池 
+ 创建外部属性文件，properteis格式文件，写数据库信息

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/02/08.png)

+ 把外部properties属性文件引入到spring配置文件中

```xml
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:p="http://www.springframework.org/schema/p"
       xmlns:util="http://www.springframework.org/schema/util"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                            http://www.springframework.org/schema/util http://www.springframework.org/schema/util/spring-util.xsd
                            http://www.springframework.org/schema/context  http://www.springframework.org/schema/util/spring-util.context.xsd">
```

+ 在Spring配置文件使用标签引入外部属性文件

```xml
<!--    引入外部属性文件-->
    <context:property-placeholder location="classpath*:jdbc.properties"/>
    <!--配置连接池-->
        <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource">
        <property name="driverClassName" value="${prop.driverClass}"></property>
        <property name="url" value="${prop.url}"></property>
        <property name="username" value="${prop.userName}"></property>
        <property name="password" value="${prop.passwd}"></property>
        </bean>
```

## IOC操作Bean管理-基于注解方式

1. 什么是注解
   1. <font color=#DC4040 size=4 face="黑体">注解是代码特殊标记，格式:@注解名称(属性名称=属性值，属性名称=属性值)</font>
   2. <font color=#DC4040 size=4 face="黑体">使用注解，注解作用在类上面，方法上面，属性上面</font>
   3. 使用注解目的:<font color=#DC4040 size=4 face="黑体">简化xml配置</font>

2. Spring针对Bean管理中创建对象提供注解
   1. @Component
   2. @Service
   3. @Controller
   4. @repository

+ 上面四个注解功能是一样的，都可以用来创建bean实例

### 基于注解方式实现对象创建

第一步 引入依赖

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/02/09.png)   

第二步 开启组件扫描

```xml
    <!--开启组件扫描
        1 如果扫描多个包 使用逗号隔开
        2 扫描包上层目录-->
    <context:component-scan base-package="com.frx01.spring5"></context:component-scan>
```

第三步创建类，在类上面添加创建对象注解

```java
//在注解里面value属性值可以省略不写
//默认值是类名称，首字母小写
//  UserService -- userService
@Component(value = "userService")  //<bean id="userService" class=".."/>
public class UserService {

    public void add(){
        System.out.println("service add......");
    }
}

```

+ 开启组件扫描细节配置

```xml

    <!--示例1
        use-default-filters="false 表示现在不使用默认filter,不扫描全部，自己配置filter
        context:include-filler,设置扫描那些内容-->
    <context:component-scan base-package="com.frx01" use-default-filters="false">
        <context:include-filter type="annotation"
                                expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>
    <!--示例2
        下面配置扫描包所有内容
        context:exclude-filter：设置那些内容不进行扫描-->
    <context:component-scan base-package="com.frx01">
        <context:exclude-filter type="annotation"
                                expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>
```

### 基于注解方式实现属性注入

1. **@AutoWired：根据属性类型自动装配**

第一步把service和dao对象创建，在service和dao类添加创建对象注解

第二步在service注入dao对象，在service类添加dao类型属性，在属性上面使用注解

```java
@Service
public class UserService {

//    定义dao类型的属性
//    不需要添加set方法
//    添加注入属性注解
    @Autowired
    private UserDao userDao;


    public void add(){
        System.out.println("service add......");
        userDao.add();
    }
}

```

2. **@Qualifier：根据属性名称注入**

这个@Qualifier注解的使用，和上面@Autowired一起使用

```java
@Repository(value = "userDaoImpl1")
public class UserDaoImpl implements UserDao{

    @Override
    public void add() {
        System.out.println("dao add......");

    }
}
```

```java
public class UserService {

//    定义dao类型的属性
//    不需要添加set方法
//    添加注入属性注解
    @Autowired  //根据类型进行注入
    @Qualifier(value = "userDaoImpl1")
    private UserDao userDao;


    public void add(){
        System.out.println("service add......");
        userDao.add();
    }
}
```

3. @Resource：可以根据类型注入，可以根据名称注入

```java
//    @Resource  //根据类型进行注入
    @Resource(name="userDaoImpl1") //根据名称进行注入
    private UserDao userDao;

```

> Resource是Javax包里面的

4. @Value：注入普通类型属性

```java
    @Value(value = "abc")
    private String name;
```

### 完全注解开发

1. 创建配置类，替代xml配置文件

```java
@Configuration //作为配置类，替代xml配置文件
@ComponentScan(basePackages = "com.frx01")
public class SpringConfig {
}

```

2. 编写测试类

```java
   	@Test
    public void testService2(){
//        加载配置类
        ApplicationContext context =
                new AnnotationConfigApplicationContext(SpringConfig.class);
        UserService userService = context.getBean("userService", UserService.class);
        System.out.println(userService);
        userService.add();
    }
```

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/02/10.png)

