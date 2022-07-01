---
title: Maven 基础
date: 2021-12-20 18:44:18
permalink: /pages/f5fbac/
categories:
  - Maven
tags:
  - Maven
---
# Maven 基础

## Maven 下载

+ 官网:[Maven – Welcome to Apache Maven](http://maven.apache.org/)

+ 下载地址:[Maven – Download Apache Maven](http://maven.apache.org/download.cgi)

![00](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/00.png)

## Maven 安装

+ Maven属于绿色版软件，解压即安装

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/01.png)

## Maven 环境变量配置

+ **依赖Java,需要配置JAVA_HOME**
+ **设置MAVEN自身的运行环境，需要配置MAVEN_HOME**

 新建系统变量

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/03.png)

编辑系统Path变量，新建

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/04.png)

+ **测试环境配置结果**

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/09.png)

## Maven 基础概念

### 仓库

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/02.png)

+ **仓库：用于存储资源，包含各种jar包**
+ 仓库分类:
  + <font color=#DC4040 size=4 face="黑体">本地仓库:自己电脑上存储资源的仓库，连接远程仓库获取资源</font>
  + <font color=#DC4040 size=4 face="黑体">远程仓库:非本机电脑上的仓库，为本地仓库提供资源</font>
    + <font color=#DC4040 size=4 face="黑体">中央仓库：Maven团队维护，存储所有资源的仓库</font>
    + <font color=#DC4040 size=4 face="黑体">私服：部门/公司范围内存储资源的仓库，从中央仓库获取资源</font>
+ 私服的作用:
  + **保存具有版权的资源，包含购买或自主研发的jar**
    + **中央仓库中的jar都是开源的，不能存储具有版权的资源**
  + **一点范围内共享资源，仅对内部开放，不对外共享**

### 坐标

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/05.png)

