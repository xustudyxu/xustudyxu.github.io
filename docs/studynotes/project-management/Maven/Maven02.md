---
title: Maven 高级
date: 2021-12-20 18:44:18
permalink: /pages/61c56d/
categories:
  - Maven
tags:
  - Maven
---
# Maven 高级

## 工程模块与模块划分(重点)

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/01.png)

### ssm_pojo拆分

+ 新建模块
+ 拷贝原始项目中对应的相关内容到ssm_pojo模块中
  + 实体类(User)
  + 配置文件(无)

1. 拷贝原始项目中对应的相关代码到该模块中，删除不必要的测试类和配置文件

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/02.png)

+ 这个模块的pom文件

::: details Click me to view the code

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.frx01</groupId>
    <artifactId>ssm-pojo</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

</project>
```

:::

### ssm_dao拆分

+ 新建模块
+ 拷贝原始项目中对应的相关内容到ssm_dao模块中
  + 数据层接口(UserDao)
  + 配置文件:保留与数据层相关配置文件(3个)
    + 注意：分页插件在配置中与SqlSessionFactoryBean绑定，需要保留
  + pom.xml：引入数据层相关坐标即可，删除springmvc相关坐标
    + spring
    + mybatis
    + spring整合mybatis
    + mysql
    + druid
    + pagehelper
    + 直接依赖ssm_pojo(对ssm_pojo模块执行install指令，将其安装到本地仓库)

1.  新建模块ssm_dao，拷贝原始项目中对应的相关代码到该模块中，删除不必要的测试类和非dao层的配置文件。


![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/03.png)

2. 对于dao层的pom文件内容如下（即所需的资源）：注意ssm_pojo资源的导入

::: details Click me to view the code

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.frx01</groupId>
    <artifactId>ssm_dao</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>
    <dependencies>

        <!--spring环境-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>5.1.9.RELEASE</version>
        </dependency>

        <!--导入文件资源pojo-->
        <dependency>
        <groupId>com.frx01</groupId>
        <artifactId>ssm-pojo</artifactId>
        <version>1.0-SNAPSHOT</version>
        </dependency>
        
        <!--mybatis环境-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.3</version>
        </dependency>
        <!--mysql环境-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.47</version>
        </dependency>
        <!--spring整合jdbc-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>5.1.9.RELEASE</version>
        </dependency>
        <!--spring整合mybatis-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>2.0.3</version>
        </dependency>
        <!--druid连接池-->
        <dependency>
            <groupId>com.alibaba</groupId>
            <artifactId>druid</artifactId>
            <version>1.1.16</version>
        </dependency>
        <!--分页插件坐标-->
        <dependency>
            <groupId>com.github.pagehelper</groupId>
            <artifactId>pagehelper</artifactId>
            <version>5.1.2</version>
        </dependency>
    </dependencies>

</project>
```

:::

### ssm_service拆分

+ 新建模块
+ 拷贝原始项目中对应的相关内容到ssm_service模块中
  + 业务层接口与实现类(UserService、UserServicelmpl)
  + 配置文件:保留与数据层相关配置文件(1个)
  + pom.xml:引入数据层相关坐标即可，删除springmvc相关坐标
    + spring
    + junit
    + spring整合junit
    + 直接依赖ssm_dao (对ssm_dao模块执行install指令，将其安装到本地仓库)
    + 间接依赖ssm_pojo (由ssm_dao模块负责依赖关系的建立)
  + 修改service模块spring核心配置文件名，添加模块名称，格式: applicationContext-service.xml
  + 修改dao模块spring核心配置文件名，添加模块名称，格式: applicationContext-dao.xml
  + 修改单元测试引入的配置文件名称，由单个文件修改为多个文件

1. 新建模块ssm_service，拷贝原始项目中对应的相关代码到该模块中，删除不必要的非service层的配置文件。注意保留测试类test。


![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/04.png)

