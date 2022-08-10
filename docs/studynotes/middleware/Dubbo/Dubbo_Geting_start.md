---
title: Dubbo 快速入门
date: 2022-08-09 20:05:22
permalink: /middleware/Dubbo/Dubbo_Geting_start
categories:
  - Dubbo
tags:
  - Dubbo
---
# Dubbo 快速入门

[[toc]]

## Zookeeper安装

+ Dubbo官方推荐使用Zookeeper作为注册中心

### 下载安装

ZooKeeper服务器是用Java创建的，它运行在JVM之上。需要安装JDK 7或更高版本。

+ [Zookeeper下载地址](https://zookeeper.apache.org/releases.html)

+ 将下载的ZooKeeper放到/opt/ZooKeeper目录下

```sh
mkdir /opt/ZooKeeper
```

+ 使用XFTP工具将压缩包传输到Linux系统

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220809/image.1ps0tk51lz40.webp)

+ 将tar包解压到/opt/zookeeper目录下

```sh
mkdir /opt/zookeeper
tar -zxvf apache-zookeeper-3.5.6-bin.tar.gz -C /opt/zookeeper
```

### 配置启动

#### 配置zoo.cfg

进入到conf目录拷贝一个zoo_sample.cfg并完成配置

```sh
cd /opt/zookeeper/apache-zookeeper-3.5.6-bin/conf && ls
#拷贝
cp  zoo_sample.cfg  zoo.cfg
```

+ 创建zk存储目录

```sh
mkdir /opt/zookeeper/zkdada
```

+ 修改zoo.cfg

```sh
#修改zoo.cfg
vim /opt/zookeeper/apache-zooKeeper-3.5.6-bin/conf/zoo.cfg
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220809/image.4ywxv61udoc0.webp)

修改存储目录：dataDir=/opt/zookeeper/zkdata

#### 启动ZooKeeper

```sh
cd /opt/zookeeper/apache-zooKeeper-3.5.6-bin/bin/
#启动
 ./zkServer.sh  start
```

```sh
[root@master bin]# ./zkServer.sh start
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper/apache-zookeeper-3.5.6-bin/bin/../conf/zoo.cfg
Starting zookeeper ... STARTED
```

> STARTED表示zk启动成功

#### 查看ZooKeeper状态

```sh
./zkServer.sh status
```

```sh
[root@master bin]# ./zkServer.sh status
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper/apache-zookeeper-3.5.6-bin/bin/../conf/zoo.cfg
Client port found: 2181. Client address: localhost.
Mode: standalone
```

> zookeeper启动成功。standalone代表zk没有搭建集群，现在是单节点

```sh
[root@master bin]# ./zkServer.sh status
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper/apache-zookeeper-3.5.6-bin/bin/../conf/zoo.cfg
Client port found: 2181. Client address: localhost.
Error contacting service. It is probably not running.
```

> (not running),zookeeper没有启动

+ 关闭ZooKeeper

```sh
./zkServer.sh stop
```

## 创建工程

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220809/image.6b4kd65c3bs0.webp)

### 配置dubbo-web的pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.frx01</groupId>
    <artifactId>dubbo-web</artifactId>
    <version>1.0-SNAPSHOT</version>
	<packaging>war</packaging>

    <properties>
        <spring.version>5.1.9.RELEASE</spring.version>
        <dubbo.version>2.7.4.1</dubbo.version>
        <zookeeper.version>4.0.0</zookeeper.version>

    </properties>

    <dependencies>
        <!-- servlet3.0规范的坐标 -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>
        <!--spring的坐标-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!--springmvc的坐标-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <!--日志-->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.21</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.21</version>
        </dependency>

        <!--Dubbo的起步依赖，版本2.7之后统一为rg.apache.dubb -->
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo</artifactId>
            <version>${dubbo.version}</version>
        </dependency>
        <!--ZooKeeper客户端实现 -->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>${zookeeper.version}</version>
        </dependency>
        <!--ZooKeeper客户端实现 -->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-recipes</artifactId>
            <version>${zookeeper.version}</version>
        </dependency>
        <!--依赖service模块-->
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>dubbo-service</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>

    </dependencies>
    
    <build>
        <plugins>
            <!--tomcat插件-->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.1</version>
                <configuration>
                    <port>8000</port>
                    <path>/</path>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### 配置dubbo-service的pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.frx01</groupId>
    <artifactId>dubbo-service</artifactId>
    <version>1.0-SNAPSHOT</version>


    <properties>
        <spring.version>5.1.9.RELEASE</spring.version>
        <dubbo.version>2.7.4.1</dubbo.version>
        <zookeeper.version>4.0.0</zookeeper.version>

    </properties>

    <dependencies>
        <!-- servlet3.0规范的坐标 -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
            <scope>provided</scope>
        </dependency>
        <!--spring的坐标-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>${spring.version}</version>
        </dependency>
        <!--springmvc的坐标-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>${spring.version}</version>
        </dependency>

        <!--日志-->
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.21</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-log4j12</artifactId>
            <version>1.7.21</version>
        </dependency>

        <!--Dubbo的起步依赖，版本2.7之后统一为rg.apache.dubb -->
        <dependency>
            <groupId>org.apache.dubbo</groupId>
            <artifactId>dubbo</artifactId>
            <version>${dubbo.version}</version>
        </dependency>
        <!--ZooKeeper客户端实现 -->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-framework</artifactId>
            <version>${zookeeper.version}</version>
        </dependency>
        <!--ZooKeeper客户端实现 -->
        <dependency>
            <groupId>org.apache.curator</groupId>
            <artifactId>curator-recipes</artifactId>
            <version>${zookeeper.version}</version>
        </dependency>
    </dependencies>
</project>
```

