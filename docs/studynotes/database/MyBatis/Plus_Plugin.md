---
title: MyBatis-Plus 插件
date: 2022-04-19 16:38:36
permalink: /pages/160497/
categories:
  - MyBatis-Plus
tags:
  - MyBatis-Plus
---
# MyBatis-Plus 插件:electric_plug:

[[toc]]

## 分页插件

> MyBatis Plus自带分页插件，只要简单的配置即可实现分页功能

### 添加配置类

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/19  11:11
 */
@Configuration
@MapperScan(basePackages = "com.frx01.mybatisplus.mapper")
public class MyBatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor(){
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        //添加分页插件
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```

### 测试

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/4/19  11:21
 */
@SpringBootTest
public class MyBatisPlusPluginsTest {

    @Autowired
    private UserMapper userMapper;

    @Test
    public void testPage(){
        //显示第一页，每页三条数据
        Page<User> page = new Page<User>(1,3);
        userMapper.selectPage(page,null);
        System.out.println(page);
        System.out.println("当前页："+page.getCurrent());
        System.out.println("获取当前页数据:"+page.getRecords());
        System.out.println("获取总页数:"+page.getPages());
        System.out.println("获取总记录数:"+page.getTotal());
        System.out.println("是否有上一页："+page.hasPrevious());
        System.out.println("是否有下一页："+page.hasNext());
    }
}
```

#### 结果

```java
...
==>  Preparing: SELECT COUNT(*) AS total FROM t_user WHERE is_deleted = 0
==> Parameters: 
<==    Columns: total
<==        Row: 5
<==      Total: 1
==>  Preparing: SELECT uid AS id,user_name AS name,age,email,is_deleted FROM t_user WHERE is_deleted=0 LIMIT ?
==> Parameters: 3(Long)
<==    Columns: id, name, age, email, is_deleted
<==        Row: 6, 小明, 21, test@atSchool.com, 0
<==        Row: 7, Billie, 24, test5@baomidou.com, 0
<==        Row: 8, 张三, 23, zhangsan@atschool.com, 0
<==      Total: 3
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@2ab0702e]
com.baomidou.mybatisplus.extension.plugins.pagination.Page@459f703f
当前页：1
获取当前页数据:[User(id=6, name=小明, age=21, email=test@atSchool.com, isDeleted=0), User(id=7, name=Billie, age=24, email=test5@baomidou.com, isDeleted=0), User(id=8, name=张三, age=23, email=zhangsan@atschool.com, isDeleted=0)]
获取总页数:2
获取总记录数:5
是否有上一页：false
是否有下一页：true
2022-04-19 11:36:03.650  INFO 984 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-19 11:36:03.674  INFO 984 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/Plus-images/06/01.png)

## xml自定义分页

### UserMapper

```yaml
#配置mybatis日志
mybatis-plus:
  configuration:
    log-impl: org.apache.ibatis.logging.stdout.StdOutImpl
  #设置mybatis-plus的全局配置
  global-config:
    db-config:
      # 配置MyBatis-Plus操作表的默认前缀
      table-prefix: t_
      # 配置MyBatis-Plus的主键策略
      id-type: auto
  # 配置类型别名所对应的包
  type-aliases-package: com.frx01.mybatisplus.pojo
```

### UserMapper.xml中编写SQL

```sql
	<!--Page<User> selectPageVo(@Param("page") Page<User> page,@Param("age") Integer age);-->
    <select id="selectPageVo" resultType="User">
        select uid,user_name,age,email from t_user where age > #{age}
    </select>
```

### 测试

```java
    @Test
    public void testPageVo(){
        Page<User> page = new Page<>(1,3);
        userMapper.selectPageVo(page,20);
        System.out.println("当前页："+page.getCurrent());
        System.out.println("获取当前页数据:"+page.getRecords());
        System.out.println("获取总页数:"+page.getPages());
        System.out.println("获取总记录数:"+page.getTotal());
        System.out.println("是否有上一页："+page.hasPrevious());
        System.out.println("是否有下一页："+page.hasNext());
    }
```

#### 结果

```java
...
==>  Preparing: SELECT COUNT(*) AS total FROM t_user WHERE age > ?
==> Parameters: 20(Integer)
<==    Columns: total
<==        Row: 6
<==      Total: 1
==>  Preparing: select uid,user_name,age,email from t_user where age > ? LIMIT ?
==> Parameters: 20(Integer), 3(Long)
<==    Columns: uid, user_name, age, email
<==        Row: 3, Tom, 28, test3@baomidou.com
<==        Row: 6, 小明, 21, test@atSchool.com
<==        Row: 7, Billie, 24, test5@baomidou.com
<==      Total: 3
Closing non transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@7158daf2]
当前页：1
获取当前页数据:[User(id=null, name=null, age=28, email=test3@baomidou.com, isDeleted=null), User(id=null, name=null, age=21, email=test@atSchool.com, isDeleted=null), User(id=null, name=null, age=24, email=test5@baomidou.com, isDeleted=null)]
获取总页数:2
获取总记录数:6
是否有上一页：false
是否有下一页：true
2022-04-19 12:16:42.241  INFO 22084 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown initiated...
2022-04-19 12:16:42.295  INFO 22084 --- [ionShutdownHook] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Shutdown completed.

