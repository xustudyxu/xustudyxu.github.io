---
title: ServletContext对象
date: 2022-01-14 15:26:14
permalink: /pages/69ffc7/
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# ServletContext对象

每一个 web 应用都有且仅有一个ServletContext 对象，又称 Application 对象，从名称中可知，该对
象是与应用程序相关的。在 WEB 容器启动的时候，会为每一个 WEB 应用程序创建一个对应的
ServletContext 对象。

该对象有两大作用，第一、作为域对象用来共享数据，此时数据在整个应用程序中共享； 第二、该对
象中保存了当前应用程序相关信息。例如可以通过 getServerInfo() 方法获取当前服务器信息 ，
getRealPath(String path) 获取资源的真实路径等。

##  ServletContext对象的获取

获取 ServletContext 对象的途径有很多。比如：

1. 通过 request 对象获取

   ```java
   ServletContext servletContext = request.getServletContext();
   ```

2. 通过 session 对象获取

   ```java
   ServletContext servletContext = request.getSession().getServletContext();
   ```

3. 通过 servletConfig 对象获取，在 Servlet 标准中提供了 ServletConfig 方法

   ```java
   ServletConfig servletConfig = getServletConfig();
   ServletContext servletContext = servletConfig.getServletContext();
   ```

4. 直接获取，Servlet 类中提供了直接获取 ServletContext 对象的方法

   ```java
   ServletContext servletContext = getServletContext();
   ```

+ 常用方法

```java
// 获取项目存放的真实路径
String realPath = request.getServletContext().getRealPath("/");
// 获取当前服务器的版本信息
String serverInfo = request.getServletContext().getServerInfo();
```

::: details Click to view the code writen by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/14  14:58
 * 获取ServletContext对象
 */
@WebServlet("/ser01")
public class Servlet01 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //通过request对象获取
        ServletContext servletContext1 = req.getServletContext();

        //通过session对象获取
        ServletContext servletContext2 = req.getSession().getServletContext();

        //通过ServletConfig对象获取
        ServletContext servletContext3 = getServletConfig().getServletContext();

        //直接获取
        ServletContext servletContext4 = getServletContext();

        //常用方法
        //1.获取当前服务器的版本信息
        String serverInfo = req.getServletContext().getServerInfo();
        System.out.println("获取当前服务器的版本信息:"+serverInfo);
        //2.获取项目的真实路径
        String realPath = req.getServletContext().getRealPath("/");
        System.out.println("获取项目的真实路径"+realPath);

    }
}
```

::: details Click me to view the code writen by author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/14  15:23
 * ServletContext域对象
 *
 */
@WebServlet("/ser02")
public class Servlet02 extends HttpServlet {


    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        // 获取ServletContext对象
        ServletContext servletContext = req.getServletContext();

        // 设置域对象
        servletContext.setAttribute("name","zhangsan");

        // 获取域对象
        String name = (String) servletContext.getAttribute("name");

        // 移除域对象
        servletContext.removeAttribute("name");
    }
}
```

:::

##  ServletContext域对象

ServletContext 也可当做域对象来使用，通过向 ServletContext 中存取数据，可以使得整个应用程序
共享某些数据。当然不建议存放过多数据，因为 ServletContext 中的数据一旦存储进去没有手动移除将
会一直保存。

```java
// 获取ServletContext对象
ServletContext servletContext = request.getServletContext();
// 设置域对象
servletContext.setAttribute("name","zhangsan");
// 获取域对象
String name = (String) servletContext.getAttribute("name");
// 移除域对象
servletContext.removeAttribute("name");
```

::: 

### Servlet的三大域对象

1.  request域对象

   在一次请求中有效。请求转发有效，重定向失效。

2. session域对象

   在一次会话中有效。请求转发和重定向都有效，session销毁后失效。

3.  servletContext域对象

   在整个应用程序中有效。服务器关闭后失效。

::: tip

域范围越大，所占内存越多，在能够满足条件情况下，尽可能选较小的域对象

:::

