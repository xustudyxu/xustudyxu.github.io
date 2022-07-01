---
title: Spring5 事务
date: 2022-01-04 19:33:20
permalink: /pages/1a5d78/
categories:
  - Spring5
tags:
  - Spring5
---
# Spring5 事务

[[toc]]

## 事务概念

1. 什么是事务

   1. <font color=#DC4040 size=4 face="黑体">事务是数据库操作最基本的单元，逻辑上一组操作，要么都成功，如果有一个失败所有操作都失败</font>
   2. 典型场景:银行转账

   + lucy转账100元给mary
   + lucy少100,mary多100

2. 事务四个特性(ACID)

   1. 原子性
   2. 一致性
   3. 隔离性
   4. 持久性


## 搭建事务操作环境

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/05/01.png)

1. 创建数据库表,添加数据

   ```sql
   CREATE TABLE t_account(
   	id VARCHAR(20),
   	username VARCHAR(50),
   	money VARCHAR(50))
   INSERT INTO t_account VALUES('1','lucy',1000)
   INSERT INTO t_account VALUES('2','mary',1000)
   ```

2. 创建service,搭建dao,完成对象创建和注入关系

   1. service注入dao,在dao注入JdbcTemplate,在JdbcTemplate注入DataSource

      ```java
      @Service
      public class UserService {
      
          //注入dao
          @Autowired
          private UserDao userDao;
      }
      
      ```

      ```java
      @Repository
      public class UserDaoImpl implements UserDao{
      
          @Autowired
          private JdbcTemplate jdbcTemplate;
      }
      
      ```

3. 在dao创建两个方法，多钱和少钱的方法，在service创建方法(转账的方法)

   ```java
   @Repository
   public class UserDaoImpl implements UserDao{
   
       @Autowired
       private JdbcTemplate jdbcTemplate;
   
       //少钱
       @Override
       public void reduceMoney() {
   
           String sql="update t_account set money=money-? where username=?";
           jdbcTemplate.update(sql,100,"lucy");
   
   
       }
   
       //多钱
       @Override
       public void addMoney() {
   
           String sql="update t_account set money=money+? where username=?";
           jdbcTemplate.update(sql,100,"mary");
   
       }
   
   
   
   ```

   ```java
   @Service
   public class UserService {
   
       //注入dao
       @Autowired
       private UserDao userDao;
   
       //转账的方法
       public  void  accountMoney(){
   
           //lucy少100
           userDao.reduceMoney();
   
           //mary多100
           userDao.addMoney();
       }
   }
   
   ```

4. 上面代码，如果正常执行没有问题的，但是如果代码执行过程中出现异常,有问题

   ```java
   //转账的方法
       public  void  accountMoney(){
   
           //lucy少100
           userDao.reduceMoney();
   
           //模拟异常
           int i =10/0;
   
           //mary多100
           userDao.addMoney();
       }
   }
   //结果lucy少了100，而mary并没有增加100
   ```

   1. 上面问题如何解决呢

      + 使用事务进行解决

   2. 事务操作

      ```java
          //转账的方法
          public  void  accountMoney(){
              try {
      
                  //第一步 开启事务
      
                  //第二步进行业务操作
                  //lucy少100
                  userDao.reduceMoney();
      
                  //模拟异常
                  int i = 10 / 0;
      
                  //mary多100
                  userDao.addMoney();
      
                  //第三步 没有发生异常，提交事务
              }catch (Exception e){
      
                  //第四步 出现异常，事务回滚
      
              }
      ```

## Spring 事务管理介绍

1. **事务添加到JavaEE三层结构里面Service层(业务逻辑层)**

2. 在Spring进行事务管理操作

   1. 有两种方式:编程式事务管理和声明式事务管理(使用)

3. 声明式事务管理

   1. 基于注解方式(使用)
   2. 基于xml配置文件方式

4. 在Spring进行声明式事务管理，底层使用AOP

5. Spring事务管理API

   1. 提供一个接口，代表事务管理器，这个接口针对不同的框架提供不同的实现类

   ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/05/02.png)

## 注解声明式事务管理

1. 在Spring:配置文件配置事务管理器

   ```xml
    <!--创建事务管理器-->
       <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
       <!--注入数据源-->
           <property name="dataSource" ref="dataSource"></property>
       </bean>
   ```

2. 在Spring配置文件，开启事务注解

   1. 在Spring配置文件引入名称空间tx

      ```xml
      <beans xmlns="http://www.springframework.org/schema/beans"
             xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xmlns:context="http://www.springframework.org/schema/context"
             xmlns:aop="http://www.springframework.org/schema/aop"
             xmlns:tx="http://www.springframework.org/schema/tx"
             xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
                                  http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
                                  http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd
                                  http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx.xsd">
      ```

   2. 开启事务注解

      ```xml
          <!--开启事务注解-->
          <tx:annotation-driven transaction-manager="transactionManager"></tx:annotation-driven>
      ```

   3. 在service类上面(获取service类里面方法上面)添加事务注解

      1. @Transactional,这个注解添加到类上面，也可以添加到方法上面
      2. 如果把这个注解添加到类上面，这个类里面的所有的方法都添加事务
      3. 如果把这个注解添加到方法上面，为这个方法添加事务

   ```java
   @Service
   @Transactional
   public class UserService {
   }
   ```

> 经测试，虽然发生异常，但是事务回滚，lucy和mary的金额仍然是1000 

## 注解声明式事务管理参数配置

1. 在service类上面添加注解@Transactiona，在这个注解里面可以配置事务相关参数

   ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/05/03.png)

### propagation：事务传播行为

1. 多事务方法直接进行调用，这个过程中事务是如何进行管理的

   ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/05/04.png)