Process finished with exit code 0
```

## 乐观锁

### 场景

> 一件商品，成本价是80元，售价是100元。老板先是通知小李，说你去把商品价格增加50元。小
> 李正在玩游戏，耽搁了一个小时。正好一个小时后，老板觉得商品价格增加到150元，价格太
> 高，可能会影响销量。又通知小王，你把商品价格降低30元。
>
> 此时，小李和小王同时操作商品后台系统。小李操作的时候，系统先取出商品价格100元；小王
> 也在操作，取出的商品价格也是100元。小李将价格加了50元，并将100+50=150元存入了数据
> 库；小王将商品减了30元，并将100-30=70元存入了数据库。是的，如果没有锁，小李的操作就
> 完全被小王的覆盖了。
>
> 现在商品价格是70元，比成本价低10元。几分钟后，这个商品很快出售了1千多件商品，老板亏1
> 万多。

### 乐观锁与悲观锁

> 上面的故事，如果是乐观锁，小王保存价格前，会检查下价格是否被人修改过了。如果被修改过
> 了，则重新取出的被修改后的价格，150元，这样他会将120元存入数据库。
>
> 如果是悲观锁，小李取出数据后，小王只能等小李操作完之后，才能对价格进行操作，也会保证
> 最终的价格是120元。

### 模拟修改冲突

#### 数据库中增加商品表

```sql
CREATE TABLE t_product
(
id BIGINT(20) NOT NULL COMMENT '主键ID',
NAME VARCHAR(30) NULL DEFAULT NULL COMMENT '商品名称',
price INT(11) DEFAULT 0 COMMENT '价格',
VERSION INT(11) DEFAULT 0 COMMENT '乐观锁版本号',
PRIMARY KEY (id)
);
```

#### 添加数据

```sql
INSERT INTO t_product (id, NAME, price) VALUES (1, '外星人笔记本', 100);
```

#### 添加实体

```sql
@Data
public class Product {
    private Integer id;
    private String name;
    private Integer price;
    private Integer version;
}
```

#### 添加mapper

```java
public interface ProductMapper extends BaseMapper<Product> {
}
```

#### 测试

```java
    @Test
    public void testProduct01(){
        //小李查询商品价格
        Product productLi = productMapper.selectById(1);
        System.out.println("小李查询的商品价格："+productLi.getPrice());
        //小王查询商品价格
        Product productWang = productMapper.selectById(1);
        System.out.println("小王查询的商品价格:"+productWang.getPrice());
        //小李将商品价格加50
        productLi.setPrice(productLi.getPrice()+50);
        productMapper.updateById(productLi);
        //小王将商品价格减去30
        productWang.setPrice(productWang.getPrice()-30);
        productMapper.updateById(productWang);

        //老板查询商品价格
        Product productBoss = productMapper.selectById(1);
        System.out.println("老板查询的商品价格:"+productBoss.getPrice());

    }