2. 对于service层的pom文件内容如下（即所需的资源）：注意ssm_dao资源的导入，此外无需导入ssm_pojo的资源，因为他间接依赖了ssm_dao的ssm_pojo资源。对ssm_dao进行install命令。

::: details Click me to view the code

```xml
<dependencies>
    <!--导入ssm_dao的资源-->
    <dependency>
        <groupId>com.frx01</groupId>
        <artifactId>ssm_dao</artifactId>
        <version>1.0-SNAPSHOT</version>
    </dependency>
    <!--spring环境-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.1.9.RELEASE</version>
    </dependency>
    <!--junit单元测试-->
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
    </dependency>
    <!--spring整合junit-->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-test</artifactId>
        <version>5.1.9.RELEASE</version>
    </dependency>
</dependencies>
```

:::

### ssm_controller拆分

+ 新建模块(使用webapp模板)
+ 拷贝原始项目中对应的相关内容到ssm_controller模块中
  + 表现层控制器类与相关设置类(UserController、异常相关……)
  + 配置文件:保留与表现层相关配置文件(1个）、服务器相关配置文件(1个)
  + pom.xml:引入数据层相关坐标即可，删除springmvc相关坐标
    + spring
    + springMVC
    + jackson
    + servlet
    + tomcat服务器插件
    + 直接依赖ssm_service (对ssm_service模块执行install指令，将其安装到本地仓库)
    + 间接依赖ssm_dao、ssm_pojo
  + 修改web.xml配置文件中加载spring环境的配置文件名称，使用*通配，加载所有applicationContext-开始的配置文件

1. 利用骨架webapp新建maven模块ssm_controller。拷贝原始项目中对应的相关代码到该模块中，删除不必要的非controller层的配置文件。


![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/05.png)

2. 对于controller层的pom文件内容如下（即所需的资源）：注意ssm_service资源的导入和间接依赖：

::: details Click me to view the code

```xml
<dependencies>
  <!--导入ssm_service的资源-->
  <dependency>
    <groupId>com.frx01</groupId>
    <artifactId>ssm_service</artifactId>
    <version>1.0-SNAPSHOT</version>
  </dependency>

  <!--springmvc环境-->
  <dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.1.9.RELEASE</version>
  </dependency>
  <!--jackson相关坐标3个-->
  <dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.0</version>
  </dependency>
  <!--servlet环境-->
  <dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
  </dependency>
</dependencies>

<build>
  <!--设置插件-->
  <plugins>
    <!--具体的插件配置-->
    <plugin>
      <groupId>org.apache.tomcat.maven</groupId>
      <artifactId>tomcat7-maven-plugin</artifactId>
      <version>2.1</version>
      <configuration>
        <port>80</port>
        <path>/</path>
      </configuration>
    </plugin>
  </plugins>
</build>
```

:::

+ 修改web.xml中的加载spring环境的配置文件（dao层和service层），使用*进行通配

```xml
<context-param>
  <param-name>contextConfigLocation</param-name>
  <param-value>classpath*:applicationContext-*.xml</param-value>
</context-param>
```

`分模块开发`：

+ 模块中**仅包含**当前模块对应的功能类与配置文件
+ spring核心配置根据模块功能不同进行**独立制作**
+ 当前模块所依赖的模块通过导入坐标的形式加入当前模块后才可以使用
+ **web.xml需要加载所有的spring核心配置文件**

##  聚合(重点)

聚合：多模块的构建维护。

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/06.png)

+ 聚合作用：聚合用于快速构建maven工程，一次性构建多个项目或模块

1. 创建一个空模块ssm，该项目中只有一个pom文件

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/07.png)

2. 打包类型定义为pom，并定义当前模块进行构建时关联的其他模块名称

```xml
<!--定义该工程可以用于构建管理-->
    <packaging>pom</packaging>

    <!--管理的工程列表-->
    <modules>
        <!--具体的工程名称-->
        <module>../项目拆分/ssm-pojo</module>
        <module>../项目拆分/ssm_dao</module>
        <module>../项目拆分/ssm_service</module>
        <module>../项目拆分/ssm_controller</module>
    </modules>
```

