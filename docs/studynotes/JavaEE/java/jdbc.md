---
title: Java JDBC和数据库连接池
date: 2021-12-20 18:44:12
permalink: /pages/fdf000/
categories:
  - java
tags:
  - java
---
# Java JDBC和数据库连接池

## JDBC概述

### 基本介绍

1. <font color=#DC4040 size=4 face="黑体">JDBC为访问不同的数据库提供了统一的接口，为使用者屏蔽了细节问题。</font>
2. <font color=#DC4040 size=4 face="黑体">Java程序员使用JDBC,可以连接任何提供了JDBC驱动程序的数据库系统，从而完成对数据库的各种操作。</font>
3. **JDBC的基本原理图[重要!]**

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/01.png)

### 模拟 JDBC

```java
package com.jdbc.myjdbc;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/26  15:39
 * 我们规定的jdbc接口
 */
public interface JdbcInterface {
    // 连接
    public Object getConnection();
    // crud
    public void crud();
    //关闭连接
    public void close();
}

```

```java
package com.jdbc.myjdbc;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/26  15:42
 * mysql 数据库实现了jdbc接口【mysql厂商开发】
 */
public class MysqlJdbcImpl implements JdbcInterface{
    @Override
    public Object getConnection() {
        System.out.println("得到mysql 的连接");
        return null;
    }

    @Override
    public void crud() {
        System.out.println("完成 mysql 的增删改查");

    }

    @Override
    public void close() {
        System.out.println("关闭 mysql 的连接");

    }
}

```

```java
package com.jdbc.myjdbc;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/26  15:47
 */
public class OracleJdbcImpl implements JdbcInterface{
    @Override
    public Object getConnection() {
        System.out.println("得到Oracle 的连接");
        return null;
    }

    @Override
    public void crud() {
        System.out.println("得到oracle 的增删改查");
    }

    @Override
    public void close() {
        System.out.println("关闭oracle 的连接");
    }
}

```

```java
package com.jdbc.myjdbc;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/26  15:45
 */
public class TestJDBC {
    public static void main(String[] args) {
        //完成对mysql的操作
        JdbcInterface jdbcInterface = new MysqlJdbcImpl();
        jdbcInterface.getConnection();//通过接口来调用实现类
        jdbcInterface.crud();
        jdbcInterface.close();

        //完成对oracle的操作
        System.out.println("===========================");
        jdbcInterface = new MysqlJdbcImpl();
        jdbcInterface.getConnection();//通过接口来调用实现类
        jdbcInterface.crud();
        jdbcInterface.close();


    }
}

```

### JDBC 带来的好处

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/02.png)

### JDBC API

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/03.png)

## JDBC 快速入门

### JDBC 程序编写步骤

1. <font color=#DC4040 size=4 face="黑体">注册驱动-加载Driver 类</font>
2. <font color=#DC4040 size=4 face="黑体">获取连接-得到Connection</font>
3. <font color=#DC4040 size=4 face="黑体">执行增删改查-发送SQL给mysql执行</font>
4. <font color=#DC4040 size=4 face="黑体">释放资源-关闭相关连接</font>

### jdbc第一个程序

```java
package com.jdbc;

import com.mysql.jdbc.Driver;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/26  16:29
 * 这是第一个jdbc程序，完成简单的操作
 */
public class Jdbc01 {
    public static void main(String[] args) throws SQLException {

        //前置工作，在项目下创建一个文件夹 libs
        //将mysql.jar 拷贝到该目录下 点击add to project ..加入到项目

        //1.注册驱动
        Driver driver = new Driver();

        //2.得到连接
        //(1)jdbc:mysql:// 规定好表示协议，通过jdbc的方式连接mysql
        //(2)localhost 主机，可以是ip地址
        //(3)3306 表示监听端口
        //(4) frx_db02 连接到mysql dbms 的哪个数据库
        //(5)mysql连接本质就是前面学过的socket连接
        String url="jdbc:mysql://localhost:3306/frx_db02";
        //将用户名和密码放入到Properties 对象
        Properties properties = new Properties();
        //说明 user 和password 是规定好的，后面的值根据实际情况写
        properties.setProperty("user","root");// 用户
        properties.setProperty("password","hsp");//密码

        Connection connect = driver.connect(url, properties);



        //3.执行sql
        //String sql="insert into actor values(null,'冯荣旭','男','1970-11-11','100')";
//        String sql="update  actor set name='周星驰' where id=1";
        String sql="delete  from actor where id=1";
        //statement 用于执行静态SQL语句并返回其生成的结果对象
        Statement statement = connect.createStatement();
        int rows = statement.executeUpdate(sql);//如果是dml语句，返回的就是影响行数


        System.out.println(rows>0? "成功":"失败" );



        //4.关闭连接资源
        statement.close();
        connect.close();
    }
}

```

## 获取数据库连接5种方式

### 方式一

//获取Driver实现类对象
**Driver driver = new com.mysql.jdbc.Driver();**
**String url = "jdbcmysql://localhost:3306/jdbc_db";**
**Properties info = new Properties();**
**info.setProperty("user", "root");**
**info.setProperty("password", "hsp");**
**Connection conn = driver.connect(url, info);**
**System.out.println(conn);**

### 方式二

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/04.png)

### 方式三

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/05.png)

### 方式四

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/06.png)

### 方式五

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/07.png)

