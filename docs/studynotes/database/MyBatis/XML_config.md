---
title: XML 配置
date: 2022-02-05 14:26:57
permalink: /pages/ba216f/
categories:
  - MyBatis
tags:
  - MyBatis
---
# XML 配置

[[toc]]

MyBatis 的配置文件包含了会深深影响 MyBatis 行为的设置和属性信息。 配置文档的顶层结构如下：

- configuration（配置）
  - [properties（属性）](https://mybatis.org/mybatis-3/zh/configuration.html#properties)
  - [settings（设置）](https://mybatis.org/mybatis-3/zh/configuration.html#settings)
  - [typeAliases（类型别名）](https://mybatis.org/mybatis-3/zh/configuration.html#typeAliases)
  - [typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)
  - [objectFactory（对象工厂）](https://mybatis.org/mybatis-3/zh/configuration.html#objectFactory)
  - [plugins（插件）](https://mybatis.org/mybatis-3/zh/configuration.html#plugins)
  - environments（环境配置）
    - environment（环境变量）
      - transactionManager（事务管理器）
      - dataSource（数据源）
  - [databaseIdProvider（数据库厂商标识）](https://mybatis.org/mybatis-3/zh/configuration.html#databaseIdProvider)
  - [mappers（映射器）](https://mybatis.org/mybatis-3/zh/configuration.html#mappers)

## 属性（properties）(了解)

这些属性可以在外部进行配置，并可以进行动态替换。你既可以在典型的 Java 属性文件中配置这些属性，也可以在 properties 元素的子元素中设置。例如：

+ resource:引入类路径下的资源
+ url:引入类路径或者磁盘路径下的资源

```xml
<properties resource="dbconfig.properties"></properties>
```

设置好的属性可以在整个配置文件中用来替换需要动态配置的属性值。比如

```xml
<property name="driver" value="${jdbc.driver}"/>
<property name="url" value="${jdbc.url}"/>
<property name="username" value="${jdbc.username}"/>
<property name="password" value="${jdbc.password}"/>
```

```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/mybatis
jdbc.username=root
jdbc.password=hsp
```

> 了解，用Spring来管理数据源

## 设置（settings）

这是 MyBatis 中极为重要的调整设置，它们会改变 MyBatis 的运行时行为。 下表描述了设置中各项设置的含义、默认值等。

| 设置名                   | 描述                                                         | 有效值      | 默认值 |
| ------------------------ | ------------------------------------------------------------ | ----------- | ------ |
| mapUnderscoreToCamelCase | 是否开启驼峰命名自动映射，即从经典数据库列名 A_COLUMN 映射到经典 Java 属性名 aColumn。 | true\|false | False  |

```xml
 <!--2.settings包含很多重要的设置项
        setting:用来设置每一个设置项
            name:设置项的名字
            value:设置项的取值
    -->
    <settings>
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
```

官方文档:[settings（设置）](https://mybatis.org/mybatis-3/zh/configuration.html#settings)

## 类型别名（typeAliases）

类型别名可为 Java 类型设置一个缩写名字。 它仅用于 XML 配置，意在降低冗余的全限定类名书写。例如：

```xml
 <!--3.typeAliases：别名处理器：可以为我们的Java类型起别名
            别名不区分大小写-->
    <typeAliases>
        <!--typeAlias：为某个Java类型起别名
            type:指定要起别名的类型全类名;默认别名就是类名小写:employee
            alias:指定新的别名-->
        <typeAlias type="com.frx01.mybatis.bean.Employee" alias="emp"/>

        <!--package:为某个包下的所有类批量起别名
            name:指定报名(指定为当前包以及下面所有的后代包的每一个类都起一个默认别名(类名小写))-->
        <package name="com.frx01.mybatis.bean"/>

        <!--批量起别名的情况下，使用@Alias注解为某个类型指定新的别名-->
    </typeAliases>
```

```java
@Alias("emp")
public class Employee {
}
```

官方文档:[typeAliases（类型别名）](https://mybatis.org/mybatis-3/zh/configuration.html#typeAliases)

## 类型处理器（typeHandlers）

官方文档:[typeHandlers（类型处理器）](https://mybatis.org/mybatis-3/zh/configuration.html#typeHandlers)

## 环境配置（environments）

```xml
  <!--4.environments：环境们，mybatis可以配置多种环境 default指定使用某种环境。可以达到快速切换
            environment:配置一个具体的环境信息：必须有两个标签 id(代表当前环境的唯一标识)
            transactionManager:事务管理器；
                type:事务管理器的类型:JDBC(JDBCTransactionFactory)|MANAGED(Managed)
                    自定义事务管理器:实现JDBCTransactionFactory接口，type指定为全类名
            dataSource:数据源
                type:数据源类型；UNPOOLED|POOLED|JNDI
                自定义数据源:实现DataSourceFactory接口，type是全类名

                 -->
    <environments default="test">
        <environment id="test">
            <transactionManager type=""></transactionManager>
            <dataSource type=""></dataSource>
        </environment>
```

## 插件（plugins）

官方文档:[plugins（插件）](https://mybatis.org/mybatis-3/zh/configuration.html#plugins)

## 数据库厂商标识（databaseIdProvider）

MyBatis 可以根据不同的数据库厂商执行不同的语句，这种多厂商的支持是基于映射语句中的 `databaseId` 属性。 MyBatis 会加载带有匹配当前数据库 `databaseId` 属性和所有不带 `databaseId` 属性的语句。 如果同时找到带有 `databaseId` 和不带 `databaseId` 的相同语句，则后者会被舍弃。 为支持多厂商特性，只要像下面这样在 mybatis-config.xml 文件中加入 `databaseIdProvider` 即可：

```xml
<!--5.databaseIdProvider，支持数据库厂商的，
              type="DB_VENDOR":VendorDatabaseIdProvider
                  作用就是得到数据库厂商的标识(驱动)，mybatis就能根据数据库厂商标识来执行不同的sql
                  MySQL,Oracle,SQL,Server,xxx;
                  -->
    <databaseIdProvider type="DB_VENDOR">
        <!--为不同的数据库厂商起别名-->
        <property name="MySQL" value="mysql"/>
        <property name="Oracle" value="oracle"/>
        <property name="SQL Server" value="sqlserver"/>
    </databaseIdProvider>
```

```xml
    <select id="getEmpById" resultType="com.frx01.mybatis.bean.Employee" databaseId="mysql">
        select id,last_name lastName,gender,email from tbl_employee where id=#{id}
    </select>
```

官方文档:[databaseIdProvider（数据库厂商标识）](https://mybatis.org/mybatis-3/zh/configuration.html#databaseIdProvider)

## 映射器（mappers）

既然 MyBatis 的行为已经由上述元素配置完了，我们现在就要来定义 SQL 映射语句了。 但首先，我们需要告诉 MyBatis 到哪里去找到这些语句。 在自动查找资源方面，Java 并没有提供一个很好的解决方案，所以最好的办法是直接告诉 MyBatis 到哪里去找映射文件。 你可以使用相对于类路径的资源引用，或完全限定资源定位符（包括 `file:///` 形式的 URL），或类名和包名等。

```xml
  <!--6.mappers:将sql映射注册到全局配置中-->
    <mappers>
        <!--mapper:注册一个sql映射
                resource:引用类路径下的sql映射文件
                    mybatis/mapper/EmployeeMapper.xml
                url:引用网络路径或磁盘路径下的sql映射文件
                注册接口
                class:引用(注册)接口
                    1.有sql映射文件，映射文件名必须和接口同名，并且放在与接口同一目录下；
                    2.没有sql映射文件，所有的sql都是利用注解 写在接口上
                    推荐:
                        比较重要的，复制的Dao接口我们来写sql映射文件
                        不重要，简单的Dao接口为了开发快速可以使用注解
                -->
        <!--<mapper resource="EmployeeMapper.xml"/>-->
        <!--<mapper class="com.frx01.mybatis.dao.EmployeeMapperAnnotation"/>-->

        <!--批量注册 要把Mapper.xml与dao层放在一个包下-->
        <package name="com.frx01.mybatis.dao"/>
    </mappers>
```

+ 使用注解方式代替sql映射文件结果

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/MyBatis/images/02/01.png)

官方文档:[mappers（映射器）](https://mybatis.org/mybatis-3/zh/configuration.html#mappers)