注意：参与聚合操作的模块最终执行顺序与模块间的依赖关系有关，与配置顺序无关

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/08.png)

1. 执行mvn install并观察：

+ 各个模块的打包方式和打包顺序

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/09.png)

+ 打包耗时

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/10.png)

## 继承(重点)

### 概述和示例

继承:模块依赖关系维护

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/11.png)

+ 继承作用：通过继承可以实现在子工程中沿用父工程的配置
+ maven中的继承与java中的继承相似，在子工程中配置继承关系

1. 在父工程ssm中声明依赖管理，将子工程所有的依赖都声明在此处。利用标签

   `<dependencyManagement>`

```xml
    <!--声明此处依赖管理-->
    <dependencyManagement>
        <!--具体的依赖-->
        <dependencies>
            <!--spring环境-->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context</artifactId>
                <version>5.2.0.RELEASE</version>
            </dependency>
            <!--mybatis环境-->
            <dependency>
                <groupId>org.mybatis</groupId>
                <artifactId>mybatis</artifactId>
                <version>3.5.3</version>
            </dependency>
            <!--mysql环境-->
            <dependency>
                <groupId>mysql</groupId>
                <artifactId>mysql-connector-java</artifactId>
                <version>5.1.47</version>
            </dependency>
            <!--spring整合jdbc-->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-jdbc</artifactId>
                <version>5.1.9.RELEASE</version>
            </dependency>
            <!--spring整合mybatis-->
            <dependency>
                <groupId>org.mybatis</groupId>
                <artifactId>mybatis-spring</artifactId>
                <version>2.0.3</version>
            </dependency>
            <!--druid连接池-->
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid</artifactId>
                <version>1.1.16</version>
            </dependency>
            <!--分页插件坐标-->
            <dependency>
                <groupId>com.github.pagehelper</groupId>
                <artifactId>pagehelper</artifactId>
                <version>5.1.2</version>
            </dependency>
            <!--springmvc环境-->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-webmvc</artifactId>
                <version>5.1.9.RELEASE</version>
            </dependency>
            <!--jackson相关坐标3个-->
            <dependency>
                <groupId>com.fasterxml.jackson.core</groupId>
                <artifactId>jackson-databind</artifactId>
                <version>2.9.0</version>
            </dependency>
            <!--servlet环境-->
            <dependency>
                <groupId>javax.servlet</groupId>
                <artifactId>javax.servlet-api</artifactId>
                <version>3.1.0</version>
                <scope>provided</scope>
            </dependency>
            <!--junit单元测试-->
            <dependency>
                <groupId>junit</groupId>
                <artifactId>junit</artifactId>
                <version>4.12</version>
            </dependency>
            <!--spring整合junit-->
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-test</artifactId>
                <version>5.1.9.RELEASE</version>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

2. 在子工程中定义父工程

```xml
  <!--定义该工程的父工程-->
  <parent>
    <groupId>com.frx01</groupId>
    <artifactId>ssm</artifactId>
    <version>1.0-SNAPSHOT</version>
    <!--填写父工程的pom文件的相对路径-->
    <relativePath>../../ssm/pom.xml</relativePath>
  </parent>
  <modelVersion>4.0.0</modelVersion>
```

此时，子工程的依赖的版本号可以省略，例如：

```xml
        <!--导入资源文件dao-->
        <dependency>
            <groupId>com.frx01</groupId>
            <artifactId>ssm_dao</artifactId>
        </dependency>
```

+ 同理，插件的管理也可以在父工程中声明:

```xml
<build>
    <pluginManagement>
        <!--设置插件-->
        <plugins>
            <!--具体的插件配置-->
            <plugin>
                <groupId>org.apache.tomcat.maven</groupId>
                <artifactId>tomcat7-maven-plugin</artifactId>
                <version>2.1</version>
                <configuration>
                    <port>8080</port>
                    <path>/</path>
                </configuration>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```

2. 子工程中插件的版本和相关配置就可以省略

```xml
<build>
  <!--设置插件-->
  <plugins>
    <!--具体的插件配置-->
    <plugin>
      <groupId>org.apache.tomcat.maven</groupId>
      <artifactId>tomcat7-maven-plugin</artifactId>
    </plugin>
  </plugins>