### 配置log4j.properties

```properties
# DEBUG < INFO < WARN < ERROR < FATAL
# Global logging configuration
log4j.rootLogger=info, stdout,file
# My logging configuration...
#log4j.logger.com.tocersoft.school=DEBUG
#log4j.logger.net.sf.hibernate.cache=debug
## Console output...
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p %d %C: %m%n

log4j.appender.file=org.apache.log4j.FileAppender
log4j.appender.file.File=../logs/iask.log
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss}  %l  %m%n
```

### 创建dubbo-web的Service的接口及实现类

+ 接口

```java
public interface UserService {

    public String sayHello();
}
```

+ 实现类

```java
@Service
public class UserServiceImpl implements UserService {
    @Override
    public String sayHello() {
        return "hello,dubbo~";
    }
}
```

### 配置dubbo-web的spring核心配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	   xmlns:dubbo="http://dubbo.apache.org/schema/dubbo" xmlns:context="http://www.springframework.org/schema/context"
	   xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

	<context:component-scan base-package="com.frx01.service"/>
</beans>
```

### 配置dubbo-service的web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://java.sun.com/xml/ns/javaee"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
         version="2.5">

		 
	<!-- spring -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath*:spring/applicationContext*.xml</param-value>
    </context-param>
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
		 
	<!-- Springmvc -->	 
    <servlet>
        <servlet-name>springmvc</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <!-- 指定加载的配置文件 ，通过参数contextConfigLocation加载-->
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:spring/springmvc.xml</param-value>
        </init-param>
    </servlet>

    <servlet-mapping>
        <servlet-name>springmvc</servlet-name>
        <url-pattern>*.do</url-pattern>
    </servlet-mapping>

</web-app>
```

### 创建dubbo-web的Controller

```java
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/sayHello")
    public String sayHello(){
        return userService.sayHello();
    }
}
```

### 配置dubbo-service的springmvc配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd
         http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <mvc:annotation-driven/>
    <context:component-scan base-package="com.frx01.controller"/>

</beans>
```

## 测试

+ 因为dubbo-service被dubbo-web所依赖，我们需要先`install`dubbo-service这个项目。
+ 启动dubbo-web

+ 结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220809/image.3rqhmd9khuk0.webp)

> 目前此项目，仍然是单体项目

## Dubbo 引入

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220809/image.1m14kr1438qo.webp)

### 服务提供者

> 在dubbo-service的pom.xml文件中引入tomcat插件，并修改打包方式为war

### 修改UserServiceImpl.java

```java {4,6}
package com.frx01.service.impl;

import com.frx01.service.UserService;
import org.apache.dubbo.config.annotation.Service;