```java
package com.jdbc;

import com.mysql.jdbc.Driver;
import org.junit.jupiter.api.Test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/26  17:08
 * 分析java连接mysql的5种方式
 */
public class jdbcConn {


    //方式一
    @Test
    public void connect01() throws SQLException {
        Driver driver = new Driver();
        String url = "jdbc:mysql.properties://localhost:3306/frx_db02";
        //将用户名和密码放入到Properties 对象
        Properties properties = new Properties();
        //说明 user 和password 是规定好的，后面的值根据实际情况写
        properties.setProperty("user", "root");// 用户
        properties.setProperty("password", "hsp");//密码
        Connection connect = driver.connect(url, properties);

        System.out.println(connect);
    }

    //方式二
    public void connect02() throws ClassNotFoundException, IllegalAccessException, InstantiationException, SQLException {
        //使用反射加载ClassDriver类,动态加载，更加的灵活，减少依赖性
        Class<?> aClass = Class.forName("com.mysql.jdbc.Driver");
        Driver driver = (Driver) aClass.newInstance();
        String url = "jdbc:mysql.properties://localhost:3306/frx_db02";
        //将用户名和密码放入到Properties 对象
        Properties properties = new Properties();
        //说明 user 和password 是规定好的，后面的值根据实际情况写
        properties.setProperty("user", "root");// 用户
        properties.setProperty("password", "hsp");//密码
        Connection connect = driver.connect(url, properties);
        System.out.println("方式二=" + connect);

    }
    // 方式三 使用DriverManager 替代Diver 进行统一管理

    @Test
    public void connect03() throws ClassNotFoundException, IllegalAccessException, InstantiationException, SQLException {

        //使用反射加载Driver
        Class<?> aClass = Class.forName("com.mysql.jdbc.Driver");
        Driver driver = (Driver) aClass.newInstance();

        //创建url 和 user 和 password
        String url = "jdbc:mysql.properties://localhost:3306/frx_db02";
        String user = "root";
        String password = "hsp";

        DriverManager.registerDriver(driver);//注册driver驱动

        Connection connection = DriverManager.getConnection(url, user, password);
        System.out.println("第三种方式=" + connection);

    }

    // 方式四：使用Class.forName 自动完成注册驱动，简化代码
    //这种方式获取连接，推荐使用
    @Test
    public void connect04() throws ClassNotFoundException, SQLException {
        // 使用反射加载了 Driver类
        //在加载Driver类时，完成注册
    /*
    源码：1.静态代码块，在类加载时，会执行一次
         2.DriverManager.registerDriver(new Driver())
         3.因此注册driver的工作已经完成
      static {
        try {
            DriverManager.registerDriver(new Driver());
        } catch (SQLException var1) {
            throw new RuntimeException("Can't register driver!");
        }
    }
}
     */
        Class.forName("com.mysql.jdbc.Driver");

        //创建url和user和password
        String url = "jdbc:mysql.properties://localhost:3306/frx_db02";
        String user = "root";
        String password = "hsp";
        Connection connection = DriverManager.getConnection(url, user, password);

        System.out.println("第四种方式=" + connection);
    }
      //方式五:在方式4的基础上改进，增加配置文件，让连接mysql更灵活
    @Test
    public void connect05() throws IOException, ClassNotFoundException, SQLException {

        //通过Properties对象获取配置文件的信息
        Properties properties = new Properties();
        properties.load(new FileInputStream("src\\mysql.properties"));
        String user=properties.getProperty("user");
        String password=properties.getProperty("password");
        String driver = properties.getProperty("driver");
        String url = properties.getProperty("url");

        Class<?> aClass = Class.forName("com.mysql.jdbc.Driver");
        Connection connection = DriverManager.getConnection(url, user, password);

        System.out.println("方式五="+connection);


    }

}

```

### 课堂练习

> 1.创建news表
> 2.使用jdbc添加5条数据
> 3.修改id =1的记录，将content改成一个新的消息4.删除id =3的记录

```java
package com.homework;

import org.junit.jupiter.api.Test;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/26  22:37
 */
@SuppressWarnings({"all"})
public class Homework01 {
    @Test
    public void connect05() throws IOException, ClassNotFoundException, SQLException {

        //通过Properties对象获取配置文件的信息
        Properties properties = new Properties();
        properties.load(new FileInputStream("src\\mysql.properties"));
        String user=properties.getProperty("user");
        String password=properties.getProperty("password");
        String driver = properties.getProperty("driver");
        String url = properties.getProperty("url");
        Class<?> aClass = Class.forName("com.mysql.jdbc.Driver");
        Connection connection = DriverManager.getConnection(url, user, password);

        System.out.println("方式五="+connection);

        String sql ="insert into news values(1,'北京新闻'),(2,'上海新闻'),(3,'天津新闻'),(4,'南京新闻'),(5,'河南新闻')";
        String sql2="update  news set content='新闻联播' where id=3";
        String sql3="delete from news where id=3";
        Statement statement = connection.createStatement();
        int rows = statement.executeUpdate(sql3);

        System.out.println(rows>0? "成功":"失败");

        connection.close();
        statement.close();


    }
}

```

## 结果集

### 基本介绍

1. <font color=#DC4040 size=4 face="黑体">表示数据库结果集的数据表，通常通过执行查询数据库的语句生成</font>
2. <font color=#DC4040 size=4 face="黑体">ResultSet对象保持一个光标指向其当前的数据行。最初，光标位于第一行之前</font>
3. <font color=#DC4040 size=4 face="黑体">next方法将光标移动到下一行，并且由于在ResultSet对象中没有更多行时返回false，因此可以在while循环中使用循环来遍历结果集</font>

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/08.png)

### 应用实例

```java
package com.resultset_;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.*;
import java.util.Date;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/26  22:58
 * 演示select
 */
@SuppressWarnings({"all"})
public class ResultSet_ {
    public static void main(String[] args) throws IOException, ClassNotFoundException, SQLException {
        //通过Properties对象获取配置文件的信息
        Properties properties = new Properties();
        properties.load(new FileInputStream("src\\mysql.properties"));
        String user=properties.getProperty("user");
        String password=properties.getProperty("password");
        String driver = properties.getProperty("driver");
        String url = properties.getProperty("url");

        //1.注册驱动
        Class.forName(driver);

        //2.得到连接
        Connection connection = DriverManager.getConnection(url,user,password);

        //3.得到Statement
        Statement statement = connection.createStatement();
        //4.组织sql
        String sql="select id,name,sex,borndate from actor";
        //执行给定的SQL语句，该语句返回单个 ResultSet 对象
        ResultSet resultSet = statement.executeQuery(sql);
        /*
        
         */

        //5.用while取出数据
            /*     +----+-----------+-----+---------------------+
                | id | name      | sex | borndate            |
                +----+-----------+-----+---------------------+-
                |  2 | jack      | 男  | 1990-11-11 00:00:00 |
                |  3 | 刘德华    | 男  | 1990-11-11 00:00:00  |
                +----+-----------+-----+---------------------+-

*/
        while (resultSet.next()){//让光标向后移动，如果没有更多行，则返回false
            int id= resultSet.getInt(1);
            String name=resultSet.getString(2);
            String sex=resultSet.getString(3);
            Date date=resultSet.getDate(4);
            System.out.println(id+"\t"+name+"\t"+sex+"\t"+date);

        }
        //6.关闭连接
        resultSet.close();
        statement.close();
        connection.close();

    }
}

```

## Statement

### 基本介绍

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/09.png)

```sql
-- 演示sql注入
-- 创建一张表
CREATE TABLE admin(
	NAME VARCHAR(32) NOT NULL UNIQUE,
	pwd VARCHAR(32) NOT NULL DEFAULT '') CHARACTER SET utf8;
	
-- 添加数据
INSERT INTO admin VALUES('tom','123');

-- 查找某个管理是否存在
SELECT * FROM admin
	WHERE NAME='tom'AND pwd='123'
	
-- SQL
-- 输入用户名 为 1' or
-- 输入密码 or '1'='1
SELECT * 
	FROM admin
	WHERE NAME= '1'OR'AND pwd=' OR '1'='1'
			
```

