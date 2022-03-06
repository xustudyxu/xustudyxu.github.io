# SSM-CRUD

[[toc]]

## 功能点

1. 分页
2. 数据校验
   + jquery前端校验+JSR303后端校验
3. ajax
4. Rest风格的URI；使用HTTP协议请求方式的动词，来表示对资源的操作（GET（查询），POST（新增），PUT（修改），DELETE（删除））

## 技术点

1. 基础框架-ssm（SpringMVC+Spring+MyBatis）
2. 数据库-MySQL
3. 前端框架-bootstrap快速搭建简洁美观的界面
4. 项目的依赖管理-Maven
5. 分页-pagehelper
6. 逆向工程-MyBatis Generator

## 基础环境搭建

1. 创建一个maven工程

2. 引入项目依赖的jar包
   + spring
   + springmvc
   + mybatis
   + 数据库连接池
   + • 其他（jstl，servlet-api，junit）
3. 引入bootstrap前端框架
4. 编写ssm整合的关键配置文件
   + web.xml，spring,springmvc,mybatis，使用mybatis的逆向工程生成对应的bean以及mapper
5. 测试mapper

### 配置`pom.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">

  <modelVersion>4.0.0</modelVersion>
  <packaging>war</packaging>

  <name>SSM-CRUD</name>
  <groupId>com.frx01</groupId>
  <artifactId>SSM-CRUD</artifactId>
  <version>1.0-SNAPSHOT</version>

  <!--引入项目依赖的jar包-->
  <!--SpringMVC、Spring、-->
  <dependencies>
    <dependency>
      <groupId>com.github.pagehelper</groupId>
      <artifactId>pagehelper</artifactId>
      <version>5.2.0</version>
    </dependency>
    <!--  MBG  -->
    <dependency>
      <groupId>org.mybatis.generator</groupId>
      <artifactId>mybatis-generator-core</artifactId>
      <version>1.3.0</version>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-webmvc</artifactId>
      <version>5.1.9.RELEASE</version>
    </dependency>
    <!--  返回json字符串的支持  -->
    <dependency>
      <groupId>com.fasterxml.jackson.core</groupId>
      <artifactId>jackson-databind</artifactId>
      <version>2.8.8</version>
    </dependency>
    <!-- JSR303数据校验支持；tomcat7及以上的服务器，
            tomcat7以下的服务器：el表达式。额外给服务器的lib包中替换新的标准的el
             -->
    <dependency>
      <groupId>org.hibernate</groupId>
      <artifactId>hibernate-validator</artifactId>
      <version>5.4.1.Final</version>
    </dependency>
    <!--  Spring-Jdbc  -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>5.1.9.RELEASE</version>
    </dependency>
    <!-- Spring-test  -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-test</artifactId>
      <version>5.1.9.RELEASE</version>
    </dependency>
    <!--  Spring面向切面编程  -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-aspects</artifactId>
      <version>5.1.9.RELEASE</version>
    </dependency>
    <!-- MyBatis  -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.4.2</version>
    </dependency>
    <!--  MyBatis整合Spring的适配包  -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>1.3.1</version>
    </dependency>
    <!--  数据库连接池、驱动  -->
    <dependency>
      <groupId>c3p0</groupId>
      <artifactId>c3p0</artifactId>
      <version>0.9.1</version>
    </dependency>
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>5.1.41</version>
    </dependency>
    <!--  （jstl，servlet-api，junit）  -->
    <dependency>
      <groupId>jstl</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.0.1</version>
      <scope>provided</scope>
    </dependency>
    <!--  junit  -->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
    </dependency>
  </dependencies>
