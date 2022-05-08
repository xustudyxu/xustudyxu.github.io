---
title: MyBatis-Plus 基本CRUD
date: 2022-04-15 01:28:14
permalink: /pages/bcc63c/
categories:
  - MyBatis-Plus
tags:
  - MyBatis-Plus
---
# MyBatis-Plus 基本CRUD

[[toc]]

## BaseMapper

MyBatis-Plus中的基本CRUD在内置的BaseMapper中都已得到了实现，我们可以直接使用，接口如下：

```java
public interface BaseMapper<T> extends Mapper<T> {

    /**
     * 插入一条记录
     *
     * @param entity 实体对象
     */
    int insert(T entity);

    /**
     * 根据 ID 删除
     *
     * @param id 主键ID
     */
    int deleteById(Serializable id);

    /**
     * 根据实体(ID)删除
     *
     * @param entity 实体对象
     * @since 3.4.4
     */
    int deleteById(T entity);

    /**
     * 根据 columnMap 条件，删除记录
     *
     * @param columnMap 表字段 map 对象
     */
    int deleteByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);

    /**
     * 根据 entity 条件，删除记录
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where 语句）
     */
    int delete(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 删除（根据ID或实体 批量删除）
     *
     * @param idList 主键ID列表或实体列表(不能为 null 以及 empty)
     */
    int deleteBatchIds(@Param(Constants.COLLECTION) Collection<?> idList);

    /**
     * 根据 ID 修改
     *
     * @param entity 实体对象
     */
    int updateById(@Param(Constants.ENTITY) T entity);

    /**
     * 根据 whereEntity 条件，更新记录
     *
     * @param entity        实体对象 (set 条件值,可以为 null)
     * @param updateWrapper 实体对象封装操作类（可以为 null,里面的 entity 用于生成 where 语句）
     */
    int update(@Param(Constants.ENTITY) T entity, @Param(Constants.WRAPPER) Wrapper<T> updateWrapper);

    /**
     * 根据 ID 查询
     *
     * @param id 主键ID
     */
    T selectById(Serializable id);

    /**
     * 查询（根据ID 批量查询）
     *
     * @param idList 主键ID列表(不能为 null 以及 empty)
     */
    List<T> selectBatchIds(@Param(Constants.COLLECTION) Collection<? extends Serializable> idList);

    /**
     * 查询（根据 columnMap 条件）
     *
     * @param columnMap 表字段 map 对象
     */
    List<T> selectByMap(@Param(Constants.COLUMN_MAP) Map<String, Object> columnMap);

    /**
     * 根据 entity 条件，查询一条记录
     * <p>查询一条记录，例如 qw.last("limit 1") 限制取一条记录, 注意：多条数据会报异常</p>
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    default T selectOne(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper) {
        List<T> ts = this.selectList(queryWrapper);
        if (CollectionUtils.isNotEmpty(ts)) {
            if (ts.size() != 1) {
                throw ExceptionUtils.mpe("One record is expected, but the query result is multiple records");
            }
            return ts.get(0);
        }
        return null;
    }

    /**
     * 根据 Wrapper 条件，判断是否存在记录
     *
     * @param queryWrapper 实体对象封装操作类
     * @return
     */
    default boolean exists(Wrapper<T> queryWrapper) {
        Long count = this.selectCount(queryWrapper);
        return null != count && count > 0;
    }

    /**
     * 根据 Wrapper 条件，查询总记录数
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    Long selectCount(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 entity 条件，查询全部记录
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<T> selectList(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 Wrapper 条件，查询全部记录
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<Map<String, Object>> selectMaps(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 Wrapper 条件，查询全部记录
     * <p>注意： 只返回第一个字段的值</p>
     *
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    List<Object> selectObjs(@Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 entity 条件，查询全部记录（并翻页）
     *
     * @param page         分页查询条件（可以为 RowBounds.DEFAULT）
     * @param queryWrapper 实体对象封装操作类（可以为 null）
     */
    <P extends IPage<T>> P selectPage(P page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);

    /**
     * 根据 Wrapper 条件，查询全部记录（并翻页）
     *
     * @param page         分页查询条件
     * @param queryWrapper 实体对象封装操作类
     */
    <P extends IPage<Map<String, Object>>> P selectMapsPage(P page, @Param(Constants.WRAPPER) Wrapper<T> queryWrapper);
}
```