### 应用案例

```java
package com.statement;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;
import java.util.Scanner;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/27  0:32
 * 演示statement的注入问题
 */
@SuppressWarnings({"all"})
public class Statement_ {
    public static void main(String[] args) throws IOException, ClassNotFoundException, SQLException {

        Scanner scanner = new Scanner(System.in);

        //让用户输入管理员名和密码
        System.out.print("请输入管理员的名字");
        String admin_name=scanner.nextLine();
        System.out.print("请输入管理员的密码");
        String admin_pwd=scanner.nextLine();

        //通过Properties对象获取配置文件的信息
        Properties properties = new Properties();
        properties.load(new FileInputStream("src\\mysql.properties"));
        String user = properties.getProperty("user");
        String password = properties.getProperty("password");
        String driver = properties.getProperty("driver");
        String url = properties.getProperty("url");

        //1.注册驱动
        Class.forName(driver);

        //2.得到连接
        Connection connection = DriverManager.getConnection(url, user, password);

        //3.得到Statement
        Statement statement = connection.createStatement();
        //4.组织sql
        String sql = "select name,pwd from admin where name='"+
                admin_name+"'and pwd='"+admin_pwd+"'";

        ResultSet resultSet = statement.executeQuery(sql);
        if(resultSet.next()){//如果查询到一条记录，则说明该管理存在
            System.out.println("恭喜，登陆成功~");

        }else {
            System.out.println("对不起，登陆失败~");
        }
    }
}
```

## PreparedStatement

### 基本介绍

![10](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/10.png)

### 预处理好处

1. **不再使用+拼接sql语句，减少语法错误**
2. **有效的解决了sql注入问题!**
3. **大大减少了编译次数，效率较高**

### 应用案列

```java
package com.preparestatement_;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.*;
import java.util.Properties;
import java.util.Scanner;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/27  10:12
 */
@SuppressWarnings({"all"})
public class PrepareStatement_ {
    public static void main(String[] args) throws IOException, SQLException, ClassNotFoundException {

        Scanner scanner = new Scanner(System.in);

        //让用户输入管理员名和密码
        System.out.print("请输入管理员的名字");
        String admin_name=scanner.nextLine();
//        System.out.print("请输入管理员的密码");
//        String admin_pwd=scanner.nextLine();

        //通过Properties对象获取配置文件的信息
        Properties properties = new Properties();
        properties.load(new FileInputStream("src\\mysql.properties"));
        String user = properties.getProperty("user");
        String password = properties.getProperty("password");
        String driver = properties.getProperty("driver");
        String url = properties.getProperty("url");

        //1.注册驱动
        Class.forName(driver);

        //2.得到连接
        Connection connection = DriverManager.getConnection(url, user, password);
        //3.得到PrepareStatement
        //3.1 组织sql sql语句中的? 相当于占位符

        // 添加记录
        //String sql="insert into admin values(?,?)";
        //String sql="update  admin set pwd=? where name=?";
        String sql="delete from admin where name=?";
        //3.2 preparedStatement 对象实现了 PreparedStatement接口的实现类的对象

        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        //3.3 给 ? 赋值
       // preparedStatement.setString(1,admin_pwd);
        preparedStatement.setString(1,admin_name);
        //4.执行 select语句使用executeQuery
        // 如果执行dml(update,insert,delete)  executeUpdate()
        //  这里执行executeQuery ,不要在写 sql
        int rows = preparedStatement.executeUpdate();
        System.out.println(rows> 0? "执行成功":"执行失败");


        //关闭连接
        preparedStatement.close();
        connection.close();



    }
}

```

## JDBC的相关API小结

![11](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/11.png)![11](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/12.png)

## 封装JDBCUtils

### 说明

**在jdbc 操作中，获取连接和释放资源是经常使用到,可以将其封装JDBC连接的工真类JDBCUtils**

### 实际使用工具类JDBCUtils

```java
package com.utils;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.Collection;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/27  14:48
 * 这是一个工具类,完成mysql的连接和关闭资源
 */
@SuppressWarnings({"all"})
public class JDBCUtils {

    //定义相关的属性(4个),因为只需要一份，我们做出static
    private static String user;//用户名
    private static String password;//密码
    private static String url;//url
    private static String driver;//驱动名

    //在static代码块初始化
    static {
        try {
            Properties properties = new Properties();
            properties.load(new FileInputStream("src\\mysql.properties"));
            //读取相关的属性值
            user = properties.getProperty("user");
            password = properties.getProperty("password");
            url = properties.getProperty("url");
            driver = properties.getProperty("driver");


        } catch (IOException e) {
            //在实际开发中，我们可以这样处理
            // 1.将编译异常转成运行异常
            // 2.这是调用者，可以选择捕获该异常,也可以选择默认处理该异常，比较方便
            throw new RuntimeException(e);
        }
    }

    //连接数据库 返回Connection
    public static Connection getConnection(){

        try {
            return DriverManager.getConnection(url,user,password);
        } catch (SQLException e) {
            //1.将编译异常转成运行异常
            //2.调用者，可以选择捕获该异常，也可以选择默认处理该异常,比较方便
            throw new RuntimeException(e);
        }

    }

    //关闭相关资源
    /*
        1.ResultSet 结果集
        2.Statement 或者 PreparedStatement
        3.Connection
        4.如果需要关闭资源，就传入对象，否则传入 null
     */
    public static void close(ResultSet set, Statement statement,Connection connection){

        //判断是否为null
        try {
            if(set!=null){
                set.close();
            }
            if(statement!=null){
                statement.close();
            }
            if(connection!=null){
                connection.close();
            }
        } catch (SQLException e) {
            //将编译异常转成运行异常抛出
            throw  new RuntimeException(e);
        }

    }


}

```

```java
package com.utils;

import org.junit.jupiter.api.Test;

import java.sql.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/27  15:16
 * 该类演示如何使用JDBCUtils工具类，完成dml和select
 */
public class JDBCUtils_Use {

    public static void main(String[] args) {

        //测试

    }
    @Test
    public  void testSelect(){
        //1.得到连接
        Connection connection = null;

        //2.组织一个sql
        String sql="select * from actor";
        PreparedStatement preparedStatement=null;
        ResultSet set=null;
        try {
            connection=JDBCUtils.getConnection();
            //3.创建PrepareStatement
            preparedStatement = connection.prepareStatement(sql);
            //执行 得到结果集
            set=preparedStatement.executeQuery();
            while (set.next()){
                int id = set.getInt("id");
                String name = set.getString("name");
                String sex = set.getString("sex");
                Date borndate = set.getDate("borndate");
                String phone = set.getString("phone");
                System.out.println(id+"\t"+name+"\t"+sex+"\t"+borndate+"\t"+phone);

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            //关闭资源
            JDBCUtils.close(set, preparedStatement,connection );

        }


    }


@Test
    public  void testDML() throws SQLException {//insert,update,delete

        //1.得到连接
        Connection connection = null;

        //2.组织一个sql
        String sql="update actor set name=? where id =?";
        PreparedStatement preparedStatement=null;
        try {
            connection=JDBCUtils.getConnection();
            //3.创建PrepareStatement
            preparedStatement = connection.prepareStatement(sql);
            //给占位符赋值
            preparedStatement.setString(1,"周星驰");
            preparedStatement.setInt(2,1);
            //执行
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            //关闭资源
            JDBCUtils.close(null, preparedStatement,connection );

        }


    }
}

```

