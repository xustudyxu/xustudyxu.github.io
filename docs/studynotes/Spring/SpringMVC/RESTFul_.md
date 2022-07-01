---
title: RESTFul
date: 2022-01-19 17:57:23
permalink: /pages/52337a/
categories:
  - SpringMVC
tags:
  - SpringMVC
---
# RESTFul

[[toc]]

## RESTFul简介

REST：**Re**presentational **S**tate **T**ransfer，表现层资源状态转移。

+ a>资源

资源是一种看待服务器的方式，即，将服务器看作是由很多离散的资源组成。每个资源是服务器上一个可命名的抽象概念。因为资源是一个抽象的概念，所以它不仅仅能代表服务器文件系统中的一个文件、数据库中的一张表等等具体的东西，可以将资源设计的要多抽象有多抽象，只要想象力允许而且客户端应用开发者能够理解。与面向对象设计类似，资源是以名词为核心来组织的，首先关注的是名词。一个资源可以由一个或多个URI来标识。URI既是资源的名称，也是资源在Web上的地址。对某个资源感兴趣的客户端应用，可以通过资源的URI与其进行交互。

+ b>资源的表述

资源的表述是一段对于资源在某个特定时刻的状态的描述。可以在客户端-服务器端之间转移（交换）。资源的表述可以有多种格式，例如HTML/XML/JSON/纯文本/图片/视频/音频等等。资源的表述格式可以通过协商机制来确定。请求-响应方向的表述通常使用不同的格式。

+ c>状态转移

状态转移说的是：在客户端和服务器端之间转移（transfer）代表资源状态的表述。通过转移和操作资源的表述，来间接实现操作资源的目的。

## RESTful的实现

具体说，就是 HTTP 协议里面，四个表示操作方式的动词：GET、POST、PUT、DELETE。

它们分别对应四种基本操作：GET 用来获取资源，POST 用来新建资源，PUT 用来更新资源，DELETE 用来删除资源。

REST 风格提倡 URL 地址使用统一的风格设计，从前到后各个单词使用斜杠分开，不使用问号键值对方式携带请求参数，而是将要发送给服务器的数据作为 URL 地址的一部分，以保证整体风格的一致性。

| 操作     | 传统方式         | REST风格                |
| -------- | ---------------- | ----------------------- |
| 查询操作 | getUserById?id=1 | user/1-->get请求方式    |
| 保存操作 | saveUser         | user-->post请求方式     |
| 删除操作 | deleteUser?id=1  | user/1-->delete请求方式 |
| 更新操作 | updateUser       | user-->put请求方式      |

## HiddenHttpMethodFilter

由于浏览器只支持发送get和post方式的请求，那么该如何发送put和delete请求呢？

SpringMVC 提供了 **HiddenHttpMethodFilter** 帮助我们**将 POST 请求转换为 DELETE 或 PUT 请求**

**HiddenHttpMethodFilter** 处理put和delete请求的条件：

a>当前请求的请求方式必须为post

b>当前请求必须传输请求参数_method

满足以上条件，**HiddenHttpMethodFilter** 过滤器就会将当前请求的请求方式转换为请求参数_method的值，因此请求参数\_method的值才是最终的请求方式

在web.xml中注册**HiddenHttpMethodFilter** 

```xml
<filter>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <filter-class>org.springframework.web.filter.HiddenHttpMethodFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>HiddenHttpMethodFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

::: tip

目前为止，SpringMVC中提供了两个过滤器：CharacterEncodingFilter和HiddenHttpMethodFilter

在web.xml中注册时，必须先注册CharacterEncodingFilter，再注册HiddenHttpMethodFilter

原因：

- 在 CharacterEncodingFilter 中通过 request.setCharacterEncoding(encoding) 方法设置字符集的
- request.setCharacterEncoding(encoding) 方法要求前面不能有任何获取请求参数的操作
- 而 HiddenHttpMethodFilter 恰恰有一个获取请求方式的操作：

```java
String paramValue = request.getParameter(this.methodParam);
```

:::

::: details Click to view the code writen by author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/19  16:42
 */
@Controller
public class UserController {

    /**
     * 使用RESTFul模拟用户资源的增删改查
     * /user    GET       查询所有用户信息
     * /user/1  GET       根据用户ID查询所有用户信息
     * /user    POST      添加用户信息
     * /user/1  DELETE    删除用户信息
     * /user    PUT       修改用户信息
     */

    @RequestMapping(value = "/user",method = RequestMethod.GET )
    public String getAllUser(){
        System.out.println("查询所有用户信息");
        return "success";
    }

    @RequestMapping(value = "/user/{id}",method=RequestMethod.GET)
    public String getUserById(){
        System.out.println("根据ID查询用户信息");
        return "success";
    }

    @RequestMapping(value = "/user",method = RequestMethod.POST)
    public String insertUser(String username,String password){
        System.out.println("添加用户信息:"+username+","+password);
        return "success";
    }

    @RequestMapping(value = "/user",method = RequestMethod.PUT)
    public String updateUser(String username,String password){
        System.out.println("修改用户信息:"+username+","+password);
        return "success";

    }


}
```

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<a th:href="@{/user}">查询所有用户信息</a><br>
<a th:href="@{/user/1}">根据Id查询用户信息</a><br>
<form th:action="@{/user}" method="post">
    用户名:<input type="text" name="username"><br>
    密码:<input type="password" name="password"><br>
    <input type="submit" name="添加"><br>
</form><br>

<form th:action="@{/user}" method="post">
    <input type="hidden " name="_method" value="PUT"><br>
    用户名:<input type="text" name="username"><br>
    密码:<input type="password" name="password"><br>
    <input type="submit" name="修改"><br>
</form><br>

<form th:action="@{/user}" method="post">
    <input type="hidden " name="_method" value="DELETE"><br>
    用户名:<input type="text" name="username"><br>
    密码:<input type="password" name="password"><br>
    <input type="submit" name="删除"><br>
</form>

</body>
</html>
```

```html
<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
success<br>
<p th:text="${testRequestScope}"></p>
<p th:text="${session.testSessionScope}"></p>
</body>
</html>
```

:::

+ 访问URL

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringMVC/images/06/01.png)

+ 控制台
+ 添加用户信息

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringMVC/images/06/02.png)

+ 修改用户信息

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/SpringMVC/images/06/03.png)



