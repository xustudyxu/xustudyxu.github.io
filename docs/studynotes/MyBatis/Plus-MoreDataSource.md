---
title: MyBatis-Plus 多数据源
date: 2022-04-20 19:49:59
permalink: /pages/575daf/
categories:
  - MyBatis-Plus
tags:
  - MyBatis-Plus
---
# MyBatis-Plus 多数据源

[[toc]]

> 适用于多种场景：纯粹多库、 读写分离、 一主多从、 混合模式等
>
> 目前我们就来模拟一个纯粹多库的一个场景，其他场景类似
>
> 场景说明：
>
> 我们创建两个库，分别为：mybatis_plus（以前的库不动）与mybatis_plus_1（新建），将mybatis_plus库的product表移动到mybatis_plus_1库，这样每个库一张表，通过一个测试用例分别获取用户数据与商品数据，如果获取到说明多库模拟成功

## 创建数据库及表

> 创建数据库mybatis_plus_1和表product

```sql
CREATE DATABASE `mybatis_plus_1` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `mybatis_plus_1`;
CREATE TABLE product
(
id BIGINT(20) NOT NULL COMMENT '主键ID',
NAME VARCHAR(30) NULL DEFAULT NULL COMMENT '商品名称',
price INT(11) DEFAULT 0 COMMENT '价格',
VERSION INT(11) DEFAULT 0 COMMENT '乐观锁版本号',
PRIMARY KEY (id)
);
```

> 添加测试数据

```sql
INSERT INTO product (id, NAME, price) VALUES (1, '外星人笔记本', 100);
```

> 删除mybatis_plus库product表

```sql
use mybatis_plus;
DROP TABLE IF EXISTS product;
```

## 引入依赖

```xml
        <dependency>
            <groupId>com.baomidou</groupId>
            <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
            <version>3.5.0</version>
        </dependency>
```

## 配置多数据源

> 说明：注释掉之前的数据库连接，添加新配置

```yaml
spring:
  # 配置数据源信息
  datasource:
    dynamic:
    # 设置默认的数据源或者数据源组,默认值即为master
      primary: master
      # 严格匹配数据源,默认false.true未匹配到指定数据源时抛异常,false使用默认数据源
      strict: false
      datasource:
        master:
          url: jdbc:mysql://localhost:3306/mybatis_plus?characterEncoding=utf-8&useSSL=false
          driver-class-name: com.mysql.cj.jdbc.Driver
          username: root
          password: hsp
        slave_1:
          url: jdbc:mysql://localhost:3306/mybatis_plus_1?characterEncoding=utf-8&useSSL=false
          driver-class-name: com.mysql.cj.jdbc.Driver
          username: root
          password: hsp
```

## 操作步骤

### 创建对应的JavaBean

```java
@Data
@TableName("t_user")
public class User {

    @TableId
    private Integer uid;
    private String userName;
    private Integer age;
    private Integer sex;
    private String email;
    private Integer isDeleted;

}
```

```java
@Data
public class Product {
    private Integer id;
    private String name;
    private Integer price;
    private Integer version;

}
```

### 添加mapper

```java
@Repository
public interface UserMapper extends BaseMapper<User> {
}
```

```java
@Repository
public interface ProductMapper extends BaseMapper<Product> {
}
```

> 主启动类上面要加上@MapperScan("XXX")

### 继承通用Service

```java
public interface UserService extends IService<User> {
}
```

```java
public interface ProductService extends IService<Product> {
}
```

### 创建用户service

```java
@DS("master") ////指定所操作的数据源
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}
```

### 创建商品service

```java
@DS("slave_1")
@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {
}
```

### 测试

```java
@SpringBootTest
class MybatisPlusDatasourceApplicationTests {

    @Autowired
    private UserService userService;

    @Autowired
    private ProductService productService;

    @Test
    public void testDynamicDataSource(){
        System.out.println(userService.getById(1));
        System.out.println(productService.getById(1));

    }

}
```

#### 结果

```java
User(uid=1, userName=Jone, age=18, sex=null, email=test1@baomidou.com, isDeleted=1)//isDeleted并没有标注@TableLogic
Product(id=1, name=外星人笔记本, price=100, version=0)
```

::: tip

1. 都能顺利获取对象，则测试成功

2. 如果我们实现读写分离，将写操作方法加上主库数据源，读操作方法加上从库数据源，自动切
   换，是不是就能实现读写分离？

   **@DS** 可以注解在方法上或类上，**同时存在就近原则 方法上注解优先于类上注解**。

:::



