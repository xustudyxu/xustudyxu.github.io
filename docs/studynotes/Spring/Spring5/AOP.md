---
title: Spring核心之面向切面编程AOP
date: 2021-12-29 19:15:51
permalink: /pages/e914bb/
categories:
  - Spring5
tags:
  - Spring5
---
# Spring核心之面向切面编程AOP

[[toc]]

## 什么是AOP

1. 面向切面编程（方面），利用 AOP 可以对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之间的耦合度降低，提高程序的可重用性，同时提高了开发的效率。
2. 通俗描述:不通过修改源代码方式，在主干功能里面添加新功能
3. 使用登陆例子说明AOP

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/03/01.png)

## AOP底层原理

### AOP底层使用动态代理

1. **有接口的情况,使用JDK动态代理**

+ 创建接口实现类代理对象，增强类的方法

2. **没有接口情况，使用CGLIB动态代理**

+ 创建子类的动态对象，增强类的方法

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/03/02.png)

## AOP(JDK动态代理)

1. 使用JDK动态代理，使用Proxy类里面的方法创建代理对象

> java.lang.reflect
>
> **Class Proxy**
>
> java.lang.Object
>
> > java.lang.reflect.Proxy

+ 调用newProxyInstance方法

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/03/04.png)

方法有三个参数:

第一参数，类加载器

第二参数，增强方法所在的类，这个类实现的接口，支持多个接口

第三参数，实现这个接口InvocationHandler,创建代理对象，写增强的部分

2. 编写JDK动态代理代码

   创建接口，定义方法

```java
public interface UserDao {
    public int add(int a,int b);

    public String update(String id);
}

```

​		创建接口实现类，实现方法

```java
public class UserDaoImpl implements UserDao{
    @Override
    public int add(int a, int b) {
        return a+b;
    }

    @Override
    public String update(String id) {
        return id;
    }
}
```

​	使用Proxy类创建接口代理对象

```java
package com.frx01.spring5;

import java.lang.reflect.Array;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Arrays;

/**
 * @author frx
 * @version 1.0
 * @date 2021/12/29  16:06
 */
public class JDKProxy {
    public static void main(String[] args) {
        //创建接口实现类代理对象
        Class[] interfaces={UserDao.class};
//        Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new InvocationHandler() {
//            @Override
//            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
//                return null;
//            }
//        });
        UserDaoImpl userDao=new UserDaoImpl();
        UserDao dao=(UserDao) Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new UserDaoProxy(userDao));
        int result = dao.add(1, 2);
        System.out.println("result"+result);



    }
}

//创建代理对象代码
class UserDaoProxy implements InvocationHandler{

    //1 把创建的是谁的代理对象 把谁传递过来、
    //有参数构造器
    private Object obj;
    public UserDaoProxy(Object obj){
        this.obj=obj;


    }

    //增强的逻辑
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {

        //方法之前
        System.out.println("方法之前执行......"+method.getName()+" :传递的参数..."+ Arrays.toString(args));

        //被增强的方法执行
        Object res= method.invoke(obj,args);

        //方法之后
        System.out.println("方法之后执行......"+obj);
        return res;
    }
}
```

## AOP(术语)

+ **连接点（Jointpoint）**：表示需要在程序中插入横切关注点的扩展点，**连接点可能是类初始化、方法执行、方法调用、字段调用或处理异常等等**，Spring只支持方法执行连接点，在AOP中表示为**在哪里干**；

+ **切入点（Pointcut）**： 选择一组相关连接点的模式，即可以认为连接点的集合，Spring支持perl5正则表达式和AspectJ切入点模式，Spring默认使用AspectJ语法，在AOP中表示为**在哪里干的集合**；

+ **通知（Advice）**：在连接点上执行的行为，通知提供了在AOP中需要在切入点所选择的连接点处进行扩展现有行为的手段；包括前置通知（before advice）、后置通知(after advice)、环绕通知（around advice），在Spring中通过代理模式实现AOP，并通过拦截器模式以环绕连接点的拦截器链织入通知；在AOP中表示为**干什么**；

+ **方面/切面（Aspect）**：横切关注点的模块化，比如上边提到的日志组件。可以认为是通知、引入和切入点的组合；在Spring中可以使用Schema和@AspectJ方式进行组织实现；在AOP中表示为**在哪干和干什么集合**；

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/03/03.png)

## AOP操作(准备工作)

1. Spring框架一般基于AspectJ实现AOP操作

   + 什么是AspectJ

   AspectJ不是Spring组成部分，独立AOP框架，一般把AspectJ和Spring框架一起使用，进行AOP操作

2. 基于AspectJ实现AOP操作

   1. **基于xml配置文件实现**
   2. **基于注解方式实现(使用)**

3. 在项目工程里面引入AOP相关依赖

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/03/05.png)

4. 切入点表达式

   1. 切入点表达式的作用，知道对哪个类型里面的哪个方法进行增强
   2. 语法结构:

   **execution([权限修饰符] [返回类型] [类全路径] [方法名称] [参数列表])**

举例1:对com.frx01.spring5.dao.BookDao类里面的add进行增强

execution(* com.frx01.spring5.dao.BookDao.add(..))

举例2:对com.frx01.spring5.dao.BookDao类里面的所有方法进行增强

execution(* com.frx01.spring5.dao.BookDao.*(..))

举例2:对com.frx01.spring5.dao包里面所有类,类里面的所有方法进行增强

execution(* com.frx01.spring5.dao\*.*(..))

## AOP操作(AspectJ)注解

