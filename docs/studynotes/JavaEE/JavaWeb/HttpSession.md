---
title: HttpSession对象
date: 2022-01-14 14:49:09
permalink: /pages/4dd5dd/
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# HttpSession对象

**HttpSession对象**是 javax.servlet.http.HttpSession 的实例，该接口并不像 HttpServletRequest 或HttpServletResponse 还存在一个父接口，该接口只是一个纯粹的接口。这因为 session 本身就属于
HTTP 协议的范畴。

对于服务器而言，每一个连接到它的客户端都是一个 session，servlet 容器使用此接口创建 HTTP 客
户端和 HTTP 服务器之间的会话。会话将保留指定的时间段，跨多个连接或来自用户的页面请求。一个
会话通常对应于一个用户，该用户可能多次访问一个站点。可以通过此接口查看和操作有关某个会话的
信息，比如会话标识符、创建时间和最后一次访问时间。在整个 session 中，最重要的就是属性的操
作。

session 无论客户端还是服务器端都可以感知到，若重新打开一个新的浏览器，则无法取得之前设置
的 session，因为每一个 session 只保存在当前的浏览器当中，并在相关的页面取得。

Session 的作用就是为了标识一次会话，或者说确认一个用户；并且在一次会话（一个用户的多次请
求）期间共享数据。我们可以通过 request.getSession()方法，来获取当前会话的 session 对象。

```java
// 如果session对象存在，则获取；如果session对象不存在，则创建
HttpSession session = request.getSession();
```

::: details Click to view the code writen by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/14  13:29
 * session对象的获取
 *         request.getSession()
 *         当获取session对象时，会先判断session对象是否存在，如果存在，则获取session对象
 *         如果不存在，则获取session对象
 * 常用方法
 */
@WebServlet("/ser01")
public class Session01 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //获取Session对象
        HttpSession session = req.getSession();

        //获取session的会话标识符
        String id = session.getId();
        System.out.println(id);

        //获取session的创建时间
        System.out.println(session.getCreationTime());

        //获取session的最后访问时间
        System.out.println(session.getLastAccessedTime());

        //获取判断是否是新的session对象
        System.out.println(session.isNew());

    }
}
```

:::

## 标识符 JESSIONID

Session 既然是为了标识一次会话，那么此次会话就应该有一个唯一的标志，这个标志就是
sessionId。

每当一次请求到达服务器，如果开启了会话（访问了 session），服务器第一步会查看是否从客户端
回传一个名为 JSESSIONID 的 cookie，如果没有则认为这是一次新的会话，会创建 一个新的 session 对
象，并用唯一的 sessionId 为此次会话做一个标志。如果有 JESSIONID 这 个cookie回传，服务器则会根
据 JSESSIONID 这个值去查看是否含有id为JSESSION值的session 对象，如果没有则认为是一个新的会
话，重新创建一个新的 session 对象，并标志此次会话； 如果找到了相应的 session 对象，则认为是之
前标志过的一次会话，返回该 session 对象，数据达到共享。

这里提到一个叫做 JSESSIONID 的 cookie，这是一个比较特殊的 cookie，当用户请求服务器时，如果
访问了 session，则服务器会创建一个名为 JSESSIONID，值为获取到的 session（无论是获取到的还是
新创建的）的 sessionId 的 cookie 对象，并添加到 response 对象中，响应给客户端，有效时间为关闭
浏览器。

所以 Session 的底层依赖 Cookie 来实现。

## session域对象

Session 用来表示一次会话，在一次会话中数据是可以共享的，这时 session 作为域对象存在，可以
通过 setAttribute(name,value) 方法向域对象中添加数据，通过 getAttribute(name) 从域对象中获取
数据，通过 removeAttribute(name) 从域对象中移除数据。

```java
// 获取session对象
HttpSession session = request.getSession();
// 设置session域对象
session.setAttribute("uname","admin");
// 获取指定名称的session域对象
String uname = (String) request.getAttribute("uname");
// 移除指定名称的session域对象
session.removeAttribute("uname");
```

数据存储在 session 域对象中，当 session 对象不存在了，或者是两个不同的 session 对象时，数据
也就不能共享了。这就不得不谈到 session 的生命周期。

::: details Click to view the code writen by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/14  13:53
 * Session域对象
 *      setAttribute()     设置域对象
 *      getAttribute()     获取域对象
 *      removeAttribute()  移除域对象
 *
 *          请求转发
 *              一次请求
 *              request作用域有效
 *              session作用域有效
 *          重定向
 *              两次请求
 *              request作用域无效
 *              session作用域有效
 */
@WebServlet("/ser02")
public class Session02 extends HttpServlet {


    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        /*session域对象*/
        //获取session对象
        HttpSession session = req.getSession();

        //设置域对象
        session.setAttribute("uname","admin");
        session.setAttribute("upwd","123456");

        //移除session域对象
        session.removeAttribute("upwd");

        /*request域对象*/
        req.setAttribute("name","zhangsan");

        //请求转发跳转到jsp页面
        //req.getRequestDispatcher("index.jsp").forward(req,resp);

        //重定向跳转到jsp页面
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
    <title>获取域对象</title>
</head>
<body>
<%
    //获取session域对象
    String uname = (String) request.getSession().getAttribute("uname");
    String upwd = (String) request.getSession().getAttribute("upwd");

    //request域对象
    String name =(String) request.getAttribute("name");

%>
<td><%=uname%>|<%=upwd%>|<%=name%></td> 
</body>
</html>
```

