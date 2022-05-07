---
title: 瑞吉外卖-分类管理业务开发
date: 2022-05-07 21:21:04
permalink: /pages/233cd2/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖-分类管理业务开发

[[toc]]

## 效果展示

+ 管理后台

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.2xswdjlu12a0.webp)

+ 移动端

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.2bryvgbt1ou8.webp)

## 公共字段自动填充

### 问题分析

前面我们已经完成了后台系统的员工管理功能开发，在新增员工时需要设置创建时间、创建人、修改时间、修改人等字段，在编辑员工时需要设置修改时间和修改人等字段。这些字段属于公共字段，也就是很多表中都有这些字段，如下:

| 公共字段    |          |
| ----------- | -------- |
| create_time | datetime |
| update_time | datetime |
| create_time | bigint   |
| update_time | bigint   |

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.57qz99h9c680.webp)

能不能对于这些公共字段在某个地方统一处理，来简化开发呢?答案就是使用Mybatis Plus提供的<font color=##dd0000>公共字段自动填充</font>功能。

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.5cupob4zrjs0.webp)

### 代码实现

Mybatis Plus公共字段自动填充，也就是在插入或者更新的时候为指定字段赋予指定的值，使用它的好处就是可以统一对这些字段进行处理，避免了重复代码。

实现步骤:

1. 在实体类的属性上加入@TableField注解，指定自动填充的策略

```java
@Data
public class Employee implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;

    private String username;

    private String name;

    private String password;

    private String phone;

    private String sex;

    private String idNumber;//身份证号码

    private Integer status;

    @TableField(fill = FieldFill.INSERT) //插入时填充字段
    private LocalDateTime createTime;

    @TableField(fill = FieldFill.INSERT_UPDATE) //插入和更新时填充字段
    private LocalDateTime updateTime;

    @TableField(fill = FieldFill.INSERT) //插入时填充字段
    private Long createUser;

    @TableField(fill = FieldFill.INSERT_UPDATE) //插入和更新时填充字段
    private Long updateUser;

}
```

2. 按照框架【MyBatisPlus】要求编写元数据对象处理器，在此类中统一为公共字段赋值，此类需要实现MetaObjectHandler接口

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/5/7  19:59
 * 自定义元数据对象处理器
 */
@Component //Bean
@Slf4j
public class MyMetaObjectHandler implements MetaObjectHandler {

    /**
     * 插入操作自动填充
     * @param metaObject
     */
    @Override
    public  void insertFill(MetaObject metaObject) {
        
        log.info("公共字段自动填充[insert]...");
        log.info(metaObject.toString());
        metaObject.setValue("createTime", LocalDateTime.now());
        metaObject.setValue("updateTime",LocalDateTime.now());
        metaObject.setValue("createUser",new Long(1));
        metaObject.setValue("updateUser",new Long(1));
     
    }

