---
title: Spring5 入门案例
date: 2021-12-20 18:44:20
permalink: /pages/bd7bd6/
categories:
  - Spring5
tags:
  - Spring5
---
# Spring5 入门案例

[[toc]]

## 下载Spring5

1. 使用Spring稳定版本5.2.6
2. 下载地址[repo.spring.io](https://repo.spring.io/ui/native/release/org/springframework/spring/)

第一次访问速度有点慢,耐心等待。

![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/01/01.png)

3. 下载完毕

![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/01/02.png)

## 案例演示

1. 打开idea,创建普通Java工程

![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/01/03.png)

![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/01/04.png)

![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/01/05.png)

2. 导入Spring5相关jar包

![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/01/06.png)

![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/01/07.png)

![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/01/08.png)

![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/01/09.png)

+ 或者使用maven引入相关依赖

```xml
<dependencies>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>5.2.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.2.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>5.2.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-expression</artifactId>
            <version>5.2.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>commons-logging</groupId>
            <artifactId>commons-logging</artifactId>
            <version>1.1.1</version>
        </dependency>
    </dependencies>
```

3. 创建普通类，在这个类中创建普通方法

```java
package com.company;

/**
 * @author frx
 * @version 1.0
 * @date 2021/11/30  23:43
 */
public class User {
    public void add(){
        System.out.println("add......");
    }
}

```

4. 创建spring配置文件，在配置文件配置创建的对象

   1. Spring配置文件使用xml格式

   ![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/01/10.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--配置User对象相关的创建-->
    <bean id="user" class="com.company.User"></bean>
</beans>
```

5. 进行编写测试代码

```java
package com.company.testdemo;

import com.company.User;
import org.junit.Test;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * @author frx
 * @version 1.0
 * @date 2021/11/30  23:56
 */
public class TestSpring5 {

    @Test
    public void testAdd(){
//        1.加载spring配置文件
        ClassPathXmlApplicationContext context =
                new ClassPathXmlApplicationContext("bean1.xml");

//        2.获取配置创建的对象
        User user = context.getBean("user", User.class);

        System.out.println(user);
        user.add();

    }
}

```

![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/01/11.png)