@Service//将这这类提供的方法(服务)对外发布，将访问的地址,ip,端口,路径注册到注册中心中
public class UserServiceImpl implements UserService {
    @Override
    public String sayHello() {
        return "hello,dubbo~";
    }
}
```

### 修改dubbo-server的application.xml

```xml {9,15}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
	   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	   xmlns:dubbo="http://dubbo.apache.org/schema/dubbo" xmlns:context="http://www.springframework.org/schema/context"
	   xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

	<!--<context:component-scan base-package="com.frx01.service"/>-->
	<!--dubbo的配置-->
	<!--1.项目的名称-->
	<dubbo:application name="dubbo-service"/>
	<!--2.配置一下注册中心的地址-->
	<dubbo:registry address="zookeeper://192.168.91.200:2181"/>
	<!--3.配置dubbo包扫描-->
	<dubbo:annotation package="com.frx01.service.impl"/>
</beans>
```

### 修改dubbo-server的web.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xmlns="http://java.sun.com/xml/ns/javaee"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_2_5.xsd"
         version="2.5">


	<!-- spring -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath*:spring/applicationContext*.xml</param-value>
    </context-param>
    <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
    <!-- 删去springmvc的配置 -->

</web-app>
```

### 服务消费者

> 删除dubbo-web的pom.xml的dubbo-service模块依赖
>
> 删除web.xml的spring配置

### 修改dubbo-web的控制器

```java {2,21}
import com.frx01.service.UserService;
import org.apache.dubbo.config.annotation.Reference;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author frx
 * @version 1.0
 * @date 2022/8/9  17:45
 */
@RestController
@RequestMapping("/user")
public class UserController {

    /**
     * 1.从zookeeper注册中心获取userService的访问url
     * 2.远程的调用RPC
     * 3.将结果封装为代理的对象，给变量赋值
     */
    @Reference //远程注入
    private UserService userService;

    @RequestMapping("/sayHello")
    public String sayHello(){
        return userService.sayHello();
    }
}
```

### 修改dubbo-web项目的springmvc.xml

```xml {13-19}
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:dubbo="http://dubbo.apache.org/schema/dubbo"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc http://www.springframework.org/schema/mvc/spring-mvc.xsd
         http://dubbo.apache.org/schema/dubbo http://dubbo.apache.org/schema/dubbo/dubbo.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <mvc:annotation-driven/>
    <context:component-scan base-package="com.frx01.controller"/>
    <!--dubbo的配置-->
    <!--1.项目的名称-->
    <dubbo:application name="dubbo-web"/>
    <!--2.配置一下注册中心的地址-->
    <dubbo:registry address="zookeeper://192.168.91.200:2181"/>
    <!--3.配置dubbo包扫描-->
    <dubbo:annotation package="com.frx01.controller"/>

</beans>
```

### 添加模块dubbo-interface

+ 将UserService接口抽取出来放入dubbo-interface模块

+ 在dubbo-service和dubbo-web模块中引入dubbo-interface模块

```xml
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>dubbo-interface</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
```

### Test

+ 将dubbo-interface模块进行`install`

+ 启动dubbo-service

::: details 控制台输出