## 事务

### 基本介绍

1. <font color=#DC4040 size=4 face="黑体">JDBC程序中当一个Connection对象创建时，默认情况下是自动提交事务:每次执行一个SQL语句时，如果执行成功，就会向数据库自动提交，而不能回滚。</font>
2. <font color=#DC4040 size=4 face="黑体">JDBC程序中为了让多个SQL语句作为一个整体执行,需要使用事务</font>
3. <font color=#DC4040 size=4 face="黑体">调用Connection的setAutoCommit(false)可以取消自动提交事务</font>
4. <font color=#DC4040 size=4 face="黑体">在所有的SQL语句都成功执行后，调用Connection 的commit(;方法提交事务</font>
5. <font color=#DC4040 size=4 face="黑体">在其中某个操作失败或出现异常时，调用 Connection的rollback();方法回滚事务</font>

### 应用案列

```sql

CREATE TABLE ACCOUNT(
	id INT PRIMARY KEY AUTO_INCREMENT,
	NAME VARCHAR(32) NOT NULL DEFAULT '',
	balance DOUBLE NOT NULL DEFAULT 0)CHARACTER SET utf8;
SELECT * FROM ACCOUNT	
INSERT INTO ACCOUNT VALUES(NULL,'马云',3000);
INSERT INTO ACCOUNT VALUES(NULL,'马化腾',10000);
```

```java
package com.transaction_;

import com.utils.JDBCUtils;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/27  17:25
 * 演示jdbc 中如何使用事务
 */
public class Transaction_ {
    @Test  //没有使用事务
    public void noTransaction(){
      
        //1.得到连接
        Connection connection = null;

        //2.组织一个sql
        String sql = "update account set balance=balance-100 where id =1";
        String sql2 = "update account set balance=balance+100 where id =2";
        PreparedStatement preparedStatement = null;
        try {
            connection = JDBCUtils.getConnection();//在默认情况下，connection对象默认是自动提交
            //3.创建PrepareStatement
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.executeUpdate();

            //int i=1/0;
            preparedStatement = connection.prepareStatement(sql2);
            preparedStatement.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            //关闭资源
            JDBCUtils.close(null, preparedStatement, connection);

        }
    }

    //事务来解决
    @Test
    public void useTransaction(){
        //1.得到连接
        Connection connection = null;

        //2.组织一个sql
        String sql = "update account set balance=balance-100 where id =1";
        String sql2 = "update account set balance=balance+100 where id =2";
        PreparedStatement preparedStatement = null;
        try {
            connection = JDBCUtils.getConnection();//在默认情况下，connection对象默认是自动提交
            //将connection设置为不自动提交
            connection.setAutoCommit(false);//开启了事务
            preparedStatement = connection.prepareStatement(sql);
            preparedStatement.executeUpdate();

            //int i=1/0;
            preparedStatement = connection.prepareStatement(sql2);
            preparedStatement.executeUpdate();

            //这里提交事务
            connection.commit();
        } catch (SQLException e) {
            //这里我们可以进行回滚，即撤销执行的sql
            System.out.println("执行发生了异常，撤销执行的sql");
            try {
                connection.rollback();
            } catch (SQLException throwables) {
                throwables.printStackTrace();
            }
            e.printStackTrace();
        } finally {
            //关闭资源
            JDBCUtils.close(null, preparedStatement, connection);

        }
    }
}

```

## 批处理

### 基本介绍

![13](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/13.png)

### 应用实例

```sql
CREATE TABLE admin2(
	id INT PRIMARY KEY AUTO_INCREMENT,
	username VARCHAR(32) NOT NULL,
	`password` VARCHAR(32) NOT NULL)
```

> 演示向admin2表中添加5000条数据,看着使用批处理耗时多久
>
> 注意:需要修改配置文件 jdbc.properties   url=jdbc:mysql://localhost:3306/数据库？rewriteBatchedStatements=true

```java
package com.batch_;

import com.utils.JDBCUtils;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/27  18:55
 */
@SuppressWarnings({"all"})
public class Batch_ {

    //传统方法
@Test
    public void noBatch() throws Exception {
        Connection connection = JDBCUtils.getConnection();
        String sql = "insert into admin2 values (null,?,?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        System.out.println("开始执行");
        long start =System.currentTimeMillis();//开始时间
        for (int i = 0; i < 1000; i++) {
            preparedStatement.setString(1, "jack" + i);
            preparedStatement.setString(2, "666");
            preparedStatement.executeUpdate();

        }
        long end = System.currentTimeMillis();

        System.out.println("传统的方式耗时"+(end-start));
        //关闭连接
        JDBCUtils.close(null, preparedStatement, connection);
    }

    //使用批量方式添加数据
    @Test
    public void batch() throws Exception{
        Connection connection = JDBCUtils.getConnection();
        String sql = "insert into admin2 values (null,?,?)";
        PreparedStatement preparedStatement = connection.prepareStatement(sql);
        System.out.println("开始执行");
        long start =System.currentTimeMillis();//开始时间
        for (int i = 0; i < 1000; i++) {
            preparedStatement.setString(1, "jack" + i);
            preparedStatement.setString(2, "666");
            //将sql 语句加入到批处理包中 ->看源码
            /*
            //1.//第一次就 创建ArrayList - elementData =>Object[]
            //2.elementData=> Object[] 就会存放我们预处理的sql语句
            //3.当elementData满后，就按照1.5倍扩容
            //4.当添加到指定的值后，就executeBatch
            //5.批量处理会减少我们发送sql语句的网络开销,而且减少编译次数,因此效率极高
            public void addBatch() throws SQLException {
                synchronized(this.checkClosed().getConnectionMutex()) {
                    if (this.batchedArgs == null) {
                        this.batchedArgs = new ArrayList();
                    }

            for(int i = 0; i < this.parameterValues.length; ++i) {
                this.checkAllParametersSet(this.parameterValues[i], this.parameterStreams[i], i);
            }

            this.batchedArgs.add(new PreparedStatement.BatchParams(this.parameterValues, this.parameterStreams, this.isStream, this.streamLengths, this.isNull));
        }
    }
             */
            preparedStatement.addBatch();
            //当有200条语句时，在批量执行
            if((i+1)%200==0){//200 条 批量执行
                preparedStatement.executeBatch();
                //清空一把
                preparedStatement.clearBatch();

            }

        }
        long end = System.currentTimeMillis();

        System.out.println("传统的方式耗时"+(end-start));
        //关闭连接
        JDBCUtils.close(null, preparedStatement, connection);
    }
    }




```

