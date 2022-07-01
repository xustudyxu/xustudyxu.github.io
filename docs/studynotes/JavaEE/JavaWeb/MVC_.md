---
title: MVC 三层架构
date: 2022-04-25 22:38:12
permalink: /pages/8bc1c4/
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# MVC 三层架构

[[toc]]

## MVC 设计模式的由来

MVC 模式的概念：

MVC 模式并不是 JavaWeb 项目中独有的，MVC 是一种软件工程中的一种软件架构模式，把软件系统分为三个基本部分：模型（Model）、视图（View）和控制器（Controller），是一种软件设计的典范。

MVC 模式的详解:

- 控制器 Controller：控制请求的处理逻辑，对请求进行处理，负责请求转发，
- 视图 View：用户看到并与之交互的界面，比如 HTML（静态资源），JSP（动态资源）等等。
- 模型 Model：一种企业规范，也就是业务流程、状态的处理以及业务规则的规定。业务流程的处理过程对其他层来说是不透明的，模型接受视图数据的请求，并返回最终的处理结果。业务模型的设计可以说是 MVC 的核心。

MVC 模式的应用：

MVC 模式被广泛用于 Java 的各种框架中，比如早期的 Struts2 框架和目前市面上主流的 SpringMVC 框架都用到了这种思想。

## MVC 三层架构

Model View Controller 模型、视图、控制器

### 早些年

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.5danx0e3lhw0.webp)

用户直接访问控制层，控制层就可以直接操作数据库

```java
serclet----CRUD----数据库
```

弊端:程序十分臃肿，不利于维护 

```java
servlet的代码中：处理请求、响应、视图跳转、处理JDBC、处理业务代码、处理逻辑代码
```

架构:没有什么是加一层解决不了的!

```java
程序员调用jdbc
|
jdbc
|
MySQL Oracle SqlServer...
```

### 如今

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220423/image.4itz02rhe2g0.webp)

Model

- 业务处理：业务逻辑（Service）
- 数据持久层：CRUD （Dao）

View

- 展示数据
- 提供链接发起Servlet请求（a，form，img…）

Controller（Servlet）

- 接受用户的请求：（req：请求参数、Session信息…）
- 交给业务层处理对应的代码
- 控制视图的跳转

```java
登录---->接受用户的登陆请求---->处理用户的请求(获取用户登录的参数，username,password)---->交给业务层处理登陆业务(判断用户名密码是否正确:事务)---->Dao层查询用户名和密码是否正确---->数据库
```