```java
 INFO 2022-08-09 19:58:57,348 org.springframework.web.context.ContextLoader: Root WebApplicationContext: initialization started
 INFO 2022-08-09 19:58:57,624 ?: using logger: org.apache.dubbo.common.logger.log4j.Log4jLoggerAdapter
 INFO 2022-08-09 19:58:57,870 org.apache.dubbo.config.spring.beans.factory.annotation.ServiceAnnotationBeanPostProcessor:  [DUBBO] BeanNameGenerator bean can't be found in BeanFactory with name [org.springframework.context.annotation.internalConfigurationBeanNameGenerator], dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:57,870 org.apache.dubbo.config.spring.beans.factory.annotation.ServiceAnnotationBeanPostProcessor:  [DUBBO] BeanNameGenerator will be a instance of org.springframework.context.annotation.AnnotationBeanNameGenerator , it maybe a potential problem on bean name generation., dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:57,905 org.apache.dubbo.config.spring.beans.factory.annotation.ServiceAnnotationBeanPostProcessor:  [DUBBO] The BeanDefinition[Root bean: class [org.apache.dubbo.config.spring.ServiceBean]; scope=; abstract=false; lazyInit=false; autowireMode=0; dependencyCheck=0; autowireCandidate=true; primary=false; factoryBeanName=null; factoryMethodName=null; initMethodName=null; destroyMethodName=null] of ServiceBean has been registered with name : ServiceBean:com.frx01.service.UserService, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:57,905 org.apache.dubbo.config.spring.beans.factory.annotation.ServiceAnnotationBeanPostProcessor:  [DUBBO] 1 annotated Dubbo's @Service Components { [Bean definition with name 'userServiceImpl': Generic bean: class [com.frx01.service.impl.UserServiceImpl]; scope=; abstract=false; lazyInit=false; autowireMode=0; dependencyCheck=0; autowireCandidate=true; primary=false; factoryBeanName=null; factoryMethodName=null; initMethodName=null; destroyMethodName=null; defined in file [D:\Dubbo-Project\dubbo-project\dubbo-service\target\classes\com\frx01\service\impl\UserServiceImpl.class]] } were scanned under package[com.frx01.service.impl], dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:58,138 org.apache.dubbo.config.spring.ServiceBean:  [DUBBO] The service ready on spring started. service: com.frx01.service.UserService, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:58,226 org.apache.zookeeper.Environment: Client environment:zookeeper.version=3.5.3-beta-8ce24f9e675cbefffb8f21a47e06b42864475a60, built on 04/03/2017 16:19 GMT
 INFO 2022-08-09 19:58:58,226 org.apache.zookeeper.Environment: Client environment:host.name=FRXcomputer
 INFO 2022-08-09 19:58:58,226 org.apache.zookeeper.Environment: Client environment:java.version=1.8.0_231
 INFO 2022-08-09 19:58:58,226 org.apache.zookeeper.Environment: Client environment:java.vendor=Oracle Corporation
 INFO 2022-08-09 19:58:58,227 org.apache.zookeeper.Environment: Client environment:java.home=D:\DevelopTools\java\1.8\jdk\jre
 INFO 2022-08-09 19:58:58,227 org.apache.zookeeper.Environment: Client environment:java.class.path=D:\DevelopTools\apache-maven-3.8.4\boot\plexus-classworlds-2.6.0.jar;D:\DevelopTools\apache-maven-3.8.4\boot\plexus-classworlds.license;D:\DevelopTools\IntelliJ IDEA 2020.3.3\lib\idea_rt.jar
 INFO 2022-08-09 19:58:58,227 org.apache.zookeeper.Environment: Client environment:java.library.path=D:\DevelopTools\java\1.8\jdk\bin;C:\WINDOWS\Sun\Java\bin;C:\WINDOWS\system32;C:\WINDOWS;D:\DevelopTools\java\1.8\jdk\jre\bin;D:\DevelopTools\java\1.8\jdk\bin;D:\DevelopTools\java\1.8\jdk\jre\bin;D:\DevelopTools\java\1.8\jdk\bin;C:\Program Files (x86)\Common Files\Oracle\Java\javapath;C:\Windows\system32;C:\Windows;C:\Windows\System32\Wbem;C:\Windows\System32\WindowsPowerShell\v1.0\;C:\Windows\System32\OpenSSH\;C:\Program Files (x86)\NVIDIA Corporation\PhysX\Common;C:\Program Files\NVIDIA Corporation\NVIDIA NGX;D:\DevelopTools\apache-maven-3.8.4\bin;C:\Program Files\Git\cmd;D:\QuickStart;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\WINDOWS\System32\OpenSSH\;C:\Program Files (x86)\Windows Kits\10\Windows Performance Toolkit\;C:\WINDOWS\system32;C:\WINDOWS;C:\WINDOWS\System32\Wbem;C:\WINDOWS\System32\WindowsPowerShell\v1.0\;C:\WINDOWS\System32\OpenSSH\;D:\Program Files\nodejs\;D:\Program Files (x86)\Yarn\New Folder\bin\;D:\DevelopTools\xftp7\;D:\DevelopTools\Xshell7\;C:\Program Files\dotnet\;D:\DevelopTools\Anaconda3;D:\DevelopTools\Anaconda3\Library\mingw-w64\bin;D:\DevelopTools\Anaconda3\Library\usr\bin;D:\DevelopTools\Anaconda3\Library\bin;D:\DevelopTools\Anaconda3\Scripts;C:\Users\DELL\AppData\Local\Microsoft\WindowsApps;D:\DevelopTools\Microsoft VS Code\bin;C:\Users\DELL\AppData\Roaming\npm;C:\Users\DELL\AppData\Local\Yarn\bin;D:\DevelopTools\mysql-5.7.19-winx64\bin;C:\Program Files (x86)\Tencent\QQGameTempest\Hall.57768\;D:\DevelopTools\mongoDB\bin;;.
 INFO 2022-08-09 19:58:58,227 org.apache.zookeeper.Environment: Client environment:java.io.tmpdir=C:\Users\DELL\AppData\Local\Temp\
 INFO 2022-08-09 19:58:58,228 org.apache.zookeeper.Environment: Client environment:java.compiler=<NA>
 INFO 2022-08-09 19:58:58,228 org.apache.zookeeper.Environment: Client environment:os.name=Windows 10
 INFO 2022-08-09 19:58:58,228 org.apache.zookeeper.Environment: Client environment:os.arch=amd64
 INFO 2022-08-09 19:58:58,229 org.apache.zookeeper.Environment: Client environment:os.version=10.0
 INFO 2022-08-09 19:58:58,229 org.apache.zookeeper.Environment: Client environment:user.name=DELL
 INFO 2022-08-09 19:58:58,229 org.apache.zookeeper.Environment: Client environment:user.home=C:\Users\DELL
 INFO 2022-08-09 19:58:58,229 org.apache.zookeeper.Environment: Client environment:user.dir=D:\Dubbo-Project\dubbo-project\dubbo-service
 INFO 2022-08-09 19:58:58,229 org.apache.zookeeper.Environment: Client environment:os.memory.free=433MB
 INFO 2022-08-09 19:58:58,229 org.apache.zookeeper.Environment: Client environment:os.memory.max=4517MB
 INFO 2022-08-09 19:58:58,229 org.apache.zookeeper.Environment: Client environment:os.memory.total=531MB
 INFO 2022-08-09 19:58:58,257 org.apache.curator.framework.imps.CuratorFrameworkImpl: Starting
 INFO 2022-08-09 19:58:58,259 org.apache.zookeeper.ZooKeeper: Initiating client connection, connectString=192.168.91.200:2181 sessionTimeout=60000 watcher=org.apache.curator.ConnectionState@5f66549e
 INFO 2022-08-09 19:58:58,273 org.apache.zookeeper.ClientCnxnSocket: jute.maxbuffer value is 4194304 Bytes
 INFO 2022-08-09 19:58:58,288 org.apache.zookeeper.ClientCnxn$SendThread: Opening socket connection to server 192.168.91.200/192.168.91.200:2181. Will not attempt to authenticate using SASL (unknown error)
 INFO 2022-08-09 19:58:58,291 org.apache.zookeeper.ClientCnxn$SendThread: Socket connection established, initiating session, client: /192.168.91.1:65260, server: 192.168.91.200/192.168.91.200:2181
 INFO 2022-08-09 19:58:58,291 org.apache.curator.framework.imps.CuratorFrameworkImpl: Default schema
 INFO 2022-08-09 19:58:58,298 org.apache.zookeeper.ClientCnxn$SendThread: Session establishment complete on server 192.168.91.200/192.168.91.200:2181, sessionid = 0x10000b95fc20001, negotiated timeout = 40000
 INFO 2022-08-09 19:58:58,301 org.apache.curator.framework.state.ConnectionStateManager: State change: CONNECTED
 INFO 2022-08-09 19:58:58,302 org.apache.dubbo.remoting.zookeeper.support.AbstractZookeeperTransporter:  [DUBBO] No valid zookeeper client found from cache, therefore create a new client for url. zookeeper://192.168.91.200:2181/ConfigCenterConfig?check=true&config-file=dubbo.properties&group=dubbo&highest-priority=false&namespace=dubbo&timeout=3000, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:58,308 org.apache.dubbo.remoting.zookeeper.curator.CuratorZookeeperClient$CuratorConnectionStateListener:  [DUBBO] Curator zookeeper client instance initiated successfully, session id is 10000b95fc20001, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:58,315 org.apache.curator.framework.imps.EnsembleTracker: New config event received: {}
 WARN 2022-08-09 19:58:58,339 org.apache.dubbo.common.config.ConfigurationUtils:  [DUBBO] You specified the config centre, but there's not even one single config item in it., dubbo version: 2.7.4.1, current host: 10.19.242.91
 WARN 2022-08-09 19:58:58,339 org.apache.dubbo.common.config.ConfigurationUtils:  [DUBBO] You specified the config centre, but there's not even one single config item in it., dubbo version: 2.7.4.1, current host: 10.19.242.91
 WARN 2022-08-09 19:58:58,348 org.apache.dubbo.config.AbstractInterfaceConfig:  [DUBBO] There's no valid metadata config found, if you are using the simplified mode of registry url, please make sure you have a metadata address configured properly., dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:58,367 org.apache.dubbo.config.ServiceConfig:  [DUBBO] No valid ip found from environment, try to find valid host from DNS., dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:58,407 org.apache.dubbo.config.ServiceConfig:  [DUBBO] Export dubbo service com.frx01.service.UserService to local registry url : injvm://127.0.0.1/com.frx01.service.UserService?anyhost=true&application=dubbo-service&bean.name=ServiceBean:com.frx01.service.UserService&bind.ip=10.19.242.91&bind.port=20880&deprecated=false&dubbo=2.0.2&dynamic=true&generic=false&interface=com.frx01.service.UserService&methods=sayHello&pid=23436&release=2.7.4.1&revision=1.0-SNAPSHOT&side=provider&timestamp=1660046338353, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:58,408 org.apache.dubbo.config.AbstractInterfaceConfig:  [DUBBO] There's no valid monitor config found, if you want to open monitor statistics for Dubbo, please make sure your monitor is configured properly., dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:58,409 org.apache.dubbo.config.ServiceConfig:  [DUBBO] Register dubbo service com.frx01.service.UserService url dubbo://10.19.242.91:20880/com.frx01.service.UserService?anyhost=true&application=dubbo-service&bean.name=ServiceBean:com.frx01.service.UserService&bind.ip=10.19.242.91&bind.port=20880&deprecated=false&dubbo=2.0.2&dynamic=true&generic=false&interface=com.frx01.service.UserService&methods=sayHello&pid=23436&release=2.7.4.1&revision=1.0-SNAPSHOT&side=provider&timestamp=1660046338353 to registry registry://192.168.91.200:2181/org.apache.dubbo.registry.RegistryService?application=dubbo-service&dubbo=2.0.2&pid=23436&registry=zookeeper&release=2.7.4.1&timestamp=1660046338349, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:59,290 org.apache.dubbo.qos.server.Server:  [DUBBO] qos-server bind localhost:22222, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:59,293 org.apache.curator.framework.imps.EnsembleTracker: New config event received: {}
 INFO 2022-08-09 19:58:59,345 org.apache.dubbo.remoting.transport.AbstractServer:  [DUBBO] Start NettyServer bind /0.0.0.0:20880, export /10.19.242.91:20880, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:59,349 org.apache.dubbo.registry.support.AbstractRegistry:  [DUBBO] Load registry cache file C:\Users\DELL\.dubbo\dubbo-registry-dubbo-service-192.168.91.200:2181.cache, data: {com.frx01.service.UserService=empty://10.19.242.91:20880/com.frx01.service.UserService?anyhost=true&application=dubbo-service&bean.name=ServiceBean:com.frx01.service.UserService&bind.ip=10.19.242.91&bind.port=20880&category=configurators&check=false&deprecated=false&dubbo=2.0.2&dynamic=true&generic=false&interface=com.frx01.service.UserService&methods=sayHello&pid=14540&release=2.7.4.1&side=provider&timestamp=1660044770497}, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:59,350 org.apache.dubbo.remoting.zookeeper.support.AbstractZookeeperTransporter:  [DUBBO] find valid zookeeper client from the cache for address: zookeeper://192.168.91.200:2181/org.apache.dubbo.registry.RegistryService?application=dubbo-service&dubbo=2.0.2&interface=org.apache.dubbo.registry.RegistryService&pid=23436&release=2.7.4.1&timestamp=1660046338349, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:59,355 org.apache.dubbo.registry.support.AbstractRegistry:  [DUBBO] Register: dubbo://10.19.242.91:20880/com.frx01.service.UserService?anyhost=true&application=dubbo-service&bean.name=ServiceBean:com.frx01.service.UserService&deprecated=false&dubbo=2.0.2&dynamic=true&generic=false&interface=com.frx01.service.UserService&methods=sayHello&pid=23436&release=2.7.4.1&revision=1.0-SNAPSHOT&side=provider&timestamp=1660046338353, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:59,366 org.apache.dubbo.registry.support.AbstractRegistry:  [DUBBO] Subscribe: provider://10.19.242.91:20880/com.frx01.service.UserService?anyhost=true&application=dubbo-service&bean.name=ServiceBean:com.frx01.service.UserService&bind.ip=10.19.242.91&bind.port=20880&category=configurators&check=false&deprecated=false&dubbo=2.0.2&dynamic=true&generic=false&interface=com.frx01.service.UserService&methods=sayHello&pid=23436&release=2.7.4.1&revision=1.0-SNAPSHOT&side=provider&timestamp=1660046338353, dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:59,370 org.apache.dubbo.registry.support.AbstractRegistry:  [DUBBO] Notify urls for subscribe url provider://10.19.242.91:20880/com.frx01.service.UserService?anyhost=true&application=dubbo-service&bean.name=ServiceBean:com.frx01.service.UserService&bind.ip=10.19.242.91&bind.port=20880&category=configurators&check=false&deprecated=false&dubbo=2.0.2&dynamic=true&generic=false&interface=com.frx01.service.UserService&methods=sayHello&pid=23436&release=2.7.4.1&revision=1.0-SNAPSHOT&side=provider&timestamp=1660046338353, urls: [empty://10.19.242.91:20880/com.frx01.service.UserService?anyhost=true&application=dubbo-service&bean.name=ServiceBean:com.frx01.service.UserService&bind.ip=10.19.242.91&bind.port=20880&category=configurators&check=false&deprecated=false&dubbo=2.0.2&dynamic=true&generic=false&interface=com.frx01.service.UserService&methods=sayHello&pid=23436&release=2.7.4.1&revision=1.0-SNAPSHOT&side=provider&timestamp=1660046338353], dubbo version: 2.7.4.1, current host: 10.19.242.91
 INFO 2022-08-09 19:58:59,381 org.springframework.web.context.ContextLoader: Root WebApplicationContext initialized in 2032 ms
八月 09, 2022 7:58:59 下午 org.apache.coyote.AbstractProtocol start
信息: Starting ProtocolHandler ["http-bio-9000"]
```