## 数据库连接池

### 5k 次连接数据库问题

```java
package com.datasource;

import com.utils.JDBCUtils;
import org.junit.jupiter.api.Test;

import java.sql.Connection;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/27  22:44
 */
public class ConQuestion {

    //代码 连接mysql  5000次
    @Test
    public void testCon(){

        //看看连接关闭 connection 会耗时多久
        long start = System.currentTimeMillis();
        for (int i = 0; i < 5000; i++) {
            //使用传统的jdbc方式，得到连接
            Connection connection = JDBCUtils.getConnection();
            //做一些工作，比如得到PreparedStatement，发送sql
            //关闭
            JDBCUtils.close(null,null,connection);

        }
        long end=System.currentTimeMillis();
        System.out.println("传统方式5000次 耗时="+(end-start));
    }
}

```

### 传统方法Connection问题分析

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/14.png)

### 数据库连接池种类

![15](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/15.png)

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/16.png)

### C3P0应用实例

```java
package com.datasource;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.junit.jupiter.api.Test;

import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/27  23:42
 */
public class C3P0_ {

    //方式一：相关参数，在程序中指定user,url,password等

    @Test
    public void testC3P0_01() throws Exception{

        //1.创建一个数据源对象
        ComboPooledDataSource comboPooledDataSource = new ComboPooledDataSource();
        //2.通过配置文件mysql.properties获取相关的信息
        Properties properties = new Properties();
        properties.load(new FileInputStream("src\\mysql.properties"));
        //读取相关的属性值
        String user = properties.getProperty("user");
        String password = properties.getProperty("password");
        String url = properties.getProperty("url");
        String driver = properties.getProperty("driver");

        //给数据源 comboPooledDataSource 配置相关的参数
        //注意:连接管理是由 comboPooledDataSource 来管理
        comboPooledDataSource.setDriverClass(driver);
        comboPooledDataSource.setJdbcUrl(url);
        comboPooledDataSource.setUser(user);
        comboPooledDataSource.setPassword(password);

        //设置初始化连接数
        comboPooledDataSource.setInitialPoolSize(10);
        //最大连接数
        comboPooledDataSource.setMaxPoolSize(50);
        //测试连接池的效率，测试对mysql 5000次操作
        long start = System.currentTimeMillis();
        for (int i = 0; i < 5000; i++) {
            Connection connection = comboPooledDataSource.getConnection();//这个方式就是从 DataSource 接口实现
            //System.out.println("连接成功~");
            connection.close();
        }
        long end=System.currentTimeMillis();
        System.out.println("csp0 5000连接mysql 耗时="+(end-start));

    }

    //第2种方式 使用配置文件模板来完成

    //1.将c3p0提供的 c3p0.config.xml 拷贝到src目录下
    //2.该文件制定了连接数据库和连接池的相关参数
    @Test
    public void testC3P0_02() throws SQLException {
        ComboPooledDataSource comboPooledDataSource = new ComboPooledDataSource("frx");

        //测试5000次
        long start = System.currentTimeMillis();
        System.out.println("开始执行....");
        for (int i = 0; i <5000 ; i++) {

            Connection connection = comboPooledDataSource.getConnection();
            //System.out.println("连接OK");
            connection.close();
        }
        long end = System.currentTimeMillis();
        System.out.println("c3p0的第二种方式 耗时="+(end-start));


    }
}

```

### Druid(德鲁伊)应用实例

```java
package com.datasource;

import com.alibaba.druid.pool.DruidDataSourceFactory;
import org.junit.jupiter.api.Test;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/28  0:54
 */
public class Druid_ {

    @Test
    public void testDruid() throws Exception {
        //1.加入Druid jar包
        //2.加入配置文件 druid.properties,将该文件拷贝项目的src项目
        //3.创建Properties对象，读取配置文件
        Properties properties = new Properties();
        properties.load(new FileInputStream("src\\druid.properties"));

        //4.创建一个指定参数的数据库连接池
        DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);

        long start = System.currentTimeMillis();
        for (int i = 0; i < 5000; i++) {

            Connection connection = dataSource.getConnection();
            //System.out.println("连接成功");
            connection.close();
        }
        long end = System.currentTimeMillis();
        System.out.println("Druid连接池操作5000次 耗时="+(end-start));
    }
}

```

### 将 JDBCUtils 工具类改成 Druid(德鲁伊)实现

通过德鲁伊连接池获取连接对象

```java
package com.datasource;


import com.utils.JDBCUtils;
import org.junit.jupiter.api.Test;

import java.sql.*;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/28  12:39
 */
public class JDBCUtilsByDruid_USE {


    @Test
    public void testSelect() {
        //1.得到连接
        Connection connection = null;

        //2.组织一个sql
        String sql = "select * from actor";
        PreparedStatement preparedStatement = null;
        ResultSet set = null;
        try {
            connection = JDBCUtilsByDruid.getConnection();
            System.out.println(connection.getClass());//运行类型 lass com.alibaba.druid.pool.DruidPooledConnection
            //3.创建PrepareStatement
            preparedStatement = connection.prepareStatement(sql);
            //执行 得到结果集
            set = preparedStatement.executeQuery();
            while (set.next()) {
                int id = set.getInt("id");
                String name = set.getString("name");
                String sex = set.getString("sex");
                Date borndate = set.getDate("borndate");
                String phone = set.getString("phone");
                System.out.println(id + "\t" + name + "\t" + sex + "\t" + borndate + "\t" + phone);

            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            //关闭资源
            JDBCUtilsByDruid.close(set, preparedStatement, connection);

        }


    }
}


```

## Apache-DBUtils

### 先分析一个问题

1. 关闭connection后，resultSet结果集无法使用
2. resultSet 不利于数据的管理

![17](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/17.png)

### 用学过的知识解决

