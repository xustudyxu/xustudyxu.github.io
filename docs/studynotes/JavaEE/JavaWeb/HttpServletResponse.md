---
title: HttpServletResponse对象
date: 2022-01-12 23:03:30
permalink: /pages/6b3234/
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# HttpServletResponse对象

Web服务器收到客户端的http请求，会针对每一次请求，分别创建一个用于**代表请求**的 request 对象和**代表响应**的 response 对象。

request 和 response 对象代表请求和响应：获取客户端数据，需要通过 request 对象；**向客户端输出数据，需要通过 response 对象**。

HttpServletResponse 的主要功能用于服务器对客户端的请求进行响应，将 Web 服务器处理后的结果返回给客户端。service()方法中形参接收的是 HttpServletResponse 接口的实例化对象，这个对象中封装了向客户端发送数据、发送响应头，发送响应状态码的方法。

## 响应数据

接收到客户端请求后，可以通过 HttpServletResponse 对象直接进行响应，响应时需要获取输出流。有两种形式：

**getWriter() 获取字符流(只能响应回字符)**

**getOutputStream() 获取字节流(能响应一切数据)**

响应回的数据到客户端被浏览器解析。

<font color=#DC4040 size=4 face="黑体">注意：两者不能同时使用。</font>

```java
// 字符输出流
PrintWriter writer = response.getWriter();
writer.write("Hello");
writer.write("<h2>Hello</h2>");
```

```java
// 字节输出流
ServletOutputStream out = response.getOutputStream();
out.write("Hello".getBytes());
out.write("<h2>Hello</h2>".getBytes());
```

设置响应类型，默认是字符串

```java
// 设置响应MIME类型
response.setHeader("content-type","text/html"); // html
```

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/12  19:26
 * 相应数据
 *       getWriter()        字符输出流(输出字符串)
 *       getOutputStream    字节输出流(输出一切数据)
 */
@WebServlet("/ser01")
public class Servlet01 extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        /*getWriter()        字符输出流(输出字符串)*/
//        PrintWriter writer = resp.getWriter();
//        //输出数据
//        writer.write("Hello");
        /*getOutputStream    字节输出流(输出一切数据)*/
        ServletOutputStream out = resp.getOutputStream();
        // 输出数据
        out.write("Hi".getBytes());

    }
}
```

:::

## 相映乱码问题

在响应中，如果我们响应的内容中含有中文，则有可能出现乱码。这是因为服务器响应的数据也会经过网络传输，服务器端有一种编码方式，在客户端也存在一种编码方式，当两端使用的编码方式不同时则出现乱码。

**getWriter()的字符乱码**

对于 getWriter()获取到的字符流，响应中文必定出乱码，由于服务器端在进行编码时默认会使用 ISO8859-1 格式的编码，该编码方式并不支持中文。

要解决该种乱码只能在服务器端**告知服务器**使用一种能够支持中文的编码格式，比如我们通常用
的"UTF-8"。

```java
response.setCharacterEncoding("UTF-8");
```

此时还只完成了一半的工作，要保证数据正确显示，还需要指定客户端的解码方式。

```java
response.setHeader("content-type", "text/html;charset=UTF-8");
```

两端指定编码后，乱码就解决了。一句话：<font color=#DC4040 size=4 face="黑体">保证发送端和接收端的编码一致</font>

```java
// 设置服务端的编码
response.setCharacterEncoding("UTF-8");
// 设置客户端的响应类型及编码
response.setHeader("content-type","text/html;charset=UTF-8");
// 得到字符输出流
PrintWriter writer = response.getWriter();
writer.write("<h2>你好</h2>");
```

以上两端编码的指定也可以使用一句替代，同时指定服务器和客户端

```java
response.setContentType("text/html;charset=UTF-8");
```

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/12  20:33
 * 字符流响应数据
 * 乱码解决:
 *      1.设置服务端的编码格式
 *      resp.setCharacterEncoding("UTF-8");
 *      2.设置客户端的编码格式
 *      resp.setHeader("content-type","text/html");
 *
 */
@WebServlet("/ser02")
public class Servlet02 extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //设置服务端的编码格式
//        resp.setCharacterEncoding("UTF-8");
        //设置客户端的编码格式和响应MINI类型
//        resp.setHeader("content-type","text/html");
        //同时设置客户端和服务端的编码格式
        resp.setContentType("text/html;charset=UTF-8");
        /*getWriter()        字符输出流(输出字符串)*/
        PrintWriter writer = resp.getWriter();
        //输出数据
        writer.write("<h2>你好</h2>");

    }
}

```

:::

+ 访问URL

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/03/03.png)

**getOutputStream()字节乱码**

对于 getOutputStream()方式获取到的字节流，响应中文时，由于本身就是传输的字节， 所以此时可能出现乱码，也可能正确显示。当服务器端给的字节恰好和客户端使用的编码方式一致时则文本正确显示，否则出现乱码。无论如何我们都应该准确掌握服务器和客户端使用的是那种编码格式，以确保数据正确显示。

