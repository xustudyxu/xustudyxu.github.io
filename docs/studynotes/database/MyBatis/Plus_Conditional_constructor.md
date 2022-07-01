---
title: 条件构造器和常用接口
date: 2022-04-17 23:39:48
permalink: /pages/004342/
categories:
  - MyBatis-Plus
tags:
  - MyBatis-Plus
---
# 条件构造器和常用接口

[[toc]]

## wapper介绍

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/Plus-images/05/01.png)

+ Wrapper ： 条件构造抽象类，最顶端父类
  + AbstractWrapper ： 用于查询条件封装，生成 sql 的 where 条件
    + QueryWrapper ： 查询条件封装
    + UpdateWrapper ： Update 条件封装
    + AbstractLambdaWrapper ： 使用Lambda 语法
      + LambdaQueryWrapper ：用于Lambda语法使用的查询Wrapper
      + LambdaUpdateWrapper ： Lambda 更新封装Wrapper

## QueryWrapper

::: danger 警告

方法参数中的`String column`，要写数据库中的字段名

:::

### 组装查询条件

> 查询用户名包含a,年龄在20到30之间，邮箱信息不为null的用户信息

```java
    @Test
    public void test01(){
        QueryWrapper<User> queryWrapper=new QueryWrapper<>();
        queryWrapper.like("user_name","a")
                .between("age",20,30)
                .isNotNull("email");
        List<User> list = userMapper.selectList(queryWrapper);
        list.forEach(System.out :: println);
    }
}
```

#### 结果

```java
...
==>  Preparing: SELECT uid AS id,user_name AS name,age,email,is_deleted FROM t_user WHERE is_deleted=0 AND (user_name LIKE ? AND age BETWEEN ? AND ? AND email IS NOT NULL)//未删除状态的数据
==> Parameters: %a%(String), 20(Integer), 30(Integer)
<==    Columns: id, name, age, email, is_deleted
<==        Row: 6, Sandy, 21, test4@baomidou.com, 0
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@7a7cc52c]
User(id=6, name=Sandy, age=21, email=test4@baomidou.com, isDeleted=0)
2022-04-17 21:23:31.912  INFO 24952 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 21:23:31.933  INFO 24952 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 组装排序条件

> 查询用户信息，按照年龄的降序排序，若年龄相同，则按照Id升序排序

```java
	@Test
    public void test02(){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.orderByDesc("age")
                .orderByAsc("uid");
        List<User> list = userMapper.selectList(queryWrapper);
        list.forEach(System.out :: println);
    }
```

#### 结果

```java
...
==>  Preparing: SELECT uid AS id,user_name AS name,age,email,is_deleted FROM t_user WHERE is_deleted=0 ORDER BY age DESC,uid ASC
==> Parameters: 
<==    Columns: id, name, age, email, is_deleted
<==        Row: 7, Billie, 24, test5@baomidou.com, 0
<==        Row: 8, 张三, 23, zhangsan@atschool.com, 0
<==        Row: 9, 张三, 23, zhangsan@atschool.com, 0
<==        Row: 10, 张三, 23, zhangsan@atschool.com, 0
<==        Row: 6, Sandy, 21, test4@baomidou.com, 0
<==      Total: 5
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@69228e85]
User(id=7, name=Billie, age=24, email=test5@baomidou.com, isDeleted=0)
User(id=8, name=张三, age=23, email=zhangsan@atschool.com, isDeleted=0)
User(id=9, name=张三, age=23, email=zhangsan@atschool.com, isDeleted=0)
User(id=10, name=张三, age=23, email=zhangsan@atschool.com, isDeleted=0)
User(id=6, name=Sandy, age=21, email=test4@baomidou.com, isDeleted=0)
2022-04-17 21:37:32.032  INFO 15980 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 21:37:32.067  INFO 15980 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 组装删除条件

> 删除邮箱地址为null的用户信息

```java
    @Test
    public void test03(){
        //删除邮箱地址为null的用户信息
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.isNull("email");
        int result  = userMapper.delete(queryWrapper);
        System.out.println("受影响行数:"+result);

    }
```

#### 结果

```java
==>  Preparing: UPDATE t_user SET is_deleted=1 WHERE is_deleted=0 AND (email IS NULL)逻辑删除
==> Parameters: 
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@7139bd31]
受影响行数:1
2022-04-17 21:47:28.182  INFO 14044 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 21:47:28.414  INFO 14044 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 修改-条件优先级

#### 例一

> 将（年龄大于20并且用户名中包含有a）或邮箱为null的用户信息修改

```java
	@Test
    public void test04(){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.gt("age",20)
                .like("user_name","a")
                .or()
                .isNull("email");
        User user = new User();
        user.setName("小明");
        user.setEmail("test@atSchool.com");
        int result = userMapper.update(user, queryWrapper);
        System.out.println("result:"+result);
    }
