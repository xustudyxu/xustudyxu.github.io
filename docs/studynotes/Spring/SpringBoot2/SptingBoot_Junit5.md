---
title: 单元测试
date: 2022-07-22 16:48:31
permalink: /pages/1acf99/
categories:
  - SpringBoot2
tags:
  - SpringBoot2
---
# 单元测试

[[toc]]

## Junit5的变化

**Spring Boot 2.2.0 版本开始引入 JUnit 5 作为单元测试默认库**

作为最新版本的JUnit框架，JUnit5与之前版本的Junit框架有很大的不同。由三个不同子项目的几个不同模块组成。

> **JUnit 5 = JUnit Platform + JUnit Jupiter + JUnit Vintage**

**JUnit Platform**: Junit Platform是在JVM上启动测试框架的基础，不仅支持Junit自制的测试引擎，其他测试引擎也都可以接入。

**JUnit Jupiter**: JUnit Jupiter提供了JUnit5的新的编程模型，是JUnit5新特性的核心。内部 包含了一个**测试引擎**，用于在Junit Platform上运行。

**JUnit Vintage**: 由于JUint已经发展多年，为了照顾老的项目，JUnit Vintage提供了兼容JUnit4.x,Junit3.x的测试引擎。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.1yjlli5xi1wg.webp)

注意：

**SpringBoot 2.4 以上版本移除了默认对** **Vintage 的依赖。如果需要兼容junit4需要自行引入（不能使用junit4的功能 @Test****）**

**JUnit 5’s Vintage Engine Removed from** `spring-boot-starter-test,如果需要继续兼容junit4需要自行引入vintage`

```xml
<dependency>
    <groupId>org.junit.vintage</groupId>
    <artifactId>junit-vintage-engine</artifactId>
    <scope>test</scope>
    <exclusions>
        <exclusion>
            <groupId>org.hamcrest</groupId>
            <artifactId>hamcrest-core</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.4s499wxootm0.webp)

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-test</artifactId>
  <scope>test</scope>
</dependency>
```

以前：

@SpringBootTest + @RunWith(SpringTest.class)

SpringBoot整合Junit以后。

- 编写测试方法：@Test标注（注意需要使用junit5版本的注解）
- Junit类具有Spring的功能，@Autowired、比如 `@Transactional`<mark>标注测试方法，测试完成后自动回滚</mark>

## Junit5常用注解

JUnit5的注解与JUnit4的注解有所变化

+ [官方文档](https://junit.org/junit5/docs/current/user-guide/#writing-tests-annotations)

- `@Test` :表示方法是测试方法。但是与JUnit4的@Test不同，他的职责非常单一不能声明任何属性，拓展的测试将会由Jupiter提供额外测试
- `@ParameterizedTest`：表示方法是参数化测试，下方会有详细介绍
- `@RepeatedTest`： 表示方法可重复执行，下方会有详细介绍
- `@DisplayName `:为测试类或者测试方法设置展示名称
- `@BeforeEach` :表示在每个单元测试之前执行
- `@AfterEach` :表示在每个单元测试之后执行
- `@BeforeAll `:表示在所有单元测试之前执行
- `@AfterAll`:表示在所有单元测试之后执行
- `@Tag`表示单元测试类别，类似于JUnit4中的@Categories
- `@Disabled`:表示测试类或测试方法不执行，类似于JUnit4中的@Ignore
- `@Timeout`:表示测试方法运行如果超过了指定时间将会返回错误
- `@ExtendWith`:为测试类或测试方法提供扩展类引用

```java
import org.junit.jupiter.api.*; //注意这里使用的是jupiter的Test注解！！
import org.springframework.boot.test.context.SpringBootTest;

import java.util.concurrent.TimeUnit;

@SpringBootTest
@DisplayName("Junit5功能测试类")
public class JunitTest {

    @DisplayName("测试DisplayName注解")
    @Test
    void testDisplayName(){
        System.out.println("HelloWorld");
    }

    @RepeatedTest(3)//重复测试三次
    void testRepeatedTest(){
        System.out.println("HelloWorld3");
    }

    @Disabled
    @DisplayName("测试方法2")
    @Test
    void testMethod2(){
        System.out.println("HelloWorld2");
    }

    /**
     * 规定方法超时时间。超时时间测试异常
     * @throws InterruptedException
     */
    @Timeout(value = 600,unit = TimeUnit.MILLISECONDS)
    @Test
    void testTimeout() throws InterruptedException {
        Thread.sleep(400);
    }

    @BeforeEach
    void testBeforeEach(){
        System.out.println("测试就要开始了...");
    }

    @AfterEach
    void testAfterEach(){
        System.out.println("测试结束了...");
    }

    @BeforeAll
    static void testBeforeAll(){
        System.out.println("所有测试就要开始了...");
    }

    @AfterAll
    static void testAfterAll(){
        System.out.println("所有测试就要结束了...");
    }
}
```

+ 结果

```java
测试就要开始了...
测试结束了...
测试就要开始了...
HelloWorld3
测试结束了...
测试就要开始了...
HelloWorld3
测试结束了...
测试就要开始了...
HelloWorld3
测试结束了...

void com.frx01.JunitTest.testMethod2() is @Disabled
测试就要开始了...
HelloWorld
测试结束了...
所有测试就要结束了...

Process finished with exit code 0
```

