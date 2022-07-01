---
title: Servlet 概论
date: 2022-01-11 20:40:22
permalink: /pages/8bcdb7/
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# Servlet 概论

Servlet 是 Server 与 Applet 的缩写，是服务端小程序的意思。使用 Java 语言编写的服务器端程序，
可以生成动态的 WEB 页，Servlet 主要运行在服务器端，并由服务器调用执行， 是一种按照 Servlet 标
准来开发的类。 是 SUN 公司提供的一门用于开发动态 Web 资源的技术。（言外之意：要实现 web 开发，需要实现 Servlet 标准）

Servlet 本质上也是 Java 类，但要遵循 Servlet 规范进行编写，没有 main()方法，它的创建、使用、
销毁都由 Servlet 容器进行管理(如 Tomcat)。（言外之意：写自己的类，不用写 main 方法，别人自动调用）

Servlet 是和 HTTP 协议是紧密联系的，其可以处理 HTTP 协议相关的所有内容。这也是 Servlet 应用广泛的原因之一。

提供了 Servlet 功能的服务器，叫做 Servlet 容器，其常见容器有很多，如 Tomcat, Jetty, WebLogicServer, WebSphere, JBoss 等等。

## 创建Web项目

1. 选择"File"->"New"->Project
2. 设置项目的相关信息，选择"Next"

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/01.png)

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/02.png)

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/03.png)

## Servlet的实现

### 新建类

1.  点击 "src" —> "new" —> "package"，创建一个文件包
2. 在包下面创建 Java 类文件，点击包名 —> "New" —> "Java Class"

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/04.png)

### 实现Servlet规范

实现 Servlet 规范，即继承 HttpServlet 类，并到如响应的包，该类中已经完成了通信的规则，我们只
需要进行业务的实现即可。

```java
package com.frx01.servlet01;

import javax.servlet.http.HttpServlet;

/**
 * @author frx
 * @version 1.0
 * @date 2022/1/11  11:15
 */
public class Servlet01 extends HttpServlet {
}

```

### 重写service方法

满足 Servlet 规范只是让我们的类能够满足接收请求的要求，接收到请求后需要对请求进行分析，以
及进行业务逻辑处理，计算出结果，则需要添加代码，在规范中有一个叫做 service的方法，专门用来做
请求处理的操作，业务代码则可以写在该方法中。

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/11  11:15
 */
public class Servlet01 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Hello servlet!");
        resp.getWriter().write("Hello World");
    }
}

```

### 设置注解

在完成好了一切代码的编写后，还需要向服务器说明，特定请求对应特定资源。

开发servlet项目，使用@WebServlet将一个继承于javax.servlet.http.HttpServlet 的类定义为Servlet
组件。在Servlet3.0中 ， 可以使用@WebServlet注解将一个继承于javax.servlet.http.HttpServlet的类
标注为可以处理用户请求的 Servlet。

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/11  11:25
 * 实现Servlet
 * 1.创建普通Java类
 * 2.实现Servlet的规范，继承HttpServlet类
 * 3.重写service方法，用来处理请求
 * 4.设置注解，指定访问的路径
 */
@WebServlet("/ser01")
public class Servlet01 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //打印内容在控制台
        System.out.println("Hello Servlet!");
        //通过流输出数据到浏览器
        resp.getWriter().write("Hello Servlet!");
    }
}
```

+ 用注解配置 Servlet

```java
@WebServlet(name="Servlet01",value="/ser01")
```

```java
@WebServlet(name="Servlet01",urlPatterns = "/ser01")  //跟上面效果一样
```

+ 也可以配置多个访问路径

```java
@WebServlet(name="Servlet01",value={"/ser01","/ser001"})
```

```java
@WebServlet(name="Servlet01",urlPatterns={"/ser01","/ser001"})
```

### 发布项目并启动服务

到此，需要编写和配置的地方已经完成，项目已经完整了，但是如果需要外界能够访问， 还需要将项
目发布到服务器上并运行服务器。

1. 设置项目的站点名（项目对外访问路径）

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/05.png)

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/06.png)

2. 设置项目的Tomcat配置

![07](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/07.png)

3.  启动服务器

![08](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/08.png)

### 访问并查看结果

在项目正确发布到服务器上之后，用户即可通过浏览器访问该项目中的资源。注意 url 的 格式正确，tomcat 的端口为 8080。

浏览器访问地址:http://localhost:8080/s0/ser01

+ 页面效果

![09](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/09.png)

+ 后台结果

![10](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/10.png)

到这里我们的第一个 Servlet 就实现了！

### service方法的另外两种实现方式(了解)

+ 继承GenericServlet类

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/11  13:18
 * 继承GenericServlet类
 */