```

#### 结果

```java
...
==>  Preparing: UPDATE t_user SET user_name=?, email=? WHERE is_deleted=0 AND (age > ? AND user_name LIKE ? OR email IS NULL)
==> Parameters: 小明(String), test@atSchool.com(String), 20(Integer), %a%(String)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@150ede8b]
result:1
2022-04-17 21:58:17.434  INFO 12304 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 21:58:17.447  INFO 12304 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

#### 例二

> 将用户名中包含有a并且（年龄大于20或邮箱为null）的用户信息修改

```java
    @Test
    public void test05(){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        //lambda表达式内的逻辑优先运算
        queryWrapper.like("user_name","a")
                .and(i->i.gt("age",20)
                        .or()
                        .isNull("email"));
        User user = new User();
        user.setName("小红");
        user.setEmail("test@atSchool.com");
        int result = userMapper.update(user, queryWrapper);
        System.out.println("result:"+result);

    }
```

#### 结果

```java
...
==>  Preparing: UPDATE t_user SET user_name=?, email=? WHERE is_deleted=0 AND (user_name LIKE ? AND (age > ? OR email IS NULL))
==> Parameters: 小红(String), test@atSchool.com(String), %a%(String), 20(Integer)
<==    Updates: 0
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4e1ce44]
result:0
2022-04-17 22:15:10.654  INFO 4324 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 22:15:10.707  INFO 4324 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 组装select子句

> 查询用户信息的username，age和email字段

```java
   	@Test
    public void test06(){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.select("user_name","age","email");
        List<Map<String, Object>> maps = userMapper.selectMaps(queryWrapper);
        maps.forEach(System.out :: println);
    }
```

#### 结果

```java
...
==>  Preparing: SELECT user_name,age,email FROM t_user WHERE is_deleted=0
==> Parameters: 
<==    Columns: user_name, age, email
<==        Row: 小明, 21, test@atSchool.com
<==        Row: Billie, 24, test5@baomidou.com
<==        Row: 张三, 23, zhangsan@atschool.com
<==        Row: 张三, 23, zhangsan@atschool.com
<==        Row: 张三, 23, zhangsan@atschool.com
<==      Total: 5
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@602ae7b6]
{user_name=小明, age=21, email=test@atSchool.com}
{user_name=Billie, age=24, email=test5@baomidou.com}
{user_name=张三, age=23, email=zhangsan@atschool.com}
{user_name=张三, age=23, email=zhangsan@atschool.com}
{user_name=张三, age=23, email=zhangsan@atschool.com}
2022-04-17 22:31:19.068  INFO 25564 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 22:31:19.251  INFO 25564 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 实现子查询

> 查询id小于等于4的用户信息

```java
    @Test
    public void test07(){
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.inSql("uid","select uid from t_user where uid<=4");
        List<User> list = userMapper.selectList(queryWrapper);
        list.forEach(System.out :: println);
    }
```

#### 结果

```java
...
==>  Preparing: SELECT uid AS id,user_name AS name,age,email,is_deleted FROM t_user WHERE is_deleted=0 AND (uid IN (select uid from t_user where uid<=4))
==> Parameters: 
<==      Total: 0
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@3e15bb06]
2022-04-17 22:39:12.244  INFO 25816 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 22:39:12.331  INFO 25816 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

## UpdateWrapper

> 将用户名中包含有a并且（年龄大于20或邮箱为null）的用户信息修改

```java
    @Test
    public void test08(){
        UpdateWrapper<User> userUpdateWrapper = new UpdateWrapper<>();
        userUpdateWrapper.like("user_name","a")
                .and(i->i.gt("age",20)
                .or()
                .isNull("email"));
        userUpdateWrapper.set("user_name","小黑")
                .set("email","abc@atSchool.com"); //不需要创建user对象
        int result = userMapper.update(null, userUpdateWrapper);
        System.out.println("result:"+result);
    }
```

#### 结果

```java
...
==>  Preparing: UPDATE t_user SET user_name=?,email=? WHERE is_deleted=0 AND (user_name LIKE ? AND (age > ? OR email IS NULL))
==> Parameters: 小黑(String), abc@atSchool.com(String), %a%(String), 20(Integer)
<==    Updates: 0
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@2f61d591]
result:0
2022-04-17 22:50:23.079  INFO 24852 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 22:50:23.125  INFO 24852 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

## condition

> 在真正开发的过程中，组装条件是常见的功能，而这些条件数据来源于用户输入，是可选的，因此我们在组装这些条件时，必须先判断用户是否选择了这些条件，若选择则需要组装该条件，若没有选择则一定不能组装，以免影响SQL执行的结果

### 思路一