    /**
     * 更新操作，自动填充
     * @param metaObject
     */
    @Override
    public void updateFill(MetaObject metaObject) {
        
        log.info("公共字段自动填充[update]...");
        log.info(metaObject.toString());
        metaObject.setValue("updateTime",LocalDateTime.now());
        metaObject.setValue("updateUser",new Long(1));
        
    }
}
```

+ 新增用户小王，账号为test001,再次修改账号为test002

![1651926420821](C:\Users\DELL\AppData\Roaming\Typora\typora-user-images\1651926420821.png)

### 功能完善

前面我们已经完成了公共字段自动填充功能的代码开发，但是还有一个问题没有解决，就是我们在自动填充createUser和updateUser时设置的用户id是固定值，现在我们需要改造成动态获取当前登录用户的id。

有的同学可能想到，用户登录成功后我们将用户id存入了HttpSession中，现在我从HttpSession中获取不就行了?
注意，我们在MyMetaObjectHandler类中是不能获得HttpSession对象的，所以我们需要通过其他方式来获取登录用户id。

可以使用`ThreadLocal`来解决此问题,它是JDK中提供的一个类。

在学习ThreadLpcal之前，我们需要先确认一个事情，就是客户端发送的每次http请求，对应的在服务端都会分配一个新的线程来处理，在处理过程中涉及到下面类中的方法都属于相同的一个线程:

1. `LogincheckFilter的doFilter方法`
2. `EmployeeController的update方法`
3. `MyMetaObjectHandler的updateFill方法`

可以在上面的三个方面中分别加入下面代码(获取当前线程id):

```java
long id =Thread.currentThread();
log.info("线程id:{}",id);
```

+ 测试修改小王账号为test003

::: details 控制台输出

```java
2022-05-07 20:48:42.262  INFO 4740 --- [nio-8088-exec-7] c.frx01.reggie.filter.LoginCheckFilter   : 拦截到请求:/employee/login
2022-05-07 20:48:42.262  INFO 4740 --- [nio-8088-exec-7] c.frx01.reggie.filter.LoginCheckFilter   : 本次请求/employee/login不需要处理
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4f5373ec] was not registered for synchronization because synchronization is not active
JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2b33c436] will not be managed by Spring
==>  Preparing: SELECT id,username,name,password,phone,sex,id_number,status,create_time,update_time,create_user,update_user FROM employee WHERE (username = ?)
==> Parameters: admin(String)
<==    Columns: id, username, name, password, phone, sex, id_number, status, create_time, update_time, create_user, update_user
<==        Row: 1, admin, 管理员, e10adc3949ba59abbe56e057f20f883e, 13812312312, 1, 110101199001010047, 1, 2021-05-06 17:20:07, 2021-05-10 02:24:09, 1, 1
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4f5373ec]
2022-05-07 20:48:42.412  INFO 4740 --- [nio-8088-exec-8] c.frx01.reggie.filter.LoginCheckFilter   : 拦截到请求:/employee/page
2022-05-07 20:48:42.413  INFO 4740 --- [nio-8088-exec-8] c.frx01.reggie.filter.LoginCheckFilter   : 用户已登录，用户id为；1
2022-05-07 20:48:42.413  INFO 4740 --- [nio-8088-exec-8] c.frx01.reggie.filter.LoginCheckFilter   : 线程id为:40
2022-05-07 20:48:42.413  INFO 4740 --- [nio-8088-exec-8] c.f.r.controller.EmployeeController      : page=1,pageSize=10,name=null
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@b7652e] was not registered for synchronization because synchronization is not active
JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2b33c436] will not be managed by Spring
==>  Preparing: SELECT COUNT(*) FROM employee
==> Parameters: 
<==    Columns: COUNT(*)
<==        Row: 5
<==      Total: 1
==>  Preparing: SELECT id,username,name,password,phone,sex,id_number,status,create_time,update_time,create_user,update_user FROM employee ORDER BY update_time DESC LIMIT ?
==> Parameters: 10(Long)
<==    Columns: id, username, name, password, phone, sex, id_number, status, create_time, update_time, create_user, update_user
<==        Row: 1522914207132921858, test002, 小王, e10adc3949ba59abbe56e057f20f883e, 13212345678, 1, 123456789991122331, 1, 2022-05-07 20:20:19, 2022-05-07 20:48:04, 1, 1
<==        Row: 1519950622798766082, Zhangsan, 张三, e10adc3949ba59abbe56e057f20f883e, 18339981812, 1, 123456789987654321, 1, 2022-04-29 16:03:54, 2022-05-07 20:03:23, 1, 1
<==        Row: 1520694192883232769, lisi123, 李四, e10adc3949ba59abbe56e057f20f883e, 18339976721, 1, 123456789123456789, 1, 2022-05-01 17:18:43, 2022-05-04 00:03:11, 1, 1
<==        Row: 1520694004332429315, lisi, 李四, e10adc3949ba59abbe56e057f20f883e, 18339976721, 1, 123456789987654321, 1, 2022-05-01 17:17:58, 2022-05-01 17:17:58, 1, 1
<==        Row: 1, admin, 管理员, e10adc3949ba59abbe56e057f20f883e, 13812312312, 1, 110101199001010047, 1, 2021-05-06 17:20:07, 2021-05-10 02:24:09, 1, 1
<==      Total: 5
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@b7652e]
<===============================修改账号为test003输出日志==============================>
2022-05-07 20:49:33.783  INFO 4740 --- [nio-8088-exec-2] c.frx01.reggie.filter.LoginCheckFilter   : 拦截到请求:/employee/1522914207132921858
2022-05-07 20:49:33.783  INFO 4740 --- [nio-8088-exec-2] c.frx01.reggie.filter.LoginCheckFilter   : 用户已登录，用户id为；1
2022-05-07 20:49:33.783  INFO 4740 --- [nio-8088-exec-2] c.frx01.reggie.filter.LoginCheckFilter   : 线程id为:34
2022-05-07 20:49:33.784  INFO 4740 --- [nio-8088-exec-2] c.f.r.controller.EmployeeController      : 根据id查询信息...
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4c3ceca9] was not registered for synchronization because synchronization is not active
JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2b33c436] will not be managed by Spring
==>  Preparing: SELECT id,username,name,password,phone,sex,id_number,status,create_time,update_time,create_user,update_user FROM employee WHERE id=?
==> Parameters: 1522914207132921858(Long)
<==    Columns: id, username, name, password, phone, sex, id_number, status, create_time, update_time, create_user, update_user
<==        Row: 1522914207132921858, test002, 小王, e10adc3949ba59abbe56e057f20f883e, 13212345678, 1, 123456789991122331, 1, 2022-05-07 20:20:19, 2022-05-07 20:48:04, 1, 1
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4c3ceca9]
2022-05-07 20:49:39.414  INFO 4740 --- [nio-8088-exec-3] c.frx01.reggie.filter.LoginCheckFilter   : 拦截到请求:/employee
2022-05-07 20:49:39.414  INFO 4740 --- [nio-8088-exec-3] c.frx01.reggie.filter.LoginCheckFilter   : 用户已登录，用户id为；1
2022-05-07 20:49:39.414  INFO 4740 --- [nio-8088-exec-3] c.frx01.reggie.filter.LoginCheckFilter   : 线程id为:35
2022-05-07 20:49:39.415  INFO 4740 --- [nio-8088-exec-3] c.f.r.controller.EmployeeController      : Employee(id=1522914207132921858, username=test003, name=小王, password=e10adc3949ba59abbe56e057f20f883e, phone=13212345678, sex=1, idNumber=123456789991122331, status=1, createTime=2022-05-07T20:20:19, updateTime=2022-05-07T20:48:04, createUser=1, updateUser=1)
2022-05-07 20:49:39.415  INFO 4740 --- [nio-8088-exec-3] c.f.r.controller.EmployeeController      : 线程id为:35
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4aa76d63] was not registered for synchronization because synchronization is not active
2022-05-07 20:49:39.415  INFO 4740 --- [nio-8088-exec-3] c.f.reggie.common.MyMetaObjectHandler    : 公共字段自动填充[update]...
2022-05-07 20:49:39.415  INFO 4740 --- [nio-8088-exec-3] c.f.reggie.common.MyMetaObjectHandler    : org.apache.ibatis.reflection.MetaObject@859b481
2022-05-07 20:49:39.415  INFO 4740 --- [nio-8088-exec-3] c.f.reggie.common.MyMetaObjectHandler    : 线程id为:35
JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2b33c436] will not be managed by Spring
==>  Preparing: UPDATE employee SET username=?, name=?, password=?, phone=?, sex=?, id_number=?, status=?, create_time=?, update_time=?, create_user=?, update_user=? WHERE id=?
==> Parameters: test003(String), 小王(String), e10adc3949ba59abbe56e057f20f883e(String), 13212345678(String), 1(String), 123456789991122331(String), 1(Integer), 2022-05-07T20:20:19(LocalDateTime), 2022-05-07T20:49:39.415(LocalDateTime), 1(Long), 1(Long), 1522914207132921858(Long)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4aa76d63]
2022-05-07 20:49:39.804  INFO 4740 --- [nio-8088-exec-4] c.frx01.reggie.filter.LoginCheckFilter   : 拦截到请求:/employee/page
2022-05-07 20:49:39.804  INFO 4740 --- [nio-8088-exec-4] c.frx01.reggie.filter.LoginCheckFilter   : 用户已登录，用户id为；1
2022-05-07 20:49:39.804  INFO 4740 --- [nio-8088-exec-4] c.frx01.reggie.filter.LoginCheckFilter   : 线程id为:36
2022-05-07 20:49:39.804  INFO 4740 --- [nio-8088-exec-4] c.f.r.controller.EmployeeController      : page=1,pageSize=10,name=null
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@212ba060] was not registered for synchronization because synchronization is not active
JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@2b33c436] will not be managed by Spring
==>  Preparing: SELECT COUNT(*) FROM employee
==> Parameters: 
<==    Columns: COUNT(*)
<==        Row: 5
<==      Total: 1
==>  Preparing: SELECT id,username,name,password,phone,sex,id_number,status,create_time,update_time,create_user,update_user FROM employee ORDER BY update_time DESC LIMIT ?
==> Parameters: 10(Long)
<==    Columns: id, username, name, password, phone, sex, id_number, status, create_time, update_time, create_user, update_user
<==        Row: 1522914207132921858, test003, 小王, e10adc3949ba59abbe56e057f20f883e, 13212345678, 1, 123456789991122331, 1, 2022-05-07 20:20:19, 2022-05-07 20:49:39, 1, 1
<==        Row: 1519950622798766082, Zhangsan, 张三, e10adc3949ba59abbe56e057f20f883e, 18339981812, 1, 123456789987654321, 1, 2022-04-29 16:03:54, 2022-05-07 20:03:23, 1, 1
<==        Row: 1520694192883232769, lisi123, 李四, e10adc3949ba59abbe56e057f20f883e, 18339976721, 1, 123456789123456789, 1, 2022-05-01 17:18:43, 2022-05-04 00:03:11, 1, 1
<==        Row: 1520694004332429315, lisi, 李四, e10adc3949ba59abbe56e057f20f883e, 18339976721, 1, 123456789987654321, 1, 2022-05-01 17:17:58, 2022-05-01 17:17:58, 1, 1
<==        Row: 1, admin, 管理员, e10adc3949ba59abbe56e057f20f883e, 13812312312, 1, 110101199001010047, 1, 2021-05-06 17:20:07, 2021-05-10 02:24:09, 1, 1
<==      Total: 5
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@212ba060]
```

:::

什么是ThreadLocal?

> ThreadLocal并不是一个Thread，而是Thread的局部变量。当使用ThreadLocal维护变量时，ThreadLocal为每个使用该变量的线程提供独立的变量副本，所以每一个线程都可以独立地改变自己的副本，而不会影响其它线程所对应的副本。ThreadLocal为每个线程提供单独一份存储空间，具有线程隔离的效果，只有在线程内才能获取到对应的值，线程外则不能访问。

ThreadLocal常用方法:

+ public void set(T value)  
  + 设置当前线程的线程局部变量的值
+ public T get() 
  + 返回当前线程所对应的线程局部变量的值

> 我们可以在LoginCheckFilter的doFilter方法中获取当前登录用户id，并调用ThreadLocal的set方法来设置当前线程的线程局部变量的值（用户id)，然后在MyMetaObjectHandler的updateFill方法中调用ThreadLocal的get方法来获得当前线程所对应的线程局部变量的值（用户id)。

实现步骤；

1. 编写BaseContext工具类，基于ThreadLocal封装的工具类
2. 在LoginCheckFilter的doFilter方法中调用BaseContext来设置当前登录用户的id
3. 在MyMetaObjectHandler的方法中调用BaseContext获取登录用户的id

+ BaseContext工具类

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/5/7  21:10
 * 基于ThreadLocal封装的工具类，用于保存和获取当前登录用户的id
 */
public class BaseContext {

    private static ThreadLocal<Long>  threadLocal=new ThreadLocal<>();

    public static void setCurrentId(Long id){
        threadLocal.set(id);
    }

    private static Long getCurrentId(){
        return threadLocal.get();
    }

}
```