**指定客户端和服务器使用的编码方式一致。**

```java
response.setHeader("content-type","text/html;charset=UTF-8");
```

```java
// 设置客户端的编码及响应类型
ServletOutputStream out = response.getOutputStream();
response.setHeader("content-type","text/html;charset=UTF-8");
out.write("<h2>你好</h2>".getBytes("UTF-8"));
```

同样也可以使用一句替代

```java
// 设置客户端与服务端的编码
response.setContentType("text/html;charset=UTF-8");
```

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/12  20:35
 * 字节流响应数据
 */
@WebServlet("/ser03")
public class Servlet03 extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        // 设置客户端与服务端的编码
        resp.setContentType("text/html;charset=UTF-8");

        /*getOutputStream    字节输出流(输出一切数据)*/
        ServletOutputStream out = resp.getOutputStream();
        // 输出数据
        out.write("<h2>你好</h2>".getBytes("UTF-8"));

    }
}
```

:::

+ 访问URL

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/03/04.png)

::: tip

要想解决响应的乱码，只需要保证使用支持中文的编码格式。并且保证服务器端 和客户端使用相同的编码方式即可。

:::

## 重定向

重定向是一种服务器指导，客户端的行为。客户端发出第一个请求，被服务器接收处理后，服务器会进行响应，在响应的同时，服务器会给客户端一个新的地址（下次请求的地址response.sendRedirect(url);当客户端接收到响应后，会立刻、马上、自动根据服务器给的新地址发起第二个请求，服务器接收请求并作出响应，重定向完成。

从描述中可以看出重定向当中有两个请求存在，并且属于客户端行为。

```java
// 重定向跳转到index.jsp
response.sendRedirect("index.jsp");
```

通过观察浏览器我们发现第一次请求获得的响应码为 302，并且含有一个 location 头信息。并且地址
栏最终看到的地址是和第一次请求地址不同的，地址栏已经发生了变化。

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/12  21:43
 * 重定向
 *  服务端指导，客户端行为
 *  存在两次请求
 *  地址栏会发生改变
 */
@WebServlet("/ser04")
public class Servlet04 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Servlet04...");

        //重定向跳转到index.jsp
        resp.sendRedirect("index.jsp");
    }
}
```

```java
<%--index.jsp--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
<h1><%= "Hello World!" %>
</h1>
<br/>
<a href="hello-servlet">Hello Servlet</a>
</body>
</html>
```

:::

+ 访问URL

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/03/06.png)

+ 检查

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/03/05.png)

##  请求转发与重定向的区别

请求转发和重定向比较：

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/12  22:04
 * 重定向与请求转发的区别:
 *       1.请求转发的地址不会发生改变，重定向的地址会发生改变
 *       2.请求转发只有一次请求，重定向有两次请求
 *       3.请求转发时request对象可以共享，重定向时request对象不共享
 *       4.请求转发是服务端行为，重定向是客户端行为
 *       5.请求转发时的地址只能是当前站点下(当前项目)的资源，重定向地址可以是任何地址
 *          例如:重定向可以跳转到百度,而请求转发不可以
 */
@WebServlet("/ser06")
public class Servlet06 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Servlet06...");

        //接受参数
        String uname = req.getParameter("uname");
        System.out.println(uname);

        //设置request域对象
        req.setAttribute("upwd","123456");

        //请求转发
//        req.getRequestDispatcher("index.jsp").forward(req,resp);

        //重定向
        resp.sendRedirect("index.jsp");

    }
}
```

```java
<%--index.jsp--%>
<%@ page contentType="text/html; charset=UTF-8"  language="java" %>
<html>
<head>
    <title>JSP - Hello World</title>
</head>
<body>
    <%--Java脚本段--%>
    <%
    //获取参数
    String uname = request.getParameter("uname");
    //获取request作用域
    String upwd = (String) request.getAttribute("upwd");
    //输出内容
    %>
   <td><%=uname%>|<%=upwd%></td>
</body>
</html>
```

:::

| 请求转发(req.getRequestDispatcher().forward()) |   重定向(resp.sendRedirect())   |
| :--------------------------------------------: | :-----------------------------: |
|        一次请求，数据在request域中共享         | 两次请求，request域中数据不共享 |
|                  服务器端行为                  |           客户端行为            |
|                地址栏不发生变化                |         地址栏发生变化          |
|              绝对地址定位到站点后              |      绝对地址可写到http://      |

+ 请求转发访问URL

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/03/07.png)

+ 重定向访问URL

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/03/08.png)



::: tip

要想共享request对象，只能用请求转发，如果不想共享request对象，只想跳转，可以使用请求转发或者重定向，但是跳转的地址不是当前项目下的，只能用重定向

:::

