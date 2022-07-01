---
title: Spring5 新功能
date: 2022-01-07 10:42:09
permalink: /pages/3b149b/
categories:
  - Spring5
tags:
  - Spring5
---
# Spring5 新功能

[[toc]]

1. 整个Spring5框架的代码基于Java8,运行时兼容JDK9，许多不建议使用的类和方法在代码库中删除

## Spring5.0框架自带了通用的日志封装

   1. Spring5已经移除Log4jConfigListener,官方建议使用Log4j2
   2. Spring5框架整合Log4j2

   第一步,引入相关的jar包

 ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/06/01.png)

   第二步，创建log4j2.xml配置文件

   ```xml
   <?xml version="1.0" encoding="UTF-8"?>
   <!--日志级别以及优先级排序: OFF > FATAL > ERROR > WARN > INFO > DEBUG > TRACE > ALL -->
   <!--Configuration后面的status用于设置log4j2自身内部的信息输出，可以不设置，当设置成trace时，可以看到log4j2内部各种详细输出-->
   <configuration status="INFO">
       <!--先定义所有的appender-->
       <appenders>
           <!--输出日志信息到控制台-->
           <console name="Console" target="SYSTEM_OUT">
               <!--控制日志输出的格式-->
               <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
           </console>
       </appenders>
       <!--然后定义logger，只有定义了logger并引入的appender，appender才会生效-->
       <!--root：用于指定项目的根日志，如果没有单独指定Logger，则会使用root作为默认的日志输出-->
       <loggers>
           <root level="info">
               <appender-ref ref="Console"/>
           </root>
       </loggers>
   </configuration>
   ```

   ## Spring5 框架核心容器支持@Nullable 注解

1. @Nullable注解可以使用在方法上面，属性上面，参数上面，表示方法返回可以为空，属性值可以为空，参数值可以为空

2. 注解用在方法上面，方法返回值可以为空

   ```java
   @Nullable
   String getId();
   ```

3. 注解使用在方法参数里面，方法参数可以为空

   ```java
    public <T> void registerBean(@Nullable String beanName, Class<T> beanClass, @Nullable Supplier<T> supplier, BeanDefinitionCustomizer... customizers) {
           this.reader.registerBean(beanClass, beanName, supplier, customizers);
       }
   ```

4. 注解使用在属性上面，属性可以为空

   ```java
   @Nullable
   private String bookName;
   ```

## Spring5 核心容器函数式风格GenericApplicationContext

```java
    //函数式风格创建对象,交给spring进行管理
    @Test
    public void testGenericApplicationContext(){
        //1 创建GenericApplicationContext对象
        GenericApplicationContext context = new GenericApplicationContext();
        //2 调用context的方法对象注册
        context.refresh();
        context.registerBean("user1",User.class,()-> new User());
        //3 获取在spring注册到的对象
//        Object user = context.getBean("com.frx01.spring5.test.User");
        Object user1 = context.getBean("user1");
        System.out.println(user1);
    }
```

## Spring5 支持整合JUnit5

1. Spring5整合JUnit4

第一步，引入Spring相关针对测试依赖

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/06/02.png)

第二步，创建测试类，使用注解完成

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/6  18:57
 */
@RunWith(SpringJUnit4ClassRunner.class) //指定单元测试框架
@ContextConfiguration("classpath:bean1.xml") //加载配置文件
public class JTest4 {

    @Autowired
    private UserService userService;

    @Test
    public void test1(){
        userService.accountMoney();
    }

}
```

2. Spring5整合JUnit5

第一步，引入JUnit5的jar包

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/06/03.png)

第二步，创建测试类，使用注解完成

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/6  19:08
 */
//@ExtendWith(SpringExtension.class)
//@ContextConfiguration("classpath:bean1.xml")

@SpringJUnitConfig(locations = "classpath:bean1.xml")
public class JTest5 {

    @Autowired
    private UserService userService;

    @Test
    public void test1(){
        userService.accountMoney();
    }
}
```





​                                                                                                                                                                                                    

