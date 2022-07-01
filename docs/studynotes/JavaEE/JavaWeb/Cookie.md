---
title: Cookie 对象
date: 2022-01-13 19:37:24
permalink: /pages/da9006/
categories:
  - JavaWeb
tags:
  - JavaWeb
---
# Cookie 对象

Cookie是浏览器提供的一种技术，通过服务器的程序能将一些只须保存在客户端，或者在客户端进行处理的数据，放在本地的计算机上，不需要通过网络传输，因而提高网页处理的效率，并且能够减少服务器的负载，但是由于 Cookie 是服务器端保存在客户端的信息， 所以其安全性也是很差的。例如常见
的记住密码则可以通过 Cookie 来实现。

有一个专门操作Cookie的类**javax.servlet.http.Cookie**。随着服务器端的响应发送给客户端，保存在浏览器。当下次再访问服务器时把Cookie再带回服务器。

Cookie 的格式：键值对用“=”链接，多个键值对间通过“；”隔开。

##  Cookie的创建和发送

通过 new Cookie("key","value");来创建一个 Cookie 对象，要想将 Cookie 随响应发送到客户端，需要先添加到 response 对象中，response.addCookie(cookie);此时该 cookie 对象则随着响应发送至了客户端。在浏览器上可以看见。

```java
// 创建Cookie对象
Cookie cookie = new Cookie("uname","zhangsan");
// 发送Cookie对象
response.addCookie(cookie);
```

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/13  16:44
 * Cookie的创建和发送
 */
@WebServlet("/ser01")
public class Servlet01 extends HttpServlet {

    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        //Cookie的创建
        Cookie cookie = new Cookie("name","admin");
        // 发送(响应)Cookie对象
        resp.addCookie(cookie);

    }
}
```

:::

+ <kbd>F12</kbd>查看

![01](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/04/01.png)

##  Cookie的获取

在服务器端只提供了一个 getCookies()的方法用来获取客户端回传的所有 cookie 组成的一个数组，如果需要获取单个 cookie 则需要通过遍历，getName()获取 Cookie 的名称，getValue()获取 Cookie 的值。

```java
// 获取Cookie数组
Cookie[] cookies = request.getCookies();
// 判断数组是否为空
if (cookies != null && cookies.length > 0) {
// 遍历Cookie数组
	for (Cookie cookie : cookies){
		System.out.println(cookie.getName());
		System.out.println(cookie.getValue());
	}
}
```

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/13  17:45
 * Cookie的获取
 */
@WebServlet("/ser02")
public class Servlet02 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //获取Cookie数组
        Cookie[] cookies = req.getCookies();
        // 判断Cookie是否为null
        if (cookies!=null&&cookies.length>0){
            //遍历cookie数组
            for (Cookie cookie : cookies) {
                //获取Cookie的名称和值
                String name = cookie.getName();
                String value = cookie.getValue();
                System.out.println("name:"+name+"\tvalue："+value);
            }
        }

    }
}
```

:::

+ 控制台

![02](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/04/02.png)

## Cookie设置到期时间

除了 Cookie 的名称和内容外，我们还需要关心一个信息，到期时间，到期时间用来指定该 cookie 何时失效。默认为当前浏览器关闭即失效。我们可以手动设定 cookie 的有效时间（通过到期时间计算），通过 setMaxAge(int time);方法设定 cookie 的最大有效时间，以秒为单位。

**到期时间的取值**

+ 负整数

  若为负数，表示不存储该 cookie。

  cookie 的 maxAge 属性的默认值就是-1，表示**只在浏览器内存中存活**，一旦**关闭浏览器窗口**，那么 cookie 就会**消失**。

+ 正整数

  若大于 0 的整数，表示**存储的秒数**。

  表示 cookie 对象可存活指定的秒数。当生命大于 0 时，浏览器会把 Cookie 保存到硬盘上，就算关闭浏览器，就算重启客户端电脑，cookie 也会存活相应的时间。