## 插入

```java
    @Test
    public void testInsert(){
        User user = new User();
        user.setName("张三");
        user.setAge(23);
        user.setEmail("zhangsan@atschool.com");
        int result = userMapper.insert(user);
        System.out.println("result:"+result);
        System.out.println("id:"+user.getId());
    }
```

### 结果

```java
...
==>  Preparing: INSERT INTO user ( id, name, age, email ) VALUES ( ?, ?, ?, ? )
==> Parameters: 1514632107652923393(Long), 张三(String), 23(Integer), zhangsan@atschool.com(String)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@7e00ed0f]
result:1
id:1514632107652923393
2022-04-14 23:50:10.135  INFO 23036 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-14 23:50:10.155  INFO 23036 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

> 最终执行的结果，所获取的id为1514632107652923393
>
> 这是因为MyBatis-Plus在实现插入数据时，会默认基于[雪花算法](/pages/acce37/#雪花算法)的策略生成id

## 删除

### 通过id删除记录

```java
    @Test
    public void testDelete(){
        //通过id删除用户信息
        int result = userMapper.deleteById(1514558344269680641L);
        System.out.println("result:"+result);
    }
```

#### 结果

```java
...
==>  Preparing: DELETE FROM user WHERE id=?
==> Parameters: 1514558344269680641(Long)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@7e00ed0f]
result:1
2022-04-14 23:47:52.921  INFO 3000 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-14 23:47:52.962  INFO 3000 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 通过id批量删除记录

 ```java
    @Test
    public void testDeleteBatchIds(){
        List<Long> list = Arrays.asList(1L, 2L, 3L);
        int result = userMapper.deleteBatchIds(list);
        System.out.println("result:"+result);
    }
 ```

#### 结果

```java
...
==>  Preparing: DELETE FROM user WHERE id IN ( ? , ? , ? )
==> Parameters: 1(Long), 2(Long), 3(Long)
<==    Updates: 3
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@62db0521]
result:3
2022-04-15 00:00:56.260  INFO 9828 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-15 00:00:56.270  INFO 9828 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 通过map条件删除记录

```java
    @Test
    public  void testDeleteByMap(){
        Map<String,Object> map=new HashMap<>();
        //删除name为张三，年龄为23的所有用户
        map.put("name","张三");
        map.put("age",23);
        int result = userMapper.deleteByMap(map);
        System.out.println("result:"+result);

    }
```

#### 结果

```java
...
==>  Preparing: DELETE FROM user WHERE name = ? AND age = ?
==> Parameters: 张三(String), 23(Integer)
<==    Updates: 0
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@65f2f9b0]
result:0
2022-04-15 01:40:24.693  INFO 23248 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-15 01:40:24.713  INFO 23248 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

## 修改

### 通过Id修改记录

```java
    @Test
    public void testUpdateById(){
        User user = new User();
        user.setId(4L);
        user.setName("李四");//修改name
        user.setEmail("lisi@atSchool.com");
        int result = userMapper.updateById(user);
        System.out.println("result:"+result);
    }
```

#### 结果

```java
...
==>  Preparing: UPDATE user SET name=?, email=? WHERE id=?
==> Parameters: 李四(String), lisi@atSchool.com(String), 4(Long)
<==    Updates: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@62db0521]
result:1
2022-04-15 00:05:46.724  INFO 7772 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-15 00:05:46.774  INFO 7772 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

## 查询

### 根据id查询用户信息

```java
  	@Test
    public void testSelectById(){
        //通过Id查询用户信息
        User user = userMapper.selectById(1L);
        System.out.println(user);
    }
```

#### 结果

```java
...
==>  Preparing: SELECT id,name,age,email FROM user WHERE id=?
==> Parameters: 1(Long)
<==    Columns: id, name, age, email
<==        Row: 1, Jone, 18, test1@baomidou.com
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@3964d79]
User(id=1, name=Jone, age=18, email=test1@baomidou.com)
2022-04-15 00:10:50.204  INFO 11976 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-15 00:10:50.219  INFO 11976 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 根据多个id查询多个用户信息