```java
	@Test
    public void test09(){
        //定义查询条件，有可能为null（用户未输入或未选择）
        String username="";
        Integer ageBegin=20;
        Integer ageEnd=30;
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        if(StringUtils.isNotBlank(username)){
            //isNotBlank 判断某个字符串是否不为空字符串，不为null,不为空白符
            queryWrapper.like("user_name",username);
        }
        if(ageBegin!=null){
            queryWrapper.ge("age",ageBegin);
        }
        if(ageEnd!=null){
            queryWrapper.le("age",ageEnd);
        }
        List<User> list = userMapper.selectList(queryWrapper);
        list.forEach(System.out :: println);
    }
```

#### 结果

```java
...
==>  Preparing: SELECT uid AS id,user_name AS name,age,email,is_deleted FROM t_user WHERE is_deleted=0 AND (age >= ? AND age <= ?)
==> Parameters: 20(Integer), 30(Integer)
<==    Columns: id, name, age, email, is_deleted
<==        Row: 6, 小明, 21, test@atSchool.com, 0
<==        Row: 7, Billie, 24, test5@baomidou.com, 0
<==        Row: 8, 张三, 23, zhangsan@atschool.com, 0
<==        Row: 9, 张三, 23, zhangsan@atschool.com, 0
<==        Row: 10, 张三, 23, zhangsan@atschool.com, 0
<==      Total: 5
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@2f61d591]
User(id=6, name=小明, age=21, email=test@atSchool.com, isDeleted=0)
User(id=7, name=Billie, age=24, email=test5@baomidou.com, isDeleted=0)
User(id=8, name=张三, age=23, email=zhangsan@atschool.com, isDeleted=0)
User(id=9, name=张三, age=23, email=zhangsan@atschool.com, isDeleted=0)
User(id=10, name=张三, age=23, email=zhangsan@atschool.com, isDeleted=0)
2022-04-17 23:01:59.138  INFO 23772 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 23:01:59.163  INFO 23772 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 思路二

> 上面的实现方案没有问题，但是代码比较复杂，我们可以使用带condition参数的重载方法构建查询条件，简化代码的编写

```java
    @Test
    public void test10(){
        String username="a";
        Integer ageBegin=null;
        Integer ageEnd=30;
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.like(StringUtils.isNotBlank(username),"user_name",username)
                .ge(ageBegin!=null,"age",ageBegin)
                .le(ageEnd!=null,"age",ageEnd);
        List<User> list = userMapper.selectList(queryWrapper);
        list.forEach(System.out :: println);

    }
```

#### 结果

```java
...
==>  Preparing: SELECT uid AS id,user_name AS name,age,email,is_deleted FROM t_user WHERE is_deleted=0 AND (user_name LIKE ? AND age <= ?)
==> Parameters: %a%(String), 30(Integer)
<==      Total: 0
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@524a2ffb]
2022-04-17 23:13:16.331  INFO 26596 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 23:13:16.370  INFO 26596 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

## LambdaQueryWrapper

```java
    @Test
    public void test11(){
        //定义查询条件，有可能为null（用户未输入）
        String username="a";
        Integer ageBegin=null;
        Integer ageEnd=30;
        LambdaQueryWrapper<User> userLambdaQueryWrapper = new LambdaQueryWrapper<>();
        //避免使用字符串表示字段，防止运行时错误
        userLambdaQueryWrapper.like(StringUtils.isNotBlank(username),
                User :: getName,username)
                .ge(ageBegin!=null,User::getAge,ageBegin)
                .le(ageEnd!=null,User::getAge,ageEnd);
        List<User> list = userMapper.selectList(userLambdaQueryWrapper);
        list.forEach(System.out :: println);
    }
```

### 结果

```java
...
==>  Preparing: SELECT uid AS id,user_name AS name,age,email,is_deleted FROM t_user WHERE is_deleted=0 AND (user_name LIKE ? AND age <= ?)
==> Parameters: %a%(String), 30(Integer)
<==      Total: 0
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@75361cf6]
2022-04-17 23:21:28.345  INFO 5168 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 23:21:28.371  INFO 5168 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

## LambdaUpdateWrapper

```java
    @Test
    public void test12(){
        //组装set子句
        LambdaUpdateWrapper<User> userLambdaUpdateWrapper = new LambdaUpdateWrapper<>();
        userLambdaUpdateWrapper.like(User :: getName,"a")
                .and(i->i.gt(User::getAge,20)
                        .or().isNull(User::getEmail));
        userLambdaUpdateWrapper.set(User::getName,"小黑")
                .set(User ::getEmail,"abc@atSchool.com");//lambda表达式内的逻辑优先运算
        int result = userMapper.update(null, userLambdaUpdateWrapper);
        System.out.println("result:"+result);
    }
```

### 结果

```java
...
==>  Preparing: UPDATE t_user SET user_name=?,email=? WHERE is_deleted=0 AND (user_name LIKE ? AND (age > ? OR email IS NULL))
==> Parameters: 小黑(String), abc@atSchool.com(String), %a%(String), 20(Integer)
<==    Updates: 0
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@6d303498]
result:0
2022-04-17 23:35:34.607  INFO 22852 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-17 23:35:34.710  INFO 22852 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