```java

    @Test
    public void testSelectToArrayList() {
        System.out.println("使用 druid 解决");
        //1.得到连接
        Connection connection = null;

        //2.组织一个sql
        String sql = "select * from actor where id >=?";
        PreparedStatement preparedStatement = null;
        ResultSet set = null;
        ArrayList<Actor> list = new ArrayList<>();//创建ArrayList对象，存放actor对象
        try {
            connection = JDBCUtilsByDruid.getConnection();
            System.out.println(connection.getClass());//运行类型 lass com.alibaba.druid.pool.DruidPooledConnection
            //3.创建PrepareStatement
            preparedStatement = connection.prepareStatement(sql);
            //执行 得到结果集
            preparedStatement.setInt(1,2);//给?赋值
            set = preparedStatement.executeQuery();
            while (set.next()) {
                int id = set.getInt("id");
                String name = set.getString("name");
                String sex = set.getString("sex");
                Date borndate = set.getDate("borndate");
                String phone = set.getString("phone");
                //把得到的resultset 的记录,封装到 Actor对象 放入到list集合
                list.add(new Actor(id,name,sex,borndate,phone));

            }

            System.out.println("list集合数据="+list);

            for (Actor actor :list) {

                System.out.println("id="+actor.getId()+" name="+actor.getName());

            }

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            //关闭资源
            JDBCUtilsByDruid.close(set, preparedStatement, connection);

        }




    }


}


```

### 基本介绍

1. <font color=#DC4040 size=4 face="黑体">commons-dbutils 是 Apache组织提供的一个开源JDBCT具类库，它是对JDBC的封装,使用dbutils能极大简化jdbc编码的工作量。</font>
+ DbUtils类
   1. <font color=#DC4040 size=4 face="黑体">QueryRunner类:该类封装了SQL的执行，是线程安全的。可以实现增、删、改、查、批处理</font>
   2. <font color=#DC4040 size=4 face="黑体">使用QueryRunner类实现查询</font>
   3. <font color=#DC4040 size=4 face="黑体">ResultSetHandler接口:该接口用于处理java.sql.ResultSet,将数据按要求转换为另一种形式,</font>
+ **ArrayHandler:把结果集中的第一行数据转成对象数组。**
+ **ArrayListHandler:把结果集中的每一行数据都转成一个数组，再存放到List中。**
+ **BeanHandler:将结果集中的第一行数据封装到一个对应的JavaBean实例中。**
+ **BeanListHandler: 将结果集中的每一行数据都封装到一个对应的JavaBean实例中，存放到List里。**
+ **ColumnListHandler:将结果集中某一列的数据存放到List中。**
+ **KeyedHandler(name):将结果集中的每行数据都封装到Map里，再把这些map再存到一个map里，其key为指定的key.**
+ **MapHandler:将结果集中的第一行数据封装到一个Map里，key是列名，value就是对应的值.**
+ **MapListHandler:将结果集中的每一行数据都封装到一个Map里，然后再存放到List**

### 应用案列


```java
package com.datasource;


import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.junit.jupiter.api.Test;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/28  12:39
 */
@SuppressWarnings({"all"})
public class DBUtils_USE {

    //使用 apache-DBUtils 工具类 + druid 完成对表的crud操作

    @Test
    public void testQueryMany() throws SQLException {//返回结果是多行的情况

        //1.得到 连接 (druid)
        Connection connection = JDBCUtilsByDruid.getConnection();
        //2. 使用DUBUtils 类和接口，先引入DBUTils 相关的 jar,加入本Project
        //3.创建  QueryRunner
        QueryRunner queryRunner = new QueryRunner();
        //4.就可以执行相关的方法，返回ArrayList结果集
        //String sql="select * from actor where id >=?";
        String sql="select * from actor where id>=?";

        //(1) query 方法就是执行sql语句，得到result --封装到 -->ArrayList 集合中
        //(2) 返回集合
        //(3) connection :连接
        //(4)sql:执行的sql语句
        //(5)new BeanListHandler<>(Actor.class): 在将resultset->Actor对象 ->封装到ArrayList
        //   底层使用反射机制 去获取Actor类
        //(6) 1 就是给 sql语句中的 ? 赋值，可以有多个值，可变参数
        //(7)底层得到的resultset,会在query 关闭，关闭PreparedStatment
        /**
         * public <T> T query(Connection conn, String sql, ResultSetHandler<T> rsh, Object... params) throws SQLException {
         *         PreparedStatement stmt = null;//定义PreparedStatement
         *         ResultSet rs = null;//接受返回的结果集
         *         Object result = null;//返回ArrayList
         *
         *         try {
         *             stmt = this.prepareStatement(conn, sql);//创建PreparedStatement
         *             this.fillStatement(stmt, params);// 对sql 进行 ? 赋值
         *             rs = this.wrap(stmt.executeQuery());// 执行sql，返回resultset
         *             result = rsh.handle(rs);//返回的resultset--> ArrayList[result] [使用反射，对传入的class对象处理]
         *         } catch (SQLException var33) {
         *             this.rethrow(var33, sql, params);
         *         } finally {
         *             try {
         *                 this.close(rs);//关闭resultset
         *             } finally {
         *                 this.close((Statement)stmt);//关闭preparedStatment
         *             }
         *         }
         *
         *         return result;
         *     }
         */
        List<Actor> list =
                queryRunner.query(connection, sql, new BeanListHandler<>(Actor.class), 1);
        System.out.println("输出集合的信息");
        for (Actor actor:list){
            System.out.println(actor);

        }
        //释放资源
        JDBCUtilsByDruid.close(null,null,connection);



    }

    //演示 apache-dbutils + druid 完成 返回的结果是单行记录

    @Test
    public void testQuerySingle() throws SQLException {

        //1.得到 连接 (druid)
        Connection connection = JDBCUtilsByDruid.getConnection();
        //2. 使用DUBUtils 类和接口，先引入DBUTils 相关的 jar,加入本Project
        //3.创建  QueryRunner
        QueryRunner queryRunner = new QueryRunner();
        //4.就可以执行相关的方法，返回单个对象
        String sql="select * from actor where id=?";

        //因为我们返回的是单行记录<--->单个对象，使用的Hander   是 BeanHander
        Actor actor = queryRunner.query(connection, sql, new BeanHandler<>(Actor.class), 1);

        System.out.println(actor);


        //释放资源
        JDBCUtilsByDruid.close(null,null,connection);


    }

    //演示aqache-dbutils + druid 完成查询结果是单行单列-返回的就是object

    @Test
    public void testScalar() throws SQLException {
        //1.得到 连接 (druid)
        Connection connection = JDBCUtilsByDruid.getConnection();
        //2. 使用DUBUtils 类和接口，先引入DBUTils 相关的 jar,加入本Project
        //3.创建  QueryRunner
        QueryRunner queryRunner = new QueryRunner();
        //4.就可以执行相关的方法，返回单行单列
        String sql="select name from actor where id=?";

        //解读：因为返回的是一个对象，使用的Hander 就是 Beanhandler
        Object obj = queryRunner.query(connection, sql, new ScalarHandler(), 1);
        System.out.println(obj);


        //释放资源
        JDBCUtilsByDruid.close(null,null,connection);
    }

    @Test
    //演示apache-dbutils + druid 完成 dml(update,insert,delete)
    public void testDML() throws SQLException{

        //1.得到 连接 (druid)
        Connection connection = JDBCUtilsByDruid.getConnection();
        //2. 使用DUBUtils 类和接口，先引入DBUTils 相关的 jar,加入本Project
        //3.创建  QueryRunner
        QueryRunner queryRunner = new QueryRunner();


        //.这里组织sql 完成 update,insert delete
        //String sql="update actor set name=? where id= ?";
//        String sql ="insert  into actor values(null,?,?,?,?)";
        String sql="delete from actor where id = ?";
        //(1)执行dml操作是 queryRunner.update()
        //(2)返回值是受影响的行数 affected受影响的
//        int affectedRow = queryRunner.update(connection, sql, "张三丰", 1);
       // int affectedRow = queryRunner.update(connection, sql, "林青霞", "女","1966-10-10", "116");
        int affectedRow = queryRunner.update(connection, sql, 3);
        System.out.println(affectedRow>0? "执行成功":"执行没有影响到表");


    }



}


```