</project>
```

### 配置`dbconfig.properties`

```properties
jdbc.jdbcUrl=jdbc:mysql://localhost:3306/SSM_CRUD
jdbc.driverClass=com.mysql.jdbc.Driver
jdbc.user=root
jdbc.password=hsp
```

### 配置`web.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="2.4"
         xmlns="http://java.sun.com/xml/ns/j2ee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd">
    <!--1.启动Spring的容器-->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>

    <!--  Bootstraps the root web application context before servlet initialization  -->
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>

    <!--2.springmvc的前端控制器-->
    <!--  The front controller of this Spring Web application, responsible for handling all application requests  -->
    <servlet>
        <servlet-name>dispatcherServlet</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <!--  Map all requests to the DispatcherServlet for handling  -->
    <servlet-mapping>
        <servlet-name>dispatcherServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

    <!--3.字符编码过滤器-->
    <filter>
        <filter-name>CharacterEncodingFilter</filter-name>
        <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
        <init-param>
            <param-name>encoding</param-name>
            <param-value>utf-8</param-value>
        </init-param>
        <init-param>
            <param-name>forceRequestEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
        <init-param>
            <param-name>forceResponseEncoding</param-name>
            <param-value>true</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>CharacterEncodingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!--4.使用Rest风格的URI 将页面普通的post请求 转为指定的delete或者put请求-->
    <filter>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>HiddenHttpMethodFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

</web-app>
        
```

### 配置`dispatcherServlet-servlet`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xsi:schemaLocation="http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc-4.3.xsd
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd">

        <!--SpringMVC的配置文件，包含网站跳转逻辑的控制，配置-->
        <context:component-scan base-package="com.frx01" use-default-filters="false">
                <!--只扫描控制器-->
                <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
        </context:component-scan>

        <!--配置视图解析器-->
        <bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
                <property name="prefix" value="/WEB-INF/views/"></property>
                <property name="suffix" value=".jsp"></property>
        </bean>

        <!--两个标准配置-->
        <!--将SpringMVC不能处理的资源交给Tomcat-->
        <mvc:default-servlet-handler/>
                <!--支持springmvc更高级的一些功能,JSR303校验，快捷的ajax 映射动态请求-->
        <mvc:annotation-driven/>
</beans>
```

`applicationContext`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop-4.3.xsd
		http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
		http://www.springframework.org/schema/tx http://www.springframework.org/schema/tx/spring-tx-4.3.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd">

    <!--扫描-->
    <context:component-scan base-package="com.frx01">
        <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
    </context:component-scan>

    <!--Spring的配置文件,这里主要配置和业务主要逻辑有关的-->
    <!--=======================数据源,事务控制===========================-->
    <context:property-placeholder location="classpath:dbconfig.properties"/>

    <bean id="pooledDataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="jdbcUrl" value="${jdbc.jdbcUrl}"></property>
        <property name="driverClass" value="${jdbc.driverClass}"></property>
        <property name="user" value="${jdbc.user}"></property>
        <property name="password" value="{jdbc.password}"></property>
    </bean>

    <!-- ======================配置和Mybatis的整合=====================-->
    <bean id="sqlSessionFactoryBean" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--指定mybatis全局配置文件的位置-->
        <property name="configLocation " value="classpath:mybatis-config.xml"></property>
        <property name="dataSource" value="pooledDataSource"></property>
        <!--指定mybatis，mapper文件的位置-->
        <property name="mapperLocations" value="classpath:mapper/*.xml"></property>
    </bean>

    <!--配置扫描器。将mybatis接口的实现加入到ioc容器中-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
    <!--扫描所有dao接口的实现，加入到ioc容器中-->
        <property name="basePackage" value="com.frx01.crud"></property>
    </bean>

    <!--========================事务控制的配置========================-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!--控制数据源-->
        <property name="dataSource" ref="pooledDataSource"></property>
    </bean>
        <!--开启基于注解的事务，使用xml配置形式的事务(必须主要的都是使用配置式)-->
        <aop:config>
            <!--切入点表达式-->
            <aop:pointcut  expression="execution(* com.frx01.crud.service..*(..))" id="txPoint"/>
            <!--配置事务增强-->
            <aop:advisor advice-ref="txAdvice" pointcut-ref="txPoint"/>
        </aop:config>

    <!--配置事务增强,配置事务如何切入-->
    <tx:advice id="txAdvice">
        <tx:attributes>
            <!--所有方法都是事务方法-->
            <tx:method name="*"/>
            <!--以get开始的所有方法-->
            <tx:method name="get*" read-only="true"/>
        </tx:attributes>
    </tx:advice>

    <!--Spring配置文件的核心点(数据源、与mybatis整合，事务控制)-->

</beans>
```

### 配置`mybatis-config.xml`

```xml

```