```java
  	@Test
    public void testSelectBatchIds(){
        //根据多个id查询多个用户信息
        List<Long> list = Arrays.asList(1L, 2L, 3L);
        List<User> users = userMapper.selectBatchIds(list);
        users.forEach(System.out :: println);
    }
```

#### 结果

```java
...
=>  Preparing: SELECT id,name,age,email FROM user WHERE id IN ( ? , ? , ? )
==> Parameters: 1(Long), 2(Long), 3(Long)
<==    Columns: id, name, age, email
<==        Row: 1, Jone, 18, test1@baomidou.com
<==        Row: 2, Jack, 20, test2@baomidou.com
<==        Row: 3, Tom, 28, test3@baomidou.com
<==      Total: 3
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@65753040]
User(id=1, name=Jone, age=18, email=test1@baomidou.com)
User(id=2, name=Jack, age=20, email=test2@baomidou.com)
User(id=3, name=Tom, age=28, email=test3@baomidou.com)
2022-04-15 00:16:56.186  INFO 19452 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-15 00:16:56.202  INFO 19452 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 通过map条件查询用户信息

```java
   	@Test
    public void testSelectByMap(){
        //通过map条件查询用户信息
        Map<String,Object> map=new HashMap<>();
        map.put("name","Jack");
        map.put("age",20);
        List<User> users = userMapper.selectByMap(map);
        users.forEach(System.out :: println);
    }
```

#### 结果

```java
...
==>  Preparing: SELECT id,name,age,email FROM user WHERE name = ? AND age = ?
==> Parameters: Jack(String), 20(Integer)
<==    Columns: id, name, age, email
<==        Row: 2, Jack, 20, test2@baomidou.com
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@4acb2510]
User(id=2, name=Jack, age=20, email=test2@baomidou.com)
2022-04-15 00:20:34.390  INFO 20808 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-15 00:20:34.404  INFO 20808 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 查询所有数据

```java
  	@Test
    public void testSelectList(){
        //通过条件构造器查询一个list集合，若没有条件，则可以设置null为参数
        List<User> users = userMapper.selectList(null);
        users.forEach(System.out::println);
    }
```

> 通过观察BaseMapper中的方法，大多方法中都有Wrapper类型的形参，此为条件构造器，可针对于SQL语句设置不同的条件，若没有条件，则可以为该形参赋值null，即查询（删除/修改）所有数据

#### 结果

```java
...
==>  Preparing: SELECT id,name,age,email FROM user
==> Parameters: 
<==    Columns: id, name, age, email
<==        Row: 1, Jone, 18, test1@baomidou.com
<==        Row: 2, Jack, 20, test2@baomidou.com
<==        Row: 3, Tom, 28, test3@baomidou.com
<==        Row: 4, 李四, 21, lisi@atSchool.com
<==        Row: 5, Billie, 24, test5@baomidou.com
<==        Row: 6, Sandy, 21, test4@baomidou.com
<==        Row: 7, Billie, 24, test5@baomidou.com
<==      Total: 7
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@65753040]
User(id=1, name=Jone, age=18, email=test1@baomidou.com)
User(id=2, name=Jack, age=20, email=test2@baomidou.com)
User(id=3, name=Tom, age=28, email=test3@baomidou.com)
User(id=4, name=李四, age=21, email=lisi@atSchool.com)
User(id=5, name=Billie, age=24, email=test5@baomidou.com)
User(id=6, name=Sandy, age=21, email=test4@baomidou.com)
User(id=7, name=Billie, age=24, email=test5@baomidou.com)
2022-04-15 00:23:56.531  INFO 19052 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-15 00:23:56.548  INFO 19052 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 自定义功能

`UserMapper.java`

```java
@Repository
public interface UserMapper extends BaseMapper<User> {

    /**
     * 根据id用户信息为map集合
     * @param id
     * @return
     */
    Map<String,Object> selectMapById(long id);
}
```

`UserMapper.xml`

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.frx01.mybatisplus.mapper.UserMapper">
    <!--Map<String,Object> selectMapById(long id);-->
    <select id="selectMapById" resultType="map">
        select id,name,age,email from user where id=#{id}
    </select>
</mapper>
```

#### 测试

