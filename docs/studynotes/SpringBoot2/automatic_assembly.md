# 了解自动装配原理

[[toc]]

## SpringBoot特点

### 依赖管理

+ 依赖管理

```xml
  	<!--依赖管理-->
	<parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.4.RELEASE</version>
    </parent>
	<!--它的父项目-->
	<parent>
    	<groupId>org.springframework.boot</groupId>
    	<artifactId>spring-boot-dependencies</artifactId>
    	<version>2.3.4.RELEASE</version>
    </parent>
	<!--几乎声明了所有开发中几乎常用的jar的版本号，自动版本仲裁机制-->
```

+ 开发导入starter场景启动器

1. 见到很多spring-boot-starter-*:\*就是某种场景
2. 只要引入starter,**这个场景的所有常规需要的依赖**我们都会自动引入

3. SpringBoot所有支持的[场景](https://docs.spring.io/spring-boot/docs/current/reference/html/using-spring-boot.html#using-boot-starter)
4. 见到的  *-spring-boot-starter： 第三方为我们提供的简化开发的场景启动器。
5. 所有场景启动器最底层的依赖

```xml
  	<dependency>
      	<groupId>org.springframework.boot</groupId>
      	<artifactId>spring-boot-starter</artifactId>
      	<version>2.3.4.RELEASE</version>
      	<scope>compile</scope>
    </dependency>
```

+ 查看spring-boot-starter-web的分析依赖树

![1647425124813](./images/03/01.png)

+ 无需关注版本号，**自动版本仲裁**

1. 引入依赖默认都可以不写版本
2. 引入非版本仲裁的jar,一定要写版本号

+ 可以修改版本号

1. 查看spring-boot-dependencies里面规定当前依赖版本用的key
2. 在当前项目里面重写配置

```xml
 	<properties>
        <mysql.version>5.1.43</mysql.version>
    </properties>
```

### 自动配置