```

#### 结果

```java
==>  Preparing: SELECT id,name,price,version FROM t_product WHERE id=?
小王查询的商品价格:100    
==>  Preparing: SELECT id,name,price,version FROM t_product WHERE id=?
小李查询的商品价格:100
==>  Preparing: SELECT id,name,price,version FROM t_product WHERE id=?
老板查询的商品价格:70  //70替换了150
```

### 乐观锁实现流程

> 数据库中添加`version字段`
>
> 取出记录时，获取当前version
>
> ```sql
> SELECT id,`name`,price,`version` FROM product WHERE id=1
> ```
>
> 更新时，version + 1，如果where语句中的version版本不对，则更新失败
>
> ```sql
> UPDATE product SET price=price+50, `version`=`version` + 1 WHERE id=1 AND
> `version`=1
> ```

### MyBatis-Plus实现乐观锁

#### 修改实现类

```java
@Data
public class Product {
    private Integer id;
    private String name;
    private Integer price;
    @Version //标识乐观锁版本号字段
    private Integer version;
}
```

#### 添加乐观锁插件配置

```java
@Configuration
@MapperScan(basePackages = "com.frx01.mybatisplus.mapper")
public class MyBatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor(){
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        //添加分页插件
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        //添加乐观锁插件
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return interceptor;
    }
}
```

#### 测试结果

```java
==>  Preparing: SELECT id,name,price,version FROM t_product WHERE id=?
==> Parameters: 1(Integer)
<==    Columns: id, name, price, version
<==        Row: 1, 外星人笔记本, 100, 1
<==      Total: 1
小李查询的商品价格：100
    
==>  Preparing: SELECT id,name,price,version FROM t_product WHERE id=?
==> Parameters: 1(Integer)
<==    Columns: id, name, price, version
<==        Row: 1, 外星人笔记本, 100, 1
<==      Total: 1
小王查询的商品价格:100
    
==>  Preparing: UPDATE t_product SET name=?, price=?, version=? WHERE id=? AND version=?
==> Parameters: 外星人笔记本(String), 150(Integer), 2(Integer), 1(Integer), 1(Integer)
<==    Updates: 1 //小李修改成功，version变为1
    
==>  Preparing: UPDATE t_product SET name=?, price=?, version=? WHERE id=? AND version=?
==> Parameters: 外星人笔记本(String), 70(Integer), 2(Integer), 1(Integer), 1(Integer)
<==    Updates: 0 //小王修改失败了因为小王修改的version为0 找不到了 

==>  Preparing: UPDATE t_product SET name=?, price=?, version=? WHERE id=? AND version=?
==>  Preparing: SELECT id,name,price,version FROM t_product WHERE id=?
==> Parameters: 1(Integer)
<==    Columns: id, name, price, version
<==        Row: 1, 外星人笔记本, 150, 2
<==      Total: 1
老板查询的商品价格:150
```

> 小李查询商品信息：
>
> SELECT id,name,price,version FROM t_product WHERE id=?
>
> 小王查询商品信息：
>
> SELECT id,name,price,version FROM t_product WHERE id=?
>
> 小李修改商品价格，自动将version+1
>
> UPDATE t_product SET name=?, price=?, version=? WHERE id=? AND version=?
>
> Parameters: 外星人笔记本(String), 150(Integer), 1(Integer), 1(Long), 0(Integer)
>
> `小王修改商品价格，此时version已更新，条件不成立，修改失败`
>
> UPDATE t_product SET name=?, price=?, version=? WHERE id=? AND version=?
>
> Parameters: 外星人笔记本(String), 70(Integer), 1(Integer), 1(Long), 0(Integer)
>
> 最终，小王修改失败，Boss查询价格：150
>
> SELECT id,name,price,version FROM t_product WHERE id=?

#### 优化流程

```java
    @Test
    public void testProduct01(){
        //小李查询商品价格
        Product productLi = productMapper.selectById(1);
        System.out.println("小李查询的商品价格："+productLi.getPrice());
        //小王查询商品价格
        Product productWang = productMapper.selectById(1);
        System.out.println("小王查询的商品价格:"+productWang.getPrice());
        //小李将商品价格加50
        productLi.setPrice(productLi.getPrice()+50);
        productMapper.updateById(productLi);
        //小王将商品价格减去30
        productWang.setPrice(productWang.getPrice()-30);
        int result = productMapper.updateById(productWang);
        if(result == 0){
            //操作失败，重试，获得版本号
            Product productNew = productMapper.selectById(1);
            productNew.setPrice(productLi.getPrice()-30);
            productMapper.updateById(productNew);
        }
        //老板查询商品价格
        Product productBoss = productMapper.selectById(1);
        System.out.println("老板查询的商品价格:"+productBoss.getPrice());

    }
```

> 小李查询商品的价格为100
>
> 小王查询商品的价格为100
>
> 小李修改商品价格为150，版本号修改为1
>
> 小王修改版本0的商品价格失败
>
> `小王重新获取版本号`
>
> 小李修改商品价格为120，版本号修改为2
>
> Boss查询商品价格为150，版本号为2