:::

+ 请求转发跳转到jsp页面

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/05/01.png)

+ 重定向跳转到jsp页面

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/05/02.png)

## session对象的销毁

### 默认时间到期

当客户端第一次请求 servlet 并且操作 session 时，session 对象生成，Tomcat 中 session 默认的存活时间为 30min，即你不操作界面的时间，一旦有操作，session 会重新计时。

那么 session 的默认时间可以改么？答案是肯定的。

可以在 Tomcat 中的 conf 目录下的 web.xml 文件中进行修改。

```xml
<!-- session 默认的最大不活动时间。单位：分钟。 -->
<session-config>
	<session-timeout>30</session-timeout>
</session-config>
```

### 自己设定到期时间

当然除了以上的修改方式外，我们也可以在程序中自己设定 session 的生命周期，通过session.setMaxInactiveInterval(int) 来设定 session 的最大不活动时间，单位为秒。

```java
// 获取session对象
HttpSession session = request.getSession();
// 设置session的最大不活动时间
session.setMaxInactiveInterval(15); // 15秒
```

当然我们也可以通过 getMaxInactiveInterval() 方法来查看当前 Session 对象的最大不活动时间。

```java
// 获取session的最大不活动时间
int time = session.getMaxInactiveInterval();
```

###  立刻失效

或者我们也可以通过 session.invalidate() 方法让 session 立刻失效

```java
// 销毁session对象
session.invalidate();
```

::: details Click to view the code writen by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/14  14:24
 * session对象的销毁
 *      1.默认到期时间
 *          Tomcat 中 session 默认的存活时间为 30min，即你不操作界面的时间，
 *          一旦有操作，session 会重新计时。
 *      可以在 Tomcat 中的 conf 目录下的 web.xml 文件中进行修改。
 *      2.手动设置到期时间
 *      3.立刻销毁
 *      4.关闭浏览器
 *          session底层依赖cookie,cookie对象默认只在浏览器中存活，关闭浏览器失效
 *      5.关闭服务器失效
 *          session是服务器端的对象,关闭服务器，session失效
 */
@WebServlet("/ser03")
public class Session03 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        // 获取session对象
        HttpSession session = req.getSession();
        // 设置session的最大不活动时间
        session.setMaxInactiveInterval(15); // 15秒


        // 获取session的最大不活动时间
        int time = session.getMaxInactiveInterval();
        System.out.println("获取session的最大不活动时间"+time);


        // 销毁session对象 立即销毁
        session.invalidate();


    }
}
```

:::

### 关闭浏览器

从前面的 JESSIONID 可知道，session 的底层依赖 cookie 实现，并且该 cookie 的有效时间为关闭浏览器，从而 session 在浏览器关闭时也相当于失效了（因为没有 JSESSION 再与之对应）。

### 关闭服务器

当关闭服务器时，session 销毁。

Session 失效则意味着此次会话结束，数据共享结束。