+ 零

  若为 0，表示**删除该 cookie**。

  cookie 生命等于 0 是一个特殊的值，它表示 cookie 被作废！也就是说，如果原来浏览器已经保存了这个 Cookie，那么可以通过 Cookie 的 setMaxAge(0)来删除这个 Cookie。 无论是在浏览器内存中，还是在客户端硬盘上都会删除这个 Cookie。

**设置Cookie对象指定时间后失效**

```java
// 创建Cookie对象
Cookie cookie = new Cookie("uname","zhangsan");
// 设置Cookie 3天后失效
cookie.setMaxAge(3 * 24 * 60 * 60);
// 发送Cookie对象
response.addCookie(cookie);
```

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/13  18:12
 * Cookie的到期时间
 */
@WebServlet("/ser03")
public class Servlet03 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        /*到期时间:负整数(默认值是-1，表示只在浏览器内存中存活，关闭浏览器失效)*/
        Cookie cookie = new Cookie("uname1","张三");
        cookie.setMaxAge(-1);//关闭浏览器失效
        resp.addCookie(cookie);

        /*到期时间:正整数(表示存活指定秒数，会将数据存在磁盘中)*/
        Cookie cookie2 = new Cookie("uname2", "李四");
        cookie2.setMaxAge(30);//存活30秒
        resp.addCookie(cookie2);

        /*到期时间:零(表示删除cookie)*/
        Cookie cookie3 = new Cookie("name3", "王五");
        cookie3.setMaxAge(0);//删除cookie
        resp.addCookie(cookie3);


    }
}
```

:::

![03](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/04/03.png)

## Cookie的注意点

1. Cookie保存在当前浏览器中。

   在一般的站点中常常有记住用户名这样一个操作，该操作只是将信息保存在本机上，换电脑以后这些信息就无效了。而且 cookie 还不能跨浏览器。

2. Cookie存中文问题

   Cookie 中不能出现中文，如果有中文则通过 URLEncoder.encode()来进行编码，获取时通过URLDecoder.decode()来进行解码。

```java
String name = "姓名";
String value = "张三";
// 通过 URLEncoder.encode()来进行编码
name = URLEncoder.encode(name);
value = URLEncoder.encode(value);
// 创建Cookie对象
Cookie cookie = new Cookie(name,value);
// 发送Cookie对象
response.addCookie(cookie);
```

```java
// 获取时通过 URLDecoder.decode()来进行解码
URLDecoder.decode(cookie.getName());
URLDecoder.decode(cookie.getValue());
```

3.  同名Cookie问题

   如果服务器端发送重复的Cookie那么会覆盖原有的Cookie。

4. 浏览器存放Cookie的数量

   不同的浏览器对Cookie也有限定，Cookie的存储有是上限的。Cookie是存储在客户端（浏览器）的，而且一般是由服务器端创建和设定。后期结合Session来实现回话跟踪。

::: details Click to view the code written by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/13  19:01
 * Cookie的注意点
 * 1.Cookie只在当前的浏览器中有效(不夸浏览器和电脑)
 * 2.Cookie不能存中文
 *          如果一定要存中文，侧需要通过URLEncoder.encode()方法进行编码
 *          获取时，通过URLDecoder.decode进行解码
 * 3.如果出现同名cookie对象，则会覆盖
 * 4.Cookie的存储数量是有上限的，不同浏览器的上限不同。Cookie存储的大小是有效的，在4kb左右
 */
@WebServlet("/ser04")
public class Servlet04 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        /*Cookie存中文*/
        String name="姓名";
        String value="张三";

        //讲中文通过URLEncoder进行编码
        name= URLEncoder.encode(name);
        value=URLEncoder.encode(value);

        // 创建Cookie对象
        Cookie cookie = new Cookie(name,value);
        // 响应Cookie
        resp.addCookie(cookie);

        //获取Cookie时，通过URLDecoder进行解码
        Cookie[] cookies = req.getCookies();
        //判断非空
        if (cookies!=null&&cookies.length>0){
            //遍历
            for (Cookie cook : cookies) {

                //解码
                System.out.println(URLDecoder.decode(cook.getName()));
                System.out.println(URLDecoder.decode(cook.getValue()));
            }
        }


    }
}
```