+ doFilter方法,[点击跳转这个方法](/pages/f5d63e/#%E4%BB%A3%E7%A0%81%E5%BC%80%E5%8F%91),修改结果如下

```java
        //4.判断登录状态，如果已登录，则直接放行
        if(request.getSession().getAttribute("employee")!=null){
            log.info("用户已登录，用户id为；{}",request.getSession().getAttribute("employee"));

            //获取Id
            Long empId= (Long) request.getSession().getAttribute("employee");
            BaseContext.setCurrentId(empId);

            long id=Thread.currentThread().getId();
            log.info("线程id为:{}",id);

            filterChain.doFilter(request,response);
            return;
        }
```

> 同时也将MyMetaObjectHandler中`insertFill()方法`和`updateFill()方法`中的new Long(1)改为`BaseContext.getCurrentId(empId)`

+ 使用lisi账号测试修改小王账号为test004

::: details 控制台输出

```java
2022-05-07 21:32:58.937  INFO 9400 --- [nio-8088-exec-3] c.frx01.reggie.filter.LoginCheckFilter   : 拦截到请求:/employee/1522914207132921858
2022-05-07 21:32:58.937  INFO 9400 --- [nio-8088-exec-3] c.frx01.reggie.filter.LoginCheckFilter   : 用户已登录，用户id为；1520694004332429315
2022-05-07 21:32:58.937  INFO 9400 --- [nio-8088-exec-3] c.frx01.reggie.filter.LoginCheckFilter   : 线程id为:37
2022-05-07 21:32:58.938  INFO 9400 --- [nio-8088-exec-3] c.f.r.controller.EmployeeController      : 根据id查询信息...
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4a5646ca] was not registered for synchronization because synchronization is not active
JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@79a23eb1] will not be managed by Spring
==>  Preparing: SELECT id,username,name,password,phone,sex,id_number,status,create_time,update_time,create_user,update_user FROM employee WHERE id=?
==> Parameters: 1522914207132921858(Long)
<==    Columns: id, username, name, password, phone, sex, id_number, status, create_time, update_time, create_user, update_user
<==        Row: 1522914207132921858, test003, 小王, e10adc3949ba59abbe56e057f20f883e, 13212345678, 1, 123456789991122331, 1, 2022-05-07 20:20:19, 2022-05-07 21:32:41, 1, 1520694004332429315
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4a5646ca]
2022-05-07 21:33:02.707  INFO 9400 --- [nio-8088-exec-5] c.frx01.reggie.filter.LoginCheckFilter   : 拦截到请求:/employee
2022-05-07 21:33:02.707  INFO 9400 --- [nio-8088-exec-5] c.frx01.reggie.filter.LoginCheckFilter   : 用户已登录，用户id为；1520694004332429315
2022-05-07 21:33:02.707  INFO 9400 --- [nio-8088-exec-5] c.frx01.reggie.filter.LoginCheckFilter   : 线程id为:39
2022-05-07 21:33:02.708  INFO 9400 --- [nio-8088-exec-5] c.f.r.controller.EmployeeController      : Employee(id=1522914207132921858, username=test004, name=小王, password=e10adc3949ba59abbe56e057f20f883e, phone=13212345678, sex=1, idNumber=123456789991122331, status=1, createTime=2022-05-07T20:20:19, updateTime=2022-05-07T21:32:41, createUser=1, updateUser=1520694004332429315)
2022-05-07 21:33:02.708  INFO 9400 --- [nio-8088-exec-5] c.f.r.controller.EmployeeController      : 线程id为:39
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@6c76fe64] was not registered for synchronization because synchronization is not active
2022-05-07 21:33:02.708  INFO 9400 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : 公共字段自动填充[update]...
2022-05-07 21:33:02.708  INFO 9400 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : org.apache.ibatis.reflection.MetaObject@7be1cd58
2022-05-07 21:33:02.708  INFO 9400 --- [nio-8088-exec-5] c.f.reggie.common.MyMetaObjectHandler    : 线程id为:39
JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@79a23eb1] will not be managed by Spring
==>  Preparing: UPDATE employee SET username=?, name=?, password=?, phone=?, sex=?, id_number=?, status=?, create_time=?, update_time=?, create_user=?, update_user=? WHERE id=?
==> Parameters: test004(String), 小王(String), e10adc3949ba59abbe56e057f20f883e(String), 13212345678(String), 1(String), 123456789991122331(String), 1(Integer), 2022-05-07T20:20:19(LocalDateTime), 2022-05-07T21:33:02.708(LocalDateTime), 1(Long), 1520694004332429315(Long), 1522914207132921858(Long)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@6c76fe64]
2022-05-07 21:33:03.117  INFO 9400 --- [nio-8088-exec-4] c.frx01.reggie.filter.LoginCheckFilter   : 拦截到请求:/employee/page
2022-05-07 21:33:03.118  INFO 9400 --- [nio-8088-exec-4] c.frx01.reggie.filter.LoginCheckFilter   : 用户已登录，用户id为；1520694004332429315
2022-05-07 21:33:03.118  INFO 9400 --- [nio-8088-exec-4] c.frx01.reggie.filter.LoginCheckFilter   : 线程id为:38
2022-05-07 21:33:03.118  INFO 9400 --- [nio-8088-exec-4] c.f.r.controller.EmployeeController      : page=1,pageSize=10,name=null
Creating a new SqlSession
SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@13901309] was not registered for synchronization because synchronization is not active
JDBC Connection [com.mysql.cj.jdbc.ConnectionImpl@79a23eb1] will not be managed by Spring
==>  Preparing: SELECT COUNT(*) FROM employee
==> Parameters: 
<==    Columns: COUNT(*)
<==        Row: 5
<==      Total: 1
==>  Preparing: SELECT id,username,name,password,phone,sex,id_number,status,create_time,update_time,create_user,update_user FROM employee ORDER BY update_time DESC LIMIT ?
==> Parameters: 10(Long)
<==    Columns: id, username, name, password, phone, sex, id_number, status, create_time, update_time, create_user, update_user
<==        Row: 1522914207132921858, test004, 小王, e10adc3949ba59abbe56e057f20f883e, 13212345678, 1, 123456789991122331, 1, 2022-05-07 20:20:19, 2022-05-07 21:33:03, 1, 1520694004332429315
<==        Row: 1519950622798766082, Zhangsan, 张三, e10adc3949ba59abbe56e057f20f883e, 18339981812, 1, 123456789987654321, 1, 2022-04-29 16:03:54, 2022-05-07 20:03:23, 1, 1
<==        Row: 1520694192883232769, lisi123, 李四, e10adc3949ba59abbe56e057f20f883e, 18339976721, 1, 123456789123456789, 1, 2022-05-01 17:18:43, 2022-05-04 00:03:11, 1, 1
<==        Row: 1520694004332429315, lisi, 李四, e10adc3949ba59abbe56e057f20f883e, 18339976721, 1, 123456789987654321, 1, 2022-05-01 17:17:58, 2022-05-01 17:17:58, 1, 1
<==        Row: 1, admin, 管理员, e10adc3949ba59abbe56e057f20f883e, 13812312312, 1, 110101199001010047, 1, 2021-05-06 17:20:07, 2021-05-10 02:24:09, 1, 1
<==      Total: 5
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@13901309]
```

:::

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.4a2e84hzsyk0.webp)

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/studynotes/SpringBoot2/images/06/image.3errpy5gvn00.webp)

> 我们可以看出小王用户的修改用户的id为账号lisi用户的id