```java
    @Test
    public void selectMapById(){
        Map<String, Object> map = userMapper.selectMapById(1L);
        System.out.println(map);
    }

```

#### 结果

```java
...
==>  Preparing: select id,name,age,email from user where id=?
==> Parameters: 1(Long)
<==    Columns: id, name, age, email
<==        Row: 1, Jone, 18, test1@baomidou.com
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@7a904f32]
{name=Jone, id=1, age=18, email=test1@baomidou.com}
2022-04-15 00:53:53.503  INFO 18756 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-15 00:53:53.516  INFO 18756 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

## 通用Service

> 说明:
>
> - 通用 Service CRUD 封装[IService](https://gitee.com/baomidou/mybatis-plus/blob/3.0/mybatis-plus-extension/src/main/java/com/baomidou/mybatisplus/extension/service/IService.java)接口，进一步封装 CRUD 采用 `get 查询单行` `remove 删除` `list 查询集合` `page 分页` 前缀命名方式区分 `Mapper` 层避免混淆
> - 泛型 `T` 为任意实体对象
> - 建议如果存在自定义通用 Service 方法的可能，请创建自己的 `IBaseService` 继承 `Mybatis-Plus` 提供的基类
> - 对象 `Wrapper` 为 [条件构造器](https://baomidou.com/01.指南/02.核心功能/wrapper.html)
>
> + 官网地址：https://baomidou.com/pages/49cc81/#service-crud-%E6%8E%A5%E5%8F%
>   A3

### IService

MyBatis-Plus中有一个接口 IService和其实现类 ServiceImpl，封装了常见的业务层逻辑

详情查看源码IService和ServiceImpl

### 创建Service接口和实现类

```java
/**
 * UserService继承IService模板提供的基础功能
 */
public interface UserService extends IService<User> {
}
```

```java
/**
 * ServiceImpl实现了IService，提供了IService中基础功能的实现
 * 若ServiceImpl无法满足业务需求，则可以使用自定的UserService定义方法，并在实现类中实现
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}
```

### 测试查询记录数

```java
@SpringBootTest
public class MyBatisPlusServiceTest {

    @Autowired
    private UserService userService;

    @Test
    public void testGetCount(){
        long count = userService.count();
        System.out.println("总记录数:"+count);
    }
}
```

#### 结果

```java
...
==>  Preparing: SELECT COUNT( * ) FROM user
==> Parameters: 
<==    Columns: COUNT( * )
<==        Row: 7
<==      Total: 1
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@59901c4d]
总记录数:7
2022-04-15 01:12:23.828  INFO 1048 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-15 01:12:23.843  INFO 1048 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

### 测试批量插入

```java
    @Test
    public void testInsertMore(){
        // SQL长度有限制，海量数据插入单条SQL无法实行，
		// 因此MP将批量插入放在了通用Service中实现，而不是通用Mapper
        List<User> list =new ArrayList<>();
        for (int i = 1; i <=10 ; i++) {
            User user = new User();
            user.setName("frx"+i);
            user.setAge(20+i);
            list.add(user);
        }
        boolean b = userService.saveBatch(list);
        System.out.println(b==true?"操作成功":"操作失败");
    }
```

#### 结果

```java
...
==>  Preparing: INSERT INTO user ( id, name, age ) VALUES ( ?, ?, ? )
==> Parameters: 1514654840059076610(Long), frx1(String), 21(Integer)
==> Parameters: 1514654840226848770(Long), frx2(String), 22(Integer)
==> Parameters: 1514654840226848771(Long), frx3(String), 23(Integer)
==> Parameters: 1514654840268791810(Long), frx4(String), 24(Integer)
==> Parameters: 1514654840268791811(Long), frx5(String), 25(Integer)
==> Parameters: 1514654840268791812(Long), frx6(String), 26(Integer)
==> Parameters: 1514654840268791813(Long), frx7(String), 27(Integer)
==> Parameters: 1514654840268791814(Long), frx8(String), 28(Integer)
==> Parameters: 1514654840268791815(Long), frx9(String), 29(Integer)
==> Parameters: 1514654840268791816(Long), frx10(String), 30(Integer)
操作成功
2022-04-15 01:20:29.833  INFO 22624 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-15 01:20:29.843  INFO 22624 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