:::

+ 启动dubbo-web

::: details 控制台输出

```java
[INFO] --- tomcat7-maven-plugin:2.1:run (default-cli) @ dubbo-web ---
[INFO] Running war on http://localhost:8000/
[INFO] Using existing Tomcat server configuration at D:\Dubbo-Project\dubbo-project\dubbo-web\target\tomcat
[INFO] create webapp with contextPath: 
八月 09, 2022 8:01:34 下午 org.apache.coyote.AbstractProtocol init
信息: Initializing ProtocolHandler ["http-bio-8000"]
八月 09, 2022 8:01:34 下午 org.apache.catalina.core.StandardService startInternal
信息: Starting service Tomcat
八月 09, 2022 8:01:34 下午 org.apache.catalina.core.StandardEngine startInternal
信息: Starting Servlet Engine: Apache Tomcat/7.0.37
八月 09, 2022 8:01:36 下午 org.apache.catalina.core.ApplicationContext log
信息: No Spring WebApplicationInitializer types detected on classpath
八月 09, 2022 8:01:36 下午 org.apache.coyote.AbstractProtocol start
信息: Starting ProtocolHandler ["http-bio-8000"]
```

:::

+ 访问[http://localhost:8000/user/sayHello.do](http://localhost:8000/user/sayHello.do)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220809/image.3rdamprn0mo0.webp)