### 表和JavaBean的类型映射关系

![18](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/18.png)

## DAO和增删改查通用方法-BasicDAO

### 先分析一个问题

**apache-dbutils+ Druid 简化了JDBC开发，但还有不足:**

1. **SQL语句是固定，不能通过参数传入，通用性不好，需要进行改进，更方便执行增删改查**
2. **对于select 操作，如果有返回值,返回类型不能固定，需要使用泛型**
3. **将来的表很多，业务需求复杂,不可能只靠一个Java类完成**
4. 引出=》 BasicDAO画出示意图，看看在实际开发中，应该如何处理

![19](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/19.png)

![20](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/20.png)

### 基本说明

1. DAO: data access object数据访问对象
2. 这样的通用类，称为 BasicDao，是专门和数据库交互的，即完成对数据库(表)的crud操作。
3. 在BaiscDao的基础上，实现一张表对应一个Dao，更好的完成功能，比如 Customer表-Customer.java类(javabean)-CustomerDao.java

### BasicDAO应用案列

```java
package com.dao_.domain;

import java.util.Date;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/28  16:15
 * Actor 对象和 actor 表的记录对应
 */
public class Actor { //Javaben,POJO,Domain对象

    private Integer id;
    private String name;
    private String sex;
    private Date borndate;
    private String phone;

    public Actor(){//一定要给一个无参构造器[反射需要]


    }

    public Actor(Integer id, String name, String sex, Date borndate, String phone) {
        this.id = id;
        this.name = name;
        this.sex = sex;
        this.borndate = borndate;
        this.phone = phone;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getBorndate() {
        return borndate;
    }

    public void setBorndate(Date borndate) {
        this.borndate = borndate;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Override
    public String toString() {
        return "\nActor{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                ", borndate=" + borndate +
                ", phone='" + phone + '\'' +
                '}';
    }
}

```

```java
package com.dao_.utils;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/28  11:47
 * 基于druid数据库连接池的工具类
 */
public class JDBCUtilsByDruid {

    //在静态代码块 ds初始化
    private static DataSource ds;
    static {
        Properties properties = new Properties();
        try {
            properties.load(new FileInputStream("src\\druid.properties"));
            ds= DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //编写 getConnection方法
    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }

    //关闭连接 强调：在数据库连接池技术中，
    // 而是把使用的连接对象connection对象 放回连接池

    public static  void close(ResultSet resultSet, Statement statement,Connection connection){

        try {
            if(resultSet!=null){
                resultSet.close();
            }
            if(statement!=null){
                statement.close();
            }
            if(connection!=null){
                connection.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}

```

```java
package com.dao_.dao;

import com.dao_.utils.JDBCUtilsByDruid;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Collection;
import java.util.List;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/29  20:10
 */
public class BasicDAO<T>{//反省制定具体的类型


  private   QueryRunner qr= new QueryRunner();

  //开发通用的dml方法,针对任意的表
    public int update(String sql,Object...parameters){

        Connection connection=null;
        try {
             connection = JDBCUtilsByDruid.getConnection();

            int update = qr.update(connection, sql, parameters);
            return update;
        } catch (SQLException e) {
            throw new RuntimeException(e);//将一个编译异常转成一个运行异常抛出
        }finally {
            JDBCUtilsByDruid.close(null,null,connection);

        }

    }


    //返回多个对象(即查询的结果是多行的)，针对任意表

    /**
     *
     * @param sql         sal语句，可以有 ?
     * @param clazz       传入一个类的Class对象 比如 Actor.class
     * @param parameters  传入?的具体的值
     * @return            根据Actor.class 返回对应的 ArrayList集合
     */
    public List<T> queryMulti(String sql,Class<T> clazz,Object...parameters){


        Connection connection=null;
        try {
            connection = JDBCUtilsByDruid.getConnection();

            return qr.query(connection, sql, new BeanListHandler<>(clazz), parameters);

        } catch (SQLException e) {
            throw new RuntimeException(e);//将一个编译异常转成一个运行异常抛出
        }finally {
            JDBCUtilsByDruid.close(null,null,connection);

        }


    }

    //查询单行结果的通用方法
    public T querySingle(String sql,Class<T> clazz,Object...parameters){

        Connection connection=null;
        try {
            connection = JDBCUtilsByDruid.getConnection();

        return   qr.query(connection,sql,new BeanHandler<>(clazz),parameters);

        } catch (SQLException e) {
            throw new RuntimeException(e);//将一个编译异常转成一个运行异常抛出
        }finally {
            JDBCUtilsByDruid.close(null,null,connection);

        }
    }


    //返回单行当列的方法，即返回单值的方法

    public Object queryScalar(String sql,Object...parameters){


        Connection connection=null;
        try {
            connection = JDBCUtilsByDruid.getConnection();

            return  qr.query(connection,sql,new ScalarHandler(),parameters);

        } catch (SQLException e) {
            throw new RuntimeException(e);//将一个编译异常转成一个运行异常抛出
        }finally {
            JDBCUtilsByDruid.close(null,null,connection);

        }
    }

    }


```

```java
package com.dao_.dao;

import com.dao_.domain.Actor;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/29  20:34
 */
public class ActorDAO extends BasicDAO<Actor> {

    //1.就有 BasicDAO 的方法
    //2.根据业务需求，可以编写特有的方法

}

```