事务的传播行为可以由传播属性指定。Spring定义了7种类传播行为

| 传播属性     | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| REQUIRED     | 如果有事务在运行，当前的方法就在这个事务内运行，否则，就启动一个新的事物，并在自己的事务内运行 |
| REQUIRED_NEW | 当前的方法必须启动新事物，并在它自己的事务内运行，如果有事务正在运行，应该将它挂起 |
| SUPPORTS     | 如果有事务在运行，当前的方法就在这个事务内运行，否则它可以不运行在事务中 |
| NOT_SUPPROTS | 当前的方法不应该运行在事务中，如果有运行的事务，将它挂起     |
| MANDATORY    | 当前的方法必须运行在事物内部，如果没有正在运行的事务，就抛出异常 |
| NEVER        | 当前的方法不应该运行在事务中，如果有运行的事务，就抛出异常   |
| NESTED       | 如果有事务在运行，当前的方法就应该在这个事务的嵌套事务内运行。否则，就启动一个新的事务，并在它自己的事务内运行 |

```java
@Service
@Transactional(propagation = Propagation.REQUIRED)
public class UserService {
}
```

### isolation：事务隔离级别

1. 事务有特性称为隔离性，多事务操作之间不会产生影响。不考虑隔离性产生很多问题

2. 有三个读的问题:脏读、不可重复读、幻读

   1. 脏读：一个未提交事务读取到另一个 未提交事务的数据

      ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/05/05.png)

   2. 不可重复读

      ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/05/06.png)

   3. 幻读:一个未提交事务读取到另一个提交事务添加数据

3. 通过设置事务隔离性，解决读问题

   |                            | 脏读 | 不可重复度 | 幻读 |
   | :------------------------: | :--: | :--------: | :--: |
   | READ UNCOMMITTED(读未提交) |  有  |     有     |  有  |
   |  READ COMMITTED(读已提交)  |  无  |     有     |  有  |
   | REPEATABLE READ(可重复读)  |  无  |     无     |  有  |
   |    SERIALIZABLE(串行化)    |  无  |     无     |  无  |

   ```java
   @Service
   @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.REPEATABLE_READ)
   public class UserService {
   }
   ```

### timeout：超时时间

1. 事务需要在一定时间内提交，如果不提交进行回滚
2. 默认值是-1,设置时间以秒为单位进行计算

```java
@Service
@Transactional(timeout = -1,propagation = Propagation.REQUIRED,isolation = Isolation.REPEATABLE_READ)
public class UserService {
```

### readOnly：是否只读

1. 读:查询操作，写:添加修改删除操作
2. readOnly默认值false,表示可以查询，可以添加修改删除操作
3. 设置readOnly值是true,设置成true之后，只能查询

```java
@Service
@Transactional(readOnly = true,timeout = -1,propagation = Propagation.REQUIRED,isolation = Isolation.REPEATABLE_READ)
public class UserService {
}
```

### rolibackFor：回滚

+ 设置出现哪些异常进行事务回滚

### noRollbackFor：不回滚

+ 设置出现哪些异常不进行事务回滚

## XML声明式事务管理(了解)

1. 在Spring配置文件中进行配置

   1. 配置事务管理器
   2. 配置通知
   3. 配置切入点和切面

   ```xml
     <!--1 创建事务管理器-->
       <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
       <!--注入数据源-->
           <property name="dataSource" ref="dataSource"></property>
       </bean>
   
       <!--2 配置通知-->
       <tx:advice id="txadvice">
       <!--配置事务参数-->
           <tx:attributes>
               <!--指定哪种规则的方法上面添加事务-->
               <tx:method name="accountMoney" propagation="REQUIRED"/>
               <!--<tx:method name="account*"/>-->
           </tx:attributes>
       </tx:advice>
       <!--3 配置切入点和切面-->
       <aop:config>
           <!--配置切入点-->
           <aop:pointcut id="pt" expression="execution(* com.frx01.spring5.service.UserService.*(..))"/>
           <!--配置切面-->
           <aop:advisor advice-ref="txadvice" pointcut-ref="pt"></aop:advisor>
       </aop:config>
   ```

## 完全注解开发

1. 创建配置类，使用配置类代替xml配置文件

   ```java
   /**
    * @author frx
    * @version 1.0
    * @date 2022/1/4  18:50
    */
   @Configuration//配置类
   @ComponentScan(basePackages = "com.frx01")//组件扫描
   @EnableTransactionManagement//开启事务
   public class TxConfig {
   
       //创建数据库连接池
       @Bean
       public DruidDataSource getDruidDataSource(){
   
           DruidDataSource dataSource = new DruidDataSource();
           dataSource.setDriverClassName("com.mysql.jdbc.Driver");
           dataSource.setUrl("jdbc:mysql:///user_db");
           dataSource.setUsername("root");
           dataSource.setPassword("hsp");
           return dataSource;
       }
       //Jdbc模板对象
       @Bean
       public JdbcTemplate getJdbcTemplate(DataSource dataSource){
           //到ioc容器中根据类型找到dataSource
           JdbcTemplate jdbcTemplate = new JdbcTemplate();
           //注入dataSource
           jdbcTemplate.setDataSource(dataSource);
           return  jdbcTemplate;
       }
       //创建事务事务管理器
       @Bean
       public DataSourceTransactionManager getDataSourceTransactionManager(DataSource dataSource){
           DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
           transactionManager.setDataSource(dataSource);
           return transactionManager;
   
       }
   }
   ```

   + 测试

     ```java
         @Test
         public void  testAccount3(){
             ApplicationContext context =
                     new AnnotationConfigApplicationContext(TxConfig.class);
     
             UserService userService = context.getBean("userService", UserService.class);
             userService.accountMoney();
     
         }
     ```

     

   