</build>
```

### 继承的资源

以下资源，子工程都可以从父工程中继承：

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/12.png)

### 继承和聚合的区别

+ 作用：

  + 聚合用于快速构建项目
  + 继承用于快速配置

+ 相同点：
  + 聚合与继承的pom.xml文件打包方式均为pom，可以将两种关系制作到同一个pom文件中
  + 聚合与继承均属于设计型模块，并无实际的模块内容
+ 不同点：
  + 聚合是在当前模块中配置关系，聚合可以感知到参与聚合的模块有哪些
  + 继承是在子模块中配置关系，父模块无法感知哪些子模块继承了自己 

## 属性(重点)

### 版本统一的重要性

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/13.png)

  ### 自定义属性

+ 作用：等同于定义变量，方便统一维护。
+ 配置位置：父工程和pom文件。
+ 标签：`<properties>`
+ 调用格式：`${}`

1. 在父工程中的pom文件内：

```xml
 <!--定义自定义属性-->
    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
        <spring.version>5.1.9.RELEASE</spring.version>
    </properties>
```

2. 调用：

```xml
            <dependency>
                <groupId>org.springframework</groupId>
                <artifactId>spring-context</artifactId>
                <version>${spring.version}</version>
            </dependency>
```

### 内置属性

+ 作用：使用maven内置属性，快速配置

例如，父工程和子工程的版本号一样，可以直接使用父工程的版本内置属性`${version}`：

```xml
    <!--添加自己工程的依赖-->
            <dependency>
                <groupId>com.frx01</groupId>
                <artifactId>ssm_pojo</artifactId>
                <version>${version}</version>
            </dependency>
            <dependency>
                <groupId>com.frx01</groupId>
                <artifactId>ssm_dao</artifactId>
                <version${version}</version>
            </dependency>
            <dependency>
                <groupId>com.frx01</groupId>
                <artifactId>ssm_service</artifactId>
                <version${version}</version>
            </dependency>
```

### setting属性

+ 作用：使用Maven配置文件setting.xml中的标签属性，用于动态配置
+ 调用格式：

```xml
${settings.localRepository}
```

### Java系统属性

+ 作用：读取Java系统属性、
+ 调用格式：

```xml
${user.home}
```

+ 系统属性查询方式

```shell
mvn help:system
```

### 环境变量属性

+ 作用：使用Maven配置文件setting.xml中的标签属性，用于动态配置
+ 调用格式：

```xml
${env.JAVA_HOME}
```

+ 环境变量属性查询方式

```xml
mvn help:system
```

## 版本管理

### 工程版本区分

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/14.png)

+ `SNAPSHOT`快照版本
  + 项目开发过程中，为方便团队成员合作，解决模块间相互依赖和时时更新的问题，开发者对每个模块进行构建的时候，输出的临时性版本叫快照版本（测试阶段版本）

  + 快照版本会随着开发的进展不断更新
+ `RELEASE`发布版本
  + 项目开发到进入阶段里程碑后，向团队外部发布较为稳定的版本，这种版本所对应的构件文件是稳定的，即便进行功能的后续开发，也不会改变当前发布版本内容，这种版本称为发布版本 


### 工程版本号约定

+ 约定规范：
  + `<主版本>.<次版本>.<增量版本>.<里程碑版本>`
  + 主版本∶表示项目重大架构的变更，如∶spring5相较于spring4的迭代次版本∶表示有较大的功能增加和变化，或者全面系统地修复漏洞

  + 增量版本∶表示有重大漏洞的修复
  + 里程碑版本∶表明一个版本的里程碑（版本内部）。这样的版本同下一个正式版本相比，相对来说不是很稳定，有待更多的测试

+ 范例：
  + `5.1.9.RELEASE`

## 资源配置

资源配置多文件维护：

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/15.png)

配置文件引用pom属性：

	+ 作用：在任意配置文件中加载pom文件中定义的属性
	+ 调用格式：`${ }`

1. 例如jdbc.properties要读取父工程pom文件中的属性。首先在父工程pom文件中的\<build>标签中：


```xml
<bulid>
    <!--配置资源文件对应的信息-->
    <resources>
        <resource>
            <!--各个项目下所有的资源路径的目录-->
            <directory>${project.basedir}/src/main/resources</directory>
            <!--开启对配置文件的资源加载过滤-->
            <filtering>true</filtering>
        </resource>
    </resources>

    <!--针对test目录下的配置资源文件对应的信息-->
    <testResources>
        <testResource>
            <!--各个项目下所有的资源路径的目录-->
            <directory>${project.basedir}/src/test/resources</directory>
            <!--开启对配置文件的资源加载过滤-->
            <filtering>true</filtering>
        </testResource>
    </testResources>
