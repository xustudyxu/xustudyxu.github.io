---
title: MyBatis的逆向工程
date: 2022-02-25 22:13:52
permalink: /pages/b147f3/
categories:
  - MyBatis
tags:
  - MyBatis
---
# MyBatis的逆向工程

[[toc]]

+ 正向工程：先创建Java实体类，由框架负责根据实体类生成数据库表。Hibernate是支持正向工程
  的。
+ 逆向工程：先创建数据库表，由框架负责根据数据库表，反向生成如下资源：
  + Java实体类
  + Mapper接口
  + Mapper映射文件

MyBatis Generator

简称MBG，是一个专门为MyBatis框架使用者定制的代码生成器，可以快速的根据表生成对应的映射文件，接口，以及bean类。支持基本的增删改查，以及QBC风格的条件查询。但是表连接、存储过程等这些复杂sql的定义需要我们手工编写

[官方文档地址](http://www.mybatis.org/generator/)

[官方工程地址](https://github.com/mybatis/generator/releases)

## 创建逆向工程的步骤

### 添加依赖和插件

```xml
  <!-- 依赖MyBatis核心包 -->
    <dependencies>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.7</version>
        </dependency>
    </dependencies>
    <!-- 控制Maven在构建过程中相关配置 -->
    <build>
        <!-- 构建过程中用到的插件 -->
        <plugins>
            <!-- 具体插件，逆向工程的操作是以构建过程中插件形式出现的 -->
            <plugin>
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>1.3.0</version>
                <!-- 插件的依赖 -->
                <dependencies>
                    <!-- 逆向工程的核心依赖 -->
                    <dependency>
                        <groupId>org.mybatis.generator</groupId>
                        <artifactId>mybatis-generator-core</artifactId>
                        <version>1.3.2</version>
                    </dependency>
                    <!-- 数据库连接池 -->
                    <dependency>
                        <groupId>com.mchange</groupId>
                        <artifactId>c3p0</artifactId>
                        <version>0.9.2</version>
                    </dependency>
                    <!-- MySQL驱动 -->
                    <dependency>
                        <groupId>mysql</groupId>
                        <artifactId>mysql-connector-java</artifactId>
                        <version>5.1.8</version>
                    </dependency>
                      <dependency>
                        <groupId>log4j</groupId>
                        <artifactId>log4j</artifactId>
                        <version>1.2.14</version>
                        <optional>true</optional>
        			</dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>
```

### 创建MyBatis的核心配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <properties resource="jdbc.properties"/>

    <typeAliases>
        <package name="com.frx01.mybatis.pojo"/>
    </typeAliases>

    <plugins>
        <!--设置分页插件-->
        <plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
    </plugins>

    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>

    <mappers>
        <package name="com.frx01.mybatis.mapper"/>
    </mappers>
</configuration>
```

### 创建逆向工程的配置文件

> 文件名必须是：generatorConfig.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!--
            targetRuntime: 执行生成的逆向工程的版本
                    MyBatis3Simple: 生成基本的CRUD（清新简洁版）
                    MyBatis3: 生成带条件的CRUD（奢华尊享版）
     -->
    <context id="DB2Tables" targetRuntime="MyBatis3">
        <!-- 数据库的连接信息 -->
        <jdbcConnection driverClass="com.mysql.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/mybatis"
                        userId="root"
                        password="hsp">
        </jdbcConnection>
        <!-- javaBean的生成策略-->
        <javaModelGenerator targetPackage="com.frx01.mybatis.pojo" targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
            <property name="trimStrings" value="true" />
        </javaModelGenerator>
        <!-- SQL映射文件的生成策略 -->
        <sqlMapGenerator targetPackage="com.frx01.mybatis.mapper"  targetProject=".\src\main\resources">
            <property name="enableSubPackages" value="true" />
        </sqlMapGenerator>
        <!-- Mapper接口的生成策略 -->
        <javaClientGenerator type="XMLMAPPER" targetPackage="com.frx01.mybatis.mapper"  targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>
        <!-- 逆向分析的表 -->
        <!-- tableName设置为*号，可以对应所有表，此时不写domainObjectName -->
        <!-- domainObjectName属性指定生成出来的实体类的类名 -->
        <table tableName="t_emp" domainObjectName="Emp"/>
        <table tableName="t_dept" domainObjectName="Dept"/>
    </context>
</generatorConfiguration>
```

### 执行MBG插件的generate目标

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/04/03.png)

清新简洁版效果:

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/04/04.png)

奢华尊享版效果:

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/04/05.png)

+ 测试

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/2/28  10:55
 */
public class MBGTest {

    @Test
    public void testMBG() {
        try {

            InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            SqlSession openSession = sqlSessionFactory.openSession(true);
            EmpMapper mapper = openSession.getMapper(EmpMapper.class);
            //查询数据
            Emp emp = mapper.selectByPrimaryKey(3);
            System.out.println(emp);
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}
```

+ 结果

```java
DEBUG 02-28 11:28:40,132 ==>  Preparing: select id, last_name, gender, email, d_id from tbl_employee where id = ?  (BaseJdbcLogger.java:137) 
DEBUG 02-28 11:28:40,185 ==> Parameters: 3(Integer)  (BaseJdbcLogger.java:137) 
DEBUG 02-28 11:28:40,219 <==      Total: 1  (BaseJdbcLogger.java:137) 
Emp{id=3, lastName='jerry', gender='1', email='jerry@123.com', dId=null}

Process finished with exit code 0
```

## QBC查询

### 根据条件查询

```java
    @Test
    public void testMBG() {
        try {

            InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            SqlSession openSession = sqlSessionFactory.openSession(true);
            EmpMapper mapper = openSession.getMapper(EmpMapper.class);
            //根据条件查询
            EmpExample example = new EmpExample();
            example.createCriteria().andLastNameEqualTo("frank").andGenderEqualTo("1");
            List<Emp> list = mapper.selectByExample(example);
            for (Emp emp : list) {
                System.out.println(emp);
            }
        }catch (IOException e){
            e.printStackTrace();
        }

    }
```

+ 结果

```java
DEBUG 02-28 11:27:59,060 ==>  Preparing: select id, last_name, gender, email, d_id from tbl_employee WHERE ( last_name = ? and gender = ? )  (BaseJdbcLogger.java:137) 
DEBUG 02-28 11:27:59,102 ==> Parameters: frank(String), 1(String)  (BaseJdbcLogger.java:137) 
DEBUG 02-28 11:27:59,136 <==      Total: 1  (BaseJdbcLogger.java:137) 
Emp{id=5, lastName='frank', gender='1', email='frank@athome.com', dId=2}

Process finished with exit code 0
```

### 根据主键修改

```java
    @Test
    public void testMBG() {
        try {

            InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            SqlSession openSession = sqlSessionFactory.openSession(true);
            EmpMapper mapper = openSession.getMapper(EmpMapper.class);
            //根据主键修改
            mapper.updateByPrimaryKey(new Emp(1,"admin","1","123@qq.com",1));
        }catch (IOException e){
            e.printStackTrace();
        }

    }
```

+ 结果

```java
DEBUG 02-28 11:39:37,371 ==>  Preparing: update tbl_employee set last_name = ?, gender = ?, email = ?, d_id = ? where id = ?  (BaseJdbcLogger.java:137) 
DEBUG 02-28 11:39:37,431 ==> Parameters: admin(String), 1(String), 123@qq.com(String), 1(Integer), 1(Integer)  (BaseJdbcLogger.java:137) 
DEBUG 02-28 11:39:37,831 <==    Updates: 1  (BaseJdbcLogger.java:137) 

Process finished with exit code 0
```