```java
package com.dao_.test;

import com.dao_.dao.ActorDAO;
import com.dao_.domain.Actor;
import org.junit.jupiter.api.Test;

import java.util.List;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/29  20:35
 */
public class TestDAO {

    //测试ActorDAO 对actor 表crud操作
    @Test
    public void testActorDAO(){

        ActorDAO actorDAO=new ActorDAO();
        //1.查询
        List<Actor> actors = actorDAO.queryMulti("select * from actor where id>=?", Actor.class, 1);
        System.out.println("==查询结果==");
        for (Actor actor :actors) {
            System.out.println(actor);
            
        }
        //2.查询单行记录
        Actor actor = actorDAO.querySingle("select * from actor where id=?", Actor.class, 2);
        System.out.println("===========查询单行结果==========");
        System.out.println(actor);


        //3.查询单行单列操作
        Object o = actorDAO.queryScalar("select name from actor where id=?", 4);
        System.out.println("========查询单行单列值========");
        System.out.println(o);


        //4.dml操作 insert,update,delete
        int update = actorDAO.update("insert into actor values(null,?,?,?,?)", "张无忌", "男", "2000-11-21", "111");

        System.out.println(update>0?"执行成功":"执行没有影响表");



    }
}

```

### 课后练习

开发GoodsDao和Goods(商品号，名称，价格),完成对goods表的crud

```sql

CREATE TABLE goods0(
	id INT PRIMARY KEY AUTO_INCREMENT,
	goods_name VARCHAR(32) NOT NULL,
	price DOUBLE)
```

因为是空表，先联系添加语句

```java
package com.homework.goods_;

import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/28  11:47
 * 基于druid数据库连接池的工具类
 */
public class JDBCUtilsByDruid {

    //在静态代码块 ds初始化
    private static DataSource ds;
    static {
        Properties properties = new Properties();
        try {
            properties.load(new FileInputStream("src\\druid.properties"));
            ds= DruidDataSourceFactory.createDataSource(properties);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //编写 getConnection方法
    public static Connection getConnection() throws SQLException {
        return ds.getConnection();
    }

    //关闭连接 强调：在数据库连接池技术中，
    // 而是把使用的连接对象connection对象 放回连接池

    public static  void close(ResultSet resultSet, Statement statement,Connection connection){

        try {
            if(resultSet!=null){
                resultSet.close();
            }
            if(statement!=null){
                statement.close();
            }
            if(connection!=null){
                connection.close();
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

}

```

```java
package com.homework.goods_;

import com.dao_.utils.JDBCUtilsByDruid;
import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/29  20:10
 */
public class BasicDAO<T>{//反省制定具体的类型


  private   QueryRunner qr= new QueryRunner();

  //开发通用的dml方法,针对任意的表
    public int update(String sql,Object...parameters){

        Connection connection=null;
        try {
             connection = JDBCUtilsByDruid.getConnection();

            int update = qr.update(connection, sql, parameters);
            return update;
        } catch (SQLException e) {
            throw new RuntimeException(e);//将一个编译异常转成一个运行异常抛出
        }finally {
            JDBCUtilsByDruid.close(null,null,connection);

        }

    }


    //返回多个对象(即查询的结果是多行的)，针对任意表

    /**
     *
     * @param sql         sal语句，可以有 ?
     * @param clazz       传入一个类的Class对象 比如 Actor.class
     * @param parameters  传入?的具体的值
     * @return            根据Actor.class 返回对应的 ArrayList集合
     */
    public List<T> queryMulti(String sql,Class<T> clazz,Object...parameters){


        Connection connection=null;
        try {
            connection = JDBCUtilsByDruid.getConnection();

            return qr.query(connection, sql, new BeanListHandler<>(clazz), parameters);

        } catch (SQLException e) {
            throw new RuntimeException(e);//将一个编译异常转成一个运行异常抛出
        }finally {
            JDBCUtilsByDruid.close(null,null,connection);

        }


    }

    //查询单行结果的通用方法
    public T querySingle(String sql,Class<T> clazz,Object...parameters){

        Connection connection=null;
        try {
            connection = JDBCUtilsByDruid.getConnection();

        return   qr.query(connection,sql,new BeanHandler<>(clazz),parameters);

        } catch (SQLException e) {
            throw new RuntimeException(e);//将一个编译异常转成一个运行异常抛出
        }finally {
            JDBCUtilsByDruid.close(null,null,connection);

        }
    }


    //返回单行当列的方法，即返回单值的方法

    public Object queryScalar(String sql,Object...parameters){


        Connection connection=null;
        try {
            connection = JDBCUtilsByDruid.getConnection();

            return  qr.query(connection,sql,new ScalarHandler(),parameters);

        } catch (SQLException e) {
            throw new RuntimeException(e);//将一个编译异常转成一个运行异常抛出
        }finally {
            JDBCUtilsByDruid.close(null,null,connection);

        }
    }

    }


```

```java
package com.homework.goods_;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/29  21:21
 */
public class Goods0 {
    private Integer id;
    private String goods_name;
    private Double price;

    public Goods0() {
    }

    public Goods0(Integer id, String goods_name, Double price) {
        this.id = id;
        this.goods_name = goods_name;
        this.price = price;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getGoods_name() {
        return goods_name;
    }

    public void setGoods_name(String goods_name) {
        this.goods_name = goods_name;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "\nGoods0{" +
                "id=" + id +
                ", goods_name='" + goods_name + '\'' +
                ", price=" + price +
                '}';
    }
}

```

```java
package com.homework.goods_;

import com.dao_.dao.BasicDAO;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/29  21:21
 */
public class Goods0_DAO extends BasicDAO<Goods0> {
}

```

```java
package com.homework.goods_;

import com.dao_.domain.Actor;
import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

/**
 * @author frx
 * @version 1.0
 * @date 2021/8/29  20:35
 */
public class TestDAO {


    @Test
    public void test() throws SQLException {


        //添加三条数据
        Goods0_DAO goods0_dao = new Goods0_DAO();
        String sql="insert into goods0 values(?,?,?)";
        int update = goods0_dao.update(sql, 1,"小米手机", 3000);
        int update2 = goods0_dao.update(sql, 2,"华为手机", 4000);
        int update3= goods0_dao.update(sql, 3,"苹果手机", 5000);
        System.out.println(update2+update3>0?"执行成功":"执行没有影响表");


        //1.查询
        List<Goods0> goods0s = goods0_dao.queryMulti("select * from goods0 where id>=?", Goods0.class, 1);
        System.out.println("==查询结果==");
        for (Goods0 goods0:goods0s) {
            System.out.println(goods0);

        }
        //2.查询单行结果
        Goods0 goods0 = goods0_dao.querySingle("select * from goods0 where id=?", Goods0.class, 2);
        System.out.println("==查询单行结果==");
        System.out.println(goods0);

        //3.查询单行单列
        Object o = goods0_dao.queryScalar("select goods_name from goods0 where id=?",  3);
        System.out.println("==查询单行单列结果==");
        System.out.println(o);


    }
}

```

运行结果:

![21](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/java/images/jdbc/21.png)