</bulid>
```

设置属性:

```xml
<!--定义自定义的属性-->
<properties>
    <maven.compiler.source>11</maven.compiler.source>
    <maven.compiler.target>11</maven.compiler.target>
    <spring.version>5.1.9.RELEASE</spring.version>
    <junit.version>4.12</junit.version>
    <jdbc.url>jdbc:mysql://127.0.0.1:3306/ssm_db?useSSL=false</jdbc.url>
</properties>
```

jdbc.properties内容：

```properties
jdbc.driver=com.mysql.jdbc.Driver
# 引用pom文件中的属性
jdbc.url=${jdbc.url}
jdbc.username=root
jdbc.password=12345678
```

## 多环境开发配置

多环境兼容：

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/16.png)

1. 在父工程pom文件中：

```xml
    <!--创建多环境-->
    <profiles>
        <!--定义具体的环境:生产环境-->
        <profile>
            <!--定义环境对应的唯一名称-->
            <id>pro_env</id>
            <!--定义环境中专用的属性值-->
            <properties>
                <jdbc.url>jdbc:mysql://127.1.1.1:3306/maven</jdbc.url>
            </properties>
        </profile>

        <!--定义具体的环境:生产环境-->
        <profile>
            <id>dep_env</id>
            <!--定义环境中专用的属性值-->
            <properties>
                <jdbc.url>jdbc:mysql://127.2.2.2:3306/maven</jdbc.url>
            </properties>
        </profile>
    </profiles>
```

1. 加载指定的环境

+ 调用格式：

```shell
mvn 指令 -P 环境id
```

+ 范例:

```shell
mvn install -P dev_env
```

例如：新建一个maven配置，在开发环境执行install命令：

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/17.png)

执行后查看jdbc.properties文件：

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/18.png)

可见是按照开发环境的地址127.2.2.2进行项目安装的

##  跳过测试(了解)

> 应用场景

1. 整体模块功能未开发
2. 模块中某个功能未开发完毕
3. 单个功能更新调试导致其他功能失败
4. 快速打包（因为测试需要耗费时间）
5. ....

### 使用命令跳过测试

+ 命令

```shell
mvn 指令 -D skipTests
```

+ 注意事项
  + 执行的指令生命周期必须包含测试环节

### 使用界面操作跳过测试

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/19.png)

### 使用配置跳过测试

```xml
             <plugin>
                    <!--配置跳过测试-->
                    <artifactId>mawen-surefire-plugin</artifactId>
                    <version>2.22.1</version>
                    <configuration>
                        <!--设置跳过测试-->
                        <skipTests>true</skipTests>
                        <!--包含指定的测试用例-->
                        <includes>
                            <include>**/User*Test.java</include>
                        </includes>
                        <!--排除指定的测试用例-->
                        <excludes>
                            <exclude>**/User*TestCase.java</exclude>
                        </excludes>
                    </configuration>
                </plugin>