@WebServlet("/ser02")
public class Servlet02 extends GenericServlet{
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("继承GenericServlet类...");
    }
}
```

+ 实现Servlet接口

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/11  13:19
 * 实现Servlet接口
 */
@WebServlet("/ser03")
public class Servlet03 implements Servlet {
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {

    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("实现Servlet接口...");
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}

```

+ 调用doGet和doPost方法

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/11  13:26
 */
@WebServlet("/ser04")
public class Servlet04 extends HttpServlet {
//    @Override
//    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        System.out.println("hello servlet...");
//    }

    /**
     * Get请求调用
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Get请求....");
        //业务代码
    }

    /**
     * Post请求调用
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Post请求...");
        //调用Get请求
        doGet(req,resp);
    }
}

```

## Servlet的工作流程

1. 通过请求头获知浏览器访问的是哪个主机
2. 再通过请求行获取访问的是哪个一个web应用
3. 再通过请求行中的请求路径获知访问的是哪个资源
4. 通过获取的资源路径在配置中匹配到真实的路径，
5. 服务器会创建servlet对象，（如果是第一次访问时，创建servlet实例，并调用init方法进行初始化
操作）
6. 调用service（request， response）方法来处理请求和响应的操作
7. 调用service完毕后返回服务器 由服务器讲response缓冲区的数据取出，以http响应的格式发送给
浏览器

## Servlet的生命周期

Servlet没有 main()方法，不能独立运行，它的运行完全由 Servlet 引擎来控制和调度。 所谓生命周期，指的是 servlet 容器何时创建 servlet 实例、何时调用其方法进行请求的处理、 何时并销毁其实例的整个过程。

+ **实例和初始化时机**

  当请求到达容器时，容器查找该 servlet 对象是否存在，如果不存在，则会创建实例并进行初始化。

+ **就绪/调用/服务阶段**

  有请求到达容器，容器调用 servlet 对象的 service()方法,处理请求的方法在整个生命周期中可以被多次调用； HttpServlet 的 service()方法，会依据请求方式来调用 doGet()或者 doPost()方法。但是，这两个 do 方法默认情况下，会抛出异常，需要子类去 override。
  
+ **销毁时机**
当容器关闭时（应用程序停止时），会将程序中的 Servlet 实例进行销毁。

  上述的生命周期可以通过 Servlet 中的生命周期方法来观察。在 Servlet 中有三个生命周 期方法，不由用户手动调用，而是在特定的时机有容器自动调用，观察这三个生命周期方法 即可观察到Servlet 的生命周期。
  

**init** 方法，在 Servlet 实例创建之后执行（证明该 Servlet 有实例创建了）

```java
public void init(ServletConfig config) throws ServletException {
	System.out.println("实例创建了...");
}
```

**service** 方法，每次有请求到达某个 Servlet 方法时执行，用来处理请求（证明该Servlet 进行服务了）

```java
protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	System.out.println("服务调用了...");
}
```

**destroy** 方法，Servlet 实例销毁时执行（证明该 Servlet 的实例被销毁了）

```java
public void destroy() {
	System.out.println("实例销毁了...");
}
```

::: details Click me to view the code


```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/11  13:42
 */
@WebServlet("/ser05")
public class Servlet05 extends HttpServlet {

    //就绪/服务方法(处理请求数据)
    //系统方法，服务器自动调用
    //当有请求到达Servlet时，就会调用该方法
    //方法可以被多次调用
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Servlet被调用了...");
    }

    //初始化方法
    //系统方法,服务器自动调用
    //当请求到达Servlet容器时，Servlet容器会判断Servlet对象是否存在.如果不存在，则创建实例并初始化
    //方法只会执行一次
    @Override
    public void init() throws ServletException {
        System.out.println("Servlet被创建了...");
    }

    //销毁方法
    //系统方法，服务器自动调用
    //当服务器关闭或应用程序停止时，调用该方法
    //方法只会执行一次
    @Override
    public void destroy() {
        System.out.println("Servlet被销毁了...");
    }
}

```

:::

Servlet 的生命周期，简单的概括这就分为四步：servlet 类加载-->实例化-->服务-->销毁。

下面我们描述一下 Tomcat 与 Servlet 是如何工作的,看看下面的时序图：

![11](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/02/11.png)

1. Web Client 向 Servlet 容器（Tomcat）发出 Http 请求
 2. Servlet 容器接收 Web Client 的请求
 3. Servlet 容器创建一个 HttpServletRequest 对象，将 Web Client 请求的信息封装到这个对象中
 4. Servlet 容器创建一个 HttpServletResponse 对象
 5. Servlet 容器调HttpServlet 对象service 方法，把 Request 与 Response 作为参数，传给HttpServlet
 6. HttpServlet 调用 HttpServletRequest 对象的有关方法，获取 Http 请求信息
 7. HttpServlet 调用 HttpServletResponse 对象的有关方法，生成响应数据
 8. Servlet 容器把 HttpServlet 的响应结果传给 Web Client



