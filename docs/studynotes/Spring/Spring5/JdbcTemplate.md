---
title: Jdbc Template
date: 2022-01-01 23:21:07
permalink: /pages/1f9dd1/
categories:
  - Spring5
tags:
  - Spring5
---
# Jdbc Template

[[toc]]

## Jdbc Template(概念和准备)

1. 什么是JdbcTemplate
   
   1. **Spring框架对JDBC进行封装，使用JdbcTemplate方便实现对数据库操作**
2. 准备工作
+ 创建数据库和表

```sql
CREATE DATABASE user_db
CREATE TABLE t_book(
	userId BIGINT PRIMARY KEY,
	username VARCHAR(100) NOT NULL,
	ustatus VARCHAR(50) NOT NULL)
```

+ 引入相关的jar包

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/01.png)

+ 在Spring文件中配置数据库的连接池

```xml
    <!-- 数据库连接池 -->
    <bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource"
          destroy-method="close">
        <property name="url" value="jdbc:mysql:///user_db" />
        <property name="username" value="root" />
        <property name="password" value="hsp" />
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
    </bean>
```

+ 配置JdbcTemplate对象，注入DataSource

```xml
 <!--创建jdbcTemplate对象-->
    <bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <!--注入DataSource-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>
```

+ 创建service类，创建dao,在dao注入jdbcTemplate对象

第一部分

```xml
    <!--开启组件扫描-->
    <context:component-scan base-package="com.frx01"></context:component-scan>
```

第二部分

+ Service

```java
@Service
public class BookService {

    //注入dao
    @Autowired
    private BookDao bookDao;
}
```

+ Dao

```java
@Repository
public class BookDaoImpl implements BookDao{

    //注入JdbcTemplate
    @Autowired
    private JdbcTemplate jdbcTemplate;
}

```

## Jdbc Template操作数据库(添加)

1. 对应数据库创建实体类

   ```java
   public class User {
       private String userId;
       private String username;
       private String ustatus;
   
       public String getUserId() {
           return userId;
       }
   
       public String getUsername() {
           return username;
       }
   
       public String getUstatus() {
           return ustatus;
       }
   
       public void setUserId(String userId) {
           this.userId = userId;
       }
   
       public void setUsername(String username) {
           this.username = username;
       }
   
       public void setUstatus(String ustatus) {
           this.ustatus = ustatus;
       }
   }
   
   ```

2. 编写service和dao

   1. 在dao进行数据库添加操作

   2. 调用JdbcTemplate对象里面update方法实现添加操作

      ```java
      update(String sql,Object... args)
      ```

   + 有两个参数

     + 第一个参数:sql语句

     + 第二个参数:可变参数，设置sql语句值

       ```java
       @Repository
       public class BookDaoImpl implements BookDao{
       
       
           //注入JdbcTemplate
           @Autowired
           private JdbcTemplate jdbcTemplate;
       
           //添加方法
           @Override
           public void add(Book book) {
       
               //1.创建sql语句
               String sql="insert into t_book values(?,?,?)";
               //2.调用方法实现
               Object[] args={ book.getUserId(), book.getUsername(), book.getUstatus()};
               int update = jdbcTemplate.update(sql,args);
               System.out.println(update);
       
           }
       
       
       }
       ```

   + 测试

   ```java
   public class TestBook {
       @Test
       public void testJdbcTemplate(){
   
           ApplicationContext context =
                   new ClassPathXmlApplicationContext("bean1.xml");
   
           BookService bookService = context.getBean("bookService", BookService.class);
           Book book = new Book();
           book.setUserId("1");
           book.setUsername("java");
           book.setUstatus("A");
           bookService.addBook(book);
   
   
       }
   ```

   ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/02.png)

   ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/03.png)

## Jdbc Template数据库操作数据库(修改和删除)

+ 在BookDaoImpl编写修改和删除操作

  ```java
    //修改
      @Override
      public void update(Book book) {
          String sql="update t_book set username=?,ustate=? where userId=?";
          Object[] args={ book.getUsername(), book.getUstatus(), book.getUserId()};
          int update = jdbcTemplate.update(sql,args);
          System.out.println(update>0?"修改成功":"修改失败");
  
      }
  
      //删除
      @Override
      public void delete(String id) {
          String sql="delete from t_book where userId=?)";
          int update = jdbcTemplate.update(sql, id);
          System.out.println(update>0?"删除成功":"删除失败");
  
      }
  ```

+ 测试类测试

  ```java
    //修改
  //        Book book = new Book();
  //        book.setUserId("1");
  //        book.setUsername("javaup");
  //        book.setUstatus("AAA");
  //        bookService.updateBook(book);
  
          //删除
          Book book = new Book();
          book.setUserId("1");
          bookService.deleteBook("1");
  ```

  ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/04.png)

  ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/05.png)

  + 删除结果

  ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/06.png)
  
  ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/07.png)

