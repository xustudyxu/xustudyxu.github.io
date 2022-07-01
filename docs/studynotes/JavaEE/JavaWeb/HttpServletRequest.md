---
title: HttpServletRequest对象
date: 2022-01-12 21:02:22
permalink: /pages/2d4cf3/
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# HttpServletRequest对象

HttpServletRequest 对象：主要作用是用来接收客户端发送过来的请求信息，例如：请求的参数，发
送的头信息等都属于客户端发来的信息，service()方法中形参接收的是 HttpServletRequest 接口的实例
化对象，表示该对象主要应用在 HTTP 协议上，该对象是由 Tomcat 封装好传递过来

HttpServletRequest 是 ServletRequest 的子接口，ServletRequest 只有一个子接口，就是
HttpServletRequest。既然只有一个子接口为什么不将两个接口合并为一个？

从长远上讲：现在主要用的协议是 HTTP 协议，但以后可能出现更多新的协议。若以后想要支持这种
新协议，只需要直接继承 ServletRequest 接口就行了。

在 HttpServletRequest 接口中，定义的方法很多，但都是围绕接收客户端参数的。但是怎么拿到该对
象呢？不需要，直接在 Service 方法中由容器传入过来，而我们需要做的就是取出对象中的数据，进行
分析、处理。

## 接受请求

### 常用方法

1. 方法

| 方法             | 说明                                     |
| ---------------- | ---------------------------------------- |
| getRequestURL()  | 获取客户端发出请求时的完整URL            |
| getRequestURI()  | 获取请求行中的资源名称部分(项目名称开始) |
| getQueryString() | 获取请求行中的参数部分                   |
| getMethod()      | 获取客户端请求方式                       |
| getProtocol()    | 获取HTTP版本号                           |
| getContextPath() | 获取webapp名字                           |

2. 示例

```java
// 获取客户端请求的完整URL （从http开始，到?前面结束）
String url = request.getRequestURL().toString();
System.out.println("获取客户端请求的完整URL：" + url);
// 获取客户端请求的部分URL （从站点名开始，到?前面结束）
String uri = request.getRequestURI();
System.out.println("获取客户端请求的部分URL：" + uri);
// 获取请求行中的参数部分
String queryString = request.getQueryString();
System.out.println("获取请求行中的参数部分：" + queryString);
// 获取客户端的请求方式
String method = request.getMethod();
System.out.println("获取客户端的请求方式：" + method);
// 获取HTTP版本号
String protocol = request.getProtocol();
System.out.println("获取HTTP版本号：" + protocol);
// 获取webapp名字 （站点名）
String webapp = request.getContextPath();
System.out.println("获取webapp名字：" + webapp);
```

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/11  14:21
 */
@WebServlet("/ser01")
public class Servlet01 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        /*常用方法*/
        // 获取请求时的完整路径(从http开始，到"?"前面结束)
        String url = req.getRequestURL() + "";
        System.out.println("获取请求时的完整路径" + url);
        // 获取请求时的部分路径(从项目的站点名开始，到"?"前面结束)
        String uri = req.getRequestURI();
        System.out.println("获取请求时的部分路径" + uri);
        // 获取请求时的参数字符串(从"?"后面开始,到最后的字符串)
        String queryString = req.getQueryString();
        System.out.println("获取请求时的参数字符串" + queryString);
        // 获取请求方式(GET和POST)
        String method = req.getMethod();
        System.out.println("获取请求方式" + method);
        // 获取当前的协议版本(HTTP/1.1)
        String prototo1 = req.getProtocol();
        System.out.println("获取当前的协议版本" + prototo1);
        // 获取项目的站名名(项目对外访问路径)
        String webapp = req.getContextPath();//上下文路径
        System.out.println("获取项目的站名名" + webapp);



         // 获取指定名称的参数，返回字符串
        String uname = req.getParameter("uname");
        System.out.println("uname的参数值："+uname);
        // 获取指定名称参数的所有参数值，返回数组
        String[] hobbys = req.getParameterValues("hobby");
        //判断数组是否为空
        if(hobbys!=null && hobbys.length>0){
            for (String hobby : hobbys) {
                System.out.println("爱好"+hobby);
            }
        }

}
}
```

:::

### 获取请求参数

1. 方法

| 方法                            | 说明                     |
| ------------------------------- | ------------------------ |
| getParameter(name)              | 获取指定名称的参数       |
| getParameterValues(String name) | 获取指定名称参数的所有值 |

2. 示例

```java
// 获取指定名称的参数，返回字符串
String uname = request.getParameter("uname");
System.out.println("uname的参数值：" + uname);
// 获取指定名称参数的所有参数值，返回数组
String[] hobbys = request.getParameterValues("hobby");
System.out.println("获取指定名称参数的所有参数值：" + Arrays.toString(hobbys));
```

## 请求乱码问题

由于现在的 request 属于接收客户端的参数，所以必然有其默认的语言编码，主要是由于在解析过程
中默认使用的编码方式为 ISO-8859-1(此编码不支持中文)，所以解析时一定会出现乱码。要想解决这种
乱码问题，需要设置 request 中的编码方式，告诉服务器以何种方式来解析数据。或者在接收到乱码数
据以后，再通过相应的编码格式还原。

**方式一**:

```java
request.setCharacterEncoding("UTF-8");
```

**这种方式只针对 POST 有效（必须在接收所有的数据之前设定）**

**方式二**:

```java
new String(request.getParameter(name).getBytes("ISO-8859-1"),"UTF-8");
```

借助了String 对象的方法，该种方式对任何请求有效，是通用的

<font color=#DC4040 size=4 face="黑体">Tomcat8起，以后的GET方式请求是不会出现乱码的</font>

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/11  16:39
 * 乱码原因:
 * 主要是由于在解析过程
 *  中默认使用的编码方式为 ISO-8859-1(此编码不支持中文)
 * 请求乱码问题
 *           Tomcat8及以上版本                                      Tomcat7及以下版本
 * GET请求     不会乱码                                              会乱码
 * POST请求    会乱码，通过设置服务器解析编码的格式                       会乱码，通过设置服务器解析编码的格式
 * 乱码情况:
 *     POST请求:无论什么版本的服务器，post请求中文都会乱码  解决方式  接受数据之前设定 request.setCharacterEncoding("UTF-8");
 *注：
 *      1.req.setCharacterEncoding("UTF-8");只针对POST请求乱码有效
 *      2.new String(req.getParameter("uname").getBytes("ISO-8859-1"),"UTF-8") 针对任何请求方式，
 *      但是如果数据本身不乱码，还依然使用new String()方法转换，则会乱码
 */
@WebServlet("/ser02")
public class Servlet02 extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置请求的编码格式
        req.setCharacterEncoding("UTF-8");
        //获取客户端传递的参数
        String uname=req.getParameter("uname");
        String upwd=req.getParameter("upwd");

        System.out.println("姓名:"+uname);
        System.out.println("密码:"+upwd);


        //解决Tomcat及以下版本的GET请求乱码
        String name=new String(req.getParameter("uname").getBytes("ISO-8859-1"),"UTF-8");
        System.out.println("name:"+name);
    }
}
```