+ 什么是坐标?

  ​	<font color=#DC4040 size=4 face="黑体">Maven中的坐标用于描述仓库中资源的位置</font>

  ​	[Central Repository: (maven.org)](https://repo1.maven.org/maven2/)

+ Maven坐标主要组成

  + [Maven 存储库：搜索/浏览/探索](https://mvnrepository.com/)

  ​	**groupId:定义当前Maven项目隶属组织名称(通常是域名反写，例如:org.mybaits)**

  ​	**artifactId:定义当前Maven项目名称(通常是模块名称，例如CRM、SMS)**

  ​	**version:定义当前项目版本号**

  > **packaging:定义该项目的打包方式**

+ Maven坐标的作用

  ​	**使用唯一标识，唯一性定位资源位置，通过该标识符可以将资源的识别与下载工作交由机器完成**

### 本地仓库配置

+ Maven启动后，会自动保存下载的资源到本地仓库

  在maven文件/conf/settings.xml配置文件中

  + 默认位置

    ```xml
    <localRepository>${user.home}/.m2/repository</localRepository>
    ```

    当前目录位置为登录用户名所在目录下的.m2文件夹中

  + 自定义位置

    ```xml
    <localRepository>D:\maven\repository</localRepository>
    ```

    当前目录位置为D:\maven\repository文件夹中

### 远程仓库配置

+ Maven默认连接的仓库位置

  在maven文件/lib/pom-4.0.0.xml配置文件中

  ```xml
    <repositories>
      <repository>
        <id>central</id>
        <name>Central Repository</name>
        <url>https://repo.maven.apache.org/maven2</url>
        <layout>default</layout>
        <snapshots>
          <enabled>false</enabled>
        </snapshots>
      </repository>
    </repositories>
  ```

+ 镜像仓库配置

  + 在setting文件中配置阿里云镜像仓库

  ```xml
  <mirrors>
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
  </mirrors>
  ```

### 全局setting与用户setting区别

+ **全局setting定义了当前计算器中Maven的公共配置**
+ **用户setting定义了当前用户的配置**

## 第一个Maven项目(手工制作)

### Maven 工程目录结构

```
├── Project
│   └── java-project
│    	└── src
│       	├──	main
│          	|	└── java
│           |	└── resources
│       	├── test
│           	└── java
│          		└── resources
```

+ 在src同级目录下创建pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project 
    xmlns="http://maven.apache.org/POM/4.0.0" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <groupId>com.study</groupId>
    <artifactId>project-java</artifactId>
    <version>1.0</version>
    <packaging>jar</packaging>
  <dependencies>
      <dependency>
          <groupId>junit</groupId>
          <artifactId>junit</artifactId>
          <version>4.12</version>
      </dependency>
    </dependencies>
    </project>
```

### Maven 项目构建命令

+ Maven构建命令使用mvn开头，后面添加功能参数，可以一次执行多个命令，使用空格分割
  + <font color=#DC4040 size=4 face="黑体">mvn compile </font>            **#编译**
  + <font color=#DC4040 size=4 face="黑体">mvn clean</font>                  **#清理**
  + <font color=#DC4040 size=4 face="黑体">mvn test</font>                    **#测试**

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/06.png)

> 测试完之后，target里面有个文件夹surefire-reports里面有两个文件，一个text，还有一个xml文件，是target提供的测试报告。

- <font color=#DC4040 size=4 face="黑体">mvn package</font>             **#打包**

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/07.png)

> 打包里面会先进行编译，然后测试程序的编译，执行test，测试结果输出，最后执行打包指令。(保证正确性)

- <font color=#DC4040 size=4 face="黑体">mvn install</font>             **#安装到本地仓库**

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/08.png)

> groupId决定了一层目录，项目名称又决定了一层目录，版本号又决定了一层目录

### Maven 插件创建工程

+ 创建工程

```
mvn archetype:generate
-DgroupId={project-packaging} 
-DartifactId={project-name} 
-DarchetypeArtifactId=maven-archetype-quickstart
-DinteractiveMode=false
```

+ 创建java工程

```
mvn archetype:generate -DgroupId=com.frx -DartifactId=java-project -
DarchetypeArtifactId=maven-archetype-quickstart -Dversion=0.0.1-snapshot -
DinteractiveMode=false
```

+ 创建web工程

```
mvn archetype:generate -DgroupId=com.frx -DartifactId=web-project -
DarchetypeArtifactId=maven-archetype-webapp -Dversion=0.0.1-snapshot -
DinteractiveMode=false
```

![10](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/10.png)

+ web工程与java工程的区别

![11](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/11.png)

## 第一个Maven项目(IDEA生成)

### 配置Maven

**新建一个空白项目，找到File->Settings->Maven,修改Maven_home path、User setting file和Local respository。**

![12](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/12.png)

### 手工创建Java项目

1. **新建Module,选择右侧的Maven,点击Next，可以指定工程位置，然后GroupId起名称,Artifacted工程名称，Next,Finish.**


![13](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/13.png)

2. **选中main中的java,点击蓝色的Sources，选中resources,点击灰色的Resources,选中test,右键，new Floder...,选中test中的java,点击绿色的Tests，选中resources,点击红绿三角的Test Resorces，OK。**

![14](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/14.png)

+ test

![15](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/15.png)

+ 也可以

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/16.png)

> 好处：可以打断点，添加一个运行，就可以进行调试

### 原型创建Java项目

+ 使用模板创建Java工程(搜索quick start)

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/17.png)

### 原型创建Web项目

+ 使用模板创建Web工程(搜索Webapp)

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/18.png)

+ 搞定

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/19.png)

### 插件

+ Tomcat7运行插件

```xml
<build>
	<plugins>
		<plugin>
			<groupId>org.apache.tomcat.maven</groupId>
			<artifactId>tomcat7-maven-plugin</artifactId>
			<version>2.1</version>
			<configuration>
				<port>9000</port>
				<path>/</path>
			</configuration>
		</plugin>
	</plugins>
</build>

```

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/21.png)

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/20.png)

> 换了个端口 访问成功了

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
    <!--指定pom的模型版本-->
    <modelVersion>4.0.0</modelVersion>

    <!--打包方式，web工程打包为war,java工程打包为jar-->
    <packaging>war</packaging>

    <name>web01</name>
    <!--name可以删掉-->

    <groupId>com.frx02</groupId>
    <!--组织Id-->

    <!--项目id-->
    <artifactId>web01</artifactId>

    <!--版本号:release(完整版),snapshot(开发版)-->
    <version>1.0-SNAPSHOT</version>

    <!--设置当前工程的所有依赖-->
    <dependencies>
    <!--具体的依赖-->
        <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <!--  构建-->
    <build>
      <plugins>
        <plugin>
          <groupId>org.apache.tomcat.maven</groupId>
          <artifactId>tomcat7-maven-plugin</artifactId>
          <version>2.1</version>
          <configuration>
            <port>9000</port>
            <path>/</path>
          </configuration>
        </plugin>
      </plugins>
    </build>
</project>

```

## 依赖管理

### 依赖配置

+ **依赖指当前项目运行所需的jar,一个项目可以设置多个依赖**

+ 格式:

  ```xml
    <! --设置当前项目所依赖的所有jar-->
    <dependencies>
        <! --设置具体的依赖-->
      <dependency>
          <! --设置所属群组id-->
        <groupId>junit</groupId>
          <! --依赖所属项目id-->
        <artifactId>junit</artifactId>
          <! --依赖版本号-->
        <version>4.13</version>
        <scope>test</scope>
      </dependency>
    </dependencies>
  ```

### 依赖传递

+ 依赖具有**传递性**
  + **直接依赖:在当前项目中通过依赖配置建立的依赖关系**
  + **间接依赖:被资源的资源如果依赖其他资源，当前项目间接依赖其他资源**

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/22.png)

> 比如，把项目三作为一个资源配置到项目二 注意:**不考虑依赖范围，项目二就可以使用项目三中所有的依赖**

+ 在项目二的pom.xml配置依赖

```xml
<dependencies>
    <dependency>
      <groupId>com.frx03</groupId>    
      <artifactId>project03</artifactId>
      <version>1.0-SNAPSHOT</version>
    </dependency>
  </dependencies>
```

### 依赖传递冲突问题

+ **路径优先:当依赖中出现相同的资源时，层级越深，优先级越低，层级越低，优先级越高**
+ **声明优先:当资源在相同层级被依赖时，配置顺序靠前的覆盖配置顺序靠后的**

> + 特殊优先:当同级配置了相同资源的不同版本，后配置的覆盖先配置的

> 根据某一个项目为根，对它所依赖的资源进行深度标注，比如说直接依赖，称为1度资源

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/23.png)