1. 创建类，在类里面定义方法

```java
public class User {
    public void add(){
        System.out.println("add..............");
    }
}
```

2. 创建增强类(编写增强逻辑)
   + 在增强类里面，创建方法，让不同方法代表不同通知类型

```java
public class UserProxy {

    //前置通知
    public void before(){
        System.out.println("before.......");
    }
}

```

3. 进行通知的配置

   1. 在Spring配置文件中，开启注解扫描

      ```xml
      <?xml version="1.0" encoding="UTF-8"?>
      <beans xmlns="http://www.springframework.org/schema/beans"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xmlns:context="http://www.springframework.org/schema/context"
             xmlns:aop="http://www.springframework.org/schema/aop"
             xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                                  http://www.springframework.org/schema/context http://www.springframework.org/schema/beans/spring-context.xsd
                                  http://www.springframework.org/schema/aop http://www.springframework.org/schema/beans/spring-aop.xsd">
      <!--    开启全盘扫描-->
      <context:component-scan base-package="com.frx01.spring5.aopanno"></context:component-scan>
      </beans>
      ```

   2. 使用注解创建User和UserProxy对象

      ```java
      @Component
      public class User {
      }
      @Component
      //被增强的类
      public class UserProxy {
      }
      ```

   3. 在增强类上面添加注解@Aspect

      ```java
      @Component
      @Aspect //生成代理对象
      //被增强的类
      public class UserProxy {
      }
      ```

   4. 在spring配置文件中开启生成代理对象

      ```xml
      <!--    开启Aspect生成代理对象-->
          <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
      ```

4. 配置不同类型的通知

   1. 在增强类里面，在作为通知方法上面添加通知类型注解，使用切入点表达式配置

      ```java
      package com.frx01.spring5.aopanno;
      
      import org.aspectj.lang.ProceedingJoinPoint;
      import org.aspectj.lang.annotation.*;
      import org.springframework.stereotype.Component;
      
      /**
       * @author frx
       * @version 1.0
       * @date 2021/12/29  19:54
       */
      @Component
      @Aspect //生成代理对象
      //被增强的类
      public class UserProxy {
      
          //前置通知
          //@Before注解表示作为前置通知
          @Before(value = "execution(* com.frx01.spring5.aopanno.User.add(..))")
          public void before(){
              System.out.println("before.......");
          }
          //后置通知(返回通知)
          @AfterReturning(value = "execution(* com.frx01.spring5.aopanno.User.add(..))")
          public void afterReturning(){
              System.out.println("afterReturning.....");
          }
      
      
          //最终通知
          @After(value = "execution(* com.frx01.spring5.aopanno.User.add(..))")
          public void after(){
              System.out.println("afterg.....");
          }
      
          //异常通知
          @AfterThrowing(value = "execution(* com.frx01.spring5.aopanno.User.add(..))")
          public void afterThrowing(){
              System.out.println("afterThrowing.....");
          }
      
          //环绕通知
          @Around(value = "execution(* com.frx01.spring5.aopanno.User.add(..))")
          public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable{
              System.out.println("环绕之前.......");
              //被增强的方法执行
      
              proceedingJoinPoint.proceed();
              System.out.println("环绕之后.......");
          }
      }
      
      ```

+ 测试

```java
public class TestAop {
    @Test
    public void testAopAnno(){
        ApplicationContext context =
                new ClassPathXmlApplicationContext("bean1.xml");

        User user = context.getBean("user", User.class);
        user.add();

    }
}

```

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/03/06.png)

5. 相同切入点抽取

```java
    //相同切入点抽取
    @Pointcut(value ="execution(* com.frx01.spring5.aopanno.User.add(..))")
    public void pointdemo(){

    }

    //前置通知
    //@Before注解表示作为前置通知
    @Before(value = "pointdemo()")
    public void before(){
        System.out.println("before.......");
    }
```

6. 有多个增强类多同一个方法进行增强，设置增强类优先级

   1. 在增强类上面添加注解@Order(数字类型值),数字类型值越小优先级越高

      ```java
      @Component
      @Aspect
      @Order(1)
      public class PersonProxy {
      
          //后置通知(返回通知)
          @Before(value = "execution(* com.frx01.spring5.aopanno.User.add(..))")
          public void afterThrowing(){
              System.out.println("PersonBefore.....");
          }
      
      }
      ```

7. 完全使用注解开发

   1. 创建配置类，不需要创建xml配置文件

      ```java
      @Configuration
      @ComponentScan(basePackages = {"com.frx01"})
      @EnableAspectJAutoProxy(proxyTargetClass = true)
      public class ConfigAop {
      }
      
      ```

## AOP操作(AspectJ配置文件)

1. 创建两个类，增强类和被增强类，创建方法

2. 在Spring配置文件中创建两个类对象

   ```xml
       <!--创建对象-->
       <bean id="book" class="com.frx01.spring5.aopxml.Book"></bean>
       <bean id="bookProxy" class="com.frx01.spring5.aopxml.BookProxy"></bean>
   ```

3. 在Spring配置文件中配置切入点

```xml
    <!--配置aop增强-->
    <aop:config>
        <!--切入点-->
        <aop:pointcut id="p" expression="execution(* com.frx01.spring5.aopxml.Book.buy(..))"/>
        <!--配置切面-->
        <aop:aspect ref="bookProxy">
        <!--配置增强作用在哪个方法上-->
            <aop:before method="before" pointcut-ref="p"/>
        </aop:aspect>
    </aop:config>
</beans>
```