```

## 私服(重点)

分模块开发：

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/20.png)

## Nexus介绍

+ Nexus是Sonatype公司的一款maven私服产品
+ [下载地址]([Download (sonatype.com)](https://help.sonatype.com/repomanager3/product-information/download))

+ 在bin目录下启动nexus服务

```shell
nexus /run nexus
```

1. 访问(默认端口8081)

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/21.png)

2. 停止服务运行

```shell
./bin/nexus stop
```

+ 修改基础配置信息
  + 安装路径下etc目录中nexus-default.properties文件保存有nexus基础配置信息，例如默认访问端口
+ 修改服务器运行配置信息
  + 安装路径下bin目录中nexus.vmoptions文件保存有nexus服务器启动对应的配置信息，例如默认占用内存空间

## Nexus操作

### 仓库分类和手工资源上传

私服资源的获取：下图所示，我们要把快照版的资源放在一个仓库里，把发行版的资源放在一个仓库里，第三方公共资源放在一个仓库里，这样方便进行管理，势必要对仓库进行分类和分组。


![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/22.png)

> 仓库分类

+ 宿主仓库`hosted`：保存无法从中央仓库获取的资源
  + 自主研发
  + 第三方非开源项目
+ 代理仓库`proxy`：代理远程仓库，通过nexus访问其他公共仓库，例如中央仓库

+ 仓库组`group`：
  + 将若干仓库组成一个群组，简化配置
  + 仓库组不能保存资源，属于设计型仓库

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/23.png)

1. 新建一个仓库，例如frx01-release

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/24.png)

2. 仓库类型选择宿主仓库`maven2(hosted)`

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/25.png)

3. 创建好后，将其加入到maven-public仓库组中，方便管理
   ![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/26.png)

4. 将ssm-pojo打包好的jar包上传至`frx01-release`

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/27.png)

5. 查看仓库里的ssm-pojo资源

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/28.png)

### 本地仓库访问私服

idea环境中的资源上传与下载：

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/29.png)

1. 配置本地仓库访问私服的权限（`setting.xml`）

```xml
<!--配置访问服务器的权限，用户名密码-->
<servers>
	<server>
		<id>frx01-release</id>
      	<username>admin</username>
      	<password>admin</password>
	</server>
	<server>
		<id>frx01-snapshots</id>
      	<username>admin</username>
      	<password>admin</password>
	</server>
</servers>
```

2. 配置本地仓库资源的下载来源

```xml
	  <!-- 配置具体的仓库的下载镜像 -->
	  <mirror>
		  <!-- 此镜像的唯一标识符，用来区分不同的mirror元素 -->
		  <id>nexus-aliyun</id>
		  <!-- 对哪种仓库进行镜像，简单说就是替代哪个仓库 -->
		  <mirrorOf>central</mirrorOf>
		  <!-- 镜像名称 -->
		  <name>Nexus aliyun</name>
		  <!-- 镜像URL -->
		  <url>http://maven.aliyun.com/nexus/content/groups/public</url>
	  </mirror>
	<!--其他的从私服下载-->
	  <mirror>
		  <id>nexus-frx01</id>
		  <mirrorOf>*</mirrorOf>
		  <url>http://localhost:8081/repository/maven-public/</url>
	  </mirror>
```

3. 配置当前项目ssm访问私服上传资源的保存位置（`pom.xml`）

```xml
    <!--发布配置管理-->
    <distributionManagement>
        <repository>
            <!--发布到发行版的仓库，注意这里的id必须和setting.xml配置的id相同-->
            <id>frx01-release</id>
            <!--发行版仓库的url-->
            <url>http://localhost:8081/repository/frx01-release/</url>
        </repository>
        <snapshotRepository>
            <!--发布到快照版的仓库-->
            <id>frx01-snapshot</id>
            <!--快照版仓库的url-->
            <url>http://localhost:8081/repository/frx01-snapshots/</url>
        </snapshotRepository>
    </distributionManagement>
```

+ 执行deploy命令

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/02/30.png)