### 可选依赖

> 控制别人能不能看到自己的东西

+ **可选依赖指对外隐藏当前所依赖的资源---不透明**
+ **<optional>true</optional>**

> 例如:将项目二中log4j设为可选依赖


  ```xml
    <dependencies>
      <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.14</version>
        <optional>true</optional>
      </dependency>
    </dependencies>
  ```

  ### 排除依赖

+ **排除依赖指主动断开依赖的资源，被排除的资源无需指定版本--不需要**(排除所有的版本)

> 你传递过来，我不要
>
> 例如:在项目二中排除从项目三依赖的资源log4j

```xml
    <dependency>
      <groupId>com.frx03</groupId>
      <artifactId>project03</artifactId>
      <version>1.0-SNAPSHOT</version>
      <exclusions>
        <exclusion>
          <groupId>log4j</groupId>
          <artifactId>log4j</artifactId>
        </exclusion>
      </exclusions>
    </dependency>
```

### 依赖范围

+ **依赖的jar默认情况可以在任何地方使用，可以通过scope标签设定其作用范围**
+ 作用范围
  + **主程序范围有效(main文件夹范围内)**
  + **测试程序范围有效(test文件夹范围内)**
  + **是否参与打包(package指定范围内)**

| scope         | 主代码 | 测试代码 | 打包 | 范例        |
| ------------- | ------ | -------- | ---- | ----------- |
| compile(默认) | Y      | Y        | Y    | log4j       |
| test          |        | Y        |      | junit       |
| provided      | Y      | Y        |      | servlet-api |
| runtime       |        |          | Y    | jdbc        |

+ **<scope></scope>**

> 例如:把项目中mybatis依赖配置范围为test

```xml
 <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.3</version>
      <scope>test</scope>
    </dependency>
```

### 依赖范围传递性

+ 带有依赖范围的资源在进行传递时，作用范围将受到影响

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/24.png)

> 例如：项目一依赖项目二的资源，把项目一看成直接依赖，项目一的依赖范围为compile;项目二看成间接依赖,项目二的mybaits依赖范围为runtime.最后在项目一中依赖生成的mybatis依赖范围为runtime

> **注意:这里的直接依赖和间接依赖是对依赖生成后的结果来说的**(例如项目一依赖生成的mybatis)

## 生命周期与插件

### 项目构建生命周期

+ **Maven构建生命周期描述的是一次构建过程经历了多少个事件**

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/25.png)

+ Maven对项目构建的声明周期划分为3套
  + <font color=#DC4040 size=4 face="黑体">clean:清理工作</font>
  + <font color=#DC4040 size=4 face="黑体">default:核心工作，例如编译，测试，打包，部署等</font>
  + <font color=#DC4040 size=4 face="黑体">site:产生报告，发布站点等</font>

### clean生命周期

+ pre-clean                  执行一些需要在clean之间完成的工作
+ clean                         移除所有上一次构建生成的文件
+ post-clean                执行一些需要在clean之后立刻完成的工作

### default构建生命周期

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/26.png)

+ 注意，如果执行compile，会把compile上面的全部执行完，以此类推。

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/27.png)

### site构建生命周期

+ pre-site               执行一些需要在生成站点文档之前完成的工作
+ site                       生成项目的站点文档
+ post-site              执行一些需要在生成站点文档之后完成的工作，并且为部署做准备
+ site-depoly          将生成的站点文档部署到特定的服务器上

### 插件

+ **插件与生命周期内的阶段绑定，在执行到对应生命周期时执行对应的插件功能**
+ **默认maven在各个生命周期上绑定有预设的功能**
+ **通过插件可以自定义其他功能**

> 添加打印maven源代码的插件

```xml
<build>
  <plugins>
    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-source-plugin</artifactId>
      <version>2.2.1</version>
      <executions>
        <execution>
          <goals>
            <goal>jar</goal>
          </goals>
          <phase>generate-test-resources</phase>
        </execution>
      </executions>
    </plugin>
  </plugins>
  </build>
```

+ install

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/30.png)

> 安装到本地仓库，有两个jar包，一个是它本身的，另一个是maven-sources

> 当然，也可以添加

```xml
<goal>test-jar</goal>
```

> 这时安装到本地，有三个jar包,有两个jar包，一个是它本身的，另一个是maven-sources，还有一个是测试源代码

![16](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Maven/images/01/29.png)

> 生命周期指的是运行的阶段，插件是为了支持生命周期那些事情；生命周期可以理解为几岁，插件可以理解为几岁干的那件事.