:::

## Cookie的路径

Cookie的setPath设置cookie的路径，这个路径直接决定服务器的请求是否会从浏览器中加载某些cookie。

**情景一**：当前服务器下任何项目的任意资源都可获取Cookie对象

```java
/* 当前项目路径为：s01 */
Cookie cookie = new Cookie("xxx","XXX");
// 设置路径为"/"，表示在当前服务器下任何项目都可访问到Cookie对象
cookie.setPath("/");
response.addCookie(cookie);
```

**情景二**：当前项目下的资源可获取Cookie对象 （默认不设置Cookie的path）

```java
/* 当前项目路径为：s01 */
Cookie cookie = new Cookie("xxx","XXX");
// 设置路径为"/s01"，表示在当前项目下任何项目都可访问到Cookie对象
cookie.setPath("/s01"); // 默认情况，可不设置path的值
response.addCookie(cookie);
```

**情景三**：指定项目下的资源可获取Cookie对象

```java
/* 当前项目路径为：s01 */
Cookie cookie = new Cookie("xxx","XXX");
// 设置路径为"/s02"，表示在s02项目下才可访问到Cookie对象
cookie.setPath("/s02"); // 只能在s02项目下获取Cookie，就算cookie是s01产生的，s01也不能获取它
response.addCookie(cookie);
```

**情景四**：指定目录下的资源可获取Cookie对象

```java
/* 当前项目路径为：s01 */
Cookie cookie = new Cookie("xxx","XXX");
// 设置路径为"/s01/cook"，表示在s02/cook目录下才可访问到Cookie对象
cookie.setPath("/s01/cook");
response.addCookie(cookie);
```

如果我们设置path，如果当前访问的路径包含了cookie的路径（当前访问路径在cookie路径基础上要比cookie的范围小）cookie就会加载到request对象之中。

cookie的路径指的是可以访问该cookie的**顶层目录**，**该路径的子路径也可以访问该cookie**。

::: details Click to view the code writen by the author

```java
/**
 * @author frx
 * @version 1.0
 * @date 2022/1/13  19:40
 */
@WebServlet("/ser05")
public class Servlet05 extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        /*当前服务器下任何项目的任意资源都可获取Cookie对象*/
        Cookie cookie01 = new Cookie("cookie01","cookie01");
        // 设置路径为"/"，表示在当前服务器下任何项目都可访问到Cookie对象
        cookie01.setPath("/");
        resp.addCookie(cookie01);

        /*当前项目下的资源可获取Cookie对象 （默认不设置Cookie的path）*/
        Cookie cookie02 = new Cookie("cookie02","cookie02");
//        cookie02.setPath("/s05"); //设置为当前站点名
        resp.addCookie(cookie02);

        /*指定项目下的资源可获取Cookie对象*/
        Cookie cookie03 = new Cookie("cookie03","cookie03");
        // 设置路径为"/s03"，表示只有在s03项目下任何项目都可访问到Cookie对象
        cookie03.setPath("/s03");//设置为指定项目的站点名
        resp.addCookie(cookie03);

        /*指定目录下的资源可获取Cookie对象*/
        Cookie cookie04 = new Cookie("cookie04","cookie04");
        cookie04.setPath("/s05/ser02");//设置为指定目录的站点名
        resp.addCookie(cookie04);

        String url = req.getRequestURL().toString();
        System.out.println("获取客户端请求的完整URL：" + url);

    }
}
```

:::

+ 访问URLhttp://localhost:8080/s05/ser05

![04](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/04/04.png)

+ 访问URLhttp://localhost:8080/s05/ser02

![05](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/04/05.png)

+ 访问URLhttp://localhost:8080/s03/ser05

![06](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/studynotes/Servlet/images/04/06.png)

::: tip

当访问的路径包含了cookie的路径时，则该请求将带上该cookie；如果访问路径不包含cookie路径，则该请求不会携带该cookie。

:::