:::

## 请求转发

请求转发，是一种<font color=#DC4040 size=4 face="黑体">服务器的行为</font>，当客户端请求到达后，服务器进行转发，此时会将请求对象进行保存，地址栏中的<font color=#DC4040 size=4 face="黑体"> URL 地址不会改变</font>，得到响应后，服务器端再将响应发送给客户端，<font color=#DC4040 size=4 face="黑体">从始至终只有一个请求发出</font>。

实现方式如下，达到多个资源协同响应的效果。

```java
request.getRequestDispatcher(url).forward(request,response);
```

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/11  19:38
 * 请求转发跳转
 *  可以让请求从服务端跳转到客户端(或者跳转到Servlet)
 *  服务端行为
 *  特点:
 *       1. 服务端行为
 *       2. 地址栏不发生改变
 *       3. 从始至终只有一个请求(/ser03与/ser04使用的是一个请求)
 *       4. request数据可以共享
 */
@WebServlet("/ser03")
public class Servlet03 extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 接受客户端请求的参数
        String uname = req.getParameter("uname");
        System.out.println("Servlet03 uname:"+uname);

        // 请求转发跳转到Servlet04
//        req.getRequestDispatcher("ser04").forward(req,resp);
        // 请求转发跳转到jsp页面
        req.getRequestDispatcher("login.jsp").forward(req,resp);
        // 请求转发跳转到html页面
//        req.getRequestDispatcher("login.html").forward(req,resp);
    }
}
```

```java
<%--index.jsp--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录</title>
</head>
<body>
    <from method="post" action="ser02">
        姓名: <input type="text" name="uname"> <br>
        密码: <input type="password" name="upwd"> <br>
        <button>登录</button>
    </from>
</body>
</html>
```

::: 

- 请求转发到jsp页面

![12](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/12.png)

- 请求转发到html页面

![13](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/13.png)

## request作用域

通过该对象可以在一个请求中传递数据，作用范围：在一次请求中有效，即服务器跳转有效。

```java
// 设置域对象内容
request.setAttribute(String name, String value);
// 获取域对象内容
request.getAttribute(String name);
// 删除域对象内容
request.removeAttribute(String name);
```

request 域对象中的数据在一次请求中有效，则经过请求转发，request 域中的数据依然存在，则在
请求转发的过程中可以通过 request 来传输/共享数据。

::: details Click to view the code written by the author

```java
package com.example.demo;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author frx
 * @version 1.0
 * @date 2022/1/12  14:08
 * request作用域
 *         通过对象可以在一个请求中传递数据，作用范围；在第一次请求中有效，即服务器跳转有效。(请求转发跳转时有效)
 * // 设置域对象内容
 * request.setAttribute(String name, Object value);
 * // 获取域对象内容
 * request.getAttribute(String name);
 * // 删除域对象内容
 * request.removeAttribute(String name);
 */
@WebServlet("/ser05")
public class Servlet05 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        System.out.println("Servlet05...");

        // 设置域对象内容
        request.setAttribute("name","admin");
        request.setAttribute("age",18);
        List<String> list=new ArrayList<>();
        list.add("aaa");
        list.add("bbb");
        request.setAttribute("list",list);

        //请求转发跳转到index.jsp
        request.getRequestDispatcher("index.jsp").forward(request,response);
    }
}

```

```java
<%--index.jsp--%>
<%@ page import="java.util.List" %>
<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
<h2>index页面</h2>
<%--如果要在jsp中写Java代码，需要在脚本段中--%>
<%
    //获取域对象
    //获取域对象内容
    String name =(String) request.getAttribute("name");
    System.out.println("name="+name);
    Integer age = (Integer) request.getAttribute("age");
    System.out.println("age="+age);
    List<String> list=(List<String>) request.getAttribute("list");
    System.out.println(list.get(0));
%>
</body>
</html>
```

:::

- 控制台

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/03/01.png)

- 访问URL

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/03/02.png)