## Jdbc Template数据库操作数据库(查询返回某个值)

1. 查询表里面有多少条记录，返回是某个值

2. 使用JdbcTemplate对面里面queryForOcject方法实现查询操作

   ```java
   queryForObject(String sql,Class<T> requiredType)
   ```

   + 有两个参数

     + 第一个参数:sql语句
     + 第二个参数:返回类型Class

     ```java
       //查询表记录数
         @Override
         public int selectCount(){
             String sql="select count(*) from t_book";
             Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
             return count;
     
         }
     ```

   + 测试

     ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/08.png)

## Jdbc Template数据库操作数据库(查询返回某个对象)

1. 场景:查询图书详情

2. JdbcTemplate实现查询返回对象

   ```java
   queryForObject(String sql,RowMapper<T> rowMapper,Object... args)
   ```

   + 有三个参数

     + 第一个参数:sql语句
     + 第二个参数:RowMapper,是接口，返回不同类型的数据，使用这个接口里面实现类完成数据封装
     + 第三个参数:sql语句值

     ```java
      //查询返回对象
         @Override
         public Book findBookInfo(String id) {
             String sql="select * from t_book where userId=?";
             //调用方法
             Book book = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<Book>(Book.class),id);
             return book;
         }
     ```

   + 测试

     ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/09.png)

1. 场景:查询图书列表分页

2. 调用JdbcTemplate方法实现查询返回集合

   ```java
   query(String sql,RowMapper<T> rowMapper,Object... args)
   ```

   + 有三个参数

     + 第一个参数:sql语句
     + 第二个参数:RowMapper是接口，针对返回不同类型数据，使用这个接口里面实现类完成数据封装
     + 第三个参数:sql语句

     ```java
         //查询返回集合
         @Override
         public List<Book> findAllBook() {
             String sql="select * from t_book";
             //调用方法
             List<Book> bookList = jdbcTemplate.query(sql, new BeanPropertyRowMapper<Book>(Book.class));
     
             return  bookList;
     
         }
     ```

   + 测试

     ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/10.png)

## Jdbc Template数据库操作数据库(批量操作)

1. 批量操作:操作表里面多条记录

2. JdbcTemplate实现批量添加操作

   ```java
   batchUpdate(String sql,List<Object[]> batchArgs)
   ```

   + 有两个参数

     + 第一个参数:sql语句
     + 第二个参数:List集合，添加多条记录数据

     ```java
       //批量添加
         @Override
         public void batchAddBook(List<Object[]> batchArgs) {
             String sql="insert into t_book values(?,?,?)";
             int[] ints=jdbcTemplate.batchUpdate(sql,batchArgs);
             System.out.println(Arrays.toString(ints));
         }
     ```

   + 测试

     ```java
      //批量添加
             List<Object[]> batchArgs=new ArrayList<>();
             Object[] o1={"3","java","a"};
             Object[] o2={"4","c++","b"};
             Object[] o3={"5","MySQL","e"};
             batchArgs.add(o1);
             batchArgs.add(o2);
             batchArgs.add(o3);
             //调用批量添加
             bookService.batchAdd(batchArgs);
     ```


   ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/11.png)

3. JdbcTemplate实现批量修改操作

   ```java
    //批量修改
       @Override
       public void batchUpdateBook(List<Object[]> batchArgs) {
           String sql="update t_book set username=?,ustatus=? where userId=?";
           int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
           System.out.println(Arrays.toString(ints));
   
       }
   ```

+ 测试

  ```java
    //批量修改
          List<Object[]> batchArgs=new ArrayList<>();
          Object[] obj1={"java111","a3","3"};
          Object[] obj2={"c++1010","b4","4"};
          Object[] obj3={"MySQL11","c5","5"};
          batchArgs.add(obj1);
          batchArgs.add(obj2);
          batchArgs.add(obj3);
          //调用方法
          bookService.batchUpdate(batchArgs);
  
      }
  ```

  ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/12.png)

4. JdbcTemplate实现批量删除操作

   ```java
    //批量删除
       @Override
       public void batchDeleteBook(List<Object[]> batchArgs) {
           String sql="delete from t_book where userId=?";
           int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
           System.out.println(Arrays.toString(ints));
       }
   
   ```

+ 测试

  ```java
    //批量修改
          List<Object[]> batchArgs=new ArrayList<>();
          Object[] obj1={"3"};
          Object[] obj2={"4"};
          batchArgs.add(obj1);
          batchArgs.add(obj2);
          //调用方法实现批量删除
          bookService.batchDelete(batchArgs);
  ```

  ![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Spring5/images/04/13.png)

